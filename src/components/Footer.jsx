import React, { useEffect, useRef, useMemo } from "react";
import { Instagram } from "lucide-react";
import NoyrisLogo from "./NoyrisLogo.jsx";

/* -------------------------------------------------------------------------- */
/*  Continuous 20-Minute Real-Time Shrinking World Globe Animation            */
/* -------------------------------------------------------------------------- */

const TOTAL_SECONDS = 20 * 60; // 20 minutes loop (1200 seconds)
const MAX_CELLS = 4800; // 4 cells per second (approx 4 dots per second)
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

function buildWorld() {
  const count = MAX_CELLS;
  const rand = mulberry32(12345);
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
  // Dissolve order: outermost shell first, core last
  cells.sort((a, b) => Math.hypot(b.x, b.y, b.z) - Math.hypot(a.x, a.y, a.z));
  return cells;
}

function FooterWorldCanvas() {
  const canvasRef = useRef(null);
  const cells = useMemo(() => buildWorld(), []);
  const canvasSize = 360;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const cx = canvasSize / 2;
    const cy = canvasSize / 2;
    const R = canvasSize * 0.44;
    const baseCellR = Math.max(1.2, R * 0.022);
    const color = "#ffffff";

    const t0 = performance.now();
    const proj = [];
    let raf = 0;

    const draw = (now) => {
      const elapsedTotalSec = (now - t0) / 1000;
      
      // 20 minute loop (1200 seconds). 4 cells disappear per second.
      const currentSecInLoop = elapsedTotalSec % TOTAL_SECONDS;
      const cellsPerSecond = 4; // Exactly 4 dots disappear every second (every 25% part of second)

      const rotY = elapsedTotalSec * 0.12;
      const rotX = Math.sin(elapsedTotalSec * 0.05) * 0.2;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      const targetD = Math.min(
        cells.length,
        Math.max(0, Math.floor(currentSecInLoop * cellsPerSecond))
      );

      const remainingFrac = Math.max(0, 1 - (currentSecInLoop / TOTAL_SECONDS));
      const radiusScale = 0.35 + 0.65 * remainingFrac;
      const effR = R * radiusScale;
      const cellR = baseCellR * (0.6 + 0.4 * remainingFrac);

      proj.length = 0;
      for (let i = 0; i < cells.length; i++) {
        if (i < targetD) continue; // Dissolved cells omitted
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
        ctx.globalAlpha = 0.3 + depthF * 0.7;
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
  }, [cells]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: canvasSize, height: canvasSize }}>
        <canvas
          ref={canvasRef}
          style={{ width: canvasSize, height: canvasSize }}
          className="block drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
        />
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#090909] text-slate-300 pt-16 pb-12 overflow-hidden border-t border-white/10">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-center justify-center">
        <p className="font-mono text-[11px] text-slate-400 tracking-[0.2em] uppercase text-center mb-[-10px]">
          watch the time shrink particle by particle
        </p>
        {/* Big Pure World Globe Animation in Footer */}
        <div className="my-2">
          <FooterWorldCanvas />
        </div>

        <div className="w-full h-px bg-white/10 my-10" />

        {/* Bottom footer links and copyright */}
        <div className="w-full flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <NoyrisLogo size={16} className="text-white" />
            <span className="font-display text-sm font-semibold tracking-tight text-white">NOYRIS</span>
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
            <p className="font-mono text-xs text-slate-500">&copy; 2026 NOYRIS Inc. All rights reserved.</p>
            <a
              href="https://www.instagram.com/noyris.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white"
            >
              <Instagram size={13} />
              @noyris.app
            </a>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#capabilities" className="nav-link hover:text-white">Product</a>
            <a href="#how" className="nav-link hover:text-white">How it works</a>
            <a href="#pricing" className="nav-link hover:text-white">Pricing</a>
            <a href="#faq" className="nav-link hover:text-white">FAQ</a>
            <a href="#privacy" className="nav-link hover:text-white">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
