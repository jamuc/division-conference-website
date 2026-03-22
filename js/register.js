/* ═══════════════════════════════════════════════════════
   Division D Conference 2026 — register.js
   · Multi-step registration funnel
   · Price calculation
   · PDF ticket generation (jsPDF)
   · i18n (EN / DE)
═══════════════════════════════════════════════════════ */

/* ── Translations ─────────────────────────────────────── */
const i18n = {
  en: {
    'nav.brand':              'Division D · District 95',
    'reg.backToSite':         '← Back to site',

    'reg.step1.nav':          'Details',
    'reg.step2.nav':          'Role',
    'reg.step3.nav':          'Add-ons',
    'reg.step4.nav':          'Confirm',

    'reg.step1.eyebrow':      'Step 1 of 4',
    'reg.step1.title':        'Your Details',
    'reg.step1.subtitle':     'Tell us a little about yourself.',

    'reg.step2.eyebrow':      'Step 2 of 4',
    'reg.step2.title':        'Your Role',
    'reg.step2.subtitle':     'How will you be participating?',

    'reg.step3.eyebrow':      'Step 3 of 4',
    'reg.step3.title':        'Add-ons',
    'reg.step3.subtitle':     'Enhance your conference experience.',

    'reg.step4.eyebrow':      'Step 4 of 4',
    'reg.step4.title':        'Confirm Registration',
    'reg.step4.subtitle':     'Review your details before confirming.',

    'reg.firstName':          'First Name',
    'reg.lastName':           'Last Name',
    'reg.email':              'Email Address',
    'reg.isMember':           'Are you a Toastmasters member?',
    'reg.yes':                'Yes',
    'reg.no':                 'No',
    'reg.clubName':           'Club(s)',
    'reg.clubPlaceholder':    'Select your club(s)…',
    'reg.clubHint':           'You can select multiple clubs if you are a member of more than one.',
    'reg.clubNotListed':      'My club is not in the list',

    'reg.role.audience':        'Audience Member',
    'reg.role.audienceDesc':    'Enjoy the speeches, contests, and networking as a guest.',
    'reg.role.volunteer':       'Conference Volunteer',
    'reg.role.volunteerDesc':   'You have one or more roles in running the conference.',
    'reg.role.contestantTitle': 'Contestant',
    'reg.role.contestantDesc':  'You are competing in one of the speaking contests.',
    'reg.role.staffRolesLabel': 'Select your role(s) — you can choose more than one',
    'reg.role.enterCode':       'Access Code',
    'reg.role.codeHint':        "Contact your conference organiser if you don't have a code.",
    'reg.role.timekeeper':      'Time Keeper',
    'reg.role.ballot':          'Ballot Counter',
    'reg.role.judge':           'Judge',
    'reg.role.chiefjudge':      'Chief Judge',
    'reg.role.contestchair':    'Contest Chair',
    'reg.role.sargeant':        'Sergeant at Arms',
    'reg.role.contestant':      'Contestant',
    'reg.role.free':            'Included',

    'reg.workshop.title':     'Workshop Package',
    'reg.workshop.desc':      'Join an interactive workshop session to sharpen your skills and connect with fellow Toastmasters. Limited spaces available.',

    'reg.summary.name':       'Name',
    'reg.summary.email':      'Email',
    'reg.summary.role':       'Role',
    'reg.summary.priceTitle': 'Price Breakdown',
    'reg.summary.cleaning':   'Cleaning fee',
    'reg.summary.roleAudience':   'Audience',
    'reg.summary.roleVolunteer':  'Volunteer',
    'reg.summary.roleContestant': 'Contestant',
    'reg.summary.workshop':   'Workshop Package',
    'reg.summary.total':      'Total',
    'reg.summary.paymentNote':'💡 You will be redirected to Stripe to pay securely by card.',
    'reg.confirm.paying':     'Redirecting to payment…',

    'reg.next':               'Continue →',
    'reg.back':               '← Back',
    'reg.confirm':            'Pay with Stripe',

    'reg.confirm.title':      "You're Registered!",
    'reg.confirm.body':       'See you on 25 April at Stadtteilkultur 2411, Munich!',
    'reg.confirm.name':       'Name',
    'reg.confirm.role':       'Role',
    'reg.confirm.workshop':   'Workshop',
    'reg.confirm.workshopIncluded': 'Included ✓',
    'reg.confirm.due':        'Total due at door',
    'reg.confirm.paid':       'Payment received',
    'reg.confirm.download':   '↓ Download Ticket (PDF)',
    'reg.confirm.backHome':   '← Back to main site',

    'reg.confirm.receiptNote':  '📧 A payment receipt has been sent to your email address.',

    'reg.err.firstName':      'Please enter your first name.',
    'reg.err.lastName':       'Please enter your last name.',
    'reg.err.email':          'Please enter a valid email address.',
    'reg.err.role':           'Please select your role to continue.',
    'reg.err.staffRole':      'Please select at least one volunteer role.',
    'reg.err.code':           'Invalid access code. Please contact your conference organiser.',
    'reg.err.paymentTitle':   'Payment not completed',
    'reg.err.paymentBody':    'Something went wrong or you cancelled. Please try again — your details are still saved.',

    'pdf.district':           'TOASTMASTERS DISTRICT 95 · DIVISION D',
    'pdf.conference':         'Division D Conference 2026',
    'pdf.tagline':            'Where Stories Connect',
    'pdf.date':               '25 April 2026',
    'pdf.venue':              'Stadtteilkultur 2411, Munich',
    'pdf.workshop':           'Workshop Package: Included',
    'pdf.totalLabel':         'TOTAL DUE AT DOOR',
    'pdf.totalNote':          'Cash payment on arrival',
    'pdf.totalLabelPaid':     'PAYMENT RECEIVED',
    'pdf.totalNotePaid':      'Paid by card via Stripe',
    'pdf.footer':             'toastmasters-bayern.com · District 95',
    'reg.confirm.ref':        'Booking ref',
    'pdf.filename':           'Division-D-Conference-2026-Ticket',
  },

  de: {
    'nav.brand':              'Division D · Distrikt 95',
    'reg.backToSite':         '← Zurück zur Seite',

    'reg.step1.nav':          'Details',
    'reg.step2.nav':          'Rolle',
    'reg.step3.nav':          'Extras',
    'reg.step4.nav':          'Bestätigen',

    'reg.step1.eyebrow':      'Schritt 1 von 4',
    'reg.step1.title':        'Deine Angaben',
    'reg.step1.subtitle':     'Erzähl uns ein wenig über dich.',

    'reg.step2.eyebrow':      'Schritt 2 von 4',
    'reg.step2.title':        'Deine Rolle',
    'reg.step2.subtitle':     'Wie nimmst du teil?',

    'reg.step3.eyebrow':      'Schritt 3 von 4',
    'reg.step3.title':        'Extras',
    'reg.step3.subtitle':     'Bereichere dein Konferenzerlebnis.',

    'reg.step4.eyebrow':      'Schritt 4 von 4',
    'reg.step4.title':        'Anmeldung bestätigen',
    'reg.step4.subtitle':     'Überprüfe deine Daten vor der Bestätigung.',

    'reg.firstName':          'Vorname',
    'reg.lastName':           'Nachname',
    'reg.email':              'E-Mail-Adresse',
    'reg.isMember':           'Bist du Toastmasters-Mitglied?',
    'reg.yes':                'Ja',
    'reg.no':                 'Nein',
    'reg.clubName':           'Club(s)',
    'reg.clubPlaceholder':    'Club(s) auswählen…',
    'reg.clubHint':           'Du kannst mehrere Clubs auswählen, wenn du Mitglied in mehr als einem bist.',
    'reg.clubNotListed':      'Mein Club ist nicht in der Liste',

    'reg.role.audience':        'Zuschauer',
    'reg.role.audienceDesc':    'Genieße die Reden, Wettbewerbe und das Networking als Gast.',
    'reg.role.volunteer':       'Konferenz-Volunteer',
    'reg.role.volunteerDesc':   'Du hast eine oder mehrere Rollen bei der Durchführung der Konferenz.',
    'reg.role.contestantTitle': 'Teilnehmer',
    'reg.role.contestantDesc':  'Du nimmst an einem der Redewettbewerbe teil.',
    'reg.role.staffRolesLabel': 'Wähle deine Rolle(n) — Mehrfachauswahl möglich',
    'reg.role.enterCode':       'Zugangscode',
    'reg.role.codeHint':        'Kontaktiere den Konferenzorganisator, wenn du keinen Code hast.',
    'reg.role.timekeeper':      'Zeitnehmer',
    'reg.role.ballot':          'Stimmenauszähler',
    'reg.role.judge':           'Richter',
    'reg.role.chiefjudge':      'Chefrichter',
    'reg.role.contestchair':    'Wettbewerbsleiter',
    'reg.role.sargeant':        'Sergeant at Arms',
    'reg.role.contestant':      'Teilnehmer (Wettbewerb)',
    'reg.role.free':            'Inklusive',

    'reg.workshop.title':     'Workshop-Paket',
    'reg.workshop.desc':      'Nimm an einem interaktiven Workshop teil, um deine Fähigkeiten zu schärfen. Begrenzte Plätze verfügbar.',

    'reg.summary.name':       'Name',
    'reg.summary.email':      'E-Mail',
    'reg.summary.role':       'Rolle',
    'reg.summary.priceTitle': 'Preisübersicht',
    'reg.summary.cleaning':   'Reinigungsgebühr',
    'reg.summary.roleAudience':   'Zuschauer',
    'reg.summary.roleVolunteer':  'Volunteer',
    'reg.summary.roleContestant': 'Teilnehmer',
    'reg.summary.workshop':   'Workshop-Paket',
    'reg.summary.total':      'Gesamtbetrag',
    'reg.summary.paymentNote':'💡 Du wirst zur sicheren Kartenzahlung über Stripe weitergeleitet.',
    'reg.confirm.paying':     'Weiterleitung zur Zahlung…',

    'reg.next':               'Weiter →',
    'reg.back':               '← Zurück',
    'reg.confirm':            'Mit Stripe bezahlen',

    'reg.confirm.title':      'Du bist angemeldet!',
    'reg.confirm.body':       'Wir sehen uns am 25. April in der Stadtteilkultur 2411, München!',
    'reg.confirm.name':       'Name',
    'reg.confirm.role':       'Rolle',
    'reg.confirm.workshop':   'Workshop',
    'reg.confirm.workshopIncluded': 'Inklusive ✓',
    'reg.confirm.due':        'Gesamtbetrag (vor Ort)',
    'reg.confirm.paid':       'Zahlung erhalten',
    'reg.confirm.download':   '↓ Ticket herunterladen (PDF)',
    'reg.confirm.backHome':   '← Zurück zur Hauptseite',

    'reg.confirm.receiptNote':  '📧 Eine Zahlungsbestätigung wurde an deine E-Mail-Adresse gesendet.',

    'reg.err.firstName':      'Bitte gib deinen Vornamen ein.',
    'reg.err.lastName':       'Bitte gib deinen Nachnamen ein.',
    'reg.err.email':          'Bitte gib eine gültige E-Mail-Adresse ein.',
    'reg.err.role':           'Bitte wähle deine Rolle aus.',
    'reg.err.staffRole':      'Bitte wähle mindestens eine Volunteer-Rolle aus.',
    'reg.err.code':           'Ungültiger Zugangscode. Bitte kontaktiere den Konferenzorganisator.',
    'reg.err.paymentTitle':   'Zahlung nicht abgeschlossen',
    'reg.err.paymentBody':    'Etwas ist schiefgelaufen oder du hast abgebrochen. Bitte versuche es erneut — deine Daten sind noch gespeichert.',

    'pdf.district':           'TOASTMASTERS DISTRIKT 95 · DIVISION D',
    'pdf.conference':         'Division D Konferenz 2026',
    'pdf.tagline':            'Wo Geschichten sich begegnen',
    'pdf.date':               '25. April 2026',
    'pdf.venue':              'Stadtteilkultur 2411, München',
    'pdf.workshop':           'Workshop-Paket: Inklusive',
    'pdf.totalLabel':         'GESAMTBETRAG VOR ORT',
    'pdf.totalNote':          'Barzahlung bei Ankunft',
    'pdf.totalLabelPaid':     'ZAHLUNG ERHALTEN',
    'pdf.totalNotePaid':      'Per Karte bezahlt (Stripe)',
    'pdf.footer':             'toastmasters-bayern.com · Distrikt 95',
    'reg.confirm.ref':        'Buchungsreferenz',
    'pdf.filename':           'Division-D-Konferenz-2026-Ticket',
  },
};

