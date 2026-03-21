import { t } from '../utils/translations';

const Footer = ({ navigate }) => {
  return (
    <footer className="mt-auto border-t border-sky-800/40 bg-black px-4 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-display text-[18px] tracking-[0.16em] uppercase text-slate-50">
            Arbex
          </div>
          <p className="mt-1 font-sans text-[13px] text-slate-400">
            {t('footer.professional')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 font-sans text-[13px] text-slate-400 w-full max-w-xl">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                navigate('/#plans');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.pricing')}
            </button>
            <button
              onClick={() => {
                navigate('/contact');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.contact')}
            </button>
            <button
              onClick={() => {
                navigate('/terms');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.termsFull')}
            </button>
            <button
              onClick={() => {
                navigate('/privacy');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.privacyFull')}
            </button>
            <button
              onClick={() => {
                navigate('/aml');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.amlFull')}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                navigate('/cookies');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.cookiesFull')}
            </button>
            <button
              onClick={() => {
                navigate('/risk');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.riskFull')}
            </button>
            <button
              onClick={() => {
                navigate('/refund');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.refundFull')}
            </button>
            <button
              onClick={() => {
                navigate('/regulatory');
                window.scrollTo(0, 0);
              }}
              className="font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t('footer.regulatoryFull')}
            </button>
          </div>
          <div className="col-span-2 mt-4">
            <p className="text-[12px] text-slate-500">
              © {new Date().getFullYear()} Arbex. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


