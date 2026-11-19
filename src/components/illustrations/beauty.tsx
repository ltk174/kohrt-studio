import { GrainFilter, r1, seeded } from "./utils";

/* Farbwelt der Designstudie „Beauty & Lifestyle“ */
const C = {
  powder: "#F4ECE4",
  rose: "#D9B5A8",
  roseLight: "#EAD3C9",
  roseDeep: "#C79B8C",
  terra: "#B0776A",
  espresso: "#3B2F2C",
  cream: "#FBF7F2",
  stone: "#E3D7CA",
  sand: "#D8C6B4",
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

/** Weiche Blattschatten an der Wand. */
function LeafShadows({ seed, x, y, scale = 1, opacity = 0.16, blur = "bs-blur" }: { seed: number; x: number; y: number; scale?: number; opacity?: number; blur?: string }) {
  const rand = seeded(seed);
  const leaves = Array.from({ length: 14 }, (_, i) => ({
    a: -70 + i * 10 + rand() * 8,
    len: 150 + rand() * 120,
    w: 22 + rand() * 18,
  }));
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} filter={`url(#${blur})`} opacity={opacity} fill={C.espresso}>
      <path d="M0 0C40 140 60 300 70 520" stroke={C.espresso} strokeWidth="6" fill="none" />
      {leaves.map((l, i) => {
        const t = i / leaves.length;
        const px = 70 * t * t + 6;
        const py = 520 * t;
        return (
          <g key={i} transform={`translate(${r1(px)} ${r1(py)}) rotate(${r1(l.a + (i % 2 ? 180 : 0))})`}>
            <path d={`M0 0C${l.len * 0.3} ${-l.w} ${l.len * 0.75} ${-l.w * 0.8} ${l.len} 0C${l.len * 0.75} ${l.w * 0.5} ${l.len * 0.3} ${l.w * 0.6} 0 0Z`} />
          </g>
        );
      })}
    </g>
  );
}

