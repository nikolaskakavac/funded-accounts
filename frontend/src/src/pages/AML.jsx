import Header from '../components/Header';

export default function AML({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-white">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-emerald-400 mb-8">
          Anti-Money Laundering Policy
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">1. Introduction</h2>
            <p>Arbex Fund is committed to preventing money laundering, terrorist financing, and other illicit financial activities. We comply with applicable Dutch and European Union (EU) anti-money laundering (AML) and counter-terrorist financing (CTF) laws.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">2. Our Obligations</h2>
            <p>Arbex Fund is required to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Verify the identity of all customers before granting access to services.</li>
              <li>Monitor transactions for suspicious activity.</li>
              <li>Report suspected money laundering or terrorist financing to competent authorities.</li>
              <li>Keep accurate records of user information and transactions for at least five years.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">3. Know Your Customer (KYC)</h2>
            <p>When you register or make a payment, we collect and verify:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Payment information (processed securely through Stripe or NOWPayments)</li>
              <li>Device and IP address for fraud prevention</li>
            </ul>
            <p className="mt-2">Additional identity documents may be requested if required by law or if suspicious activity is detected.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">4. Transaction Monitoring</h2>
            <p>We monitor user activity to detect patterns consistent with money laundering, including unusual payment amounts, multiple failed transactions, or suspicious payment sources. If suspicious activity is identified, we may freeze accounts and report to relevant authorities.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">5. Cooperation with Authorities</h2>
            <p>Arbex Fund cooperates fully with law enforcement, regulatory bodies, and financial intelligence units. If we receive a lawful request for user information, we will provide it without prior notice to the user, as required by law.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">6. Prohibited Activities</h2>
            <p>Users may not:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Use Arbex Fund to launder money or fund illegal activities.</li>
              <li>Provide false or misleading information.</li>
              <li>Use accounts for purposes other than those outlined in our Terms & Conditions.</li>
            </ul>
            <p className="mt-2">Violations may result in immediate account suspension and reporting to authorities.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">7. User Responsibility</h2>
            <p>By using Arbex Fund, you confirm that all funds used are from legitimate sources and that you are not engaged in illegal activity. You agree to provide accurate information and comply with all KYC and AML requirements.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">8. Updates to This Policy</h2>
            <p>This AML Policy may be updated to reflect changes in laws, regulations, or business operations. Changes will be posted on this page with a revised effective date.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">9. Contact Us</h2>
            <p>For questions or concerns regarding AML compliance, please contact:<br />
            📧 support@arbexfund.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
