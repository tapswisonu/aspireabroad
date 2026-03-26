/**
 * AspireAbroad LLP – Premium Cinematic Scripts
 * GSAP + ScrollTrigger + Lenis Smooth Scroll
 */

// ── Wait for everything to load ──────────────────────────────
window.addEventListener('load', () => {
  initLenis();
  initGSAP();
  initNavbar();
  initHamburger();
  initHeroAnimations();
  initScrollAnimations();
  initStats();
  initTestimonialSlider();
  initJobFilter();
  initContactForm();
  initFooterReveal();
});

// ════════════════════════════════════════════════════
// 1. LENIS SMOOTH SCROLL
// ════════════════════════════════════════════════════
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    if (typeof gsap !== 'undefined' && ScrollTrigger) {
      ScrollTrigger.update();
    }
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Anchor links smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.8 });
        // Close mobile menu if open
        document.getElementById('nav-links')?.classList.remove('open');
        document.getElementById('hamburger')?.classList.remove('open');
      }
    });
  });
}

// ════════════════════════════════════════════════════
// 2. GSAP INIT
// ════════════════════════════════════════════════════
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  if (typeof TextPlugin !== 'undefined') gsap.registerPlugin(TextPlugin);
}

// ════════════════════════════════════════════════════
// 3. NAVBAR – scroll state
// ════════════════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
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
// 5. HERO ANIMATIONS (no scroll dependency)
// ════════════════════════════════════════════════════
function initHeroAnimations() {
  if (typeof gsap === 'undefined') {
    // Fallback: show everything
    document.querySelectorAll('.hero-badge, .reveal-line, .hero-sub, .hero-btns, .hero-stats').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const tl = gsap.timeline({ delay: 0.2 });

  // Hero parallax on mouse move
  const heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    document.addEventListener('mousemove', (e) => {
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 8;
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 8;
      gsap.to(heroBg, {
        x: xPercent,
        y: yPercent,
        duration: 1.5,
        ease: 'power2.out',
      });
    });
  }

  // Hero scroll parallax
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Badge entrance
  tl.to('.hero-badge', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  });

  // Title lines
  tl.to('.reveal-line', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power3.out',
  }, '-=0.3');

  // Subtitle
  tl.to('.hero-sub', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.5');

  // Buttons
  tl.to('.hero-btns', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.4');

  // Stats
  tl.to('.hero-stats', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.3');
}

// ════════════════════════════════════════════════════
// 6. SCROLL-TRIGGERED ANIMATIONS
// ════════════════════════════════════════════════════
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback: show all hidden elements
    document.querySelectorAll(
      '.about-img-card, .about-text, .why-card, .svc-card, .job-card, .stat-item, .ind-card, .cta-content, .contact-info, .contact-form-wrap'
    ).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // ── Section headers ──
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: header, start: 'top 85%' },
      }
    );
  });

  // ── About section ──
  gsap.to('.about-img-card', {
    opacity: 1, x: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#about', start: 'top 80%' },
  });
  gsap.to('.about-text', {
    opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
    scrollTrigger: { trigger: '#about', start: 'top 80%' },
  });

  // ── Why cards – stagger ──
  gsap.to('.why-card', {
    opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '#why-grid', start: 'top 82%' },
  });

  // ── Services cards ──
  gsap.to('.svc-card', {
    opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '#services-grid', start: 'top 82%' },
  });

  // ── Job filter ──
  gsap.to('#jobs-filter', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#jobs-filter', start: 'top 88%' },
  });

  // ── Job cards ──
  gsap.to('.job-card', {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '#jobs-grid', start: 'top 82%' },
  });

  // ── Industry cards ──
  gsap.to('.ind-card', {
    opacity: 1, scale: 1, duration: 0.65, stagger: 0.1, ease: 'back.out(1.2)',
    scrollTrigger: { trigger: '#ind-grid', start: 'top 82%' },
  });

  // ── CTA section ──
  gsap.to('#cta-content', {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#cta', start: 'top 80%' },
  });

  // ── Contact section ──
  gsap.to('#contact-info', {
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#contact', start: 'top 80%' },
  });
  gsap.to('#contact-form-wrap', {
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
    scrollTrigger: { trigger: '#contact', start: 'top 80%' },
  });

  // ── Footer ──
  gsap.to('#footer', {
    opacity: 1, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#footer', start: 'top 90%' },
  });

  // ── Stats parallax background ──
  gsap.to('.stats-parallax-bg', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.stats-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

// ════════════════════════════════════════════════════
// 7. ANIMATED STATS COUNTER
// ════════════════════════════════════════════════════
function initStats() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  const formatNumber = (num) => {
    if (num >= 1000) return num.toLocaleString();
    return num.toString();
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  // Trigger on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statItem = entry.target.closest('.stat-item');
        if (statItem) {
          // Reveal with GSAP if available
          if (typeof gsap !== 'undefined') {
            gsap.to(statItem, {
              opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            });
          } else {
            statItem.style.opacity = '1';
            statItem.style.transform = 'none';
          }
        }
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNums.forEach(el => observer.observe(el));
}

// ════════════════════════════════════════════════════
// 8. TESTIMONIAL SLIDER
// ════════════════════════════════════════════════════
function initTestimonialSlider() {
  const track = document.getElementById('t-track');
  const dots = document.querySelectorAll('#slider-dots .dot');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (!track) return;

  const cards = track.querySelectorAll('.t-card');
  const total = cards.length;
  let current = 0;
  let autoTimer;

  const goTo = (index) => {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  const autoPlay = () => {
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  };

  const resetAuto = () => {
    clearInterval(autoTimer);
    autoPlay();
  };

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
  });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      goTo(dx < 0 ? current + 1 : current - 1);
      resetAuto();
    }
  }, { passive: true });

  autoPlay();
}

