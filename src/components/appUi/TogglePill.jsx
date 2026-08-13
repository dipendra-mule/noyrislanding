/* Static port of the app's TogglePill (ruleControls.tsx) — the shared
 * pill/toggle language used for topic cards, presets, chips and tiles. */
export function TogglePill({ on = false, className = "", children }) {
  return (
    <button
      className={`relative group flex items-center gap-2 pl-2 pr-3 h-9 rounded-md border transition-all duration-150 w-full ${
        on ? "border-destructive bg-card" : "border-brand-faint bg-card hover:bg-brand-hover"
      } ${className}`}
    >
      {children}
      <span
        className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
          on ? "border-destructive" : "border-brand-faint"
        }`}
      >
        {on && <span className="w-1.5 h-1.5 rounded-full bg-destructive" />}
      </span>
    </button>
  );
}
