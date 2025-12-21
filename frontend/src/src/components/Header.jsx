import { useState } from 'react';

const Header = ({ navigate, token, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePrimary = () => {
    if (token) navigate('/dashboard');
    else navigate('/pricing');
  };

  return (
    <>
      {/* HEADER - IDENTIČAN KAO NA LANDINGU */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2 max-w-5xl mx-auto w-full relative z-20">
        <div className="text-lg font-display font-semibold tracking-[0.12em] uppercase">
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
      </header>

      {/* OVERLAY MENI - IDENTIČAN LANDINGU + ZATVARA KLIKOM VAN */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/85 backdrop-blur-sm border-b border-emerald-500/30"
          onClick={() => setMenuOpen(false)}  // ✅ ZATVARA KLIKOM VAN
        >
          <div 
            className="max-w-5xl mx-auto px-4 pt-3 pb-4"
            onClick={(e) => e.stopPropagation()}  // ✅ NE ZATVARA KLIKOM UNUTR
          >
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
                Kako funkcioniše
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
