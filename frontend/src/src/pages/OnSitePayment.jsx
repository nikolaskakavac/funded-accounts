import { useEffect } from 'react';
import Header from '../components/Header';
import OnSiteStripeCheckout from '../components/OnSiteStripeCheckout';
import Footer from '../components/Footer';
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
    localStorage.setItem('authRedirectTo', `/pay-card/${planId}`);
    navigate('/register');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} />

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:pt-8 flex-1">
        <header className="mb-8">
          <div className="text-left sm:text-center mb-6">
            <h1 className="font-display text-[24px] sm:text-[28px] font-bold tracking-[0.12em] uppercase text-sky-300">
              {t('onsite.payment', lang)}
            </h1>
            <p className="mt-2 font-sans text-[13px] text-sky-100/80">
              {t('onsite.secure', lang)}
            </p>
          </div>
        
          <div className="flex items-center justify-start sm:justify-center gap-3">
            <img src={visaLogo} alt="Visa" className="h-5 w-8 object-contain" />
            <img src={mastercardLogo} alt="Mastercard" className="h-5 w-8 object-contain" />
            <img src={raiffeisenLogo} alt="Raiffeisen Bank" className="h-5 w-10 object-contain" />
          </div>
        </header>

        <section className="mx-auto max-w-lg rounded-3xl border-2 border-sky-500/80 bg-gradient-to-b from-sky-500/10 via-black/80 to-sky-900/10 p-8 shadow-2xl shadow-sky-500/30 backdrop-blur-sm">
          <OnSiteStripeCheckout
            token={token}
            planId={planId}
            onSuccess={(pi) => {
              const id = pi?.id || '';
              window.location.href = `/success?payment_intent=${encodeURIComponent(id)}&method=karticom`;
            }}
          />
        </section>

        <div className="mx-auto mt-4 max-w-lg rounded-3xl border border-sky-800/50 bg-black/70 p-4 text-left text-[12px] font-sans leading-relaxed text-slate-300 space-y-1">
          <p className="font-semibold text-slate-100">Full name of registered company: Arbex Fund B. V.</p>
          <p>Address: Barbara Strozzilaan 310</p>
          <p>Postal code: 1083 HN</p>
          <p>Contact email: arbexfund@support.com</p>
          <p>Contact phone number: +31 6 19 36 42 04</p>
          <p>AFM License number: 14000716</p>
          <p>Yes, our business is licensed by the AFM (Autoriteit Financiele Markten).</p>
        </div>

        <div className="mt-4 text-center">
          <button onClick={() => navigate('/#plans')} className="text-sm text-slate-400 hover:underline">
            {t('onsite.page.back', lang)}
          </button>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default OnSitePaymentPage;


