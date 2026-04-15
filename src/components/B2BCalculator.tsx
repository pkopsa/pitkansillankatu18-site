"use client";

import { useState } from "react";
import type { translations, Lang } from "@/translations";

type T = typeof translations[Lang];

// ── Constants ────────────────────────────────────────────────────────────────
const SPACE_M2 = 225;
const HOTEL_NIGHT = 89;   // €/night/person
const WORK_DAYS = 22;     // working days per month

/** Rate per m²/month decreases with longer commitment — incentivises long-term. */
function getRate(months: number): number {
  if (months >= 12) return 20;
  if (months >= 6)  return 24;
  if (months >= 3)  return 27;
  return 30;
}

function fmt(n: number, lang: Lang): string {
  const sep = lang === "en" ? "," : "\u00A0";
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep) + " €";
}

// ── Lead form state ──────────────────────────────────────────────────────────
type LeadForm = {
  name: string;
  company: string;
  email: string;
  teamSize: number;
  message: string;
};

const TEAM_OPTIONS = [4, 6, 8, 10, 12, 15, 20];
const DURATION_OPTIONS = [1, 3, 6, 12, 18, 24];

// ── Component ────────────────────────────────────────────────────────────────
export default function B2BCalculator({ t, lang }: { t: T; lang: Lang }) {
  // Calculator state
  const [team, setTeam]       = useState(8);
  const [months, setMonths]   = useState(6);

  // Form state
  const [form, setForm]   = useState<LeadForm>({ name: "", company: "", email: "", teamSize: team, message: "" });
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg]   = useState("");

  // ── Calculations ──────────────────────────────────────────────────────────
  const rate       = getRate(months);
  const monthly    = rate * SPACE_M2;
  const perPerson  = monthly / team;
  const total      = monthly * months;
  const hotelTotal = HOTEL_NIGHT * WORK_DAYS * team * months;
  const saving     = hotelTotal - total;
  const savingPct  = Math.round((saving / hotelTotal) * 100);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function selectTeam(n: number) {
    setTeam(n);
    setForm(f => ({ ...f, teamSize: n }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/b2b-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, months, ratePerM2: rate, monthly, total }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? t.b2bError);
      }
      setStatus("success");
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : t.b2bError);
      setStatus("error");
    }
  }

  // ── Button styles ─────────────────────────────────────────────────────────
  const btnBase   = "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200";
  const btnActive = "text-slate-900 shadow-lg";
  const btnInact  = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="bg-slate-900 py-14 px-4 lg:py-28 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 lg:mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border"
            style={{ color: "#34d399", borderColor: "rgba(52,211,153,0.25)", backgroundColor: "rgba(52,211,153,0.08)" }}
          >
            {t.b2bBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3 lg:mb-5">
            {t.b2bTitle}
          </h2>
          <p className="text-base lg:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.b2bSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

          {/* ── Left: Calculator ── */}
          <div className="bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-white/5 shadow-xl">

            {/* Team size */}
            <div className="mb-8">
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4">
                {t.b2bTeamLabel}
              </p>
              <div className="flex gap-2 flex-wrap">
                {TEAM_OPTIONS.map(n => (
                  <button
                    key={n}
                    onClick={() => selectTeam(n)}
                    className={`${btnBase} ${team === n ? btnActive : btnInact}`}
                    style={team === n ? { backgroundColor: "#34d399" } : undefined}
                  >
                    {n} {t.b2bTeamUnit}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-8">
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4">
                {t.b2bDurationLabel}
              </p>
              <div className="flex gap-2 flex-wrap">
                {DURATION_OPTIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => setMonths(d)}
                    className={`${btnBase} ${months === d ? btnActive : btnInact}`}
                    style={months === d ? { backgroundColor: "#34d399" } : undefined}
                  >
                    {d} {t.b2bDurationUnit}
                  </button>
                ))}
              </div>
            </div>

            {/* Rate indicator */}
            <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl border"
              style={{ backgroundColor: "rgba(52,211,153,0.05)", borderColor: "rgba(52,211,153,0.2)" }}>
              <span className="text-slate-400 text-sm">{t.b2bRateLabel}</span>
              <span className="font-bold text-lg" style={{ color: "#34d399" }}>{rate} €/m²</span>
            </div>

            {/* Results grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t.b2bMonthlyLabel,  value: fmt(monthly, lang),   highlight: true  },
                { label: t.b2bPerPersonLabel, value: fmt(perPerson, lang), highlight: false },
                { label: t.b2bTotalLabel,     value: fmt(total, lang),     highlight: false },
                { label: t.b2bVsHotelLabel,   value: `${fmt(saving, lang)} (${savingPct}%)`, highlight: true },
              ].map(card => (
                <div
                  key={card.label}
                  className="rounded-xl p-4 border"
                  style={{
                    backgroundColor: card.highlight ? "rgba(52,211,153,0.08)" : "rgba(15,23,42,0.5)",
                    borderColor: card.highlight ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="text-slate-400 text-xs mb-1 leading-snug">{card.label}</p>
                  <p
                    className="font-black text-base lg:text-lg leading-tight"
                    style={{ color: card.highlight ? "#34d399" : "#e2e8f0" }}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Includes note */}
            <p className="text-slate-500 text-xs mt-5 leading-relaxed border-t border-white/5 pt-4">
              {t.b2bIncludes}
            </p>
          </div>

          {/* ── Right: Lead form ── */}
          <div className="bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-white/5 shadow-xl flex flex-col">

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
                <div className="text-5xl mb-6">✅</div>
                <h3 className="text-2xl font-bold text-white mb-3">{t.b2bSuccessTitle}</h3>
                <p className="text-slate-400">{t.b2bSuccessMsg}</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">{t.b2bFormTitle}</h3>
                  <p className="text-slate-400 text-sm">{t.b2bFormSub}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">

                  {/* Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {t.b2bNameLabel} <span style={{ color: "#34d399" }}>*</span>
                      </span>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder={t.b2bNamePlaceholder}
                        className="rounded-xl border bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition"
                        style={{ borderColor: "rgba(255,255,255,0.1)" }}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {t.b2bCompanyLabel} <span style={{ color: "#34d399" }}>*</span>
                      </span>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        placeholder={t.b2bCompanyPlaceholder}
                        className="rounded-xl border bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition"
                        style={{ borderColor: "rgba(255,255,255,0.1)" }}
                      />
                    </label>
                  </div>

                  {/* Email + Team size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {t.b2bEmailLabel} <span style={{ color: "#34d399" }}>*</span>
                      </span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder={t.b2bEmailPlaceholder}
                        className="rounded-xl border bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition"
                        style={{ borderColor: "rgba(255,255,255,0.1)" }}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {t.b2bTeamSizeLabel}
                      </span>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={form.teamSize}
                        onChange={e => setForm(f => ({ ...f, teamSize: Number(e.target.value) }))}
                        className="rounded-xl border bg-slate-900/60 px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 transition"
                        style={{ borderColor: "rgba(255,255,255,0.1)" }}
                      />
                    </label>
                  </div>

                  {/* Message */}
                  <label className="flex flex-col gap-1.5 flex-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {t.b2bMessageLabel}
                    </span>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder={t.b2bMessagePlaceholder}
                      className="rounded-xl border bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition resize-none flex-1"
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3">
                      {errMsg || t.b2bError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#34d399", color: "#0f172a" }}
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        {t.b2bSending}
                      </>
                    ) : t.b2bSubmit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
