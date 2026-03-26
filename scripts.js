/**
 * AspireAbroad LLP – Scripts
 * GSAP + ScrollTrigger + Lenis Smooth Scroll
 */

window.addEventListener('load', () => {
  initGSAP();
  initLenis();
  initNavbar();
  initHamburger();
  initActiveNavLink();
  initHeroAnimations();
  initScrollAnimations();
  initCinematicText();
  initStats();
  initTestimonialSlider();
  initJobFilter();
  initContactForm();
});

// ════════════════════════════════════════════════════
// 1. GSAP INIT
// ════════════════════════════════════════════════════
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
}

// ════════════════════════════════════════════════════
// 2. LENIS SMOOTH SCROLL
// ════════════════════════════════════════════════════
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.8 });
        document.getElementById('nav-links')?.classList.remove('open');
        document.getElementById('hamburger')?.classList.remove('open');
      }
    });
  });
}

// ════════════════════════════════════════════════════
// 3. NAVBAR – scroll state
// ════════════════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ════════════════════════════════════════════════════
// 4. HAMBURGER MENU
// ════════════════════════════════════════════════════
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ════════════════════════════════════════════════════
// 5. ACTIVE NAV LINK ON SCROLL
// ════════════════════════════════════════════════════
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAs.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}

// ════════════════════════════════════════════════════
// 6. HERO ANIMATIONS
// ════════════════════════════════════════════════════
function initHeroAnimations() {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.reveal-line, .hero-sub, .hero-btns, .hero-stats').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const heroBg = document.getElementById('hero-bg');

  // Mouse parallax on hero background
  if (heroBg) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(heroBg, {
        x: (e.clientX / window.innerWidth - 0.5) * 8,
        y: (e.clientY / window.innerHeight - 0.5) * 8,
        duration: 1.5,
        ease: 'power2.out',
      });
    });

    // Scroll parallax
    gsap.to(heroBg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    });
  }

  // Floating shapes mouse parallax
  document.addEventListener('mousemove', (e) => {
    const xPercent = e.clientX / window.innerWidth - 0.5;
    const yPercent = e.clientY / window.innerHeight - 0.5;
    document.querySelectorAll('.hero .shape').forEach((shape, i) => {
      const depth = (i + 1) * 0.5;
      shape.style.transform = `translate(${xPercent * 15 * depth}px, ${yPercent * 10 * depth}px)`;
    });
  });

  // Entrance timeline
  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.reveal-line', { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' })
    .to('.hero-sub',  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('.hero-btns', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .to('.hero-stats', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
}

// ════════════════════════════════════════════════════
// 7. SCROLL-TRIGGERED ANIMATIONS
// ════════════════════════════════════════════════════
function initScrollAnimations() {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll(
      '.why-card, .svc-card, .job-card, .stat-item, .ind-card, #cta-content, #contact-info, #contact-form-wrap, #footer'
    ).forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }

  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: header, start: 'top 85%' } }
    );
  });

  // About visual & content
  gsap.fromTo('#about-visual',
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#about', start: 'top 80%' } }
  );
  gsap.fromTo('#about-content',
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
      scrollTrigger: { trigger: '#about', start: 'top 80%' } }
  );

  // Why cards
  gsap.to('.why-card', {
    opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '#why-grid', start: 'top 82%' },
  });

  // Services cards
  gsap.to('.svc-card', {
    opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '#services-grid', start: 'top 82%' },
  });

  // Job filter + cards
  gsap.to('#jobs-filter', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#jobs-filter', start: 'top 88%' },
  });
  gsap.to('.job-card', {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '#jobs-grid', start: 'top 82%' },
  });

  // Stats parallax bg
  gsap.to('.stats-parallax-bg', {
    yPercent: -20, ease: 'none',
    scrollTrigger: { trigger: '.stats-section', start: 'top bottom', end: 'bottom top', scrub: 1 },
  });

  // Industry cards
  gsap.to('.ind-card', {
    opacity: 1, scale: 1, duration: 0.65, stagger: 0.1, ease: 'back.out(1.2)',
    scrollTrigger: { trigger: '#ind-grid', start: 'top 82%' },
  });

  // CTA
  gsap.to('#cta-content', {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#cta', start: 'top 80%' },
  });

  // Contact
  gsap.fromTo('#contact-info',
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '#contact', start: 'top 80%' } }
  );
  gsap.fromTo('#contact-form-wrap',
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
      scrollTrigger: { trigger: '#contact', start: 'top 80%' } }
  );

  // Footer
  gsap.to('#footer', {
    opacity: 1, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#footer', start: 'top 90%' },
  });
}

