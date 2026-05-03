const User = require('../models/User');
const ReservedAffiliateCode = require('../models/ReservedAffiliateCode');
const { normalizeAffiliateCode } = require('./affiliate');

const CHECKOUT_DISCOUNT_RATE = 0.05;

async function resolveCheckoutDiscountCode(rawCode) {
  const code = normalizeAffiliateCode(rawCode);
  if (!code) {
    return { valid: false, code: '' };
  }

  const user = await User.findOne({ affiliateCode: code }).select('_id').lean();
  if (user) {
    return { valid: true, code, reserved: false };
  }

  const reservation = await ReservedAffiliateCode.findOne({ affiliateCode: code }).select('_id').lean();
  if (reservation) {
    return { valid: true, code, reserved: true };
  }

  return { valid: false, code };
}

function applyCheckoutDiscount(amount, isDiscountApplied) {
  const numericAmount = Number(amount) || 0;
  if (!isDiscountApplied) {
    return Number(numericAmount.toFixed(2));
  }

  return Number((numericAmount * (1 - CHECKOUT_DISCOUNT_RATE)).toFixed(2));
}

module.exports = {
  CHECKOUT_DISCOUNT_RATE,
  resolveCheckoutDiscountCode,
  applyCheckoutDiscount,
};
