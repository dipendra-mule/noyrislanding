import { BarChart3 } from "lucide-react";
import { SectionHeader } from "../SectionHeader.jsx";
import { Badge } from "../Badge.jsx";
import { Heatmap } from "../Heatmap.jsx";
import { StatCard } from "../StatCard.jsx";

/* The app's History/MonthlyCalendar panel (24x31 heatmap). */
export function ScreenTimePanel() {
  return (
    <div className="p-5 sm:p-6 pt-2">
      <SectionHeader
        icon={<BarChart3 size={15} strokeWidth={2.2} />}
        title="Monthly heatmap"
        sub="See where your hours went"
        right={<Badge variant="success"><span className="w-1.5 h-1.5 rounded-full bg-success mr-1" />84% Focus</Badge>}
      />
      <Heatmap />
      <div className="mt-3 grid grid-cols-3 gap-2">
        <StatCard value="41h" label="Focus" />
        <StatCard value="19h" label="Distraction" />
        <StatCard value="84%" label="Focus score" />
      </div>
    </div>
  );
}
