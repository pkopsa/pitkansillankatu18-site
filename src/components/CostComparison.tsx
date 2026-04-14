"use client";

import { useState } from "react";
import type { translations, Lang } from "@/translations";

type T = typeof translations[Lang];

const TEAM_SIZES = [4, 6, 8, 10];
const DURATIONS = [6, 12, 18, 24];

const HOTEL_NIGHT = 89;
const WORK_DAYS = 22;
const COWORK_MONTHLY = 350;
const P18_MONTHLY = 1800;

function fmt(n: number, lang: Lang): string {
  const s = Math.round(n).toString();
  // fi/sv: välilyönti tuhaterottimena, en: pilkku
  const sep = lang === "en" ? "," : "\u00A0";
  const grouped = s.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return grouped + " €";
}

export default function CostComparison({ t, lang }: { t: T; lang: Lang }) {
  const [team, setTeam] = useState(6);
  const [months, setMonths] = useState(12);

  const hotelTotal = HOTEL_NIGHT * WORK_DAYS * team * months;
  const coworkTotal = COWORK_MONTHLY * team * months;
  const p18Total = P18_MONTHLY * months;
  const maxCost = hotelTotal; // hotel is always highest

  const savingVsHotel = hotelTotal - p18Total;
  const savingVsHotelPct = Math.round((savingVsHotel / hotelTotal) * 100);
  const savingVsCowork = coworkTotal - p18Total;
  const savingVsCoworkPct = Math.round((savingVsCowork / coworkTotal) * 100);

  const bars = [
    {
      label: t.costOptA,
      total: hotelTotal,
      monthly: Math.round(hotelTotal / months),
      barColor: "#f43f5e",
      textColor: "#fb7185",
    },
    {
      label: t.costOptB,
      total: coworkTotal,
      monthly: Math.round(coworkTotal / months),
      barColor: "#f59e0b",
      textColor: "#fbbf24",
    },
    {
      label: t.costOptC,
      total: p18Total,
      monthly: P18_MONTHLY,
      barColor: "#14b8a6",
      textColor: "#2dd4bf",
      cheapest: true,
    },
  ];

  const btnBase =
    "px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all duration-200";
  const btnActive = "bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/30";
  const btnInactive = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  return (
    <section className="bg-slate-900 py-14 px-4 lg:py-28 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Otsikko */}
        <div className="text-center mb-10 lg:mb-16">
          <span className="inline-block bg-teal-500/10 text-teal-400 text-xs lg:text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-teal-500/20">
            {t.costBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-white mb-3 lg:mb-5 tracking-tight">
            {t.costTitle}
          </h2>
          <p className="text-base lg:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.costSub}
          </p>
        </div>

        {/* Säätimet */}
        <div className="bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 mb-8 lg:mb-12 border border-white/5 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            {/* Tiimin koko */}
            <div>
              <p className="text-slate-400 text-sm lg:text-base font-semibold uppercase tracking-widest mb-4">
                {t.costTeamLabel}
              </p>
              <div className="flex gap-2 lg:gap-3 flex-wrap">
                {TEAM_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setTeam(s)}
                    className={`${btnBase} ${team === s ? btnActive : btnInactive}`}
                  >
                    {s} {t.costTeamUnit}
                  </button>
                ))}
              </div>
            </div>

            {/* Projektin kesto */}
            <div>
              <p className="text-slate-400 text-sm lg:text-base font-semibold uppercase tracking-widest mb-4">
                {t.costDurationLabel}
              </p>
              <div className="flex gap-2 lg:gap-3 flex-wrap">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setMonths(d)}
                    className={`${btnBase} ${months === d ? btnActive : btnInactive}`}
                  >
                    {d} {t.costDurationUnit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pylväskaavio */}
        <div className="bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 mb-8 lg:mb-12 border border-white/5 shadow-xl">
          <div className="space-y-6 lg:space-y-8">
            {bars.map((bar) => {
              const widthPct = Math.round((bar.total / maxCost) * 100);
              return (
                <div key={bar.label}>
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm lg:text-base text-white">
                        {bar.label}
                      </span>
                      {bar.cheapest && (
                        <span className="text-xs bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded-full font-semibold">
                          {t.costCheapest}
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black text-xl lg:text-2xl" style={{ color: bar.textColor }}>
                        {fmt(bar.total, lang)}
                      </span>
                      <br />
                      <span className="text-slate-500 text-xs lg:text-sm">
                        {fmt(bar.monthly, lang)}{t.costPerMonth}
                      </span>
                    </div>
                  </div>
                  <div className="h-8 lg:h-10 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${widthPct}%`, backgroundColor: bar.barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Säästökortit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-slate-800 rounded-2xl p-6 lg:p-8 border border-teal-500/20 shadow-xl">
            <p className="text-slate-400 text-sm lg:text-base font-semibold mb-3">
              {t.costSavingVsHotel}
            </p>
            <p className="text-3xl lg:text-4xl font-black text-teal-400 mb-1">
              {fmt(savingVsHotel, lang)}
            </p>
            <p className="text-slate-400 text-sm lg:text-base">
              {savingVsHotelPct} % {lang === "fi" ? "halvempi" : lang === "sv" ? "billigare" : "cheaper"}
            </p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 lg:p-8 border border-teal-500/20 shadow-xl">
            <p className="text-slate-400 text-sm lg:text-base font-semibold mb-3">
              {t.costSavingVsCowork}
            </p>
            <p className="text-3xl lg:text-4xl font-black text-teal-400 mb-1">
              {fmt(savingVsCowork, lang)}
            </p>
            <p className="text-slate-400 text-sm lg:text-base">
              {savingVsCoworkPct} % {lang === "fi" ? "halvempi" : lang === "sv" ? "billigare" : "cheaper"}
            </p>
          </div>
        </div>

        {/* Laskentaperusteet */}
        <div className="bg-slate-800/50 rounded-2xl p-5 lg:p-7 border border-white/5">
          <p className="text-slate-500 text-xs lg:text-sm font-semibold uppercase tracking-widest mb-3">
            {t.costBasisTitle}
          </p>
          <div className="flex flex-wrap gap-4 lg:gap-8 text-xs lg:text-sm text-slate-500">
            <span><span className="font-semibold" style={{ color: "#fb7185" }}>A:</span> {t.costBasisHotel}</span>
            <span><span className="font-semibold" style={{ color: "#fbbf24" }}>B:</span> {t.costBasisCowork}</span>
            <span><span className="font-semibold" style={{ color: "#2dd4bf" }}>C:</span> {t.costBasisP18}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
