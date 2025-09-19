// Register the plugin
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrambleTextPlugin,
  ScrollToPlugin
);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true,
  smoothTouch: 0.1,
});

ScrollTrigger.normalizeScroll(true);

let timeElm = document.getElementById("time");

setInterval(() => {
  let now = new Date();
  let options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  timeElm.textContent = now.toLocaleTimeString("en-IN", options);
}, 1000);

const navLinks = document.querySelectorAll(".nav-links");

navLinks.forEach((navLink) => {
  const navLinkTxt = navLink.textContent;
  const navLinkAnimation = gsap.to(navLink, {
    scrambleText: {
      text: navLinkTxt,
      chars: "!@#$%^&*?<>+=|/",
      revealdelay: 0.5,
      speed: 0.2,
    },
    duration: 1,
  });
  navLinkAnimation.pause();
  navLink.addEventListener("mouseover", () => {
    navLinkAnimation.play();
  });
  navLink.addEventListener("mouseleave", () => {
    navLinkAnimation.reverse();
  });
});

gsap.to("body", {
  scrollTrigger: {
    trigger: "#hero-bottom-paragraph",
    toggleActions: "restart restart restart restart",
    scrub: 2,
  },
  backgroundColor: "#fff8d3",
  duration: 0.2,
  ease: "power4.out",
  delay: 1,
});

const timeline1 = gsap.timeline();

timeline1.from(".logo", {
  x: -200,
  opacity: 0,
  duration: 0.5,
  delay: 0.4,
});

timeline1.from(".menu li", {
  x: 200,
  opacity: 0,
  duration: 0.5,
  stagger: 0.3,
});

gsap.from(".last-name", {
  scrollTrigger: {
    trigger: ".last-name",
    toggleActions: "restart restart restart restart",
  },
  opacity: 0,
  x: 300,
  duration: 1,
});

gsap.from(".article-img", {
  scrollTrigger: {
    trigger: ".article-img",
    toggleActions: "restart restart restart restart",
    scrub: 2,
    end: "top 80%",
  },
  y: 250,
  scale: 0.5,
  duration: 0.6,
});

gsap.to(".logo", {
  scrollTrigger: {
    trigger: "#hero-bottom-paragraph",
    toggleActions: "restart restart restart restart",
    scrub: 2,
  },
  y: -200,
  duration: 0.5,
});

document.addEventListener("mousemove", (e) => {
  const x = Math.floor((e.clientX / window.innerWidth - 0.5) * 50);
  const y = Math.floor((e.clientY / window.innerHeight - 0.5) * 50);

  gsap.to(".btn-animate", {
    x: x,
    y: y,
    duration: 2,
  });
});

const projectImgs = document.querySelectorAll(".project-img");

projectImgs.forEach((projectImg) => {
  gsap.from(projectImg, {
    scrollTrigger: {
      trigger: projectImg,
      toggleActions: "restart restart restart restart",
      scrub: 2,
      start: "top 80%",
      end: "top 70%",
    },
    y: 150,
    scale: 0.7,
    duration: 0.5,
  });

  projectImg.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    gsap.to(".cursor", {
      x: x,
      y: y,
      opacity: 100,
      scale: 1,
    });
  });

  projectImg.addEventListener("mouseleave", () => {
    gsap.to(".cursor", {
      scale: 0,
      opacity: 0,
    });
  });
});

gsap.from(".color-palatte", {
  scrollTrigger: {
    trigger: ".color-palatte",
    toggleActions: "restart restart restart restart",
    scrub: 2,
    end: "top 50%",
    start: "top 70%",
  },
  y: 100,
  scale: 0.4,
});

