import { useEffect, useState } from 'react';
import { getLang, setLang, onLangChange } from '../utils/lang';
import { t } from '../utils/translations';

const Header = ({ navigate, token, onLogout, showBackLink = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-emerald-500/20 bg-black/80 backdrop-blur-lg">
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 sm:gap-4">
          {showBackLink && (
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-600 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.14em] text-emerald-200 transition-all duration-200 hover:bg-emerald-500/10 hover:-translate-y-[1px]"
            >
              <span className="text-emerald-400">←</span>
              <span className="hidden sm:inline">{lang === 'sr' ? 'Nazad na početnu' : 'Back to Home'}</span>
              <span className="sm:hidden">{lang === 'sr' ? 'Nazad' : 'Back'}</span>
            </button>
          )}
          <div
            className="text-xl sm:text-2xl font-display font-semibold tracking-[0.12em] uppercase cursor-pointer"
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

        <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm font-sans">
          <button
            className="uppercase tracking-[0.18em] text-slate-300"
            onClick={() => {
              const next = lang === 'sr' ? 'en' : 'sr';
              setLang(next);
              setLangState(next);
            }}
          >
            {lang === 'sr' ? 'SRB' : 'ENG'}
          </button>

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
        <div className="fixed inset-0 z-30 bg-black/75 backdrop-blur-sm border-b border-emerald-500/30 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 pt-[84px] sm:pt-[96px] pb-4 relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-[88px] sm:top-[100px] right-4 text-white/70 hover:text-white transition-colors"
            >
             
            </button>
            <nav className="flex flex-col gap-2 text-sm font-sans font-medium tracking-[0.14em] uppercase text-center">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/');
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="py-2"
              >
                {lang === 'sr' ? 'Početna' : 'Home'}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/#plans');
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="py-2"
              >
                {t('nav.plans')}
              </button>
              {token && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/dashboard');
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                  className="py-2"
                >
                  {t('nav.dashboard')}
                </button>
              )}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/about');
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="py-2"
              >
                {lang === 'sr' ? 'O nama' : 'About'}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/contact');
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="py-2"
              >
                {lang === 'sr' ? 'Kontakt' : 'Contact'}
              </button>
              {token ? (
                <>
                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/admin');
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}
                      className="mt-3 rounded-full border border-emerald-500/80 py-2 text-sm font-semibold text-emerald-300"
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
                  className="mt-3 rounded-full bg-emerald-500 py-2 text-sm font-semibold text-black"
                >
                  {t('nav.login')}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Spacer to offset fixed header height */}
      <div className="h-[100px] sm:h-[112px]" />
    </>
  );
};

export default Header;
