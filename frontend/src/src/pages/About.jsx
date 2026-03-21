import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = ({ navigate, token, onLogout }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 overflow-x-hidden flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <main className="relative mx-auto max-w-5xl px-4 pb-16 pt-6 space-y-10 flex-1">
        <section className="space-y-5">
          <h1 className="font-display text-[34px] sm:text-[40px] font-extrabold tracking-[0.14em] uppercase text-slate-50">
            About Us
          </h1>
          <p className="font-sans text-[18px] sm:text-[19px] text-sky-100/90 leading-relaxed">
            Arbex Fund B.V. is a Dutch company founded in 2025 by Milos Jevrosimovic and Kalo Bagijn, the founder of BinckBank, one of Europe's largest and most trusted online investment banks.
          </p>
          <p className="font-sans text-[18px] sm:text-[19px] text-sky-100/90 leading-relaxed">
            Our mission is to provide individuals with access to professional investment environments, educational resources, and real-market tools that promote responsible, informed, and skill-based participation in the financial markets.
          </p>
          <p className="font-sans text-[18px] sm:text-[19px] text-sky-100/90 leading-relaxed">
            By combining industry expertise, technological innovation, and a strong commitment to transparency and professionalism, Arbex Fund offers a structured environment for investors to learn, analyze, and grow through practical market experience.
          </p>
        </section>

        <section className="rounded-2xl border border-sky-800/70 bg-black/80 p-6 shadow-lg shadow-sky-500/20 space-y-4">
          <h2 className="font-display text-[16px] uppercase tracking-[0.22em] text-sky-300">
            Our Partnership With BinckBank
          </h2>
          <p className="font-sans text-[17px] sm:text-[18px] text-slate-200 leading-relaxed">
            Arbex Fund B.V. operates in partnership with BinckBank, a pioneering Dutch investment platform recognized for its leadership in online investing and portfolio management.
          </p>
          <p className="font-sans text-[17px] sm:text-[18px] text-slate-200 leading-relaxed">
            Through this partnership, Arbex Fund provides users with secure access to professional investment accounts, educational support, and data-driven analytical tools that strengthen their financial understanding and long-term investment approach.
          </p>
          <p className="font-sans text-[16px] sm:text-[17px] text-sky-100/90 leading-relaxed">
            Users benefit from:
          </p>
          <ul className="space-y-3 font-sans text-[16px] sm:text-[17px] text-slate-200 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-sky-400 mt-1">•</span>
              <div>
                <p className="font-medium text-sky-200">Access to professional investment accounts</p>
                <p>Accounts integrated through BinckBank, offering authentic exposure to real financial markets and portfolio conditions.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 mt-1">•</span>
              <div>
                <p className="font-medium text-sky-200">Comprehensive educational tools</p>
                <p>Guidance, analytics, and structured learning resources designed to help users develop disciplined and informed investing strategies.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 mt-1">•</span>
              <div>
                <p className="font-medium text-sky-200">Professional oversight and transparency</p>
                <p>Both companies operate under Dutch law and adhere to regulatory standards set by the Autoriteit Financiële Markten (AFM).</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 mt-1">•</span>
              <div>
                <p className="font-medium text-sky-200">Global accessibility</p>
                <p>Arbex Fund's platform is available to users worldwide, ensuring consistency, professionalism, and high service quality.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-sky-800/70 bg-black/80 p-6 shadow-lg shadow-sky-500/20 space-y-3">
          <h2 className="font-display text-[16px] uppercase tracking-[0.22em] text-sky-300">
            Company & Regulatory Information
          </h2>
          <ul className="space-y-2 font-sans text-[16px] sm:text-[17px] text-slate-200 leading-relaxed">
            <li><span className="font-medium">Name:</span> Arbex Fund B.V.</li>
            <li><span className="font-medium">Founded:</span> 2025</li>
            <li><span className="font-medium">Founders:</span> Milos Jevrosimovic & Kalo Bagijn</li>
            <li><span className="font-medium">Partnership:</span> BinckBank</li>
            <li><span className="font-medium">Company Registration Number:</span> 10458370</li>
            <li><span className="font-medium">Regulatory Oversight:</span> Autoriteit Financiële Markten (AFM)</li>
            <li><span className="font-medium">Jurisdiction:</span> Operating under Dutch law</li>
          </ul>
        </section>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export default About;


