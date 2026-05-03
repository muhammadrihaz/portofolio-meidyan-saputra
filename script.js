// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
    });
});

// ===========================
// GALLERY FILTER FUNCTIONALITY
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button styling
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-700', 'text-gray-300');
            });
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-gray-700', 'text-gray-300');

            // Filter and animate gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    item.style.opacity = '1';
                    item.style.visibility = 'visible';
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.visibility = 'hidden';
                }
            });
        });
    });
});

// ===========================
// CONTACT FORM HANDLING
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form
        if (!name || !email || !subject || !message) {
            showToast('Please fill in all fields!', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address!', 'error');
            return;
        }

        // Show success message
        showToast('Message sent successfully! Thank you for contacting me.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ===========================
// TOAST NOTIFICATION
// ===========================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    
    // Set color based on type
    if (type === 'success') {
        toast.className = 'fixed bottom-8 left-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition';
    } else if (type === 'error') {
        toast.className = 'fixed bottom-8 left-8 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition';
    }
    
    toast.classList.remove('hidden');
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// NAVBAR ACTIVE LINK ON SCROLL
// ===========================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-400');
        link.classList.add('text-gray-300');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-400');
            link.classList.remove('text-gray-300');
        }
    });
});

// ===========================
// BACK TO TOP BUTTON
// ===========================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// PARALLAX EFFECT FOR HERO
// ===========================
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        const scrollPosition = window.pageYOffset;
        const heroContent = heroSection.querySelector('[data-aos]');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================
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

// Observe all elements with data-aos
document.querySelectorAll('[data-aos]').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});
