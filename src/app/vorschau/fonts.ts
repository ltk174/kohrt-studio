import localFont from "next/font/local";

/* Schriften der Designstudien – werden nur auf /vorschau/ geladen. */
export const cormorant = localFont({
  src: [
    { path: "../../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2", style: "normal" },
    { path: "../../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2", style: "italic" },
  ],
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});

export const jost = localFont({
  src: "../../../node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2",
  variable: "--font-jost",
  weight: "100 900",
  display: "swap",
});

export const archivo = localFont({
  src: "../../../node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  display: "swap",
});

export const bodoni = localFont({
  src: [
    { path: "../../../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-standard-normal.woff2", style: "normal" },
    { path: "../../../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-standard-italic.woff2", style: "italic" },
  ],
  variable: "--font-bodoni",
  weight: "400 900",
  display: "swap",
});
