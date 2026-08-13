import { ChevronRight } from "lucide-react";
import { AppLogo } from "./AppLogo.jsx";

/* Static port of the app's RuleRail (src/components/ruleControls.tsx:115) —
 * the attached right rail listing blocked/allowed rules. Rendered in the app's
 * default collapsed state: a compact icon strip with a count badge and an
 * expand chevron. Dead UI — items are non-interactive. */
export function RuleRail({ items = [], title = "Blocked & Allowed" }) {
  const hasBlock = items.some((i) => i.tone === "block");
  return (
    <aside className="flex select-none overflow-hidden shrink-0 p-3 w-[88px] min-w-[88px]">
      <div className="h-full min-h-0 flex flex-col rounded-[24px] border border-brand-border bg-card shadow-macos-2 overflow-hidden w-[64px] min-w-[64px]">
        <div className="flex items-center justify-center pt-3 pb-2 shrink-0">
          <button
            type="button"
            title="Expand panel"
            className="relative w-7 h-7 rounded-lg border border-brand-border bg-brand-surface flex items-center justify-center text-brand-sub mx-auto"
          >
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            {items.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: hasBlock ? "#EF4345" : "#21A45C" }}
              >
                {items.length > 99 ? "99+" : items.length}
              </span>
            )}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin py-2 flex flex-col gap-1.5 items-center px-2">
          {items.length === 0 ? (
            <span className="text-sm text-brand-light italic px-2 text-center">No rules yet</span>
          ) : (
            items.map((r) => (
              <div key={r.id} className="w-11 h-11 flex items-center justify-center shrink-0">
                <AppLogo entity={r.spec} size={22} radius={7} />
              </div>
            ))
          )}
        </div>
        <div className="sr-only">{title}</div>
      </div>
    </aside>
  );
}
