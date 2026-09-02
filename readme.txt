╔══════════════════════════════════════════════════════╗
║     Gayalan & Induja — Wedding Invitation Project    ║
║               October 25, 2026                       ║
╚══════════════════════════════════════════════════════╝

🌐 LIVE SITE
─────────────────────────────────────────────
https://www.gayalan-weds-induja.site
(also reachable at https://gayalan-induja-wedding-invitation-u.vercel.app)

Hosted on Vercel, auto-deploying from this GitHub repo on every push to main:
https://github.com/GayalanK/gayalan-induja-wedding-invitation


📁 PROJECT STRUCTURE
─────────────────────────────────────────────
gayalan-induja-wedding-invitation/
│
├── index.html                       ← Main invitation page (all markup)
├── styles.css                       ← All styling
├── script.js                        ← All interactivity (splash, countdown,
│                                        RSVP, wishbook, music, calendar)
├── manifest.json                    ← PWA metadata (name, theme color, icon)
│
├── assets/
│   ├── favicon.png                  ← Browser tab icon
│   ├── og-cover.jpg                 ← Link preview image (WhatsApp/Facebook)
│   ├── ganesha-splash.png           ← Faint Ganesha watermark on splash screen
│   ├── wedding-music.mp3            ← Background music (64kbps mono, ~950KB,
│   │                                    only downloads when the music button
│   │                                    is tapped — not automatically)
│   ├── preshoot/
│   │   ├── capture_1.jpg            ← Pre-shoot gallery photo
│   │   ├── capture_2.jpg            ← Pre-shoot gallery photo
│   │   ├── capture_3.jpg            ← Pre-shoot gallery photo
│   │   └── put_photos_here.txt      ← Instructions
│   ├── story/                       ← NOT currently used — the "Our Story"
│   │   │                               section was removed from the site.
│   │   │                               These photos are just sitting here
│   │   │                               unused; safe to delete or repurpose.
│   │   ├── story_1.jpg
│   │   ├── story_2.jpg
│   │   ├── story_3.jpg
│   │   └── put_photos_here.txt
│   └── venue/
│       └── put_photos_here.txt      ← Optional extra venue photos (none
│                                        added — the live Google Maps embed
│                                        is used instead)
│
└── rsvp-data/
    ├── google-apps-script.gs        ← Backend code — paste this into your
    │                                    Google Sheet's Apps Script editor
    ├── rsvp-setup.md                ← Step-by-step backend setup guide
    └── rsvp-manager.html            ← Optional offline/local guest-list
                                         viewer (not connected to the live
                                         site — separate manual tool)


✅ CURRENT STATUS — WHAT'S LIVE AND WORKING
─────────────────────────────────────────────
• RSVP: guests enter their WhatsApp number, get greeted by name if they're
  on the pre-filled guest list, and tap Yes/No. Numbers not on the list are
  self-registered (asks for a name, adds them to the sheet automatically).
  Guests who already responded see a "Welcome back" screen with their
  answer, and can change it.
  → Backend: a Google Sheet + Google Apps Script Web App. Fully working as
    of the last deployment — see rsvp-data/rsvp-setup.md if you ever need
    to redeploy or troubleshoot it.

• Guest Wishbook: guests can leave a name + short message, shown publicly
  on the site. Uses a second tab ("Wishes") in the same Google Sheet.

• Countdown, "Add to Calendar" button, and .ics download all correctly
  target the real ceremony start time: Sunday, Oct 25, 2026, 8:00 AM SLT.

• Wedding agenda: 13 ceremony items, bilingual Tamil/English, starting with
  Ganesh Prayer at 8:00 AM and ending with Leaving the Hall at 3:30 PM.

• Hero section includes a parents' blessing line:
    "Son of Ramakrishanan & Jothikala"
    "Daughter of the late Sadasivam & Vijayalatchumi"

• Venue section uses a live Google Maps embed for Kings Gardens Banquet
  Hall, plus a note on dress code (Formal / Traditional Attire) and
  on-site parking availability.

• Pre-shoot gallery shows 3 real photos (assets/preshoot/).


⚠️ SHEET SETUP NOTE — IMPORTANT IF YOU EVER REBUILD THE BACKEND
─────────────────────────────────────────────
The backend reads your Google Sheet's "Guests" tab by fixed COLUMN
POSITION, not by matching header text. That means your header row can
say anything you like (e.g. "Guest Name", "WhatsApp Number") — it only
matters that the column ORDER is:

    Column A: Name  |  B: Phone  |  C: Side  |  D: Status  |  E: RespondedAt

Getting this order wrong (or pasting an old version of
google-apps-script.gs that matches headers by text instead of position)
has caused real RSVP failures before — if RSVP ever breaks again, check
this first.

Also: after ANY edit to google-apps-script.gs, you must redeploy via
Deploy → Manage deployments → ✏️ (edit) → "New version" → Deploy.
Editing the code alone does NOT update the live URL.


🖼️ HOW TO ADD MORE PHOTOS
─────────────────────────────────────────────
1. Name your photos exactly: capture_1.jpg, capture_2.jpg, capture_3.jpg
2. Drop them into assets/preshoot/, replacing the existing files
3. Commit and push — Vercel redeploys automatically within a minute or two

IMAGE TIPS:
  • Best ratio: 4:5 portrait
  • Keep each photo under ~200KB for fast loading (resize + compress first)


🎵 MUSIC
─────────────────────────────────────────────
assets/wedding-music.mp3 is already in place (compressed to 64kbps mono,
~950KB). It only loads when a visitor taps the music button — it does
NOT auto-download or auto-play on entry, to keep the site light for
guests on limited mobile data.

To replace it: keep the same filename (wedding-music.mp3) and drop a new
file into assets/ — no code changes needed.


📋 RSVP BACKEND — IF YOU NEED TO TOUCH IT AGAIN
─────────────────────────────────────────────
Full walkthrough: rsvp-data/rsvp-setup.md

Quick reference:
  1. Google Sheet has two tabs: "Guests" and "Wishes"
  2. Backend code lives in rsvp-data/google-apps-script.gs — this is also
     what should be pasted into Extensions → Apps Script on the Sheet
  3. Current live deployment URL is set in script.js as RSVP_API_URL
     (near the top of the file)
  4. Any code change requires a fresh "New version" deploy (see warning
     above) for it to actually take effect on the live site


🌐 HOSTING & DOMAIN
─────────────────────────────────────────────
• Code lives on GitHub: github.com/GayalanK/gayalan-induja-wedding-invitation
• Hosted on Vercel, auto-deploys on every push to the main branch
• Custom domain: gayalan-weds-induja.site (bought on Namecheap), DNS
  pointed at Vercel via an A record (@) and CNAME record (www)
• canonical / Open Graph tags in index.html point at the custom domain,
  so WhatsApp/Facebook link previews use the right URL and image


📞 CONTACT
─────────────────────────────────────────────
Developer WhatsApp: +94 76 922 7405
