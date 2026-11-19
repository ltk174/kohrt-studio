import { ButtonLink } from "@/components/ui/Button";
import { RichTitle } from "@/components/ui/RichTitle";
import { cn } from "@/lib/format";

/** Abschließender Handlungsaufruf für Unterseiten */
export function CtaBand({
  title = "Lass uns über deine *neue Website* sprechen.",
  text = "Unverbindlich, persönlich und mit einem klaren Angebot zum Fixpreis.",
  className,
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container-page">
        <div
          data-reveal
          className="grid items-end gap-10 rounded-[2rem] bg-sand px-6 py-14 sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:grid-cols-12 lg:px-16"
        >
          <h2 className="text-display-md font-semibold text-ink lg:col-span-8">
            <RichTitle text={title} />
          </h2>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-ink-soft">{text}</p>
            <ButtonLink href="/kontakt/" size="lg" className="mt-6">
              Projekt anfragen
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
