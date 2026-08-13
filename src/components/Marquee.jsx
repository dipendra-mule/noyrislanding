import React from "react";
import { Youtube, Instagram, Music2, Hash, Twitch, Rss, Tags } from "lucide-react";

const ITEMS = [
  { Icon: Youtube, label: "youtube.com/shorts/*" },
  { Icon: Instagram, label: "instagram.com/reels" },
  { Icon: Music2, label: "tiktok.com" },
  { Icon: Hash, label: "x.com" },
  { Icon: Twitch, label: "twitch.tv" },
  { Icon: Rss, label: "reddit.com" },
  { Icon: Tags, label: "\u201ctrading & crypto\u201d topic" },
];

export default function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-brandblue/40 bg-card py-5">
      <div className="flex w-max animate-drift gap-10 pr-10">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 gap-10">
            {ITEMS.map((it, i) => (
              <span key={i} className="flex shrink-0 items-center gap-2 font-mono text-[13px] text-mist">
                <it.Icon size={14} className="text-brandblue" />
                {it.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