document.fonts.ready.then(() => {
  const heroSplitText = SplitText.create(".hero-text");

  gsap.from(heroSplitText.chars, {
    opacity: 0,
    y: 200,
    duration: 1,
    stagger: 0.4,
    scrollTrigger: {
      trigger: heroSplitText.chars,
      toggleActions: "restart restart restart restart",
    },
  });

  const splitTextPara = SplitText.create("#hero-bottom-paragraph");

  gsap.from(splitTextPara.lines, {
    scrollTrigger: {
      trigger: splitTextPara.lines,
      toggleActions: "restart restart restart restart",
      scrub: 2,
      end: "top 50%",
    },
    opacity: 0,
    scaleY: -1,
    duration: 1,
    stagger: 0.6,
  });

  const articleParaSplit = SplitText.create(".article-para");

  gsap.from(articleParaSplit.lines, {
    scrollTrigger: {
      trigger: articleParaSplit.lines,
      toggleActions: "restart restart restart restart",
      scrub: 2,
      end: "top 50%",
    },
    opacity: 0,
    x: -150,
    duration: 2,
    stagger: 0.3,
  });

  const workHeadTxt = SplitText.create(".work-heading");

  gsap.from(workHeadTxt.words, {
    scrollTrigger: {
      trigger: workHeadTxt.words,
      toggleActions: "restart none none restart",
    },
    scrambleText: {
      text: workHeadTxt.words.textContent,
      chars: "!@#$%^&*?<>+=|/",
      speed: 0.1,
    },
    duration: 0.1,
    stagger: 0.1,
  });

  const workDescriptions = document.querySelectorAll(".work-description");
  workDescriptions.forEach((workDescription) => {
    const workDescriptionSplt = SplitText.create(workDescription);
    gsap.from(workDescriptionSplt.chars, {
      scrollTrigger: {
        trigger: workDescriptionSplt.chars,
        toggleActions: "restart none none restart",
        scrub: 2,
        end: "top 50%",
        start: "top 70%",
      },
      opacity: 0,
      x: 10,
      stagger: 0.1,
    });
  });

  const secondaryTxtSplit = SplitText.create(".secondary-txt");
  gsap.from(secondaryTxtSplit.lines, {
    opacity: 0,
    y: 100,
    scaleY: -1,
    duration: 1,
    scale: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: secondaryTxtSplit.lines,
      toggleActions: "restart restart restart restart",
    },
  });

  const serviceParaSplit = SplitText.create(".service-para");
  gsap.from(serviceParaSplit.words, {
    scrollTrigger: {
      trigger: serviceParaSplit.words,
      toggleActions: "restart none none restart",
      scrub: 2,
      end: "top 60%",
      start: "top 70%",
    },
    scaleY: -1,
    opacity: 0,
    stagger: 0.5,
  });
});

gsap.to(".horizontal-scroll-text", {
  scrollTrigger: {
    trigger: ".horizontal-scroll-box",
    scrub: 1,
    pin: true,
    start: "top 0%",
    end: "top -160%",
  },
  transform: "translateX(-51%)",
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".skillParentBox",
    start: "top 0%",
    end: "top -400%",
    scrub: true,
    pin: true,
  },
});
tl.to(".skillHeading", {
  scale: 40,
  duration: 2,
  delay: 0.1,
});
tl.to(
  ".skillCircle",
  {
    scale: 2.3,
    duration: 2,
  },
  "-=1"
);
tl.to(".skillTxts", {
  x: 0,
  opacity: 1,
  duration: 2,
  stagger: {
    each: 0.2,
    from: "random",
  },
});

const tweenNew = gsap.to(".scroller", {
  x: 0,
  repeat: -1,
  duration: 16,
  ease: "none",
  scrollTrigger: {
    trigger: ".scroller",
  },
});

window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    tweenNew.play();
  } else {
    tweenNew.reverse();
  }
});

const blogCards = document.querySelectorAll(".blogCard");

blogCards.forEach((blogCard) => {
  gsap.from(blogCard, {
    scrollTrigger: {
      trigger: blogCard,
      toggleActions: "restart restart restart restart",
      start: "top 90%",
      end: "top 60%",
      scrub: 2,
    },
    y: 200,
    scale: 0.6,
    duration: 1,
  });
});

gsap.from("#blog-heading", {
  scrollTrigger: {
    trigger: "#blog-heading",
    scrub: 2,
  },
  x: -200,
  duration: 1,
});

gsap.from("#blog-paragraph", {
  scrollTrigger: {
    trigger: "#blog-paragraph",
    scrub: 2,
  },
  x: 200,
  duration: 1,
});

gsap.from("footer", {
  scrollTrigger: {
    trigger: "footer",
    start: "top bottom",
    toggleActions: "play reverse play reverse",
    // onEnter, onLeave, onEnterBack, onLeaveBack
  },
  y: 200,
  duration: 1,
  ease: "power2.out",
});
