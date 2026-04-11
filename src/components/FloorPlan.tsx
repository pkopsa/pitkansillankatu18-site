import { Lang } from "@/translations";

const labels = {
  fi: {
    header:   "POHJAPIIRROS – PITKÄNSILLANKATU 18  ·  KATUTASO",
    note:     "225 m²  ·  Suuntaa-antava arvio  ·  Mitoitus tarkistetaan esittelyssä",
    streetBot:"↓  PITKÄNSILLANKATU  –  NÄYTEIKKUNAT & PÄÄOVI  ↓",
    parkingR: "→  PARKKIPAIKKA",
    bikeStore:"← taloyhtiön pyörävarasto (takaseinän takana)",
    openOff1: "OH + KEITTIÖ",
    openOff2: "Open Office",
    neu1:     "NEUVOTTELU-",
    neu2:     "HUONE",
    office:   "TOIMISTO",
    entry:    "ETEINEN",
    storage:  "VH",
    wc:       "WC",
    mainDoor: "PÄÄOVI",
    parkDoor: "TAKAOVI",
    wineCab:  "viini-\nkaappi",
    legend:   "SELITE",
    legWin:   "Ikkuna",
    legDoor:  "Oven kaari",
    northLbl: "P",
    northSub: "(arvio)",
    dimW:     "← n. 8–9 m →",
    dimD:     "≈ 17 m",
  },
  sv: {
    header:   "PLANLÖSNING – PITKÄNSILLANKATU 18  ·  GATUPLAN",
    note:     "225 m²  ·  Ungefärlig uppskattning  ·  Exakta mått vid visning",
    streetBot:"↓  PITKÄNSILLANKATU  –  SKYLTFÖNSTER & INGÅNG  ↓",
    parkingR: "→  PARKERING",
    bikeStore:"← bolagets cykelförråd (bakom väggen)",
    openOff1: "OH + KÖK",
    openOff2: "Open Office",
    neu1:     "KONFERENS-",
    neu2:     "RUM",
    office:   "KONTOR",
    entry:    "HALL",
    storage:  "VH",
    wc:       "WC",
    mainDoor: "INGÅNG",
    parkDoor: "BAKDÖRR",
    wineCab:  "vinsskåp",
    legend:   "FÖRKLARING",
    legWin:   "Fönster",
    legDoor:  "Dörröppning",
    northLbl: "N",
    northSub: "(uppsk.)",
    dimW:     "← ca 8–9 m →",
    dimD:     "≈ 17 m",
  },
  en: {
    header:   "FLOOR PLAN – PITKÄNSILLANKATU 18  ·  STREET LEVEL",
    note:     "225 m²  ·  Approximate estimate  ·  Exact measurements at viewing",
    streetBot:"↓  PITKÄNSILLANKATU  –  DISPLAY WINDOWS & MAIN ENTRY  ↓",
    parkingR: "→  PARKING LOT",
    bikeStore:"← building's bike storage (behind wall)",
    openOff1: "OH + KITCHEN",
    openOff2: "Open Office",
    neu1:     "MEETING",
    neu2:     "ROOM",
    office:   "OFFICE",
    entry:    "ENTRY",
    storage:  "STORAGE",
    wc:       "WC",
    mainDoor: "MAIN DOOR",
    parkDoor: "BACK DOOR",
    wineCab:  "wine\ncab.",
    legend:   "LEGEND",
    legWin:   "Window",
    legDoor:  "Door swing",
    northLbl: "N",
    northSub: "(est.)",
    dimW:     "← approx 8–9 m →",
    dimD:     "≈ 17 m",
  },
};

