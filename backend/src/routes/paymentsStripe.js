const express = require('express');
const Stripe = require('stripe');
const Plan = require('../models/Plan');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../utils/authMiddleware');
const { resolveCheckoutDiscountCode, applyCheckoutDiscount } = require('../utils/discounts');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FRONTEND_URL =
  process.env.FRONTEND_URL || 'https://fundedaccounts.netlify.app';

const planPricing = {
  '693db3e0e9cf589519c144fe': { stripe: 150, crypto: 150 },
  '693db3ede9cf589519c14501': { stripe: 300, crypto: 300 },
  '693db3ede9cf589519c14500': { stripe: 800, crypto: 800 },
};

const planDetails = {
  '693db3e0e9cf589519c144fe': {
    name: 'INSTANT FUNDED ACCOUNT WITH 5.000 EUR',
    balance: 5000,
    description: '5.000 EUR funded account',
  },
  '693db3ede9cf589519c14501': {
    name: 'INSTANT FUNDED ACCOUNT WITH 10.000 EUR',
    balance: 10000,
    description: '10.000 EUR funded account',
  },
  '693db3ede9cf589519c14500': {
    name: 'INSTANT FUNDED ACCOUNT WITH 25.000 EUR',
    balance: 25000,
    description: '25.000 EUR funded account',
  },
};

const getStripeAmount = (planId, fallbackPrice) => {
  if (process.env.STRIPE_SECRET_KEY?.startsWith('sk_test')) {
    return 100;
  }

  const price = planPricing[planId]?.stripe;
  return price ? Math.round(price * 100) : Math.round((Number(fallbackPrice) || 300) * 100);
};

async function ensurePlan(planId) {
  let plan = await Plan.findById(planId);
  if (plan) return plan;

  const price = planPricing[planId]?.stripe;
  const details = planDetails[planId];
  if (!price || !details) return null;

  try {
    plan = await Plan.create({
      _id: planId,
      ...details,
      price,
      currency: 'eur',
      stripePriceId: `manual_${planId}`,
      nowMeta: { autoCreatedForPayment: true },
    });
  } catch (err) {
    if (err?.code !== 11000) {
      throw err;
    }
    plan = await Plan.findById(planId);
  }

  return plan;
}

router.post('/checkout-session', authMiddleware, async (req, res) => {
  const { planId } = req.body;

  try {
    const plan = await ensurePlan(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const amountInCents = getStripeAmount(plan._id.toString(), plan.price);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: plan.currency || 'eur',
            product_data: { name: plan.name },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cancel`,
      metadata: {
        userId: req.user.id.toString(),
        planId: plan._id.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ message: 'Stripe error', error: err.message });
  }
});

router.post('/create-intent', authMiddleware, async (req, res) => {
  const { planId, phone, discountCode } = req.body;

  try {
    const plan = await ensurePlan(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const discount = await resolveCheckoutDiscountCode(discountCode);
    const baseAmount = planPricing[plan._id.toString()]?.stripe || Number(plan.price) || 0;
    const finalAmount = process.env.STRIPE_SECRET_KEY?.startsWith('sk_test')
      ? 1
      : applyCheckoutDiscount(baseAmount, discount.valid);
    const amountInCents = Math.round(finalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: plan.currency || 'eur',
      payment_method_types: ['card'],
      metadata: {
        userId: req.user.id.toString(),
        planId: plan._id.toString(),
        phone: phone || '',
        price: finalAmount.toString(),
        discountCode: discount.valid ? discount.code : '',
        discountRate: discount.valid ? '0.05' : '0',
      },
    });

    await Transaction.create({
      user: req.user.id,
      plan: plan._id,
      provider: 'stripe',
      providerPaymentId: paymentIntent.id,
      amount: finalAmount,
      currency: plan.currency || 'eur',
      status: 'pending',
      phone: phone || '',
      discountCode: discount.valid ? discount.code : undefined,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: finalAmount,
      currency: plan.currency || 'eur',
      discountApplied: discount.valid,
      discountCode: discount.valid ? discount.code : '',
    });
  } catch (err) {
    console.error('create-intent error:', err);
    res.status(500).json({ message: 'Stripe error', error: err.message });
  }
});

module.exports = router;
