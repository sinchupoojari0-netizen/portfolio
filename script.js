/* =============================================
   SINCHANA SHEKHAR POOJARI — PORTFOLIO
   script.js — Interactions & Animations
   ============================================= */

/* ---- Dark / Light Mode Toggle ---- */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('ssp-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ssp-theme', next);
});

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- Sticky Navbar on Scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ---- Active Nav Link Highlight ---- */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

/* ---- Typing Animation ---- */
const roles = [
  'Frontend Developer',
  'Prompt Engineering Intern',
  'SQL & Data Enthusiast',
];

let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;
const el = document.getElementById('typingText');

function type() {
  const current = roles[roleIdx];

  if (!deleting) {
    // Typing
    charIdx++;
    el.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      // Pause at full word, then start deleting
      setTimeout(() => { deleting = true; type(); }, 1800);
      return;
    }
  } else {
    // Deleting
    charIdx--;
    el.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }

  const speed = deleting ? 45 : 80;
  setTimeout(type, speed);
}

// Start typing after a short delay
setTimeout(type, 700);

/* ---- Scroll Reveal ---- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));

/* ---- Skill Bar Animations ---- */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const pct = bar.getAttribute('data-fill');
        // Small delay for stagger effect
        setTimeout(() => {
          bar.style.width = pct + '%';
        }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-card').forEach(card => barObserver.observe(card));

/* ---- Back to Top ---- */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Contact Form ---- */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Simple validation
  if (!name || !email || !message) {
    formStatus.textContent = '⚠ Please fill in all fields.';
    formStatus.className   = 'form-status error';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = '⚠ Please enter a valid email address.';
    formStatus.className   = 'form-status error';
    return;
  }

  // Simulate submission (replace with actual endpoint / EmailJS / Formspree)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
    formStatus.className   = 'form-status success';
    contactForm.reset();
    submitBtn.textContent = 'Send Message →';
    submitBtn.disabled    = false;

    // Clear status after 5s
    setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
  }, 1400);
});

/* ---- Smooth anchor scrolling (supplemental for older browsers) ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ---- Soft-skill card hover ripple ---- */
document.querySelectorAll('.soft-skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.setProperty('--ripple', '1');
  });
});

/* ---- Project card subtle tilt on hover (desktop only) ---- */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---- Stats counter animation ---- */
function animateCounter(el, target) {
  let start = 0;
  const duration = 1400;
  const isDecimal = String(target).includes('.');
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const value = progress * target;
    el.textContent = isDecimal ? value.toFixed(2) : Math.floor(value) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isDecimal ? target.toFixed(2) : target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text  = num.textContent;
        const match = text.match(/[\d.]+/);
        if (match) {
          const val = parseFloat(match[0]);
          num.dataset.suffix = text.replace(/[\d.]+/, '');
          animateCounter(num, val);
        }
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

console.log('%c👩‍💻 Portfolio by Sinchana Shekhar Poojari', 'color:#a78bfa;font-family:Syne,sans-serif;font-size:16px;font-weight:bold;');
console.log('%c  sinchupoojari0@gmail.com', 'color:#64748b;');

// Open Resume Popup
function openResume() {
  document.getElementById("resumeModal").style.display = "block";
}

// Close Resume Popup
function closeResume() {
  document.getElementById("resumeModal").style.display = "none";
}

// Open popup in same tab
function openResume() {
  const modal = document.getElementById("resumeModal");
  const frame = document.getElementById("resumeFrame");

  frame.src = "C:\Users\INDIA\OneDrive\Desktop\New folder (2)";   // load PDF inside modal
  modal.style.display = "block";
}

// Close popup
function closeResume() {
  const modal = document.getElementById("resumeModal");
  const frame = document.getElementById("resumeFrame");

  modal.style.display = "none";
  frame.src = ""; // stop PDF when closing (important)
}

// Download without opening new tab
function downloadResume() {
  const a = document.createElement("a");
  a.href = "C:\Users\INDIA\OneDrive\Desktop\New folder (2)";
  a.download = "Sinchana_Shekhar_Poojari_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Close when clicking outside
window.addEventListener("click", function (e) {
  const modal = document.getElementById("resumeModal");
  if (e.target === modal) {
    closeResume();
  }
});