/* Portfolio password bubble.
   This is a courtesy gate, not security: the page content ships in the HTML,
   so anything that must stay private should not live in this repo. */

(() => {
    'use strict';

    const root = document.documentElement;
    const gate = document.getElementById('gate');
    const form = document.getElementById('gate-form');
    const input = document.getElementById('gate-input');
    const error = document.getElementById('gate-error');
    const guarded = [document.getElementById('main'), document.getElementById('footer')];

    if (!gate || !form || !input) return;

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

    const setGuarded = (locked) => {
        guarded.forEach((el) => { if (el) el.inert = locked; });
    };

    if (!root.classList.contains('is-locked')) return;

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
            root.classList.add('is-unlocking');
            root.classList.remove('is-locked');
            window.setTimeout(() => root.classList.remove('is-unlocking'), 700);
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
})();

/* Image lightbox: click any portfolio image to see it large */
(() => {
    'use strict';

    const box = document.getElementById('lightbox');
    const big = document.getElementById('lightbox-img');
    const close = document.getElementById('lightbox-close');

    if (!box || !big || typeof box.showModal !== 'function') return;

    document.addEventListener('click', (e) => {
        const img = e.target.closest('.shot > img, .slide-grid img, .kit img');
        if (!img) return;
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        box.showModal();
    });

    // Click anywhere (image, backdrop, or button) closes; Esc is built into <dialog>
    box.addEventListener('click', () => box.close());
    if (close) close.addEventListener('click', () => box.close());
})();
