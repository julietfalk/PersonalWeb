// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.querySelector('.nav-logo a');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(248, 246, 242, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(107, 91, 71, 0.1)';
        
        // Keep text color consistent with warm theme
        navLinks.forEach(link => {
            link.style.color = '#6b5b47';
        });
        
        if (navLogo) {
            navLogo.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
            navLogo.style.webkitBackgroundClip = 'text';
            navLogo.style.webkitTextFillColor = 'transparent';
            navLogo.style.backgroundClip = 'text';
        }
    } else {
        navbar.style.background = 'rgba(248, 246, 242, 0.95)';
        navbar.style.boxShadow = 'none';
        
        // Keep text color consistent with warm theme
        navLinks.forEach(link => {
            link.style.color = '#6b5b47';
        });
        
        if (navLogo) {
            navLogo.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
            navLogo.style.webkitBackgroundClip = 'text';
            navLogo.style.webkitTextFillColor = 'transparent';
            navLogo.style.backgroundClip = 'text';
        }
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
const animatedElements = document.querySelectorAll('.project-card, .writing-card, .about-content, .contact-content');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    // Create a temporary element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    
    // Get the text content without HTML tags for typing
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < textContent.length) {
            // Rebuild the HTML with the current text progress
            let currentText = textContent.substring(0, i + 1);
            
            // Replace the text content while preserving HTML structure
            if (text.includes('<span class="highlight">')) {
                const beforeSpan = text.split('<span class="highlight">')[0];
                const spanContent = text.match(/<span class="highlight">(.*?)<\/span>/)[1];
                const afterSpan = text.split('</span>')[1];
                
                if (currentText.length <= beforeSpan.length) {
                    element.innerHTML = currentText;
                } else if (currentText.length <= beforeSpan.length + spanContent.length) {
                    const spanProgress = currentText.substring(beforeSpan.length);
                    element.innerHTML = beforeSpan + '<span class="highlight">' + spanProgress + '</span>';
                } else {
                    const afterProgress = currentText.substring(beforeSpan.length + spanContent.length);
                    element.innerHTML = beforeSpan + '<span class="highlight">' + spanContent + '</span>' + afterProgress;
                }
            } else {
                element.innerHTML = currentText;
            }
            
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
// DISABLED: Typing effect was breaking HTML rendering
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.innerHTML;
//         // Start typing effect after a short delay
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 50);
//         }, 500);
//     }
// });

// Check if we're on mobile - moved to global scope
function isMobile() {
    return window.innerWidth <= 768;
}

