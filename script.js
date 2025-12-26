// OTP Management
let otpSent = false;
let otpTimer = null;
let otpResendTimer = 60;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentForms();
    initializeStickyAppointment();
    initializeSmoothScrolling();
    initializeFAQ();
    initializeScrollAnimations();
});

// Initialize appointment forms
function initializeAppointmentForms() {
    const appointmentForm = document.getElementById('appointmentForm');
    const consultationForm = document.getElementById('consultationForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAppointmentSubmit(this);
        });
    }
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleConsultationSubmit(this);
        });
    }
}

// Send OTP
function sendOTP() {
    const phoneInput = document.getElementById('phone') || document.querySelector('#consultationForm input[type="tel"]');
    
    if (!phoneInput || !phoneInput.value) {
        alert('Please enter a valid phone number');
        return;
    }
    
    const phoneNumber = phoneInput.value;
    
    // Validate phone number (basic validation)
    if (phoneNumber.length < 10) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }
    
    // Show OTP input group
    const otpGroup = document.getElementById('otpGroup');
    if (otpGroup) {
        otpGroup.classList.add('show');
        otpGroup.style.display = 'flex';
    }
    
    // Simulate OTP sending (in real implementation, this would call an API)
    console.log('OTP sent to:', phoneNumber);
    alert('OTP has been sent to ' + phoneNumber);
    
    otpSent = true;
    
    // Start resend timer
    startOTPTimer();
}

// Start OTP timer
function startOTPTimer() {
    const resendBtn = document.querySelector('.btn-resend-otp');
    if (!resendBtn) return;
    
    otpResendTimer = 60;
    resendBtn.disabled = true;
    resendBtn.textContent = `Resend OTP (${otpResendTimer}s)`;
    
    otpTimer = setInterval(function() {
        otpResendTimer--;
        if (otpResendTimer > 0) {
            resendBtn.textContent = `Resend OTP (${otpResendTimer}s)`;
        } else {
            clearInterval(otpTimer);
            resendBtn.disabled = false;
            resendBtn.textContent = 'Resend OTP';
        }
    }, 1000);
}

// Verify OTP
function verifyOTP() {
    const otpInput = document.getElementById('otp');
    if (!otpInput || !otpInput.value) {
        alert('Please enter the OTP');
        return;
    }
    
    const otp = otpInput.value;
    
    // Simulate OTP verification (in real implementation, this would call an API)
    if (otp.length === 6) {
        console.log('OTP verified:', otp);
        alert('OTP verified successfully!');
        otpInput.style.borderColor = '#28a745';
        return true;
    } else {
        alert('Please enter a valid 6-digit OTP');
        otpInput.style.borderColor = '#dc3545';
        return false;
    }
}

// Open appointment modal
function openAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close appointment modal
function closeAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('appointmentForm');
        if (form) {
            form.reset();
            const otpGroup = document.getElementById('otpGroup');
            if (otpGroup) {
                otpGroup.classList.remove('show');
                otpGroup.style.display = 'none';
            }
            otpSent = false;
            if (otpTimer) {
                clearInterval(otpTimer);
            }
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('appointmentModal');
    if (event.target === modal) {
        closeAppointmentModal();
    }
}

// Handle appointment form submission
function handleAppointmentSubmit(form) {
    const phoneInput = document.getElementById('phone');
    const citySelect = document.getElementById('city');
    const otpInput = document.getElementById('otp');
    
    if (!phoneInput.value) {
        alert('Please enter your phone number');
        return;
    }
    
    if (!citySelect.value) {
        alert('Please select a city');
        return;
    }
    
    if (!otpSent) {
        sendOTP();
        return;
    }
    
    if (otpInput && otpInput.value) {
        if (verifyOTP()) {
            // Simulate form submission
            console.log('Appointment booking submitted');
            console.log('Phone:', phoneInput.value);
            console.log('City:', citySelect.value);
            
            alert('Thank you! Your appointment request has been submitted. We will call you back within 5 minutes.');
            closeAppointmentModal();
        }
    } else {
        alert('Please verify your OTP');
    }
}

