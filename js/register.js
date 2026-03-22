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
    'reg.clubName':           'Club Name',

    'reg.role.audience':      'Audience Member',
    'reg.role.audienceDesc':  'Enjoy the speeches, contests, and networking as a guest.',
    'reg.role.staff':         'Conference Volunteers',
    'reg.role.staffDesc':     'You have one or more roles in running the conference.',
    'reg.role.staffLabel':    'Conference Volunteers — no extra cost',
    'reg.role.staffRolesLabel': 'Select your role(s) — you can choose more than one',
    'reg.role.timekeeper':    'Time Keeper',
    'reg.role.ballot':        'Ballot Counter',
    'reg.role.judge':         'Judge',
    'reg.role.chiefjudge':    'Chief Judge',
    'reg.role.contestchair':  'Contest Chair',
    'reg.role.sargeant':      'Sergeant at Arms',
    'reg.role.contestant':    'Contestant',
    'reg.role.free':          'Included',

    'reg.workshop.title':     'Workshop Package',
    'reg.workshop.desc':      'Join an interactive workshop session to sharpen your skills and connect with fellow Toastmasters. Limited spaces available.',

    'reg.summary.name':       'Name',
    'reg.summary.email':      'Email',
    'reg.summary.role':       'Role',
    'reg.summary.priceTitle': 'Price Breakdown',
    'reg.summary.cleaning':   'Cleaning fee',
    'reg.summary.roleAudience': 'Audience',
    'reg.summary.roleStaff':  'Staff role',
    'reg.summary.workshop':   'Workshop Package',
    'reg.summary.total':      'Total',
    'reg.summary.paymentNote':'💡 You will be redirected to SumUp to pay securely by card.',
    'reg.confirm.paying':     'Redirecting to payment…',

    'reg.next':               'Continue →',
    'reg.back':               '← Back',
    'reg.confirm':            'Pay with SumUp',

    'reg.confirm.title':      "You're Registered!",
    'reg.confirm.body':       'See you on 25 April at Stadtteilkultur 2411, Munich!',
    'reg.confirm.name':       'Name',
    'reg.confirm.role':       'Role',
    'reg.confirm.workshop':   'Workshop',
    'reg.confirm.workshopIncluded': 'Included ✓',
    'reg.confirm.due':        'Total due at door',
    'reg.confirm.download':   '↓ Download Ticket (PDF)',
    'reg.confirm.backHome':   '← Back to main site',

    'reg.err.firstName':      'Please enter your first name.',
    'reg.err.lastName':       'Please enter your last name.',
    'reg.err.email':          'Please enter a valid email address.',
    'reg.err.role':           'Please select Audience or Staff to continue.',
    'reg.err.staffRole':      'Please select at least one staff role.',

    'pdf.district':           'TOASTMASTERS DISTRICT 95 · DIVISION D',
    'pdf.conference':         'Division D Conference 2026',
    'pdf.tagline':            'Where Stories Connect',
    'pdf.date':               '25 April 2026',
    'pdf.venue':              'Stadtteilkultur 2411, Munich',
    'pdf.workshop':           'Workshop Package: Included',
    'pdf.totalLabel':         'TOTAL DUE AT DOOR',
    'pdf.totalNote':          'Cash payment on arrival',
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
    'reg.clubName':           'Club-Name',

    'reg.role.audience':      'Zuschauer',
    'reg.role.audienceDesc':  'Genieße die Reden, Wettbewerbe und das Networking als Gast.',
    'reg.role.staff':         'Konferenz-Volunteers',
    'reg.role.staffDesc':     'Du hast eine oder mehrere Rollen bei der Durchführung der Konferenz.',
    'reg.role.staffLabel':    'Konferenz-Volunteers — kein Aufpreis',
    'reg.role.staffRolesLabel': 'Wähle deine Rolle(n) — Mehrfachauswahl möglich',
    'reg.role.timekeeper':    'Zeitnehmer',
    'reg.role.ballot':        'Stimmenauszähler',
    'reg.role.judge':         'Richter',
    'reg.role.chiefjudge':    'Chefrichter',
    'reg.role.contestchair':  'Wettbewerbsleiter',
    'reg.role.sargeant':      'Sergeant at Arms',
    'reg.role.contestant':    'Teilnehmer (Wettbewerb)',
    'reg.role.free':          'Inklusive',

    'reg.workshop.title':     'Workshop-Paket',
    'reg.workshop.desc':      'Nimm an einem interaktiven Workshop teil, um deine Fähigkeiten zu schärfen. Begrenzte Plätze verfügbar.',

    'reg.summary.name':       'Name',
    'reg.summary.email':      'E-Mail',
    'reg.summary.role':       'Rolle',
    'reg.summary.priceTitle': 'Preisübersicht',
    'reg.summary.cleaning':   'Reinigungsgebühr',
    'reg.summary.roleAudience': 'Zuschauer',
    'reg.summary.roleStaff':  'Team-Rolle',
    'reg.summary.workshop':   'Workshop-Paket',
    'reg.summary.total':      'Gesamtbetrag',
    'reg.summary.paymentNote':'💡 Du wirst zur sicheren Kartenzahlung über SumUp weitergeleitet.',
    'reg.confirm.paying':     'Weiterleitung zur Zahlung…',

    'reg.next':               'Weiter →',
    'reg.back':               '← Zurück',
    'reg.confirm':            'Mit SumUp bezahlen',

    'reg.confirm.title':      'Du bist angemeldet!',
    'reg.confirm.body':       'Wir sehen uns am 25. April in der Stadtteilkultur 2411, München!',
    'reg.confirm.name':       'Name',
    'reg.confirm.role':       'Rolle',
    'reg.confirm.workshop':   'Workshop',
    'reg.confirm.workshopIncluded': 'Inklusive ✓',
    'reg.confirm.due':        'Gesamtbetrag (vor Ort)',
    'reg.confirm.download':   '↓ Ticket herunterladen (PDF)',
    'reg.confirm.backHome':   '← Zurück zur Hauptseite',

    'reg.err.firstName':      'Bitte gib deinen Vornamen ein.',
    'reg.err.lastName':       'Bitte gib deinen Nachnamen ein.',
    'reg.err.email':          'Bitte gib eine gültige E-Mail-Adresse ein.',
    'reg.err.role':           'Bitte wähle Zuschauer oder Team aus.',
    'reg.err.staffRole':      'Bitte wähle mindestens eine Team-Rolle aus.',

    'pdf.district':           'TOASTMASTERS DISTRIKT 95 · DIVISION D',
    'pdf.conference':         'Division D Konferenz 2026',
    'pdf.tagline':            'Wo Geschichten sich begegnen',
    'pdf.date':               '25. April 2026',
    'pdf.venue':              'Stadtteilkultur 2411, München',
    'pdf.workshop':           'Workshop-Paket: Inklusive',
    'pdf.totalLabel':         'GESAMTBETRAG VOR ORT',
    'pdf.totalNote':          'Barzahlung bei Ankunft',
    'pdf.footer':             'toastmasters-bayern.com · Distrikt 95',
    'reg.confirm.ref':        'Buchungsreferenz',
    'pdf.filename':           'Division-D-Konferenz-2026-Ticket',
  },
};

