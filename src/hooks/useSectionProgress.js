import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, progress 0-1] describing how far a section has scrolled
 * through the viewport, for scroll-linked effects like a drawing line.
 */
export function useSectionProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const passed = vh * 0.85 - rect.top;
      const p = Math.min(1, Math.max(0, passed / total));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return [ref, progress];
}
