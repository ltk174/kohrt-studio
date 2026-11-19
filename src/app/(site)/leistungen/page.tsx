import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Extras, Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Leistungen & Preise",
  description:
    "Website-Erstellung ab 1.490 € netto zum Fixpreis und optionales Website-Care-Paket für 79 € im Monat. Transparente Leistungen für kleine und mittelständische Unternehmen.",
  alternates: { canonical: "/leistungen/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen & Preise"
        title="Klare Leistungen. *Faire Fixpreise.*"
        intro="Ob neue Firmenwebsite, Modernisierung oder Landingpage: Du bekommst ein individuelles Design, eine saubere technische Umsetzung und von Anfang an einen transparenten Preis."
      />
      <Services />
      <Pricing />
      <Extras />
      <Process />
      <Faq />
      <CtaBand />
    </>
  );
}
