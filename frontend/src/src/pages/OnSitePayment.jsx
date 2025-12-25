import { useEffect } from 'react';
import Header from '../components/Header';
import OnSiteStripeCheckout from '../components/OnSiteStripeCheckout';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';
import visaLogo from '/img/visa.png';
import mastercardLogo from '/img/mastercard-logo.svg';
import raiffeisenLogo from '/img/raiffeisen.png';

const OnSitePaymentPage = ({ navigate, token, onLogout, planId }) => {
  // Ensure page starts at the top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const lang = getLang();

  // If not logged in, redirect to register
  if (!token) {
    navigate('/register');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <Header navigate={navigate} token={token} onLogout={onLogout} />

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:pt-8">
        <header className="mb-8 text-center">
          <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">{t('onsite.page.section', lang)}</p>
          <h1 className="mt-2 font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
            {t('onsite.page.title', lang)}
          </h1>
        
          <div className="mt-2 flex items-center justify-center gap-3">
            <img src={visaLogo} alt="Visa" className="h-5 w-8 object-contain" />
            <img src={mastercardLogo} alt="Mastercard" className="h-5 w-8 object-contain" />
            <img src={raiffeisenLogo} alt="Raiffeisen Bank" className="h-5 w-10 object-contain" />
          </div>
        </header>

        <section className="mx-auto max-w-lg rounded-3xl border-2 border-emerald-500/80 bg-gradient-to-b from-emerald-500/10 via-black/80 to-emerald-900/10 p-8 shadow-2xl shadow-emerald-500/30 backdrop-blur-sm">
          <OnSiteStripeCheckout
            token={token}
            planId={planId}
            onSuccess={(pi) => {
              const id = pi?.id || '';
              window.location.href = `/success?payment_intent=${encodeURIComponent(id)}&method=karticom`;
            }}
          />
        </section>

        <div className="mt-4 text-center">
          <button onClick={() => navigate('/#plans')} className="text-sm text-slate-400 hover:underline">
            {t('onsite.page.back', lang)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnSitePaymentPage;
