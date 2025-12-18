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
      .populate('user', 'email name')
      .populate('plan', 'name price')
      .sort({ createdAt: -1 });

    res.json(txs);
  } catch (err) {
    console.error('Admin transactions error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/admin/transactions/:id - update active / accountSent / expiresAt
router.patch('/transactions/:id', async (req, res) => {
  try {
    const { active, accountSent, expiresAt } = req.body;

    const update = {};
    if (typeof active === 'boolean') update.active = active;
    if (typeof accountSent === 'boolean') update.accountSent = accountSent;
    if (expiresAt) update.expiresAt = expiresAt;

    const tx = await Transaction.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!tx) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(tx);
  } catch (err) {
    console.error('Admin update transaction error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
