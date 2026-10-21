"use client";

import { useState } from "react";
import { LINKS, RENT, formatEur, type Lang } from "@/config/site";
import type { T } from "@/translations";

type PkgId = keyof typeof RENT.packages;
const PKG_IDS: PkgId[] = ["eh1", "eh2", "eh3"];

function pkgName(id: PkgId, t: T): string {
  return id === "eh1" ? t.pkgEh1Name : id === "eh2" ? t.pkgEh2Name : t.pkgEh3Name;
}

// Pienin paketti, johon tiimi mahtuu
function suggestPackage(team: number): PkgId {
  return PKG_IDS.find((id) => team <= RENT.packages[id].persons[1]) ?? "eh3";
}

function range([a, b]: readonly [number, number]): string {
  return `${a}–${b}`;
}

export default function RentPackages({ t, lang, onCta }: { t: T; lang: Lang; onCta: (prefill: string) => void }) {
  const [team, setTeam] = useState<number>(6);
  const [months, setMonths] = useState<number>(3);

  const cards = [
    { id: "eh1" as const, name: t.pkgEh1Name, forWho: t.pkgEh1For, space: t.pkgEh1Space },
    { id: "eh2" as const, name: t.pkgEh2Name, forWho: t.pkgEh2For, space: t.pkgEh2Space },
    { id: "eh3" as const, name: t.pkgEh3Name, forWho: t.pkgEh3For, space: t.pkgEh3Space },
  ];

  const suggested = suggestPackage(team);
  const monthly = RENT.packages[suggested].monthly;
  const total = monthly * months;
  const coworking = RENT.coworkingDeskMonthly * team * months;
  const diff = coworking - total;

  function ask(name: string) {
    onCta(t.pkgPrefill.replace("{paketti}", name));
  }

  return (
    <section id="tilapaketit" className="bg-slate-900 py-14 px-4 lg:py-28 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 lg:mb-16">
          <span className="inline-block bg-teal-500/10 text-teal-400 text-xs lg:text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-teal-500/20">
            {t.pkgBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-3 lg:mb-5 tracking-tight">{t.pkgTitle}</h2>
          <p className="text-base lg:text-xl text-slate-400 max-w-2xl mx-auto">{t.pkgSub}</p>
        </div>

        {/* Paketit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          {cards.map((c) => {
            const p = RENT.packages[c.id];
            return (
              <div key={c.id} className="bg-slate-800 rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">{c.name}</h3>
                  <span className="text-xs font-semibold bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded-full shrink-0">
                    {c.id.toUpperCase()}
                  </span>
                </div>
                <dl className="text-sm space-y-2 flex-1">
                  <div>
                    <dt className="text-slate-400 text-xs uppercase tracking-wider">{t.pkgForLabel}</dt>
                    <dd className="text-slate-200">{c.forWho}, {range(p.persons)} {t.pkgPersonsUnit}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 text-xs uppercase tracking-wider">{t.pkgSpaceLabel}</dt>
                    <dd className="text-slate-200">{c.space}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 text-xs uppercase tracking-wider">{t.pkgDurationLabel}</dt>
                    <dd className="text-slate-200">{range(p.months)} {t.pkgMonthsUnit}</dd>
                  </div>
                </dl>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider">{t.pkgPriceLabel}</p>
                  <p className="text-teal-400 font-black text-2xl">{formatEur(p.monthly, lang)}</p>
                  <p className="text-slate-400 text-xs">{t.pkgPerMonth}</p>
                </div>
                <button
                  onClick={() => ask(c.name)}
                  className="mt-auto text-left text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  {t.pkgCta} →
                </button>
              </div>
            );
          })}

          {/* Koko tila – pitkäaikainen vuokraus */}
          <div className="bg-teal-500/10 rounded-2xl p-6 border border-teal-500/40 shadow-xl flex flex-col gap-4">
            <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">{t.pkgWholeName}</h3>
            <dl className="text-sm space-y-2 flex-1">
              <div>
                <dt className="text-slate-400 text-xs uppercase tracking-wider">{t.pkgForLabel}</dt>
                <dd className="text-slate-200">{t.pkgWholeFor}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs uppercase tracking-wider">{t.pkgSpaceLabel}</dt>
                <dd className="text-slate-200">{t.pkgWholeSpace}</dd>
              </div>
            </dl>
            <p className="text-teal-300 font-black text-2xl">{t.pkgWholePrice}</p>
            <button
              onClick={() => ask(t.pkgWholeName)}
              className="mt-auto bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-sm px-5 py-3 rounded-full transition-colors"
            >
              {t.pkgCta}
            </button>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mb-14 lg:mb-20">
          <a href={LINKS.pk33} target="_blank" rel="noopener noreferrer" className="underline decoration-teal-500/50 hover:text-teal-300">
            {t.pkgAccommodation}
          </a>
        </p>

        {/* Kuukausikustannuslaskuri */}
        <div className="bg-slate-800/60 rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-white/10">
          <p className="text-teal-400 text-xs lg:text-sm font-semibold tracking-widest uppercase mb-2">{t.calcBadge}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{t.calcTitle}</h3>
          <p className="text-slate-400 text-sm lg:text-base mb-8">{t.calcSub}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <fieldset>
              <legend className="text-slate-300 text-sm font-semibold mb-3">{t.calcTeamLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {RENT.teamSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setTeam(s)}
                    aria-pressed={team === s}
                    className={`min-w-12 px-3 py-2 rounded-full text-sm font-semibold border transition-colors ${
                      team === s ? "bg-teal-500 text-slate-900 border-teal-500" : "text-slate-300 border-white/20 hover:border-teal-500"
                    }`}
                  >
                    {s} {t.pkgPersonsUnit}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-slate-300 text-sm font-semibold mb-3">{t.calcDurationLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {RENT.durations.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    aria-pressed={months === m}
                    className={`min-w-12 px-3 py-2 rounded-full text-sm font-semibold border transition-colors ${
                      months === m ? "bg-teal-500 text-slate-900 border-teal-500" : "text-slate-300 border-white/20 hover:border-teal-500"
                    }`}
                  >
                    {m} {t.pkgMonthsUnit}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <dl className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm" aria-live="polite">
            {[
              { label: t.calcPackageLabel, value: `${pkgName(suggested, t)} (${suggested.toUpperCase()})` },
              { label: t.calcMonthlyLabel, value: formatEur(monthly, lang) },
              { label: t.calcPerPersonLabel, value: formatEur(monthly / team, lang) },
              { label: t.calcTotalLabel, value: formatEur(total, lang) },
              { label: t.calcCompareLabel, value: formatEur(coworking, lang) },
              { label: t.calcDiffLabel, value: `${formatEur(Math.abs(diff), lang)} ${diff >= 0 ? t.calcCheaper : t.calcDearer}` },
            ].map((row) => (
              <div key={row.label} className="bg-slate-900/60 rounded-xl p-4">
                <dt className="text-slate-400 text-xs">{row.label} <span className="italic">({t.calcEstimate})</span></dt>
                <dd className="text-white font-bold text-lg lg:text-xl mt-1">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-slate-400 text-xs mt-6 leading-relaxed">{t.calcNote}</p>
        </div>
      </div>
    </section>
  );
}
