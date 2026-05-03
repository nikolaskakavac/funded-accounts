const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Plan = require('../models/Plan');
const AffiliateCommission = require('../models/AffiliateCommission');
const ReservedAffiliateCode = require('../models/ReservedAffiliateCode');
const authMiddleware = require('../utils/authMiddleware');
const {
  createAffiliateCommissionFromTransaction,
  normalizeAffiliateCode,
  isValidAffiliateCode,
  syncPendingReferralsForCode,
} = require('../utils/affiliate');
const { normalizePlanObject } = require('../utils/planDisplay');

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

    res.json(txs.map((tx) => ({
      ...tx.toObject(),
      plan: normalizePlanObject(tx.plan?.toObject ? tx.plan.toObject() : tx.plan),
    })));
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

router.get('/affiliate/commissions', async (req, res) => {
  try {
    const commissions = await AffiliateCommission.find({})
      .populate('affiliateUser', 'email affiliateCode affiliatePayoutMethod affiliatePayoutDetails affiliatePayoutNotes')
      .populate('referredUser', 'email')
      .populate('plan', 'name')
      .populate('transaction', 'provider createdAt')
      .sort({ createdAt: -1 });

    res.json(commissions.map((item) => ({
      ...item.toObject(),
      plan: normalizePlanObject(item.plan?.toObject ? item.plan.toObject() : item.plan),
    })));
  } catch (err) {
    console.error('Admin affiliate commissions error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/affiliate/commissions/:id', async (req, res) => {
  try {
    const { status, notes } = req.body || {};
    const update = {};

    if (status) {
      update.status = status;
      update.paidAt = status === 'paid' ? new Date() : null;
    }
    if (notes !== undefined) {
      update.notes = String(notes || '').trim();
    }

    const commission = await AffiliateCommission.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    )
      .populate('affiliateUser', 'email affiliateCode affiliatePayoutMethod affiliatePayoutDetails affiliatePayoutNotes')
      .populate('referredUser', 'email')
      .populate('plan', 'name')
      .populate('transaction', 'provider createdAt');

    if (!commission) {
      return res.status(404).json({ message: 'Affiliate commission not found' });
    }

    res.json({
      ...commission.toObject(),
      plan: normalizePlanObject(commission.plan?.toObject ? commission.plan.toObject() : commission.plan),
    });
  } catch (err) {
    console.error('Admin affiliate update error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/affiliate/custom-code', async (req, res) => {
  try {
    const { email, code } = req.body || {};
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedCode = normalizeAffiliateCode(code);

    if (!normalizedEmail || !normalizedCode) {
      return res.status(400).json({ message: 'Email and code are required' });
    }

    if (!isValidAffiliateCode(normalizedCode)) {
      return res.status(400).json({
        message: 'Code must be 3-24 characters and use only letters, numbers, underscores, or hyphens',
      });
    }

    const user = await User.findOne({ email: normalizedEmail });
    const existing = await User.findOne({ affiliateCode: normalizedCode }).select('_id email affiliateCode');
    if (existing && String(existing.email).toLowerCase() !== normalizedEmail) {
      return res.status(409).json({ message: 'Affiliate code is already in use' });
    }

    const existingReservation = await ReservedAffiliateCode.findOne({ affiliateCode: normalizedCode })
      .select('_id email affiliateCode');
    if (existingReservation && String(existingReservation.email).toLowerCase() !== normalizedEmail) {
      return res.status(409).json({ message: 'Affiliate code is already reserved for another email' });
    }

    const reservation = await ReservedAffiliateCode.findOneAndUpdate(
      { email: normalizedEmail },
      {
        email: normalizedEmail,
        affiliateCode: normalizedCode,
        claimedByUser: user?._id || null,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (user) {
      user.affiliateCode = normalizedCode;
      await user.save();
      await syncPendingReferralsForCode(user, normalizedCode);
    }

    res.json({
      success: true,
      target: user ? 'user' : 'reservation',
      user: user
        ? {
            id: user._id,
            email: user.email,
            affiliateCode: user.affiliateCode,
          }
        : null,
      reservation: {
        id: reservation._id,
        email: reservation.email,
        affiliateCode: reservation.affiliateCode,
      },
    });
  } catch (err) {
    console.error('Admin custom affiliate code error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/affiliate/test-commission', async (req, res) => {
  try {
    const {
      referredEmail,
      planId,
      provider = 'stripe',
      amount,
    } = req.body || {};

    if (!referredEmail) {
      return res.status(400).json({ message: 'referredEmail is required' });
    }

    const normalizedEmail = String(referredEmail).trim().toLowerCase();
    const referredUser = await User.findOne({ email: normalizedEmail });
    if (!referredUser) {
      return res.status(404).json({ message: 'Referred user not found' });
    }

    if (!referredUser.referredBy) {
      return res.status(400).json({ message: 'This user is not linked to any affiliate' });
    }

    const plan =
      (planId ? await Plan.findById(planId) : null) ||
      (await Plan.findOne({ price: 150 })) ||
      (await Plan.findOne().sort({ price: 1 }));

    if (!plan) {
      return res.status(404).json({ message: 'No plan found for affiliate test' });
    }

    const finalAmount = Number.isFinite(Number(amount)) && Number(amount) > 0
      ? Number(amount)
      : Number(plan.price) || 150;

    const tx = await Transaction.create({
      user: referredUser._id,
      plan: plan._id,
      provider: provider === 'nowpayments' ? 'nowpayments' : 'stripe',
      providerPaymentId: `affiliate_test_${Date.now()}`,
      amount: finalAmount,
      currency: plan.currency || 'eur',
      status: 'paid',
      active: true,
    });

    referredUser.currentPlan = plan._id;
    await referredUser.save();

    const commission = await createAffiliateCommissionFromTransaction(tx);

    res.json({
      success: true,
      transactionId: tx._id,
      commission,
      message: 'Affiliate test commission created',
    });
  } catch (err) {
    console.error('Admin affiliate test commission error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
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
    const plan = await Plan.findOne({ price: 300 });
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