/* ── Google Sheets endpoint ───────────────────────────── */
// Replace with your deployed Apps Script Web App URL
const APPS_SCRIPT_URL    = 'https://script.google.com/macros/s/AKfycbxKreCl6hQoqlbO3JcsIU8kZ_8SVmQ05ha49KU_WUuheuvNQB1OaPgBjZxTESzkfcZ6aQ/exec';
const STRIPE_PUBLIC_KEY  = 'pk_test_51TDjKJRtImJpS3aDh6XmontWzR953d7ax0A3iG8eN4x9BkNMXxYTiYd7ZNztqYCa4Ho3TC5hZyLL8uxJ8f15nWn400AwBQQ4F3';
const VOLUNTEER_CODE     = 'DIVD2026';
const CONTESTANT_CODE    = 'SPEAK2026';

/* ── i18n ─────────────────────────────────────────────── */
let currentLang = localStorage.getItem('tm-lang') || 'en';

function t(key) {
  return i18n[currentLang][key] || i18n['en'][key] || key;
}

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

/* ── State ────────────────────────────────────────────── */
const state = {
  currentStep: 1,
  firstName:   '',
  lastName:    '',
  email:       '',
  isMember:    false,
  clubs:       [],   // array of selected club names
  clubOther:   '',   // free-text when manual mode is active
  roleType:    '',       // 'audience' | 'volunteer' | 'contestant'
  staffRoles:  [],       // array of selected volunteer roles (e.g. ['timekeeper','judge'])
  workshop:    false,
  ref:         '',   // booking reference, generated on confirm
  paidViaStripe: false,
};

