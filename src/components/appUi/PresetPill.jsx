import { Pencil } from "lucide-react";
import { AppLogo } from "./AppLogo.jsx";

/* Static port of the app's PresetPill (ruleControls.tsx:197) — entity logo
 * strip + title + active dot, with the hover popover showing every rule value.
 * `full` = preset fully applied (destructive dot), like the app's "Active". */
export function PresetPill({ data, full = false }) {
  const entityCount = data.entities.length;
  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-2 pl-2 pr-3 h-9 rounded-md border transition-all duration-150 w-full ${
          full ? "border-destructive bg-card" : "border-brand-faint bg-card hover:bg-brand-hover"
        }`}
      >
        <span className="flex items-center justify-center gap-0.5 shrink-0">
          {data.entities.slice(0, 4).map((e, i) => (
            <AppLogo key={i} entity={{ type: e.type, value: e.value, name: e.name }} size={13} radius={3} />
          ))}
          {entityCount > 4 && (
            <span className="text-[13px] font-bold text-brand-sub">+{entityCount - 4}</span>
          )}
        </span>
        <span
          className={`text-[13px] font-semibold truncate flex-1 min-w-0 text-left ${
            full ? "text-brand-ink" : "text-brand-sub"
          }`}
        >
          {data.title}
        </span>
        <span
          className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
            full ? "border-destructive" : "border-brand-faint"
          }`}
        >
          {full && <span className="w-1.5 h-1.5 rounded-full bg-destructive" />}
        </span>
      </button>

      <div className="hidden group-hover:block absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-card border border-brand-border rounded-xl shadow-macos-2 p-3">
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="text-[13px] font-bold text-brand-ink truncate">{data.title}</span>
          <span className={`text-[13px] font-semibold shrink-0 ${full ? "text-success" : "text-brand-light"}`}>
            {full ? "Active" : "Off"}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {data.ruleValues.map((v, i) => (
            <span key={i} className="text-[13px] px-1.5 py-0.5 rounded-md bg-brand-badge text-brand-sub font-mono">
              {v}
            </span>
          ))}
        </div>
        <div className="flex gap-1.5 mt-2">
          <span className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-brand-border hover:bg-brand-hover text-[13px] font-semibold text-brand-ink transition-colors cursor-pointer">
            <Pencil size={12} strokeWidth={2.5} /> Edit
          </span>
        </div>
      </div>
    </div>
  );
}
