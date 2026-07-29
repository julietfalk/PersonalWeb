/* Juliet Falk — site behavior.
   Progressive enhancement: every section is readable with this file absent. */

(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ---- Theme ---------------------------------------------------------- */

    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const root = document.documentElement;
            // With no explicit choice yet, fall back to what the system is showing
            const current = root.dataset.theme
                || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            const next = current === 'dark' ? 'light' : 'dark';

            root.dataset.theme = next;
            try {
                localStorage.setItem('theme', next);
            } catch (e) {
                /* Private browsing blocks storage; the toggle still works for this visit */
            }
        });
    }

    /* ---- Mobile navigation ---------------------------------------------- */

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    const closeMenu = () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link')) closeMenu();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                closeMenu();
                navToggle.focus();
            }
        });
    }

    /* ---- Nav border on scroll ------------------------------------------- */

    const nav = document.getElementById('nav');

    if (nav) {
        const syncNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
        syncNav();
        window.addEventListener('scroll', syncNav, { passive: true });
    }

    /* ---- Active section highlighting ------------------------------------ */

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = new Map(
        [...document.querySelectorAll('.nav-link')].map((link) => [link.getAttribute('href').slice(1), link])
    );

    if (sections.length && 'IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const link = navLinks.get(entry.target.id);
                if (link) link.classList.toggle('is-active', entry.isIntersecting);
            });
        }, {
            // Trip when a section crosses the upper third of the viewport
            rootMargin: '-25% 0px -70% 0px'
        });

        sections.forEach((section) => spy.observe(section));
    }

    /* ---- Scroll reveal --------------------------------------------------- */

    const revealTargets = document.querySelectorAll('.section-title, .card, .about-figure, .tags, .contact-list');

    if (revealTargets.length && 'IntersectionObserver' in window && !prefersReducedMotion.matches) {
        const reveal = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -10% 0px' });

        revealTargets.forEach((el, i) => {
            el.classList.add('js-reveal');
            // Small stagger within a row, capped so nothing waits noticeably long
            el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
            reveal.observe(el);
        });
    }

    /* ---- Footer year ----------------------------------------------------- */

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
