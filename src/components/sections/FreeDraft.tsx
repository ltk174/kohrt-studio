import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichTitle } from "@/components/ui/RichTitle";
import { freeDraft } from "@/config/site";
import { cn } from "@/lib/format";

/** Prominenter Hinweis: kostenloser Erstentwurf in 48 Stunden */
export function FreeDraft({ className }: { className?: string }) {
  return (
    <section aria-labelledby="erstentwurf-title" className={cn("py-10 sm:py-14", className)}>
      <div className="container-page">
        <div
          data-reveal
          className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-cream sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-16"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full border border-cream/[0.06]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-12 size-[20rem] rounded-full border border-cream/[0.06]" />

          <div className="relative lg:col-span-4">
            <p aria-hidden="true" className="flex items-baseline font-display font-light leading-[0.8] tracking-[-0.06em]">
              <span className="text-[clamp(7rem,5rem+9vw,12rem)]">{freeDraft.hours}</span>
              <span className="ml-2 font-accent text-[clamp(3.5rem,2.5rem+4vw,6rem)] text-sage">h</span>
            </p>
            <p className="mt-5 max-w-[16rem] text-[0.95rem] text-cream/70">
              bis dein erster Designvorschlag bei dir sein kann – kostenlos.
            </p>
          </div>

          <div className="relative lg:col-span-8">
            <Eyebrow tone="light">{freeDraft.eyebrow}</Eyebrow>
            <h2 id="erstentwurf-title" className="mt-5 text-display-md font-semibold text-cream">
              <RichTitle text={freeDraft.headline} accentClassName="font-accent text-sage" />
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-cream/75">{freeDraft.text}</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {freeDraft.points.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full bg-cream/[0.08] px-4 py-2 text-[0.92rem] text-cream ring-1 ring-cream/10"
                >
                  <Check className="size-4 text-sage" strokeWidth={2.6} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href={freeDraft.cta.href} variant="light" size="lg">
                {freeDraft.cta.label}
              </ButtonLink>
              <p className="text-[0.8rem] text-cream/55">{freeDraft.footnote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
