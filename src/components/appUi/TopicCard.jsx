import { TogglePill } from "./TogglePill.jsx";
import { AppLogo } from "./AppLogo.jsx";

/* Static port of the app's TopicCard (topicSelection.tsx) — icon + label +
 * platform logos strip + toggle dot. `sub` adds a secondary line under the
 * label for the landing copy. */
export function TopicCard({ topic, on = false, sub }) {
  return (
    <TogglePill on={on}>
      <span className="flex items-center justify-center w-5 h-5 text-brand-ink shrink-0">
        {topic.icon}
      </span>
      <span className="flex-1 min-w-0 text-left">
        <span className="block text-[13px] font-semibold text-brand-ink truncate">{topic.label}</span>
        {sub && <span className="block text-[12px] text-brand-light truncate">{sub}</span>}
      </span>
      <span className="flex items-center justify-center gap-0.5 shrink-0">
        {topic.entities.slice(0, 3).map((e, i) => (
          <AppLogo key={i} entity={e} size={13} radius={3} />
        ))}
        {topic.entities.length > 3 && (
          <span className="text-[13px] font-bold text-brand-sub">+{topic.entities.length - 3}</span>
        )}
      </span>
    </TogglePill>
  );
}
