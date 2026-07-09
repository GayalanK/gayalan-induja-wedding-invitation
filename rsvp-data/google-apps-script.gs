/**
 * Gayalan & Induja — Wedding RSVP Backend
 * ──────────────────────────────────────────────────────────
 * This script turns a Google Sheet into a free, no-server "database"
 * for the RSVP form on index.html.
 *
 * SETUP — see RSVP-SETUP.md for full step-by-step instructions with screenshots.
 * Quick version:
 *   1. Create a new Google Sheet. Name the first tab "Guests".
 *   2. Row 1 headers (exactly, in this order):
 *      Name | Phone | Side | Status | RespondedAt
 *   3. Add your guest list below the header (Status = "pending" for everyone to start).
 *   4. Extensions → Apps Script. Delete the placeholder code and paste this whole file in.
 *   5. Click Deploy → New deployment → type: "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   6. Copy the Web App URL it gives you.
 *   7. Paste that URL into index.html, replacing PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
 *      (search for RSVP_API_URL near the bottom of the file).
 *
 * Phone numbers are matched after stripping spaces/dashes/+94, so guests can type
 * their number in any common format (07X XXX XXXX, +94 7X XXX XXXX, 947XXXXXXXX).
 */

const SHEET_NAME = 'Guests';

function normalize_(phone) {
  let p = String(phone).replace(/[^0-9]/g, '');
  if (p.startsWith('94')) p = '0' + p.slice(2);
  if (p.length === 9) p = '0' + p; // handles numbers typed without the leading 0
  return p;
}

function getSheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function readGuests_() {
  const sheet = getSheet_();
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift().map(h => String(h).trim().toLowerCase());
  return rows.map((row, i) => {
    const obj = { _row: i + 2 }; // +2 because header is row 1, data starts row 2
    headers.forEach((h, idx) => obj[h] = row[idx]);
    return obj;
  }).filter(g => g.phone); // skip blank rows
}

// Handles GET requests, e.g. ?action=check&phone=0771234567
function doGet(e) {
  const action = e.parameter.action;
  if (action === 'check') {
    return checkGuest_(e.parameter.phone);
  }
  return jsonResponse_({ success: false, message: 'Unknown action.' });
}

// Handles POST requests for updating status (uses POST so it's a write action)
function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse_({ success: false, message: 'Invalid request.' });
  }

  if (body.action === 'update') {
    return updateGuestStatus_(body.phone, body.status);
  }
  if (body.action === 'check') {
    return checkGuest_(body.phone);
  }
  return jsonResponse_({ success: false, message: 'Unknown action.' });
}

function checkGuest_(rawPhone) {
  const target = normalize_(rawPhone);
  const guests = readGuests_();
  const match = guests.find(g => normalize_(g.phone) === target);

  if (!match) {
    return jsonResponse_({ success: false, message: 'We could not find an invitation under that number. Please check it, or WhatsApp us.' });
  }
  return jsonResponse_({
    success: true,
    guest: {
      name: match.name,
      status: String(match.status || 'pending').toLowerCase()
    }
  });
}

function updateGuestStatus_(rawPhone, status) {
  if (status !== 'accepted' && status !== 'declined') {
    return jsonResponse_({ success: false, message: 'Invalid status.' });
  }
  const target = normalize_(rawPhone);
  const sheet = getSheet_();
  const guests = readGuests_();
  const match = guests.find(g => normalize_(g.phone) === target);

  if (!match) {
    return jsonResponse_({ success: false, message: 'Guest not found.' });
  }

  // Column order must match the header row: Name, Phone, Side, Status, RespondedAt
  sheet.getRange(match._row, 4).setValue(status); // Status column
  sheet.getRange(match._row, 5).setValue(new Date()); // RespondedAt column

  return jsonResponse_({ success: true });
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
