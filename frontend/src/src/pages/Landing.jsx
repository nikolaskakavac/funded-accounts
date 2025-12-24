import React, { useState } from 'react';
import Leaderboard from '../components/Leaderboard';

const Landing = ({ navigate, token }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePrimary = () => {
    if (token) navigate('/dashboard');
    else navigate('/pricing');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* HERO sa BTC pozadinom */}
      <div
        className="
          flex flex-col
          bg-no-repeat
          bg-left
          bg-contain
          min-h-[520px]
          sm:min-h-[580px]
          md:bg-cover md:bg-[center_top] md:min-h-[640px]
        "
        style={{ backgroundImage: "url('/img/crypto-bg.jpeg')" }}
      >
        {/* tamniji overlay radi čitljivosti teksta */}
        <div className="flex-1 bg-black/80 flex flex-col relative overflow-hidden border-b border-emerald-500/10">
          {/* HEADER */}
          <header className="flex items-center justify-between px-4 pt-4 pb-2 max-w-5xl mx-auto w-full relative z-20">
            <div className="text-lg font-display font-semibold tracking-[0.12em] uppercase">
              Vault<span className="text-emerald-400">Funding</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-sans">
              <button className="uppercase tracking-[0.18em] text-slate-300">
                SRB
              </button>

              {/* HAMBURGER SA ANIMACIJOM */}
              <button
                type="button"
                className="relative h-6 w-7 flex items-center justify-center"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span
                  className={
                    'absolute h-0.5 w-6 bg-white rounded-full transition-transform duration-200 ' +
                    (menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2')
                  }
                />
                <span
                  className={
                    'absolute h-0.5 w-6 bg-white rounded-full transition-opacity duration-150 ' +
                    (menuOpen ? 'opacity-0' : 'opacity-100')
                  }
                />
                <span
                  className={
                    'absolute h-0.5 w-6 bg-white rounded-full transition-transform duration-200 ' +
                    (menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2')
                  }
                />
              </button>
            </div>
          </header>

          {/* OVERLAY MENI */}
          <div className="relative flex-1">
            {menuOpen && (
              <div className="absolute inset-x-0 top-0 z-30 bg-black/85 backdrop-blur-sm border-b border-emerald-500/30">
                <div className="max-w-5xl mx-auto px-4 pt-3 pb-4 relative">
                  {/* CLOSE BUTTON */}
                
                  <nav className="flex flex-col gap-2 text-sm font-sans font-medium tracking-[0.14em] uppercase text-center">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handlePrimary();
                      }}
                      className="py-2"
                    >
                      Početna
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/pricing');
                      }}
                      className="py-2"
                    >
                      Planovi
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/about');
                      }}
                      className="py-2"
                    >
                      O nama
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/contact');
                      }}
                      className="py-2"
                    >
                      Kontakt
                    </button>
                    {token ? (
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate('/dashboard');
                        }}
                        className="mt-3 rounded-full bg-emerald-500 py-2 text-sm font-semibold text-black"
                      >
                        Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate('/login');
                        }}
                        className="mt-3 rounded-full bg-emerald-500 py-2 text-sm font-semibold text-black"
                      >
                        Prijava
                      </button>
                    )}
                  </nav>
                </div>
              </div>
            )}

            {/* HERO TEKST */}
            <main className="px-4 pb-6 pt-10 flex-1 flex">
              <section className="w-full max-w-5xl mx-auto self-start text-center">
                <h1
                  className="font-display text-[38px] sm:text-[44px] lg:text-[56px] leading-[1.03] font-extrabold tracking-[0.12em] uppercase
                              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
                              opacity-0 translate-y-3 animate-[fadeUp_0.6s_ease-out_forwards]"
                >
                  Dobij novac od nas da investiraš u kripto.
                  <br />
                  <span className="text-emerald-400">Ostvari velike profite.</span>
                </h1>

                <p
                  className="mt-6 font-sans text-[18px] sm:text-[20px] lg:text-[22px] max-w-3xl mx-auto
                              drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] font-medium tracking-[0.02em]
                              text-transparent sm:text-slate-200/90
                              opacity-0 translate-y-3 animate-[fadeUp_0.7s_ease-out_forwards]"
                >
                  Trguj sa velikim računom dok tvoj novac ostaje siguran.{` `}
                  <span className="font-semibold text-transparent sm:text-emerald-200">
                    Mi obezbeđujemo kapital i preuzimamo rizik
                  </span>
                  , ti se fokusiraš samo na rezultate.
                </p>

                <p
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-black/80
                              px-5 py-2.5 text-[17px] sm:text-[18px] lg:text-[19px] font-display font-semibold tracking-[0.18em]
                              uppercase text-emerald-200 opacity-0 translate-y-3 animate-[fadeUp_0.8s_ease-out_forwards]"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Podeli profit. Zadrži kontrolu.
                </p>

                <div
                  className="mt-10 space-y-4 w-full max-w-xl mx-auto pb-4 font-sans
                              opacity-0 translate-y-3 animate-[fadeUp_0.9s_ease-out_forwards]"
                >
                  <button
                    onClick={handlePrimary}
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
                    onClick={() => navigate('/pricing')}
                    className="w-full rounded-full border border-emerald-500 py-3.5 sm:py-4 text-[16px] sm:text-[18px]
                               font-semibold tracking-[0.12em] uppercase text-emerald-400 bg-black/40
                               transition-all duration-200 ease-out hover:-translate-y-1
                               hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/30 active:translate-y-0"
                  >
                    Pogledaj planove
                  </button>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* BLOK: Kako funkcioniše + Pravila rizika */}
      <div className="bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-10 pb-12">
        <div className="max-w-5xl mx-auto">
          <section className="mt-4 rounded-3xl border border-emerald-700/70 bg-black/80 px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-display text-[24px] sm:text-[32px] uppercase tracking-[0.26em] text-emerald-400 mb-5">
              Kako funkcioniše
            </h2>

            <p className="font-sans text-[20px] sm:text-[22px] text-emerald-50/95 leading-relaxed max-w-3xl mx-auto mb-4">
              Kada kupiš nalog na našem websajtu, dobijaš log in podatke od već postojećeg,
              unapred <span className="font-semibold text-emerald-300">„napunjenog“ kripto naloga</span>.
              Svaki kupac dobija svoj, zaseban nalog – nema deljenja sa drugima.
              <br />
              <br />
              Tvoj zadatak je jasan: ostvari profit investirajući u neku od kripto-valuta
              sa našim novcem. Ti se fokusiraš isključivo na investiranje, dok mi brinemo o
              nalogu, kapitalu i kompletnoj tehničkoj infrastrukturi.
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
                Kapital za trgovanje
              </h3>
              <p className="font-sans text-[18px] sm:text-[20px] text-slate-100/90 leading-relaxed font-medium tracking-[0.01em]">
                Dobijaš novac od nas koji možeš da investiraš na kripto tržištu. Ne rizikuješ
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
                napraviš "CASH OUT", 80% profita se isplaćuje na tvoju kreditnu karticu ili lični
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
      <section className="relative bg-gradient-to-b from-black via-emerald-950 to-black px-4 pt-10 pb-14">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400">
              Funding planovi
            </p>
            <h2 className="mt-2 font-display text-[28px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              Izaberi veličinu naloga.
            </h2>
            <p className="mt-3 font-sans text-[15px] sm:text-[17px] text-emerald-100/90 max-w-3xl mx-auto leading-relaxed">
              10K za 79€ ili 20K za 169€ – jasne cene, bez skrivenih naknada.
            </p>
          </div>

          <div className="grid gap-7 justify-items-center sm:grid-cols-2">
            {/* 10K - 79€ */}
            <div className="w-full max-w-sm">
              <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg bg-gradient-to-b from-black via-[#02110b] to-black border-emerald-700/40 hover:border-emerald-400/80 hover:-translate-y-1 transition-all duration-200 ease-out">
                <div className="mb-4 space-y-1">
                  <div className="font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                    10.000€
                  </div>
                  <div className="font-display text-[20px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
                    10K Kapital
                  </div>
                  <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
                    79€
                  </div>
                </div>
                <div className="mb-3 font-sans text-[12px] text-emerald-200/90">Idealno za početak</div>
                <p className="mb-5 font-sans text-[14px] sm:text-[15px] text-slate-100/90 leading-relaxed">
                  Testiraj sistem sa manjim kapitalom.
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-[13px] sm:text-[14px] font-sans font-semibold uppercase tracking-[0.14em] text-black shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
                  >
                    Plati karticom <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-[13px] sm:text-[14px] font-sans uppercase tracking-[0.14em] text-emerald-200 hover:bg-emerald-500/10 transition-all duration-200"
                  >
                    Plati kriptom
                  </button>
                </div>
              </div>
            </div>

            {/* 20K - 169€ */}
            <div className="w-full max-w-sm">
              <div className="relative flex h-full flex-col rounded-3xl border p-6 shadow-lg
                              bg-gradient-to-b from-black via-[#02110b] to-black
                              border-emerald-400 shadow-emerald-500/30 hover:-translate-y-2 ring-2 ring-emerald-500/20
                              transition-all duration-200 ease-out">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 px-4 py-0.5 text-[10px] font-display uppercase tracking-[0.2em] text-black shadow-md">
                  Preporučeno
                </div>
                <div className="mb-4 space-y-1">
                  <div className="font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                    20.000€
                  </div>
                  <div className="font-display text-[20px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
                    20K Kapital
                  </div>
                  <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
                    169€
                  </div>
                </div>
                <div className="mb-3 font-sans text-[12px] text-emerald-200/90">
                  Najčešći izbor
                </div>
                <p className="mb-5 font-sans text-[14px] sm:text-[15px] text-slate-100/90 leading-relaxed">
                  Veći kapital, bolji profit potencijal.
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-[13px] sm:text-[14px] font-sans font-semibold uppercase tracking-[0.14em] text-black shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
                  >
                    Plati karticom <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-[13px] sm:text-[14px] font-sans uppercase tracking-[0.14em] text-emerald-200 hover:bg-emerald-500/10 transition-all duration-200">
                    Plati kriptom
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 font-sans text-[13px] text-slate-400 max-w-3xl mx-auto text-center">
            Nakon uspešne uplate, tvoj aktivni plan se prikazuje u klijent dashboard‑u zajedno
            sa pravilima trgovanja. Uvek možeš kasnije da pređeš na veći nalog kada ti rezultati
            postanu stabilni.
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
                Ne. Plaćaš samo naknadu za funded nalog i pristup kapitalu naše firme.
                Tvoj lični novac ostaje odvojen od trading naloga.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-700/50 bg-black/60 px-5 py-4">
              <h3 className="font-display text-[15px] sm:text-[16px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                Kada dobijam pristup dashboard‑u?
              </h3>
              <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                Odmah nakon potvrde uplate dobijaš pristup klijent dashboard‑u, pravilima
                trgovanja i podacima za logovanje na trading platformu.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-700/50 bg-black/60 px-5 py-4">
              <h3 className="font-display text-[15px] sm:text-[16px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                Kako funkcioniše podela profita?
              </h3>
              <p className="mt-1 font-sans text-[14px] sm:text-[15px] text-slate-200/90 leading-relaxed">
                Kada zatvoriš profitabilan period trgovanja, 70% profita ide tebi,
                30% firmi. Isplate se rade na osnovu dogovorenog rasporeda.
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
              Nije investicioni savet. Trgovanje kriptom nosi visok nivo rizika gubitka kapitala.
            </p>
          </div>

          <div className="flex flex-col items-start gap-1 font-sans text-[13px] text-slate-400 sm:items-end">
            <button
              onClick={() => navigate('/pricing')}
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
