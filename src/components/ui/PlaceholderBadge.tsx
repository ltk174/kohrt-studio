import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/format";

/** Sichtbare Markierung für Inhalte, die vor der Veröffentlichung ersetzt werden müssen. */
export function PlaceholderBadge({ children = "Platzhalter", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[#C9A24A]/60 bg-[#FBF3DF] px-2.5 py-1 font-display text-[0.7rem] font-semibold text-[#7A5B16]",
        className,
      )}
    >
      <TriangleAlert className="size-3" aria-hidden="true" />
      {children}
    </span>
  );
}
