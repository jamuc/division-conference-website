/* ═══════════════════════════════════════════════════════
   Division D Conference 2026 — register.js
   · Multi-step registration funnel (7 steps + success)
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
    'reg.step2.nav':          'Roles',
    'reg.step3.nav':          'Youth',
    'reg.step4.nav':          'Workshop',
    'reg.step5.nav':          'Lunch',
    'reg.step6.nav':          'Donate',
    'reg.step7.nav':          'Fee',
    'reg.step8.nav':          'Confirm',

    'reg.step1.eyebrow':      'Step 1 of 5',
    'reg.step1.title':        'Your Details',
    'reg.step1.subtitle':     'Tell us a little about yourself.',

    'reg.step2.title':        'Contest Roles',
    'reg.step2.subtitle':     'Select your role(s) for the contest day. Multiple selections allowed.',

    'reg.step3.title':        'Youth Bootcamp',
    'reg.step3.subtitle':     'Will you be bringing any young people to the Youth Bootcamp?',
    'reg.youth.question':     'Who is joining the Youth Bootcamp with you?',
    'reg.youth.yes':          "Yes, I'm bringing young people",
    'reg.youth.no':           "No, I'm not bringing any young people",
    'reg.youth.desc':         'If yes, please tell us how many young people are in each age group.',
    'reg.youth.group1014':    'Ages 10–14',
    'reg.youth.group1417':    'Ages 14–17',
    'reg.youth.none':         'No young people attending',
    'reg.youth.summary1014':  'Ages 10–14',
    'reg.youth.summary1417':  'Ages 14–17',

    'reg.step4.title':        'Workshop Pass',
    'reg.step4.subtitle':     'Would you like to join a workshop session?',

    'reg.workshop.title':     'Workshop Pass',
    'reg.workshop.desc':      'Join an interactive workshop session to sharpen your skills and connect with fellow Toastmasters. Limited spaces available.',
    'reg.workshop.memberFree':'Free for Toastmasters members',
    'reg.workshop.free':      'FREE',

    'reg.step5.title':        'Lunch Package',
    'reg.step5.subtitle':     'Order lunch and fuel up for a full day of speeches and workshops.',
    'reg.lunch.desc':         "Each lunch package is €15. Order as many as you need — including for any young guests you're bringing along.",
    'reg.lunch.nonVegan':     'Non-vegan',
    'reg.lunch.vegan':        'Vegan',

    'reg.step6.title':        'Support the Conference',
    'reg.step6.subtitle':     'Help us make this event great with a voluntary donation.',

    'reg.donation.desc':      'Your donation goes directly towards financing the conference. Every contribution helps — but it is entirely optional.',
    'reg.donation.label':     'Or enter your own amount (€)',

    'reg.step7.title':        'Venue Cleaning Fee',
    'reg.step7.subtitle':     'A small contribution to keep the venue in great shape.',
    'reg.cleaning.desc':      'All attendees contribute a one-time venue cleaning fee of €5.25. This helps cover post-event cleaning costs at Stadtteilkultur 2411.',
    'reg.cleaning.accept':    'I have read and accept the €5.25 cleaning fee',
    'reg.cleaning.acceptHint':'You must accept to continue with your registration.',

    'reg.step8.title':        'Confirm Registration',
    'reg.step8.subtitle':     'Review your details before paying.',

    'reg.role.contestant':    'Contestant',
    'reg.role.general':       'General Support',
    'reg.role.judge':         'Judge',
    'reg.role.technical':     'Technical Support',
    'reg.role.registration':  'Registration Support',
    'reg.role.photo':         'Photo',
    'reg.role.timekeeper':    'Timekeeper',
    'reg.role.eventSupport':  'SAA / Ballot Counter / Logistics',
    'reg.role.judgeEligTitle':'Eligibility requirements — please confirm all:',
    'reg.role.judgeElig1':    'I have achieved Pathways Level 2 or completed a minimum of 6 speech projects in the Competent Communication manual',
    'reg.role.judgeElig2':    'I have been a Toastmasters member for at least 6 months',

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
    'reg.summary.roles':          'Role(s)',
    'reg.summary.youth':          'Youth Bootcamp',
    'reg.summary.statusMember':   'Toastmasters member',
    'reg.summary.statusGuest':    'Guest',
    'reg.summary.priceTitle':     'Price Breakdown',
    'reg.summary.cleaning':       'Cleaning fee',
    'reg.summary.workshop':       'Workshop Pass',
    'reg.summary.memberDiscount': 'Toastmasters member discount',
    'reg.summary.donation':       'Donation',
    'reg.summary.lunch':          'Lunch Package',
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
    'reg.err.club':           'Please select or enter your club name.',
    'reg.err.cleaning':       'Please accept the cleaning fee to continue.',
    'reg.err.youthChoice':    'Please let us know whether you are bringing any young people.',
    'reg.err.youthCount':     'Please enter at least one young person across the age groups.',
    'reg.err.roles':          'Please select at least one role.',
    'reg.err.judgeElig':      'Please confirm all judge eligibility requirements.',
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
    'reg.step2.nav':          'Rollen',
    'reg.step3.nav':          'Jugend',
    'reg.step4.nav':          'Workshop',
    'reg.step5.nav':          'Mittagessen',
    'reg.step6.nav':          'Spenden',
    'reg.step7.nav':          'Gebühr',
    'reg.step8.nav':          'Bestätigen',

    'reg.step1.eyebrow':      'Schritt 1 von 5',
    'reg.step1.title':        'Deine Angaben',
    'reg.step1.subtitle':     'Erzähl uns ein wenig über dich.',

    'reg.step2.title':        'Wettbewerbsrollen',
    'reg.step2.subtitle':     'Wähle deine Rolle(n) für den Wettkampftag. Mehrfachauswahl möglich.',

    'reg.step3.title':        'Jugend-Bootcamp',
    'reg.step3.subtitle':     'Bringst du Jugendliche zum Jugend-Bootcamp mit?',
    'reg.youth.question':     'Wer nimmt mit dir am Jugend-Bootcamp teil?',
    'reg.youth.yes':          'Ja, ich bringe Jugendliche mit',
    'reg.youth.no':           'Nein, ich bringe keine Jugendlichen mit',
    'reg.youth.desc':         'Wenn ja, teile uns bitte mit, wie viele Jugendliche zu jeder Altersgruppe gehören.',
    'reg.youth.group1014':    '10–14 Jahre',
    'reg.youth.group1417':    '14–17 Jahre',
    'reg.youth.none':         'Keine Jugendlichen angemeldet',
    'reg.youth.summary1014':  '10–14 Jahre',
    'reg.youth.summary1417':  '14–17 Jahre',

    'reg.step4.title':        'Workshop-Pass',
    'reg.step4.subtitle':     'Möchtest du an einem Workshop teilnehmen?',

    'reg.workshop.title':     'Workshop-Pass',
    'reg.workshop.desc':      'Nimm an einem interaktiven Workshop teil, um deine Fähigkeiten zu schärfen und dich mit anderen Toastmasters zu vernetzen. Begrenzte Plätze verfügbar.',
    'reg.workshop.memberFree':'Kostenlos für Toastmasters-Mitglieder',
    'reg.workshop.free':      'GRATIS',

    'reg.step5.title':        'Mittagspaket',
    'reg.step5.subtitle':     'Bestelle dein Mittagessen und tanke Energie für einen vollen Tag.',
    'reg.lunch.desc':         'Jedes Mittagspaket kostet €15. Bestelle so viele wie du benötigst — auch für mitgebrachte Kinder.',
    'reg.lunch.nonVegan':     'Nicht vegan',
    'reg.lunch.vegan':        'Vegan',

    'reg.step6.title':        'Konferenz unterstützen',
    'reg.step6.subtitle':     'Hilf uns, dieses Event mit einer freiwilligen Spende zu finanzieren.',

    'reg.donation.desc':      'Deine Spende fließt direkt in die Finanzierung der Konferenz. Jeder Beitrag hilft — aber es ist völlig freiwillig.',
    'reg.donation.label':     'Oder gib deinen eigenen Betrag ein (€)',

    'reg.step7.title':        'Reinigungsgebühr',
    'reg.step7.subtitle':     'Ein kleiner Beitrag, um den Veranstaltungsort sauber zu halten.',
    'reg.cleaning.desc':      'Alle Teilnehmenden leisten einen einmaligen Beitrag von €5,25 zur Reinigung des Veranstaltungsortes nach der Konferenz.',
    'reg.cleaning.accept':    'Ich habe die €5,25 Reinigungsgebühr gelesen und akzeptiere sie',
    'reg.cleaning.acceptHint':'Du musst zustimmen, um mit der Anmeldung fortzufahren.',

    'reg.step8.title':        'Anmeldung bestätigen',
    'reg.step8.subtitle':     'Überprüfe deine Daten vor der Zahlung.',

    'reg.role.contestant':    'Teilnehmer/in',
    'reg.role.general':       'Allgemeine Unterstützung',
    'reg.role.judge':         'Richter/in',
    'reg.role.technical':     'Technischer Support',
    'reg.role.registration':  'Anmeldungsunterstützung',
    'reg.role.photo':         'Foto',
    'reg.role.timekeeper':    'Zeitnehmer/in',
    'reg.role.eventSupport':  'SAA / Stimmenauszählung / Logistik',
    'reg.role.judgeEligTitle':'Eignungsvoraussetzungen — bitte alle bestätigen:',
    'reg.role.judgeElig1':    'Ich habe Pathways Level 2 erreicht oder mindestens 6 Redeprojekte im Competent Communication Manual abgeschlossen',
    'reg.role.judgeElig2':    'Ich bin seit mindestens 6 Monaten Toastmasters-Mitglied',

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
    'reg.summary.roles':          'Rolle(n)',
    'reg.summary.youth':          'Jugend-Bootcamp',
    'reg.summary.statusMember':   'Toastmasters-Mitglied',
    'reg.summary.statusGuest':    'Gast',
    'reg.summary.priceTitle':     'Preisübersicht',
    'reg.summary.cleaning':       'Reinigungsgebühr',
    'reg.summary.workshop':       'Workshop-Pass',
    'reg.summary.memberDiscount': 'Toastmasters-Mitgliederrabatt',
    'reg.summary.donation':       'Spende',
    'reg.summary.lunch':          'Mittagspaket',
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
    'reg.err.club':           'Bitte wähle deinen Club aus oder gib ihn ein.',
    'reg.err.cleaning':       'Bitte akzeptiere die Reinigungsgebühr, um fortzufahren.',
    'reg.err.youthChoice':    'Bitte teile uns mit, ob du Jugendliche mitbringst.',
    'reg.err.youthCount':     'Bitte gib mindestens eine jugendliche Person in einer der Altersgruppen an.',
    'reg.err.roles':          'Bitte wähle mindestens eine Rolle aus.',
    'reg.err.judgeElig':      'Bitte bestätige alle Eignungsvoraussetzungen für Richter/innen.',
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
const APPS_SCRIPT_URL   = 'https://script.google.com/macros/s/AKfycbwyw6w7LLkdF68_2r3m-CARpMh99JrdG1jA0NY1b2f3PagKDAfaRelgwlpgEpgn36OWZw/exec';
const STRIPE_PUBLIC_KEY = 'pk_live_51TDjK02OdpBFIs6xXcAP3czI5cJeh0oIWWkNr8xvDTPebqjmYskEdCgmHXvfC6Nwqo8Jf9VyW1iuiXkfaYzt7uGk00A6nqOPBA';

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

  updateStepEyebrow(state.currentStep);
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
  donation:         0,
  youthAttendance:  '',
  youth1014:        0,
  youth1417:        0,
  lunchNonVegan:    0,
  lunchVegan:       0,
  roles:            [],
  judgeElig:        [false, false],
  ref:              '',
  paidViaStripe:    false,
};

const PRICES = { cleaning: 5.25, workshop: 10, lunch: 15 };

function calcTotal() {
  let total = PRICES.cleaning;
  if (state.workshop && !state.isMember) total += PRICES.workshop;
  const totalLunches = state.lunchNonVegan + state.lunchVegan;
  if (totalLunches > 0) total += totalLunches * PRICES.lunch;
  if (state.donation > 0) total += state.donation;
  return Math.round(total * 100) / 100;
}

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'DD26-' + Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

/* ── Progress bar ─────────────────────────────────────── */
function buildProgressBar() {
  const container = document.getElementById('funnelProgress');
  const steps = state.isMember
    ? [
        { panel: 1, key: 'reg.step1.nav' },
        { panel: 2, key: 'reg.step2.nav' },
        { panel: 3, key: 'reg.step3.nav' },
        { panel: 4, key: 'reg.step4.nav' },
        { panel: 5, key: 'reg.step5.nav' },
        { panel: 6, key: 'reg.step6.nav' },
        { panel: 7, key: 'reg.step7.nav' },
        { panel: 8, key: 'reg.step8.nav' },
      ]
    : [
        { panel: 1, key: 'reg.step1.nav' },
        { panel: 3, key: 'reg.step3.nav' },
        { panel: 4, key: 'reg.step4.nav' },
        { panel: 5, key: 'reg.step5.nav' },
        { panel: 6, key: 'reg.step6.nav' },
        { panel: 7, key: 'reg.step7.nav' },
        { panel: 8, key: 'reg.step8.nav' },
      ];
  container.innerHTML = '';
  steps.forEach(({ panel, key }, i) => {
    if (i > 0) {
      const l = document.createElement('div');
      l.className = 'funnel__prog-line';
      container.appendChild(l);
    }
    const dot = document.createElement('div');
    dot.className = 'funnel__prog-step' + (panel === 1 ? ' done' : '');
    dot.dataset.panel = panel;
    dot.innerHTML = `<div class="funnel__prog-dot"><span>${i + 1}</span></div><span class="funnel__prog-label">${t(key)}</span>`;
    container.appendChild(dot);
  });
}

