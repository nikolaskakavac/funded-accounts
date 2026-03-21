import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Refund({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-sky-400 mb-8">
          Refund Policy
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">1. Introduction</h2>
            <p>At Arbex Fund, we aim to provide access to education and login credentials for third-party trading platforms that support learning and skill development. This Refund Policy explains the circumstances under which users may request a refund.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">2. Refund Eligibility</h2>
            <p>Users may request a full refund within 5 days of payment if no activity has occurred in their account and they have not accessed any paid features or content.</p>
            <p className="mt-2">Activity includes, but is not limited to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Logging into the third-party platform using provided credentials</li>
              <li>Accessing educational tools or resources</li>
              <li>Participating in any program or service included in the purchase</li>
            </ul>
            <p className="mt-2">Refunds will not be granted if there has been any account activity.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">3. Refund Request Process</h2>
            <p>To request a refund:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1 ml-4">
              <li>Contact Arbex Fund via email at support@arbexfund.com within 5 days of payment.</li>
              <li>Provide your account details and a statement confirming that no activity has been conducted.</li>
              <li>Our team will review the request and, if eligible, process the refund promptly.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">4. Refund Method</h2>
            <p>Approved refunds will be returned using the same payment method used for the original transaction, where possible.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">5. Limitations</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Refunds are only available within the 5-day no-activity window.</li>
              <li>Arbex Fund reserves the right to deny requests if activity has occurred or the request falls outside the 5-day period.</li>
              <li>This Refund Policy does not affect any rights you may have under applicable consumer protection laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-sky-300 mb-3">6. Contact Information</h2>
            <p>For any questions or to request a refund, please contact:<br />
            support@arbexfund.com</p>
          </section>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}


