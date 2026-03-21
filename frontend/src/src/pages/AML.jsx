import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AML({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-sky-400 mb-8">
          ANTI-MONEY LAUNDERING (AML) POLICY
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <p>Arbex Fund is committed to preventing the use of our services for money laundering or terrorist financing.</p>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">1. Customer Verification</h2>
            <p>All users must provide accurate identification and contact details before accessing third-party trading accounts.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">2. Monitoring</h2>
            <p>We may monitor accounts and activity for unusual behavior or patterns that could indicate misuse.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">3. Reporting</h2>
            <p>Suspected violations of AML/CTF regulations are reported to the relevant Dutch authorities in accordance with the law.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">4. Compliance</h2>
            <p>Users are expected to comply with all local and international AML/CTF laws. Violations may result in account suspension, closure, and legal action.</p>
          </section>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}


