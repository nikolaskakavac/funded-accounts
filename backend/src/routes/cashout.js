const express = require('express');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

async function findActivePaidTx(userId) {
  return Transaction.findOne({ user: userId, status: 'paid', active: true })
    .sort({ createdAt: -1 })
    .populate('plan', 'name');
}

// GET /cashout/me -> latest cashout status for the active plan
router.get('/me', async (req, res) => {
  try {
    const tx = await findActivePaidTx(req.user.id);
    if (!tx) return res.json({ status: 'none', requestedAt: null, transactionId: null });

    res.json({
      status: tx.cashoutStatus || 'none',
      requestedAt: tx.cashoutRequestedAt || null,
      transactionId: tx._id,
      planName: tx.plan?.name || '',
    });
  } catch (err) {
    console.error('Cashout status error:', err.message);
    res.status(500).json({ message: 'Cashout status error' });
  }
});

// POST /cashout/request -> user requests cash out
router.post('/request', async (req, res) => {
  try {
    const tx = await findActivePaidTx(req.user.id);
    if (!tx) {
      return res.status(404).json({ message: 'No active paid plan found' });
    }

    tx.cashoutStatus = 'pending';
    tx.cashoutRequestedAt = new Date();
    await tx.save();

    res.json({
      status: tx.cashoutStatus,
      requestedAt: tx.cashoutRequestedAt,
      transactionId: tx._id,
    });
  } catch (err) {
    console.error('Cashout request error:', err.message);
    res.status(500).json({ message: 'Cashout request error' });
  }
});

module.exports = router;
