import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/sections/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz/" },
};

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Datenschutzerklärung"
      items={[
        "Verantwortliche Stelle mit Kontaktdaten",
        "Hosting-Anbieter und Server-Logfiles",
        "Anfrage-Formular: Übermittlung der Angaben über den Formular-Dienst Web3Forms (Auftragsverarbeitung, Zweck, Speicherdauer, ggf. Drittlandübermittlung)",
        "Rechte der betroffenen Personen",
        "Hinweis: Diese Website lädt Schriften lokal, setzt keine Tracking-Tools und keine Cookies ein (Stand der ersten Version – bitte vor Veröffentlichung prüfen)",
      ]}
    />
  );
}
