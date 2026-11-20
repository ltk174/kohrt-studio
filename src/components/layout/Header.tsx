"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MailLink } from "@/components/ui/MailLink";
import { contact, cta, navigation, site } from "@/config/site";
import { cn } from "@/lib/format";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü bei Seitenwechsel schließen
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Scroll sperren, Escape & Fokusfalle im mobilen Menü
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const all = [toggleRef.current, ...focusable].filter(Boolean) as HTMLElement[];
      const first = all[0];
      const last = all[all.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-line bg-cream/85 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between gap-6 transition-[height] duration-500",
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-24",
          )}
        >
          <Link href="/" className="relative z-10 -m-2 shrink-0 p-2" aria-label={`${site.shortName} – zur Startseite`}>
            <Logo className="w-[9.4rem] sm:w-[10.5rem] lg:w-[9.6rem] xl:w-[11.5rem]" title="" />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-paper/60 p-1.5 backdrop-blur">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block whitespace-nowrap rounded-full px-3 py-2 font-display text-[0.9rem] font-medium transition-colors duration-300 xl:px-4 xl:text-[0.92rem]",
                        active ? "bg-ink text-cream" : "text-ink-soft hover:bg-mint hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={cta.primary.href}
              className="group hidden h-11 items-center gap-2 whitespace-nowrap rounded-full bg-ink pl-5 pr-1.5 font-display text-[0.9rem] font-semibold text-cream transition-colors duration-300 hover:bg-forest sm:inline-flex"
            >
              <span className="lg:hidden xl:inline">{cta.primary.label}</span>
              <span className="hidden lg:inline xl:hidden">{cta.primary.shortLabel}</span>
              <span className="grid size-8 place-items-center rounded-full bg-sage text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-4" strokeWidth={2.2} aria-hidden="true" />
              </span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="relative z-10 grid size-11 place-items-center rounded-full border border-line-strong bg-paper text-ink transition-colors hover:bg-mint lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
        {/* Smartphone: immer sichtbarer Handlungsaufruf unter der Kopfzeile */}
        <Link
          href={cta.primary.href}
          className="flex h-11 items-center justify-center gap-2 bg-forest px-4 font-display text-[0.88rem] font-semibold text-cream transition-colors hover:bg-forest-deep sm:hidden"
        >
          <Sparkles className="size-4 shrink-0 text-sage" aria-hidden="true" />
          <span className="truncate">{cta.primary.label}</span>
          <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>

      {/* Mobiles Menü */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 overflow-y-auto border-t border-line bg-cream lg:hidden",
          scrolled ? "top-[6.75rem] sm:top-16" : "top-[7.25rem] sm:top-[4.5rem]",
        )}
      >
        <nav aria-label="Mobile Navigation" className="container-page flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {navigation.map((item, index) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline justify-between gap-4 py-5"
                  >
                    <span
                      className={cn(
                        "font-display text-[2.1rem] font-semibold tracking-[-0.035em] transition-colors",
                        active ? "text-forest" : "text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="font-display text-sm text-ink-muted tabular-nums">0{index + 1}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto pt-10">
            <Link
              href={cta.primary.href}
              className="flex h-14 items-center justify-between rounded-full bg-ink pl-6 pr-2 font-display font-semibold text-cream"
            >
              {cta.primary.label}
              <span className="grid size-10 place-items-center rounded-full bg-sage text-ink">
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </span>
            </Link>
            <p className="mt-6 text-sm text-ink-muted">
              Oder schreib mir direkt:{" "}
              <MailLink className="font-medium text-ink underline decoration-sage decoration-2 underline-offset-4" />
            </p>
            <p className="sr-only">{contact.responseNote}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
