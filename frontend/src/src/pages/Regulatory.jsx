import Header from '../components/Header';

export default function Regulatory({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-white">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-emerald-400 mb-8">
          Regulatory & Legal Information
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">1. Company Information</h2>
            <p><strong>Legal Entity:</strong> Arbex Fund B.V.<br />
            <strong>Registration:</strong> Registered in the Netherlands<br />
            <strong>Founded:</strong> 2025<br />
            <strong>Founder:</strong> Pedja atgjsarmig (Norvestor Equiti B.V.)<br />
            <strong>AFM License Number:</strong> 14000716</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">2. Licensing and Regulation</h2>
            <p>Arbex Fund operates under the supervision of the Autoriteit Financiële Markten (AFM), the Dutch financial regulatory authority. Our license (14000716) allows us to offer educational and simulated trading services within the European Union.</p>
            <p className="mt-2">We comply with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Dutch financial services regulations</li>
              <li>EU General Data Protection Regulation (GDPR)</li>
              <li>Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) directives</li>
              <li>Payment Services Directive 2 (PSD2) for secure payment processing</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">3. Nature of Services</h2>
            <p>Arbex Fund provides simulated trading environments and educational materials. All trading accounts are demonstration accounts and do not involve real capital or access to live financial markets. No real trading orders are executed on behalf of users.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">4. Disclaimers</h2>
            <p><strong>No Investment Advice:</strong> Arbex Fund does not provide investment, financial, legal, or tax advice. All content is for educational purposes only.</p>
            <p className="mt-2"><strong>No Guarantees:</strong> We do not guarantee profits, performance, or specific outcomes. Past results do not predict future success.</p>
            <p className="mt-2"><strong>User Responsibility:</strong> Users are responsible for understanding the risks associated with trading and ensuring compliance with local laws.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">5. Intellectual Property</h2>
            <p>All content, trademarks, logos, and intellectual property on Arbex Fund are owned by ARB Innovations LLC or licensed to us. Unauthorized use, reproduction, or distribution is prohibited and may result in legal action.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">6. Governing Law</h2>
            <p>These terms and all Arbex Fund services are governed by the laws of the Netherlands. Any disputes arising from the use of our platform will be subject to the exclusive jurisdiction of the courts in Amsterdam, Netherlands.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">7. User Conduct</h2>
            <p>Users must not:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Engage in fraudulent, abusive, or illegal activity.</li>
              <li>Provide false or misleading information.</li>
              <li>Attempt to hack, disrupt, or compromise the security of our platform.</li>
              <li>Use our services for money laundering or terrorist financing.</li>
            </ul>
            <p className="mt-2">Violations may result in immediate account suspension and legal action.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">8. Payment and Refunds</h2>
            <p>All payments are processed securely through Stripe (for card payments) or NOWPayments (for cryptocurrency). Prices are non-refundable unless otherwise stated in our Refund Policy. All fees are listed in euros (€).</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">9. Data Protection</h2>
            <p>Arbex Fund is committed to protecting user privacy in accordance with GDPR. We collect only necessary data, do not sell personal information, and implement industry-standard security measures. For full details, see our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">10. Updates and Changes</h2>
            <p>We reserve the right to update these legal terms, policies, and service offerings at any time. Material changes will be communicated via email or a notice on our website. Continued use of Arbex Fund after changes indicates acceptance of updated terms.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">11. Contact Information</h2>
            <p>For legal, regulatory, or compliance inquiries, contact:<br />
            📧 support@arbexfund.com<br />
            📧 info@arbexfund.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
