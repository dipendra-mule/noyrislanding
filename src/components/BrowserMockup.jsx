import React, { useState } from "react";

const TABS = [
  { id: "focus", label: "Focus", img: "/ss_focus.png" },
  { id: "schedule", label: "Schedule", img: "/ss_schedule.png" },
  { id: "block", label: "Blocker", img: "/ss_blocktopics.png" },
  { id: "history", label: "History", img: "/ss_screentim.png" },
];

export default function BrowserMockup() {
  const [activeTab, setActiveTab] = useState("focus");

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Switcher Tabs */}
      <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all shadow-sm cursor-pointer ${
              activeTab === t.id
                ? "bg-ink text-white shadow-md scale-105"
                : "bg-white/90 text-ink/80 hover:bg-white backdrop-blur-md border border-line/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Clean Screenshot Container without header and without 3 dots */}
      <div className="overflow-hidden rounded-[24px] border border-white/30 bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="p-2 sm:p-3">
          {TABS.map((t) => (
            <img
              key={t.id}
              src={t.img}
              alt={`Noyris ${t.label}`}
              className={`w-full rounded-xl object-cover shadow-sm transition-opacity duration-300 ${
                activeTab === t.id ? "block opacity-75" : "hidden opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
