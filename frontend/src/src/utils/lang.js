// Simple language utility: detect, get, set, and listen

const COOKIE_NAME = 'lang';

function readCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function detectLang() {
  const cookieLang = readCookie(COOKIE_NAME);
  if (cookieLang === 'sr' || cookieLang === 'en') return cookieLang;

  const ls = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
  if (ls === 'sr' || ls === 'en') return ls;

  const nav = typeof navigator !== 'undefined' ? (navigator.language || navigator.userLanguage || '') : '';
  return nav.toLowerCase().includes('sr') ? 'sr' : 'en';
}

export function getLang() {
  const val = detectLang();
  return val === 'sr' ? 'sr' : 'en';
}

export function setLang(lang) {
  const v = lang === 'sr' ? 'sr' : 'en';
  if (typeof document !== 'undefined') {
    const oneYear = 365 * 24 * 60 * 60;
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(v)}; Max-Age=${oneYear}; Path=/; SameSite=Lax`;
    document.documentElement.setAttribute('data-lang', v);
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lang', v);
  }
  // Dispatch a simple event so components can react
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: v } }));
  }
}

// Optional: subscribe to changes
export function onLangChange(handler) {
  if (typeof window === 'undefined') return () => {};
  const fn = (e) => handler(e.detail?.lang || getLang());
  window.addEventListener('langchange', fn);
  return () => window.removeEventListener('langchange', fn);
}
