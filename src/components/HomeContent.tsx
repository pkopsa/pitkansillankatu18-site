"use client";

import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import ContactSection from "@/components/ContactSection";
import RentPackages from "@/components/RentPackages";
import GrowthStory from "@/components/GrowthStory";
import PropertyMap from "@/components/PropertyMap";
import Lightbox, { type LightboxImage } from "@/components/Lightbox";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Lang, translations, type T } from "@/translations";
import { BROKER, LINKS, OWNER, SALE, SITE_URL, SPLIT, SPLIT_SUMMARY_PDF, telHref } from "@/config/site";
import { GALLERY, HERO_IMAGE, webpLoader, type GalleryImage } from "@/data/gallery";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function reveal() {
      if (!el) return;
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add("opacity-100", "translate-y-0");
      el.classList.remove("opacity-0", "translate-y-8");
    }

    // Hard fallback: Samsung Tizen / LG webOS TV browsers often have broken
    // IntersectionObserver — force visibility after 3 s regardless
    const timer = setTimeout(reveal, 3000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(timer);
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "200px" }
    );
    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

// Pohjapiirrokset: WebP sivulle, PDF ladattavaksi
const FLOOR_PLANS = [
  { key: "splitPlan1", altKey: "splitPlan1Alt", img: "/img/pohjapiirros/pk18-pohjapiirros-katutaso-lh19a-a19b", pdf: "/docs/pk18-pohjapiirros-katutaso-lh19a-a19b.pdf" },
  { key: "splitPlan2", altKey: "splitPlan2Alt", img: "/img/pohjapiirros/pk18-pohjapiirros-pohjakerros-a19b", pdf: "/docs/pk18-pohjapiirros-pohjakerros-a19b.pdf" },
] as const;

const HISTORY_IMAGE = "/katu-historia.jpeg";

function altOf(t: T, base: string): string {
  return (t.alt as Record<string, string>)[base] ?? "";
}

function toLightbox(images: GalleryImage[], t: T): LightboxImage[] {
  return images.map((img) => ({ src: img.src, alt: altOf(t, img.base) }));
}

const PAUSE_MS = 2000;
const LANGS_CYCLE: Lang[] = ["fi", "sv", "en"];
function getScrollSpeed() {
  if (typeof window === "undefined") return 1.5;
  // URL override: pitkansillankatu18.com/?speed=8  (handy for on-site kiosk tuning)
  const urlSpeed = parseFloat(new URLSearchParams(window.location.search).get("speed") ?? "");
  if (!isNaN(urlSpeed)) return Math.min(20, Math.max(0.1, urlSpeed));
  // Viewport-height based: one screenful scrolls by in ~3 s at 60 fps
  // — auto-calibrates for 1080p TVs, 4K displays and laptops alike
  return Math.min(12, Math.max(1, window.innerHeight / 180));
}

