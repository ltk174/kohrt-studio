/**
 * Erzeugt lange Screenshots der Designstudien für die scrollbaren Vorschauen.
 *
 * Nutzung:
 *   1. Entwicklungsserver starten:  npm run dev
 *   2. In einem zweiten Terminal:    npm run capture
 *      (optional: BASE_URL=http://localhost:3000 npm run capture)
 *
 * Voraussetzung: Playwright mit Chromium (in der Claude-Code-Cloud vorinstalliert,
 * lokal ggf. per `npx playwright install chromium`).
 *
 * Ergebnis (pro Studie in public/images/studien/):
 *   <slug>-900.webp, <slug>-1440.webp, <slug>-2160.webp  – komplette Seite
 *   <slug>-hero.webp                                       – erster Bildschirm (Desktop)
 *   <slug>-mobile.webp                                     – erster Bildschirm (Smartphone)
 *   <slug>-mobile-full.webp                                – komplette Seite (Smartphone)
 * sowie src/config/study-screenshots.json mit den Abmessungen.
 */
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);

function load(name) {
  try {
    return require(name);
  } catch {
    const globalRoot = execSync("npm root -g").toString().trim();
    return require(path.join(globalRoot, name));
  }
}

const { chromium } = load("playwright");
const sharp = load("sharp");

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const SLUGS = ["garten-landschaft", "handwerk-bau", "beauty-lifestyle"];
const OUT_DIR = path.resolve("public/images/studien");
const WIDTH = 1440;
const SCALE = 1.5;

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const dims = {};

async function preparePage(page) {
  await page.addStyleTag({ content: "[data-capture-hide]{display:none!important} nextjs-portal{display:none!important}" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
}

for (const slug of SLUGS) {
  const url = `${BASE_URL}/vorschau/${slug}/`;
  console.log(`→ ${url}`);

  // Desktop – komplette Seite
  const desktop = await browser.newPage({ viewport: { width: WIDTH, height: 900 }, deviceScaleFactor: SCALE });
  await desktop.goto(url, { waitUntil: "networkidle" });
  await preparePage(desktop);
  const full = await desktop.screenshot({ fullPage: true, type: "png" });
  const hero = await desktop.screenshot({ type: "png" });
  await desktop.close();

  const meta = await sharp(full).metadata();
  dims[slug] = { width: WIDTH, height: Math.round(meta.height / SCALE) };

  for (const w of [900, 1440, 2160]) {
    await sharp(full, { limitInputPixels: false })
      .resize({ width: w })
      .webp({ quality: w === 2160 ? 78 : 82, effort: 5 })
      .toFile(path.join(OUT_DIR, `${slug}-${w}.webp`));
  }
  await sharp(hero).resize({ width: 1600 }).webp({ quality: 84, effort: 5 }).toFile(path.join(OUT_DIR, `${slug}-hero.webp`));

  // Smartphone – erster Bildschirm
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobile.goto(url, { waitUntil: "networkidle" });
  await preparePage(mobile);
  const mobileShot = await mobile.screenshot({ type: "png" });
  const mobileFull = await mobile.screenshot({ type: "png", fullPage: true });
  await mobile.close();
  await sharp(mobileShot).resize({ width: 600 }).webp({ quality: 84, effort: 5 }).toFile(path.join(OUT_DIR, `${slug}-mobile.webp`));

  // Smartphone – komplette Seite (WebP erlaubt max. 16383 px Höhe)
  const mobileMeta = await sharp(mobileFull).metadata();
  const mobileCssHeight = Math.round(mobileMeta.height / 2);
  const mobileWidth = Math.min(780, Math.floor((16000 / mobileCssHeight) * 390));
  await sharp(mobileFull, { limitInputPixels: false })
    .resize({ width: mobileWidth })
    .webp({ quality: 80, effort: 5 })
    .toFile(path.join(OUT_DIR, `${slug}-mobile-full.webp`));
  dims[slug].mobileHeight = mobileCssHeight;

  console.log(`  ✓ ${slug}: ${dims[slug].width}×${dims[slug].height}`);
}

await browser.close();

writeFileSync(path.resolve("src/config/study-screenshots.json"), `${JSON.stringify(dims, null, 2)}\n`);
console.log("Fertig. Abmessungen in src/config/study-screenshots.json gespeichert.");
