import { canopy, GrainFilter, grassBlades, r1, seeded } from "./utils";

/* Farbwelt der Designstudie „Garten & Landschaft“ */
const C = {
  deep: "#1F3A2E",
  deep2: "#2A4A3A",
  moss: "#5E7A5A",
  moss2: "#6F8A68",
  leaf: "#4C6A4B",
  sage: "#93A88C",
  pale: "#C3CDB5",
  haze: "#D9DFCF",
  cream: "#F3EFE6",
  sand: "#D9CDB8",
  stone: "#C9C0AF",
  stoneDark: "#A99F8C",
  water: "#9DB3AC",
  grass: "#B6A57A",
};

type IllustrationProps = { className?: string; title?: string };

function Svg({
  viewBox,
  className,
  title,
  children,
}: IllustrationProps & { viewBox: string; children: React.ReactNode }) {
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

function Tree({ seed, x, y, w, h, colors }: { seed: number; x: number; y: number; w: number; h: number; colors: string[] }) {
  const circles = canopy(seed, x, y - h * 0.62, w / 2, h * 0.42, 90);
  return (
    <g>
      <path
        d={`M${x - 6} ${y}C${x - 4} ${y - h * 0.3} ${x - 8} ${y - h * 0.45} ${x - 2} ${y - h * 0.6}L${x + 4} ${y - h * 0.6}C${x + 6} ${y - h * 0.4} ${x + 4} ${y - h * 0.25} ${x + 8} ${y}Z`}
        fill="#3A3A30"
      />
      <ellipse cx={x} cy={y - h * 0.6} rx={w * 0.44} ry={h * 0.36} fill={colors[0]} />
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={colors[Math.min(colors.length - 1, Math.max(0, Math.round((1 - (c.shade + 1) / 2) * (colors.length - 1))))]} />
      ))}
    </g>
  );
}

function Grasses({ seed, x, y, w, count, color, hMin = 40, hMax = 110 }: { seed: number; x: number; y: number; w: number; count: number; color: string; hMin?: number; hMax?: number }) {
  const blades = grassBlades(seed, count, { x, y, w, hMin, hMax, spread: 14 });
  return (
    <g fill="none" stroke={color} strokeLinecap="round">
      {blades.map((b, i) => (
        <path key={i} d={b.d} strokeWidth={b.w} opacity={b.o} />
      ))}
    </g>
  );
}