export default function FloorPlan({ lang = "fi" }: { lang?: Lang }) {
  const L = labels[lang];

  const extW      = "#94a3b8";
  const intW      = "#64748b";
  const EW        = 3;
  const IW        = 2;
  const roomFill  = "#1e3349";
  const wetFill   = "#162a3a";
  const utilFill  = "#182d42";
  const corrFill  = "#152535";
  const teal      = "#14b8a6";
  const win       = "#7dd3fc";
  const txt       = "#e2e8f0";
  const sub       = "#64748b";
  const dim       = "#475569";
  const dimTxt    = "#2d3f55";

  // ── COORDINATES ────────────────────────────────────────────────
  // Orientation: street BOTTOM, parking lot RIGHT (x2), bicycle storage TOP
  //
  // Key layout change:
  //   - Neuvottelu = full top zone (y0→yNeu), 2 windows on right wall
  //   - VH = small room outside Neuvottelu top-left, connected by door
  //   - Toimisto and ET are in the same horizontal band (yNeu→yToi):
  //       Toimisto left, ET directly behind it on the right (parking lot side)
  //   - OH↔Neuvottelu door is at Toimisto left-wall corner (load-bearing beam)

  const x0   = 80;   // left exterior wall
  const xVH  = 152;  // VH right wall
  const xToi = 310;  // Toimisto left / OH right / beam corner
  const xET  = 392;  // ET left / Toimisto right
  const x2   = 450;  // right exterior wall (PARKING LOT)

  const y0   = 58;   // top/back wall
  const yVH  = 150;  // VH bottom wall
  const yNeu = 308;  // Neuvottelu bottom / Toimisto+ET top
  const yToi = 402;  // Toimisto+ET bottom / WC top
  const yWC  = 460;  // WC bottom
  const y6   = 648;  // street / bottom wall

  // Main entrance: centered in bottom wall
  const cx     = (x0 + x2) / 2;   // 265
  const mainDL = cx - 27;          // 238
  const mainDR = cx + 27;          // 292

  // Display windows flanking the main door (street side)
  const win1L = x0 + 32;    // 112
  const win1R = x0 + 118;   // 198
  const win2L = x2 - 118;   // 332
  const win2R = x2 - 32;    // 418

  // Neuvottelu windows: 2 on RIGHT WALL (x2), evenly spaced across full Neuvottelu height
  const neuH  = yNeu - y0;          // 250
  const winH  = 44;
  const wGap  = (neuH - 2 * winH) / 3;  // ≈ 54
  const neuW1T = y0  + wGap;
  const neuW1B = neuW1T + winH;
  const neuW2T = neuW1B + wGap;
  const neuW2B = neuW2T + winH;

  // ET back door: RIGHT WALL (x2), in ET zone
  const etDT = yNeu + 20;   // 328
  const etDB = yNeu + 68;   // 376

  // VH door: RIGHT WALL of VH (x=xVH), opens right into Neuvottelu
  const vhDT = y0  + 22;   // 80
  const vhDB = y0  + 62;   // 120

  // ET ↔ Neuvottelu door: TOP WALL of ET (y=yNeu), in ET column
  const etNeuDL = xET + 4;   // 396
  const etNeuDR = xET + 44;  // 436

  // Neuvottelu → OH door: at y=yNeu, just LEFT of xToi (Toimisto beam corner)
  const neuOhDL = xToi - 44;  // 266
  const neuOhDR = xToi;       // 310

  // Toimisto door: BOTTOM WALL (y=yToi), left portion → opens into corridor below
  const toiDL = xToi + 6;   // 316
  const toiDR = xToi + 50;  // 360

  // WC door: LEFT WALL of WC (x=xET), opens left into OH corridor
  const wcDT = yToi + 8;    // 410
  const wcDB = yToi + 44;   // 446

  // Wine cabinet: small notch in bottom-right of Toimisto
  const wcabX = xET - 24;   // 368
  const wcabY = yToi - 24;  // 378
  const wcabW = 24;
  const wcabH = 24;

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
      <text x="260" y="23" textAnchor="middle" fill={teal} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="1.2">
        {L.header}
      </text>
      <text x="260" y="37" textAnchor="middle" fill={sub} fontSize="8.5" fontFamily="system-ui,sans-serif">
        {L.note}
      </text>
      <text x="260" y="53" textAnchor="middle" fill={dimTxt} fontSize="7.5" fontFamily="system-ui,sans-serif" fontStyle="italic">
        {L.bikeStore}
      </text>

      {/* ── ROOM FILLS ── */}

      {/* Neuvottelu – full top zone (VH will overlay top-left corner) */}
      <rect x={x0}   y={y0}   width={x2 - x0}    height={yNeu - y0}  fill={roomFill}/>

      {/* VH – small room top-left, outside Neuvottelu */}
      <rect x={x0}   y={y0}   width={xVH - x0}   height={yVH - y0}   fill={utilFill}/>

      {/* OH+KEITTIÖ – main area */}
      <rect x={x0}   y={yNeu} width={xToi - x0}  height={y6 - yNeu}  fill={roomFill}/>

      {/* Toimisto – directly left of ET, same horizontal band */}
      <rect x={xToi} y={yNeu} width={xET - xToi} height={yToi - yNeu} fill={roomFill}/>

      {/* Wine cabinet corner – inside Toimisto bottom-right */}
      <rect x={wcabX} y={wcabY} width={wcabW} height={wcabH} fill={utilFill} stroke={teal} strokeWidth="1" opacity="0.85"/>

      {/* ET – directly behind Toimisto, same band, parking lot side */}
      <rect x={xET}  y={yNeu} width={x2 - xET}   height={yToi - yNeu} fill={corrFill}/>

      {/* WC – below ET, same column */}
      <rect x={xET}  y={yToi} width={x2 - xET}   height={yWC - yToi}  fill={wetFill}/>

      {/* OH corridor – below Toimisto (connects Toimisto door to WC door) */}
      <rect x={xToi} y={yToi} width={xET - xToi} height={y6 - yToi}   fill={roomFill}/>

      {/* OH extension – below WC */}
      <rect x={xET}  y={yWC}  width={x2 - xET}   height={y6 - yWC}    fill={roomFill}/>

      {/* ── EXTERIOR WALLS ── */}
      {/* Top wall (bicycle storage behind – no windows) */}
      <line x1={x0} y1={y0} x2={x2} y2={y0} stroke={extW} strokeWidth={EW}/>
      {/* Left wall */}
      <line x1={x0} y1={y0} x2={x0} y2={y6} stroke={extW} strokeWidth={EW}/>
      {/* Right wall (parking lot) – gap for ET back door */}
      <line x1={x2} y1={y0}   x2={x2} y2={etDT}  stroke={extW} strokeWidth={EW}/>
      <line x1={x2} y1={etDB} x2={x2} y2={y6}     stroke={extW} strokeWidth={EW}/>
      {/* Bottom wall (street) – gap for main entry */}
      <line x1={x0}    y1={y6} x2={mainDL} y2={y6} stroke={extW} strokeWidth={EW}/>
      <line x1={mainDR} y1={y6} x2={x2}   y2={y6} stroke={extW} strokeWidth={EW}/>

      {/* ── INTERIOR WALLS ── */}

      {/* VH right wall (with door gap) */}
      <line x1={xVH} y1={y0}   x2={xVH} y2={vhDT}  stroke={intW} strokeWidth={IW}/>
      <line x1={xVH} y1={vhDB} x2={xVH} y2={yVH}   stroke={intW} strokeWidth={IW}/>

      {/* VH bottom wall */}
      <line x1={x0} y1={yVH} x2={xVH} y2={yVH} stroke={intW} strokeWidth={IW}/>

      {/* Neuvottelu bottom (y=yNeu) – full width with two door gaps:
          1) Neu→OH at Toimisto beam corner  2) ET↔Neu in ET column */}
      <line x1={x0}       y1={yNeu} x2={neuOhDL}  y2={yNeu} stroke={intW} strokeWidth={IW}/>
      <line x1={neuOhDR}  y1={yNeu} x2={etNeuDL}  y2={yNeu} stroke={intW} strokeWidth={IW}/>
      <line x1={etNeuDR}  y1={yNeu} x2={x2}        y2={yNeu} stroke={intW} strokeWidth={IW}/>

      {/* Toimisto left wall (no door – door is in bottom wall) */}
      <line x1={xToi} y1={yNeu} x2={xToi} y2={yToi} stroke={intW} strokeWidth={IW}/>

      {/* Toimisto/ET dividing wall */}
      <line x1={xET} y1={yNeu} x2={xET} y2={yToi} stroke={intW} strokeWidth={IW}/>

      {/* Toimisto bottom wall (with door gap on left portion) */}
      <line x1={xToi}  y1={yToi} x2={toiDL}  y2={yToi} stroke={intW} strokeWidth={IW}/>
      <line x1={toiDR} y1={yToi} x2={x2}      y2={yToi} stroke={intW} strokeWidth={IW}/>

      {/* ET/WC left wall (continuous, with WC door gap) */}
      <line x1={xET} y1={yToi} x2={xET} y2={wcDT}  stroke={intW} strokeWidth={IW}/>
      <line x1={xET} y1={wcDB} x2={xET} y2={yWC}   stroke={intW} strokeWidth={IW}/>

      {/* WC bottom wall */}
      <line x1={xET} y1={yWC}  x2={x2}  y2={yWC}   stroke={intW} strokeWidth={IW}/>

      {/* ── WINDOWS ── */}

      {/* Street: two large display windows flanking main door */}
      <rect x={win1L} y={y6 - 2} width={win1R - win1L} height={7} fill={win} rx="1"/>
      <rect x={win2L} y={y6 - 2} width={win2R - win2L} height={7} fill={win} rx="1"/>

      {/* Parking lot: two evenly-spaced windows on RIGHT WALL in Neuvottelu zone */}
      <rect x={x2 - 2} y={neuW1T} width={7} height={neuW1B - neuW1T} fill={win} rx="1"/>
      <rect x={x2 - 2} y={neuW2T} width={7} height={neuW2B - neuW2T} fill={win} rx="1"/>

      {/* ── DOORS ── */}

      {/* 1. Main entry – centered, street side, arc opens inward (up) */}
      <line x1={mainDL} y1={y6} x2={mainDL} y2={y6 - 54} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${mainDR} ${y6} A 54 54 0 0 0 ${mainDL} ${y6 - 54}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
      <text x={cx} y={y6 + 14} textAnchor="middle" fill={teal} fontSize="7.5" fontFamily="system-ui,sans-serif" fontWeight="700">{L.mainDoor}</text>
      <text x={cx} y={y6 + 25} textAnchor="middle" fill={teal} fontSize="8">↑</text>

      {/* 2. ET back door – right wall, arc opens inward (left) */}
      <line x1={x2} y1={etDT} x2={x2 - 48} y2={etDT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${x2} ${etDB} A 48 48 0 0 0 ${x2 - 48} ${etDT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
      <text x={x2 + 8} y={(etDT + etDB) / 2 + 4} textAnchor="start" fill={teal} fontSize="6.5" fontFamily="system-ui,sans-serif" fontWeight="700">{L.parkDoor}</text>

      {/* 3. VH door – right wall of VH (x=xVH), opens right into Neuvottelu */}
      <line x1={xVH} y1={vhDT} x2={xVH + 40} y2={vhDT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${xVH} ${vhDB} A 40 40 0 0 1 ${xVH + 40} ${vhDT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 4. ET ↔ Neuvottelu door – top wall of ET (y=yNeu), opens up into Neuvottelu */}
      <line x1={etNeuDL} y1={yNeu} x2={etNeuDL} y2={yNeu - 40} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${etNeuDR} ${yNeu} A 40 40 0 0 0 ${etNeuDL} ${yNeu - 40}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 5. Neuvottelu → OH door – at beam corner (y=yNeu, x=266→310), opens down into OH */}
      <line x1={neuOhDR} y1={yNeu} x2={neuOhDR} y2={yNeu + 44} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${neuOhDL} ${yNeu} A 44 44 0 0 1 ${neuOhDR} ${yNeu + 44}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 6. Toimisto door – bottom wall, left end, opens down into OH corridor */}
      <line x1={toiDR} y1={yToi} x2={toiDR} y2={yToi + 44} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${toiDL} ${yToi} A 44 44 0 0 0 ${toiDR} ${yToi + 44}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 7. WC door – left wall (x=xET), opens left into OH corridor */}
      <line x1={xET} y1={wcDT} x2={xET - 36} y2={wcDT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${xET} ${wcDB} A 36 36 0 0 0 ${xET - 36} ${wcDT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* ── ROOM LABELS ── */}

      {/* VH */}
      <text x={(x0 + xVH) / 2} y={y0 + 38} textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="700">{L.storage}</text>
      <text x={(x0 + xVH) / 2} y={y0 + 52} textAnchor="middle" fill={sub}  fontSize="8"  fontFamily="system-ui,sans-serif">5,1 m²</text>

      {/* Neuvottelu – label centred in main Neuvottelu area (avoiding VH corner) */}
      <text x={270} y={178} textAnchor="middle" fill={txt}  fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="700">{L.neu1}</text>
      <text x={270} y={193} textAnchor="middle" fill={txt}  fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="700">{L.neu2}</text>
      <text x={270} y={211} textAnchor="middle" fill={teal} fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="800">49,4 m²</text>

      {/* Toimisto */}
      <text x={(xToi + xET) / 2} y={(yNeu + yToi) / 2 - 6}  textAnchor="middle" fill={txt}  fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600">{L.office}</text>
      <text x={(xToi + xET) / 2} y={(yNeu + yToi) / 2 + 8}  textAnchor="middle" fill={teal} fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="700">9,6 m²</text>

      {/* Wine cabinet label */}
      <text x={wcabX + wcabW / 2} y={wcabY + 9}  textAnchor="middle" fill={teal} fontSize="5.5" fontFamily="system-ui,sans-serif">{L.wineCab.split("\n")[0]}</text>
      <text x={wcabX + wcabW / 2} y={wcabY + 18} textAnchor="middle" fill={teal} fontSize="5.5" fontFamily="system-ui,sans-serif">{L.wineCab.split("\n")[1]}</text>

      {/* ET */}
      <text x={(xET + x2) / 2} y={(yNeu + yToi) / 2 - 6}  textAnchor="middle" fill={txt}  fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600">{L.entry}</text>
      <text x={(xET + x2) / 2} y={(yNeu + yToi) / 2 + 8}  textAnchor="middle" fill={sub}  fontSize="7.5" fontFamily="system-ui,sans-serif">3,1 m²</text>

      {/* WC */}
      <text x={(xET + x2) / 2} y={(yToi + yWC) / 2 - 4}  textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="600">{L.wc}</text>
      <text x={(xET + x2) / 2} y={(yToi + yWC) / 2 + 9}  textAnchor="middle" fill={sub}  fontSize="8"  fontFamily="system-ui,sans-serif">2,5 m²</text>

      {/* OH+KEITTIÖ */}
      <text x={(x0 + xToi) / 2} y={(yNeu + y6) / 2 - 22} textAnchor="middle" fill={txt}  fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="700">{L.openOff1}</text>
      <text x={(x0 + xToi) / 2} y={(yNeu + y6) / 2 - 4}  textAnchor="middle" fill={sub}  fontSize="9"  fontFamily="system-ui,sans-serif">{L.openOff2}</text>
      <text x={(x0 + xToi) / 2} y={(yNeu + y6) / 2 + 18} textAnchor="middle" fill={teal} fontSize="15" fontFamily="system-ui,sans-serif" fontWeight="800">94,7 m²</text>

      {/* Parking lot annotation (rotated, right side) */}
      <text x={x2 + 10} y={(y0 + yNeu) / 2} textAnchor="start" fill={dimTxt} fontSize="7.5" fontFamily="system-ui,sans-serif" transform={`rotate(90,${x2 + 10},${(y0 + yNeu) / 2})`}>{L.parkingR}</text>

      {/* ── STREET INDICATOR ── */}
      <text x="260" y={y6 + 20} textAnchor="middle" fill={win} fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="0.6">
        {L.streetBot}
      </text>

      {/* ── DIMENSION LINES ── */}
      <line x1={x0} y1={y6 + 36} x2={x2} y2={y6 + 36} stroke={dim} strokeWidth="1"/>
      <line x1={x0} y1={y6 + 32} x2={x0} y2={y6 + 40} stroke={dim} strokeWidth="1"/>
      <line x1={x2} y1={y6 + 32} x2={x2} y2={y6 + 40} stroke={dim} strokeWidth="1"/>
      <text x="260" y={y6 + 50} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">{L.dimW}</text>

      <line x1="62" y1={y0} x2="62" y2={y6}  stroke={dim} strokeWidth="1"/>
      <line x1="58" y1={y0} x2="66" y2={y0}  stroke={dim} strokeWidth="1"/>
      <line x1="58" y1={y6} x2="66" y2={y6}  stroke={dim} strokeWidth="1"/>
      <text x="50" y={(y0 + y6) / 2} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif" transform={`rotate(-90,50,${(y0 + y6) / 2})`}>{L.dimD}</text>

      {/* ── LEGEND ── */}
      <rect x="80" y="672" width="200" height="44" fill="#0a1628" stroke="#1e293b" strokeWidth="1" rx="6" opacity="0.95"/>
      <text x="180" y="685" textAnchor="middle" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif" fontWeight="700">{L.legend}</text>
      <line x1="90"  y1="695" x2="118" y2="695" stroke={win} strokeWidth="4"/>
      <text x="124" y="698" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">{L.legWin}</text>
      <line x1="90"  y1="708" x2="118" y2="708" stroke={teal} strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="124" y="711" fill={sub} fontSize="8" fontFamily="system-ui,sans-serif">{L.legDoor}</text>

      {/* North arrow */}
      <text x="448" y="682" textAnchor="middle" fill={sub} fontSize="22">↑</text>
      <text x="448" y="699" textAnchor="middle" fill={sub} fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="700">{L.northLbl}</text>
      <text x="448" y="710" textAnchor="middle" fill={dim} fontSize="7" fontFamily="system-ui,sans-serif">{L.northSub}</text>
    </svg>
  );
}
