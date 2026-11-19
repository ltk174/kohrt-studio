/** Formatiert einen Preis im deutschen Format, z. B. 1490 → „1.490 €“. */
export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value)} €`;
}

/** Fügt CSS-Klassen zusammen und ignoriert leere Werte. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
