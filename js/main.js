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
    'nav.cta':          'Register',
    'nav.about':        'About',
    'nav.tm':           'Toastmasters',
    'nav.venue':        'Venue',
    'nav.tickets':      'Tickets',
    'nav.share':        'Share',

    'hero.eyebrow':     'Toastmasters District 95 · Division D',
    'hero.title':       'Division D<br>Conference 2026',
    'hero.tagline':     'Where Stories Connect',
    'hero.date':        '25 April 2026',
    'hero.location':    'Bavaria, Germany',
    'hero.cta':         'Register',

    'about.label':      'The Event',
    'about.title':      'A day where voices come alive',
    'about.body1':      'The Division D Conference is the highlight of the Toastmasters year for clubs across Bavaria. It brings together members from every corner of the division for a day of inspiring speeches, fierce competitions, and genuine human connection.',
    'about.body2':      'Whether you\'re a seasoned speaker competing for glory or a first-timer curious about what Toastmasters is all about — this is your day. Expect world-class speeches, laughter, learning, and a community that will stay with you long after the applause fades.',
    'about.link':       'Meet the District 95 Team →',

    'facts.dateLabel':      'Date',
    'facts.dateValue':      '25 April 2026',
    'facts.locationLabel':  'Location',
    'facts.locationValue':  'Bavaria · TBA',
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
    'venue.mapText':    'Map will appear once venue is confirmed',
    'venue.location':   'Bavaria, Germany',
    'venue.tba':        'Exact venue to be announced. Check back soon.',
    'venue.calendar':   '+ Add to Calendar',

    'tickets.label':    'Secure Your Spot',
    'tickets.title':    'Secure Your Spot',
    'tickets.body':     'Tickets will be available soon via Eventbrite. Stay tuned.',
    'tickets.cta':      'Notify Me When Available',

    'share.label':      'Spread the Word',
    'share.title':      'Share the Event',
    'share.body':       'Know someone who belongs on this stage? Share this page and help us fill the room with stories.',
    'share.whatsapp':   'WhatsApp',
    'share.linkedin':   'LinkedIn',
    'share.facebook':   'Facebook',
    'share.email':      'Email',
    'share.instagram':  'Copy Link',

    'footer.d95':       'District 95',
    'footer.ti':        'Toastmasters International',
    'footer.facebook':  'Facebook',
    'footer.privacy':   'Privacy',
    'footer.copy':      '© 2026 Toastmasters District 95, Division D',

    'toast.copied':     'Link copied to clipboard!',
  },

  de: {
    'nav.brand':        'Division D · Distrikt 95',
    'nav.cta':          'Registrieren',
    'nav.about':        'Über uns',
    'nav.tm':           'Toastmasters',
    'nav.venue':        'Veranstaltungsort',
    'nav.tickets':      'Tickets',
    'nav.share':        'Teilen',

    'hero.eyebrow':     'Toastmasters Distrikt 95 · Division D',
    'hero.title':       'Division D<br>Konferenz 2026',
    'hero.tagline':     'Wo Geschichten sich begegnen',
    'hero.date':        '25. April 2026',
    'hero.location':    'Bayern, Deutschland',
    'hero.cta':         'Registrieren',

    'about.label':      'Die Veranstaltung',
    'about.title':      'Ein Tag, an dem Stimmen lebendig werden',
    'about.body1':      'Die Division D Konferenz ist der Höhepunkt des Toastmasters-Jahres für Clubs in ganz Bayern. Sie bringt Mitglieder aus allen Teilen der Division für einen Tag voller inspirierender Reden, spannender Wettbewerbe und echter menschlicher Verbindung zusammen.',
    'about.body2':      'Ob du ein erfahrener Redner bist, der um Ruhm kämpft, oder ein Erstbesucher, der neugierig auf Toastmasters ist – das ist dein Tag. Erwarte erstklassige Reden, Lachen, Lernen und eine Gemeinschaft, die noch lange nach dem Applaus bei dir bleibt.',
    'about.link':       'Das Distrikt-95-Team kennenlernen →',

    'facts.dateLabel':      'Datum',
    'facts.dateValue':      '25. April 2026',
    'facts.locationLabel':  'Ort',
    'facts.locationValue':  'Bayern · folgt',
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
    'venue.mapText':    'Karte erscheint, sobald der Ort bestätigt ist',
    'venue.location':   'Bayern, Deutschland',
    'venue.tba':        'Genauer Veranstaltungsort wird noch bekannt gegeben.',
    'venue.calendar':   '+ Zum Kalender hinzufügen',

    'tickets.label':    'Sichere deinen Platz',
    'tickets.title':    'Sichere dir deinen Platz',
    'tickets.body':     'Tickets sind bald über Eventbrite erhältlich. Schau bald wieder vorbei.',
    'tickets.cta':      'Benachrichtigt werden',

    'share.label':      'Sag es weiter',
    'share.title':      'Veranstaltung teilen',
    'share.body':       'Kennst du jemanden, der auf diese Bühne gehört? Teile diese Seite und hilf uns, den Raum mit Geschichten zu füllen.',
    'share.whatsapp':   'WhatsApp',
    'share.linkedin':   'LinkedIn',
    'share.facebook':   'Facebook',
    'share.email':      'E-Mail',
    'share.instagram':  'Link kopieren',

    'footer.d95':       'Distrikt 95',
    'footer.ti':        'Toastmasters International',
    'footer.facebook':  'Facebook',
    'footer.privacy':   'Datenschutz',
    'footer.copy':      '© 2026 Toastmasters Distrikt 95, Division D',

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

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
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
    ? `Komm zur Division D Konferenz am 25. April 2026! Wo Geschichten sich begegnen 🎤 ${PAGE_URL}`
    : `Join me at the Division D Conference on 25 April 2026! Where Stories Connect 🎤 ${PAGE_URL}`;
}

function shareSubject() {
  return currentLang === 'de'
    ? 'Division D Konferenz 2026 – Sichere dir deinen Platz!'
    : 'Division D Conference 2026 — Secure your spot!';
}

function doShare(platform) {
  const msg     = encodeURIComponent(shareMessage());
  const url     = encodeURIComponent(PAGE_URL);
  const subject = encodeURIComponent(shareSubject());

  const urls = {
    whatsapp:  `https://wa.me/?text=${msg}`,
    linkedin:  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    email:     `mailto:?subject=${subject}&body=${msg}`,
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

  if (urls[platform]) window.open(urls[platform], '_blank', 'noopener,noreferrer');
}

/* Wire up all share buttons (desktop + mobile bar) */
const shareMap = [
  ['shareWhatsapp',    'whatsapp'],
  ['shareLinkedin',    'linkedin'],
  ['shareFacebook',    'facebook'],
  ['shareEmail',       'email'],
  ['shareInstagram',   'instagram'],
  ['shareBarWhatsapp', 'whatsapp'],
  ['shareBarLinkedin', 'linkedin'],
  ['shareBarFacebook', 'facebook'],
  ['shareBarEmail',    'email'],
  ['shareBarInstagram','instagram'],
];

shareMap.forEach(([id, platform]) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => doShare(platform));
});

/* ── Venue: Add to Calendar (placeholder) ─────────────── */
document.querySelector('.venue__cal')?.addEventListener('click', () => {
  // Google Calendar deep link — update when venue is confirmed
  const start  = '20260425T090000';
  const end    = '20260425T180000';
  const title  = encodeURIComponent('Division D Conference 2026');
  const detail = encodeURIComponent('Where Stories Connect — toastmasters-bayern.com');
  const gcal   = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${detail}`;
  window.open(gcal, '_blank', 'noopener,noreferrer');
});
