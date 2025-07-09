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
    animateHeroBackground();
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
function animateHeroBackground() {
    console.log('animateHeroBackground called');
    const canvas = document.getElementById('hero-bg-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    console.log('Canvas found:', canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context!');
        return;
    }
    console.log('2D context obtained');
    
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let time = 0;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let isMouseMoving = false;
    
    console.log('Canvas dimensions:', width, height);
    
    // Ripple system
    const ripples = [];
    const maxRipples = 8;
    
    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = Math.max(width, height) * 0.8;
            this.opacity = 0.8;
            this.speed = 2;
            this.thickness = 2;
            this.created = time;
        }
        
        update() {
            this.radius += this.speed;
            this.opacity = Math.max(0, 0.8 - (this.radius / this.maxRadius) * 0.8);
            return this.opacity > 0;
        }
        
        draw() {
            ctx.save();
            ctx.strokeStyle = '#ffd700'; // Golden color
            ctx.lineWidth = this.thickness;
            ctx.globalAlpha = this.opacity * 0.8; // Brighter ripples
            
            // Create gradient for golden glowing effect
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, 'rgba(255, 215, 0, 0.9)'); // Bright golden center
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)'); // White glow in middle
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)'); // Fade to transparent
            
            ctx.strokeStyle = gradient;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }
    
    // Grid of connection points - notebook/graph paper pattern
    const gridPoints = [];
    const baseGridSize = 80; // Smaller spacing for notebook lines
    const cols = Math.ceil(width / baseGridSize);
    const rows = Math.ceil(height / baseGridSize);
    
    // Create regular grid pattern (like notebook paper)
    for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
            gridPoints.push({
                x: i * baseGridSize,
                y: j * baseGridSize,
                originalX: i * baseGridSize,
                originalY: j * baseGridSize,
                vx: 0,
                vy: 0,
                connections: [] // Track which points this connects to
            });
        }
    }
    
    // Create notebook grid connections (horizontal lines only)
    gridPoints.forEach((point, index) => {
        const connections = [];
        const col = Math.round(point.originalX / baseGridSize);
        const row = Math.round(point.originalY / baseGridSize);
        
        // Connect only horizontally (same row, adjacent columns)
        gridPoints.forEach((otherPoint, otherIndex) => {
            if (index !== otherIndex) {
                const otherCol = Math.round(otherPoint.originalX / baseGridSize);
                const otherRow = Math.round(otherPoint.originalY / baseGridSize);
                
                // Connect only horizontally (like notebook writing lines)
                if (otherRow === row && Math.abs(otherCol - col) === 1) {
                    connections.push(otherIndex);
                }
            }
        });
        point.connections = connections;
    });
    
    function resize() {
        width = canvas.offsetWidth = canvas.parentElement.offsetWidth;
        height = canvas.offsetHeight = canvas.parentElement.offsetHeight;
        
        // Reinitialize grid points
        gridPoints.length = 0;
        const cols = Math.ceil(width / baseGridSize);
        const rows = Math.ceil(height / baseGridSize);
        
        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                gridPoints.push({
                    x: i * baseGridSize,
                    y: j * baseGridSize,
                    originalX: i * baseGridSize,
                    originalY: j * baseGridSize,
                    vx: 0,
                    vy: 0,
                    connections: []
                });
            }
        }
        // Re-establish connections after resize
        gridPoints.forEach((point, index) => {
            const connections = [];
            const col = Math.round(point.originalX / baseGridSize);
            const row = Math.round(point.originalY / baseGridSize);
            
            gridPoints.forEach((otherPoint, otherIndex) => {
                if (index !== otherIndex) {
                    const otherCol = Math.round(otherPoint.originalX / baseGridSize);
                    const otherRow = Math.round(otherPoint.originalY / baseGridSize);
                    
                    if (otherRow === row && Math.abs(otherCol - col) === 1) {
                        connections.push(otherIndex);
                    }
                }
            });
            point.connections = connections;
        });
    }
    window.addEventListener('resize', resize);
    resize();
    
    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const newMouseX = e.clientX - rect.left;
        const newMouseY = e.clientY - rect.top;
        
        // Check if mouse is actually moving
        const mouseDelta = Math.sqrt((newMouseX - lastMouseX) ** 2 + (newMouseY - lastMouseY) ** 2);
        isMouseMoving = mouseDelta > 2; // Only consider it moving if it moved more than 2 pixels
        
        // Reduce responsiveness on the right side (reduce force by 50% on right half)
        const rightSideFactor = newMouseX > width / 2 ? 0.5 : 1.0;
        
        mouseX = newMouseX;
        mouseY = newMouseY;
        
        // Create new ripple occasionally, but only when actually moving
        if (isMouseMoving && Math.random() < 0.15 && ripples.length < maxRipples) {
            ripples.push(new Ripple(mouseX, mouseY));
        }
        
        lastMouseX = newMouseX;
        lastMouseY = newMouseY;
    });
    
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const newMouseX = e.clientX - rect.left;
        const newMouseY = e.clientY - rect.top;
        
        // Check if mouse is actually moving
        const mouseDelta = Math.sqrt((newMouseX - lastMouseX) ** 2 + (newMouseY - lastMouseY) ** 2);
        isMouseMoving = mouseDelta > 2;
        
        mouseX = newMouseX;
        mouseY = newMouseY;
        lastMouseX = newMouseX;
        lastMouseY = newMouseY;
    });
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Subtle gradient background
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#f8f6f2');
        grad.addColorStop(1, '#f4e4bc');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        

        
        // Check if cursor is in the hero area
        const isCursorInHero = mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
        
        // Update grid points based on ripples
        gridPoints.forEach(point => {
            let totalForceX = 0;
            let totalForceY = 0;
            
            // Only apply forces if cursor is in the area AND mouse is moving
            if (isCursorInHero && isMouseMoving) {
                // Calculate force from all ripples
                ripples.forEach(ripple => {
                    const dx = point.x - ripple.x;
                    const dy = point.y - ripple.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < ripple.radius && distance > ripple.radius - 60) {
                        const force = (ripple.radius - distance) / 60 * ripple.opacity * 0.2; // Even gentler force for smoother movement
                        const angle = Math.atan2(dy, dx);
                        totalForceX += Math.cos(angle) * force;
                        totalForceY += Math.sin(angle) * force;
                    }
                });
                
                // Apply forces with smoother physics
                point.vx += totalForceX;
                point.vy += totalForceY;
                
                // Return to original position (gentle return when interacting)
                const returnStrength = 0.03;
                point.vx += (point.originalX - point.x) * returnStrength;
                point.vy += (point.originalY - point.y) * returnStrength;
                
                // Update position
                point.x += point.vx;
                point.y += point.vy;
                
                // Smooth damping when interacting
                const damping = 0.99;
                point.vx *= damping;
                point.vy *= damping;
            } else {
                // When not interacting, immediately return to original position
                point.x = point.originalX;
                point.y = point.originalY;
                point.vx = 0;
                point.vy = 0;
            }
        });
        
        // Draw notebook grid lines with water physics
        ctx.save();
        
        // Draw only horizontal lines (like notebook writing lines)
        gridPoints.forEach((point, index) => {
            point.connections.forEach(connectionIndex => {
                const connectedPoint = gridPoints[connectionIndex];
                if (connectedPoint) {
                    // Only draw horizontal connections (same y-coordinate)
                    if (Math.abs(connectedPoint.y - point.y) < 1) {
                        const dx = connectedPoint.x - point.x;
                        const dy = connectedPoint.y - point.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        // Calculate line opacity based on movement (more visible when moving)
                        const baseOpacity = (isCursorInHero && isMouseMoving) ? 0.12 : 0.05; // Much dimmer when not interacting
                        const movementOpacity = (isCursorInHero && isMouseMoving) ? 
                            (Math.abs(point.vx) + Math.abs(point.vy) + Math.abs(connectedPoint.vx) + Math.abs(connectedPoint.vy)) * 0.5 : 0;
                        const opacity = baseOpacity + movementOpacity;
                        
                        // Use golden color for the lines
                        ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
                        ctx.lineWidth = 0.6; // Thin lines like notebook paper
                        
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(connectedPoint.x, connectedPoint.y);
                        ctx.stroke();
                    }
                }
            });
        });
        
        // Add additional horizontal writing lines between grid points
        const lineSpacing = baseGridSize / 3; // Lines between grid points
        const heroTextElement = document.querySelector('.hero-title');
        let heroTextBox = null;
        if (heroTextElement) {
            const rect = heroTextElement.getBoundingClientRect();
            // Convert to canvas coordinates
            const canvasRect = canvas.getBoundingClientRect();
            heroTextBox = {
                left: rect.left - canvasRect.left,
                right: rect.right - canvasRect.left,
                top: rect.top - canvasRect.top,
                bottom: rect.bottom - canvasRect.top
            };
        }
        const centerY = height / 2;
        for (let y = lineSpacing; y < height; y += lineSpacing) {
            // Remove the middle line (skip if y is close to center)
            if (Math.abs(y - centerY) < 2) continue;
            // Find the grid points that would be affected by this line
            const affectedPoints = gridPoints.filter(point => 
                Math.abs(point.y - y) < baseGridSize / 2
            );
            if (affectedPoints.length > 0) {
                // Calculate average movement of affected points
                const avgMovement = affectedPoints.reduce((sum, point) => 
                    sum + Math.abs(point.vx) + Math.abs(point.vy), 0
                ) / affectedPoints.length;
                // Only animate (brighter) if cursor is in hero and moving
                const isActive = isCursorInHero && isMouseMoving;
                const baseOpacity = isActive ? 0.08 : 0.03;
                const movementFactor = isActive ? 0.3 : 0.1;
                const lineOpacity = baseOpacity + avgMovement * movementFactor;
                ctx.strokeStyle = `rgba(255, 215, 0, ${lineOpacity})`;
                ctx.lineWidth = 0.4;
                ctx.beginPath();
                // If we have hero text, darken segments not near the text
                if (heroTextBox && y > heroTextBox.top && y < heroTextBox.bottom) {
                    // Draw left segment (before text)
                    if (heroTextBox.left > 0) {
                        ctx.moveTo(0, y);
                        ctx.lineTo(heroTextBox.left - 10, y);
                    }
                    // Draw right segment (after text)
                    if (heroTextBox.right < width) {
                        ctx.moveTo(heroTextBox.right + 10, y);
                        ctx.lineTo(width, y);
                    }
                    ctx.globalAlpha = 0.25; // Darker for outside text
                    ctx.stroke();
                    // Draw over the text area with normal opacity
                    ctx.beginPath();
                    ctx.moveTo(heroTextBox.left - 10, y);
                    ctx.lineTo(heroTextBox.right + 10, y);
                    ctx.globalAlpha = 1.0; // Normal for under text
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                } else {
                    ctx.moveTo(0, y);
                    ctx.lineTo(width, y);
                    ctx.globalAlpha = 1.0;
                    ctx.stroke();
                }
            }
        }
        
        ctx.restore();
        
        // Update and draw ripples with golden colors
        for (let i = ripples.length - 1; i >= 0; i--) {
            if (!ripples[i].update()) {
                ripples.splice(i, 1);
            } else {
                ripples[i].draw();
            }
        }
        
        // Add subtle ambient ripples only when cursor is in area AND moving
        if (isCursorInHero && isMouseMoving && Math.random() < 0.02 && ripples.length < maxRipples) {
            ripples.push(new Ripple(
                Math.random() * width,
                Math.random() * height
            ));
        }
        
        time++;
        requestAnimationFrame(draw);
    }
    console.log('Starting animation loop');
    draw();
}

