function fmtClock(totalSeconds) {
  const t = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* Static port of the app's CountdownRing (src/components/CountdownRing.tsx).
 * `clock` is MM:SS, `progress` 0..1. Rendered around the app's lime brand. */
export function CountdownRing({
  clock = "25:00",
  progress = 0.82,
  color = "#57cd1b",
  label = "Focus",
  title = "Deep work",
  size = 300,
}) {
  const stroke = 16;
  const r = (size - stroke) / 2 - 4;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);
  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse-soft"
        style={{ border: `2px solid ${color}33` }}
      />
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E7EBF3" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 16px ${color}55)` }}
        />
      </svg>
      <div
        className="relative flex flex-col items-center justify-center"
        style={{ height: size - 60 }}
      >
        <p className="text-[13px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color }}>
          {label}
        </p>
        <span className="text-[68px] font-bold tabular-nums text-brand-ink leading-none tracking-tight">
          {clock}
        </span>
        <p className="text-[15px] font-semibold text-brand-sub mt-4 truncate max-w-[80%]">{title}</p>
      </div>
    </div>
  );
}
