// Division D Conference 2026 — Registration receiver + Stripe Checkout
// Paste this into Google Apps Script (Extensions → Apps Script)
// Deploy → Manage deployments → New version (URL stays the same)
//
// ── SECRET KEY ────────────────────────────────────────────────────────────
// Project Settings (⚙) → Script Properties → STRIPE_SECRET_KEY = sk_live_...
// ─────────────────────────────────────────────────────────────────────────
//
// ── HOW IT WORKS ────────────────────────────────────────────────────────
// 1. Form POST → handleRegistration(): creates Stripe session, writes
//    the registration row immediately with status "PENDING".
// 2. After payment, the browser redirects back with ?success=1.
//    The frontend POSTs { action: "confirmPayment" } → updates the row
//    from "PENDING" to "PAID".
// No Stripe webhook required.
// ─────────────────────────────────────────────────────────────────────────

const STRIPE_SECRET_KEY = PropertiesService.getScriptProperties().getProperty('STRIPE_SECRET_KEY');
const SHEET_NAME        = 'Division D Conference Registration';
const SUCCESS_URL       = 'https://toastmasters-bayern.com/registration.html?success=1&session_id={CHECKOUT_SESSION_ID}';
const CANCEL_URL        = 'https://toastmasters-bayern.com/registration.html?cancelled=1';

// Prices in euro cents
const PRICE_CLEANING = 525;   // €5.25
const PRICE_WORKSHOP = 1000;  // €10.00
const PRICE_LUNCH    = 1500;  // €15.00 per package

const HEADERS = [
  'Timestamp', 'Booking Ref', 'First Name', 'Last Name', 'Email',
  'Club', 'Member', 'Roles', 'Workshop',
  'Youth (10–14)', 'Youth (14–17)',
  'Lunch – Spring Quinoa Bowl', 'Lunch – Hummus Beef Kofta', 'Lunch – Quinoa Sweet Potato',
  'Donation (€)', 'Total (€)',
  'Language', 'Payment Status', 'Stripe Session ID',
];

// ── Run this once manually to update headers on an existing sheet ─────────
function setupSheet() {
  const ss    = SpreadsheetApp.openById('1KePmBJx2AWMrycSn1nWtWwnOtMX6wkse-jGVvMFVNHs');
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  } else {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  sheet.setFrozenRows(1);
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#004165');
  headerRange.setFontColor('#F2DF74');
  SpreadsheetApp.flush();
  Logger.log('Headers updated on sheet: ' + SHEET_NAME);
}

// ── Route incoming POST ───────────────────────────────────────────────────
function doPost(e) {
  const body = JSON.parse(e.postData.contents);

  // Payment confirmation from frontend after Stripe redirect
  if (body.action === 'confirmPayment') {
    return handlePaymentConfirmation(body);
  }

  // Otherwise it's a registration form submission
  return handleRegistration(body);
}

