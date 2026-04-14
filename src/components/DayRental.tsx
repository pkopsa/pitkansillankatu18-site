import type { translations, Lang } from "@/translations";

type T = typeof translations[Lang];

const TEAL = "#14b8a6";
const TEAL_DIM = "rgba(20,184,166,0.15)";
const TEAL_BORDER = "rgba(20,184,166,0.25)";

export default function DayRental({ t, lang, onCta }: { t: T; lang: Lang; onCta: () => void }) {
  const packages = [
    { title: t.dayRentalP1Title, hours: t.dayRentalP1Hours, price: t.dayRentalP1Price },
    { title: t.dayRentalP2Title, hours: t.dayRentalP2Hours, price: t.dayRentalP2Price, highlight: true },
    { title: t.dayRentalP3Title, hours: t.dayRentalP3Hours, price: t.dayRentalP3Price },
  ];

  const features = [
    { icon: "📽️", label: t.dayRentalFeat1 },
    { icon: "🖥️", label: t.dayRentalFeat2 },
    { icon: "🍽️", label: t.dayRentalFeat3 },
    { icon: "🥂", label: t.dayRentalFeat4 },
  ];

  return (
    <section className="bg-slate-900 py-14 px-4 lg:py-28 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Otsikko */}
        <div className="text-center mb-10 lg:mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border"
            style={{ color: TEAL, borderColor: TEAL_BORDER, backgroundColor: TEAL_DIM }}
          >
            {t.dayRentalBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3 lg:mb-5">
            {t.dayRentalTitle}
          </h2>
          <p className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6" style={{ color: TEAL }}>
            {t.dayRentalSub}
          </p>
          <p className="text-base lg:text-xl text-slate-400 max-w-2xl mx-auto">
            {t.dayRentalDesc}
          </p>
        </div>

        {/* AV-ominaisuudet */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-10 lg:mb-16">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center border"
              style={{ backgroundColor: "rgba(30,41,59,0.6)", borderColor: TEAL_BORDER }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="text-sm lg:text-base font-semibold text-white leading-snug">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Hinnoittelukortit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10 lg:mb-14">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 lg:p-8 text-center border flex flex-col gap-2"
              style={{
                backgroundColor: pkg.highlight ? TEAL_DIM : "rgba(30,41,59,0.6)",
                borderColor: pkg.highlight ? TEAL : TEAL_BORDER,
                boxShadow: pkg.highlight ? `0 0 32px rgba(20,184,166,0.18)` : undefined,
              }}
            >
              <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: TEAL }}>
                {pkg.hours}
              </p>
              <h3 className="text-xl lg:text-2xl font-bold text-white">{pkg.title}</h3>
              <p className="text-3xl lg:text-4xl font-black mt-2" style={{ color: TEAL }}>
                {pkg.price}
              </p>
              <p className="text-xs text-slate-400">{t.dayRentalVat}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onCta}
            className="inline-block font-bold text-base lg:text-xl px-8 lg:px-14 py-4 lg:py-5 rounded-full transition-colors duration-300 shadow-lg"
            style={{ backgroundColor: TEAL, color: "#0f172a" }}
          >
            {t.dayRentalCta}
          </button>
        </div>

      </div>
    </section>
  );
}
