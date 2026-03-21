import { useEffect, useState } from 'react';
import { getLang, setLang, onLangChange } from '../utils/lang';
import { t } from '../utils/translations';

const Header = ({ navigate, token, onLogout, showBackLink = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [lang, setLangState] = useState(getLang());
  const role = (typeof window !== 'undefined' && localStorage.getItem('role')) || 'user';

  useEffect(() => {
    const unsub = onLangChange((l) => setLangState(l));
    return () => unsub();
  }, []);

  // Primary action handled directly in menu items

  return (
    <>
      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-sky-500/20 bg-black/80 backdrop-blur-lg">
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 sm:gap-4">
          {showBackLink && (
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-sky-600 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[13px] font-sans font-normal uppercase tracking-[0.14em] text-sky-200 transition-all duration-200 hover:bg-sky-500/10 hover:-translate-y-[1px]"
            >
              <span className="text-sky-400">←</span>
              <span className="hidden sm:inline">
                {lang === 'nl' ? 'Terug naar start' : 'Back to Home'}
              </span>
              <span className="sm:hidden">{lang === 'nl' ? 'Terug' : 'Back'}</span>
            </button>
          )}
          <div
            className="text-xl sm:text-2xl font-display font-normal tracking-[0.12em] uppercase cursor-pointer"
            style={{ fontWeight: 600 }}
            role="button"
            tabIndex={0}
            onClick={() => navigate('/')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate('/');
            }}
          >
            Arbex
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm font-sans font-normal">
          <div className="relative">
            <button
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-sky-600/60 px-3 py-1.5 text-[11px] sm:text-xs font-sans font-normal uppercase tracking-[0.16em] text-slate-300 hover:bg-sky-500/10 bg-black/40"
              onClick={() => setLangMenuOpen((o) => !o)}
            >
              {lang === 'nl' ? (
                <>
                  <img src="/img/ned.avif" alt="NL" className="w-5 h-3.5 object-cover rounded-sm" />
                  <span>NL</span>
                </>
              ) : (
                <>
                  <img src="/img/gbp.avif" alt="EN" className="w-5 h-3.5 object-cover rounded-sm" />
                  <span>EN</span>
                </>
              )}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-max rounded-xl border border-sky-500/30 bg-black px-2 py-1 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <button
                  onClick={() => {
                    setLang('en');
                    setLangState('en');
                    setLangMenuOpen(false);
                  }}
                  className={`flex items-center gap-0 rounded-lg px-2 py-1.5 text-[11px] sm:text-xs transition-all duration-200 ${
                    lang === 'en'
                      ? 'bg-sky-500/20 text-sky-200'
                      : 'text-slate-300 hover:bg-sky-500/10'
                  }`}
                >
                  {lang === 'en' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7" />
                    </svg>
                  )}
                  <div className="flex items-center gap-2 ml-1">
                    <img src="/img/gbp.avif" alt="EN" className="w-6 h-4 object-cover rounded-sm" />
                    <span>English</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLang('nl');
                    setLangState('nl');
                    setLangMenuOpen(false);
                  }}
                  className={`flex items-center gap-0 rounded-lg px-2 py-1.5 text-[11px] sm:text-xs transition-all duration-200 ${
                    lang === 'nl'
                      ? 'bg-sky-500/20 text-sky-200'
                      : 'text-slate-300 hover:bg-sky-500/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src="/img/ned.avif" alt="NL" className="w-6 h-4 object-cover rounded-sm" />
                    <span>Nederlands</span>
                  </div>
                  {lang === 'nl' && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* HAMBURGER SA ANIMACIJOM */}
          <button
            type="button"
            className="relative h-7 w-8 sm:h-8 sm:w-9 flex items-center justify-center"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={
                'absolute h-0.5 w-7 sm:w-8 bg-white rounded-full transition-transform duration-200 ' +
                (menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2')
              }
            />
            <span
              className={
                'absolute h-0.5 w-7 sm:w-8 bg-white rounded-full transition-opacity duration-150 ' +
                (menuOpen ? 'opacity-0' : 'opacity-100')
              }
            />
            <span
              className={
                'absolute h-0.5 w-7 sm:w-8 bg-white rounded-full transition-transform duration-200 ' +
                (menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2')
              }
            />
          </button>
        </div>
        </header>
      </div>

      {/* OVERLAY MENI */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/75 backdrop-blur-sm border-b border-sky-500/30 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 pt-[84px] sm:pt-[96px] pb-4 relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-[88px] sm:top-[100px] right-4 text-white/70 hover:text-white transition-colors"
            >
             
            </button>
            <nav className="flex flex-col gap-2 text-sm font-sans font-normal tracking-[0.14em] uppercase text-center">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/about');
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="py-2 font-medium"
              >
                {lang === 'nl' ? 'Over ons' : 'About us'}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/');
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="py-2 font-medium"
              >
                {lang === 'nl' ? 'Start' : 'Homepage'}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/#plans');
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="py-2 font-medium"
              >
                {lang === 'nl' ? 'Account opties' : 'Account options'}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/contact');
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="py-2 font-medium"
              >
                {t('nav.contact', lang)}
              </button>
              {token && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/dashboard');
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                  className="py-2 font-medium"
                >
                  {t('nav.dashboard')}
                </button>
              )}


              {token ? (
                <>
                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/admin');
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}
                      className="mt-3 rounded-full border border-sky-500/80 py-2 text-sm font-semibold text-sky-300"
                    >
                      {t('nav.admin')}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}
                    className="mt-1 rounded-full border border-red-500/80 py-2 text-sm font-semibold text-red-300"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/login');
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                  className="mt-3 rounded-full bg-sky-500 py-2 text-sm font-semibold text-black"
                >
                  {t('nav.login')}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Spacer to offset fixed header height */}
      <div className="h-[80px] sm:h-[96px]" />
    </>
  );
};

export default Header;


