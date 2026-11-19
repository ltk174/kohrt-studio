import { GrainFilter, r1, seeded } from "./utils";

/* Farbwelt der Designstudie „Handwerk & Bau“ */
const C = {
  anth: "#1E2124",
  graph: "#2B2F33",
  graph2: "#3A3F44",
  copper: "#B8693D",
  copperLight: "#D9A27A",
  white: "#FAFAF8",
  wood: "#C99B6D",
  woodDark: "#9C6E45",
  woodLight: "#DDBB92",
  concrete: "#D8D4CD",
  sky: "#E7E3DC",
};

type IllustrationProps = { className?: string; title?: string };

function Svg({ viewBox, className, title, children }: IllustrationProps & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {children}
    </svg>
  );
}

/** Hausansicht: links gebaut, rechts als Konstruktionszeichnung. */
export function CraftHero({ className, title }: IllustrationProps) {
  const studs = Array.from({ length: 13 }, (_, i) => 280 + i * 55);
  return (
    <Svg viewBox="0 0 1200 1000" className={className} title={title}>
      <defs>
        <clipPath id="ch-left">
          <rect x="0" y="0" width="600" height="1000" />
        </clipPath>
        <clipPath id="ch-right">
          <rect x="600" y="0" width="600" height="1000" />
        </clipPath>
        <clipPath id="ch-house">
          <path d="M260 560L600 250L940 560V880H260Z" />
        </clipPath>
        <pattern id="ch-slats" width="22" height="40" patternUnits="userSpaceOnUse">
          <rect width="22" height="40" fill={C.wood} />
          <rect x="18" width="4" height="40" fill={C.woodDark} />
          <rect x="2" width="3" height="40" fill={C.woodLight} opacity="0.5" />
        </pattern>
        <pattern id="ch-roof" width="30" height="16" patternUnits="userSpaceOnUse">
          <rect width="30" height="16" fill="#2E3236" />
          <path d="M0 15.5H30" stroke="#16181A" strokeWidth="1.2" />
        </pattern>
        <linearGradient id="ch-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A5257" />
          <stop offset="1" stopColor="#1A1D1F" />
        </linearGradient>
        <GrainFilter id="ch-grain" opacity={0.25} />
      </defs>
      <rect width="1200" height="1000" fill={C.anth} />
      {/* Raster */}
      <g stroke={C.white} opacity="0.05">
        {Array.from({ length: 31 }).map((_, i) => (
          <path key={`v${i}`} d={`M${i * 40} 0V1000`} />
        ))}
        {Array.from({ length: 26 }).map((_, i) => (
          <path key={`h${i}`} d={`M0 ${i * 40}H1200`} />
        ))}
      </g>

      {/* Linke Hälfte: gebaut */}
      <g clipPath="url(#ch-left)">
        <rect x="260" y="540" width="680" height="340" fill="url(#ch-slats)" />
        <path d="M260 560L600 250L940 560Z" fill="url(#ch-slats)" />
        <path d="M180 600L600 215L1020 600L990 620L600 262L210 620Z" fill="url(#ch-roof)" />
        <path d="M180 600L600 215L612 226L210 620Z" fill="#3C4146" />
        <rect x="320" y="640" width="150" height="170" fill="url(#ch-glass)" />
        <rect x="320" y="640" width="150" height="170" fill="none" stroke={C.anth} strokeWidth="6" />
        <path d="M395 640V810" stroke={C.anth} strokeWidth="4" />
        <rect x="520" y="430" width="70" height="90" fill="url(#ch-glass)" />
        <rect x="520" y="430" width="70" height="90" fill="none" stroke={C.anth} strokeWidth="5" />
        <path d="M330 650L400 650L340 800Z" fill="#fff" opacity="0.06" />
        <rect x="236" y="880" width="740" height="12" fill={C.concrete} />
        {/* Kupfer-Fallrohr */}
        <rect x="248" y="600" width="9" height="282" fill={C.copper} />
        <rect x="236" y="596" width="30" height="10" fill={C.copper} />
      </g>

      {/* Rechte Hälfte: Konstruktion */}
      <g clipPath="url(#ch-right)" fill="none">
        <g stroke={C.white} strokeOpacity="0.55" strokeWidth="2">
          <path d="M260 560L600 250L940 560V880H260Z" />
          {studs.map((x) => (
            <path key={x} d={`M${x} 560V880`} strokeOpacity="0.3" />
          ))}
          <path d="M260 700H940" strokeOpacity="0.3" />
          <rect x="730" y="640" width="150" height="170" strokeOpacity="0.8" />
          <path d="M730 640L880 810M880 640L730 810" strokeOpacity="0.25" />
        </g>
        {/* Dachstuhl in Kupfer */}
        <g stroke={C.copper} strokeWidth="7" strokeLinecap="square">
          <path d="M600 222L1010 598" />
          <path d="M600 330V560" strokeWidth="6" />
          <path d="M600 470L800 560" strokeWidth="5" />
          <path d="M600 470L860 466" strokeWidth="0" />
          <path d="M470 440H730" strokeWidth="6" />
          <path d="M240 560H960" strokeWidth="8" />
        </g>
        <g stroke={C.copperLight} strokeWidth="1.5" strokeOpacity="0.6">
          <path d="M600 236L995 598" />
        </g>
        {/* Bemaßung */}
        <g stroke={C.white} strokeOpacity="0.6" strokeWidth="1.4">
          <path d="M1060 250V880" />
          <path d="M1048 250H1072M1048 560H1072M1048 880H1072" />
          <path d="M600 940H940" />
          <path d="M600 928V952M940 928V952" />
          <path d="M920 560A60 60 0 0 0 900 520" stroke={C.copperLight} strokeOpacity="1" />
        </g>
      </g>
      <g fill={C.white} fontFamily="var(--font-archivo), sans-serif" fontSize="17" letterSpacing="2" opacity="0.8">
        <text x="1084" y="410">3,10</text>
        <text x="1084" y="725">3,20</text>
        <text x="740" y="980">4,20 M</text>
        <text x="850" y="512" fill={C.copperLight} fontSize="15">
          38°
        </text>
      </g>
      {/* Trennlinie */}
      <path d="M600 120V960" stroke={C.copper} strokeWidth="1.5" strokeDasharray="6 8" />
      <g fontFamily="var(--font-archivo), sans-serif" fontSize="14" fontWeight="700" letterSpacing="3">
        <rect x="474" y="100" width="112" height="32" fill={C.copper} />
        <text x="530" y="121" textAnchor="middle" fill={C.white}>
          GEBAUT
        </text>
        <rect x="614" y="100" width="112" height="32" fill="none" stroke={C.white} strokeOpacity="0.5" />
        <text x="670" y="121" textAnchor="middle" fill={C.white}>
          GEPLANT
        </text>
      </g>
      <rect width="1200" height="1000" filter="url(#ch-grain)" />
    </Svg>
  );
}

