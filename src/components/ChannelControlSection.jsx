import React, { useState } from "react";
import { Youtube, Lock, Play, Check, ShieldCheck, BookMarked } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { Toggle } from "./appUi/Toggle.jsx";
import thumbSpiderman from "../assets/video-spiderman.jpg";
import chan3b1b from "../assets/chan-3Blue1Brown.jpg";
import chanFireship from "../assets/chan-Fireship.jpg";
import chanMrBeast from "../assets/chan-MrBeast.jpg";
import chanMKBHD from "../assets/chan-mkbhd.jpg";
import chanPewDiePie from "../assets/chan-PewDiePie.jpg";

const ALLOWED = [
  { handle: "@3Blue1Brown", avatar: chan3b1b },
  { handle: "@Fireship", avatar: chanFireship },
];

const BLOCKED = [
  { handle: "@MrBeast", avatar: chanMrBeast },
  { handle: "@mkbhd", avatar: chanMKBHD },
  { handle: "@PewDiePie", avatar: chanPewDiePie },
];

function ChannelRow({ handle, avatar, allowed }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-card px-3 py-2">
      <img src={avatar} alt={handle} className="h-9 w-9 flex-none rounded-full object-cover ring-1 ring-black/10" />
      <span className="flex-1 truncate font-mono text-[12px] font-semibold text-brand-ink">{handle}</span>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
          allowed ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        }`}
      >
        {allowed ? <Check size={10} strokeWidth={3} /> : <Lock size={10} strokeWidth={2.5} />}
        {allowed ? "Allowed" : "Blocked"}
      </span>
    </div>
  );
}

export default function ChannelControlSection() {
  const [blocked, setBlocked] = useState(true);

  return (
    <section className="relative z-10 bg-paper py-24 px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Copy */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink border border-brand/30">
              <Youtube size={13} className="text-brand" />
              Channel Control
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Keep the channels you love.
              <br />
              Block the rest.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">
              Noyris reads YouTube video titles in real time. Allow the channels that actually teach you,
              block the ones that just eat your evening &mdash; and stop a video the moment its title trips a topic.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: "Channel allow-list",
                  desc: "Allowlisted channels stay watchable even while YouTube is blocked.",
                },
                {
                  title: "Block by handle",
                  desc: "One @handle rule closes the whole channel before a single frame loads.",
                },
                {
                  title: "Title-aware blocking",
                  desc: "Titles are scanned live &mdash; the overlay names the exact match.",
                },
              ].map((f, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                      <path d="M2 6.5 4.5 9 10 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink">{f.title}</h3>
                    <p className="text-[13px] text-mist">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: Mockup */}
          <Reveal delay={150} variant="scale">
            <div className="relative flex min-h-0 overflow-hidden rounded-[24px] border border-brand-border bg-paper shadow-macos-4">
              {/* frameless macOS traffic lights */}
              <div className="absolute left-5 top-4 z-10 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                {/* Protection pill — right-aligned to clear the traffic lights */}
                <div className="flex shrink-0 items-center justify-end px-4 pb-3 pt-4 sm:px-5">
                  <div className="flex items-center gap-2.5 rounded-lg border border-brand-border bg-card py-1.5 pl-3 pr-2 shadow-macos-1">
                    <ShieldCheck size={15} strokeWidth={2.2} className="text-success" />
                    <span className="text-[13px] font-semibold text-brand-ink">Protection On</span>
                    <Toggle size="sm" checked />
                  </div>
                </div>

                <div className="flex flex-col gap-4 px-4 pb-5 sm:px-5">
                  {/* Watch page demo */}
                  <div className="flex flex-col gap-3">
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
                      <img
                        src={thumbSpiderman}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      {!blocked ? (
                        <button
                          type="button"
                          onClick={() => setBlocked(true)}
                          aria-label="Play video"
                          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/10"
                        >
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-transform hover:scale-105">
                            <Play size={22} fill="currentColor" className="ml-0.5" />
                          </span>
                        </button>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-ink/90 px-4 text-center">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                            <Lock size={19} strokeWidth={1.8} />
                          </div>
                          <div className="mt-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-red-400">
                            Blocked
                          </div>
                          <p className="font-display text-lg font-semibold text-white">Stay focused.</p>
                          <p className="rounded-lg bg-white/10 px-2.5 py-1 font-mono text-[10px] text-white/85">
                            Matched &ldquo;spider-man&rdquo; in the video title
                          </p>
                          <button
                            type="button"
                            onClick={() => setBlocked(false)}
                            className="mt-1 cursor-pointer rounded-full bg-brand px-4 py-1.5 text-[11px] font-semibold text-white transition-transform hover:scale-105"
                          >
                            Return to Focus
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-brand-border bg-brand-surface p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate rounded-md bg-black/5 px-2 py-0.5 font-mono text-[10px] text-brand-sub">
                          youtube.com/watch?v=JfVOs4VSpmA
                        </span>
                        <span className="flex-none rounded-md bg-black/5 px-2 py-0.5 font-mono text-[10px] text-brand-sub">
                          @sonypictures
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] font-semibold leading-snug text-brand-ink">
                        SPIDER-MAN: NO WAY HOME &mdash; Official Trailer (HD)
                      </p>
                    </div>
                  </div>

                  {/* Channel lists */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-success">
                        <Check size={12} strokeWidth={3} />
                        Allowed channels
                      </p>
                      <div className="flex flex-col gap-2">
                        {ALLOWED.map((c) => (
                          <ChannelRow key={c.handle} handle={c.handle} avatar={c.avatar} allowed />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-destructive">
                        <Lock size={11} strokeWidth={2.5} />
                        Blocked channels
                      </p>
                      <div className="flex flex-col gap-2">
                        {BLOCKED.map((c) => (
                          <ChannelRow key={c.handle} handle={c.handle} avatar={c.avatar} allowed={false} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-brand-border bg-brand-surface p-3">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-ink">
                      <BookMarked size={12} className="text-brand" />
                      How it works
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-brand-sub">
                      Channel rules use real handles &amp; IDs. Titles are read locally &mdash; your history and rules never leave your machine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
