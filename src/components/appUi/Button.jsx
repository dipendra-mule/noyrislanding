/* Static port of the app's Button (ui/button.tsx) — Linen light theme. */
export function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-brand text-brand-fg hover:bg-brand-dark shadow-glow-sm",
    destructive: "bg-destructive text-white hover:brightness-110 active:brightness-90 shadow-macos-1",
    success: "bg-success text-white shadow-macos-1",
    outline: "border border-brand-border bg-card text-brand-ink hover:bg-brand-hover",
    ghost: "border border-brand-line text-brand-sub hover:text-brand hover:border-brand/40",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-semibold transition-all duration-200 disabled:opacity-40 select-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
