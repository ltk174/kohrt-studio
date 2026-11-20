import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Extras, Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { FreeDraft } from "@/components/sections/FreeDraft";
import { Seo } from "@/components/sections/Seo";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Leistungen & Preise",
  description:
    "Website-Erstellung ab 790 € netto zum Fixpreis, SEO-Grundoptimierung inklusive, optionale Betreuung ab 29 € im Monat. Erster Designvorschlag kostenlos und unverbindlich.",
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
      <FreeDraft />
      <Services />
      <Pricing />
      <Seo />
      <Extras />
      <Process />
      <Faq />
      <CtaBand />
    </>
  );
}
