"use client";

import { useState } from "react";
import type { translations, Lang } from "@/translations";
import { ReactNode } from "react";

type T = typeof translations[Lang];

const PURCHASE_PRICE = 149000;
const MAINTENANCE = 832.5;
const RENT_MIN = 1200;
const RENT_MAX = 2500;
const RENT_DEFAULT = 1800;

function fmtEur(n: number): string {
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + " €";
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

  const metrics: { label: string; value: ReactNode; sub: string; desc: string }[] = [
    { label: t.grossLabel, value: "12–20 %", sub: t.grossSub, desc: t.grossDesc },
    { label: t.rentLabel,  value: <>1&nbsp;500–<wbr />2&nbsp;500&nbsp;€</>, sub: t.rentSub, desc: t.rentDesc },
    { label: t.netLabel,   value: "7–14 %",  sub: t.netSub,  desc: t.netDesc  },
  ];

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

        {/* Tunnuslukukortit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-16">
          {metrics.map((item, i) => (
            <div key={i} className="relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 lg:w-40 lg:h-40 bg-emerald-50 rounded-full -translate-y-12 translate-x-12 lg:-translate-y-16 lg:translate-x-16" />
              <p className="text-slate-500 text-[1.05rem] lg:text-[1.35rem] font-semibold mb-3 lg:mb-4">{item.label}</p>
              <p className="text-[2rem] lg:text-[2.6rem] 2xl:text-[3.2rem] font-black mb-1 text-emerald-700 leading-tight">{item.value}</p>
              <p className="text-[1.2rem] lg:text-[1.5rem] 2xl:text-[1.8rem] font-medium mb-4 lg:mb-6 text-slate-400">{item.sub}</p>
              <p className="text-[1.05rem] lg:text-[1.2rem] 2xl:text-[1.5rem] text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── NOPEA TUOTTOLASKELMA ── */}
        <div
          className="rounded-2xl p-6 md:p-8 border mb-8 lg:mb-12"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", borderColor: "rgba(245, 158, 11, 0.20)" }}
        >
          <h3 className="text-lg font-bold text-white mb-4">{t.investorCalcTitle}</h3>
          <div className="space-y-0">
            {[
              { label: t.investorCalcRow1Label, value: t.investorCalcRow1Val, highlight: false },
              { label: t.investorCalcRow2Label, value: t.investorCalcRow2Val, highlight: false },
              { label: t.investorCalcRow3Label, value: t.investorCalcRow3Val, highlight: true },
              { label: t.investorCalcRow4Label, value: t.investorCalcRow4Val, highlight: true },
              { label: t.investorCalcRow5Label, value: t.investorCalcRow5Val, highlight: false },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: i < 4 ? "1px solid rgba(71, 85, 105, 0.5)" : "none" }}
              >
                <span
                  className="text-sm lg:text-base"
                  style={{ color: "#cbd5e1" }}
                >
                  {row.label}
                </span>
                <span
                  className={row.highlight ? "text-xl font-bold" : "font-semibold text-sm lg:text-base"}
                  style={{ color: row.highlight ? "#fbbf24" : "#fbbf24" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 italic" style={{ color: "#64748b" }}>
            {t.investorCalcDisclaimer}
          </p>
        </div>

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

      </div>
    </section>
  );
}
