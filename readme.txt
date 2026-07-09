╔══════════════════════════════════════════════════════╗
║     Gayalan & Induja — Wedding Invitation Project    ║
║               October 25, 2026                       ║
╚══════════════════════════════════════════════════════╝

📁 PROJECT STRUCTURE
─────────────────────────────────────────────
wedding-invitation/
│
├── index.html                       ← Main invitation page
│
├── assets/
│   ├── preshoot/
│   │   ├── PUT_PHOTOS_HERE.txt      ← Instructions
│   │   ├── capture_1.jpg            ← (add your own) Pre-shoot photo 1
│   │   ├── capture_2.jpg            ← (add your own) Pre-shoot photo 2
│   │   └── capture_3.jpg            ← (add your own) Pre-shoot photo 3
│   ├── venue/
│   │   ├── PUT_PHOTOS_HERE.txt      ← Instructions (optional folder)
│   │   ├── venue_1.jpg              ← (optional) extra venue photo
│   │   ├── venue_2.jpg              ← (optional) extra venue photo
│   │   └── venue_3.jpg              ← (optional) extra venue photo
│   ├── nadaswaram-bgm.mp3           ← (optional) your own Tamil wedding BGM
│   ├── favicon.png                  ← Browser tab icon (already created)
│   └── og-cover.jpg                 ← Link preview image (already created)
│
└── rsvp-data/
    ├── rsvp-manager.html            ← Local/offline RSVP admin panel
    ├── google-apps-script.gs        ← Backend code for the live RSVP form
    └── RSVP-SETUP.md                ← Step-by-step setup guide (start here!)


✨ WHAT CHANGED IN THIS UPGRADE
─────────────────────────────────────────────
• The live RSVP form on the website (the one guests use directly — "Find
  My Invitation" → Accept/Decline) is now wired up to a real backend: a
  free Google Sheet, via a small Google Apps Script. Previously this form
  pointed at URLs that didn't exist, so guest responses never reached you.
  → Setup takes ~10 minutes. See rsvp-data/RSVP-SETUP.md.

• The pre-shoot photo gallery now points to assets/preshoot/ and shows an
  elegant "Photo coming soon" placeholder until you add real files — so
  the page already looks complete today, and upgrades automatically the
  moment you drop photos in.

• The venue section now uses a live Google Maps embed AND a live Google
  Street View panel for 154 Mattakkuliya Church Rd — both pulled directly
  from Google in real time, so they're guaranteed accurate (no guessed or
  hotlinked photos that might show the wrong place).

• Removed a fake CSRF token that had no real backend to validate against.

• Added a proper link-preview image and browser tab icon, so the
  invitation looks polished the moment it's shared on WhatsApp.
  ⚠ After you host the site (see "HOW TO SHARE" below), open index.html
  and update the og:image line to your full hosted URL — e.g.
  https://gayalan-induja.netlify.app/assets/og-cover.jpg — otherwise
  WhatsApp/Facebook can't load the preview image.


🖼️ HOW TO ADD PRE-SHOOT PHOTOS
─────────────────────────────────────────────
1. Rename your pre-shoot photos to:
     capture_1.jpg
     capture_2.jpg
     capture_3.jpg

2. Drop them into assets/preshoot/

3. Open index.html in a browser, or just refresh if it's already
   hosted — photos appear automatically, replacing the placeholders.

IMAGE TIPS:
  • Best ratio: 4:5 portrait (e.g. 800×1000px)
  • Keep each photo under 500KB for fast loading
  • Free compression: https://squoosh.app


🎵 HOW TO ADD YOUR OWN BGM
─────────────────────────────────────────────
1. Get your Tamil wedding nadaswaram MP3.
2. Name it: nadaswaram-bgm.mp3
3. Drop it into the assets/ folder.
4. Open index.html and find the <audio id="weddingAudio"> tag near the
   bottom of the file — add this as the first <source> line inside it:
     <source src="assets/nadaswaram-bgm.mp3" type="audio/mpeg">
   (The site currently plays a public-domain nadaswaram track from
   archive.org as a placeholder, so music works even before you add yours.)


📋 RSVP — TWO PARTS THAT WORK TOGETHER
─────────────────────────────────────────────
1. THE LIVE FORM (on index.html itself)
   Guests enter their number, see their invitation, and tap Accept/Decline.
   This now saves straight to a Google Sheet you control.
   → One-time setup: open rsvp-data/RSVP-SETUP.md and follow the steps.

2. THE OFFLINE ADMIN PANEL (rsvp-data/rsvp-manager.html)
   A nicer table view for browsing, searching, and editing guests, plus
   one-click Excel export (4 sheets: All Guests / Accepted / Pending /
   Summary). This works entirely offline, stored only in your browser —
   handy as a backup tool or for guests who RSVP by phone/WhatsApp
   instead of using the website.
   • Open it in any browser
   • Add guests manually: name + WhatsApp number
   • Change status: Pending / Accepted / Declined
   • Click "Export Excel" → downloads .xlsx file
   • Export regularly as backup — this data lives only in this browser!


🌐 HOW TO SHARE THE INVITATION
─────────────────────────────────────────────
Option A — Free hosting (recommended):
  1. Go to https://netlify.com (free account)
  2. Drag the entire wedding-invitation/ folder
  3. Get a link like: https://gayalan-induja.netlify.app

Option B — WhatsApp sharing:
  Open index.html locally → share via WhatsApp Web

Option C — Your own server / cPanel:
  Upload entire folder via FTP to public_html/

Either way, complete the RSVP-SETUP.md steps BEFORE sharing the link
widely, so the first guests who RSVP aren't met with a "system is being
set up" message.


📞 CONTACT
─────────────────────────────────────────────
Developer WhatsApp: +94 76 922 7405
