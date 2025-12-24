const express = require('express');
const axios = require('axios');
const Plan = require('../models/Plan');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const authMiddleware = require('../utils/authMiddleware');
const { sendWelcomeEmail } = require('../utils/mailer');

const router = express.Router();

const NOW_API_BASE =
  process.env.NOWPAYMENTS_BASE_URL || 'https://api.nowpayments.io/v1';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

router.post('/create', authMiddleware, async (req, res) => {
  const { planId, pay_currency } = req.body;

  try {
    console.log('NOW create user:', req.user);
    console.log('NOW create headers:', req.headers.authorization);

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const userId = req.user?.id; // ako auth radi, ovo je setovano

    const payload = {
      price_amount: plan.price,
      price_currency: plan.currency || 'usd',
      pay_currency: (pay_currency || 'btc').toLowerCase(),
      // Uklanjamo ipn_callback_url jer besplatni plan nema webhook
      order_id: `${userId || 'unknown'}-${plan._id}-${Date.now()}`,
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    };

    console.log('NOWPayments payload:', payload);

    const response = await axios.post(`${NOW_API_BASE}/payment`, payload, {
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    const payment = response.data;
    console.log('NOWPayments response:', payment);
    console.log('Invoice URL:', payment.invoice_url);

    if (!userId) {
      console.error('NOWPayments: userId missing, cannot create Transaction');
      return res
        .status(401)
        .json({ message: 'Unauthorized: user not resolved from token' });
    }

    await Transaction.create({
      user: userId,
      plan: plan._id,
      provider: 'nowpayments',
      providerPaymentId: String(payment.payment_id),
      amount: plan.price,
      currency: plan.currency || 'usd',
      status: 'pending',
    });

    res.json({
      payment_id: payment.payment_id,
      pay_address: payment.pay_address,
      pay_amount: payment.pay_amount,
      pay_currency: payment.pay_currency,
      invoice_url: payment.invoice_url || `https://nowpayments.io/payment/?iid=${payment.payment_id}`,
    });
  } catch (err) {
    console.error(
      'NOWPayments create error:',
      err.response?.status,
      err.response?.data || err.message,
    );

    return res
      .status(500)
      .json({ message: 'NOWPayments error', detail: err.response?.data || err.message });
  }
});

// Status check endpoint
router.get('/status/:paymentId', authMiddleware, async (req, res) => {
  const { paymentId } = req.params;

  try {
    const response = await axios.get(`${NOW_API_BASE}/payment/${paymentId}`, {
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY,
      },
    });

    const payment = response.data;

    // Update transaction status if needed
    const tx = await Transaction.findOne({
      provider: 'nowpayments',
      providerPaymentId: String(paymentId),
    });

    if (tx && payment.payment_status === 'finished' && tx.status !== 'paid') {
      tx.status = 'paid';
      await tx.save();

      const user = await User.findById(tx.user);
      const plan = await Plan.findById(tx.plan);

      if (user && plan) {
        user.currentPlan = plan._id;
        await user.save();

        try {
          console.log('Sending payment email (NOW) to', user.email);
          await sendWelcomeEmail(user.email);
        } catch (e) {
          console.error('Payment email failed (NOW):', e.message);
        }
      }
    }

    res.json({
      status: payment.payment_status,
      payment_id: payment.payment_id,
    });
  } catch (err) {
    console.error('NOWPayments status check error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Status check failed' });
  }
});

module.exports = router;
