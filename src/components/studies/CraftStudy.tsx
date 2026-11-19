import { ArrowRight, ArrowUpRight, Clock, Hammer, Leaf, Ruler, ShieldCheck, Users } from "lucide-react";
import { CraftDeck, CraftFacade, CraftHero, CraftRafters, CraftWood } from "@/components/illustrations/craft";

/**
 * DESIGNSTUDIE „Handwerk & Bau“
 * Fiktives Unternehmen – alle Inhalte dienen nur der Veranschaulichung.
 */

const font = "font-[family-name:var(--font-archivo)]";
const wide = { fontStretch: "125%" } as React.CSSProperties;

const services = [
  { no: "01", title: "Dachstühle & Dachsanierung", text: "Neubau, Aufstockung und energetische Sanierung – sauber geplant und termingerecht umgesetzt." },
  { no: "02", title: "Holzrahmenbau", text: "Wohnhäuser, Anbauten und Gewerbebauten in moderner, nachhaltiger Holzbauweise." },
  { no: "03", title: "Carports & Terrassen", text: "Langlebige Konstruktionen aus heimischen Hölzern, die perfekt zum Haus passen." },
  { no: "04", title: "Fassaden & Innenausbau", text: "Holzfassaden, Dämmung und Innenausbau mit Blick fürs Detail." },
];

const projects = [
  { title: "Dachstuhl Neubau", tags: "Dach · Neubau", Art: CraftRafters },
  { title: "Fassade in Lärche", tags: "Fassade · Sanierung", Art: CraftFacade },
  { title: "Terrasse mit Überdachung", tags: "Außenbereich", Art: CraftDeck },
];

