import type { translations, Lang } from "@/translations";

type T = typeof translations[Lang];

const AMBER = "#f59e0b";
const AMBER_LIGHT = "#fbbf24";
const AMBER_DIM = "rgba(251,191,36,0.20)";
const AMBER_BG = "rgba(251,191,36,0.08)";

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
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border"
            style={{ color: AMBER_LIGHT, borderColor: AMBER_DIM, backgroundColor: AMBER_BG }}
          >
            {t.growthBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight">
            {t.growthTitle}
          </h2>
        </div>

        {/* Timeline — grid: 1 col mobiilissa, 4 col desktopissa */}
        <div className="relative mb-12 lg:mb-16">

          {/* Horisontaalinen yhdysteksti (desktop) — absoluttinen, piilossa mobiilissa */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "1.25rem",         /* tasattu pisteiden kanssa */
              height: "2px",
              background: `linear-gradient(to right, transparent 2%, ${AMBER_DIM} 10%, ${AMBER_DIM} 90%, transparent 98%)`,
            }}
            aria-hidden
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
            {events.map((ev, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">

                {/* Piste */}
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-3 shrink-0 bg-slate-900 z-10"
                  style={{ borderColor: AMBER }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: AMBER }} />
                </div>

                {/* Vuosi */}
                <span className="text-xs font-black tracking-widest mb-3" style={{ color: AMBER_LIGHT }}>
                  {ev.year}
                </span>

                {/* Kortti */}
                <div
                  className="rounded-2xl p-5 w-full flex-1 border"
                  style={{ backgroundColor: "#1e293b", borderColor: AMBER_DIM }}
                >
                  <h3 className="text-sm lg:text-base font-bold text-white mb-2 leading-snug">{ev.title}</h3>
                  <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">{ev.desc}</p>
                </div>

                {/* Pystyviiva mobiilissa pisteiden välillä — viimeisellä ei viivaa */}
                {i < events.length - 1 && (
                  <div
                    className="md:hidden w-0.5 h-6 my-1"
                    style={{ backgroundColor: AMBER_DIM }}
                    aria-hidden
                  />
                )}
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
            style={{ backgroundColor: AMBER, color: "#0f172a" }}
          >
            {t.growthCta}
          </a>
        </div>

      </div>
    </section>
  );
}
