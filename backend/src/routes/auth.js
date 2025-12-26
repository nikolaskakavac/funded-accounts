const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Plan = require('../models/Plan');
const authMiddleware = require('../utils/authMiddleware');
const { sendWelcomeEmail } = require('../utils/mailer');

const router = express.Router();

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, firstName = '', lastName = '' } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email adresa već postoji' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, firstName, lastName });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // slanje welcome email-a (ne blokira registraciju ako pukne)
    try {
      console.log('Sending welcome email to', user.email);
      await sendWelcomeEmail(user.email);
    } catch (e) {
      console.error('Welcome email failed:', e.message);
    }

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        currentPlan: user.currentPlan,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: err.message });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Neispravan email ili lozinka' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).json({ message: 'Neispravan email ili lozinka' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        currentPlan: user.currentPlan,
      },
    });
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
        currentPlan: user.currentPlan || null,
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
