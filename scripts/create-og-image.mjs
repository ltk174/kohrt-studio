/**
 * Erzeugt public/og-image.png (1200×630) für Social-Media-Vorschauen.
 * Nutzung: node scripts/create-og-image.mjs  (benötigt Playwright/Chromium)
 */
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
function load(name) {
  try {
    return require(name);
  } catch {
    return require(path.join(execSync("npm root -g").toString().trim(), name));
  }
}
const { chromium } = load("playwright");

const root = process.cwd();
const font = (p) => `data:font/woff2;base64,${readFileSync(path.join(root, "node_modules", p)).toString("base64")}`;
const img = (p) => `data:image/webp;base64,${readFileSync(path.join(root, "public", p)).toString("base64")}`;
const logo = readFileSync(path.join(root, "public/logo.svg"), "utf8");

const html = `<!doctype html><html><head><style>
@font-face{font-family:Manrope;src:url(${font("@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2")});font-weight:200 800}
@font-face{font-family:Inter;src:url(${font("@fontsource-variable/inter/files/inter-latin-wght-normal.woff2")});font-weight:100 900}
@font-face{font-family:Instrument;font-style:italic;src:url(${font("@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2")})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F8F7F3;font-family:Inter;color:#202522;position:relative;overflow:hidden}
.logo{position:absolute;left:72px;top:64px;width:200px}
h1{position:absolute;left:72px;top:190px;font-family:Manrope;font-weight:600;font-size:80px;line-height:.98;letter-spacing:-.045em}
h1 em{display:block;font-family:Instrument;font-weight:400;color:#34483D;letter-spacing:-.01em;padding-left:60px}
p{position:absolute;left:72px;bottom:70px;font-size:24px;color:#4b534e}
.win{position:absolute;right:-110px;top:110px;width:520px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 40px 80px -30px rgba(32,37,34,.35);border:1px solid rgba(32,37,34,.08)}
.bar{height:34px;background:#F3F1EC;display:flex;align-items:center;gap:7px;padding:0 14px}
.bar span{width:10px;height:10px;border-radius:50%}
.win img{display:block;width:100%}
.win2{top:330px;right:90px;width:340px}
.dot{position:absolute;left:72px;bottom:118px;width:56px;height:4px;background:#A9BBAA;border-radius:4px}
</style></head><body>
<div class="logo">${logo}</div>
<h1>Starke Websites.<em>Faire Preise.</em></h1>
<div class="dot"></div>
<p>Modernes Webdesign zum transparenten Fixpreis</p>
<div class="win"><div class="bar"><span style="background:#E7B7A9"></span><span style="background:#EBD49F"></span><span style="background:#B9CCB4"></span></div><img src="${img("images/studien/garten-landschaft-hero.webp")}"></div>
<div class="win win2"><div class="bar"><span style="background:#E7B7A9"></span><span style="background:#EBD49F"></span><span style="background:#B9CCB4"></span></div><img src="${img("images/studien/handwerk-bau-hero.webp")}"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, "public/og-image.png") });
await browser.close();
console.log("public/og-image.png erstellt");
