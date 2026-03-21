import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Regulatory({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-sky-400 mb-8">
          Regulatory & Legal Information
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">Company Information</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Legal Entity: Arbex Fund B.V.</li>
              <li>Registration: Registered in the Netherlands</li>
              <li>Founded: 2025</li>
              <li>Founder: Kalo Bagijn (Norvestor Equiti B.V.)</li>
              <li>AFM License Number: 14000716</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">Licensing and Compliance</h2>
            <p>Arbex Fund operates under the supervision of the Autoriteit Financiële Markten (AFM) and complies with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Dutch financial services regulations</li>
              <li>EU General Data Protection Regulation (GDPR)</li>
              <li>Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) directives</li>
              <li>Payment Services Directive 2 (PSD2)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">Nature of Services</h2>
            <p>Arbex Fund provides login credentials for third-party trading platforms and education to support skill development. Arbex Fund does not manage accounts.</p>
          </section>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}


