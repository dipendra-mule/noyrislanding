import React from "react";
import Reveal from "./Reveal.jsx";
import { useParallax } from "../hooks/useParallax.js";
import hill1 from "../assets/hill1.jpg";

export default function PhotoBand() {
  const parallaxRef = useParallax(0.14);

  return (
    <section className="relative z-10 overflow-hidden">
      <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
          <img
            src={hill1}
            alt="Misty green hills at dawn"
            className="h-[130%] w-full object-cover"
            style={{ objectPosition: "center 30%", filter: "saturate(0.8)" }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(239,246,252,0.9) 0%, rgba(11,24,35,0.35) 28%, rgba(11,24,35,0.5) 72%, rgba(239,246,252,0.9) 100%)",
          }}
        />

        <Reveal className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center" variant="scale">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">no shortcuts</p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Focus is the whole point &mdash;
            <br />
            everything else is just a rule.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
