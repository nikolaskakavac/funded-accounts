import { useEffect, useState } from 'react';
import { getLang, setLang } from '../utils/lang';

const LanguageModal = ({ onLanguageSelected }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(getLang());

  useEffect(() => {
    // Check if user has already chosen language
    const hasChosenLanguage = localStorage.getItem('languageChosen');
    if (!hasChosenLanguage) {
      setIsVisible(true);
    }
  }, []);

  const handleLanguageSelect = (lang) => {
    setLang(lang);
    setCurrentLang(lang);
    localStorage.setItem('languageChosen', 'true');
    setIsVisible(false);
    if (onLanguageSelected) onLanguageSelected(lang);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-50 rounded-3xl border-2 border-emerald-500/80 bg-gradient-to-b from-emerald-500/10 via-black/90 to-emerald-900/10 p-8 shadow-2xl shadow-emerald-500/30 backdrop-blur-sm max-w-md w-[90%]">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
              Welcome
            </p>
            <h2 className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.12em] uppercase text-white">
              Choose Your Language
            </h2>
            <p className="font-sans text-[15px] text-emerald-100/90">
              Select your language
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {/* Serbian */}
            <button
              onClick={() => handleLanguageSelect('sr')}
              className="group relative w-full max-w-[140px] overflow-hidden rounded-2xl p-[2px] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-400/30" />
              <div className="relative flex flex-col items-center gap-3 rounded-2xl bg-black/80 px-4 py-6 transition-colors duration-200 group-hover:bg-black/60">
                {currentLang === 'sr' && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-emerald-300">➤</span>
                )}
                <span className="text-5xl">🇷🇸</span>
                <div className="text-center">
                  <p className="font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-emerald-200 group-hover:text-emerald-100">
                    Srpski
                  </p>
                  <p className="font-sans text-[12px] text-slate-400 group-hover:text-slate-300">
                    Serbian
                  </p>
                </div>
              </div>
            </button>

            {/* English */}
            <button
              onClick={() => handleLanguageSelect('en')}
              className="group relative w-full max-w-[140px] overflow-hidden rounded-2xl p-[2px] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-400/30" />
              <div className="relative flex flex-col items-center gap-3 rounded-2xl bg-black/80 px-4 py-6 transition-colors duration-200 group-hover:bg-black/60">
                {currentLang === 'en' && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-emerald-300">➤</span>
                )}
                <span className="text-5xl">🇬🇧</span>
                <div className="text-center">
                  <p className="font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-emerald-200 group-hover:text-emerald-100">
                    English
                  </p>
                  <p className="font-sans text-[12px] text-slate-400 group-hover:text-slate-300">
                    English
                  </p>
                </div>
              </div>
            </button>

            {/* Dutch */}
            <button
              onClick={() => handleLanguageSelect('nl')}
              className="group relative w-full max-w-[140px] overflow-hidden rounded-2xl p-[2px] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-400/30" />
              <div className="relative flex flex-col items-center gap-3 rounded-2xl bg-black/80 px-4 py-6 transition-colors duration-200 group-hover:bg-black/60">
                {currentLang === 'nl' && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-emerald-300">➤</span>
                )}
                <span className="text-5xl">🇳🇱</span>
                <div className="text-center">
                  <p className="font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-emerald-200 group-hover:text-emerald-100">
                    Nederlands
                  </p>
                  <p className="font-sans text-[12px] text-slate-400 group-hover:text-slate-300">
                    Dutch
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
