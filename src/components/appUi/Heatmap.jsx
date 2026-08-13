const CAT_COLORS = {
  productive: "#57cd1b",
  study: "#007AFF",
  communication: "#5856D6",
  browsing: "#5AC8FA",
  entertainment: "#FF9500",
  doom_scroll: "#FF2D55",
};

const CAT_LABELS = {
  productive: "Deep work",
  study: "Learning",
  communication: "Messaging",
  browsing: "Research",
  entertainment: "Watching",
  doom_scroll: "Doom scroll",
};

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

const NO_DATA_BG = "#E1E1E1";

/* Same seeded RNG the app uses for its demo data. */
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function generateData(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const rng = mulberry32(year * 1000 + month);
  const weekendCats = [
    ["entertainment", 0.26],
    ["doom_scroll", 0.46],
    ["browsing", 0.66],
    ["communication", 0.82],
    ["productive", 0.94],
    ["study", 1],
  ];
  const weekdayCats = [
    ["productive", 0.3],
    ["study", 0.45],
    ["browsing", 0.6],
    ["communication", 0.72],
    ["entertainment", 0.86],
    ["doom_scroll", 1],
  ];
  const pick = (table, r) => table.find(([, p]) => r < p)[0];
  const cells = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const weekend = [0, 6].includes(new Date(dateStr).getDay());
    const table = weekend ? weekendCats : weekdayCats;
    for (let h = 0; h < 24; h++) {
      let chance;
      if (h < 7) chance = weekend ? 0.04 : 0.02;
      else if (h < 9) chance = 0.45;
      else if (h < 13) chance = weekend ? 0.55 : 0.92;
      else if (h < 15) chance = weekend ? 0.45 : 0.68;
      else if (h < 18) chance = weekend ? 0.6 : 0.85;
      else if (h < 21) chance = weekend ? 0.85 : 0.62;
      else chance = 0.45;
      if (rng() > chance) continue;
      const seconds = Math.round((weekend ? 1400 : 2100) * (0.55 + rng() * 0.9));
      cells.push({ day: dateStr, hour: h, cat: pick(table, rng()), seconds });
    }
  }
  return cells;
}

const now = new Date();
const YEAR = now.getFullYear();
const MONTH = now.getMonth() + 1;
const DAYS = new Date(YEAR, MONTH, 0).getDate();
const GRID = (() => {
  const map = new Map();
  for (const row of generateData(YEAR, MONTH)) {
    let day = map.get(row.day);
    if (!day) {
      day = {};
      map.set(row.day, day);
    }
    if (!day[row.hour] || day[row.hour].seconds < row.seconds) day[row.hour] = row;
  }
  return map;
})();

/* Deterministic demo data is precomputed at module load; static replica of the
 * app's 24x31 monthly heatmap (MonthlyCalendar.tsx). */
import { Fragment } from "react";

export function Heatmap({ className = "" }) {
  return (
    <div className={`bg-card border border-brand-line rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[13px] font-bold text-brand-ink">
          {now.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-brand-light">
          <span className="w-2 h-2 rounded-sm bg-success inline-block" />
          On-track goal days
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <div
          className="grid"
          style={{ gridTemplateColumns: "26px repeat(24, minmax(10px, 1fr))", gap: "2px" }}
        >
          <div />
          {Array.from({ length: 24 }, (_, h) => (
            <div
              key={h}
              className="h-[14px] text-[7px] text-brand-light/70 text-center font-mono flex items-center justify-center"
            >
              {h}
            </div>
          ))}
          {Array.from({ length: DAYS }, (_, idx) => {
            const d = idx + 1;
            const dateStr = `${YEAR}-${String(MONTH).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const dayData = GRID.get(dateStr);
            const dow = new Date(YEAR, MONTH - 1, d).getDay();
            const isToday = dateStr === `${YEAR}-${String(MONTH).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
            return (
              <Fragment key={dateStr}>
                <div
                  className={`flex items-center justify-end gap-[2px] text-[8px] pr-1 ${
                    isToday ? "font-bold text-brand" : "text-brand-light"
                  }`}
                >
                  <span className="tabular-nums">{d}</span>
                  <span className="text-[7px] text-brand-light/50">{DAY_LABELS[dow]}</span>
                </div>
                {Array.from({ length: 24 }, (_, h) => {
                  const cell = dayData ? dayData[h] : undefined;
                  let bg = NO_DATA_BG;
                  if (cell) {
                    const max = 3600 * 2.2;
                    const intensity = Math.min(1, cell.seconds / max);
                    const opacity = 0.7 + intensity * 0.3;
                    bg = `rgba(${hexToRgb(CAT_COLORS[cell.cat] || "#57cd1b")}, ${opacity})`;
                  }
                  return (
                    <div
                      key={h}
                      className="rounded-[3px] h-[12px] transition-all hover:scale-105 cursor-pointer"
                      style={{ backgroundColor: bg }}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-3 border-t border-brand-line/70">
        {Object.keys(CAT_COLORS).map((cat) => (
          <span key={cat} className="flex items-center gap-1.5 text-[12px] font-medium text-brand-light">
            <span
              className="w-[12px] h-[12px] rounded-[3px] border border-brand-line"
              style={{ backgroundColor: CAT_COLORS[cat] }}
            />
            {CAT_LABELS[cat]}
          </span>
        ))}
      </div>
    </div>
  );
}
