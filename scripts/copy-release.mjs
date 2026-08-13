import { cpSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "release");
const dest = join(root, "dist", "release");

if (!existsSync(src)) {
  console.log("[copy-release] no release/ folder found, skipping");
  process.exit(0);
}

cpSync(src, dest, { recursive: true });
console.log(`[copy-release] copied ${src} -> ${dest}`);
