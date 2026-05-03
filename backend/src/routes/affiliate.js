const express = require('express');
const authMiddleware = require('../utils/authMiddleware');
const User = require('../models/User');
const AffiliateCommission = require('../models/AffiliateCommission');
const ReservedAffiliateCode = require('../models/ReservedAffiliateCode');
const { ensureAffiliateCode, normalizeAffiliateCode } = require('../utils/affiliate');

const router = express.Router();

function buildAffiliateLink(code) {
  const frontendUrl = process.env.FRONTEND_URL || 'https://arbexfund.com';
  return `${frontendUrl}/?ref=${encodeURIComponent(code)}`;
}

router.get('/resolve/:code', async (req, res) => {
  try {
    const code = normalizeAffiliateCode(req.params.code);
    if (!code) {
      return res.status(400).json({ valid: false, message: 'Referral code is required' });
    }

    const user = await User.findOne({ affiliateCode: code }).select('_id affiliateCode email').lean();
    const reservation = user
      ? null
      : await ReservedAffiliateCode.findOne({ affiliateCode: code }).select('_id affiliateCode email').lean();

    if (!user && !reservation) {
      return res.status(404).json({ valid: false, message: 'Referral code not found' });
    }

    res.json({
      valid: true,
      code: user?.affiliateCode || reservation?.affiliateCode || code,
      reserved: !user,
    });
  } catch (err) {
    res.status(500).json({ valid: false, message: 'Failed to validate referral code' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      'email affiliateCode affiliatePayoutMethod affiliatePayoutDetails affiliatePayoutNotes'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const affiliateCode = await ensureAffiliateCode(user);
    const referredUsers = await User.find({ referredBy: user._id })
      .select('email createdAt currentPlan')
      .sort({ createdAt: -1 })
      .lean();

    const commissions = await AffiliateCommission.find({ affiliateUser: user._id })
      .populate('referredUser', 'email createdAt')
      .populate('plan', 'name')
      .sort({ createdAt: -1 })
      .lean();

    const totals = commissions.reduce(
      (acc, item) => {
        acc.total += Number(item.commissionAmount) || 0;
        if (item.status === 'paid') {
          acc.paid += Number(item.commissionAmount) || 0;
        } else {
          acc.pending += Number(item.commissionAmount) || 0;
        }
        return acc;
      },
      { total: 0, paid: 0, pending: 0 }
    );

    res.json({
      affiliateCode,
      affiliateLink: buildAffiliateLink(affiliateCode),
      payoutMethod: user.affiliatePayoutMethod || 'none',
      payoutDetails: user.affiliatePayoutDetails || '',
      payoutNotes: user.affiliatePayoutNotes || '',
      stats: {
        registrations: referredUsers.length,
        purchases: commissions.length,
        totalCommission: Number(totals.total.toFixed(2)),
        pendingCommission: Number(totals.pending.toFixed(2)),
        paidCommission: Number(totals.paid.toFixed(2)),
      },
      referrals: referredUsers.map((item) => ({
        id: item._id,
        email: item.email,
        registeredAt: item.createdAt,
        hasPlan: !!item.currentPlan,
      })),
      commissions: commissions.map((item) => ({
        id: item._id,
        referredEmail: item.referredUser?.email || '',
        planName: item.plan?.name || '',
        amount: item.amount,
        commissionAmount: item.commissionAmount,
        currency: item.currency || 'eur',
        status: item.status,
        createdAt: item.createdAt,
        paidAt: item.paidAt,
        notes: item.notes || '',
      })),
    });
  } catch (err) {
    console.error('Affiliate me error:', err);
    res.status(500).json({ message: 'Failed to load affiliate dashboard' });
  }
});

router.post('/payout-details', authMiddleware, async (req, res) => {
  try {
    const { payoutMethod = 'none', payoutDetails = '', payoutNotes = '' } = req.body || {};
    const allowedMethods = new Set(['none', 'bank', 'crypto']);
    if (!allowedMethods.has(payoutMethod)) {
      return res.status(400).json({ message: 'Invalid payout method' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await ensureAffiliateCode(user);
    user.affiliatePayoutMethod = payoutMethod;
    user.affiliatePayoutDetails = String(payoutDetails || '').trim();
    user.affiliatePayoutNotes = String(payoutNotes || '').trim();
    await user.save();

    res.json({
      success: true,
      payoutMethod: user.affiliatePayoutMethod,
      payoutDetails: user.affiliatePayoutDetails,
      payoutNotes: user.affiliatePayoutNotes,
    });
  } catch (err) {
    console.error('Affiliate payout update error:', err);
    res.status(500).json({ message: 'Failed to update payout details' });
  }
});

module.exports = router;
