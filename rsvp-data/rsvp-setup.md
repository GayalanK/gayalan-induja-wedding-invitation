RSVP SETUP — Connecting the website to a Google Sheet
══════════════════════════════════════════════════════
This takes about 10 minutes and is completely free. No coding
experience needed — just follow each step in order.

When you're done, every guest who RSVPs on the website will show
up live in a Google Sheet you can open anytime, on your phone or
computer.


STEP 1 — Create the Sheet
─────────────────────────────────────────────
1. Go to https://sheets.google.com and create a new blank sheet.
2. Rename it to something like "Gayalan Induja RSVP".
3. Rename "Sheet1" (bottom tab) to exactly:  Guests
4. In row 1, type these column headers exactly, one per cell:
     A1: Name
     B1: Phone
     C1: Side
     D1: Status
     E1: RespondedAt
5. Starting from row 2, list your guests. Example:

     Name              Phone         Side           Status    RespondedAt
     Priya Suresh      0771234567    Bride's Side   pending
     Rajan Navaratnam  0762345678    Groom's Side    pending

   Leave "Status" as "pending" for everyone — it updates automatically
   once a guest responds.


STEP 2 — Add the Script
─────────────────────────────────────────────
1. In your Sheet, click Extensions → Apps Script.
2. You'll see a code editor with a file called Code.gs containing
   some placeholder text — select all of it and delete it.
3. Open the file "google-apps-script.gs" (included in this folder),
   copy everything in it, and paste it into the empty Apps Script editor.
4. Click the floppy-disk save icon (or press Ctrl/Cmd + S).


STEP 3 — Deploy it as a Web App
─────────────────────────────────────────────
1. Click the blue "Deploy" button (top right) → "New deployment".
2. Click the gear icon next to "Select type" → choose "Web app".
3. Fill in:
     Description:       RSVP backend
     Execute as:         Me
     Who has access:     Anyone
4. Click "Deploy".
5. The first time, Google will ask you to authorize the script —
   click through "Advanced" → "Go to [project name] (unsafe)" if
   you see a warning screen. This warning appears because it's
   your own personal script, not because anything is wrong.
6. Copy the "Web app URL" shown after deployment. It looks like:
     https://script.google.com/macros/s/XXXXXXXXXXXX/exec


STEP 4 — Connect the website
─────────────────────────────────────────────
1. Open index.html in any text editor (Notepad, TextEdit, VS Code).
2. Search for this line (near the bottom, inside the <script> tag):
     const RSVP_API_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
3. Replace the placeholder text between the quotes with the Web App
   URL you copied in Step 3. It should look like:
     const RSVP_API_URL = 'https://script.google.com/macros/s/XXXXXXXXXXXX/exec';
4. Save the file.

That's it — open index.html, scroll to the RSVP section, and try
entering one of the phone numbers from your Sheet to test it.


HOW IT WORKS DAY-TO-DAY
─────────────────────────────────────────────
• Guests enter their number → the site checks your Sheet for a match.
• They tap Accept or Decline → the Sheet updates instantly (Status
  and RespondedAt columns).
• You can open the Sheet anytime on your phone to see live responses
  — no need to touch the admin panel unless you prefer its nicer
  table view, search, and one-click Excel export (see rsvp-manager.html).


GUEST WISHBOOK SETUP (optional, uses the same Sheet + script)
─────────────────────────────────────────────
The invitation site now has a "Guest Wishbook" where visitors can leave
a short message. It reuses the same backend — no separate setup needed
beyond one extra tab:

1. In the same Google Sheet, add a new tab (bottom "+") named exactly: Wishes
2. Row 1 headers, exactly:
     A1: Name
     B1: Message
     C1: SubmittedAt
3. Re-paste the updated google-apps-script.gs into Extensions → Apps Script
   (it now includes the wishbook functions), save, then:
   Deploy → Manage deployments → edit (pencil icon) → New version → Deploy.
4. That's it — no changes needed in index.html, it already points at the
   same RSVP_API_URL. Guests can now leave and read wishes on the site.


IF SOMETHING GOES WRONG
─────────────────────────────────────────────
• "RSVP system is being set up" message on the site → the URL in
  index.html wasn't replaced correctly. Re-check Step 4.
• A guest's number isn't found → check for typos in the Phone column
  in your Sheet. The system accepts 07X XXX XXXX, +94 7X XXX XXXX,
  and 947XXXXXXXX formats interchangeably, so formatting isn't usually
  the issue — a wrong digit is the most common cause.
• Need to re-deploy after editing the script → Deploy → Manage
  deployments → edit (pencil icon) → New version → Deploy.

For any trouble, the developer contact is at the bottom of README.txt.