// ── Step 1: receive form data, create Stripe session, park data ──────────
function handleRegistration(data) {
  const lunchSpring = parseInt(data.lunchSpring) || 0;
  const lunchHummus = parseInt(data.lunchHummus) || 0;
  const lunchSweet  = parseInt(data.lunchSweet)  || 0;
  const donation    = parseFloat(data.donation)  || 0;

  // ── Build Stripe line items ────────────────────────────────────────────
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
    'metadata[lunch_spring]':             String(lunchSpring),
    'metadata[lunch_hummus]':             String(lunchHummus),
    'metadata[lunch_sweet]':              String(lunchSweet),
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

  // Lunch — Spring Quinoa Bowl with Green Asparagus (vegan, GF)
  if (lunchSpring > 0) {
    payload[`line_items[${idx}][price_data][currency]`]           = 'eur';
    payload[`line_items[${idx}][price_data][product_data][name]`] = 'Lunch — Spring Quinoa Bowl with Green Asparagus';
    payload[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_LUNCH);
    payload[`line_items[${idx}][quantity]`]                       = String(lunchSpring);
    idx++;
  }

  // Lunch — Hummus Bowl with Beef Kofta
  if (lunchHummus > 0) {
    payload[`line_items[${idx}][price_data][currency]`]           = 'eur';
    payload[`line_items[${idx}][price_data][product_data][name]`] = 'Lunch — Hummus Bowl with Beef Kofta';
    payload[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_LUNCH);
    payload[`line_items[${idx}][quantity]`]                       = String(lunchHummus);
    idx++;
  }

  // Lunch — Quinoa Bowl with Sweet Potatoes (vegan, GF)
  if (lunchSweet > 0) {
    payload[`line_items[${idx}][price_data][currency]`]           = 'eur';
    payload[`line_items[${idx}][price_data][product_data][name]`] = 'Lunch — Quinoa Bowl with Sweet Potatoes';
    payload[`line_items[${idx}][price_data][unit_amount]`]        = String(PRICE_LUNCH);
    payload[`line_items[${idx}][quantity]`]                       = String(lunchSweet);
    idx++;
  }

  // Voluntary donation
  if (donation > 0) {
    payload[`line_items[${idx}][price_data][currency]`]           = 'eur';
    payload[`line_items[${idx}][price_data][product_data][name]`] = 'Voluntary Donation';
    payload[`line_items[${idx}][price_data][unit_amount]`]        = String(Math.round(donation * 100));
    payload[`line_items[${idx}][quantity]`]                       = '1';
  }

  // ── Create Stripe Checkout Session ─────────────────────────────────────
  const resp = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions', {
    method:             'post',
    headers:            { 'Authorization': 'Bearer ' + STRIPE_SECRET_KEY },
    payload:            payload,
    muteHttpExceptions: true,
  });

  const session = JSON.parse(resp.getContentText());

  if (session.url) {
    // Write registration to Google Sheet immediately with status "PENDING".
    // Status is updated to "PAID" when the frontend confirms after Stripe redirect.
    const ss    = SpreadsheetApp.openById('1KePmBJx2AWMrycSn1nWtWwnOtMX6wkse-jGVvMFVNHs');
    let sheet   = ss.getSheetByName(SHEET_NAME);
    if (!sheet) { setupSheet(); sheet = ss.getSheetByName(SHEET_NAME); }

    sheet.appendRow([
      new Date().toISOString(),
      data.bookingRef  || '',
      data.firstName   || '',
      data.lastName    || '',
      data.email       || '',
      data.club        || '',
      data.member      ? 'Yes' : 'No',
      data.roles       || '',
      data.workshop    ? 'Yes' : 'No',
      data.youth1014   || 0,
      data.youth1417   || 0,
      lunchSpring,
      lunchHummus,
      lunchSweet,
      donation,
      data.total       || 0,
      data.lang        || 'en',
      'PENDING',
      session.id,
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      ok:          !!session.url,
      checkoutUrl: session.url  || null,
      error:       session.error ? session.error.message : null,
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Step 2: frontend confirms payment after Stripe redirect ──────────────
function handlePaymentConfirmation(data) {
  const bookingRef = data.bookingRef;
  const sessionId  = data.sessionId;

  if (!bookingRef) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'missing bookingRef' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const ss    = SpreadsheetApp.openById('1KePmBJx2AWMrycSn1nWtWwnOtMX6wkse-jGVvMFVNHs');
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'sheet not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Find the row by bookingRef (column B = index 2)
  const dataRange = sheet.getDataRange();
  const values    = dataRange.getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === bookingRef) {
      // Column R (18) = Payment Status, Column S (19) = Stripe Session ID
      sheet.getRange(i + 1, 18).setValue('PAID');
      if (sessionId) {
        sheet.getRange(i + 1, 19).setValue(sessionId);
      }
      return ContentService
        .createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: 'booking not found' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Visitor counter — called via GET on each page load ────────────────────
function doGet() {
  const props   = PropertiesService.getScriptProperties();
  const current = parseInt(props.getProperty('VISITOR_COUNT') || '1011');
  const next    = current + 1;
  props.setProperty('VISITOR_COUNT', String(next));

  return ContentService
    .createTextOutput(JSON.stringify({ count: next }))
    .setMimeType(ContentService.MimeType.JSON);
}
