const mongoose = require('mongoose');

const affiliateCommissionSchema = new mongoose.Schema(
  {
    affiliateUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true, unique: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    amount: { type: Number, required: true },
    commissionRate: { type: Number, default: 0.3 },
    commissionAmount: { type: Number, required: true },
    currency: { type: String, default: 'eur' },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    paidAt: { type: Date, default: null },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AffiliateCommission', affiliateCommissionSchema);
