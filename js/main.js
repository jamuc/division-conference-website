/* ═══════════════════════════════════════════════════════
   Division D Conference 2026 — main.js
   · Language toggle (EN / DE)
   · Sticky nav
   · Hamburger menu
   · Social share buttons
   · Toast notification
═══════════════════════════════════════════════════════ */

/* ── Translations ─────────────────────────────────────── */
const i18n = {
  en: {
    'nav.brand':        'Division D · District 95',
    'nav.cta':          'Register Now!',
    'nav.about':        'About',
    'nav.tm':           'Toastmasters',
    'nav.venue':        'Venue',
    'nav.tickets':      'Tickets',
    'nav.share':        'Share',

    'hero.eyebrow':     'Toastmasters District 95 · Division D',
    'hero.title':       'Division D<br>Conference 2026',
    'hero.tagline':     'Growing Through Connection',
    'hero.values':      'Integrity | Respect | Service | Excellence',
    'hero.date':        '25 April 2026',
    'hero.location':    'Munich, Germany',
    'hero.cta':         'Register Now!',
    'hero.registerNote': '',
    'hero.visitorCount':   '{n} people have visited this page',
    'hero.agenda':         'View Programme',
    'nav.agenda':        'Programme',
    'join.pill':         '🙋 Join Our Team',

    'about.label':      'The Event',
    'about.title':      'A day where voices come alive',
    'about.body1':      'The Division D Conference is the highlight of the Toastmasters year for clubs across Bavaria. It brings together members from every corner of the division for a day of inspiring speeches, fierce competitions, and genuine human connection.',
    'about.body2':      'Whether you\'re a seasoned speaker competing for glory or a first-timer curious about what Toastmasters is all about — this is your day. Expect world-class speeches, laughter, learning, and a community that will stay with you long after the applause fades.',
    'about.link':       'Meet the District 95 Team →',

    'facts.dateLabel':      'Date',
    'facts.dateValue':      '25 April 2026',
    'facts.locationLabel':  'Location',
    'facts.locationValue':  'Munich · Stadtteilkultur 2411',
    'facts.districtLabel':  'District',
    'facts.districtValue':  'District 95 · Division D',
    'facts.formatLabel':    'Format',
    'facts.formatValue':    'Speeches · Contests · Networking',

    'tm.label':         'New here?',
    'tm.title':         'What is Toastmasters?',
    'tm.body':          'Toastmasters International is a world-leading communication and leadership organisation with over 300,000 members in 145 countries. Members grow their confidence, sharpen their public speaking skills, and discover their voice — in a supportive, non-judgmental community of people just like them.',
    'tm.d95':           'Visit District 95',
    'tm.international': 'Toastmasters International',

    'venue.label':      'Getting There',
    'venue.title':      'Venue',
    'venue.mapCta':     'Open in Google Maps ↗',
    'venue.transport':  'U-Bahn: Hasenbergl (U2)',
    'venue.directions': 'Get Directions ↗',
    'venue.calendar':   '+ Add to Calendar',

    'tickets.label':    'Register',
    'tickets.title':    'Pre-Signup',
    'tickets.soon':     'Registration opens on 1 April 2026.',

    'contribute.label': 'Get Involved',
    'contribute.title': 'Want to Help Make It Happen?',
    'contribute.body':  'Behind every great conference is a great team. We\'re looking for enthusiastic volunteers to help bring this event to life. Join one of our organising teams on WhatsApp and make your mark.',
    'contribute.join':  'Join group →',

    'fb.label':         'Community',
    'fb.title':         'Find us on Facebook',
    'fb.body':          'Follow our page for the latest news, updates, and announcements from Toastmasters Bayern.',
    'fb.follow':        'Follow on Facebook',
    'fb.message':       'Message us on Messenger',

    'consent.text':     'This site stores your language preference locally. If you register, payment is processed securely by Stripe — see our privacy notice for details. No tracking cookies.',
    'consent.link':     'More info',
    'consent.accept':   'Got it',

    'share.label':      'Spread the Word',
    'share.title':      'Share the Event',
    'share.body':       'Know someone who belongs on this stage? Share this page and help us fill the room with stories.',
    'share.whatsapp':   'WhatsApp',
    'share.linkedin':   'LinkedIn',
    'share.facebook':   'Facebook',
    'share.instagram':  'Copy Link',

    'footer.d95':       'District 95',
    'footer.ti':        'Toastmasters International',
    'footer.facebook':  'Facebook',
    'footer.privacy':   'Impressum',
    'footer.copy':      '© 2026 Toastmasters District 95, Division D',

    'workshops.label':  'Workshops',
    'workshops.title':  'Learn from the Best',
    'workshops.intro':  'Dive deeper with hands-on sessions led by experienced speakers and coaches. Choose the workshop that fits your goals.',
    'workshops.cta':    'View Full Programme',
    'workshops.1.bioToggle': 'About the facilitator',
    'workshops.1.title': 'Present with Power',
    'workshops.1.desc':  'From Death by PowerPoint to Seducing with Slides — Presentation tips for Toastmasters, business, and life.',
    'workshops.1.bio':   'Ineke Vermeulen is a public speaking and TEDx coach, trainer, and Distinguished Toastmaster (DTM) with over 15 years of experience. She works with clients ranging from ambitious individuals to global organisations, helping them communicate with confidence, clarity, and impact.',
    'workshops.2.bioToggle': 'About the facilitator',
    'workshops.2.title': 'Elevator Pitch',
    'workshops.2.desc':  'This workshop explains the prerequisites and functions of the elevator pitch and enables participants to create and practise their own personal elevator pitch.',
    'workshops.2.bio':   'Edgar Niklaus (Dipl.-Ing. and business economist) has been a self-employed financial and insurance broker since 1999. A Toastmaster since November 2004 and DTM since 2015, he has delivered countless speeches and many workshops, bringing 18 years of professional leadership experience.',
    'workshops.3.bioToggle': 'About the facilitator',
    'workshops.3.title': 'Overcome the Spotlight Effect',
    'workshops.3.desc':  'Turn public speaking from a fear into your advantage. This workshop will give you practical tools to reduce anxiety, embrace new opportunities, and speak with impact.',
    'workshops.3.bio':   'Darya Juric is an IT professional passionate about communication. In 2022 she founded a corporate Toastmasters club, and later a series of webinars focused on developing the inner skills and mindset that lay the foundation for successful public speaking.',
    'workshops.4.badge': 'Youth Bootcamp',
    'workshops.4.bioToggle': 'About the facilitator',
    'workshops.4.title': 'Youth Bootcamp',
    'workshops.4.bio':   'Oleg Güntner has spent 25 years at BMW, currently as a manager responsible for prototype part quality in development. A certified trainer for "The 7 Habits of Highly Effective People" and a coach for leadership and personal development. A Toastmaster since 2012 and currently President of Munich Media Speakers. He holds degrees in Industrial Engineering and is an NLP Master.',
    'nav.workshops':     'Workshops',

    'toast.copied':     'Link copied to clipboard!',
  },

  de: {
    'nav.brand':        'Division D · Distrikt 95',
    'nav.cta':          'Jetzt registrieren!',
    'nav.about':        'Über uns',
    'nav.tm':           'Toastmasters',
    'nav.venue':        'Veranstaltungsort',
    'nav.tickets':      'Tickets',
    'nav.share':        'Teilen',

    'hero.eyebrow':     'Toastmasters Distrikt 95 · Division D',
    'hero.title':       'Division D<br>Konferenz 2026',
    'hero.tagline':     'Growing Through Connection',
    'hero.values':      'Integrity | Respect | Service | Excellence',
    'hero.date':        '25. April 2026',
    'hero.location':    'München, Deutschland',
    'hero.cta':         'Jetzt registrieren!',
    'hero.registerNote': '',
    'hero.visitorCount':   '{n} Personen haben diese Seite besucht',
    'hero.agenda':         'Programm anzeigen',
    'nav.agenda':        'Programm',
    'join.pill':         '🙋 Mitmachen',

    'about.label':      'Die Veranstaltung',
    'about.title':      'Ein Tag, an dem Stimmen lebendig werden',
    'about.body1':      'Die Division D Konferenz ist der Höhepunkt des Toastmasters-Jahres für Clubs in ganz Bayern. Sie bringt Mitglieder aus allen Teilen der Division für einen Tag voller inspirierender Reden, spannender Wettbewerbe und echter menschlicher Verbindung zusammen.',
    'about.body2':      'Ob du ein erfahrener Redner bist, der um Ruhm kämpft, oder ein Erstbesucher, der neugierig auf Toastmasters ist – das ist dein Tag. Erwarte erstklassige Reden, Lachen, Lernen und eine Gemeinschaft, die noch lange nach dem Applaus bei dir bleibt.',
    'about.link':       'Das Distrikt-95-Team kennenlernen →',

    'facts.dateLabel':      'Datum',
    'facts.dateValue':      '25. April 2026',
    'facts.locationLabel':  'Ort',
    'facts.locationValue':  'München · Stadtteilkultur 2411',
    'facts.districtLabel':  'Distrikt',
    'facts.districtValue':  'Distrikt 95 · Division D',
    'facts.formatLabel':    'Format',
    'facts.formatValue':    'Reden · Wettbewerbe · Networking',

    'tm.label':         'Neu hier?',
    'tm.title':         'Was ist Toastmasters?',
    'tm.body':          'Toastmasters International ist eine weltweit führende Kommunikations- und Führungsorganisation mit über 300.000 Mitgliedern in 145 Ländern. Mitglieder stärken ihr Selbstvertrauen, schärfen ihre Redefähigkeiten und finden ihre Stimme – in einer unterstützenden, vorurteilsfreien Gemeinschaft.',
    'tm.d95':           'Distrikt 95 besuchen',
    'tm.international': 'Toastmasters International',

    'venue.label':      'Anreise',
    'venue.title':      'Veranstaltungsort',
    'venue.mapCta':     'In Google Maps öffnen ↗',
    'venue.transport':  'U-Bahn: Hasenbergl (U2)',
    'venue.directions': 'Route berechnen ↗',
    'venue.calendar':   '+ Zum Kalender hinzufügen',

    'tickets.label':    'Registrieren',
    'tickets.title':    'Voranmeldung',
    'tickets.soon':     'Registrierung öffnet am 1. April 2026.',

    'contribute.label': 'Mitmachen',
    'contribute.title': 'Willst du mithelfen?',
    'contribute.body':  'Hinter jeder großartigen Konferenz steckt ein großartiges Team. Wir suchen engagierte Freiwillige, die helfen, dieses Event zum Leben zu erwecken. Tritt einem unserer Organisationsteams auf WhatsApp bei.',
    'contribute.join':  'Gruppe beitreten →',

    'fb.label':         'Community',
    'fb.title':         'Auf Facebook folgen',
    'fb.body':          'Folge unserer Seite für die neuesten Nachrichten und Ankündigungen von Toastmasters Bayern.',
    'fb.follow':        'Auf Facebook folgen',
    'fb.message':       'Schreib uns auf Messenger',

    'consent.text':     'Diese Website speichert Ihre Sprachpräferenz lokal. Bei der Anmeldung wird die Zahlung sicher über Stripe abgewickelt — Details in unserem Datenschutzhinweis. Keine Tracking-Cookies.',
    'consent.link':     'Mehr Infos',
    'consent.accept':   'Alles klar',

    'share.label':      'Sag es weiter',
    'share.title':      'Veranstaltung teilen',
    'share.body':       'Kennst du jemanden, der auf diese Bühne gehört? Teile diese Seite und hilf uns, den Raum mit Geschichten zu füllen.',
    'share.whatsapp':   'WhatsApp',
    'share.linkedin':   'LinkedIn',
    'share.facebook':   'Facebook',
    'share.instagram':  'Link kopieren',

    'footer.d95':       'Distrikt 95',
    'footer.ti':        'Toastmasters International',
    'footer.facebook':  'Facebook',
    'footer.privacy':   'Impressum',
    'footer.copy':      '© 2026 Toastmasters Distrikt 95, Division D',

    'workshops.label':  'Workshops',
    'workshops.title':  'Lernen von den Besten',
    'workshops.intro':  'Vertiefen Sie Ihr Wissen in praxisnahen Sessions mit erfahrenen Rednern und Coaches. Wählen Sie den Workshop, der zu Ihren Zielen passt.',
    'workshops.cta':    'Ganzes Programm ansehen',
    'workshops.1.bioToggle': 'Über die Referentin',
    'workshops.1.title': 'Present with Power',
    'workshops.1.desc':  'Von Death by PowerPoint zu Seducing with Slides — Präsentationstipps für Toastmasters, Business und das Leben.',
    'workshops.1.bio':   'Ineke Vermeulen ist Public-Speaking- und TEDx-Coach, Trainerin und Distinguished Toastmaster (DTM) mit über 15 Jahren Erfahrung. Sie arbeitet mit ambitionierten Einzelpersonen und globalen Organisationen und hilft ihnen, mit Selbstvertrauen, Klarheit und Wirkung zu kommunizieren.',
    'workshops.2.bioToggle': 'Über den Referenten',
    'workshops.2.title': 'Elevator Pitch',
    'workshops.2.desc':  'Der Workshop erklärt Voraussetzungen und Funktionen des Elevator Pitchs und versetzt die Teilnehmer in die Lage ihren eigenen persönlichen Elevator Pitch zu erstellen und zu üben.',
    'workshops.2.bio':   'Edgar Niklaus (Dipl.-Ing. und Betriebswirt) ist selbständiger Finanz- und Versicherungsmakler seit 1999. Bei Toastmasters seit November 2004, DTM seit 2015. Er hat unzählige Reden und viele Workshops gehalten und bringt 18 Jahre berufliche Führungserfahrung mit.',
    'workshops.3.bioToggle': 'Über die Referentin',
    'workshops.3.title': 'Overcome the Spotlight Effect',
    'workshops.3.desc':  'Verwandeln Sie Lampenfieber in Ihren Vorteil. Dieser Workshop gibt Ihnen praktische Werkzeuge, um Nervosität abzubauen, neue Chancen zu ergreifen und mit Wirkung zu sprechen.',
    'workshops.3.bio':   'Darya Juric ist IT-Fachfrau mit Leidenschaft für Kommunikation. 2022 gründete sie einen Corporate-Toastmasters-Club und später eine Webinar-Reihe zur Entwicklung der inneren Fähigkeiten und Denkweisen, die die Grundlage für erfolgreiches öffentliches Sprechen bilden.',
    'workshops.4.badge': 'Jugend-Bootcamp',
    'workshops.4.bioToggle': 'Über den Referenten',
    'workshops.4.title': 'Jugend-Bootcamp',
    'workshops.4.bio':   'Oleg Güntner ist seit 25 Jahren bei BMW tätig, aktuell als Führungskraft mit Verantwortung für die Qualität der Prototypenteile in der Entwicklung. Trainer für „7 Wege zur Effektivität" und Coach für Führung und Persönlichkeitsentwicklung. Toastmaster seit 2012 und aktuell Präsident des Toastmaster-Clubs „Munich Media Speakers". Ausbildung: Wirtschaftsingenieur und NLP-Master.',
    'nav.workshops':     'Workshops',

    'toast.copied':     'Link in die Zwischenablage kopiert!',
  },
};

