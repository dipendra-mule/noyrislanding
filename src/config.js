export const SITE = {
  name: "Noyris",
  tagline: "Plan once. Stay on track automatically.",
  price: "$29",
  priceNote: "one-time",
  url: "https://noyris.com",
};

/* ------------------------------------------------------------------ *
 * Download files.
 *
 * Installers are served from the GitHub Release at
 * https://github.com/noyrisapp/noyris/releases/tag/v0.3.0
 * (large binaries can't live in the git repo — see release/README.md).
 * ------------------------------------------------------------------ */
export const RELEASE = {
  version: "0.3.0",
  mac: {
    dmg: "https://github.com/noyrisapp/noyris/releases/download/v0.3.0/Noyris-0.3.0-arm64.dmg",
    dmgLabel: "Noyris 0.3.0 for macOS (Apple Silicon)",
  },
  windows: {
    exe: "https://github.com/noyrisapp/noyris/releases/download/v0.3.0/Noyris-Setup-0.3.0.exe",
    exeLabel: "Noyris 0.3.0 Setup for Windows",
  },
};

/* Where the download page lives, for emails/redirects. */
export const DOWNLOAD_URL = `${SITE.url}/#/download`;

/* ------------------------------------------------------------------ *
 * Checkout URLs (Dodo Payments). Production links; each redirects the
 * buyer to its own platform-specific success page after payment:
 *   macOS   -> #/success-mac
 *   Windows -> #/success-windows
 * ------------------------------------------------------------------ */
export const BUY = {
  mac: "https://checkout.dodopayments.com/buy/pdt_0NlHk0PhIL03EH8waD21j?quantity=1&redirect_url=https://noyris.com%2F%23%2Fsuccess-mac",
  windows:
    "https://checkout.dodopayments.com/buy/pdt_0NlHkZLZUjNTVJPUYIRtX?quantity=1&redirect_url=https://noyris.com%2F%23%2Fsuccess-windows",
};
