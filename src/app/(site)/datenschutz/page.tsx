import type { Metadata } from "next";
import Link from "next/link";
import { EmailImage } from "@/components/legal/EmailImage";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { company, privacy, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${site.shortName} – welche Daten wir verarbeiten und welche Rechte du hast.`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz/" },
};

const sections: LegalSection[] = [
  {
    id: "verantwortlicher",
    title: "Verantwortlicher",
    content: (
      <>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
        <p>
          <strong>{company.name}</strong>
          <br />
          {company.street}
          <br />
          {company.postalCode} {company.city}, {company.country}
          <br />
          E-Mail: <EmailImage />
        </p>
        <p>
          Weitere Angaben findest du im{" "}
          <Link href="/impressum/">Impressum</Link>.
        </p>
      </>
    ),
  },
  {
    id: "ueberblick",
    title: "Das Wichtigste in Kürze",
    content: (
      <ul>
        <li>Diese Website verwendet keine Cookies.</li>
        <li>Es gibt keine Analyse- oder Tracking-Tools, keine Werbe-Netzwerke und keine Social-Media-Plugins.</li>
        <li>Schriften werden direkt von unserem Server geladen – es besteht keine Verbindung zu Google Fonts.</li>
        <li>
          Personenbezogene Daten verarbeiten wir nur, wenn du uns über das Anfrage-Formular oder per E-Mail kontaktierst,
          sowie in Form technisch notwendiger Server-Logfiles.
        </li>
      </ul>
    ),
  },
  {
    id: "hosting",
    title: "Hosting und Server-Logfiles",
    content: (
      <>
        <p>
          Diese Website wird bei <strong>{privacy.hosting.name}</strong>, {privacy.hosting.address}, gehostet. Beim Aufruf der
          Website werden technisch notwendige Daten automatisch in sogenannten Server-Logfiles verarbeitet:
        </p>
        <ul>
          <li>IP-Adresse des anfragenden Geräts</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>aufgerufene Seite bzw. Datei und übertragene Datenmenge</li>
          <li>Referrer-URL (zuvor besuchte Seite)</li>
          <li>verwendeter Browser und Betriebssystem</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt, um die Website sicher und stabil auszuliefern und Angriffe abzuwehren. Rechtsgrundlage ist
          unser berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Die Logfiles werden vom Hosting-Anbieter nur für
          kurze Zeit gespeichert und anschließend gelöscht.
        </p>
        <p>
          Der Hosting-Anbieter hat seinen Sitz in den USA. Für die Übermittlung personenbezogener Daten in die USA stützen wir
          uns auf den Angemessenheitsbeschluss der Europäischen Kommission zum EU-US Data Privacy Framework (Art. 45 DSGVO),
          soweit der Anbieter danach zertifiziert ist, sowie auf Standardvertragsklauseln (Art. 46 DSGVO). Weitere
          Informationen: <a href={privacy.hosting.url}>Datenschutzerklärung von {privacy.hosting.name}</a>.
        </p>
      </>
    ),
  },
  {
    id: "anfrage",
    title: "Anfrage-Formular (kostenloser Erstentwurf)",
    content: (
      <>
        <p>Wenn du uns über das Anfrage-Formular kontaktierst, verarbeiten wir die Angaben, die du dort machst:</p>
        <ul>
          <li>Name, Name des Unternehmens und E-Mail-Adresse</li>
          <li>optional: Ort bzw. Region, bestehende Website und eine kurze Nachricht</li>
          <li>deine Auswahl zu Projektart, Branche, Zielen, Stil, gewünschten Bereichen, Zeitrahmen und Budget</li>
        </ul>
        <p>
          Wir verwenden diese Daten ausschließlich, um deine Anfrage zu bearbeiten, deinen kostenlosen Erstentwurf zu
          erstellen und dir gegebenenfalls ein Angebot zu machen. Rechtsgrundlage ist die Durchführung vorvertraglicher
          Maßnahmen auf deine Anfrage hin (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
        <h3>Formular-Dienst {privacy.formService.name}</h3>
        <p>
          Da diese Website keinen eigenen Server für Formulare betreibt, werden deine Angaben beim Absenden verschlüsselt an
          den Dienst {privacy.formService.name} (<a href={privacy.formService.url}>{privacy.formService.url.replace("https://", "")}</a>)
          übermittelt, der sie per E-Mail an uns weiterleitet. Dabei können Daten auch auf Servern außerhalb der
          Europäischen Union verarbeitet werden. Rechtsgrundlage für den Einsatz des Dienstes ist unser berechtigtes Interesse
          an einer einfachen und sicheren Kontaktmöglichkeit (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <h3>Erstellung des Erstentwurfs</h3>
        <p>
          Zur Gestaltung des Erstentwurfs können wir die Projektangaben (ohne deinen Namen und deine E-Mail-Adresse) auch mit
          Unterstützung digitaler, KI-gestützter Werkzeuge verarbeiten. Der Entwurf wird anschließend von uns geprüft und
          überarbeitet.
        </p>
      </>
    ),
  },
  {
    id: "email",
    title: "Kontakt per E-Mail",
    content: (
      <p>
        Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine E-Mail-Adresse und die Inhalte deiner Nachricht, um dein
        Anliegen zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern deine Anfrage auf einen Vertrag
        abzielt, ansonsten unser berechtigtes Interesse an der Beantwortung (Art. 6 Abs. 1 lit. f DSGVO).
      </p>
    ),
  },
  {
    id: "speicherdauer",
    title: "Speicherdauer",
    content: (
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist. Kommt kein
        Auftrag zustande, löschen wir Anfragen spätestens zwölf Monate nach dem letzten Kontakt. Kommt ein Auftrag zustande,
        bewahren wir die Daten im Rahmen der gesetzlichen Aufbewahrungspflichten auf (insbesondere sieben Jahre gemäß § 132
        Bundesabgabenordnung).
      </p>
    ),
  },
  {
    id: "sicherheit",
    title: "Datensicherheit",
    content: (
      <p>
        Diese Website wird ausschließlich verschlüsselt über HTTPS (TLS) ausgeliefert. Auch das Anfrage-Formular überträgt
        deine Angaben verschlüsselt. Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt.
      </p>
    ),
  },
  {
    id: "rechte",
    title: "Deine Rechte",
    content: (
      <>
        <p>Dir stehen hinsichtlich deiner personenbezogenen Daten folgende Rechte zu:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Wende dich dazu einfach per E-Mail an <EmailImage />.
        </p>
        <p>
          Wenn du der Ansicht bist, dass die Verarbeitung deiner Daten gegen das Datenschutzrecht verstößt, kannst du dich bei
          der Aufsichtsbehörde beschweren. In Österreich ist das die <strong>Österreichische Datenschutzbehörde</strong>,
          Barichgasse 40–42, 1030 Wien, <a href="https://www.dsb.gv.at">www.dsb.gv.at</a>.
        </p>
      </>
    ),
  },
  {
    id: "aenderungen",
    title: "Änderungen dieser Datenschutzerklärung",
    content: (
      <p>
        Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die rechtlichen Vorgaben ändern. Es gilt die
        jeweils hier veröffentlichte Fassung.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      intro={
        <p>
          Der Schutz deiner Daten ist uns wichtig. Hier erfährst du, welche personenbezogenen Daten beim Besuch dieser Website
          verarbeitet werden – nach der Datenschutz-Grundverordnung (DSGVO) und dem österreichischen Datenschutzgesetz (DSG).
        </p>
      }
      sections={sections}
      footer={<p>Stand: {privacy.updated}</p>}
    />
  );
}
