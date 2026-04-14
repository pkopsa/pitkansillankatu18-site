import type { translations, Lang } from "@/translations";

type T = typeof translations[Lang];

export default function KipFactsBar({ t }: { t: T; lang: Lang }) {
  const facts = [
    { icon: "🏭", num: t.kipFact1Num, label: t.kipFact1Label },
    { icon: "💶", num: t.kipFact2Num, label: t.kipFact2Label },
    { icon: "👷", num: t.kipFact3Num, label: t.kipFact3Label },
    { icon: "🚗", num: t.kipFact4Num, label: t.kipFact4Label },
  ];

  return (
    <div className="px-4 lg:px-8 py-8 lg:py-12 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facts.map((f, i) => (
            <div
              key={i}
              className="rounded-xl p-5 text-center border"
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                borderColor: "rgba(71, 85, 105, 0.5)",
              }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "#fbbf24" }}
              >
                {f.num}
              </div>
              <div className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                {f.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-center mt-4" style={{ color: "#64748b" }}>
          {t.kipSource}
        </p>
      </div>
    </div>
  );
}
