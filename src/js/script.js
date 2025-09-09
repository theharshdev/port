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
  smooth: 2,
  effects: true,
  smoothTouch: 0.1,
});

ScrollTrigger.normalizeScroll(true);

const navLinks = document.querySelectorAll(".nav-links");

navLinks.forEach((navLink) => {
  const navLinkTxt = navLink.textContent;
  navLink.addEventListener("mouseover", () => {
    gsap.to(navLink, {
      duration: 1,
      scrambleText: {
        text: navLinkTxt,
        chars: "!@#$%^&*?<>+=|/",
        revealDelay: 0.3,
        speed: 0.2,
      },
    });
  });
});

gsap.to("body", {
  scrollTrigger: {
    trigger: "#hero-bottom-paragraph",
    toggleActions: "restart restart restart restart",
    scrub: 2,
  },
  backgroundColor: "#FFFFEB",
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

timeline1.from(".menu li a", {
  x: 200,
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
});

timeline1.from(".menu li", {
  x: 200,
  opacity: 0,
  duration: 0.5,
  stagger: 0.3,
});

const heroSplitText = SplitText.create(".hero-text");

gsap.from(heroSplitText.chars, {
  opacity: 0,
  y: 200,
  duration: 1,
  stagger: 0.4,
});

gsap.from(".last-name", {
  scrollTrigger: {
    trigger: ".last-name",
    toggleActions: "restart restart restart restart",
    scrub: 2,
    start: "top 90%",
    end: "top 80%",
  },
  opacity: 0,
  y: "100%",
  duration: 0.4,
});

gsap.from(".secondary-txt", {
  scrollTrigger: {
    trigger: ".secondary-txt",
    toggleActions: "restart restart restart restart",
    scrub: 2,
    end: "top 70%",
  },
  opacity: 0,
  x: 500,
  duration: 0.3,
  stagger: 0.1,
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
      end: "top 80%",
      start: "top 100%",
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

gsap.from(".service-para", {
  scrollTrigger: {
    trigger: ".service-para",
    toggleActions: "restart none none restart",
    scrub: 2,
    end: "top 90%",
  },
  y: 100,
  duration: 1,
});

gsap.from(".service-video", {
  scrollTrigger: {
    trigger: ".service-para",
    toggleActions: "restart none none restart",
    scrub: 2,
    end: "top 30%",
    start: "top 40%",
  },
  y: 100,
  scale: 0.4,
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
