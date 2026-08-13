import React from "react";
import { Timer, ShieldOff, CalendarClock, BarChart3, Apple, Monitor } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { SITE } from "../config.js";

const JOBS = [
  {
    Icon: Timer,
    title: "Focus sessions",
    desc: "A countdown or stopwatch you name and start. Hold-to-quit keeps you from bailing at minute two.",
  },
  {
    Icon: ShieldOff,
    title: "Automatic blocking",
    desc: "Apps, sites, YouTube channels, subreddits and topics are blocked the moment a rule matches.",
  },
  {
    Icon: CalendarClock,
    title: "Recurring schedule",
    desc: "Set a weekly plan once \u2014 deep-work hours stay protected every day without you touching the app.",
  },
  {
    Icon: BarChart3,
    title: "Private screen-time",
    desc: "Hourly, on-device review of where the day went, plus a monthly heatmap of your streaks.",
  },
];

export default function WhatIsNoyris() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          one app, four jobs
        </p>
        <h2 className="mx-auto max-w-2xl text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you&rsquo;re buying, in one sentence:
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-mist">
          Noyris is a desktop app for macOS and Windows that runs a focus-session timer, blocks whatever
          distracts you, keeps a recurring schedule, and shows you a private screen-time report of it all —
          entirely on your machine, no account required.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {JOBS.map((j, i) => (
          <Reveal key={j.title} delay={i * 80} variant="up">
            <div className="h-full rounded-2xl border border-brandblue/40 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(31,31,31,0.25)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandblue text-brand">
                <j.Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight">{j.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-mist">{j.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-brandblue/40 bg-card px-4 py-2 text-[12px] font-medium text-ink">
            <Apple size={14} className="text-mist" /> macOS 12+
          </span>
          <span className="flex items-center gap-2 rounded-full border border-brandblue/40 bg-card px-4 py-2 text-[12px] font-medium text-ink">
            <Monitor size={14} className="text-mist" /> Windows 10+
          </span>
          <span className="rounded-full border border-brandblue/40 bg-card px-4 py-2 text-[12px] font-medium text-ink">
            {SITE.price} · one-time · no subscription
          </span>
          <span className="rounded-full border border-brandblue/40 bg-card px-4 py-2 text-[12px] font-medium text-ink">
            Set up in under 2 minutes
          </span>
        </div>
      </Reveal>
    </section>
  );
}