/** Holzmaserung aus Rauschen. */
export function CraftWood({ className, title, tone = "warm" }: IllustrationProps & { tone?: "warm" | "dark" }) {
  const id = `cw-${tone}`;
  const matrix =
    tone === "warm"
      ? "0.62 0 0 0 0.42  0.44 0 0 0 0.24  0.26 0 0 0 0.1  0 0 0 0 1"
      : "0.4 0 0 0 0.18  0.3 0 0 0 0.12  0.2 0 0 0 0.08  0 0 0 0 1";
  return (
    <Svg viewBox="0 0 1600 700" className={className} title={title}>
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.003 0.11" numOctaves="4" seed="8" />
          <feColorMatrix type="matrix" values={matrix} />
        </filter>
        <GrainFilter id={`${id}-grain`} opacity={0.2} />
      </defs>
      <rect width="1600" height="700" filter={`url(#${id})`} />
      {[140, 290, 430, 585, 720].map((y, i) => (
        <g key={y}>
          <rect y={y} width="1600" height="3" fill="#000" opacity="0.35" />
          <rect y={y + 3} width="1600" height="2" fill="#fff" opacity="0.08" />
          <rect x={(i * 397) % 1300} y={y - 140} width="2" height="140" fill="#000" opacity="0.25" />
        </g>
      ))}
      <rect width="1600" height="700" filter={`url(#${id}-grain)`} />
    </Svg>
  );
}

