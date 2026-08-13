import React from "react";
import { Film } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function ShortsBanSection() {
  return (
    <section className="relative z-10 bg-black py-8">
      <div className="mx-auto w-full max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-none">
            <video
              src="/shorts-demo.mp4"
              controls
              preload="metadata"
              playsInline
              className="block aspect-video w-full bg-black object-cover"
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-between gap-8 p-6 sm:p-10">
              {/* Left column — hugs the left edge */}
              <div className="max-w-xs text-left sm:max-w-sm">
                <div className="glass-text inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white/80">
                  <Film size={13} className="text-white/80" />
                  Short-Form Content Ban
                </div>
                <h2 className="glass-text mt-5 font-display text-3xl font-bold tracking-tight text-white/85 sm:text-4xl">
                  Cut off the dopamine drip at the source.
                </h2>
              </div>

              {/* Center area left blank */}

              {/* Right column — hugs the right edge */}
              <div className="max-w-xs text-right sm:max-w-sm">
                <p className="glass-text text-[15px] leading-relaxed text-white/75">
                  Modern distraction doesn&rsquo;t live on homepages &mdash; it lives in algorithmic vertical feeds. Noyris intercepts short-form video and endless scrolls before the first frame renders.
                </p>
                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  {["youtube.com/shorts/*", "instagram.com/reels", "tiktok.com", "r/all"].map((r) => (
                    <span
                      key={r}
                      className="glass-text inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 font-mono text-[11px] font-semibold text-white/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400/90" />
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
