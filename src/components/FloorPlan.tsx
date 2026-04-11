import { Lang } from "@/translations";

const labels = {
  fi: {
    header:    "POHJAPIIRROS – PITKÄNSILLANKATU 18  ·  KATUTASO",
    note:      "225 m²  ·  Suuntaa-antava arvio  ·  Mitoitus tarkistetaan esittelyssä",
    street:    "↓  PITKÄNSILLANKATU  –  PÄÄSISÄÄNKÄYNTI  ↓",
    openOff1:  "OH + KEITTIÖ",
    openOff2:  "Day Lounge / Open Office",
    neu1:      "NEUVOTTELU-",
    neu2:      "HUONE",
    office:    "TOIMISTO",
    entry:     "ET",
    storage:   "VH",
    wc:        "WC",
    stairs:    "portaat\nalakertaan",
    shared:    "taloyhtiön\npyörävarasto",
    mainDoor:  "PÄÄOVI",
    total:     "← n. 8–9 m →",
    depth:     "≈ 17 m",
    legend:    "SELITE",
    legWin:    "Ikkuna / julkisivu",
    legDoor:   "Oven kaarisuunta",
    legWall:   "Ulkoseinä",
    northLbl:  "P",
    northSub:  "(arvio)",
  },
  sv: {
    header:    "PLANLÖSNING – PITKÄNSILLANKATU 18  ·  GATUPLAN",
    note:      "225 m²  ·  Ungefärlig uppskattning  ·  Exakta mått vid visning",
    street:    "↓  PITKÄNSILLANKATU  –  HUVUDENTRÉ  ↓",
    openOff1:  "OH + KÖK",
    openOff2:  "Day Lounge / Open Office",
    neu1:      "KONFERENS-",
    neu2:      "RUM",
    office:    "KONTOR",
    entry:     "HALL",
    storage:   "VH",
    wc:        "WC",
    stairs:    "trappa\nnedåt",
    shared:    "bolagets\ncykelförråd",
    mainDoor:  "INGÅNG",
    total:     "← ca 8–9 m →",
    depth:     "≈ 17 m",
    legend:    "FÖRKLARING",
    legWin:    "Fönster / fasad",
    legDoor:   "Dörröppningsriktning",
    legWall:   "Yttervägg",
    northLbl:  "N",
    northSub:  "(uppskattning)",
  },
  en: {
    header:    "FLOOR PLAN – PITKÄNSILLANKATU 18  ·  STREET LEVEL",
    note:      "225 m²  ·  Approximate estimate  ·  Exact measurements at viewing",
    street:    "↓  PITKÄNSILLANKATU  –  MAIN ENTRANCE  ↓",
    openOff1:  "OH + KITCHEN",
    openOff2:  "Day Lounge / Open Office",
    neu1:      "MEETING",
    neu2:      "ROOM",
    office:    "OFFICE",
    entry:     "ENTRY",
    storage:   "STORAGE",
    wc:        "WC",
    stairs:    "stairs to\nlower level",
    shared:    "building's\nbike storage",
    mainDoor:  "MAIN DOOR",
    total:     "← approx 8–9 m →",
    depth:     "≈ 17 m",
    legend:    "LEGEND",
    legWin:    "Window / façade",
    legDoor:   "Door swing",
    legWall:   "Exterior wall",
    northLbl:  "N",
    northSub:  "(estimate)",
  },
};