/** Großes Hero-Motiv: Pavillon, Wasserbecken, Hecken und Gräser. */
export function GardenHero({ className, title }: IllustrationProps) {
  const rand = seeded(7);
  return (
    <Svg viewBox="0 0 1600 1000" className={className} title={title}>
      <defs>
        <linearGradient id="gh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E4E6DA" />
          <stop offset="1" stopColor="#F2EFE4" />
        </linearGradient>
        <linearGradient id="gh-lawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8EA07D" />
          <stop offset="1" stopColor="#5F7752" />
        </linearGradient>
        <linearGradient id="gh-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B7C7C0" />
          <stop offset="1" stopColor="#7F9890" />
        </linearGradient>
        <linearGradient id="gh-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B4A43" />
          <stop offset="0.55" stopColor="#24302B" />
          <stop offset="1" stopColor="#33423B" />
        </linearGradient>
        <GrainFilter id="gh-grain" opacity={0.22} />
      </defs>
      <rect width="1600" height="1000" fill="url(#gh-sky)" />
      {/* Sonne / Licht */}
      <circle cx="1180" cy="210" r="90" fill="#F6F1E3" opacity="0.9" />
      {/* Ferne Baumreihe */}
      <path d="M0 520C120 440 210 470 300 430C400 390 470 450 560 420C660 385 760 440 860 410C980 370 1060 430 1160 400C1280 365 1380 420 1480 395C1540 380 1580 390 1600 400V600H0Z" fill={C.haze} />
      <path d="M0 560C90 500 180 520 260 492C350 462 430 520 520 498C620 472 700 520 800 500C900 480 980 520 1080 496C1180 472 1280 520 1380 500C1470 482 1540 510 1600 500V620H0Z" fill={C.pale} />
      {/* Hintere Bäume */}
      <Tree seed={3} x={330} y={600} w={220} h={330} colors={[C.moss, C.moss2, C.sage]} />
      <Tree seed={9} x={1430} y={610} w={240} h={360} colors={[C.leaf, C.moss, C.moss2]} />
      {/* Säulenzypressen */}
      {[1270, 1320, 1365].map((x, i) => (
        <path key={x} d={`M${x} 610C${x - 22} 540 ${x - 18} ${470 - i * 18} ${x} ${400 - i * 22}C${x + 18} ${470 - i * 18} ${x + 22} 540 ${x} 610Z`} fill={i === 1 ? C.deep2 : C.leaf} />
      ))}
      {/* Rasen */}
      <rect y="600" width="1600" height="400" fill="url(#gh-lawn)" />
      {/* Pavillon */}
      <g>
        <rect x="610" y="430" width="560" height="190" fill={C.cream} />
        <rect x="640" y="462" width="230" height="158" fill="url(#gh-glass)" />
        <rect x="890" y="462" width="250" height="158" fill="url(#gh-glass)" />
        <path d="M640 462L760 462L700 620L640 620Z" fill="#fff" opacity="0.06" />
        <path d="M890 462L990 462L940 620L890 620Z" fill="#fff" opacity="0.07" />
        <rect x="754" y="462" width="3" height="158" fill="#1B2420" opacity="0.6" />
        <rect x="1012" y="462" width="3" height="158" fill="#1B2420" opacity="0.6" />
        <rect x="585" y="414" width="610" height="22" fill="#2B2F2B" />
        <rect x="585" y="436" width="610" height="5" fill="#000" opacity="0.12" />
        {/* warmes Licht im Inneren */}
        <rect x="910" y="560" width="70" height="60" fill="#E8D6B0" opacity="0.18" />
      </g>
      {/* Terrasse */}
      <path d="M560 620H1220L1290 660H490Z" fill={C.stone} />
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M${560 + i * 82.5} 620L${490 + i * 100} 660`} stroke={C.stoneDark} strokeWidth="1" opacity="0.6" />
      ))}
      {/* Wasserbecken */}
      <path d="M420 690H1380L1440 760H360Z" fill="url(#gh-water)" />
      <g opacity="0.28">
        <rect x="640" y="696" width="530" height="40" fill={C.deep} />
        <rect x="610" y="694" width="560" height="4" fill="#fff" opacity="0.4" />
      </g>
      {Array.from({ length: 7 }).map((_, i) => (
        <path key={i} d={`M${470 + rand() * 820} ${705 + i * 8}h${60 + rand() * 120}`} stroke="#fff" strokeWidth="1.4" opacity={0.35} strokeLinecap="round" />
      ))}
      <path d="M360 760H1440L1460 772H340Z" fill={C.stoneDark} />
      {/* Hecken */}
      <rect x="120" y="640" width="330" height="58" rx="10" fill={C.deep2} />
      <rect x="120" y="640" width="330" height="10" rx="5" fill={C.leaf} opacity="0.7" />
      <rect x="1330" y="636" width="280" height="62" rx="10" fill={C.deep2} />
      <rect x="1330" y="636" width="280" height="10" rx="5" fill={C.leaf} opacity="0.7" />
      {/* Kugelbäumchen */}
      {[
        [520, 676, 26],
        [1290, 680, 24],
        [250, 790, 44],
        [1490, 800, 48],
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy + r * 0.92} rx={r * 1.1} ry={r * 0.22} fill="#000" opacity="0.12" />
          <circle cx={cx} cy={cy} r={r} fill={C.leaf} />
          <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.55} fill={C.moss2} opacity="0.55" />
        </g>
      ))}
      {/* Trittsteine im Vordergrund */}
      {[
        [700, 830, 120, 24],
        [770, 885, 150, 28],
        [700, 950, 180, 34],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={C.cream} opacity={0.92} />
      ))}
      {/* Gräser */}
      <Grasses seed={11} x={0} y={1000} w={520} count={170} color={C.grass} hMin={70} hMax={210} />
      <Grasses seed={12} x={1050} y={1000} w={560} count={170} color={C.grass} hMin={70} hMax={220} />
      <Grasses seed={13} x={40} y={1000} w={420} count={80} color="#D3C6A0" hMin={60} hMax={170} />
      <Grasses seed={14} x={1150} y={1000} w={420} count={80} color="#D3C6A0" hMin={60} hMax={180} />
      <rect width="1600" height="1000" filter="url(#gh-grain)" />
    </Svg>
  );
}

/** Lageplan im Stil einer Landschaftsarchitektur-Zeichnung. */
export function GardenPlan({ className, title }: IllustrationProps) {
  const trees = [
    [180, 170, 70],
    [1020, 150, 86],
    [1080, 560, 60],
    [140, 600, 54],
  ];
  return (
    <Svg viewBox="0 0 1200 800" className={className} title={title}>
      <defs>
        <pattern id="gp-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V10" stroke={C.deep} strokeWidth="1.2" opacity="0.45" />
        </pattern>
        <pattern id="gp-deck" width="14" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 0V60" stroke={C.deep} strokeWidth="0.8" opacity="0.35" />
        </pattern>
        <GrainFilter id="gp-grain" opacity={0.12} />
      </defs>
      <rect width="1200" height="800" fill="#F1ECE1" />
      {/* Raster */}
      <g stroke={C.deep} opacity="0.06">
        {Array.from({ length: 25 }).map((_, i) => (
          <path key={`v${i}`} d={`M${i * 50} 0V800`} />
        ))}
        {Array.from({ length: 17 }).map((_, i) => (
          <path key={`h${i}`} d={`M0 ${i * 50}H1200`} />
        ))}
      </g>
      <g fill="none" stroke={C.deep} strokeWidth="1.6">
        <rect x="60" y="60" width="1080" height="680" strokeDasharray="10 6" opacity="0.55" />
        {/* Haus */}
        <rect x="420" y="60" width="360" height="190" fill="url(#gp-hatch)" />
        <rect x="420" y="60" width="360" height="190" strokeWidth="2.4" />
        {/* Terrasse */}
        <rect x="390" y="250" width="420" height="120" fill="url(#gp-deck)" />
        {/* Becken */}
        <rect x="460" y="430" width="280" height="64" fill="#C9D6D0" />
        <path d="M480 452h80M520 470h120M600 452h60" stroke="#fff" strokeWidth="2" />
        {/* Weg aus Trittplatten */}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={575} y={520 + i * 36} width="50" height="22" fill={C.cream} />
        ))}
        {/* Hecken */}
        <rect x="90" y="300" width="230" height="36" rx="18" fill="#9FB094" />
        <rect x="880" y="300" width="230" height="36" rx="18" fill="#9FB094" />
        <rect x="90" y="360" width="36" height="300" rx="18" fill="#9FB094" />
        {/* Beete */}
        <path d="M820 420C900 400 1010 420 1100 470V700H860C840 610 800 520 820 420Z" fill="#DCD9C3" />
        <path d="M180 420C260 410 330 450 360 520C380 600 320 690 210 700H160V430Z" fill="#DCD9C3" />
      </g>
      {/* Bäume */}
      {trees.map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="#AFC0A4" opacity="0.75" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.deep} strokeWidth="1.4" />
          {Array.from({ length: 12 }).map((_, k) => {
            const a = (k / 12) * Math.PI * 2;
            return (
              <path key={k} d={`M${cx} ${cy}L${r1(cx + Math.cos(a) * r * 0.8)} ${r1(cy + Math.sin(a) * r * 0.8)}`} stroke={C.deep} strokeWidth="0.9" opacity="0.5" />
            );
          })}
          <circle cx={cx} cy={cy} r="4" fill={C.deep} />
        </g>
      ))}
      {/* Pflanzpunkte */}
      {seededPoints(21, 46, [840, 440, 250, 240]).map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 3 ? "#7E9474" : "#C7A86E"} opacity="0.85" />
      ))}
      {seededPoints(22, 40, [180, 440, 160, 240]).map(([x, y, r], i) => (
        <circle key={`b${i}`} cx={x} cy={y} r={r} fill={i % 3 ? "#7E9474" : "#B9A0B5"} opacity="0.85" />
      ))}
      {/* Nordpfeil & Maßstab */}
      <g transform="translate(1090 700)" fill={C.deep}>
        <circle r="22" fill="none" stroke={C.deep} strokeWidth="1.2" />
        <path d="M0 -18L7 8L0 3L-7 8Z" />
        <text y="-28" textAnchor="middle" fontSize="13" fontFamily="var(--font-jost), sans-serif" letterSpacing="2">
          N
        </text>
      </g>
      <g transform="translate(90 760)" fill={C.deep} fontFamily="var(--font-jost), sans-serif" fontSize="11" letterSpacing="2">
        <rect width="60" height="5" />
        <rect x="60" width="60" height="5" fill="none" stroke={C.deep} />
        <rect x="120" width="60" height="5" />
        <text x="196" y="6">0 — 15 M</text>
      </g>
      <g fill={C.deep} fontFamily="var(--font-jost), sans-serif" fontSize="12" letterSpacing="3">
        <text x="600" y="160" textAnchor="middle">WOHNHAUS</text>
        <text x="600" y="316" textAnchor="middle">TERRASSE</text>
        <text x="600" y="520" textAnchor="middle" opacity="0">.</text>
        <text x="970" y="590" textAnchor="middle">STAUDENBEET</text>
        <text x="600" y="420" textAnchor="middle">WASSERBECKEN</text>
      </g>
      <rect width="1200" height="800" filter="url(#gp-grain)" />
    </Svg>
  );
}

function seededPoints(seed: number, count: number, [x, y, w, h]: number[]) {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => [r1(x + rand() * w), r1(y + rand() * h), r1(4 + rand() * 9)]);
}

/** Weg aus Trittplatten zwischen Gräsern – Perspektive. */
export function GardenPath({ className, title }: IllustrationProps) {
  const slabs = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    const y = 960 - Math.pow(t, 0.8) * 560;
    const w = 300 - t * 230;
    const h = 70 - t * 58;
    const x = 600 - w / 2 + Math.sin(t * 2.4) * 60 * t;
    return { x, y, w, h };
  });
  return (
    <Svg viewBox="0 0 1200 1000" className={className} title={title}>
      <defs>
        <linearGradient id="gpa-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DADFCF" />
          <stop offset="0.42" stopColor="#B5C2A5" />
          <stop offset="1" stopColor="#6A8159" />
        </linearGradient>
        <GrainFilter id="gpa-grain" opacity={0.22} />
      </defs>
      <rect width="1200" height="1000" fill="url(#gpa-bg)" />
      <Tree seed={31} x={600} y={410} w={340} h={360} colors={[C.leaf, C.moss, C.moss2, C.sage]} />
      <rect x="0" y="380" width="460" height="70" rx="12" fill={C.deep2} />
      <rect x="740" y="380" width="460" height="70" rx="12" fill={C.deep2} />
      <rect y="440" width="1200" height="560" fill="#6F8660" opacity="0.6" />
      {slabs.map((s, i) => (
        <g key={i}>
          <rect x={s.x + 4} y={s.y + 4} width={s.w} height={s.h} rx="2" fill="#000" opacity="0.12" />
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="2" fill={i % 2 ? "#EDE6D8" : "#E4DCCB"} />
        </g>
      ))}
      <Grasses seed={41} x={-40} y={1000} w={480} count={220} color="#C5B488" hMin={120} hMax={330} />
      <Grasses seed={42} x={760} y={1000} w={480} count={220} color="#C5B488" hMin={120} hMax={330} />
      <Grasses seed={43} x={0} y={760} w={420} count={120} color="#A8A27A" hMin={60} hMax={160} />
      <Grasses seed={44} x={800} y={760} w={420} count={120} color="#A8A27A" hMin={60} hMax={160} />
      <rect width="1200" height="1000" filter="url(#gpa-grain)" />
    </Svg>
  );
}

/** Botanische Nahaufnahme mit großen Blättern. */
export function GardenLeaves({ className, title }: IllustrationProps) {
  const rand = seeded(55);
  const leaves = Array.from({ length: 26 }, () => ({
    x: rand() * 1200,
    y: rand() * 900,
    s: 0.7 + rand() * 1.1,
    a: rand() * 360,
    c: [C.leaf, C.moss, C.deep2, C.moss2, "#3E5C45"][Math.floor(rand() * 5)],
  }));
  return (
    <Svg viewBox="0 0 1200 900" className={className} title={title}>
      <defs>
        <GrainFilter id="gl-grain" opacity={0.25} />
      </defs>
      <rect width="1200" height="900" fill={C.deep} />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${r1(l.x)} ${r1(l.y)}) rotate(${r1(l.a)}) scale(${r1(l.s)})`}>
          <path d="M0 0C60 -70 190 -80 260 0C190 80 60 70 0 0Z" fill={l.c} />
          <path d="M0 0C80 -6 170 -4 260 0" stroke="#F3EFE6" strokeOpacity="0.18" strokeWidth="2" fill="none" />
          {[50, 95, 140, 185].map((x) => (
            <g key={x} stroke="#F3EFE6" strokeOpacity="0.1" strokeWidth="1.4" fill="none">
              <path d={`M${x} 0Q${x + 22} -24 ${x + 40} -44`} />
              <path d={`M${x} 0Q${x + 22} 24 ${x + 40} 44`} />
            </g>
          ))}
        </g>
      ))}
      <rect width="1200" height="900" filter="url(#gl-grain)" />
    </Svg>
  );
}

