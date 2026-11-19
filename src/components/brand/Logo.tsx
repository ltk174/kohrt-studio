import { LOGO_DOT, LOGO_KOHRT, LOGO_STUDIO, LOGO_VIEWBOX } from "./logo-paths";
import { cn } from "@/lib/format";

type LogoProps = {
  className?: string;
  /** "dark" = für helle Hintergründe, "light" = für dunkle Hintergründe */
  tone?: "dark" | "light";
  title?: string;
};

/** Typografisches Logo „kohrt.studio“ als Inline-SVG (umgewandelte Manrope-Glyphen). */
export function Logo({ className, tone = "dark", title = "kohrt.studio" }: LogoProps) {
  const primary = tone === "dark" ? "#202522" : "#F8F7F3";
  const secondary = tone === "dark" ? "#34483D" : "#E6EDE5";
  return (
    <svg viewBox={LOGO_VIEWBOX} className={cn("h-auto", className)} role="img" aria-label={title}>
      <path fill={primary} d={LOGO_KOHRT} />
      <circle fill="#A9BBAA" cx={LOGO_DOT.cx} cy={LOGO_DOT.cy} r={LOGO_DOT.r} />
      <path fill={secondary} d={LOGO_STUDIO} />
    </svg>
  );
}
