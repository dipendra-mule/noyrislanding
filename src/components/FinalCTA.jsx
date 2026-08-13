import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import MagneticButton from "./MagneticButton.jsx";
import { useParallax } from "../hooks/useParallax.js";
import { BUY } from "../config.js";
import hill2 from "../assets/hill2.jpg";

export default function FinalCTA() {
  const parallaxRef = useParallax(0.12);

  return (
    <section id="download" className="relative z-10 mt-10 overflow-hidden">
      <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
          <img
            src={hill2}
            alt="Rolling green hills"
            className="h-[130%] w-full object-cover"
            style={{ objectPosition: "center 35%", filter: "saturate(0.72)" }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(239,246,252,0) 0%, rgba(9,9,9,0.25) 35%, rgba(9,9,9,0.55) 100%)",
          }}
        />

        <Reveal className="relative z-10 mx-auto max-w-xl px-6 py-24 text-center" variant="scale">
          <h2 className="font-display text-[2.4rem] font-light leading-[1.05] tracking-tight text-white sm:text-5xl">
            Give your afternoon
            <br />
            back its door.
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-[14px] leading-relaxed text-white/75">
            One-time $29 for macOS or Windows, including updates. Set up your first block list in under two
            minutes.
          </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                href={BUY.mac}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(54,54,54,0.4)]"
              >
                Buy for macOS — $29
                <ArrowRight size={14} />
              </MagneticButton>
              <MagneticButton
                href={BUY.windows}
                className="rounded-full border border-white/30 px-6 py-3 text-[13px] font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-white/10"
              >
                Buy for Windows — $29
              </MagneticButton>
            </div>
          <p className="mt-5 text-[11px] text-white/55">
            Secure checkout via Dodo Payments &middot; installer and license key delivered right after payment
          </p>
        </Reveal>
      </div>
    </section>
  );
}
