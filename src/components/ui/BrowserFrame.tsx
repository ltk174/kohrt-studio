import { Lock, RotateCw } from "lucide-react";
import { cn } from "@/lib/format";

type BrowserFrameProps = {
  domain: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Kompakte Variante für kleine Mockups */
  compact?: boolean;
  /** Optionale Aktion rechts in der Browserleiste (ersetzt das Neu-laden-Symbol) */
  actions?: React.ReactNode;
};

/** Realistisch gestaltetes, reduziertes Browserfenster. */
export function BrowserFrame({ domain, children, className, bodyClassName, compact = false, actions }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-window)] border border-ink/10 bg-paper shadow-window",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center border-b border-ink/[0.07] bg-[#F3F1EC]",
          compact ? "h-7 gap-2 px-3" : "h-10 gap-3 px-4",
        )}
      >
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className={cn("rounded-full bg-[#E7B7A9]", compact ? "size-[7px]" : "size-2.5")} />
          <span className={cn("rounded-full bg-[#EBD49F]", compact ? "size-[7px]" : "size-2.5")} />
          <span className={cn("rounded-full bg-[#B9CCB4]", compact ? "size-[7px]" : "size-2.5")} />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <div
            className={cn(
              "flex min-w-0 items-center justify-center gap-1.5 rounded-full bg-paper text-ink-muted ring-1 ring-ink/[0.06]",
              compact ? "h-4 w-[58%] px-2 text-[0.5rem]" : "h-6 w-full max-w-[19rem] px-3 text-[0.72rem]",
            )}
          >
            <Lock className={cn("shrink-0", compact ? "size-2" : "size-3")} aria-hidden="true" strokeWidth={2.2} />
            <span className="truncate tracking-tight">{domain}</span>
          </div>
        </div>
        {actions ?? (
          <RotateCw
            className={cn("shrink-0 text-ink-muted/70", compact ? "size-2.5" : "size-3.5")}
            aria-hidden="true"
            strokeWidth={2}
          />
        )}
      </div>
      <div className={cn("relative", bodyClassName)}>{children}</div>
    </div>
  );
}
