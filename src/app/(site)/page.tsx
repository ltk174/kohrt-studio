import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { FreeDraft } from "@/components/sections/FreeDraft";
import { Seo } from "@/components/sections/Seo";
import { Stats } from "@/components/sections/Stats";
import { Reviews } from "@/components/sections/Reviews";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { StudiesShowcase } from "@/components/sections/StudiesShowcase";
import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `${site.shortName} – ${site.claim}` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <FreeDraft />
      <Stats />
      <Benefits />
      <StudiesShowcase />
      <SuccessStories className="bg-paper/60" />
      <Reviews />
      <Pricing />
      <Seo />
      <About className="bg-paper/60" />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