/** Stillleben mit Pflegeprodukten auf einem Sockel. */
export function BeautyStillLife({ className, title }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 1000 1250" className={className} title={title}>
      <defs>
        <filter id="bs-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="bs-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <linearGradient id="bs-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EED9CF" />
          <stop offset="1" stopColor="#DDBCAF" />
        </linearGradient>
        <linearGradient id="bs-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B9806C" />
          <stop offset="0.35" stopColor="#D9A48E" />
          <stop offset="0.6" stopColor="#C58A75" />
          <stop offset="1" stopColor="#9C6656" />
        </linearGradient>
        <linearGradient id="bs-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E9DED3" />
          <stop offset="0.4" stopColor="#FBF6F0" />
          <stop offset="1" stopColor="#D5C6B7" />
        </linearGradient>
        <linearGradient id="bs-ped" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E8D9CC" />
          <stop offset="0.45" stopColor="#F6EEE6" />
          <stop offset="1" stopColor="#CDB8A8" />
        </linearGradient>
        <linearGradient id="bs-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B08D63" />
          <stop offset="0.5" stopColor="#E3C99F" />
          <stop offset="1" stopColor="#9C7A52" />
        </linearGradient>
        <GrainFilter id="bs-grain" opacity={0.2} />
      </defs>
      <rect width="1000" height="1250" fill="url(#bs-wall)" />
      {/* Bogen */}
      <path d="M220 900V420A280 280 0 0 1 780 420V900Z" fill={C.roseLight} />
      <path d="M220 900V420A280 280 0 0 1 780 420V900Z" fill="#fff" opacity="0.25" />
      <LeafShadows seed={4} x={640} y={60} scale={1.1} opacity={0.12} />
      {/* Boden */}
      <rect y="900" width="1000" height="350" fill={C.stone} />
      <rect y="900" width="1000" height="6" fill="#000" opacity="0.05" />
      {/* Sockel */}
      <ellipse cx="500" cy="1150" rx="300" ry="34" fill={C.espresso} opacity="0.18" filter="url(#bs-soft)" />
      <rect x="250" y="820" width="500" height="330" fill="url(#bs-ped)" />
      <ellipse cx="500" cy="1150" rx="250" ry="30" fill="#D4C1B1" />
      <rect x="250" y="820" width="500" height="330" fill="url(#bs-ped)" />
      <ellipse cx="500" cy="820" rx="250" ry="34" fill="#FBF5EF" />
      {/* Schatten der Objekte auf dem Sockel */}
      <path d="M440 830L620 790L660 806L470 846Z" fill={C.espresso} opacity="0.1" filter="url(#bs-blur)" />
      {/* Pipettenflasche */}
      <g>
        <rect x="340" y="610" width="150" height="220" rx="22" fill="url(#bs-glass)" />
        <rect x="358" y="630" width="14" height="170" rx="7" fill="#fff" opacity="0.35" />
        <rect x="372" y="560" width="86" height="56" rx="6" fill={C.espresso} />
        <rect x="380" y="566" width="8" height="44" rx="4" fill="#fff" opacity="0.18" />
        <path d="M384 560C384 470 446 470 446 560Z" fill="#4A3B37" />
        <path d="M396 520C398 495 410 488 418 488" stroke="#fff" strokeOpacity="0.2" strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="362" y="700" width="106" height="64" fill={C.cream} opacity="0.85" />
        <rect x="378" y="716" width="74" height="4" fill={C.espresso} opacity="0.6" />
        <rect x="390" y="730" width="50" height="3" fill={C.espresso} opacity="0.35" />
      </g>
      {/* Tiegel */}
      <g>
        <ellipse cx="610" cy="830" rx="92" ry="16" fill={C.espresso} opacity="0.12" />
        <rect x="518" y="738" width="184" height="92" rx="10" fill="url(#bs-cyl)" />
        <rect x="514" y="704" width="192" height="44" rx="8" fill="url(#bs-gold)" />
        <rect x="514" y="744" width="192" height="4" fill="#000" opacity="0.08" />
        <rect x="570" y="772" width="80" height="4" fill={C.espresso} opacity="0.5" />
      </g>
      {/* Pumpflasche auf dem Boden */}
      <g>
        <ellipse cx="855" cy="1112" rx="70" ry="12" fill={C.espresso} opacity="0.15" />
        <rect x="790" y="790" width="130" height="320" rx="18" fill="url(#bs-cyl)" />
        <rect x="830" y="740" width="50" height="52" rx="4" fill={C.espresso} />
        <rect x="846" y="710" width="18" height="32" fill={C.espresso} />
        <path d="M846 712H800V728H846Z" fill={C.espresso} />
        <rect x="812" y="900" width="86" height="110" fill={C.rose} opacity="0.7" />
        <rect x="828" y="930" width="54" height="4" fill={C.espresso} opacity="0.5" />
      </g>
      {/* Kiesel */}
      <ellipse cx="170" cy="1140" rx="90" ry="40" fill="#BFAE9F" />
      <ellipse cx="160" cy="1128" rx="60" ry="22" fill="#fff" opacity="0.18" />
      <ellipse cx="230" cy="1104" rx="44" ry="22" fill="#A99686" />
      {/* Trockenblume */}
      <g stroke="#9C7F6A" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M120 1110C130 960 150 860 200 760" />
        <path d="M150 960C180 930 210 920 240 925" />
        <path d="M136 1040C110 1000 90 990 66 992" />
      </g>
      {[
        [200, 760],
        [240, 925],
        [66, 992],
        [178, 820],
        [215, 790],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={9 + (i % 3) * 3} fill={i % 2 ? "#C9A58F" : "#E2C3B2"} />
      ))}
      <rect width="1000" height="1250" filter="url(#bs-grain)" />
    </Svg>
  );
}

/** Gefaltete Handtücher mit Eukalyptus. */
export function BeautyTowels({ className, title }: IllustrationProps) {
  const leaves = Array.from({ length: 11 }, (_, i) => i);
  return (
    <Svg viewBox="0 0 1000 1000" className={className} title={title}>
      <defs>
        <filter id="bt-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <GrainFilter id="bt-grain" opacity={0.2} />
      </defs>
      <rect width="1000" height="1000" fill={C.powder} />
      <rect y="640" width="1000" height="360" fill={C.stone} />
      <ellipse cx="480" cy="800" rx="340" ry="40" fill={C.espresso} opacity="0.16" filter="url(#bt-blur)" />
      {[
        { y: 680, h: 110, w: 600, c: "#EFE4D8" },
        { y: 590, h: 100, w: 560, c: C.rose },
        { y: 505, h: 92, w: 520, c: C.cream },
      ].map((t, i) => (
        <g key={i}>
          <rect x={480 - t.w / 2} y={t.y} width={t.w} height={t.h} rx={t.h / 2.4} fill={t.c} />
          <path d={`M${480 - t.w / 2 + 24} ${t.y + t.h * 0.55}H${480 + t.w / 2 - 24}`} stroke="#000" strokeOpacity="0.06" strokeWidth="3" />
          <rect x={480 - t.w / 2} y={t.y + t.h - 16} width={t.w} height="16" rx="8" fill="#000" opacity="0.05" />
        </g>
      ))}
      {/* Eukalyptus */}
      <path d="M260 480C420 400 600 380 820 330" stroke="#7E8C7A" strokeWidth="4" fill="none" />
      {leaves.map((i) => {
        const t = i / 10;
        const x = 280 + t * 520;
        const y = 470 - t * 130 + Math.sin(t * 3) * 10;
        const up = i % 2 === 0;
        return <ellipse key={i} cx={x} cy={y + (up ? -26 : 26)} rx="26" ry="22" fill={i % 3 ? "#9DAA97" : "#B4BFAE"} />;
      })}
      <ellipse cx="800" cy="900" rx="80" ry="34" fill="#BBA898" />
      <rect width="1000" height="1000" filter="url(#bt-grain)" />
    </Svg>
  );
}

