import { TriangleAlert } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { legal } from "@/config/site";

/** Klar gekennzeichnete Platzhalterseite für rechtliche Pflichtangaben. */
export function LegalPlaceholder({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="pb-16 pt-10 sm:pt-16">
      <div className="container-page max-w-4xl">
        <Eyebrow>Rechtliches</Eyebrow>
        <h1 className="mt-6 text-display-lg font-semibold text-ink">{title}</h1>

        <div role="note" className="mt-10 flex gap-4 rounded-[var(--radius-card)] border border-[#C9A24A]/50 bg-[#FBF3DF] p-6 sm:p-8">
          <TriangleAlert className="mt-0.5 size-6 shrink-0 text-[#8A6A1F]" aria-hidden="true" />
          <div>
            <p className="font-display text-[1.1rem] font-semibold text-ink">Platzhalter – noch nicht veröffentlichungsreif</p>
            <p className="mt-2 text-ink-soft">{legal.placeholderNotice}</p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-[1.3rem] font-semibold tracking-[-0.02em] text-ink">Vor der Veröffentlichung zu ergänzen</h2>
          <ul className="mt-5 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-ink-soft">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.92rem] text-ink-muted">
            Die genauen Pflichtangaben hängen von Rechtsform und Tätigkeit ab und sollten vor der Veröffentlichung rechtlich
            geprüft werden.
          </p>
        </div>
      </div>
    </section>
  );
}
