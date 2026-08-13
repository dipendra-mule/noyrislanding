import React from "react";
import { Hash } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function TopicBanSection() {
  return (
    <section className="relative z-10 bg-paper py-24 px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Copy & Features */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink border border-brand/30">
              <Hash size={13} className="text-brand" />
              Intelligent Topic Banning
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Ban the idea, not just the domain.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">
              Blocking youtube.com is easy &mdash; until you need it for a tutorial. Noyris scans page titles, headings, URL slugs, and search keywords against 155+ curated distraction topics in real time. If the context is distraction, it stops.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { title: "Smart Contextual Analysis", desc: "Differentiates educational video from entertainment feeds instantly." },
                { title: "Custom Keyword Triggers", desc: "Add your own trigger phrases and topic rules tailored to your workflow." },
                { title: "Instant Notification Banner", desc: "Subtle full-screen overlay tells you exactly which topic rule intercepted the distraction." },
              ].map((f, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                      <path d="M2 6.5 4.5 9 10 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink">{f.title}</h3>
                    <p className="text-[13px] text-mist">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: Real App Screenshot */}
          <Reveal delay={150} variant="scale">
            <div className="overflow-hidden rounded-[24px] border border-line bg-card shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
              <div className="flex h-11 items-center justify-between border-b border-line bg-paper/60 px-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                  <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-xs font-semibold text-ink">Topic Engine &amp; Blocker</div>
                <div />
              </div>
              <div className="p-2 sm:p-3 bg-black/5">
                <img src="/ss_blocktopics.png" alt="Topic Engine Screenshot" className="w-full rounded-xl object-cover shadow-sm" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
