import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

// payment badge images
import visaLogo from '/img/visa.png';
import mastercardLogo from '/img/mastercard-logo.svg';
import raiffeisenLogo from '/img/raiffeisen.png';

const Landing = ({ navigate, token, onLogout = () => {} }) => {
  const [onSitePlanId, setOnSitePlanId] = useState(null);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const lang = getLang();
  const heroFontStyle = { fontFamily: "'Acherus Militant Local', sans-serif" };
  const nl = lang === 'nl';

  const goToAuthForCheckout = (checkoutPath) => {
    localStorage.setItem('authRedirectTo', checkoutPath);
    navigate('/register');
  };

  const landingPlans = [
    {
      id: '693db3e0e9cf589519c144fe',
      name: 'INSTANT FUNDED ACCOUNT WITH 5.000€',
      price: 150,
      cryptoPrice: 150,
      deactivationAt: 150,
    },
    {
      id: '693db3ede9cf589519c14501',
      name: 'INSTANT FUNDED ACCOUNT WITH 10.000€',
      price: 300,
      cryptoPrice: 300,
      deactivationAt: 300,
    },
    {
      id: '693db3ede9cf589519c14500',
      name: 'INSTANT FUNDED ACCOUNT WITH 25.000€',
      price: 800,
      cryptoPrice: 800,
      deactivationAt: 800,
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
            bg-[#111111]
            w-screen
            min-h-[680px]
            sm:min-h-[760px]
            md:min-h-[820px]
            lg:min-h-[850px]
            overflow-hidden
          "
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
                  style={{ ...heroFontStyle, fontWeight: 700 }}
                >
                  <span
                    className="block text-[30px] sm:text-[40px] lg:text-[70px] xl:text-[84px] 2xl:text-[96px] text-sky-300"
                    style={heroFontStyle}
                  >
                    Welcome to Arbex Fund
                  </span>
                  <span
                    className="block mt-8 text-[26px] sm:text-[34px] lg:text-[60px] xl:text-[70px] 2xl:text-[82px] text-white"
                    style={heroFontStyle}
                  >
                    The First One-Rule
                  </span>
                  <span
                    className="block text-[14px] sm:text-[18px] lg:text-[28px] tracking-[0.35em] text-white uppercase"
                    style={heroFontStyle}
                  >
                    INSTANT FUNDED COMPANY
                  </span>
                </h1>

                <img
                  src="/img/logohed.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none mx-auto mt-10 w-[min(92vw,430px)] object-contain sm:mt-8 sm:w-[min(70vw,500px)] md:mt-8 md:w-[min(46vw,460px)] lg:mt-2 lg:w-[min(40vw,520px)] xl:w-[min(35vw,560px)]"
                />

                <div
                  className="mt-8 sm:mt-10 lg:mt-6 xl:mt-8 space-y-4 w-full max-w-xl mx-auto pb-4 font-sans opacity-0 translate-y-3 animate-[fadeUp_0.9s_ease-out_forwards]"
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

        <section className="bg-black px-4 pt-2 pb-1 border-t border-sky-500/10">
          <div className="max-w-5xl mx-auto">
            <img
              src="/img/TRADE WITH OUR CAPITAL EARN REAL PROFITS.png"
              alt="Manager preview"
              className="w-full rounded-3xl shadow-[0_-25px_45px_-30px_rgba(0,0,0,0.65)]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </section>

        <section className="bg-black px-4 pt-8 pb-2">
          <div className="max-w-5xl mx-auto">
            <section className="rounded-3xl border border-sky-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
              <h2 className="font-display font-black text-[22px] sm:text-[30px] uppercase tracking-[0.24em] text-sky-300 mb-6">
                {nl ? 'Wat is een Instant Funded Account?' : "What's an Instant Funded Account?"}
              </h2>

              <div className="space-y-5 font-sans text-[18px] sm:text-[21px] leading-relaxed text-slate-50 max-w-4xl mx-auto">
                <p>
                  {nl ? 'Een Instant Funded Account is een account dat wordt aangemaakt op het grootste handelsplatform genaamd ' : 'An Instant Funded Account is an account created on the biggest trading platform called '}
                  <a
                    href="https://www.metatrader5.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-300 underline underline-offset-4 hover:text-sky-200"
                  >
                    MetaTrader5.com
                  </a>
                  {nl
                    ? ', waarmee je alle grote crypto- en financiele instrumenten kunt verhandelen (Bitcoin, Gold, USD/EUR...) zonder dat je je eigen kapitaal op het platform hoeft te investeren.'
                    : ', which gives you the option to trade all major crypto and financial instruments (Bitcoin, Gold, USD/EUR...) without having any of your own capital invested on the platform.'}
                </p>

                <div className="space-y-3">
                  <p className="font-display text-[16px] sm:text-[18px] uppercase tracking-[0.2em] text-sky-300">
                    {nl ? 'De 2 belangrijkste voordelen van een Instant Funded Account:' : 'The 2 main benefits of using an Instant Funded Account:'}
                  </p>
                  <div className="grid gap-3 text-left sm:grid-cols-2">
                    <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 px-5 py-4">
                      <p>
                        {nl
                          ? '1. Je krijgt een account waarop al echt kapitaal staat, in plaats van je eigen geld te investeren.'
                          : '1. You get an account that already has real capital on it instead of investing your own finances.'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 px-5 py-4">
                      <p>
                        {nl
                          ? '2. Je handelt met groot kapitaal en hebt daardoor een veel groter winstpotentieel vergeleken met klassiek traden.'
                          : '2. You trade with big capital, therefore have a much larger profit potential, compared to classic trading.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 via-black/40 to-sky-500/10 px-6 py-6 text-left">
                  <p className="font-display text-[16px] sm:text-[18px] uppercase tracking-[0.2em] text-sky-300 mb-3 text-center">
                    {nl ? 'Instant Funded Account vs Klassiek Traden' : 'Instant Funded Account vs Classic Trading'}
                  </p>
                  <p>
                    {nl
                      ? 'De prijs van een Instant Funded Account van 10.000€ is 300€. Een winst van 10% op een Instant Funded Account van 10.000€ is 1.000€, terwijl een winst van 10% op 300€ die je direct op een handelsplatform investeert slechts 30€ is.'
                      : 'The price of a 10.000€ Instant Funded Account is 300€. A 10% profit on a 10.000€ Instant Funded Account is 1.000€, while a 10% profit on 300€ invested directly into a trading platform is only 30€.'}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* BLOK: Kako funkcionise + Pravila rizika */}
        <div className="bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-8 sm:pt-2 pb-10">
          <div className="max-w-5xl mx-auto">
            <section className="mt-0.5 sm:mt-1 rounded-3xl border border-sky-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
              <h2 className="font-display font-black text-[22px] sm:text-[30px] uppercase tracking-[0.26em] text-sky-300 mb-6">
                {nl ? 'Wat wij bieden' : 'What We Offer'}
              </h2>

              <div className="space-y-5 font-sans text-[19px] sm:text-[22px] leading-relaxed text-slate-50 max-w-3xl mx-auto">
                <p>
                  {nl
                    ? 'Wij geven je demokapitaal om te investeren in crypto en financiële markten, zodat je je eigen geld niet hoeft te gebruiken. Je kunt zelf kiezen hoe je investeert, of onze AI-bot alles voor je laten beheren. Als je winst behaalt, wordt 80% daarvan gestort op je persoonlijke betaalrekening (creditcard/crypto-account).'
                    : "We give you our capital to invest in crypto / financial markets - so you don't have to use your own. You can either choose how to invest it yourself, or let our AI bot handle everything for you. If you achieve a profit, 80% of it is deposited to your personal payment account (credit card/crypto account)."}
                </p>
                <div className="space-y-3">
                  <p className="font-display text-[16px] sm:text-[18px] uppercase tracking-[0.22em] text-sky-300">
                    {nl ? '3 accountopties:' : '3 Account Options:'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[18px] sm:text-[22px] text-slate-50">
                    <span className="rounded-full border border-sky-500/40 bg-black/50 px-4 py-1.5">5.000€</span>
                    <span className="rounded-full border border-sky-500/40 bg-black/50 px-4 py-1.5">10.000€</span>
                    <span className="rounded-full border border-sky-500/40 bg-black/50 px-4 py-1.5">25.000€</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/#account-details');
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400 bg-black/40 px-4 py-2 text-[14px] font-sans uppercase tracking-[0.12em] text-sky-300 transition-colors hover:bg-sky-500/10"
                >
                  {nl ? 'Bekijk het accountactivatieproces' : 'See Account Activation Process'}
                  <span>→</span>
                </button>
              </div>
            </section>

            <section
              id="how-it-works"
              className="mt-10 rounded-3xl border border-sky-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center"
            >
              <h2 className="font-display font-black text-[22px] sm:text-[30px] uppercase tracking-[0.2em] text-sky-300 mb-6">
                {nl ? 'Alles waarin je met ons geld kunt investeren:' : 'All the things you can invest in with our capital'}
              </h2>

              <div className="space-y-6 font-sans text-[18px] sm:text-[20px] leading-relaxed text-slate-50 max-w-3xl mx-auto">
                <div className="mx-auto grid max-w-xl grid-cols-2 gap-x-8 gap-y-3 text-center sm:text-[22px]">
                  <span>Bitcoin</span>
                  <span>Ethereum</span>
                  <span>Gold</span>
                  <span>Silver</span>
                  <span>EUR/USD</span>
                  <span>S&amp;P 500</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/instruments#top');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-sky-400 px-4 py-2 text-[14px] font-sans tracking-[0.08em] text-sky-300 hover:bg-sky-500/10 transition-colors cursor-pointer"
                  >
                    {nl ? 'Bekijk alle 3.000 financiële instrumenten' : 'View all 3.000 financial instruments'}
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
                  Every Arbex Account has a Maximum Allowed Financial Loss:
                </p>
                <div className="max-w-3xl mx-auto">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-3xl border border-sky-400/40 bg-gradient-to-b from-slate-900/60 via-black to-slate-900/20 px-7 py-6 text-left shadow-xl shadow-sky-500/10">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/50 bg-sky-500/20 text-xs font-semibold tracking-[0.08em] text-sky-100/90">
                        5K
                      </div>
                      <p className="font-sans text-[16px] sm:text-[23px] text-white leading-tight font-semibold mt-4 flex flex-col gap-1">
                        <span className="text-[16px] sm:text-[23px]">{t('investmentModal.account5k')}</span>
                        <span className="inline-flex items-center gap-2 text-[16px] sm:text-[23px]">
                          <span className="text-sky-300">→</span>
                          <span>{t('investmentModal.loss5k')}</span>
                        </span>
                      </p>
                    </div>
                    <div className="group relative overflow-hidden rounded-3xl border border-sky-400/40 bg-gradient-to-b from-slate-900/60 via-black to-slate-900/20 px-7 py-6 text-left shadow-xl shadow-sky-500/10">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/50 bg-sky-500/20 text-xs font-semibold tracking-[0.08em] text-sky-100/90">
                        10K
                      </div>
                      <p className="font-sans text-[16px] sm:text-[23px] text-white leading-tight font-semibold mt-4 flex flex-col gap-1">
                        <span className="text-[16px] sm:text-[23px]">{t('investmentModal.account10k')}</span>
                        <span className="inline-flex items-center gap-2 text-[16px] sm:text-[23px]">
                          <span className="text-sky-300">→</span>
                          <span>{t('investmentModal.loss10k')}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <p>
                  If that amount is exceeded, the account gets automatically deactivated. No additional costs.
                </p>
                <p>
                  With this approach, you are able to invest the full size of your Arbex Account (5.000€, 10.000€ or 25.000€), while your maximum financial risk is limited.
                </p>
                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/#plans');
                    }}
                  className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-sky-400 px-4 py-2 text-[14px] font-sans tracking-[0.12em] uppercase text-sky-300 hover:bg-sky-500/10 transition-colors cursor-pointer"
                >
                    {nl ? 'Bekijk accountprijzen' : 'See Account Prices'}
                    <span>→</span>
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-10 px-2 sm:px-4">
              <div className="text-center mb-6">
                <p className="font-display text-[12px] uppercase tracking-[0.32em] text-sky-400 mb-2">{nl ? 'Pionier in Vrijheid' : 'Pioneer in Freedom'}</p>
                <h2 className="font-display font-black text-[24px] sm:text-[32px] uppercase tracking-[0.2em] text-sky-300">
                  {nl ? 'Handel Zonder Beperkingen' : 'Trade Without Restrictions'}
                </h2>
                <p className="mt-3 font-sans text-[18px] sm:text-[20px] text-slate-200">
                  {nl ? 'Focus op je strategie en prestaties - niet op platformregels.' : 'Focus on your strategy and performance - not platform rules.'}
                </p>
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
                      title: nl ? 'Geen Evaluaties' : 'No Evaluations',
                      body: nl ? 'Begin direct met kapitaal beheren zonder tests of challenges te doorlopen.' : 'Start managing capital immediately without passing tests or challenges.',
                      lines: nl ? ['Geen', 'Evaluaties'] : ['No', 'Evaluations'],
                    },
                    {
                      title: nl ? 'Geen Activiteitsregel' : 'No Activity Rule',
                      body: nl ? 'Handel wanneer het bij je strategie past - geen minimum aantal handelsdagen vereist.' : 'Trade when it fits your strategy - no minimum trading day requirements.',
                      lines: nl ? ['Geen Activiteit', 'Regel'] : ['No Activity', 'Rule'],
                    },
                    {
                      title: nl ? 'Geen Spreadregel' : 'No Spread Rule',
                      body: nl ? 'Geen kunstmatige beperkingen op basis van spreads of marktomstandigheden.' : 'No artificial restrictions based on spreads or market conditions.',
                      lines: nl ? ['Geen Spread', 'Regel'] : ['No Spread', 'Rule'],
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex-shrink-0 w-[260px] sm:w-[280px] snap-center text-center rounded-3xl border border-sky-600/40 bg-gradient-to-b from-black via-slate-900/70 to-black px-6 py-6 shadow-lg shadow-sky-500/10"
                    >
                      <h3 className="font-display text-[18px] uppercase tracking-[0.2em] text-sky-300 leading-tight">
                        {item.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className="mt-2 font-sans text-[16px] text-slate-100 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="font-display text-[16px] sm:text-[18px] tracking-[0.3em] text-slate-300">
                  {nl ? 'Gewoon Eerlijke Instant Funding · Gewoon winstverdeling' : 'Just Fair Instant Funding · Just profit split'}
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* STA DOBIJAS / PODELA / CILJ */}
        <section id="account-details" className="relative bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-10 pb-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="font-display font-bold text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-sky-300 mb-5">
                What You Get After Purchase
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
                  You get an email with the login information (username, password) for your newly created investment account on the online platform called{' '}
                  <a
                    href="https://www.metatrader5.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-300 underline underline-offset-4 hover:text-sky-200"
                  >
                    MetaTrader5.com
                  </a>
                  .
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
                <p className="text-center font-sans text-[16px] text-slate-200 leading-relaxed">
                  Average Profit Amount Payed Out:
                </p>
                <p className="text-center font-display text-[40px] text-sky-400 leading-none mt-2">
                  3500€
                </p>
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent" />
              </div>

              <div
                className="group relative overflow-hidden rounded-3xl border border-sky-500/40 bg-gradient-to-r from-black via-[#0b111f] to-black p-6 shadow-lg shadow-sky-500/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-sky-500/40 hover:shadow-2xl hover:border-sky-400/70 hover:rotate-1"
              >
                <h3 className="text-center font-display text-[18px] tracking-[0.16em] uppercase text-sky-300 mb-3">
                  Success Rate
                </h3>
                <p className="text-center font-sans text-[14px] text-slate-200 leading-relaxed">
                  (Success rate represents the percentage of clients that achieved a profit from our services.)
                </p>
                <p className="text-center font-display text-[36px] text-sky-400 leading-none mt-3">
                  61%
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
                {nl ? 'Video-educatie' : 'Video Education'}
              </p>
              <h2 className="font-display font-bold text-[26px] sm:text-[34px] uppercase tracking-[0.2em] text-sky-300">
                {nl ? 'Bekijk waar onze gratis video-educatie over gaat' : 'See what our free video education is all about'}
              </h2>
            </div>

            <div className="rounded-3xl border border-sky-500/40 bg-black/70 p-4 shadow-xl shadow-sky-500/10">
              <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-black to-slate-900/60 border border-sky-500/30">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  poster="/img/thumb.png"
                  preload="metadata"
                  playsInline
                >
                  <source src="/video/Arbexfunf%2016X9.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-sky-300 px-6 py-3 text-sm sm:text-base font-display uppercase tracking-[0.2em] text-black shadow-[0_0_24px_rgba(56,189,248,0.7)] hover:-translate-y-1 transition-transform"
              >
                {nl ? 'Ontvang nu gratis video-educatie' : 'Get Free Video Education Now'}
              </button>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-black via-sky-950 to-black px-4 pt-10 pb-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-display font-bold text-[22px] sm:text-[28px] uppercase tracking-[0.18em] text-sky-300 mb-1">
              {nl ? 'Laat AI voor jou investeren' : 'Let AI invest instead of You'}
            </h2>
            <div className="max-w-4xl mx-auto rounded-3xl p-3 sm:p-3.5 bg-transparent">
              <p className="font-sans text-[17px] sm:text-[18px] font-normal leading-relaxed text-sky-50/95 break-words">
                <span className="inline-flex max-w-full flex-wrap items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-sky-300 px-3.5 py-1 text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-black shadow-[0_0_16px_rgba(56,189,248,0.55)] mb-3 text-center leading-tight break-words">
                  {nl ? 'Passieve inkomstenkans' : 'Passive income opportunity'}
                </span>
                <br />
                <span className="break-words">
                  {nl ? 'Klanten kunnen ook eenvoudig onze AI-bot activeren binnen hun gekochte Arbex-account.' : 'Clients also have the option to simply activate our AI bot inside of their purchased Arbex Account.'}
                  <br />
                  {nl ? 'De AI-bot zoekt automatisch naar handelsmogelijkheden en investeert met het gefinancierde kapitaal van Arbex Fund.' : 'The AI bot then automatically scouts for trade opportunities and invests with the funded capital from Arbex Fund.'}
                  <br />
                  {nl ? 'Alle winst wordt voor de klant gegenereerd.' : 'All profits are generated to the client.'}
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
                {nl ? 'START NU' : 'START NOW'}
              </p>
              <h2 className="mt-2 font-display text-[28px] sm:text-[34px] font-bold tracking-[0.12em] uppercase text-sky-300">
                {nl ? 'KIES ACCOUNTGROOTTE' : 'CHOOSE ACCOUNT SIZE'}
              </h2>
            </div>

            <div id="account-prices" className="grid gap-7 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
              <div className="w-full max-w-sm">
                <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg bg-gradient-to-b from-black via-[#02110b] to-black border-sky-700/40 hover:border-sky-400/80 hover:-translate-y-1 transition-all duration-200 ease-out">
                  <div className="mb-4 text-center">
                    <div className="font-display text-[24px] sm:text-[28px] font-semibold tracking-[0.08em] uppercase text-slate-50 break-words">
                      {landingPlans[0].name}
                    </div>
                    <div className="mt-2 flex justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-black/60 px-4 py-1.5 text-[11px] font-sans uppercase tracking-[0.14em] text-sky-200">
                        <span>{nl ? 'Accountdeactivatie bij' : 'Account Deactivation at'}</span>
                        <span className="text-slate-50 tracking-[0.08em]">-{landingPlans[0].deactivationAt}€</span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sky-100">
                    <p className="text-sm font-sans font-semibold uppercase tracking-[0.14em] text-sky-200">{nl ? 'Prijs:' : 'Price:'}</p>
                    <p className="mt-2 text-3xl font-sans font-semibold tracking-[0.03em] text-sky-50">{landingPlans[0].price}€</p>
                    <p className="mt-2 text-sm font-sans tracking-wide text-sky-200">{nl ? 'Videotraining inbegrepen' : 'Video education included'}</p>
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
                          goToAuthForCheckout('/pay-card/693db3e0e9cf589519c144fe');
                        } else navigate('/pay-card/693db3e0e9cf589519c144fe');
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-sky-500 text-black border-2 border-sky-500 hover:bg-sky-400 hover:-translate-y-0.5"
                    >
                      {nl ? `Betaal ${landingPlans[0].price}€ met kaart` : `Pay ${landingPlans[0].price}€ with Card`}
                    </button>
                    <button
                      onClick={() => {
                        if (!token) {
                          goToAuthForCheckout('/pay-crypto/693db3e0e9cf589519c144fe');
                        } else {
                          navigate('/pay-crypto/693db3e0e9cf589519c144fe');
                        }
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-transparent border-2 border-sky-400 text-sky-100 hover:bg-sky-500/10 hover:-translate-y-0.5"
                    >
                      {nl ? `Betaal ${landingPlans[0].cryptoPrice}€ met crypto` : `Pay ${landingPlans[0].cryptoPrice}€ with Crypto`}
                    </button>
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
                    <div className="mt-2 flex justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-black/60 px-4 py-1.5 text-[11px] font-sans uppercase tracking-[0.14em] text-sky-200">
                        <span>{nl ? 'Accountdeactivatie bij' : 'Account Deactivation at'}</span>
                        <span className="text-slate-50 tracking-[0.08em]">-{landingPlans[1].deactivationAt}€</span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sky-100">
                    <p className="text-sm font-sans font-semibold uppercase tracking-[0.14em] text-sky-200">{nl ? 'Prijs:' : 'Price:'}</p>
                    <p className="mt-2 text-3xl font-sans font-semibold tracking-[0.03em] text-sky-50">{landingPlans[1].price}€</p>
                    <p className="mt-2 text-sm font-sans tracking-wide text-sky-200">{nl ? 'Videotraining inbegrepen' : 'Video education included'}</p>
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
                          goToAuthForCheckout('/pay-card/693db3ede9cf589519c14501');
                        } else navigate('/pay-card/693db3ede9cf589519c14501');
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-sky-500 text-black border-2 border-sky-500 hover:bg-sky-400 hover:-translate-y-0.5"
                    >
                      {nl ? `Betaal ${landingPlans[1].price}€ met kaart` : `Pay ${landingPlans[1].price}€ with Card`}
                    </button>
                    <button
                      onClick={() => {
                        if (!token) {
                          goToAuthForCheckout('/pay-crypto/693db3ede9cf589519c14501');
                        } else {
                          navigate('/pay-crypto/693db3ede9cf589519c14501');
                        }
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-transparent border-2 border-sky-400 text-sky-100 hover:bg-sky-500/10 hover:-translate-y-0.5"
                    >
                      {nl ? `Betaal ${landingPlans[1].cryptoPrice}€ met crypto` : `Pay ${landingPlans[1].cryptoPrice}€ with Crypto`}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-sm">
                <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg bg-gradient-to-b from-black via-[#02110b] to-black border-sky-700/40 hover:border-sky-400/80 hover:-translate-y-1 transition-all duration-200 ease-out">
                  <div className="mb-4 text-center">
                    <div className="font-display text-[24px] sm:text-[28px] font-semibold tracking-[0.08em] uppercase text-slate-50 break-words">
                      {landingPlans[2].name}
                    </div>
                    <div className="mt-2 flex justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-black/60 px-4 py-1.5 text-[11px] font-sans uppercase tracking-[0.14em] text-sky-200">
                        <span>{nl ? 'Accountdeactivatie bij' : 'Account Deactivation at'}</span>
                        <span className="text-slate-50 tracking-[0.08em]">-{landingPlans[2].deactivationAt.toLocaleString('de-DE')}€</span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sky-100">
                    <p className="text-sm font-sans font-semibold uppercase tracking-[0.14em] text-sky-200">{nl ? 'Prijs:' : 'Price:'}</p>
                    <p className="mt-2 text-3xl font-sans font-semibold tracking-[0.03em] text-sky-50">{landingPlans[2].price}€</p>
                    <p className="mt-2 text-sm font-sans tracking-wide text-sky-200">{nl ? 'Videotraining inbegrepen' : 'Video education included'}</p>
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
                          goToAuthForCheckout('/pay-card/693db3ede9cf589519c14500');
                        } else navigate('/pay-card/693db3ede9cf589519c14500');
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-sky-500 text-black border-2 border-sky-500 hover:bg-sky-400 hover:-translate-y-0.5"
                    >
                      {nl ? `Betaal ${landingPlans[2].price}€ met kaart` : `Pay ${landingPlans[2].price}€ with Card`}
                    </button>
                    <button
                      onClick={() => {
                        if (!token) {
                          goToAuthForCheckout('/pay-crypto/693db3ede9cf589519c14500');
                        } else {
                          navigate('/pay-crypto/693db3ede9cf589519c14500');
                        }
                      }}
                      className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 bg-transparent border-2 border-sky-400 text-sky-100 hover:bg-sky-500/10 hover:-translate-y-0.5"
                    >
                      {nl ? `Betaal ${landingPlans[2].cryptoPrice}€ met crypto` : `Pay ${landingPlans[2].cryptoPrice}€ with Crypto`}
                    </button>
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
                    <p className="mt-2 text-4xl font-sans font-semibold tracking-[0.04em] text-sky-400">
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
