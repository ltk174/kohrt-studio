import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/format";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  size?: "lg" | "md";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  size = "md",
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <div data-reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <Tag
        id={id}
        data-reveal
        style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        className={cn(
          "mt-5 font-semibold",
          size === "lg" ? "text-display-lg" : "text-display-md",
          tone === "dark" ? "text-ink" : "text-cream",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          data-reveal
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          className={cn(
            "mt-6 max-w-2xl text-lead",
            tone === "dark" ? "text-ink-soft" : "text-cream/75",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
