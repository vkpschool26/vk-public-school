"use client";

import { useEffect } from "react";

/**
 * Fades elements up as they scroll into view.
 * - `data-reveal` animates the element itself.
 * - `data-reveal-group` animates each direct child, staggered.
 * Content stays visible without JS or with reduced motion.
 * New content (client navigation, streamed sections) is picked up as it mounts.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    function track(el: HTMLElement) {
      if (seen.has(el)) return;
      seen.add(el);
      // Leave anything already on screen alone so there is no flash.
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) return;
      el.classList.add("reveal-pending");
      observer.observe(el);
    }

    function scan() {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(track);
      document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          const el = child as HTMLElement;
          if (!seen.has(el)) el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 90}ms`);
          track(el);
        });
      });
    }

    let frame = 0;
    const mutations = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    });

    scan();
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
