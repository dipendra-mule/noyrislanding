/* Static port of the app's Input (ui/input.tsx) — Linen light theme. */
export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full h-9 rounded-md border border-brand-line bg-card px-3 text-[13px] text-brand-ink placeholder:text-brand-light/70 hover:border-brand-sub focus:outline-none focus:border-brand focus:ring-glow-sm transition-all duration-200 ${className}`}
      {...props}
    />
  );
}
