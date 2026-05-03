function getEnglishPlanName(planLike) {
  const price = Number(planLike?.price);
  const balanceRaw = planLike?.balance;
  const balance =
    typeof balanceRaw === 'number'
      ? balanceRaw
      : Number(String(balanceRaw || '').replace(/[^\d]/g, ''));

  if (price === 150 || balance === 5000) {
    return 'INSTANT FUNDED ACCOUNT WITH 5.000€';
  }
  if (price === 300 || balance === 10000) {
    return 'INSTANT FUNDED ACCOUNT WITH 10.000€';
  }
  if (price === 800 || balance === 25000) {
    return 'INSTANT FUNDED ACCOUNT WITH 25.000€';
  }

  const name = String(planLike?.name || '').trim();
  if (/^nalog sa/i.test(name)) {
    return name
      .replace(/^Nalog sa\s*/i, 'INSTANT FUNDED ACCOUNT WITH ')
      .replace(/\s*EUR$/i, '€');
  }

  return name;
}

function normalizePlanObject(planLike) {
  if (!planLike) return planLike;
  return {
    ...planLike,
    name: getEnglishPlanName(planLike),
  };
}

module.exports = {
  getEnglishPlanName,
  normalizePlanObject,
};
