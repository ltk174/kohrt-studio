/**
 * ZENTRALE KONFIGURATION – PRODESIGN STUDIO
 *
 * Hinweis zu Überschriften: Text zwischen *Sternchen* wird automatisch
 * als eleganter Akzent (kursive Serifenschrift in Grün) dargestellt.
 * ------------------------------------------------------------------
 * Alle Inhalte der Website (Texte, Preise, Leistungen, Kontaktdaten,
 * Designstudien, FAQ …) werden hier gepflegt. Die Komponenten lesen
 * ausschließlich aus dieser Datei – Design und Inhalt sind getrennt.
 *
 * Tipp: Preise immer als Zahl pflegen, die Formatierung übernimmt
 * `formatPrice()` aus `src/lib/format.ts`.
 */

export const site = {
  name: "PRODESIGN STUDIO",
  shortName: "prodesign.studio",
  domain: "prodesign.studio",
  url: "https://prodesign.studio",
  claim: "Starke Websites. Faire Preise.",
  description:
    "Modernes Webdesign für kleine und mittelständische Unternehmen. Individuell gestaltet, professionell umgesetzt und zum transparenten Fixpreis. Erster Designvorschlag kostenlos und unverbindlich.",
  locale: "de_DE",
  language: "de",
} as const;

export const owner = {
  name: "Alexander Engel",
  firstName: "Alexander",
  role: "Webdesign & Entwicklung",
  /**
   * Portraitfoto: Datei unter `public/images/alexander-engel.jpg` ablegen.
   * Solange die Datei fehlt, zeigt die Website automatisch eine
   * gestaltete Platzhalterfläche.
   */
  portrait: {
    src: "/images/alexander-engel.jpg",
    alt: "Portrait von Alexander Engel, Gründer von prodesign.studio",
    width: 878,
    height: 1086,
  },
} as const;

export const contact = {
  /*
   * Bewusst keine E-Mail-Adresse und keine Telefonnummer auf der Website.
   * Kontaktdaten stehen ausschließlich im Impressum.
   */
  responseNote: "Ich melde mich in der Regel innerhalb von ein bis zwei Werktagen persönlich bei dir.",
} as const;

/**
 * Versand des Anfrage-Formulars über Web3Forms (https://web3forms.com).
 * Die Website bleibt statisch – Web3Forms leitet die Anfrage per E-Mail weiter.
 * Die Empfängeradresse ist NUR bei Web3Forms hinterlegt und erscheint weder
 * auf der Website noch im Quellcode.
 *
 * Einrichtung (einmalig, ca. 1 Minute):
 * 1. Auf web3forms.com die Empfängeradresse eingeben → Access Key kommt per E-Mail.
 * 2. Key hier bei `accessKey` eintragen ODER in Vercel als Umgebungsvariable
 *    `NEXT_PUBLIC_WEB3FORMS_KEY` hinterlegen (danach neu deployen).
 * Der Access Key ist öffentlich unbedenklich – er verrät die E-Mail-Adresse nicht.
 */
export const formDelivery = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: "",
  fromName: "prodesign.studio – Anfrage-Assistent",
} as const;

export const navigation = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/leistungen/" },
  { label: "Designstudien", href: "/designstudien/" },
  { label: "Über mich", href: "/ueber-mich/" },
  { label: "Kontakt", href: "/kontakt/" },
] as const;

export const legalNavigation = [
  { label: "Impressum", href: "/impressum/" },
  { label: "Datenschutz", href: "/datenschutz/" },
] as const;

