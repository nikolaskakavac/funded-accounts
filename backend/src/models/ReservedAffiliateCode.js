const mongoose = require('mongoose');

const reservedAffiliateCodeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    affiliateCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    claimedByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ReservedAffiliateCode', reservedAffiliateCodeSchema);
