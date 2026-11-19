import { studiesSection, type Study } from "@/config/site";
import { cn } from "@/lib/format";

export function StudyCaption({ study, index, className }: { study: Study; index: number; className?: string }) {
  return (
    <div className={cn("mt-6 flex gap-5", className)}>
      <span className="font-display text-sm font-semibold tabular-nums text-ink-muted">0{index + 1}</span>
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{study.category}</h3>
          <span className="rounded-full border border-forest/25 bg-mint px-2.5 py-0.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-forest">
            {studiesSection.label}
          </span>
        </div>
        <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">{study.description}</p>
      </div>
    </div>
  );
}