/** Steinbecken mit Wasser von oben. */
export function GardenWater({ className, title }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 1200 900" className={className} title={title}>
      <defs>
        <radialGradient id="gw-water" cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#B9CCC5" />
          <stop offset="1" stopColor="#6F8C84" />
        </radialGradient>
        <GrainFilter id="gw-grain" opacity={0.2} />
      </defs>
      <rect width="1200" height="900" fill={C.stone} />
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 5 }).map((__, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 240 + (row % 2) * 60 - 60}
            y={row * 150}
            width="236"
            height="146"
            fill={(row + col) % 3 === 0 ? "#D3CBBC" : "#CBC2B2"}
          />
        )),
      )}
      <rect x="220" y="200" width="760" height="500" fill="#A99F8C" />
      <rect x="240" y="220" width="720" height="460" fill="url(#gw-water)" />
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx="520" cy="400" rx={50 + i * 55} ry={30 + i * 33} fill="none" stroke="#fff" strokeOpacity={0.4 - i * 0.08} strokeWidth="2" />
      ))}
      {[
        [700, 520, 20],
        [760, 560, -30],
        [380, 600, 60],
      ].map(([x, y, a], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
          <path d="M0 0C20 -22 60 -24 84 0C60 24 20 22 0 0Z" fill={i === 2 ? "#C7A86E" : C.moss} />
        </g>
      ))}
      <rect width="1200" height="900" filter="url(#gw-grain)" />
    </Svg>
  );
}
