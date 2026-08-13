import React from "react";
import { Lock, Flame, Clock3, TrendingDown } from "lucide-react";
import Reveal from "./Reveal.jsx";
import topicGot from "../assets/topic-got.jpg";
import topicMarvel from "../assets/topic-marvel.jpg";
import topicSpiderMan from "../assets/topic-spiderman.jpg";

const TOPICS = [
  {
    name: "Game of Thrones",
    keyword: "game-of-thrones",
    platform: "youtube.com/shorts",
    photo: topicGot,
    pos: "center",
  },
  {
    name: "Marvel",
    keyword: "marvel",
    platform: "instagram.com/reels",
    photo: topicMarvel,
    pos: "center",
  },
  {
    name: "Spider-Man",
    keyword: "spider-man",
    platform: "tiktok.com",
    photo: topicSpiderMan,
    pos: "center",
  },
];

const WEEK_BARS = [38, 52, 46, 78, 64, 92, 100];
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function TopicCard({ t }) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/20 bg-ink shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <img
        src={t.photo}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ objectPosition: t.pos }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(10,10,12,0) 30%, rgba(10,10,12,0.82) 100%)" }}
      />

      <div className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 font-mono text-[9px] font-semibold text-white/85 backdrop-blur-sm">
        {t.platform}
      </div>
      <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-red-400/60 bg-red-500/85 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wide text-white shadow-md">
        <Lock size={9} strokeWidth={2.5} />
        Blocked
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-xl font-bold text-white">{t.name}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="truncate rounded-full border border-white/25 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/90 backdrop-blur-sm">
            keyword: &ldquo;{t.keyword}&rdquo;
          </span>
          <span className="relative flex h-6 w-11 flex-none items-center rounded-full bg-red-500 shadow-inner">
            <span className="absolute left-6 h-4 w-4 rounded-full bg-white shadow" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ChannelCards() {
  return (
    <section className="relative z-10">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-16 text-center sm:pt-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <Flame size={13} className="text-red-400" />
            Obsession Blocker
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-[3.4rem]">
            We block your obsession.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85">
            Match Game of Thrones, Marvel or Spider-Man by title, keyword and channel &mdash; then cut
            the feed before the first frame even renders.
          </p>
        </Reveal>

        <Reveal delay={150} variant="scale">
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[24px] border border-white/25 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {/* Mockup window chrome */}
            <div className="flex h-11 items-center justify-between border-b border-line bg-paper/80 px-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                <Lock size={12} className="text-red-500" />
                Noyris &mdash; Blocked Topics
              </div>
              <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-bold text-success">
                PROTECTION ON
              </span>
            </div>

            {/* Mockup body */}
            <div className="bg-paper p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {TOPICS.map((t) => (
                  <TopicCard key={t.name} t={t} />
                ))}
              </div>

              {/* Screen-time feature card */}
              <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                    <Clock3 size={20} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-ink">Time spent on Spider-Man</p>
                    <p className="text-[12px] text-mist">Blocked before it could hook you again</p>
                  </div>
                </div>

                <div className="flex flex-1 items-end justify-center gap-1.5 sm:max-w-[260px]">
                  {WEEK_BARS.map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-6 rounded-t-md ${i === 6 ? "bg-red-500" : "bg-red-400/40"}`}
                        style={{ height: `${Math.round(h * 0.6)}px` }}
                      />
                      <span className="text-[8px] font-medium text-mist">{WEEK_DAYS[i]}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-1 items-center justify-end gap-6 sm:flex-col sm:items-end sm:gap-1">
                  <p className="font-display text-3xl font-bold tabular-nums text-ink">14h 32m</p>
                  <p className="flex items-center gap-1 text-[11px] font-semibold text-success">
                    <TrendingDown size={12} />
                    41% less than last week
                  </p>
                  <p className="text-[11px] text-mist">23 distractions blocked today</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