// ════════════════════════════════════════════════════
// 8. ANIMATED STATS COUNTER
// ════════════════════════════════════════════════════
function initStats() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target >= 1000
        ? Math.round(eased * target).toLocaleString()
        : Math.round(eased * target)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const statItem = entry.target.closest('.stat-item');
      if (statItem) {
        if (typeof gsap !== 'undefined') gsap.to(statItem, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        else { statItem.style.opacity = '1'; statItem.style.transform = 'none'; }
      }
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  statNums.forEach(el => observer.observe(el));
}

// ════════════════════════════════════════════════════
// 9. TESTIMONIAL SLIDER
// ════════════════════════════════════════════════════
function initTestimonialSlider() {
  const track = document.getElementById('t-track');
  const dots = document.querySelectorAll('#slider-dots .dot');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (!track) return;

  const total = track.querySelectorAll('.t-card').length;
  let current = 0;
  let autoTimer;

  const goTo = (index) => {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  const resetAuto = () => { clearInterval(autoTimer); autoTimer = setInterval(() => goTo(current + 1), 4500); };

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { goTo(dx < 0 ? current + 1 : current - 1); resetAuto(); }
  }, { passive: true });

  resetAuto();
}

// ════════════════════════════════════════════════════
// 10. JOB FILTER
// ════════════════════════════════════════════════════
function initJobFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const jobCards = document.querySelectorAll('.job-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      jobCards.forEach(card => {
        const show = filter === 'all' || card.dataset.region === filter;
        card.classList.toggle('hidden', !show);
        if (show && typeof gsap !== 'undefined') {
          gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
        } else if (show) {
          card.style.opacity = '1';
          card.style.transform = 'none';
        }
      });
    });
  });
}

// ════════════════════════════════════════════════════
// 11. CONTACT FORM
// ════════════════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';
    await new Promise(r => setTimeout(r, 1800));
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

    successMsg.style.display = 'flex';
    form.reset();

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(successMsg, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }
    setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#FF4D4D';
      input.style.boxShadow = '0 0 0 3px rgba(255,77,77,0.15)';
      valid = false;
      setTimeout(() => { input.style.borderColor = ''; input.style.boxShadow = ''; }, 2000);
    }
  });
  return valid;
}

// ════════════════════════════════════════════════════
// 12. CINEMATIC TEXT ANIMATIONS
// ════════════════════════════════════════════════════
function splitTextIntoWords(selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.classList.contains('split-done')) return;
    const words = el.innerText.split(/\s+/);
    el.innerHTML = '';
    words.forEach((word, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'word-wrap';
      wrap.innerHTML = `<span class="word-inner">${word}</span>`;
      el.appendChild(wrap);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.classList.add('split-done');
  });
}

function initCinematicText() {
  if (typeof gsap === 'undefined') return;

  splitTextIntoWords('.section-title');
  splitTextIntoWords('.about-lead');
  splitTextIntoWords('.cta-title');

  gsap.utils.toArray('.section-title, .about-lead, .cta-title').forEach(title => {
    gsap.from(title.querySelectorAll('.word-inner'), {
      scrollTrigger: { trigger: title, start: 'top 85%' },
      y: 50, opacity: 0, rotateX: -30, duration: 0.9, stagger: 0.04, ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.gradient-text').forEach(grad => {
    gsap.fromTo(grad,
      { backgroundPosition: '200% center' },
      { scrollTrigger: { trigger: grad, start: 'top 85%' },
        backgroundPosition: '0% center', duration: 1.5, ease: 'power2.out' }
    );
  });
}
