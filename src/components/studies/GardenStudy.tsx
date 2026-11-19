import { GardenHero, GardenLeaves, GardenPath, GardenPlan, GardenWater } from "@/components/illustrations/garden";

/**
 * DESIGNSTUDIE „Garten & Landschaft“
 * Fiktives Unternehmen – alle Inhalte dienen nur der Veranschaulichung.
 */

const serif = "font-[family-name:var(--font-cormorant)]";
const sans = "font-[family-name:var(--font-jost)]";

const services = [
  { no: "01", title: "Gartenplanung", text: "Vom ersten Rundgang bis zum detaillierten Pflanzplan.", Art: GardenPlan },
  { no: "02", title: "Wege & Terrassen", text: "Natursteinflächen, die sich selbstverständlich einfügen.", Art: GardenPath },
  { no: "03", title: "Bepflanzung", text: "Stauden, Gräser und Gehölze für jede Jahreszeit.", Art: GardenLeaves },
  { no: "04", title: "Wasser & Stein", text: "Ruhige Wasserflächen als Mittelpunkt des Gartens.", Art: GardenWater },
];

const steps = [
  { no: "I", title: "Erstgespräch vor Ort", text: "Wir lernen Ihren Garten, Ihre Wünsche und die Besonderheiten des Grundstücks kennen." },
  { no: "II", title: "Entwurf & Pflanzplan", text: "Sie erhalten einen klaren Entwurf mit Materialien, Pflanzen und transparenter Kostenschätzung." },
  { no: "III", title: "Ausführung", text: "Unser Team setzt den Garten sorgfältig um – mit festen Ansprechpartnern." },
  { no: "IV", title: "Pflege", text: "Auf Wunsch begleiten wir Ihren Garten auch in den Jahren danach." },
];

