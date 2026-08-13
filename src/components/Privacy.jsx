import React from "react";
import { Database, EyeOff, KeyRound } from "lucide-react";
import Reveal from "./Reveal.jsx";

const POINTS = [
  { Icon: Database, title: "Local-only storage", desc: "Every rule, session and event lives in a local SQLite file on your disk — no cloud sync, no telemetry." },
  { Icon: EyeOff, title: "No keylogging", desc: "NOYRIS reads the foreground app, window title, and tab domain — never keystrokes." },
  { Icon: KeyRound, title: "You grant access", desc: "Accessibility permission is asked for, explained, and revocable at any time." },
];

export default function Privacy() {
  return (
    <section id="privacy" className="relative z-10 mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <Reveal>
        <div className="relative grid gap-10 overflow-hidden rounded-[28px] border border-brandblue/40 bg-card p-8 sm:p-14 lg:grid-cols-[1fr,1.1fr] lg:gap-16">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/20 opacity-50 blur-3xl animate-blobFloat"
            style={{ animationDelay: "-3s" }}
          />
          <div className="relative">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">privacy</p>
            <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight">Watched by no one but you.</h2>
            <p className="text-[15px] leading-relaxed text-mist">
              NOYRIS runs entirely on your machine. There&rsquo;s no server keeping a copy of your history, no
              keylogging, and no browsing history leaving your device &mdash; ever.
            </p>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-3">
            {POINTS.map((b, i) => (
              <Reveal key={b.title} delay={i * 80} variant="scale">
                <div className="group h-full rounded-2xl border border-brandblue/30 bg-paper p-5 transition-transform duration-300 hover:-translate-y-1">
                  <b.Icon
                    size={17}
                    className="mb-3 text-brand transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <h4 className="mb-1.5 text-sm font-medium">{b.title}</h4>
                  <p className="text-xs leading-relaxed text-mist">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
