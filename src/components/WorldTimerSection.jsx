import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Globe,
  Layers,
  Zap,
  CheckCircle2,
  Sliders,
  Maximize2,
  Flame,
  ShieldAlert,
} from "lucide-react";
import Reveal from "./Reveal.jsx";

/* -------------------------------------------------------------------------- */
/*  Pure Canvas 3D Particle World Timer Engine (from NOYRIS Desktop App)      */
/* -------------------------------------------------------------------------- */

const MAX_CELLS = 3200;
const TAU = Math.PI * 2;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildWorld(totalMs) {
  const totalSeconds = Math.max(1, Math.round(totalMs / 1000));
  const count = Math.min(totalSeconds, MAX_CELLS);
  const rand = mulberry32(Math.round(totalMs));
  const cells = [];
  for (let i = 0; i < count; i++) {
    const r = Math.cbrt(rand());
    const theta = rand() * TAU;
    const phi = Math.acos(2 * rand() - 1);
    const sinP = Math.sin(phi);
    cells.push({
      x: r * sinP * Math.cos(theta),
      y: r * sinP * Math.sin(theta),
      z: r * Math.cos(phi),
    });
  }
  // Dissolve order: outermost shell first, the core last ("protect the core")
  cells.sort((a, b) => Math.hypot(b.x, b.y, b.z) - Math.hypot(a.x, a.y, a.z));
  return cells;
}

