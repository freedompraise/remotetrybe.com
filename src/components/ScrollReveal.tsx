import { useEffect } from "react";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -8% 0px",
  threshold: 0,
};

/**
 * Activates `.reveal` sections when they enter the viewport.
 * Watches for late-mounted nodes (e.g. lazy-loaded homepage sections).
 */
const ScrollReveal = () => {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);

    const scan = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.classList.contains("active")) return;
        if (observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    };

    let raf = 0;
    const scheduleScan = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        scan();
      });
    };

    scan();
    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ScrollReveal;
