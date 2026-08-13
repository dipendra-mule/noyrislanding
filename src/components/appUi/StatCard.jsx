/* Static port of the app's StatCard (metrics.tsx) — value + label. */
export function StatCard({ value, label, hint }) {
  return (
    <div className="rounded-xl border border-brand-border bg-card p-3.5 flex flex-col gap-1 shadow-macos-1">
      <span className="text-[18px] font-bold text-brand-ink leading-none">{value}</span>
      <span className="text-[13px] text-brand-sub font-medium">{label}</span>
      {hint && <span className="text-[12px] text-brand-light">{hint}</span>}
    </div>
  );
}
