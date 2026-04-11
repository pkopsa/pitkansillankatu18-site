import { Lang } from "@/translations";

const labels = {
  fi: {
    header:   "POHJAPIIRROS – PITKÄNSILLANKATU 18",
    note:     "225 m²  ·  Suuntaa-antava arvio  ·  Mitoitus tarkistetaan esittelyssä",
    street:   "↓  PITKÄNSILLANKATU  (julkisivu / pääsisäänkäynti)  ↓",
    openOff1: "OH + KEITTIÖ",
    openOff2: "Day Lounge / Open Office",
    meeting1: "NEUVOTTELU-",
    meeting2: "HUONE",
    office:   "TOIMISTO",
    entry:    "ETEINEN",
    storage:  "VH",
    wc:       "WC",
    total:    "← noin 18–20 m →",
    legend:   "SELITE",
    legWin:   "Ikkuna",
    legDoor:  "Oven kaarisuunta",
    legWall:  "Ulkoseinä",
    northLbl: "P",
    northSub: "(arvio)",
    mainDoor: "PÄÄOVI",
  },
  sv: {
    header:   "PLANLÖSNING – PITKÄNSILLANKATU 18",
    note:     "225 m²  ·  Ungefärlig uppskattning  ·  Exakta mått kontrolleras vid visning",
    street:   "↓  PITKÄNSILLANKATU  (fasad / huvudentré)  ↓",
    openOff1: "OH + KÖK",
    openOff2: "Day Lounge / Open Office",
    meeting1: "KONFERENS-",
    meeting2: "RUM",
    office:   "KONTOR",
    entry:    "HALL",
    storage:  "VH",
    wc:       "WC",
    total:    "← ca 18–20 m →",
    legend:   "FÖRKLARING",
    legWin:   "Fönster",
    legDoor:  "Dörröppningsriktning",
    legWall:  "Yttervägg",
    northLbl: "N",
    northSub: "(uppskattning)",
    mainDoor: "INGÅNG",
  },
  en: {
    header:   "FLOOR PLAN – PITKÄNSILLANKATU 18",
    note:     "225 m²  ·  Approximate estimate  ·  Exact measurements at viewing",
    street:   "↓  PITKÄNSILLANKATU  (street front / main entry)  ↓",
    openOff1: "OH + KITCHEN",
    openOff2: "Day Lounge / Open Office",
    meeting1: "MEETING",
    meeting2: "ROOM",
    office:   "OFFICE",
    entry:    "ENTRY",
    storage:  "STORAGE",
    wc:       "WC",
    total:    "← approx 18–20 m →",
    legend:   "LEGEND",
    legWin:   "Window",
    legDoor:  "Door swing",
    legWall:  "Exterior wall",
    northLbl: "N",
    northSub: "(estimate)",
    mainDoor: "MAIN DOOR",
  },
};

