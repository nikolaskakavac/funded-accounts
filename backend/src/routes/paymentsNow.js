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

// Simple retry helper to absorb transient 429s from NOWPayments
async function npRequestWithRetry(makeRequest, retries = 1, backoffMs = 1200) {
  try {
    return await makeRequest();
  } catch (err) {
    const status = err?.response?.status;
    if (status === 429 && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      return npRequestWithRetry(makeRequest, retries - 1, backoffMs);
    }
    throw err;
  }
}

async function estimatePayAmount(payCurrency, priceAmount) {
  try {
    const res = await npRequestWithRetry(() =>
      axios.post(
        `${NOW_API_BASE}/estimate`,
        {
          amount: priceAmount,
          currency_from: 'eur',
          currency_to: payCurrency,
        },
        {
          headers: {
            'x-api-key': process.env.NOWPAYMENTS_API_KEY,
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    return res.data?.estimated_amount || null;
  } catch (e) {
    console.error('NOWPayments estimate failed:', e.response?.data || e.message);
    return null;
  }
}

// Plan pricing overrides by payment method (EUR)
const planPricing = {
  '693db3e0e9cf589519c144fe': { stripe: 300, crypto: 300 }, // 10k
  '693db3ede9cf589519c14500': { stripe: 600, crypto: 600 }, // 20k
};

// Allowed crypto coins and mapping to NOWPayments codes
const ALLOWED_PAY_CURRENCIES = ['usdt', 'usdc', 'eth'];
const PAY_CURRENCY_MAP = {
  usdt: 'usdt', // Tether USDT
  usdc: 'usdc',  // USD Coin
  eth: 'eth',    // Ethereum
};

function normalizePayCurrency(cur) {
  if (!cur) return null;
  const key = String(cur).toLowerCase();
  const mapped = PAY_CURRENCY_MAP[key];
  if (!mapped) return null;
  return ALLOWED_PAY_CURRENCIES.includes(mapped) ? mapped : null;
}

const getCryptoAmount = (planId, fallbackPrice) => {
  const p = planPricing[planId]?.crypto;
  return p ? p : fallbackPrice;
};

router.post('/create', authMiddleware, async (req, res) => {
  const { planId, pay_currency } = req.body;
  const normalizedPayCurrency = normalizePayCurrency(pay_currency);
  if (!normalizedPayCurrency) {
    return res.status(400).json({
      message: 'Unsupported crypto coin. Allowed: usdt, usdc, eth.',
    });
  }

  try {
    console.log('NOW create user:', req.user);
    console.log('NOW create headers:', req.headers.authorization);

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const userId = req.user?.id; // ako auth radi, ovo je setovano

    const price = getCryptoAmount(plan._id.toString(), plan.price);

    const payload = {
      price_amount: price,
      price_currency: 'eur',
      pay_currency: normalizedPayCurrency,
      ipn_callback_url: `${BACKEND_URL}/webhooks/now/ipn`,
      order_id: `${userId || 'unknown'}-${plan._id}-${Date.now()}`,
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    };

    console.log('NOWPayments payload:', payload);

    const response = await npRequestWithRetry(() =>
      axios.post(`${NOW_API_BASE}/payment`, payload, {
        headers: {
          'x-api-key': process.env.NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json',
        },
      }),
    );

    const payment = response.data;
    console.log('NOWPayments response:', payment);
    console.log('Invoice URL:', payment.invoice_url);

    let payAmount = payment.pay_amount;
    if (!payAmount) {
      payAmount = await estimatePayAmount(payload.pay_currency, price);
      console.log('Estimated amount for', payload.pay_currency, '=>', payAmount);
    }

    const payCurrency = payment.pay_currency || payload.pay_currency;

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
      amount: price,
      currency: 'eur',
      status: 'pending',
    });

    res.json({
      payment_id: payment.payment_id,
      pay_address: payment.pay_address,
      pay_amount: payAmount,
      pay_currency: payCurrency,
      invoice_url: payment.invoice_url || `https://nowpayments.io/payment/?iid=${payment.payment_id}`,
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const detail = err.response?.data || err.message;
    console.error('NOWPayments create error:', status, detail);

    return res.status(status).json({
      message: err.response?.data?.message || 'NOWPayments error',
      detail,
    });
  }
});

// Status check endpoint
router.get('/status/:paymentId', authMiddleware, async (req, res) => {
  const { paymentId } = req.params;

  try {
    const response = await npRequestWithRetry(() =>
      axios.get(`${NOW_API_BASE}/payment/${paymentId}`, {
        headers: {
          'x-api-key': process.env.NOWPAYMENTS_API_KEY,
        },
      }),
    );

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
