# PRODESIGN STUDIO – prodesign.studio

**Starke Websites. Faire Preise.**
Website der Webdesign-Agentur Prodesign Studio (öffentlicher Name: Alexander Engel).

Gebaut mit Next.js 16 (App Router), TypeScript, Tailwind CSS 4 und Lucide-Icons. Die Seite wird **statisch exportiert** und läuft damit auf Vercel genauso wie auf gewöhnlichem Webhosting.

---

## Seiten

| Pfad | Inhalt |
| --- | --- |
| `/` | Startseite: Hero, kostenloser Erstentwurf (48 h), Vorteile, Designstudien, Preise, SEO, Über mich, Ablauf, FAQ, Anfrage-Assistent |
| `/leistungen/` | Erstentwurf, Leistungen, Preise, SEO, Zusatzleistungen, Ablauf, FAQ |
| `/designstudien/` | Die drei Designstudien in großen, scrollbaren Vorschaufenstern |
| `/ueber-mich/` | Persönliche Vorstellung mit Portrait, Arbeitsweise |
| `/kontakt/` | Mehrstufiger Anfrage-Assistent (mailto) und FAQ |
| `/impressum/`, `/datenschutz/` | **Platzhalter** – vor Veröffentlichung ausfüllen! |
| `/vorschau/<studie>/` | Vollständige Demo-Seiten der Designstudien (nicht indexiert) |

## Inhalte anpassen

**Alle Texte, Preise, Leistungen, Kontaktdaten, FAQ und Designstudien stehen zentral in
[`src/config/site.ts`](src/config/site.ts).** Die Komponenten lesen nur aus dieser Datei.

- Text zwischen `*Sternchen*` in Überschriften wird als eleganter Akzent (kursive Serifenschrift in Grün) dargestellt.
- Preise als Zahl pflegen (`price: 790`) – die Formatierung („790 €“) passiert automatisch.
- `contact.displayEmail` ist die angezeigte Adresse, `contact.recipientEmail` die Adresse, an die Formular und Mail-Links gehen (beide `info@prodesign.studio`). Achtung: Die Empfängeradresse ist für Besucher im E-Mail-Programm sichtbar – keine private Adresse eintragen.
- Die Antwortmöglichkeiten des Anfrage-Assistenten stehen unter `inquiry`, die Inhalte des 48-Stunden-Angebots unter `freeDraft`, der SEO-Bereich unter `seo`.

## Portraitfoto

Foto als **`public/images/alexander-engel.jpg`** ablegen (empfohlen: Hochformat 4:5, z. B. 1200 × 1500 px, gut komprimiert < 300 KB).
Beim nächsten Build wird es automatisch verwendet – bis dahin erscheint eine gestaltete Platzhalterfläche.

## Designstudien & Screenshots

Die drei Designstudien sind vollständig gestaltete Demo-Seiten (`src/components/studies/`) mit eigenen,
im Code gezeichneten Illustrationen (`src/components/illustrations/`) – keine Stockfotos, keine Lizenzfragen.
Alle Unternehmen darin sind fiktiv („Muster“-Namen) und als *Designstudie / unverbindliches Gestaltungskonzept* gekennzeichnet.

Für die scrollbaren Vorschauen werden lange Screenshots verwendet (`public/images/studien/`). Nach Änderungen an einer Studie neu erzeugen:

```bash
npm run dev
```

```bash
BASE_URL=http://localhost:3000 npm run capture
```

Das Skript benötigt Playwright mit Chromium (in der Claude-Code-Cloud vorinstalliert).
Das Open-Graph-Bild (`public/og-image.png`) wird mit `node scripts/create-og-image.mjs` erzeugt.

## Entwicklung

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run check
```

`npm run check` führt TypeScript-Prüfung, ESLint und den Produktions-Build nacheinander aus.

## Veröffentlichung

**Vercel:** Repository in Vercel importieren – das Framework (Next.js) wird automatisch erkannt, keine weiteren Einstellungen nötig.
Anschließend die Domain `prodesign.studio` in den Projekteinstellungen verbinden.

**Gewöhnliches Webhosting:** `npm run build` ausführen und den Inhalt des Ordners `out/` per FTP hochladen.

## Technik & Datenschutz

- Schriften (Manrope, Inter, Instrument Serif; in den Studien Cormorant Garamond, Archivo, Bodoni Moda, Jost) werden **lokal** ausgeliefert – keine Verbindung zu Google Fonts.
- Keine Tracking-Tools, keine Cookies, keine externen Skripte.
- Anfrage-Assistent ohne Server: 7 kurze Schritte, fast nur Klicks. Beim Absenden öffnet sich das E-Mail-Programm mit einer strukturierten Anfrage inklusive **KI-Briefing** – dieser Absatz kann direkt in ein KI-Werkzeug kopiert werden, um den ersten Designentwurf zu erstellen.
- Animationen respektieren `prefers-reduced-motion`.
- SEO: Metadaten pro Seite, Open Graph, `sitemap.xml`, `robots.txt`, strukturierte Daten (schema.org).

## Vor dem Livegang

- [ ] Impressum und Datenschutzerklärung mit rechtlich geprüften Angaben füllen
- [ ] Portraitfoto ablegen
- [ ] Domain `prodesign.studio` registrieren und mit Vercel verbinden
- [ ] E-Mail-Adresse `info@prodesign.studio` einrichten (ggf. Weiterleitung ins eigene Postfach) – vorher kommen keine Anfragen an!
- [ ] Inhalte und Preise final prüfen
