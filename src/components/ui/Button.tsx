import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "light" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-forest",
  secondary: "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-paper",
  light: "bg-cream text-ink hover:bg-mint",
  "outline-light": "border border-cream/30 text-cream hover:border-cream hover:bg-cream/5",
};

const iconStyles: Record<Variant, string> = {
  primary: "bg-cream/10 text-cream",
  secondary: "bg-ink text-cream",
  light: "bg-ink text-cream",
  "outline-light": "bg-cream/10 text-cream",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  size?: "md" | "lg";
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon = true,
  size = "md",
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full font-display font-semibold tracking-[-0.01em] transition-colors duration-300",
        size === "lg" ? "h-14 pl-7 pr-2 text-[1.02rem]" : "h-12 pl-6 pr-1.5 text-[0.95rem]",
        !icon && (size === "lg" ? "pr-7" : "pr-6"),
        styles[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "grid place-items-center overflow-hidden rounded-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-45",
            size === "lg" ? "size-10" : "size-9",
            iconStyles[variant],
          )}
        >
          <ArrowUpRight className="size-[1.1rem]" strokeWidth={2} />
        </span>
      )}
    </Link>
  );
}

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ className, children, variant = "primary", ...rest }: SubmitButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex h-14 items-center justify-center gap-3 rounded-full pl-7 pr-2 font-display text-[1.02rem] font-semibold tracking-[-0.01em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "grid size-10 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-45",
          iconStyles[variant],
        )}
      >
        <ArrowUpRight className="size-[1.1rem]" strokeWidth={2} />
      </span>
    </button>
  );
}
