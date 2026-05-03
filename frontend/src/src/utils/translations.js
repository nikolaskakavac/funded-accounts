import { getLang } from './lang';
import nlTranslations from './translations.nl';

const translations = {
  // Investment Modal (custom text for modal and section)
  'whatYouGet.platform.conditionsLink': { sr: 'uslovi investiranja', en: 'Investment Conditions' },
  'investmentModal.title': { sr: 'Uslovi investiranja', en: 'Investment Conditions' },
  'investmentModal.plan1': { sr: '5.000€ nalog → 150€ dozvoljeni gubitak', en: '€5,000 account → €150 allowed loss' },
  'investmentModal.plan2': { sr: '10.000€ nalog → 300€ dozvoljeni gubitak', en: '€10,000 account → €300 allowed loss' },
  'investmentModal.rule1': { sr: 'Možeš investirati ceo iznos (5.000€ ili 10.000€) bez dodatnih troškova.', en: 'You can invest the full amount (5,000€ or 10,000€) with no additional costs.' },
  'investmentModal.rule2': { sr: 'Ako prekoračiš dozvoljeni gubitak, nalog se automatski gasi i nema dodatnih troškova.', en: 'If you exceed the allowed loss, your account is automatically deactivated and there are no extra charges.' },
  'investmentModal.rule3': { sr: 'Isplata profita moguća je nakon minimum 30 dana od kupovine naloga, radi doslednosti strategije i upravljanja rizikom.', en: 'Profit payout is possible only after a minimum of 30 days from account purchase, to ensure consistent strategy and risk management.' },
  'investmentModal.description': { sr: 'Svaki nalog ima unapred definisan maksimalni dozvoljeni gubitak koji ujedno predstavlja i njegovu cenu.', en: 'Each account has a predefined maximum loss amount which also represents its price.' },
  'investmentModal.account5k': { sr: 'Nalog od 5.000€', en: '€5,000 account' },
  'investmentModal.loss5k': { sr: '€150 dozvoljeni gubitak', en: '€150 allowed loss' },
  'investmentModal.account10k': { sr: 'Nalog od 10.000€', en: '€10,000 account' },
  'investmentModal.loss10k': { sr: '€300 dozvoljeni gubitak', en: '€300 allowed loss' },

  // Landing Hero
  'hero.title': { sr: 'Uloži sa našim kapitalom.', en: 'Invest with our capital.' },
  'hero.title.line1': { sr: 'Investing', en: 'Investing' },
  'hero.title.line2': { sr: 'Simplified', en: 'Simplified' },
  'hero.subtitle': { sr: '', en: '' },
  'hero.learnMore': { sr: 'Saznaj više', en: 'Learn More' },
  'hero.viewPlans': { sr: 'Izaberi nalog', en: 'Choose Account' },

  // Investing Simplified
  'investingSimplified.title': { sr: 'Arbex Platform', en: 'Arbex Platform' },
  'investingSimplified.description1': {
    sr: 'We provide a platform where individuals can experience real-world investing without needing to bring their own capital. Each client manages a live investment account funded by us, using their own strategy and judgment.',
    en: 'We provide a platform where individuals can experience real-world investing without needing to bring their own capital. Each client manages a live investment account funded by us, using their own strategy and judgment.'
  },
  'investingSimplified.description2': {
    sr: 'This setup lets clients engage directly with live markets, make their own investment decisions, or simply copy our professional investors in real time.',
    en: 'This setup lets clients engage directly with live markets, make their own investment decisions, or simply copy our professional investors in real time.'
  },

  // How it works
  'howItWorks.title': { sr: 'Arbex Account', en: 'Arbex Account' },
  'howItWorks.description': {
    sr: 'Kada kupiš nalog na našem websajtu, dobijaš log in podatke od novog trading naloga koji će biti popunjen pravim kapitalom. Svaki kupac dobija svoj, zaseban nalog.',
    en: 'When you become our client, you will receive login information for a newly created trading account that will be filled with real capital. Each customer is provided with their own separate account.'
  },
  'howItWorks.goalTitle': { sr: 'Cilj: Ostvari profit', en: 'Goal: Achieve profit' },
  'howItWorks.goalDescription': {
    sr: 'investirajući u kripto, zlato ili bilo koji drugi finansijski instrument dostupan na našoj investicionoj platformi.',
    en: 'by investing in crypto, gold, or any other financial instrument available on our investment platform.'
  },
  'howItWorks.task': {
    sr: 'Tvoj zadatak je jasan:',
    en: 'Your task is clear:'
  },
  'howItWorks.profit': {
    sr: 'ostvari profit investirajući u zlato ili neku od',
    en: 'Achieve a profit by investing in gold, crypto or another financial instrument available on our trading platform. All the capital comes from us, while you focus exclusively on'
  },
  'howItWorks.crypto': { sr: 'kripto-valuta', en: 'your investing decisions.' },
  'howItWorks.instruments': { sr: 'Saznaj više o dostupnim finansijskim instrumentima', en: 'Find out all available financial instruments' },

  // Trading Rule
  'risk.title': { sr: 'Investment rule', en: 'Investment rule' },
  'risk.bodyIntro': {
    sr: 'Svaki nalog ima unapred određen dozvoljeni gubitak - iznos koji ujedno predstavlja i njegovu cenu:',
    en: 'Each account has a predefined maximum Allowed Loss, which also represents its price:'
  },
  'risk.bodyPlan1': {
    sr: '5.000€ nalog → 300€ dozvoljeni gubitak',
    en: '€5.000 account → €300 allowed loss'
  },
  'risk.bodyPlan2': {
    sr: '10.000€ nalog → 500€ dozvoljeni gubitak',
    en: '€10.000 account → €500 allowed loss'
  },
  'risk.bodyLimit': {
    sr: 'Ako se taj iznos prekorači, pristup nalogu se automatski ukida.',
    en: 'If that amount is exceeded, the account is automatically deactivated.'
  },
  'risk.bodyConclusion': {
    sr: 'Ovim pristupom, maksimalni rizik gubitka ograničen je samo na cenu naloga, bez dodatnih troškova.',
    en: 'With this approach, you are able invest the full 5.000€ or 10.000€, while your maximum financial risk is limited only to the account price, with no additional costs.'
  },
  'risk.companyInfo': {
    sr: 'Arbex Fund B.V. je holandska kompanija osnovana 2025. od strane Milosa Jevrosimovica i Kala Bagjna, osnivača BinckBanka, jedne od najvećih evropskih online investment banski.',
    en: 'Arbex Fund B.V. is a Dutch Company founded in 2025 by Milos Jevrosimovic and Kalo Bagijn, the Founder of BinckBank, one of the largest European online investment banks.'
  },

  // What You Get
  'whatYouGet.title': { sr: 'Šta dobijaš nakon kupovine', en: 'What You Get After Purchase' },
  'whatYouGet.capital.title': { sr: 'KORISNIČKO IME I LOZINKA', en: 'USERNAME AND PASSWORD' },
  'whatYouGet.capital.description': {
    sr: 'Dobijaš email sa podacima za prijavu (korisničko ime, lozinka) za svoj novi investicioni nalog na platformi MetaTrader5.com.',
    en: 'You get an email with the login information (username, password) for your newly created investment account on the online platform called <a href="https://www.metatrader5.com" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;text-decoration:underline">MetaTrader5.com</a>.'
  },
  'whatYouGet.platform.title': { sr: 'INVESTICIONI KAPITAL', en: 'INVESTMENT CAPITAL' },
  'whatYouGet.platform.description': {
    sr: 'Tvoj nalog dobija kapital od Arbex Fund-a. Mi obezbeđujemo sredstva u skladu sa <a href="#" class="investment-conditions-link" style="color:#38bdf8;text-decoration:underline;cursor:pointer">investicionim uslovima</a>.',
    en: 'Your account receives capital from Arbex Fund. We supply the funds in accordance with the <a href="#" class="investment-conditions-link" style="color:#38bdf8;text-decoration:underline;cursor:pointer">investment conditions</a>.'
  },
  'whatYouGet.profit.title': { sr: 'Podela profita', en: 'PROFIT SPLIT' },
  'whatYouGet.profit.description': {
    sr: 'Ako finansijski instrument u koji si investirao poraste u vrednosti i odlučiš da CASH OUT, 80% profita se isplaćuje na tvoju kreditnu karticu ili lični kripto račun.',
    en: 'If the financial instrument you invested in increases in value and you decide to CASH OUT, 80% of the profit is paid directly to your credit card or personal crypto account.'
  },

  // Stats
  'stats.avgProfit.title': { sr: 'Prosečan isplaćeni iznos', en: 'Average profit amount payed out' },
  'stats.avgProfit.amount': { sr: '2900€', en: '2900€' },
  'stats.successRate.title': { sr: 'Januar stopa uspeha', en: 'January Success rate' },
  'stats.successRate.subtitle': { sr: '(Procenat klijenata koji su ostvarili profit iznad 100€)', en: '(Percentage of clients who achieved a profit above 100€)' },
  'stats.successRate.percentage': { sr: '61%', en: '61%' },

  // Our Model
  'goal.title': { sr: 'Naš model', en: 'Our Model' },
  'howToStart.title': { sr: 'How to start', en: 'How to start' },
  'copyArbex.badge': { sr: 'Copy Arbex: Auto-invest za nove klijente', en: 'Copy Arbex: New Client Auto‑Invest' },
  'copyArbex.description': {
    sr: 'Opcija Copy Arbex omogućava novim klijentima da automatski kopiraju investicije naših pet profesionalnih investitora. Kada aktiviraš ovu funkciju u aplikaciji, tvoj nalog prati iste poteze koje prave profesionalci. Klijent bira jednog od pet investitora, poređanih od nižeg ka višem riziku, i tako lako pronalazi stil koji mu odgovara.',
    en: 'The Copy Arbex feature allows new clients to automatically copy the investments of our five professional investors. By activating this feature in the app, their account executes the same investment actions as the professionals. Clients can choose from five investors, ranked from low risk to high risk, making it easy to select the approach that suits them and start investing with confidence.'
  },
  'goal.description': {
    sr: 'Naš model je zasnovan na jednostavnom principu - dajemo vam jaču investicionu moć.',
    en: 'Our model is based on a simple principle - We give you stronger investment power.'
  },
  'goal.beginners': {
    sr: 'Na taj način klijenti dobijaju potencijal za veće prinose u poređenju sa ulaganjem sopstvenog kapitala.',
    en: 'In this way, clients access the potential for larger returns compared to investing with personal capital.'
  },
  'copyTrade.title': { sr: 'Copy Trade Opcija', en: 'Copy Trade Feature' },
  'copyTrade.description': {
    sr: 'Kroz copy trade opciju dostupnu unutar aplikacije, korisnici mogu da aktiviraju automatsko kopiranje jednog od naših 5 profesionalnih trejdera. Tako oni bez prethodnog iskustva imaju bolju šansu da ostvare rezultate.',
    en: 'Through the copy trade feature available inside the app, users can activate automatic copying of one of our five professional traders. This option gives those without prior experience a better chance of achieving strong results.'
  },

  // Plans
  'plans.section': { sr: 'Planovi', en: 'Plans' },
  'plans.title': { sr: 'Izaberi veličinu naloga', en: 'Choose your account size' },
  'plans.plan5k.title': { sr: 'Investicioni nalog sa 5.000€', en: 'Investment account with €5,000' },
  'plans.plan10k.title': { sr: 'Investicioni nalog sa 10.000€', en: 'Investment account with €10,000' },
  'plans.recommended': { sr: 'Preporučeno', en: 'Recommended' },
  'plans.loss': { sr: 'Stop loss:', en: 'Stop loss:' },
  'plans.price': { sr: 'Cena:', en: 'Price:' },
  'plans.trainingIncluded': { sr: 'Video obuka uključena uz nalog', en: 'Video education included' },
  'plans.payCard': { sr: 'Plati karticom', en: 'Pay 300€ with Card' },
  'plans.payCrypto': { sr: 'Plati kriptom', en: 'Pay 150€ with Crypto' },
  'plans.payCard2': { sr: 'Plati karticom', en: 'Pay 500€ with Card' },
  'plans.payCrypto2': { sr: 'Plati kriptom', en: 'Pay 300€ with Crypto' },
  'plans.taxFree': { sr: 'Bez poreza', en: '(Tax free)' },
  'plans.afterPayment': {
    sr: 'After successful payment, your access credentials will be sent to your email. You can view your account status in the dashboard on our website',
    en: 'After successful payment, your access credentials will be sent to your email. You can view your account status in the dashboard on our website'
  },
  'plans.createAccountCta': { sr: 'Kreiraj svoj nalog', en: 'Create your account' },
  'plans.selectedPlanHeading': { sr: 'Tvoj izabrani nalog', en: 'Your selected account' },
  'plans.cancelSelection': { sr: 'Otkaži', en: 'Cancel' },

  // FAQ
  'faq.section': { sr: 'Česta pitanja', en: 'FAQ' },
  'faq.title': { sr: 'FAQ', en: 'FAQ' },
  'faq.q1': { sr: 'Ko stoji iza Arbexfund.com?', en: 'Who is behind Arbexfund.com?' },
  'faq.a1': {
    sr: 'Arbex Fund B.V. je holandska kompanija osnovana 2025. godine od strane Milosa Jevrosimovica i Kala Bagjna, osnivača BinckBanka, jedne od najvećih evropskih online investment banski.',
    en: 'Arbex Fund B.V. is a Dutch Company founded in 2025 by Milos Jevrosimovic and Kalo Bagijn, the Founder of BinckBank, one of the largest European online investment banks.'
  },
  'faq.q2': { sr: 'Kakav je naš poslovni model?', en: 'What\'s our business model?' },
  'faq.a2': {
    sr: 'Naš poslovni model zasnovan je na investicionoj moći. Omogućavamo trgovcima pristup pravom kapitalu, profesionalnoj podršci i sigurnom investicionom okruženju bez rizikovanja ličnih sredstava.',
    en: 'Our business model is based on investment power. We allow traders to access real capital, professional support and a secure investment environment without risking personal funds.'
  },
  'faq.q3': { sr: 'Kako tačno klijenti dobijaju kapital nakon kupovine naloga?', en: 'How exactly do clients receive the capital after account purchase?' },
  'faq.a3': {
    sr: 'Deponujemo željeni iznos kapitala bankovnim transferom na nalog. Svaki nalog koji kreiramo finansira se sa našeg centralnog bankovnog računa.',
    en: 'We deposit the intended capital amount by making a bank transfer to the account. Every account we create is financed by our central bank account.'
  },
  'faq.q4': { sr: 'Da li je naše poslovanje licencirano?', en: 'Is our business licensed?' },
  'faq.a4': {
    sr: 'Da, naše poslovanje je licencirano od strane AFM (Autoriteit Financiele Markten). AFM broj licence: 14000716',
    en: 'Yes, our business is licensed by the AFM (Autoriteit Financiele Markten). AFM License Number: 14000716'
  },

  // Auth - Login
  'login.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'login.clientAccess': { sr: 'Pristup nalogu', en: 'Account access' },
  'login.title': { sr: 'Prijava na dashboard', en: 'LOG IN TO DASHBOARD' },
  'login.subtitle': {
    sr: 'Unesi email i lozinku da vidiš svoj nalog, aktivan plan i istoriju isplata na jednom mestu.',
    en: 'Enter your email and password to access your account, see the active plan and track payout history all in one place.'
  },
  'login.email': { sr: 'Email', en: 'Email' },
  'login.password': { sr: 'Lozinka', en: 'Password' },
  'login.passwordPlaceholder': { sr: 'Vaša lozinka', en: 'Your password' },
  'login.submit': { sr: 'Prijava', en: 'Log in' },
  'login.noAccount': { sr: 'Nemate nalog?', en: 'Don\'t have an account?' },
  'login.registerCta': { sr: 'Registrujte se', en: 'Register now' },
  'login.dashboard.see': { sr: 'Šta vidiš u dashboard‑u', en: 'What you see in the dashboard' },
  'login.dashboard.desc': {
    sr: 'Pregled aktivnih planova, limite rizika i istoriju isplatu - sve na jednom mestu, uz jasne metrike napretka.',
    en: 'View active plans, risk limits, and payout history in one place with clear progress metrics.'
  },
  'login.tips.title': { sr: 'Kratki saveti', en: 'Quick tips' },
  'login.tips.item1': { sr: '• Koristi isti email koji si upotrebio pri kupovini naloga.', en: '• Use the same email you used when purchasing the account.' },
  'login.tips.item2': { sr: '• Ako promeniš lozinku, sve aktivne sesije će biti odjavljene.', en: '• Changing your password logs out all active sessions.' },
  'login.tips.item3': { sr: '• Ako ne vidiš aktivan plan, javi se podršci iz dashboard‑a.', en: '• If you don\'t see an active plan, contact support from the dashboard.' },

  // Auth - Register
  'register.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'register.create': { sr: 'Kreiranje naloga', en: 'Create account' },
  'register.title': { sr: 'Napravi pristup funded nalogu', en: 'CREATE ACCESS TO YOUR ACCOUNT' },
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
    en: ''
  },
  'register.haveAccount': { sr: 'Već imaš nalog?', en: 'Already have an account?' },
  'register.loginCta': { sr: 'Prijava', en: 'Log in' },
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
    sr: 'Pitanja o nalozima, plaćanju ili saradnji - piši direktno timu i dobićeš odgovor u kratkom roku.',
    en: 'Questions about accounts, payments, or collaborations - write directly to our team for a quick response.'
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
  'contact.companyHours': { sr: 'Radnim danima 9-17h (CET). Na email obično odgovaramo u roku od 24 sata.', en: 'Weekdays 9-17h (CET). We usually respond to email within 24 hours.' },
  'contact.whatToSend': { sr: 'Šta da pošalješ u poruci', en: 'What to include in your message' },
  'contact.msg.payment': { sr: '• Problem sa uplatom: email naloga, tip uplate (kartica/kripto) i vreme transakcije.', en: '• Payment issue: account email, payment type (card/crypto), and transaction time.' },
  'contact.msg.rules': { sr: '• Pitanje o pravilima: koji paket koristiš (10K ili 25K) i na kojoj platformi trguješ.', en: '• Rules question: which package you use (10K or 25K) and which platform you trade on.' },
  'contact.msg.biz': { sr: '• Saradnja: par rečenica o projektu i publici (YouTube, Discord, Telegram...).', en: '• Collaboration: a few sentences about your project and audience (YouTube, Discord, Telegram...).' },

  // Contact Form
  'contactForm.title': { sr: 'Pošalji nam poruku', en: 'Send us a message' },
  'contactForm.subtitle': { sr: 'Popuni formu ispod i odgovoriћemo u roku od 48 sati.', en: 'Fill out the form below and we\'ll respond within 48 hours.' },
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

  // Navigation
  'nav.plans': { sr: 'Planovi', en: 'Plans' },
  'nav.contact': { sr: 'Kontakt podrška', en: 'Contact support' },
  'nav.dashboard': { sr: 'Dashboard', en: 'Dashboard' },
  'nav.admin': { sr: 'Admin panel', en: 'Admin panel' },
  'nav.logout': { sr: 'Odjava', en: 'Log out' },
  'nav.login': { sr: 'Prijava', en: 'Log in' },
  'nav.register': { sr: 'Registracija', en: 'Register' },

  // Footer
  'footer.professional': { sr: 'Investiranje, pojednostavljeno.', en: 'Investing, simplified.' },
  'footer.pricing': { sr: 'Planovi i cene', en: 'Plans & Pricing' },
  'footer.contact': { sr: 'Kontakt podrška', en: 'Contact Support' },
  'footer.termsFull': { sr: 'Uslovi korišćenja', en: 'Terms and Conditions' },
  'footer.privacyFull': { sr: 'Politika privatnosti', en: 'Privacy Policy' },
  'footer.amlFull': { sr: 'AML politika', en: 'AML Policy' },
  'footer.cookiesFull': { sr: 'Politika kolačića', en: 'Cookie Policy' },
  'footer.riskFull': { sr: 'Upozorenje o riziku', en: 'Risk Warning' },
  'footer.refundFull': { sr: 'Politika povraćaja', en: 'Refund Policy' },
  'footer.regulatoryFull': { sr: 'Regulatorne informacije', en: 'Regulatory Information' },
  'footer.rights': { sr: 'Sva prava zadržana.', en: 'All rights reserved.' },

  // Dashboard
  'dashboard.clientZone': { sr: 'Klijent zona', en: 'Client Zone' },
  'dashboard.title': { sr: 'Dashboard', en: 'Dashboard' },
  'dashboard.description': { sr: 'Pregled naloga, plana i balansa.', en: 'Account, plan and balance overview.' },
  'dashboard.balance': { sr: 'Pregled naloga', en: 'Account overview' },
  'dashboard.balanceDescription': { sr: 'Aktivna vrednost naloga.', en: 'Active account value' },
  'dashboard.account': { sr: 'Nalog', en: 'Account' },
  'dashboard.accountDescription': { sr: 'Tvoj email i status naloga.', en: 'Email & account status' },
  'dashboard.email': { sr: 'Email adresa', en: 'Email address' },
  'dashboard.name': { sr: 'Ime i prezime', en: 'Name' },
  'dashboard.plan': { sr: 'Veličina naloga', en: 'Account size' },
  'dashboard.paid': { sr: 'Plaćeno:', en: 'Paid:' },
  'dashboard.noActivePlan': { sr: 'You have no active trading account yet', en: 'You have no active trading account yet' },
  'dashboard.upgradePlan': { sr: 'Kupi novi nalog', en: 'Buy new account' },
  'dashboard.buyPlan': { sr: 'Kupi nalog', en: 'Buy account' },
  'dashboard.cashOut': { sr: 'Zahtev za isplatu', en: 'Request Payout' },
  'dashboard.cashOutPending': { sr: 'Zahtev poslat', en: 'Request Sent' },
  'dashboard.loginStays': { sr: 'Login details remain the same after upgrading.', en: 'Login details remain the same after upgrading.' },
  'dashboard.requestSent': { sr: 'Poslato:', en: 'Sent:' },
  'dashboard.funded.active': { sr: 'Aktivan', en: 'Active' },
  'dashboard.funded.noPlan': { sr: 'Nema naloga', en: 'No account' },

  // Dashboard Info Cards
  'dashboardInfo.payments': { sr: 'Plaćanja', en: 'Payments' },
  'dashboardInfo.noCardsSaved': { sr: 'We do not store, collect, or have direct access to any of your card details. All payment information is handled securely by trusted third-party providers, ensuring your data remains private and protected at all times.', en: 'We do not store, collect, or have direct access to any of your card details. All payment information is handled securely by trusted third-party providers, ensuring your data remains private and protected at all times.' },
  'dashboardInfo.encryptedTransactions': { sr: 'There are no recurring or hidden fees. Each account is purchased once.', en: 'There are no recurring or hidden fees. Each account is purchased once.' },
  'dashboardInfo.activationTime': { sr: 'Make sure your email is up to date to receive notifications and payout information.', en: 'Make sure your email is up to date to receive notifications and payout information.' },
  'dashboardInfo.paymentSupport': { sr: 'Contact our support team if you encounter any issues or have questions about the payment process.', en: 'Contact our support team if you encounter any issues or have questions about the payment process.' },
  'dashboardInfo.nextSteps': { sr: 'Sledeći koraci', en: 'Next Steps' },
  'dashboardInfo.refreshPage': { sr: 'After successful payment, you receive the login information and education material for your MetaTrader5.com live investment account.', en: 'After successful payment, you receive the login information and education material for your MetaTrader5.com live investment account.' },
  'dashboardInfo.keepEmailUpdated': { sr: 'You start investing.', en: 'You start investing.' },
  'dashboardInfo.supportFromDashboard': { sr: 'Manage support requests and plan changes directly from your dashboard.', en: 'Manage support requests and plan changes directly from your dashboard.' },

  // Crypto Payment
  'crypto.title': { sr: 'Kripto uplata', en: 'Crypto Payment' },
  'crypto.header': { sr: 'Plati kriptom', en: 'Pay with Crypto' },
  'crypto.description': { sr: 'Izaberi coin i generiši jedinstvenu adresu za uplatu.', en: 'Select coin and generate a unique payment address.' },
  'crypto.backToPlans': { sr: 'Nazad na planove', en: 'Back to Plans' },
  'crypto.selectCoin': { sr: 'Izaberi coin:', en: 'Select coin:' },
  'crypto.creating': { sr: 'Kreiranje uplate…', en: 'Creating payment…' },
  'crypto.sendExactly': { sr: 'Pošalji tačno', en: 'Send exactly' },
  'crypto.toAddress': { sr: 'na ovu adresu:', en: 'to this address:' },
    'crypto.rightCoinHint': { sr: 'Kako da znam da saljem pravi coin?', en: 'How do I know if I am sending the right coin?' },
  'crypto.copyAddress': { sr: 'Kopiraj adresu', en: 'Copy Address' },
  'crypto.copySuccess': { sr: 'Kopirano!', en: 'Copied!' },
  'crypto.copyError': { sr: 'Kopiranje nije uspelo.', en: 'Copy failed.' },
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
  'login.clientAccess': { sr: 'Pristup nalogu', en: 'Account access' },
  'login.title': { sr: 'Prijava na dashboard', en: 'LOG IN TO DASHBOARD' },
  'login.subtitle': {
    sr: 'Unesi email i lozinku da vidiš svoj nalog, aktivan plan i istoriju isplata na jednom mestu.',
    en: 'Enter email and password to view your account, active plan, and payout history in one place.'
  },
  'login.email': { sr: 'Email', en: 'Email' },
  'login.password': { sr: 'Lozinka', en: 'Password' },
  'login.passwordPlaceholder': { sr: 'Vaša lozinka', en: 'Your password' },
  'login.submit': { sr: 'Prijava', en: 'Log in' },
  'login.noAccount': { sr: 'Nemate nalog?', en: "Don't have an account?" },
  'login.registerCta': { sr: 'Registrujte se', en: 'Register now' },
  'login.dashboard.see': { sr: 'Šta vidiš u dashboard‑u', en: 'What you see in the dashboard' },
  'login.dashboard.desc': {
    sr: 'Pregled aktivnih planova, limite rizika i istoriju isplata - sve na jednom mestu, uz jasne metrike napretka.',
    en: 'View active plans, risk limits, and payout history in one place with clear progress metrics.'
  },
  'login.tips.title': { sr: 'Kratki saveti', en: 'Quick tips' },
  'login.tips.item1': { sr: '• Koristi isti email koji si upotrebio pri kupovini naloga.', en: '• Use the same email you used when purchasing the account.' },
  'login.tips.item2': { sr: '• Ako promeniš lozinku, sve aktivne sesije će biti odjavljene.', en: '• Changing your password logs out all active sessions.' },
  'login.tips.item3': { sr: '• Ako ne vidiš aktivan plan, javi se podršci iz dashboard‑a.', en: "• If you don't see an active plan, contact support from the dashboard." },

  // Auth - Register
  'register.back': { sr: 'Nazad na sajt', en: 'Back to site' },
  'register.create': { sr: 'Kreiranje naloga', en: 'Create account' },
  'register.title': { sr: 'Napravi pristup funded nalogu', en: 'CREATE ACCESS TO YOUR ACCOUNT' },
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
    en: ''
  },
  'register.haveAccount': { sr: 'Već imaš nalog?', en: 'Already have an account?' },
  'register.loginCta': { sr: 'Prijava', en: 'Log in' },
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
    sr: 'Pitanja o nalozima, plaćanju ili saradnji - piši direktno timu i dobićeš odgovor u kratkom roku.',
    en: 'Questions about accounts, payments, or collaborations - write directly to our team for a quick response.'
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
  'contact.companyHours': { sr: 'Radnim danima 9-17h (CET). Na email obično odgovaramo u roku od 24 sata.', en: 'Weekdays 9-17h (CET). We usually respond to email within 24 hours.' },
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
    sr: 'Ovo partnerstvo nam omogućava da investitorima širom sveta pružimo pristup profesionalnom kapitalu, savremenim alatima i stručnoj podršci bez granica.',
    en: 'This partnership allows us to give investors worldwide access to professional capital, modern tools, and expert support without borders.'
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
  'partner.bullet.regional.title': { sr: 'Globalni pristup', en: 'Global approach' },
  'partner.bullet.regional.desc': {
    sr: 'Dostupni smo investitorima sa celog sveta, bez geografskih ograničenja, sa istim visokim standardima.',
    en: 'Available to investors from around the world, without geographical limitations, with the same high standards.'
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
  'about.title': { sr: 'O nama', en: 'About Us' },
  'about.subtitle': { sr: 'Povezujemo globalni kapital sa lokalnim potencijalom', en: 'Connecting global capital with local potential' },
  'about.whoWeAre.title': { sr: 'Ko smo mi?', en: 'Who Are We?' },
  'about.whoWeAre.description': {
    sr: 'Arbex Fund je osnovan od strane Kalo Bagijn-a sa ciljem da donese revoluciju u trading industriji kroz inovativne alate i pristupe. Naša misija je da omogućimo briljantnim investitorima pristup kapitalu i sredstvima potrebnim za globalni uspeh, razvojem zajednice stručnjaka koji se fokusiraju na rezultate.',
    en: 'Arbex Fund B.V. Is a Dutch Company founded in 2025 by Kalo Bagijn, the managing director of Norvestor Equiti B.V., one of the leading Dutch private equity funds that specializes in modern trading technology and bond investments. As a partner of the Norvestor Equiti group, we are launching operations to provide modern investment opportunities and professional tools for both individuals and teams.'
  },
  'about.origin.title': { sr: 'Naše poreklo', en: 'Our Origin' },
  'about.origin.description': {
    sr: 'Naša kompanija deo je međunarodne korporacije Norvestor Equiti Ltd., jednog od vodećih kapitalnih fondova specijalizovanih za investicije u kriptovalute i obveznice.',
    en: 'Our company is part of the international corporation Norvestor Equiti Ltd., one of the leading capital funds specialized in cryptocurrency and bond investments.'
  },
  'about.regional.title': { sr: 'Regionalni pristup', en: 'Regional Approach' },
  'about.regional.description': {
    sr: 'Kao regionalni partner Norvestor Equiti grupe, pokrećemo poslovanje na balkanskom tržištu kako bismo približili savremene investicione mogućnosti i profesionalne alate pojedincima i timovima širom regiona.',
    en: 'As a regional partner of the Norvestor Equiti group, we are launching operations in the Balkan market to bring modern investment opportunities and professional tools to individuals and teams across the region.'
  },
  'about.model.title': { sr: 'Naš model', en: 'Our Model' },
  'about.model.description': {
    sr: 'Naš model omogućava investitorima da pristupe kapitalu, stručnoj podršci i bezbednom okruženju za ulaganje, bez potrebe da rizikuju sopstvena sredstva.',
    en: 'Our model gives investors access to capital, professional support, and a secure investment environment, all without risking their own funds.'
  },
  'about.network.title': { sr: 'Izgradnja mreže', en: 'Building the Network' },
  'about.network.description': {
    sr: 'Zajedno sa Norvestor Equiti fondom, gradimo mrežu investitora koji ostvaruju stabilne i dugoročne rezultate, dok region Balkana pozicioniramo kao novo središte pametnog investiranja.',
    en: 'Together with the Norvestor Equiti fund, we are building a network of investors delivering stable, long-term results and creating a platform for smart investing. Members gain access to professional guidance and proven strategies that help them achieve consistent performance.'
  },
  'about.mission.title': { sr: 'Naša misija', en: 'Our Mission' },
  'about.mission.description': {
    sr: 'Naš cilj je jasan - podržati uspešne investitore, smanjiti rizik i ostvariti zajednički rast.',
    en: 'Our goal is clear - to support successful investors and minimize risk, while promoting mutual growth. We are committed to providing the tools, resources, and expertise that enable every investor to make confident, informed decisions.'
  },
  'about.registration': { sr: 'Registracioni broj kompanije:', en: 'Company Registration Number:' },
  'about.partnershipButton': { sr: 'Saznajte više o našem partnerstvu', en: 'Learn more about our partnership' },
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
  'onsite.payment': { sr: 'Plaćanje', en: 'Payment' },
  'onsite.secure': { sr: 'Sve transakcije su sigurne i šifrovane', en: 'All transactions are secure and encrypted' },
  'onsite.amountToPay': { sr: 'Iznos za plaćanje:', en: 'Amount to pay:' },
  'onsite.firstName': { sr: 'Ime', en: 'First name' },
  'onsite.lastName': { sr: 'Prezime', en: 'Last name' },
  'onsite.address': { sr: 'Adresa (ulica, broj, grad)', en: 'Address (street, number, city)' },
  'onsite.addressPlaceholder': { sr: 'Ulica 123, Grad', en: '123 Main St, City' },
  'onsite.phone': { sr: 'Broj telefona (opciono)', en: 'Phone number (optional)' },
  'onsite.phonePlaceholder': { sr: '+381 6x xxx xxxx', en: '+1 234 567 8900' },
  'onsite.cardNumber': { sr: 'Broj kartice', en: 'Card Number' },
  'onsite.expiry': { sr: 'Datum isteka', en: 'Expiration Date' },
  'onsite.expiryShort': { sr: 'MM/GG', en: 'MM/YY' },
  'onsite.cvc': { sr: 'CVV', en: 'Security code' },
  'onsite.cardholderName': { sr: 'Ime na kartici', en: 'Cardholder name' },
  'onsite.nameOnCard': { sr: 'Ime na kartici', en: 'Name on card' },
  'onsite.amountToPay': { sr: 'Iznos za plaćanje', en: 'Amount to pay' },
  'onsite.error.unavailable': { sr: 'Plaćanje trenutno nije dostupno. Pokušaj ponovo kasnije.', en: 'Payment is currently unavailable. Please try again later.' },
  'onsite.error.create': { sr: 'Nije moguce kreirati uplatu karticom.', en: 'Unable to create card payment.' },
  'onsite.error.cardField': { sr: 'Polje za broj kartice nije učitano. Osveži stranicu.', en: 'Card number field not loaded. Refresh the page.' },
  'onsite.error.stripe': { sr: 'Greska pri placanju karticom. Pokusaj ponovo.', en: 'Card payment error. Please try again.' },
  'onsite.submit.processing': { sr: 'Obrada uplate...', en: 'Processing payment...' },
  'onsite.submit.pay': { sr: 'PROCEED', en: 'PROCEED' },

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
  'success.msg.stripe': { sr: 'Plan je uspesno aktiviran placanjem karticom!', en: 'Plan successfully activated by card payment!' },
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
  'crypto.coin.usdt': { sr: 'USDT', en: 'USDT' },
  'crypto.coin.usdt.note': { sr: 'Tether Ethereum', en: 'Tether on Ethereum' },
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

  // Instruments Page
  'instruments.title': { sr: 'Dostupni Finansijski Instrumenti', en: 'Available Financial Instruments' },
  'instruments.description': { sr: 'Traduj preko 1000+ finansijskih instrumenata, uključujući forex, kripto, akcije, indekse, robu i ETF-e.', en: 'Trade 1000+ financial instruments including forex, cryptocurrencies, stocks, indices, commodities, and ETFs.' },
  'instruments.mostPopular': { sr: 'Najpopularniji Finansijski Instrumenti', en: 'Most Popular Financial Instruments' },
  'instruments.forex': { sr: 'Forex / Valutni parovi', en: 'Forex / Currency Pairs' },
  'instruments.forexDesc': { sr: 'Svi glatki parovi eura, dollar, funte, jena i drugih valuta. Ukupno 60+ parova sa niskim spredovima.', en: 'All major currency pairs: EUR/USD, GBP/USD, USD/JPY, and dozens more with tight spreads.' },
  'instruments.indices': { sr: 'Globalni Indeksi Tržišta', en: 'Global Stock Market Indices' },
  'instruments.indicesDesc': { sr: 'S&P 500, NASDAQ, FTSE, DAX, Nikkei i svi važni regionalni indeksi sa živim cijenama.', en: 'S&P 500, NASDAQ, FTSE 100, DAX 30, Nikkei 225 and all major regional indices.' },
  'instruments.commodities': { sr: 'Robe & Energenti', en: 'Commodities & Energies' },
  'instruments.commoditiesDesc': { sr: 'Zlato, srebro, platina, nafta, prirodni gas i druge industrijske robe - sve na jednom mjestu.', en: 'Gold, Silver, Platinum, Oil (Brent & WTI), Natural Gas, Coffee, Cotton, Wheat, Sugar and more.' },
  'instruments.stocks': { sr: 'Popularne Akcije (Globalne)', en: 'Popular Stocks (Global Shares)' },
  'instruments.stocksDesc': { sr: 'Apple, Tesla, Amazon, Microsoft, Meta, Google, Netflix, Nike - stotine US, UK i European kompanija.', en: 'Apple, Tesla, Amazon, Microsoft, Meta, Google, Netflix, Nike and hundreds more US, UK, European companies.' },
  'instruments.etfs': { sr: 'ETF-ovi / Sektor Fondovi', en: 'ETFs / Sector Funds' },
  'instruments.etfsDesc': { sr: 'Tehnologi, čista energija, zdravstvo, finansije, robotika, biotehnologija, nekretnine i više.', en: 'Technology, Clean Energy, Healthcare, Financial, Commodity, Robotics, Biotech, Real Estate, and more.' },
  'instruments.crypto': { sr: 'Kriptovalute', en: 'Cryptocurrencies' },
  'instruments.cryptoDesc': { sr: 'Bitcoin, Ethereum, Litecoin, Ripple i 50+ altcoina sa niskom latencijom.', en: 'Bitcoin, Ethereum, Litecoin, Ripple, Cardano, Solana and dozens more cryptocurrencies.' },
  'instruments.futures': { sr: 'Futures & Napredni Ugovori', en: 'Futures & Advanced Contracts' },
  'instruments.futuresDesc': { sr: 'Naftni, akcijski indeksi, robni i valutni futures - sve MT5 opcije.', en: 'Oil futures, Stock index futures, Commodity futures, Currency futures and more.' },
  'instruments.other': { sr: 'Ostala Tržišta', en: 'Other Tradable Markets' },
  'instruments.otherItems': {
    sr: 'Stotine globalnih akcija (SAD, UK, Evropa, Azija); Forex major, minor i egzotični parovi (60+); Robe (metali, energenti, poljoprivredni proizvodi); ETF-ovi za teme, sektore i inovacije; Kriptovalute (glavne kovanice + altcoini); Futures na naftu, akcijske indekse i robu',
    en: 'Hundreds of global shares (US, UK, Europe, Asia); Forex majors, minors, and exotic pairs (60+ total); Commodities (metals, energies, agricultural products); ETFs for themes, sectors, innovation, and global markets; Cryptocurrencies (major coins + altcoins); Futures on oil, stock indexes, and commodities'
  },
  'instruments.contact': { sr: 'Za bilo koja pitanja o finansijskom instrumentu koji nije na ovoj listi, kontaktirajte nas na support@arbexfund.com', en: 'For any inquiry regarding a financial instrument not on this list, please contact us at support@arbexfund.com' },
};

translations['risk.bodyPlan1'] = {
  sr: '5.000€ nalog → 150€ dozvoljeni gubitak',
  en: '€5.000 account → €150 allowed loss'
};
translations['risk.bodyPlan2'] = {
  sr: '10.000€ nalog → 300€ dozvoljeni gubitak',
  en: '€10.000 account → €300 allowed loss'
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