const PRICES = { cleaning: 5, audience: 5, workshop: 5 };

function calcTotal() {
  let total = PRICES.cleaning;
  if (state.roleType === 'audience') total += PRICES.audience;
  if (state.workshop) total += PRICES.workshop;
  return total;
}

function roleLabel() {
  if (state.roleType === 'audience')   return t('reg.summary.roleAudience');
  if (state.roleType === 'contestant') return t('reg.summary.roleContestant');
  // volunteer — list their specific roles
  const names = state.staffRoles.map(r => t(`reg.role.${r}`));
  return names.length ? names.join(', ') : t('reg.summary.roleVolunteer');
}

function roleBadgeText() {
  if (state.roleType === 'audience')   return 'AUDIENCE';
  if (state.roleType === 'contestant') return 'CONTESTANT';
  return 'VOLUNTEER';
}

// Human-readable role for ticket + confirmation screen
function ticketRole() {
  if (state.roleType === 'audience')   return t('reg.role.audience');
  if (state.roleType === 'contestant') return t('reg.role.contestantTitle');
  return t('reg.role.volunteer');
}

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'DD26-' + Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

async function initiatePayment() {
  const btn = document.getElementById('step4Confirm');
  btn.disabled = true;
  btn.textContent = t('reg.confirm.paying');

  // Persist state so we can restore it after Stripe redirect
  sessionStorage.setItem('divD_reg', JSON.stringify({ ...state, total: calcTotal() }));

  try {
    const res  = await fetch(APPS_SCRIPT_URL, {
      method:  'POST',
      body: JSON.stringify({
        bookingRef: state.ref,
        firstName:  state.firstName,
        lastName:   state.lastName,
        email:      state.email,
        member:     state.isMember,
        club:       state.clubOther || state.clubs.join(', '),
        roleType:   state.roleType,
        staffRoles: state.staffRoles.join(', '),
        workshop:   state.workshop,
        total:      calcTotal(),
        lang:       currentLang,
      }),
    });
    const data = await res.json();
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      throw new Error(data.error || 'No checkout URL returned');
    }
  } catch (err) {
    console.warn('Payment initiation failed:', err);
    showToast('Could not connect to payment provider. Please try again.');
    btn.disabled = false;
    btn.textContent = `${t('reg.confirm')} — €${calcTotal()}`;
  }
}

