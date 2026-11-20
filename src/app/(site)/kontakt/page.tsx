import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Kostenloser Erstentwurf & Kontakt",
  description:
    "In rund zwei Minuten zum kostenlosen Erstentwurf deiner neuen Website – unverbindlich und oft schon nach 48 Stunden bei dir.",
  alternates: { canonical: "/kontakt/" },
};

export default function ContactPage() {
  return (
    <>
      <Contact variant="page" className="pt-6 sm:pt-10" />
      <Faq />
    </>
  );
}
