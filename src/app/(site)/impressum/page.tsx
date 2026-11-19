import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/sections/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum/" },
};

export default function ImprintPage() {
  return (
    <LegalPlaceholder
      title="Impressum"
      items={[
        "Name und Anschrift (ladungsfähige Anschrift)",
        "Kontaktdaten (E-Mail-Adresse und ggf. Telefonnummer)",
        "Umsatzsteuer-Identifikationsnummer, sofern vorhanden",
        "Angaben zur Berufshaftpflicht bzw. Kammer, falls zutreffend",
        "Verantwortlich für den Inhalt",
        "Hinweise zur Streitbeilegung",
      ]}
    />
  );
}
