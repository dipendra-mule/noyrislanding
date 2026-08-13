import React from "react";
import { Coins, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function CoinsRewards() {
  return (
    <section className="relative bg-paper py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-mist bg-brandblue/40 px-3 py-1 rounded-full">
              Gamified Focus
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Earn coins for deep work. Protected against quitting.
            </h2>
            <p className="mt-3 text-base text-mist max-w-2xl mx-auto">
              Noyris turns discipline into reward. Accumulate coin balances as you log focus minutes and finish missions, backed by intelligent quit protection.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-brandblue/40 bg-card p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brandblue text-brand">
                <Coins size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">Coin Earnings & Streaks</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed">
                Stay on track and watch your coin balance grow. Every completed milestone and uninterrupted focus block rewards your commitment with tangible progress tokens.
              </p>
              <div className="mt-6 flex items-center gap-3 bg-paper p-4 rounded-xl border border-brandblue/30">
                <div className="h-3 w-3 rounded-full bg-brand animate-pulse" />
                <span className="font-mono text-xs font-medium text-ink">Session Streak: Active (+150 coins today)</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-brandblue/40 bg-card p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brandblue text-brand">
                <ShieldCheck size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">Quit Protection Overlay</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed">
                When focus mode is active, closing the window minimizes to the tray instead of quitting. Actual exits require a deliberate hold-to-confirm gesture, stopping accidental procrastination.
              </p>
              <div className="mt-6 flex items-center gap-3 bg-paper p-4 rounded-xl border border-brandblue/30">
                <div className="h-3 w-3 rounded-full bg-ink" />
                <span className="font-mono text-xs font-medium text-ink">Hold to Quit: Protected 24/7</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
