import type { Metadata } from "next";
import { archivo, bodoni, cormorant, jost } from "./fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${cormorant.variable} ${jost.variable} ${archivo.variable} ${bodoni.variable}`}>{children}</div>
  );
}
