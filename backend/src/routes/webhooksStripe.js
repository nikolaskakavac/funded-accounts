const express = require('express');
const Stripe = require('stripe');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { sendPurchaseConfirmation, sendCredentialsNotification } = require('../utils/mailer');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('✅ Webhook received:', event.type);

  // 🔥 ON-SITE PAYMENT INTENT (tvoj novi flow)
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('PaymentIntent succeeded:', paymentIntent.id);

    Transaction.findOne({ providerPaymentId: paymentIntent.id })
      .populate('user plan')
      .then(async (tx) => {
        if (!tx) {
          console.log('❌ Transaction not found for PI:', paymentIntent.id);
          return res.json({ received: true });
        }

        // AKTI VIRAJ PLAN
        tx.status = 'paid';
        tx.active = true;
        tx.user.currentPlan = tx.plan._id;
        
        await tx.save();
        await tx.user.save();

        console.log(`🎉 Plan ${tx.plan.name} activated for ${tx.user.email}`);
        
        // Pošalji email-ove
        try {
          await sendPurchaseConfirmation(tx.user.email, {
            planName: tx.plan.name,
            amount: paymentIntent.amount / 100, // konvertuj iz centi
            currency: paymentIntent.currency.toUpperCase(),
            paymentMethod: 'Credit/Debit Card'
          });
          console.log('✅ Purchase confirmation email sent');
          
          await sendCredentialsNotification(tx.user.email);
          console.log('✅ Credentials notification email sent');
        } catch (e) {
          console.error('❌ Email failed:', e.message);
        }
      })
      .catch(err => {
        console.error('❌ Webhook update error:', err);
      });
  }

  // Stari Checkout flow (ostaje za kompatibilnost)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Checkout session completed:', session.id);
    res.json({ received: true });
  }

  res.json({ received: true });
});

module.exports = router;