// Called on page load — restores state if returning from Stripe.
// Returns true if it navigated to a step (so init skips goToStep(1)).
function handlePaymentReturn() {
  const params = new URLSearchParams(window.location.search);
  history.replaceState({}, '', window.location.pathname); // clean URL immediately

  // ── Success ──────────────────────────────────────────────
  if (params.get('success') && params.get('session_id')) {
    const saved = sessionStorage.getItem('divD_reg');
    if (!saved) return false;
    Object.assign(state, JSON.parse(saved));
    sessionStorage.removeItem('divD_reg');
    state.paidViaStripe = true;
    goToStep(5);
    return true;
  }

  // ── Cancelled / failed ───────────────────────────────────
  if (params.get('cancelled')) {
    const saved = sessionStorage.getItem('divD_reg');
    if (!saved) return false;
    Object.assign(state, JSON.parse(saved));
    // Don't remove from sessionStorage — let them retry
    goToStep(4);
    document.getElementById('paymentErrorBanner').hidden = false;
    // Re-enable the pay button
    const btn = document.getElementById('step4Confirm');
    btn.disabled = false;
    btn.textContent = `${t('reg.confirm')} — €${calcTotal()}`;
    return true;
  }

  return false;
}

function isAudience()    { return state.roleType === 'audience'; }

