import React from 'react';

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <main className="relative mx-auto max-w-3xl px-4 py-16 space-y-8">
        <section>
          <h1 className="mb-3 text-3xl md:text-4xl font-semibold text-slate-900">
            Kontakt
          </h1>
          <p className="text-sm sm:text-base text-slate-700">
            Imate pitanje u vezi naloga, plaćanja ili saradnje? Pišite nam i tim će vam odgovoriti u
            najkraćem roku.
          </p>
        </section>

        {/* Kartice sa kontakt podacima */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Podrška za korisnike
            </p>
            <p className="mb-1 text-sm text-slate-800">Email podrške:</p>
            <p className="text-sm font-medium text-sky-700">
              support@firma.com
            </p>
            <p className="mt-2 text-xs text-slate-600">
              Pitanja o nalozima, plaćanjima i tehničkim problemima.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Poslovna saradnja
            </p>
            <p className="mb-1 text-sm text-slate-800">Poslovni kontakt:</p>
            <p className="text-sm font-medium text-sky-700">
              office@firma.com
            </p>
            <p className="mt-2 text-xs text-slate-600">
              Partnerstva, affiliate program i B2B upiti.
            </p>
          </div>
        </section>

        {/* Adresa / radno vreme */}
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Detalji kompanije
          </p>
          <p className="text-slate-800">
            Naziv firme d.o.o.
            <br />
            Ulica i broj, Grad, Država
          </p>
          <p className="text-xs text-slate-600">
            Radnim danima 9–17h (CET). Na email obično odgovaramo u roku od 24 sata.
          </p>
        </section>

        {/* Kratak “FAQ” uz kontakt */}
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Pre nego što pišete
          </p>
          <div className="space-y-2 text-xs text-slate-700">
            <p>
              • Problem sa uplatom: pošaljite email adresu naloga, tip uplate (kartica/kripto) i
              vreme transakcije.
            </p>
            <p>
              • Pitanja o pravilima: napišite koji paket koristite (10K, 25K, 50K) i platformu na
              kojoj trgujete.
            </p>
            <p>
              • Saradnja: kratko opišite vaš projekat ili publiku (YouTube, Discord, Telegram...).
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