/** Dachstuhl-Binder vor hellem Himmel in Perspektive. */
export function CraftRafters({ className, title }: IllustrationProps) {
  const trusses = Array.from({ length: 8 }, (_, i) => 7 - i).map((i) => {
    const s = 1 / (1 + i * 0.32);
    return { i, s, cx: 600 + i * 26 * s, base: 980 - (1 - s) * 520 };
  });
  return (
    <Svg viewBox="0 0 1200 1000" className={className} title={title}>
      <defs>
        <linearGradient id="cr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFD6DA" />
          <stop offset="1" stopColor={C.sky} />
        </linearGradient>
        <GrainFilter id="cr-grain" opacity={0.2} />
      </defs>
      <rect width="1200" height="1000" fill="url(#cr-sky)" />
      {/* Firstpfette */}
      <path d={`M${trusses[0].cx} ${trusses[0].base - 620 * trusses[0].s}L600 ${980 - 620}`} stroke={C.woodDark} strokeWidth="22" />
      {trusses.map(({ i, s, cx, base }) => {
        const w = 620 * s;
        const h = 620 * s;
        const t = 34 * s;
        const shade = 1 - i * 0.07;
        return (
          <g key={i} opacity={Math.max(0.55, shade)}>
            <path d={`M${cx - w} ${base}L${cx} ${base - h}L${cx + w} ${base}`} fill="none" stroke={C.wood} strokeWidth={t} strokeLinejoin="miter" />
            <path d={`M${cx - w} ${base}L${cx} ${base - h}`} fill="none" stroke={C.woodDark} strokeWidth={t * 0.35} transform={`translate(${t * 0.25} ${t * 0.3})`} />
            <path d={`M${cx - w * 0.52} ${base - h * 0.48}H${cx + w * 0.52}`} stroke={C.woodLight} strokeWidth={t * 0.8} />
            <path d={`M${cx} ${base - h}V${base - h * 0.48}`} stroke={C.wood} strokeWidth={t * 0.7} />
          </g>
        );
      })}
      <rect y="940" width="1200" height="60" fill={C.graph} />
      <rect width="1200" height="1000" filter="url(#cr-grain)" />
    </Svg>
  );
}

/** Fassade mit senkrechter Holzlattung und Kupferdetail. */
export function CraftFacade({ className, title }: IllustrationProps) {
  const rand = seeded(17);
  const slats = Array.from({ length: 40 }, (_, i) => ({ x: i * 31, tone: rand() }));
  return (
    <Svg viewBox="0 0 1200 1000" className={className} title={title}>
      <defs>
        <linearGradient id="cf-light" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
        <GrainFilter id="cf-grain" opacity={0.22} />
      </defs>
      <rect width="1200" height="1000" fill="#5A3E28" />
      {slats.map(({ x, tone }) => (
        <g key={x}>
          <rect x={x} width="25" height="1000" fill={tone > 0.66 ? C.woodLight : tone > 0.33 ? C.wood : "#B88A5E"} />
          <rect x={x + 21} width="4" height="1000" fill={C.woodDark} opacity="0.7" />
        </g>
      ))}
      <rect x="640" y="260" width="380" height="520" fill="#1E2124" />
      <rect x="660" y="280" width="340" height="480" fill="#30363A" />
      <path d="M660 280L820 280L700 760L660 760Z" fill="#fff" opacity="0.06" />
      <rect x="630" y="780" width="400" height="16" fill={C.copper} />
      <rect x="160" y="0" width="16" height="1000" fill={C.copper} />
      <rect x="152" y="0" width="32" height="10" fill="#9C5530" />
      <rect width="1200" height="1000" fill="url(#cf-light)" />
      <rect width="1200" height="1000" filter="url(#cf-grain)" />
    </Svg>
  );
}

/** Terrassendielen in Perspektive. */
export function CraftDeck({ className, title }: IllustrationProps) {
  const planks = Array.from({ length: 22 }, (_, i) => i);
  const rand = seeded(23);
  return (
    <Svg viewBox="0 0 1200 1000" className={className} title={title}>
      <defs>
        <linearGradient id="cd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9E6E0" />
          <stop offset="1" stopColor="#D2CEC6" />
        </linearGradient>
        <linearGradient id="cd-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <GrainFilter id="cd-grain" opacity={0.2} />
      </defs>
      <rect width="1200" height="1000" fill="url(#cd-sky)" />
      <rect y="260" width="1200" height="120" fill="#8E9A86" />
      <rect x="0" y="300" width="1200" height="80" fill="#6E7B68" />
      {planks.map((i) => {
        const vx = 600;
        const vy = 140;
        const x0 = -900 + i * 140;
        const x1 = x0 + 132;
        const yTop = 380;
        const f = (yTop - vy) / (1000 - vy);
        const tx0 = vx + (x0 - vx) * f;
        const tx1 = vx + (x1 - vx) * f;
        const c = rand();
        return (
          <path
            key={i}
            d={`M${r1(tx0)} ${yTop}L${r1(tx1)} ${yTop}L${x1} 1000L${x0} 1000Z`}
            fill={c > 0.6 ? C.woodLight : c > 0.3 ? C.wood : "#BF9165"}
          />
        );
      })}
      <rect y="380" width="1200" height="620" fill="url(#cd-fade)" />
      {[520, 700, 900].map((y, i) => (
        <path key={y} d={`M0 ${y}H1200`} stroke={C.woodDark} strokeWidth={1 + i} opacity="0.35" />
      ))}
      <rect x="820" y="250" width="260" height="140" fill={C.graph} />
      <rect x="820" y="250" width="260" height="10" fill={C.copper} />
      <rect width="1200" height="1000" filter="url(#cd-grain)" />
    </Svg>
  );
}
