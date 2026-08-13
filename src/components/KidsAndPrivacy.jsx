import React from "react";
import { Baby, Lock } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function KidsAndPrivacy() {
  return (
    <section className="relative bg-paper py-24 px-6 border-t border-brandblue/30">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-mist bg-brandblue/40 px-3 py-1 rounded-full">
              Security & Control
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Kids Mode & 100% Local Privacy
            </h2>
            <p className="mt-3 text-base text-mist max-w-2xl mx-auto">
              Your activity data never leaves your machine. Enjoy uncompromising parental locks and a local SQLite architecture with zero cloud telemetry.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-brandblue/40 bg-card p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brandblue text-brand">
                <Baby size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">Kids Mode & Strict Enforcement</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed">
                Enable Kids Mode to instantly close unauthorized apps and websites without warning overlays. Foreground polling tightens to 1 second while Kids Mode is on, for unbreakable parental control.
              </p>
              <ul className="mt-6 space-y-2 text-xs font-mono text-mist">
                <li className="flex items-center gap-2">✓ Instant silent close on blocked apps</li>
                <li className="flex items-center gap-2">✓ Unlisted app and domain blacklisting</li>
                <li className="flex items-center gap-2">✓ Cannot be bypassed without the OS account password</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-brandblue/40 bg-card p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brandblue text-brand">
                <Lock size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">Local SQLite Database</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed">
                All logs, schedules, coins, and rules reside securely in a local `noyris.db` file in your application directory. No accounts required, no servers listening, total privacy.
              </p>
              <ul className="mt-6 space-y-2 text-xs font-mono text-mist">
                <li className="flex items-center gap-2">✓ 100% offline functionality</li>
                <li className="flex items-center gap-2">✓ Zero data collection or ad tracking</li>
                <li className="flex items-center gap-2">✓ Automated 60-day aggregation retention</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
