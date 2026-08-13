/* The app runs as a normal macOS window; this chrome frames the static shots. */
export function WindowChrome({ title, children, className = "" }) {
  return (
    <div className={`bg-brand-faint/70 rounded-xl border border-brand-border/70 overflow-hidden shadow-macos-3 ${className}`}>
      <div className="flex items-center gap-2 px-4 h-11 border-b border-brand-line/70 bg-card/90">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="mx-auto text-[13px] font-semibold text-brand-light">{title}</span>
        <span className="w-14" />
      </div>
      {children}
    </div>
  );
}
