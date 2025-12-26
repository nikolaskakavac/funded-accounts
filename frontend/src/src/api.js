// Prefer VITE_API_BASE_URL; fallback to VITE_API_URL; final fallback based on domain
let API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
if (!API_BASE) {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  if (host === 'arbexfund.com' || host === 'www.arbexfund.com') {
    API_BASE = 'https://api.arbexfund.com';
  } else {
    API_BASE = 'http://localhost:4000';
  }
}

// AUTH

export const register = async (email, password, firstName = '', lastName = '') => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName }),
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

export const getMe = async (token) => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// Stripe – redirect + on‑site (intent)

export const createStripeCheckout = async (token, planId, opts) => {
  const url =
    opts?.mode === 'intent'
      ? `${API_BASE}/payments/stripe/create-intent`
      : `${API_BASE}/payments/stripe/checkout-session`;

  const body =
    opts?.mode === 'intent'
      ? { planId, phone: opts.phone || '' } // za on‑site šaljemo i phone
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

  return res.json(); // checkout: { url }, intent: { clientSecret }
};

// NOWPayments – crypto

export const createNowPayment = async (token, planId, payCurrency) => {
  const res = await fetch(`${API_BASE}/payments/now/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ planId, pay_currency: payCurrency }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.message || 'NOWPayments error';
    const detail = body?.detail ? `: ${JSON.stringify(body.detail)}` : '';
    throw new Error(msg + detail);
  }
  return body;
};

// NOWPayments – status check
export const checkNowPaymentStatus = async (paymentId, token) => {
  const authToken = token || (typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null);
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

// Cash out
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