export default function FloorPlan({ lang = "fi" }: { lang?: Lang }) {
  const L = labels[lang];

  // Colors
  const extW     = "#94a3b8";
  const intW     = "#64748b";
  const EW       = 3;
  const IW       = 2;
  const roomFill  = "#1e3349";
  const wetFill   = "#162a3a";
  const utilFill  = "#182d42";
  const corrFill  = "#152535";
  const sharedFill = "#111e2e";
  const stairFill  = "#131f30";
  const teal      = "#14b8a6";
  const win       = "#7dd3fc";
  const txt       = "#e2e8f0";
  const sub       = "#64748b";
  const dim       = "#475569";
  const dimTxt    = "#334155";

  // ── COORDINATE SYSTEM ──────────────────────────────────────────
  // Portrait orientation: street at BOTTOM, back of building at TOP
  // Building ~8.5 m wide × ~17 m deep

  const x0  = 88;   // left exterior wall
  const xVH = 228;  // VH right edge / shared space starts
  const x1  = 355;  // main vertical divider (left main | right service strip)
  const x2  = 450;  // right exterior wall

  const y0  = 58;   // top / back wall
  const y1  = 110;  // VH bottom / Neuvottelu top
  const y2  = 288;  // Neuvottelu bottom / transition top
  const y3  = 372;  // OH+KEITTIÖ top / ET+staircase bottom
  const y4  = 452;  // Toimisto bottom
  const y5  = 507;  // WC bottom
  const y6  = 648;  // street / bottom wall

  // Door gap helpers
  const neuDoorL = x0 + 30;    // Neuvottelu door in horizontal wall (y2)
  const neuDoorR = x0 + 78;
  const etDoorL  = 205;        // ET door opening from OH side (y3)
  const etDoorR  = 253;
  const toiDoorT = y3 + 12;   // Toimisto door in x1 wall
  const toiDoorB = y3 + 56;
  const wcDoorT  = y4 + 8;    // WC door in x1 wall
  const wcDoorB  = y4 + 44;
  const vhDoorL  = x0 + 15;   // VH door in y1 wall
  const vhDoorR  = x0 + 52;
  const mainDoorL = 132;       // Main entry in bottom wall
  const mainDoorR = 180;

  // Staircase bounds (right strip, middle area)
  const stairT = y1 + 30;
  const stairB = y3;
  const stairL = x1 + 4;
  const stairR = x2 - 4;
  const stairSteps = 9;

  return (
    <svg
      viewBox="0 0 520 730"
      className="w-full max-w-xl mx-auto"
      role="img"
      aria-label={L.header}
    >
      {/* Background */}
      <rect width="520" height="730" fill="#0f172a" rx="16"/>

      {/* Header */}
      <text x="260" y="24" textAnchor="middle" fill={teal} fontSize="9.5" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="1.2">
        {L.header}
      </text>
      <text x="260" y="38" textAnchor="middle" fill={sub} fontSize="8.5" fontFamily="system-ui,sans-serif">
        {L.note}
      </text>

      {/* ── ROOM FILLS ── */}
      {/* VH */}
      <rect x={x0}  y={y0} width={xVH-x0}  height={y1-y0} fill={utilFill}/>
      {/* Shared (taloyhtiön pyörävarasto) */}
      <rect x={xVH} y={y0} width={x2-xVH}  height={y1-y0} fill={sharedFill}/>
      {/* Neuvottelu */}
      <rect x={x0}  y={y1} width={x1-x0}   height={y2-y1} fill={roomFill}/>
      {/* Right strip upper (shared stairwell access) */}
      <rect x={x1}  y={y0} width={x2-x1}   height={stairT-y0} fill={sharedFill}/>
      {/* Staircase */}
      <rect x={x1}  y={stairT} width={x2-x1} height={stairB-stairT} fill={stairFill}/>
      {/* ET */}
      <rect x={etDoorL-35} y={y2} width={x1-(etDoorL-35)} height={y3-y2} fill={corrFill}/>
      {/* Left corridor (part of OH access) */}
      <rect x={x0}  y={y2} width={etDoorL-35-x0} height={y3-y2} fill={roomFill} opacity="0.6"/>
      {/* Toimisto */}
      <rect x={x1}  y={y3} width={x2-x1}   height={y4-y3} fill={roomFill}/>
      {/* WC */}
      <rect x={x1}  y={y4} width={x2-x1}   height={y5-y4} fill={wetFill}/>
      {/* OH+KEITTIÖ main */}
      <rect x={x0}  y={y3} width={x1-x0}   height={y6-y3} fill={roomFill}/>
      {/* OH+KEITTIÖ lower-right extension */}
      <rect x={x1}  y={y5} width={x2-x1}   height={y6-y5} fill={roomFill}/>

      {/* ── STAIRCASE LINES ── */}
      {Array.from({ length: stairSteps }).map((_, i) => {
        const y = stairT + ((stairB - stairT) / stairSteps) * (i + 0.5);
        return <line key={i} x1={stairL} y1={y} x2={stairR} y2={y} stroke={intW} strokeWidth="1" opacity="0.5"/>;
      })}
      {/* Staircase arrow (going down) */}
      <line x1={(stairL+stairR)/2} y1={stairT+10} x2={(stairL+stairR)/2} y2={stairB-10} stroke={teal} strokeWidth="1" opacity="0.5"/>
      <polygon points={`${(stairL+stairR)/2-5},${stairB-20} ${(stairL+stairR)/2+5},${stairB-20} ${(stairL+stairR)/2},${stairB-8}`} fill={teal} opacity="0.4"/>

      {/* ── EXTERIOR WALLS ── */}
      {/* Top wall */}
      <line x1={x0} y1={y0} x2={x2} y2={y0} stroke={extW} strokeWidth={EW}/>
      {/* Left wall */}
      <line x1={x0} y1={y0} x2={x0} y2={y6} stroke={extW} strokeWidth={EW}/>
      {/* Right wall */}
      <line x1={x2} y1={y0} x2={x2} y2={y6} stroke={extW} strokeWidth={EW}/>
      {/* Bottom wall – gap for main entry */}
      <line x1={x0}        y1={y6} x2={mainDoorL} y2={y6} stroke={extW} strokeWidth={EW}/>
      <line x1={mainDoorR} y1={y6} x2={x2}        y2={y6} stroke={extW} strokeWidth={EW}/>

      {/* ── INTERIOR WALLS ── */}
      {/* VH | shared (horizontal, y0→y1) */}
      <line x1={xVH} y1={y0} x2={xVH} y2={y1} stroke={intW} strokeWidth={IW}/>
      {/* VH bottom / Neuvottelu top – with door gap */}
      <line x1={x0}      y1={y1} x2={vhDoorL}  y2={y1} stroke={intW} strokeWidth={IW}/>
      <line x1={vhDoorR} y1={y1} x2={x1}        y2={y1} stroke={intW} strokeWidth={IW}/>
      {/* Right strip top boundary */}
      <line x1={x1} y1={y0} x2={x1} y2={stairT} stroke={intW} strokeWidth={IW}/>
      {/* Neuvottelu | right strip vertical */}
      <line x1={x1} y1={y1} x2={x1} y2={y2} stroke={intW} strokeWidth={IW}/>
      {/* Neuvottelu bottom / transition – with door gap */}
      <line x1={x0}       y1={y2} x2={neuDoorL} y2={y2} stroke={intW} strokeWidth={IW}/>
      <line x1={neuDoorR} y1={y2} x2={x1}       y2={y2} stroke={intW} strokeWidth={IW}/>
      {/* ET left wall */}
      <line x1={etDoorL-35} y1={y2} x2={etDoorL-35} y2={y3} stroke={intW} strokeWidth={IW}/>
      {/* ET bottom / OH top – with door gap */}
      <line x1={x0}      y1={y3} x2={etDoorL}  y2={y3} stroke={intW} strokeWidth={IW}/>
      <line x1={etDoorR} y1={y3} x2={x1}       y2={y3} stroke={intW} strokeWidth={IW}/>
      {/* Left main | right service strip */}
      <line x1={x1} y1={y2} x2={x1} y2={y3-0}  stroke={intW} strokeWidth={IW}/>
      {/* Toimisto top – with door gap in x1 wall */}
      <line x1={x1} y1={y3}      x2={x1} y2={toiDoorT} stroke={intW} strokeWidth={IW}/>
      <line x1={x1} y1={toiDoorB} x2={x1} y2={y4}      stroke={intW} strokeWidth={IW}/>
      {/* WC top – with door gap in x1 wall */}
      <line x1={x1} y1={y4}      x2={x1} y2={wcDoorT}  stroke={intW} strokeWidth={IW}/>
      <line x1={x1} y1={wcDoorB} x2={x1} y2={y5}       stroke={intW} strokeWidth={IW}/>
      {/* Toimisto bottom / WC top */}
      <line x1={x1} y1={y4} x2={x2} y2={y4} stroke={intW} strokeWidth={IW}/>
      {/* WC bottom / OH extension top */}
      <line x1={x1} y1={y5} x2={x2} y2={y5} stroke={intW} strokeWidth={IW}/>

      {/* ── WINDOWS ── */}
      {/* Street-facing windows (bottom of OH+KEITTIÖ) */}
      <rect x={x0+12}   y={y6-2} width={110} height={7} fill={win} rx="1"/>
      <rect x={x0+138}  y={y6-2} width={110} height={7} fill={win} rx="1"/>
      {/* Back/side windows (Neuvottelu top wall) */}
      <rect x={x0+15}   y={y0-2} width={x1-x0-30} height={6} fill={win} rx="1" opacity="0.6"/>

      {/* ── DOORS ── */}
      {/* 1. Main entrance (bottom wall) */}
      <line x1={mainDoorL} y1={y6} x2={mainDoorL} y2={y6-50} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${mainDoorR} ${y6} A 50 50 0 0 0 ${mainDoorL} ${y6-50}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
      <text x={(mainDoorL+mainDoorR)/2} y={y6+14} textAnchor="middle" fill={teal} fontSize="7" fontFamily="system-ui,sans-serif" fontWeight="700">{L.mainDoor}</text>
      <text x={(mainDoorL+mainDoorR)/2} y={y6+24} textAnchor="middle" fill={teal} fontSize="8">↑</text>

      {/* 2. VH door (y1 wall) */}
      <line x1={vhDoorL} y1={y1} x2={vhDoorL} y2={y1+38} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${vhDoorR} ${y1} A 38 38 0 0 0 ${vhDoorL} ${y1+38}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 3. Neuvottelu door (y2 wall) */}
      <line x1={neuDoorR} y1={y2} x2={neuDoorR} y2={y2+45} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${neuDoorL} ${y2} A 45 45 0 0 1 ${neuDoorR} ${y2+45}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 4. ET door (y3 wall) */}
      <line x1={etDoorL} y1={y3} x2={etDoorL} y2={y3-42} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${etDoorR} ${y3} A 42 42 0 0 0 ${etDoorL} ${y3-42}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 5. Toimisto door (x1 wall) */}
      <line x1={x1} y1={toiDoorT} x2={x1-38} y2={toiDoorT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${x1} ${toiDoorB} A 38 38 0 0 0 ${x1-38} ${toiDoorT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 6. WC door (x1 wall) */}
      <line x1={x1} y1={wcDoorT} x2={x1-32} y2={wcDoorT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${x1} ${wcDoorB} A 32 32 0 0 0 ${x1-32} ${wcDoorT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* ── ROOM LABELS ── */}
      {/* VH */}
      <text x={(x0+xVH)/2} y={y0+30} textAnchor="middle" fill={txt} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="700">{L.storage}</text>
      <text x={(x0+xVH)/2} y={y0+43} textAnchor="middle" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">5,1 m²</text>

      {/* Shared label */}
      <text x={(xVH+x2)/2} y={y0+26} textAnchor="middle" fill={dimTxt} fontSize="7.5" fontFamily="system-ui,sans-serif">{L.shared}</text>

      {/* Neuvottelu */}
      <text x={(x0+x1)/2} y={y1+90} textAnchor="middle" fill={txt} fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="700">{L.neu1}</text>
      <text x={(x0+x1)/2} y={y1+105} textAnchor="middle" fill={txt} fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="700">{L.neu2}</text>
      <text x={(x0+x1)/2} y={y1+123} textAnchor="middle" fill={teal} fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="800">49,4 m²</text>

      {/* Staircase label */}
      <text x={(x1+x2)/2} y={(stairT+stairB)/2-8} textAnchor="middle" fill={dimTxt} fontSize="7" fontFamily="system-ui,sans-serif">{L.stairs.split("\n")[0]}</text>
      <text x={(x1+x2)/2} y={(stairT+stairB)/2+5} textAnchor="middle" fill={dimTxt} fontSize="7" fontFamily="system-ui,sans-serif">{L.stairs.split("\n")[1]}</text>

      {/* ET */}
      <text x={(etDoorL-35+x1)/2} y={(y2+y3)/2+5} textAnchor="middle" fill={txt} fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600">{L.entry}</text>
      <text x={(etDoorL-35+x1)/2} y={(y2+y3)/2+18} textAnchor="middle" fill={sub} fontSize="7.5" fontFamily="system-ui,sans-serif">3,1 m²</text>

      {/* Toimisto */}
      <text x={(x1+x2)/2} y={(y3+y4)/2-4} textAnchor="middle" fill={txt} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="600">{L.office}</text>
      <text x={(x1+x2)/2} y={(y3+y4)/2+10} textAnchor="middle" fill={teal} fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="700">9,6 m²</text>

      {/* WC */}
      <text x={(x1+x2)/2} y={(y4+y5)/2-3} textAnchor="middle" fill={txt} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="600">{L.wc}</text>
      <text x={(x1+x2)/2} y={(y4+y5)/2+10} textAnchor="middle" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">2,5 m²</text>

      {/* OH+KEITTIÖ */}
      <text x={(x0+x1)/2} y={(y3+y6)/2-22} textAnchor="middle" fill={txt} fontSize="14" fontFamily="system-ui,sans-serif" fontWeight="700">{L.openOff1}</text>
      <text x={(x0+x1)/2} y={(y3+y6)/2-5} textAnchor="middle" fill={sub} fontSize="9" fontFamily="system-ui,sans-serif">{L.openOff2}</text>
      <text x={(x0+x1)/2} y={(y3+y6)/2+17} textAnchor="middle" fill={teal} fontSize="16" fontFamily="system-ui,sans-serif" fontWeight="800">94,7 m²</text>

      {/* ── STREET INDICATOR ── */}
      <text x="260" y={y6+20} textAnchor="middle" fill={win} fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="0.8">
        {L.street}
      </text>

      {/* ── DIMENSION LINES ── */}
      {/* Horizontal width */}
      <line x1={x0} y1={y6+36} x2={x2} y2={y6+36} stroke={dim} strokeWidth="1"/>
      <line x1={x0} y1={y6+32} x2={x0} y2={y6+40} stroke={dim} strokeWidth="1"/>
      <line x1={x2} y1={y6+32} x2={x2} y2={y6+40} stroke={dim} strokeWidth="1"/>
      <text x="260" y={y6+50} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">{L.total}</text>

      {/* Vertical depth */}
      <line x1="70" y1={y0} x2="70" y2={y6} stroke={dim} strokeWidth="1"/>
      <line x1="66" y1={y0} x2="74" y2={y0} stroke={dim} strokeWidth="1"/>
      <line x1="66" y1={y6} x2="74" y2={y6} stroke={dim} strokeWidth="1"/>
      <text x="58" y={(y0+y6)/2} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif" transform={`rotate(-90,58,${(y0+y6)/2})`}>{L.depth}</text>

      {/* ── LEGEND ── */}
      <rect x="88" y="672" width="215" height="44" fill="#0a1628" stroke="#1e293b" strokeWidth="1" rx="6" opacity="0.95"/>
      <text x="195" y="685" textAnchor="middle" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif" fontWeight="700">{L.legend}</text>
      <line x1="98"  y1="695" x2="126" y2="695" stroke={win} strokeWidth="4"/>
      <text x="132" y="698" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">{L.legWin}</text>
      <line x1="98"  y1="708" x2="126" y2="708" stroke={teal} strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="132" y="711" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">{L.legDoor}</text>

      {/* North arrow */}
      <text x="450" y="683" textAnchor="middle" fill={sub} fontSize="22">↑</text>
      <text x="450" y="700" textAnchor="middle" fill={sub} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="700">{L.northLbl}</text>
      <text x="450" y="711" textAnchor="middle" fill={dim} fontSize="7" fontFamily="system-ui,sans-serif">{L.northSub}</text>
    </svg>
  );
}
