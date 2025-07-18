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
            navLogo.style.background = 'linear-gradient(135deg, #8b7355, #a67c52)';
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
            navLogo.style.background = 'linear-gradient(135deg, #8b7355, #a67c52)';
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

// Enhanced scroll animations and mouse tracking
// Single DOMContentLoaded event listener to handle all initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    
    // Initialize hero background animation
    console.log('About to call animateHeroBackground');
    // animateHeroBackground(); // REMOVED
    console.log('animateHeroBackground called');
    
    // Initialize cursor trail
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);

    // Cursor trail effect with 3 dots
    let mouseX = 0, mouseY = 0;
    let trail1X = 0, trail1Y = 0;
    let trail2X = 0, trail2Y = 0;
    let trail3X = 0, trail3Y = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor trail with different delays for each dot
    function animateCursorTrail() {
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
        
        // Update pseudo-elements for the other dots
        cursorTrail.style.setProperty('--trail2-x', trail2X + 'px');
        cursorTrail.style.setProperty('--trail2-y', trail2Y + 'px');
        cursorTrail.style.setProperty('--trail3-x', trail3X + 'px');
        cursorTrail.style.setProperty('--trail3-y', trail3Y + 'px');
        
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

