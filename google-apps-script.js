// Division D Conference 2026 — Registration receiver + Stripe Checkout
// Paste this into Google Apps Script (Extensions → Apps Script)
// Then: Deploy → New deployment → Web app → Anyone → Deploy
// Copy the Web App URL into register.js (APPS_SCRIPT_URL constant)
//
// ── SECRET KEY SETUP ──────────────────────────────────────────────────────
// Before deploying, add your Stripe secret key via:
//   Project Settings (⚙) → Script Properties → Add property
//   Name: STRIPE_SECRET_KEY   Value: sk_test_51TDjKJ...
// Never hardcode the secret key in this file.
// ─────────────────────────────────────────────────────────────────────────

const SHEET_ID   = '15sYa3LcZ_1HE3MVHelCmVbW-4zyemwoscfZFwODNhOg';
const SHEET_NAME = 'Registrations';

const SUCCESS_URL = 'https://toastmasters-bayern.com/registration.html?success=true&session_id={CHECKOUT_SESSION_ID}';
const CANCEL_URL  = 'https://toastmasters-bayern.com/registration.html?cancelled=true';

// Prices in euro cents
const PRICE_CLEANING  = 525;   // €5.25
const PRICE_WORKSHOP  = 1000;  // €10.00

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // ── 1. Save to Google Sheet ──────────────────────────────────────────
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Ref', 'First Name', 'Last Name', 'Email',
        'TM Member', 'Club', 'Workshop', 'Total (€)', 'Language', 'Stripe Session'
      ]);
      const header = sheet.getRange(1, 1, 1, 11);
      header.setFontWeight('bold');
      header.setBackground('#004165');
      header.setFontColor('#F2DF74');
    }

    // ── 2. Create Stripe Checkout session ────────────────────────────────
    const secretKey = PropertiesService.getScriptProperties().getProperty('STRIPE_SECRET_KEY');
    if (!secretKey) throw new Error('STRIPE_SECRET_KEY not set in Script Properties.');

    const lineItems = {};

    // Line item 0: cleaning fee (always)
    lineItems['line_items[0][price_data][currency]']              = 'eur';
    lineItems['line_items[0][price_data][product_data][name]']    = 'Venue Cleaning Fee';
    lineItems['line_items[0][price_data][unit_amount]']           = String(PRICE_CLEANING);
    lineItems['line_items[0][quantity]']                          = '1';

    // Line item 1: workshop (non-members only — members get it free)
    let nextItem = 1;
    if (data.workshop && !data.member) {
      lineItems[`line_items[${nextItem}][price_data][currency]`]            = 'eur';
      lineItems[`line_items[${nextItem}][price_data][product_data][name]`]  = 'Workshop Package';
      lineItems[`line_items[${nextItem}][price_data][unit_amount]`]         = String(PRICE_WORKSHOP);
      lineItems[`line_items[${nextItem}][quantity]`]                        = '1';
      nextItem++;
    }

    // Line item 2: voluntary donation (if provided)
    if (data.donation && data.donation > 0) {
      const donationCents = Math.round(data.donation * 100);
      lineItems[`line_items[${nextItem}][price_data][currency]`]            = 'eur';
      lineItems[`line_items[${nextItem}][price_data][product_data][name]`]  = 'Voluntary Donation';
      lineItems[`line_items[${nextItem}][price_data][unit_amount]`]         = String(donationCents);
      lineItems[`line_items[${nextItem}][quantity]`]                        = '1';
    }

    const payload = {
      mode:             'payment',
      customer_email:   data.email,
      success_url:      SUCCESS_URL,
      cancel_url:       CANCEL_URL,
      'metadata[bookingRef]':  data.bookingRef  || '',
      'metadata[firstName]':   data.firstName   || '',
      'metadata[lastName]':    data.lastName    || '',
      'metadata[member]':      data.member ? 'true' : 'false',
      'metadata[workshop]':    data.workshop ? 'true' : 'false',
      'metadata[donation]':    String(data.donation || 0),
      ...lineItems,
    };

    const stripeRes = UrlFetchApp.fetch('https://api.stripe.com/v1/checkout/sessions', {
      method:  'post',
      headers: { 'Authorization': 'Bearer ' + secretKey },
      payload: payload,
    });

    const session = JSON.parse(stripeRes.getContentText());
    if (!session.url) throw new Error(session.error?.message || 'No session URL returned');

    // ── 3. Log to sheet (include Stripe session ID) ──────────────────────
    sheet.appendRow([
      new Date().toISOString(),
      data.bookingRef  || '',
      data.firstName   || '',
      data.lastName    || '',
      data.email       || '',
      data.member      ? 'Yes' : 'No',
      data.club        || '',
      data.workshop    ? 'Yes' : 'No',
      data.total       || 0,
      data.lang        || 'en',
      session.id       || '',
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
    bookingRef: 'TEST-001',
    firstName:  'Test',
    lastName:   'User',
    email:      'test@example.com',
    member:     true,
    club:       'Munich TM',
    workshop:   true,
    total:      5.25,
    lang:       'en',
  })}});
}
