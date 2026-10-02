#!/usr/bin/env python3
"""Generates the three portfolio pages from one shared shell.
Run from the repo root: python3 build_portfolio.py"""

P = 'images/portfolio/galvant/'
E = 'images/portfolio/epiphany/'

ARROW = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
BACK = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>'


def shell(title, description, main, body_class=''):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Juliet Falk</title>
    <meta name="description" content="{description}">
    <meta name="author" content="Juliet Falk">
    <!-- Kept out of search results: these pages are shared by link with a password -->
    <meta name="robots" content="noindex">

    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%23101010'/><text x='16' y='22' font-family='Georgia,serif' font-size='16' fill='%23fafaf8' text-anchor='middle'>JF</text></svg>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&family=Manrope:wght@500;700&family=Caveat:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="portfolio.css">

    <script>
        // Applied before first paint: saved theme, and the password bubble on a first visit
        try {{
            var saved = localStorage.getItem('theme');
            if (saved) document.documentElement.dataset.theme = saved;
        }} catch (e) {{}}
        try {{
            if (localStorage.getItem('jf-portfolio-unlocked') !== '1') {{
                document.documentElement.classList.add('is-locked');
            }}
        }} catch (e) {{
            document.documentElement.classList.add('is-locked');
        }}
    </script>
</head>
<body class="{body_class}">
    <a href="#main" class="skip-link">Skip to content</a>

    <header class="nav" id="nav">
        <div class="nav-inner">
            <a href="index.html" class="nav-logo" aria-label="Juliet Falk, home">JF</a>

            <nav class="nav-menu" id="nav-menu" aria-label="Primary">
                <a href="index.html#about" class="nav-link">About</a>
                <a href="index.html#work" class="nav-link">Work</a>
                <a href="portfolio.html" class="nav-link is-active" aria-current="page">Portfolio</a>
                <a href="index.html#writing" class="nav-link">Writing</a>
                <a href="index.html#contact" class="nav-link">Contact</a>
            </nav>

            <div class="nav-actions">
                <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch color theme">
                    <svg class="icon icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>
                    <svg class="icon icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>
                </button>

                <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </div>
        </div>
    </header>

    <main id="main">
{main}
    </main>

    <footer class="footer" id="footer">
        <div class="container footer-inner">
            <span>&copy; <span id="year">2026</span> Juliet Falk</span>
            <a href="index.html">Back to home</a>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="portfolio.js"></script>
