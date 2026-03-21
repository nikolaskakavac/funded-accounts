import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Cookies({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-sky-400 mb-8">
          Cookie Policy
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">1. Introduction</h2>
            <p>Arbex Fund ("we", "our", or "us") uses cookies and similar technologies on our website to improve your experience, analyze performance, and deliver personalized content. This Cookie Policy explains how we use these tools and your choices regarding them.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">2. What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They help websites remember information about your visit, such as preferences, login details, or usage patterns.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">3. Types of Cookies We Use</h2>

            <div className="mt-3">
              <h3 className="font-semibold text-sky-200 mb-1">1. Essential Cookies</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Required for the basic operation of our website.</li>
                <li>Examples: keeping you logged in, remembering session settings.</li>
                <li>Cannot be disabled without affecting website functionality.</li>
              </ul>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-sky-200 mb-1">2. Performance and Analytics Cookies</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Help us understand how users interact with our website.</li>
                <li>Examples: tracking page visits, measuring engagement.</li>
                <li>Data collected is aggregated and anonymized.</li>
              </ul>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-sky-200 mb-1">3. Functional Cookies</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Enhance your experience by remembering preferences and settings.</li>
                <li>Examples: language preferences, display options.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">4. Third-Party Cookies</h2>
            <p>We may use third-party services for analytics or other functionality. These providers may place cookies on your device while you use our website. We do not control these cookies and recommend reviewing the third-party privacy policies.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">5. Managing Cookies</h2>
            <p>You can manage or disable cookies through your browser settings. Please note that disabling some cookies may affect website functionality or your user experience.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">6. Consent</h2>
            <p>By using our website, you consent to the use of cookies as described in this policy. You may withdraw consent at any time by adjusting your browser settings.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">7. Changes to This Policy</h2>
            <p>Arbex Fund may update this Cookie Policy periodically. Updates will be posted on this page with a revised effective date.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">8. Contact Information</h2>
            <p>For questions regarding this Cookie Policy, please contact:<br />
            support@arbexfund.com</p>
          </section>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}


