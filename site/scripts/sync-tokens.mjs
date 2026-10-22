// Copies the design-system tokens into the site. The design system is the source of truth:
// edit design-system/scripts/build_tokens.py, rebuild, then run `pnpm tokens` (dev and build run it too).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, "../../design-system/code/tokens.css");
const out = resolve(here, "../src/styles/tokens.css");

// The font is loaded with next/font in app/layout.tsx, so the design system's @font-face rules are dropped.
const css = readFileSync(src, "utf8")
  .split("\n")
  .filter((line) => !line.startsWith("@font-face"))
  .join("\n");

writeFileSync(out, `/* Generated from design-system/code/tokens.css by scripts/sync-tokens.mjs. Do not edit. */\n${css}`);
console.log("tokens synced");
