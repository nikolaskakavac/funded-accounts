const User = require('../models/User');
const AffiliateCommission = require('../models/AffiliateCommission');
const Transaction = require('../models/Transaction');
const ReservedAffiliateCode = require('../models/ReservedAffiliateCode');

function normalizeAffiliateCode(code) {
  return String(code || '').trim().toUpperCase();
}

function isValidAffiliateCode(code) {
  const normalized = normalizeAffiliateCode(code);
  return normalized.length >= 3 && normalized.length <= 24 && /^[A-Z0-9_-]+$/.test(normalized);
}

function generateAffiliateCodeFromUser(user) {
  const emailPart = String(user.email || 'ARBEX')
    .split('@')[0]
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, 6) || 'ARBEX';

  const idPart = String(user._id || '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(-6);

  return `${emailPart}${idPart}`.slice(0, 12);
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

async function syncPendingReferralsForCode(user, code) {
  const normalizedCode = normalizeAffiliateCode(code);
  if (!user?._id || !normalizedCode) {
    return;
  }

  const pendingUsers = await User.find({
    _id: { $ne: user._id },
    referredBy: null,
    referredByCode: normalizedCode,
  }).select('_id');

  if (!pendingUsers.length) {
    return;
  }

  const pendingUserIds = pendingUsers.map((item) => item._id);

  await User.updateMany(
    {
      _id: { $in: pendingUserIds },
    },
    {
      $set: { referredBy: user._id },
    }
  );

  const paidTransactions = await Transaction.find({
    user: { $in: pendingUserIds },
    status: 'paid',
  });

  for (const tx of paidTransactions) {
    await createAffiliateCommissionFromTransaction(tx);
  }
}

async function claimReservedAffiliateCode(user) {
  const email = normalizeEmail(user?.email);
  if (!email) {
    return '';
  }

  const reservation = await ReservedAffiliateCode.findOne({ email });
  if (!reservation?.affiliateCode) {
    return '';
  }

  const reservedCode = normalizeAffiliateCode(reservation.affiliateCode);
  if (!reservedCode) {
    return '';
  }

  const existingUser = await User.findOne({ affiliateCode: reservedCode }).select('_id').lean();
  if (existingUser && String(existingUser._id) !== String(user._id)) {
    return '';
  }

  if (user.affiliateCode !== reservedCode) {
    user.affiliateCode = reservedCode;
    await user.save();
  }

  reservation.claimedByUser = user._id;
  await reservation.save();
  await syncPendingReferralsForCode(user, reservedCode);

  return reservedCode;
}

async function ensureAffiliateCode(user) {
  if (user.affiliateCode) {
    return user.affiliateCode;
  }

  const reservedCode = await claimReservedAffiliateCode(user);
  if (reservedCode) {
    return reservedCode;
  }

  let attempt = 0;
  while (attempt < 5) {
    const baseCode = generateAffiliateCodeFromUser(user);
    const candidate = attempt === 0 ? baseCode : `${baseCode}${attempt}`.slice(0, 12);
    const existing = await User.findOne({ affiliateCode: candidate }).select('_id').lean();
    if (!existing || String(existing._id) === String(user._id)) {
      user.affiliateCode = candidate;
      await user.save();
      return candidate;
    }
    attempt += 1;
  }

  const fallback = `ARBEX${String(user._id).slice(-6).toUpperCase()}`;
  user.affiliateCode = fallback;
  await user.save();
  return fallback;
}

async function assignReferralToUser(user, referralCode) {
  const normalizedCode = normalizeAffiliateCode(referralCode);
  if (!normalizedCode || user.referredBy) {
    return user;
  }

  const affiliateUser = await User.findOne({ affiliateCode: normalizedCode });
  if (!affiliateUser || String(affiliateUser._id) === String(user._id)) {
    const reserved = await ReservedAffiliateCode.findOne({ affiliateCode: normalizedCode }).select('email').lean();
    if (!reserved || normalizeEmail(reserved.email) === normalizeEmail(user.email)) {
      return user;
    }

    user.referredByCode = normalizedCode;
    await user.save();
    return user;
  }

  user.referredBy = affiliateUser._id;
  user.referredByCode = normalizedCode;
  await user.save();
  return user;
}

async function createAffiliateCommissionFromTransaction(tx) {
  if (!tx || tx.status !== 'paid') {
    return null;
  }

  const populatedTx = tx.user?.email
    ? tx
      : await tx.populate([
        { path: 'user', select: 'email referredBy affiliateCode' },
        { path: 'plan', select: 'name price' },
      ]);

  const referredUser = populatedTx.user;
  if (!referredUser?.referredBy) {
    return null;
  }

  const existing = await AffiliateCommission.findOne({ transaction: populatedTx._id }).lean();
  if (existing) {
    return existing;
  }

  const amount = Number(populatedTx.amount) || 0;
  if (amount <= 0) {
    return null;
  }

  const commissionAmount = Number((amount * 0.3).toFixed(2));

  try {
    return await AffiliateCommission.create({
      affiliateUser: referredUser.referredBy,
      referredUser: referredUser._id,
      transaction: populatedTx._id,
      plan: populatedTx.plan?._id || populatedTx.plan,
      amount,
      commissionAmount,
      commissionRate: 0.3,
      currency: populatedTx.currency || 'eur',
      status: 'pending',
    });
  } catch (err) {
    if (err?.code === 11000) {
      return AffiliateCommission.findOne({ transaction: populatedTx._id });
    }
    throw err;
  }
}

module.exports = {
  normalizeAffiliateCode,
  isValidAffiliateCode,
  ensureAffiliateCode,
  assignReferralToUser,
  createAffiliateCommissionFromTransaction,
  claimReservedAffiliateCode,
  syncPendingReferralsForCode,
};
