import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-sky-400 mb-8">
          Terms and Conditions
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">1. Introduction</h2>
            <p>Welcome to Arbex Fund ("Arbex Fund", "we", "our", or "us"). These Terms and Conditions ("Terms") govern your use of our services. By accessing or using our platform, you agree to comply with these Terms.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">2. Nature of Service</h2>
            <p>Arbex Fund provides users with login credentials for a third-party trading platform, along with educational tools and resources to support learning and skill development. Arbex Fund itself does not manage funds, or guarantee outcomes. Materials and tools are intended to help users explore trading concepts and strategies in a structured environment.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">3. Accounts and Security</h2>
            <p>You are responsible for keeping your account credentials secure and for all activity conducted through your access to third-party platforms. Arbex Fund is not responsible for actions, functionality, or outcomes on third-party platforms. We reserve the right to suspend or terminate accounts that violate these Terms.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">4. Payments and Refunds</h2>
            <p>All payments are processed securely. Fees paid for access to programs or login credentials are non-refundable, except that users may request a refund within 5 days of payment if no activity has occurred in the account and they notify Arbex Fund. Their notification has to be sent within 5 days of their purchase.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">5. Intellectual Property</h2>
            <p>All content, materials, trademarks, and designs on this website belong to Arbex Fund or its licensors. You may not copy, modify, or distribute our materials without prior written consent.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">6. Disclaimer</h2>
            <p>Arbex Fund provides access credentials and educational resources on an “as-is” and “as-available” basis. While we strive to maintain a high-quality experience, we cannot guarantee uninterrupted access or results on third-party platforms. Content does not constitute financial, legal, or investment advice.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">7. Limitation of Liability</h2>
            <p>Arbex Fund is not responsible for activity, performance, or outcomes on third-party platforms. Users are solely responsible for their engagement and decisions when using third-party services.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">8. Governing Law and Jurisdiction</h2>
            <p>These Terms are governed by the laws of the Netherlands. Any disputes shall be submitted exclusively to the competent courts in Amsterdam, the Netherlands.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">9. Contact Information</h2>
            <p>For questions about these Terms, please contact:<br />
            support@arbexfund.com</p>
          </section>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}


