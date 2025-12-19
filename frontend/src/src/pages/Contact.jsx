import React from 'react';

const Contact = ({ navigate }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <main className="relative mx-auto max-w-4xl px-4 py-14 space-y-10">
        {/* Header */}
        <section className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
              Kontakt
            </p>
            <h1 className="mt-2 font-display text-[30px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              Javi se timu
            </h1>
            <p className="mt-3 font-sans text-[15px] text-emerald-100/90 max-w-xl">
              Pitanja o nalozima, plaćanju ili saradnji – piši direktno timu i dobićeš odgovor u kratkom roku.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="hidden rounded-full border border-emerald-500/70 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-emerald-200 transition-colors hover:bg-emerald-500/10 sm:inline-flex"
          >
            Nazad na sajt
          </button>
        </section>

        {/* Kartice sa kontakt podacima */}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
            <p className="mb-2 font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              Podrška za korisnike
            </p>
            <p className="font-sans text-[15px] text-slate-50">Email podrške</p>
            <a
              href="mailto:support@firma.com"
              className="mt-1 inline-block font-sans text-[15px] font-semibold text-emerald-300 hover:text-emerald-100"
            >
              support@firma.com
            </a>
            <p className="mt-3 font-sans text-[13px] text-slate-400">
              Nalozi, uplate, tehnički problemi.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
            <p className="mb-2 font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              Poslovna saradnja
            </p>
            <p className="font-sans text-[15px] text-slate-50">Poslovni kontakt</p>
            <a
              href="mailto:office@firma.com"
              className="mt-1 inline-block font-sans text-[15px] font-semibold text-emerald-300 hover:text-emerald-100"
            >
              office@firma.com
            </a>
            <p className="mt-3 font-sans text-[13px] text-slate-400">
              Partnerstva, affiliate i B2B upiti.
            </p>
          </div>
        </section>

        {/* Adresa / radno vreme */}
        <section className="space-y-3 rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
            Detalji kompanije
          </p>
          <p className="font-sans text-[15px] text-slate-50">
            Naziv firme d.o.o.
            <br />
            Ulica i broj, Grad, Država
          </p>
          <p className="font-sans text-[13px] text-slate-400">
            Radnim danima 9–17h (CET). Na email obično odgovaramo u roku od 24 sata.
          </p>
        </section>

        {/* Kratak FAQ uz kontakt */}
        <section className="space-y-3 rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
            Šta da pošalješ u poruci
          </p>
          <div className="space-y-2 font-sans text-[13px] text-slate-300">
            <p>• Problem sa uplatom: email naloga, tip uplate (kartica/kripto) i vreme transakcije.</p>
            <p>• Pitanje o pravilima: koji paket koristiš (10K ili 25K) i na kojoj platformi trguješ.</p>
            <p>• Saradnja: par rečenica o projektu i publici (YouTube, Discord, Telegram...).</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
