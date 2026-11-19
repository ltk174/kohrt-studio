import { Info } from "lucide-react";
import { RichTitle } from "@/components/ui/RichTitle";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudyCaption } from "@/components/studies/StudyCaption";
import { StudyPreview } from "@/components/studies/StudyPreview";
import { studies, studiesSection } from "@/config/site";
import { getScreenshot } from "@/lib/studies";

/** Startseite: drei scrollbare Designstudien im asymmetrischen Layout. */
export function StudiesShowcase() {
  const [garden, craft, beauty] = studies.map((study) => ({ study, shot: getScreenshot(study) }));

  return (
    <section id="designstudien" aria-labelledby="studien-title" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            id="studien-title"
            className="lg:col-span-8"
            eyebrow={studiesSection.eyebrow}
            title={<RichTitle text={studiesSection.headline} />}
            intro={studiesSection.subline}
          />
          <div data-reveal className="self-end lg:col-span-4 lg:flex lg:justify-end">
            <ButtonLink href="/designstudien/" variant="secondary">
              Alle Designstudien
            </ButtonLink>
          </div>
        </div>

        <p
          data-reveal
          className="mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-paper/70 px-4 py-3 text-[0.88rem] text-ink-soft"
        >
          <Info className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
          {studiesSection.disclaimer}
        </p>

        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div data-reveal className="lg:col-span-7">
            <StudyPreview
              study={garden.study}
              {...garden.shot}
              sizes="(min-width: 1024px) 56vw, 100vw"
              heightClassName="h-[440px] sm:h-[540px] lg:h-[600px]"
            />
            <StudyCaption study={garden.study} index={0} />
          </div>

          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="lg:col-span-5 lg:mt-36">
            <StudyPreview
              study={craft.study}
              {...craft.shot}
              sizes="(min-width: 1024px) 40vw, 100vw"
              heightClassName="h-[440px] sm:h-[500px]"
            />
            <StudyCaption study={craft.study} index={1} />
          </div>

          <div data-reveal className="order-last lg:order-none lg:col-span-4 lg:self-end">
            <div className="rounded-[var(--radius-card)] bg-sand p-8 sm:p-10">
              <p className="font-display text-display-sm font-semibold text-ink">
                Deine Branche ist <span className="font-accent text-forest">nicht dabei?</span>
              </p>
              <p className="mt-4 text-ink-soft">
                Kein Problem. Die Studien zeigen nur, was möglich ist. Deine Website gestalte ich individuell – passend zu
                deinem Unternehmen, deinen Kunden und deinem Stil.
              </p>
              <ButtonLink href="/kontakt/" className="mt-8">
                Website anfragen
              </ButtonLink>
            </div>
          </div>

          <div data-reveal className="lg:col-span-7 lg:col-start-6 lg:-mt-10">
            <StudyPreview
              study={beauty.study}
              {...beauty.shot}
              sizes="(min-width: 1024px) 56vw, 100vw"
              heightClassName="h-[440px] sm:h-[540px] lg:h-[580px]"
            />
            <StudyCaption study={beauty.study} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
