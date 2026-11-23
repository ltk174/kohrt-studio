import { company } from "@/config/site";

/**
 * E-Mail-Adresse als Grafik (in Vektorformen umgewandelte Schrift) –
 * die Adresse steht weder als Text im HTML noch im Quellcode.
 */
export function EmailImage({ className }: { className?: string }) {
  const { src, width, height } = company.emailImage;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={width}
      height={height}
      alt="E-Mail-Adresse für das Impressum (aus Spamschutzgründen als Grafik dargestellt)"
      className={className ?? "inline-block h-[1.05em] w-auto align-[-0.18em]"}
      loading="lazy"
      decoding="async"
    />
  );
}
