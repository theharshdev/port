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
        chars: "XO",
        revealDelay: 0.3,
        speed: 0.2,
      },
    });
  });
  navLink.addEventListener("mouseleave", () => {
    gsap.to(navLink, {
      duration: 1,
      scrambleText: {
        text: navLinkTxt,
        chars: "XO",
        revealDelay: 0.3,
        speed: 0.2,
      },
    });
  });
});
