import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { StudyDetail } from "@/components/sections/StudyDetail";
import { FreeDraft } from "@/components/sections/FreeDraft";
import { studies, studiesSection } from "@/config/site";

export const metadata: Metadata = {
  title: "Designstudien",
  description:
    "Drei Designstudien für Garten & Landschaft, Handwerk & Bau sowie Beauty & Lifestyle – unverbindliche Gestaltungskonzepte, direkt im Browser scrollbar.",
  alternates: { canonical: "/designstudien/" },
};

export default function StudiesPage() {
  return (
    <>
      <PageHero eyebrow={studiesSection.eyebrow} title={studiesSection.headline} intro={studiesSection.subline}>
        <p
          data-reveal
          className="mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-paper/70 px-4 py-3 text-[0.88rem] text-ink-soft"
        >
          <Info className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
          {studiesSection.disclaimer}
        </p>
      </PageHero>
      <section aria-label="Designstudien" className="pb-16 pt-8 sm:pb-24">
        <div className="container-page space-y-28 sm:space-y-36">
          {studies.map((study, index) => (
            <StudyDetail key={study.slug} study={study} index={index} />
          ))}
        </div>
      </section>
      <FreeDraft />
    </>
  );
}
