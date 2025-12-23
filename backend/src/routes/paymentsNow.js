const express = require('express');
const axios = require('axios');
const Plan = require('../models/Plan');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../utils/authMiddleware');

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
      ipn_callback_url: `${BACKEND_URL}/webhooks/now/ipn`,
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

module.exports = router;
