import Lenis from "lenis";

let lenis = null;

export function initLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    touchMultiplier: 1.4,
  });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export const stopLenis = () => lenis && lenis.stop();
export const startLenis = () => lenis && lenis.start();

export function scrollToSection(href) {
  const el = document.querySelector(href);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}