// ════════════════════════════════════════════════════
// 9. JOB FILTER
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
        if (show) {
          card.classList.remove('hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
            );
          } else {
            card.style.opacity = '1';
            card.style.transform = 'none';
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ════════════════════════════════════════════════════
// 10. FOOTER REVEAL (IntersectionObserver fallback)
// ════════════════════════════════════════════════════
function initFooterReveal() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  if (typeof gsap !== 'undefined') return; // handled by GSAP above

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      footer.style.transition = 'opacity 1s ease';
      footer.style.opacity = '1';
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(footer);
}

// ════════════════════════════════════════════════════
// 11. CONTACT FORM
// ════════════════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  // Focus animations
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.setProperty('--focus', '1');
    });
    input.addEventListener('blur', () => {
      input.parentElement.style.removeProperty('--focus');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';

    // Simulate API call
    await new Promise(r => setTimeout(r, 1800));

    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

    successMsg.style.display = 'flex';
    form.reset();

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(successMsg,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }

    setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
  });
}

function validateForm(form) {
  let valid = true;
  const required = form.querySelectorAll('[required]');
  required.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#FF4D4D';
      input.style.boxShadow = '0 0 0 3px rgba(255,77,77,0.15)';
      valid = false;
      setTimeout(() => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      }, 2000);
    }
  });
  return valid;
}

// ════════════════════════════════════════════════════
// 12. FLOATING SHAPES ENHANCED MOUSE PARALLAX
// ════════════════════════════════════════════════════
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.hero .shape');
  const xPercent = (e.clientX / window.innerWidth - 0.5);
  const yPercent = (e.clientY / window.innerHeight - 0.5);

  shapes.forEach((shape, i) => {
    const depth = (i + 1) * 0.5;
    const x = xPercent * 15 * depth;
    const y = yPercent * 10 * depth;
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ════════════════════════════════════════════════════
// 13. ACTIVE NAV LINK ON SCROLL
// ════════════════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });
  navAs.forEach(a => {
    a.classList.remove('active-link');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active-link');
    }
  });
}, { passive: true });
