document.addEventListener('DOMContentLoaded', function() {
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`a[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .education-card, .skill-category');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stagger animation for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// Stagger animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add hover effect to skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add click animation to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const titles_to_type = heroTitle.getElementsByTagName("span")
    let dataToClone = Array.from(titles_to_type).map(element => (
        element.textContent
    ));
    heroTitle.innerHTML = '{}';
    dataToClone = structuredClone(dataToClone)
    let j = 0
    let typeThis = () => {
        if (j < dataToClone.length){
            let title = dataToClone[j]
            j++;
            heroTitle.textContent = '{}';
            
            let i = 0
            let typing = () => {
                    if (i < title.length){
                        heroL = heroTitle.textContent.length
                        heroTitle.innerHTML = heroTitle.textContent.substring(0,heroL-1) +  title[i] + '}';
                        i++
                        setTimeout(typing, 50);
                    }
                }
            setTimeout(typing, 50)
            setTimeout(typeThis, 1000)
            }
        }
        setTimeout(typeThis, 500)
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingCard = document.querySelector('.floating-card');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    if (floatingCard) {
        floatingCard.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add dynamic counter animation for stats (if you want to add stats later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        }
    }, 16);
}

// Add email copy functionality
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.getAttribute('href').replace('mailto:', '');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Email copied to clipboard!');
        }
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
});

// CSS for additional animations and effects
const additionalStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

.nav-link.active {
    color: var(--primary-color);
}

.nav-link.active::after {
    width: 100%;
}

.hamburger.active .bar:nth-child(2) {
    opacity: 0;
}

.hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

body {
    opacity: 0;
    transition: opacity 0.3s ease;
}

body.loaded {
    opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;