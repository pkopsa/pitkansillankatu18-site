"use client";

import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import ContactSection from "@/components/ContactSection";
import DayRental from "@/components/DayRental";
import CostComparison from "@/components/CostComparison";
import InvestorSection from "@/components/InvestorSection";
import GrowthStory from "@/components/GrowthStory";
import PropertyMap from "@/components/PropertyMap";
import FloorPlan from "@/components/FloorPlan";
import Lightbox from "@/components/Lightbox";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Lang, translations } from "@/translations";

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-8");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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

const galleryImages = [
  { src: "/kip18-daylounge-avara.jpg",         alt: "Open office – avara ja valoisa kokonaisnäkymä" },
  { src: "/kip18-daylounge-kokous.jpg",         alt: "Open office – kokoustila pitkällä pöydällä" },
  { src: "/kip18-daylounge-naytto.jpg",         alt: "Open office – taukotila ja esitysnäyttö" },
  { src: "/kip18-neuvottelu.jpg",               alt: "Neuvotteluhuone – kokoustila ja TV-näyttö" },
  { src: "/kip18-keittio.jpg",                  alt: "Keittiö / Break Room – moderni musta keittiö" },
  { src: "/kip18-keittioalue.jpg",              alt: "Keittiöalue – saari ja kodinkoneet" },
  { src: "/kip18-toimisto.jpg",                 alt: "Toimisto – työpisteet ja valkotaulu" },
  { src: "/kip18-kaytatava.jpg",                alt: "Käytävä – toimiston ovi ja WC" },
];

const dayLoungeImages = [
  { src: "/kip18-daylounge-avara.jpg",  alt: "Open office – kokonaisnäkymä" },
  { src: "/kip18-daylounge-kokous.jpg", alt: "Open office – kokoustila" },
  { src: "/kip18-daylounge-naytto.jpg", alt: "Open office – esitysnäyttö" },
];

const neuvotteluImages = [
  { src: "/kip18-neuvottelu.jpg",       alt: "Neuvotteluhuone – kokoustila" },
];

const toimistoImages = [
  { src: "/kip18-toimisto.jpg",      alt: "Toimisto – työpisteet" },
  { src: "/kip18-keittio.jpg",       alt: "Keittiö / Break Room" },
  { src: "/kip18-keittioalue.jpg",   alt: "Keittiöalue" },
  { src: "/kip18-kaytatava.jpg",     alt: "Käytävä ja WC" },
];

