
const express = require('express');
const Stripe = require('stripe');
const Plan = require('../models/Plan');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// FRONTEND domen
const FRONTEND_URL =
  process.env.FRONTEND_URL || 'https://fundedaccounts.netlify.app';

// Plan pricing overrides by payment method (EUR)
const planPricing = {
  '693db3e0e9cf589519c144fe': { stripe: 300, crypto: 300 }, // 10k
  '693db3ede9cf589519c14500': { stripe: 600, crypto: 600 }, // 20k
};

const getStripeAmount = (planId, fallbackPrice) => {
  const p = planPricing[planId]?.stripe;
  return p ? Math.round(p * 100) : Math.round(fallbackPrice * 100);
};

// POST /payments/stripe/checkout-session (redirect Stripe Checkout)
router.post('/checkout-session', authMiddleware, async (req, res) => {
  const { planId } = req.body;

  try {
    console.log(
      'Stripe checkout-session called by user',
      req.user?.id,
      'for plan',
      planId
    );

    const plan = await Plan.findById(planId);
    if (!plan) {
      console.warn('Stripe checkout-session: Plan not found for id', planId);
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

    console.log(
      'Stripe checkout-session created:',
      session.id,
      'for user',
      req.user.id
    );

    // opciono: ovde možeš da kreiraš Transaction sa status 'pending' za Checkout,
    // ako to već ne radiš u webhooku

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res
      .status(500)
      .json({ message: 'Stripe error', error: err.message });
  }
});

// POST /payments/stripe/create-intent (on‑site payment, Stripe Elements)
router.post('/create-intent', authMiddleware, async (req, res) => {
  const { planId, phone } = req.body;

  try {
    console.log('create-intent called:', { planId, phone, userId: req.user?.id });

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    console.log('Plan found:', plan.name, plan.price, plan.currency);

    const amountInCents = getStripeAmount(plan._id.toString(), plan.price);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: plan.currency || 'eur',
      payment_method_types: ['card'],
      metadata: {
        userId: req.user.id.toString(),
        planId: plan._id.toString(),
        phone: phone || '',
        price: (amountInCents / 100).toString(),
      },
    });

   await Transaction.create({
  user: req.user.id, // ili req.user._id ako middleware tako vraća, ali kod tebe gore koristiš id
  plan: plan._id,
  provider: 'stripe',
  providerPaymentId: paymentIntent.id,
  amount: amountInCents / 100,
  currency: plan.currency || 'eur',
  status: 'pending',
  phone: phone || '',
  balance: plan.balance
});


    console.log('✅ PaymentIntent created:', paymentIntent.id);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('❌ create-intent ERROR:', err);
    res.status(500).json({ message: 'Stripe error', error: err.message });
  }
});


module.exports = router;
