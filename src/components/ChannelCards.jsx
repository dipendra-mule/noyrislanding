import React from "react";
import { Lock, Flame } from "lucide-react";
import Reveal from "./Reveal.jsx";
import topicGot from "../assets/topic-got.jpg";
import topicMarvel from "../assets/topic-marvel.jpg";
import topicSpiderMan from "../assets/topic-spiderman.jpg";

const TOPICS = [
  {
    eyebrow: "01 · topics",
    title: "Game of Thrones",
    desc: "Matched by title, keyword and channel — the keyword \u201cgame-of-thrones\u201d cuts youtube.com/shorts the moment the title matches.",
    photo: topicGot,
    pos: "center",
    keyword: "game-of-thrones",
  },
  {
    eyebrow: "02 · topics",
    title: "Marvel",
    desc: "One keyword, every surface. \u201cmarvel\u201d trips a block across instagram.com/reels — reels, home feeds and search — the moment the title matches.",
    photo: topicMarvel,
    pos: "center",
    keyword: "marvel",
  },
  {
    eyebrow: "03 · topics",
    title: "Spider-Man",
    desc: "Blocked before it could hook you again. One keyword rule is all it takes — every title, every channel, every time.",
    photo: topicSpiderMan,
    pos: "center",
    keyword: "spider-man",
  },
];

function TopicCard({ t }) {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink shadow-macos-3 sm:max-w-[360px] sm:mx-auto">
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

      <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-red-400/60 bg-red-500/85 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wide text-white shadow-md">
        <Lock size={9} strokeWidth={2.5} />
        Blocked
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-xl font-bold text-white">{t.title}</p>
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
    <section className="relative z-10 overflow-hidden py-14 sm:py-20">
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-3 flex items-center justify-center gap-2 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/75">
            <Flame size={13} className="text-red-400" />
            Obsession Blocker
          </p>
          <h2 className="mx-auto max-w-lg text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            We block your obsession.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-white/85">
            Match Game of Thrones, Marvel or Spider-Man by title, keyword and channel &mdash; then cut
            the feed the moment a match is found.
          </p>
        </Reveal>

        <div className="mt-12 space-y-12">
          {TOPICS.map((t, i) => (
            <Reveal key={t.title} delay={i * 80} variant={i % 2 === 1 ? "right" : "left"}>
              <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-10">
                <div className={i % 2 === 1 ? "sm:order-2" : ""}>
                  <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">{t.eyebrow}</p>
                  <h3 className="mb-3 font-display text-2xl font-medium tracking-tight text-white sm:text-[1.8rem]">{t.title}</h3>
                  <p className="text-[15px] leading-relaxed text-white/80">{t.desc}</p>
                </div>
                <div className={i % 2 === 1 ? "sm:order-1" : ""}>
                  <TopicCard t={t} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