/** Wandfläche mit Licht aus einem Bogenfenster. */
export function BeautyLight({ className, title }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 1000 1250" className={className} title={title}>
      <defs>
        <filter id="bl-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="bl-blur2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <GrainFilter id="bl-grain" opacity={0.22} />
      </defs>
      <rect width="1000" height="1250" fill="#D7B2A4" />
      <g filter="url(#bl-blur2)" opacity="0.8">
        <path d="M300 1250L360 520A170 170 0 0 1 700 520L760 1250Z" fill="#F3DDD2" transform="skewX(-12) translate(160 0)" />
      </g>
      <g filter="url(#bl-blur)" opacity="0.5">
        <path d="M520 360V1250M330 820H870" stroke="#D7B2A4" strokeWidth="26" transform="skewX(-12) translate(160 0)" />
      </g>
      <LeafShadows seed={9} x={180} y={-40} scale={1.5} opacity={0.15} blur="bl-blur" />
      <rect y="1060" width="1000" height="190" fill="#C9A193" />
      <rect x="560" y="900" width="200" height="160" rx="100" fill="#E8D3C7" />
      <rect x="560" y="900" width="200" height="40" rx="20" fill="#F4E6DD" />
      <path d="M660 900C640 760 600 700 560 660M660 900C690 780 740 730 780 700" stroke="#7E8C7A" strokeWidth="4" fill="none" />
      <circle cx="560" cy="660" r="14" fill="#9DAA97" />
      <circle cx="780" cy="700" r="16" fill="#B4BFAE" />
      <circle cx="610" cy="720" r="11" fill="#9DAA97" />
      <rect width="1000" height="1250" filter="url(#bl-grain)" />
    </Svg>
  );
}

/** Keramikschale mit Wasser und Blütenblättern – Draufsicht. */
export function BeautyBowl({ className, title }: IllustrationProps) {
  const rand = seeded(12);
  const petals = Array.from({ length: 9 }, () => ({
    x: 500 + (rand() - 0.5) * 300,
    y: 500 + (rand() - 0.5) * 300,
    a: rand() * 360,
  }));
  return (
    <Svg viewBox="0 0 1000 1000" className={className} title={title}>
      <defs>
        <radialGradient id="bb-water" cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#F6ECE6" />
          <stop offset="1" stopColor="#E0C8BC" />
        </radialGradient>
        <filter id="bb-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <GrainFilter id="bb-grain" opacity={0.2} />
      </defs>
      <rect width="1000" height="1000" fill="#EFE3D7" />
      {Array.from({ length: 30 }).map((_, i) => (
        <path key={i} d={`M0 ${i * 34}H1000`} stroke="#000" strokeOpacity="0.025" strokeWidth="2" />
      ))}
      <circle cx="530" cy="540" r="290" fill={C.espresso} opacity="0.18" filter="url(#bb-blur)" />
      <circle cx="500" cy="500" r="290" fill="#F7EEE7" />
      <circle cx="500" cy="500" r="250" fill="url(#bb-water)" />
      {[60, 120, 180].map((r) => (
        <circle key={r} cx="440" cy="450" r={r} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
      ))}
      {petals.map((p, i) => (
        <g key={i} transform={`translate(${r1(p.x)} ${r1(p.y)}) rotate(${r1(p.a)})`}>
          <path d="M0 0C14 -26 46 -30 60 0C46 24 14 22 0 0Z" fill={i % 3 ? C.roseDeep : C.terra} opacity="0.9" />
        </g>
      ))}
      <rect width="1000" height="1000" filter="url(#bb-grain)" />
    </Svg>
  );
}
