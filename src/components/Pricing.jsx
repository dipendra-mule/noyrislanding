import React from "react";
import { Check, Apple, ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import MagneticButton from "./MagneticButton.jsx";
import { BUY } from "../config.js";

const FEATURES = [
  "Blocks apps, sites, channels & subreddits",
  "Scheduled focus, Kids Mode & screen-time review",
  "One-time payment — no subscription",
  "Free updates for macOS & Windows, forever",
  "One license per device (Mac or Windows)",
  "Works offline for up to 3 days",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 overflow-hidden bg-navy py-24 px-6 sm:py-32">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-3xl animate-blobFloat"
        style={{ background: "#363636" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full opacity-10 blur-3xl animate-blobFloat"
        style={{ background: "#94D2FF", animationDelay: "-6s" }}
      />

      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-white bg-brand px-3 py-1 rounded-full shadow-[0_8px_20px_-8px_rgba(54,54,54,0.4)]">
            Pricing
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One price. Mac &amp; Windows.
            <br />
            No subscription.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-white/75">
            Pay once and keep Noyris on your device forever — including every update.
          </p>
        </Reveal>

        <Reveal delay={120} variant="scale">
          <div className="relative mt-14 rounded-[28px] border border-white/[0.1] bg-white/[0.05] p-8 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-10">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_-8px_rgba(54,54,54,0.4)]">
              Lifetime license
            </span>

            <div className="mt-2 flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                <Apple size={18} />
              </div>
              <div className="text-left">
                <div className="font-display text-sm font-semibold text-white">Noyris for macOS &amp; Windows</div>
                <div className="text-[11px] text-white/65">One license per device</div>
              </div>
            </div>

            <div className="mt-7 flex items-baseline justify-center gap-2">
              <span className="font-display text-6xl font-bold tracking-tight text-white sm:text-7xl">
                $29
              </span>
              <span className="text-sm text-white/65">one-time</span>
            </div>

            <ul className="mx-auto mt-9 grid max-w-md gap-x-6 gap-y-3 border-t border-white/[0.08] pt-8 text-left sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/85">
                  <Check size={15} className="mt-0.5 shrink-0 text-brand" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>

            <MagneticButton
              href={BUY.mac}
              strength={0.2}
              className="mt-9 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_16px_36px_-12px_rgba(54,54,54,0.4)] transition-all duration-300 hover:shadow-[0_20px_44px_-12px_rgba(54,54,54,0.6)]"
            >
              Buy Noyris for macOS — $29
              <ArrowRight size={14} />
            </MagneticButton>

            <MagneticButton
              href={BUY.windows}
              strength={0.2}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] px-6 py-3.5 text-[13px] font-medium text-white/85 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
            >
              Buy Noyris for Windows — $29
            </MagneticButton>

            <p className="mt-4 text-[11px] text-white/60">
              Your license key is delivered instantly. Download the installer for your platform and activate the
              key in the app after launching.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
