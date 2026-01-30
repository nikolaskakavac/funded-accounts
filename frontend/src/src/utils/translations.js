import { getLang } from './lang';
import nlTranslations from './translations.nl';

const translations = {
  // Navigation & Header
  'nav.dashboard': { sr: 'Dashboard', en: 'Dashboard' },
  'nav.plans': { sr: 'Planovi', en: 'Plans' },
  'nav.admin': { sr: 'Admin panel', en: 'Admin Panel' },
  'nav.logout': { sr: 'Odjava', en: 'Logout' },
  'nav.login': { sr: 'Prijava', en: 'Login' },
  'nav.register': { sr: 'Registracija', en: 'Register' },

  // Landing Hero
  'hero.title': { sr: 'Uloži u kripto sa našim kapitalom.', en: 'Invest in crypto with our capital.' },
  'hero.subtitle': { sr: 'Podeli profit.', en: 'Share the profit.' },
  'hero.learnMore': { sr: 'Saznaj više', en: 'Learn More' },
  'hero.viewPlans': { sr: 'Pogledaj planove', en: 'View Plans' },

  // How it works
  'howItWorks.title': { sr: 'Kako funkcioniše', en: 'How It Works' },
  'howItWorks.description': {
    sr: 'Kada kupiš nalog na našem websajtu, dobijaš log in podatke od već postojećeg, unapred „napunjenog" kripto naloga. Svaki kupac dobija svoj, zaseban nalog – nema deljenja sa drugima.',
    en: 'When you purchase an account on our website, you receive login credentials for an already existing, pre-funded crypto account. Each customer gets their own separate account – no sharing with others.'
  },
  'howItWorks.task': {
    sr: 'Tvoj zadatak je jasan:',
    en: 'Your task is clear:'
  },
  'howItWorks.profit': {
    sr: 'ostvari profit investirajući u neku od',
    en: 'make profit by investing in one of the'
  },
  'howItWorks.crypto': { sr: 'kripto-valuta', en: 'crypto currencies' },
  'howItWorks.withOurMoney': { sr: 'sa našim novcem.', en: 'with our capital.' },
  'howItWorks.focus': {
    sr: 'Ti se fokusiraš isključivo na',
    en: 'You focus exclusively on'
  },
  'howItWorks.investing': { sr: 'investiranje', en: 'investing' },
  'howItWorks.weTakeCare': {
    sr: 'dok mi brinemo o',
    en: 'while we take care of the'
  },
  'howItWorks.account': { sr: 'nalogu', en: 'account' },
  'howItWorks.capital': { sr: 'kapitalu', en: 'capital' },
  'howItWorks.infrastructure': { sr: 'tehničkoj infrastrukturi', en: 'technical infrastructure' },

  // Risk Rules
  'risk.title': { sr: 'Pravila rizika', en: 'Risk Rules' },
  'risk.description': {
    sr: 'Da bi nalog ostao aktivan, dovoljno je da poštuješ dva jednostavna pravila rizika. Kršenje bilo kog od njih automatski deaktivira nalog.',
    en: 'To keep your account active, you just need to follow two simple risk rules. Violating either one will automatically deactivate the account.'
  },
  'risk.rule1.title': { sr: 'Maksimalni ukupni gubitak', en: 'Maximum Total Loss' },
  'risk.rule1.description': {
    sr: 'Ako izgubiš više od 10% ukupnog kapitala koji ti je dodeljen, nalog se deaktivira.',
    en: 'If you lose more than 10% of the total capital assigned to you, your account will be deactivated.'
  },
  'risk.rule2.title': { sr: 'Maksimalni dnevni gubitak', en: 'Maximum Daily Loss' },
  'risk.rule2.description': {
    sr: 'Ako u jednom danu izgubiš više od 1.000 €, nalog se deaktivira.',
    en: 'If you lose more than €1,000 in a single day, your account will be deactivated.'
  },

  // What You Get
  'whatYouGet.title': { sr: 'Šta tačno dobijaš kupovinom naloga?', en: 'What exactly do you get by purchasing an account?' },
  'whatYouGet.capital.title': { sr: 'Kapital za investiranje', en: 'Trading Capital' },
  'whatYouGet.capital.description': {
    sr: 'Dobijaš novac od nas koji možeš da investiraš na kripto valutu po tvom izboru. Ne rizikuješ sopstveni novac, već koristiš naš kapital.',
    en: 'You get our money to invest in the cryptocurrency of your choice. You don\'t risk your own money – you use our capital.'
  },
  'whatYouGet.platform.title': { sr: 'LOG IN + OBUKA', en: 'LOGIN + TRAINING' },
  'whatYouGet.platform.description': {
    sr: 'Dobijaš log in podatke od svog "napunjenog" kripto naloga, uz besplatnu obuku o investiranju da bi brže ušao u ritam.',
    en: 'You receive login credentials for your funded crypto account, plus free training on investing to get you up to speed faster.'
  },
  'whatYouGet.profit.title': { sr: 'Podela profita', en: 'Profit Split' },
  'whatYouGet.profit.description': {
    sr: 'Kada kripto-valuta u koju si odlučio da investiraš zabeleži rast i ti odlučiš da napraviš CASH OUT, 80% profita se isplaćuje na tvoju kreditnu karticu ili lični kripto račun, a 20% skupljamo mi.',
    en: 'When the cryptocurrency you\'ve invested in increases in value and you decide to CASH OUT, 80% of the profit is paid to your credit card or personal crypto account, and we collect 20%.'
  },

  // Our Goal
  'goal.title': { sr: 'Naš cilj', en: 'Our Goal' },
  'goal.description': {
    sr: 'Naš model je zasnovan na jednostavnom principu — mi zarađujemo samo kada zarađuju naši klijenti.',
    en: 'Our model is based on a simple principle — we only earn when our clients earn.'
  },
  'goal.selection': {
    sr: 'Kroz prirodan proces selekcije, naš kapital se vremenom usmerava ka onima koji ostvaruju najbolje rezultate, čime se rizik za nas smanjuje, a dobit raste.',
    en: 'Through a natural selection process, our capital is directed over time toward those who achieve the best results, reducing our risk and increasing profit.'
  },
  'goal.beginners': {
    sr: 'Na taj način stvaramo sistem u kome i početnici mogu da ostvare značajne profite, dok se uspešnima otvara prostor za veće investicije i zajednički rast.',
    en: 'In this way, we create a system where even beginners can achieve significant profits, while successful traders gain access to larger investments and mutual growth.'
  },

  // Plans
  'plans.section': { sr: 'Planovi', en: 'Plans' },
  'plans.title': { sr: 'Izaberi veličinu naloga.', en: 'Choose your account size.' },
  'plans.recommended': { sr: 'Preporučeno', en: 'Recommended' },
  'plans.loss': { sr: 'Ograničeni gubitak:', en: 'Limited loss:' },
  'plans.price': { sr: 'Cena:', en: 'Price:' },
  'plans.payCard': { sr: '💳 Plati karticom', en: '💳 Pay by Card' },
  'plans.payCrypto': { sr: '🪙 Plati kriptom', en: '🪙 Pay with Crypto' },
  'plans.afterPayment': {
    sr: 'Nakon uspešne uplate, na tvoj Gmail stižu podaci za pristup (email i lozinka), a svoj aktivni plan vidiš u dashboard‑u na našem web sajtu.',
    en: 'After successful payment, your access credentials (email and password) arrive in your Gmail, and you can see your active plan in the dashboard on our website.'
  },

  // FAQ
  'faq.section': { sr: 'Česta pitanja', en: 'FAQ' },
  'faq.title': { sr: 'Šta treba da znaš pre kupovine?', en: 'What should you know before purchasing?' },
  'faq.q1': { sr: 'Da li moj novac ide na trading nalog?', en: 'Does my money go to the trading account?' },
  'faq.a1': {
    sr: 'Ne. Nakon uspešne kupovine dobijaš login podatke od već postojećeg kripto naloga koji je "napunjen" sa našim kapitalom. Koristiš naš kapital a ne svoj.',
    en: 'No. After successful purchase, you receive login credentials for an existing crypto account that is funded with our capital. You use our capital, not yours.'
  },
  'faq.q2': { sr: 'Kada dobijam pristup dashboard‑u?', en: 'When do I get dashboard access?' },
  'faq.a2': {
    sr: 'Odmah nakon potvrde uplate dobijaš pristup klijent dashboard‑u i podacima za login.',
    en: 'Immediately after payment confirmation, you get access to the client dashboard and login credentials.'
  },
  'faq.q3': { sr: 'Kako funkcioniše podela profita?', en: 'How does the profit split work?' },
  'faq.a3': {
    sr: 'Kada kripto-valuta u koju si odlučio da investiraš zabeleži rast i ti odlučiš da napraviš CASH OUT, 80% profita se isplaćuje na tvoju kreditnu karticu ili lični kripto račun, a 20% skupljamo mi.',
    en: 'When the cryptocurrency you\'ve invested in increases in value and you decide to CASH OUT, 80% of the profit is paid to your credit card or personal crypto account, and we collect 20%.'
  },

  // Auth - Login
  'login.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'login.clientAccess': { sr: 'Klijent pristup', en: 'Client access' },
  'login.title': { sr: 'Prijava na dashboard', en: 'Login to dashboard' },
  'login.subtitle': {
    sr: 'Unesi email i lozinku da vidiš svoj funded nalog, aktivan plan i istoriju isplata na jednom mestu.',
    en: 'Enter email and password to view your funded account, active plan, and payout history in one place.'
  },
  'login.email': { sr: 'Email', en: 'Email' },
  'login.password': { sr: 'Lozinka', en: 'Password' },
  'login.passwordPlaceholder': { sr: 'Vaša lozinka', en: 'Your password' },
  'login.submit': { sr: 'Prijava', en: 'Login' },
  'login.noAccount': { sr: 'Nemate nalog?', en: 'Don\'t have an account?' },
  'login.registerCta': { sr: 'Registrujte se', en: 'Register' },
  'login.dashboard.see': { sr: 'Šta vidiš u dashboard‑u', en: 'What you see in the dashboard' },
  'login.dashboard.desc': {
    sr: 'Pregled aktivnih planova, limite rizika i istoriju isplata – sve na jednom mestu, uz jasne metrike napretka.',
    en: 'View active plans, risk limits, and payout history in one place with clear progress metrics.'
  },
  'login.tips.title': { sr: 'Kratki saveti', en: 'Quick tips' },
  'login.tips.item1': { sr: '• Koristi isti email koji si upotrebio pri kupovini naloga.', en: '• Use the same email you used when purchasing the account.' },
  'login.tips.item2': { sr: '• Ako promeniš lozinku, sve aktivne sesije će biti odjavljene.', en: '• Changing your password logs out all active sessions.' },
  'login.tips.item3': { sr: '• Ako ne vidiš aktivan plan, javi se podršci iz dashboard‑a.', en: '• If you don\'t see an active plan, contact support from the dashboard.' },

  // Auth - Register
  'register.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'register.create': { sr: 'Kreiranje naloga', en: 'Create account' },
  'register.title': { sr: 'Napravi pristup funded nalogu', en: 'Create access to your funded account' },
  'register.subtitle': {
    sr: 'Unesi email koji redovno proveravaš. Ovaj login koristiš za pristup dashboard‑u, praćenje plana i isplata.',
    en: 'Enter an email you check regularly. You\'ll use this login for dashboard access, plan tracking, and payouts.'
  },
  'register.firstName': { sr: 'Ime', en: 'First name' },
  'register.firstNamePlaceholder': { sr: 'Pera', en: 'John' },
  'register.lastName': { sr: 'Prezime', en: 'Last name' },
  'register.lastNamePlaceholder': { sr: 'Perić', en: 'Doe' },
  'register.email': { sr: 'Email', en: 'Email' },
  'register.emailPlaceholder': { sr: 'ti@primer.com', en: 'you@example.com' },
  'register.password': { sr: 'Lozinka', en: 'Password' },
  'register.passwordPlaceholder': { sr: 'Min. 8 karaktera', en: 'Min. 8 characters' },
  'register.submit': { sr: 'Napravi nalog', en: 'Create account' },
  'register.terms': {
    sr: 'Kreiranjem naloga prihvataš osnovna pravila rizika i isplata koja će biti prikazana u tvom dashboard‑u.',
    en: 'By creating an account, you accept the basic risk and payout rules that will be shown in your dashboard.'
  },
  'register.haveAccount': { sr: 'Već imaš nalog?', en: 'Already have an account?' },
  'register.loginCta': { sr: 'Prijava', en: 'Login' },
  'register.after.title': { sr: 'Posle registracije', en: 'After registration' },
  'register.after.desc': {
    sr: 'Nakon registracije možeš odmah da se prijaviš, izabereš plan i završiš jednokratnu uplatu karticom ili kriptom. Status naloga pratiš kroz klijent dashboard.',
    en: 'After registering you can log in immediately, pick a plan, and pay once by card or crypto. Track account status in the client dashboard.'
  },
  'register.notes.title': { sr: 'Brze napomene', en: 'Quick notes' },
  'register.notes.item1': { sr: '• Kasnije uvek možeš da pređeš na veći plan.', en: '• You can upgrade to a higher plan later.' },
  'register.notes.item2': { sr: '• Isti login koristiš za praćenje naloga i isplata.', en: '• The same login is used to track your account and payouts.' },
  'register.notes.item3': { sr: '• Gašenje naloga tražiš direktno iz dashboard‑a.', en: '• Request account closure directly from the dashboard.' },

  // Contact
  'contact.section': { sr: 'Kontakt', en: 'Contact' },
  'contact.title': { sr: 'Javi se timu', en: 'Contact the team' },
  'contact.subtitle': {
    sr: 'Pitanja o nalozima, plaćanju ili saradnji – piši direktno timu i dobićeš odgovor u kratkom roku.',
    en: 'Questions about accounts, payments, or collaboration—write directly to the team for a quick reply.'
  },
  'contact.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'contact.support.title': { sr: 'Podrška za korisnike', en: 'Customer support' },
  'contact.support.emailLabel': { sr: 'Email podrške', en: 'Support email' },
  'contact.support.note': { sr: 'Nalozi, uplate, tehnički problemi.', en: 'Accounts, payments, technical issues.' },
  'contact.biz.title': { sr: 'Poslovna saradnja', en: 'Business partnership' },
  'contact.biz.emailLabel': { sr: 'Poslovni kontakt', en: 'Business contact' },
  'contact.biz.note': { sr: 'Partnerstva, affiliate i B2B upiti.', en: 'Partnerships, affiliates, and B2B inquiries.' },
  'contact.companyDetails': { sr: 'Detalji kompanije', en: 'Company details' },
  'contact.companyAddress': { sr: 'Naziv firme d.o.o.\nUlica i broj, Grad, Država', en: 'Company Name LLC\nStreet and number, City, Country' },
  'contact.companyHours': { sr: 'Radnim danima 9–17h (CET). Na email obično odgovaramo u roku od 24 sata.', en: 'Weekdays 9–17h (CET). We usually respond to email within 24 hours.' },
  'contact.whatToSend': { sr: 'Šta da pošalješ u poruci', en: 'What to include in your message' },
  'contact.msg.payment': { sr: '• Problem sa uplatom: email naloga, tip uplate (kartica/kripto) i vreme transakcije.', en: '• Payment issue: account email, payment type (card/crypto), and transaction time.' },
  'contact.msg.rules': { sr: '• Pitanje o pravilima: koji paket koristiš (10K ili 25K) i na kojoj platformi trguješ.', en: '• Rules question: which package you use (10K or 25K) and which platform you trade on.' },
  'contact.msg.biz': { sr: '• Saradnja: par rečenica o projektu i publici (YouTube, Discord, Telegram...).', en: '• Collaboration: a few sentences about your project and audience (YouTube, Discord, Telegram...).' },

  // Contact Form
  'contactForm.title': { sr: 'Pošalji nam poruku', en: 'Send us a message' },
  'contactForm.subtitle': { sr: 'Popuni formu ispod i odgovorićemo u roku od 24 sata.', en: 'Fill out the form below and we\'ll respond within 24 hours.' },
  'contactForm.name': { sr: 'Ime i prezime', en: 'Full name' },
  'contactForm.email': { sr: 'Email adresa', en: 'Email address' },
  'contactForm.subject': { sr: 'Naslov poruke', en: 'Message subject' },
  'contactForm.subjectPlaceholder': { sr: 'Npr. Pitanje o uslovima...', en: 'E.g., Question about terms...' },
  'contactForm.message': { sr: 'Poruka', en: 'Message' },
  'contactForm.messagePlaceholder': { sr: 'Detaljno napiši tvoje pitanje ili problem...', en: 'Describe your question or issue in detail...' },
  'contactForm.submit': { sr: 'Pošalji poruku', en: 'Send message' },
  'contactForm.sending': { sr: 'Slanje...', en: 'Sending...' },
  'contactForm.successTitle': { sr: 'Poruka poslana!', en: 'Message sent!' },
  'contactForm.successMessage': { sr: 'Hvala na poruci. Odgovorićemo u roku od 24 sata.', en: 'Thank you for your message. We\'ll respond within 24 hours.' },
  'contactForm.errorTitle': { sr: 'Greška', en: 'Error' },
  'contactForm.errorMessage': { sr: 'Nije moguće poslati poruku. Pokušaj ponovo.', en: 'Unable to send message. Please try again.' },
  'contactForm.validationName': { sr: 'Ime je obavezno', en: 'Name is required' },
  'contactForm.validationEmail': { sr: 'Email je obavezan i mora biti validan', en: 'Email is required and must be valid' },
  'contactForm.validationSubject': { sr: 'Naslov je obavezan', en: 'Subject is required' },
  'contactForm.validationMessage': { sr: 'Poruka je obavezna', en: 'Message is required' },

  // Footer
  'footer.professional': { sr: 'Profesionalno investiranje za svakoga.', en: 'Professional investing for everyone.' },
  'footer.pricing': { sr: 'Planovi i cene', en: 'Plans & Pricing' },
  'footer.contact': { sr: 'Kontakt podrška', en: 'Contact Support' },
  'footer.rights': { sr: 'Sva prava zadržana.', en: 'All rights reserved.' },

  // Dashboard
  'dashboard.clientZone': { sr: 'Klijent zona', en: 'Client Zone' },
  'dashboard.title': { sr: 'Dashboard', en: 'Dashboard' },
  'dashboard.description': { sr: 'Pregled naloga, plana i balansa.', en: 'Account, plan and balance overview.' },
  'dashboard.balance': { sr: 'Balans', en: 'Balance' },
  'dashboard.balanceDescription': { sr: 'Vrednost tvog aktivnog plana.', en: 'Value of your active plan.' },
  'dashboard.account': { sr: 'Nalog', en: 'Account' },
  'dashboard.accountDescription': { sr: 'Tvoj email i funded status.', en: 'Your email and funded status.' },
  'dashboard.email': { sr: 'Email adresa', en: 'Email address' },
  'dashboard.name': { sr: 'Ime i prezime', en: 'Name' },
  'dashboard.plan': { sr: 'Plan', en: 'Plan' },
  'dashboard.paid': { sr: 'Plaćeno:', en: 'Paid:' },
  'dashboard.noActivePlan': { sr: 'Trenutno nemaš aktivan plan.', en: 'You currently have no active plan.' },
  'dashboard.upgradePlan': { sr: 'Nadogradi plan', en: 'Upgrade Plan' },
  'dashboard.buyPlan': { sr: 'Kupi plan', en: 'Buy Plan' },
  'dashboard.cashOut': { sr: 'Cash Out zahtev', en: 'Cash Out Request' },
  'dashboard.cashOutPending': { sr: 'Zahtev poslat', en: 'Request Sent' },
  'dashboard.loginStays': { sr: 'Login ostaje isti nakon nadogradnje.', en: 'Login remains the same after upgrade.' },
  'dashboard.requestSent': { sr: 'Poslato:', en: 'Sent:' },
  'dashboard.funded.active': { sr: 'Funded: aktivan', en: 'Funded: active' },
  'dashboard.funded.noPlan': { sr: 'Funded: nema plana', en: 'Funded: no plan' },

  // Dashboard Info Cards
  'dashboardInfo.payments': { sr: 'Plaćanja', en: 'Payments' },
  'dashboardInfo.noCardsSaved': { sr: 'Ne čuvamo brojeve kartica.', en: 'We don\'t store card numbers.' },
  'dashboardInfo.activationTime': { sr: 'Aktivacija plana obično traje nekoliko minuta.', en: 'Plan activation usually takes a few minutes.' },
  'dashboardInfo.nextSteps': { sr: 'Sledeći koraci', en: 'Next Steps' },
  'dashboardInfo.refreshPage': { sr: 'Ako plan ne vidiš odmah, osveži stranicu posle par minuta.', en: 'If you don\'t see the plan immediately, refresh the page after a few minutes.' },
  'dashboardInfo.keepEmailUpdated': { sr: 'Drži email ažuriranim zbog obaveštenja i isplata.', en: 'Keep your email updated for notifications and payouts.' },
  'dashboardInfo.supportFromDashboard': { sr: 'Podršku i izmene plana tražiš iz dashboard‑a.', en: 'Request support and plan changes from the dashboard.' },

  // Crypto Payment
  'crypto.title': { sr: 'Kripto uplata', en: 'Crypto Payment' },
  'crypto.header': { sr: 'Plati kriptom', en: 'Pay with Crypto' },
  'crypto.description': { sr: 'Izaberi coin i generiši jedinstvenu adresu za uplatu.', en: 'Select coin and generate a unique payment address.' },
  'crypto.backToPlans': { sr: 'Nazad na planove', en: 'Back to Plans' },
  'crypto.selectCoin': { sr: 'Izaberi coin:', en: 'Select coin:' },
  'crypto.creating': { sr: 'Kreiranje uplate…', en: 'Creating payment…' },
  'crypto.sendExactly': { sr: 'Pošalji tačno', en: 'Send exactly' },
  'crypto.toAddress': { sr: 'na ovu adresu:', en: 'to this address:' },
  'crypto.copyAddress': { sr: 'Kopiraj adresu', en: 'Copy Address' },
  'crypto.paymentId': { sr: 'Payment ID:', en: 'Payment ID:' },
  'crypto.afterConfirmation': { sr: 'Nakon potvrde na blockchain‑u, tvoj plan se automatski aktivira u dashboard‑u.', en: 'After blockchain confirmation, your plan will be automatically activated in the dashboard.' },

  // Admin
  'admin.zone': { sr: 'Admin zona', en: 'Admin Zone' },
  'admin.title': { sr: 'Admin panel', en: 'Admin Panel' },
  'admin.description': { sr: 'Transakcije, aktivacija naloga i slanje account podataka.', en: 'Transactions, account activation and sending account data.' },
  'admin.clientView': { sr: 'Klijentski prikaz', en: 'Client View' },
  'admin.loading': { sr: 'Učitavanje transakcija...', en: 'Loading transactions...' },
  'admin.noTransactions': { sr: 'Nema evidentiranih plaćenih transakcija.', en: 'No recorded paid transactions.' },
  'admin.user': { sr: 'Korisnik', en: 'User' },
  'admin.plan': { sr: 'Plan', en: 'Plan' },
  'admin.amount': { sr: 'Iznos', en: 'Amount' },
  'admin.paid': { sr: 'Plaćeno', en: 'Paid' },
  'admin.active': { sr: 'Aktivno', en: 'Active' },
  'admin.cashOut': { sr: 'Cash Out', en: 'Cash Out' },
  'admin.account': { sr: 'Account', en: 'Account' },
  'admin.card': { sr: 'Kartica', en: 'Card' },
  'admin.crypto': { sr: 'Kripto', en: 'Crypto' },
  'admin.activeStatus': { sr: 'Aktivno', en: 'Active' },
  'admin.inactiveStatus': { sr: 'Neaktivno', en: 'Inactive' },
  'admin.cashOut.noRequest': { sr: 'Nema zahteva', en: 'No Request' },
  'admin.cashOut.pending': { sr: 'Zahtev poslat', en: 'Request Sent' },
  'admin.cashOut.done': { sr: 'Obrađeno', en: 'Processed' },
  'admin.cashOut.markDone': { sr: 'Označi obrađeno', en: 'Mark as Done' },
  'admin.cashOut.reset': { sr: 'Resetuj', en: 'Reset' },
  'admin.accountSent': { sr: 'Poslato', en: 'Sent' },
  'admin.accountNotSent': { sr: 'Nije poslato', en: 'Not Sent' },

  // Leaderboard
  'leaderboard.section': { sr: 'LEADERBOARD', en: 'LEADERBOARD' },
  'leaderboard.title': { sr: 'TOP 10 KLIJENATA', en: 'TOP 10 CLIENTS' },

  // Auth - Login
  'login.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'login.clientAccess': { sr: 'Klijent pristup', en: 'Client access' },
  'login.title': { sr: 'Prijava na dashboard', en: 'Login to dashboard' },
  'login.subtitle': {
    sr: 'Unesi email i lozinku da vidiš svoj funded nalog, aktivan plan i istoriju isplata na jednom mestu.',
    en: 'Enter email and password to view your funded account, active plan, and payout history in one place.'
  },
  'login.email': { sr: 'Email', en: 'Email' },
  'login.password': { sr: 'Lozinka', en: 'Password' },
  'login.passwordPlaceholder': { sr: 'Vaša lozinka', en: 'Your password' },
  'login.submit': { sr: 'Prijava', en: 'Login' },
  'login.noAccount': { sr: 'Nemate nalog?', en: "Don't have an account?" },
  'login.registerCta': { sr: 'Registrujte se', en: 'Register' },
  'login.dashboard.see': { sr: 'Šta vidiš u dashboard‑u', en: 'What you see in the dashboard' },
  'login.dashboard.desc': {
    sr: 'Pregled aktivnih planova, limite rizika i istoriju isplata – sve na jednom mestu, uz jasne metrike napretka.',
    en: 'View active plans, risk limits, and payout history in one place with clear progress metrics.'
  },
  'login.tips.title': { sr: 'Kratki saveti', en: 'Quick tips' },
  'login.tips.item1': { sr: '• Koristi isti email koji si upotrebio pri kupovini naloga.', en: '• Use the same email you used when purchasing the account.' },
  'login.tips.item2': { sr: '• Ako promeniš lozinku, sve aktivne sesije će biti odjavljene.', en: '• Changing your password logs out all active sessions.' },
  'login.tips.item3': { sr: '• Ako ne vidiš aktivan plan, javi se podršci iz dashboard‑a.', en: "• If you don't see an active plan, contact support from the dashboard." },

  // Auth - Register
  'register.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'register.create': { sr: 'Kreiranje naloga', en: 'Create account' },
  'register.title': { sr: 'Napravi pristup funded nalogu', en: 'Create access to your funded account' },
  'register.subtitle': {
    sr: 'Unesi email koji redovno proveravaš. Ovaj login koristiš za pristup dashboard‑u, praćenje plana i isplata.',
    en: "Enter an email you check regularly. You'll use this login for dashboard access, plan tracking, and payouts."
  },
  'register.firstName': { sr: 'Ime', en: 'First name' },
  'register.firstNamePlaceholder': { sr: 'Pera', en: 'John' },
  'register.lastName': { sr: 'Prezime', en: 'Last name' },
  'register.lastNamePlaceholder': { sr: 'Perić', en: 'Doe' },
  'register.email': { sr: 'Email', en: 'Email' },
  'register.emailPlaceholder': { sr: 'ti@primer.com', en: 'you@example.com' },
  'register.password': { sr: 'Lozinka', en: 'Password' },
  'register.passwordPlaceholder': { sr: 'Min. 8 karaktera', en: 'Min. 8 characters' },
  'register.submit': { sr: 'Napravi nalog', en: 'Create account' },
  'register.terms': {
    sr: 'Kreiranjem naloga prihvataš osnovna pravila rizika i isplata koja će biti prikazana u tvom dashboard‑u.',
    en: 'By creating an account, you accept the basic risk and payout rules that will be shown in your dashboard.'
  },
  'register.haveAccount': { sr: 'Već imaš nalog?', en: 'Already have an account?' },
  'register.loginCta': { sr: 'Prijava', en: 'Login' },
  'register.after.title': { sr: 'Posle registracije', en: 'After registration' },
  'register.after.desc': {
    sr: 'Nakon registracije možeš odmah da se prijaviš, izabereš plan i završiš jednokratnu uplatu karticom ili kriptom. Status naloga pratiš kroz klijent dashboard.',
    en: 'After registering you can log in immediately, pick a plan, and pay once by card or crypto. Track account status in the client dashboard.'
  },
  'register.notes.title': { sr: 'Brze napomene', en: 'Quick notes' },
  'register.notes.item1': { sr: '• Kasnije uvek možeš da pređeš na veći plan.', en: '• You can upgrade to a higher plan later.' },
  'register.notes.item2': { sr: '• Isti login koristiš za praćenje naloga i isplata.', en: '• The same login is used to track your account and payouts.' },
  'register.notes.item3': { sr: '• Gašenje naloga tražiš direktno iz dashboard‑a.', en: '• Request account closure directly from the dashboard.' },

  // Contact
  'contact.section': { sr: 'Kontakt', en: 'Contact' },
  'contact.title': { sr: 'Javi se timu', en: 'Contact the team' },
  'contact.subtitle': {
    sr: 'Pitanja o nalozima, plaćanju ili saradnji – piši direktno timu i dobićeš odgovor u kratkom roku.',
    en: 'Questions about accounts, payments, or collaboration—write directly to the team for a quick reply.'
  },
  'contact.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'contact.support.title': { sr: 'Podrška za korisnike', en: 'Customer support' },
  'contact.support.emailLabel': { sr: 'Email podrške', en: 'Support email' },
  'contact.support.note': { sr: 'Nalozi, uplate, tehnički problemi.', en: 'Accounts, payments, technical issues.' },
  'contact.biz.title': { sr: 'Poslovna saradnja', en: 'Business partnership' },
  'contact.biz.emailLabel': { sr: 'Poslovni kontakt', en: 'Business contact' },
  'contact.biz.note': { sr: 'Partnerstva, affiliate i B2B upiti.', en: 'Partnerships, affiliates, and B2B inquiries.' },
  'contact.companyDetails': { sr: 'Detalji kompanije', en: 'Company details' },
  'contact.companyAddress': { sr: 'Naziv firme d.o.o.\nUlica i broj, Grad, Država', en: 'Company Name LLC\nStreet and number, City, Country' },
  'contact.companyHours': { sr: 'Radnim danima 9–17h (CET). Na email obično odgovaramo u roku od 24 sata.', en: 'Weekdays 9–17h (CET). We usually respond to email within 24 hours.' },
  'contact.whatToSend': { sr: 'Šta da pošalješ u poruci', en: 'What to include in your message' },
  'contact.msg.payment': { sr: '• Problem sa uplatom: email naloga, tip uplate (kartica/kripto) i vreme transakcije.', en: '• Payment issue: account email, payment type (card/crypto), and transaction time.' },
  'contact.msg.rules': { sr: '• Pitanje o pravilima: koji paket koristiš (10K ili 25K) i na kojoj platformi trguješ.', en: '• Rules question: which package you use (10K or 25K) and which platform you trade on.' },
  'contact.msg.biz': { sr: '• Saradnja: par rečenica o projektu i publici (YouTube, Discord, Telegram...).', en: '• Collaboration: a few sentences about your project and audience (YouTube, Discord, Telegram...).' },

  // Partnerstvo Page
  'partner.title': { sr: 'Naše partnerstvo sa Norvestor Equiti Ltd.', en: 'Our partnership with Norvestor Equiti Ltd.' },
  'partner.subtitle': { sr: 'Globalni fond, lokalne prilike.', en: 'Global fund, local opportunities.' },
  'partner.intro1': {
    sr: 'Naša kompanija posluje u partnerstvu sa Norvestor Equiti Ltd., jednim od vodećih međunarodnih kapitalnih fondova za investicije u kriptovalute i obveznice.',
    en: 'Our company operates in partnership with Norvestor Equiti Ltd., one of the leading international capital funds for investments in cryptocurrencies and bonds.'
  },
  'partner.intro2': {
    sr: 'Ovo partnerstvo nam omogućava da investitorima u regionu Balkana pružimo pristup profesionalnom kapitalu, savremenim alatima i stručnoj podršci koja je inače dostupna samo globalnim tržištima.',
    en: 'This partnership allows us to give investors in the Balkans access to professional capital, modern tools, and expert support typically available only in global markets.'
  },
  'partner.section.what': { sr: 'Šta partnerstvo znači za vas', en: 'What this partnership means for you' },
  'partner.bullet.security.title': { sr: 'Sigurnost ulaganja', en: 'Investment security' },
  'partner.bullet.security.desc': {
    sr: 'Klijenti dobijaju pristup kapitalu fonda, uz jasno definisana pravila rizika i podršku stručnog tima.',
    en: 'Clients gain access to fund capital with clearly defined risk rules and expert team support.'
  },
  'partner.bullet.tools.title': { sr: 'Pristup vrhunskim investicionim alatima', en: 'Access to top-tier investment tools' },
  'partner.bullet.tools.desc': {
    sr: 'Naša platforma omogućava lako praćenje i upravljanje investicijama, sa analitikom i vodičima prilagođenim početnicima i iskusnim investitorima.',
    en: 'Our platform makes it easy to track and manage investments, with analytics and guides for both beginners and experienced investors.'
  },
  'partner.bullet.transparency.title': { sr: 'Transparentnost i poverenje', en: 'Transparency and trust' },
  'partner.bullet.transparency.desc': {
    sr: 'Partnerstvo sa Norvestor Equiti garantuje visoke standarde poslovanja i profesionalni nadzor.',
    en: 'The partnership with Norvestor Equiti ensures high business standards and professional oversight.'
  },
  'partner.bullet.regional.title': { sr: 'Regionalni fokus', en: 'Regional focus' },
  'partner.bullet.regional.desc': {
    sr: 'Kao lokalni partner, posvećeni smo razvoju Balkana kao rastućeg tržišta za profesionalno investiranje.',
    en: 'As a local partner, we are committed to developing the Balkans as a growing market for professional investing.'
  },
  'partner.conclusion1': {
    sr: 'Ovo partnerstvo omogućava svakom investitoru da učestvuje u ozbiljnim globalnim investicijama, bez rizika po sopstveni kapital, uz potencijal za dugoročne i stabilne profite.',
    en: 'This partnership allows every investor to participate in serious global investments without risking their own capital, while aiming for long-term and stable profits.'
  },
  'partner.conclusion2': {
    sr: 'Naš model favorizuje investitore koji uče, rastu i ostvaruju rezultate, čime stvaramo obostranu vrednost i održiv sistem za sve uključene strane.',
    en: 'Our model favors investors who learn, grow, and deliver results, creating mutual value and a sustainable system for everyone involved.'
  },
  'partner.registration': { sr: 'Registracioni broj kompanije:', en: 'Company registration number:' },
  'partner.back': { sr: '← Nazad na O nama', en: '← Back to About' },

  // About Page
  'about.title': { sr: '🌍 O nama', en: '🌍 About Us' },
  'about.subtitle': { sr: 'Povezujemo globalni kapital sa lokalnim potencijalom', en: 'Connecting global capital with local potential' },
  'about.origin.title': { sr: '🏢 Naše poreklo', en: '🏢 Our Origin' },
  'about.origin.description': {
    sr: 'Naša kompanija deo je međunarodne korporacije Norvestor Equiti Ltd., jednog od vodećih kapitalnih fondova specijalizovanih za investicije u kriptovalute i obveznice.',
    en: 'Our company is part of the international corporation Norvestor Equiti Ltd., one of the leading capital funds specialized in cryptocurrency and bond investments.'
  },
  'about.regional.title': { sr: '🌍 Regionalni pristup', en: '🌍 Regional Approach' },
  'about.regional.description': {
    sr: 'Kao regionalni partner Norvestor Equiti grupe, pokrećemo poslovanje na balkanskom tržištu kako bismo približili savremene investicione mogućnosti i profesionalne alate pojedincima i timovima širom regiona.',
    en: 'As a regional partner of the Norvestor Equiti group, we are launching operations in the Balkan market to bring modern investment opportunities and professional tools to individuals and teams across the region.'
  },
  'about.model.title': { sr: '💼 Naš model', en: '💼 Our Model' },
  'about.model.description': {
    sr: 'Naš model omogućava investitorima da pristupe kapitalu, stručnoj podršci i bezbednom okruženju za ulaganje, bez potrebe da rizikuju sopstvena sredstva.',
    en: 'Our model allows investors to access capital, professional support, and a secure investment environment without risking their own funds.'
  },
  'about.network.title': { sr: '🤝 Izgradnja mreže', en: '🤝 Building the Network' },
  'about.network.description': {
    sr: 'Zajedno sa Norvestor Equiti fondom, gradimo mrežu investitora koji ostvaruju stabilne i dugoročne rezultate, dok region Balkana pozicioniramo kao novo središte pametnog investiranja.',
    en: 'Together with the Norvestor Equiti fund, we are building a network of investors achieving stable and long-term results, while positioning the Balkan region as a new hub for smart investing.'
  },
  'about.mission.title': { sr: '🎯 Naša misija', en: '🎯 Our Mission' },
  'about.mission.description': {
    sr: 'Naš cilj je jasan – podržati uspešne investitore, smanjiti rizik i ostvariti zajednički rast.',
    en: 'Our goal is clear – to support successful investors, reduce risk, and achieve mutual growth.'
  },
  'about.registration': { sr: '📋 Registracioni broj kompanije:', en: '📋 Company Registration Number:' },
  'about.partnershipButton': { sr: '🔗 Saznajte više o našem partnerstvu', en: '🔗 Learn more about our partnership' },
  'about.stats.clients.title': { sr: 'Klijenti', en: 'Clients' },
  'about.stats.clients.description': { sr: 'Aktivnih naloga na kripto tržištima sa stabilnim rezultatima.', en: 'Active accounts on crypto markets with stable results.' },
  'about.stats.profit.title': { sr: 'Podela profita', en: 'Profit Split' },
  'about.stats.profit.description': {
    sr: '80% profita ide klijentu, dok 20% zadržava fond, uz fokus na dugoročnu saradnju.',
    en: '80% of profit goes to the client, while 20% is retained by the fund, with a focus on long-term cooperation.'
  },
  'about.expectations.title': { sr: 'Šta možeš da očekuješ', en: 'What You Can Expect' },
  'about.expectations.longterm.title': { sr: 'Dugoročna igra', en: 'Long-term Game' },
  'about.expectations.longterm.description': { sr: 'Cilj je stabilna i dugoročna saradnja, ne kazna za svaku grešku.', en: 'The goal is stable and long-term cooperation, not punishment for every mistake.' },
  'about.expectations.security.title': { sr: 'Bezbedno okruženje', en: 'Safe Environment' },
  'about.expectations.security.description': { sr: 'Kapital je obezbeđen kroz fond, dok su rizici kontrolisani.', en: 'Capital is secured through the fund while risks are controlled.' },
  'about.expectations.tools.title': { sr: 'Profesionalni alati', en: 'Professional Tools' },
  'about.expectations.tools.description': { sr: 'Dobijaš pristup naprednim platformama i podršci mentora.', en: 'You get access to advanced platforms and mentor support.' },
  'about.expectations.support.title': { sr: 'Podrška tima', en: 'Team Support' },
  'about.expectations.support.description': { sr: 'Tim stručnjaka stoji iza tebe kroz svaki korak procesa.', en: 'A team of experts stands behind you at every step of the process.' },

  // On-site Stripe Checkout
  'onsite.firstName': { sr: 'Ime', en: 'First name' },
  'onsite.lastName': { sr: 'Prezime', en: 'Last name' },
  'onsite.address': { sr: 'Adresa (ulica, broj, grad)', en: 'Address (street, number, city)' },
  'onsite.addressPlaceholder': { sr: 'Ulica 123, Grad', en: '123 Main St, City' },
  'onsite.phone': { sr: 'Broj telefona (opciono)', en: 'Phone number (optional)' },
  'onsite.phonePlaceholder': { sr: '+381 6x xxx xxxx', en: '+1 234 567 8900' },
  'onsite.cardNumber': { sr: 'Broj kartice', en: 'Card Number' },
  'onsite.expiry': { sr: 'Datum isteka', en: 'Expiration Date' },
  'onsite.cvc': { sr: 'CVV', en: 'CVV' },
  'onsite.error.unavailable': { sr: 'Plaćanje trenutno nije dostupno. Pokušaj ponovo kasnije.', en: 'Payment is currently unavailable. Please try again later.' },
  'onsite.error.create': { sr: 'Nije moguće kreirati Stripe uplatu.', en: 'Unable to create Stripe payment.' },
  'onsite.error.cardField': { sr: 'Polje za broj kartice nije učitano. Osveži stranicu.', en: 'Card number field not loaded. Refresh the page.' },
  'onsite.error.stripe': { sr: 'Stripe greška. Pokušaj ponovo.', en: 'Stripe error. Please try again.' },
  'onsite.submit.processing': { sr: 'Obrada uplate...', en: 'Processing payment...' },
  'onsite.submit.pay': { sr: 'Plati karticom', en: 'Pay by card' },

  // On-site Payment Page
  'onsite.page.section': { sr: 'Plaćanje karticom', en: 'Card payment' },
  'onsite.page.title': { sr: 'Završite kupovinu', en: 'Complete purchase' },
  'onsite.page.back': { sr: 'Povratak na planove', en: 'Back to plans' },

  // Success Page
  'success.status.success': { sr: 'Uspeh', en: 'Success' },
  'success.status.error': { sr: 'Greška', en: 'Error' },
  'success.status.pending': { sr: 'U obradi', en: 'Pending' },
  'success.title.success': { sr: 'Plan aktivan!', en: 'Plan active!' },
  'success.title.error': { sr: 'Neuspeh', en: 'Failed' },
  'success.title.pending': { sr: 'Čekamo potvrdu', en: 'Awaiting confirmation' },
  'success.msg.generic': { sr: 'Kupovina je uspešno izvršena.', en: 'Purchase completed successfully.' },
  'success.msg.stripe': { sr: 'Plan uspešno aktiviran preko Stripe {method}!', en: 'Plan successfully activated via Stripe {method}!' },
  'success.msg.now': { sr: 'Plan uspešno aktiviran preko NowPayments!', en: 'Plan successfully activated via NowPayments!' },
  'success.msg.pending': { sr: 'NowPayments: {status}. Čekamo 10s...', en: 'NowPayments: {status}. Waiting 10s...' },
  'success.msg.failed': { sr: 'NowPayments plaćanje neuspešno.', en: 'NowPayments payment failed.' },
  'success.msg.error': { sr: 'Greška NowPayments. Proveri dashboard.', en: 'NowPayments error. Check your dashboard.' },
  'success.msg.timeout': { sr: 'Čekamo blockchain potvrdu. Proveri dashboard za status.', en: 'Waiting for blockchain confirmation. Check dashboard for status.' },
  'success.msg.unknown': { sr: 'Nepoznat payment provider. Kontaktiraj podršku.', en: 'Unknown payment provider. Contact support.' },
  'success.msg.checking': { sr: 'Čekamo potvrdu plaćanja...', en: 'Waiting for payment confirmation...' },
  'success.button.success': { sr: 'Dashboard →', en: 'Dashboard →' },
  'success.button.check': { sr: 'Proveri Status', en: 'Check Status' },

  // Cancel Page
  'cancel.section': { sr: 'Uplata otkazana', en: 'Payment canceled' },
  'cancel.title': { sr: 'Transakcija nije završena', en: 'Transaction not completed' },
  'cancel.desc': { sr: 'Uplata nije prošla ili je prekinuta. Možeš pokušati ponovo ili izabrati drugi plan.', en: 'Payment failed or was interrupted. You can try again or choose another plan.' },
  'cancel.back': { sr: 'Nazad na planove', en: 'Back to plans' },

  // Crypto Payment (extended)
  'crypto.coin.usdt': { sr: 'USDT TRC-20', en: 'USDT TRC-20' },
  'crypto.coin.usdt.note': { sr: 'Tether TRON (najniži fee)', en: 'Tether on TRON (lowest fees)' },
  'crypto.coin.esdt': { sr: 'ESDT', en: 'ESDT' },
  'crypto.coin.esdt.note': { sr: 'MultiversX (EGLD)', en: 'MultiversX (EGLD)' },
  'crypto.coin.usdc': { sr: 'USDC', en: 'USDC' },
  'crypto.coin.usdc.note': { sr: 'Ethereum mreža', en: 'Ethereum network' },
  'crypto.coin.eth': { sr: 'ETH', en: 'ETH' },
  'crypto.coin.eth.note': { sr: 'Ethereum mreža', en: 'Ethereum network' },
  'crypto.loading': { sr: 'Kreiranje uplate…', en: 'Creating payment…' },
  'crypto.error': { sr: 'Greška pri kreiranju kripto uplate.', en: 'Error creating crypto payment.' },
  'crypto.noData': { sr: 'Nema podataka o uplati.', en: 'No payment data available.' },
  'crypto.loadingShort': { sr: 'Učitavanje uplate…', en: 'Loading payment…' },
  'crypto.copy': { sr: 'Kopiraj adresu', en: 'Copy address' },
  'crypto.payWithBtc': { sr: 'Plati BTC‑om', en: 'Pay with BTC' },
  'crypto.note.activate': { sr: 'Nakon potvrde uplate na mreži, paket se automatski aktivira na tvom nalogu. Potvrda može da potraje nekoliko minuta u zavisnosti od mreže.', en: 'After network confirmation, the package activates automatically on your account. Confirmation can take a few minutes depending on the network.' },
};

export function t(key) {
  const lang = getLang();
  const entry = translations[key];
  if (!entry) return key;
  if (lang === 'nl') {
    return nlTranslations[key] || entry.en || key;
  }
  return entry[lang] || entry.en || key;
}
