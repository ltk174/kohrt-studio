"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BarChart3, Gauge, Inbox, TrendingUp, Users } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichTitle } from "@/components/ui/RichTitle";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { successStories } from "@/config/site";
import { cn } from "@/lib/format";

type Story = (typeof successStories.items)[number];

const fmt = new Intl.NumberFormat("de-DE");
const months = successStories.months;
const relaunch = successStories.relaunchIndex;

function average(values: readonly number[]) {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** Durchschnitt vor dem Relaunch vs. Durchschnitt der letzten drei Monate */
function growth(values: readonly number[]) {
  const before = average(values.slice(0, relaunch));
  const after = average(values.slice(-3));
  return { before: Math.round(before), after: Math.round(after), percent: Math.round((after / before - 1) * 100) };
}

function niceMax(value: number) {
  const step = value > 500 ? 250 : value > 50 ? 25 : 5;
  return Math.ceil((value * 1.08) / step) * step;
}

/** Breite eines Elements beobachten, damit Diagramme in echten Pixeln zeichnen */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(320);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/* ------------------------------------------------------------------ */
/* Flächendiagramm: Websitebesuche                                     */
/* ------------------------------------------------------------------ */

function VisitsChart({ values }: { values: readonly number[] }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  const gradientId = useId();
  const height = 200;
  const pad = { top: 26, right: 12, bottom: 26, left: 40 };
  const max = niceMax(Math.max(...values));
  const innerW = Math.max(10, width - pad.left - pad.right);
  const innerH = height - pad.top - pad.bottom;
  const x = (i: number) => pad.left + (innerW / (values.length - 1)) * i;
  const y = (v: number) => pad.top + innerH - (v / max) * innerH;
  const line = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(values.length - 1).toFixed(1)} ${y(0)} L${x(0).toFixed(1)} ${y(0)} Z`;
  const relaunchX = (x(relaunch - 1) + x(relaunch)) / 2;
  const ticks = [0, max / 2, max];

  const onPointer = (event: React.PointerEvent<SVGRectElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rel = event.clientX - rect.left;
    const index = Math.round((rel / rect.width) * (values.length - 1));
    setActive(Math.max(0, Math.min(values.length - 1, index)));
  };

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") setActive((a) => Math.min(values.length - 1, (a ?? -1) + 1));
    if (event.key === "ArrowLeft") setActive((a) => Math.max(0, (a ?? values.length) - 1));
    if (event.key === "Escape") setActive(null);
  };

  return (
    <div
      ref={ref}
      className="relative w-full min-w-0 overflow-visible rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-forest"
      tabIndex={0}
      role="img"
      aria-label="Websitebesuche pro Monat, Pfeiltasten zeigen die Monatswerte"
      onKeyDown={onKey}
      onBlur={() => setActive(null)}
    >
      <svg width={width} height={height} className="block overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#34483D" stopOpacity="0.18" />
            <stop offset="1" stopColor="#34483D" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Zeitraum vor dem Relaunch dezent hinterlegt */}
        <rect x={pad.left} y={pad.top} width={relaunchX - pad.left} height={innerH} fill="#202522" opacity="0.025" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke="#202522" strokeOpacity="0.08" />
            <text x={pad.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6b736e">
              {fmt.format(t)}
            </text>
          </g>
        ))}
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke="#34483D" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <line x1={relaunchX} x2={relaunchX} y1={pad.top - 6} y2={y(0)} stroke="#202522" strokeOpacity="0.45" strokeDasharray="3 4" />
        <g transform={`translate(${relaunchX} ${pad.top - 14})`}>
          <rect x="-34" y="-9" width="68" height="18" rx="9" fill="#202522" />
          <text textAnchor="middle" y="4" fontSize="10.5" fontWeight="600" fill="#F8F7F3">
            Relaunch
          </text>
        </g>
        {months.map((m, i) =>
          width < 420 && i % 2 === 1 ? null : (
            <text key={m} x={x(i)} y={height - 6} textAnchor="middle" fontSize="11" fill="#6b736e">
              {m}
            </text>
          ),
        )}
        {active !== null && (
          <g>
            <line x1={x(active)} x2={x(active)} y1={pad.top} y2={y(0)} stroke="#202522" strokeOpacity="0.25" />
            <circle cx={x(active)} cy={y(values[active])} r="5" fill="#34483D" stroke="#FFFEFB" strokeWidth="2" />
          </g>
        )}
        <rect
          x={pad.left}
          y={pad.top}
          width={innerW}
          height={innerH}
          fill="transparent"
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onPointerLeave={() => setActive(null)}
        />
      </svg>
      {active !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl bg-ink px-3 py-2 text-[0.78rem] text-cream shadow-lift"
          style={{ left: Math.min(Math.max(x(active), 70), width - 70), top: y(values[active]) - 10 }}
        >
          <span className="block text-cream/60">
            {months[active]} · {active < relaunch ? "vor Relaunch" : "nach Relaunch"}
          </span>
          <span className="font-display font-semibold">{fmt.format(values[active])} Besuche</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Balkendiagramm: Anfragen                                            */
/* ------------------------------------------------------------------ */

function InquiriesChart({ values }: { values: readonly number[] }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  const height = 130;
  const pad = { top: 10, right: 12, bottom: 24, left: 40 };
  const max = niceMax(Math.max(...values));
  const innerW = Math.max(10, width - pad.left - pad.right);
  const innerH = height - pad.top - pad.bottom;
  const slot = innerW / values.length;
  const barW = Math.max(4, slot - 4);
  const y = (v: number) => pad.top + innerH - (v / max) * innerH;

  const bar = (i: number, v: number) => {
    const left = pad.left + slot * i + (slot - barW) / 2;
    const top = y(v);
    const bottom = y(0);
    const r = Math.min(4, barW / 2, bottom - top);
    return `M${left} ${bottom}V${top + r}Q${left} ${top} ${left + r} ${top}H${left + barW - r}Q${left + barW} ${top} ${left + barW} ${top + r}V${bottom}Z`;
  };

  return (
    <div ref={ref} className="relative w-full min-w-0">
      <svg width={width} height={height} className="block overflow-visible" aria-hidden="true">
        {[0, max].map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke="#202522" strokeOpacity="0.08" />
            <text x={pad.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6b736e">
              {t}
            </text>
          </g>
        ))}
        {values.map((v, i) => (
          <g key={i} onPointerEnter={() => setActive(i)} onPointerLeave={() => setActive(null)}>
            <rect x={pad.left + slot * i} y={pad.top} width={slot} height={innerH} fill="transparent" />
            <path d={bar(i, v)} fill={i < relaunch ? "#202522" : "#34483D"} fillOpacity={i < relaunch ? 0.16 : active === i ? 0.85 : 1} />
          </g>
        ))}
        {months.map((m, i) =>
          width < 420 && i % 2 === 1 ? null : (
            <text key={m} x={pad.left + slot * i + slot / 2} y={height - 6} textAnchor="middle" fontSize="11" fill="#6b736e">
              {m}
            </text>
          ),
        )}
      </svg>
      {active !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl bg-ink px-3 py-2 text-[0.78rem] text-cream shadow-lift"
          style={{ left: Math.min(Math.max(pad.left + slot * active + slot / 2, 70), width - 70), top: y(values[active]) - 8 }}
        >
          <span className="block text-cream/60">{months[active]}</span>
          <span className="font-display font-semibold">{values[active]} Anfragen</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard-Karte                                                     */
/* ------------------------------------------------------------------ */

function Dashboard({ story }: { story: Story }) {
  const visits = growth(story.visits);
  const inquiries = growth(story.inquiries);
  const tiles = [
    { icon: Users, label: "Besuche / Monat", from: fmt.format(visits.before), to: fmt.format(visits.after), delta: visits.percent },
    { icon: Inbox, label: "Anfragen / Monat", from: String(inquiries.before), to: String(inquiries.after), delta: inquiries.percent },
    { icon: Gauge, label: "Ladezeit", from: story.loadTime.before, to: story.loadTime.after, delta: null },
  ];

  return (
    <div className="overflow-hidden rounded-[var(--radius-window)] border border-ink/10 bg-paper shadow-window">
      <div className="flex items-center justify-between gap-3 border-b border-ink/[0.07] bg-[#F3F1EC] px-4 py-2.5">
        <div className="flex items-center gap-2 text-[0.8rem] font-semibold text-ink">
          <BarChart3 className="size-4 text-forest" aria-hidden="true" />
          Besucherstatistik
        </div>
        <div className="flex items-center gap-2">
          {successStories.placeholder && <PlaceholderBadge>Beispieldaten</PlaceholderBadge>}
          <span className="hidden rounded-full bg-paper px-2.5 py-1 text-[0.72rem] text-ink-muted ring-1 ring-ink/[0.06] sm:inline">12 Monate</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <dl className="grid grid-cols-3 gap-2 sm:gap-3">
          {tiles.map(({ icon: Icon, label, from, to, delta }) => (
            <div key={label} className="rounded-2xl bg-cream p-3 sm:p-4">
              <dt className="flex items-center gap-1.5 text-[0.7rem] leading-tight text-ink-muted sm:text-[0.78rem]">
                <Icon className="hidden size-3.5 sm:block" aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-2">
                <span className="block font-display text-[1.25rem] font-semibold leading-none tracking-tight text-ink sm:text-[1.6rem]">
                  {to}
                </span>
                <span className="mt-1.5 block text-[0.72rem] text-ink-muted">vorher {from}</span>
                {delta !== null && (
                  <span className="mt-2 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-mint px-2 py-0.5 text-[0.72rem] font-semibold text-forest">
                    <TrendingUp className="size-3" aria-hidden="true" />+{delta} %
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <p className="text-[0.85rem] font-semibold text-ink">Websitebesuche pro Monat</p>
          <div className="mt-2">
            <VisitsChart values={story.visits} />
          </div>
        </div>

        <div className="mt-5 border-t border-line pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.85rem] font-semibold text-ink">Anfragen pro Monat</p>
            <p className="flex items-center gap-3 text-[0.75rem] text-ink-muted">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-ink/15" aria-hidden="true" /> vor Relaunch
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-forest" aria-hidden="true" /> nach Relaunch
              </span>
            </p>
          </div>
          <div className="mt-2">
            <InquiriesChart values={story.inquiries} />
          </div>
        </div>

        {/* Tabellenansicht für Screenreader */}
        <table className="sr-only">
          <caption>Monatswerte {story.category}</caption>
          <thead>
            <tr>
              <th scope="col">Monat</th>
              <th scope="col">Besuche</th>
              <th scope="col">Anfragen</th>
            </tr>
          </thead>
          <tbody>
            {months.map((m, i) => (
              <tr key={m}>
                <th scope="row">
                  {m}
                  {i === relaunch ? " (Relaunch)" : ""}
                </th>
                <td>{story.visits[i]}</td>
                <td>{story.inquiries[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sektion                                                             */
/* ------------------------------------------------------------------ */

export function SuccessStories({ className }: { className?: string }) {
  const [activeKey, setActiveKey] = useState<string>(successStories.items[0].key);
  const story = successStories.items.find((item) => item.key === activeKey) ?? successStories.items[0];
  const tabsId = useId();

  const onTabKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = successStories.items.findIndex((item) => item.key === activeKey);
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = successStories.items[(index + delta + successStories.items.length) % successStories.items.length];
    setActiveKey(next.key);
    document.getElementById(`${tabsId}-tab-${next.key}`)?.focus();
  };

  return (
    <section aria-labelledby="erfolge-title" className={cn("py-24 sm:py-32", className)}>
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div data-reveal>
              <Eyebrow>{successStories.eyebrow}</Eyebrow>
            </div>
            <h2 id="erfolge-title" data-reveal className="mt-5 text-display-md font-semibold text-ink">
              <RichTitle text={successStories.headline} />
            </h2>
          </div>
          <p data-reveal className="self-end text-lead text-ink-soft lg:col-span-4 lg:col-start-9">
            {successStories.intro}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Erfolgsgeschichten nach Branche"
          onKeyDown={onTabKey}
          data-reveal
          className="mt-12 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {successStories.items.map((item) => {
            const selected = item.key === activeKey;
            return (
              <button
                key={item.key}
                id={`${tabsId}-tab-${item.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${tabsId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveKey(item.key)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-[0.92rem] font-semibold transition-colors",
                  selected ? "border-ink bg-ink text-cream" : "border-line-strong text-ink-soft hover:bg-mint hover:text-ink",
                )}
              >
                {item.category}
              </button>
            );
          })}
        </div>

        <div
          id={`${tabsId}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-${story.key}`}
          className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div key={story.key} className="wizard-step min-w-0 lg:col-span-5">
            <p className="font-display text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-forest">{story.category}</p>
            <h3 className="mt-3 text-display-sm font-semibold text-ink">{story.title}</h3>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">Ausgangslage</dt>
                <dd className="mt-2 text-ink-soft">{story.challenge}</dd>
              </div>
              <div>
                <dt className="font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">Lösung</dt>
                <dd className="mt-2 text-ink-soft">{story.solution}</dd>
              </div>
            </dl>
            <blockquote className="mt-8 border-l-2 border-sage pl-5 font-display text-[1.2rem] font-medium leading-snug tracking-[-0.02em] text-ink">
              „{story.quote}“
              {successStories.placeholder && <PlaceholderBadge className="mt-3 flex w-fit">Platzhalter-Zitat</PlaceholderBadge>}
            </blockquote>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <Dashboard key={story.key} story={story} />
          </div>
        </div>
      </div>
    </section>
  );
}
