import { Check, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { freeDraft, hero, pricing } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { getScreenshot, getStudy } from "@/lib/studies";

/* eslint-disable @next/next/no-img-element -- statische Screenshots, bereits optimiert (WebP) */

export function Hero() {
  const garden = getScreenshot(getStudy("garten-landschaft"));
  const craft = getScreenshot(getStudy("handwerk-bau"));
  const beauty = getScreenshot(getStudy("beauty-lifestyle"));

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-8 sm:pt-14 lg:pb-32">
      {/* dezente Rasterlinien im Hintergrund */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="container-page grid h-full grid-cols-4 lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`border-l border-ink/[0.04] ${i >= 4 ? "hidden lg:block" : ""} ${i === 11 ? "border-r" : ""}`} />
          ))}
        </div>
      </div>

      <div className="container-page">
        <div data-reveal className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/70 py-1.5 pl-2 pr-4 font-display text-[0.82rem] font-semibold text-ink-soft">
            <span className="relative grid size-5 place-items-center rounded-full bg-mint">
              <span className="size-2 animate-pulse-dot rounded-full bg-forest" />
            </span>
            {hero.eyebrow}
          </span>
        </div>

        <h1 id="hero-title" className="mt-7 text-display-xl font-semibold text-ink sm:mt-9">
          <span data-reveal className="block" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            {hero.headline.lead}
          </span>
          <span
            data-reveal
            className="block font-accent text-forest sm:pl-[0.9em] lg:pl-[1.6em]"
            style={{ "--reveal-delay": "160ms", letterSpacing: "-0.02em" } as React.CSSProperties}
          >
            {hero.headline.accent}
          </span>
        </h1>

        <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pt-6">
            <p data-reveal style={{ "--reveal-delay": "240ms" } as React.CSSProperties} className="max-w-md text-lead text-ink-soft">
              {hero.subline}
            </p>
            <div
              data-reveal
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <ButtonLink href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <ul
              data-reveal
              style={{ "--reveal-delay": "400ms" } as React.CSSProperties}
              className="mt-10 grid gap-3 border-t border-line pt-8 text-[0.95rem] text-ink-soft"
            >
              {hero.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-3">
                  <span className="grid size-5 place-items-center rounded-full bg-mint text-forest">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Komposition aus Browserfenstern */}
          <div
            className="relative lg:col-span-7 xl:-mt-24"
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <div className="relative mx-auto aspect-[10/9] w-full max-w-[44rem] sm:aspect-[16/12] lg:aspect-[16/12.5] lg:max-w-none">
              {/* hinten rechts: Beauty */}
              <div className="absolute right-0 top-0 w-[48%] animate-float-b [animation-delay:-3s]">
                <BrowserFrame domain="studio-muster.de" compact>
                  <img src={beauty.hero} alt="" width={1600} height={1000} className="block aspect-[16/10] w-full object-cover object-top" />
                </BrowserFrame>
              </div>
              {/* Mitte: Garten */}
              <div className="absolute left-0 top-[9%] w-[74%] animate-float-a">
                <BrowserFrame domain="muster-und-gruen.de">
                  <img
                    src={garden.hero}
                    alt="Ausschnitt der Designstudie Garten & Landschaft"
                    width={1600}
                    height={1000}
                    fetchPriority="high"
                    className="block aspect-[16/10] w-full object-cover object-top"
                  />
                </BrowserFrame>
              </div>
              {/* vorne rechts: Handwerk */}
              <div className="absolute bottom-[3%] left-[12%] w-[52%] animate-float-b [animation-delay:-6s]">
                <BrowserFrame domain="muster-holzbau.de" compact>
                  <img
                    src={craft.hero}
                    alt="Ausschnitt der Designstudie Handwerk & Bau"
                    width={1600}
                    height={1000}
                    className="block aspect-[16/10] w-full object-cover object-top"
                  />
                </BrowserFrame>
              </div>
              {/* Smartphone */}
              <div className="absolute bottom-0 right-[5%] w-[21%] animate-float-a [animation-delay:-5s]">
                <div className="overflow-hidden rounded-[1.4rem] border-[5px] border-ink bg-ink shadow-window sm:rounded-[1.9rem] sm:border-[7px]">
                  <img
                    src={beauty.mobile}
                    alt="Smartphone-Ansicht der Designstudie Beauty & Lifestyle"
                    width={600}
                    height={1298}
                    className="block aspect-[9/19] w-full rounded-[1rem] object-cover object-top sm:rounded-[1.4rem]"
                  />
                </div>
              </div>

              {/* Preis-Chip */}
              <div className="absolute right-[34%] top-[1%] hidden rounded-2xl border border-line bg-paper/95 px-4 py-3 shadow-lift backdrop-blur sm:block">
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Fixpreis
                </p>
                <p className="mt-0.5 font-display text-[1.25rem] font-bold tracking-tight text-ink">
                  <span className="text-[0.8rem] font-semibold text-ink-muted">ab </span>
                  {formatPrice(pricing.website.price)}
                </p>
              </div>
              {/* Erstentwurf-Chip */}
              <div className="absolute bottom-[34%] right-[20%] hidden items-center gap-2.5 rounded-full bg-sage py-2 pl-2 pr-4 text-ink shadow-lift sm:flex">
                <span className="grid size-7 place-items-center rounded-full bg-ink text-cream">
                  <Clock className="size-3.5" aria-hidden="true" />
                </span>
                <span className="font-display text-[0.8rem] font-semibold">
                  Erstentwurf in {freeDraft.hours} h · kostenlos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
