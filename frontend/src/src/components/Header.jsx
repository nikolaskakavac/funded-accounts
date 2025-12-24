import { useState } from 'react';

const Header = ({ navigate, token, onLogout, showBackLink = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePrimary = () => {
    if (token) navigate('/dashboard');
    else navigate('/pricing');
  };

  return (
    <>
      {/* HEADER - fixed na vrhu */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-black/88 backdrop-blur-lg border-b border-emerald-800/60">
        <div className="flex items-center justify-between px-4 pt-4 pb-2 max-w-5xl mx-auto w-full relative">
          <div
            className="text-lg font-display font-semibold tracking-[0.12em] uppercase cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate('/');
            }}
          >
            Vault<span className="text-emerald-400">Funding</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <button className="uppercase tracking-[0.18em] text-slate-300">
              SRB
            </button>

            {/* HAMBURGER SA ANIMACIJOM - IDENTIČAN LANDINGU */}
            <button
              type="button"
              className="relative h-6 w-7 flex items-center justify-center"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span
                className={
                  'absolute h-0.5 w-6 bg-white rounded-full transition-transform duration-200 ' +
                  (menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2')
                }
              />
              <span
                className={
                  'absolute h-0.5 w-6 bg-white rounded-full transition-opacity duration-150 ' +
                  (menuOpen ? 'opacity-0' : 'opacity-100')
                }
              />
              <span
                className={
                  'absolute h-0.5 w-6 bg-white rounded-full transition-transform duration-200 ' +
                  (menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2')
                }
              />
            </button>
          </div>
        </div>

        {showBackLink && (
          <div className="max-w-5xl mx-auto px-4 pb-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-[12px] font-sans uppercase tracking-[0.16em] text-emerald-200 transition-all duration-200 hover:bg-emerald-500/20 hover:-translate-y-[1px]"
            >
              <span className="text-emerald-300">←</span>
              <span>Nazad na sajt</span>
            </button>
          </div>
        )}
      </header>

      {/* Spacer da sadržaj ne ode ispod fixa */}
      <div className="h-[88px] sm:h-[100px]" aria-hidden="true" />

      {/* OVERLAY MENI - IDENTIČAN LANDINGU */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/85 backdrop-blur-sm border-b border-emerald-500/30">
          <div className="max-w-5xl mx-auto px-4 pt-3 pb-4 relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-4 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col gap-2 text-sm font-sans font-medium tracking-[0.14em] uppercase text-center">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/');
                }}
                className="py-2"
              >
                Početna
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handlePrimary();
                }}
                className="py-2"
              >
                {token ? 'Dashboard' : 'Planovi'}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/about');
                }}
                className="py-2"
              >
                O nama
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/contact');
                }}
                className="py-2"
              >
                Kontakt
              </button>
              {token ? (
                <>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/admin');
                    }}
                    className="mt-3 rounded-full border border-emerald-500/80 py-2 text-sm font-semibold text-emerald-300"
                  >
                    Admin panel
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                    }}
                    className="mt-1 rounded-full border border-red-500/80 py-2 text-sm font-semibold text-red-300"
                  >
                    Odjava
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/login');
                  }}
                  className="mt-3 rounded-full bg-emerald-500 py-2 text-sm font-semibold text-black"
                >
                  Prijava
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
