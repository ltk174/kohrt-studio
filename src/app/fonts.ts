import localFont from "next/font/local";

/**
 * Schriften werden lokal ausgeliefert (keine Verbindung zu Google-Servern,
 * DSGVO-freundlich). Quelle: Fontsource-Pakete, SIL Open Font License.
 */
export const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
});