/* ── Step navigation ──────────────────────────────────── */
function goToStep(n) {
  // Hide all panels
  document.querySelectorAll('.funnel__panel').forEach(p => {
    p.classList.remove('active');
    p.hidden = true;
  });
  // Show target
  const panel = document.getElementById('step' + n);
  panel.hidden = false;
  panel.classList.add('active');

  // Update progress dots
  document.querySelectorAll('.funnel__prog-step').forEach(dot => {
    const s = parseInt(dot.dataset.step);
    dot.classList.toggle('active', s === n);
    dot.classList.toggle('done', s < n);
  });

  state.currentStep = n;

  // Scroll to top of funnel
  document.getElementById('funnel').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // If going to step 4, populate summary
  if (n === 4) populateSummary();
  if (n === 5) populateConfirmation();
}

/* ── Toast ────────────────────────────────────────────── */
const toastEl    = document.getElementById('toast');
let   toastTimer;

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

/* ── Validation ───────────────────────────────────────── */
function clearErrors() {
  document.querySelectorAll('.form__error').forEach(el => el.textContent = '');
  document.querySelectorAll('.form__input').forEach(el => el.classList.remove('form__input--error'));
}

function showError(fieldId, errId, msg) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  if (field) field.classList.add('form__input--error');
  if (err)   err.textContent = msg;
}

function validateStep1() {
  clearErrors();
  let valid = true;

  if (!state.firstName.trim()) {
    showError('firstName', 'firstNameErr', t('reg.err.firstName'));
    valid = false;
  }
  if (!state.lastName.trim()) {
    showError('lastName', 'lastNameErr', t('reg.err.lastName'));
    valid = false;
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(state.email.trim())) {
    showError('email', 'emailErr', t('reg.err.email'));
    valid = false;
  }
  return valid;
}

function validateStep2() {
  clearErrors();
  if (!state.roleType) {
    document.getElementById('roleErr').textContent = t('reg.err.role');
    return false;
  }
  // Check access code for gated roles
  if (state.roleType === 'volunteer' || state.roleType === 'contestant') {
    const entered  = document.getElementById('accessCode').value.trim().toUpperCase();
    const expected = state.roleType === 'volunteer' ? VOLUNTEER_CODE : CONTESTANT_CODE;
    if (entered !== expected) {
      document.getElementById('roleErr').textContent = t('reg.err.code');
      document.getElementById('accessCode').focus();
      return false;
    }
  }
  return true;
}

/* ── Step 1 wiring ────────────────────────────────────── */
const firstNameEl = document.getElementById('firstName');
const lastNameEl  = document.getElementById('lastName');
const emailEl     = document.getElementById('email');
const memberYes   = document.getElementById('memberYes');
const memberNo    = document.getElementById('memberNo');
const clubGroup   = document.getElementById('clubGroup');

firstNameEl.addEventListener('input', () => { state.firstName = firstNameEl.value; });
lastNameEl.addEventListener('input',  () => { state.lastName  = lastNameEl.value; });
emailEl.addEventListener('input',     () => { state.email     = emailEl.value; });

[memberYes, memberNo].forEach(radio => {
  radio.addEventListener('change', () => {
    state.isMember = memberYes.checked;
    clubGroup.classList.toggle('form__group--hidden', !state.isMember);
  });
});

