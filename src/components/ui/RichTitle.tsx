/**
 * Rendert Überschriften aus der Konfiguration.
 * Text zwischen *Sternchen* wird als eleganter Akzent (Serif, kursiv, Grün) dargestellt.
 * Beispiel: "Gutes Webdesign muss *nicht kompliziert* sein."
 */
export function RichTitle({ text, accentClassName = "font-accent text-forest" }: { text: string; accentClassName?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={index} className={accentClassName}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

/** Entfernt die Akzent-Markierungen, z. B. für Metadaten. */
export function plainTitle(text: string) {
  return text.replace(/\*/g, "");
}
