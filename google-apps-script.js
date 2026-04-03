// Division D Conference 2026 — Registration receiver + Stripe Checkout
// Paste this into Google Apps Script (Extensions → Apps Script)
// Deploy → Manage deployments → New version (URL stays the same)
//
// ── SECRET KEY ────────────────────────────────────────────────────────────
// Project Settings (⚙) → Script Properties → STRIPE_SECRET_KEY = sk_live_...
// ─────────────────────────────────────────────────────────────────────────

const STRIPE_SECRET_KEY = PropertiesService.getScriptProperties().getProperty('STRIPE_SECRET_KEY');
const SHEET_NAME        = 'Division D Conference Registration';
const SUCCESS_URL       = 'https://toastmasters-bayern.com/registration.html?success=1&session_id={CHECKOUT_SESSION_ID}';
const CANCEL_URL        = 'https://toastmasters-bayern.com/registration.html?cancelled=1';

// Prices in euro cents
const PRICE_CLEANING = 525;   // €5.25
const PRICE_WORKSHOP = 1000;  // €10.00
const PRICE_LUNCH    = 1500;  // €15.00 per package

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // ── 1. Write to Sheet ────────────────────────────────────────────────
  const ss    = SpreadsheetApp.openById('1KePmBJx2AWMrycSn1nWtWwnOtMX6wkse-jGVvMFVNHs');
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'Booking Ref', 'First Name', 'Last Name', 'Email',
      'Club', 'Member', 'Roles', 'Workshop',
      'Youth (10–14)', 'Youth (14–17)',
      'Lunch (Non-vegan)', 'Lunch (Vegan)',
      'Donation (€)', 'Total (€)',
      'Language', 'Payment Status', 'Stripe Session ID',
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 18).setFontWeight('bold');
    sheet.getRange(1, 1, 1, 18).setBackground('#004165');
    sheet.getRange(1, 1, 1, 18).setFontColor('#F2DF74');
  }

  const lunchNonVegan = parseInt(data.lunchNonVegan) || 0;
  const lunchVegan    = parseInt(data.lunchVegan)    || 0;
  const donation      = parseFloat(data.donation)    || 0;

  sheet.appendRow([
    new Date().toISOString(),
    data.bookingRef       || '',
    data.firstName        || '',
    data.lastName         || '',
    data.email            || '',
    data.club             || '',
    data.member           ? 'Yes' : 'No',
    data.roles            || '',
    data.workshop         ? 'Yes' : 'No',
    data.youth1014        || 0,
    data.youth1417        || 0,
    lunchNonVegan,
    lunchVegan,
    donation,
    data.total            || 0,
    data.lang             || 'en',
    'PENDING',
    '', // Stripe Session ID — filled in after checkout session is created
  ]);

  // ── 2. Build Stripe line items ───────────────────────────────────────
  const payload = {
    'payment_method_types[0]':            'card',
    'payment_intent_data[receipt_email]': data.email,
    'mode':                               'payment',
    'client_reference_id':                data.bookingRef,
    'customer_email':                     data.email,
    'success_url':                        SUCCESS_URL,
    'cancel_url':                         CANCEL_URL,
    'metadata[booking_ref]':              data.bookingRef || '',
    'metadata[name]':                     `${data.firstName} ${data.lastName}`,
    'metadata[member]':                   data.member   ? 'yes' : 'no',
    'metadata[roles]':                    data.roles    || '',
    'metadata[workshop]':                 data.workshop ? 'yes' : 'no',
    'metadata[youth_1014]':               String(data.youth1014 || 0),
    'metadata[youth_1417]':               String(data.youth1417 || 0),
    'metadata[lunch_non_vegan]':          String(lunchNonVegan),
    'metadata[lunch_vegan]':              String(lunchVegan),
    'metadata[donation]':                 String(donation),
    'metadata[total]':                    String(data.total || 0),
  };

  let idx = 0;

  // Cleaning fee (always)
  payload[`line_items[${idx}][price_data][currency]`]             = 'eur';
  payload[`line_items[${idx}][price_data][product_data][name]`]   = 'Venue Cleaning Fee';
  payload[`line_items[${idx}][price_data][unit_amount]`]          = String(PRICE_CLEANING);
  payload[`line_items[${idx}][quantity]`]                         = '1';
  idx++;

  // Workshop (non-members only)
  if (data.workshop && !data.member) {
    payload[`line_items[${idx}][price_data][currency]`]           = 'eur';
    payload[`line_items[${idx}][price_data][product_data][name]`] = 'Workshop Pass';
    payload[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_WORKSHOP);
    payload[`line_items[${idx}][quantity]`]                       = '1';
    idx++;
  }

  // Lunch — non-vegan
  if (lunchNonVegan > 0) {
    payload[`line_items[${idx}][price_data][currency]`]           = 'eur';
    payload[`line_items[${idx}][price_data][product_data][name]`] = 'Lunch Package — Non-vegan';
    payload[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_LUNCH);
    payload[`line_items[${idx}][quantity]`]                       = String(lunchNonVegan);
    idx++;
  }

  // Lunch — vegan
  if (lunchVegan > 0) {
    payload[`line_items[${idx}][price_data][currency]`]           = 'eur';
    payload[`line_items[${idx}][price_data][product_data][name]`] = 'Lunch Package — Vegan';
    payload[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_LUNCH);
    payload[`line_items[${idx}][quantity]`]                       = String(lunchVegan);
    idx++;
  }

  // Voluntary donation
  if (donation > 0) {
    payload[`line_items[${idx}][price_data][currency]`]           = 'eur';
    payload[`line_items[${idx}][price_data][product_data][name]`] = 'Voluntary Donation';
    payload[`line_items[${idx}][price_data][unit_amount]`]        = String(Math.round(donation * 100));
    payload[`line_items[${idx}][quantity]`]                       = '1';
  }

  // ── 3. Create Stripe Checkout Session ────────────────────────────────
  const resp = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions', {
    method:             'post',
    headers:            { 'Authorization': 'Bearer ' + STRIPE_SECRET_KEY },
    payload:            payload,
    muteHttpExceptions: true,
  });

  const session = JSON.parse(resp.getContentText());

  if (session.url) {
    // Write Stripe session ID into the last row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 18).setValue(session.id);
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      ok:          !!session.url,
      checkoutUrl: session.url  || null,
      error:       session.error ? session.error.message : null,
    }))
    .setMimeType(ContentService.MimeType.JSON);
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
