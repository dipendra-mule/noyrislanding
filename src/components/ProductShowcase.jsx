import React, { useState } from "react";
import Reveal from "./Reveal.jsx";
import { SegmentedControl } from "./appUi/SegmentedControl.jsx";

const TABS = [
  { id: "focus", label: "Focus" },
  { id: "world", label: "World Timer" },
  { id: "schedule", label: "Schedule" },
  { id: "block", label: "Block" },
  { id: "history", label: "Screen Time" },
];

const DESCRIPTIONS = {
  focus: "Name a session, start a countdown, and add instant allow / block rules before you begin.",
  world: "Shrinking World timer — watch time dissolve shell-by-shell in 3D matrix space.",
  schedule: "Build a weekly plan once — recurring focus blocks resolve themselves every day.",
  block: "Whole domains, URL patterns, apps, channels and topics — managed in one place.",
  history: "An hourly, private breakdown of focus vs. distraction, with a monthly heatmap.",
};

const HEADERS = {
  focus: { icon: <TargetIcon />, title: "Focus", subtitle: "Deep Work · API refactor" },
  world: { icon: <GlobeIcon />, title: "World Timer", subtitle: "3D Shrinking World" },
  schedule: { icon: <CalendarIcon />, title: "Schedule", subtitle: "Recurring focus blocks" },
  block: { icon: <ShieldIcon />, title: "Blocker", subtitle: "Domains, apps, channels & topics" },
  history: { icon: <ChartIcon />, title: "History", subtitle: "See where your hours went" },
};

const SCREENSHOTS = {
  focus: "/ss_focus.png",
  world: "/ssdark_globetimer.png",
  schedule: "/ss_schedule.png",
  block: "/ss_blocktopics.png",
  history: "/ss_screentim.png",
};

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4M16 2v4M3 10h18" /><path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" />
    </svg>
  );
}

export default function ProductShowcase() {
  const [tab, setTab] = useState("focus");

  const hdr = HEADERS[tab];

  return (
    <section className="relative z-10 bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            real screenshots of the app
          </p>
          <h2 className="mx-auto max-w-2xl text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            What you&rsquo;ll see the day you install it.
          </h2>
        </Reveal>

        <Reveal delay={120} variant="up">
          <div className="mx-auto mt-14 max-w-5xl">
            {/* macOS Window Shell */}
            <div className="overflow-hidden rounded-[24px] border border-line bg-card shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
              {/* Window Header */}
              <div className="flex h-12 items-center justify-between border-b border-line bg-paper/60 px-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <div className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <div className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                  {hdr.icon}
                  <span>{hdr.title}</span>
                  <span className="text-mist font-normal">· {hdr.subtitle}</span>
                </div>
                <div>
                  <SegmentedControl
                    size="sm"
                    selected={tab}
                    onSelect={setTab}
                    options={TABS.map((t) => ({ id: t.id, label: t.label }))}
                  />
                </div>
              </div>

              {/* Screenshot Display */}
              <div className="relative bg-black/5 p-2 sm:p-4">
                <img
                  src={SCREENSHOTS[tab]}
                  alt={`${tab} screen`}
                  className="w-full rounded-xl shadow-sm object-cover"
                />
              </div>
            </div>

            <p className="mt-5 text-center text-[13px] text-mist">{DESCRIPTIONS[tab]}</p>
            <p className="mt-1 text-center text-[12px] font-mono text-mist">
              click a tab above to view different panels
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
