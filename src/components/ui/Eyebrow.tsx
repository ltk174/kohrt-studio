import { cn } from "@/lib/format";

/** Kleine Rubrik-Zeile über Überschriften, mit Markenpunkt. */
export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-forest" : "text-sage-soft",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-sage" />
      {children}
    </p>
  );
}
