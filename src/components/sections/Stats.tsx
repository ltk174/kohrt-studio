import { proof } from "@/config/site";
import { cn } from "@/lib/format";

/** Kennzahlen-Band: Erfahrung auf einen Blick */
export function Stats({ className }: { className?: string }) {
  return (
    <section aria-label={proof.eyebrow} className={cn("py-10 sm:py-14", className)}>
      <div className="container-page">
        <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {proof.stats.map((stat, index) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              className={cn(
                "flex flex-col gap-3 py-8 sm:py-10 lg:px-8",
                index % 2 === 1 && "border-l border-line pl-5 sm:pl-8",
                index >= 2 && "border-t border-line lg:border-t-0",
                index === 2 && "lg:border-l lg:pl-8",
                index === 0 && "pr-5 lg:pl-0",
              )}
            >
              <dt className="order-2 max-w-[14rem] text-[0.95rem] leading-snug text-ink-soft">{stat.label}</dt>
              <dd className="order-1 font-display text-[clamp(2.8rem,2rem+3vw,4.6rem)] font-light leading-none tracking-[-0.05em] text-ink">
                {stat.value}
                <span className="font-accent text-forest">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
