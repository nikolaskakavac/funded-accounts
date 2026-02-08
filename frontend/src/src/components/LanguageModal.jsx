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

      {/* Modal - Compact version */}
      <div className="relative z-50 rounded-2xl border border-emerald-500/60 bg-gradient-to-b from-emerald-500/10 via-black/90 to-emerald-900/10 p-5 shadow-xl shadow-emerald-500/20 backdrop-blur-sm max-w-xs w-[85%]">
        <div className="text-center space-y-4">
          <div className="space-y-1">
            <p className="font-display text-[10px] uppercase tracking-[0.22em] text-emerald-400">
              Welcome
            </p>
            <h2 className="font-display text-[18px] sm:text-[20px] font-extrabold tracking-[0.1em] uppercase text-white">
              Choose Language
            </h2>
          </div>

          <div className="flex gap-3 justify-center">
            {/* English */}
            <button
              onClick={() => handleLanguageSelect('en')}
              className="group relative w-[100px] overflow-hidden rounded-xl p-[1.5px] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20" />
              <div className="relative flex flex-col items-center gap-2 rounded-xl bg-black/80 px-3 py-3 transition-colors duration-200 group-hover:bg-black/60">
                {currentLang === 'en' && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 text-[10px] text-emerald-300">➤</span>
                )}
                <img src="/img/gbp.avif" alt="English" className="w-10 h-7 object-cover rounded" />
                <div className="text-center">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200 group-hover:text-emerald-100">
                    English
                  </p>
                </div>
              </div>
            </button>

            {/* Dutch */}
            <button
              onClick={() => handleLanguageSelect('nl')}
              className="group relative w-[100px] overflow-hidden rounded-xl p-[1.5px] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20" />
              <div className="relative flex flex-col items-center gap-2 rounded-xl bg-black/80 px-3 py-3 transition-colors duration-200 group-hover:bg-black/60">
                {currentLang === 'nl' && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 text-[10px] text-emerald-300">➤</span>
                )}
                <img src="/img/ned.avif" alt="Nederlands" className="w-10 h-7 object-cover rounded" />
                <div className="text-center">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200 group-hover:text-emerald-100">
                    Nederlands
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
