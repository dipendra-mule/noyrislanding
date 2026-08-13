/* Static port of the app's CatalogTabs (src/components/CatalogTabs.tsx) in
 * block tone. Tabs render with their live counts; the Overview tab is active.
 * Dead UI — buttons are non-interactive. */
export function CatalogTabs({
  tabs,
  activeTab = "overview",
  tone = "block",
}) {
  const isBlock = tone === "block";
  return (
    <div
      className="flex w-full p-1 rounded-xl bg-brand-faint border border-brand-border/40 gap-1"
      role="tablist"
      aria-label="Content categories"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
              isActive
                ? "bg-card text-brand-ink shadow-macos-1"
                : "text-brand-light"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={`ml-0.5 text-[9px] px-1 py-0 h-3.5 min-w-[14px] leading-none inline-flex items-center justify-center rounded-full font-bold border-0 ${
                  isActive
                    ? isBlock
                      ? "bg-destructive/10 text-destructive"
                      : "bg-success/10 text-success"
                    : "bg-brand-badge text-brand-sub"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export const BLOCK_TABS = [
  { id: "overview", label: "Overview", count: 0 },
  { id: "topics", label: "Topics", count: 0 },
  { id: "apps", label: "Apps & Sites", count: 0 },
];
