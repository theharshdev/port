/**
 * Ultra-Smooth Cinematic Scroll Engine (Lenis + GSAP ScrollTrigger & ScrollToPlugin)
 * Harsh Kushwaha - Senior Software Engineer Portfolio
 */

// Force manual scroll restoration so browsers never restore old scroll position on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function initSmoothScrollEngine() {
  // Register GSAP Plugins safely
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
  }

  // Reset window scroll position initially
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  let lenis = null;

  // Initialize Lenis Smooth Scroll if library is loaded
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      lerp: 0.08, // Buttery smooth interpolation
      duration: 1.4, // Natural glide duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: false, // Standard touch physics on mobile
      touchMultiplier: 1.8,
      infinite: false,
      autoResize: true,
    });

    window.lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });
    }

    // Synchronize Lenis with GSAP Ticker for high refresh rate monitors
    if (typeof gsap !== 'undefined') {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // GSAP ScrollToPlugin Enhanced Smooth Navigation
  window.smoothScrollToTarget = function (target, offset = null) {
    let targetElement = null;

    if (typeof target === 'string') {
      if (!target || target === '#' || target === '#!') return;
      try {
        targetElement = document.querySelector(target);
      } catch (err) {
        console.warn('[SmoothScroll] Invalid target selector:', target);
        return;
      }
    } else if (target instanceof HTMLElement) {
      targetElement = target;
    }

    if (!targetElement) return;

    const navbar = document.getElementById('main-navbar');
    const navHeight = navbar ? navbar.offsetHeight : 64;
    const scrollOffsetY = offset !== null ? offset : (navHeight + 14);

    // If GSAP ScrollToPlugin is available
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
      if (window.lenis) {
        // Smoothly glide using Lenis with physics interpolation
        window.lenis.start();
        window.lenis.scrollTo(targetElement, {
          offset: -scrollOffsetY,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          immediate: false,
          lock: false,
          force: true
        });
      } else {
        // Smoothly animate using GSAP ScrollToPlugin
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: scrollOffsetY,
            autoKill: false
          },
          ease: 'power3.inOut'
        });
      }
    } else if (window.lenis) {
      window.lenis.scrollTo(targetElement, {
        offset: -scrollOffsetY,
        duration: 1.2,
        immediate: false,
        lock: false,
        force: true
      });
    } else {
      const rect = targetElement.getBoundingClientRect();
      const targetY = rect.top + (window.pageYOffset || document.documentElement.scrollTop) - scrollOffsetY;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    }
  };

  // Global Event Delegation for ALL internal anchor links (nav links, buttons, footer links)
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href === '#!') return;

    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();
      e.stopPropagation();

      // Keep URL completely clean: NEVER show #id or hash in address bar
      if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      }

      // Smoothly animate scroll directly using GSAP ScrollToPlugin
      window.smoothScrollToTarget(targetElement);

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-nav-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });

  // Mobile Menu Hamburger Toggle Button
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // -------------------------------------------------------------
  // GSAP ScrollTrigger Active Navlink Highlighting (ScrollSpy)
  // -------------------------------------------------------------
  function initNavScrollSpy() {
    const desktopLinks = document.querySelectorAll('header#main-navbar nav a.nav-link');
    const mobileLinks = document.querySelectorAll('#mobile-nav-menu a.nav-link-mobile');

    const sections = [
      { id: 'hero', navHref: null },
      { id: 'about', navHref: '#about' },
      { id: 'experience', navHref: '#experience' },
      { id: 'projects', navHref: '#projects' },
      { id: 'skills', navHref: '#skills' },
      { id: 'blog', navHref: '#blog' },
      { id: 'contact', navHref: '#contact' }
    ];

    function setActiveNav(activeHref) {
      desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === activeHref) {
          link.classList.add('nav-link-active');
        } else {
          link.classList.remove('nav-link-active');
        }
      });

      mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === activeHref) {
          link.classList.add('nav-link-active');
        } else {
          link.classList.remove('nav-link-active');
        }
      });
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      sections.forEach(({ id, navHref }) => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveNav(navHref),
          onEnterBack: () => setActiveNav(navHref),
        });
      });
    } else {
      const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionItem = sections.find(s => s.id === entry.target.id);
            if (sectionItem) {
              setActiveNav(sectionItem.navHref);
            }
          }
        });
      }, observerOptions);

      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }
  }

  // Initialize ScrollSpy on startup
  initNavScrollSpy();

  // Strip any lingering hash on startup for a 100% clean URL
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
}

// Execute safely on ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmoothScrollEngine);
} else {
  initSmoothScrollEngine();
}

