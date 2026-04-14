"use client";

import { useState } from "react";
import type { translations, Lang } from "@/translations";

type T = typeof translations[Lang];

export default function ArctialBanner({ t }: { t: T; lang: Lang }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative py-3 px-4 border-b"
      style={{
        backgroundColor: "rgba(120, 53, 15, 0.30)",
        borderColor: "rgba(245, 158, 11, 0.30)",
      }}
    >
      <div className="max-w-6xl mx-auto pr-8">
        <p className="text-sm lg:text-base leading-snug" style={{ color: "#fde68a" }}>
          {t.arctialBannerText}{" "}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: "#fbbf24" }}
          >
            {t.arctialBannerCta}
          </a>
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
        style={{ color: "#fbbf24" }}
        aria-label="Sulje"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
