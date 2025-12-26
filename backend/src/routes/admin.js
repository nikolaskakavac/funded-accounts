const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Plan = require('../models/Plan');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// Svi /api/admin/* zahtevi prolaze kroz auth
router.use(authMiddleware);
router.use((req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
});

// GET /api/admin/transactions - lista plaćenih transakcija
router.get('/transactions', async (req, res) => {
  try {
    const txs = await Transaction.find({ status: 'paid' })
      .populate('user', 'email name phone')
      .populate('plan', 'name price balance')
      .sort({ createdAt: -1 });

    res.json(txs);
  } catch (err) {
    console.error('Admin transactions error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/admin/transactions/:id - update active / accountSent / expiresAt / cashout
router.patch('/transactions/:id', async (req, res) => {
  try {
    const { active, accountSent, expiresAt, cashoutStatus, cashoutRequestedAt } = req.body;

    const update = {};
    if (typeof active === 'boolean') update.active = active;
    if (typeof accountSent === 'boolean') update.accountSent = accountSent;
    if (expiresAt) update.expiresAt = expiresAt;
    if (cashoutStatus) update.cashoutStatus = cashoutStatus;
    if (cashoutRequestedAt !== undefined) update.cashoutRequestedAt = cashoutRequestedAt;

    // apdejtuj transakciju i odma povuci user + plan
    const tx = await Transaction.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    ).populate('user plan');

    if (!tx) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // ako je admin DEAKTIVIRAO ovu transakciju → skini plan sa usera
    if (typeof active === 'boolean' && active === false) {
      if (tx.user && tx.user.currentPlan) {
        if (tx.plan && tx.user.currentPlan.toString() === tx.plan._id.toString()) {
          tx.user.currentPlan = null;
          await tx.user.save();
          console.log('Admin: plan removed from user', tx.user.email);
        }
      }
    }

    // ako je admin AKTIVIRAO ovu transakciju → dodeli plan useru
    if (typeof active === 'boolean' && active === true) {
      if (tx.user && tx.plan) {
        tx.user.currentPlan = tx.plan._id;
        await tx.user.save();
        console.log('Admin: plan set for user', tx.user.email);
      }
    }

    res.json(tx);
  } catch (err) {
    console.error('Admin update transaction error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// TEST ENDPOINT - kreiraj test transakciju
router.post('/test-transaction', async (req, res) => {
  try {
    // Nađi ili kreiraj test usera
    let user = await User.findOne({ email: 'test@test.com' });
    if (!user) {
      user = await User.create({
        email: 'test@test.com',
        password: 'hashedpassword',
        name: 'Test User',
        phone: '+381640000000',
      });
    }

    // Nađi plan
    const plan = await Plan.findOne({ name: 'Nalog sa 10.000€' });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Kreiraj test transakciju
    const tx = await Transaction.create({
      user: user._id,
      plan: plan._id,
      provider: 'stripe',
      providerPaymentId: 'pi_test_' + Date.now(),
      amount: 300,
      currency: 'eur',
      status: 'paid',
      active: true,
      phone: user.phone,
    });

    // Postavi plan na usera
    user.currentPlan = plan._id;
    await user.save();

    console.log('✅ Test transaction created');
    res.json({ message: 'Test transaction created', tx });
  } catch (err) {
    console.error('Test transaction error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
