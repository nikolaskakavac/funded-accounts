const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    provider: { type: String, enum: ['stripe', 'nowpayments'], required: true },
    providerPaymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    active: { type: Boolean, default: false },
    accountSent: { type: Boolean, default: false },
    expiresAt: { type: Date },
    phone: { type: String },
    cashoutStatus: { type: String, enum: ['none', 'pending', 'done'], default: 'none' },
    cashoutRequestedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
