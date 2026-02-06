import Header from '../components/Header';

export default function Terms({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-white">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-emerald-400 mb-8">
          Terms and Conditions
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">1. Introduction</h2>
            <p>Welcome to Arbex Fund ("Arbex Fund", "we", "our", "us"). These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to comply with these Terms.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">2. Nature of Service</h2>
            <p>Arbex Fund provides access to simulated trading environments, trader evaluations, and educational tools. We do not provide or facilitate live trading, investment management, or financial advisory services. All trading activities on our platform are for educational and assessment purposes only and use virtual funds.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">3. Eligibility</h2>
            <p>You must be at least 18 years old (or the legal age of majority in your jurisdiction) to use our services. By using our website, you confirm that you meet this requirement.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">4. Accounts and Security</h2>
            <p>You are responsible for keeping your account credentials secure and for all activity conducted through your account. Arbex Fund reserves the right to suspend or terminate accounts that violate these Terms.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">5. Payments and Refunds</h2>
            <p>All payments are processed securely through trusted third-party providers such as Stripe. Fees paid for access to programs or evaluations are non-refundable, except where required by law or stated in our Refund Policy.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">6. Intellectual Property</h2>
            <p>All content, materials, trademarks, and designs on this website belong to ARB Innovations LLC or its licensors. You may not copy, modify, or distribute our materials without prior written consent.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">7. Disclaimer of Warranties</h2>
            <p>Our platform is provided on an "as-is" and "as-available" basis. Arbex Fund makes no warranties regarding accuracy, performance, or reliability of the simulated trading environment. Simulated results are hypothetical and do not represent real trading performance or future results.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">8. Limitation of Liability</h2>
            <p>Arbex Fund shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform or inability to access it.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">9. Governing Law and Jurisdiction</h2>
            <p>These Terms are governed by the laws of the Netherlands. Any disputes shall be submitted exclusively to the competent courts in Amsterdam, the Netherlands.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">10. Contact Information</h2>
            <p>For questions about these Terms, please contact us:<br />
            📧 support@arbexfund.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
