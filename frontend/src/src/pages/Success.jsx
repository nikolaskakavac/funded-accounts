// Success.jsx
const Success = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-emerald-600/60 bg-black/80 p-7 text-center shadow-xl shadow-emerald-500/30">
        <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
          Uplata uspešna
        </p>
        <h1 className="mt-2 font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase text-emerald-300">
          Plan je aktiviran
        </h1>
        <p className="mt-3 font-sans text-[15px] text-emerald-100/90">
          Uplata je prošla. Tvoj funded plan će se uskoro pojaviti u dashboard‑u.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5
                     text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black
                     shadow-[0_0_18px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
        >
          Idi na dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;
