import { Mail } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MailLink } from "@/components/ui/MailLink";
import { RichTitle } from "@/components/ui/RichTitle";
import { InquiryWizard } from "./InquiryWizard";
import { contact, contactSection } from "@/config/site";
import { cn } from "@/lib/format";

export function Contact({ variant = "home", className }: { variant?: "home" | "page"; className?: string }) {
  const Heading = variant === "page" ? "h1" : "h2";
  return (
    <section id="anfrage" aria-labelledby="kontakt-title" className={cn("scroll-mt-24 py-12 sm:py-16", className)}>
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-5 py-14 text-cream sm:rounded-[2.5rem] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          {/* dezente Kreise als Gestaltungselement */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full border border-cream/[0.07]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-[24rem] rounded-full border border-cream/[0.07]" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-12">
            <div className="lg:col-span-5 lg:row-start-1">
              <div data-reveal>
                <Eyebrow tone="light">{contactSection.eyebrow}</Eyebrow>
              </div>
              <Heading
                id="kontakt-title"
                data-reveal
                className={cn("mt-5 font-semibold text-cream", variant === "page" ? "text-display-lg" : "text-display-md")}
              >
                <RichTitle text={contactSection.headline} accentClassName="font-accent text-sage" />
              </Heading>
              <p data-reveal className="mt-6 max-w-md text-lead text-cream/75">
                {contactSection.text}
              </p>
            </div>

            <div
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 xl:col-span-6 xl:col-start-7"
            >
              <InquiryWizard />
            </div>
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
              <ol data-reveal className="space-y-5 lg:mt-2">
                {contactSection.nextSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-cream/20 font-display text-[0.8rem] font-semibold text-sage">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-cream/85">{step}</span>
                  </li>
                ))}
              </ol>

              <div data-reveal className="mt-10 border-t border-cream/15 pt-8">
                <p className="text-[0.85rem] text-cream/60">Lieber direkt per E-Mail?</p>
                <MailLink
                  subject="Projektanfrage"
                  className="mt-2 inline-flex items-center gap-2.5 font-display text-[1.25rem] font-semibold text-cream underline decoration-sage decoration-2 underline-offset-[6px] transition-colors hover:text-sage"
                >
                  <Mail className="size-5" aria-hidden="true" />
                  {contact.displayEmail}
                </MailLink>
                <p className="mt-4 max-w-sm text-[0.85rem] text-cream/60">{contact.responseNote}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
