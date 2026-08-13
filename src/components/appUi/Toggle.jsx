/* Static port of the app's Toggle switch (ui/Toggle.tsx) — Linen light theme. */
export function Toggle({ checked, size = "md" }) {
  const track = size === "sm" ? "w-9 h-5" : "w-11 h-6";
  const knob = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const on = size === "sm" ? "translate-x-4" : "translate-x-5";
  return (
    <span
      className={`relative inline-flex items-center rounded-full transition-colors duration-200 ease-macos ${track} ${
        checked ? "bg-brand" : "bg-brand-faint"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 bg-white rounded-full shadow-macos-1 transition-transform duration-200 ease-spring ${knob} ${
          checked ? on : ""
        }`}
      />
    </span>
  );
}
