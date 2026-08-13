import React, { useRef } from "react";

export default function MagneticButton({ as = "a", className = "", children, strength = 0.25, style = {}, ...rest }) {
  const ref = useRef(null);
  const Tag = as;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`btn-shine inline-block ${className}`}
      style={{ transition: "transform 0.25s cubic-bezier(.16,1,.3,1)", ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