export function CraftStudy() {
  return (
    <div className={`study-root overflow-x-clip ${font} bg-[#FAFAF8] text-[#1E2124] antialiased`}>
      {/* Infoleiste */}
      <div className="hidden bg-[#141618] text-[0.78rem] text-white/60 md:block">
        <div className="mx-auto flex max-w-[1360px] justify-between px-12 py-2.5">
          <span>Zimmerei · Holzbau · Dachsanierung in der Region Musterstadt</span>
          <span className="flex gap-8">
            <span>Mo–Fr 7:00–17:00 Uhr</span>
            <span>Tel. 0000 000 000</span>
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#1E2124] text-white">
        <header className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-6 md:px-12">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center bg-[#B8693D]">
              <Hammer className="size-5 text-white" strokeWidth={2.2} />
            </span>
            <span className="text-[1.15rem] font-extrabold uppercase leading-none tracking-[0.02em]" style={wide}>
              Muster
              <br />
              <span className="text-[0.72rem] font-semibold tracking-[0.34em] text-white/60">Holzbau</span>
            </span>
          </div>
          <nav className="hidden items-center gap-9 text-[0.92rem] font-medium text-white/75 lg:flex">
            <span className="text-white">Leistungen</span>
            <span>Projekte</span>
            <span>Über uns</span>
            <span>Karriere</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-[#B8693D] px-4 py-2.5 text-[0.85rem] font-semibold md:px-5 md:py-3 md:text-[0.9rem]">
            <span className="hidden sm:inline">Angebot anfragen</span>
            <span className="sm:hidden">Anfrage</span> <ArrowRight className="size-4" />
          </span>
        </header>

        <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-12 md:px-12 md:pb-28 md:pt-16">
          <div className="md:col-span-6">
            <p className="inline-flex items-center gap-3 text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-[#D9A27A]">
              <span className="h-px w-10 bg-[#B8693D]" /> Ihr Holzbaubetrieb in der Region
            </p>
            <h1
              className="mt-7 text-[2.7rem] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] md:text-[5rem]"
              style={wide}
            >
              Gebaut für <span className="text-[#B8693D]">Gene&shy;rationen.</span>
            </h1>
            <p className="mt-8 max-w-lg text-[1.12rem] leading-relaxed text-white/70">
              Dachstühle, Holzrahmenbau und Sanierung – geplant mit Verstand, gebaut mit Präzision und übergeben mit einem
              guten Gefühl.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-3 bg-[#B8693D] px-7 py-4 font-semibold">
                Projekt besprechen <ArrowRight className="size-4" />
              </span>
              <span className="inline-flex items-center gap-3 border border-white/25 px-7 py-4 font-semibold">
                Leistungen ansehen
              </span>
            </div>
          </div>
          <div className="md:col-span-6">
            <CraftHero className="block aspect-[6/5] w-full" title="Illustration: Holzhaus halb gebaut, halb als Konstruktionszeichnung" />
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto grid max-w-[1360px] grid-cols-2 px-6 md:grid-cols-4 md:px-12">
            {[
              [Ruler, "Planung & Ausführung aus einer Hand"],
              [Users, "Feste Ansprechpartner"],
              [Leaf, "Heimische Hölzer"],
              [Clock, "Verlässliche Bauzeiten"],
            ].map(([Icon, label], i) => {
              const I = Icon as typeof Ruler;
              return (
                <div key={i} className="flex items-center gap-4 border-white/10 py-7 pr-4 md:border-l md:pl-8 md:first:border-l-0 md:first:pl-0">
                  <I className="size-6 shrink-0 text-[#D9A27A]" strokeWidth={1.6} />
                  <span className="text-[0.95rem] font-medium text-white/85">{label as string}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="mx-auto max-w-[1360px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-[#B8693D]">Leistungen</p>
            <h2 className="mt-5 text-[2.6rem] font-extrabold uppercase leading-[0.95] md:text-[3.4rem]" style={wide}>
              Was wir für Sie bauen.
            </h2>
            <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-[#1E2124]/65">
              Vom Dachstuhl bis zur Terrasse: Wir beraten ehrlich, planen sorgfältig und bauen so, dass es hält.
            </p>
          </div>
          <ul className="md:col-span-8">
            {services.map((s) => (
              <li key={s.no} className="grid grid-cols-[auto_1fr_auto] items-start gap-6 border-t border-[#1E2124]/12 py-8 last:border-b md:gap-10">
                <span className="text-[1.05rem] font-bold text-[#B8693D]">{s.no}</span>
                <div>
                  <h3 className="text-[1.5rem] font-bold leading-tight md:text-[1.85rem]">{s.title}</h3>
                  <p className="mt-2 max-w-xl text-[1rem] leading-relaxed text-[#1E2124]/65">{s.text}</p>
                </div>
                <span className="grid size-12 place-items-center border border-[#1E2124]/15">
                  <ArrowUpRight className="size-5" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Holzband */}
      <section className="relative">
        <CraftWood className="block h-[420px] w-full md:h-[520px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2124]/70 via-[#1E2124]/20 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-[1360px] flex-col justify-end px-6 pb-14 text-white md:px-12 md:pb-20">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-[#F0C9A6]">Unser Anspruch</p>
          <p className="mt-4 max-w-4xl text-[2.6rem] font-extrabold uppercase leading-[0.95] md:text-[4.6rem]" style={wide}>
            Präzision, die man sieht.
          </p>
        </div>
      </section>

      {/* Arbeitsweise */}
      <section className="bg-[#EFEDE8]">
        <div className="mx-auto max-w-[1360px] px-6 py-24 md:px-12 md:py-32">
          <h2 className="max-w-3xl text-[2.4rem] font-extrabold uppercase leading-[0.95] md:text-[3.4rem]" style={wide}>
            So arbeiten wir.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Beratung vor Ort", "Wir schauen uns Ihr Vorhaben persönlich an und beraten ehrlich zu Möglichkeiten und Kosten."],
              ["02", "Klares Angebot", "Sie erhalten ein transparentes Angebot mit allen Positionen – ohne Überraschungen."],
              ["03", "Saubere Ausführung", "Unser Team baut zuverlässig, hält die Baustelle sauber und übergibt pünktlich."],
            ].map(([no, title, text]) => (
              <div key={no} className="bg-white p-8 md:p-10">
                <p className="text-[3.6rem] font-extrabold leading-none text-[#B8693D]" style={wide}>
                  {no}
                </p>
                <h3 className="mt-8 text-[1.4rem] font-bold">{title}</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-[#1E2124]/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projekte */}
      <section className="mx-auto max-w-[1360px] px-6 py-24 md:px-12 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-[#B8693D]">Projektbeispiele</p>
            <h2 className="mt-5 text-[2.4rem] font-extrabold uppercase leading-[0.95] md:text-[3.4rem]" style={wide}>
              Aus unserer Werkstatt.
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 border-b-2 border-[#B8693D] pb-1 font-semibold">
            Alle Projekte <ArrowRight className="size-4" />
          </span>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map(({ title, tags, Art }, i) => (
            <article key={title} className={i === 1 ? "md:translate-y-12" : ""}>
              <Art className="block aspect-[4/5] w-full" />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[#1E2124]/50">{tags}</p>
                  <h3 className="mt-2 text-[1.35rem] font-bold">{title}</h3>
                </div>
                <ArrowUpRight className="mt-1 size-5 text-[#B8693D]" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Karriere */}
      <section className="mx-auto mt-6 max-w-[1360px] px-6 md:px-12">
        <div className="grid items-center gap-8 bg-[#B8693D] px-8 py-14 text-white md:grid-cols-12 md:px-14 md:py-16">
          <div className="md:col-span-8">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-white/70">Karriere</p>
            <h2 className="mt-4 text-[2.2rem] font-extrabold uppercase leading-[0.95] md:text-[3rem]" style={wide}>
              Verstärken Sie unser Team.
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] text-white/80">
              Zimmerer (m/w/d) und Auszubildende gesucht – mit fairen Bedingungen und spannenden Projekten.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <span className="inline-flex items-center gap-3 bg-[#1E2124] px-7 py-4 font-semibold">
              Offene Stellen <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </section>

      {/* Anfrage */}
      <section className="mt-24 bg-[#1E2124] text-white md:mt-32">
        <div className="mx-auto grid max-w-[1360px] gap-14 px-6 py-24 md:grid-cols-12 md:px-12 md:py-28">
          <div className="md:col-span-5">
            <h2 className="text-[2.6rem] font-extrabold uppercase leading-[0.92] md:text-[3.8rem]" style={wide}>
              Ihr Projekt. <span className="text-[#B8693D]">Unser Handwerk.</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-white/65">
              Beschreiben Sie kurz Ihr Vorhaben – wir melden uns zeitnah für einen Termin vor Ort.
            </p>
            <div className="mt-10 space-y-3 text-white/80">
              <p className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-[#D9A27A]" /> Kostenlose Erstberatung
              </p>
              <p className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-[#D9A27A]" /> Transparentes Angebot
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:col-span-6 md:col-start-7 md:grid-cols-2">
            {["Name", "Telefon", "E-Mail", "Ort des Bauvorhabens"].map((label) => (
              <div key={label} className="border border-white/15 px-5 py-4">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white/45">{label}</p>
              </div>
            ))}
            <div className="h-36 border border-white/15 px-5 py-4 md:col-span-2">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white/45">Ihr Vorhaben</p>
            </div>
            <span className="inline-flex w-fit items-center gap-3 bg-[#B8693D] px-7 py-4 font-semibold">
              Anfrage senden <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-4 px-6 py-8 text-[0.85rem] text-white/45 md:px-12">
            <span className="font-bold uppercase text-white/80" style={wide}>
              Muster Holzbau
            </span>
            <span>Musterweg 5 · 12345 Musterstadt</span>
            <span>Impressum · Datenschutz</span>
          </div>
        </footer>
      </section>
    </div>
  );
}