// Handle consultation form submission
function handleConsultationSubmit(form) {
    const phoneInput = form.querySelector('input[type="tel"]');
    const citySelect = form.querySelector('select');
    
    if (!phoneInput.value) {
        alert('Please enter your phone number');
        return;
    }
    
    if (!citySelect.value) {
        alert('Please select a city');
        return;
    }
    
    // Simulate form submission
    console.log('Consultation request submitted');
    console.log('Phone:', phoneInput.value);
    console.log('City:', citySelect.value);
    
    alert('Thank you! Our expert will contact you within 5 minutes.');
    form.reset();
}

// Initialize sticky appointment button
function initializeStickyAppointment() {
    const stickyAppointment = document.getElementById('appointmentSticky');
    if (!stickyAppointment) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show sticky appointment after scrolling past hero section
        if (scrollPosition > 400) {
            stickyAppointment.classList.add('show');
        } else {
            stickyAppointment.classList.remove('show');
        }
    });
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 150;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize FAQ accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            // Close all FAQs initially
            item.classList.remove('active');
        }
    });
}

// Toggle FAQ item
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Package selection handler
document.addEventListener('DOMContentLoaded', function() {
    const packageButtons = document.querySelectorAll('.btn-select-package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const symptomCard = this.closest('.symptom-item');
            const symptomName = symptomCard ? symptomCard.querySelector('h3').textContent : 'Selected Package';
            
            alert('You selected: ' + symptomName + '\n\nRedirecting to appointment booking...');
            openAppointmentModal();
        });
    });
});

// Play video handler (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            alert('Video playback would start here. In a real implementation, this would load and play a video player.');
        });
    }
});

// Form validation helpers
function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function validateOTP(otp) {
    const otpRegex = /^[0-9]{6}$/;
    return otpRegex.test(otp);
}

// Add input validation on blur
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhoneNumber(this.value)) {
                this.style.borderColor = '#dc3545';
                this.setCustomValidity('Please enter a valid 10-digit phone number');
            } else {
                this.style.borderColor = '#28a745';
                this.setCustomValidity('');
            }
        });
        
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
    
    const otpInput = document.getElementById('otp');
    if (otpInput) {
        otpInput.addEventListener('input', function() {
            // Only allow numbers and limit to 6 digits
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 6);
        });
        
        otpInput.addEventListener('blur', function() {
            if (this.value && !validateOTP(this.value)) {
                this.style.borderColor = '#dc3545';
            } else if (this.value) {
                this.style.borderColor = '#28a745';
            }
        });
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll-to-top button on scroll
let scrollTopButton = null;

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        if (!scrollTopButton) {
            scrollTopButton = document.createElement('button');
            scrollTopButton.innerHTML = '↑';
            scrollTopButton.className = 'scroll-top-btn';
            scrollTopButton.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: #e78159;
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                z-index: 999;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                transition: transform 0.3s;
            `;
            scrollTopButton.addEventListener('click', scrollToTop);
            scrollTopButton.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            scrollTopButton.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            document.body.appendChild(scrollTopButton);
        }
        scrollTopButton.style.display = 'block';
    } else if (scrollTopButton) {
        scrollTopButton.style.display = 'none';
    }
});

// Handle escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAppointmentModal();
    }
});

// Add loading state for form submissions
function setFormLoading(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
            submitButton.textContent = 'Submitting...';
        } else {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.innerHTML = '<span class="callback-icon">📞</span> Submit';
        }
    }
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animate-on-scroll class to feature items, result items, etc.
    const itemsToAnimate = document.querySelectorAll('.feature-item, .result-item, .benefit-item, .symptom-item, .review-item, .faq-item');
    itemsToAnimate.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}





