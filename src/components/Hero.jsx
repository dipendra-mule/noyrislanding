import React, { forwardRef } from "react";
import { ArrowUp, Youtube, Instagram, Music2, Hash } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter.js";
import BrowserMockup from "./BrowserMockup.jsx";

const EXAMPLES = [
  "youtube.com/shorts/*",
  "instagram.com/reels",
  "\u201ctrading, crypto\u201d topic",
  "@shortformchannel",
  "reddit.com/r/all",
];

const GHOST_ICONS = [
  { Icon: Youtube, top: "14%", left: "8%", dur: "9s", delay: "0s" },
  { Icon: Instagram, top: "22%", left: "86%", dur: "11s", delay: "1.2s" },
  { Icon: Music2, top: "68%", left: "5%", dur: "8s", delay: "2.4s" },
  { Icon: Hash, top: "72%", left: "90%", dur: "10s", delay: "0.6s" },
];

const Hero = forwardRef(function Hero(_, ref) {
  const typed = useTypewriter(EXAMPLES);

  return (
    <section ref={ref} className="relative">
      <div className="relative min-h-screen overflow-hidden">
        {/* ghost distraction icons, ambient drift */}
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          {GHOST_ICONS.map(({ Icon, top, left, dur, delay }, i) => (
            <Icon
              key={i}
              size={18}
              className="absolute text-white/25 animate-ghostDrift"
              style={{ top, left, animationDuration: dur, animationDelay: delay }}
              strokeWidth={1.5}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-0 pt-24 text-center sm:pt-28">
          <h1 className="font-display text-[3.4rem] font-light leading-[0.98] tracking-tight text-white sm:text-[5rem] animate-heroIn">
            Stay Focused.
            <br />
            Automatically.
          </h1>

          <div
            className="mx-auto mt-5 flex max-w-md items-center gap-3 rounded-full border border-white/25 bg-white/[0.14] py-1.5 pl-6 pr-1.5 backdrop-blur-xl animate-heroIn"
            style={{ animationDelay: "150ms" }}
          >
            <span className="flex-1 truncate text-left font-mono text-[13px] text-white/85">
              {typed}
              <span className="animate-cursorBlink">|</span>
            </span>
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand text-white transition-transform hover:scale-105">
              <ArrowUp size={15} strokeWidth={2.25} />
            </span>
          </div>

          <p
            className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/75 sm:text-[15px] animate-heroIn"
            style={{ animationDelay: "300ms" }}
          >
            Block the sites, apps, channels and topics that pull you away.
          </p>
        </div>

        <div className="relative z-10 mt-10 px-6 animate-heroIn" style={{ animationDelay: "420ms" }}>
          <BrowserMockup />
        </div>
      </div>
    </section>
  );
});

export default Hero; 