const WHATSAPP_LINK =
  'https://wa.me/381653332741?text=Hello%2C%20I%20have%20a%20question%20about%20your%20product.';

const WhatsAppFloatingButton = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Open WhatsApp chat"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-sky-300/40 bg-sky-500 px-4 py-3 text-black shadow-[0_0_28px_rgba(56,189,248,0.45)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.7)]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
        <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M19.11 17.38c-.28-.14-1.64-.81-1.9-.91-.25-.09-.43-.14-.62.14-.18.28-.71.91-.87 1.1-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.38-.82-.73-1.37-1.64-1.53-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.32.41-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.46h-.53c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.29s.99 2.65 1.12 2.83c.14.18 1.94 2.96 4.69 4.15.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.64-.67 1.87-1.32.23-.64.23-1.19.16-1.32-.07-.11-.25-.18-.53-.32Z" />
          <path d="M16.01 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.59 4.46 1.71 6.39L3.2 28.8l6.57-1.69a12.75 12.75 0 0 0 6.24 1.61h.01c7.06 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.64-3.75-9.06A12.7 12.7 0 0 0 16.01 3.2Zm0 23.35h-.01a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-3.9 1 1.04-3.8-.25-.4a10.61 10.61 0 0 1-1.64-5.63c0-5.88 4.78-10.66 10.66-10.66 2.84 0 5.52 1.11 7.53 3.12a10.58 10.58 0 0 1 3.12 7.53c0 5.88-4.78 10.65-10.65 10.65Z" />
        </svg>
      </span>
      <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em]">
        Live Chat
      </span>
    </a>
  );
};

export default WhatsAppFloatingButton;