/* ── Step eyebrow ─────────────────────────────────────── */
function updateStepEyebrow(n) {
  const order = state.isMember ? [1, 2, 3, 4, 5, 6, 7, 8] : [1, 3, 4, 5, 6, 7, 8];
  const idx = order.indexOf(n);
  if (idx === -1) return;
  const panel = document.getElementById('step' + n);
  const eyebrow = panel?.querySelector('.section__label');
  if (!eyebrow) return;
  eyebrow.textContent = currentLang === 'de'
    ? `Schritt ${idx + 1} von ${order.length}`
    : `Step ${idx + 1} of ${order.length}`;
}

/* ── Payment ──────────────────────────────────────────── */
async function initiatePayment() {
  const btn = document.getElementById('step8Confirm');
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
        roles:      state.roles.join(', '),
        workshop:   state.workshop,
        donation:   state.donation,
        lunchNonVegan: state.lunchNonVegan,
        lunchVegan:    state.lunchVegan,
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
    btn.textContent = `${t('reg.confirm')} — €${calcTotal().toFixed(2)}`;
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
    goToStep(9);
    return true;
  }

  if (params.get('cancelled')) {
    const saved = sessionStorage.getItem('divD_reg');
    if (!saved) return false;
    Object.assign(state, JSON.parse(saved));
    buildProgressBar();
    goToStep(8);
    document.getElementById('paymentErrorBanner').hidden = false;
    const btn = document.getElementById('step8Confirm');
    btn.disabled = false;
    btn.textContent = `${t('reg.confirm')} — €${calcTotal().toFixed(2)}`;
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

  const order = state.isMember ? [1, 2, 3, 4, 5, 6, 7, 8] : [1, 3, 4, 5, 6, 7, 8];
  const currentIdx = order.indexOf(n);
  document.querySelectorAll('.funnel__prog-step').forEach(dot => {
    const p = parseInt(dot.dataset.panel);
    const dotIdx = order.indexOf(p);
    dot.classList.toggle('active', p === n);
    dot.classList.toggle('done', dotIdx !== -1 && dotIdx < currentIdx);
  });

  state.currentStep = n;
  updateStepEyebrow(n);
  document.getElementById('funnel').scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (n === 3) renderYouthStep();
  if (n === 4) updateWorkshopPricing();
  if (n === 5) renderLunchStep();
  if (n === 6) updateDonationStep();
  if (n === 7) renderCleaningState();
  if (n === 8) populateSummary();
  if (n === 9) populateConfirmation();
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
  if (state.isMember) {
    const hasClub = state.clubs.length > 0 || state.clubOther.trim().length > 0;
    if (!hasClub) {
      document.getElementById('clubErr').textContent = t('reg.err.club');
      valid = false;
    }
  }
  return valid;
}

