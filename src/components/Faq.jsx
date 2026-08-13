import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal.jsx";

const FAQS = [
  {
    q: "What exactly does Noyris block?",
    a: "Five things, at whatever precision you want: whole apps, whole domains (youtube.com), URL patterns (youtube.com/shorts/*), individual YouTube channels (@mkbhd), subreddits (r/relationships), and topics — 155 curated topics across 27 categories, matched against titles, URLs and search queries. Nothing is blocked by default; every rule is opt-in.",
  },
  {
    q: "How does website blocking actually work?",
    a: "A free companion browser extension (Chrome, Edge and other Chromium browsers, plus Safari) enforces site rules using the browser\u2019s native request blocking. When a rule matches, the tab is closed before the page loads. Desktop apps are blocked and closed directly by Noyris itself.",
  },
  {
    q: "What permissions does it need on macOS, and why?",
    a: "Three, granted once during onboarding with one-tap links to System Settings: Accessibility (to read the foreground window title), Screen Recording (to read the browser tab URL) and Automation/Apple Events (to close the offending tab). On Windows no special permissions are needed. All are revocable at any time and the app never reads your keystrokes.",
  },
  {
    q: "Can I still quit out of a focus session?",
    a: "Quitting takes a deliberate hold-to-confirm gesture, so you can\u2019t bail by reflex. If you genuinely need in, you can override a block for five minutes \u2014 paid for with coins you\u2019ve earned from focused work (1 coin per 2 minutes, 1 coin per override minute). It\u2019s an honest trade, not a trap.",
  },
  {
    q: "Does it keep working when I close the window?",
    a: "Yes. Noyris lives in your menu bar / tray and a small background agent keeps the tracker and scheduler running, so scheduled focus blocks still apply even when the app window is closed. During an active session, closing the window minimises to the tray instead of quitting.",
  },
  {
    q: "Is my data private?",
    a: "Everything is stored in a local SQLite database on your machine. No account, no cloud sync, no telemetry, no keylogging. Raw activity is retained for 60 days, then automatically rolled up into aggregates and discarded. Your rules, coins and settings stay yours.",
  },
  {
    q: "How does Kids Mode work?",
    a: "Kids Mode is a parental lock: only the allow-listed apps and sites can run, and anything else is closed instantly with no warning overlay. Turning it off requires your OS account password, so a child can\u2019t bypass it by quitting the app or disabling protection.",
  },
  {
    q: "What do I get for the one-time price?",
    a: "A perpetual license for macOS or Windows (one device), all future updates, and the full feature set \u2014 sessions, scheduler, blocking, coins, Kids Mode and screen-time review. Your license key is delivered instantly at checkout and you activate it in the app after download.",
  },
  {
    q: "What happens if it\u2019s not for me?",
    a: "You\u2019re buying a tool that sits on your machine and works offline \u2014 nothing to cancel, no renewal to forget. If you hit a real problem, write to us and we\u2019ll make it right; we\u2019re a small team and stand behind what we ship.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brandblue/40 bg-card transition-colors hover:border-brandblue/70">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-[15px] font-medium tracking-tight text-ink">{item.q}</span>
        <ChevronDown
          size={17}
          strokeWidth={2}
          className={`shrink-0 text-mist transition-transform duration-300 ${open ? "rotate-180 text-brand" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-relaxed text-mist">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-mist">questions</p>
        <h2 className="mx-auto mb-12 max-w-xl text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Before you buy, ask this.
        </h2>
      </Reveal>

      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <Reveal key={item.q} delay={i * 40} variant="up">
            <FaqItem item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