/* ── Google Sheets endpoint ───────────────────────────── */
// Replace with your deployed Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKreCl6hQoqlbO3JcsIU8kZ_8SVmQ05ha49KU_WUuheuvNQB1OaPgBjZxTESzkfcZ6aQ/exec';

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
  clubName:    '',
  roleType:    '',       // 'audience' | 'staff'
  staffRoles:  [],       // array of selected staff roles (e.g. ['contestant','timekeeper'])
  workshop:    false,
  ref:         '',   // booking reference, generated on confirm
};

const PRICES = { cleaning: 5, audience: 5, workshop: 5 };

function calcTotal() {
  let total = PRICES.cleaning;
  if (state.roleType === 'audience') total += PRICES.audience;
  if (state.workshop) total += PRICES.workshop;
  return total;
}

function roleLabel() {
  if (state.roleType === 'audience') return t('reg.summary.roleAudience');
  const names = state.staffRoles.map(r => t(`reg.role.${r}`));
  return names.join(', ');
}

function roleBadgeText() {
  if (state.roleType === 'audience') return 'AUDIENCE';
  return state.staffRoles.map(r => t(`reg.role.${r}`).toUpperCase()).join(' · ');
}

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'DD26-' + Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

async function initiatePayment() {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'PASTE_YOUR_WEB_APP_URL_HERE') {
    goToStep(5); return;
  }
  const btn = document.getElementById('step4Confirm');
  btn.disabled = true;
  btn.textContent = t('reg.confirm.paying');

  // Persist state so we can restore it after SumUp redirect
  sessionStorage.setItem('divD_reg', JSON.stringify({ ...state, total: calcTotal() }));

  // 1. Write to sheet — no-cors, fire and forget
  fetch(APPS_SCRIPT_URL, {
    method:  'POST',
    mode:    'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingRef: state.ref,
      firstName:  state.firstName,
      lastName:   state.lastName,
      email:      state.email,
      member:     state.isMember,
      club:       state.clubName,
      roleType:   state.roleType,
      staffRoles: state.staffRoles.join(', '),
      workshop:   state.workshop,
      total:      calcTotal(),
      lang:       currentLang,
    }),
  }).catch(() => {});

  // 2. Create SumUp checkout via GET (Apps Script supports CORS on GET)
  try {
    const params = new URLSearchParams({
      action:    'checkout',
      ref:       state.ref,
      amount:    calcTotal(),
      name:      `${state.firstName} ${state.lastName}`,
      email:     state.email,
      roleType:  state.roleType,
      staffRoles: state.staffRoles.join(','),
      workshop:  state.workshop ? '1' : '0',
    });
    const res  = await fetch(`${APPS_SCRIPT_URL}?${params}`);
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

async function verifyPayment(checkoutId) {
  try {
    const res  = await fetch(`${APPS_SCRIPT_URL}?action=verify&checkoutId=${checkoutId}`);
    const data = await res.json();
    return data.status === 'PAID';
  } catch {
    return false;
  }
}

// Called on page load — restores state if returning from SumUp
async function handlePaymentReturn() {
  const params     = new URLSearchParams(window.location.search);
  const checkoutId = params.get('checkout_id');
  if (!params.get('success') || !checkoutId) return;

  const saved = sessionStorage.getItem('divD_reg');
  if (!saved) return;

  Object.assign(state, JSON.parse(saved));
  sessionStorage.removeItem('divD_reg');

  // Clean URL without reload
  history.replaceState({}, '', window.location.pathname);

  const paid = await verifyPayment(checkoutId);
  if (paid) {
    goToStep(5);
  } else {
    showToast('Payment could not be verified. Please try again or contact us.');
  }
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
  if (state.roleType === 'staff' && state.staffRoles.length === 0) {
    document.getElementById('roleErr').textContent = t('reg.err.staffRole');
    return false;
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
const clubNameEl  = document.getElementById('clubName');

firstNameEl.addEventListener('input', () => { state.firstName = firstNameEl.value; });
lastNameEl.addEventListener('input',  () => { state.lastName  = lastNameEl.value; });
emailEl.addEventListener('input',     () => { state.email     = emailEl.value; });

[memberYes, memberNo].forEach(radio => {
  radio.addEventListener('change', () => {
    state.isMember = memberYes.checked;
    clubGroup.classList.toggle('form__group--hidden', !state.isMember);
  });
});

clubNameEl.addEventListener('input', () => { state.clubName = clubNameEl.value; });

document.getElementById('step1Next').addEventListener('click', () => {
  if (validateStep1()) goToStep(2);
});

/* ── Step 2 wiring ────────────────────────────────────── */
const staffRolesPanel = document.getElementById('staffRoles');

document.querySelectorAll('input[name="roleType"]').forEach(radio => {
  radio.addEventListener('change', () => {
    state.roleType = radio.value;
    state.staffRoles = [];
    // Highlight selected type card
    document.querySelectorAll('.role-type-card').forEach(c => c.classList.remove('selected'));
    radio.closest('.role-type-card').classList.add('selected');
    // Reset staff checkboxes and cards
    document.querySelectorAll('input[name="staffRole"]').forEach(cb => {
      cb.checked = false;
      cb.closest('.role-card').classList.remove('selected');
    });
    // Show/hide staff role checkboxes
    staffRolesPanel.hidden = (state.roleType !== 'staff');
  });
});

document.querySelectorAll('input[name="staffRole"]').forEach(cb => {
  cb.addEventListener('change', () => {
    if (cb.checked) {
      state.staffRoles.push(cb.value);
      cb.closest('.role-card').classList.add('selected');
    } else {
      state.staffRoles = state.staffRoles.filter(r => r !== cb.value);
      cb.closest('.role-card').classList.remove('selected');
    }
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
    roleLabelEl.textContent = state.staffRoles.map(r => t(`reg.role.${r}`)).join(', ');
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
  state.ref = generateRef();
  await initiatePayment();
});

// Check if returning from SumUp payment
handlePaymentReturn();

/* ── Step 5: Confirmation ────────────────────────────── */
function populateConfirmation() {
  document.getElementById('confirmName').textContent  = `${state.firstName} ${state.lastName}`;
  document.getElementById('confirmRole').textContent  = ticketRole();
  document.getElementById('confirmTotal').textContent = `€${calcTotal()}`;

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
  doc.text(t('pdf.totalLabel'), contentX, 100);
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(`€${calcTotal()}`, contentX, 111);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 220, 235);
  doc.text(t('pdf.totalNote'), contentX, 118);

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
goToStep(1);
