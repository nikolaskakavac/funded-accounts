import Header from '../components/Header';

export default function Refund({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-white">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-emerald-400 mb-8">
          Refund Policy
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">1. Introduction</h2>
            <p>Arbex Fund ("we", "our", "us") strives to provide high-quality digital services and a transparent user experience. This Refund Policy explains when and how refunds may be issued for purchases made through our website.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">2. Nature of Our Products</h2>
            <p>All Arbex Fund services—including trading evaluations, simulated accounts, and educational materials—are digital and delivered instantly after payment. Because access is granted immediately, all sales are final and non-refundable, except in limited cases described below.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">3. Refund Eligibility</h2>
            <p>A refund may be considered only if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>You were charged more than once for the same product.</li>
              <li>A technical issue on our side prevented access to your purchased service and we cannot resolve it within a reasonable time.</li>
              <li>Your payment was made in error and access was not yet used or activated.</li>
            </ul>
            <p className="mt-2">Refund requests that do not meet these criteria will not be approved.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">4. How to Request a Refund</h2>
            <p>To request a refund, contact our support team within 7 days of your purchase at support@arbexfund.com.</p>
            <p className="mt-2">Please include your:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Full name</li>
              <li>Email address used for purchase</li>
              <li>Transaction ID or payment confirmation</li>
              <li>Reason for your request</li>
            </ul>
            <p className="mt-2">We aim to respond within 3–5 business days.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">5. Processing Refunds</h2>
            <p>Approved refunds are processed through Stripe, our secure payment provider. Refunds will be returned to the original payment method only. Processing times may vary depending on your bank or card issuer.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">6. Non-Refundable Situations</h2>
            <p>Refunds will not be issued for:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Completed or partially used evaluation accounts.</li>
              <li>Dissatisfaction with trading results or platform performance.</li>
              <li>Failure to meet evaluation rules or criteria.</li>
              <li>Ineligibility for a simulated account due to user error.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">7. Changes to This Policy</h2>
            <p>Arbex Fund may update this Refund Policy at any time to reflect legal, technical, or business changes. The latest version will always be posted on this page.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">8. Contact Us</h2>
            <p>If you have questions about this Refund Policy or need help with a payment issue, please contact:<br />
            📧 support@arbexfund.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
