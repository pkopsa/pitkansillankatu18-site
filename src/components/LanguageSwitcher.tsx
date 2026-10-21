import { Lang, translations } from "@/translations";
const LANGS: Lang[] = ["fi", "sv", "en"];
export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  return <nav aria-label={{fi:"Kieli",sv:"Språk",en:"Language"}[lang]} className="fixed top-4 right-4 z-50 flex gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1.5 shadow-xl">
    {LANGS.map(l => <a key={l} href={l === "fi" ? "/" : `/${l}`} hrefLang={l} lang={l} aria-label={translations[l].langLabel} aria-current={l === lang ? "page" : undefined}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${l === lang ? "bg-teal-500 text-slate-900 shadow-md" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
      <span aria-hidden="true">{translations[l].langFlag}</span><span className="hidden sm:inline">{translations[l].langLabel}</span>
    </a>)}
  </nav>;
}
