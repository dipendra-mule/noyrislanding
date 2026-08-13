export const SITE = {
  name: "Noyris",
  tagline: "Plan once. Stay on track automatically.",
  price: "$29",
  priceNote: "one-time",
  url: "https://noyris.com",
};

/* ------------------------------------------------------------------ *
 * Download page.
 *
 * The success/download page lives at  #/download  (also #/success).
 * The post-purchase email should link to:
 *   https://noyris.com/#/download
 *
 * Installers are served from the /release folder (kept out of git —
 * upload them to your host or GitHub Releases yourself).
 * ------------------------------------------------------------------ */
export const RELEASE = {
  version: "0.3.0",
  mac: {
    dmg: "release/Noyris-0.3.0-arm64.dmg",
    zip: "release/Noyris-0.3.0-arm64-mac.zip",
    dmgLabel: "Noyris 0.3.0 for macOS (Apple Silicon)",
  },
  windows: {
    exe: "release/Noyris-Setup-0.3.0.exe",
    exeLabel: "Noyris 0.3.0 Setup for Windows",
  },
};

/* Where the download page lives, for emails/redirects. */
export const DOWNLOAD_URL = `${SITE.url}/#/download`;

/* ------------------------------------------------------------------ *
 * Checkout URLs (Dodo Payments). Production links; each already
 * redirects the buyer to the download page after payment.
 * ------------------------------------------------------------------ */
export const BUY = {
  mac: "https://checkout.dodopayments.com/buy/pdt_0NlHk0PhIL03EH8waD21j?quantity=1&redirect_url=https://noyris.com%2F%23%2Fsuccess",
  windows:
    "https://checkout.dodopayments.com/buy/pdt_0NlHkZLZUjNTVJPUYIRtX?quantity=1&redirect_url=https://noyris.com%2F%23%2Fsuccess",
};
