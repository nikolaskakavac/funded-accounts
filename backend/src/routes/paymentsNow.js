const express = require('express');
const axios = require('axios');
const Plan = require('../models/Plan');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// čitaš base URL iz .env, pada na prod URL ako nije setovano
const NOW_API_BASE = process.env.NOWPAYMENTS_BASE_URL || 'https://api.nowpayments.io/v1';

// POST /payments/now/create
router.post('/create', authMiddleware, async (req, res) => {
  const { planId, pay_currency } = req.body; // npr. "btc" ili "usdttrc20"

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const payload = {
      price_amount: plan.price,
      price_currency: plan.currency || 'usd',
      pay_currency: (pay_currency || 'btc').toLowerCase(),
      ipn_callback_url: 'http://localhost:4000/webhooks/now/ipn',
      order_id: `${req.user._id}-${plan._id}-${Date.now()}`,
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    };

    console.log('NOWPayments payload:', payload);

    const response = await axios.post(`${NOW_API_BASE}/payment`, payload, {
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY, // 79KZAN6-...
        'Content-Type': 'application/json',
      },
    });

    const payment = response.data;
    console.log('NOWPayments response:', payment);

    await Transaction.create({
      user: req.user._id,
      plan: plan._id,
      provider: 'nowpayments',
      providerPaymentId: String(payment.payment_id),
      amount: plan.price,
      currency: plan.currency || 'usd',
      status: 'pending',
    });

    // front koristi ova polja
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
      err.response?.data || err.message
    );
    return res
      .status(500)
      .json({ message: 'NOWPayments error', detail: err.response?.data || err.message });
  }
});

module.exports = router;
