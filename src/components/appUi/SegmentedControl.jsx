/* Static port of the app's SegmentedControl (ui/SegmentedControl.tsx).
 * `onSelect` makes segments clickable (used by the ProductShowcase tabs). */
export function SegmentedControl({ options, selected, size = "sm", onSelect }) {
  const sizes = {
    sm: { item: "px-3 py-1.5 text-[13px]", radius: "rounded-md" },
    md: { item: "px-4 py-2 text-[14px]", radius: "rounded-lg" },
  }[size];
  const Tag = onSelect ? "button" : "span";
  return (
    <div className="inline-flex bg-brand-faint rounded-md border border-brand-border/40 gap-0.5 p-0.5">
      {options.map((opt) => {
        const isActive = selected === opt.id;
        return (
          <Tag
            key={opt.id}
            type={onSelect ? "button" : undefined}
            onClick={onSelect ? () => onSelect(opt.id) : undefined}
            className={`flex items-center gap-1.5 whitespace-nowrap font-semibold transition-all duration-150 cursor-pointer ${sizes.item} ${sizes.radius} ${
              isActive ? "bg-card text-brand-ink shadow-macos-1" : "text-brand-light"
            }`}
          >
            {opt.label}
          </Tag>
        );
      })}
    </div>
  );
}
