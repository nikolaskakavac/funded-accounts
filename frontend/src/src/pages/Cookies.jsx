import Header from '../components/Header';

export default function Cookies({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-white">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-emerald-400 mb-8">
          Cookie Policy
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">1. What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve performance, and provide analytics about how visitors use the site.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">2. How We Use Cookies</h2>
            <p>Arbex Fund uses cookies to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Keep you logged in and secure (authentication tokens).</li>
              <li>Remember your language preference (English, Dutch, Serbian).</li>
              <li>Analyze site traffic and user behavior to improve our platform.</li>
              <li>Enable payment processing through third-party providers (Stripe, NOWPayments).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">3. Types of Cookies We Use</h2>
            
            <div className="mt-3">
              <h3 className="font-semibold text-emerald-200 mb-1">Essential Cookies</h3>
              <p>These are necessary for the website to function. They enable login, session management, and security features. You cannot disable essential cookies without losing access to core functionality.</p>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-emerald-200 mb-1">Analytics Cookies</h3>
              <p>We use analytics cookies to understand how visitors interact with Arbex Fund, which pages are most popular, and where improvements can be made.</p>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-emerald-200 mb-1">Preference Cookies</h3>
              <p>These remember your choices, such as language selection, to provide a more personalized experience.</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">4. Third-Party Cookies</h2>
            <p>Some cookies are set by third-party services we use, including:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><strong>Stripe:</strong> Payment processing and fraud prevention.</li>
              <li><strong>NOWPayments:</strong> Cryptocurrency payment handling.</li>
              <li><strong>Analytics providers:</strong> To monitor site performance and user behavior.</li>
            </ul>
            <p className="mt-2">These third parties have their own privacy and cookie policies. We recommend reviewing them if you have concerns about data sharing.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">5. Managing Cookies</h2>
            <p>You can control or delete cookies through your browser settings. Most browsers allow you to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>View and delete cookies stored on your device.</li>
              <li>Block all cookies from specific websites.</li>
              <li>Receive a notification when a cookie is set.</li>
            </ul>
            <p className="mt-2">Note: Blocking essential cookies may prevent you from accessing important features like login and payment processing.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">6. Data Retention</h2>
            <p>Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period (typically up to 12 months) or until you manually delete them.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">7. Updates to This Policy</h2>
            <p>We may update this Cookie Policy to reflect changes in our practices or applicable laws. Updates will be posted on this page with a revised date.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">8. Contact Us</h2>
            <p>If you have questions about how we use cookies, please contact:<br />
            📧 support@arbexfund.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
