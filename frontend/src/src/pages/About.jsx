import React from 'react';
import Header from '../components/Header';

const About = ({ navigate, token, onLogout }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50 overflow-x-hidden">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <main className="relative mx-auto max-w-5xl px-4 py-16 space-y-12">

        {/* Naslov + uvod */}
        <section>
          <h1 className="font-display text-[34px] sm:text-[40px] font-extrabold tracking-[0.14em] uppercase text-slate-50 flex items-center gap-3">
            🌍 O nama
          </h1>

          <p className="mt-3 font-sans text-[22px] sm:text-[24px] text-emerald-100/95 leading-relaxed">
            Povezujemo globalni kapital sa lokalnim potencijalom
          </p>

          {/* Glavni opis */}
          <div className="mt-8 space-y-6 max-w-4xl">
            {/* Naše poreklo */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                🏢 Naše poreklo
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                Naša kompanija deo je međunarodne korporacije Equiti Seychelles Ltd., jednog od vodećih
                kapitalnih fondova specijalizovanih za investicije u kriptovalute i obveznice.
              </p>
            </div>

            {/* Regionalni pristup */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                🌍 Regionalni pristup
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                Kao regionalni partner Equiti grupe, pokrećemo poslovanje na balkanskom tržištu kako
                bismo približili savremene investicione mogućnosti i profesionalne alate pojedincima i
                timovima širom regiona.
              </p>
            </div>

            {/* Naš model */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                💼 Naš model
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                Naš model omogućava investitorima da pristupe kapitalu, stručnoj podršci i bezbednom
                okruženju za ulaganje, bez potrebe da rizikuju sopstvena sredstva.
              </p>
            </div>

            {/* Izgradnja mreže */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                🤝 Izgradnja mreže
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                Zajedno sa Equiti Seychelles fondom, gradimo mrežu investitora koji ostvaruju stabilne
                i dugoročne rezultate, dok region Balkana pozicioniramo kao novo središte pametnog investiranja.
              </p>
            </div>

            {/* Naša misija */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                🎯 Naša misija
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                Naš cilj je jasan – podržati uspešne investitore, smanjiti rizik i ostvariti zajednički rast.
              </p>
            </div>

            {/* Registracioni broj */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-300/90 font-semibold text-[18px] sm:text-[19px] text-center">
                📋 Registracioni broj kompanije: <span className="text-emerald-200 font-bold">EQS-BAL-2025-047</span>
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="flex justify-center mt-8">
            <span className="text-emerald-400/60 text-2xl">⸻</span>
          </div>

          {/* CTA dugme */}
          <button
            onClick={() => navigate && navigate('/partnerstvo')}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/80 bg-emerald-500/15 px-6 py-2.5 text-[16px] font-sans font-semibold text-emerald-100 hover:bg-emerald-500/25 hover:border-emerald-400 transition"
          >
            🔗 Saznajte više o našem partnerstvu
          </button>
        </section>

        {/* Statistike / highlight-i */}
        <section className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20 space-y-1.5">
            <p className="font-display text-[22px] uppercase tracking-[0.22em] text-emerald-300">
              Traderi
            </p>
            <p className="font-display text-[28px] font-extrabold text-emerald-300">
              200+
            </p>
            <p className="font-sans text-[20px] text-slate-300">
              Aktivnih naloga na kripto tržištima.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20 space-y-1.5">
            <p className="font-display text-[22px] uppercase tracking-[0.22em] text-emerald-300">
              Maksimalni nalog
            </p>
            <p className="font-display text-[28px] font-extrabold text-emerald-300">
              $200K
            </p>
            <p className="font-sans text-[20px] text-slate-300">
              Skaliranje kapitala za dosledne tradere.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20 space-y-1.5">
            <p className="font-display text-[22px] uppercase tracking-[0.22em] text-emerald-300">
              Podela profita
            </p>
            <p className="font-display text-[28px] font-extrabold text-emerald-300">
              Do 70%
            </p>
            <p className="font-sans text-[20px] text-slate-300">
              Veći deo dobiti ostaje traderu.
            </p>
          </div>
        </section>

        {/* Kako radimo */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <div className="space-y-4">
            <p className="font-sans text-[18px] text-emerald-100/90 leading-relaxed">
              Mi obezbeđujemo kapital i limite rizika. Ti biraš veličinu naloga, završavaš uplatu i
              pratiš sve kroz jednostavan, pregledan dashboard.
            </p>
            <p className="font-sans text-[18px] text-emerald-100/90 leading-relaxed">
              Trguješ na platformi koju znaš (npr. MT5), dok mi vodimo računa o aktivaciji naloga,
              praćenju pravila i isplatama profita.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
              <p className="mb-1.5 font-display text-[12px] uppercase tracking-[0.22em] text-emerald-300">
                Naša filozofija
              </p>
              <p className="font-sans text-[16px] text-slate-300">
                Partnerstvo, ne “test”. Kada ti praviš rezultate, zajedno širimo kapital.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
              <p className="mb-1.5 font-display text-[12px] uppercase tracking-[0.22em] text-emerald-300">
                Fokus na rizik
              </p>
              <p className="font-sans text-[16px] text-slate-300">
                Jasni dnevni limiti i ukupni drawdown štite i fond i tradera od prevelikog gubitka.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
              <p className="mb-1.5 font-display text-[12px] uppercase tracking-[0.22em] text-emerald-300">
                Tehnologija
              </p>
              <p className="font-sans text-[16px] text-slate-300">
                Stripe i kripto gateway za uplate, automatska aktivacija naloga i praćenje u realnom
                vremenu kroz dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Vrednosti / šta garantujemo */}
        <section className="mt-2 rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="mb-4 font-display text-[12px] uppercase tracking-[0.23em] text-emerald-300">
            Šta možeš da očekuješ
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="mb-1.5 font-display text-[16px] font-semibold text-emerald-200">
                Jasni uslovi
              </p>
              <p className="font-sans text-[15px] text-slate-300">
                Limiti, troškovi i pravila su prikazani pre kupovine naloga.
              </p>
            </div>
            <div>
              <p className="mb-1.5 font-display text-[16px] font-semibold text-emerald-200">
                Fokus na traderu
              </p>
              <p className="font-sans text-[15px] text-slate-300">
                Podrška oko naloga i plaćanja da se ti baviš samo tradingom.
              </p>
            </div>
            <div>
              <p className="mb-1.5 font-display text-[16px] font-semibold text-emerald-200">
                Dugoročna igra
              </p>
              <p className="font-sans text-[15px] text-slate-300">
                Cilj je stabilna i dugoročna saradnja, ne kazna za svaku grešku.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
