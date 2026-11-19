import { ArrowUpRight } from "lucide-react";
import { StudyPreview } from "@/components/studies/StudyPreview";
import { studiesSection, type Study } from "@/config/site";
import { cn } from "@/lib/format";
import { getScreenshot } from "@/lib/studies";

/** Große Darstellung einer Designstudie auf /designstudien */
export function StudyDetail({ study, index }: { study: Study; index: number }) {
  const shot = getScreenshot(study);
  const reversed = index % 2 === 1;
  return (
    <article aria-labelledby={`studie-${study.slug}`} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
      <div data-reveal className={cn("lg:col-span-8", reversed && "lg:order-2 lg:col-start-5")}>
        <StudyPreview
          study={study}
          src={shot.src}
          srcSet={shot.srcSet}
          mobileFull={shot.mobileFull}
          dims={shot.dims}
          sizes="(min-width: 1024px) 64vw, 100vw"
          heightClassName="h-[480px] sm:h-[620px] lg:h-[720px]"
          eager={index === 0}
        />
      </div>
      <div
        data-reveal
        style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        className={cn("lg:sticky lg:top-32 lg:col-span-4", reversed && "lg:order-1 lg:col-start-1 lg:row-start-1")}
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-semibold tabular-nums text-ink-muted">0{index + 1}</span>
          <span className="rounded-full border border-forest/25 bg-mint px-2.5 py-0.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-forest">
            {studiesSection.label}
          </span>
        </div>
        <p className="mt-6 font-display text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-forest">{study.category}</p>
        <h2 id={`studie-${study.slug}`} className="mt-3 text-display-sm font-semibold text-ink">
          {study.title}
        </h2>
        <p className="mt-5 text-ink-soft">{study.longDescription}</p>

        <dl className="mt-8 space-y-6 border-t border-line pt-8">
          <div>
            <dt className="font-display text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Farbwelt</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {study.palette.map((color) => (
                <span key={color.hex} className="inline-flex items-center gap-2 rounded-full border border-line bg-paper py-1 pl-1 pr-3 text-[0.8rem] text-ink-soft">
                  <span className="size-5 rounded-full ring-1 ring-ink/10" style={{ backgroundColor: color.hex }} aria-hidden="true" />
                  {color.name}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-display text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Schriften</dt>
            <dd className="mt-2 text-ink">{study.typefaces.join(" · ")}</dd>
          </div>
          <div>
            <dt className="font-display text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Bereiche</dt>
            <dd className="mt-2 text-ink-soft">{study.sections.join(" · ")}</dd>
          </div>
        </dl>

        <a
          href={`/vorschau/${study.slug}/`}
          className="group mt-8 inline-flex items-center gap-2 font-display font-semibold text-ink underline decoration-sage decoration-2 underline-offset-[6px] transition-colors hover:text-forest"
        >
          Studie in voller Größe ansehen
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
