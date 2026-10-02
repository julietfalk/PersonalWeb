/* Portfolio pages: password bubble, before/after sliders, image viewer,
   copyable swatches.
   The bubble is a courtesy gate, not security: page content ships in the
   HTML, so anything that must stay private should not live in this repo. */

(() => {
    'use strict';

    const root = document.documentElement;

    /* ---- Password bubble -------------------------------------------------- */

    const STORAGE_KEY = 'jf-portfolio-unlocked';
    // Hash of the password, so the word itself is not sitting in the source
    const EXPECTED = 3598369212836588;

    // cyrb53: small, fast, non-cryptographic string hash
    const hash = (str) => {
        let h1 = 0xdeadbeef;
        let h2 = 0x41c6ce57;
        for (let i = 0; i < str.length; i++) {
            const ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };

    if (root.classList.contains('is-locked')) {
        const guarded = document.querySelectorAll('main, .footer');
        const setGuarded = (locked) => guarded.forEach((el) => { el.inert = locked; });

        const gate = document.createElement('div');
        gate.className = 'gate';
        gate.id = 'gate';
        gate.setAttribute('role', 'dialog');
        gate.setAttribute('aria-modal', 'true');
        gate.setAttribute('aria-labelledby', 'gate-title');
        gate.innerHTML = `
            <form class="gate-bubble" id="gate-form" autocomplete="off" novalidate>
                <p class="eyebrow gate-eyebrow">Private view</p>
                <p class="gate-title" id="gate-title">Portfolio</p>
                <p class="gate-copy">Enter the password to continue.</p>
                <div class="gate-field">
                    <label class="visually-hidden" for="gate-input">Password</label>
                    <input class="gate-input" id="gate-input" type="password" placeholder="Password" autocapitalize="off" spellcheck="false" aria-describedby="gate-error">
                    <button class="gate-submit" type="submit" aria-label="Continue">
                        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                </div>
                <p class="gate-error" id="gate-error" role="alert" hidden>That password didn't match. Try again.</p>
                <p class="gate-help">Need access? Write to <span class="gate-email">julietf@stanford.edu</span></p>
            </form>`;
        document.body.appendChild(gate);

        const form = gate.querySelector('#gate-form');
        const input = gate.querySelector('#gate-input');
        const error = gate.querySelector('#gate-error');

        setGuarded(true);
        input.focus();

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (hash(input.value.trim()) === EXPECTED) {
                try {
                    localStorage.setItem(STORAGE_KEY, '1');
                } catch (err) {
                    /* Storage blocked: the page still opens for this visit */
                }
                setGuarded(false);
                root.classList.remove('is-locked');
                gate.remove();
                return;
            }

            error.hidden = false;
            input.setAttribute('aria-invalid', 'true');
            form.classList.remove('is-wrong');
            // Force a reflow so the shake replays on every wrong attempt
            void form.offsetWidth;
            form.classList.add('is-wrong');
            input.select();
        });

        input.addEventListener('input', () => {
            error.hidden = true;
            input.removeAttribute('aria-invalid');
        });
    }

    /* ---- Before / after sliders ------------------------------------------- */

    document.querySelectorAll('.compare-range').forEach((range) => {
        const sync = () => range.parentElement.style.setProperty('--pos', `${range.value}%`);
        range.addEventListener('input', sync);
        sync();
    });

    /* ---- Swatches copy their hex ------------------------------------------ */

    document.querySelectorAll('[data-copy]').forEach((btn) => {
        const original = btn.innerHTML;
        btn.addEventListener('click', () => {
            const done = () => {
                btn.textContent = 'Copied';
                window.setTimeout(() => { btn.innerHTML = original; }, 1100);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(btn.dataset.copy).then(done, () => {});
            }
        });
    });

    /* ---- Image viewer: click any .zoom image to see it large -------------- */

    if (typeof HTMLDialogElement === 'function') {
        const box = document.createElement('dialog');
        box.className = 'lightbox';
        box.setAttribute('aria-label', 'Enlarged image');
        box.innerHTML = `
            <img alt="">
            <button class="lightbox-close" type="button" aria-label="Close">
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>`;
        document.body.appendChild(box);
        const big = box.querySelector('img');

        document.addEventListener('click', (e) => {
            const img = e.target.closest('img.zoom');
            if (!img) return;
            big.src = img.currentSrc || img.src;
            big.alt = img.alt;
            box.showModal();
        });

        // Any click inside (image, backdrop, or button) closes; Esc is built in
        box.addEventListener('click', () => box.close());
    }
})();