const PAUSE_MS = 2000;
const LANGS_CYCLE: Lang[] = ["fi", "sv", "en"];
function getScrollSpeed() {
  if (typeof window === "undefined") return 1.0;
  if (window.innerWidth >= 1920) return 4.16;
  if (window.innerWidth >= 1024) return 1.6;
  return 0.64;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("fi");
  const [lightbox, setLightbox] = useState<{ images: typeof galleryImages; index: number } | null>(null);
  const [rentPrefill, setRentPrefill] = useState("");

  const t = translations[lang];

  // Skrollaa ylös kielen vaihtuessa
  function handleSetLang(l: Lang) {
    setLang(l);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") acquire();
    });
    return () => { wakeLock?.release(); };
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
    let langIndex = 0;

    function switchLang() {
      pausing = true;
      setTimeout(() => {
        langIndex = (langIndex + 1) % LANGS_CYCLE.length;
        setLang(LANGS_CYCLE[langIndex]);
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

    function stop() { cancelAnimationFrame(rafId); }
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  function openLightbox(images: typeof galleryImages, index: number) { setLightbox({ images, index }); }
  function closeLightbox() { setLightbox(null); }
  function prevImage() { setLightbox((lb) => lb && { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }); }
  function nextImage() { setLightbox((lb) => lb && { ...lb, index: (lb.index + 1) % lb.images.length }); }

  return (
    <main className="bg-white text-slate-800 font-sans">
      <LanguageSwitcher lang={lang} setLang={handleSetLang} />

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/kip18-daylounge-avara.jpg"
            alt="Pitkänsillankatu 18 – Open Office"
            fill
            className="object-cover brightness-105 contrast-105"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 lg:px-8 max-w-6xl mx-auto">
          <p className="text-teal-400 text-base lg:text-2xl font-semibold tracking-widest uppercase mb-4 lg:mb-6">
            {t.heroLocation}
          </p>
          <h1 className="text-[2.14rem] sm:text-[2.85rem] md:text-[4.28rem] lg:text-[7.6rem] 2xl:text-[9.5rem] font-black text-white leading-[1.05] lg:leading-[1.0] tracking-tight mb-6 lg:mb-10 2xl:mb-14">
            {t.heroLine1}<br />
            <span className="text-teal-400">
              {t.heroLine2.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </span><br />
            {t.heroLine3}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl 2xl:text-4xl text-slate-200 mb-8 lg:mb-12 2xl:mb-16 font-light">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setRentPrefill(t.rentInquiryPrefill);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block bg-teal-500 hover:bg-teal-400 text-slate-900 text-lg lg:text-2xl 2xl:text-3xl font-bold px-8 lg:px-14 2xl:px-18 py-4 lg:py-6 2xl:py-8 rounded-full transition-colors duration-300 shadow-2xl"
            >
              {t.heroBtnRent}
            </button>
            <a
              href="https://toimitilat.oikotie.fi/myytavat-toimitilat/kokkola/21240654"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-900 text-lg lg:text-2xl 2xl:text-3xl font-bold px-8 lg:px-14 2xl:px-18 py-4 lg:py-6 2xl:py-8 rounded-full transition-colors duration-300 shadow-2xl"
            >
              {t.heroBtnBuy}
            </a>
          </div>
        </div>

      </section>

      {/* ── PERUSTIEDOT ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-bold text-center mb-10 lg:mb-20 2xl:mb-24 text-slate-800">{t.detailsTitle}</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {(([
              { label: t.detailSize,  value: "225 m²",  sub: t.detailSizeSub,  inline: false },
              { label: t.detailFloor, value: <>Pitkänsillankatu&nbsp;<wbr />18</>, sub: t.detailFloorSub, inline: false },
              { label: t.detailPrice, value: t.detailPriceVal, sub: t.detailPriceSub, inline: false },
              { label: t.detailMaint, value: <>1&nbsp;500–2&nbsp;500&nbsp;Euroa</>, sub: t.detailMaintSub, inline: false },
            ]) as Array<{ label: string; value: ReactNode; sub: string; inline: boolean }>).map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-center shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                  <p className="text-slate-500 text-[1.05rem] lg:text-[1.35rem] font-semibold mb-3 lg:mb-4">{item.label}</p>
                  <p className="text-[1.05rem] md:text-[1.2rem] lg:text-[1.5rem] 2xl:text-[1.9rem] font-black text-slate-900 mb-1 lg:mb-2 leading-tight">{item.value}</p>
                  {!item.inline && <p className="text-slate-400 text-[0.8rem] md:text-[0.9rem] lg:text-[1.05rem] 2xl:text-[1.3rem] font-medium mt-2">{item.sub}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUT YRITYKSILLE ────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 2xl:py-36 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4 lg:mb-6 2xl:mb-8 justify-center">
              <span className="text-teal-400 text-lg lg:text-2xl 2xl:text-3xl">◆</span>
              <p className="text-teal-400 text-lg lg:text-2xl 2xl:text-3xl font-semibold tracking-widest uppercase">{t.benefitsBadge}</p>
              <span className="text-teal-400 text-lg lg:text-2xl 2xl:text-3xl">◆</span>
            </div>
            <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-bold text-center mb-10 lg:mb-20 2xl:mb-24 text-white leading-tight">
              {t.benefitsTitle.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 2xl:gap-12">
            {[
              { icon: t.benefit1Icon, title: t.benefit1Title, desc: t.benefit1Desc },
              { icon: t.benefit2Icon, title: t.benefit2Title, desc: t.benefit2Desc },
              { icon: t.benefit3Icon, title: t.benefit3Title, desc: t.benefit3Desc },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-slate-800 border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-10 2xl:p-14 hover:bg-slate-700 transition-colors duration-300 flex flex-col gap-4 lg:gap-6 h-full">
                  <div className="text-4xl lg:text-5xl 2xl:text-6xl">{item.icon}</div>
                  <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-bold text-white">{item.title}</h3>
                  <p className="text-base lg:text-xl 2xl:text-2xl text-slate-300 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIJOITTAJAN TIEDOT ───────────────────────────────────────── */}
      <InvestorSection t={t} lang={lang} />

      {/* ── MUUTTOVALMIS KOTI ───────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4 lg:mb-6 text-slate-800">{t.readyTitle}</h2>
            <p className="text-base lg:text-2xl text-slate-500 text-center mb-10 lg:mb-20">{t.readySub}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-stretch">
            {[
              { icon: "💼", title: t.card1Title, desc: t.card1Desc, images: dayLoungeImages },
              { icon: "🤝", title: t.card2Title, desc: t.card2Desc, images: neuvotteluImages },
              { icon: "☕", title: t.card3Title, desc: t.card3Desc, images: toimistoImages },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="bg-white hover:bg-slate-50 rounded-2xl lg:rounded-3xl p-6 lg:p-12 transition-colors duration-300 border border-slate-100 shadow-lg hover:shadow-xl flex flex-col h-full">
                  <div className="text-5xl mb-4 lg:mb-8">{item.icon}</div>
                  <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-5 text-slate-800">{item.title}</h3>
                  <p className="text-sm lg:text-xl text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                  {item.images ? (
                    <button
                      onClick={() => openLightbox(item.images!, 0)}
                      className="mt-6 inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-teal-600 hover:text-teal-500 transition-colors"
                    >
                      {t.viewPhotos}
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <div className="mt-6 h-6" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MIKSI TÄMÄ TOIMITILA ────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 2xl:py-36 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-teal-600 text-sm lg:text-base 2xl:text-lg font-semibold tracking-widest uppercase mb-3 lg:mb-4 text-center">{t.whyBadge}</p>
            <h2 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-center mb-3 lg:mb-4 text-slate-900 tracking-tight">{t.whyTitle}</h2>
            <p className="text-base lg:text-xl 2xl:text-2xl text-slate-500 text-center mb-10 lg:mb-16 2xl:mb-20">{t.whySub}</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 2xl:gap-10">
            {([
              { n: "01", icon: t.why1Icon, tag: t.why1Tag, title: t.why1Title, desc: t.why1Desc },
              { n: "02", icon: t.why2Icon, tag: t.why2Tag, title: t.why2Title, desc: t.why2Desc },
              { n: "03", icon: t.why3Icon, tag: t.why3Tag, title: t.why3Title, desc: t.why3Desc },
              { n: "04", icon: t.why4Icon, tag: t.why4Tag, title: t.why4Title, desc: t.why4Desc },
              { n: "05", icon: t.why5Icon, tag: t.why5Tag, title: t.why5Title, desc: t.why5Desc },
              { n: "06", icon: t.why6Icon, tag: t.why6Tag, title: t.why6Title, desc: t.why6Desc },
            ] as { n: string; icon: string; tag: string; title: string; desc: string }[]).map((item, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 2xl:p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3 lg:gap-4 h-full group">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-teal-500 font-black text-4xl lg:text-5xl 2xl:text-6xl tabular-nums leading-none">{item.n}</div>
                      <div className="text-teal-600 font-semibold text-sm lg:text-base 2xl:text-lg leading-tight mt-1">{item.tag}</div>
                    </div>
                    <span className="text-3xl lg:text-4xl 2xl:text-5xl shrink-0 mt-1">{item.icon}</span>
                  </div>
                  <h3 className="text-[0.95rem] lg:text-base 2xl:text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">{item.title}</h3>
                  <p className="text-sm lg:text-[0.95rem] 2xl:text-base text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── KOKKOLAN KASVUTARINA ────────────────────────────────────── */}
      <GrowthStory t={t} lang={lang} />

      {/* ── KUSTANNUSVERTAILU ───────────────────────────────────────── */}
      <CostComparison t={t} lang={lang} />

      {/* ── LYHYTAIKAINEN VUOKRAUS ──────────────────────────────────── */}
      <DayRental
        t={t}
        lang={lang}
        onCta={() => {
          setRentPrefill(t.dayRentalPrefill);
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ── KUVAGALLERIA ────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-20 text-slate-800">{t.galleryTitle}</h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
            <FadeIn className="col-span-2 row-span-2" delay={0}>
              <button
                onClick={() => openLightbox(galleryImages, 0)}
                className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg w-full block cursor-zoom-in"
              >
                <Image src="/kip18-daylounge-avara.jpg" alt="Open Office / Taukotila" fill className="object-cover brightness-105 contrast-105 hover:scale-105 transition-transform duration-500" />
              </button>
            </FadeIn>
            {galleryImages.slice(1).map((img, i) => (
              <FadeIn key={img.src} delay={(i + 1) * 80}>
                <button
                  onClick={() => openLightbox(galleryImages, i + 1)}
                  className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden shadow-md w-full block cursor-zoom-in"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover brightness-105 contrast-105 hover:scale-105 transition-transform duration-500" />
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── POHJAPIIRROS ────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-teal-400 text-sm lg:text-base font-semibold tracking-widest uppercase mb-3 text-center">{t.floorPlanBadge}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-3 text-white">{t.floorPlanTitle}</h2>
            <p className="text-slate-400 text-sm lg:text-lg text-center mb-10 lg:mb-16 max-w-2xl mx-auto leading-relaxed">{t.floorPlanSub}</p>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <FloorPlan lang={lang} />
            </div>
            <p className="text-center text-slate-500 text-xs mt-4">{t.floorPlanNote}</p>
          </FadeIn>
        </div>
      </section>

      {/* ── HISTORIA & SIJAINTI ─────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-3 lg:mb-6 text-slate-800">{t.historyTitle}</h2>
            <p className="text-base lg:text-2xl text-slate-500 text-center mb-10 lg:mb-20">{t.historySub}</p>
          </FadeIn>

          <FadeIn delay={0} className="mb-8 lg:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Ikkunanäkymä */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] shadow-xl group">
                <Image src="/kip18-julkisivu.jpg" alt="Pitkänsillankatu 18 – julkisivu" fill className="object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 lg:p-6">
                  <p className="text-white text-sm lg:text-xl font-semibold mb-2">{t.historyCaption}</p>
                  <button
                    onClick={() => openLightbox([
                      { src: "/kip18-julkisivu.jpg",              alt: "Julkisivu – näyteikkunat" },
                      { src: "/kip18-julkisivu-sisaankaynti.jpg", alt: "Julkisivu – pääsisäänkäynti" },
                      { src: "/katu-nyt.jpeg",                    alt: "Pitkänsillankatu kadulta" },
                    ], 0)}
                    className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-xs lg:text-sm px-3 lg:px-5 py-2 rounded-full transition-colors duration-200 shadow-lg"
                  >
                    <span>📸</span>
                    <span>Julkisivu kadulta</span>
                  </button>
                </div>
              </div>
              {/* Historiallinen katukuva */}
              <button
                onClick={() => openLightbox([
                  { src: "/katu-historia.jpeg", alt: "Historiallinen näkymä Kokkolan keskustasta" },
                  { src: "/katu-nyt.jpeg",      alt: "Pitkänsillankatu tänään – Terassitalo" },
                ], 0)}
                className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] shadow-xl cursor-zoom-in group"
              >
                <Image src="/katu-historia.jpeg" alt="Historiallinen katukuva Kokkolasta" fill className="object-cover brightness-100 contrast-105 sepia-[0.2] group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 lg:p-6">
                  <p className="text-white text-sm lg:text-xl font-semibold">Historiallinen näkymä Kokkolan keskustasta</p>
                  <p className="text-teal-400 text-xs lg:text-sm mt-1">🔍 Klikkaa suurentaaksesi</p>
                </div>
              </button>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-12 border border-slate-100 shadow-lg">
              <div className="grid grid-cols-3 gap-4 lg:gap-10 text-center">
                {[
                  { icon: "📍", label: t.locLabel,   value: t.locValue   },
                  { icon: "🚶", label: t.svcLabel,   value: t.svcValue   },
                  { icon: "🏛️", label: t.builtLabel, value: t.builtValue },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <span className="text-3xl lg:text-5xl mb-2 lg:mb-4">{item.icon}</span>
                    <p className="text-slate-500 text-xs lg:text-lg mb-1 lg:mb-2">{item.label}</p>
                    <p className="text-sm lg:text-2xl font-bold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── OTA YHTEYTTÄ ────────────────────────────────────────────── */}
      <section id="yhteystiedot" className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-teal-400 text-base lg:text-2xl font-semibold tracking-widest uppercase mb-4 lg:mb-6">{t.contactBadge}</p>
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-8">{t.contactTitle}</h2>
            <p className="text-base lg:text-2xl text-slate-300 mb-10 lg:mb-20 leading-relaxed">{t.contactSub}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-stretch">
            {[
              {
                icon: "👤",
                label: t.sellerLabel,
                lines: [
                  { text: "Petri Kopsa", href: null },
                  { text: "petri.kopsa@gmail.com", href: "mailto:petri.kopsa@gmail.com" },
                ],
              },
              {
                icon: "📞",
                label: t.phoneLabel,
                lines: [{ text: "+358 50 306 0635", href: "tel:+358503060635" }],
              },
              {
                icon: "✉️",
                label: t.emailLabel,
                lines: [{ text: "info@terassitalo.com", href: "mailto:info@terassitalo.com" }],
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-10 transition-colors duration-300 flex flex-col gap-2">
                  <div className="text-4xl lg:text-5xl">{item.icon}</div>
                  <p className="text-slate-400 text-sm lg:text-xl">{item.label}</p>
                  <div className="flex flex-col gap-1">
                    {item.lines.map((line) =>
                      line.href ? (
                        <a key={line.text} href={line.href} className="text-[0.9rem] lg:text-[1.13rem] font-bold text-teal-400 hover:text-teal-300 transition-colors break-all">
                          {line.text}
                        </a>
                      ) : (
                        <p key={line.text} className="text-[0.9rem] lg:text-[1.13rem] font-bold text-white break-all">{line.text}</p>
                      )
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-12 lg:mt-20 flex flex-wrap justify-center gap-6 lg:gap-10">

              {/* QR-koodi */}
              <div className="flex flex-col items-center gap-3 w-44">
                <div className="bg-white rounded-2xl p-3 shadow-lg w-44 h-44 flex items-center justify-center">
                  <QRCodeSVG value="https://www.pitkansillankatu18.com/" size={136} bgColor="#ffffff" fgColor="#1e293b" level="M" />
                </div>
                <p className="text-teal-400 font-semibold text-base lg:text-lg tracking-wide text-center">{t.qrCaption}</p>
              </div>

              {/* Terassitalo */}
              <div className="flex flex-col items-center gap-3 w-44">
                <a
                  href="https://www.terassitalo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-lg w-44 h-44 hover:shadow-xl transition-shadow group border-t-4 border-amber-400"
                >
                  <svg viewBox="0 0 24 24" className="w-12 h-12 shrink-0" fill="none" stroke="#d97706" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                  <span className="text-slate-800 font-bold text-sm text-center leading-snug">
                    Terassitalo
                  </span>
                  <span className="text-amber-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t.terassitaloOpen}
                  </span>
                </a>
                <p className="text-teal-400 font-semibold text-base lg:text-lg tracking-wide text-center">{t.terassitaloCaption}</p>
              </div>

              {/* Oikotie */}
              <div className="flex flex-col items-center gap-3 w-44">
                <a
                  href="https://toimitilat.oikotie.fi/myytavat-toimitilat/kokkola/21240654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-lg w-44 h-44 hover:shadow-xl transition-shadow group"
                >
                  <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none">
                    <rect width="48" height="48" rx="10" fill="#FF5000"/>
                    <path d="M10 34 C10 34 14 14 24 14 C34 14 38 34 38 34" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <circle cx="24" cy="30" r="5" fill="white"/>
                  </svg>
                  <span className="text-slate-800 font-bold text-base text-center leading-tight">
                    {t.etuoviLine1}<br />{t.etuoviLine2}
                  </span>
                  <span className="text-[#FF5000] font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t.etuoviOpen}
                  </span>
                </a>
                <p className="text-teal-400 font-semibold text-base lg:text-lg tracking-wide text-center">Myynti-ilmoitus</p>
              </div>

              {/* Projektiasunto */}
              <div className="flex flex-col items-center gap-3 w-44">
                <a
                  href="https://pitkansillankatu33.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-lg w-44 h-44 hover:shadow-xl transition-shadow group"
                >
                  <svg viewBox="0 0 24 24" className="w-12 h-12 shrink-0" fill="none" stroke="#0f172a" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span className="text-slate-800 font-bold text-sm text-center leading-snug">
                    {t.aptTitle1}<br />{t.aptTitle2}
                  </span>
                </a>
                <p className="text-teal-400 font-semibold text-base lg:text-lg tracking-wide text-center">{t.aptCaption}</p>
              </div>

            </div>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-white/10">
              <p className="text-slate-500 text-sm lg:text-xl">{t.footer}</p>
            </div>
          </FadeIn>
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
            <p className="text-slate-400 text-base lg:text-xl">{t.mapSub}</p>
          </div>
          <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <PropertyMap />
          </div>
          <p className="text-center text-slate-500 text-sm mt-4">
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
