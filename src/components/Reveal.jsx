import React from "react";
import { useReveal } from "../hooks/useReveal.js";

export default function Reveal({ children, delay = 0, className = "", variant = "up" }) {
  const [ref, visible] = useReveal();

  const transforms = {
    up: visible ? "translateY(0)" : "translateY(26px)",
    scale: visible ? "scale(1)" : "scale(0.94)",
    left: visible ? "translateX(0)" : "translateX(-24px)",
    right: visible ? "translateX(0)" : "translateX(24px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[variant] || transforms.up,
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
