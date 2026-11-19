import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { site, owner } from "@/config/site";
import { inter, instrumentSerif, manrope } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} – ${site.claim}`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: owner.name }],
  creator: owner.name,
  keywords: [
    "Webdesign",
    "Website erstellen lassen",
    "Firmenwebsite",
    "Webdesign Fixpreis",
    "Website für Handwerker",
    "Website für kleine Unternehmen",
    "Kohrt Studio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.shortName,
    title: `${site.shortName} – ${site.claim}`,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${site.shortName} – ${site.claim}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} – ${site.claim}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#F8F7F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${manrope.variable} ${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Markiert, dass JavaScript aktiv ist – erst dann werden Einblend-Animationen genutzt. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        {children}
      </body>
    </html>
  );
}
