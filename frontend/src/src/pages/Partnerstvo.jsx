import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Partnerstvo = ({ navigate, token, onLogout }) => {
  const lang = getLang();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 overflow-x-hidden flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} />

      <main className="relative mx-auto max-w-5xl px-4 py-16 space-y-10 flex-1">
        <section className="space-y-3">
          <h1 className="font-display text-[32px] sm:text-[38px] font-extrabold tracking-[0.14em] uppercase text-slate-50">
            OUR PARTNERSHIP WITH NORVESTOR EQUITI B.V.
          </h1>
          <p className="font-sans text-[18px] sm:text-[19px] text-sky-100/95 leading-relaxed max-w-3xl">
            Arbex Fund B.V., owned by Kalo Bagijn, operates in partnership with Norvestor Equiti B.V., a leading Dutch capital fund. This collaboration allows Arbex Fund to provide users with login access to trading accounts with professional capital, along with educational tools and guidance to help users develop their trading skills.
          </p>
        </section>

        <section className="rounded-2xl border border-sky-800/70 bg-black/80 p-6 shadow-lg shadow-sky-500/20 space-y-4">
          <p className="font-display text-[11.5px] uppercase tracking-[0.22em] text-sky-300">
            Through this partnership, users benefit from:
          </p>
          <ul className="mt-1 space-y-3 font-sans text-[17px] sm:text-[18px] text-slate-200 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-sky-400 mt-1">•</span>
              <div className="space-y-0.5">
                <p className="font-semibold text-sky-200">Access to professional trading accounts</p>
                <p>Users can engage with accounts funded by Norvestor Equiti B.V., exploring trading strategies in a real capital environment.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 mt-1">•</span>
              <div className="space-y-0.5">
                <p className="font-semibold text-sky-200">Educational support and tools</p>
                <p>Guidance, analytics, and resources designed to help users learn, track progress, and make informed decisions.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 mt-1">•</span>
              <div className="space-y-0.5">
                <p className="font-semibold text-sky-200">Professional oversight and transparency</p>
                <p>The partnership ensures reliable standards, with both companies operating under Dutch law and regulations.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 mt-1">•</span>
              <div className="space-y-0.5">
                <p className="font-semibold text-sky-200">Global accessibility</p>
                <p>Services are available to users worldwide while maintaining consistent standards and quality.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-sky-800/70 bg-black/80 p-6 shadow-lg shadow-sky-500/20">
          <p className="font-sans text-[17px] sm:text-[18px] text-sky-100/90 leading-relaxed">
            This collaboration provides an opportunity to gain experience with real trading accounts in a structured and supported environment, emphasizing skill development and professional growth.
          </p>
        </section>

        <section className="rounded-2xl border border-sky-800/70 bg-black/80 p-6 shadow-lg shadow-sky-500/20 space-y-3">
          <p className="font-display text-[11.5px] uppercase tracking-[0.22em] text-sky-300">
            COMPANY & REGULATORY INFORMATION
          </p>
          <ul className="mt-1 space-y-2 font-sans text-[17px] sm:text-[18px] text-slate-200 leading-relaxed">
            <li>Arbex Fund B.V.</li>
            <li>Company Registration Number: 10458370</li>
            <li>AFM License Number: 14000716</li>
            <li>Both companies operate under Dutch law and regulatory oversight by the Autoriteit Financiele Markten (AFM).</li>
          </ul>
        </section>

        {/* Nazad na O nama */}
        <section>
          <button
            onClick={() => navigate && navigate('/about')}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-500/80 bg-sky-500/10 px-6 py-2.5 text-[15px] font-sans font-medium text-sky-100 hover:bg-sky-500/20 hover:border-sky-400 transition"
          >
            {t('partner.back', lang)}
          </button>
        </section>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export default Partnerstvo;


