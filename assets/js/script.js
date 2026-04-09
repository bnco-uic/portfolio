/* ========================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   ======================================== */

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showErrorMessage('Please fill out all fields.');
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      showErrorMessage('Please enter a valid email address.');
      return;
    }

    // Simulate form submission (in production, send to backend)
    try {
      // For demonstration, we'll show a success message
      // In a real scenario, you'd send this to a backend service
      console.log('Form Data:', formData);
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      showSuccessMessage('Thank you for your message! I will get back to you soon.');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        hideSuccessMessage();
      }, 5000);
    } catch (error) {
      showErrorMessage('An error occurred. Please try again later.');
    }
  });
}

// Show success message
function showSuccessMessage(message) {
  const successDiv = document.querySelector('.success-message');
  if (successDiv) {
    successDiv.textContent = message;
    successDiv.classList.add('show');
  }
}

// Show error message
function showErrorMessage(message) {
  const errorDiv = document.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
  }
}

// Hide success message
function hideSuccessMessage() {
  const successDiv = document.querySelector('.success-message');
  if (successDiv) {
    successDiv.classList.remove('show');
  }
}

// Smooth scroll to sections
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

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.experience-item, .project-card, .skill-category').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Dropdown menu for mobile (if needed)
function toggleMobileMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('active');
}

// Download Resume Handler
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    // To use this, ensure you have a resume.pdf file in the root directory
    window.location.href = 'resume.pdf';
  });
}