function fmtClock(totalSeconds) {
  const t = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function LiveWorldCanvas({ remainingMs, totalMs, color, size = 420, isRunning }) {
  const canvasRef = useRef(null);
  const [complete, setComplete] = useState(false);
  const cells = useMemo(() => buildWorld(totalMs), [totalMs]);
  const canvasSize = Math.max(340, size);

  const live = useRef({ remainingMs, complete, isRunning });
  live.current = { remainingMs, complete, isRunning };

  useEffect(() => {
    if (remainingMs <= 0) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [remainingMs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const totalSeconds = Math.max(1, Math.round(totalMs / 1000));
    const secondsPerCell = totalSeconds / cells.length;
    const cx = canvasSize / 2;
    const cy = canvasSize / 2;
    const R = canvasSize * 0.44;
    const baseCellR = Math.max(1.3, R * 0.024);

    const t0 = performance.now();
    const proj = [];
    let smoothedD = 0;
    let bloomStart = -1;
    let raf = 0;

    const draw = (now) => {
      const { remainingMs: rem, complete: done } = live.current;
      const elapsed = (now - t0) / 1000;
      const rotY = elapsed * 0.18;
      const rotX = Math.sin(elapsed * 0.08) * 0.25;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      if (done) {
        if (bloomStart < 0) bloomStart = now;
        const bloom = Math.min(1, (now - bloomStart) / 800);
        const radius = R * 0.12 * (0.5 + bloom * 2.5);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(draw);
        return;
      }
      bloomStart = -1;

      const elapsedSeconds = (totalMs - Math.max(0, rem)) / 1000;
      const targetD = Math.min(
        cells.length,
        Math.max(0, Math.floor(elapsedSeconds / secondsPerCell))
      );
      smoothedD += (targetD - smoothedD) * 0.2;
      const dissolved = Math.max(0, Math.floor(smoothedD));

      const remainingFrac = Math.max(0, Math.min(1, rem / totalMs));
      const radiusScale = 0.25 + 0.75 * remainingFrac;
      const effR = R * radiusScale;
      const cellR = baseCellR * (0.6 + 0.4 * remainingFrac);

      proj.length = 0;
      for (let i = 0; i < cells.length; i++) {
        if (i < dissolved) continue;
        const c = cells[i];
        const y1 = c.y * cosX - c.z * sinX;
        const z1 = c.y * sinX + c.z * cosX;
        const x2 = c.x * cosY + z1 * sinY;
        const z2 = -c.x * sinY + z1 * cosY;
        proj.push({ px: cx + x2 * effR, py: cy + y1 * effR, depth: z2 });
      }
      proj.sort((a, b) => a.depth - b.depth);

      for (const p of proj) {
        const depthF = (p.depth + 1) / 2;
        ctx.globalAlpha = 0.25 + depthF * 0.75;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.px, p.py, cellR * (0.6 + depthF * 0.7), 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [cells, totalMs, canvasSize, color]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative" style={{ width: canvasSize, height: canvasSize }}>
        <canvas
          ref={canvasRef}
          style={{ width: canvasSize, height: canvasSize }}
          className="block drop-shadow-[0_0_35px_rgba(56,189,248,0.2)]"
        />

        {complete && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-heroIn pointer-events-none">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 shadow-2xl backdrop-blur-md"
              style={{
                background: color,
                boxShadow: `0 0 70px ${color}`,
              }}
            >
              <CheckCircle2 size={42} className="text-white" />
            </div>
            <span
              className="mt-4 font-mono text-[12px] font-bold uppercase tracking-[0.25em]"
              style={{ color }}
            >
              Session Complete
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 text-center">
        <div
          className="font-mono text-5xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-6xl"
          style={{ color: remainingMs === 0 ? "#10b981" : "#ffffff" }}
        >
          {fmtClock(remainingMs / 1000)}
        </div>
        <div className="mt-1 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{remainingMs === 0 ? "Completed" : isRunning ? "Time Disappearing in 3D" : "Paused"}</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main WorldTimerSection Component                                         */
/* -------------------------------------------------------------------------- */

const COLOR_THEMES = [
  { id: "cyan", hex: "#38bdf8", name: "Cyber Cyan" },
  { id: "emerald", hex: "#10b981", name: "Emerald Green" },
  { id: "purple", hex: "#a855f7", name: "Violet Pulse" },
  { id: "amber", hex: "#f59e0b", name: "Solar Amber" },
  { id: "rose", hex: "#f43f5e", name: "Crimson Red" },
];

const PRESETS = [
  { id: "focus", label: "25m Deep Work", totalSeconds: 25 * 60 },
  { id: "sprint", label: "15m Sprint", totalSeconds: 15 * 60 },
  { id: "power", label: "5m Power Block", totalSeconds: 5 * 60 },
  { id: "quick", label: "10s Quick Demo", totalSeconds: 10 },
];

export default function WorldTimerSection() {
  const [activeTab, setActiveTab] = useState("interactive"); // "interactive" | "screenshot"
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [colorTheme, setColorTheme] = useState(COLOR_THEMES[0]);
  const [totalMs, setTotalMs] = useState(25 * 60 * 1000);
  const [remainingMs, setRemainingMs] = useState(25 * 60 * 1000);
  const [isRunning, setIsRunning] = useState(true);

  // Handle Preset change
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    const ms = preset.totalSeconds * 1000;
    setTotalMs(ms);
    setRemainingMs(ms);
    setIsRunning(true);
  };

  // Timer Tick Loop
  useEffect(() => {
    if (!isRunning || remainingMs <= 0) return;
    const interval = setInterval(() => {
      setRemainingMs((prev) => {
        if (prev <= 1000) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remainingMs]);

  // Handle Scrub
  const handleScrub = (e) => {
    const frac = parseFloat(e.target.value);
    const newRem = Math.round(totalMs * (1 - frac));
    setRemainingMs(newRem);
  };

  const progressFrac = Math.min(1, Math.max(0, 1 - remainingMs / totalMs));

  return (
    <section id="world-timer" className="relative z-10 overflow-hidden bg-[#070b14] py-28 text-slate-100 sm:py-36">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-sky-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-600/15 blur-[120px]" />

      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
              <Globe size={13} className="animate-spin" style={{ animationDuration: "12s" }} />
              NOYRIS WORLD TIMER
            </span>
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl text-center font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Watch time shrink particle by particle.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-slate-400">
            A solid sphere of 3,200 3D matrix cells dissolves shell-by-shell from the outside in.
            The inner core remains protected until the final second.
          </p>
        </Reveal>

        {/* View Switcher Tabs */}
        <Reveal delay={100}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab("interactive")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === "interactive"
                  ? "border border-sky-500/40 bg-sky-500/20 text-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Sparkles size={14} className={activeTab === "interactive" ? "text-sky-400" : ""} />
              <span>Interactive 3D Live Engine</span>
            </button>

            <button
              onClick={() => setActiveTab("screenshot")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === "screenshot"
                  ? "border border-sky-500/40 bg-sky-500/20 text-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Maximize2 size={14} />
              <span>Dark Theme macOS UI</span>
            </button>
          </div>
        </Reveal>

        {/* Main Stage Display */}
        <Reveal delay={150}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            {/* macOS Title Bar Header */}
            <div className="flex h-12 items-center justify-between border-b border-white/10 bg-slate-900/90 px-5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>

              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-300">
                <Globe size={14} className="text-sky-400" />
                <span>Noyris WorldTimer</span>
                <span className="text-slate-500">· Dark Mode Visualizer</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="rounded bg-sky-500/20 px-2 py-0.5 text-sky-300 border border-sky-500/30">
                  60 FPS CANVAS
                </span>
              </div>
            </div>

            {activeTab === "interactive" ? (
              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
                {/* Canvas Visualizer Column */}
                <div className="flex flex-col items-center justify-center lg:col-span-7">
                  <div className="relative flex min-h-[400px] w-full items-center justify-center rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-sm">
                    <LiveWorldCanvas
                      remainingMs={remainingMs}
                      totalMs={totalMs}
                      color={colorTheme.hex}
                      size={380}
                      isRunning={isRunning}
                    />
                  </div>

                  {/* Fast Forward Scrub Slider */}
                  <div className="mt-6 w-full max-w-md px-2">
                    <div className="flex justify-between font-mono text-[11px] text-slate-400 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Sliders size={12} className="text-sky-400" />
                        Scrub Time Dissolve
                      </span>
                      <span>{Math.round(progressFrac * 100)}% dissolved</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.005"
                      value={progressFrac}
                      onChange={handleScrub}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-sky-400 hover:bg-slate-700"
                    />
                  </div>
                </div>

                {/* Control Panel Column */}
                <div className="space-y-6 lg:col-span-5">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">Interactive Controls</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Customize session duration, color palette, and live state.
                    </p>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      disabled={remainingMs <= 0}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-500/20 py-3 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/30 disabled:opacity-50"
                    >
                      {isRunning ? <Pause size={16} /> : <Play size={16} />}
                      <span>{isRunning ? "Pause Session" : "Start Session"}</span>
                    </button>

                    <button
                      onClick={() => {
                        setRemainingMs(totalMs);
                        setIsRunning(true);
                      }}
                      className="flex items-center justify-center rounded-xl border border-white/10 bg-slate-800 p-3 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                      title="Reset Timer"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>

                  {/* Session Duration Presets */}
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Duration Presets
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                      {PRESETS.map((preset) => {
                        const isSelected = selectedPreset.id === preset.id;
                        return (
                          <button
                            key={preset.id}
                            onClick={() => handleSelectPreset(preset)}
                            className={`rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition ${
                              isSelected
                                ? "border-sky-500/50 bg-sky-500/15 text-white shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                                : "border-white/5 bg-slate-900/60 text-slate-400 hover:border-white/20 hover:text-slate-200"
                            }`}
                          >
                            <div className="font-semibold">{preset.label}</div>
                            <div className="text-[10px] text-slate-500">
                              {preset.totalSeconds < 60 ? `${preset.totalSeconds} seconds` : `${preset.totalSeconds / 60} mins`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Color Theme Selector */}
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Particle Color Palette
                    </label>
                    <div className="flex flex-wrap items-center gap-2.5">
                      {COLOR_THEMES.map((theme) => {
                        const isSelected = colorTheme.id === theme.id;
                        return (
                          <button
                            key={theme.id}
                            onClick={() => setColorTheme(theme)}
                            className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                              isSelected
                                ? "border-white scale-110 shadow-lg"
                                : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: theme.hex }}
                            title={theme.name}
                          >
                            {isSelected && <div className="h-2 w-2 rounded-full bg-white shadow" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Status Callout */}
                  <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs text-sky-200/90 leading-relaxed">
                    <div className="flex items-center gap-2 font-semibold text-sky-400 mb-1">
                      <Flame size={14} />
                      <span>Protecting the Core</span>
                    </div>
                    As remaining time ticks down, the 3D globe physically contracts while outer particle layers dissolve first.
                  </div>
                </div>
              </div>
            ) : (
              /* Screenshot Tab View */
              <div className="relative bg-black/60 p-3 sm:p-6">
                <img
                  src="/ssdark_globetimer.png"
                  alt="Noyris Dark World Timer Screen"
                  className="w-full rounded-2xl border border-white/10 shadow-2xl object-cover"
                />
              </div>
            )}
          </div>
        </Reveal>

        {/* 4 Feature Pillars Grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={200}>
            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-900/80">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 transition-transform duration-300 group-hover:scale-110">
                <Layers size={22} />
              </div>
              <h4 className="mt-4 font-display text-lg font-semibold text-white">Shell-by-Shell Dissolve</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Outer matrix cells dissolve first in 3D space, leaving your core focus protected until the timer completes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-900/80">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                <Globe size={22} />
              </div>
              <h4 className="mt-4 font-display text-lg font-semibold text-white">Physical Time Contraction</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                The 3D globe contracts in scale as time runs out, giving a visceral physical feel to time passing.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-purple-500/40 hover:bg-slate-900/80">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400 transition-transform duration-300 group-hover:scale-110">
                <Zap size={22} />
              </div>
              <h4 className="mt-4 font-display text-lg font-semibold text-white">60 FPS Native Canvas</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Built with custom 2D Canvas matrix projection math for zero CPU/GPU overhead and zero distraction.
              </p>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-500/40 hover:bg-slate-900/80">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 transition-transform duration-300 group-hover:scale-110">
                <Sparkles size={22} />
              </div>
              <h4 className="mt-4 font-display text-lg font-semibold text-white">Completion Bloom</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Upon reaching zero, the core unleashes a victorious light bloom and banks earned focus coins.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