export default function FloorPlan({ lang = "fi" }: { lang?: Lang }) {
  const L = labels[lang];

  const extW    = "#94a3b8";
  const intW    = "#64748b";
  const EW      = 3;
  const IW      = 2;
  const roomFill = "#1e3349";
  const wetFill  = "#162a3a";
  const utilFill = "#182d42";
  const corrFill = "#152535";
  const teal    = "#14b8a6";
  const win     = "#7dd3fc";
  const txt     = "#e2e8f0";
  const sub     = "#64748b";
  const dim     = "#475569";

  // Room boundary coordinates
  const x0  = 75;   // left exterior wall
  const x1  = 375;  // OH+keittiö | Neuvottelu divider (also top of VH/WC column)
  const xET = 185;  // ET | Toimisto divider
  const x2  = 455;  // VH | WC divider
  const x3  = 545;  // right exterior wall

  const y0  = 65;   // top exterior wall (back of building)
  const y1  = 315;  // horizontal divider: top zone | bottom strip
  const y2  = 415;  // bottom exterior wall (street level)

  // Door gap positions (within bottom strip horizontal wall at y=y1)
  const etDoorL  = 88;        // ET door in bottom wall of ET: x gap start
  const etDoorR  = 128;       // ET door in bottom wall of ET: x gap end
  const ohDoorL  = x0 + 8;   // OH–ET opening in horizontal wall y=y1
  const ohDoorR  = x0 + 50;
  const toiDoorL = xET + 22;  // Toimisto door in horizontal wall y=y1
  const toiDoorR = xET + 62;
  const vhDoorL  = x1 + 8;   // VH door in horizontal wall y=y1
  const vhDoorR  = x1 + 40;
  // Neuvottelu door in vertical wall x=x1
  const neuDoorT = y0 + 90;
  const neuDoorB = y0 + 130;
  // WC door in vertical wall x=x2
  const wcDoorT  = y1 + 12;
  const wcDoorB  = y1 + 44;

  return (
    <svg
      viewBox="0 0 620 510"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label={L.header}
    >
      {/* Background */}
      <rect width="620" height="510" fill="#0f172a" rx="16"/>

      {/* Header */}
      <text x="310" y="24" textAnchor="middle" fill={teal} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="1.5">
        {L.header}
      </text>
      <text x="310" y="38" textAnchor="middle" fill={sub} fontSize="9" fontFamily="system-ui,sans-serif">
        {L.note}
      </text>

      {/* ── ROOM FILLS ── */}
      <rect x={x0}  y={y0} width={x1-x0}  height={y1-y0} fill={roomFill}/>
      <rect x={x1}  y={y0} width={x3-x1}  height={y1-y0} fill={roomFill}/>
      <rect x={x0}  y={y1} width={xET-x0} height={y2-y1} fill={corrFill}/>
      <rect x={xET} y={y1} width={x1-xET} height={y2-y1} fill={roomFill}/>
      <rect x={x1}  y={y1} width={x2-x1}  height={y2-y1} fill={utilFill}/>
      <rect x={x2}  y={y1} width={x3-x2}  height={y2-y1} fill={wetFill}/>

      {/* ── EXTERIOR WALLS ── */}
      {/* Top wall */}
      <line x1={x0} y1={y0} x2={x3} y2={y0} stroke={extW} strokeWidth={EW}/>
      {/* Left wall */}
      <line x1={x0} y1={y0} x2={x0} y2={y2} stroke={extW} strokeWidth={EW}/>
      {/* Right wall */}
      <line x1={x3} y1={y0} x2={x3} y2={y2} stroke={extW} strokeWidth={EW}/>
      {/* Bottom wall – gap for main entry door */}
      <line x1={x0}      y1={y2} x2={etDoorL} y2={y2} stroke={extW} strokeWidth={EW}/>
      <line x1={etDoorR} y1={y2} x2={x3}      y2={y2} stroke={extW} strokeWidth={EW}/>

      {/* ── INTERIOR WALLS ── */}
      {/* Vertical: OH+keittiö | Neuvottelu */}
      <line x1={x1} y1={y0}      x2={x1} y2={neuDoorT} stroke={intW} strokeWidth={IW}/>
      <line x1={x1} y1={neuDoorB} x2={x1} y2={y2}      stroke={intW} strokeWidth={IW}/>
      {/* Horizontal top|bottom zone – with door gaps */}
      <line x1={x0}       y1={y1} x2={ohDoorL}  y2={y1} stroke={intW} strokeWidth={IW}/>
      <line x1={ohDoorR}  y1={y1} x2={toiDoorL} y2={y1} stroke={intW} strokeWidth={IW}/>
      <line x1={toiDoorR} y1={y1} x2={vhDoorL}  y2={y1} stroke={intW} strokeWidth={IW}/>
      <line x1={vhDoorR}  y1={y1} x2={x3}       y2={y1} stroke={intW} strokeWidth={IW}/>
      {/* Vertical: ET | Toimisto */}
      <line x1={xET} y1={y1} x2={xET} y2={y2} stroke={intW} strokeWidth={IW}/>
      {/* Vertical: VH | WC – with WC door gap */}
      <line x1={x2} y1={y1}      x2={x2} y2={wcDoorT} stroke={intW} strokeWidth={IW}/>
      <line x1={x2} y1={wcDoorB} x2={x2} y2={y2}      stroke={intW} strokeWidth={IW}/>

      {/* ── WINDOWS (top wall – back of building) ── */}
      <rect x={x0+20}   y={y0-2} width={x1-x0-40}  height={7} fill={win} rx="1"/>
      <rect x={x1+20}   y={y0-2} width={x3-x1-40}  height={7} fill={win} rx="1"/>

      {/* ── WINDOWS (bottom wall – street) ── */}
      <rect x={xET+20}  y={y2-2} width={x1-xET-40} height={7} fill={win} rx="1"/>

      {/* ── DOORS ── */}
      {/* 1. Main entry door (ET bottom wall) */}
      <line x1={etDoorL} y1={y2} x2={etDoorL} y2={y2-40} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${etDoorR} ${y2} A 40 40 0 0 0 ${etDoorL} ${y2-40}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
      <text x={(etDoorL+etDoorR)/2} y={y2+14} textAnchor="middle" fill={teal} fontSize="7" fontFamily="system-ui,sans-serif" fontWeight="700">{L.mainDoor}</text>
      <text x={(etDoorL+etDoorR)/2} y={y2+24} textAnchor="middle" fill={teal} fontSize="7" fontFamily="system-ui,sans-serif">↑</text>

      {/* 2. OH+keittiö ↔ ET opening (horizontal wall y=y1) */}
      <line x1={ohDoorL} y1={y1} x2={ohDoorL} y2={y1-42} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${ohDoorR} ${y1} A 42 42 0 0 0 ${ohDoorL} ${y1-42}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 3. Toimisto door (horizontal wall y=y1) */}
      <line x1={toiDoorR} y1={y1} x2={toiDoorR} y2={y1-40} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${toiDoorL} ${y1} A 40 40 0 0 1 ${toiDoorR} ${y1-40}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 4. VH door (horizontal wall y=y1) */}
      <line x1={vhDoorL} y1={y1} x2={vhDoorL} y2={y1-32} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${vhDoorR} ${y1} A 32 32 0 0 0 ${vhDoorL} ${y1-32}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 5. Neuvottelu door (vertical wall x=x1) */}
      <line x1={x1} y1={neuDoorT} x2={x1+42} y2={neuDoorT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${x1} ${neuDoorB} A 42 42 0 0 1 ${x1+42} ${neuDoorT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 6. WC door (vertical wall x=x2) */}
      <line x1={x2} y1={wcDoorT} x2={x2+32} y2={wcDoorT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${x2} ${wcDoorB} A 32 32 0 0 1 ${x2+32} ${wcDoorT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* ── ROOM LABELS ── */}
      {/* OH + Keittiö */}
      <text x={(x0+x1)/2} y={y0+80} textAnchor="middle" fill={txt} fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="700">{L.openOff1}</text>
      <text x={(x0+x1)/2} y={y0+97} textAnchor="middle" fill={sub} fontSize="9"  fontFamily="system-ui,sans-serif">{L.openOff2}</text>
      <text x={(x0+x1)/2} y={y0+116} textAnchor="middle" fill={teal} fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="800">94,7 m²</text>

      {/* Neuvottelu */}
      <text x={(x1+x3)/2} y={y0+105} textAnchor="middle" fill={txt} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="700">{L.meeting1}</text>
      <text x={(x1+x3)/2} y={y0+120} textAnchor="middle" fill={txt} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="700">{L.meeting2}</text>
      <text x={(x1+x3)/2} y={y0+138} textAnchor="middle" fill={teal} fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="800">49,4 m²</text>

      {/* ET */}
      <text x={(x0+xET)/2} y={y1+38} textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="600">{L.entry}</text>
      <text x={(x0+xET)/2} y={y1+52} textAnchor="middle" fill={sub}  fontSize="8"  fontFamily="system-ui,sans-serif">3,1 m²</text>

      {/* Toimisto */}
      <text x={(xET+x1)/2} y={y1+38} textAnchor="middle" fill={txt}  fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="600">{L.office}</text>
      <text x={(xET+x1)/2} y={y1+52} textAnchor="middle" fill={teal} fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="700">9,6 m²</text>

      {/* VH */}
      <text x={(x1+x2)/2} y={y1+38} textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="600">{L.storage}</text>
      <text x={(x1+x2)/2} y={y1+52} textAnchor="middle" fill={sub}  fontSize="8"  fontFamily="system-ui,sans-serif">5,1 m²</text>

      {/* WC */}
      <text x={(x2+x3)/2} y={y1+38} textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="600">{L.wc}</text>
      <text x={(x2+x3)/2} y={y1+52} textAnchor="middle" fill={sub}  fontSize="8"  fontFamily="system-ui,sans-serif">2,5 m²</text>

      {/* ── STREET INDICATOR ── */}
      <text x="310" y={y2+20} textAnchor="middle" fill={win} fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="0.8">
        {L.street}
      </text>

      {/* ── DIMENSION LINES ── */}
      {/* Horizontal */}
      <line x1={x0} y1={y2+38} x2={x3} y2={y2+38} stroke={dim} strokeWidth="1"/>
      {[x0, x1, x3].map(x => (
        <line key={x} x1={x} y1={y2+34} x2={x} y2={y2+42} stroke={dim} strokeWidth="1"/>
      ))}
      <text x={(x0+x3)/2} y={y2+52} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">{L.total}</text>

      {/* Vertical */}
      <line x1="55" y1={y0} x2="55" y2={y1} stroke={dim} strokeWidth="1"/>
      <line x1="55" y1={y1} x2="55" y2={y2} stroke={dim} strokeWidth="1"/>
      {[y0, y1, y2].map(y => (
        <line key={y} x1="51" y1={y} x2="59" y2={y} stroke={dim} strokeWidth="1"/>
      ))}
      <text x="43" y={(y0+y1)/2} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif" transform={`rotate(-90,43,${(y0+y1)/2})`}>~12–15 m</text>
      <text x="43" y={(y1+y2)/2} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif" transform={`rotate(-90,43,${(y1+y2)/2})`}>~3–4 m</text>

      {/* ── LEGEND ── */}
      <rect x="80" y="458" width="215" height="44" fill="#0a1628" stroke="#1e293b" strokeWidth="1" rx="6" opacity="0.95"/>
      <text x="187" y="472" textAnchor="middle" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif" fontWeight="700">{L.legend}</text>
      <line x1="90" y1="482" x2="118" y2="482" stroke={win} strokeWidth="4"/>
      <text x="124" y="485" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">{L.legWin}</text>
      <line x1="90" y1="495" x2="118" y2="495" stroke={teal} strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="124" y="498" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">{L.legDoor}</text>

      {/* North arrow */}
      <text x="520" y="472" textAnchor="middle" fill={sub} fontSize="22">↑</text>
      <text x="520" y="489" textAnchor="middle" fill={sub} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="700">{L.northLbl}</text>
      <text x="520" y="500" textAnchor="middle" fill={dim} fontSize="7" fontFamily="system-ui,sans-serif">{L.northSub}</text>
    </svg>
  );
}
