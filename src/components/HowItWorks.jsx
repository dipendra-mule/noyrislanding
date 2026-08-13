import React from "react";
import Reveal from "./Reveal.jsx";
import { useSectionProgress } from "../hooks/useSectionProgress.js";

const STEPS = [
  { title: "You open a tab or app", desc: "NOYRIS watches the foreground app and, in the browser, the active tab — nothing else." },
  { title: "The rule engine checks it", desc: "Session rules, then channel rules, then your global allow and block lists, evaluated in order." },
  { title: "A match stops it cold", desc: "A full-screen overlay appears before the page loads, naming exactly which rule caught it." },
  { title: "No match, no interruption", desc: "The visit is logged quietly and you keep working — nothing is blocked by default." },
  { title: "It shows up in Review", desc: "Every block and every minute of focus lands in your local history. Nothing leaves your machine." },
];

export default function HowItWorks() {
  const [sectionRef, progress] = useSectionProgress();

  return (
    <section id="how" className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">the block decision</p>
        <h2 className="mb-14 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          What happens between a click and a stop.
        </h2>
      </Reveal>

      <div ref={sectionRef} className="relative">
        <div className="absolute left-[19px] top-2 hidden h-[calc(100%-2rem)] w-px bg-black/[0.06] sm:block" />
        <div
          className="absolute left-[19px] top-2 hidden w-px bg-ink sm:block"
          style={{
            height: "calc(100% - 2rem)",
            transform: `scaleY(${progress})`,
            transformOrigin: "top",
            transition: "transform 0.1s linear",
          }}
        />
        <div className="space-y-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="relative flex gap-5">
                <div className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-brandblue/50 bg-card font-mono text-xs text-mist transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="pt-1.5">
                  <h3 className="mb-1 font-display text-lg font-medium tracking-tight">{s.title}</h3>
                  <p className="max-w-lg text-sm leading-relaxed text-mist">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
