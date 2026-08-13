import { Sidebar } from "./Sidebar.jsx";

/* Faithful full-window mock of the app: frameless macOS chrome (traffic lights
 * overlaid on the Linen background) + Sidebar + main panel. Mirrors App.tsx's
 * `flex h-screen bg-brand-bg` layout. */
export function AppShell({ active = "block", header, children, className = "" }) {
  return (
    <div
      className={`relative flex rounded-[24px] border border-brand-border/70 bg-paper shadow-macos-4 overflow-hidden ${className}`}
    >
      <div className="absolute left-6 top-6 flex items-center gap-2 z-20">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
      </div>

      <Sidebar active={active} />

      <main className="flex-1 flex flex-col min-w-0">
        {header && (
          <div className="flex items-center gap-3 px-7 pt-6 pb-2 shrink-0 min-h-[56px]">
            <span className="w-[34px] h-[34px] rounded-[10px] bg-brand-badge text-brand-ink flex items-center justify-center shrink-0">
              {header.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-bold text-brand-ink leading-tight">{header.title}</div>
              {header.subtitle && <div className="text-[13px] text-brand-sub leading-tight">{header.subtitle}</div>}
            </div>
            {header.actions}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