/* ── Language toggle ──────────────────────────────────── */
let currentLang = localStorage.getItem('tm-lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('tm-lang', lang);
  document.documentElement.lang = lang;
  document.body.classList.toggle('lang-en', lang === 'en');
  document.body.classList.toggle('lang-de', lang === 'de');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = i18n[lang][key];
    if (text !== undefined) el.innerHTML = text;
  });
}

function toggleLang() {
  applyLang(currentLang === 'en' ? 'de' : 'en');
}

document.getElementById('langToggle').addEventListener('click', toggleLang);
document.getElementById('langToggleFooter').addEventListener('click', toggleLang);

// Init on load
applyLang(currentLang);

/* ── Sticky nav ───────────────────────────────────────── */
const nav = document.getElementById('nav');
const SCROLL_THRESHOLD = 40;

const scrollCue = document.querySelector('.hero__scroll-cue');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  if (scrollCue) scrollCue.style.opacity = window.scrollY > 80 ? '0' : '';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Hamburger menu ───────────────────────────────────── */
const burger   = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  mobileNav.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
});

// Close menu when a link is tapped
mobileNav.querySelectorAll('.nav__mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

/* ── Toast ────────────────────────────────────────────── */
const toastEl = document.getElementById('toast');
let toastTimer;

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

/* ── Share helpers ────────────────────────────────────── */
const PAGE_URL = 'https://toastmasters-bayern.com/';

function shareMessage() {
  return currentLang === 'de'
    ? `Komm zur Division D Konferenz am 25. April 2026! Wo Geschichten sich begegnen ${PAGE_URL}`
    : `Join me at the Division D Conference on 25 April 2026! Growing Through Connection ${PAGE_URL}`;
}

function doShare(platform) {
  const msg = encodeURIComponent(shareMessage());
  const url = encodeURIComponent(PAGE_URL);

  const urls = {
    whatsapp:  `https://wa.me/?text=${msg}`,
    linkedin:  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    instagram: null, // clipboard only
  };

  if (platform === 'instagram') {
    navigator.clipboard.writeText(PAGE_URL).then(() => {
      showToast(i18n[currentLang]['toast.copied']);
    }).catch(() => {
      showToast(PAGE_URL);
    });
    return;
  }

  if (!urls[platform]) return;
  window.open(urls[platform], '_blank', 'noopener,noreferrer');
}

/* Wire up all share buttons (desktop + mobile bar) */
const shareMap = [
  ['shareWhatsapp',    'whatsapp'],
  ['shareLinkedin',    'linkedin'],
  ['shareFacebook',    'facebook'],
  ['shareInstagram',   'instagram'],
  ['shareBarWhatsapp', 'whatsapp'],
  ['shareBarLinkedin', 'linkedin'],
  ['shareBarFacebook', 'facebook'],
  ['shareBarInstagram','instagram'],
];

shareMap.forEach(([id, platform]) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => doShare(platform));
});

