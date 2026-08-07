#!/usr/bin/env node
/**
 * Runs before every build, including on Vercel.
 *
 * Hard failures (always): a project references a screenshot that is not in
 * public/, the CV file is missing, or the Open Graph image is missing. A broken
 * card should never reach production — the deployment fails instead.
 *
 * Soft failures (ASSETS_STRICT=1): placeholder screenshots and unfinished
 * content marked `@todo` in content/. Turn this on in Vercel once the site is
 * genuinely finished, and it will stay finished.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.env.ASSETS_STRICT === "1";

const errors = [];
const warnings = [];

const read = (relative) => readFileSync(join(root, relative), "utf8");
const publicHas = (webPath) => existsSync(join(root, "public", webPath.replace(/^\//, "")));

// --- 1. Screenshots referenced by projects.json -----------------------------
const projects = JSON.parse(read("content/projects.json"));

for (const project of projects) {
  if (!publicHas(project.image)) {
    errors.push(`missing screenshot: public${project.image} (referenced by "${project.slug}")`);
  }
}

// --- 2. CV file, path taken from content/site.ts ----------------------------
const site = read("content/site.ts");
const cvMatch = site.match(/export const cvPath\s*=\s*["'](.+?)["']/);

if (!cvMatch) {
  errors.push("could not find `cvPath` in content/site.ts");
} else if (!publicHas(cvMatch[1])) {
  errors.push(`missing CV: public${cvMatch[1]}`);
}

// --- 3. Open Graph image ----------------------------------------------------
if (!publicHas("/og.png")) {
  errors.push("missing Open Graph image: public/og.png");
}

// --- 4. Placeholder screenshots still in place ------------------------------
const pendingPath = "content/pending-screenshots.json";
let pending = [];

if (existsSync(join(root, pendingPath))) {
  pending = JSON.parse(read(pendingPath));
  const slugs = new Set(projects.map((p) => p.slug));
  for (const slug of pending) {
    if (!slugs.has(slug)) errors.push(`${pendingPath} lists unknown slug "${slug}"`);
  }
  if (pending.length > 0) {
    warnings.push(
      `${pending.length} placeholder screenshot(s): ${pending.join(", ")}\n` +
        `    Capture the live demo at 1280x800, replace public/projects/<slug>.png,\n` +
        `    then remove the slug from ${pendingPath}.`,
    );
  }
}

// --- 5. Unfinished content ---------------------------------------------------
for (const file of readdirSync(join(root, "content")).filter((f) => f.endsWith(".ts"))) {
  read(`content/${file}`)
    .split("\n")
    .forEach((line, index) => {
      if (line.includes("@todo")) {
        warnings.push(`content/${file}:${index + 1} — ${line.trim().replace(/^[/*\s]+/, "")}`);
      }
    });
}

// --- Report -----------------------------------------------------------------
const label = (text) => `\n${text}\n${"-".repeat(text.length)}`;

if (warnings.length > 0) {
  console.log(label("Still needed"));
  for (const warning of warnings) console.log(`  • ${warning}`);
}

if (errors.length > 0) {
  console.error(label("Blocking"));
  for (const error of errors) console.error(`  ✗ ${error}`);
  console.error("\nBuild stopped: fix the items above.\n");
  process.exit(1);
}

if (strict && warnings.length > 0) {
  console.error(
    "\nBuild stopped: ASSETS_STRICT=1 and the site still has placeholders.\n" +
      "Finish the items above, or unset ASSETS_STRICT to deploy anyway.\n",
  );
  process.exit(1);
}

console.log(
  warnings.length > 0
    ? `\nAssets OK. ${warnings.length} item(s) still pending — set ASSETS_STRICT=1 to make these blocking.\n`
    : "\nAssets OK. Nothing pending.\n",
);
