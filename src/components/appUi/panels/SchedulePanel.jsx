import { CalendarRange, Plus } from "lucide-react";
import { SectionHeader } from "../SectionHeader.jsx";
import { Badge } from "../Badge.jsx";
import { BlockRow } from "../BlockRow.jsx";
import { Input } from "../Input.jsx";
import { Button } from "../Button.jsx";

const DEFAULT_BLOCKS = [
  {
    title: "Morning deep work",
    type: "focus",
    values: ["Mon 9:00–11:30", "Wed 9:00–11:30", "Fri 9:00–11:30"],
  },
  {
    title: "Afternoon flow",
    type: "focus",
    values: ["Tue 14:00–16:00", "Thu 14:00–16:00"],
  },
  {
    title: "Blocked: socials",
    type: "block",
    values: ["daily 18:00–22:00", "strict"],
  },
];

/* The app's Schedule panel (src/panels/Schedule.tsx). */
export function SchedulePanel({ blocks = DEFAULT_BLOCKS }) {
  return (
    <div className="p-5 sm:p-6 pt-2">
      <SectionHeader
        icon={<CalendarRange size={15} strokeWidth={2.2} />}
        title="Weekly schedule"
        sub="Recurring focus blocks"
        right={<Badge variant="secondary" small>{blocks.length} active</Badge>}
      />
      <div>
        {blocks.map((b) => (
          <BlockRow key={b.title} block={b} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Input placeholder="Add a focus block…" readOnly />
        <Button variant="outline" className="h-9 px-3 shrink-0"><Plus size={14} /></Button>
      </div>
    </div>
  );
}