function validateStep2() {
  const errEl = document.getElementById('rolesErr');
  errEl.textContent = '';
  if (state.roles.length === 0) {
    errEl.textContent = t('reg.err.roles');
    return false;
  }
  if (state.roles.includes('judge')) {
    const eligOk = state.judgeElig.every(Boolean);
    if (!eligOk) {
      errEl.textContent = t('reg.err.judgeElig');
      return false;
    }
  }
  return true;
}

function validateStep3() {
  const errEl = document.getElementById('youthErr');
  errEl.textContent = '';
  if (!state.youthAttendance) {
    errEl.textContent = t('reg.err.youthChoice');
    return false;
  }
  if (state.youthAttendance === 'yes' && state.youth1014 === 0 && state.youth1417 === 0) {
    errEl.textContent = t('reg.err.youthCount');
    return false;
  }
  return true;
}

function validateStep6() {
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
  if (validateStep1()) {
    buildProgressBar();
    updateStepEyebrow(1);
    goToStep(state.isMember ? 2 : 3);
  }
});

/* ── Step 2 wiring: Contest Roles ────────────────────── */
document.querySelectorAll('.role-checkbox').forEach(cb => {
  cb.addEventListener('change', () => {
    // collect all checked role values
    state.roles = Array.from(document.querySelectorAll('.role-checkbox:checked')).map(el => el.value);
    // clear error on change
    document.getElementById('rolesErr').textContent = '';
  });
});