</body>
</html>
'''


def compare(before, after, before_label, after_label, alt_before, alt_after, ratio):
    return f'''<div class="compare" style="--ratio: {ratio}">
                    <img class="compare-after" src="{after}" alt="{alt_after}" loading="lazy">
                    <img class="compare-before" src="{before}" alt="{alt_before}" loading="lazy">
                    <span class="compare-tag compare-tag-before">{before_label}</span>
                    <span class="compare-tag compare-tag-after">{after_label}</span>
                    <span class="compare-handle" aria-hidden="true"></span>
                    <input class="compare-range" type="range" min="0" max="100" value="50" aria-label="Drag to compare {before_label} and {after_label}">
                </div>'''


def slides(prefix, alt):
    return '\n'.join(
        f'                    <img class="zoom" src="{P}{prefix}-{i}.jpg" alt="{alt}, slide {i}" width="1200" height="675" loading="lazy">'
        for i in range(1, 5))


def slot(folder, file, label, alt):
    return (f'<div class="shot-slot"><img class="zoom" src="images/portfolio/{folder}/{file}" alt="{alt}" '
            f'loading="lazy" onerror="this.remove()"><span>Add image: {label}</span></div>')


# ---------------------------------------------------------------- index page

INDEX = f'''        <section class="pf-hero">
            <div class="container">
                <p class="eyebrow">Portfolio &middot; 2025 to 2026</p>
                <h1 class="pf-title">Selected <em>work</em></h1>
                <p class="lede">
                    Two early companies, and one habit that ran through both: talk to
                    the people the product is for, then design what they need to see.
                </p>
            </div>
        </section>

        <section class="pf-cards-wrap">
            <div class="container pf-cards">
                <a class="pf-card pf-card-galvant" href="portfolio-galvant.html">
                    <div class="pf-card-art pf-card-art-cover">
                        <img src="{P}cover-mark.png" alt="" class="pf-card-cover">
                    </div>
                    <div class="pf-card-meta">
                        <span class="pf-card-no">Case 01 &middot; 2026</span>
                        <h2 class="pf-card-name">Galvant</h2>
                        <p>I designed the brand and ran the outbound it had to win. Full identity, site, product UI, decks, and conference kit.</p>
                        <span class="pf-card-cta">Read the case study {ARROW}</span>
                    </div>
                </a>

                <a class="pf-card pf-card-epiphany" href="portfolio-epiphany.html">
                    <div class="pf-card-art pf-card-art-cover">
                        <img src="{E}app-onboarding-3.jpg" alt="" class="pf-card-cover pf-card-cover-head">
                        <p class="pf-card-line">Whoop for your brain</p>
                    </div>
                    <div class="pf-card-meta">
                        <span class="pf-card-no">Case 02 &middot; 2025 to 2026</span>
                        <h2 class="pf-card-name">Epiphany</h2>
                        <p>Brand, waitlist site, and mobile app for a flow-state headset. 5,000 people signed up before it shipped.</p>
                        <span class="pf-card-cta">Read the case study {ARROW}</span>
                    </div>
                </a>
            </div>
        </section>

        <section class="pf-end">
            <div class="container">
                <h2 class="section-title">Want the full walkthrough?</h2>
                <p class="lede lede-sm">I can share working files and talk through any of this in detail.</p>
                <a href="index.html#contact" class="btn btn-primary">Get in touch</a>
            </div>
        </section>'''


# -------------------------------------------------------------- galvant page

GALVANT = f'''        <article class="story story-galvant">
            <header class="container story-head">
                <a class="crumb" href="portfolio.html">{BACK} Portfolio</a>

                <div class="plate plate-galvant">
                    <div class="plate-main">
                        <img class="g-logo" src="{P}logo-orange.png" alt="Galvant" width="1400" height="235">
                        <p class="plate-kicker">Case 01 &middot; Full brand, 2026</p>
                        <h1 class="g-tagline">An AI workforce for your manufacturing back office</h1>
                        <ul class="g-lines" aria-label="Product lines">
                            <li>Intelligence</li>
                            <li>Sales</li>
                            <li>Procurement</li>
                            <li>Financial</li>
                        </ul>
                    </div>
                    <div class="plate-side">
                        <div class="g-specimen">
                            <span class="g-aa">Aa</span>
                            <span class="g-spec-meta">DM Serif Display<br>Poppins<br>JetBrains Mono</span>
                        </div>
                        <ul class="g-swatches" aria-label="Brand palette">
                            <li class="sw-cream"><button type="button" data-copy="#F7F3E9">Canvas Cream<br>#F7F3E9</button></li>
                            <li class="sw-orange"><button type="button" data-copy="#E16809">Galvant Orange<br>#E16809</button></li>
                            <li class="sw-plum"><button type="button" data-copy="#3B2A47">Deep Plum<br>#3B2A47</button></li>
                        </ul>
                    </div>
                </div>

                <dl class="facts">
                    <div><dt>Role</dt><dd>Growth &amp; Design Intern</dd></div>
                    <div><dt>When</dt><dd>Jun to Sep 2026</dd></div>
                    <div><dt>Company</dt><dd>AI for manufacturing, pre&#8209;Series&nbsp;A</dd></div>
                    <div><dt>Scope</dt><dd>Brand, site, product UI, decks, conference kit</dd></div>
                    <div><dt>Live</dt><dd><a href="https://galvant.ai" target="_blank" rel="noopener">galvant.ai</a></dd></div>
                </dl>
            </header>

            <section class="container chapter">
                <div class="chapter-head">
                    <p class="eyebrow">The job</p>
                    <h2 class="case-headline">I designed the brand and ran the outbound it had to win.</h2>
                </div>
                <div class="case-copy">
                    <p>
                        Galvant builds AI for the back office of manufacturing companies.
                        I joined ahead of its Series A with two jobs at once: design what
                        customers and investors would see, and bring in new customers myself.
                    </p>
                    <p>
                        So I was on calls with plant general managers, contract
                        manufacturers, and finance leads in about ten countries, and
                        then designing for those same people the next morning. What I
                        heard on calls went straight into the work.
                    </p>
                    <ul class="stat-row">
                        <li><span class="stat-n">~200</span><span class="stat-l">conversations with manufacturers</span></li>
                        <li><span class="stat-n">$100K+</span><span class="stat-l">pipeline from 5 qualified opportunities</span></li>
                        <li><span class="stat-n">~10</span><span class="stat-l">countries across the Americas, Europe, and Asia</span></li>
                    </ul>
                </div>
            </section>

            <section class="container chapter">
                <div class="chapter-head">
                    <p class="eyebrow">The rename</p>
                    <h2 class="case-headline">From Takt to Galvant.</h2>
                </div>
                <div class="case-copy">
                    <p>
                        The company had to change its name for legal reasons, and the
                        team landed on Galvant together: part galvanize, part gallivant.
                        The energy of a factory floor, and the ease the product should
                        bring to it.
                    </p>
                    <p>
                        A new name was the chance to fix everything around it. The old
                        site was a heavy green sans serif on a busy background, and it
                        looked like every other software startup. I rebuilt the identity
                        to look like it belonged in manufacturing: a serif with weight,
                        drafting-style measurement lines, and one confident orange.
                    </p>
                </div>
                <figure class="chapter-fig">
                    {compare(P + 'takt-site-before.jpg', P + 'site-home.jpg', 'Takt, before', 'Galvant, after', 'The old Takt home page', 'The new Galvant home page', '1600 / 879')}
                    <figcaption>Home page &middot; drag to compare <span class="hand">so much green</span></figcaption>
                </figure>
                <figure class="chapter-fig chapter-fig-narrow">
                    {compare(P + 'takt-deck-before.jpg', P + 'customer-deck-1.jpg', 'Takt deck', 'Galvant deck', 'The old Takt customer deck cover', 'The new Galvant customer deck cover', '16 / 9')}
                    <figcaption>Customer deck cover &middot; drag to compare</figcaption>
                </figure>
            </section>

            <section class="container chapter">
                <div class="chapter-head">
                    <p class="eyebrow">What I heard, what I changed</p>
                    <h2 class="case-headline">"Sure, but can you handle <em>our</em> process?"</h2>
                </div>
                <div class="case-copy">
                    <p>
                        That was the reaction I kept getting. People were interested but
                        skeptical, because every corner of manufacturing has its own
                        discipline and its own methods. A rubber molder does not believe
                        a tool built for a nursery will work for them.
                    </p>
                    <p>
                        So I made case studies the backbone of both the site and the
                        decks. Each product page now leads with a real customer in a
                        specific trade, and the deck walks through a range of them, so a
                        prospect can find a company that looks like theirs.
                    </p>
                </div>
                <figure class="chapter-fig">
                    <img class="zoom" src="{P}site-quoting.jpg" alt="Galvant quoting page leading with a customer case study" width="1600" height="880" loading="lazy">
                    <figcaption>Product page &middot; proof from a real customer comes first</figcaption>
                </figure>
            </section>

            <section class="container chapter">
                <div class="chapter-head">
                    <p class="eyebrow">In the product</p>
                    <h2 class="case-headline">Making usage visible, so people come back.</h2>
                </div>
                <div class="case-copy">
                    <p>
                        Getting a customer live is half of it. They also have to keep
                        using the thing. Under the main chat bar we added usage stats for
                        the whole company: total questions asked this month, and who on
                        the team is asking the most.
                    </p>
                    <p>
                        It turns a quiet tool into something a little competitive, and it
                        gives a plant manager an easy read on whether their team has
                        actually adopted it.
                    </p>
                    <p class="aside-note">
                        I can't show that screen here because it holds private client
                        information. The image below is the public demo of the same product.
                    </p>
                </div>
                <figure class="chapter-fig">
                    <img class="zoom" src="{P}site-intelligence.jpg" alt="Galvant Intelligence answering a question about production runs" width="1600" height="882" loading="lazy">
                    <figcaption>Intelligence &middot; a plain-language question, answered from factory data</figcaption>
                </figure>
            </section>

            <section class="container chapter">
                <div class="chapter-head">
                    <p class="eyebrow">A direction I dropped</p>
                    <h2 class="case-headline">Click-through, not a looping video.</h2>
                </div>
                <div class="case-copy">
                    <p>
                        For quoting and procurement I first planned looping videos, like
                        the one on the Intelligence page. I scrapped that. A loop long
                        enough to show every skill would be too long to watch, and a
                        short one would undersell it.
                    </p>
                    <p>
                        I built a step-by-step walkthrough instead. The visitor clicks
                        through seven steps at their own pace, which holds attention
                        better and lets each capability get its own moment.
                    </p>
                </div>
                <figure class="chapter-fig">
                    <img class="zoom" src="{P}site-walkthrough.jpg" alt="Galvant quoting walkthrough with seven clickable steps" width="1600" height="882" loading="lazy">
                    <figcaption>Quoting &middot; seven steps the visitor clicks through</figcaption>
                </figure>
            </section>

            <section class="container chapter">
                <div class="chapter-head">
                    <p class="eyebrow">Design in the funnel</p>
                    <h2 class="case-headline">No single piece closed a deal. The sequence did.</h2>
                </div>
                <div class="case-copy">
                    <p>
                        What worked was using everything in order. I sent a lead to the
                        site before the call, ran a live demo on the call, and followed
                        up with the customer deck after it.
                    </p>
                </div>
                <ol class="funnel chapter-fig">
                    <li>
                        <span class="funnel-step">Getting noticed</span>
                        <strong>Webinar and conference kit</strong>
                        <p>A webinar that teaches before it sells, and a banner and cards that say what Galvant does in one line.</p>
                    </li>
                    <li>
                        <span class="funnel-step">Before the call</span>
                        <strong>The website</strong>
                        <p>Where I pointed every lead first, so they arrived knowing the product and having seen a company like theirs.</p>
                    </li>
                    <li>
                        <span class="funnel-step">On the call</span>
                        <strong>The product demo</strong>
                        <p>A live walk through the product, asking it real questions.</p>
                    </li>
                    <li>
                        <span class="funnel-step">After the call</span>
                        <strong>The customer deck</strong>
                        <p>The follow-up they could forward inside their company: the product, the proof, and a two-week path to going live.</p>
                    </li>
                </ol>
            </section>

            <section class="container gallery">
                <p class="eyebrow">The pieces</p>

                <figure class="shot">
                    <div class="logo-row">
                        <div class="logo-tile logo-tile-cream"><img src="{P}logo-orange.png" alt="Galvant logo in orange on cream" loading="lazy"></div>
                        <div class="logo-tile logo-tile-plum"><img src="{P}logo-cream-on-orange.png" alt="Galvant logo in cream on plum" loading="lazy"></div>
                    </div>
                    <figcaption>Logo lockup &middot; light and dark</figcaption>
                </figure>

                <figure class="shot">
                    <img class="zoom shot-natural" src="{P}product-ui.png" alt="Galvant Intelligence product interface" width="1600" height="960" loading="lazy">
                    <figcaption>Product UI &middot; Intelligence</figcaption>
                </figure>

                <figure class="shot">
                    <div class="slide-grid">
{slides('customer-deck', 'Galvant customer deck')}
                    </div>
                    <figcaption>Customer deck</figcaption>
                </figure>

                <figure class="shot">
                    <div class="slide-grid">
{slides('webinar-deck', 'Galvant AI for Manufacturing webinar')}
                    </div>
                    <figcaption>Webinar deck &middot; AI for Manufacturing</figcaption>
                </figure>

                <figure class="shot">
                    <div class="kit">
                        <img class="kit-banner zoom" src="{P}conference-banner.jpg" alt="Galvant conference banner" width="800" height="1875" loading="lazy">
                        <div class="kit-cards">
                            <img class="zoom" src="{P}business-card-front.png" alt="Galvant business card, front" width="1050" height="600" loading="lazy">
                            <img class="zoom" src="{P}business-card-back.png" alt="Galvant business card, back" width="1050" height="600" loading="lazy">
                        </div>
                    </div>
                    <figcaption>Conference kit &middot; banner and business cards</figcaption>
                </figure>
            </section>

            <nav class="container next-case" aria-label="More case studies">
                <a href="portfolio-epiphany.html">
                    <span class="eyebrow">Next &middot; Case 02</span>
                    <span class="next-name">Epiphany {ARROW}</span>
                </a>
            </nav>
        </article>'''


# ------------------------------------------------------------- epiphany page

EPIPHANY = f'''        <article class="story story-epiphany">
            <header class="e-hero">
                <div class="container e-hero-inner">
                    <div>
                        <a class="crumb" href="portfolio.html">{BACK} Portfolio</a>
                        <p class="plate-kicker">Case 02 &middot; Epiphany, 2025 to 2026</p>
                        <h1 class="e-tagline">Whoop for<br>your brain.</h1>
                        <p class="e-sub">A headset and an app for getting into deep focus on demand, and tracking it over time.</p>
                    </div>
                    <img class="e-phone zoom" src="{E}app-onboarding-3.jpg" alt="Epiphany app onboarding screen: Meet Epiphany" width="396" height="859">
                </div>
            </header>

            <div class="container e-body">
                <dl class="facts facts-plain">
                    <div><dt>Role</dt><dd>Co&#8209;Founder &amp; COO</dd></div>
                    <div><dt>When</dt><dd>Jul 2025 to Jul 2026</dd></div>
                    <div><dt>My part</dt><dd>Brand, waitlist site, mobile app design</dd></div>
                    <div><dt>Status</dt><dd>On pause</dd></div>
                </dl>

                <p class="e-lead">
                    Epiphany started as research with a friend and turned into a
                    company: a wearable that primes your brain for focus, paired with
                    software that keeps you there. Alongside running operations, I
                    designed the brand, the waitlist site, and the mobile app.
                </p>

                <ul class="stat-row">
                    <li><span class="stat-n">5,000</span><span class="stat-l">people on the waitlist before launch</span></li>
                    <li><span class="stat-n">$10K</span><span class="stat-l">raised from angels</span></li>
                    <li><span class="stat-n">3</span><span class="stat-l">events: Lightspeed India, CES, Stanford EdTech Summit</span></li>
                </ul>

                <section class="e-q">
                    <h2>How do you get 5,000 people to wait for a headset they can't try?</h2>
                    <p>
                        With a landing page that sold the vision before the hardware
                        existed. It walked people through what the headset would do and
                        what a session would feel like, then asked for an email. We
                        took the same story on the road, to Lightspeed India, CES, and
                        the Stanford EdTech Summit, and ran it through online channels.
                    </p>
                    <figure class="shot e-wide">
                        <img class="zoom shot-natural" src="{E}landing-hero.jpg" alt="Epiphany waitlist landing page: Turn Focus Into a Superpower" width="1352" height="845" loading="lazy">
                        <figcaption>Waitlist landing page</figcaption>
                    </figure>
                    <div class="shots e-wide">
                        <figure class="shot">
                            <img class="zoom shot-natural" src="{E}landing-how-it-works.jpg" alt="Landing page section explaining how Epiphany works" width="1350" height="1204" loading="lazy">
                            <figcaption>How it works</figcaption>
                        </figure>
                        <figure class="shot">
                            <img class="zoom shot-natural" src="{E}landing-preorder.jpg" alt="Landing page pre-order section" width="1352" height="758" loading="lazy">
                            <figcaption>Pre-order sign-up</figcaption>
                        </figure>
                    </div>
                </section>

                <section class="e-q">
                    <h2>What did testing change?</h2>
                    <p>
                        The whole idea of the app. Testing told us it needed to feel
                        like a game and work like a tracker, something you check and
                        want to improve. That is where "Whoop for your brain" came from.
                    </p>
                    <p>
                        We designed two additions for the mobile app. <strong>Flow
                        games</strong> ease the transition into focus. <strong>Flow
                        hubs</strong> let productivity creators lead sessions, the way a
                        host leads a podcast.
                    </p>
                    <p>
                        Every session earns points and feeds a daily score, so there
                        is always a number to beat.
                    </p>
                    <div class="phone-row e-wide">
                        <figure><img class="zoom" src="{E}app-home.jpg" alt="Epiphany app home screen with a daily focus score and flow timeline" loading="lazy"><figcaption>Home &middot; daily score</figcaption></figure>
                        <figure><img class="zoom" src="{E}app-flow.jpg" alt="Epiphany app screen for starting a focus session and earning points" loading="lazy"><figcaption>Start a session</figcaption></figure>
                        <figure><img class="zoom" src="{E}app-flow-jams.jpg" alt="Epiphany app screen for exploring live sessions from flow hubs" loading="lazy"><figcaption>Flow hubs &middot; live jams</figcaption></figure>
                        <figure><img class="zoom" src="{E}app-jam.jpg" alt="Epiphany app screen inside a group focus session" loading="lazy"><figcaption>Inside a jam</figcaption></figure>
                    </div>
                </section>

                <section class="e-q e-plain">
                    <h2>One score, on every screen.</h2>
                    <p>
                        The same score follows you off the phone. The browser shows a
                        live view of your focus and lets you share your score, and one
                        switch mutes notifications and blocks distracting sites. The
                        desktop app pairs the headset.
                    </p>
                    <figure class="shot e-wide">
                        <img class="zoom shot-natural" src="{E}browser-dashboard.jpg" alt="Epiphany browser dashboard with a focus score, live visualization and session timeline" width="1182" height="689" loading="lazy">
                        <figcaption>AI browser &middot; dashboard</figcaption>
                    </figure>
                    <figure class="shot e-wide">
                        <img class="zoom shot-natural" src="{E}desktop-pairing.jpg" alt="Epiphany desktop app pairing the headset" width="752" height="486" loading="lazy">
                        <figcaption>Desktop app &middot; pairing the headset</figcaption>
                    </figure>
                </section>

                <section class="e-q">
                    <h2>Why pause it?</h2>
                    <p>
                        To give the hard part more time. The hardware and the science
                        behind it need more iteration than a launch schedule allows,
                        and we would rather tinker than ship something half right. It
                        is still a project we care about.
                    </p>
                    <p>
                        In the meantime it did a different job well. The waitlist was a
                        real test of whether people are ready for focus tracking on
                        their head, and 5,000 of them said yes.
                    </p>
                </section>

                <section class="e-q e-recognition">
                    <h2>Recognition</h2>
                    <ul class="tags">
                        <li>Stanford Accelerator for Edtech Impact Summit Winner, 2025</li>
                        <li>India Ascends Lightspeed 2026 Finalist</li>
                        <li>Pear FFC Fellow</li>
                        <li>Foundress Fellow</li>
                    </ul>
                </section>
            </div>

            <nav class="container next-case" aria-label="More case studies">
                <a href="portfolio-galvant.html">
                    <span class="eyebrow">Next &middot; Case 01</span>
                    <span class="next-name">Galvant {ARROW}</span>
                </a>
            </nav>
        </article>'''


PAGES = {
    'portfolio.html': ('Portfolio', 'Selected product and brand design work by Juliet Falk.', INDEX, 'pf-index-page'),
    'portfolio-galvant.html': ('Galvant', 'Case study: brand, site, product UI and sales materials for Galvant.', GALVANT, ''),
    'portfolio-epiphany.html': ('Epiphany', 'Case study: brand, waitlist site and app design for Epiphany.', EPIPHANY, ''),
}

if __name__ == '__main__':
    for name, (title, desc, main, cls) in PAGES.items():
        open(name, 'w').write(shell(title, desc, main, cls))
        print('wrote', name)
