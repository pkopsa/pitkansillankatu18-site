"use client";

import { useState } from "react";
import type { translations, Lang } from "@/translations";
import { PURCHASE_PRICE, MAINTENANCE, RENT_MIN, RENT_MAX, RENT_DEFAULT, VE2 } from "@/lib/pricing";

type T = (typeof translations)[Lang];

function fmtEur(n: number): string {
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
}

function fmtPct(n: number): string {
  return n.toFixed(1).replace(".", ",") + " %";
}

export default function InvestorSection({ t, lang }: { t: T; lang: Lang }) {
  const [rent, setRent] = useState(RENT_DEFAULT);

  const grossYield = ((rent * 12) / PURCHASE_PRICE) * 100;
  const annualNet = (rent - MAINTENANCE) * 12;
  const netYield = (annualNet / PURCHASE_PRICE) * 100;
  const payback = PURCHASE_PRICE / annualNet;

  const sliderPct = ((rent - RENT_MIN) / (RENT_MAX - RENT_MIN)) * 100;

  return (
    <section className="py-14 px-4 lg:py-28 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Otsikko */}
        <div className="flex items-center gap-3 mb-4 lg:mb-6 justify-center">
          <span className="text-emerald-600 text-lg lg:text-2xl">◆</span>
          <p className="text-emerald-600 text-lg lg:text-2xl font-semibold tracking-widest uppercase">{t.investorBadge}</p>
          <span className="text-emerald-600 text-lg lg:text-2xl">◆</span>
        </div>
        <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-bold text-center mb-10 lg:mb-20 text-slate-800">
          {t.investorTitle}
        </h2>

        {/* ── TUOTTOLASKURI ── */}
        <div className="bg-slate-900 rounded-2xl lg:rounded-3xl p-6 lg:p-10 mb-8 lg:mb-12 shadow-xl border border-white/5">
          <div className="text-center mb-8">
            <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-emerald-500/20 mb-3">
              {t.yieldCalcBadge}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">{t.yieldCalcTitle}</h3>
          </div>

          {/* Slider */}
          <div className="mb-8 lg:mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-400 text-sm lg:text-base font-semibold">{t.yieldRentLabel}</span>
              <span className="text-2xl lg:text-3xl font-black text-emerald-400">{fmtEur(rent)}<span className="text-slate-400 text-base font-normal">/kk</span></span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={RENT_MIN}
                max={RENT_MAX}
                step={50}
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                aria-label={t.yieldRentLabel}
                style={{
                  background: `linear-gradient(to right, #10b981 ${sliderPct}%, #334155 ${sliderPct}%)`,
                }}
              />
              <div className="flex justify-between text-slate-500 text-xs mt-2">
                <span>{fmtEur(RENT_MIN)}</span>
                <span>{fmtEur(RENT_MAX)}</span>
              </div>
            </div>
          </div>

          {/* Tulokset */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: t.yieldGross,     value: fmtPct(grossYield), color: "#34d399" },
              { label: t.yieldNet,       value: fmtPct(netYield),   color: "#34d399" },
              { label: t.yieldAnnualNet, value: fmtEur(annualNet),  color: "#34d399" },
              { label: t.yieldPayback,   value: `${payback.toFixed(1).replace(".", ",")} ${t.yieldYears}`, color: "#94a3b8" },
            ].map((item) => (
              <div key={item.label} className="bg-slate-800 rounded-xl p-4 lg:p-6 border border-white/5">
                <p className="text-slate-400 text-xs lg:text-sm font-semibold mb-2 leading-snug">{item.label}</p>
                <p className="text-xl lg:text-2xl font-black leading-tight" style={{ color: item.color }}>{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-4 text-center">{t.yieldCostNote}</p>
        </div>

        {/* ── VE2 TUOTTOARVIO ── */}
        <div className="bg-teal-950/60 border border-teal-500/20 rounded-2xl lg:rounded-3xl p-6 lg:p-10 mb-8 lg:mb-12">
          <div className="text-center mb-6">
            <span className="inline-block bg-teal-500/10 text-teal-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-teal-500/20 mb-3">
              {t.ve2YieldBadge}
            </span>
            <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">{t.ve2YieldSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              {
                label: t.ve2YieldCommercial,
                target: VE2.commercial.target,
                realMin: VE2.commercial.realistic[0],
                realMax: VE2.commercial.realistic[1],
                color: "#14b8a6",
              },
              {
                label: t.ve2YieldResidential,
                target: VE2.residential.target,
                realMin: VE2.residential.realistic[0],
                realMax: VE2.residential.realistic[1],
                color: "#818cf8",
              },
            ].map((row) => (
              <div key={row.label} className="bg-slate-800/60 rounded-xl p-4 lg:p-6 border border-white/5">
                <p className="text-slate-300 text-sm font-semibold mb-3">{row.label}</p>
                <div className="flex gap-4 flex-wrap">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{t.ve2YieldTarget}</p>
                    <p className="font-black text-lg" style={{ color: row.color }}>{fmtEur(row.target)}<span className="text-slate-500 text-sm font-normal">{t.ve2YieldPerMonth}</span></p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{t.ve2YieldRealistic}</p>
                    <p className="font-bold text-base text-slate-300">{fmtEur(row.realMin)}–{fmtEur(row.realMax)}<span className="text-slate-500 text-sm font-normal">{t.ve2YieldPerMonth}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-800/40 rounded-xl p-4 border border-white/5 flex flex-wrap gap-6">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{t.ve2YieldTotal}</p>
              <p className="font-black text-xl text-teal-400">{fmtEur(VE2.totalTarget)}<span className="text-slate-500 text-sm font-normal">{t.ve2YieldPerMonth}</span></p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{t.ve2YieldTotalRealistic}</p>
              <p className="font-bold text-base text-slate-300">{fmtEur(VE2.totalRealistic[0])}–{fmtEur(VE2.totalRealistic[1])}<span className="text-slate-500 text-sm font-normal">{t.ve2YieldPerMonth}</span></p>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3 leading-relaxed">{t.ve2YieldNote}</p>
        </div>

        {/* ── MIKSI KYSYNTÄ ON VARMAA ── */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl lg:rounded-3xl p-6 lg:p-10 mb-8 lg:mb-12 shadow-sm">
          <div className="text-center mb-8">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-3">
              {t.demandBadge}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-800">{t.demandTitle}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: t.demand1Icon, title: t.demand1Title, desc: t.demand1Desc },
              { icon: t.demand2Icon, title: t.demand2Title, desc: t.demand2Desc },
              { icon: t.demand3Icon, title: t.demand3Title, desc: t.demand3Desc },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="text-lg lg:text-xl font-bold text-slate-800">{item.title}</h4>
                <p className="text-sm lg:text-base text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── YHTEENVETO ── */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-center shadow-sm">
          <p className="text-base lg:text-xl text-slate-600 leading-relaxed">{t.investorSummary}</p>
        </div>

        {/* ── VASTUUVAPAUSLAUSEKE ── */}
        <p className="text-slate-400 text-xs text-center mt-4 leading-relaxed max-w-2xl mx-auto">
          {t.investorYieldDisclaimer}
        </p>

      </div>
    </section>
  );
}
