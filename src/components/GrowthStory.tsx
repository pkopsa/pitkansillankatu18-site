import type { translations, Lang } from "@/translations";

type T = typeof translations[Lang];

export default function GrowthStory({ t }: { t: T; lang: Lang }) {
  const events = [
    { year: t.growth1Year, title: t.growth1Title, desc: t.growth1Desc },
    { year: t.growth2Year, title: t.growth2Title, desc: t.growth2Desc },
    { year: t.growth3Year, title: t.growth3Title, desc: t.growth3Desc },
    { year: t.growth4Year, title: t.growth4Title, desc: t.growth4Desc },
  ];

  return (
    <section className="bg-slate-900 py-14 px-4 lg:py-28 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Otsikko */}
        <div className="text-center mb-12 lg:mb-20">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border"
            style={{ color: "#fbbf24", borderColor: "rgba(251,191,36,0.25)", backgroundColor: "rgba(251,191,36,0.08)" }}>
            {t.growthBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight">
            {t.growthTitle}
          </h2>
        </div>

        {/* ── TIMELINE ── */}

        {/* Desktop: horisontaalinen */}
        <div className="hidden md:block mb-12 lg:mb-16">
          {/* Yhdistävä viiva */}
          <div className="relative flex items-start justify-between">
            <div className="absolute top-5 left-0 right-0 h-0.5" style={{ backgroundColor: "rgba(251,191,36,0.25)" }} />

            {events.map((ev, i) => (
              <div key={i} className="relative flex flex-col items-center w-1/4 px-3">
                {/* Piste */}
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-4 z-10 bg-slate-900"
                  style={{ borderColor: "#f59e0b" }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                </div>
                {/* Vuosi */}
                <span className="text-sm font-black tracking-wide mb-2" style={{ color: "#fbbf24" }}>
                  {ev.year}
                </span>
                {/* Kortti */}
                <div className="bg-slate-800 rounded-2xl p-5 border w-full" style={{ borderColor: "rgba(251,191,36,0.15)" }}>
                  <h3 className="text-base lg:text-lg font-bold text-white mb-2">{ev.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobiili: vertikaalinen */}
        <div className="md:hidden mb-10 relative">
          {/* Pystyviiva */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ backgroundColor: "rgba(251,191,36,0.25)" }} />

          <div className="space-y-6">
            {events.map((ev, i) => (
              <div key={i} className="relative flex gap-6 pl-12">
                {/* Piste */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-slate-900"
                  style={{ borderColor: "#f59e0b" }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                </div>
                {/* Sisältö */}
                <div className="bg-slate-800 rounded-2xl p-5 border flex-1" style={{ borderColor: "rgba(251,191,36,0.15)" }}>
                  <span className="text-xs font-black tracking-wide block mb-1" style={{ color: "#fbbf24" }}>
                    {ev.year}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{ev.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kuvaus + CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-slate-400 text-base lg:text-xl leading-relaxed mb-8 lg:mb-10">
            {t.growthDesc}
          </p>
          <a
            href="#contact"
            className="inline-block font-bold text-base lg:text-xl px-8 lg:px-12 py-4 lg:py-5 rounded-full transition-colors duration-300 shadow-lg"
            style={{ backgroundColor: "#f59e0b", color: "#0f172a" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fbbf24")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f59e0b")}
          >
            {t.growthCta}
          </a>
        </div>

      </div>
    </section>
  );
}
