import React, { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton.jsx";
import NoyrisLogo from "./NoyrisLogo.jsx";

export default function Nav({ heroRef }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = heroRef.current ? heroRef.current.offsetHeight : 700;
      setScrolled(window.scrollY > h - 90);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroRef]);

  const linkColor = scrolled ? "#6E675F" : "rgba(255,255,255,0.82)";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-brandblue/40 bg-paper/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <NoyrisLogo size={16} className={scrolled ? "text-brand" : "text-white"} />
          <span
            className="font-display text-[15px] font-semibold tracking-tight transition-colors duration-500"
            style={{ color: scrolled ? "#1A1714" : "white" }}
          >
            NOYRIS
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-[13px] transition-colors duration-500 md:flex" style={{ color: linkColor }}>
          <a href="#capabilities" className="nav-link">Product</a>
          <a href="#blocking" className="nav-link">Blocking</a>
          <a href="#how" className="nav-link">How it works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#privacy" className="nav-link">Privacy</a>
          {/* <a href="#faq" className="nav-link">FAQ</a> */}
        </nav>

        <MagneticButton
          href="#download"
          strength={0.2}
          className="rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300"
          style={{ background: "#363636", color: "#FFFFFF" }}
        >
          Get started
        </MagneticButton>
      </div>
    </header>
  );
}
