// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe feature cards and pricing cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Mobile menu toggle (if needed in future)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');

    // Only add mobile menu on small screens
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        menuToggle.setAttribute('aria-label', 'Toggle menu');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-menu-open');
        });

        navbar.insertBefore(menuToggle, navLinks);
    }
}

// Handle plan parameter in URL (for analytics or pre-selection)
function handlePlanParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');

    if (plan === 'basic' || plan === 'plus') {
        const planCard = document.querySelector(`[href*="plan=${plan}"]`)?.closest('.pricing-card');
        if (planCard) {
            planCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            planCard.style.animation = 'pulse 1s ease-in-out';
        }
    }
}

// Add fade-in animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }

    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        color: var(--text-dark);
    }

    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }

        .nav-links {
            position: fixed;
            top: 60px;
            right: -100%;
            width: 250px;
            height: calc(100vh - 60px);
            background: white;
            flex-direction: column;
            align-items: flex-start;
            padding: 2rem;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1);
            transition: right 0.3s ease;
        }

        .nav-links.mobile-menu-open {
            right: 0;
        }

        .nav-links a {
            display: block !important;
            width: 100%;
            padding: 0.75rem 0;
        }
    }
`;
document.head.appendChild(style);

// Set current year dynamically
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    setCurrentYear();
    handlePlanParameter();
    createMobileMenu();
});

// Track CTA clicks (for analytics integration)
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        const buttonHref = e.target.getAttribute('href');

        // Log to console (replace with actual analytics tracking)
        console.log('CTA Click:', {
            text: buttonText,
            href: buttonHref,
            timestamp: new Date().toISOString()
        });

        // Example: Google Analytics tracking (uncomment when GA is set up)
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'cta_click', {
        //         'button_text': buttonText,
        //         'button_href': buttonHref
        //     });
        // }
    });
});
