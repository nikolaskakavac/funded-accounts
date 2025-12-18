const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    user.lastActiveAt = new Date();
    await user.save();

    // Ovde stavljamo samo ono što nam treba na req.user
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
