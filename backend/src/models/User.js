const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  currentPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', default: null },
  affiliateCode: { type: String, unique: true, sparse: true, uppercase: true, trim: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  referredByCode: { type: String, default: '', uppercase: true, trim: true },
  affiliatePayoutMethod: {
    type: String,
    enum: ['none', 'bank', 'crypto'],
    default: 'none',
  },
  affiliatePayoutDetails: { type: String, default: '' },
  affiliatePayoutNotes: { type: String, default: '' },
  emailVerified: { type: Boolean, default: false },
  emailVerificationTokenHash: { type: String, default: '' },
  emailVerificationExpires: { type: Date, default: null },
  passwordResetTokenHash: { type: String, default: '' },
  passwordResetExpires: { type: Date, default: null },
  lastActiveAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
