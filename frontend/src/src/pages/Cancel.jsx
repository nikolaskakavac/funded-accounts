// Cancel.jsx
import Header from '../components/Header';

const Cancel = ({ navigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <Header navigate={navigate} token={''} onLogout={onLogout} />
      <div className="flex items-center justify-center px-4 min-h-[calc(100vh-80px)]">
      <div className="max-w-md w-full rounded-3xl border border-emerald-700/60 bg-black/80 p-7 text-center shadow-xl shadow-emerald-500/30">
        <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
          Uplata otkazana
        </p>
        <h1 className="mt-2 font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
          Transakcija nije završena
        </h1>
        <p className="mt-3 font-sans text-[15px] text-emerald-100/90">
          Uplata nije prošla ili je prekinuta. Možeš pokušati ponovo ili izabrati drugi plan.
        </p>
        <button
          onClick={() => navigate('/pricing')}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5
                     text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black
                     shadow-[0_0_18px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
        >
          Nazad na planove
        </button>
      </div>
      </div>
    </div>
  );
};

export default Cancel;
