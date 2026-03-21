import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Risk({ navigate, token, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <h1 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-[0.12em] uppercase text-sky-400 mb-8">
          RISK STATEMENT
        </h1>

        <div className="space-y-8 font-sans text-[15px] text-slate-200 leading-relaxed">
          <p>Because Arbex Fund only provides access to third-party platforms, the focus is on responsible use and learning, not trading risk. Users are expected to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>Use the third-party platform responsibly</li>
            <li>Understand the features and functions of the platform</li>
            <li>Comply with all applicable laws</li>
          </ul>
          <p>All educational content, tools, and resources are intended to support learning and skill development. Arbex Fund does not provide financial advice, investment recommendations, or guarantees of results.</p>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}


