import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Portrait } from "./Portrait";
import { about } from "@/config/site";
import { RichTitle } from "@/components/ui/RichTitle";
import { cn } from "@/lib/format";

type AboutProps = {
  /** "page" = eigene Seite mit H1 */
  variant?: "home" | "page";
  className?: string;
};

export function About({ variant = "home", className }: AboutProps) {
  const Heading = variant === "page" ? "h1" : "h2";

  return (
    <section aria-labelledby="ueber-mich-title" className={cn("py-24 sm:py-32", className)}>
      <div className="container-page">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div data-reveal className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <Portrait priority={variant === "page"} />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div data-reveal>
              <Eyebrow>{about.eyebrow}</Eyebrow>
            </div>
            <Heading
              id="ueber-mich-title"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className={cn("mt-5 font-semibold text-ink", variant === "page" ? "text-display-lg" : "text-display-md")}
            >
              <RichTitle text={about.headline} />
            </Heading>

            <div data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties} className="mt-8 space-y-5">
              <p className="text-lead font-medium text-ink">{about.lead}</p>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[1.05rem] leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              className="mt-10 border-l-2 border-sage pl-6"
            >
              <p className="font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[1.55rem]">
                {about.closing}
              </p>
            </blockquote>

            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={about.cta.href} size="lg">
                {about.cta.label}
              </ButtonLink>
              {variant === "home" && (
                <ButtonLink href="/ueber-mich/" variant="secondary" size="lg" icon={false}>
                  Mehr über mich
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
