import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichTitle } from "@/components/ui/RichTitle";
import { about, owner } from "@/config/site";

export const metadata: Metadata = {
  title: "Über mich",
  description: `${owner.name} – Webdesign für kleine und mittelständische Unternehmen. Persönlich, unkompliziert und transparent.`,
  alternates: { canonical: "/ueber-mich/" },
};

export default function AboutPage() {
  return (
    <>
      <About variant="page" className="pt-10 sm:pt-16" />
      <section aria-labelledby="werte-title" className="py-16 sm:py-24">
        <div className="container-page">
          <div data-reveal>
            <Eyebrow>Meine Arbeitsweise</Eyebrow>
          </div>
          <h2 id="werte-title" data-reveal className="mt-5 max-w-3xl text-display-md font-semibold text-ink">
            <RichTitle text="Was du von mir *erwarten kannst.*" />
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => (
              <article
                key={value.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7"
              >
                <span className="font-display text-sm font-semibold tabular-nums text-forest">0{index + 1}</span>
                <h3 className="mt-12 font-display text-[1.3rem] font-semibold tracking-[-0.025em] text-ink">{value.title}</h3>
                <p className="mt-3 text-ink-soft">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <CtaBand />
    </>
  );
}
