import React from "react";
import Reveal from "./Reveal.jsx";

const RULE_TYPES = [
  { label: "Domain", example: "youtube.com", note: "blocks every subdomain too" },
  { label: "URL pattern", example: "youtube.com/shorts/*", note: "prefix & wildcard matching" },
  { label: "App", example: "com.tinyspeck.slackmacgap", note: "bundle ID or display name" },
  { label: "YouTube channel", example: "@mkbhd", note: "handle or channel ID, block-first" },
  { label: "Topic", example: "\u201canime, gaming, crypto\u2026\u201d", note: "keyword + phrase matching" },
];

export default function RuleTypes() {
  return (
    <section id="blocking" className="relative z-10 mx-auto max-w-4xl px-6 py-10 sm:py-16">
      <Reveal>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">granular by design</p>
        <h2 className="mb-4 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          A rule for exactly what you mean.
        </h2>
        <p className="mb-12 max-w-lg text-[15px] text-mist">
          Block the whole site, one path on it, a single channel, or a topic that spans a dozen sites at once.
        </p>
      </Reveal>
      <div className="overflow-hidden rounded-2xl border border-brandblue/40">
        {RULE_TYPES.map((r, i) => (
          <Reveal key={r.label} delay={i * 70} variant="left">
            <div
              className={`flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between ${
                i !== 0 ? "border-t border-brandblue/40" : ""
              } bg-card transition-colors hover:bg-brandblue/20`}
            >
              <span className="w-40 flex-none text-sm font-medium text-ink">{r.label}</span>
              <span className="flex-1 font-mono text-sm text-mist transition-colors">{r.example}</span>
              <span className="text-xs text-mist">{r.note}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
