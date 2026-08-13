import { Target, Calendar, ShieldOff, ShieldCheck, Clock, CalendarRange, Palette, Settings, Coins } from "lucide-react";
import { Logo } from "./Logo.jsx";

const NAV_GROUPS = [
  {
    label: "Focus",
    items: [
      { id: "focus", icon: <Target size={18} strokeWidth={2} />, label: "Focus" },
      { id: "schedule", icon: <Calendar size={18} strokeWidth={2} />, label: "Schedule" },
    ],
  },
  {
    label: "Rules",
    items: [
      { id: "block", icon: <ShieldOff size={18} strokeWidth={2} />, label: "Block" },
      { id: "allow", icon: <ShieldCheck size={18} strokeWidth={2} />, label: "Allow" },
    ],
  },
  {
    label: "Review",
    items: [
      { id: "review", icon: <Clock size={18} strokeWidth={2} />, label: "Activity" },
      { id: "calendar", icon: <CalendarRange size={18} strokeWidth={2} />, label: "History" },
    ],
  },
  {
    label: "Settings",
    items: [
      { id: "customize", icon: <Palette size={18} strokeWidth={2} />, label: "Customize" },
      { id: "settings", icon: <Settings size={18} strokeWidth={2} />, label: "Settings" },
    ],
  },
];

const THEME_DOTS = ["#57cd1b", "#F7F4EF", "#1A1714", "#71809E"];

/* Static port of the app's Sidebar (src/components/Sidebar.tsx) — Linen light.
 * `active` mirrors the active nav item; traffic-light clearing padding matches
 * the frameless window layout. */
export function Sidebar({ active = "block" }) {
  return (
    <div className="w-[272px] min-w-[272px] p-3 shrink-0 select-none">
      <div className="w-[248px] min-w-[248px] h-full flex flex-col rounded-[24px] border border-brand-border bg-card overflow-hidden shadow-macos-2">
        <div className="pl-6 pr-5 pt-[44px] pb-4 flex items-center gap-3 shrink-0">
          <Logo size={28} className="text-brand shrink-0" />
          <span className="text-[15px] font-bold tracking-tight text-brand">NOYRIS</span>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pt-1">
          <div className="flex flex-col gap-1">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="flex flex-col gap-0.5 pb-3 border-b border-brand-line/60">
                <div className="px-3.5 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-sub">
                  {group.label}
                </div>
                {group.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 h-10 px-3.5 rounded-lg cursor-pointer ${
                        isActive
                          ? "bg-brand text-brand-fg font-semibold shadow-glow-sm"
                          : "text-brand-ink hover:bg-brand-hover"
                      }`}
                    >
                      <span
                        className={`w-[18px] h-[18px] flex items-center justify-center shrink-0 ${
                          isActive ? "text-brand-fg" : "text-brand-ink"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate text-[13px]">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </nav>

        <div className="px-4 pb-4 pt-3 space-y-3 shrink-0">
          <div className="w-full rounded-2xl bg-brand-surface border border-brand-border p-4">
            <p className="text-[13px] font-semibold text-brand-sub">Next Block</p>
            <div className="mt-2 w-full text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[14px] font-bold text-brand truncate">Deep work</span>
                <span className="text-[13px] font-semibold text-brand shrink-0">In 24m</span>
              </div>
              <p className="text-[13px] text-brand-sub mt-0.5 tabular-nums">9:00 AM – 11:30 AM</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-brand-surface border border-brand-border">
            <span className="w-8 h-8 rounded-full bg-warning/15 text-warning flex items-center justify-center shrink-0">
              <Coins size={16} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex items-center gap-2">
              <div className="text-[15px] font-bold text-brand-ink tabular-nums leading-none">84</div>
              <div className="text-[13px] text-brand-sub mt-1 leading-none">coins</div>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 rounded-xl border border-brand-border bg-brand-surface px-3 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-bold text-brand-ink truncate">Linen</div>
            </div>
            <span className="flex items-center gap-[4px] shrink-0">
              {THEME_DOTS.map((c) => (
                <span key={c} className="h-[12px] w-[12px] rounded-full border border-brand-line" style={{ background: c }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