const judgeCheckbox   = document.getElementById('judgeCheckbox');
const judgeEligSection = document.getElementById('judgeEligSection');

judgeCheckbox.addEventListener('change', () => {
  judgeEligSection.hidden = !judgeCheckbox.checked;
  if (!judgeCheckbox.checked) {
    // reset eligibility state when judge is unchecked
    state.judgeElig = [false, false];
    document.getElementById('judgeElig1').checked = false;
    document.getElementById('judgeElig2').checked = false;
  }
});

['judgeElig1', 'judgeElig2'].forEach((id, i) => {
  document.getElementById(id).addEventListener('change', e => {
    state.judgeElig[i] = e.target.checked;
  });
});

document.getElementById('step2Back').addEventListener('click', () => goToStep(1));
document.getElementById('step2Next').addEventListener('click', () => {
  if (validateStep2()) goToStep(3);
});

/* ── Step 3 wiring: Youth Bootcamp ───────────────────── */
const youthYes = document.getElementById('youthYes');
const youthNo = document.getElementById('youthNo');
const youthGroups = document.getElementById('youthGroups');
const youthCountEls = {
  1014: document.getElementById('val1014'),
  1417: document.getElementById('val1417'),
};

function renderYouthCounts() {
  youthCountEls[1014].textContent = String(state.youth1014);
  youthCountEls[1417].textContent = String(state.youth1417);
  document.getElementById('dec1014').disabled = state.youth1014 === 0;
  document.getElementById('dec1417').disabled = state.youth1417 === 0;
  document.getElementById('dec1014').closest('.youth-group-card').classList.toggle('youth-group-card--active', state.youth1014 > 0);
  document.getElementById('dec1417').closest('.youth-group-card').classList.toggle('youth-group-card--active', state.youth1417 > 0);
}

