import React from "react";
import { Timer, ShieldOff, BarChart3 } from "lucide-react";
import Reveal from "./Reveal.jsx";

const CAPS = [
  {
    eyebrow: "01 · sessions",
    title: "Focus sessions that actually hold",
    desc: "Name a mission, pick a countdown or stopwatch, and let NOYRIS hold the line. Hold-to-quit stops you from bailing at minute two — and every session banks coins toward a five-minute override, honestly priced.",
    Icon: Timer,
  },
  {
    eyebrow: "02 · blocking",
    title: "Rules as precise as you need",
    desc: "Domain, URL pattern, app, YouTube channel, or topic. youtube.com/shorts/* is a different rule from youtube.com, and 155 curated topics across 27 categories catch what a simple blocklist misses.",
    Icon: ShieldOff,
  },
  {
    eyebrow: "03 · review",
    title: "Analytics you'll actually open",
    desc: "Hourly, on-device breakdowns of where your attention went, a monthly heatmap of your streaks, and a live feed while a session runs — all without a single byte leaving your machine.",
    Icon: BarChart3,
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative z-10 overflow-hidden py-24 sm:py-32">
      {/* ambient floating blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/20 opacity-60 blur-3xl animate-blobFloat" />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brandblue/40 opacity-70 blur-3xl animate-blobFloat"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-mist">the toolkit</p>
          <h2 className="mx-auto mb-20 max-w-lg text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            One quiet app, built around the way you actually lose time.
          </h2>
        </Reveal>

        <div className="space-y-20">
          {CAPS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} variant={i % 2 === 1 ? "right" : "left"}>
              <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-16">
                <div className={i % 2 === 1 ? "sm:order-2" : ""}>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">{c.eyebrow}</p>
                  <h3 className="mb-4 font-display text-2xl font-medium tracking-tight sm:text-[1.8rem]">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-mist">{c.desc}</p>
                </div>
                <div
                  className={`group flex items-center justify-center rounded-2xl border border-brandblue/40 bg-card p-10 shadow-[0_2px_20px_-10px_rgba(11,24,35,0.15)] transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(11,24,35,0.3)] ${
                    i % 2 === 1 ? "sm:order-1" : ""
                  }`}
                >
                  <c.Icon
                    size={56}
                    strokeWidth={1}
                    className="text-brand transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
