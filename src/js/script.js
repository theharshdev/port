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

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
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
  navLink.addEventListener("mouseover", () => {
    gsap.to(navLink, {
      scrambleText: {
        text: navLinkTxt,
        chars: "!@#$%^&*?<>+=|/",
        revealdelay: 0.5,
        speed: 0.2,
      },
      duration: 1,
    });
  });
});

gsap.to("body", {
  scrollTrigger: {
    trigger: "#hero-bottom-paragraph",
    toggleActions: "play reverse play reverse",
    scrub: 2,
  },
  backgroundColor: "#fff",
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

gsap.from(".color-palatte", {
  scrollTrigger: {
    trigger: ".color-palatte",
    toggleActions: "play reverse play reverse",
    start: "top 100%",
    end: "top 50%",
    scrub: 2,
  },
  y: 150,
  scale: 0.4,
});

gsap.from(".article-img", {
  scrollTrigger: {
    trigger: ".article-img",
    toggleActions: "play reverse play reverse",
    start: "top 90%",
    end: "top 70%",
    scrub: 2,
  },
  y: 250,
  scale: 0.4,
  duration: 1,
});

gsap.to(".logo", {
  scrollTrigger: {
    trigger: "#hero-bottom-paragraph",
    toggleActions: "play reverse play reverse",
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
      toggleActions: "play reverse play reverse",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    y: 250,
    scale: 0.4,
    duration: 1,
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

document.fonts.ready.then(() => {
  const heroSplitText = SplitText.create(".hero-text");

  gsap.from(heroSplitText.chars, {
    opacity: 0,
    y: 200,
    duration: 1,
    stagger: 0.4,
    scrollTrigger: {
      trigger: heroSplitText.chars,
      toggleActions: "play reverse play reverse",
    },
  });

  const splitTextPara = SplitText.create("#hero-bottom-paragraph");

  gsap.from(splitTextPara.lines, {
    scrollTrigger: {
      trigger: splitTextPara.lines,
      toggleActions: "play reverse play reverse",
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
      toggleActions: "play reverse play reverse",
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
      toggleActions: "play reverse play reverse",
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
  scale: 60,
  opacity: 0,
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
  scale: 1,
  duration: 1,
  stagger: {
    each: 0.3,
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
      toggleActions: "play reverse play reverse",
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

gsap.from("footer div a", {
  scrollTrigger: {
    trigger: "footer",
    start: "top bottom",
    toggleActions: "play reverse play reverse",
    // onEnter, onLeave, onEnterBack, onLeaveBack
  },
  x: 150,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
});

gsap.from("footer div p", {
  scrollTrigger: {
    trigger: "footer",
    start: "top bottom",
    toggleActions: "play reverse play reverse",
    // onEnter, onLeave, onEnterBack, onLeaveBack
  },
  x: 150,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
});

const secondImgBoxs = document.querySelectorAll(".second-img-box");

secondImgBoxs.forEach((secondImgBox) => {
  gsap.from(secondImgBox, {
    scrollTrigger: {
      trigger: secondImgBox,
      toggleActions: "play reverse play reverse",
      start: "top 90%",
      end: "top 60%",
      scrub: 2,
    },
    x: 1300,
    duration: 1,
  });
});

const jellySpans = document.querySelectorAll(".jelly span");

jellySpans.forEach((jellySpan, i) => {
  gsap.set(jellySpan, {
    xPercent: -50,
    yPercent: -50,
    width: 25 * (i + 1),
    height: 25 * (i + 1),
  });

  gsap.to(jellySpan, {
    z: 150,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: i * 0.1,
  });
});

gsap.from(".color-platte-box", {
  scrollTrigger: {
    trigger: ".color-palatte",
    toggleActions: "play reverse play reverse",
    start: "top 90%",
    end: "top 60%",
    scrub: 2,
  },
  scaleX: -1,
  delay: 2,
  stagger: 0.3,
});

gsap.to(".footer-paragraph", {
  scrollTrigger: {
    trigger: ".footer-paragraph-box",
    scrub: 1,
    pin: true,
    start: " top 0%",
    end: "top -100%",
  },

  scale: 1.5,
  duration: 1,
});

gsap.from(".horizontal-scroll-text", {
  scrollTrigger: {
    trigger: ".horizontal-scroll-text",
  },
  y: 100,
  opacity: 0,
  duration: 2,
});

window.addEventListener("mousemove", (e) => {
  gsap.to(".x-axis-line", {
    x: e.clientX,
  });
  gsap.to(".y-axis-line", {
    y: e.clientY,
  });
  gsap.to(".custom-cursor", {
    x: e.clientX,
    y: e.clientY,
  });
  document.querySelector(
    ".custom-cursor"
  ).textContent = `(${e.clientX}, ${e.clientY})`;
});

function updateScrollPercent() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  document.querySelector(".scroll-spy").textContent = `Scrolled ${Math.round(
    scrolled
  )}%`;
}

window.addEventListener("scroll", updateScrollPercent);
window.addEventListener("resize", updateScrollPercent); // for dynamic heights
updateScrollPercent(); // initial call
