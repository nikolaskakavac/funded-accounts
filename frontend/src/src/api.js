let API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
if (!API_BASE) {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  if (host === 'arbexfund.com' || host === 'www.arbexfund.com') {
    API_BASE = 'https://api.arbexfund.com';
  } else {
    API_BASE = 'http://localhost:4000';
  }
}

const getStoredReferralCode = () =>
  typeof localStorage !== 'undefined'
    ? (localStorage.getItem('affiliateReferralCode') || '').trim().toUpperCase()
    : '';

export const register = async (email, password, firstName = '', lastName = '', referralCode = '') => {
  const normalizedReferralCode =
    String(referralCode || '').trim().toUpperCase() || getStoredReferralCode();
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName, referralCode: normalizedReferralCode }),
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const verifyEmail = async (token) => {
  const res = await fetch(`${API_BASE}/auth/verify-email?token=${encodeURIComponent(token)}`);
  return res.json();
};

export const verifyEmailCode = async (email, code) => {
  const res = await fetch(`${API_BASE}/auth/verify-email-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });
  return res.json();
};

export const requestPasswordReset = async (email) => {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
};

export const resetPassword = async (email, code, password) => {
  const res = await fetch(`${API_BASE}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, password }),
  });
  return res.json();
};

export const getMe = async (token) => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getAffiliateDashboard = async (token) => {
  const res = await fetch(`${API_BASE}/api/affiliate/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message || 'Failed to load affiliate dashboard');
  }
  return body;
};

export const validateAffiliateCode = async (code) => {
  const normalizedCode = String(code || '').trim().toUpperCase();
  if (!normalizedCode) {
    return { valid: false, message: 'Referral code is required' };
  }

  const res = await fetch(`${API_BASE}/api/affiliate/resolve/${encodeURIComponent(normalizedCode)}`);
  return res.json();
};

export const saveAffiliatePayoutDetails = async (token, payload) => {
  const res = await fetch(`${API_BASE}/api/affiliate/payout-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message || 'Failed to save payout details');
  }
  return body;
};

export const createStripeCheckout = async (token, planId, opts) => {
  const url =
    opts?.mode === 'intent'
      ? `${API_BASE}/payments/stripe/create-intent`
      : `${API_BASE}/payments/stripe/checkout-session`;

  const body =
    opts?.mode === 'intent'
      ? { planId, phone: opts.phone || '', discountCode: opts.discountCode || '' }
      : { planId };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error('createStripeCheckout backend error:', errBody);
    throw new Error(errBody.message || 'Stripe error');
  }

  return res.json();
};

export const createNowPayment = async (token, planId, payCurrency, expectedAmount, discountCode = '') => {
  const res = await fetch(`${API_BASE}/payments/now/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      planId,
      pay_currency: payCurrency,
      expected_amount: expectedAmount,
      discountCode,
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.message || 'NOWPayments error';
    const detail = body?.detail ? `: ${JSON.stringify(body.detail)}` : '';
    throw new Error(msg + detail);
  }
  return body;
};

export const checkNowPaymentStatus = async (paymentId, token) => {
  const authToken =
    token || (typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null);
  const res = await fetch(`${API_BASE}/payments/now/status/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${authToken || ''}`,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Status check failed');
  }

  return res.json();
};

export const getCashoutStatus = async (token) => {
  const res = await fetch(`${API_BASE}/cashout/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Cashout status error');
  }
  return res.json();
};

export const requestCashout = async (token) => {
  const res = await fetch(`${API_BASE}/cashout/request`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message || 'Cashout request error');
  }
  return body;
};

export const getWhatsAppRequests = async (token) => {
  const res = await fetch(`${API_BASE}/api/whatsapp/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Failed to fetch WhatsApp requests');
  }
  return res.json();
};