function setYouthAttendance(val) {
  state.youthAttendance = val;
  renderYouthStep();
  document.getElementById('youthErr').textContent = '';
  if (val !== 'yes') {
    state.youth1014 = 0;
    state.youth1417 = 0;
    renderYouthCounts();
  }
}

function renderYouthStep() {
  const val = state.youthAttendance;
  youthYes.checked = val === 'yes';
  youthNo.checked = val === 'no';
  youthGroups.hidden = val !== 'yes';
  renderYouthCounts();
}

function adjustYouthCount(group, delta) {
  if (state.youthAttendance !== 'yes') return;
  const key = group === 1014 ? 'youth1014' : 'youth1417';
  state[key] = Math.max(0, state[key] + delta);
  renderYouthCounts();
}

[youthYes, youthNo].forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) setYouthAttendance(radio.value);
  });
});

document.getElementById('dec1014').addEventListener('click', () => adjustYouthCount(1014, -1));
document.getElementById('inc1014').addEventListener('click', () => adjustYouthCount(1014, 1));
document.getElementById('dec1417').addEventListener('click', () => adjustYouthCount(1417, -1));
document.getElementById('inc1417').addEventListener('click', () => adjustYouthCount(1417, 1));

document.getElementById('step3Back').addEventListener('click', () => goToStep(state.isMember ? 2 : 1));
document.getElementById('step3Next').addEventListener('click', () => {
  if (validateStep3()) goToStep(4);
});

