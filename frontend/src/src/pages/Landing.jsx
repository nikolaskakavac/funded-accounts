import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { t } from '../utils/translations';

// payment badge images
import visaLogo from '/img/visa.png';
import mastercardLogo from '/img/mastercard-logo.svg';
import raiffeisenLogo from '/img/raiffeisen.png';

const Landing = ({ navigate, token, onLogout = () => {} }) => {
  const [onSitePlanId, setOnSitePlanId] = useState(null);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  const landingPlans = [
    {
      id: '693db3e0e9cf589519c144fe',
      name: 'INSTANT FUNDED ACCOUNT WITH 2.500€',
      price: 150,
      cryptoPrice: 150,
      limitedLoss: 150,
    },
    {
      id: '693db3ede9cf589519c14500',
      name: 'INSTANT FUNDED ACCOUNT WITH 5.000€',
      price: 300,
      cryptoPrice: 300,
      limitedLoss: 300,
    },
    {
      id: '693db3ede9cf589519c14501',
      name: 'INSTANT FUNDED ACCOUNT WITH 10.000€',
      price: 1000,
      cryptoPrice: 1000,
      limitedLoss: 1000,
    },
  ];

  const selectedPlan = landingPlans.find((p) => p.id === onSitePlanId);

  // Handle investment conditions link clicks
  useEffect(() => {
    const handleInvestmentConditionsClick = (e) => {
      if (e.target.classList.contains('investment-conditions-link')) {
        e.preventDefault();
        setShowInvestmentModal(true);
      }
    };

    document.addEventListener('click', handleInvestmentConditionsClick);
    return () => document.removeEventListener('click', handleInvestmentConditionsClick);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col">
      <div className="flex-1">
        {/* HERO sa BTC pozadinom */}
        <div
          className="
            flex flex-col
            bg-no-repeat
            bg-[center_55%]
            bg-[length:100%]
            sm:bg-[32%_30%]
            sm:bg-[length:72%]
            lg:bg-[center_98%]
            lg:bg-[length:40%]
            xl:bg-[center_103%]
            xl:bg-[length:35%]
            bg-[#111111]
            w-screen
            min-h-[640px]
            sm:min-h-[680px]
            md:min-h-[720px]
            lg:min-h-[850px]
            overflow-hidden
          "
          style={{ backgroundImage: "url('/img/logohed.png')" }}
        >
          {/* transparent overlay */}
          <div className="flex-1 bg-transparent flex flex-col relative overflow-hidden border-b border-sky-500/10">
            <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={false} />

            {/* HERO TEKST */}
            <main className="px-4 pb-3 flex-1 flex">
              <section className="w-full max-w-5xl mx-auto text-center">
                <h1
                  className="text-center font-display font-black leading-tight tracking-[0.12em]
                              opacity-0 translate-y-3 animate-[fadeUp_0.6s_ease-out_forwards]"
                  style={{ fontFamily: "'Room Black', sans-serif" }}
                >
                  <span className="block text-[30px] sm:text-[40px] lg:text-[70px] xl:text-[84px] 2xl:text-[96px] text-sky-300">
                    Welcome to Arbex Fund
                  </span>
                  <span className="block mt-8 text-[26px] sm:text-[34px] lg:text-[60px] xl:text-[70px] 2xl:text-[82px] text-white">
                    The First One-Rule
                  </span>
                  <span className="block text-[14px] sm:text-[18px] lg:text-[28px] tracking-[0.35em] text-white uppercase">
                    INSTANT FUNDED COMPANY
                  </span>
                </h1>

                <div
                  className="mt-96 sm:mt-28 lg:mt-6 xl:mt-8 space-y-4 w-full max-w-xl mx-auto pb-4 font-sans opacity-0 translate-y-3 animate-[fadeUp_0.9s_ease-out_forwards]"
                >
                  <button
                    onClick={() => navigate('/#how-it-works')}
                    className="relative w-full rounded-full bg-sky-500 py-3.5 sm:py-4 text-[16px] sm:text-[18px] font-semibold tracking-[0.12em] uppercase text-black transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] hover:bg-sky-400 active:translate-y-0 before:absolute before:inset-0 before:rounded-full before:border before:border-sky-500/40 before:animate-[pulseBorder_1.8s_ease-out_infinite]"
                  >
                    {t('hero.learnMore')}
                  </button>
                  <button
                    onClick={() => navigate('/#plans')}
                    className="w-full rounded-full border border-sky-300/90 py-3.5 sm:py-4 text-[16px] sm:text-[18px] font-semibold tracking-[0.12em] uppercase text-sky-100 bg-[#111111] transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-sky-900/60 active:translate-y-0"
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
        <div className="bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-16 sm:pt-2 pb-12">
          <div className="max-w-5xl mx-auto">
            <section className="mt-0.5 sm:mt-1 rounded-3xl border border-sky-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
              <h2 className="font-display font-black text-[22px] sm:text-[30px] uppercase tracking-[0.26em] text-sky-300 mb-6">
                {t('investingSimplified.title')}
              </h2>

              <div className="space-y-4 font-sans text-[19px] sm:text-[22px] leading-relaxed text-slate-50 max-w-3xl mx-auto">
                <p>
                  We provide a platform where individuals can engage in real-world investing without needing to bring their own capital. Each client manages a live investment account funded by us, using their own strategy and judgment.
                </p>
              </div>
            </section>

            <section id="how-it-works" className="mt-10 rounded-3xl border border-sky-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
              <h2 className="font-display font-black text-[22px] sm:text-[30px] uppercase tracking-[0.26em] text-sky-300 mb-6">
                <span className="block">INSTANT FUNDED</span>
                <span className="block">ACCOUNTS</span>
              </h2>

              <div className="space-y-4 font-sans text-[19px] sm:text-[22px] leading-relaxed text-slate-50 max-w-3xl mx-auto">
                <p>
                  An Instant Funded Account gives you access to a live investment account funded by Arbex Fund from the very beginning. There are no evaluations or demo stages – you start operating in real market conditions right away.
                </p>
                <p>
                  You can apply your own strategy and manage the account independently, or choose to follow and automatically replicate the trades of experienced investors on the platform in real time.
                </p>
                <p>
                  Profits generated on the account are real, with <span className="font-semibold text-sky-300">80% paid directly to you</span>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo(0, 0);
                      navigate('/instruments');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-sky-400 px-4 py-2 text-[14px] font-sans tracking-[0.08em] text-sky-300 hover:bg-sky-500/10 transition-colors cursor-pointer"
                  >
                    View all financial instruments
                    <span>→</span>
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-10 rounded-3xl border border-sky-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
              <h2 className="font-display font-black text-[22px] sm:text-[30px] uppercase tracking-[0.24em] text-sky-300 mb-6">
                <span className="block">SIMPLICITY IN</span>
                <span className="block">FUNDING</span>
                <span className="block text-[14px] sm:text-[16px] tracking-[0.35em] text-slate-400 mt-3">Only One Account Rule</span>
              </h2>

              <div className="space-y-4 font-sans text-[18px] sm:text-[20px] leading-relaxed text-slate-50 max-w-3xl mx-auto">
                <p>
                  Every Arbex Account has a Maximum Allowed Financial Loss, which also represents the account price.
                </p>
                <p>
                  If that amount is exceeded, the account gets automatically deactivated. No additional costs.
                </p>
                <p>
                  With this approach, you are able to invest the full size of your Arbex Account (2.500€, 5.000€ or 10.000€), while your maximum financial risk is limited only to the account price.
                </p>
                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo(0, 0);
                      navigate('/#plans');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-sky-400 px-4 py-2 text-[14px] font-sans tracking-[0.12em] uppercase text-sky-300 hover:bg-sky-500/10 transition-colors cursor-pointer"
                  >
                    See Account Prices
                    <span>→</span>
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-10 rounded-3xl border border-sky-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10">
              <div className="text-center mb-6">
                <p className="font-display text-[12px] uppercase tracking-[0.32em] text-sky-400 mb-2">Pioneer in Freedom</p>
                <h2 className="font-display font-black text-[24px] sm:text-[32px] uppercase tracking-[0.2em] text-sky-300">
                  Trade Without Restrictions
                </h2>
                <p className="mt-3 font-sans text-[18px] sm:text-[20px] text-slate-200">Focus on your strategy and performance – not platform rules.</p>
              </div>

              <div className="relative -mx-4 sm:mx-0">
                <div
                  className="mx-auto flex w-full max-w-[520px] sm:max-w-[560px] gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-sky-700/70"
                  style={{
                    paddingLeft: 'clamp(16px, calc((100% - 280px) / 2), 120px)',
                    paddingRight: 'clamp(24px, calc((100% - 240px) / 2), 80px)',
                  }}
                >
                  {[
                    {
                      title: 'No Evaluations',
                      body: 'Start managing capital immediately without passing tests or challenges.',
                    },
                    {
                      title: 'No Activity Rule',
                      body: 'Trade when it fits your strategy – no minimum trading day requirements.',
                    },
                    {
                      title: 'No Spread Rule',
                      body: 'No artificial restrictions based on spreads or market conditions.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex-shrink-0 w-[260px] sm:w-[280px] snap-center rounded-3xl border border-sky-600/60 bg-gradient-to-b from-slate-900/60 via-black to-slate-900/20 p-6 shadow-lg shadow-sky-500/15"
                    >
                      <h3 className="font-display text-[18px] uppercase tracking-[0.2em] text-sky-300 mb-3">{item.title}</h3>
                      <p className="font-sans text-[16px] text-slate-100 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="font-display text-[16px] sm:text-[18px] tracking-[0.3em] text-slate-300">
                  Just Fair Instant Funding · Just profit split
                </p>
              </div>
            </section>

            <section id="investment-conditions" className="mt-10 rounded-3xl border border-sky-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
              <h2 className="font-display font-bold text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-sky-300 mb-3">
                {t('investmentModal.title')}
              </h2>

              <p className="font-sans text-[19px] sm:text-[21px] text-white leading-relaxed max-w-3xl mx-auto mb-6 break-words">
                {t('investmentModal.description')}
              </p>

              <div className="max-w-3xl mx-auto space-y-3 text-center">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="group relative overflow-hidden rounded-3xl border border-sky-400/40 bg-gradient-to-b from-slate-900/60 via-black to-slate-900/20 px-7 py-6 text-left shadow-xl shadow-sky-500/10">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/50 bg-sky-500/20 text-xs font-semibold tracking-[0.08em] text-sky-100/90">
                      5 K
                    </div>
                    <p className="font-sans text-[16px] sm:text-[23px] text-white leading-tight font-semibold mt-4 inline-flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-4 sm:whitespace-nowrap">
                      <span>{t('investmentModal.account5k')}</span>
                      <span className="text-sky-300">→</span>
                      <span>{t('investmentModal.loss5k')}</span>
                    </p>
                  </div>
                  <div className="group relative overflow-hidden rounded-3xl border border-sky-400/40 bg-gradient-to-b from-slate-900/60 via-black to-slate-900/20 px-7 py-6 text-left shadow-xl shadow-sky-500/10">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/50 bg-sky-500/20 text-xs font-semibold tracking-[0.08em] text-sky-100/90">
                      10 K
                    </div>
                    <p className="font-sans text-[16px] sm:text-[23px] text-white leading-tight font-semibold mt-4 inline-flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-4 sm:whitespace-nowrap">
                      <span>{t('investmentModal.account10k')}</span>
                      <span className="text-sky-300">→</span>
                      <span>{t('investmentModal.loss10k')}</span>
                    </p>
                  </div>
                </div>
                <div className="pt-1 space-y-2 text-left sm:text-center">
                  <p className="font-sans text-[19px] sm:text-[21px] text-white leading-relaxed">
                    <span className="text-sky-400 font-semibold">1.</span> {t('investmentModal.rule1')}
                  </p>
                  <p className="font-sans text-[19px] sm:text-[21px] text-white leading-relaxed">
                    <span className="text-sky-400 font-semibold">2.</span> {t('investmentModal.rule2')}
                  </p>
                  <p className="font-sans text-[19px] sm:text-[21px] text-white leading-relaxed">
                    <span className="text-sky-400 font-semibold">3.</span> {t('investmentModal.rule3')}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ŠTA DOBIJAŠ / PODELA / CILJ */}
        <section className="relative bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-10 pb-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="font-display font-bold text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-sky-300 mb-5">
                Account Details
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div
                className="group relative overflow-hidden rounded-3xl border border-sky-500/40 bg-gradient-to-r from-black via-[#0b111f] to-black p-6 shadow-lg shadow-sky-500/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-sky-500/40 hover:shadow-2xl hover:border-sky-400/70 hover:-rotate-1"
              >
                <div className="flex items-center justify-end mb-4">
                  <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-black text-sm text-center">
                    1
                  </div>
                </div>
                <h3 className="font-display text-[19px] tracking-[0.08em] uppercase text-sky-300 mb-2">
                  USERNAME AND PASSWORD
                </h3>
                <p className="font-sans text-[19px] sm:text-[21px] text-slate-100/90 leading-relaxed tracking-[0.01em]">
                  You get an email with the login information (username, password) for your newly created investment account on the online platform called MetaTrader5.com.
                </p>
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent" />
              </div>

              <div
                className="group relative overflow-hidden rounded-3xl border border-sky-500/40 bg-gradient-to-r from-black via-[#0b111f] to-black p-6 shadow-lg shadow-sky-500/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-sky-500/40 hover:shadow-2xl hover:border-sky-400/70 hover:-rotate-1"
              >
                <div className="flex items-center justify-end mb-4">
                  <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-black text-sm text-center">
                    2
                  </div>
                </div>
                <h3 className="font-display text-[19px] tracking-[0.08em] uppercase text-sky-300 mb-2">
                  INVESTMENT CAPITAL
                </h3>
                <p className="font-sans text-[19px] sm:text-[21px] text-slate-100/90 leading-relaxed tracking-[0.01em]">
                  Your account receives capital from Arbex Fund. We supply the funds in accordance with our investment rule.
                </p>
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent" />
              </div>

              <div
                className="group relative overflow-hidden rounded-3xl border border-sky-500/40 bg-gradient-to-r from-black via-[#0b111f] to-black p-6 shadow-lg shadow-sky-500/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-sky-500/40 hover:shadow-2xl hover:border-sky-400/70 hover:-rotate-1"
              >
                <div className="flex items-center justify-end mb-4">
                  <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-black text-sm text-center">
                    3
                  </div>
                </div>
                <h3 className="font-display text-[19px] tracking-[0.08em] uppercase text-sky-300 mb-2">
                  PROFIT SPLIT
                </h3>
                <p className="font-sans text-[19px] sm:text-[21px] text-slate-100/90 leading-relaxed tracking-[0.01em]">
                  If the financial instrument you invested in increases in value and you decide to CASH OUT, 80% of the profit is paid directly to your credit card or personal crypto account.
                </p>
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-10 pb-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div
                className="group relative overflow-hidden rounded-3xl border border-sky-500/40 bg-gradient-to-r from-black via-[#0b111f] to-black p-6 shadow-lg shadow-sky-500/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-sky-500/40 hover:shadow-2xl hover:border-sky-400/70 hover:-rotate-1"
              >
                <p className="text-center font-display text-[12px] uppercase tracking-[0.32em] text-slate-400 mb-1">
                  GUARANTEE OF PAYOUT
                </p>
                <h3 className="text-center font-display text-[18px] tracking-[0.16em] uppercase text-sky-300 mb-4">
                  AFM
                </h3>
                <p className="text-center font-sans text-[16px] text-slate-200 leading-relaxed">
                  Avg profit amount payed out
                </p>
                <p className="text-center font-display text-[40px] text-sky-400 leading-none mt-2">
                  2900€
                </p>
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent" />
              </div>

              <div
                className="group relative overflow-hidden rounded-3xl border border-sky-500/40 bg-gradient-to-r from-black via-[#0b111f] to-black p-6 shadow-lg shadow-sky-500/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-sky-500/40 hover:shadow-2xl hover:border-sky-400/70 hover:rotate-1"
              >
                <h3 className="text-center font-display text-[18px] tracking-[0.16em] uppercase text-sky-300 mb-3">
                  Success Rate
                </h3>
                <p className="text-center font-display text-[36px] text-sky-400 leading-none mb-2">
                  39%
                </p>
                <p className="text-center font-sans text-[14px] text-slate-200 leading-relaxed">
                  Success rate represents the percentage of clients who achieved profit above 100€ within the last period.
                </p>
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-10 pb-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
          <div className="max-w-5xl mx-auto space-y-6 text-center">
            <div>
              <p className="font-display text-[12px] uppercase tracking-[0.32em] text-sky-400 mb-2">
                Video Education
              </p>
              <h2 className="font-display font-bold text-[26px] sm:text-[34px] uppercase tracking-[0.2em] text-sky-300">
                See what our free video education is all about
              </h2>
            </div>

            <div className="rounded-3xl border border-sky-500/40 bg-black/70 p-4 shadow-xl shadow-sky-500/10">
              <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-black to-slate-900/60 border border-sky-500/30">
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Play education video"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-500 text-black text-xl font-bold shadow-[0_0_24px_rgba(56,189,248,0.6)]">
                    ▶
                  </span>
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo(0, 0);
                  navigate('/register');
                }}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-sky-300 px-6 py-3 text-sm sm:text-base font-display uppercase tracking-[0.2em] text-black shadow-[0_0_24px_rgba(56,189,248,0.7)] hover:-translate-y-1 transition-transform"
              >
                Get Free Video Education Now
              </button>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-10 pb-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-display font-bold text-[24px] sm:text-[32px] uppercase tracking-[0.2em] text-sky-300 mb-6">
              Popular for Beginners
            </h2>
            <div className="max-w-3xl mx-auto bg-black/70 border border-sky-500/40 rounded-3xl p-6 shadow-lg shadow-sky-500/10">
              <p className="font-sans text-[19px] sm:text-[21px] font-normal leading-relaxed text-sky-50/95 break-words">
                <span className="inline-flex max-w-full flex-wrap items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-sky-300 px-4 py-1.5 text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.26em] text-black shadow-[0_0_16px_rgba(56,189,248,0.55)] mb-4 text-center leading-tight break-words">
                  Copy Arbex: Auto-Invest
                </span>
                <br />
                <span className="break-words">
                  New clients also have the option to activate the Copy Arbex Feature to automatically copy the investments of our successful clients in real time.
                </span>
                <br />
                <span className="break-words">
                  After Account Purchase, activate the Copy Arbex feature inside the app. Choose from five investors, ranked from lower to higher risk. We then take over your account.
                </span>
                <br />
                <span className="break-words font-semibold text-slate-100/95 text-[18px] sm:text-[19px] tracking-[0.02em]">
                  Simple. Automated. Built for real investing.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* PLANOVI */}
        <section id="plans" className="relative bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-10 pb-14">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
              <p className="font-display text-[11px] uppercase tracking-[0.26em] text-sky-400">
                START NOW
              </p>
              <h2 className="mt-2 font-display text-[28px] sm:text-[34px] font-bold tracking-[0.12em] uppercase text-sky-300">
                CHOOSE ACCOUNT SIZE
              </h2>
            </div>

            <div className="grid gap-7 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
              <div className="w-full max-w-sm">
                <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg bg-gradient-to-b from-black via-[#02110b] to-black border-sky-700/40 hover:border-sky-400/80 hover:-translate-y-1 transition-all duration-200 ease-out">
                  <div className="mb-4 text-center">
                    <div className="font-display text-[24px] sm:text-[28px] font-semibold tracking-[0.08em] uppercase text-slate-50 break-words">
                      {landingPlans[0].name}
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sky-100">
                    <p className="text-sm font-display uppercase tracking-[0.3em] text-sky-200">Price:</p>
                    <p className="mt-2 text-3xl font-display text-sky-50">{landingPlans[0].price}€</p>
                    <p className="mt-2 text-sm font-sans tracking-wide text-sky-200">Video education included</p>
                    <div className="mt-4 mb-6 flex items-center justify-center gap-2 sm:gap-3">
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
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => {
                        if (!token) {
                          window.scrollTo(0, 0);
                          navigate('/register');
                        } else navigate('/pay-card/693db3e0e9cf589519c144fe');
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-sky-500 text-black border-2 border-sky-500 hover:bg-sky-400 hover:-translate-y-0.5"
                    >
                      {`Pay ${landingPlans[0].price}€ with Card`}
                    </button>
                    <button
                      onClick={() => {
                        if (!token) {
                          window.scrollTo(0, 0);
                          navigate('/register');
                        } else {
                          window.scrollTo(0, 0);
                          navigate('/pay-crypto/693db3e0e9cf589519c144fe');
                        }
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-transparent border-2 border-sky-400 text-sky-100 hover:bg-sky-500/10 hover:-translate-y-0.5"
                    >
                      {`Pay ${landingPlans[0].cryptoPrice}€ with Crypto`}
                    </button>
                    <p className="mt-4 text-xs font-sans tracking-[0.2em] text-sky-300 uppercase text-center">
                      Account Deactivation at (-{landingPlans[0].limitedLoss}€)
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-sm">
                <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg bg-gradient-to-b from-black via-[#02110b] to-black border-sky-400 shadow-sky-500/30 hover:-translate-y-2 ring-2 ring-sky-500/20 transition-all duration-200 ease-out">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500 to-sky-300 px-4 py-0.5 text-[10px] font-display uppercase tracking-[0.2em] text-black shadow-md">
                    {t('plans.recommended')}
                  </div>
                  <div className="mb-4 text-center">
                    <div className="font-display text-[24px] sm:text-[28px] font-semibold tracking-[0.08em] uppercase text-slate-50 break-words">
                      {landingPlans[1].name}
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sky-100">
                    <p className="text-sm font-display uppercase tracking-[0.3em] text-sky-200">Price:</p>
                    <p className="mt-2 text-3xl font-display text-sky-50">{landingPlans[1].price}€</p>
                    <p className="mt-2 text-sm font-sans tracking-wide text-sky-200">Video education included</p>
                    <div className="mt-4 mb-6 flex items-center justify-center gap-2 sm:gap-3">
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
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => {
                        if (!token) {
                          window.scrollTo(0, 0);
                          navigate('/register');
                        } else navigate('/pay-card/693db3ede9cf589519c14500');
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-sky-500 text-black border-2 border-sky-500 hover:bg-sky-400 hover:-translate-y-0.5"
                    >
                      {`Pay ${landingPlans[1].price}€ with Card`}
                    </button>
                    <button
                      onClick={() => {
                        if (!token) {
                          window.scrollTo(0, 0);
                          navigate('/register');
                        } else {
                          window.scrollTo(0, 0);
                          navigate('/pay-crypto/693db3ede9cf589519c14500');
                        }
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-transparent border-2 border-sky-400 text-sky-100 hover:bg-sky-500/10 hover:-translate-y-0.5"
                    >
                      {`Pay ${landingPlans[1].cryptoPrice}€ with Crypto`}
                    </button>
                    <p className="mt-4 text-xs font-sans tracking-[0.2em] text-sky-300 uppercase text-center">
                      Account Deactivation at (-{landingPlans[1].limitedLoss}€)
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-sm">
                <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg bg-gradient-to-b from-black via-[#02110b] to-black border-sky-700/40 hover:border-sky-400/80 hover:-translate-y-1 transition-all duration-200 ease-out">
                  <div className="mb-4 text-center">
                    <div className="font-display text-[24px] sm:text-[28px] font-semibold tracking-[0.08em] uppercase text-slate-50 break-words">
                      {landingPlans[2].name}
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sky-100">
                    <p className="text-sm font-display uppercase tracking-[0.3em] text-sky-200">Price:</p>
                    <p className="mt-2 text-3xl font-display text-sky-50">{landingPlans[2].price}€</p>
                    <p className="mt-2 text-sm font-sans tracking-wide text-sky-200">Video education included</p>
                    <div className="mt-4 mb-6 flex items-center justify-center gap-2 sm:gap-3">
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
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => {
                        if (!token) {
                          window.scrollTo(0, 0);
                          navigate('/register');
                        } else navigate('/pay-card/693db3ede9cf589519c14501');
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-sky-500 text-black border-2 border-sky-500 hover:bg-sky-400 hover:-translate-y-0.5"
                    >
                      {`Pay ${landingPlans[2].price}€ with Card`}
                    </button>
                    <button
                      onClick={() => {
                        if (!token) {
                          window.scrollTo(0, 0);
                          navigate('/register');
                        } else {
                          window.scrollTo(0, 0);
                          navigate('/pay-crypto/693db3ede9cf589519c14501');
                        }
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-transparent border-2 border-sky-400 text-sky-100 hover:bg-sky-500/10 hover:-translate-y-0.5"
                    >
                      {`Pay ${landingPlans[2].cryptoPrice}€ with Crypto`}
                    </button>
                    <p className="mt-4 text-xs font-sans tracking-[0.2em] text-sky-300 uppercase text-center">
                      Account Deactivation at (-{landingPlans[2].limitedLoss}€)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {token && selectedPlan && (
              <div className="mt-8 flex justify-center">
                <div className="w-full max-w-lg rounded-3xl border-2 border-sky-500/80 bg-gradient-to-b from-sky-500/10 via-black/80 to-sky-900/10 p-8 shadow-2xl shadow-sky-500/30 backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <p className="text-xs font-sans uppercase tracking-[0.28em] text-sky-400">
                      {t('plans.selectedPlanHeading')}
                    </p>
                    <p className="mt-4 text-2xl font-display tracking-[0.1em] uppercase text-slate-50 break-words">
                      {selectedPlan.name}
                    </p>
                    <p className="text-4xl font-display tracking-[0.15em] text-sky-400 mt-2">
                      {selectedPlan.price}€
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}
                      className="w-full rounded-2xl bg-[#1A1F71] py-3 text-sm font-sans uppercase tracking-[0.18em] text-white border-2 border-[#1A1F71] shadow-[0_0_18px_rgba(26,31,113,0.6)] transition-all duration-200 disabled:opacity-60 hover:-translate-y-[1px] hover:bg-[#252A7E]"
                    >
                      {t('plans.createAccountCta')}
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setOnSitePlanId(null)}
                      className="text-sm text-slate-400 hover:underline"
                    >
                      {t('plans.cancelSelection')}
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

        <section className="bg-gradient-to-b from-black via-[#020617] to-black px-4 pt-10 pb-12">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="text-center">
              <p className="font-display text-[11px] uppercase tracking-[0.24em] text-sky-400">
                {t('faq.section')}
              </p>
              <h2 className="mt-2 font-display text-[26px] sm:text-[30px] tracking-[0.12em] uppercase text-sky-300">
                {t('faq.title')}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-sky-700/50 bg-black/60 px-5 py-4">
                <h3 className="font-display text-[15px] sm:text-[16px] tracking-[0.08em] uppercase text-sky-300">
                  {t('faq.q1')}
                </h3>
                <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                  {t('faq.a1')}
                </p>
              </div>

              <div className="rounded-2xl border border-sky-700/50 bg-black/60 px-5 py-4">
                <h3 className="font-display text-[15px] sm:text-[16px] tracking-[0.08em] uppercase text-sky-300">
                  {t('faq.q2')}
                </h3>
                <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                  {t('faq.a2')}
                </p>
              </div>

              <div className="rounded-2xl border border-sky-700/50 bg-black/60 px-5 py-4">
                <h3 className="font-display text-[15px] sm:text-[16px] tracking-[0.08em] uppercase text-sky-300">
                  {t('faq.q3')}
                </h3>
                <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                 {t('faq.a3')}
                </p>
              </div>

              <div className="rounded-2xl border border-sky-700/50 bg-black/60 px-5 py-4">
                <h3 className="font-display text-[15px] sm:text-[16px] tracking-[0.08em] uppercase text-sky-300">
                  {t('faq.q4')}
                </h3>
                <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                  {t('faq.a4')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-black via-sky-950 to-black px-4 py-14">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
              <p className="font-display text-[11px] uppercase tracking-[0.26em] text-sky-400">
                {t('contact.section')}
              </p>
              <h2 className="mt-2 font-display text-[28px] sm:text-[34px] tracking-[0.12em] uppercase text-sky-300">
                {t('contact.title')}
              </h2>
              <p className="mt-3 font-sans text-[15px] text-sky-100/90 max-w-2xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="rounded-3xl border border-sky-800/60 bg-black/80 p-8 shadow-lg shadow-sky-500/20">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>

      <Footer navigate={navigate} />

      {showInvestmentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowInvestmentModal(false)}
        >
          <div
            className="relative w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-sky-700/70 bg-black/95 px-6 py-8 sm:px-10 sm:py-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInvestmentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-sky-400 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-display font-bold text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-sky-300 mb-3">
              {t('investmentModal.title')}
            </h2>

            <p className="font-sans text-[15px] sm:text-[17px] text-slate-300/90 mb-5 max-w-2xl mx-auto">
              {t('investmentModal.description')}
            </p>

            <div className="max-w-3xl mx-auto space-y-3 text-center">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-sky-400/40 bg-gradient-to-b from-sky-500/10 to-black/70 px-4 py-3 shadow-lg shadow-sky-500/10">
                  <p className="font-sans text-[17px] sm:text-[18px] text-sky-50 leading-relaxed font-medium">
                    {t('investmentModal.plan1')}
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-400/40 bg-gradient-to-b from-sky-500/10 to-black/70 px-4 py-3 shadow-lg shadow-sky-500/10">
                  <p className="font-sans text-[17px] sm:text-[18px] text-sky-50 leading-relaxed font-medium">
                    {t('investmentModal.plan2')}
                  </p>
                </div>
              </div>
              <div className="pt-1 space-y-2">
                <p className="font-sans text-[17px] sm:text-[19px] text-slate-200/90 leading-relaxed">
                  <span className="text-sky-400 font-semibold">1.</span> {t('investmentModal.rule1')}
                </p>
                <p className="font-sans text-[17px] sm:text-[19px] text-slate-200/90 leading-relaxed">
                  <span className="text-sky-400 font-semibold">2.</span> {t('investmentModal.rule2')}
                </p>
                <p className="font-sans text-[17px] sm:text-[19px] text-slate-200/90 leading-relaxed">
                  <span className="text-sky-400 font-semibold">3.</span> {t('investmentModal.rule3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
