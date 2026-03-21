import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-sky-400 mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <p>Effective Date: [Insert Date]</p>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">1. Introduction</h2>
            <p>Arbex Fund ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our services. By accessing our platform, you consent to this policy.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">2. Information We Collect</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Personal Information: Name, email, account credentials, payment information.</li>
              <li>Usage Information: IP address, device, browser type, pages visited, and platform activity.</li>
              <li>Cookies & Tracking: To improve user experience, performance, and personalization.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Provide and maintain services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Communicate updates or support messages</li>
              <li>Improve platform functionality and educational content</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">4. Sharing of Information</h2>
            <p>We do not sell or rent your personal information. We may share data with trusted service providers or as required by law.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">5. Data Security</h2>
            <p>We implement standard measures to protect your data. Absolute security cannot be guaranteed.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">6. User Rights</h2>
            <p>Depending on applicable laws, users can access, correct, or request deletion of their data. Requests can be sent to support@arbexfund.com.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">7. Data Retention</h2>
            <p>Information is retained as long as needed for services, legal compliance, or dispute resolution.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">8. Children’s Privacy</h2>
            <p>Our services are intended for general audiences. We do not knowingly collect data from children under 13.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">9. Updates</h2>
            <p>Changes to this policy will be posted with a revised effective date. Continued use implies acceptance.</p>
          </section>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}


