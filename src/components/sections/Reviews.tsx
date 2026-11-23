import { Quote, Star, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichTitle } from "@/components/ui/RichTitle";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { reviews } from "@/config/site";
import { cn } from "@/lib/format";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("size-4", i < rating ? "fill-[#C7952F] text-[#C7952F]" : "fill-ink/10 text-ink/10")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function Reviews({ className }: { className?: string }) {
  return (
    <section aria-labelledby="bewertungen-title" className={cn("py-24 sm:py-32", className)}>
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            id="bewertungen-title"
            className="lg:col-span-7"
            eyebrow={reviews.eyebrow}
            title={<RichTitle text={reviews.headline} />}
          />
          <div data-reveal className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-ink-soft">{reviews.intro}</p>
            {reviews.placeholder && (
              <PlaceholderBadge className="mt-5">Platzhalter – durch echte Kundenzitate ersetzen</PlaceholderBadge>
            )}
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.items.map((review, index) => (
            <li
              key={review.quote}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
              className="flex"
            >
              <figure
                className={cn(
                  "relative flex w-full flex-col rounded-[var(--radius-card)] p-7 sm:p-8",
                  index % 3 === 1 ? "bg-mint" : index % 3 === 2 ? "bg-sand" : "border border-line bg-paper",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <Stars rating={review.rating} />
                  {reviews.placeholder ? <PlaceholderBadge /> : <Quote className="size-6 text-forest/25" aria-hidden="true" />}
                </div>
                <blockquote className="mb-7 mt-6 font-display text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-ink sm:text-[1.22rem]">
                  „{review.quote}“
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-forest text-cream"
                  >
                    <UserRound className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[0.95rem] font-semibold text-ink">{review.author}</span>
                    <span className="block text-[0.82rem] text-ink-muted">{review.context}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p data-reveal className="mt-6 max-w-3xl text-[0.82rem] text-ink-muted">
          {reviews.sourceNote}
        </p>
      </div>
    </section>
  );
}
