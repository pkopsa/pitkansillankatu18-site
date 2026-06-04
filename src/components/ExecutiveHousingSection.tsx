"use client";

import type { translations, Lang } from "@/translations";
import { EXECUTIVE_HOUSING } from "@/lib/pricing";

type T = (typeof translations)[Lang];

function fmtEur(n: number, lang: Lang): string {
  const s = Math.round(n).toString();
  const sep = lang === "en" ? "," : " ";
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) + " €";
}

function getEh1Features(t: T): string[] {
  return [t.ehFeatEh1_1, t.ehFeatEh1_2, t.ehFeatEh1_3];
}

export default function ExecutiveHousingSection({ t, lang }: { t: T; lang: Lang }) {
  return (
    <section className="bg-slate-900 py-14 px-4 lg:py-28 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Otsikko */}
        <div className="text-center mb-10 lg:mb-16">
          <span className="inline-block bg-teal-500/10 text-teal-400 text-xs lg:text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-teal-500/20">
            {t.ehBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-white mb-3 lg:mb-5 tracking-tight">
            {t.ehTitle}
          </h2>
          <p className="text-base lg:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.ehSub}
          </p>
        </div>

        {/* Kortit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {EXECUTIVE_HOUSING.map((unit) => {
            const features = unit.id === "eh1" ? getEh1Features(t) : [];
            return (
              <div
                key={unit.id}
                className="bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/5 shadow-xl flex flex-col gap-4"
              >
                {/* Yläosa: nimi + merkinnät */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">{unit.name}</h3>
                    <span className="text-xs font-semibold bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded-full shrink-0">
                      {unit.id.toUpperCase()}
                    </span>
                  </div>
                  {unit.external && (
                    <p className="text-xs text-amber-400 font-semibold mb-1">{t.ehExternalNote}</p>
                  )}
                  {!unit.headlineOnly && (
                    <p className="text-slate-400 text-sm">{unit.location}</p>
                  )}
                </div>

                {/* Kapasiteetti ja hinta */}
                <div className="flex gap-4 flex-wrap">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{t.ehCapacityLabel}</p>
                    <p className="text-white font-bold text-lg">
                      {unit.capacity} {t.ehPersonsUnit}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{t.ehNightLabel}</p>
                    <p className="text-teal-400 font-black text-lg">{fmtEur(unit.nightlyRate, lang)}</p>
                  </div>
                </div>

                {/* ALV-huomio */}
                <p className="text-slate-500 text-xs">{t.ehVatNote}</p>

                {/* Ominaisuudet (vain EH1, headlineOnly: false) */}
                {!unit.headlineOnly && features.length > 0 && (
                  <ul className="flex flex-col gap-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                        <span className="text-teal-500 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* headlineOnly: pelkkä note */}
                {unit.headlineOnly && (
                  <p className="text-slate-500 text-xs italic">{t.ehHeadlineOnlyNote}</p>
                )}

                {/* Linkki (vain EH1) */}
                {unit.link && (
                  <a
                    href={unit.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                    aria-label={`${t.ehLinkLabel} — ${unit.name}`}
                  >
                    {t.ehLinkLabel}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* VE2 live+work note */}
        <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-4 lg:p-6 text-center">
          <p className="text-teal-300 text-sm lg:text-base leading-relaxed">{t.ehVe2LiveWorkNote}</p>
        </div>

      </div>
    </section>
  );
}
