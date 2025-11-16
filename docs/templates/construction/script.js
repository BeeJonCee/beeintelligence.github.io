// Modern Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Enhanced sticky navigation with smooth transitions
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollY > lastScrollY && scrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Enhanced mobile menu with animations
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            bar.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                  index === 1 ? 'opacity(0)' :
                                  'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
        }
    });
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
        });
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Live Chat Widget
const chatButton = document.getElementById('chatButton');
const chatPopup = document.getElementById('chatPopup');
const chatClose = document.getElementById('chatClose');

chatButton.addEventListener('click', () => {
    chatPopup.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatPopup.classList.remove('active');
});

// Chat widget functions
function openWhatsApp() {
    window.open('https://wa.me/27123456789', '_blank');
}

function openPhone() {
    window.location.href = 'tel:+27123456789';
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    chatPopup.classList.remove('active');
}

// Enhanced Price Calculator with Modern Features
function calculateQuote() {
    const serviceType = document.getElementById('serviceType');
    const area = document.getElementById('area').value;
    const complexity = document.getElementById('complexity').value;
    
    if (!serviceType.value || !area) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const selectedOption = serviceType.options[serviceType.selectedIndex];
    const minPrice = parseFloat(selectedOption.dataset.min);
    const maxPrice = parseFloat(selectedOption.dataset.max);
    
    // Enhanced complexity multiplier with more options
    let complexityMultiplier = 1;
    switch(complexity) {
        case 'simple':
            complexityMultiplier = 1;
            break;
        case 'medium':
            complexityMultiplier = 1.3;
            break;
        case 'complex':
            complexityMultiplier = 1.7;
            break;
    }
    
    // Calculate base costs
    const baseMin = area * minPrice * complexityMultiplier;
    const baseMax = area * maxPrice * complexityMultiplier;
    
    // Add additional factors
    const materialCost = baseMin * 0.15; // 15% for materials
    const laborCost = baseMin * 0.25; // 25% for labor
    const overheadCost = baseMin * 0.1; // 10% for overhead
    
    const totalMin = Math.round(baseMin + materialCost + laborCost + overheadCost);
    const totalMax = Math.round(baseMax + (materialCost * 1.5) + (laborCost * 1.3) + (overheadCost * 1.2));
    
    // Animate the quote display
    animateQuote(totalMin, totalMax);
    
    // Show result with enhanced animation
    const result = document.getElementById('quoteResult');
    result.style.display = 'block';
    result.style.opacity = '0';
    result.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        result.style.transition = 'all 0.5s ease';
        result.style.opacity = '1';
        result.style.transform = 'translateY(0)';
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    
    // Show success notification
    showNotification('Quote calculated successfully!', 'success');
}

// Animate quote numbers
function animateQuote(min, max) {
    const minElement = document.getElementById('quoteMin');
    const maxElement = document.getElementById('quoteMax');
    
    animateNumber(minElement, 0, min, 1000);
    animateNumber(maxElement, 0, max, 1200);
}

// Number animation function
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (endValue - startValue) * easeOutQuart;
        
        element.textContent = `R${Math.round(currentValue).toLocaleString()}`;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Modern notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Enhanced Gallery Filter with Modern Animations
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Add loading state
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.style.opacity = '0.5';
        galleryGrid.style.pointerEvents = 'none';
        
        // Animate out items that don't match
        galleryItems.forEach((item, index) => {
            const shouldShow = filter === 'all' || item.dataset.category === filter;
            
            if (!shouldShow) {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Animate in matching items
        setTimeout(() => {
            galleryItems.forEach((item, index) => {
                const shouldShow = filter === 'all' || item.dataset.category === filter;
                
                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, index * 100);
                }
            });
            
            // Remove loading state
            setTimeout(() => {
                galleryGrid.style.opacity = '1';
                galleryGrid.style.pointerEvents = 'auto';
            }, galleryItems.length * 100 + 200);
        }, 300);
    });
});

// Add hover effects to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced Testimonials Carousel with Modern Features
let currentTestimonialIndex = 0;
let autoRotateInterval;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.classList.add('active');
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                testimonial.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateX(0)';
            }, 50);
        } else {
            testimonial.classList.remove('active');
            testimonial.style.transition = 'all 0.3s ease';
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(-30px)';
        }
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        
        // Animate dot
        if (i === index) {
            dot.style.transform = 'scale(1.3)';
            dot.style.background = '#4ecdc4';
        } else {
            dot.style.transform = 'scale(1)';
            dot.style.background = 'rgba(255, 255, 255, 0.3)';
        }
    });
}

function changeTestimonial(direction) {
    currentTestimonialIndex += direction;
    
    if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    }
    
    showTestimonial(currentTestimonialIndex);
    resetAutoRotate();
}

function currentTestimonial(index) {
    currentTestimonialIndex = index - 1;
    showTestimonial(currentTestimonialIndex);
    resetAutoRotate();
}

function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
        changeTestimonial(1);
    }, 6000);
}

// Add touch/swipe support for mobile
let startX = 0;
let endX = 0;
const carousel = document.querySelector('.testimonials-carousel');

if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeTestimonial(1); // Swipe left - next
            } else {
                changeTestimonial(-1); // Swipe right - previous
            }
        }
    }
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeTestimonial(-1);
    } else if (e.key === 'ArrowRight') {
        changeTestimonial(1);
    }
});

// Pause auto-rotate on hover
const testimonialContainer = document.querySelector('.testimonial-slides');
if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        resetAutoRotate();
    });
}

// Start auto-rotate
resetAutoRotate();

// Enhanced Form Handling with Modern Features
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Enhanced validation
    const validationErrors = validateForm(data, ['name', 'email', 'phone', 'service', 'preferred-date', 'time-slot']);
    
    if (validationErrors.length > 0) {
        showNotification(validationErrors[0], 'error');
        resetSubmitButton(submitButton, originalText);
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your booking request! We will contact you soon to confirm your consultation.', 'success');
        this.reset();
        resetSubmitButton(submitButton, originalText);
        
        // Track form submission (for analytics)
        trackFormSubmission('booking', data);
    }, 2000);
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Enhanced validation
    const validationErrors = validateForm(data, ['name', 'email', 'phone', 'service', 'message']);
    
    if (validationErrors.length > 0) {
        showNotification(validationErrors[0], 'error');
        resetSubmitButton(submitButton, originalText);
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        this.reset();
        resetSubmitButton(submitButton, originalText);
        
        // Track form submission (for analytics)
        trackFormSubmission('contact', data);
    }, 2000);
});

// Enhanced form validation
function validateForm(data, requiredFields) {
    const errors = [];
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            errors.push(`Please fill in the ${field.replace('-', ' ')} field`);
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function resetSubmitButton(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
    button.style.opacity = '1';
}

// Form tracking for analytics
function trackFormSubmission(formType, data) {
    // This would integrate with Google Analytics or other tracking services
    console.log(`Form submitted: ${formType}`, data);
    
    // Example: Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'form_type': formType,
            'event_category': 'engagement'
        });
    }
}

// Add real-time form validation
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', function() {
        validateField(this);
    });
    
    field.addEventListener('input', function() {
        clearFieldError(this);
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Clear previous errors
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${fieldName} is required`);
        return false;
    }
    
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (fieldName === 'phone' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ff6b6b';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ff6b6b;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section, header').forEach(section => {
    observer.observe(section);
});

// Add fade-in animation styles
const style = document.createElement('style');
style.textContent = `
    section, header {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Show first testimonial
    showTestimonial(0);
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});