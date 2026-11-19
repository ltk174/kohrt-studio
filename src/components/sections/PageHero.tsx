import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichTitle } from "@/components/ui/RichTitle";
import { cn } from "@/lib/format";

/** Kopfbereich für Unterseiten */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("pb-12 pt-10 sm:pb-16 sm:pt-16 lg:pt-20", className)}>
      <div className="container-page">
        <div data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          className="mt-6 max-w-5xl text-display-lg font-semibold text-ink"
        >
          <RichTitle text={title} />
        </h1>
        {intro && (
          <p
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            className="mt-7 max-w-2xl text-lead text-ink-soft"
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
