# Release installers

Drop the built installers in this folder so the site build picks them up:

```
npm run build   # in the landingpage root copies release/ -> dist/release/
```

`landingpage/src/config.js` (the `RELEASE` block) must match the file names here.

## Important — how the binaries get published

The installers are **too large for git** (GitHub rejects any file over 100 MB,
and a single dmg/exe here is 130–160 MB). So:

1. Build them: `npm run dist:mac` / `npm run dist:win` (in the main app repo).
2. Copy the outputs into this folder locally (they stay git-ignored).
3. `npm run build` in the landing page, then deploy `dist/` (which contains
   `dist/release/`) to your host.
4. Optionally also upload the installers to **GitHub Releases** on the app
   repo (https://github.com/dipendra-mule/noyrisapp/releases) — that gives
   users direct download links independent of the site.

Expected files for 0.3.0:

```
Noyris-0.3.0-arm64.dmg              (macOS, Apple Silicon)
Noyris-0.3.0-arm64-mac.zip
Noyris-0.3.0-arm64.dmg.blockmap
Noyris-0.3.0-arm64-mac.zip.blockmap
Noyris-Setup-0.3.0.exe              (Windows x64)
Noyris-Setup-0.3.0.exe.blockmap
latest.yml
latest-mac.yml
```
