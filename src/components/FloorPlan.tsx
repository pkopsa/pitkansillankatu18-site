import { Lang } from "@/translations";

const labels = {
  fi: {
    header:   "POHJAPIIRROS – PITKÄNSILLANKATU 18  ·  KATUTASO",
    note:     "225 m²  ·  Suuntaa-antava arvio  ·  Mitoitus tarkistetaan esittelyssä",
    streetBot:"↓  PITKÄNSILLANKATU  –  NÄYTEIKKUNAT & PÄÄOVI  ↓",
    parkingR: "→  PARKKIPAIKKA",
    bikeStore:"← taloyhtiön pyörävarasto (takaseinän takana)",
    openOff1: "OH + KEITTIÖ",
    openOff2: "Day Lounge / Open Office",
    neu1:     "NEUVOTTELU-",
    neu2:     "HUONE",
    office:   "TOIMISTO",
    entry:    "ETEINEN",
    storage:  "VH",
    wc:       "WC",
    stairs:   "portaat\nalakertaan",
    mainDoor: "PÄÄOVI",
    parkDoor: "TAKAOVI",
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
    openOff2: "Day Lounge / Open Office",
    neu1:     "KONFERENS-",
    neu2:     "RUM",
    office:   "KONTOR",
    entry:    "HALL",
    storage:  "VH",
    wc:       "WC",
    stairs:   "trappa\nnedåt",
    mainDoor: "INGÅNG",
    parkDoor: "BAKDÖRR",
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
    openOff2: "Day Lounge / Open Office",
    neu1:     "MEETING",
    neu2:     "ROOM",
    office:   "OFFICE",
    entry:    "ENTRY",
    storage:  "STORAGE",
    wc:       "WC",
    stairs:   "stairs to\nlower level",
    mainDoor: "MAIN DOOR",
    parkDoor: "BACK DOOR",
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
  const stairFill = "#131f30";
  const teal      = "#14b8a6";
  const win       = "#7dd3fc";
  const txt       = "#e2e8f0";
  const sub       = "#64748b";
  const dim       = "#475569";
  const dimTxt    = "#2d3f55";

  // ── COORDINATES ────────────────────────────────────────────────
  // Orientation: street at BOTTOM, parking lot at RIGHT, bicycle storage at TOP

  const x0  = 80;   // left exterior wall
  const xVH = 183;  // VH right edge (narrower than before)
  const xR  = 370;  // Neuvottelu right / service-strip left (at top zone)
  const x2  = 450;  // right exterior wall (PARKING LOT side)

  const y0   = 58;  // top/back wall (bicycle storage behind)
  const yVH  = 192; // VH bottom / top-zone ends
  const yNeu = 308; // Neuvottelu bottom / OH+KEITTIÖ top
  const yToi = 402; // Toimisto bottom
  const yWC  = 460; // WC bottom
  const y6   = 648; // street / bottom wall

  // Staircase: in lower-right of Neuvottelu zone (inside expanded Neuvottelu)
  const stairL = x2 - 95;  // 355
  const stairR = x2 - 8;   // 442
  const stairT = yVH + 18;
  const stairB = yNeu - 5;
  const stairSteps = 8;

  // Main entrance: CENTERED in bottom wall
  const cx      = (x0 + x2) / 2;  // 265
  const mainDL  = cx - 27;         // 238
  const mainDR  = cx + 27;         // 292

  // Display windows (centred, flanking the main door)
  const win1L = x0 + 32;   // 112
  const win1R = x0 + 118;  // 198
  const win2L = x2 - 118;  // 332
  const win2R = x2 - 32;   // 418

  // Neuvottelu parking-lot windows on RIGHT wall (x2), in lower Neuvottelu zone
  const neuW1T = yVH + 12;
  const neuW1B = yVH + 55;
  const neuW2T = yVH + 65;
  const neuW2B = yVH + 108;

  // ET back door: on RIGHT wall, inside ET room
  const etDT = y0 + 38;
  const etDB = y0 + 88;

  // VH door in bottom wall of VH (y=yVH)
  const vhDL = x0 + 18;
  const vhDR = x0 + 58;

  // Neuvottelu ↔ ET internal door (wall at xR, y0–yVH zone)
  const neuEtDT = y0 + 42;
  const neuEtDB = y0 + 85;

  // Neuvottelu → OH door in horizontal wall (y=yNeu)
  const neuOhDL = x0 + 22;
  const neuOhDR = x0 + 68;

  // Toimisto door in wall at xR (y=yNeu..yToi zone)
  const toiDT = yNeu + 14;
  const toiDB = yNeu + 58;

  // WC door in wall at xR
  const wcDT = yToi + 10;
  const wcDB = yToi + 46;

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

      {/* ── Bicycle storage annotation (outside top wall) ── */}
      <text x="260" y="53" textAnchor="middle" fill={dimTxt} fontSize="7.5" fontFamily="system-ui,sans-serif" fontStyle="italic">
        {L.bikeStore}
      </text>

      {/* ── ROOM FILLS ── */}
      {/* VH – top-left, narrower + deeper */}
      <rect x={x0}  y={y0}  width={xVH-x0}   height={yVH-y0}  fill={utilFill}/>
      {/* ET – top-right, with back door */}
      <rect x={xR}  y={y0}  width={x2-xR}    height={yVH-y0}  fill={corrFill}/>
      {/* Neuvottelu – top middle strip (between VH and ET) */}
      <rect x={xVH} y={y0}  width={xR-xVH}   height={yVH-y0}  fill={roomFill}/>
      {/* Neuvottelu – lower full-width zone (expanded over staircase to right wall) */}
      <rect x={x0}  y={yVH} width={x2-x0}    height={yNeu-yVH} fill={roomFill}/>
      {/* Staircase symbol inside lower Neuvottelu */}
      <rect x={stairL} y={stairT} width={stairR-stairL} height={stairB-stairT} fill={stairFill}/>
      {/* OH+KEITTIÖ – left/main part */}
      <rect x={x0}  y={yNeu} width={xR-x0}   height={y6-yNeu} fill={roomFill}/>
      {/* Toimisto – right strip */}
      <rect x={xR}  y={yNeu} width={x2-xR}   height={yToi-yNeu} fill={roomFill}/>
      {/* WC – right strip */}
      <rect x={xR}  y={yToi} width={x2-xR}   height={yWC-yToi} fill={wetFill}/>
      {/* OH+KEITTIÖ – right lower extension (below WC) */}
      <rect x={xR}  y={yWC}  width={x2-xR}   height={y6-yWC}  fill={roomFill}/>

      {/* ── STAIRCASE LINES ── */}
      {Array.from({ length: stairSteps }).map((_, i) => {
        const sy = stairT + ((stairB - stairT) / stairSteps) * (i + 0.5);
        return <line key={i} x1={stairL+2} y1={sy} x2={stairR-2} y2={sy} stroke={intW} strokeWidth="1" opacity="0.45"/>;
      })}
      <line x1={(stairL+stairR)/2} y1={stairT+8} x2={(stairL+stairR)/2} y2={stairB-8} stroke={teal} strokeWidth="1" opacity="0.45"/>
      <polygon points={`${(stairL+stairR)/2-5},${stairB-18} ${(stairL+stairR)/2+5},${stairB-18} ${(stairL+stairR)/2},${stairB-6}`} fill={teal} opacity="0.4"/>

      {/* ── EXTERIOR WALLS ── */}
      {/* Top wall (bicycle storage behind – NO windows) */}
      <line x1={x0} y1={y0} x2={x2} y2={y0} stroke={extW} strokeWidth={EW}/>
      {/* Left wall */}
      <line x1={x0} y1={y0} x2={x0} y2={y6} stroke={extW} strokeWidth={EW}/>
      {/* Right wall (parking lot) – with ET back-door gap */}
      <line x1={x2} y1={y0}   x2={x2} y2={etDT}  stroke={extW} strokeWidth={EW}/>
      <line x1={x2} y1={etDB} x2={x2} y2={y6}     stroke={extW} strokeWidth={EW}/>
      {/* Bottom wall (street) – gap for main entry */}
      <line x1={x0}    y1={y6} x2={mainDL} y2={y6} stroke={extW} strokeWidth={EW}/>
      <line x1={mainDR} y1={y6} x2={x2}   y2={y6} stroke={extW} strokeWidth={EW}/>

      {/* ── INTERIOR WALLS ── */}
      {/* VH right edge */}
      <line x1={xVH} y1={y0}  x2={xVH} y2={yVH} stroke={intW} strokeWidth={IW}/>
      {/* VH bottom (with door gap) */}
      <line x1={x0}   y1={yVH} x2={vhDL}  y2={yVH} stroke={intW} strokeWidth={IW}/>
      <line x1={vhDR} y1={yVH} x2={xVH}   y2={yVH} stroke={intW} strokeWidth={IW}/>
      {/* ET left edge (with door gap to Neuvottelu) */}
      <line x1={xR} y1={y0}      x2={xR} y2={neuEtDT} stroke={intW} strokeWidth={IW}/>
      <line x1={xR} y1={neuEtDB} x2={xR} y2={yVH}     stroke={intW} strokeWidth={IW}/>
      {/* Horizontal wall: top zone | lower Neuvottelu (none – Neuvottelu is open plan here) */}
      {/* Neuvottelu bottom / OH+KEITTIÖ top (with door gap) */}
      <line x1={x0}      y1={yNeu} x2={neuOhDL} y2={yNeu} stroke={intW} strokeWidth={IW}/>
      <line x1={neuOhDR} y1={yNeu} x2={xR}      y2={yNeu} stroke={intW} strokeWidth={IW}/>
      {/* Right service strip left edge: Toimisto and WC (with door gaps) */}
      <line x1={xR} y1={yNeu}  x2={xR} y2={toiDT}  stroke={intW} strokeWidth={IW}/>
      <line x1={xR} y1={toiDB} x2={xR} y2={yToi}   stroke={intW} strokeWidth={IW}/>
      <line x1={xR} y1={yToi}  x2={xR} y2={wcDT}   stroke={intW} strokeWidth={IW}/>
      <line x1={xR} y1={wcDB}  x2={xR} y2={yWC}    stroke={intW} strokeWidth={IW}/>
      <line x1={xR} y1={yWC}   x2={xR} y2={y6}     stroke={intW} strokeWidth={IW}/>
      {/* Toimisto bottom */}
      <line x1={xR} y1={yToi} x2={x2} y2={yToi} stroke={intW} strokeWidth={IW}/>
      {/* WC bottom */}
      <line x1={xR} y1={yWC}  x2={x2} y2={yWC}  stroke={intW} strokeWidth={IW}/>

      {/* ── WINDOWS ── */}
      {/* Bottom wall: two large display windows flanking central door */}
      <rect x={win1L} y={y6-2} width={win1R-win1L} height={7} fill={win} rx="1"/>
      <rect x={win2L} y={y6-2} width={win2R-win2L} height={7} fill={win} rx="1"/>
      {/* Right wall: TWO large windows in Neuvottelu zone (parking lot) */}
      <rect x={x2-2} y={neuW1T} width={7} height={neuW1B-neuW1T} fill={win} rx="1"/>
      <rect x={x2-2} y={neuW2T} width={7} height={neuW2B-neuW2T} fill={win} rx="1"/>
      {/* Top wall: NO windows (bicycle storage) – intentionally omitted */}

      {/* ── DOORS ── */}
      {/* 1. Main entry – centered, street side, arc opens inward (up) */}
      <line x1={mainDL} y1={y6} x2={mainDL} y2={y6-54} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${mainDR} ${y6} A 54 54 0 0 0 ${mainDL} ${y6-54}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
      <text x={cx} y={y6+14} textAnchor="middle" fill={teal} fontSize="7.5" fontFamily="system-ui,sans-serif" fontWeight="700">{L.mainDoor}</text>
      <text x={cx} y={y6+25} textAnchor="middle" fill={teal} fontSize="8">↑</text>

      {/* 2. ET back door – right wall, arc opens outward (right) */}
      <line x1={x2} y1={etDT} x2={x2-50} y2={etDT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${x2} ${etDB} A 50 50 0 0 0 ${x2-50} ${etDT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
      <text x={x2+8} y={(etDT+etDB)/2+4} textAnchor="start" fill={teal} fontSize="6.5" fontFamily="system-ui,sans-serif" fontWeight="700">{L.parkDoor}</text>

      {/* 3. ET ↔ Neuvottelu internal door (wall at xR) */}
      <line x1={xR} y1={neuEtDT} x2={xR-42} y2={neuEtDT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${xR} ${neuEtDB} A 43 43 0 0 0 ${xR-42} ${neuEtDT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 4. VH door (bottom wall of VH) */}
      <line x1={vhDL} y1={yVH} x2={vhDL} y2={yVH+40} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${vhDR} ${yVH} A 40 40 0 0 0 ${vhDL} ${yVH+40}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 5. Neuvottelu → OH door (horizontal wall y=yNeu) */}
      <line x1={neuOhDR} y1={yNeu} x2={neuOhDR} y2={yNeu+46} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${neuOhDL} ${yNeu} A 46 46 0 0 1 ${neuOhDR} ${yNeu+46}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 6. Toimisto door (wall at xR) */}
      <line x1={xR} y1={toiDT} x2={xR-42} y2={toiDT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${xR} ${toiDB} A 44 44 0 0 0 ${xR-42} ${toiDT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* 7. WC door (wall at xR) */}
      <line x1={xR} y1={wcDT} x2={xR-34} y2={wcDT} stroke={teal} strokeWidth="1.5" opacity="0.9"/>
      <path d={`M ${xR} ${wcDB} A 36 36 0 0 0 ${xR-34} ${wcDT}`} fill="none" stroke={teal} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>

      {/* ── ROOM LABELS ── */}
      {/* VH */}
      <text x={(x0+xVH)/2} y={y0+42} textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="700">{L.storage}</text>
      <text x={(x0+xVH)/2} y={y0+57} textAnchor="middle" fill={sub}  fontSize="8"  fontFamily="system-ui,sans-serif">5,1 m²</text>

      {/* ET */}
      <text x={(xR+x2)/2}  y={y0+62} textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="700">{L.entry}</text>
      <text x={(xR+x2)/2}  y={y0+77} textAnchor="middle" fill={sub}  fontSize="8"  fontFamily="system-ui,sans-serif">3,1 m²</text>

      {/* Neuvottelu – label in lower wide zone */}
      <text x={(x0+stairL)/2} y={yVH+65}  textAnchor="middle" fill={txt}  fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="700">{L.neu1}</text>
      <text x={(x0+stairL)/2} y={yVH+80}  textAnchor="middle" fill={txt}  fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="700">{L.neu2}</text>
      <text x={(x0+stairL)/2} y={yVH+98}  textAnchor="middle" fill={teal} fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="800">49,4 m²</text>

      {/* Staircase label */}
      <text x={(stairL+stairR)/2} y={(stairT+stairB)/2-6}  textAnchor="middle" fill={dimTxt} fontSize="6.5" fontFamily="system-ui,sans-serif">{L.stairs.split("\n")[0]}</text>
      <text x={(stairL+stairR)/2} y={(stairT+stairB)/2+7}  textAnchor="middle" fill={dimTxt} fontSize="6.5" fontFamily="system-ui,sans-serif">{L.stairs.split("\n")[1]}</text>

      {/* OH+KEITTIÖ */}
      <text x={(x0+xR)/2} y={(yNeu+y6)/2-22} textAnchor="middle" fill={txt}  fontSize="14" fontFamily="system-ui,sans-serif" fontWeight="700">{L.openOff1}</text>
      <text x={(x0+xR)/2} y={(yNeu+y6)/2-4}  textAnchor="middle" fill={sub}  fontSize="9"  fontFamily="system-ui,sans-serif">{L.openOff2}</text>
      <text x={(x0+xR)/2} y={(yNeu+y6)/2+18} textAnchor="middle" fill={teal} fontSize="16" fontFamily="system-ui,sans-serif" fontWeight="800">94,7 m²</text>

      {/* Toimisto */}
      <text x={(xR+x2)/2} y={(yNeu+yToi)/2-4}  textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="600">{L.office}</text>
      <text x={(xR+x2)/2} y={(yNeu+yToi)/2+10} textAnchor="middle" fill={teal} fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="700">9,6 m²</text>

      {/* WC */}
      <text x={(xR+x2)/2} y={(yToi+yWC)/2-3}  textAnchor="middle" fill={txt}  fontSize="9"  fontFamily="system-ui,sans-serif" fontWeight="600">{L.wc}</text>
      <text x={(xR+x2)/2} y={(yToi+yWC)/2+10} textAnchor="middle" fill={sub}  fontSize="8"  fontFamily="system-ui,sans-serif">2,5 m²</text>

      {/* Parking lot label on right */}
      <text x={x2+10} y={(y0+yNeu)/2} textAnchor="start" fill={dimTxt} fontSize="7.5" fontFamily="system-ui,sans-serif" transform={`rotate(90,${x2+10},${(y0+yNeu)/2})`}>{L.parkingR}</text>

      {/* ── STREET INDICATOR ── */}
      <text x="260" y={y6+20} textAnchor="middle" fill={win} fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="0.6">
        {L.streetBot}
      </text>

      {/* ── DIMENSION LINES ── */}
      <line x1={x0} y1={y6+36} x2={x2} y2={y6+36} stroke={dim} strokeWidth="1"/>
      <line x1={x0} y1={y6+32} x2={x0} y2={y6+40} stroke={dim} strokeWidth="1"/>
      <line x1={x2} y1={y6+32} x2={x2} y2={y6+40} stroke={dim} strokeWidth="1"/>
      <text x="260" y={y6+50} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif">{L.dimW}</text>

      <line x1="62" y1={y0} x2="62" y2={y6}  stroke={dim} strokeWidth="1"/>
      <line x1="58" y1={y0} x2="66" y2={y0}  stroke={dim} strokeWidth="1"/>
      <line x1="58" y1={y6} x2="66" y2={y6}  stroke={dim} strokeWidth="1"/>
      <text x="50" y={(y0+y6)/2} textAnchor="middle" fill={dim} fontSize="8" fontFamily="system-ui,sans-serif" transform={`rotate(-90,50,${(y0+y6)/2})`}>{L.dimD}</text>

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
