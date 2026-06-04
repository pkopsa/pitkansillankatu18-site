"use client";

import { useState } from "react";
import type { translations, Lang } from "@/translations";
import { BUNDLE, EXECUTIVE_HOUSING, HOTEL, type EHUnit } from "@/lib/pricing";

type T = (typeof translations)[Lang];
type DurationType = "day" | "threeDays" | "week";

const TEAM_SIZES = [1, 2, 4, 6, 8, 10];
const NIGHTS: Record<DurationType, number> = { day: 1, threeDays: 3, week: 7 };
const BUNDLE_PRICE: Record<DurationType, number> = {
  day: BUNDLE.day,
  threeDays: BUNDLE.threeDays,
  week: BUNDLE.week,
};

function fmt(n: number, lang: Lang): string {
  const s = Math.round(n).toString();
  const sep = lang === "en" ? "," : " ";
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) + " €";
}

function getRowLabel(unit: EHUnit, t: T): string {
  if (unit.id === "eh1") return t.ehCalcRowEh1;
  if (unit.id === "eh2") return t.ehCalcRowEh2;
  if (unit.id === "eh3") return t.ehCalcRowEh3;
  return unit.name;
}

export default function CostComparison({ t, lang }: { t: T; lang: Lang }) {
  const [teamSize, setTeamSize] = useState(4);
  const [duration, setDuration] = useState<DurationType>("threeDays");
  const [useSeaside, setUseSeaside] = useState(true);
  const [useNeristan, setUseNeristan] = useState(false);

  const nights = NIGHTS[duration];
  const meetingDays = nights;
  const bundlePrice = BUNDLE_PRICE[duration];

  const enabledUnitIds = ["eh1"];
  if (useSeaside) enabledUnitIds.push("eh2");
  if (useNeristan) enabledUnitIds.push("eh3");

  // Allocate accommodation
  let remaining = teamSize;
  const allocation: { unit: EHUnit; people: number }[] = [];
  for (const unit of EXECUTIVE_HOUSING) {
    if (remaining <= 0) break;
    if (!enabledUnitIds.includes(unit.id)) continue;
    const placed = Math.min(remaining, unit.capacity);
    if (placed > 0) {
      allocation.push({ unit, people: placed });
      remaining -= placed;
    }
  }
  const overflow = remaining;

  // Cost calculation
  let ehExtraCost = 0;
  for (const a of allocation) {
    if (a.unit.id === "eh1") continue;
    ehExtraCost += a.unit.nightlyRate * nights;
  }
  const overflowCost = overflow * nights * HOTEL.nightPerPerson;
  const packageTotal = bundlePrice + ehExtraCost + overflowCost;
  const hotelTotal = teamSize * nights * HOTEL.nightPerPerson + meetingDays * HOTEL.meetingRoomPerDay;
  const savings = hotelTotal - packageTotal;
  const savingsPct = hotelTotal > 0 ? Math.round((savings / hotelTotal) * 100) : 0;
  const isOversized = savings < 0;

  const btnBase = "px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all duration-200";
  const btnActive = "bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/30";
  const btnInactive = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  const durationOptions: { key: DurationType; label: string }[] = [
    { key: "day", label: t.ehCalcDurationDay },
    { key: "threeDays", label: t.ehCalcDurationThreeDays },
    { key: "week", label: t.ehCalcDurationWeek },
  ];

  return (
    <section className="bg-slate-900 py-14 px-4 lg:py-28 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Otsikko */}
        <div className="text-center mb-10 lg:mb-16">
          <span className="inline-block bg-teal-500/10 text-teal-400 text-xs lg:text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-teal-500/20">
            {t.ehCalcBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-white mb-3 lg:mb-5 tracking-tight">
            {t.ehCalcTitle}
          </h2>
          <p className="text-base lg:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.ehCalcSub}
          </p>
        </div>

        {/* Säätimet */}
        <div className="bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 mb-8 lg:mb-12 border border-white/5 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-8">

            {/* Tiimin koko */}
            <div>
              <p className="text-slate-400 text-sm lg:text-base font-semibold uppercase tracking-widest mb-4">
                {t.ehCalcTeamLabel}
              </p>
              <div className="flex gap-2 lg:gap-3 flex-wrap">
                {TEAM_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setTeamSize(s)}
                    aria-pressed={teamSize === s}
                    className={`${btnBase} ${teamSize === s ? btnActive : btnInactive}`}
                  >
                    {s} {t.ehCalcTeamUnit}
                  </button>
                ))}
              </div>
            </div>

            {/* Kesto */}
            <div>
              <p className="text-slate-400 text-sm lg:text-base font-semibold uppercase tracking-widest mb-4">
                {t.ehCalcDurationLabel}
              </p>
              <div className="flex gap-2 lg:gap-3 flex-wrap">
                {durationOptions.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setDuration(key)}
                    aria-pressed={duration === key}
                    className={`${btnBase} ${duration === key ? btnActive : btnInactive}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kytkimet EH2/EH3 */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useSeaside}
                onChange={(e) => setUseSeaside(e.target.checked)}
                className="w-4 h-4 accent-teal-500"
                aria-label={t.ehCalcUseSeaside}
              />
              <span className="text-slate-300 text-sm lg:text-base">{t.ehCalcUseSeaside}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useNeristan}
                onChange={(e) => setUseNeristan(e.target.checked)}
                className="w-4 h-4 accent-teal-500"
                aria-label={t.ehCalcUseNeristan}
              />
              <span className="text-slate-300 text-sm lg:text-base">{t.ehCalcUseNeristan}</span>
            </label>
          </div>
        </div>

        {/* Rivierittely */}
        <div className="bg-slate-800 rounded-2xl lg:rounded-3xl overflow-hidden border border-white/5 shadow-xl mb-8">
          <table className="w-full text-sm lg:text-base" role="table" aria-label={t.ehCalcTitle}>
            <tbody>
              {/* Hotellivertailurivi */}
              <tr className="border-b border-white/5">
                <td className="px-5 lg:px-8 py-4 text-slate-400">{t.ehCalcRowHotel}</td>
                <td className="px-5 lg:px-8 py-4 text-right font-bold text-rose-400">{fmt(hotelTotal, lang)}</td>
              </tr>

              {/* Coworking */}
              <tr className="border-b border-white/5 bg-slate-800/50">
                <td className="px-5 lg:px-8 py-4 text-slate-300">{t.ehCalcRowCoworking}</td>
                <td className="px-5 lg:px-8 py-4 text-right font-semibold text-teal-400">
                  {fmt(bundlePrice, lang)}
                  <span className="text-slate-500 text-xs ml-1">(+EH1)</span>
                </td>
              </tr>

              {/* Allokaatiorivit */}
              {allocation.map((a) => {
                const cost = a.unit.id === "eh1"
                  ? 0
                  : a.unit.nightlyRate * nights;
                return (
                  <tr key={a.unit.id} className="border-b border-white/5">
                    <td className="px-5 lg:px-8 py-4 text-slate-300">
                      {getRowLabel(a.unit, t)}
                      <span className="text-slate-500 text-xs ml-2">
                        ({a.people} {t.ehCalcTeamUnit})
                      </span>
                      {a.unit.external && (
                        <span className="ml-2 text-xs text-amber-400 font-semibold">★</span>
                      )}
                    </td>
                    <td className="px-5 lg:px-8 py-4 text-right font-semibold text-teal-400">
                      {a.unit.id === "eh1"
                        ? <span className="text-slate-500 text-xs">{lang === "fi" ? "sis. bundleen" : lang === "sv" ? "inkl. i paket" : "incl. in bundle"}</span>
                        : fmt(cost, lang)
                      }
                    </td>
                  </tr>
                );
              })}

              {/* Ylivuoto */}
              {overflow > 0 && (
                <tr className="border-b border-white/5">
                  <td className="px-5 lg:px-8 py-4 text-slate-400">
                    {t.ehCalcRowOverflow}
                    <span className="text-slate-500 text-xs ml-2">({overflow} {t.ehCalcTeamUnit})</span>
                  </td>
                  <td className="px-5 lg:px-8 py-4 text-right font-semibold text-amber-400">{fmt(overflowCost, lang)}</td>
                </tr>
              )}

              {/* Paketti yhteensä */}
              <tr className="border-b border-white/10 bg-teal-500/5">
                <td className="px-5 lg:px-8 py-5 font-bold text-white text-base lg:text-lg">{t.ehCalcRowTotal}</td>
                <td className="px-5 lg:px-8 py-5 text-right font-black text-xl lg:text-2xl text-teal-400">{fmt(packageTotal, lang)}</td>
              </tr>

              {/* Säästö */}
              <tr className={savings > 0 ? "bg-emerald-500/10" : "bg-slate-700/30"}>
                <td className="px-5 lg:px-8 py-5 font-bold text-base lg:text-lg" style={{ color: savings > 0 ? "#34d399" : "#94a3b8" }}>
                  {t.ehCalcRowSavings}
                </td>
                <td className="px-5 lg:px-8 py-5 text-right font-black text-xl lg:text-2xl" style={{ color: savings > 0 ? "#34d399" : "#f87171" }}>
                  {savings > 0 ? fmt(savings, lang) : fmt(Math.abs(savings), lang)}
                  {savings > 0 && (
                    <span className="block text-sm font-semibold text-emerald-500">
                      {savingsPct} % {t.ehCalcCheaper}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Rehellisyysehto */}
        {isOversized && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 lg:p-6 mb-8">
            <p className="text-amber-300 text-sm lg:text-base leading-relaxed">{t.ehCalcOversized}</p>
          </div>
        )}

        {/* Laskentaperusteet */}
        <div className="bg-slate-800/50 rounded-2xl p-5 lg:p-7 border border-white/5">
          <p className="text-slate-500 text-xs lg:text-sm font-semibold uppercase tracking-widest mb-3">
            {t.costBasisTitle}
          </p>
          <div className="flex flex-col gap-2 text-xs lg:text-sm text-slate-500">
            <span>{t.ehCalcBasisBundle}</span>
            <span>{t.ehCalcBasisHotel}</span>
          </div>
          <p className="text-slate-500 text-xs mt-3 border-t border-white/5 pt-3">{t.ehCalcVatNote}</p>
        </div>

      </div>
    </section>
  );
}
