import { Check, Mail, MessageCircle } from "lucide-react";
import { RichTitle } from "@/components/ui/RichTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits, owner, pricing } from "@/config/site";
import { formatPrice } from "@/lib/format";

/** Mini-Visual: Moodboard mit Schrift, Farben und Layout */
function DesignVisual() {
  return (
    <div aria-hidden="true" className="relative h-full min-h-[15rem] w-full">
      <div className="absolute left-0 top-0 w-[58%] rounded-2xl border border-ink/[0.06] bg-paper p-5 shadow-soft">
        <p className="font-display text-[3.4rem] font-semibold leading-none tracking-[-0.05em] text-ink">Aa</p>
        <p className="mt-3 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Typografie</p>
        <div className="mt-4 space-y-1.5">
          <span className="block h-1.5 w-full rounded-full bg-ink/10" />
          <span className="block h-1.5 w-4/5 rounded-full bg-ink/10" />
          <span className="block h-1.5 w-3/5 rounded-full bg-ink/10" />
        </div>
      </div>
      <div className="absolute right-0 top-6 w-[38%] rounded-2xl border border-ink/[0.06] bg-paper p-3 shadow-soft">
        <div className="grid grid-cols-2 gap-2">
          {["#34483D", "#A9BBAA", "#EAE5DC", "#202522"].map((c) => (
            <span key={c} className="aspect-square rounded-lg" style={{ backgroundColor: c }} />
          ))}
        </div>
        <p className="mt-2.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Farben</p>
      </div>
      <div className="absolute bottom-0 left-[18%] right-[6%] rounded-2xl border border-ink/[0.06] bg-paper p-3 shadow-lift">
        <div className="flex items-center gap-1.5 border-b border-ink/[0.06] pb-2">
          <span className="size-1.5 rounded-full bg-[#E7B7A9]" />
          <span className="size-1.5 rounded-full bg-[#EBD49F]" />
          <span className="size-1.5 rounded-full bg-[#B9CCB4]" />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          <span className="col-span-3 h-12 rounded-md bg-forest" />
          <span className="col-span-2 h-12 rounded-md bg-sage/60" />
          <span className="col-span-2 h-6 rounded-md bg-sand" />
          <span className="col-span-3 h-6 rounded-md bg-mint" />
        </div>
      </div>
    </div>
  );
}

/** Mini-Visual: transparentes Angebot */
function PriceVisual() {
  const lines = ["Individuelles Design", "Bis zu 5 Unterseiten", "Smartphone-optimiert", "Grundlegende SEO"];
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[19rem] rotate-[-2deg] rounded-2xl bg-paper p-6 shadow-lift">
      <div className="flex items-center justify-between">
        <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Dein Angebot</p>
        <span className="rounded-full bg-mint px-2.5 py-1 font-display text-[0.65rem] font-bold text-forest">Fixpreis</span>
      </div>
      <ul className="mt-5 space-y-2.5">
        {lines.map((line) => (
          <li key={line} className="flex items-center justify-between gap-3 text-[0.85rem] text-ink-soft">
            {line}
            <Check className="size-4 text-forest" strokeWidth={2.5} />
          </li>
        ))}
      </ul>
      <div className="my-5 border-t border-dashed border-ink/20" />
      <div className="flex items-end justify-between">
        <span className="text-[0.85rem] text-ink-muted">Gesamt, netto</span>
        <span className="font-display text-[1.6rem] font-bold leading-none tracking-tight text-ink">
          {formatPrice(pricing.website.price)}
        </span>
      </div>
    </div>
  );
}

/** Mini-Visual: direkter Kontakt */
function PersonalVisual() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-[22rem] space-y-3">
      <div className="flex items-center gap-4 rounded-2xl bg-cream/[0.08] p-4 ring-1 ring-cream/10">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sage font-display text-[1rem] font-bold text-ink">
          {owner.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </span>
        <div className="min-w-0">
          <p className="font-display font-semibold text-cream">{owner.name}</p>
          <p className="flex items-center gap-2 text-[0.8rem] text-cream/60">
            <span className="size-1.5 rounded-full bg-sage" /> Dein direkter Ansprechpartner
          </p>
        </div>
      </div>
      <div className="ml-8 flex items-center gap-3 rounded-2xl bg-cream/[0.08] px-4 py-3 ring-1 ring-cream/10">
        <Mail className="size-4 shrink-0 text-sage" />
        <span className="h-1.5 w-full rounded-full bg-cream/15" />
      </div>
      <div className="ml-16 flex items-center gap-3 rounded-2xl bg-sage px-4 py-3 text-ink">
        <MessageCircle className="size-4 shrink-0" />
        <span className="text-[0.82rem] font-semibold">Kurze Wege, klare Absprachen</span>
      </div>
    </div>
  );
}

export function Benefits() {
  const [design, price, personal] = benefits.items;
  return (
    <section aria-labelledby="vorteile-title" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            id="vorteile-title"
            className="lg:col-span-7"
            eyebrow={benefits.eyebrow}
            title={<RichTitle text={benefits.headline} />}
          />
          <p data-reveal className="self-end text-lead text-ink-soft lg:col-span-4 lg:col-start-9">
            {benefits.intro}
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <article
            data-reveal
            className="group grid overflow-hidden rounded-[var(--radius-card)] bg-mint p-7 sm:p-10 lg:col-span-7 lg:grid-cols-2 lg:gap-10"
          >
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold text-forest">01</span>
              <h3 className="mt-auto pt-10 text-display-sm font-semibold text-ink">{design.title}</h3>
              <p className="mt-4 text-ink-soft">{design.text}</p>
            </div>
            <div className="mt-10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 lg:mt-0">
              <DesignVisual />
            </div>
          </article>

          <article
            data-reveal
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-sand p-7 sm:p-10 lg:col-span-5"
          >
            <span className="font-display text-sm font-semibold text-forest">02</span>
            <div className="py-10 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:rotate-1">
              <PriceVisual />
            </div>
            <h3 className="mt-auto text-display-sm font-semibold text-ink">{price.title}</h3>
            <p className="mt-4 text-ink-soft">{price.text}</p>
          </article>

          <article
            data-reveal
            className="grid items-center gap-10 overflow-hidden rounded-[var(--radius-card)] bg-forest p-7 text-cream sm:p-10 lg:col-span-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <span className="font-display text-sm font-semibold text-sage">03</span>
              <h3 className="mt-8 text-display-sm font-semibold text-cream">{personal.title}</h3>
              <p className="mt-4 max-w-md text-cream/75">{personal.text}</p>
            </div>
            <div className="flex justify-start lg:col-span-5 lg:col-start-8 lg:justify-end">
              <PersonalVisual />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
