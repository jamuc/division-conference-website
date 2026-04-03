// Division D Conference 2026 — Registration receiver + Stripe Checkout
// Paste this into Google Apps Script (Extensions → Apps Script)
// Then: Deploy → New deployment → Web app → Anyone → Deploy
// Copy the Web App URL into register.js (APPS_SCRIPT_URL constant)
//
// ── SECRET KEY SETUP ──────────────────────────────────────────────────────
// Before deploying, add your Stripe secret key via:
//   Project Settings (⚙) → Script Properties → Add property
//   Name: STRIPE_SECRET_KEY   Value: sk_live_...
// Never hardcode the secret key in this file.
// ─────────────────────────────────────────────────────────────────────────

const SHEET_ID   = '15sYa3LcZ_1HE3MVHelCmVbW-4zyemwoscfZFwODNhOg';
const SHEET_NAME = 'Registrations';

const SUCCESS_URL = 'https://toastmasters-bayern.com/registration.html?success=true&session_id={CHECKOUT_SESSION_ID}';
const CANCEL_URL  = 'https://toastmasters-bayern.com/registration.html?cancelled=true';

// Prices in euro cents
const PRICE_CLEANING  =  525;   // €5.25
const PRICE_WORKSHOP  = 1000;   // €10.00
const PRICE_LUNCH     = 1500;   // €15.00 per package

// Sheet columns (17 total)
const HEADERS = [
  'Timestamp', 'Ref', 'First Name', 'Last Name', 'Email',
  'TM Member', 'Club', 'Roles',
  'Workshop',
  'Youth (10–14)', 'Youth (14–17)',
  'Lunch (Non-vegan)', 'Lunch (Vegan)',
  'Donation (€)', 'Total (€)',
  'Language', 'Stripe Session',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // ── 1. Get or create Sheet ───────────────────────────────────────────
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      const header = sheet.getRange(1, 1, 1, HEADERS.length);
      header.setFontWeight('bold');
      header.setBackground('#004165');
      header.setFontColor('#F2DF74');
      sheet.setFrozenRows(1);
    }

    // ── 2. Build Stripe line items ───────────────────────────────────────
    const secretKey = PropertiesService.getScriptProperties().getProperty('STRIPE_SECRET_KEY');
    if (!secretKey) throw new Error('STRIPE_SECRET_KEY not set in Script Properties.');

    const lineItems = {};
    let idx = 0;

    // Venue cleaning fee (everyone)
    lineItems[`line_items[${idx}][price_data][currency]`]             = 'eur';
    lineItems[`line_items[${idx}][price_data][product_data][name]`]   = 'Venue Cleaning Fee';
    lineItems[`line_items[${idx}][price_data][unit_amount]`]          = String(PRICE_CLEANING);
    lineItems[`line_items[${idx}][quantity]`]                         = '1';
    idx++;

    // Workshop (non-members only — members get it free)
    if (data.workshop && !data.member) {
      lineItems[`line_items[${idx}][price_data][currency]`]           = 'eur';
      lineItems[`line_items[${idx}][price_data][product_data][name]`] = 'Workshop Pass';
      lineItems[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_WORKSHOP);
      lineItems[`line_items[${idx}][quantity]`]                       = '1';
      idx++;
    }

    // Lunch — non-vegan (if any)
    const lunchNonVegan = parseInt(data.lunchNonVegan) || 0;
    if (lunchNonVegan > 0) {
      lineItems[`line_items[${idx}][price_data][currency]`]           = 'eur';
      lineItems[`line_items[${idx}][price_data][product_data][name]`] = 'Lunch Package — Non-vegan';
      lineItems[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_LUNCH);
      lineItems[`line_items[${idx}][quantity]`]                       = String(lunchNonVegan);
      idx++;
    }

    // Lunch — vegan (if any)
    const lunchVegan = parseInt(data.lunchVegan) || 0;
    if (lunchVegan > 0) {
      lineItems[`line_items[${idx}][price_data][currency]`]           = 'eur';
      lineItems[`line_items[${idx}][price_data][product_data][name]`] = 'Lunch Package — Vegan';
      lineItems[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_LUNCH);
      lineItems[`line_items[${idx}][quantity]`]                       = String(lunchVegan);
      idx++;
    }

    // Voluntary donation (if provided)
    const donation = parseFloat(data.donation) || 0;
    if (donation > 0) {
      lineItems[`line_items[${idx}][price_data][currency]`]           = 'eur';
      lineItems[`line_items[${idx}][price_data][product_data][name]`] = 'Voluntary Donation';
      lineItems[`line_items[${idx}][price_data][unit_amount]`]        = String(Math.round(donation * 100));
      lineItems[`line_items[${idx}][quantity]`]                       = '1';
    }

    // ── 3. Create Stripe Checkout Session ────────────────────────────────
    const payload = {
      mode:           'payment',
      customer_email: data.email,
      success_url:    SUCCESS_URL,
      cancel_url:     CANCEL_URL,
      'payment_intent_data[receipt_email]': data.email,
      'metadata[bookingRef]':    data.bookingRef    || '',
      'metadata[firstName]':     data.firstName     || '',
      'metadata[lastName]':      data.lastName      || '',
      'metadata[member]':        data.member        ? 'true' : 'false',
      'metadata[club]':          data.club          || '',
      'metadata[roles]':         data.roles         || '',
      'metadata[workshop]':      data.workshop      ? 'true' : 'false',
      'metadata[youth1014]':     String(data.youth1014     || 0),
      'metadata[youth1417]':     String(data.youth1417     || 0),
      'metadata[lunchNonVegan]': String(lunchNonVegan),
      'metadata[lunchVegan]':    String(lunchVegan),
      'metadata[donation]':      String(donation),
      'metadata[total]':         String(data.total  || 0),
      ...lineItems,
    };

    const stripeRes = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions', {
      method:  'post',
      headers: { 'Authorization': 'Bearer ' + secretKey },
      payload: payload,
    });

    const session = JSON.parse(stripeRes.getContentText());
    if (!session.url) throw new Error(session.error?.message || 'No session URL returned');

    // ── 4. Log registration to Sheet ─────────────────────────────────────
    sheet.appendRow([
      new Date().toISOString(),
      data.bookingRef     || '',
      data.firstName      || '',
      data.lastName       || '',
      data.email          || '',
      data.member         ? 'Yes' : 'No',
      data.club           || '',
      data.roles          || '',
      data.workshop       ? 'Yes' : 'No',
      data.youth1014      || 0,
      data.youth1417      || 0,
      lunchNonVegan,
      lunchVegan,
      donation,
      data.total          || 0,
      data.lang           || 'en',
      session.id          || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ checkoutUrl: session.url }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run manually to verify Sheet + Stripe are reachable
function testCheckout() {
  doPost({ postData: { contents: JSON.stringify({
    bookingRef:    'TEST-001',
    firstName:     'Test',
    lastName:      'User',
    email:         'test@example.com',
    member:        true,
    club:          'Munich TM',
    roles:         'General Support',
    workshop:      true,
    youth1014:     1,
    youth1417:     0,
    lunchNonVegan: 2,
    lunchVegan:    1,
    donation:      10,
    total:         65.25,
    lang:          'en',
  })}});
}

// Visitor counter — called via GET on each page load
function doGet() {
  const props = PropertiesService.getScriptProperties();
  const current = parseInt(props.getProperty('VISITOR_COUNT') || '1011');
  const next = current + 1;
  props.setProperty('VISITOR_COUNT', String(next));

  return ContentService
    .createTextOutput(JSON.stringify({ count: next }))
    .setMimeType(ContentService.MimeType.JSON);
}
