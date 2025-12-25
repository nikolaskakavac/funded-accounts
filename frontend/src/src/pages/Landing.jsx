import React, { useState } from 'react';
import Header from '../components/Header';
import Leaderboard from '../components/Leaderboard';
import OnSiteStripeCheckout from '../components/OnSiteStripeCheckout';

// payment badge images
import visaLogo from '/img/visa.png';
import mastercardLogo from '/img/mastercard-logo.svg';
import raiffeisenLogo from '/img/raiffeisen.png';

const Landing = ({ navigate, token }) => {
  const [onSitePlanId, setOnSitePlanId] = useState(null);

  const landingPlans = [
    { id: '693db3e0e9cf589519c144fe', name: 'Nalog sa 10.000€', price: 99 },
    { id: '693db3ede9cf589519c14500', name: 'Nalog sa 20.000€', price: 189 },
  ];

  const selectedPlan = landingPlans.find((p) => p.id === onSitePlanId);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* HERO sa BTC pozadinom */}
      <div
        className="
          flex flex-col
          bg-no-repeat
          bg-[center_58%]
          bg-[length:112%]
          sm:bg-[center_52%]
          sm:bg-[length:88%]
          bg-[#111111]
          min-h-[720px]
          sm:min-h-[780px]
          md:min-h-[840px]
        "
        style={{ backgroundImage: "url('/img/crypto-bg.png')" }}
      >
        {/* transparent overlay */}
        <div className="flex-1 bg-transparent flex flex-col relative overflow-hidden border-b border-emerald-500/10">
          <Header navigate={navigate} token={token} onLogout={() => {}} showBackLink={false} />

            {/* HERO TEKST */}
            <main className="px-4 pb-3 -mt-4 flex-1 flex">
              <section className="w-full max-w-5xl mx-auto text-center">
                <h1
                  className="text-left sm:text-center ml-2 sm:ml-0 font-display text-[38px] sm:text-[44px] lg:text-[72px] xl:text-[84px] leading-[1.03] font-extrabold tracking-[0.12em] uppercase
                              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-emerald-400
                              opacity-0 translate-y-3 animate-[fadeUp_0.6s_ease-out_forwards]"
                  style={{ fontFamily: "'Room Black', sans-serif" }}
                >
                  Uloži u kripto sa našim kapitalom.
                </h1>

                <h2
                  className="mt-4 text-left sm:text-center ml-2 sm:ml-0 text-[32px] sm:text-[38px] lg:text-[48px] leading-[1.1] font-extrabold tracking-[0.12em] uppercase
                              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-white
                              opacity-0 translate-y-3 animate-[fadeUp_0.65s_ease-out_forwards]"
                  style={{ fontFamily: "'Room Black', sans-serif" }}
                >
                  Podeli profit.
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
                    Saznaj više
                  </button>
                  <button
                    onClick={() => navigate('/#plans')}
                    className="w-full rounded-full border border-emerald-300/90 py-3.5 sm:py-4 text-[16px] sm:text-[18px]
                               font-semibold tracking-[0.12em] uppercase text-emerald-100
                               bg-gradient-to-b from-emerald-500/15 to-emerald-500/28
                               transition-all duration-200 ease-out hover:-translate-y-1
                               hover:from-emerald-500/22 hover:to-emerald-500/32
                               active:translate-y-0"
                  >
                    Pogledaj planove
                  </button>
                </div>
              </section>
            </main>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-black" />
          </div>
        </div>
      

      {/* BLOK: Kako funkcioniše + Pravila rizika */}
      <div className="bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-1 sm:pt-2 pb-12">
        <div className="max-w-5xl mx-auto">
          <section id="how-it-works" className="mt-0.5 sm:mt-1 rounded-3xl border border-emerald-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-display text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-emerald-400 mb-5">
              Kako funkcioniše
            </h2>

            <p className="font-sans text-[20px] sm:text-[22px] text-emerald-50/95 leading-relaxed max-w-3xl mx-auto mb-4">
              Kada kupiš nalog na našem websajtu, dobijaš log in podatke od već postojećeg,
              unapred <span className="font-semibold text-emerald-400">„napunjenog" kripto naloga</span>.
              Svaki kupac dobija svoj, zaseban nalog – nema deljenja sa drugima.
              <br />
              <br />
              <span className="font-semibold text-white">Tvoj zadatak je jasan:</span>{' '}
              ostvari profit investirajući u neku od{' '}
              <span className="font-semibold text-white">kripto-valuta</span> sa našim novcem.
              Ti se fokusiraš isključivo na{' '}
              <span className="font-semibold text-white">investiranje</span>, dok mi brinemo o{' '}
              <span className="font-semibold text-white">nalogu</span>,{' '}
              <span className="font-semibold text-white">kapitalu</span> i kompletnoj{' '}
              <span className="font-semibold text-white">tehničkoj infrastrukturi</span>.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-emerald-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10">
            <h2 className="text-center font-display text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-emerald-400 mb-5">
              Pravila rizika
            </h2>

            <p className="font-sans text-[18px] sm:text-[20px] text-emerald-50/95 leading-relaxed max-w-3xl mx-auto text-center mb-6">
              Da bi nalog ostao aktivan, dovoljno je da poštuješ dva jednostavna pravila rizika.
              Kršenje bilo kog od njih automatski deaktivira nalog.
            </p>

            <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {/* Pravilo 1 */}
              <div className="rounded-2xl border border-emerald-700 bg-black/70 px-4 py-5 shadow-lg shadow-emerald-900/40">
                <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-[13px] font-semibold text-emerald-300">
                  1
                </div>
                <h3 className="mb-1 font-sans text-[17px] sm:text-[18px] font-semibold text-emerald-200">
                  Maksimalni ukupni gubitak
                </h3>
                <p className="font-sans text-[16px] sm:text-[18px] text-emerald-50/90 leading-relaxed">
                  Ako izgubiš više od{' '}
                  <span className="font-semibold text-emerald-300">20% ukupnog kapitala</span> koji
                  ti je dodeljen, nalog se deaktivira.
                </p>
              </div>

              {/* Pravilo 2 */}
              <div className="rounded-2xl border border-emerald-700 bg-black/70 px-4 py-5 shadow-lg shadow-emerald-900/40">
                <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-[13px] font-semibold text-emerald-300">
                  2
                </div>
                <h3 className="mb-1 font-sans text-[17px] sm:text-[18px] font-semibold text-emerald-200">
                  Maksimalni dnevni gubitak
                </h3>
                <p className="font-sans text-[16px] sm:text-[18px] text-emerald-50/90 leading-relaxed">
                  Ako u jednom danu izgubiš više od{' '}
                  <span className="font-semibold text-emerald-300">1.000 €</span>, nalog se
                  deaktivira.
                </p>
              </div>
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
              Šta tačno dobijaš kupovinom naloga?
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
                Kapital za investiranje
              </h3>
              <p className="font-sans text-[18px] sm:text-[20px] text-slate-100/90 leading-relaxed font-medium tracking-[0.01em]">
                Dobijaš novac od nas koji možeš da investiraš na kripto valutu po tvom izboru. Ne rizikuješ
                sopstveni novac, već koristiš naš kapital.
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
                LOG IN + OBUKA
              </h3>
              <p className="font-sans text-[18px] sm:text-[20px] text-slate-100/90 leading-relaxed font-medium tracking-[0.01em]">
                Dobijaš log in podatke od svog "napunjenog" kripto naloga, uz besplatnu obuku o
                investiranju da bi brže ušao u ritam.
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
                Podela profita
              </h3>
             <p className="text-center font-sans text-[18px] sm:text-[20px] text-slate-100/90 leading-relaxed font-medium tracking-[0.01em]">
  Kada kripto-valuta u koju si odlučio da investiraš zabeleži rast i ti odlučiš da
  napraviš{' '}
  <span className="text-emerald-300 font-semibold">
    CASH OUT
  </span>
  , 80% profita se isplaćuje na tvoju kreditnu karticu ili lični
  kripto račun, a 20% skupljamo mi.
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
  Naš cilj
</h2>
<p className="font-sans text-[18px] sm:text-[20px] leading-[1.5] sm:leading-relaxed max-w-3xl mx-auto text-emerald-50/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
  Naš model je zasnovan na jednostavnom principu —{' '}
  <span className="font-semibold text-emerald-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
    mi zarađujemo samo kada zarađuju naši klijenti.
  </span>
  
  <br className="sm:hidden" />
  <br />
  
  Kroz prirodan proces selekcije, naš kapital se vremenom usmerava ka onima koji ostvaruju najbolje rezultate, 
  čime se rizik za nas smanjuje, a dobit raste.
  
  <br className="sm:hidden" />
  <br />
  
  Na taj način stvaramo sistem u kome i početnici mogu da ostvare značajne profite, 
  dok se uspešnima otvara prostor za veće investicije i zajednički rast.
</p>

  </div>
</section>

      {/* PLANOVI */}
      <section id="plans" className="relative bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-10 pb-14">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400">
              Planovi
            </p>
            <h2 className="mt-2 font-display text-[28px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              Izaberi veličinu naloga.
            </h2>
            
          </div>

          <div className="grid gap-7 justify-items-center sm:grid-cols-2">
            {/* 10K - 99€ */}
            <div className="w-full max-w-sm">
              <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg
                              bg-gradient-to-b from-black via-[#02110b] to-black
                              border-emerald-400 shadow-emerald-500/30 hover:-translate-y-2 ring-2 ring-emerald-500/20
                              transition-all duration-200 ease-out">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 px-4 py-0.5 text-[10px] font-display uppercase tracking-[0.2em] text-black shadow-md">
                  Preporučeno
                </div>
                <div className="mb-4 space-y-1 text-center">
                  <div className="font-display text-[24px] sm:text-[28px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
                    Investicioni nalog sa 10.000€
                  </div>
                  <div className="font-sans text-[14px] text-emerald-400/80 mt-1">
                    Ograničeni gubitak: 20%
                  </div>
                  <div className="font-display text-[16px] font-semibold tracking-[0.08em] text-emerald-300">
                    Cena:
                  </div>
                  <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
                    99€
                  </div>
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
                    💳 Plati karticom
                  </button>
                  <button
                    onClick={() => {
                      if (!token) navigate('/register');
                      else navigate('/pay-crypto/693db3e0e9cf589519c144fe');
                    }}
                    className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] hover:-translate-y-0.5"
                  >
                    🪙 Plati kriptom (79€)
                  </button>
                </div>
              </div>
            </div>

            {/* 20K - 189€ */}
            <div className="w-full max-w-sm">
              <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg
                              bg-gradient-to-b from-black via-[#02110b] to-black
                              border-emerald-700/40 hover:border-emerald-400/80 hover:-translate-y-1
                              transition-all duration-200 ease-out">
                <div className="mb-4 space-y-1 text-center">
                  <div className="font-display text-[24px] sm:text-[28px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
                    Investicioni nalog sa 20.000€
                  </div>
                  <div className="font-sans text-[14px] text-emerald-400/80 mt-1">
                    Ograničeni gubitak: 15%
                  </div>
                  <div className="font-display text-[16px] font-semibold tracking-[0.08em] text-emerald-300">
                    Cena:
                  </div>
                  <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
                    189€
                  </div>
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
                    💳 Plati karticom
                  </button>
                  <button
                    onClick={() => {
                      if (!token) navigate('/register');
                      else navigate('/pay-crypto/693db3ede9cf589519c14500');
                    }}
                    className="w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] hover:-translate-y-0.5"
                  >
                    🪙 Plati kriptom (169€)
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
                    Investicioni {selectedPlan.name}
                  </p>
                  <p className="text-4xl font-display font-extrabold tracking-[0.15em] text-emerald-400 mt-2">
                    {selectedPlan.price}€
                  </p>
                </div>

                <OnSiteStripeCheckout
                  token={token}
                  planId={selectedPlan.id}
                  onSuccess={() => (window.location.href = '/success')}
                />

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setOnSitePlanId(null)}
                    className="text-sm text-slate-400 hover:underline"
                  >
                    Otkaži
                  </button>
                </div>
              </div>
            </div>
          )}

          <p className="mt-8 font-sans text-[13px] text-slate-400 max-w-3xl mx-auto text-center">
            Nakon uspešne uplate, na tvoj Gmail stižu podaci za pristup (email i lozinka), a svoj aktivni plan vidiš u dashboard‑u na našem web sajtu.
          </p>
        </div>
      </section>

      <Leaderboard />

      {/* FAQ */}
      <section className="bg-gradient-to-b from-black via-[#020617] to-black px-4 pt-10 pb-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.24em] text-emerald-400">
              Česta pitanja
            </p>
            <h2 className="mt-2 font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              Šta treba da znaš pre kupovine?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-700/50 bg-black/60 px-5 py-4">
              <h3 className="font-display text-[15px] sm:text-[16px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                Da li moj novac ide na trading nalog?
              </h3>
              <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                Ne. Nakon uspešne kupovine dobijaš login podatke od već postojećeg kripto naloga koji je "napunjen" sa našim kapitalom. Koristiš naš kapital a ne svoj.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-700/50 bg-black/60 px-5 py-4">
              <h3 className="font-display text-[15px] sm:text-[16px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                Kada dobijam pristup dashboard‑u?
              </h3>
              <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                Odmah nakon potvrde uplate dobijaš pristup klijent dashboard‑u i podacima za login.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-700/50 bg-black/60 px-5 py-4">
              <h3 className="font-display text-[15px] sm:text-[16px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                Kako funkcioniše podela profita?
              </h3>
              <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
               Kada kripto-valuta u koju si odlučio da investiraš zabeleži rast i ti odlučiš da napraviš CASH OUT, 80% profita se isplaćuje na tvoju kreditnu karticu ili lični kripto račun, a 20% skupljamo mi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-800/40 bg-black px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-[18px] font-semibold tracking-[0.16em] uppercase text-slate-50">
              Vault<span className="text-emerald-400">Funding</span>
            </div>
            <p className="mt-1 font-sans text-[13px] text-slate-400">
              Profesionalno investiranje za svakoga.
            </p>
          </div>

          <div className="flex flex-col items-start gap-1 font-sans text-[13px] text-slate-400 sm:items-end">
            <button
              onClick={() => navigate('/#plans')}
              className="text-emerald-300 hover:text-emerald-100 transition-colors"
            >
              Planovi i cene
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="text-emerald-300 hover:text-emerald-100 transition-colors"
            >
              Kontakt podrška
            </button>
            <p className="mt-1 text-[12px] text-slate-500">
              © {new Date().getFullYear()} VaultFunding. Sva prava zadržana.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
