import React, { useEffect, useState } from "react";
import { CheckCircle2, Download, Apple, Monitor, ExternalLink, ArrowLeft, ShieldCheck, Zap, Infinity as InfinityIcon } from "lucide-react";
import NoyrisLogo from "./NoyrisLogo.jsx";
import { RELEASE } from "../config.js";

const PERKS = [
  { icon: ShieldCheck, label: "License key included in your email" },
  { icon: InfinityIcon, label: "Free updates for macOS & Windows, forever" },
  { icon: Zap, label: "Works offline for up to 3 days" },
];

function detectOS() {
  const ua = navigator.userAgent || "";
  if (/Mac|iPhone|iPad/.test(ua)) return "mac";
  if (/Win/.test(ua)) return "windows";
  return null;
}

function DownloadButton({ href, primary, icon: Icon, title, sub }) {
  return (
    <a
      href={href}
      download
      className={`group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 ${
        primary
          ? "border-transparent bg-brand text-white shadow-[0_16px_36px_-12px_rgba(54,54,54,0.5)] hover:shadow-[0_20px_44px_-12px_rgba(54,54,54,0.65)]"
          : "border-white/[0.12] bg-white/[0.04] text-white/90 backdrop-blur-md hover:border-white/25 hover:bg-white/[0.08]"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
          primary ? "bg-white/15 text-white" : "bg-white/[0.07] text-brand"
        }`}
      >
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate font-display text-[15px] font-semibold">{title}</span>
        <span className={`block truncate text-[12px] ${primary ? "text-white/70" : "text-white/55"}`}>{sub}</span>
      </span>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
          primary ? "bg-white text-brand group-hover:scale-110" : "border border-white/15 text-white group-hover:bg-white/10"
        }`}
      >
        <Download size={15} />
      </span>
    </a>
  );
}

/* Success/download page. `platform` comes from the URL route:
 *   #/success / #/download              -> auto-detect the visitor's OS
 *   #/success-mac / #/download-mac      -> macOS page (Mac checkout redirect)
 *   #/success-windows / #/download-windows -> Windows page (Win checkout redirect)
 * The purchased platform is highlighted and listed first; the other is still
 * available underneath. */
export default function DownloadPage({ platform }) {
  const [os, setOs] = useState(null);

  useEffect(() => {
    setOs(detectOS());
  }, []);

  const primary = platform || os || "mac";

  const headline =
    platform === "mac"
      ? "You're all set, welcome to Noyris on macOS."
      : platform === "windows"
        ? "You're all set, welcome to Noyris on Windows."
        : "You're all set, welcome to Noyris.";

  const buttons =
    primary === "windows"
      ? [
          { href: RELEASE.windows.exe, icon: Monitor, title: "Download for Windows", sub: RELEASE.windows.exeLabel, primary: true },
          { href: RELEASE.mac.dmg, icon: Apple, title: "Download for macOS", sub: RELEASE.mac.dmgLabel, primary: false },
        ]
      : [
          { href: RELEASE.mac.dmg, icon: Apple, title: "Download for macOS", sub: RELEASE.mac.dmgLabel, primary: true },
          { href: RELEASE.windows.exe, icon: Monitor, title: "Download for Windows", sub: RELEASE.windows.exeLabel, primary: false },
        ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#090909] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-brand/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[130px]" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-6 pb-16 pt-10">
        {/* Header */}
        <header className="flex w-full items-center justify-between">
          <a href="./" className="flex items-center gap-2">
            <NoyrisLogo size={18} className="text-white" />
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">NOYRIS</span>
          </a>
          <a
            href="./"
            className="flex items-center gap-1.5 text-[13px] text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to site
          </a>
        </header>

        {/* Success state */}
        <div className="mt-14 flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 size={34} strokeWidth={2.2} />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {headline}
          </h1>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/70">
            Your payment went through. Your <span className="font-semibold text-white">license key is on its way to your email</span> —
            grab the installer below, install Noyris, and paste the key in when you first open it.
          </p>
        </div>

        {/* Download buttons */}
        <div className="mt-10 w-full space-y-3">
          {buttons.map(({ href, icon, title, sub, primary: isPrimary }) => (
            <DownloadButton key={title} href={href} primary={isPrimary} icon={icon} title={title} sub={sub} />
          ))}
        </div>

        {!platform && (
          <p className="mt-4 text-[12px] text-white/45">
            Not sure which one? Choose <span className="text-white/70">Apple</span> if you're on a Mac,{" "}
            <span className="text-white/70">Windows</span> if you're on a PC. Apple Silicon Macs use the same
            download.
          </p>
        )}

        {/* Perks */}
        <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
          {PERKS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5"
            >
              <Icon size={17} className="shrink-0 text-brand" />
              <span className="text-[12px] leading-snug text-white/75">{label}</span>
            </div>
          ))}
        </div>

        {/* Troubleshooting */}
        <div className="mt-10 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h2 className="font-display text-[15px] font-semibold text-white">Opening the installer</h2>
          <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-white/70">
            <li>
              <span className="font-semibold text-white">macOS:</span> right-click the .dmg → Open (first launch
              only). If you bought a Windows key, use the Windows download.
            </li>
            <li>
              <span className="font-semibold text-white">Windows:</span> run the Setup file and follow the
              installer. SmartScreen may ask you to confirm — that's normal for unsigned installers.
            </li>
            <li>
              <span className="font-semibold text-white">License key:</span> paste the key from your email into
              the activation screen on first launch. One key works on one device.
            </li>
          </ul>
          <a
            href="mailto:noyrisapp@gmail.com"
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-brand transition-colors hover:text-white"
          >
            Need help? Contact support
            <ExternalLink size={13} />
          </a>
        </div>

        <footer className="mt-14 w-full border-t border-white/[0.07] pt-6 text-center">
          <p className="font-mono text-[11px] tracking-widest text-white/35">
            &copy; 2026 NOYRIS Inc. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
