import { BeautyBowl, BeautyLight, BeautyStillLife, BeautyTowels } from "@/components/illustrations/beauty";

/**
 * DESIGNSTUDIE „Beauty & Lifestyle“
 * Fiktives Unternehmen – alle Inhalte dienen nur der Veranschaulichung.
 */

const serif = "font-[family-name:var(--font-bodoni)]";
const sans = "font-[family-name:var(--font-jost)]";

const treatments = [
  { name: "Klassische Gesichtsbehandlung", time: "60 Min.", price: "79 €" },
  { name: "Feuchtigkeitsbehandlung", time: "75 Min.", price: "95 €" },
  { name: "Augenbrauen & Wimpern", time: "45 Min.", price: "49 €" },
  { name: "Entspannende Gesichtsmassage", time: "30 Min.", price: "39 €" },
  { name: "Maniküre mit Pflege", time: "50 Min.", price: "45 €" },
];

const hours = [
  ["Montag", "Geschlossen"],
  ["Dienstag – Freitag", "10:00 – 19:00"],
  ["Samstag", "09:00 – 14:00"],
];

export function BeautyStudy() {
  return (
    <div className={`study-root overflow-x-clip ${sans} bg-[#F4ECE4] text-[#3B2F2C] antialiased`}>
      {/* Navigation */}
      <header className="mx-auto grid max-w-[1360px] grid-cols-[1fr_auto_1fr] items-center px-6 py-7 md:px-12">
        <nav className="hidden gap-9 text-[0.9rem] tracking-[0.04em] md:flex">
          <span>Behandlungen</span>
          <span>Studio</span>
          <span>Preise</span>
        </nav>
        <div className="col-start-1 text-left md:col-start-2 md:text-center">
          <p className={`${serif} text-[1.9rem] italic leading-none`}>Studio Muster</p>
          <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.44em] text-[#B0776A]">Kosmetik &amp; Hautpflege</p>
        </div>
        <div className="col-start-3 flex justify-end">
          <span className="rounded-full bg-[#3B2F2C] px-6 py-3 text-[0.82rem] tracking-[0.06em] text-[#F4ECE4]">Termin buchen</span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-[1360px] items-center gap-12 px-6 pb-20 pt-8 md:grid-cols-12 md:px-12 md:pb-28 md:pt-12">
        <div className="md:col-span-6">
          <p className="text-[0.72rem] uppercase tracking-[0.4em] text-[#B0776A]">Kosmetikstudio in Musterstadt</p>
          <h1 className={`${serif} mt-8 text-[4.2rem] font-normal leading-[0.9] tracking-[-0.03em] md:text-[8.2rem]`}>
            Zeit für <span className="italic text-[#B0776A]">dich.</span>
          </h1>
          <p className="mt-8 max-w-md text-[1.1rem] leading-[1.75] text-[#3B2F2C]/75">
            Individuelle Behandlungen, hochwertige Pflege und eine Atmosphäre, in der du wirklich abschalten kannst.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <span className="rounded-full bg-[#3B2F2C] px-8 py-4 text-[0.88rem] tracking-[0.06em] text-[#F4ECE4]">
              Termin vereinbaren
            </span>
            <span className="border-b border-[#3B2F2C]/40 pb-1 text-[0.88rem] tracking-[0.06em]">Behandlungen entdecken</span>
          </div>
        </div>
        <div className="relative md:col-span-5 md:col-start-8">
          <div className="overflow-hidden rounded-t-full">
            <BeautyStillLife className="block aspect-[4/5] w-full" title="Illustration: Pflegeprodukte auf einem Sockel" />
          </div>
          <div className="absolute -left-8 bottom-12 hidden size-36 place-items-center rounded-full bg-[#FBF7F2] text-center shadow-[0_20px_50px_-20px_rgba(59,47,44,0.35)] md:grid">
            <p className={`${serif} text-[1.05rem] italic leading-snug`}>
              Termine
              <br />
              auch samstags
            </p>
          </div>
        </div>
      </section>

      {/* Laufband */}
      <div className="overflow-hidden border-y border-[#3B2F2C]/10 bg-[#EAD3C9] py-6">
        <p className={`${serif} whitespace-nowrap text-[1.8rem] italic md:text-[2.2rem]`}>
          Gesichtsbehandlung <span className="mx-6 text-[#B0776A]">✦</span> Augenbrauen &amp; Wimpern{" "}
          <span className="mx-6 text-[#B0776A]">✦</span> Massage <span className="mx-6 text-[#B0776A]">✦</span> Maniküre{" "}
          <span className="mx-6 text-[#B0776A]">✦</span> Hautberatung <span className="mx-6 text-[#B0776A]">✦</span> Gesichtsbehandlung
        </p>
      </div>

      {/* Behandlungen */}
      <section className="mx-auto grid max-w-[1360px] items-center gap-14 px-6 py-24 md:grid-cols-12 md:px-12 md:py-36">
        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-t-full">
            <BeautyTowels className="block aspect-[4/5] w-full" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-[0.72rem] uppercase tracking-[0.4em] text-[#B0776A]">Behandlungen &amp; Preise</p>
          <h2 className={`${serif} mt-6 text-[3rem] font-normal leading-[0.98] tracking-[-0.02em] md:text-[4.4rem]`}>
            Pflege, die zu <span className="italic">dir</span> passt.
          </h2>
          <ul className="mt-12">
            {treatments.map((t) => (
              <li key={t.name} className="flex items-baseline gap-4 border-b border-[#3B2F2C]/12 py-5">
                <span className={`${serif} text-[1.35rem] md:text-[1.5rem]`}>{t.name}</span>
                <span className="hidden flex-1 border-b border-dotted border-[#3B2F2C]/30 sm:block" />
                <span className="ml-auto shrink-0 text-[0.85rem] text-[#3B2F2C]/55 sm:ml-0">{t.time}</span>
                <span className={`${serif} w-16 shrink-0 text-right text-[1.35rem]`}>{t.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.85rem] text-[#3B2F2C]/55">Alle Preise inkl. MwSt. · Beispielhafte Angaben</p>
        </div>
      </section>

      {/* Philosophie */}
      <section className="bg-[#3B2F2C] text-[#F4ECE4]">
        <div className="mx-auto max-w-[1100px] px-6 py-28 text-center md:py-40">
          <p className="text-[0.72rem] uppercase tracking-[0.4em] text-[#D9B5A8]">Unsere Philosophie</p>
          <p className={`${serif} mt-10 text-[2.4rem] font-normal leading-[1.12] md:text-[3.8rem]`}>
            Schönheit braucht keine Eile. Sie braucht <span className="italic text-[#D9B5A8]">Aufmerksamkeit</span>, gute Produkte
            und einen Ort zum Durchatmen.
          </p>
        </div>
      </section>

      {/* Studio */}
      <section className="mx-auto max-w-[1360px] px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <BeautyLight className="block aspect-[4/5] w-full" />
          </div>
          <div className="flex flex-col justify-between gap-10 md:col-span-6 md:col-start-7">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.4em] text-[#B0776A]">Das Studio</p>
              <h2 className={`${serif} mt-6 text-[3rem] font-normal leading-[0.98] tracking-[-0.02em] md:text-[4.2rem]`}>
                Ein Ort zum <span className="italic">Ankommen</span>.
              </h2>
              <p className="mt-6 max-w-md text-[1.05rem] leading-[1.75] text-[#3B2F2C]/75">
                Helles Licht, natürliche Materialien und ruhige Farben: Unser Studio ist bewusst schlicht gestaltet, damit du
                dich ganz auf dich konzentrieren kannst.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <BeautyBowl className="block aspect-square w-full rounded-full" />
              <div className="flex flex-col justify-end">
                <p className={`${serif} text-[1.6rem] italic leading-snug`}>„Weniger, aber besser.“</p>
                <p className="mt-3 text-[0.72rem] uppercase tracking-[0.32em] text-[#B0776A]">Unser Leitsatz</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Öffnungszeiten & Termin */}
      <section className="mx-auto max-w-[1360px] px-6 md:px-12">
        <div className="grid gap-12 rounded-[2rem] bg-[#EAD3C9] px-8 py-14 md:grid-cols-2 md:px-16 md:py-20">
          <div>
            <h2 className={`${serif} text-[3rem] font-normal leading-[0.98] tracking-[-0.02em] md:text-[4.4rem]`}>
              Wir freuen uns auf <span className="italic">dich</span>.
            </h2>
            <span className="mt-10 inline-block rounded-full bg-[#3B2F2C] px-8 py-4 text-[0.88rem] tracking-[0.06em] text-[#F4ECE4]">
              Termin anfragen
            </span>
          </div>
          <dl className="self-end">
            {hours.map(([day, time]) => (
              <div key={day} className="flex justify-between border-b border-[#3B2F2C]/15 py-4 text-[1.05rem]">
                <dt>{day}</dt>
                <dd className={`${serif} text-[1.2rem]`}>{time}</dd>
              </div>
            ))}
            <p className="mt-6 text-[0.95rem] text-[#3B2F2C]/65">Musterallee 8 · 12345 Musterstadt</p>
          </dl>
        </div>
      </section>

      <footer className="mx-auto max-w-[1360px] px-6 py-14 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-6 text-[0.85rem] text-[#3B2F2C]/60">
          <p className={`${serif} text-[1.4rem] italic text-[#3B2F2C]`}>Studio Muster</p>
          <p>Instagram · Newsletter</p>
          <p>Impressum · Datenschutz</p>
        </div>
      </footer>
    </div>
  );
}
