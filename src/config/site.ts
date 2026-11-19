/**
 * ZENTRALE KONFIGURATION – KOHRT STUDIO
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
  name: "KOHRT STUDIO",
  shortName: "kohrt.studio",
  domain: "kohrt.studio",
  url: "https://kohrt.studio",
  claim: "Starke Websites. Faire Preise.",
  description:
    "Modernes Webdesign für kleine und mittelständische Unternehmen. Individuell gestaltet, professionell umgesetzt und zum transparenten Fixpreis – von Lars-Timon Kohrt.",
  locale: "de_DE",
  language: "de",
} as const;

export const owner = {
  name: "Lars-Timon Kohrt",
  firstName: "Lars-Timon",
  role: "Webdesign & Entwicklung",
  /**
   * Portraitfoto: Datei unter `public/images/lars-timon-kohrt.jpg` ablegen.
   * Solange die Datei fehlt, zeigt die Website automatisch eine
   * gestaltete Platzhalterfläche.
   */
  portrait: {
    src: "/images/lars-timon-kohrt.jpg",
    alt: "Portrait von Lars-Timon Kohrt, Gründer von Kohrt Studio",
    width: 1200,
    height: 1500,
  },
} as const;

export const contact = {
  /** Diese Adresse wird auf der Website angezeigt. */
  displayEmail: "info@kohrt.studio",
  /**
   * An diese Adresse gehen Formular- und Mail-Links (mailto),
   * bis info@kohrt.studio eingerichtet ist. Danach einfach ersetzen.
   */
  recipientEmail: "larstimon.kohrt@gmail.com",
  /** Telefonnummer bewusst leer – erst eintragen, wenn vorhanden. */
  phone: "",
  responseNote: "Ich melde mich in der Regel innerhalb von ein bis zwei Werktagen persönlich bei dir.",
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
  primary: { label: "Projekt anfragen", href: "/kontakt/" },
} as const;

/* ------------------------------------------------------------------ */
/* Startseite                                                          */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Webdesign zum fairen Fixpreis",
  headline: { lead: "Starke Websites.", accent: "Faire Preise." },
  alternativeHeadline: "Dein Unternehmen verdient eine Website, die begeistert.",
  subline:
    "Modernes Webdesign für Unternehmen, die online überzeugen möchten. Individuell gestaltet, professionell umgesetzt und zum transparenten Fixpreis.",
  primaryCta: { label: "Website anfragen", href: "/kontakt/" },
  secondaryCta: { label: "Designbeispiele entdecken", href: "/#designstudien" },
  facts: ["Fixpreis ab 1.490 € netto", "Persönlicher Ansprechpartner", "Für alle Bildschirmgrößen"],
} as const;

export const benefits = {
  eyebrow: "Warum Kohrt Studio",
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
    price: 1490,
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
      "Grundlegende Suchmaschinenoptimierung",
      "Schnelle Ladezeiten",
      "Einbindung vorhandener Bilder und Texte",
      "Unterstützung bei der Veröffentlichung",
    ],
    cta: { label: "Unverbindlich anfragen", href: "/kontakt/?leistung=neue-website" },
  },
  care: {
    name: "Website-Care",
    tagline: "Optionales Betreuungspaket für Inhalte, Technik und Sicherheit.",
    price: 79,
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
    cta: { label: "Betreuung anfragen", href: "/kontakt/?leistung=sonstiges" },
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
    key: "betreuung",
    title: "Betreuung & Pflege",
    text: "Mit dem optionalen Website-Care-Paket bleibt deine Website technisch aktuell – und du pflegst Inhalte ganz einfach selbst.",
    points: ["Technische Wartung & Sicherungen", "Inhalte selbst bearbeiten", "Persönlicher Support"],
  },
] as const;

export const extras = {
  headline: "Mehr als das Einstiegspaket?",
  text: "Jedes Unternehmen ist anders. Wenn du mehr brauchst, erstelle ich dir ein individuelles Angebot – mit klar beschriebenen Leistungen und festem Preis.",
  items: [
    "Weitere Unterseiten",
    "Mehrsprachige Websites",
    "Unterstützung bei Texten",
    "Bildbearbeitung & Bildauswahl",
    "Einbindung externer Dienste",
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
      title: "Kennenlernen",
      text: "Wir sprechen über dein Unternehmen, deine Wünsche und deine Vorstellungen.",
    },
    {
      number: "02",
      title: "Konzept & Design",
      text: "Ich entwickle einen individuellen Website-Entwurf, passend zu deinem Unternehmen.",
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
  headline: "Hi, ich bin *Lars-Timon.*",
  lead: "Ich bin Lars-Timon Kohrt und der Kopf hinter Kohrt Studio.",
  paragraphs: [
    "Ich bin überzeugt: Ein professioneller Internetauftritt muss weder kompliziert noch unbezahlbar sein.",
    "Mit modernen Technologien, einem Gespür für gutes Design und effizienten Abläufen entwickle ich Websites, die Unternehmen überzeugend präsentieren – ohne unnötige Kosten und ohne komplizierte Prozesse.",
    "Besonders wichtig ist mir dabei eine persönliche, unkomplizierte Zusammenarbeit. Bei mir gibt es keine langen Abstimmungswege und keine wechselnden Ansprechpartner, sondern direkten Kontakt und klare Vereinbarungen.",
  ],
  closing: "Mein Ziel ist einfach: eine Website, auf die du stolz sein kannst – zu einem Preis, der fair bleibt.",
  cta: { label: "Lass uns sprechen", href: "/kontakt/" },
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
  eyebrow: "Kontakt",
  headline: "Bereit für einen *neuen Webauftritt?*",
  text: "Erzähl mir von deinem Unternehmen und deinen Vorstellungen. Gemeinsam finden wir eine Lösung, die zu dir und deinem Budget passt.",
  serviceOptions: [
    { value: "neue-website", label: "Neue Firmenwebsite" },
    { value: "modernisierung", label: "Bestehende Website modernisieren" },
    { value: "landingpage", label: "Landingpage" },
    { value: "sonstiges", label: "Sonstiges" },
  ],
  nextSteps: [
    "Du schickst mir deine Anfrage – unverbindlich und kostenlos.",
    "Ich melde mich persönlich und wir besprechen deine Wünsche.",
    "Du erhältst ein klares Angebot mit festem Preis.",
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
      a: "Eine individuell gestaltete Website mit bis zu fünf Unterseiten gibt es bei mir ab 1.490 € netto als einmaligen Fixpreis. Brauchst du mehr Seiten oder besondere Funktionen, erhältst du vorab ein transparentes Angebot – ohne versteckte Kosten.",
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
