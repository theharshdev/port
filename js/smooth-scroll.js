/**
 * Ultra-Smooth Cinematic Scroll Engine (Lenis + GSAP ScrollTrigger)
 * Harsh Kushwaha - Senior Software Developer Portfolio
 */

// Force manual scroll restoration so browsers never restore old scroll position on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function initSmoothScrollEngine() {
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

  // Smooth scroll handler function
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
    const scrollOffset = offset !== null ? offset : -(navHeight + 10);

    if (window.lenis) {
      // Ensure lenis is running and active
      window.lenis.start();
      window.lenis.scrollTo(targetElement, {
        offset: scrollOffset,
        duration: 1.2,
        immediate: false,
        lock: false,
        force: true
      });
    } else {
      const rect = targetElement.getBoundingClientRect();
      const targetY = rect.top + (window.pageYOffset || document.documentElement.scrollTop) + scrollOffset;
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
      window.smoothScrollToTarget(targetElement);

      // Update URL hash smoothly without instant browser jump
      if (history.pushState) {
        history.pushState(null, null, href);
      } else {
        location.hash = href;
      }

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

  // Handle initial page load with hash in URL
  if (window.location.hash) {
    setTimeout(() => {
      const hashEl = document.querySelector(window.location.hash);
      if (hashEl) {
        window.smoothScrollToTarget(hashEl);
      }
    }, 400);
  }
}

// Execute safely on ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmoothScrollEngine);
} else {
  initSmoothScrollEngine();
}