/* ── Cookie consent banner ────────────────────────────── */
const CONSENT_KEY = 'tm-consent';
const cookieBanner = document.getElementById('cookieBanner');

if (!localStorage.getItem(CONSENT_KEY)) {
  cookieBanner?.removeAttribute('hidden');
}

document.getElementById('consentAccept')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'acknowledged');
  cookieBanner?.setAttribute('hidden', '');
});

/* ── Venue: Add to Calendar (placeholder) ─────────────── */
/* ── Volunteer Rail ───────────────────────────────────── */
(function () {
  const rail = document.getElementById('volRail');
  if (!rail) return;
  const contribute = document.getElementById('contribute');
  rail.addEventListener('click', e => {
    e.preventDefault();
    contribute?.scrollIntoView({ behavior: 'smooth' });
  });
}());

/* ── Venue: Add to Calendar (placeholder) ─────────────── */
document.querySelector('.venue__cal')?.addEventListener('click', () => {
  // Google Calendar deep link — update when venue is confirmed
  const start  = '20260425T090000';
  const end    = '20260425T180000';
  const title  = encodeURIComponent('Division D Conference 2026');
  const detail = encodeURIComponent('Growing Through Connection — toastmasters-bayern.com');
  const gcal   = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${detail}`;
  window.open(gcal, '_blank', 'noopener,noreferrer');
});

/* ── Visitor counter ──────────────────────────────────── */
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKreCl6hQoqlbO3JcsIU8kZ_8SVmQ05ha49KU_WUuheuvNQB1OaPgBjZxTESzkfcZ6aQ/exec';

(async function trackVisit() {
  const el = document.getElementById('visitorCount');
  if (!el) return;

  function showCount(n) {
    const lang = localStorage.getItem('tm-lang') || 'en';
    const tpl  = (i18n[lang] || i18n.en)['hero.visitorCount'] || '{n} people have visited this page';
    el.textContent = tpl.replace('{n}', Number(n).toLocaleString());
  }

  // Always show cached count immediately (no flicker on reload)
  const cached = localStorage.getItem('divD_visitorCount');
  if (cached) showCount(cached);

  // Only increment once per browser session
  if (sessionStorage.getItem('divD_visited')) return;
  sessionStorage.setItem('divD_visited', '1');

  try {
    const res  = await fetch(APPS_SCRIPT_URL);
    const data = await res.json();
    if (data.count) {
      localStorage.setItem('divD_visitorCount', data.count);
      showCount(data.count);
    }
  } catch (_) {
    // Silently fail — counter is non-essential
  }
}());