/* ── Club searchable multi-select ────────────────────── */
const CLUBS = [
  // Munich
  'Munich Toastmasters Club',
  'Munich Business Speakers',
  'Redeclub-Muenchen',
  'M.E.A.T. Munich English Advanced Toastmasters',
  'MuC Toastmasters',
  'Airbus Toastmaster Ottobrunn',
  'Münchner Brainstormers Club',
  'Munich Prostmasters Toastmasters Club',
  'Effective Communicators',
  'InnSpiratoren',
  'Toastmasters-Muenchen',
  'Inn Valley',
  // South / Alps
  'Rhetorenschmiede',
  "Speaker's Corner München Toastmasters",
  'Les Toastmasters Francophones de Munich',
  'Munich Media Speakers',
  'Allianz Public Speaking Club',
  'Toastmasters ZEISS',
  // Danube / Augsburg
  'Danube Sparrows',
  'Ulmer Redespatzen',
  'Allgäu Speakers',
  'Toastmasters Augsburg',
  // Nuremberg / Franconia
  'Nuremberg Toastmasters Club',
  'Erlangen Toastmasters',
  'ReDensburger Toastmasters',
  'Fraenkly Speaking Toastmasters',
  'INgolSpeakers',
  'Noris Toastmasters Nuremberg',
  'Nürnberger Rhetoriker',
  'Bamberg Toastmasters Club',
  'Würzburg Toastmasters',
  'In Camera Online Toastmasters Club',
  'Schweinfurt Toastmasters',
];

(function initClubSelect() {
  const trigger     = document.getElementById('clubSelectTrigger');
  const dropdown    = document.getElementById('clubSelectDropdown');
  const searchInput = document.getElementById('clubSearch');
  const listEl      = document.getElementById('clubSelectList');
  const tagsEl      = document.getElementById('clubSelectTags');
  const placeholder = document.getElementById('clubSelectPlaceholder');
  const wrapper     = document.getElementById('clubSelect');

  // Manual entry — checkbox swaps dropdown for text input
  const notListedCb  = document.getElementById('clubNotListed');
  const manualInput  = document.getElementById('clubOther');

  notListedCb.addEventListener('change', () => {
    const manual = notListedCb.checked;
    wrapper.hidden  = manual;
    manualInput.hidden = !manual;
    if (manual) {
      // Clear dropdown selections when switching to manual
      state.clubs = [];
      renderTags();
      closeDropdown();
      manualInput.value = '';
      manualInput.focus();
    } else {
      manualInput.value = '';
      state.clubOther = '';
    }
  });

  manualInput.addEventListener('input', () => { state.clubOther = manualInput.value.trim(); });

  function renderList(filter = '') {
    listEl.innerHTML = '';
    const q = filter.toLowerCase();
    CLUBS.forEach(club => {
      if (q && !club.toLowerCase().includes(q)) return;
      const isChecked = state.clubs.includes(club);
      const opt = document.createElement('label');
      opt.className = 'club-option' + (isChecked ? ' club-option--selected' : '');
      opt.innerHTML = `<input type="checkbox" value="${club}" ${isChecked ? 'checked' : ''} /><span>${club}</span>`;
      opt.querySelector('input').addEventListener('change', e => {
        if (e.target.checked) {
          state.clubs.push(club);
        } else {
          state.clubs = state.clubs.filter(c => c !== club);
        }
        opt.classList.toggle('club-option--selected', e.target.checked);
        renderTags();
      });
      listEl.appendChild(opt);
    });
  }

  function renderTags() {
    tagsEl.innerHTML = '';
    placeholder.style.display = state.clubs.length ? 'none' : '';
    state.clubs.forEach(club => {
      const tag = document.createElement('span');
      tag.className = 'club-tag';
      tag.innerHTML = `${club}<button type="button" aria-label="Remove ${club}">&times;</button>`;
      tag.querySelector('button').addEventListener('click', e => {
        e.stopPropagation();
        state.clubs = state.clubs.filter(c => c !== club);
        renderTags();
        renderList(searchInput.value);
      });
      tagsEl.appendChild(tag);
    });
  }

  function openDropdown() {
    dropdown.hidden = false;
    wrapper.setAttribute('aria-expanded', 'true');
    searchInput.value = '';
    renderList();
    searchInput.focus();
  }

  function closeDropdown() {
    dropdown.hidden = true;
    wrapper.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', () => dropdown.hidden ? openDropdown() : closeDropdown());
  wrapper.addEventListener('keydown', e => { if (e.key === 'Escape') closeDropdown(); });
  searchInput.addEventListener('input', () => renderList(searchInput.value));
  document.addEventListener('click', e => {
    if (!wrapper.contains(e.target)) closeDropdown();
  });

  renderList();
})();

document.getElementById('step1Next').addEventListener('click', () => {
  if (validateStep1()) goToStep(2);
});

/* ── Step 2 wiring ────────────────────────────────────── */
const accessCodeField = document.getElementById('accessCodeField');
const accessCodeInput = document.getElementById('accessCode');

document.querySelectorAll('input[name="roleType"]').forEach(radio => {
  radio.addEventListener('change', () => {
    state.roleType   = radio.value;
    state.staffRoles = [];
    // Highlight selected card
    document.querySelectorAll('.role-type-card').forEach(c => c.classList.remove('selected'));
    radio.closest('.role-type-card').classList.add('selected');
    // Show access code field for gated roles
    const needsCode = (state.roleType === 'volunteer' || state.roleType === 'contestant');
    accessCodeField.hidden = !needsCode;
    if (needsCode) { accessCodeInput.value = ''; accessCodeInput.focus(); }
  });
});

document.getElementById('step2Back').addEventListener('click', () => goToStep(1));
document.getElementById('step2Next').addEventListener('click', () => {
  if (validateStep2()) goToStep(3);
});

/* ── Step 3 wiring ────────────────────────────────────── */
const workshopToggle = document.getElementById('workshopToggle');
const workshopCard   = document.getElementById('workshopCard');

function setWorkshop(val) {
  state.workshop = val;
  workshopToggle.setAttribute('aria-checked', String(val));
  workshopCard.classList.toggle('addon-card--active', val);
}

workshopToggle.addEventListener('click', () => setWorkshop(!state.workshop));
workshopToggle.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setWorkshop(!state.workshop); }
});
workshopCard.addEventListener('click', e => {
  if (!e.target.closest('.addon-toggle')) setWorkshop(!state.workshop);
});

