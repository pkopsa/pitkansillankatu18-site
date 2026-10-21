import type { MetadataRoute } from "next";
import { LAST_UPDATED } from "@/config/site";
import { pageUrl } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);
  const languages = { fi: pageUrl("fi"), sv: pageUrl("sv"), en: pageUrl("en") };

  return (["fi", "sv", "en"] as const).map((lang) => ({
    url: pageUrl(lang),
    lastModified,
    changeFrequency: "weekly",
    priority: lang === "fi" ? 1.0 : 0.8,
    alternates: { languages },
  }));
}
