const VARIANTS = {
  default: "bg-brand-badge text-brand-ink",
  secondary: "bg-brand-faint text-brand-sub",
  destructive: "bg-destructive/10 text-destructive",
  outline: "border border-brand-line text-brand-ink",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  muted: "bg-brand-faint text-brand-light",
};

/* Static port of the app's Badge (ui/badge.tsx) — Linen light theme. */
export function Badge({ children, variant = "default", className = "", small = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 font-semibold ${small ? "text-[11px] h-[20px]" : "text-[13px] h-[26px]"} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
