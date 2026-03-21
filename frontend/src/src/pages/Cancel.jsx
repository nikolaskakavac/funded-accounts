// Cancel.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Cancel = ({ navigate, onLogout }) => {
  const lang = getLang();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={''} onLogout={onLogout} />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-3xl border border-sky-700/60 bg-black/80 p-7 text-center shadow-xl shadow-sky-500/30">
          <p className="font-display text-[12px] uppercase tracking-[0.26em] text-sky-400">
            {t('cancel.section', lang)}
          </p>
          <h1 className="mt-2 font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
            {t('cancel.title', lang)}
          </h1>
          <p className="mt-3 font-sans text-[15px] text-sky-100/90">
            {t('cancel.desc', lang)}
          </p>
          <button
            onClick={() => navigate('/#plans')}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5
                       text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black
                       shadow-[0_0_18px_rgba(56,189,248,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400"
          >
            {t('cancel.back', lang)}
          </button>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default Cancel;


