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
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .writing-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
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
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor trail element
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);

    // Cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor trail with delay
    function animateCursorTrail() {
        // Smooth follow with delay
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
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

// Initialize scroll progress
createScrollProgress();

// Initialize particles
// DISABLED: Particles don't fit brutalist aesthetic
// createParticles(); 