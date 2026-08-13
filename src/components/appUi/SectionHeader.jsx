/* Static port of the app's SectionHeader (ruleControls.tsx). */
export function SectionHeader({ icon, title, sub, right }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      {icon && (
        <div className="w-9 h-9 rounded-xl bg-brand-badge flex items-center justify-center text-brand-ink shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-brand-ink">{title}</div>
        {sub && <div className="text-[13px] text-brand-light">{sub}</div>}
      </div>
      {right}
    </div>
  );
}
