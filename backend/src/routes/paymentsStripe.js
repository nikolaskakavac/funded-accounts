const express = require('express');
const Stripe = require('stripe');
const Plan = require('../models/Plan');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /payments/stripe/checkout-session
router.post('/checkout-session', authMiddleware, async (req, res) => {
  const { planId } = req.body;

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      success_url:
        'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        userId: req.user.id.toString(),
        planId: plan._id.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    res.status(500).json({ message: 'Stripe error', error: err.message });
  }
});

module.exports = router;
