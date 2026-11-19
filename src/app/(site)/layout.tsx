import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealManager } from "@/components/ui/RevealManager";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#inhalt"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 font-display text-sm font-semibold text-cream transition-transform focus:translate-y-0"
      >
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <RevealManager />
    </>
  );
}
