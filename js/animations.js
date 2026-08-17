/**
 * Ultra-Modern GSAP ScrollTrigger & Pinned Horizontal Scroll Engine (No 3D Models)
 * Harsh Kushwaha - Senior Software Developer Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // -------------------------------------------------------------
  // 0. Minimalist Cyber Terminal Preloader Sequence (Authentic Jerky / Staggered Loading)
  // -------------------------------------------------------------
  const preloader = document.getElementById('cyber-preloader');
  const preloaderPercent = document.getElementById('preloader-percent');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderStatus = document.getElementById('preloader-status');

  if (preloader) {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });

    let currentPercent = 0;

    const updatePreloaderUI = (percent) => {
      if (preloaderPercent) {
        preloaderPercent.innerText = percent < 10 ? `0${percent}%` : `${percent}%`;
      }
      if (preloaderBar) {
        preloaderBar.style.width = `${percent}%`;
      }

      if (preloaderStatus) {
        if (percent < 24) {
          preloaderStatus.innerText = 'Mounting React v18 & TypeScript engine...';
        } else if (percent < 54) {
          preloaderStatus.innerText = 'Loading Redux Toolkit & RTK Query state...';
        } else if (percent < 78) {
          preloaderStatus.innerText = 'Compiling WebGL shaders & GSAP timeline...';
        } else if (percent < 95) {
          preloaderStatus.innerText = 'Optimizing Technical Skills & Project Viewports...';
        } else {
          preloaderStatus.innerText = '✓ System ready. Launching portfolio...';
        }
      }
    };

    const runJerkyLoader = () => {
      if (currentPercent >= 100) {
        currentPercent = 100;
        updatePreloaderUI(100);

        setTimeout(() => {
          gsap.to(preloader, {
            yPercent: -100,
            opacity: 0,
            duration: 0.85,
            ease: 'power4.inOut',
            onStart: () => {
              // Trigger the Hero Section Entrance Timeline as the preloader slides up
              playHeroEntrance();
            },
            onComplete: () => {
              preloader.style.display = 'none';
              document.body.style.overflow = '';
              if (window.lenis) {
                window.lenis.start();
                window.lenis.resize();
              }
              if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
              }
            }
          });
        }, 350);
        return;
      }

      // Authentic non-linear jerky steps and pauses
      let jump;
      let nextDelay;
      const rand = Math.random();

      // Simulate occasional stalls/hitches at realistic pipeline checkpoints
      if ((currentPercent >= 22 && currentPercent <= 28) || 
          (currentPercent >= 52 && currentPercent <= 58) || 
          (currentPercent >= 74 && currentPercent <= 80) || 
          (currentPercent >= 90 && currentPercent <= 94)) {
        // Stall/bottleneck pause with tiny single-digit increment
        jump = Math.floor(Math.random() * 2) + 1;
        nextDelay = Math.floor(Math.random() * 200) + 180; // 180ms - 380ms pause
      } else if (rand < 0.35) {
        // Sudden burst jump (e.g. module cached/parsed)
        jump = Math.floor(Math.random() * 11) + 6; // +6% to +16%
        nextDelay = Math.floor(Math.random() * 80) + 40;  // fast 40ms - 120ms
      } else if (rand < 0.70) {
        // Moderate step
        jump = Math.floor(Math.random() * 5) + 3;  // +3% to +7%
        nextDelay = Math.floor(Math.random() * 70) + 60;  // 60ms - 130ms
      } else {
        // Small step with slight delay
        jump = Math.floor(Math.random() * 3) + 1;  // +1% to +3%
        nextDelay = Math.floor(Math.random() * 120) + 100; // 100ms - 220ms
      }

      currentPercent += jump;
      if (currentPercent > 100) currentPercent = 100;

      updatePreloaderUI(currentPercent);
      setTimeout(runJerkyLoader, nextDelay);
    };

    // Kick off with a brief initial delay
    setTimeout(runJerkyLoader, 100);
  } else {
    // If preloader element is absent, play entrance immediately
    playHeroEntrance();
  }

  // -------------------------------------------------------------
  // 1. Custom Magnetic Pointer Follower
  // -------------------------------------------------------------
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');

  if (cursorDot && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      });
    });

    const renderCursor = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;

      gsap.set(cursorFollower, {
        x: followerX,
        y: followerY
      });

      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .interactive-hover, .skill-pill, .editorial-project-row');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorFollower, { scale: 2.5, borderColor: 'rgba(255, 255, 255, 0.8)', backgroundColor: 'rgba(255, 255, 255, 0.08)', duration: 0.3 });
        gsap.to(cursorDot, { scale: 0.4, duration: 0.2 });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(cursorFollower, { scale: 1, borderColor: 'rgba(255, 255, 255, 0.3)', backgroundColor: 'transparent', duration: 0.3 });
        gsap.to(cursorDot, { scale: 1, duration: 0.2 });
      });
    });
  }

  // -------------------------------------------------------------
  // 2. Cinematic Hero Entrance Timeline Engine
  // -------------------------------------------------------------
  let heroAnimationExecuted = false;

  function animateHeroStatsCounters() {
    const statNumbers = document.querySelectorAll('#hero-stats .stat-number');
    statNumbers.forEach((stat) => {
      const targetVal = parseFloat(stat.getAttribute('data-value'));
      const suffix = stat.getAttribute('data-suffix') || '';
      
      gsap.fromTo(stat, 
        { innerText: 0 },
        {
          innerText: targetVal,
          duration: 1.8,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            stat.innerText = Math.ceil(stat.innerText) + suffix;
          }
        }
      );
    });
  }

  function playHeroEntrance() {
    if (heroAnimationExecuted) return;
    heroAnimationExecuted = true;

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      // 1. Top Navbar drops in from above
      .fromTo('#main-navbar', 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
      )
      // 3. Hero terminal prompt line
      .fromTo('#hero-prompt',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        '-=0.8'
      )
      // 4. Hero Name Title ("HARSH KUSHWAHA") glides up & triggers text scramble
      .fromTo('#hero-title',
        { y: 40, opacity: 0, scale: 0.96 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.75, 
          ease: 'power3.out',
          onStart: () => {
            const titleEl = document.getElementById('hero-title');
            if (titleEl && window.TextScramble) {
              const fx = new window.TextScramble(titleEl);
              fx.setText('HARSH\nKUSHWAHA');
            }
          }
        },
        '-=0.35'
      )
      // 5. Role subtitle badge
      .fromTo('#hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.45'
      )
      // 6. Summary description paragraph
      .fromTo('#hero-description',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.35'
      )
      // 7. Action CTA buttons ($ ./cat_experience & email)
      .fromTo('#hero-cta-buttons',
        { y: 25, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' },
        '-=0.35'
      )
      // 8. Stats telemetry bar & counter trigger
      .fromTo('#hero-stats',
        { y: 25, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          onStart: () => {
            animateHeroStatsCounters();
          }
        },
        '-=0.3'
      )
      // 9. Right Column CLI Terminal Window widget slides in from right
      .fromTo('#hero-terminal-widget',
        { x: 50, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out' },
        '-=0.65'
      );
  }

  // Hero Scroll Scrub Parallax & Fade Out
  gsap.to('#hero-content-wrapper', {
    yPercent: -30,
    opacity: 0.2,
    filter: 'blur(10px)',
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // -------------------------------------------------------------
  // 3. Scroll Progress Indicator & Navbar Blur Effect
  // -------------------------------------------------------------
  const progressBar = document.getElementById('scroll-progress-bar');
  const navbar = document.getElementById('main-navbar');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-obsidian-950/85', 'backdrop-blur-xl', 'border-white/10', 'shadow-2xl');
        navbar.classList.remove('bg-transparent', 'border-transparent');
      } else {
        navbar.classList.remove('bg-obsidian-950/85', 'backdrop-blur-xl', 'border-white/10', 'shadow-2xl');
        navbar.classList.add('bg-transparent', 'border-transparent');
      }
    }
  });

  // -------------------------------------------------------------
  // 4. Parallax Text Marquee Scrubbing & Section Header Reveals
  // -------------------------------------------------------------
  const marqueeLeft = document.getElementById('marquee-text-left');
  if (marqueeLeft) {
    gsap.to(marqueeLeft, {
      xPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: '#marquee-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.1,
        invalidateOnRefresh: true,
      }
    });
  }

  // Universal Section Header & Prompt Reveals
  const sectionHeaders = document.querySelectorAll('section:not(#hero) > div > .mb-16, section:not(#hero) > div > div.mb-16, section:not(#hero) > div > div.mb-12, #marquee-section');
  sectionHeaders.forEach((header) => {
    gsap.fromTo(header,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // -------------------------------------------------------------
  // 4b. About Section Elements ScrollTrigger Reveal
  // -------------------------------------------------------------
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    // Bio Manifest Shell
    const bioCard = aboutSection.querySelector('.p-6.sm\\:p-8');
    if (bioCard) {
      gsap.fromTo(bioCard,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioCard,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 3 Architectural Highlight Cards
    const highlightCards = aboutSection.querySelectorAll('.grid-cols-1.sm\\:grid-cols-3 > div');
    if (highlightCards.length > 0) {
      gsap.fromTo(highlightCards,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: highlightCards[0],
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 3D Canvas wrapper
    const about3d = document.getElementById('about-3d-wrapper');
    if (about3d) {
      gsap.fromTo(about3d,
        { opacity: 0, scale: 0.92, y: 35 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: about3d,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // -------------------------------------------------------------
  // 5. ANIMATED INTERACTIVE CAREER TIMELINE & SPINE LASER
  // -------------------------------------------------------------
  const timelineSection = document.getElementById('experience');
  const timelineProgressLaser = document.getElementById('timeline-progress-laser');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineNavBtns = document.querySelectorAll('.timeline-nav-btn');

  if (timelineSection && timelineProgressLaser) {
    // 5a. Central Spine Glowing Laser Draw synced directly to scroll with near-zero lag
    gsap.to(timelineProgressLaser, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-tree-container',
        start: 'top 85%',
        end: 'bottom 80%',
        scrub: 0.15,
        invalidateOnRefresh: true,
      }
    });

    const activeNavClasses = ['bg-orange-500', 'text-white', 'shadow-sm', 'border-transparent'];
    const inactiveNavClasses = ['bg-zinc-300', 'dark:bg-obsidian-900', 'text-zinc-800', 'dark:text-gray-300', 'border-zinc-400', 'dark:border-white/10'];

    const updateActiveTimelineNav = (targetId) => {
      timelineNavBtns.forEach(btn => {
        const jumpId = btn.getAttribute('data-timeline-jump');
        if (jumpId === targetId) {
          btn.classList.remove(...inactiveNavClasses);
          btn.classList.add(...activeNavClasses);
        } else {
          btn.classList.remove(...activeNavClasses);
          btn.classList.add(...inactiveNavClasses);
        }
      });
    };

    // 5b. Individual Timeline Milestone - Fast, Snappy Entrance (Zero Lag)
    timelineItems.forEach((item) => {
      const pin = item.querySelector('.timeline-node-pin');
      const metaCol = item.querySelector('.timeline-meta-col');
      const dossierCard = item.querySelector('.timeline-card');

      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 92%', // Triggers early as soon as the item approaches viewport
          toggleActions: 'play none none none'
        }
      });

      if (pin) {
        itemTl.fromTo(pin, 
          { scale: 0.4, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.28, ease: 'back.out(2)' }
        );
      }

      if (metaCol) {
        itemTl.fromTo(metaCol,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          pin ? '-=0.15' : 0
        );
      }

      if (dossierCard) {
        itemTl.fromTo(dossierCard,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' },
          metaCol ? '-=0.2' : 0
        );
      }

      // Sync active tab highlight when scrolling past this milestone
      ScrollTrigger.create({
        trigger: item,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => updateActiveTimelineNav(item.id),
        onEnterBack: () => updateActiveTimelineNav(item.id),
      });
    });

    // 5c. Milestone Quick Jump Button Click Listeners (Fast & Responsive)
    timelineNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-timeline-jump');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          if (window.smoothScrollToTarget) {
            window.smoothScrollToTarget(targetEl, -110);
          } else {
            const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - 110;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }

          // Fast subtle scale feedback
          const card = targetEl.querySelector('.timeline-card');
          if (card) {
            gsap.fromTo(card, 
              { scale: 1.015 }, 
              { scale: 1, duration: 0.35, ease: 'power2.out' }
            );
          }
        }
      });
    });
  }

  // -------------------------------------------------------------
  // 6. Statistics Counter Scroll Animation
  // -------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach((stat) => {
    const targetVal = parseFloat(stat.getAttribute('data-value'));
    const suffix = stat.getAttribute('data-suffix') || '';
    
    gsap.fromTo(stat, 
      { innerText: 0 },
      {
        innerText: targetVal,
        duration: 2.2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          once: true
        },
        onUpdate: function() {
          stat.innerText = Math.ceil(stat.innerText) + suffix;
        }
      }
    );
  });

  // -------------------------------------------------------------
  // 6b. Deployed Projects / Systems Staggered Reveals
  // -------------------------------------------------------------
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length > 0) {
    projectCards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  // -------------------------------------------------------------
  // 7. Tech Arsenal Skills Matrix Staggered Reveals & Filtering
  // -------------------------------------------------------------
  const skillCards = document.querySelectorAll('.skill-item-card');
  if (skillCards.length > 0) {
    ScrollTrigger.batch('.skill-item-card', {
      start: 'top 90%',
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out', overwrite: 'auto' }
        );
      }
    });
  }

  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const activeClasses = ['bg-zinc-900', 'dark:bg-white', 'text-white', 'dark:text-zinc-950', 'shadow-fighter-panel', 'border-transparent'];
  const inactiveClasses = ['bg-zinc-200', 'dark:bg-obsidian-800', 'text-zinc-900', 'dark:text-gray-300', 'border-zinc-400', 'dark:border-white/10'];

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove(...activeClasses);
        b.classList.add(...inactiveClasses);
      });

      btn.classList.remove(...inactiveClasses);
      btn.classList.add(...activeClasses);

      const filterVal = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          gsap.to(card, { opacity: 1, scale: 1, display: 'block', duration: 0.4, ease: 'power2.out' });
        } else {
          gsap.to(card, { opacity: 0, scale: 0.8, display: 'none', duration: 0.3, ease: 'power2.in' });
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 7b. Blog / Technical Publications Staggered Reveals
  // -------------------------------------------------------------
  const blogPosts = document.querySelectorAll('#blog article');
  if (blogPosts.length > 0) {
    gsap.fromTo(blogPosts,
      { opacity: 0, y: 35, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#blog .grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // -------------------------------------------------------------
  // 8. Contact Console Staggered Column Reveals
  // -------------------------------------------------------------
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const contactCols = contactSection.querySelectorAll('.lg\\:col-span-6');
    if (contactCols.length >= 2) {
      gsap.fromTo(contactCols[0],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(contactCols[1],
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // -------------------------------------------------------------
  // 8b. Copy Email Toast Notification
  // -------------------------------------------------------------
  const copyBtn = document.getElementById('copy-email-btn');
  const copyToast = document.getElementById('copy-toast');

  if (copyBtn && copyToast) {
    copyBtn.addEventListener('click', () => {
      const email = 'knp.harsh@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        gsap.to(copyToast, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.7)' });
        setTimeout(() => {
          gsap.to(copyToast, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
        }, 3000);
      });
    });
  }

  // -------------------------------------------------------------
  // 8c. Live Operational IST Clock
  // -------------------------------------------------------------
  const updateContactClock = () => {
    const clockEl = document.getElementById('contact-live-clock');
    if (!clockEl) return;
    const now = new Date();
    const istTime = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockEl.innerText = `${istTime} IST`;
  };
  setInterval(updateContactClock, 1000);
  updateContactClock();

  // -------------------------------------------------------------
  // 9. Contact Form Real-Time Validation & Terminal Dispatch Animation
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-counter');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const logBox = document.getElementById('transmission-log-box');
  const logLines = document.getElementById('transmission-log-lines');
  const logBadge = document.getElementById('log-status-badge');
  const formStatus = document.getElementById('form-status');

  const nameError = document.getElementById('contact-name-error');
  const emailError = document.getElementById('contact-email-error');
  const messageError = document.getElementById('contact-message-error');

  const nameStatus = document.getElementById('contact-name-status');
  const emailStatus = document.getElementById('contact-email-status');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Live character counter & clear error
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.innerText = `${len} / 500`;
      if (len >= 15) {
        messageInput.classList.remove('border-rose-500');
        if (messageError) messageError.classList.add('hidden');
      }
    });
  }

  // Live Name Validation
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        nameInput.classList.remove('border-rose-500');
        if (nameError) nameError.classList.add('hidden');
        if (nameStatus) {
          nameStatus.innerText = '✓ VALID';
          nameStatus.className = 'text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400';
        }
      } else {
        if (nameStatus) nameStatus.innerText = '';
      }
    });
  }

  // Live Email Validation
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.remove('border-rose-500');
        if (emailError) emailError.classList.add('hidden');
        if (emailStatus) {
          emailStatus.innerText = '✓ VALID';
          emailStatus.className = 'text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400';
        }
      } else {
        if (emailStatus) emailStatus.innerText = '';
      }
    });
  }

  const shakeElement = (el) => {
    gsap.fromTo(el, 
      { x: -6 }, 
      { x: 6, duration: 0.08, repeat: 4, yoyo: true, ease: 'power1.inOut', onComplete: () => gsap.set(el, { x: 0 }) }
    );
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput || nameInput.value.trim().length < 2) {
        isValid = false;
        if (nameInput) {
          nameInput.classList.add('border-rose-500');
          shakeElement(nameInput);
        }
        if (nameError) nameError.classList.remove('hidden');
      } else {
        if (nameInput) nameInput.classList.remove('border-rose-500');
        if (nameError) nameError.classList.add('hidden');
      }

      // Validate Email
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        if (emailInput) {
          emailInput.classList.add('border-rose-500');
          shakeElement(emailInput);
        }
        if (emailError) emailError.classList.remove('hidden');
      } else {
        if (emailInput) emailInput.classList.remove('border-rose-500');
        if (emailError) emailError.classList.add('hidden');
      }

      // Validate Message
      if (!messageInput || messageInput.value.trim().length < 15) {
        isValid = false;
        if (messageInput) {
          messageInput.classList.add('border-rose-500');
          shakeElement(messageInput);
        }
        if (messageError) messageError.classList.remove('hidden');
      } else {
        if (messageInput) messageInput.classList.remove('border-rose-500');
        if (messageError) messageError.classList.add('hidden');
      }

      if (!isValid) return;

      // Everything is valid! Start animated terminal transmission
      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtnText) submitBtnText.innerText = 'ESTABLISHING TLS SOCKET...';
      }

      if (logBox && logLines) {
        logBox.classList.remove('hidden');
        logLines.innerHTML = '';
        if (logBadge) {
          logBadge.innerText = 'TRANSMITTING...';
          logBadge.className = 'text-amber-400 font-bold';
        }
        gsap.fromTo(logBox, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 });
      }

      const appendLog = (text, delay) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (logLines) {
              const line = document.createElement('div');
              line.innerHTML = text;
              logLines.appendChild(line);
            }
            resolve();
          }, delay);
        });
      };

      (async () => {
        await appendLog('<span class="text-zinc-500">[0.02s]</span> <span class="text-zinc-300">Initializing TLS 1.3 encrypted handshake...</span>', 200);
        await appendLog('<span class="text-zinc-500">[0.45s]</span> <span class="text-zinc-300">Serializing telemetry packet & SHA-256 payload checksum...</span>', 400);
        await appendLog('<span class="text-zinc-500">[0.90s]</span> <span class="text-zinc-300">Transmitting to endpoint: <strong class="text-white">knp.harsh@gmail.com</strong>...</span>', 400);
        await appendLog('<span class="text-emerald-400 font-bold">[1.35s]</span> <span class="text-emerald-400 font-bold">✓ Server ACK 200 OK: Dispatch delivered successfully!</span>', 400);

        if (logBadge) {
          logBadge.innerText = 'DELIVERED (200 OK)';
          logBadge.className = 'text-emerald-400 font-bold';
        }

        if (formStatus) {
          formStatus.classList.remove('hidden');
          gsap.fromTo(formStatus, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' });
        }

        if (submitBtn) {
          if (submitBtnText) submitBtnText.innerText = '✓ SIGNAL DELIVERED';
          submitBtn.classList.add('bg-zinc-800', 'dark:bg-zinc-200');
        }

        contactForm.reset();
        if (charCounter) charCounter.innerText = '0 / 500';
        if (nameStatus) nameStatus.innerText = '';
        if (emailStatus) emailStatus.innerText = '';

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (submitBtnText) submitBtnText.innerText = 'TRANSMIT ENCRYPTED SIGNAL';
            submitBtn.classList.remove('bg-zinc-800', 'dark:bg-zinc-200');
          }
        }, 5000);
      })();
    });
  }

  // -------------------------------------------------------------
  // 10. Deployed Projects Filter (Instant, Static & Clean)
  // -------------------------------------------------------------
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');

  const projActiveClasses = ['bg-orange-500', 'text-white', 'shadow-sm', 'border-transparent'];
  const projInactiveClasses = ['bg-zinc-300', 'dark:bg-obsidian-900', 'text-zinc-800', 'dark:text-gray-300', 'border', 'border-zinc-400', 'dark:border-white/10'];

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach((b) => {
        b.classList.remove(...projActiveClasses);
        b.classList.add(...projInactiveClasses);
      });

      btn.classList.remove(...projInactiveClasses);
      btn.classList.add(...projActiveClasses);

      const filterVal = btn.getAttribute('data-project-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 11. Full-Screen Thank You Kinetic Horizontal Scroll Parallax (Fast & Responsive)
  // -------------------------------------------------------------
  const thankYouTrack1 = document.getElementById('thankyou-scroll-track-1');
  const thankYouTrack2 = document.getElementById('thankyou-scroll-track-2');

  if (thankYouTrack1) {
    gsap.fromTo(thankYouTrack1,
      { xPercent: 0 },
      {
        xPercent: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: '#thankyou-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.1,
          invalidateOnRefresh: true,
        }
      }
    );
  }

  if (thankYouTrack2) {
    gsap.fromTo(thankYouTrack2,
      { xPercent: -35 },
      {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#thankyou-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.1,
          invalidateOnRefresh: true,
        }
      }
    );
  }

  // -------------------------------------------------------------
  // 12. Footer Reveal
  // -------------------------------------------------------------
  const footer = document.querySelector('footer');
  if (footer) {
    gsap.fromTo(footer,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 98%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // -------------------------------------------------------------
  // 13. Monumental Giant Brandmark Reveal Below Footer (Fast & Snappy)
  // -------------------------------------------------------------
  const giantSignature = document.getElementById('footer-giant-signature');
  if (giantSignature) {
    const giantH1 = giantSignature.querySelector('h1');
    if (giantH1) {
      gsap.fromTo(giantH1,
        { opacity: 0, scale: 0.96, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: giantSignature,
            start: 'top 98%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }
});
