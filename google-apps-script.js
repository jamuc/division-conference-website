// Division D Conference 2026 — Registration receiver
// Paste this into Google Apps Script (Extensions → Apps Script)
// Then: Deploy → New deployment → Web app → Anyone → Deploy
// Copy the Web App URL into register.js (APPS_SCRIPT_URL constant)

const SHEET_ID = '15sYa3LcZ_1HE3MVHelCmVbW-4zyemwoscfZFwODNhOg';
const SHEET_NAME = 'Registrations';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);

    // Create sheet if it doesn't exist
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'First Name', 'Last Name', 'Email',
        'TM Member', 'Club', 'Role', 'Workshop', 'Total (€)', 'Language', 'Ref'
      ]);
      // Style header row
      const header = sheet.getRange(1, 1, 1, 11);
      header.setFontWeight('bold');
      header.setBackground('#004165');
      header.setFontColor('#F2DF74');
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.firstName   || '',
      data.lastName    || '',
      data.email       || '',
      data.isMember    ? 'Yes' : 'No',
      data.club        || '',
      data.role        || '',
      data.workshop    ? 'Yes' : 'No',
      data.total       || 0,
      data.lang        || 'en',
      data.ref         || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', ref: data.ref }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually to verify the sheet is reachable
function testWrite() {
  doPost({ postData: { contents: JSON.stringify({
    firstName: 'Test', lastName: 'User', email: 'test@test.com',
    isMember: true, club: 'Munich TM', role: 'Audience',
    workshop: true, total: 15, lang: 'en', ref: 'TEST-001'
  })}});
}