document.getElementById('step3Back').addEventListener('click', () => goToStep(2));
document.getElementById('step3Next').addEventListener('click', () => goToStep(4));

/* ── Step 4: Summary ─────────────────────────────────── */
function populateSummary() {
  document.getElementById('summaryName').textContent  = `${state.firstName} ${state.lastName}`;
  document.getElementById('summaryEmail').textContent = state.email;
  document.getElementById('summaryRole').textContent  = roleLabel();

  // Role price row
  const roleLabelEl = document.getElementById('priceRoleLabel');
  const roleValEl   = document.getElementById('priceRoleValue');
  if (isAudience()) {
    roleLabelEl.textContent = t('reg.summary.roleAudience');
    roleValEl.textContent   = '€5';
  } else {
    roleLabelEl.textContent = ticketRole();
    roleValEl.textContent   = '€0';
  }
  document.getElementById('priceRoleRow').hidden = false;

  // Workshop row
  document.getElementById('priceWorkshopRow').hidden = !state.workshop;

  // Total
  document.getElementById('priceTotal').textContent = `€${calcTotal()}`;

  // Update confirm button to show amount
  const btn = document.getElementById('step4Confirm');
  btn.disabled = false;
  btn.textContent = `${t('reg.confirm')} — €${calcTotal()}`;
}

document.getElementById('step4Back').addEventListener('click', () => goToStep(3));
document.getElementById('step4Confirm').addEventListener('click', async () => {
  if (!state.ref) state.ref = generateRef(); // keep existing ref on retry
  await initiatePayment();
});

// handlePaymentReturn() is called during init below

/* ── Step 5: Confirmation ────────────────────────────── */
function populateConfirmation() {
  document.getElementById('confirmName').textContent  = `${state.firstName} ${state.lastName}`;
  document.getElementById('confirmRole').textContent  = ticketRole();
  document.getElementById('confirmTotal').textContent = `€${calcTotal()}`;
  document.getElementById('confirmDueLabel').textContent = t(state.paidViaStripe ? 'reg.confirm.paid' : 'reg.confirm.due');

  const workshopRow = document.getElementById('confirmWorkshopRow');
  workshopRow.hidden = !state.workshop;

  const refEl = document.getElementById('confirmRef');
  if (refEl) refEl.textContent = state.ref;
}

document.getElementById('downloadTicket').addEventListener('click', generatePDF);

/* ── PDF Generation ──────────────────────────────────── */
function generatePDF() {
  // Load TM logo as base64, then build PDF
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    const canvas  = document.createElement('canvas');
    canvas.width  = img.naturalWidth  || img.width;
    canvas.height = img.naturalHeight || img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    const logoB64 = canvas.toDataURL('image/png');
    buildPDF(logoB64);
  };
  img.onerror = function () {
    buildPDF(null); // proceed without logo
  };
  img.src = 'images/tm-logo.png';
}