export const cta = {
  /** Immer sichtbarer Button im Header */
  primary: {
    label: "Jetzt kostenlosen Erstentwurf erhalten",
    shortLabel: "Kostenloser Erstentwurf",
    href: "/kontakt/#anfrage",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Kostenloser Erstentwurf                                             */
/* ------------------------------------------------------------------ */

export const freeDraft = {
  hours: 48,
  eyebrow: "Kostenlos & unverbindlich",
  headline: "Dein erster Designvorschlag: *kostenlos in 48 Stunden.*",
  text: "Beantworte ein paar kurze Fragen – meist reicht ein Klick. Daraus gestalte ich einen ersten Designvorschlag für die Startseite deiner neuen Website. Er kann bereits innerhalb von 48 Stunden bei dir sein. Gefällt er dir, sprechen wir über alles Weitere. Wenn nicht, ist das völlig in Ordnung.",
  points: ["100 % kostenlos", "Völlig unverbindlich", "Anfrage in ca. 2 Minuten"],
  footnote: "Nach Eingang deiner vollständigen Anfrage, an Werktagen.",
  cta: { label: "Jetzt kostenlosen Erstentwurf erhalten", href: "/kontakt/#anfrage" },
} as const;

/* ------------------------------------------------------------------ */
/* Startseite                                                          */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Kostenloser Erstentwurf in 48 Stunden",
  headline: { lead: "Starke Websites.", accent: "Faire Preise." },
  alternativeHeadline: "Dein Unternehmen verdient eine Website, die begeistert.",
  subline:
    "Modernes Webdesign für Unternehmen, die online überzeugen möchten. Individuell gestaltet, professionell umgesetzt und zum transparenten Fixpreis.",
  primaryCta: { label: "Kostenlosen Erstentwurf erhalten", href: "/kontakt/#anfrage" },
  secondaryCta: { label: "Designbeispiele entdecken", href: "/#designstudien" },
  facts: [
    "Erster Designvorschlag kostenlos & unverbindlich",
    "Websites ab 790 € netto zum Fixpreis",
    "SEO-Grundoptimierung inklusive",
  ],
} as const;

export const benefits = {
  eyebrow: "Warum prodesign.studio",
  headline: "Gutes Webdesign muss *nicht kompliziert* sein.",
  intro:
    "Eine professionelle Website ist für viele Unternehmen das wichtigste Aushängeschild. Ich sorge dafür, dass der Weg dorthin klar, angenehm und bezahlbar bleibt.",
  items: [
    {
      key: "design",
      title: "Design, das Eindruck macht",
      text: "Individuelle Websites, die nicht nur modern aussehen, sondern dein Unternehmen professionell präsentieren.",
    },
    {
      key: "price",
      title: "Faire Fixpreise",
      text: "Klare Leistungen, transparente Kosten und keine unangenehmen Überraschungen.",
    },
    {
      key: "personal",
      title: "Persönlich & unkompliziert",
      text: "Direkter Kontakt, kurze Wege und eine Zusammenarbeit ohne unnötige Agenturprozesse.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Preise & Leistungen                                                 */
/* ------------------------------------------------------------------ */

export const pricing = {
  eyebrow: "Preise & Leistungen",
  headline: "Professionelles Webdesign. *Transparente Preise.*",
  intro:
    "Du weißt von Anfang an, woran du bist. Ein klar definierter Leistungsumfang zum Fixpreis – und auf Wunsch eine monatliche Betreuung, die dir Arbeit abnimmt.",
  website: {
    name: "Website-Erstellung",
    tagline: "Deine professionelle Firmenwebsite – individuell gestaltet.",
    priceFrom: true,
    price: 790,
    period: "einmalig",
    taxNote: "netto, zzgl. gesetzlicher USt.",
    badge: "Einstiegspreis",
    scopeNote:
      "Einstiegspreis für den beschriebenen Leistungsumfang. Größere Projekte und zusätzliche Funktionen biete ich dir individuell und transparent an.",
    features: [
      "Individuelles, modernes Webdesign",
      "Bis zu fünf Unterseiten",
      "Optimiert für Smartphone, Tablet und Desktop",
      "Kontaktmöglichkeiten",
      "SEO-Grundoptimierung (technisch & lokal)",
      "Schnelle Ladezeiten",
      "Einbindung vorhandener Bilder und Texte",
      "Unterstützung bei der Veröffentlichung",
    ],
    cta: { label: "Kostenlosen Erstentwurf erhalten", href: "/kontakt/?leistung=neue-website#anfrage" },
  },
  care: {
    name: "Website-Care",
    tagline: "Optionales Betreuungspaket für Inhalte, Technik und Sicherheit.",
    priceFrom: true,
    price: 29,
    period: "pro Monat",
    taxNote: "netto, zzgl. gesetzlicher USt.",
    badge: "Optional",
    features: [
      "Administrationsbereich",
      "Texte selbst ändern",
      "Bilder selbst austauschen",
      "News und Blogbeiträge selbst erstellen",
      "Technische Wartung",
      "Regelmäßige Sicherungen",
      "Technischer Support",
    ],
    note: "Keine laufende Betreuung gewünscht? Auch kein Problem. Du kannst deine Website selbstverständlich unabhängig betreiben.",
    fairUse:
      "Der Support umfasst technische Fragen und kleine Hilfestellungen. Umfangreichere Änderungen oder neue Funktionen bespreche ich vorab transparent mit dir.",
    cta: { label: "Betreuung anfragen", href: "/kontakt/?leistung=sonstiges#anfrage" },
    scopeNote: "Einstiegspreis für die Basis-Betreuung. Der genaue Umfang richtet sich nach deiner Website und wird vorab transparent vereinbart.",
  },
  additionalCosts: {
    title: "Gut zu wissen",
    text: "Kosten für Domain und Hosting sowie eventuelle externe Leistungen (zum Beispiel lizenzpflichtige Bilder, Schriften oder Fremddienste) sind nicht im Preis enthalten und fallen je nach Vereinbarung zusätzlich an. Ich berate dich gern, welche Lösung für dich sinnvoll ist – vorab und verständlich.",
  },
} as const;

/** Weitere Leistungen (Seite /leistungen). Preise werden individuell angeboten. */
export const services = [
  {
    key: "neue-website",
    title: "Neue Firmenwebsite",
    text: "Dein professioneller Auftritt von Grund auf: individuelles Design, sauber umgesetzt und bereit für alle Bildschirmgrößen.",
    points: ["Individuelles Konzept & Design", "Bis zu fünf Unterseiten im Einstiegspaket", "Technisch moderne Umsetzung"],
  },
  {
    key: "modernisierung",
    title: "Bestehende Website modernisieren",
    text: "Deine Website ist in die Jahre gekommen? Ich gebe ihr ein zeitgemäßes Design, eine klare Struktur und moderne Technik.",
    points: ["Analyse des bestehenden Auftritts", "Neues Design, vorhandene Inhalte", "Übernahme deiner Domain möglich"],
  },
  {
    key: "landingpage",
    title: "Landingpage",
    text: "Eine fokussierte Seite für ein Angebot, eine Aktion oder ein neues Projekt – kompakt, überzeugend und schnell online.",
    points: ["Klarer Fokus auf ein Ziel", "Überzeugender Aufbau", "Ideal für Aktionen & Kampagnen"],
  },
  {
    key: "seo",
    title: "SEO-Optimierung",
    text: "Damit dich deine Kunden finden: Jede Website ist technisch für Suchmaschinen optimiert. Auf Wunsch gehe ich mit erweiterter SEO noch einen Schritt weiter.",
    points: ["SEO-Grundoptimierung inklusive", "Lokale Sichtbarkeit in deiner Region", "Erweiterte SEO auf Anfrage"],
  },
  {
    key: "betreuung",
    title: "Betreuung & Pflege",
    text: "Mit dem optionalen Website-Care-Paket bleibt deine Website technisch aktuell – und du pflegst Inhalte ganz einfach selbst.",
    points: ["Technische Wartung & Sicherungen", "Inhalte selbst bearbeiten", "Persönlicher Support"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* SEO                                                                 */
/* ------------------------------------------------------------------ */

export const seo = {
  eyebrow: "SEO-Optimierung",
  headline: "Gut aussehen ist schön. *Gefunden werden* ist besser.",
  intro:
    "Die schönste Website bringt wenig, wenn niemand sie findet. Deshalb ist eine solide Suchmaschinenoptimierung bei jeder Website von Anfang an inklusive – technisch sauber und auf deine Region ausgerichtet.",
  items: [
    {
      key: "technik",
      title: "Technische SEO",
      text: "Sauberer Code, eine klare Seitenstruktur und eine logische Überschriften-Hierarchie, die Suchmaschinen verstehen.",
    },
    {
      key: "speed",
      title: "Schnelle Ladezeiten",
      text: "Optimierte Bilder und schlanke Technik – gut für deine Besucher und für die Bewertung durch Google (Core Web Vitals).",
    },
    {
      key: "mobile",
      title: "Mobile First",
      text: "Google bewertet zuerst die Smartphone-Version einer Website. Deine Website ist genau dafür optimiert.",
    },
    {
      key: "lokal",
      title: "Lokale Sichtbarkeit",
      text: "Ortsbezug in Seitentiteln und Inhalten, damit dich Kunden aus deiner Region finden – auf Wunsch mit Tipps zum Google-Unternehmensprofil.",
    },
    {
      key: "meta",
      title: "Seitentitel & Beschreibungen",
      text: "Individuelle Meta-Daten für jede Seite, damit dein Eintrag in den Suchergebnissen zum Klicken einlädt.",
    },
    {
      key: "schema",
      title: "Strukturierte Daten",
      text: "Zusätzliche Informationen für Suchmaschinen, zum Beispiel zu Unternehmen, Adresse und Öffnungszeiten.",
    },
  ],
  honesty:
    "Ehrlich gesagt: Platz 1 bei Google kann niemand seriös garantieren. Was du bekommst, ist eine Website, die technisch alle Voraussetzungen für gute Platzierungen mitbringt.",
  extra:
    "Du möchtest mehr? Erweiterte SEO – etwa Keyword-Recherche, suchmaschinenoptimierte Texte oder eigene Seiten für einzelne Leistungen und Orte – biete ich dir individuell an.",
  /** Beispiel-Suchergebnis in der Grafik (fiktiv) */
  example: {
    query: "zimmerei musterstadt",
    url: "muster-holzbau.de › leistungen",
    title: "Zimmerei & Holzbau in Musterstadt | Muster Holzbau",
    description: "Dachstühle, Holzrahmenbau und Sanierung aus einer Hand. Kostenlose Erstberatung vor Ort – jetzt unverbindlich anfragen.",
  },
} as const;

export const extras = {
  headline: "Mehr als das Einstiegspaket?",
  text: "Jedes Unternehmen ist anders. Wenn du mehr brauchst, erstelle ich dir ein individuelles Angebot – mit klar beschriebenen Leistungen und festem Preis.",
  items: [
    "Weitere Unterseiten",
    "Mehrsprachige Websites",
    "Erweiterte SEO & Keyword-Recherche",
    "Suchmaschinenoptimierte Texte",
    "Unterstützung bei Texten",
    "Bildbearbeitung & Bildauswahl",
    "Einbindung externer Dienste",
    "Online-Terminbuchung",
    "Individuelle Funktionen",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Ablauf                                                              */
/* ------------------------------------------------------------------ */

export const workflow = {
  eyebrow: "Zusammenarbeit",
  headline: "In vier Schritten zu deiner *neuen Website.*",
  intro: "Ein klarer Ablauf ohne Umwege. Du weißt jederzeit, wo dein Projekt steht und was als Nächstes passiert.",
  steps: [
    {
      number: "01",
      title: "Kostenloser Erstentwurf",
      text: "Du klickst dich durch ein paar kurze Fragen – und erhältst einen ersten Designvorschlag, oft schon nach 48 Stunden.",
    },
    {
      number: "02",
      title: "Kennenlernen & Konzept",
      text: "Wir besprechen den Entwurf, deine Wünsche und den Umfang. Du erhältst ein klares Angebot zum Fixpreis.",
    },
    {
      number: "03",
      title: "Umsetzung",
      text: "Deine neue Website wird technisch umgesetzt und für alle Bildschirmgrößen optimiert.",
    },
    {
      number: "04",
      title: "Online gehen",
      text: "Nach deiner Freigabe wird die Website veröffentlicht. Auf Wunsch übernehme ich die laufende Betreuung.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Über mich                                                           */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: "Über mich",
  headline: "Hi, ich bin *Alexander.*",
  lead: "Ich bin Alexander Engel und der Kopf hinter prodesign.studio.",
  paragraphs: [
    "Ich bin überzeugt: Ein professioneller Internetauftritt muss weder kompliziert noch unbezahlbar sein.",
    "Mit modernen Technologien, einem Gespür für gutes Design und effizienten Abläufen entwickle ich Websites, die Unternehmen überzeugend präsentieren – ohne unnötige Kosten und ohne komplizierte Prozesse.",
    "Besonders wichtig ist mir dabei eine persönliche, unkomplizierte Zusammenarbeit. Bei mir gibt es keine langen Abstimmungswege und keine wechselnden Ansprechpartner, sondern direkten Kontakt und klare Vereinbarungen.",
  ],
  closing: "Mein Ziel ist einfach: eine Website, auf die du stolz sein kannst – zu einem Preis, der fair bleibt.",
  cta: { label: "Lass uns sprechen", href: "/kontakt/#anfrage" },
  values: [
    { title: "Ein Ansprechpartner", text: "Du sprichst von der ersten Idee bis zum Livegang direkt mit mir." },
    { title: "Klare Vereinbarungen", text: "Leistungen, Preis und nächste Schritte sind vorab verständlich festgehalten." },
    { title: "Ehrliche Beratung", text: "Ich empfehle dir nur, was deinem Unternehmen wirklich weiterhilft." },
    { title: "Moderne Technik", text: "Schnelle, sichere Websites auf einem zeitgemäßen technischen Fundament." },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Kontakt                                                             */
/* ------------------------------------------------------------------ */

export const contactSection = {
  eyebrow: "Kostenloser Erstentwurf",
  headline: "Bereit für einen *neuen Webauftritt?*",
  text: "Klick dich in rund zwei Minuten durch ein paar Fragen zu deinem Unternehmen. Daraus gestalte ich deinen ersten Designvorschlag – kostenlos und unverbindlich.",
  nextSteps: [
    "Du beantwortest ein paar kurze Fragen – fast nur Klicks, kaum Tippen.",
    "Ich gestalte deinen ersten Designvorschlag. Er kann schon nach 48 Stunden bei dir sein.",
    "Gefällt er dir, erhältst du ein klares Angebot zum Fixpreis. Wenn nicht, ist das völlig in Ordnung.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faq = {
  eyebrow: "Häufige Fragen",
  headline: "Gut zu wissen, *bevor wir starten.*",
  items: [
    {
      q: "Was kostet eine professionelle Firmenwebsite?",
      a: "Eine individuell gestaltete Website mit bis zu fünf Unterseiten gibt es bei mir ab 790 € netto als einmaligen Fixpreis. Brauchst du mehr Seiten oder besondere Funktionen, erhältst du vorab ein transparentes Angebot – ohne versteckte Kosten.",
    },
    {
      q: "Ist der erste Designvorschlag wirklich kostenlos?",
      a: "Ja. Du beantwortest ein paar kurze Fragen, und ich gestalte daraus einen ersten Designvorschlag für deine Startseite – kostenlos und völlig unverbindlich. Er kann bereits innerhalb von 48 Stunden bei dir sein. Erst wenn er dir gefällt, sprechen wir über ein Angebot.",
    },
    {
      q: "Wird meine Website bei Google gefunden?",
      a: "Jede Website erhält eine SEO-Grundoptimierung: saubere Technik, schnelle Ladezeiten, passende Seitentitel und Beschreibungen sowie einen klaren regionalen Bezug. Eine bestimmte Platzierung kann niemand seriös garantieren – aber deine Website bringt alle technischen Voraussetzungen mit. Erweiterte SEO biete ich dir auf Wunsch individuell an.",
    },
    {
      q: "Wie lange dauert die Erstellung?",
      a: "Das hängt vom Umfang und davon ab, wie schnell Texte, Bilder und Feedback vorliegen. Einen realistischen Zeitplan besprechen wir gemeinsam beim Kennenlernen, damit du sicher planen kannst.",
    },
    {
      q: "Kann ich meine bestehende Domain behalten?",
      a: "Ja, in aller Regel schon. Deine bestehende Domain kann mit der neuen Website verbunden werden. Ich unterstütze dich gern bei der Umstellung.",
    },
    {
      q: "Kann ich meine Website später selbst bearbeiten?",
      a: "Ja. Mit dem optionalen Website-Care-Paket erhältst du einen Administrationsbereich, in dem du Texte, Bilder sowie News und Blogbeiträge selbst pflegen kannst.",
    },
    {
      q: "Muss ich das monatliche Betreuungspaket buchen?",
      a: "Nein. Das Website-Care-Paket ist komplett optional. Du kannst deine Website auch unabhängig betreiben.",
    },
    {
      q: "Was passiert, wenn ich das Betreuungspaket kündige?",
      a: "Deine Website gehört weiterhin dir. Ab der Kündigung entfallen Wartung, Sicherungen, Support und der Administrationsbereich. Wie die Übergabe im Detail abläuft, halten wir vorab in unserer Vereinbarung fest.",
    },
    {
      q: "Kann meine bestehende Website überarbeitet werden?",
      a: "Sehr gern. Ich schaue mir deinen aktuellen Auftritt an und schlage dir vor, ob eine Überarbeitung oder ein Neuaufbau sinnvoller ist – ehrlich und nachvollziehbar.",
    },
    {
      q: "Ist meine Website für Smartphones optimiert?",
      a: "Selbstverständlich. Jede Website wird für Smartphone, Tablet und Desktop gestaltet und auf allen Bildschirmgrößen sorgfältig geprüft.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Designstudien                                                       */
/* ------------------------------------------------------------------ */

export type StudySlug = "garten-landschaft" | "handwerk-bau" | "beauty-lifestyle";

export type Study = {
  slug: StudySlug;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  /** Beispielhafte, fiktive Domain für die Adresszeile des Browserfensters. */
  previewDomain: string;
  /**
   * Basis-Pfad des langen Screenshots der gesamten Designstudie.
   * Die Dateien (`-900.webp`, `-1440.webp`, `-2160.webp`, `-hero.webp`)
   * werden per `npm run capture` aus den Seiten unter /vorschau/ erzeugt.
   */
  screenshot: string;
  palette: { name: string; hex: string }[];
  typefaces: string[];
  sections: string[];
  /** Hintergrundfarbe, die beim Laden der Vorschau angezeigt wird. */
  tone: string;
};

export const studiesSection = {
  eyebrow: "Designstudien",
  headline: "So könnte deine *neue Website* aussehen.",
  subline:
    "Drei Designstudien, die zeigen, wie unterschiedlich und individuell modernes Webdesign sein kann.",
  label: "Designstudie",
  disclaimer:
    "Designstudien / unverbindliche Gestaltungskonzepte. Alle Unternehmen, Inhalte und Angaben in den Studien sind frei erfunden und dienen ausschließlich der Veranschaulichung.",
  scrollHint: "Innerhalb der Vorschau scrollen",
};

export const studies: Study[] = [
  {
    slug: "garten-landschaft",
    category: "Garten & Landschaft",
    title: "Gartenarchitektur mit Ruhe und Weite",
    description:
      "Elegante Website für ein Gartengestaltungsunternehmen – dunkles Grün, Creme und eine ruhige, architektonische Bildsprache.",
    longDescription:
      "Viel Weißraum, eine klassische Serifenschrift und großformatige Bildflächen geben dem Auftritt die Ruhe eines Architekturbüros. Leistungen, Projekte und Ablauf sind klar gegliedert, damit Interessenten schnell Vertrauen fassen.",
    previewDomain: "muster-und-gruen.de",
    screenshot: "/images/studien/garten-landschaft",
    palette: [
      { name: "Tannengrün", hex: "#1F3A2E" },
      { name: "Moos", hex: "#5E7A5A" },
      { name: "Creme", hex: "#F3EFE6" },
      { name: "Sand", hex: "#D9CDB8" },
    ],
    typefaces: ["Cormorant Garamond", "Jost"],
    sections: ["Hero mit Gartenarchitektur", "Leistungen", "Projektgeschichte", "Ablauf", "Galerie", "Kontakt"],
    tone: "#F3EFE6",
  },
  {
    slug: "handwerk-bau",
    category: "Handwerk & Bau",
    title: "Selbstbewusster Auftritt für einen Holzbaubetrieb",
    description:
      "Moderne Firmenwebsite für einen regionalen Handwerksbetrieb – Anthrazit, Weiß und kupferfarbene Akzente mit klarer Leistungspräsentation.",
    longDescription:
      "Kräftige, breite Typografie und ein dunkles Farbschema vermitteln Bodenständigkeit und Präzision. Die Leistungen stehen im Mittelpunkt, nummeriert und auf einen Blick erfassbar – mit klarem Weg zur Anfrage.",
    previewDomain: "muster-holzbau.de",
    screenshot: "/images/studien/handwerk-bau",
    palette: [
      { name: "Anthrazit", hex: "#1E2124" },
      { name: "Graphit", hex: "#3A3F44" },
      { name: "Kupfer", hex: "#B8693D" },
      { name: "Weiß", hex: "#FAFAF8" },
    ],
    typefaces: ["Archivo", "Archivo Expanded"],
    sections: ["Hero mit Leistungsversprechen", "Leistungen 01–04", "Arbeitsweise", "Projektbeispiele", "Karriere", "Anfrage"],
    tone: "#1E2124",
  },
  {
    slug: "beauty-lifestyle",
    category: "Beauty & Lifestyle",
    title: "Editoriales Design für ein Kosmetikstudio",
    description:
      "Elegante Website für ein Kosmetikstudio – warme Beige- und Rosétöne, minimalistische Typografie und ein Layout wie aus einem Magazin.",
    longDescription:
      "Feine Serifen, großzügige Bildflächen in Bogenform und eine reduzierte Farbwelt schaffen eine ruhige, hochwertige Atmosphäre. Behandlungen und Preise sind übersichtlich wie eine Karte gestaltet.",
    previewDomain: "studio-muster.de",
    screenshot: "/images/studien/beauty-lifestyle",
    palette: [
      { name: "Puder", hex: "#F4ECE4" },
      { name: "Rosé", hex: "#D9B5A8" },
      { name: "Terrakotta", hex: "#B0776A" },
      { name: "Espresso", hex: "#3B2F2C" },
    ],
    typefaces: ["Bodoni Moda", "Jost"],
    sections: ["Editorial Hero", "Behandlungen & Preise", "Philosophie", "Studio", "Öffnungszeiten", "Terminanfrage"],
    tone: "#F4ECE4",
  },
];

export const legal = {
  placeholderNotice:
    "Diese Seite ist ein Platzhalter. Vor der Veröffentlichung der Website müssen hier die vollständigen und rechtlich geprüften Pflichtangaben ergänzt werden.",
} as const;

/* ------------------------------------------------------------------ */
/* Anfrage-Assistent (mehrstufiges Formular)                           */
/* ------------------------------------------------------------------ */

/**
 * Antwortmöglichkeiten des Anfrage-Assistenten. Die Antworten werden
 * beim Absenden zu einem strukturierten Briefing zusammengefasst, aus dem
 * sich direkt ein erster (KI-gestützter) Designentwurf erstellen lässt.
 */
export const inquiry = {
  title: "Dein kostenloser Erstentwurf",
  duration: "ca. 2 Minuten",
  projectTypes: [
    { value: "neue-website", label: "Neue Website", hint: "Ich habe noch keine oder starte neu" },
    { value: "modernisierung", label: "Website modernisieren", hint: "Meine Website ist in die Jahre gekommen" },
    { value: "landingpage", label: "Landingpage", hint: "Eine Seite für ein Angebot oder eine Aktion" },
    { value: "sonstiges", label: "Etwas anderes", hint: "Betreuung, SEO oder eine andere Idee" },
  ],
  industries: [
    { value: "handwerk", label: "Handwerk & Bau" },
    { value: "garten", label: "Garten & Landschaft" },
    { value: "beauty", label: "Kosmetik & Beauty" },
    { value: "friseur", label: "Friseursalon" },
    { value: "gastronomie", label: "Restaurant & Café" },
    { value: "gesundheit", label: "Gesundheit & Praxis" },
    { value: "handel", label: "Fachgeschäft & Handel" },
    { value: "dienstleistung", label: "Dienstleistung & Beratung" },
    { value: "andere", label: "Andere Branche" },
  ],
  goals: [
    { value: "anfragen", label: "Mehr Anfragen & Aufträge" },
    { value: "termine", label: "Online-Terminbuchungen" },
    { value: "image", label: "Professioneller Auftritt" },
    { value: "google", label: "Bei Google gefunden werden" },
    { value: "angebot", label: "Leistungen & Produkte zeigen" },
    { value: "personal", label: "Mitarbeiter gewinnen" },
  ],
  styles: [
    { value: "minimal", label: "Modern & minimalistisch", font: "sans", colors: ["#FFFFFF", "#1F2421", "#9AA59F"] },
    { value: "elegant", label: "Elegant & hochwertig", font: "serif", colors: ["#F3EFE6", "#1F3A2E", "#C8B28A"] },
    { value: "warm", label: "Warm & persönlich", font: "rounded", colors: ["#F6EEE6", "#5A3E35", "#D9A38B"] },
    { value: "kraftvoll", label: "Kraftvoll & bodenständig", font: "bold", colors: ["#1E2124", "#FAFAF8", "#B8693D"] },
    { value: "frisch", label: "Frisch & lebendig", font: "sans", colors: ["#F4FBF8", "#16483F", "#F2B84B"] },
  ],
  palettes: [
    { value: "gruen", label: "Natürliche Grüntöne", colors: ["#34483D", "#A9BBAA", "#F3EFE6"] },
    { value: "erdtoene", label: "Warme Erdtöne", colors: ["#8A5A3C", "#D9B5A8", "#F4ECE4"] },
    { value: "dunkel", label: "Dunkel & edel", colors: ["#1E2124", "#B8693D", "#FAFAF8"] },
    { value: "blau", label: "Klares Blau", colors: ["#1F3A5F", "#8FB3D9", "#F5F8FB"] },
    { value: "firmenfarben", label: "Meine Firmenfarben", colors: [] },
    { value: "offen", label: "Lass dich inspirieren", colors: [] },
  ],
  sections: [
    { value: "leistungen", label: "Leistungen" },
    { value: "ueber-uns", label: "Über uns" },
    { value: "team", label: "Team" },
    { value: "galerie", label: "Referenzen & Galerie" },
    { value: "preise", label: "Preise" },
    { value: "oeffnungszeiten", label: "Öffnungszeiten & Anfahrt" },
    { value: "termine", label: "Online-Terminbuchung" },
    { value: "news", label: "News & Blog" },
    { value: "faq", label: "Häufige Fragen" },
    { value: "karriere", label: "Karriere & Jobs" },
    { value: "kontakt", label: "Kontaktformular" },
  ],
  defaultSections: ["leistungen", "ueber-uns", "kontakt"],
  materials: [
    { value: "logo", label: "Logo" },
    { value: "fotos", label: "Eigene Fotos" },
    { value: "texte", label: "Texte" },
    { value: "website", label: "Bestehende Website" },
  ],
  timelines: [
    { value: "asap", label: "So schnell wie möglich" },
    { value: "1-2-monate", label: "In 1–2 Monaten" },
    { value: "offen", label: "Flexibel / noch offen" },
  ],
  budgets: [
    { value: "bis-1000", label: "bis 1.000 €" },
    { value: "1000-2000", label: "1.000 – 2.000 €" },
    { value: "ueber-2000", label: "über 2.000 €" },
    { value: "unklar", label: "Noch unklar" },
  ],
  care: [
    { value: "ja", label: "Ja, gern" },
    { value: "vielleicht", label: "Vielleicht" },
    { value: "nein", label: "Nein, danke" },
  ],
  privacyNote:
    "Deine Angaben werden verschlüsselt übermittelt und ausschließlich zur Bearbeitung deiner Anfrage verwendet. Mehr dazu in der Datenschutzerklärung.",
} as const;
