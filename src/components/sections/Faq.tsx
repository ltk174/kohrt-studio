"use client";
import { RichTitle } from "@/components/ui/RichTitle";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { faq } from "@/config/site";
import { cn } from "@/lib/format";

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-forest sm:text-[1.25rem]"
        >
          {q}
          <span
            aria-hidden="true"
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-[transform,background-color,color] duration-500 ease-[var(--ease-out-soft)]",
              open ? "rotate-45 bg-ink text-cream" : "group-hover:bg-mint",
            )}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-soft)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        inert={!open}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-ink-soft">{a}</p>
        </div>
      </div>
    </li>
  );
}

export function Faq({ className }: { className?: string }) {
  return (
    <section aria-labelledby="faq-title" className={cn("py-24 sm:py-32", className)}>
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div data-reveal>
              <Eyebrow>{faq.eyebrow}</Eyebrow>
            </div>
            <h2 id="faq-title" data-reveal className="mt-5 text-display-md font-semibold text-ink">
              <RichTitle text={faq.headline} />
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-ink-soft">
              Deine Frage ist nicht dabei? Schreib mir einfach – ich antworte persönlich und verständlich.
            </p>
            <div data-reveal className="mt-8">
              <ButtonLink href="/kontakt/" variant="secondary">
                Frage stellen
              </ButtonLink>
            </div>
          </div>
        </div>
        <ul data-reveal className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faq.items.map((item, index) => (
            <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={index === 0} />
          ))}
        </ul>
      </div>
    </section>
  );
}
