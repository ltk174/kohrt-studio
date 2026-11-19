/** Deterministischer Zufallsgenerator – gleiche Ausgabe bei jedem Build. */
export function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export const r1 = (n: number) => Math.round(n * 10) / 10;

/** Erzeugt Grashalme als Pfad-Daten. */
export function grassBlades(
  seed: number,
  count: number,
  area: { x: number; y: number; w: number; spread?: number; hMin: number; hMax: number },
) {
  const rand = seeded(seed);
  const blades: { d: string; w: number; o: number }[] = [];
  for (let i = 0; i < count; i++) {
    const x = area.x + rand() * area.w;
    const y = area.y + (rand() - 0.5) * (area.spread ?? 10);
    const h = area.hMin + rand() * (area.hMax - area.hMin);
    const lean = (rand() - 0.5) * h * 0.7;
    const cx = x + lean * 0.25;
    const cy = y - h * 0.6;
    const ex = x + lean;
    const ey = y - h;
    blades.push({
      d: `M${r1(x)} ${r1(y)}Q${r1(cx)} ${r1(cy)} ${r1(ex)} ${r1(ey)}`,
      w: 0.8 + rand() * 1.6,
      o: 0.55 + rand() * 0.45,
    });
  }
  return blades;
}

/** Wolkige Baumkrone aus überlagerten Kreisen. */
export function canopy(seed: number, cx: number, cy: number, rx: number, ry: number, count: number) {
  const rand = seeded(seed);
  const circles: { cx: number; cy: number; r: number; shade: number }[] = [];
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand());
    circles.push({
      cx: r1(cx + Math.cos(a) * rx * d * 0.86),
      cy: r1(cy + Math.sin(a) * ry * d * 0.86),
      r: r1((rx + ry) * (0.075 + rand() * 0.09)),
      shade: Math.sin(a) * d,
    });
  }
  return circles.sort((a, b) => b.shade - a.shade);
}

/** SVG-Filter für feines Korn, damit Flächen nicht „digital“ wirken. */
export function GrainFilter({ id, opacity = 0.18 }: { id: string; opacity?: number }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix
        in="noise"
        values={`0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 ${opacity} 0`}
        result="grain"
      />
      <feComposite in="grain" in2="SourceGraphic" operator="in" />
    </filter>
  );
}
