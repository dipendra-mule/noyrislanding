import { useEffect, useRef } from "react";

/**
 * Applies a lightweight, rAF-throttled parallax translateY to the returned
 * ref based on the element's own scroll position through the viewport.
 * `speed` < 1 moves slower than scroll (background layers), > 1 moves
 * faster (foreground layers).
 *
 * Uses the element's position relative to the viewport (not absolute
 * window.scrollY) so it behaves correctly no matter how far down the page
 * the section sits. Respects prefers-reduced-motion.
 */
export function useParallax(speed = 0.25) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    const update = () => {
      const host = el.parentElement || el;
      const rect = host.getBoundingClientRect();
      const traveled = Math.min(rect.height, Math.max(0, -rect.top));
      el.style.transform = `translate3d(0, ${traveled * speed}px, 0)`;
      raf = null;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}
