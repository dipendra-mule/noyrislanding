import {
  Youtube,
  Instagram,
  Github,
  Twitter,
  Twitch,
  Figma,
  Slack,
  Dribbble,
  Gitlab,
  Facebook,
  Linkedin,
  Codepen,
} from "lucide-react";

/* Brand glyph map: Lucide brand icons where they exist, each tinted with its
 * brand color. Mirrors how the real app resolves logos at runtime — anything
 * without a Lucide glyph (e.g. Reddit, Spotify) falls back to the app's
 * letter-tile style. */
const BRAND_RULES = [
  { re: /youtube/i, Icon: Youtube, color: "#FF0000" },
  { re: /instagram/i, Icon: Instagram, color: "#E1306C" },
  { re: /github|githubusercontent/i, Icon: Github, color: "#181717" },
  { re: /x\.com|twitter/i, Icon: Twitter, color: "#1DA1F2" },
  { re: /twitch/i, Icon: Twitch, color: "#9146FF" },
  { re: /figma/i, Icon: Figma, color: "#F24E1E" },
  { re: /slack/i, Icon: Slack, color: "#4A154B" },
  { re: /dribbble/i, Icon: Dribbble, color: "#EA4C89" },
  { re: /gitlab/i, Icon: Gitlab, color: "#FC6D26" },
  { re: /facebook/i, Icon: Facebook, color: "#1877F2" },
  { re: /linkedin/i, Icon: Linkedin, color: "#0A66C2" },
  { re: /codepen/i, Icon: Codepen, color: "#000000" },
];

export function brandIconFor(value) {
  const v = String(value || "");
  if (!v) return null;
  for (const rule of BRAND_RULES) {
    if (rule.re.test(v)) return rule;
  }
  return null;
}

/* Same fallback logic as the app's AppLogo: strip prefixes/TLDs, take the first
 * two word initials, else the first two chars. */
export function fallbackLetters(name) {
  const clean = String(name || "")
    .replace(/^@/, "")
    .replace(/^r\//, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\.(com|org|net|io|co|app|ai|dev|so|tv|me|uk|ca|au|gg)$/i, "");
  const words = clean.match(/[a-z0-9]+/gi) || [];
  if (words.length >= 2 && words[0] && words[1]) return (words[0][0] + words[1][0]).toUpperCase();
  const cleaned = clean.replace(/[^a-z0-9]/gi, "");
  if (cleaned.length > 0) return cleaned.slice(0, 2).toUpperCase();
  return (name && name[0] ? name[0].toUpperCase() : "N");
}

/* Static replica of the app's AppLogo: brand glyph (tinted) when known,
 * letter tile (bg-brand-badge / text-brand-ink) otherwise. */
export function AppLogo({ entity, size = 24, radius = 6, className = "", style }) {
  const value = entity?.value || entity?.name || "";
  const rule = brandIconFor(value);
  if (rule) {
    const { Icon, color } = rule;
    return (
      <Icon
        size={size}
        strokeWidth={2}
        className={className}
        style={{ color, flexShrink: 0, ...style }}
      />
    );
  }
  return (
    <span
      className={`inline-flex items-center justify-center bg-brand-badge text-brand-ink font-bold shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        fontSize: Math.max(9, Math.round(size * 0.36)),
        lineHeight: 1,
        ...style,
      }}
    >
      {fallbackLetters(value)}
    </span>
  );
}
