import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichTitle } from "@/components/ui/RichTitle";
import { workflow } from "@/config/site";
import { cn } from "@/lib/format";

export function Process({ className }: { className?: string }) {
  return (
    <section aria-labelledby="ablauf-title" className={cn("py-24 sm:py-32", className)}>
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            id="ablauf-title"
            className="lg:col-span-7"
            eyebrow={workflow.eyebrow}
            title={<RichTitle text={workflow.headline} />}
          />
          <p data-reveal className="self-end text-lead text-ink-soft lg:col-span-4 lg:col-start-9">
            {workflow.intro}
          </p>
        </div>

        <ol data-reveal className="group/process relative mt-16 grid gap-12 sm:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* Verbindungslinie – horizontal (Desktop) bzw. vertikal (mobil) */}
          <span aria-hidden="true" className="absolute bottom-6 left-[0.6875rem] top-6 w-px bg-line lg:hidden" />
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[0.6875rem] top-6 w-px origin-top scale-y-0 bg-forest transition-transform delay-300 duration-[1800ms] ease-[var(--ease-out-soft)] group-[.is-visible]/process:scale-y-100 lg:hidden [html:not(.js)_&]:scale-y-100"
          />
          <span aria-hidden="true" className="absolute left-0 right-0 top-[0.6875rem] hidden h-px bg-line lg:block" />
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[0.6875rem] hidden h-px origin-left scale-x-0 bg-forest transition-transform delay-300 duration-[1800ms] ease-[var(--ease-out-soft)] group-[.is-visible]/process:scale-x-100 lg:block [html:not(.js)_&]:scale-x-100"
          />

          {workflow.steps.map((step, index) => (
            <li key={step.number} className="relative pl-12 lg:pl-0 lg:pt-14">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 grid size-[1.375rem] place-items-center rounded-full border border-line-strong bg-cream transition-colors duration-500 group-[.is-visible]/process:border-forest"
                style={{ transitionDelay: `${500 + index * 350}ms` }}
              >
                <span
                  className="size-2 scale-0 rounded-full bg-forest transition-transform duration-500 group-[.is-visible]/process:scale-100 [html:not(.js)_&]:scale-100"
                  style={{ transitionDelay: `${500 + index * 350}ms` }}
                />
              </span>
              <p className="font-display text-[3.6rem] font-light leading-none tracking-[-0.05em] text-forest sm:text-[4.4rem]">
                {step.number}
              </p>
              <h3 className="mt-6 font-display text-[1.4rem] font-semibold tracking-[-0.025em] text-ink">{step.title}</h3>
              <p className="mt-3 max-w-xs text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
