import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="inhalt" className="container-page py-24 sm:py-36">
        <p className="font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-forest">Fehler 404</p>
        <h1 className="mt-6 max-w-3xl text-display-lg font-semibold text-ink">
          Diese Seite gibt es <span className="font-accent text-forest">leider nicht.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lead text-ink-soft">
          Vielleicht wurde sie verschoben oder der Link enthält einen Tippfehler. Auf der Startseite findest du alles Wichtige.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Zur Startseite
          </ButtonLink>
          <ButtonLink href="/kontakt/" variant="secondary" size="lg" icon={false}>
            Kontakt
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
