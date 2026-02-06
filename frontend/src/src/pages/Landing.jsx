import React, { useState } from 'react';
import Header from '../components/Header';
import Leaderboard from '../components/Leaderboard';
import ContactForm from '../components/ContactForm';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

// payment badge images
import visaLogo from '/img/visa.png';
import mastercardLogo from '/img/mastercard-logo.svg';
import raiffeisenLogo from '/img/raiffeisen.png';

const Landing = ({ navigate, token, onLogout = () => {} }) => {
  const [onSitePlanId, setOnSitePlanId] = useState(null);
  const lang = getLang();

  const landingPlans = [
    { id: '693db3e0e9cf589519c144fe', name: 'Nalog sa 10.000€', price: 300, cryptoPrice: 255, limitedLoss: 300 },
    { id: '693db3ede9cf589519c14500', name: 'Nalog sa 20.000€', price: 600, cryptoPrice: 510, limitedLoss: 600 },
  ];

  const selectedPlan = landingPlans.find((p) => p.id === onSitePlanId);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* HERO sa BTC pozadinom */}
      <div
        className="
          flex flex-col
          bg-no-repeat
          bg-[center_65%]
          bg-[length:120%]
          sm:bg-[32%_40%]
          sm:bg-[length:88%]
          bg-[#111111]
          w-screen
          min-h-[640px]
          sm:min-h-[680px]
          md:min-h-[720px]
          overflow-hidden
        "
        style={{ backgroundImage: "url('/img/crypto-bg.png')" }}
      >
        {/* transparent overlay */}
        <div className="flex-1 bg-transparent flex flex-col relative overflow-hidden border-b border-emerald-500/10">
          <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={false} />

            {/* HERO TEKST */}
            <main className="px-4 pb-3 -mt-4 flex-1 flex">
              <section className="w-full max-w-5xl mx-auto text-center">
                <h1
                  className="text-left sm:text-center ml-2 sm:ml-0 font-display text-[38px] sm:text-[44px] lg:text-[72px] xl:text-[84px] leading-[1.03] font-extrabold tracking-[0.12em] uppercase
                              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-emerald-400
                              opacity-0 translate-y-3 animate-[fadeUp_0.6s_ease-out_forwards]"
                  style={{ fontFamily: "'Room Black', sans-serif" }}
                >
                  {t('hero.title')}
                </h1>

                <h2
                  className="mt-4 text-left sm:text-center ml-2 sm:ml-0 text-[32px] sm:text-[38px] lg:text-[48px] leading-[1.1] font-extrabold tracking-[0.12em] uppercase
                              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-white
                              opacity-0 translate-y-3 animate-[fadeUp_0.65s_ease-out_forwards]"
                  style={{ fontFamily: "'Room Black', sans-serif" }}
                >
                  {t('hero.subtitle')}
                </h2>


                <div
                  className="mt-80 sm:mt-24 space-y-4 w-full max-w-xl mx-auto pb-4 font-sans
                              opacity-0 translate-y-3 animate-[fadeUp_0.9s_ease-out_forwards]"
                >
                  <button
                    onClick={() => navigate('/#how-it-works')}
                    className="relative w-full rounded-full bg-emerald-500 py-3.5 sm:py-4 text-[16px] sm:text-[18px]
                               font-semibold tracking-[0.12em] uppercase text-black
                               transition-all duration-200 ease-out hover:-translate-y-1
                               hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] hover:bg-emerald-400 active:translate-y-0
                               before:absolute before:inset-0 before:rounded-full before:border
                               before:border-emerald-500/40 before:animate-[pulseBorder_1.8s_ease-out_infinite]"
                  >
                    {t('hero.learnMore')}
                  </button>
                  <button
                    onClick={() => navigate('/#plans')}
                    className="w-full rounded-full border border-emerald-300/90 py-3.5 sm:py-4 text-[16px] sm:text-[18px]
                               font-semibold tracking-[0.12em] uppercase text-emerald-100
                               bg-[#111111]
                               transition-all duration-200 ease-out hover:-translate-y-1
                               hover:bg-emerald-900/60
                               active:translate-y-0"
                  >
                    {t('hero.viewPlans')}
                  </button>
                </div>
              </section>
            </main>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-black" />
          </div>
        </div>
      

      {/* BLOK: Kako funkcioniše + Pravila rizika */}
      <div className="bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-16 sm:pt-2 pb-12">
        <div className="max-w-5xl mx-auto">
          <section id="how-it-works" className="mt-0.5 sm:mt-1 rounded-3xl border border-emerald-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-display text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-emerald-400 mb-5">
              {t('howItWorks.title')}
            </h2>

            <p className="font-sans text-[20px] sm:text-[22px] text-emerald-50/95 leading-relaxed max-w-3xl mx-auto mb-6">
              {lang === 'sr' ? (
                <>
                  Kada kupiš nalog na našem websajtu, dobijaš log in podatke od novog trading naloga koji će biti popunjen pravim kapitalom. Svaki kupac dobija svoj, zaseban nalog.
                  <br />
                  <br />
                  <span className="font-semibold text-white">Tvoj zadatak je jasan:</span>{' '}
                  ostvari profit investirajući u zlato ili neku od{' '}
                  <span className="font-semibold text-white">kripto-valuta</span> sa našim novcem.
                  Ti se fokusiraš isključivo na investiranje.
                </>
              ) : (
                <>
                  When you purchase an account on our website, you receive login information of a new trading account that will be filled with real capital. Each customer gets their own separate account.
                  <br />
                  <br />
                  <span className="font-semibold text-white">Your task is clear:</span>{' '}
                  Achieve a profit by investing in gold, crypto or another financial instrument available on our trading platform. All the capital comes from us, while you focus exclusively on your investing decisions.
                </>
              )}
            </p>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400 px-4 py-2 text-[14px] font-sans font-semibold tracking-[0.08em] text-emerald-300 hover:bg-emerald-500/30 transition-colors"
              >
                {t('howItWorks.instruments')}
                <span>→</span>
              </a>
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-emerald-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10">
            <h2 className="text-center font-display text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-emerald-400 mb-5">
              {t('risk.title')}
            </h2>

            <div className="mx-auto max-w-3xl text-center text-emerald-50/95">
              <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed">
                {t('risk.bodyIntro')}
              </p>

              <div className="mx-auto mt-5 mb-5 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
                <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-black/80 to-emerald-900/20 px-6 py-6 text-left shadow-2xl shadow-emerald-500/20 backdrop-blur-sm">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
                  </div>
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-semibold tracking-[0.2em] text-emerald-200">
                      10K
                    </div>
                  </div>
                  <p className="relative z-10 mt-4 font-sans text-[17px] sm:text-[18px] text-emerald-50/95 leading-relaxed">
                    {t('risk.bodyPlan1')}
                  </p>
                </div>
                <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-black/80 to-emerald-900/20 px-6 py-6 text-left shadow-2xl shadow-emerald-500/20 backdrop-blur-sm">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
                  </div>
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-semibold tracking-[0.2em] text-emerald-200">
                      20K
                    </div>
                  </div>
                  <p className="relative z-10 mt-4 font-sans text-[17px] sm:text-[18px] text-emerald-50/95 leading-relaxed">
                    {t('risk.bodyPlan2')}
                  </p>
                </div>
                <p className="sm:col-span-2 font-sans text-[18px] sm:text-[20px] leading-relaxed text-emerald-50/95">
                  {t('risk.bodyLimit')}
                </p>
              </div>

              <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed text-emerald-50/95">
                {t('risk.bodyConclusion')}
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ŠTA DOBIJAŠ / PODELA / CILJ */}
      <section className="relative bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-10 pb-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="font-display text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-emerald-400 mb-3">
              {t('whatYouGet.title')}
            </h2>
          </div>

          {/* tri glavne kartice */}
          <div className="grid gap-5 md:grid-cols-3">
            {/* 1. Kapital za trgovanje */}
            <div
              className="group relative overflow-hidden rounded-3xl border border-emerald-500/40 
                         bg-gradient-to-r from-[#02110b] via-black to-[#02110b]
                         p-6 shadow-lg shadow-emerald-500/10 transition-all duration-200 ease-out 
                         hover:-translate-y-1 hover:shadow-emerald-500/40 hover:shadow-2xl
                         hover:border-emerald-400/70 hover:-rotate-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-[22px]">
                  💰
                </div>
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-black text-sm font-bold text-center">
                  1
                </div>
              </div>
              <h3 className="font-display text-[19px] font-extrabold tracking-[0.08em] uppercase text-emerald-300 mb-2">
                {t('whatYouGet.capital.title')}
              </h3>
              <p className="font-sans text-[18px] sm:text-[20px] text-slate-100/90 leading-relaxed font-medium tracking-[0.01em]">
                {t('whatYouGet.capital.description')}
              </p>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent" />
            </div>

            {/* 2. Platforma i obuka */}
            <div
              className="group relative overflow-hidden rounded-3xl border border-emerald-500/40 
                         bg-gradient-to-r from-[#02110b] via-black to-[#02110b]
                         p-6 shadow-lg shadow-emerald-500/10 transition-all duration-200 ease-out 
                         hover:-translate-y-1 hover:shadow-emerald-500/40 hover:shadow-2xl
                         hover:border-emerald-400/70 hover:-rotate-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-[22px]">
                  📚
                </div>
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-black text-sm font-bold text-center">
                  2
                </div>
              </div>
              <h3 className="font-display text-[19px] font-extrabold tracking-[0.08em] uppercase text-emerald-300 mb-2">
                {t('whatYouGet.platform.title')}
              </h3>
              <p className="font-sans text-[18px] sm:text-[20px] text-slate-100/90 leading-relaxed font-medium tracking-[0.01em]">
                {t('whatYouGet.platform.description')}
              </p>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent" />
            </div>

            {/* 3. Podela profita */}
            <div
              className="group relative overflow-hidden rounded-3xl border border-emerald-500/40 
                         bg-gradient-to-r from-[#02110b] via-black to-[#02110b]
                         p-6 shadow-lg shadow-emerald-500/10 transition-all duration-200 ease-out 
                         hover:-translate-y-1 hover:shadow-emerald-500/40 hover:shadow-2xl
                         hover:border-emerald-400/70 hover:-rotate-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-[22px]">
                  💰
                </div>
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-black text-sm font-bold text-center">
                  3
                </div>
              </div>
              <h3 className="text-center font-display text-[19px] font-extrabold tracking-[0.08em] uppercase text-emerald-300 mb-2">
                {t('whatYouGet.profit.title')}
              </h3>
             <p className="text-center font-sans text-[18px] sm:text-[20px] text-slate-100/90 leading-relaxed font-medium tracking-[0.01em]">
  {t('whatYouGet.profit.description')}
</p>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent" />
            </div>
          </div>




        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-10 pb-12">
  {/* gornja linija */}
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
  {/* donja linija */}
  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

  <div className="max-w-5xl mx-auto text-center">
   <h2 className="font-display text-[24px] sm:text-[32px] uppercase tracking-[0.2em] text-emerald-400 mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
  {t('goal.title')}
</h2>
<p className="font-sans text-[18px] sm:text-[20px] leading-[1.5] sm:leading-relaxed max-w-3xl mx-auto text-emerald-50/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
  {t('goal.description')}
  
  <br className="sm:hidden" />
  <br />
  
  {t('goal.selection')}
  
  <br className="sm:hidden" />
  <br />
  
  {t('goal.beginners')}
</p>
  </div>
</section>

      <section className="relative bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-8 pb-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-[20px] sm:text-[24px] font-semibold uppercase tracking-[0.18em] text-emerald-400 mb-4">
            {t('copyTrade.title')}
          </h2>
          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed max-w-3xl mx-auto text-emerald-50/95">
            {t('copyTrade.description')}
          </p>
        </div>
      </section>

      {/* PLANOVI */}
      <section id="plans" className="relative bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-10 pb-14">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400">
              {t('plans.section')}
            </p>
            <h2 className="mt-2 font-display text-[28px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              {t('plans.title')}
            </h2>
            
          </div>

          <div className="grid gap-7 justify-items-center sm:grid-cols-2">
            {/* 10K - 300€ */}
            <div className="w-full max-w-sm">
              <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg
                              bg-gradient-to-b from-black via-[#02110b] to-black
                              border-emerald-400 shadow-emerald-500/30 hover:-translate-y-2 ring-2 ring-emerald-500/20
                              transition-all duration-200 ease-out">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 px-4 py-0.5 text-[10px] font-display uppercase tracking-[0.2em] text-black shadow-md">
                  {t('plans.recommended')}
                </div>
                <div className="mb-4 space-y-1 text-center">
                  <div className="font-display text-[24px] sm:text-[28px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
                    {lang === 'sr'
                      ? 'Investicioni nalog sa 10.000€'
                      : lang === 'nl'
                        ? 'Account met €10.000'
                        : 'Investment Account with €10,000'}
                  </div>
                  <div className="font-sans text-[14px] text-emerald-400/80 mt-1">
                    {t('plans.loss')} {landingPlans[0].limitedLoss}€
                  </div>
                  <div className="font-display text-[16px] font-semibold tracking-[0.08em] text-emerald-300">
                    {t('plans.price')}
                  </div>
                  <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
                    {landingPlans[0].price}€
                  </div>
                  <p className="text-xs font-sans text-emerald-300/80 mt-2">
                    🎓 {lang === 'sr' ? 'Video obuka dolazi uz nalog' : lang === 'nl' ? 'Video training inbegrepen' : 'Video training included'}
                  </p>
                </div>
                <div className="mb-3 flex items-center justify-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 rounded-md bg-slate-800/50 px-2 py-1">
                    <img src={visaLogo} alt="Visa" className="h-5 w-8 object-contain" />
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-slate-800/50 px-2 py-1">
                    <img src={mastercardLogo} alt="Mastercard" className="h-5 w-8 object-contain" />
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-slate-800/50 px-2 py-1">
                    <img src={raiffeisenLogo} alt="Raiffeisen Bank" className="h-5 w-10 object-contain" />
                  </div>
                </div>
                  <div className="mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (!token) navigate('/register');
                      else navigate('/pay-card/693db3e0e9cf589519c144fe');
                    }}
                    className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] hover:-translate-y-0.5"
                  >
                    {t('plans.payCard')}
                  </button>
                  <button
                    onClick={() => {
                      if (!token) navigate('/register');
                      else navigate('/pay-crypto/693db3e0e9cf589519c144fe');
                    }}
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-cyan-400/30 p-[1px] shadow-[0_0_35px_rgba(34,197,94,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(34,197,94,0.85)]"
                  >
                    <div className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-black/90 px-4 py-2.5 sm:py-3">
                      <span className="font-sans text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.16em] text-emerald-100 group-hover:text-emerald-50">
                        {t('plans.payCrypto')} ({landingPlans[0].cryptoPrice}€)
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.08em] text-white">
                        15% OFF TAX FREE
                      </span>
                    </div>
                    <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[100%] transition-all duration-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* 20K - 600€ */}
            <div className="w-full max-w-sm">
              <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg
                              bg-gradient-to-b from-black via-[#02110b] to-black
                              border-emerald-700/40 hover:border-emerald-400/80 hover:-translate-y-1
                              transition-all duration-200 ease-out">
                <div className="mb-4 space-y-1 text-center">
                  <div className="font-display text-[24px] sm:text-[28px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
                    {lang === 'sr'
                      ? 'Investicioni nalog sa 20.000€'
                      : lang === 'nl'
                        ? 'Account met €20.000'
                        : 'Investment Account with €20,000'}
                  </div>
                  <div className="font-sans text-[14px] text-emerald-400/80 mt-1">
                    {t('plans.loss')} {landingPlans[1].limitedLoss}€
                  </div>
                  <div className="font-display text-[16px] font-semibold tracking-[0.08em] text-emerald-300">
                    {t('plans.price')}
                  </div>
                  <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
                    600€
                  </div>
                  <p className="text-xs font-sans text-emerald-300/80 mt-2">
                    🎓 {lang === 'sr' ? 'Video obuka dolazi uz nalog' : lang === 'nl' ? 'Video training inbegrepen' : 'Video training included'}
                  </p>
                </div>
                <div className="mb-3 flex items-center justify-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 rounded-md bg-slate-800/50 px-2 py-1">
                    <img src={visaLogo} alt="Visa" className="h-5 w-8 object-contain" />
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-slate-800/50 px-2 py-1">
                    <img src={mastercardLogo} alt="Mastercard" className="h-5 w-8 object-contain" />
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-slate-800/50 px-2 py-1">
                    <img src={raiffeisenLogo} alt="Raiffeisen Bank" className="h-5 w-10 object-contain" />
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (!token) navigate('/register');
                      else navigate('/pay-card/693db3ede9cf589519c14500');
                    }}
                    className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] hover:-translate-y-0.5"
                  >
                    {t('plans.payCard')}
                  </button>
                  <button
                    onClick={() => {
                      if (!token) navigate('/register');
                      else navigate('/pay-crypto/693db3ede9cf589519c14500');
                    }}
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-cyan-400/30 p-[1px] shadow-[0_0_35px_rgba(34,197,94,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(34,197,94,0.85)]"
                  >
                    <div className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-black/90 px-4 py-2.5 sm:py-3">
                      <span className="font-sans text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.16em] text-emerald-100 group-hover:text-emerald-50">
                        {t('plans.payCrypto')} ({landingPlans[1].cryptoPrice}€)
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.08em] text-white">
                        15% OFF TAX FREE
                      </span>
                    </div>
                    <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[100%] transition-all duration-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {token && selectedPlan && (
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-lg rounded-3xl border-2 border-emerald-500/80 bg-gradient-to-b from-emerald-500/10 via-black/80 to-emerald-900/10 p-8 shadow-2xl shadow-emerald-500/30 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <p className="mt-4 text-2xl font-display font-extrabold tracking-[0.1em] uppercase text-slate-50">
                    {lang === 'sr'
                      ? `Investicioni ${selectedPlan.name}`
                      : lang === 'nl'
                        ? `Investeringsaccount ${selectedPlan.name}`
                        : `Investment ${selectedPlan.name}`}
                  </p>
                  <p className="text-4xl font-display font-extrabold tracking-[0.15em] text-emerald-400 mt-2">
                    {selectedPlan.price}€
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate(`/pay-card/${selectedPlan.id}`)}
                    className="w-full rounded-2xl bg-emerald-500 py-3 text-sm font-sans font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all duration-200 disabled:opacity-60 hover:-translate-y-[1px] hover:bg-emerald-400"
                  >
                    {lang === 'sr' ? 'Plati karticom' : lang === 'nl' ? 'Betaal met kaart' : 'Pay by card'}
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setOnSitePlanId(null)}
                    className="text-sm text-slate-400 hover:underline"
                  >
                    {lang === 'sr' ? 'Otkaži' : lang === 'nl' ? 'Annuleren' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <p className="mt-8 font-sans text-[13px] text-slate-400 max-w-3xl mx-auto text-center">
            {t('plans.afterPayment')}
          </p>
        </div>
      </section>

      <Leaderboard />

      {/* FAQ */}
      <section className="bg-gradient-to-b from-black via-[#020617] to-black px-4 pt-10 pb-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.24em] text-emerald-400">
              {t('faq.section')}
            </p>
            <h2 className="mt-2 font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-700/50 bg-black/60 px-5 py-4">
              <h3 className="font-display text-[15px] sm:text-[16px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                {t('faq.q1')}
              </h3>
              <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                {t('faq.a1')}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-700/50 bg-black/60 px-5 py-4">
              <h3 className="font-display text-[15px] sm:text-[16px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                {t('faq.q2')}
              </h3>
              <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                {t('faq.a2')}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-700/50 bg-black/60 px-5 py-4">
              <h3 className="font-display text-[15px] sm:text-[16px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                {t('faq.q3')}
              </h3>
              <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
               {t('faq.a3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-gradient-to-b from-black via-emerald-950 to-black px-4 py-14">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400">
              {t('contact.section')}
            </p>
            <h2 className="mt-2 font-display text-[28px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              {t('contact.title')}
            </h2>
            <p className="mt-3 font-sans text-[15px] text-emerald-100/90 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-8 shadow-lg shadow-emerald-500/20">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-800/40 bg-black px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-[18px] font-semibold tracking-[0.16em] uppercase text-slate-50">
              Arbex
            </div>
            <p className="mt-1 font-sans text-[13px] text-slate-400">
              {t('footer.professional')}
            </p>
          </div>

          <div className="flex flex-col items-start gap-1 font-sans text-[13px] text-slate-400 sm:items-end">
            <button
              onClick={() => navigate('/#plans')}
              className="text-emerald-300 hover:text-emerald-100 transition-colors"
            >
              {t('footer.pricing')}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="text-emerald-300 hover:text-emerald-100 transition-colors"
            >
              {t('footer.contact')}
            </button>
            <p className="mt-1 text-[12px] text-slate-500">
              © {new Date().getFullYear()} Arbex. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
