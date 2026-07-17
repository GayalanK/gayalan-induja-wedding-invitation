/* ============================================================
   Gayalan & Induja — Wedding Invitation
   script.js — restores all interactivity for the site.
   ============================================================ */

/* ── RSVP / WISHBOOK BACKEND ──
   Connects to a free Google Sheet "database" via Google Apps Script.
   Setup instructions are in rsvp-data/rsvp-setup.md.
   IMPORTANT: the value below must be a deployed Apps Script Web App
   URL (starts with https://script.google.com/macros/.../exec) —
   NOT a normal Google Sheets link. Replace it with your real
   deployment URL once you've completed the setup steps. */
const RSVP_API_URL = 'https://script.google.com/macros/s/AKfycbw7_PeA0p4Xocej6HV49-0FEI21wq1ph23AQPL_tP2ViQTilM0Yqh0roMaY9AI-uWwIXg/exec';

function isConfigured() {
    return RSVP_API_URL && RSVP_API_URL.startsWith('https://script.google.com/');
}

let currentGuestPhone = '';
let currentGuestName = '';

document.addEventListener('DOMContentLoaded', () => {

    /* ══════════════ SPLASH SCREEN ══════════════ */
    const tapScreen = document.getElementById('tapScreen');
    const enterBtn = document.getElementById('enterBtn');
    const bgMusic = document.getElementById('bg-music');

    // Reveal the splash screen contents
    const splashTl = gsap.timeline();
    splashTl
        .to('.splash-om', { opacity: 1, duration: 1, ease: 'power2.out' }, 0.2)
        .to('.splash-subtitle', { opacity: 1, duration: 1, ease: 'power2.out' }, 0.5)
        .to('.initials-ring', { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.7)
        .to('.tap-btn', { opacity: 1, duration: 1, ease: 'power2.out' }, 1.2);

    function enterSite() {
        // Try to start background music (fails silently if no file / autoplay blocked)
        if (bgMusic) {
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => {
                const btn = document.getElementById('musicToggle');
                if (btn) btn.setAttribute('aria-pressed', 'true');
                const label = document.getElementById('music-label');
                if (label) label.textContent = 'Pause';
            }).catch(() => { /* autoplay blocked or file missing — ignore */ });
        }

        gsap.to(tapScreen, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                tapScreen.classList.add('hidden');
                document.body.style.overflow = '';
                revealHero();
            }
        });
    }

    if (enterBtn) {
        enterBtn.addEventListener('click', enterSite);
    }

    /* ══════════════ HERO ENTRANCE ══════════════ */
    function revealHero() {
        const heroTl = gsap.timeline();
        heroTl
            .to('.hero-om', { opacity: 1, duration: 0.8, ease: 'power2.out' })
            .to('.hero-blessed', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
            .to('.hero-divider', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
            .to('.hero-tagline', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
            .to('.hero-names', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.4')
            .to('.hero-date', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
            .to('.hero-venue', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
            .to('#countdown-wrap', { opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
            .to('.cal-add-wrap', { opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
            .to('.scroll-hint', { opacity: 1, duration: 1, ease: 'power2.inOut' }, '-=0.2');
    }

    /* ══════════════ SCROLL-TRIGGERED REVEALS ══════════════ */
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.tl-item').forEach((el) => {
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: 'top 85%' },
                opacity: 1, y: 0, duration: 0.9, ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.g-item').forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: { trigger: '.gallery-grid', start: 'top 80%' },
                opacity: 1, y: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.story-card').forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: { trigger: '.story-grid', start: 'top 80%' },
                opacity: 1, y: 0, duration: 0.9, delay: i * 0.15, ease: 'power3.out'
            });
        });

        const rsvpBox = document.querySelector('.rsvp-box');
        if (rsvpBox) {
            gsap.to(rsvpBox, {
                scrollTrigger: { trigger: rsvpBox, start: 'top 80%' },
                opacity: 1, scale: 1, duration: 1, ease: 'power3.out'
            });
        }
          gsap.to(el, {
          scrollTrigger: { trigger: '.venue-grid', start: 'top 80%' },
          opacity: 1, x: 0, duration: 0.9, delay: i * 0.15, ease: 'power3.out'
        // gsap.utils.toArray('.venue-map').forEach((el, i) => {
        //     gsap.to(el, {
        //         scrollTrigger: { trigger: '.venue-grid', start: 'top 80%' },
        //         opacity: 1, duration: 0.9, delay: i * 0.15, ease: 'power3.out'
            });
        });
    }

    /* ══════════════ COUNTDOWN ══════════════ */
    const weddingDate = new Date('2026-10-25T09:45:00+05:30').getTime();

    function updateCountdown() {
        const now = Date.now();
        const diff = weddingDate - now;

        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-minutes');
        if (!daysEl || !hoursEl || !minsEl) return;

        if (diff <= 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minsEl.textContent = '0';
            return;
        }

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);

        daysEl.textContent = String(days);
        hoursEl.textContent = String(hours);
        minsEl.textContent = String(mins);
    }
    updateCountdown();
    setInterval(updateCountdown, 30000);

    /* ══════════════ ADD TO CALENDAR (.ics download) ══════════════ */
    const icsBtn = document.getElementById('add-to-cal-ics');
    if (icsBtn) {
        icsBtn.addEventListener('click', downloadICS);
    }

    function downloadICS() {
        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Gayalan & Induja Wedding//EN',
            'CALSCALE:GREGORIAN',
            'BEGIN:VEVENT',
            'UID:gayalan-induja-wedding-2026@invitation',
            'DTSTAMP:20260101T000000Z',
            'DTSTART:20261025T041500Z',
            'DTEND:20261025T100000Z',
            "SUMMARY:Gayalan & Induja's Wedding",
            'DESCRIPTION:Join us as we celebrate the wedding of Gayalan & Induja. Full schedule on the invitation site.',
            'LOCATION:Kings Gardens Banquet Hall\\, Colombo\\, Sri Lanka',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Gayalan-Induja-Wedding.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    /* ══════════════ RSVP LOGIC ══════════════ */
    function normalizePhone(raw) {
        let p = String(raw || '').replace(/[\s\-()]/g, '');
        if (p.startsWith('+')) p = p.slice(1);
        if (p.startsWith('0')) p = '94' + p.slice(1);
        if (!p.startsWith('94') && p.length === 9) p = '94' + p;
        return p;
    }

    function showPhoneError(msg) {
        const el = document.getElementById('phone-error');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
    }
    function clearPhoneError() {
        const el = document.getElementById('phone-error');
        if (!el) return;
        el.textContent = '';
        el.classList.remove('show');
    }

    function transitionStep(hideId, showId) {
        const hideEl = document.getElementById(hideId);
        const showEl = document.getElementById(showId);
        if (hideEl) {
            gsap.to(hideEl, {
                opacity: 0, x: -20, duration: 0.3, ease: 'power2.in',
                onComplete: () => hideEl.classList.add('hidden')
            });
        }
        if (showEl) {
            showEl.classList.remove('hidden');
            gsap.fromTo(showEl,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.5, delay: 0.25, ease: 'power2.out' }
            );
        }
    }

    function renderStatusBadge(containerId, status) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const cls = status === 'accepted' ? 'status-accepted' : 'status-declined';
        const label = status === 'accepted' ? 'Attending' : 'Not Attending';
        container.innerHTML = `<span class="status-badge ${cls}">${label}</span>`;
    }

    function showRegisterError(msg) {
        const el = document.getElementById('register-error');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
    }
    function clearRegisterError() {
        const el = document.getElementById('register-error');
        if (!el) return;
        el.textContent = '';
        el.classList.remove('show');
    }

    const nextBtn = document.getElementById('rsvp-next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearPhoneError();
            const input = document.getElementById('mobile-number');
            const raw = input ? input.value.trim() : '';
            if (!raw) {
                showPhoneError('Please enter your WhatsApp number.');
                return;
            }
            const phone = normalizePhone(raw);

            if (!isConfigured()) {
                showPhoneError('RSVP system is being set up — please use the WhatsApp link below instead.');
                return;
            }

            nextBtn.disabled = true;
            nextBtn.textContent = 'Checking...';

            fetch(`${RSVP_API_URL}?action=check&phone=${encodeURIComponent(phone)}`)
                .then(r => r.json())
                .then(data => {
                    nextBtn.disabled = false;
                    nextBtn.textContent = 'Continue';

                    if (!data.success || !data.guest) {
                        // Not on the pre-filled list — offer self-registration instead of a dead end
                        currentGuestPhone = phone;
                        clearRegisterError();
                        transitionStep('rsvp-step-1', 'rsvp-step-1b');
                        return;
                    }

                    currentGuestPhone = phone;
                    currentGuestName = data.guest.name || 'Guest';

                    if (data.guest.status && data.guest.status !== 'pending') {
                        // Already responded — show status screen
                        document.getElementById('status-guest-name').textContent = currentGuestName;
                        renderStatusBadge('status-badge-container-2', data.guest.status);
                        document.getElementById('status-message').textContent =
                            data.guest.status === 'accepted'
                                ? "We can't wait to celebrate with you!"
                                : "We'll miss you, but thank you for letting us know.";
                        transitionStep('rsvp-step-1', 'rsvp-step-status');
                    } else {
                        document.getElementById('guest-name-display').textContent = currentGuestName;
                        transitionStep('rsvp-step-1', 'rsvp-step-2');
                    }
                })
                .catch(() => {
                    nextBtn.disabled = false;
                    nextBtn.textContent = 'Continue';
                    showPhoneError('Something went wrong — please try again or message us on WhatsApp.');
                });
        });
    }

    const registerBtn = document.getElementById('rsvp-register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            clearRegisterError();
            const nameInput = document.getElementById('new-guest-name');
            const name = nameInput ? nameInput.value.trim() : '';
            if (!name) {
                showRegisterError('Please enter your name.');
                return;
            }
            if (!currentGuestPhone) {
                showRegisterError('Something went wrong — please go back and re-enter your number.');
                return;
            }

            registerBtn.disabled = true;
            registerBtn.textContent = 'Saving...';

            fetch(RSVP_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'register', phone: currentGuestPhone, name })
            }).then(r => r.json()).then(data => {
                registerBtn.disabled = false;
                registerBtn.textContent = 'Continue';

                if (!data.success || !data.guest) {
                    showRegisterError(data.message || 'Could not save your details — please try again.');
                    return;
                }

                currentGuestName = data.guest.name || name;
                document.getElementById('guest-name-display').textContent = currentGuestName;
                transitionStep('rsvp-step-1b', 'rsvp-step-2');
            }).catch(() => {
                registerBtn.disabled = false;
                registerBtn.textContent = 'Continue';
                showRegisterError('Something went wrong — please try again.');
            });
        });
    }

    function submitRsvpStatus(status) {
        if (!isConfigured() || !currentGuestPhone) return;
        const errEl = document.getElementById('rsvp-status-error');
        if (errEl) { errEl.textContent = ''; errEl.classList.remove('show'); }
        if (yesBtn) yesBtn.disabled = true;
        if (noBtn) noBtn.disabled = true;

        fetch(RSVP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'update', phone: currentGuestPhone, status })
        }).then(r => r.json()).then(data => {
            if (yesBtn) yesBtn.disabled = false;
            if (noBtn) noBtn.disabled = false;

            if (!data.success) {
                if (errEl) {
                    errEl.textContent = data.message || 'Could not save your response — please try again.';
                    errEl.classList.add('show');
                }
                return;
            }

            document.getElementById('confirm-guest-name').textContent = currentGuestName;
            renderStatusBadge('status-badge-container', status);
            document.getElementById('confirm-message').textContent =
                status === 'accepted'
                    ? "We can't wait to celebrate with you!"
                    : "We'll miss you, but thank you for letting us know.";
            transitionStep('rsvp-step-2', 'rsvp-step-3');
        }).catch(() => {
            if (yesBtn) yesBtn.disabled = false;
            if (noBtn) noBtn.disabled = false;
            if (errEl) {
                errEl.textContent = 'Could not save your response — please try again.';
                errEl.classList.add('show');
            }
        });
    }

    const yesBtn = document.getElementById('rsvp-yes-btn');
    const noBtn = document.getElementById('rsvp-no-btn');
    if (yesBtn) yesBtn.addEventListener('click', () => submitRsvpStatus('accepted'));
    if (noBtn) noBtn.addEventListener('click', () => submitRsvpStatus('declined'));

    function resetRSVP() {
        ['rsvp-step-1b', 'rsvp-step-2', 'rsvp-step-3', 'rsvp-step-status'].forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.classList.add('hidden'); gsap.set(el, { opacity: 0, x: 20 }); }
        });
        const step1 = document.getElementById('rsvp-step-1');
        if (step1) {
            step1.classList.remove('hidden');
            gsap.fromTo(step1, { opacity: 0 }, { opacity: 1, duration: 0.4 });
        }
        const input = document.getElementById('mobile-number');
        if (input) input.value = '';
        const nameInput = document.getElementById('new-guest-name');
        if (nameInput) nameInput.value = '';
        clearPhoneError();
        clearRegisterError();
    }

    const resetBtn = document.getElementById('rsvp-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetRSVP);

    const changeBtn = document.getElementById('rsvp-change-btn');
    if (changeBtn) {
        changeBtn.addEventListener('click', () => {
            document.getElementById('guest-name-display').textContent = currentGuestName;
            transitionStep('rsvp-step-status', 'rsvp-step-2');
        });
    }

    /* ══════════════ GUEST WISHBOOK ══════════════ */
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function loadWishes() {
        const listEl = document.getElementById('wish-list-container');
        if (!listEl) return;
        if (!isConfigured()) {
            listEl.innerHTML = '<div class="wish-empty-note">The guestbook connects once the RSVP system is set up — feel free to message us on WhatsApp in the meantime.</div>';
            return;
        }
        fetch(`${RSVP_API_URL}?action=wishes`)
            .then(r => r.json())
            .then(data => {
                if (!data.success || !data.wishes || !data.wishes.length) {
                    listEl.innerHTML = '<div class="wish-empty-note">No wishes yet. Be the first to share!</div>';
                    return;
                }
                listEl.innerHTML = data.wishes.map(w => `
                    <div class="wish-card">
                        <div class="wish-card-name">${escapeHtml(w.name)}</div>
                        <div class="wish-card-msg">${escapeHtml(w.message)}</div>
                    </div>
                `).join('');
            })
            .catch(() => {
                listEl.innerHTML = '<div class="wish-empty-note">Could not load wishes right now — please refresh in a moment.</div>';
            });
    }
    loadWishes();

    const wishForm = document.getElementById('wish-form');
    if (wishForm) {
        wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const errEl = document.getElementById('wish-error');
            const nameEl = document.getElementById('wish-name');
            const msgEl = document.getElementById('wish-message');
            if (errEl) { errEl.textContent = ''; errEl.classList.remove('show'); }

            if (!isConfigured()) {
                if (errEl) { errEl.textContent = 'Guestbook is being set up — please try again later.'; errEl.classList.add('show'); }
                return;
            }

            const name = nameEl.value.trim();
            const message = msgEl.value.trim();
            if (!name || !message) {
                if (errEl) { errEl.textContent = 'Please fill in both your name and a message.'; errEl.classList.add('show'); }
                return;
            }

            const submitBtn = wishForm.querySelector('button[type="submit"]');
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

            fetch(RSVP_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'wish_add', name, message })
            }).then(r => r.json()).then(data => {
                if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Wishes'; }
                if (data.success) {
                    nameEl.value = '';
                    msgEl.value = '';
                    loadWishes();
                } else if (errEl) {
                    errEl.textContent = data.message || 'Could not save your message. Please try again.';
                    errEl.classList.add('show');
                }
            }).catch(() => {
                if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Wishes'; }
                if (errEl) { errEl.textContent = 'Could not connect. Please try again.'; errEl.classList.add('show'); }
            });
        });
    }

    /* ══════════════ MUSIC TOGGLE ══════════════ */
    const musicToggle = document.getElementById('musicToggle');
    const musicLabel = document.getElementById('music-label');
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicToggle.setAttribute('aria-pressed', 'true');
                    if (musicLabel) musicLabel.textContent = 'Pause';
                }).catch(() => { /* no audio file yet — ignore */ });
            } else {
                bgMusic.pause();
                musicToggle.setAttribute('aria-pressed', 'false');
                if (musicLabel) musicLabel.textContent = 'Music';
            }
        });
    }

});
