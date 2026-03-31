/* ═══════════════════════════════════════════════════════
   Division D Conference 2026 — register.js
   · Multi-step registration funnel (4 steps + success)
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
    'reg.step2.nav':          'Fee',
    'reg.step3.nav':          'Workshop',
    'reg.step4.nav':          'Confirm',

    'reg.step1.eyebrow':      'Step 1 of 4',
    'reg.step1.title':        'Your Details',
    'reg.step1.subtitle':     'Tell us a little about yourself.',

    'reg.step2.eyebrow':      'Step 2 of 4',
    'reg.step2.title':        'Venue Cleaning Fee',
    'reg.step2.subtitle':     'A small contribution to keep the venue in great shape.',

    'reg.cleaning.desc':      'All attendees contribute a one-time venue cleaning fee of €5. This helps cover post-event cleaning costs at Stadtteilkultur 2411.',
    'reg.cleaning.accept':    'I have read and accept the €5 cleaning fee',
    'reg.cleaning.acceptHint':'You must accept to continue with your registration.',

    'reg.step3.eyebrow':      'Step 3 of 4',
    'reg.step3.title':        'Workshop Package',
    'reg.step3.subtitle':     'Would you like to join a workshop session?',

    'reg.workshop.title':     'Workshop Package',
    'reg.workshop.desc':      'Join an interactive workshop session to sharpen your skills and connect with fellow Toastmasters. Limited spaces available.',
    'reg.workshop.memberFree':'Free for Toastmasters members',
    'reg.workshop.free':      'FREE',

    'reg.step4.eyebrow':      'Step 4 of 4',
    'reg.step4.title':        'Confirm Registration',
    'reg.step4.subtitle':     'Review your details before paying.',

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

    'reg.summary.name':           'Name',
    'reg.summary.email':          'Email',
    'reg.summary.status':         'Status',
    'reg.summary.statusMember':   'Toastmasters member',
    'reg.summary.statusGuest':    'Guest',
    'reg.summary.priceTitle':     'Price Breakdown',
    'reg.summary.cleaning':       'Cleaning fee',
    'reg.summary.workshop':       'Workshop Package',
    'reg.summary.memberDiscount': 'Toastmasters member discount',
    'reg.summary.total':          'Total',
    'reg.summary.paymentNote':    '💡 You will be redirected to Stripe to pay securely by card.',
    'reg.confirm.paying':         'Redirecting to payment…',

    'reg.next':               'Continue →',
    'reg.back':               '← Back',
    'reg.confirm':            'Pay with Stripe',

    'reg.confirm.title':      "You're Registered!",
    'reg.confirm.body':       'See you on 25 April at Stadtteilkultur 2411, Munich!',
    'reg.confirm.name':       'Name',
    'reg.confirm.workshop':   'Workshop',
    'reg.confirm.workshopIncluded': 'Included ✓',
    'reg.confirm.workshopPaid': '+€10 ✓',
    'reg.confirm.due':        'Total due at door',
    'reg.confirm.paid':       'Payment received',
    'reg.confirm.download':   '↓ Download Ticket (PDF)',
    'reg.confirm.backHome':   '← Back to main site',
    'reg.confirm.receiptNote':'📧 A payment receipt has been sent to your email address.',

    'reg.err.firstName':      'Please enter your first name.',
    'reg.err.lastName':       'Please enter your last name.',
    'reg.err.email':          'Please enter a valid email address.',
    'reg.err.cleaning':       'Please accept the cleaning fee to continue.',
    'reg.err.paymentTitle':   'Payment not completed',
    'reg.err.paymentBody':    'Something went wrong or you cancelled. Please try again — your details are still saved.',

    'pdf.district':           'TOASTMASTERS DISTRICT 95 · DIVISION D',
    'pdf.conference':         'Division D Conference 2026',
    'pdf.tagline':            'Growing Through Connection',
    'pdf.date':               '25 April 2026',
    'pdf.venue':              'Stadtteilkultur 2411, Munich',
    'pdf.workshop':           'Workshop Package: Included',
    'pdf.workshopPaid':       'Workshop Package: +€10',
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
    'reg.step2.nav':          'Gebühr',
    'reg.step3.nav':          'Workshop',
    'reg.step4.nav':          'Bestätigen',

    'reg.step1.eyebrow':      'Schritt 1 von 4',
    'reg.step1.title':        'Deine Angaben',
    'reg.step1.subtitle':     'Erzähl uns ein wenig über dich.',

    'reg.step2.eyebrow':      'Schritt 2 von 4',
    'reg.step2.title':        'Reinigungsgebühr',
    'reg.step2.subtitle':     'Ein kleiner Beitrag, um den Veranstaltungsort sauber zu halten.',

    'reg.cleaning.desc':      'Alle Teilnehmenden leisten einen einmaligen Beitrag von €5 zur Reinigung des Veranstaltungsortes nach der Konferenz.',
    'reg.cleaning.accept':    'Ich habe die €5 Reinigungsgebühr gelesen und akzeptiere sie',
    'reg.cleaning.acceptHint':'Du musst zustimmen, um mit der Anmeldung fortzufahren.',

    'reg.step3.eyebrow':      'Schritt 3 von 4',
    'reg.step3.title':        'Workshop-Paket',
    'reg.step3.subtitle':     'Möchtest du an einem Workshop teilnehmen?',

    'reg.workshop.title':     'Workshop-Paket',
    'reg.workshop.desc':      'Nimm an einem interaktiven Workshop teil, um deine Fähigkeiten zu schärfen und dich mit anderen Toastmasters zu vernetzen. Begrenzte Plätze verfügbar.',
    'reg.workshop.memberFree':'Kostenlos für Toastmasters-Mitglieder',
    'reg.workshop.free':      'GRATIS',

    'reg.step4.eyebrow':      'Schritt 4 von 4',
    'reg.step4.title':        'Anmeldung bestätigen',
    'reg.step4.subtitle':     'Überprüfe deine Daten vor der Zahlung.',

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

    'reg.summary.name':           'Name',
    'reg.summary.email':          'E-Mail',
    'reg.summary.status':         'Status',
    'reg.summary.statusMember':   'Toastmasters-Mitglied',
    'reg.summary.statusGuest':    'Gast',
    'reg.summary.priceTitle':     'Preisübersicht',
    'reg.summary.cleaning':       'Reinigungsgebühr',
    'reg.summary.workshop':       'Workshop-Paket',
    'reg.summary.memberDiscount': 'Toastmasters-Mitgliederrabatt',
    'reg.summary.total':          'Gesamtbetrag',
    'reg.summary.paymentNote':    '💡 Du wirst zur sicheren Kartenzahlung über Stripe weitergeleitet.',
    'reg.confirm.paying':         'Weiterleitung zur Zahlung…',

    'reg.next':               'Weiter →',
    'reg.back':               '← Zurück',
    'reg.confirm':            'Mit Stripe bezahlen',

    'reg.confirm.title':      'Du bist angemeldet!',
    'reg.confirm.body':       'Wir sehen uns am 25. April in der Stadtteilkultur 2411, München!',
    'reg.confirm.name':       'Name',
    'reg.confirm.workshop':   'Workshop',
    'reg.confirm.workshopIncluded': 'Inklusive ✓',
    'reg.confirm.workshopPaid': '+€10 ✓',
    'reg.confirm.due':        'Gesamtbetrag (vor Ort)',
    'reg.confirm.paid':       'Zahlung erhalten',
    'reg.confirm.download':   '↓ Ticket herunterladen (PDF)',
    'reg.confirm.backHome':   '← Zurück zur Hauptseite',
    'reg.confirm.receiptNote':'📧 Eine Zahlungsbestätigung wurde an deine E-Mail-Adresse gesendet.',

    'reg.err.firstName':      'Bitte gib deinen Vornamen ein.',
    'reg.err.lastName':       'Bitte gib deinen Nachnamen ein.',
    'reg.err.email':          'Bitte gib eine gültige E-Mail-Adresse ein.',
    'reg.err.cleaning':       'Bitte akzeptiere die Reinigungsgebühr, um fortzufahren.',
    'reg.err.paymentTitle':   'Zahlung nicht abgeschlossen',
    'reg.err.paymentBody':    'Etwas ist schiefgelaufen oder du hast abgebrochen. Bitte versuche es erneut — deine Daten sind noch gespeichert.',

    'pdf.district':           'TOASTMASTERS DISTRIKT 95 · DIVISION D',
    'pdf.conference':         'Division D Konferenz 2026',
    'pdf.tagline':            'Wo Geschichten sich begegnen',
    'pdf.date':               '25. April 2026',
    'pdf.venue':              'Stadtteilkultur 2411, München',
    'pdf.workshop':           'Workshop-Paket: Inklusive',
    'pdf.workshopPaid':       'Workshop-Paket: +€10',
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
const APPS_SCRIPT_URL   = 'https://script.google.com/macros/s/AKfycbxKreCl6hQoqlbO3JcsIU8kZ_8SVmQ05ha49KU_WUuheuvNQB1OaPgBjZxTESzkfcZ6aQ/exec';
const STRIPE_PUBLIC_KEY = 'pk_test_51TDjKJRtImJpS3aDh6XmontWzR953d7ax0A3iG8eN4x9BkNMXxYTiYd7ZNztqYCa4Ho3TC5hZyLL8uxJ8f15nWn400AwBQQ4F3';

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
  currentStep:      1,
  firstName:        '',
  lastName:         '',
  email:            '',
  isMember:         false,
  clubs:            [],
  clubOther:        '',
  cleaningAccepted: false,
  workshop:         false,
  ref:              '',
  paidViaStripe:    false,
};

const PRICES = { cleaning: 5, workshop: 10 };

function calcTotal() {
  let total = PRICES.cleaning;
  if (state.workshop && !state.isMember) total += PRICES.workshop;
  return total;
}

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'DD26-' + Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

/* ── Payment ──────────────────────────────────────────── */
async function initiatePayment() {
  const btn = document.getElementById('step4Confirm');
  btn.disabled = true;
  btn.textContent = t('reg.confirm.paying');

  sessionStorage.setItem('divD_reg', JSON.stringify({ ...state, total: calcTotal() }));

  try {
    const res  = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        bookingRef: state.ref,
        firstName:  state.firstName,
        lastName:   state.lastName,
        email:      state.email,
        member:     state.isMember,
        club:       state.clubOther || state.clubs.join(', '),
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

function handlePaymentReturn() {
  const params = new URLSearchParams(window.location.search);
  history.replaceState({}, '', window.location.pathname);

  if (params.get('success') && params.get('session_id')) {
    const saved = sessionStorage.getItem('divD_reg');
    if (!saved) return false;
    Object.assign(state, JSON.parse(saved));
    sessionStorage.removeItem('divD_reg');
    state.paidViaStripe = true;
    goToStep(5);
    return true;
  }

  if (params.get('cancelled')) {
    const saved = sessionStorage.getItem('divD_reg');
    if (!saved) return false;
    Object.assign(state, JSON.parse(saved));
    goToStep(4);
    document.getElementById('paymentErrorBanner').hidden = false;
    const btn = document.getElementById('step4Confirm');
    btn.disabled = false;
    btn.textContent = `${t('reg.confirm')} — €${calcTotal()}`;
    return true;
  }

  return false;
}

/* ── Step navigation ──────────────────────────────────── */
function goToStep(n) {
  document.querySelectorAll('.funnel__panel').forEach(p => {
    p.classList.remove('active');
    p.hidden = true;
  });
  const panel = document.getElementById('step' + n);
  panel.hidden = false;
  panel.classList.add('active');

  document.querySelectorAll('.funnel__prog-step').forEach(dot => {
    const s = parseInt(dot.dataset.step);
    dot.classList.toggle('active', s === n);
    dot.classList.toggle('done', s < n);
  });

  state.currentStep = n;
  document.getElementById('funnel').scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (n === 3) updateWorkshopPricing();
  if (n === 4) populateSummary();
  if (n === 5) populateConfirmation();
}

/* ── Toast ────────────────────────────────────────────── */
const toastEl = document.getElementById('toast');
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
  if (!state.cleaningAccepted) {
    document.getElementById('cleaningErr').textContent = t('reg.err.cleaning');
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

  const notListedCb = document.getElementById('clubNotListed');
  const manualInput = document.getElementById('clubOther');

  notListedCb.addEventListener('change', () => {
    const manual = notListedCb.checked;
    wrapper.hidden     = manual;
    manualInput.hidden = !manual;
    if (manual) {
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

/* ── Step 2 wiring: Cleaning fee ─────────────────────── */
const cleaningToggle = document.getElementById('cleaningToggle');
const cleaningCard   = document.getElementById('cleaningCard');

function setCleaning(val) {
  state.cleaningAccepted = val;
  cleaningToggle.setAttribute('aria-checked', String(val));
  cleaningCard.classList.toggle('addon-card--active', val);
  if (val) document.getElementById('cleaningErr').textContent = '';
}

cleaningToggle.addEventListener('click', () => setCleaning(!state.cleaningAccepted));
cleaningToggle.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setCleaning(!state.cleaningAccepted); }
});
cleaningCard.addEventListener('click', e => {
  if (!e.target.closest('.addon-toggle')) setCleaning(!state.cleaningAccepted);
});

document.getElementById('step2Back').addEventListener('click', () => goToStep(1));
document.getElementById('step2Next').addEventListener('click', () => {
  if (validateStep2()) goToStep(3);
});

/* ── Step 3 wiring: Workshop ─────────────────────────── */
const workshopToggle = document.getElementById('workshopToggle');
const workshopCard   = document.getElementById('workshopCard');

function updateWorkshopPricing() {
  document.getElementById('workshopPriceMember').hidden    = !state.isMember;
  document.getElementById('workshopPriceNonMember').hidden =  state.isMember;
  document.getElementById('workshopMemberBadge').hidden    = !state.isMember;
}

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
  document.getElementById('summaryName').textContent   = `${state.firstName} ${state.lastName}`;
  document.getElementById('summaryEmail').textContent  = state.email;
  document.getElementById('summaryStatus').textContent = state.isMember
    ? t('reg.summary.statusMember')
    : t('reg.summary.statusGuest');

  // Workshop rows
  const nonMemberRow  = document.getElementById('priceWorkshopRow');
  const memberRow     = document.getElementById('priceWorkshopMemberRow');
  const discountRow   = document.getElementById('priceDiscountRow');

  nonMemberRow.hidden  = !(state.workshop && !state.isMember);
  memberRow.hidden     = !(state.workshop && state.isMember);
  discountRow.hidden   = !(state.workshop && state.isMember);

  document.getElementById('priceTotal').textContent = `€${calcTotal()}`;

  const btn = document.getElementById('step4Confirm');
  btn.disabled = false;
  btn.textContent = `${t('reg.confirm')} — €${calcTotal()}`;
}

document.getElementById('step4Back').addEventListener('click', () => goToStep(3));
document.getElementById('step4Confirm').addEventListener('click', async () => {
  if (!state.ref) state.ref = generateRef();
  await initiatePayment();
});

/* ── Step 5: Confirmation ────────────────────────────── */
function populateConfirmation() {
  document.getElementById('confirmName').textContent  = `${state.firstName} ${state.lastName}`;
  document.getElementById('confirmTotal').textContent = `€${calcTotal()}`;
  document.getElementById('confirmDueLabel').textContent = t(state.paidViaStripe ? 'reg.confirm.paid' : 'reg.confirm.due');

  const workshopRow = document.getElementById('confirmWorkshopRow');
  if (state.workshop) {
    workshopRow.hidden = false;
    document.getElementById('confirmWorkshopValue').textContent = state.isMember
      ? t('reg.confirm.workshopIncluded')
      : t('reg.confirm.workshopPaid');
  } else {
    workshopRow.hidden = true;
  }

  const refEl = document.getElementById('confirmRef');
  if (refEl) refEl.textContent = state.ref;
}

document.getElementById('downloadTicket').addEventListener('click', generatePDF);

/* ── PDF Generation ──────────────────────────────────── */
function generatePDF() {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    const canvas  = document.createElement('canvas');
    canvas.width  = img.naturalWidth  || img.width;
    canvas.height = img.naturalHeight || img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    buildPDF(canvas.toDataURL('image/png'));
  };
  img.onerror = function () { buildPDF(null); };
  img.src = 'images/tm-logo.png';
}

function buildPDF(logoB64) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a5' });
  const W = 210, H = 148;

  // Background
  doc.setFillColor(0, 65, 101);
  doc.rect(0, 0, W, H, 'F');

  // Left accent strip
  const stripW = 50;
  doc.setFillColor(119, 36, 50);
  doc.rect(0, 0, stripW, H, 'F');

  // Footer strip
  const footerH = 10;
  doc.setFillColor(0, 44, 70);
  doc.rect(0, H - footerH, W, footerH, 'F');

  // TM Logo
  if (logoB64) {
    const logoSize = 28;
    const logoX    = (stripW - logoSize) / 2;
    const logoY    = 12;
    doc.addImage(logoB64, 'PNG', logoX, logoY, logoSize, logoSize);
  }

  // Member/Guest badge (left strip)
  const badgeLabel = state.isMember ? 'MEMBER' : 'GUEST';
  doc.setFillColor(242, 223, 116);
  const badgeY = 60, badgeH = 14, badgePad = 4;
  doc.roundedRect(badgePad, badgeY, stripW - badgePad * 2, badgeH, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 44, 70);
  doc.text(badgeLabel, stripW / 2, badgeY + badgeH / 2 + 0.5, { align: 'center', baseline: 'middle' });

  // Workshop badge
  if (state.workshop) {
    const workshopKey = state.isMember ? 'pdf.workshop' : 'pdf.workshopPaid';
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(255, 255, 255);
    doc.roundedRect(badgePad, badgeY + badgeH + 5, stripW - badgePad * 2, 9, 2, 2, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(0, 44, 70);
    doc.text(t(workshopKey), stripW / 2, badgeY + badgeH + 5 + 4.5, { align: 'center', baseline: 'middle' });
  }

  // Right content area
  const contentX = stripW + 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(242, 223, 116);
  doc.text(t('pdf.district'), contentX, 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('Division D', contentX, 32);
  doc.text('Conference 2026', contentX, 43);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 220, 235);
  doc.text(t('pdf.tagline'), contentX, 51);

  doc.setDrawColor(119, 36, 50);
  doc.setLineWidth(0.4);
  doc.line(contentX, 56, W - 10, 56);

  doc.setFont('helvetica', 'bold');
  const fullName = `${state.firstName} ${state.lastName}`;
  const nameSize = fullName.length > 24 ? 16 : fullName.length > 18 ? 18 : 22;
  doc.setFontSize(nameSize);
  doc.setTextColor(255, 255, 255);
  doc.text(fullName, contentX, 73);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 220, 235);
  doc.text(`${t('pdf.date')}  ·  ${t('pdf.venue')}`, contentX, 84);

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

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(169, 178, 177);
  doc.text(`REF: ${state.ref}`, contentX, 127);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(200, 220, 235);
  doc.text(t('pdf.footer'), W / 2, H - footerH / 2, { align: 'center', baseline: 'middle' });

  const safeName = `${state.firstName}-${state.lastName}`.replace(/[^a-zA-Z0-9-]/g, '-');
  doc.save(`${t('pdf.filename')}-${safeName}.pdf`);
}

/* ── Sticky nav ───────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Init ─────────────────────────────────────────────── */
applyLang(currentLang);
if (!handlePaymentReturn()) goToStep(1);
