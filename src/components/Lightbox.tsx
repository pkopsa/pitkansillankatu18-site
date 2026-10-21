"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { webpLoader } from "@/data/gallery";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  index: number;
  labels: { close: string; prev: string; next: string };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ images, index, labels, onClose, onPrev, onNext }: Props) {
  const touchStartX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Uusimmat callbackit refissä, jotta avausefekti ajetaan vain kerran
  const handlers = useRef({ onClose, onPrev, onNext });
  useEffect(() => {
    handlers.current = { onClose, onPrev, onNext };
  });

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handlers.current.onClose();
      if (e.key === "ArrowLeft") handlers.current.onPrev();
      if (e.key === "ArrowRight") handlers.current.onNext();
    }
    // Fokus sulkunappiin avattaessa, takaisin avaajaan suljettaessa
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
  }

  const img = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sulkunappi */}
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center transition-colors"
        aria-label={labels.close}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Vasen nuoli */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 sm:left-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center transition-colors"
          aria-label={labels.prev}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Kuva */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[85vh] mx-14 flex flex-col items-center justify-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex-1">
          <Image
            loader={webpLoader}
            src={img.src}
            alt={img.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>
        <p className="text-white/80 text-sm sm:text-base font-medium tracking-wide pb-2">
          {img.alt}
          <span className="ml-3 text-white/60 text-xs">{index + 1} / {images.length}</span>
        </p>
      </div>

      {/* Oikea nuoli */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 sm:right-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center transition-colors"
          aria-label={labels.next}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
