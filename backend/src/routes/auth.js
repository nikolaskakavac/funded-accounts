const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Plan = require('../models/Plan');
const authMiddleware = require('../utils/authMiddleware');
const { sendEmailVerification, sendEmailVerificationCode, sendPasswordResetCode } = require('../utils/mailer');
const { assignReferralToUser, ensureAffiliateCode, claimReservedAffiliateCode } = require('../utils/affiliate');
const { normalizePlanObject } = require('../utils/planDisplay');

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://arbexfund.com';
const EMAIL_VERIFICATION_BYPASS = new Set(['nesto@gmail.com', 'kostakurtes1@gmail.com']);

function hashVerificationToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function createSixDigitCode() {
  return String(crypto.randomInt(100000, 1000000));
}

function buildAuthPayload(user) {
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      currentPlan: user.currentPlan,
      emailVerified: user.emailVerified !== false,
      affiliateCode: user.affiliateCode || '',
      referredByCode: user.referredByCode || '',
    },
  };
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function shouldBypassEmailVerification(email) {
  return EMAIL_VERIFICATION_BYPASS.has(normalizeEmail(email));
}

function hasActiveVerificationCode(user) {
  return Boolean(
    user.emailVerificationTokenHash &&
    user.emailVerificationExpires &&
    user.emailVerificationExpires > new Date()
  );
}

function shouldReuseVerificationCode(user) {
  if (!hasActiveVerificationCode(user)) return false;

  const codeLifetimeMs = 15 * 60 * 1000;
  const resendCooldownMs = 60 * 1000;
  const issuedAtMs = user.emailVerificationExpires.getTime() - codeLifetimeMs;

  return Date.now() - issuedAtMs < resendCooldownMs;
}

async function sendVerificationEmail(user) {
  const verificationCode = createSixDigitCode();
  user.emailVerificationTokenHash = hashVerificationToken(verificationCode);
  user.emailVerificationExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  await sendEmailVerificationCode(user.email, verificationCode);
}

// POST /auth/register
router.post('/register', async (req, res) => {
  const { password, firstName = '', lastName = '', referralCode = '' } = req.body;
  const email = normalizeEmail(req.body.email);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      if (shouldBypassEmailVerification(email)) {
        existing.passwordHash = await bcrypt.hash(password, 10);
        existing.firstName = firstName;
        existing.lastName = lastName;
        existing.emailVerified = true;
        existing.emailVerificationTokenHash = '';
        existing.emailVerificationExpires = null;
        await claimReservedAffiliateCode(existing);
        await ensureAffiliateCode(existing);
        await assignReferralToUser(existing, referralCode);
        await existing.save();
        return res.json(buildAuthPayload(existing));
      }

      if (existing.emailVerified === false) {
        if (!shouldReuseVerificationCode(existing)) {
          existing.passwordHash = await bcrypt.hash(password, 10);
          existing.firstName = firstName;
          existing.lastName = lastName;
          await claimReservedAffiliateCode(existing);
          await sendVerificationEmail(existing);
        }

        return res.json({
          needsVerification: true,
          message: 'Check your email to confirm your account.',
          user: {
            id: existing._id,
            email: existing.email,
            role: existing.role,
            currentPlan: existing.currentPlan,
            emailVerified: existing.emailVerified,
          },
        });
      }

      return res.status(400).json({ message: 'Email adresa već postoji' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
      emailVerified: shouldBypassEmailVerification(email),
    });
    await claimReservedAffiliateCode(user);
    await ensureAffiliateCode(user);
    await assignReferralToUser(user, referralCode);

    if (shouldBypassEmailVerification(email)) {
      return res.json(buildAuthPayload(user));
    }

    await sendVerificationEmail(user);

    res.json({
      needsVerification: true,
      message: 'Check your email to confirm your account.',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        currentPlan: user.currentPlan,
        emailVerified: user.emailVerified,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: err.message });
  }
});

// GET /auth/verify-email?token=...
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ message: 'Verification token is missing' });
  }

  try {
    const tokenHash = hashVerificationToken(String(token));
    const user = await User.findOne({
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Verification link is invalid or expired' });
    }

    user.emailVerified = true;
    user.emailVerificationTokenHash = '';
    user.emailVerificationExpires = null;
    await user.save();

    res.json({ success: true, message: 'Email confirmed successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying email', error: err.message });
  }
});

// POST /auth/verify-email-code
router.post('/verify-email-code', async (req, res) => {
  const { code } = req.body;
  const email = normalizeEmail(req.body.email);
  if (!email || !code) {
    return res.status(400).json({ message: 'Email and confirmation code are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid confirmation code' });
    }

    const codeHash = hashVerificationToken(String(code).trim());
    const codeIsValid =
      user.emailVerificationTokenHash === codeHash &&
      user.emailVerificationExpires &&
      user.emailVerificationExpires > new Date();

    if (!codeIsValid) {
      return res.status(400).json({ message: 'Invalid or expired confirmation code' });
    }

    user.emailVerified = true;
    user.emailVerificationTokenHash = '';
    user.emailVerificationExpires = null;
    await user.save();

    res.json(buildAuthPayload(user));
  } catch (err) {
    res.status(500).json({ message: 'Error confirming email', error: err.message });
  }
});

// POST /auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      const resetCode = createSixDigitCode();
      user.passwordResetTokenHash = hashVerificationToken(resetCode);
      user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
      await user.save();
      await sendPasswordResetCode(user.email, resetCode);
    }

    res.json({ success: true, message: 'If that email exists, a reset code has been sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Error requesting password reset', error: err.message });
  }
});

// POST /auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { code, password } = req.body;
  const email = normalizeEmail(req.body.email);
  if (!email || !code || !password) {
    return res.status(400).json({ message: 'Email, code, and new password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    const codeHash = hashVerificationToken(String(code).trim());
    const codeIsValid =
      user.passwordResetTokenHash === codeHash &&
      user.passwordResetExpires &&
      user.passwordResetExpires > new Date();

    if (!codeIsValid) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.passwordResetTokenHash = '';
    user.passwordResetExpires = null;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { password } = req.body;
  const email = normalizeEmail(req.body.email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Neispravan email ili lozinka' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).json({ message: 'Neispravan email ili lozinka' });
    }

    if (user.emailVerified === false) {
      return res.status(403).json({
        message: 'Please confirm your email before logging in.',
        needsVerification: true,
      });
    }

    res.json(buildAuthPayload(user));
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error logging in', error: err.message });
  }
});

// GET /auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('currentPlan', 'name balance price currency')
      .populate('referredBy', 'email affiliateCode')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        role: user.role,
        currentPlan: user.currentPlan ? normalizePlanObject(user.currentPlan) : null,
        emailVerified: user.emailVerified !== false,
        affiliateCode: user.affiliateCode || '',
        referredByCode: user.referredByCode || '',
        referredBy: user.referredBy
          ? {
              id: user.referredBy._id,
              email: user.referredBy.email,
              affiliateCode: user.referredBy.affiliateCode,
            }
          : null,
      },
    });
  } catch (err) {
    console.error('GET /auth/me error:', err);
    res
      .status(500)
      .json({ message: 'Error loading profile', error: err.message });
  }
});

module.exports = router;
