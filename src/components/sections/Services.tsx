import { ArrowUpRight, Check, LayoutTemplate, MonitorSmartphone, RefreshCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichTitle } from "@/components/ui/RichTitle";
import { extras, services } from "@/config/site";

const icons = {
  "neue-website": MonitorSmartphone,
  modernisierung: RefreshCcw,
  landingpage: LayoutTemplate,
  betreuung: ShieldCheck,
} as const;

export function Services() {
  return (
    <section aria-labelledby="leistungen-title" className="py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="leistungen-title"
          eyebrow="Was ich für dich mache"
          title={<RichTitle text="Vier Wege zu deinem *starken Auftritt.*" />}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.key];
            const href = service.key === "betreuung" ? "/kontakt/?leistung=sonstiges" : `/kontakt/?leistung=${service.key}`;
            return (
              <article
                key={service.key}
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 100}ms` } as React.CSSProperties}
                className="group relative flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-lift sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-mint text-forest">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold tabular-nums text-ink-muted">0{index + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-[1.6rem] font-semibold tracking-[-0.03em] text-ink">{service.title}</h3>
                <p className="mt-3 max-w-md text-ink-soft">{service.text}</p>
                <ul className="mt-7 space-y-2.5 border-t border-line pt-7">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[0.95rem] text-ink">
                      <Check className="size-4 shrink-0 text-forest" strokeWidth={2.5} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className="mt-8 inline-flex w-fit items-center gap-2 font-display text-[0.95rem] font-semibold text-ink after:absolute after:inset-0 after:rounded-[var(--radius-card)]"
                >
                  Anfragen
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Extras() {
  return (
    <section aria-labelledby="extras-title" className="py-16 sm:py-24">
      <div className="container-page">
        <div className="grid gap-12 rounded-[2rem] bg-mint px-6 py-14 sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-5">
            <h2 id="extras-title" data-reveal className="text-display-md font-semibold text-ink">
              <RichTitle text={extras.headline} />
            </h2>
            <p data-reveal className="mt-6 max-w-md text-ink-soft">
              {extras.text}
            </p>
          </div>
          <ul data-reveal className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {extras.items.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl bg-paper px-5 py-4 text-ink shadow-soft">
                <span className="size-2 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
