import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { contact, legalNavigation, navigation, owner, site } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-line bg-cream pt-20 sm:mt-20">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-display-sm font-semibold text-ink">
              {site.claim.split(". ")[0]}.{" "}
              <span className="font-accent text-forest">{site.claim.split(". ")[1]}</span>
            </p>
            <p className="mt-5 max-w-sm text-ink-soft">
              {site.shortName} – Webdesign von {owner.name} für kleine und mittelständische Unternehmen.
            </p>
          </div>

          <nav aria-label="Footer-Navigation" className="lg:col-span-3 lg:col-start-7">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink transition-colors hover:text-forest">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Kontakt</h2>
            <ul className="mt-5 space-y-3">
              <li className="text-ink">{owner.name}</li>
              <li>
                <Link href="/kontakt/#anfrage" className="text-ink transition-colors hover:text-forest">
                  Kostenloser Erstentwurf
                </Link>
              </li>
            </ul>
            <p className="mt-6 max-w-xs text-sm text-ink-muted">{contact.responseNote}</p>
          </div>
        </div>

        <div aria-hidden="true" className="mt-20 select-none sm:mt-28">
          <Logo className="w-full opacity-[0.95]" title="" />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.shortName} · {owner.name}
          </p>
          <ul className="flex gap-6">
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