/* ── Step 6 wiring: Cleaning fee ─────────────────────── */
const cleaningToggle = document.getElementById('cleaningToggle');
const cleaningCard   = document.getElementById('cleaningCard');

function setCleaning(val) {
  state.cleaningAccepted = val;
  renderCleaningState();
  if (val) document.getElementById('cleaningErr').textContent = '';
}

function renderCleaningState() {
  const val = state.cleaningAccepted;
  cleaningToggle.setAttribute('aria-checked', String(val));
  cleaningCard.classList.toggle('addon-card--active', val);
}

cleaningToggle.addEventListener('click', () => setCleaning(!state.cleaningAccepted));
cleaningToggle.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setCleaning(!state.cleaningAccepted); }
});
cleaningCard.addEventListener('click', e => {
  if (!e.target.closest('.addon-toggle')) setCleaning(!state.cleaningAccepted);
});

document.getElementById('step7Back').addEventListener('click', () => goToStep(6));
document.getElementById('step7Next').addEventListener('click', () => {
  if (validateStep6()) goToStep(8);
});

/* ── Step 4 wiring: Workshop ─────────────────────────── */
const workshopToggle = document.getElementById('workshopToggle');
const workshopCard   = document.getElementById('workshopCard');

function updateWorkshopPricing() {
  document.getElementById('workshopPriceMember').hidden    = !state.isMember;
  document.getElementById('workshopPriceNonMember').hidden =  state.isMember;
  document.getElementById('workshopMemberBadge').hidden    = !state.isMember;
  renderWorkshopState();

  // Auto-enable workshop for members
  if (state.isMember && !state.workshop) setWorkshop(true);
}

function setWorkshop(val) {
  state.workshop = val;
  renderWorkshopState();
}

