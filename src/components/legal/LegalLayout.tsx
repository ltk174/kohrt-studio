import { Eyebrow } from "@/components/ui/Eyebrow";

export type LegalSection = { id: string; title: string; content: React.ReactNode };

/** Gemeinsames Layout für Impressum und Datenschutzerklärung */
export function LegalLayout({
  title,
  intro,
  sections,
  footer,
}: {
  title: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
  footer?: React.ReactNode;
}) {
  return (
    <section className="pb-16 pt-10 sm:pt-16">
      <div className="container-page">
        <Eyebrow>Rechtliches</Eyebrow>
        <h1 className="mt-6 text-display-lg font-semibold text-ink">{title}</h1>
        {intro && <div className="mt-6 max-w-3xl text-lead text-ink-soft">{intro}</div>}

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <nav aria-label="Inhalt dieser Seite" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Inhalt</p>
              <ol className="mt-4 space-y-2.5 text-[0.92rem]">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="flex gap-3 text-ink-soft transition-colors hover:text-forest">
                      <span className="tabular-nums text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 max-w-3xl lg:col-span-8 lg:col-start-5">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-32 border-t border-line py-10 first:border-t-0 first:pt-0"
              >
                <h2
                  id={`${section.id}-title`}
                  className="flex gap-4 font-display text-[1.45rem] font-semibold tracking-[-0.025em] text-ink"
                >
                  <span className="pt-1 text-[0.9rem] tabular-nums text-forest">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <div className="legal-prose mt-5 sm:pl-10">{section.content}</div>
              </section>
            ))}
            {footer && <div className="border-t border-line pt-8 text-[0.9rem] text-ink-muted">{footer}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