export function GardenStudy() {
  return (
    <div className={`study-root overflow-x-clip ${sans} bg-[#F3EFE6] text-[#1F3A2E] antialiased`}>
      {/* Navigation */}
      <header className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-7 md:px-12">
        <div className="leading-none">
          <p className={`${serif} text-[1.7rem] font-semibold tracking-[-0.01em]`}>
            Muster <span className="italic font-normal">&amp;</span> Grün
          </p>
          <p className="mt-1 text-[0.62rem] uppercase tracking-[0.42em] text-[#5E7A5A]">Gartenarchitektur</p>
        </div>
        <nav className="hidden items-center gap-10 text-[0.82rem] uppercase tracking-[0.2em] lg:flex">
          <span>Leistungen</span>
          <span>Projekte</span>
          <span>Ablauf</span>
          <span>Kontakt</span>
        </nav>
        <span className="border border-[#1F3A2E] px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.22em] md:px-6 md:py-3 md:text-[0.72rem]">
          <span className="hidden sm:inline">Beratung anfragen</span>
          <span className="sm:hidden">Kontakt</span>
        </span>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1360px] px-6 pb-10 pt-10 md:px-12 md:pt-16">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-[#5E7A5A]">Planung · Gestaltung · Pflege</p>
            <h1 className={`${serif} mt-6 text-[3.6rem] font-medium leading-[0.92] tracking-[-0.025em] md:text-[7.4rem]`}>
              Gärten, die <span className="italic font-normal text-[#5E7A5A]">Ruhe</span> schenken.
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <p className="text-[1.05rem] leading-relaxed text-[#1F3A2E]/80">
              Wir gestalten Außenräume, die mit der Architektur Ihres Hauses ein Ganzes bilden – zeitlos, pflegeleicht und mit
              Liebe zum Detail.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <span className="bg-[#1F3A2E] px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-[#F3EFE6]">
                Projekte ansehen
              </span>
              <span className="border-b border-[#1F3A2E]/40 pb-1 text-[0.72rem] uppercase tracking-[0.22em]">Kontakt</span>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1360px] px-6 md:px-12">
        <div className="relative overflow-hidden">
          <GardenHero className="block aspect-[4/3] w-full md:aspect-[16/8]" title="Illustration: Privatgarten mit Pavillon und Wasserbecken" />
          <div className="absolute bottom-0 left-0 flex items-center gap-4 bg-[#F3EFE6] py-4 pl-0 pr-6 text-[0.7rem] uppercase tracking-[0.28em] md:pl-0">
            <span className="block h-px w-10 bg-[#1F3A2E]" />
            Konzept · Privatgarten am Hang
          </div>
        </div>
      </div>

      {/* Einleitung */}
      <section className="mx-auto grid max-w-[1360px] gap-14 px-6 py-24 md:grid-cols-12 md:px-12 md:py-36">
        <p className="text-[0.72rem] uppercase tracking-[0.36em] text-[#5E7A5A] md:col-span-3">Über uns</p>
        <div className="md:col-span-9">
          <p className={`${serif} text-[2.2rem] font-normal leading-[1.12] tracking-[-0.01em] md:text-[3.4rem]`}>
            Ein guter Garten fühlt sich an, als wäre er <em>schon immer</em> da gewesen. Genau daran arbeiten wir – mit Respekt
            vor dem Ort, ehrlichen Materialien und Pflanzen, die bleiben.
          </p>
          <div className="mt-16 grid gap-10 border-t border-[#1F3A2E]/15 pt-10 sm:grid-cols-3">
            {[
              ["Planung", "Durchdachte Entwürfe mit klarer Kostenschätzung."],
              ["Ausführung", "Sorgfältige Umsetzung durch ein festes Team."],
              ["Pflege", "Begleitung über viele Jahreszeiten hinweg."],
            ].map(([title, text]) => (
              <div key={title}>
                <p className={`${serif} text-[1.6rem] font-medium`}>{title}</p>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-[#1F3A2E]/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="mx-auto max-w-[1360px] px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#1F3A2E]/15 pb-8">
          <h2 className={`${serif} text-[3rem] font-medium leading-none tracking-[-0.02em] md:text-[4.6rem]`}>
            Unsere <span className="italic font-normal">Leistungen</span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-relaxed text-[#1F3A2E]/70">
            Alles aus einer Hand – von der ersten Skizze bis zur fertigen Bepflanzung.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ no, title, text, Art }, i) => (
            <article key={no} className={i % 2 ? "lg:mt-16" : ""}>
              <div className="overflow-hidden">
                <Art className="block aspect-[4/5] w-full" />
              </div>
              <p className="mt-6 text-[0.72rem] tracking-[0.3em] text-[#5E7A5A]">{no}</p>
              <h3 className={`${serif} mt-2 text-[1.9rem] font-medium leading-tight`}>{title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-[#1F3A2E]/70">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Projektgeschichte */}
      <section className="mt-28 bg-[#1F3A2E] text-[#F3EFE6] md:mt-40">
        <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-6 py-20 md:grid-cols-12 md:px-12 md:py-28">
          <div className="md:col-span-6">
            <GardenPath className="block aspect-[5/6] w-full" title="Illustration: Weg aus Trittplatten zwischen Gräsern" />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-[#C3CDB5]">Projekt im Fokus</p>
            <h2 className={`${serif} mt-6 text-[2.8rem] font-medium leading-[1.02] tracking-[-0.02em] md:text-[4rem]`}>
              Vom Entwurf bis zur <span className="italic font-normal">letzten Pflanze</span>.
            </h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-[#F3EFE6]/75">
              Ein Hanggrundstück, ein klarer Wunsch: mehr Ruhe, weniger Pflege. Mit Trittplatten aus hellem Kalkstein, Gräsern
              und einer schlichten Wasserfläche entstand ein Garten, der zu jeder Jahreszeit wirkt.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-[#F3EFE6]/15 pt-8">
              {[
                ["Fläche", "ca. 650 m²"],
                ["Schwerpunkt", "Wege & Gräser"],
                ["Material", "Kalkstein, Cortenstahl"],
                ["Pflege", "Ganzjährig"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-[#C3CDB5]">{k}</dt>
                  <dd className={`${serif} mt-2 text-[1.5rem]`}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="mx-auto max-w-[1360px] px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[0.72rem] uppercase tracking-[0.36em] text-[#5E7A5A]">Ablauf</p>
            <h2 className={`${serif} mt-6 text-[2.8rem] font-medium leading-[1.02] tracking-[-0.02em] md:text-[3.8rem]`}>
              In vier ruhigen <span className="italic font-normal">Schritten</span>.
            </h2>
          </div>
          <ol className="grid gap-x-12 gap-y-14 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {steps.map((step) => (
              <li key={step.no} className="border-t border-[#1F3A2E]/20 pt-6">
                <span className={`${serif} text-[2.4rem] italic text-[#5E7A5A]`}>{step.no}</span>
                <h3 className={`${serif} mt-3 text-[1.7rem] font-medium`}>{step.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-[#1F3A2E]/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Galerie */}
      <section className="mx-auto max-w-[1360px] px-6 md:px-12">
        <div className="grid gap-6 md:grid-cols-12">
          <GardenLeaves className="block aspect-[4/5] w-full md:col-span-4 md:aspect-auto md:h-full" />
          <div className="md:col-span-8">
            <GardenHero className="block aspect-[16/10] w-full" />
            <div className="mt-6 grid grid-cols-2 gap-6">
              <GardenWater className="block aspect-[4/3] w-full" />
              <div className="flex flex-col justify-between bg-[#D9CDB8] p-8">
                <p className={`${serif} text-[1.8rem] leading-tight`}>
                  „Natur braucht <em>Raum</em> – und einen Plan.“
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.28em]">Unsere Haltung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="mx-auto mt-28 max-w-[1360px] px-6 md:mt-40 md:px-12">
        <div className="grid gap-12 bg-[#1F3A2E] px-8 py-16 text-[#F3EFE6] md:grid-cols-12 md:px-16 md:py-24">
          <div className="md:col-span-7">
            <h2 className={`${serif} text-[3rem] font-medium leading-[0.98] tracking-[-0.02em] md:text-[5rem]`}>
              Erzählen Sie uns von <span className="italic font-normal">Ihrem Garten</span>.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#F3EFE6]/75">
              Wir nehmen uns Zeit für ein erstes, unverbindliches Gespräch – gern direkt bei Ihnen vor Ort.
            </p>
          </div>
          <div className="space-y-6 md:col-span-4 md:col-start-9">
            {[
              ["Name", "Ihr Name"],
              ["E-Mail", "ihre@email.de"],
              ["Ihr Vorhaben", "Neuanlage, Umgestaltung …"],
            ].map(([label, ph]) => (
              <div key={label} className="border-b border-[#F3EFE6]/30 pb-3">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#C3CDB5]">{label}</p>
                <p className="mt-2 text-[1rem] text-[#F3EFE6]/45">{ph}</p>
              </div>
            ))}
            <span className="inline-block bg-[#F3EFE6] px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-[#1F3A2E]">
              Anfrage senden
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-[1360px] px-6 py-14 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[#1F3A2E]/15 pt-10 text-[0.85rem] text-[#1F3A2E]/70">
          <p className={`${serif} text-[1.5rem] text-[#1F3A2E]`}>
            Muster <span className="italic">&amp;</span> Grün
          </p>
          <p>Musterstraße 12 · 12345 Musterstadt</p>
          <p>Impressum · Datenschutz</p>
        </div>
      </footer>
    </div>
  );
}