function renderWorkshopState() {
  const val = state.workshop;
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

document.getElementById('step4Back').addEventListener('click', () => goToStep(3));
document.getElementById('step4Next').addEventListener('click', () => goToStep(5));

/* ── Step 5 wiring: Lunch Package ────────────────────── */
const lunchCountEls = {
  nonVegan: document.getElementById('valLunchNonVegan'),
  vegan:    document.getElementById('valLunchVegan'),
};

function renderLunchStep() {
  lunchCountEls.nonVegan.textContent = String(state.lunchNonVegan);
  lunchCountEls.vegan.textContent    = String(state.lunchVegan);
  document.getElementById('decLunchNonVegan').disabled = state.lunchNonVegan === 0;
  document.getElementById('decLunchVegan').disabled    = state.lunchVegan === 0;
  document.getElementById('decLunchNonVegan').closest('.youth-group-card').classList.toggle('youth-group-card--active', state.lunchNonVegan > 0);
  document.getElementById('decLunchVegan').closest('.youth-group-card').classList.toggle('youth-group-card--active', state.lunchVegan > 0);
}

function adjustLunchCount(type, delta) {
  if (type === 'nonVegan') state.lunchNonVegan = Math.max(0, state.lunchNonVegan + delta);
  else                     state.lunchVegan    = Math.max(0, state.lunchVegan    + delta);
  renderLunchStep();
}

document.getElementById('decLunchNonVegan').addEventListener('click', () => adjustLunchCount('nonVegan', -1));
document.getElementById('incLunchNonVegan').addEventListener('click', () => adjustLunchCount('nonVegan',  1));
document.getElementById('decLunchVegan').addEventListener('click',    () => adjustLunchCount('vegan',    -1));
document.getElementById('incLunchVegan').addEventListener('click',    () => adjustLunchCount('vegan',     1));

document.getElementById('step5Back').addEventListener('click', () => goToStep(4));
document.getElementById('step5Next').addEventListener('click', () => goToStep(6));

/* ── Step 6: Donation ─────────────────────────────────── */
const donationInput = document.getElementById('donationAmount');

function updateDonationStep() {
  donationInput.value = state.donation > 0 ? state.donation : '';
  document.querySelectorAll('.donation-preset').forEach(btn => {
    btn.classList.toggle('donation-preset--active', Number(btn.dataset.amount) === state.donation);
  });
}

function setDonation(amount) {
  state.donation = amount;
  donationInput.value = amount > 0 ? amount : '';
  document.querySelectorAll('.donation-preset').forEach(btn => {
    btn.classList.toggle('donation-preset--active', Number(btn.dataset.amount) === amount);
  });
}

document.querySelectorAll('.donation-preset').forEach(btn => {
  btn.addEventListener('click', () => {
    const amount = Number(btn.dataset.amount);
    setDonation(state.donation === amount ? 0 : amount); // toggle off if already selected
  });
});

donationInput.addEventListener('input', () => {
  const val = parseFloat(donationInput.value);
  state.donation = (!isNaN(val) && val > 0) ? val : 0;
  document.querySelectorAll('.donation-preset').forEach(btn => {
    btn.classList.toggle('donation-preset--active', Number(btn.dataset.amount) === state.donation);
  });
});

document.getElementById('step6Back').addEventListener('click', () => goToStep(5));
document.getElementById('step6Next').addEventListener('click', () => goToStep(7));

/* ── Step 6: Summary ─────────────────────────────────── */
const ROLE_KEYS = {
  contestant:   'reg.role.contestant',
  general:      'reg.role.general',
  judge:        'reg.role.judge',
  technical:    'reg.role.technical',
  registration: 'reg.role.registration',
  photo:        'reg.role.photo',
  timekeeper:   'reg.role.timekeeper',
  eventSupport: 'reg.role.eventSupport',
};

function populateSummary() {
  document.getElementById('summaryName').textContent   = `${state.firstName} ${state.lastName}`;
  document.getElementById('summaryEmail').textContent  = state.email;
  document.getElementById('summaryStatus').textContent = state.isMember
    ? t('reg.summary.statusMember')
    : t('reg.summary.statusGuest');

  // Roles row
  const rolesRow = document.getElementById('summaryRolesRow');
  if (state.isMember && state.roles.length > 0) {
    rolesRow.hidden = false;
    document.getElementById('summaryRoles').textContent =
      state.roles.map(r => t(ROLE_KEYS[r] || r)).join(', ');
  } else {
    rolesRow.hidden = true;
  }

  document.getElementById('summaryYouth').textContent = state.youthAttendance === 'yes'
    ? `${t('reg.youth.summary1014')}: ${state.youth1014}, ${t('reg.youth.summary1417')}: ${state.youth1417}`
    : t('reg.youth.none');

  // Workshop rows
  const nonMemberRow  = document.getElementById('priceWorkshopRow');
  const memberRow     = document.getElementById('priceWorkshopMemberRow');
  const discountRow   = document.getElementById('priceDiscountRow');

  nonMemberRow.hidden  = !(state.workshop && !state.isMember);
  memberRow.hidden     = !(state.workshop && state.isMember);
  discountRow.hidden   = !(state.workshop && state.isMember);

  const donationRow = document.getElementById('priceDonationRow');
  donationRow.hidden = !(state.donation > 0);
  if (state.donation > 0) {
    document.getElementById('priceDonationAmount').textContent = `+€${state.donation.toFixed(2)}`;
  }

  const lunchCount = state.lunchNonVegan + state.lunchVegan;
  const lunchRow = document.getElementById('priceLunchRow');
  lunchRow.hidden = lunchCount === 0;
  if (lunchCount > 0) {
    document.getElementById('priceLunchAmount').textContent = `+€${(lunchCount * PRICES.lunch).toFixed(2)}`;
  }

  document.getElementById('priceTotal').textContent = `€${calcTotal().toFixed(2)}`;

  const btn = document.getElementById('step8Confirm');
  btn.disabled = false;
  btn.textContent = `${t('reg.confirm')} — €${calcTotal().toFixed(2)}`;
}

document.getElementById('step8Back').addEventListener('click', () => goToStep(7));
document.getElementById('step8Confirm').addEventListener('click', async () => {
  if (!state.ref) state.ref = generateRef();
  await initiatePayment();
});

/* ── Step 7: Confirmation ────────────────────────────── */
function populateConfirmation() {
  document.getElementById('confirmName').textContent  = `${state.firstName} ${state.lastName}`;
  document.getElementById('confirmTotal').textContent = `€${calcTotal().toFixed(2)}`;
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


/* ── Sticky nav ───────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Init ─────────────────────────────────────────────── */
applyLang(currentLang);
if (!handlePaymentReturn()) goToStep(1);
