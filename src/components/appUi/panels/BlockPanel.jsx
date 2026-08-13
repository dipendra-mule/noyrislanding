import { ShieldCheck, Plus } from "lucide-react";
import { SectionHeader } from "../SectionHeader.jsx";
import { TogglePill } from "../TogglePill.jsx";
import { PresetPill } from "../PresetPill.jsx";
import { AppLogo } from "../AppLogo.jsx";
import { Toggle } from "../Toggle.jsx";
import { CommandDeck } from "../CommandDeck.jsx";
import { CatalogTabs, BLOCK_TABS } from "../CatalogTabs.jsx";
import { RuleRail } from "../RuleRail.jsx";

/* Faithful static port of the app's Block page (src/panels/Block.tsx) in its
 * default "Overview" state — Protection pill header, CommandDeck, CatalogTabs,
 * the Sites grid of whole-site cards with section chips, Your Most Used,
 * Presets, and the collapsed right RuleRail. Dead UI: no state, no API, no
 * handlers; everything reads from the demo data below. */

const SITES = [
  {
    name: "YouTube",
    whole: "youtube.com",
    wholeOn: true,
    sections: [
      { key: "shorts", label: "Shorts", on: true },
      { key: "live", label: "Live", on: false },
      { key: "studio", label: "Studio / Upload", on: false },
    ],
  },
  {
    name: "Instagram",
    whole: "instagram.com",
    wholeOn: true,
    sections: [
      { key: "reels", label: "Reels", on: true },
      { key: "explore", label: "Explore", on: false },
      { key: "direct", label: "DM", on: false },
    ],
  },
  {
    name: "Reddit",
    whole: "reddit.com",
    wholeOn: false,
    sections: [
      { key: "subreddits", label: "All subreddits", on: true },
      { key: "search", label: "Search", on: false },
    ],
  },
  {
    name: "X (Twitter)",
    whole: "x.com",
    wholeOn: false,
    sections: [
      { key: "home", label: "Home feed", on: true },
      { key: "explore", label: "Explore", on: false },
      { key: "search", label: "Search", on: false },
    ],
  },
];

const MOST_USED = [
  { name: "Discord", value: "discord.com", kind: "app", on: true },
  { name: "Figma", value: "figma.com", kind: "app", on: true },
  { name: "Slack", value: "slack.com", kind: "app", on: false },
  { name: "Telegram", value: "telegram.org", kind: "app", on: false },
  { name: "Spotify", value: "spotify.com", kind: "site", on: false },
  { name: "Netflix", value: "netflix.com", kind: "site", on: false },
];

const PRESETS = [
  {
    title: "Social feeds",
    full: true,
    entities: [
      { type: "domain", value: "instagram.com", name: "Instagram" },
      { type: "domain", value: "x.com", name: "X" },
      { type: "domain", value: "facebook.com", name: "Facebook" },
    ],
    ruleValues: ["instagram.com", "x.com", "facebook.com"],
  },
  {
    title: "Doomscroll",
    full: true,
    entities: [
      { type: "domain", value: "reddit.com", name: "Reddit" },
      { type: "domain", value: "tiktok.com", name: "TikTok" },
      { type: "domain", value: "9gag.com", name: "9gag" },
    ],
    ruleValues: ["reddit.com/r/all", "tiktok.com", "9gag.com"],
  },
  {
    title: "News & opinion",
    full: false,
    entities: [
      { type: "domain", value: "nytimes.com", name: "NYTimes" },
      { type: "domain", value: "cnn.com", name: "CNN" },
      { type: "domain", value: "bbc.com", name: "BBC" },
    ],
    ruleValues: ["nytimes.com", "cnn.com", "bbc.com"],
  },
];

const RAIL_ITEMS = [
  { id: "1", label: "YouTube", spec: { type: "domain", value: "youtube.com" }, tone: "block" },
  { id: "2", label: "Shorts", spec: { type: "url_pattern", value: "youtube.com/shorts" }, tone: "block" },
  { id: "3", label: "Instagram", spec: { type: "domain", value: "instagram.com" }, tone: "block" },
  { id: "4", label: "Reels", spec: { type: "url_pattern", value: "instagram.com/reels" }, tone: "block" },
  { id: "5", label: "Reddit", spec: { type: "domain", value: "reddit.com" }, tone: "block" },
  { id: "6", label: "r/all", spec: { type: "url_pattern", value: "reddit.com/r/all" }, tone: "block" },
  { id: "7", label: "X Home", spec: { type: "url_pattern", value: "x.com/home" }, tone: "block" },
  { id: "8", label: "Discord", spec: { type: "app", value: "com.discord.Discord", name: "Discord" }, tone: "block" },
  { id: "9", label: "Figma", spec: { type: "app", value: "com.figma.Desktop", name: "Figma" }, tone: "block" },
];