export default function HomeContent({ initialLang = "fi" }: { initialLang?: Lang }) {
  const lang = initialLang;
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);
  const [rentPrefill, setRentPrefill] = useState("");

  const t = translations[lang];

  // Wake Lock — estää näytön sammumisen (toimii Chromiumissa)
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;
    async function acquire() {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
      } catch {
        // Selain ei tue Wake Lockia — ei haittaa
      }
    }
    acquire();
    // Hankitaan uudelleen jos välilehti palaa taustalta
    function onVisible() {
      if (document.visibilityState === "visible") acquire();
    }
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      wakeLock?.release();
    };
  }, []);

  // Auto-reload — lataa sivun uudelleen jos yhteys on poikki yli 2 min
  useEffect(() => {
    const RELOAD_INTERVAL_MS = 2 * 60 * 1000; // 2 minuuttia
    const id = setInterval(() => {
      if (!navigator.onLine) {
        // Ei yhteyttä — yritetään uudelleen 10 sekunnin päästä
        setTimeout(() => window.location.reload(), 10_000);
      }
    }, RELOAD_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Kiosk-skrollaus: fi → sv → en → fi → ...
  useEffect(() => {
    let rafId: number;
    let pausing = false;
    let langIndex = Math.max(0, LANGS_CYCLE.indexOf(initialLang));

    function switchLang() {
      pausing = true;
      setTimeout(() => {
        langIndex = (langIndex + 1) % LANGS_CYCLE.length;
        const nextUrl = new URL(window.location.href);
        nextUrl.pathname = LANGS_CYCLE[langIndex] === "fi" ? "/" : `/${LANGS_CYCLE[langIndex]}`;
        window.location.assign(nextUrl.toString());
        window.scrollTo({ top: 0, behavior: "instant" });
        pausing = false;
      }, PAUSE_MS);
    }

    function step() {
      if (pausing) { rafId = requestAnimationFrame(step); return; }
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 1) {
        switchLang();
      } else {
        window.scrollBy(0, getScrollSpeed());
      }
      rafId = requestAnimationFrame(step);
    }

    // Auto-resume: 30 s inaktiviteetin jälkeen käynnistyy uudelleen (Samsung TV kauko-ohjain ei pysäytä pysyvästi)
    const RESUME_MS = 30_000;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;

    function resume() {
      rafId = requestAnimationFrame(step);
    }

    function stop() {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(resume, RESUME_MS);
    }

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [initialLang]);

  function openLightbox(images: LightboxImage[], index: number) { setLightbox({ images, index }); }
  function closeLightbox() { setLightbox(null); }
  function prevImage() { setLightbox((lb) => lb && { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }); }
  function nextImage() { setLightbox((lb) => lb && { ...lb, index: (lb.index + 1) % lb.images.length }); }

  function goToContact(prefill: string) {
    setRentPrefill(prefill);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  const gallerySections: { title: string; images: GalleryImage[]; note?: string }[] = [
    { title: t.galleryOutdoor, images: GALLERY.outdoor },
    { title: t.galleryStreet, images: GALLERY.street },
    { title: t.galleryLower, images: GALLERY.lower, note: t.galleryLowerNote },
    { title: t.galleryExtra, images: GALLERY.extra },
  ];

  const floorPlanLightbox: LightboxImage[] = FLOOR_PLANS.map((p) => ({ src: p.img, alt: t[p.altKey] }));

  const ecosystem = [
    { icon: "🧭", title: t.eco1Title, desc: t.eco1Desc, link: t.eco1Link, href: LINKS.petrikopsa },
    { icon: "📅", title: t.eco2Title, desc: t.eco2Desc, link: t.eco2Link, href: LINKS.booking },
    { icon: "🛏️", title: t.eco3Title, desc: t.eco3Desc, link: t.eco3Link, href: LINKS.pk33 },
  ];

  const footerLinks = [
    { label: "petrikopsa.com", href: LINKS.petrikopsa },
    { label: "terassitalo.com", href: LINKS.booking },
    { label: "pitkansillankatu33.com", href: LINKS.pk33 },
    { label: "Asunto Björndahl", href: BROKER.listingUrl },
  ];

  return (
    <main lang={lang} className="bg-white text-slate-800 font-sans">
      <LanguageSwitcher lang={lang} />

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          labels={{ close: t.lbClose, prev: t.lbPrev, next: t.lbNext }}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-start overflow-hidden">
        <div className="absolute inset-0">
          <Image
            loader={webpLoader}
            src={HERO_IMAGE.src}
            alt={altOf(t, HERO_IMAGE.base)}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 via-55% to-black/0" />
        </div>

        <div className="relative z-10 text-center px-4 lg:px-8 max-w-4xl mx-auto pt-24 sm:pt-28 lg:pt-32 pb-12">
          <p className="text-teal-300 text-xs sm:text-sm lg:text-base font-semibold tracking-widest uppercase mb-3 lg:mb-5">
            {t.heroLocation}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight text-balance mb-4 lg:mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-white mb-2 lg:mb-3 max-w-2xl mx-auto text-balance [text-shadow:0_1px_3px_rgb(0_0_0/0.85)]">
            {t.heroSub}
          </p>
          <p className="text-teal-300 text-sm sm:text-base lg:text-lg font-semibold mb-6 lg:mb-8 [text-shadow:0_1px_3px_rgb(0_0_0/0.85)]">{t.heroMeta}</p>
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-3 sm:gap-4">
            <button
              onClick={() => goToContact(t.rentInquiryPrefill)}
              className="w-64 sm:w-72 min-h-14 flex items-center justify-center text-center leading-tight text-sm sm:text-base lg:text-lg font-bold px-6 py-3 rounded-full transition-colors duration-300 shadow-2xl bg-teal-500 hover:bg-teal-400 text-slate-900"
            >
              {t.heroBtnRent}
            </button>
            <a
              href={BROKER.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-64 sm:w-72 min-h-14 flex items-center justify-center text-center leading-tight text-sm sm:text-base lg:text-lg font-bold px-6 py-3 rounded-full transition-colors duration-300 shadow-2xl bg-slate-100 hover:bg-white text-slate-900"
            >
              {t.heroBtnListing}
            </a>
          </div>
        </div>
      </section>

      {/* ── PERUSTIEDOT ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-16 text-slate-800">{t.detailsTitle}</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {[
              { label: t.detailSize, value: `${SALE.area} m²`, sub: t.detailSizeSub },
              { label: t.detailAddress, value: "Pitkänsillan\u00adkatu 18", sub: t.detailAddressSub },
              { label: t.detailPrice, value: t.detailPriceVal, sub: t.detailPriceSub },
              { label: t.detailRent, value: t.detailRentVal, sub: t.detailRentSub },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-8 text-center shadow-lg border border-slate-100 h-full">
                  <p className="text-slate-500 text-sm lg:text-lg font-semibold mb-2 lg:mb-3">{item.label}</p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-slate-900 leading-tight break-words">{item.value}</p>
                  <p className="text-slate-500 text-xs md:text-sm mt-2">{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center mt-6 leading-relaxed max-w-3xl mx-auto">{t.areaDisclaimer}</p>
        </div>
      </section>

      {/* ── TILAT ────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4 text-slate-800">{t.spacesTitle}</h2>
            <p className="text-base lg:text-xl text-slate-500 text-center mb-10 lg:mb-16">{t.spacesSub}</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
            {[
              { title: t.space1Title, desc: t.space1Desc, images: GALLERY.street, cover: GALLERY.street[2] },
              { title: t.space2Title, desc: t.space2Desc, images: GALLERY.lower, cover: GALLERY.lower[0] },
              { title: t.space3Title, desc: t.space3Desc, images: GALLERY.outdoor, cover: GALLERY.outdoor[0] },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-100 shadow-lg flex flex-col h-full">
                  <button
                    onClick={() => openLightbox(toLightbox(item.images, t), item.images.indexOf(item.cover))}
                    className="relative aspect-[3/2] w-full block cursor-zoom-in"
                    aria-label={`${t.viewPhotos}: ${item.title}`}
                  >
                    <Image loader={webpLoader} src={item.cover.src} alt={altOf(t, item.cover.base)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </button>
                  <div className="p-6 lg:p-8 flex flex-col flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-slate-800">{item.title}</h3>
                    <p className="text-sm lg:text-base text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                    <button
                      onClick={() => openLightbox(toLightbox(item.images, t), 0)}
                      className="mt-6 self-start inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-teal-700 hover:text-teal-600 transition-colors"
                    >
                      {t.viewPhotos} ({item.images.length})
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUT YRITYKSILLE ────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4 lg:mb-6 justify-center">
              <span className="text-teal-400 text-sm lg:text-base" aria-hidden>◆</span>
              <p className="text-teal-400 text-sm lg:text-base font-semibold tracking-widest uppercase">{t.benefitsBadge}</p>
              <span className="text-teal-400 text-sm lg:text-base" aria-hidden>◆</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-16 text-white leading-tight">
              {t.benefitsTitle.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
            {[
              { icon: t.benefit1Icon, title: t.benefit1Title, desc: t.benefit1Desc },
              { icon: t.benefit2Icon, title: t.benefit2Title, desc: t.benefit2Desc },
              { icon: t.benefit3Icon, title: t.benefit3Title, desc: t.benefit3Desc },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-slate-800 border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-10 flex flex-col gap-4 h-full">
                  <div className="text-4xl lg:text-5xl" aria-hidden>{item.icon}</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-base lg:text-lg text-slate-300 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TILAPAKETIT + LASKURI ───────────────────────────────────── */}
      <RentPackages t={t} lang={lang} onCta={goToContact} />

      {/* ── EKOSYSTEEMI ─────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-teal-700 text-sm lg:text-base font-semibold tracking-widest uppercase mb-3 text-center">{t.ecoBadge}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-16 text-slate-800">{t.ecoTitle}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
            {ecosystem.map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col gap-3 h-full"
                >
                  <span className="text-4xl" aria-hidden>{item.icon}</span>
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                  <span className="text-teal-700 font-semibold group-hover:translate-x-1 transition-transform">{item.link}</span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MIKSI TÄMÄ TOIMITILA ────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-3 text-slate-800">{t.whyTitle}</h2>
            <p className="text-base lg:text-xl text-slate-500 text-center mb-10 lg:mb-16">{t.whySub}</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {[
              { n: "01", icon: t.why1Icon, tag: t.why1Tag, title: t.why1Title, desc: t.why1Desc },
              { n: "02", icon: t.why2Icon, tag: t.why2Tag, title: t.why2Title, desc: t.why2Desc },
              { n: "03", icon: t.why3Icon, tag: t.why3Tag, title: t.why3Title, desc: t.why3Desc },
              { n: "04", icon: t.why4Icon, tag: t.why4Tag, title: t.why4Title, desc: t.why4Desc },
              { n: "05", icon: t.why5Icon, tag: t.why5Tag, title: t.why5Title, desc: t.why5Desc },
              { n: "06", icon: t.why6Icon, tag: t.why6Tag, title: t.why6Title, desc: t.why6Desc },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div className="bg-slate-50 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm flex flex-col gap-3 h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-teal-600 font-black text-4xl lg:text-5xl tabular-nums leading-none">{item.n}</div>
                      <div className="text-teal-700 font-semibold text-sm lg:text-base leading-tight mt-1">{item.tag}</div>
                    </div>
                    <span className="text-3xl lg:text-4xl shrink-0 mt-1" aria-hidden>{item.icon}</span>
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── KOKKOLAN KASVUTARINA ────────────────────────────────────── */}
      <GrowthStory t={t} lang={lang} />

      {/* ── KUVAGALLERIA ────────────────────────────────────────────── */}
      <section id="galleria" className="py-14 px-4 lg:py-24 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-16 text-slate-800">{t.galleryTitle}</h2>
          </FadeIn>
          {gallerySections.map((section) => (
            <div key={section.title} className="mb-12 lg:mb-16 last:mb-0">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-4 lg:mb-6">
                {section.title} <span className="text-slate-500 font-normal text-base">· {section.images.length} {t.galleryCount}</span>
              </h3>
              {section.note && <p className="mb-5 max-w-3xl text-sm lg:text-base text-slate-600 leading-relaxed">{section.note}</p>}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
                {section.images.map((img, i) => (
                  <button
                    key={img.base}
                    onClick={() => openLightbox(toLightbox(section.images, t), i)}
                    className="relative aspect-[3/2] rounded-xl lg:rounded-2xl overflow-hidden shadow-md w-full block cursor-zoom-in group"
                    aria-label={altOf(t, img.base)}
                  >
                    <Image
                      loader={webpLoader}
                      src={img.src}
                      alt={altOf(t, img.base)}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HUONEISTON JAKO – ESITYS ────────────────────────────────── */}
      <section id="jakoesitys" className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-teal-700 text-sm lg:text-base font-semibold tracking-widest uppercase mb-3 text-center">{t.splitBadge}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 lg:mb-8 text-slate-800 text-balance">{t.splitTitle}</h2>
            <p className="text-base lg:text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl mx-auto">{t.splitIntro}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
            {[
              { title: t.splitCard1Title, body: t.splitCard1Body, id: SPLIT.commercial.id, cls: "border-blue-500 bg-blue-50", tag: "bg-blue-600" },
              { title: t.splitCard2Title, body: t.splitCard2Body, id: SPLIT.residential.id, cls: "border-green-600 bg-green-50", tag: "bg-green-700" },
            ].map((card) => (
              <FadeIn key={card.id}>
                <div className={`rounded-2xl p-6 lg:p-8 border-2 h-full ${card.cls}`}>
                  <span className={`inline-block text-white text-sm font-bold px-3 py-1 rounded-full mb-3 ${card.tag}`}>{card.id}</span>
                  <p className="text-base lg:text-lg font-bold text-slate-900 mb-2">{card.title}</p>
                  <p className="text-sm lg:text-base text-slate-700 leading-relaxed">{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-xs lg:text-sm text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">{t.splitSmall}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {FLOOR_PLANS.map((plan, i) => (
              <FadeIn key={plan.pdf}>
                <figure className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                  <button
                    onClick={() => openLightbox(floorPlanLightbox, i)}
                    className="relative block w-full aspect-[800/1132] cursor-zoom-in"
                    aria-label={`${t.splitEnlarge}: ${t[plan.key]}`}
                  >
                    <Image loader={webpLoader} src={plan.img} alt={t[plan.altKey]} fill sizes="(max-width: 640px) 100vw, 480px" className="object-contain" />
                  </button>
                  <figcaption className="flex flex-wrap items-center justify-between gap-2 mt-3">
                    <span className="font-semibold text-slate-800 text-sm lg:text-base">{t[plan.key]}</span>
                    <a href={plan.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-600">
                      📄 {t.splitDownload}
                    </a>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
          <a href={SPLIT_SUMMARY_PDF} target="_blank" rel="noopener noreferrer" className="inline-flex mb-3 text-teal-700 font-semibold underline underline-offset-4">
            {t.splitSummaryDownload}
          </a>
          <p className="mb-6 text-sm text-slate-600 max-w-3xl">{t.splitSummaryNote}</p>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">{t.splitOutro}</p>
        </div>
      </section>

      {/* ── KOHDE MYYNNISSÄ ─────────────────────────────────────────── */}
      <section id="myynti" className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-teal-400 text-sm lg:text-base font-semibold tracking-widest uppercase mb-3 text-center">{t.saleBadge}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-14">{t.saleTitle}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <FadeIn>
              <div className="bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-white/10 h-full flex flex-col justify-center text-center">
                <p className="text-slate-300 text-lg">{t.salePriceLabel}</p>
                <p className="text-[clamp(2rem,5.5vw,3.5rem)] font-black text-teal-400 my-3 whitespace-nowrap leading-none">{t.detailPriceVal}</p>
                <p className="text-slate-300 text-sm lg:text-base">{t.salePricePerArea}</p>
                <p className="text-slate-300 text-sm lg:text-base">{t.saleAreaNote}</p>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div className="bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-white/10 h-full flex flex-col gap-2">
                <p className="text-slate-400 text-sm uppercase tracking-wider">{t.saleBrokerLabel}</p>
                <p className="text-xl font-bold">{BROKER.name}</p>
                <p className="text-slate-300 text-sm">{BROKER.title} · {BROKER.company}</p>
                <a href={telHref(BROKER.phone)} className="text-teal-400 hover:text-teal-300 font-bold text-lg mt-2">{BROKER.phone}</a>
                <a href={`mailto:${BROKER.email}`} className="text-teal-400 hover:text-teal-300 font-bold break-all">{BROKER.email}</a>
                <a
                  href={BROKER.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block self-start bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-6 py-3 rounded-full transition-colors"
                >
                  {t.saleListingBtn}
                </a>
              </div>
            </FadeIn>
          </div>
          <p className="text-slate-300 text-sm lg:text-base text-center mt-8 max-w-3xl mx-auto leading-relaxed">{t.saleRentNote}</p>
          <p className="text-slate-400 text-xs lg:text-sm text-center mt-2">{t.saleDocsNote}</p>
        </div>
      </section>

      {/* ── TALOYHTIÖ ───────────────────────────────────────────────── */}
      <section aria-label={t.hcTitle} className="py-14 px-4 lg:py-24 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-3 text-slate-800">{t.hcTitle}</h2>
            <p className="text-center text-slate-500 mb-8 lg:mb-12">{t.hcSubtitle}</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="bg-slate-50 rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{t.hcInvestTitle}</h3>
                <p className="text-sm text-slate-600 mb-3">{t.hcInvestIntro}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[t.hcInvest1, t.hcInvest2, t.hcInvest3, t.hcInvest4].map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-slate-400 shrink-0" aria-hidden>•</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{t.hcFutureTitle}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t.hcFutureText}</p>
              </div>
              <p className="text-sm text-slate-600 border-t border-slate-200 pt-4">{t.saleDocsNote}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SIJAINTI & HISTORIA ─────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-3 lg:mb-6 text-slate-800">{t.historyTitle}</h2>
            <p className="text-base lg:text-xl text-slate-500 text-center mb-10 lg:mb-16">{t.historySub}</p>
          </FadeIn>

          <FadeIn className="mb-8 lg:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <button
                onClick={() => openLightbox(toLightbox(GALLERY.outdoor, t), 0)}
                className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] shadow-xl cursor-zoom-in group text-left"
              >
                <Image loader={webpLoader} src={GALLERY.outdoor[0].src} alt={altOf(t, GALLERY.outdoor[0].base)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-4 lg:p-6 block">
                  <span className="block text-white text-sm lg:text-xl font-semibold mb-2">{t.historyCaption}</span>
                  <span className="inline-flex items-center gap-2 bg-teal-500 text-slate-900 font-bold text-xs lg:text-sm px-3 lg:px-5 py-2 rounded-full shadow-lg">
                    📸 {t.historyFacadeBtn}
                  </span>
                </span>
              </button>
              <button
                onClick={() => openLightbox([{ src: HISTORY_IMAGE, alt: altOf(t, "katu-historia") }, ...toLightbox(GALLERY.outdoor.slice(0, 1), t)], 0)}
                className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] shadow-xl cursor-zoom-in group text-left"
              >
                <Image src={HISTORY_IMAGE} alt={altOf(t, "katu-historia")} fill unoptimized className="object-cover sepia-[0.2] group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-4 lg:p-6 block">
                  <span className="block text-white text-sm lg:text-xl font-semibold">{t.historyOldCaption}</span>
                  <span className="block text-teal-300 text-xs lg:text-sm mt-1">{t.historyZoom}</span>
                </span>
              </button>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-12 border border-slate-100 shadow-lg">
              <div className="grid grid-cols-3 gap-4 lg:gap-10 text-center">
                {[
                  { icon: "📍", label: t.locLabel, value: t.locValue },
                  { icon: "🚶", label: t.svcLabel, value: t.svcValue },
                  { icon: "🏛️", label: t.builtLabel, value: t.builtValue },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <span className="text-3xl lg:text-5xl mb-2 lg:mb-4" aria-hidden>{item.icon}</span>
                    <p className="text-slate-500 text-xs lg:text-lg mb-1 lg:mb-2">{item.label}</p>
                    <p className="text-sm lg:text-xl font-bold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── OTA YHTEYTTÄ ────────────────────────────────────────────── */}
      <section id="yhteystiedot" className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-teal-300 text-sm lg:text-base font-semibold tracking-widest uppercase mb-3">{t.contactBadge}</p>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">{t.contactTitle}</h2>
            <p className="text-base lg:text-xl text-slate-300 mb-10 lg:mb-16 leading-relaxed">{t.contactSub}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-stretch text-left">
            {[
              {
                icon: "🏷️",
                label: t.contactSaleLabel,
                name: BROKER.name,
                sub: BROKER.company,
                phone: BROKER.phone,
                email: BROKER.email,
              },
              {
                icon: "🔑",
                label: t.contactRentLabel,
                name: OWNER.name,
                sub: "Terassitalo",
                phone: OWNER.phone,
                email: OWNER.email,
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="bg-slate-700 border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-10 flex flex-col gap-1 h-full">
                  <div className="text-4xl lg:text-5xl mb-2" aria-hidden>{item.icon}</div>
                  <p className="text-slate-300 text-sm lg:text-lg">{item.label}</p>
                  <p className="text-lg lg:text-xl font-bold text-white">{item.name}</p>
                  <p className="text-slate-300 text-sm mb-2">{item.sub}</p>
                  <a href={telHref(item.phone)} className="text-base lg:text-lg font-bold text-teal-300 hover:text-teal-200 transition-colors">{item.phone}</a>
                  <a href={`mailto:${item.email}`} className="text-base lg:text-lg font-bold text-teal-300 hover:text-teal-200 transition-colors break-all">{item.email}</a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div className="mt-12 lg:mt-16 flex flex-wrap justify-center items-start gap-8 lg:gap-12">
              {/* QR-koodi */}
              <div className="flex flex-col items-center gap-3 w-44">
                <div className="bg-white rounded-2xl p-3 shadow-lg w-44 h-44 flex items-center justify-center">
                  <QRCodeSVG value={`${SITE_URL}/`} size={136} bgColor="#ffffff" fgColor="#1e293b" level="M" title="pitkansillankatu18.com" />
                </div>
                <p className="text-teal-300 font-semibold text-base tracking-wide text-center">{t.qrCaption}</p>
              </div>
              {/* Linkit */}
              <nav aria-label={t.footerLinksTitle} className="text-left">
                <p className="text-slate-300 text-sm uppercase tracking-wider mb-3">{t.footerLinksTitle}</p>
                <ul className="space-y-2">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 font-semibold">
                        {link.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </FadeIn>

          <div className="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-white/10">
            <p className="text-slate-300 text-sm lg:text-lg">{t.footer}</p>
            <p className="text-slate-400 text-xs mt-4 leading-relaxed max-w-3xl mx-auto">{t.footerDisclaimer}</p>
            <p className="text-slate-400 text-xs mt-2">{t.updatedDate}</p>
          </div>
        </div>
      </section>

      {/* ── YHTEYDENOTTOLOMAKE ──────────────────────────────────────── */}
      <ContactSection t={t} prefillMessage={rentPrefill} />

      {/* ── SIJAINTI ────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-14 px-4 lg:py-24 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 lg:mb-14">
            <p className="text-teal-400 text-sm lg:text-base font-semibold tracking-widest uppercase mb-3">{t.mapBadge}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3">{t.mapTitle}</h2>
            <p className="text-slate-300 text-base lg:text-xl">{t.mapSub}</p>
          </div>
          <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <PropertyMap />
          </div>
          <p className="text-center text-slate-300 text-sm mt-4">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Pitk%C3%A4nsillankatu+18+A%2C+67100+Kokkola"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition-colors"
            >
              {t.mapOpen}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
