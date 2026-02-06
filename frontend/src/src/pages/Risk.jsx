import Header from '../components/Header';

export default function Risk({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-white">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-emerald-400 mb-8">
          Risk Disclosure
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">1. Introduction</h2>
            <p>Trading financial instruments—including forex, commodities, cryptocurrencies, and other markets—carries a high level of risk. This Risk Disclosure explains important factors you must understand before participating in any Arbex Fund evaluations or simulated trading activities.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">2. Hypothetical and Simulated Trading</h2>
            <p>All Arbex Fund services involve simulated or demonstration accounts. These accounts do not involve real trading on live markets, and no real capital is at risk. However, understanding market volatility and risk management is essential for completing evaluations and developing trading skills.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">3. Market Volatility and Losses</h2>
            <p>Financial markets are unpredictable and can change rapidly due to economic data, political events, and other factors. While Arbex Fund accounts are simulated, the trading conditions and instruments mirror real-world volatility. Users should be aware that:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Losses can exceed expectations due to market gaps or sudden price movements.</li>
              <li>Past performance does not guarantee future results.</li>
              <li>No strategy or technique guarantees profit.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">4. No Financial Advice</h2>
            <p>Arbex Fund does not provide investment, financial, legal, or tax advice. All content on our website—including articles, tutorials, and evaluation criteria—is for educational and informational purposes only. You should consult a licensed financial advisor before making any real investment decisions.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">5. User Responsibility</h2>
            <p>By using Arbex Fund, you acknowledge that:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>You are responsible for your own trading decisions and results.</li>
              <li>You understand the risks associated with trading financial instruments.</li>
              <li>Arbex Fund is not liable for any losses you incur using our platform or following our educational content.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">6. Regulatory Compliance</h2>
            <p>Arbex Fund operates under a Dutch license (AFM registration number 14000716) and complies with applicable EU and Dutch financial regulations. However, trading financial markets may not be legal or suitable in all jurisdictions. Users are responsible for ensuring compliance with local laws.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">7. Acceptance of Risk</h2>
            <p>By using Arbex Fund services, you confirm that you have read and understood this Risk Disclosure, accept all trading risks, and agree not to hold Arbex Fund liable for any financial losses or damages.</p>
          </section>

          <section>
            <h2 className="font-display text-[20px] font-bold text-emerald-300 mb-3">8. Contact Us</h2>
            <p>If you have questions about risk management or need further clarification, please contact:<br />
            📧 support@arbexfund.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
