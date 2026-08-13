import { Timer } from "lucide-react";
import { SectionHeader } from "../SectionHeader.jsx";
import { Badge } from "../Badge.jsx";
import { Button } from "../Button.jsx";
import { SegmentedControl } from "../SegmentedControl.jsx";
import { CountdownRing } from "../CountdownRing.jsx";

/* The app's Focus panel (src/panels/Focus.tsx). */
export function FocusPanel({
  clock = "24:12",
  progress = 0.82,
  title = "Deep Work",
  sub = "API refactor",
  label = "Focus",
}) {
  return (
    <div className="flex flex-col items-center p-5 sm:p-6 pt-2">
      <SectionHeader
        icon={<Timer size={15} strokeWidth={2.2} />}
        title="Focus session"
        sub={sub}
        right={<Badge variant="success"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse mr-1" />Live</Badge>}
      />
      <CountdownRing clock={clock} progress={progress} label={label} title={title} size={280} />
      <div className="mt-2 flex items-center gap-3">
        <SegmentedControl
          size="sm"
          selected="25"
          options={[
            { id: "25", label: "25m" },
            { id: "50", label: "50m" },
            { id: "90", label: "90m" },
          ]}
        />
        <Button variant="primary" className="h-9 px-4 text-[13px]">Start</Button>
      </div>
    </div>
  );
}
