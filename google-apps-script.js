// Division D Conference 2026 — Registration receiver + Stripe Checkout
// Paste this into Google Apps Script (Extensions → Apps Script)
// Deploy → Manage deployments → New version (URL stays the same)
//
// ── SECRET KEY ────────────────────────────────────────────────────────────
// Project Settings (⚙) → Script Properties → STRIPE_SECRET_KEY = sk_live_...
// ─────────────────────────────────────────────────────────────────────────
//
// ── STRIPE WEBHOOK SETUP ─────────────────────────────────────────────────
// Stripe Dashboard → Developers → Webhooks → Add endpoint
//   URL:    <this Apps Script web app URL>
//   Events: checkout.session.completed
// Registrations are written to the sheet only after payment is confirmed.
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

  // Stripe webhooks carry a `type` field (e.g. "checkout.session.completed")
  if (body.type && body.data && body.data.object) {
    return handleStripeWebhook(body);
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
    // Park registration data in Script Properties until payment is confirmed.
    // Key: PENDING_<bookingRef>  — cleaned up after the webhook writes the row.
    PropertiesService.getScriptProperties().setProperty(
      'PENDING_' + data.bookingRef,
      JSON.stringify({
        bookingRef:  data.bookingRef  || '',
        firstName:   data.firstName   || '',
        lastName:    data.lastName    || '',
        email:       data.email       || '',
        club:        data.club        || '',
        member:      data.member      || false,
        roles:       data.roles       || '',
        workshop:    data.workshop    || false,
        youth1014:   data.youth1014   || 0,
        youth1417:   data.youth1417   || 0,
        lunchSpring: lunchSpring,
        lunchHummus: lunchHummus,
        lunchSweet:  lunchSweet,
        donation:    donation,
        total:       data.total       || 0,
        lang:        data.lang        || 'en',
        sessionId:   session.id,
      })
    );
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      ok:          !!session.url,
      checkoutUrl: session.url  || null,
      error:       session.error ? session.error.message : null,
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Step 2: Stripe webhook — write to sheet only after payment confirmed ──
function handleStripeWebhook(event) {
  // Only act on successful payments
  if (event.type !== 'checkout.session.completed') {
    return ContentService
      .createTextOutput(JSON.stringify({ received: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const session    = event.data.object;
  const bookingRef = session.client_reference_id;

  // Retrieve parked registration data
  const props      = PropertiesService.getScriptProperties();
  const pendingJson = props.getProperty('PENDING_' + bookingRef);

  if (!pendingJson) {
    Logger.log('Webhook received for unknown bookingRef: ' + bookingRef);
    return ContentService
      .createTextOutput(JSON.stringify({ received: true, warning: 'no pending data found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const reg = JSON.parse(pendingJson);

  // ── Write confirmed registration to sheet ─────────────────────────────
  const ss    = SpreadsheetApp.openById('1KePmBJx2AWMrycSn1nWtWwnOtMX6wkse-jGVvMFVNHs');
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) setupSheet();
  sheet = ss.getSheetByName(SHEET_NAME);

  sheet.appendRow([
    new Date().toISOString(),
    reg.bookingRef,
    reg.firstName,
    reg.lastName,
    reg.email,
    reg.club,
    reg.member    ? 'Yes' : 'No',
    reg.roles,
    reg.workshop  ? 'Yes' : 'No',
    reg.youth1014,
    reg.youth1417,
    reg.lunchSpring,
    reg.lunchHummus,
    reg.lunchSweet,
    reg.donation,
    reg.total,
    reg.lang,
    'PAID',
    session.id,   // Stripe Session ID
  ]);

  // Clean up parked data
  props.deleteProperty('PENDING_' + bookingRef);

  return ContentService
    .createTextOutput(JSON.stringify({ received: true }))
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
