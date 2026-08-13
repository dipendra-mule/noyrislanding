import { useEffect, useState } from "react";
import { useReveal } from "./useReveal.js";

/**
 * Animates a number from 0 -> value once the returned ref scrolls into view.
 * Returns [ref, displayValue].
 */
export function useCountUp(value, duration = 1400) {
  const [ref, visible] = useReveal(0.4);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const numeric = typeof value === "number" ? value : parseFloat(value);
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    let start;
    let raf;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(numeric * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration]);

  return [ref, display];
}
