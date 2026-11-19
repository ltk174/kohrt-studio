import { Check, Info } from "lucide-react";
import { RichTitle } from "@/components/ui/RichTitle";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing } from "@/config/site";
import { cn, formatPrice } from "@/lib/format";

export function Pricing({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { website, care, additionalCosts } = pricing;

  return (
    <section id="preise" aria-labelledby="preise-title" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            id="preise-title"
            as={headingLevel}
            className="lg:col-span-8"
            eyebrow={pricing.eyebrow}
            title={<RichTitle text={pricing.headline} />}
          />
          <p data-reveal className="self-end text-lead text-ink-soft lg:col-span-4">
            {pricing.intro}
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* Website-Erstellung */}
          <article
            data-reveal
            aria-labelledby="paket-website"
            className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper p-7 shadow-soft sm:p-10 lg:col-span-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 id="paket-website" className="font-display text-[1.6rem] font-semibold tracking-[-0.03em] text-ink">
                  {website.name}
                </h3>
                <p className="mt-1.5 text-ink-soft">{website.tagline}</p>
              </div>
              <span className="rounded-full bg-mint px-3 py-1 font-display text-[0.75rem] font-semibold text-forest">
                {website.badge}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-end gap-x-4 gap-y-2 border-b border-line pb-10">
              <p className="font-display font-semibold leading-none text-ink">
                <span className="mr-2 align-top text-[1.1rem] text-ink-muted">ab</span>
                <span className="text-[clamp(3.6rem,2.6rem+4vw,5.6rem)] tracking-[-0.05em]">{formatPrice(website.price)}</span>
              </p>
              <p className="pb-2 text-[0.95rem] leading-snug text-ink-muted">
                {website.period},
                <br />
                {website.taxNote}
              </p>
            </div>

            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {website.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-forest text-cream">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <p className="mt-10 rounded-2xl bg-cream px-5 py-4 text-[0.92rem] text-ink-soft">{website.scopeNote}</p>

            <div className="mt-8">
              <ButtonLink href={website.cta.href} size="lg">
                {website.cta.label}
              </ButtonLink>
            </div>
          </article>

          {/* Website-Care */}
          <article
            data-reveal
            aria-labelledby="paket-care"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-forest p-7 text-cream sm:p-10 lg:col-span-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 id="paket-care" className="font-display text-[1.6rem] font-semibold tracking-[-0.03em] text-cream">
                  {care.name}
                </h3>
                <p className="mt-1.5 text-cream/70">{care.tagline}</p>
              </div>
              <span className="rounded-full border border-cream/25 px-3 py-1 font-display text-[0.75rem] font-semibold text-cream/85">
                {care.badge}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-end gap-x-4 gap-y-2 border-b border-cream/15 pb-10">
              <p className="font-display font-semibold leading-none">
                <span className="text-[clamp(3.6rem,2.6rem+4vw,5.6rem)] tracking-[-0.05em]">{formatPrice(care.price)}</span>
              </p>
              <p className="pb-2 text-[0.95rem] leading-snug text-cream/65">
                {care.period},
                <br />
                {care.taxNote}
              </p>
            </div>

            <ul className="mt-10 grid gap-4">
              {care.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sage text-ink">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[0.85rem] leading-relaxed text-cream/60">{care.fairUse}</p>

            <div className="mt-auto pt-8">
              <p className="rounded-2xl bg-cream/[0.08] px-5 py-4 text-[0.95rem] text-cream/90 ring-1 ring-cream/10">{care.note}</p>
              <ButtonLink href={care.cta.href} variant="light" className="mt-6">
                {care.cta.label}
              </ButtonLink>
            </div>
          </article>
        </div>

        <div
          data-reveal
          className={cn(
            "mt-5 grid gap-4 rounded-[var(--radius-card)] border border-line px-7 py-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:px-10",
          )}
        >
          <span className="grid size-10 place-items-center rounded-full bg-sand text-forest">
            <Info className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display font-semibold text-ink">{additionalCosts.title}</h3>
            <p className="mt-1.5 max-w-4xl text-[0.95rem] text-ink-soft">{additionalCosts.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
