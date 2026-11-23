import type { Metadata } from "next";
import Link from "next/link";
import { EmailImage } from "@/components/legal/EmailImage";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { company, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Offenlegung von ${site.shortName} – ${company.name}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum/" },
};

const registry: [string, string][] = (
  [
    ["Firmenbuchnummer", company.registryNumber],
    ["Firmenbuchgericht", company.registryCourt],
    ["UID-Nummer", company.vatId],
    ["Gewerbeberechtigung", company.trade],
    ["Gewerbebehörde", company.tradeAuthority],
    ["Kammerzugehörigkeit", company.chamber],
  ] as [string, string][]
).filter(([, value]) => Boolean(value));

const sections: LegalSection[] = [
  {
    id: "anbieter",
    title: "Medieninhaber & Diensteanbieter",
    content: (
      <>
        <p>
          <strong>{company.name}</strong>
          <br />
          {company.street}
          <br />
          {company.postalCode} {company.city}
          <br />
          {company.country}
        </p>
        <p>
          {site.domain} ist ein Angebot der {company.name}.
        </p>
      </>
    ),
  },
  {
    id: "kontakt",
    title: "Kontakt",
    content: (
      <dl>
        <dt>E-Mail</dt>
        <dd>
          <EmailImage />
        </dd>
        <dt>Telefon</dt>
        <dd>{company.phone}</dd>
      </dl>
    ),
  },
  {
    id: "unternehmen",
    title: "Angaben zum Unternehmen",
    content: (
      <>
        <dl>
          <dt>Firma</dt>
          <dd>{company.name}</dd>
          <dt>Rechtsform</dt>
          <dd>{company.legalForm}</dd>
          <dt>Geschäftsführung</dt>
          <dd>{company.managingDirectors.join(", ")}</dd>
          <dt>Anschrift</dt>
          <dd>
            {company.street}, {company.postalCode} {company.city}, {company.country}
          </dd>
          {registry.map(([label, value]) => (
            <div key={label} className="contents">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {!company.registryNumber && <p>{company.pendingNote}</p>}
      </>
    ),
  },
  {
    id: "offenlegung",
    title: "Offenlegung gemäß § 25 MedienG",
    content: (
      <dl>
        <dt>Medieninhaber</dt>
        <dd>
          {company.name}, {company.city}
        </dd>
        <dt>Unternehmensgegenstand</dt>
        <dd>{company.purpose}</dd>
        <dt>Grundlegende Richtung</dt>
        <dd>Information über die Leistungen von {site.domain} im Bereich Webdesign.</dd>
      </dl>
    ),
  },
  {
    id: "designstudien",
    title: "Hinweis zu den Designstudien",
    content: (
      <p>
        Die auf dieser Website gezeigten Designstudien sind unverbindliche Gestaltungskonzepte. Die darin dargestellten
        Unternehmen, Namen, Adressen, Preise und Inhalte sind frei erfunden und dienen ausschließlich der Veranschaulichung.
        Ähnlichkeiten mit tatsächlich existierenden Unternehmen sind zufällig.
      </p>
    ),
  },
  {
    id: "haftung",
    title: "Haftung für Inhalte und Links",
    content: (
      <>
        <p>
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
          Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Preisangaben verstehen sich als Einstiegspreise
          für den jeweils beschriebenen Leistungsumfang; verbindlich ist ausschließlich das individuelle Angebot.
        </p>
        <p>
          Sofern diese Website auf externe Websites verweist, haben wir auf deren Inhalte keinen Einfluss. Für diese Inhalte
          ist der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir entsprechende
          Links umgehend.
        </p>
      </>
    ),
  },
  {
    id: "urheberrecht",
    title: "Urheberrecht",
    content: (
      <p>
        Texte, Gestaltung, Illustrationen, Designstudien und Fotos dieser Website sind urheberrechtlich geschützt. Jede
        Verwendung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung der{" "}
        {company.name}. Die verwendeten Schriften stehen unter der SIL Open Font License.
      </p>
    ),
  },
];

export default function ImprintPage() {
  return (
    <LegalLayout
      title="Impressum"
      intro={
        <p>
          Informationen gemäß § 5 E-Commerce-Gesetz (ECG) und § 14 Unternehmensgesetzbuch (UGB) sowie Offenlegung gemäß § 25
          Mediengesetz (MedienG).
        </p>
      }
      sections={sections}
      footer={
        <p>
          Informationen zum Umgang mit personenbezogenen Daten findest du in der{" "}
          <Link href="/datenschutz/" className="text-ink underline decoration-sage decoration-2 underline-offset-4">
            Datenschutzerklärung
          </Link>
          .
        </p>
      }
    />
  );
}
