// frontend/src/api.js

// BAZNI URL API-ja iz Vite env promenljive
// Lokalno:  VITE_API_URL=http://localhost:4000
// Prod:     VITE_API_URL=https://TVOJ_BACKEND.onrender.com
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

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

export const createStripeCheckout = async (token, planId) => {
  const res = await fetch(`${API_BASE}/payments/stripe/checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ planId }),
  });
  return res.json();
};

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
