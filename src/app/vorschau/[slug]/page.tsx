import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { studies, studiesSection, type StudySlug } from "@/config/site";
import { GardenStudy } from "@/components/studies/GardenStudy";
import { CraftStudy } from "@/components/studies/CraftStudy";
import { BeautyStudy } from "@/components/studies/BeautyStudy";

const components: Record<StudySlug, () => React.JSX.Element> = {
  "garten-landschaft": GardenStudy,
  "handwerk-bau": CraftStudy,
  "beauty-lifestyle": BeautyStudy,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = studies.find((item) => item.slug === slug);
  return {
    title: study ? `Designstudie ${study.category}` : "Designstudie",
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = studies.find((item) => item.slug === slug);
  if (!study) notFound();
  const Study = components[study.slug];

  return (
    <>
      <Study />
      {/* Hinweisleiste – wird bei Screenshots ausgeblendet */}
      <div
        data-capture-hide
        className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 font-[family-name:var(--font-inter)]"
      >
        <div className="flex max-w-full items-center gap-3 rounded-full border border-black/10 bg-[#F8F7F3]/95 py-1.5 pl-1.5 pr-4 text-[0.82rem] text-[#202522] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur">
          <Link
            href="/designstudien/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#202522] px-3.5 py-2 font-semibold text-[#F8F7F3] transition-colors hover:bg-[#34483D]"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            kohrt.studio
          </Link>
          <span className="truncate">
            <strong className="font-semibold">{studiesSection.label}</strong>
            <span className="hidden sm:inline"> · fiktives Unternehmen, unverbindliches Gestaltungskonzept</span>
          </span>
        </div>
      </div>
    </>
  );
}
