import React from 'react';
import Header from '../components/Header';

const Partnerstvo = ({ navigate, token, onLogout }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50 overflow-x-hidden">
      <Header navigate={navigate} token={token} onLogout={onLogout} />

      <main className="relative mx-auto max-w-5xl px-4 py-16 space-y-10">
        {/* Naslov */}
        <section className="space-y-3">
          <h1 className="font-display text-[32px] sm:text-[38px] font-extrabold tracking-[0.14em] uppercase text-slate-50">
            Naše partnerstvo sa Equiti Seychelles Ltd.
          </h1>
          <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/95 leading-relaxed max-w-2xl">
            Globalni fond, lokalne prilike.
          </p>
        </section>

        {/* Uvodni opis */}
        <section className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20 space-y-3">
          <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
            Naša kompanija posluje u partnerstvu sa Equiti Seychelles Ltd., jednim od vodećih međunarodnih
            kapitalnih fondova za investicije u kriptovalute i obveznice.
          </p>
          <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
            Ovo partnerstvo nam omogućava da investitorima u regionu Balkana pružimo pristup profesionalnom
            kapitalu, savremenim alatima i stručnoj podršci koja je inače dostupna samo globalnim tržištima.
          </p>
        </section>

        {/* Separator */}
        <div className="flex justify-center">
          <span className="text-emerald-400/60 text-2xl">⸻</span>
        </div>

        {/* Šta partnerstvo znači za vas */}
        <section className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20 space-y-3">
          <p className="font-display text-[11.5px] uppercase tracking-[0.22em] text-emerald-300">
            Šta partnerstvo znači za vas
          </p>
          <ul className="mt-1 space-y-3 font-sans text-[17px] sm:text-[18px] text-slate-200 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><span className="font-semibold text-emerald-200">Sigurnost ulaganja</span> – Klijenti dobijaju pristup kapitalu fonda, uz jasno definisana pravila rizika i podršku stručnog tima.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><span className="font-semibold text-emerald-200">Pristup vrhunskim investicionim alatima</span> – Naša platforma omogućava lako praćenje i upravljanje investicijama, sa analitikom i vodičima prilagođenim početnicima i iskusnim investitorima.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><span className="font-semibold text-emerald-200">Transparentnost i poverenje</span> – Partnerstvo sa Equiti Seychelles garantuje visoke standarde poslovanja i profesionalni nadzor.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><span className="font-semibold text-emerald-200">Regionalni fokus</span> – Kao lokalni partner, posvećeni smo razvoju Balkana kao rastućeg tržišta za profesionalno investiranje.</span>
            </li>
          </ul>
        </section>

        {/* Separator */}
        <div className="flex justify-center">
          <span className="text-emerald-400/60 text-2xl">⸻</span>
        </div>

        {/* Završni deo */}
        <section className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20 space-y-3">
          <p className="font-sans text-[17px] sm:text-[18px] text-emerald-100/90 leading-relaxed">
            Ovo partnerstvo omogućava svakom investitoru da učestvuje u ozbiljnim globalnim investicijama,
            bez rizika po sopstveni kapital, uz potencijal za dugoročne i stabilne profite.
          </p>
          <p className="font-sans text-[17px] sm:text-[18px] text-emerald-100/90 leading-relaxed">
            Naš model favorizuje investitore koji uče, rastu i ostvaruju rezultate, čime stvaramo obostranu
            vrednost i održiv sistem za sve uključene strane.
          </p>
        </section>

        {/* Separator */}
        <div className="flex justify-center">
          <span className="text-emerald-400/60 text-2xl">⸻</span>
        </div>

        {/* Registracioni broj */}
        <section className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="font-sans text-[17px] text-emerald-300/90 font-medium text-center">
            Registracioni broj kompanije: EQS-BAL-2025-047
          </p>
        </section>

        {/* Nazad na O nama */}
        <section>
          <button
            onClick={() => navigate && navigate('/about')}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/80 bg-emerald-500/10 px-6 py-2.5 text-[15px] font-sans font-medium text-emerald-100 hover:bg-emerald-500/20 hover:border-emerald-400 transition"
          >
            ← Nazad na O nama
          </button>
        </section>
      </main>
    </div>
  );
};

export default Partnerstvo;
