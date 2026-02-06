import Header from '../components/Header';

export default function Privacy({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-white">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-emerald-400 mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">1. Introduction</h2>
            <p>Arbex Fund ("we", "our", "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">2. Information We Collect</h2>
            <p>We may collect:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Personal details such as your name, email address, and contact information.</li>
              <li>Account information you provide when creating or maintaining an account.</li>
              <li>Payment information processed securely by third-party providers such as Stripe (we do not store or access your full card details).</li>
              <li>Technical data such as IP address, browser type, and usage statistics for analytics and security.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">3. How We Use Your Information</h2>
            <p>Your data may be used to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Provide and improve our services.</li>
              <li>Process payments and manage your account.</li>
              <li>Communicate with you about updates or support.</li>
              <li>Meet legal obligations and prevent fraud.</li>
            </ul>
            <p className="mt-2">We do not sell or rent personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">4. Data Sharing</h2>
            <p>We only share limited data with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Stripe and other payment processors for secure transactions.</li>
              <li>Service providers who help operate our platform (under confidentiality agreements).</li>
              <li>Authorities, when legally required.</li>
            </ul>
            <p className="mt-2">All transfers comply with applicable data-protection laws, including the GDPR.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">5. Data Retention</h2>
            <p>We retain your data only as long as needed for the purposes described above or as required by law. After that, data is securely deleted or anonymized.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">6. Your Rights</h2>
            <p>You may request:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Access to your personal data.</li>
              <li>Correction or deletion of inaccurate information.</li>
              <li>Limitation or objection to certain processing.</li>
              <li>A copy of your data (data portability).</li>
              <li>Withdrawal of consent at any time.</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at support@arbexfund.com.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">7. Cookies</h2>
            <p>We use essential and analytics cookies to improve website functionality and user experience. You can manage cookie preferences through your browser settings. See our Cookie Policy for details.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">8. Security</h2>
            <p>We apply technical and organizational safeguards to protect your information against unauthorized access, alteration, or loss.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">9. Updates to This Policy</h2>
            <p>We may update this Privacy Policy periodically. The latest version will always be available on our website with the updated date shown.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or your personal data, please contact:<br />
            📧 support@arbexfund.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
