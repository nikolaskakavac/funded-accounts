import { useState } from 'react';
import OnSiteStripeCheckout from '../components/OnSiteStripeCheckout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLang } from '../utils/lang';

const plans = [
  {
    id: '693db3e0e9cf589519c144fe',
    name: 'INSTANT FUNDED ACCOUNT WITH 5.000€',
    price: 150,
    cryptoPrice: 150,
    currency: 'eur',
    balance: 5000,
    deactivationAt: 150,
  },
  {
    id: '693db3ede9cf589519c14501',
    name: 'INSTANT FUNDED ACCOUNT WITH 10.000€',
    price: 300,
    cryptoPrice: 300,
    currency: 'eur',
    balance: 10000,
    deactivationAt: 300,
    highlighted: true,
  },
  {
    id: '693db3ede9cf589519c14500',
    name: 'INSTANT FUNDED ACCOUNT WITH 25.000€',
    price: 800,
    cryptoPrice: 800,
    currency: 'eur',
    balance: 25000,
    deactivationAt: 800,
  },
];

const Pricing = ({ navigate, token, onLogout }) => {
  const [onSitePlanId, setOnSitePlanId] = useState(null);
  const lang = getLang();
  const copy = {
    section: lang === 'nl' ? 'Fundingplannen' : 'Funding plans',
    title: lang === 'nl' ? 'Kies de grootte van je funded account.' : 'Choose your funded account size.',
    subtitle:
      lang === 'nl'
        ? 'Betaal op de website met kaart of met crypto. Dashboardtoegang volgt na bevestiging van de betaling.'
        : 'Pay by card on-site or with crypto. Instant dashboard access after payment.',
    cardPayment: lang === 'nl' ? 'Kaartbetaling' : 'Card payment',
    capital: lang === 'nl' ? 'kapitaal' : 'capital',
    videoIncluded: lang === 'nl' ? 'Videotraining inbegrepen' : 'Video education included',
  };

  const handleCrypto = (planId) => {
    if (!token) {
      localStorage.setItem('authRedirectTo', `/pay-crypto/${planId}`);
      navigate('/login');
      return;
    }

    navigate(`/pay-crypto/${planId}`);
  };

  const selectedPlan = plans.find((p) => p.id === onSitePlanId);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16 lg:px-8 flex-1">
        <header className="mb-12 space-y-4 text-left">
          <p className="font-display text-[11px] uppercase tracking-[0.26em] text-sky-400">
            {copy.section}
          </p>
          <h1 className="font-display text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.05] font-extrabold tracking-[0.12em] uppercase text-slate-50">
            {copy.title}
          </h1>
          <p className="font-sans max-w-3xl text-[16px] sm:text-[18px] text-sky-100/90 leading-relaxed">
            {copy.subtitle}
          </p>
        </header>

        <main>
          <div className="grid gap-7 md:grid-cols-2 md:justify-items-center">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                token={token}
                navigate={navigate}
                onChooseOnSite={() => setOnSitePlanId(plan.id)}
                isOnSiteSelected={onSitePlanId === plan.id}
                onCrypto={() => handleCrypto(plan.id)}
                isPayingCrypto={false}
                lang={lang}
              />
            ))}
          </div>

          {token && selectedPlan && (
            <div className="mt-12 flex justify-center">
              <div className="w-full max-w-lg rounded-3xl border-2 border-sky-500/80 bg-gradient-to-b from-sky-500/10 via-black/80 to-sky-900/10 p-8 shadow-2xl shadow-sky-500/30 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <p className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-500/50 px-4 py-1.5 text-xs font-sans uppercase tracking-[0.16em] text-sky-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                    {copy.cardPayment}
                  </p>
                  <p className="mt-4 text-2xl font-display font-extrabold tracking-[0.1em] uppercase text-slate-50">
                    {selectedPlan.name}
                  </p>
                  <p className="mt-2 text-4xl font-sans font-semibold tracking-[0.04em] text-sky-400">
                    {selectedPlan.price}€
                  </p>
                  <p className="mt-1 text-lg font-sans font-semibold text-sky-200">
                    {selectedPlan.balance.toLocaleString()}€ {copy.capital}
                  </p>
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm font-sans text-sky-300/90">
                    {copy.videoIncluded}
                  </p>
                </div>

                <OnSiteStripeCheckout
                  key={selectedPlan.id}
                  token={token}
                  planId={selectedPlan.id}
                  onSuccess={() => (window.location.href = '/success')}
                />
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

const PlanCard = ({
  plan,
  token,
  navigate,
  onChooseOnSite,
  isOnSiteSelected,
  onCrypto,
  isPayingCrypto,
  lang,
}) => {
  const { name, price, cryptoPrice, highlighted, balance, deactivationAt } = plan;
  const copy = {
    recommended: lang === 'nl' ? 'Aanbevolen' : 'Recommended',
    price: lang === 'nl' ? 'Prijs:' : 'Price:',
    accountDeactivation: lang === 'nl' ? 'Accountdeactivatie bij' : 'Account Deactivation at',
    videoIncluded: lang === 'nl' ? 'Videotraining inbegrepen' : 'Video education included',
    capital: lang === 'nl' ? 'kapitaal' : 'capital',
    selectedPayBelow: lang === 'nl' ? 'Geselecteerd - betaal hieronder' : 'SELECTED - PAY BELOW',
    payByCard: lang === 'nl' ? 'Betaal met kaart' : 'Pay by card',
    creatingAddress: lang === 'nl' ? 'Adres aanmaken...' : 'Creating address...',
    payWithCrypto: lang === 'nl' ? 'Betaal met crypto' : 'Pay with crypto',
    bankTax: lang === 'nl' ? '0% bankkosten' : '0% bank tax',
    createAccount: lang === 'nl' ? 'Maak account aan om te betalen' : 'CREATE ACCOUNT TO COMPLETE PAYMENT',
    companyName:
      lang === 'nl'
        ? 'Volledige naam geregistreerd bedrijf: Arbex Fund B. V.'
        : 'Full name of registered company: Arbex Fund B. V.',
    address: lang === 'nl' ? 'Adres: Barbara Strozzilaan 310' : 'Address: Barbara Strozzilaan 310',
    postalCode: lang === 'nl' ? 'Postcode: 1083 HN' : 'Postal code: 1083 HN',
    contactEmail: lang === 'nl' ? 'Contact e-mail: arbexfund@support.com' : 'Contact email: arbexfund@support.com',
    contactPhone: lang === 'nl' ? 'Contact telefoonnummer: +31 6 19 36 42 04' : 'Contact phone number: +31 6 19 36 42 04',
    license: lang === 'nl' ? 'AFM-licentienummer: 14000716' : 'AFM License number: 14000716',
    licensed:
      lang === 'nl'
        ? 'Ja, ons bedrijf is gelicentieerd door de AFM (Autoriteit Financiele Markten).'
        : 'Yes, our business is licensed by the AFM (Autoriteit Financiele Markten).',
  };

  return (
    <div
      className={
        'relative flex h-full flex-col rounded-3xl border p-6 shadow-lg bg-gradient-to-b from-black via-[#02110b] to-black transition-all duration-200 ease-out ' +
        (highlighted
          ? 'border-sky-400 shadow-sky-500/30 hover:-translate-y-2 ring-2 ring-sky-500/20'
          : 'border-sky-700/40 hover:border-sky-400/80 hover:-translate-y-1')
      }
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500 to-sky-300 px-4 py-0.5 text-[10px] font-display uppercase tracking-[0.2em] text-black shadow-md">
          {copy.recommended}
        </div>
      )}

      <div className="mb-4 space-y-1 text-center">
        <div className="font-display text-[20px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
          {name}
        </div>
        <div className="font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-sky-300">
          {copy.price}
        </div>
        <div className="font-sans text-[28px] sm:text-[32px] font-semibold tracking-[0.03em] text-sky-300">
          {price}€
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-sky-600/50 bg-sky-500/10 p-3 text-center">
          <p className="flex flex-col gap-1 text-xs font-sans font-semibold text-sky-200">
            <span className="tracking-[0.04em]">
              {copy.accountDeactivation} -{(deactivationAt ?? price).toLocaleString('de-DE')}€
            </span>
            <span className="tracking-[0.04em]">
              {copy.price} {price.toLocaleString()}€
            </span>
            <span>{copy.videoIncluded}</span>
            {typeof balance === 'number' && (
              <span className="text-[11px] text-sky-300/90">
                {balance.toLocaleString()}€ {copy.capital}
              </span>
            )}
          </p>
        </div>

        {token ? (
          <>
            <button
              onClick={onChooseOnSite}
              disabled={isOnSiteSelected}
              className={
                'w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-lg ' +
                (isOnSiteSelected
                  ? 'bg-sky-500/90 text-black shadow-sky-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-500 to-sky-400 text-black hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] hover:-translate-y-0.5')
              }
            >
              {isOnSiteSelected ? copy.selectedPayBelow : copy.payByCard}
            </button>
            <button
              onClick={onCrypto}
              disabled={isPayingCrypto}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500/20 via-sky-400/30 to-cyan-400/30 p-[1px] shadow-[0_0_35px_rgba(56,189,248,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(56,189,248,0.85)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="flex w-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-black/90 px-4 py-3 sm:py-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.18em] text-sky-100 group-hover:text-sky-50">
                    {isPayingCrypto ? copy.creatingAddress : `${copy.payWithCrypto} (${cryptoPrice ?? price}€)`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                  <span className="text-sky-300/80 group-hover:text-sky-200/90">USDT - USDC - ETH</span>
                  <span className="font-bold tracking-[0.08em] text-white">{copy.bankTax}</span>
                </div>
              </div>
              <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[100%] transition-all duration-700" />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.setItem('authRedirectTo', `/pay-card/${plan.id}`);
              navigate('/register');
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
            className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-sky-400 py-3.5 font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:shadow-[0_0_35px_rgba(56,189,248,0.9)] hover:-translate-y-0.5 transition-all duration-200"
          >
            {copy.createAccount}
          </button>
        )}
      </div>

      <div className="mt-4 text-left text-[12px] font-sans leading-relaxed text-slate-300 space-y-1">
        <p className="font-semibold text-slate-100">{copy.companyName}</p>
        <p>{copy.address}</p>
        <p>{copy.postalCode}</p>
        <p>{copy.contactEmail}</p>
        <p>{copy.contactPhone}</p>
        <p>{copy.license}</p>
        <p>{copy.licensed}</p>
      </div>
    </div>
  );
};

export default Pricing;
