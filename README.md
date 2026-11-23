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
| `/kontakt/` | Mehrstufiger Anfrage-Assistent und FAQ |
| `/impressum/`, `/datenschutz/` | Impressum (ECG, UGB, § 25 MedienG) und Datenschutzerklärung (DSGVO/DSG) – Daten in `company` und `privacy` in `site.ts` |
| `/vorschau/<studie>/` | Vollständige Demo-Seiten der Designstudien (nicht indexiert) |

## Inhalte anpassen

**Alle Texte, Preise, Leistungen, Kontaktdaten, FAQ und Designstudien stehen zentral in
[`src/config/site.ts`](src/config/site.ts).** Die Komponenten lesen nur aus dieser Datei.

- Text zwischen `*Sternchen*` in Überschriften wird als eleganter Akzent (kursive Serifenschrift in Grün) dargestellt.
- Preise als Zahl pflegen (`price: 790`) – die Formatierung („790 €“) passiert automatisch.
- Auf der Website steht bewusst keine E-Mail-Adresse – Kontaktdaten nur im Impressum.
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

## Anfrage-Formular einrichten

Die Website hat keinen eigenen Server. Das Formular sendet die Antworten direkt an einen kostenlosen
Formular-Dienst, der sie per E-Mail zustellt – beim Kunden öffnet sich kein E-Mail-Programm.

**Standard: [FormSubmit.co](https://formsubmit.co)** (kein Konto, kein Schlüssel), Ziel: `formDelivery.formsubmitTarget` in `site.ts`.

1. Postfach `info@prodesign.studio` einrichten (z. B. bei IONOS). Die Domain braucht dafür MX-Einträge.
2. Einmal selbst eine Anfrage über die Website absenden. FormSubmit schickt eine Mail „Activate Form“ an das Postfach → Link klicken.
3. Ab jetzt kommen alle Anfragen an. Optional den zufälligen Alias aus der Bestätigungsmail bei `formsubmitTarget` eintragen –
   dann steht die Adresse nirgends mehr im Code.

**Alternative: [Web3Forms](https://web3forms.com)** – Access Key als `NEXT_PUBLIC_WEB3FORMS_KEY` (Vercel) oder bei
`formDelivery.web3formsKey` eintragen. Ist ein Key gesetzt, wird automatisch Web3Forms verwendet.

Den genutzten Dienst in der Datenschutzerklärung erwähnen.

## Technik & Datenschutz

- Schriften (Manrope, Inter, Instrument Serif; in den Studien Cormorant Garamond, Archivo, Bodoni Moda, Jost) werden **lokal** ausgeliefert – keine Verbindung zu Google Fonts.
- Keine Tracking-Tools, keine Cookies, keine externen Skripte.
- Anfrage-Assistent: 7 kurze Schritte, fast nur Klicks. Beim Klick auf „Erstentwurf anfordern“ wird die Anfrage direkt über einen Formular-Dienst (FormSubmit bzw. Web3Forms) per E-Mail zugestellt – ohne E-Mail-Programm, die Empfängeradresse ist nirgends sichtbar. Die E-Mail enthält eine strukturierte Übersicht und ein **KI-Briefing**, das direkt in ein KI-Werkzeug kopiert werden kann.
- Animationen respektieren `prefers-reduced-motion`.
- SEO: Metadaten pro Seite, Open Graph, `sitemap.xml`, `robots.txt`, strukturierte Daten (schema.org).

## Vor dem Livegang

- [ ] Nach Firmenbuch-Eintragung `registryNumber`, `registryCourt`, `vatId` (und ggf. Gewerbe/Kammer) in `company` ergänzen
- [ ] Impressum und Datenschutzerklärung rechtlich prüfen lassen
- [ ] Portraitfoto ablegen
- [ ] Domain `prodesign.studio` registrieren und mit Vercel verbinden
- [ ] Postfach `info@prodesign.studio` einrichten und Formular einmalig aktivieren (siehe „Anfrage-Formular einrichten“)
- [ ] Kundenstimmen (`reviews`) durch echte, freigegebene Zitate ersetzen, dann `reviews.placeholder` auf `false`
- [ ] Erfolgsgeschichten (`successStories`) mit echten Zahlen (z. B. Google Search Console) füllen, dann `successStories.placeholder` auf `false`
- [ ] Inhalte und Preise final prüfen