// Enhanced scroll animations and mouse tracking
// Single DOMContentLoaded event listener to handle all initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    
    // Initialize hero background animation
    console.log('About to call animateHeroBackground');
    // animateHeroBackground(); // REMOVED
    console.log('animateHeroBackground called');
    
    console.log('About to create cursor trail elements...');
    
    // Declare variables outside try block so they're accessible to animateCursorTrail function
    let cursorTrail, trailDot2, trailDot3;
    
    try {
        // Initialize cursor trail with 3 separate dots
        cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        document.body.appendChild(cursorTrail);
        console.log('Main cursor trail created');
        
        trailDot2 = document.createElement('div');
        trailDot2.className = 'trail-dot-2';
        document.body.appendChild(trailDot2);
        console.log('Trail dot 2 created');
        
        trailDot3 = document.createElement('div');
        trailDot3.className = 'trail-dot-3';
        document.body.appendChild(trailDot3);
        console.log('Trail dot 3 created');
        
        console.log('Cursor trail elements created:', { cursorTrail, trailDot2, trailDot3 });
        
        // Force initial positions to be visible for debugging
        trailDot2.style.left = '100px';
        trailDot2.style.top = '100px';
        trailDot3.style.left = '150px';
        trailDot3.style.top = '100px';
        
        // Force them to be visible
        trailDot2.style.opacity = '1';
        trailDot3.style.opacity = '1';
        
        console.log('Trail dots positioned at:', {
            dot2: [trailDot2.style.left, trailDot2.style.top],
            dot3: [trailDot3.style.left, trailDot3.style.top]
        });
        
        // Check if elements are actually in the DOM
        setTimeout(() => {
            const foundDot2 = document.querySelector('.trail-dot-2');
            const foundDot3 = document.querySelector('.trail-dot-3');
            console.log('DOM check - found elements:', { foundDot2, foundDot3 });
            console.log('All elements with trail-dot classes:', document.querySelectorAll('[class*="trail-dot"]'));
        }, 1000);
        
    } catch (error) {
        console.error('Error creating cursor trail:', error);
    }

    // Cursor trail effect with 3 dots
    let mouseX = -100, mouseY = -100; // Start off-screen
    let trail1X = -100, trail1Y = -100;
    let trail2X = -100, trail2Y = -100;
    let trail3X = -100, trail3Y = -100;
    let isMouseOnScreen = false;
    

    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseOnScreen = true;
    });
    
    // Handle mouse leaving the browser window
    document.addEventListener('mouseleave', () => {
        isMouseOnScreen = false;
        // Reset trail positions to off-screen when mouse leaves
        trail1X = -100;
        trail1Y = -100;
        trail2X = -100;
        trail2Y = -100;
        trail3X = -100;
        trail3Y = -100;
    });
    
    // Check if mouse is off-screen every frame
    function checkMouseOnScreen() {
        const isOffScreen = mouseX < 0 || mouseY < 0 || mouseX > window.innerWidth || mouseY > window.innerHeight;
        if (isOffScreen) {
            isMouseOnScreen = false;
            // Reset trail positions to off-screen when mouse leaves
            trail1X = -100;
            trail1Y = -100;
            trail2X = -100;
            trail2Y = -100;
            trail3X = -100;
            trail3Y = -100;
        }
    }
    
    // Also check on window resize
    window.addEventListener('resize', checkMouseOnScreen);

    // Animate cursor trail with different delays for each dot
    function animateCursorTrail() {
        // Check if mouse is off-screen every frame
        checkMouseOnScreen();
        
        if (!isMouseOnScreen) {
            // Hide all dots when cursor is off-screen
            cursorTrail.style.opacity = '0';
            trailDot2.style.opacity = '0';
            trailDot3.style.opacity = '0';
        } else {
            // Show all dots when cursor is on-screen
            cursorTrail.style.opacity = '1';
            trailDot2.style.opacity = '1';
            trailDot3.style.opacity = '1';
            
            // First dot (closest to cursor)
            trail1X += (mouseX - trail1X) * 0.15;
            trail1Y += (mouseY - trail1Y) * 0.15;
            
            // Second dot (medium delay)
            trail2X += (mouseX - trail2X) * 0.08;
            trail2Y += (mouseY - trail2Y) * 0.08;
            
            // Third dot (longest delay)
            trail3X += (mouseX - trail3X) * 0.05;
            trail3Y += (mouseY - trail3Y) * 0.05;
            
            // Update positions
            cursorTrail.style.left = trail1X + 'px';
            cursorTrail.style.top = trail1Y + 'px';
            
            trailDot2.style.left = trail2X + 'px';
            trailDot2.style.top = trail2Y + 'px';
            
            trailDot3.style.left = trail3X + 'px';
            trailDot3.style.top = trail3Y + 'px';
            
            // Debug: log positions every 60 frames (about once per second)
            if (Math.random() < 0.016) {
                console.log('Trail positions:', { 
                    main: [trail1X, trail1Y], 
                    dot2: [trail2X, trail2Y], 
                    dot3: [trail3X, trail3Y],
                    mouse: [mouseX, mouseY],
                    isMouseOnScreen
                });
            }
        }
        
        requestAnimationFrame(animateCursorTrail);
    }
    animateCursorTrail();

    // Mouse tracking for spotlight effect on project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // Mouse tracking for spotlight effect on writing cards
    document.querySelectorAll('.writing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // Initialize writing carousel
    initializeWritingCarousel();
    
    // Handle font loading to prevent flashing
    handleFontLoading();
    
    // Initialize magnetic hover effects
    initializeMagneticEffects();
    
    // Initialize floating shapes in hero section
    initializeFloatingShapes();

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .project-card, .writing-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize scroll progress
    createScrollProgress();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #5dade2, #3498db);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// Initialize particles
// DISABLED: Particles don't fit brutalist aesthetic
// createParticles(); 

// Enhanced cursor-responsive hero background animation with gold ripples
// REMOVED: Hero background animation logic

// Writing Carousel Functionality
function initializeWritingCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-track .writing-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentPosition = 0;
    const totalCards = cards.length;
    
    // Mobile: show 1 card, Desktop: show 3 cards
    const cardsPerView = isMobile() ? 1 : 3;
    const maxPosition = isMobile() ? totalCards - 1 : 2; // Mobile: all cards, Desktop: 3 positions
    
    if (!carouselTrack || cards.length === 0) return;
    
    // Function to slide to a specific position
    function slideTo(position) {
        // Ensure position is within bounds
        position = Math.max(0, Math.min(position, maxPosition));
        
        // Calculate the transform value to show the correct set of cards
        const cardWidth = cards[0].offsetWidth + (isMobile() ? 16 : 32); // Smaller gap on mobile
        const transformValue = -position * cardWidth;
        
        carouselTrack.style.transform = `translateX(${transformValue}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === position);
        });
        
        // Update button states
        prevBtn.disabled = position === 0;
        nextBtn.disabled = position === maxPosition;
        
        currentPosition = position;
    }
    
    // Function to go to next set of cards
    function nextSet() {
        slideTo(currentPosition + 1);
    }
    
    // Function to go to previous set of cards
    function prevSet() {
        slideTo(currentPosition - 1);
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSet);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSet);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideTo(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSet();
        } else if (e.key === 'ArrowRight') {
            nextSet();
        }
    });
    
    // Auto-advance carousel (optional - can be disabled)
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(nextSet, 10000); // Change every 10 seconds
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }
    
    // Pause auto-advance on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
        carouselContainer.addEventListener('mouseleave', startAutoAdvance);
    }
    
    // Initialize first position and start auto-advance
    slideTo(0);
    startAutoAdvance();
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next set
                nextSet();
            } else {
                // Swipe right - previous set
                prevSet();
            }
        }
    }
    
    // Handle window resize to recalculate positions
    window.addEventListener('resize', () => {
        slideTo(currentPosition);
    });
}

// Magnetic Hover Effects
function initializeMagneticEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Magnetic attraction effect
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            // Add subtle rotation for 3D effect
            const rotateX = (y / rect.height) * 10;
            const rotateY = (x / rect.width) * 10;
            
            button.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Font Loading Handler
function handleFontLoading() {
    // Check if fonts are loaded
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            const logoLink = document.querySelector('.nav-logo a');
            if (logoLink) {
                logoLink.classList.remove('font-loading');
                logoLink.classList.add('font-loaded');
            }
        });
    } else {
        // Fallback for browsers that don't support Font Loading API
        setTimeout(() => {
            const logoLink = document.querySelector('.nav-logo a');
            if (logoLink) {
                logoLink.classList.remove('font-loading');
                logoLink.classList.add('font-loaded');
            }
        }, 100);
    }
}

// Floating Shapes in Hero Section
function initializeFloatingShapes() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create floating shapes
    const shapes = [
        { type: 'triangle', size: '100px', animation: 'float1', duration: '25s', delay: '0s' },
        { type: 'circle', size: '80px', animation: 'float2', duration: '30s', delay: '5s' },
        { type: 'square', size: '60px', animation: 'float3', duration: '35s', delay: '10s' },
        { type: 'circle', size: '70px', animation: 'float4', duration: '28s', delay: '15s' }
    ];
    
    shapes.forEach((shape, index) => {
        const shapeElement = document.createElement('div');
        shapeElement.className = `floating-shape ${shape.type}`;
        
        // Set size for circle and square
        if (shape.type === 'circle' || shape.type === 'square') {
            shapeElement.style.width = shape.size;
            shapeElement.style.height = shape.size;
        }
        
        // Set animation
        shapeElement.style.animation = `${shape.animation} ${shape.duration} ease-in-out infinite`;
        shapeElement.style.animationDelay = shape.delay;
        
        // Position randomly within hero bounds
        const heroRect = hero.getBoundingClientRect();
        const x = Math.random() * (heroRect.width - 200) + 100;
        const y = Math.random() * (heroRect.height - 200) + 100;
        
        shapeElement.style.left = `${x}px`;
        shapeElement.style.top = `${y}px`;
        
        hero.appendChild(shapeElement);
    });
}

