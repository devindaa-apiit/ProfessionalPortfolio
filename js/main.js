/**
 * Premium Portfolio JavaScript Logic
 * Contains: 
 * 1. Mobile Menu Toggle
 * 2. Sticky Header scroll effect
 * 3. Scroll Reveal intersection observer
 * 4. Active Link Spy on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const header = document.querySelector('header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const revealElements = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('contactForm');

  // ==========================================
  // 1. Mobile Menu Drawer Interactivity
  // ==========================================
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 2. Sticky Header on Scroll
  // ==========================================
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Run on startup in case page loaded scrolled down

  // ==========================================
  // 3. Scroll Reveal Animation (Intersection Observer)
  // ==========================================
  const revealObserverOptions = {
    root: null, // viewport
    threshold: 0.15, // 15% of element visible
    rootMargin: '0px 0px -50px 0px' // offset slightly early
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ==========================================
  // 4. Scroll Active Navigation Link Spy
  // ==========================================
  const spyObserverOptions = {
    root: null,
    threshold: 0.5, // 50% section in view
    rootMargin: '-80px 0px -40% 0px' // adjust for header offset
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, spyObserverOptions);

  sections.forEach(section => {
    spyObserver.observe(section);
  });

  // ==========================================
  // 5. Contact Form Submissions Interactivity
  // ==========================================
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Basic local validation
      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      // Demo success prompt
      alert(`Thank you, ${name}! Your message has been received. This form simulates submission for Laboratory 01.`);
      contactForm.reset();
    });
  }
});