const TABS_WITH_COUNTS = BLOCK_TABS.map((t) => ({
  ...t,
  count: t.id === "overview" ? 12 : t.id === "topics" ? 3 : 8,
}));

/* Per-site card: whole-site toggle + section chips that light up red when
 * blocked (src/panels/Block.tsx — CompactSiteCard). */
function CompactSiteCard({ site }) {
  const activeSections = site.sections.filter((s) => s.on).length;
  return (
    <div className="bg-card rounded-2xl border border-brand-border shadow-macos-2 p-5 flex flex-col">
      <div className="flex items-center gap-2.5">
        <AppLogo entity={{ type: "domain", value: site.whole }} size={24} radius={6} />
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-brand-ink truncate">{site.name}</div>
          <div className="text-[12px] text-brand-light truncate">
            {site.wholeOn
              ? "Whole site blocked"
              : `${activeSections} of ${site.sections.length} sections blocked`}
          </div>
        </div>
        <Toggle checked={site.wholeOn} />
      </div>

      <div className="flex gap-2 mt-4 flex-nowrap">
        {site.sections.map((s) => (
          <span
            key={s.key}
            className={`flex-1 min-w-0 truncate px-2.5 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              s.on
                ? "border-destructive bg-destructive text-white shadow-macos-1"
                : "border-brand-border bg-card text-brand-sub"
            }`}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* PageHeader row — right-aligned Protection pill (src/components/PageHeader.tsx
 * + the Block page's protection toggle). */
function ProtectionPill() {
  return (
    <div className="flex items-center justify-end px-7 pt-4 pb-2 shrink-0 min-h-[48px]">
      <div className="flex items-center gap-2.5 bg-card border border-brand-border rounded-lg pl-3 pr-2 py-1.5 shadow-macos-1">
        <ShieldCheck size={15} strokeWidth={2.2} className="text-success" />
        <span className="text-[13px] font-semibold text-brand-ink">Protection On</span>
        <Toggle size="sm" checked />
      </div>
    </div>
  );
}

export function BlockPanel() {
  return (
    <div className="flex flex-1 min-h-0 overflow-hidden bg-transparent">
      <div className="flex-1 flex flex-col min-w-0">
        <ProtectionPill />

        <div className="flex-1 overflow-y-auto scrollbar-thin px-7 pb-6 cq-panel">
          <div className="flex flex-col gap-5 min-w-0 max-w-[1360px] mx-auto w-full">
            <CommandDeck tone="block" />

            <CatalogTabs tabs={TABS_WITH_COUNTS} activeTab="overview" tone="block" />

            <div>
              <SectionHeader title="Sites" />
              <div className="grid grid-cols-1 gap-3 cq-grid-2to4">
                {SITES.map((site) => (
                  <CompactSiteCard key={site.whole} site={site} />
                ))}
              </div>
            </div>

            <div>
              <SectionHeader title="Your Most Used" />
              <div className="grid grid-cols-1 gap-2 cq-grid-2to4">
                {MOST_USED.map((m) => (
                  <TogglePill
                    key={m.name}
                    on={m.on}
                    className="flex items-center gap-2 pl-2 pr-3 h-9 rounded-md border"
                  >
                    <AppLogo
                      entity={{ type: m.kind, value: m.value, name: m.name }}
                      size={24}
                      radius={6}
                      className="shrink-0"
                    />
                    <span
                      className={`text-sm font-semibold truncate flex-1 min-w-0 text-left ${
                        m.on ? "text-destructive" : "text-brand-ink"
                      }`}
                    >
                      {m.name}
                    </span>
                  </TogglePill>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader
                title="Presets"
                right={
                  <span className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-brand-border bg-card text-sm font-semibold text-brand">
                    <Plus size={13} strokeWidth={2.5} /> New preset
                  </span>
                }
              />
              <div className="grid grid-cols-1 gap-2 cq-grid-2to4">
                {PRESETS.map((p) => (
                  <PresetPill key={p.title} data={p} full={p.full} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RuleRail items={RAIL_ITEMS} />
    </div>
  );
}