function buildPDF(logoB64) {
  const { jsPDF } = window.jspdf;
  // A5 landscape: 210 × 148 mm
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a5' });
  const W = 210, H = 148;

  /* ── Background ── */
  // Navy full background
  doc.setFillColor(0, 65, 101);       // #004165
  doc.rect(0, 0, W, H, 'F');

  /* ── Left accent strip ── */
  const stripW = 50;
  doc.setFillColor(119, 36, 50);      // #772432
  doc.rect(0, 0, stripW, H, 'F');

  /* ── Bottom footer strip ── */
  const footerH = 10;
  doc.setFillColor(0, 44, 70);        // slightly darker navy
  doc.rect(0, H - footerH, W, footerH, 'F');

  /* ── TM Logo (left strip, centred) ── */
  if (logoB64) {
    const logoSize = 28;
    const logoX    = (stripW - logoSize) / 2;
    const logoY    = 12;
    doc.addImage(logoB64, 'PNG', logoX, logoY, logoSize, logoSize);
  }

  /* ── Role badge (left strip) ── */
  const role = ticketRole();
  // Badge background
  doc.setFillColor(242, 223, 116);    // #F2DF74 yellow
  const badgeY = 60, badgeH = 14, badgePad = 4;
  doc.roundedRect(badgePad, badgeY, stripW - badgePad * 2, badgeH, 2, 2, 'F');
  // Badge text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 44, 70);
  doc.text(role, stripW / 2, badgeY + badgeH / 2 + 0.5, { align: 'center', baseline: 'middle' });

  /* ── Workshop badge (left strip, below role) ── */
  if (state.workshop) {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(255, 255, 255);
    doc.roundedRect(badgePad, badgeY + badgeH + 5, stripW - badgePad * 2, 9, 2, 2, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(0, 44, 70);
    doc.text(t('pdf.workshop'), stripW / 2, badgeY + badgeH + 5 + 4.5, { align: 'center', baseline: 'middle' });
  }

  /* ── Right content area ── */
  const contentX = stripW + 10;
  const contentW = W - stripW - 14;

  // Eyebrow
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(242, 223, 116);     // yellow
  doc.text(t('pdf.district'), contentX, 18);

  // Conference name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('Division D', contentX, 32);
  doc.text('Conference 2026', contentX, 43);

  // Tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 220, 235);
  doc.text(t('pdf.tagline'), contentX, 51);

  // Divider line
  doc.setDrawColor(119, 36, 50);
  doc.setLineWidth(0.4);
  doc.line(contentX, 56, W - 10, 56);

  // Attendee name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  const fullName = `${state.firstName} ${state.lastName}`;
  // Scale down if name is very long
  const nameSize = fullName.length > 24 ? 16 : fullName.length > 18 ? 18 : 22;
  doc.setFontSize(nameSize);
  doc.text(fullName, contentX, 73);

  // Date & venue
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 220, 235);
  doc.text(`${t('pdf.date')}  ·  ${t('pdf.venue')}`, contentX, 84);

  /* ── Total due at door ── */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(242, 223, 116);
  doc.text(t(state.paidViaStripe ? 'pdf.totalLabelPaid' : 'pdf.totalLabel'), contentX, 100);
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(`€${calcTotal()}`, contentX, 111);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 220, 235);
  doc.text(t(state.paidViaStripe ? 'pdf.totalNotePaid' : 'pdf.totalNote'), contentX, 118);

  /* ── Booking reference ── */
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(169, 178, 177);   // TM gray
  doc.text(`REF: ${state.ref}`, contentX, 127);

  /* ── Footer text ── */
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(200, 220, 235);
  doc.text(t('pdf.footer'), W / 2, H - footerH / 2, { align: 'center', baseline: 'middle' });

  /* ── Save ── */
  const safeName = `${state.firstName}-${state.lastName}`.replace(/[^a-zA-Z0-9-]/g, '-');
  doc.save(`${t('pdf.filename')}-${safeName}.pdf`);
}

/* ── Sticky nav scroll behaviour ─────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Init ─────────────────────────────────────────────── */
applyLang(currentLang);
if (!handlePaymentReturn()) goToStep(1);
