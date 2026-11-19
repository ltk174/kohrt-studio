"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Hand, Maximize2, Mouse, X } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { studiesSection, type Study } from "@/config/site";
import { cn } from "@/lib/format";

type StudyPreviewProps = {
  study: Study;
  src: string;
  srcSet: string;
  /** Lange Smartphone-Version für kleine Bildschirme */
  mobileFull?: string;
  dims: { width: number; height: number; mobileHeight?: number };
  /** `sizes`-Attribut für die responsive Bildauswahl */
  sizes: string;
  /** Höhe des Vorschaufensters (Tailwind-Klassen) */
  heightClassName?: string;
  className?: string;
  eager?: boolean;
  /** Link „Vollbild“ zur Live-Version anzeigen */
  showOpenLink?: boolean;
};

/** Pixel pro Sekunde beim automatischen Scrollen */
const AUTO_SPEED = 46;

/**
 * Scrollbare Website-Vorschau in einem Browserfenster.
 * - Desktop: Mausrad/Trackpad scrollt direkt, beim Hover langsames Auto-Scrollen.
 * - Jede manuelle Interaktion stoppt das Auto-Scrollen sofort.
 * - Touch-Geräte: Seite bleibt normal scrollbar, die Vorschau wird per Tippen aktiviert.
 * - `prefers-reduced-motion`: kein Auto-Scrollen.
 */
export function StudyPreview({
  study,
  src,
  srcSet,
  mobileFull,
  dims,
  sizes,
  heightClassName = "h-[420px] sm:h-[500px]",
  className,
  eager = false,
  showOpenLink = true,
}: StudyPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);
  const position = useRef(0);
  const stoppedByUser = useRef(false);
  const [active, setActive] = useState(false);
  const [scrolledOnce, setScrolledOnce] = useState(false);
  const regionId = useId();

  const stopAuto = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  }, []);

  const startAuto = useCallback(() => {
    const el = scrollRef.current;
    if (!el || stoppedByUser.current) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    stopAuto();
    position.current = el.scrollTop;
    let last = performance.now();
    const step = (now: number) => {
      const max = el.scrollHeight - el.clientHeight;
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      position.current = Math.min(max, position.current + AUTO_SPEED * dt);
      el.scrollTop = position.current;
      if (position.current >= max) {
        frame.current = null;
        return;
      }
      frame.current = requestAnimationFrame(step);
    };
    // kurze Verzögerung, damit kein Scrollen beim bloßen Überfahren startet
    frame.current = requestAnimationFrame(() => {
      last = performance.now();
      frame.current = requestAnimationFrame(step);
    });
  }, [stopAuto]);

  const userInteraction = useCallback(() => {
    stoppedByUser.current = true;
    stopAuto();
  }, [stopAuto]);

  // Fortschrittsanzeige ohne Re-Render
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const progress = max > 0 ? el.scrollTop / max : 0;
    progressRef.current?.style.setProperty("--progress", progress.toFixed(4));
    if (el.scrollTop > 40) setScrolledOnce(true);
  }, []);

  // Aktivierte Touch-Vorschau beim Verlassen des Bildschirms wieder freigeben
  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setActive(false);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => stopAuto, [stopAuto]);

  return (
    <div className={cn("group/preview relative", className)}>
      <BrowserFrame
        domain={study.previewDomain}
        actions={
          showOpenLink ? (
            <a
              href={`/vorschau/${study.slug}/`}
              className="-mr-1.5 inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-2 text-[0.72rem] font-medium text-ink-muted transition-colors hover:bg-paper hover:text-ink"
              aria-label={`Designstudie ${study.category} in voller Größe öffnen`}
            >
              <Maximize2 className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Vollbild</span>
            </a>
          ) : undefined
        }
      >
        <div
          ref={scrollRef}
          id={regionId}
          role="region"
          aria-label={`Scrollbare Vorschau: ${studiesSection.label} ${study.category}`}
          tabIndex={0}
          data-active={active}
          onScroll={onScroll}
          onPointerEnter={(event) => event.pointerType === "mouse" && startAuto()}
          onPointerLeave={() => {
            stopAuto();
            stoppedByUser.current = false;
          }}
          onWheel={userInteraction}
          onPointerDown={userInteraction}
          onTouchStart={userInteraction}
          onKeyDown={userInteraction}
          className={cn(
            "relative overflow-y-auto overscroll-y-auto outline-none scrollbar-none",
            "pointer-coarse:overflow-hidden pointer-coarse:data-[active=true]:overflow-y-auto pointer-coarse:data-[active=true]:overscroll-y-contain",
            "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest",
            heightClassName,
          )}
          style={{ backgroundColor: study.tone }}
        >
          {/* Lange Screenshots ganzer Seiten – bewusst als <picture>/<img> mit srcset */}
          <picture>
            {mobileFull && <source media="(max-width: 639px)" srcSet={mobileFull} />}
            <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            width={dims.width}
            height={dims.height}
            alt={`Vollständige Website-Vorschau der Designstudie „${study.category}“: ${study.description}`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
              className="block h-auto w-full select-none"
            />
          </picture>
        </div>

        {/* Fortschrittsbalken */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-1.5 top-3 w-[3px] overflow-hidden rounded-full bg-ink/[0.07]"
        >
          <span
            ref={progressRef}
            className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-ink/45"
            style={{ transform: "scaleY(max(0.06, var(--progress, 0)))" }}
          />
        </span>

        {/* Hinweis (Maus/Trackpad) */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-ink/85 px-3.5 py-2 text-[0.75rem] font-medium text-cream shadow-lift backdrop-blur transition-opacity duration-500 pointer-fine:flex",
            scrolledOnce ? "opacity-0" : "opacity-100 group-hover/preview:opacity-0",
          )}
        >
          <Mouse className="size-3.5" />
          {studiesSection.scrollHint}
        </div>

        {/* Touch: Vorschau aktivieren */}
        {!active && (
          <button
            type="button"
            onClick={() => {
              setActive(true);
              scrollRef.current?.focus({ preventScroll: true });
            }}
            className="absolute inset-x-0 bottom-0 top-10 hidden items-end justify-center pb-5 pointer-coarse:flex"
            aria-controls={regionId}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-ink/90 px-4 py-2.5 text-[0.8rem] font-semibold text-cream shadow-lift">
              <Hand className="size-4" aria-hidden="true" />
              Tippen, um die Vorschau zu scrollen
            </span>
          </button>
        )}
        {active && (
          <button
            type="button"
            onClick={() => setActive(false)}
            className="absolute right-3 top-12 z-10 hidden items-center gap-1.5 rounded-full bg-ink/90 px-3 py-2 text-[0.75rem] font-semibold text-cream shadow-lift pointer-coarse:inline-flex"
          >
            <X className="size-3.5" aria-hidden="true" />
            Fertig
          </button>
        )}
      </BrowserFrame>

    </div>
  );
}
