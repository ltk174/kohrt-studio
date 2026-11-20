import { Code, FileText, Gauge, ListChecks, MapPin, Search, Smartphone, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichTitle } from "@/components/ui/RichTitle";
import { seo } from "@/config/site";
import { cn } from "@/lib/format";

const icons: Record<string, LucideIcon> = {
  technik: Code,
  speed: Gauge,
  mobile: Smartphone,
  lokal: MapPin,
  meta: FileText,
  schema: ListChecks,
};

/** Beispielhaftes Suchergebnis als Grafik */
function SearchResultVisual() {
  const { example } = seo;
  return (
    <div aria-hidden="true" className="relative rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-lift sm:p-7">
      <div className="flex items-center gap-3 rounded-full border border-line-strong bg-cream px-4 py-2.5">
        <Search className="size-4 shrink-0 text-ink-muted" />
        <span className="truncate text-[0.92rem] text-ink">{example.query}</span>
      </div>
      <div className="mt-6 space-y-5">
        <div className="rounded-2xl bg-mint/60 p-4 ring-1 ring-forest/15">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#1E2124] text-[0.6rem] font-bold text-[#D9A27A]">
              M
            </span>
            <span className="truncate text-[0.78rem] text-ink-muted">{example.url}</span>
          </div>
          <p className="mt-2 font-display text-[1.02rem] font-semibold leading-snug text-forest">{example.title}</p>
          <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">{example.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Mobil optimiert", "Schnell", "Lokal relevant"].map((tag) => (
              <span key={tag} className="rounded-full bg-paper px-2.5 py-1 text-[0.7rem] font-semibold text-forest">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="px-4 opacity-50">
            <span className="block h-2 w-32 rounded-full bg-ink/10" />
            <span className="mt-2.5 block h-3 w-3/4 rounded-full bg-ink/15" />
            <span className="mt-2 block h-2 w-full rounded-full bg-ink/[0.07]" />
          </div>
        ))}
      </div>
      <p className="mt-6 text-[0.72rem] text-ink-muted">Beispielhafte Darstellung</p>
    </div>
  );
}

export function Seo({ className }: { className?: string }) {
  return (
    <section id="seo" aria-labelledby="seo-title" className={cn("scroll-mt-28 py-24 sm:py-32", className)}>
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading id="seo-title" eyebrow={seo.eyebrow} title={<RichTitle text={seo.headline} />} intro={seo.intro} />
            <div data-reveal className="mt-10">
              <SearchResultVisual />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {seo.items.map((item, index) => {
                const Icon = icons[item.key];
                return (
                  <li
                    key={item.key}
                    data-reveal
                    style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
                    className="border-t border-line pt-6"
                  >
                    <span className="grid size-11 place-items-center rounded-2xl bg-mint text-forest">
                      <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                    <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">{item.text}</p>
                  </li>
                );
              })}
            </ul>
            <div data-reveal className="mt-12 grid gap-4 sm:grid-cols-2">
              <p className="rounded-[var(--radius-card)] bg-sand p-6 text-[0.95rem] leading-relaxed text-ink-soft">
                <strong className="mb-1 block font-display font-semibold text-ink">Ehrlich gesagt</strong>
                {seo.honesty.replace(/^Ehrlich gesagt: /, "")}
              </p>
              <p className="rounded-[var(--radius-card)] border border-line p-6 text-[0.95rem] leading-relaxed text-ink-soft">
                <strong className="mb-1 block font-display font-semibold text-ink">Mehr Sichtbarkeit gewünscht?</strong>
                {seo.extra.replace(/^Du möchtest mehr\? /, "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
