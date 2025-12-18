const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },        // npr. Starter 10K, Pro 25K
  balance: { type: String },                     // npr. '$10,000'
  description: { type: String },
  price: { type: Number, required: true },       // npr. 199, 399...
  currency: { type: String, default: 'usd' },
  stripePriceId: { type: String, required: true }, // price_xxx iz Stripe-a
  nowMeta: { type: Object },                     // za NOWPayments ako treba
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plan', planSchema);
