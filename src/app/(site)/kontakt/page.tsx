import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Erzähl mir von deinem Unternehmen und deinen Vorstellungen. Unverbindliche Anfrage für deine neue Website zum fairen Fixpreis.",
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
