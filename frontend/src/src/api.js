const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// AUTH

export const register = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
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
  return res.json();
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
