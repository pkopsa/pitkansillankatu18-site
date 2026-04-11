"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const touchStartX = useRef<number | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? onNext() : onPrev();
    touchStartX.current = null;
  }

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sulkunappi */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        aria-label="Sulje"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Vasen nuoli */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 sm:left-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        aria-label="Edellinen"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Kuva */}
      <div
        className="relative w-full h-full max-w-5xl max-h-[85vh] mx-14 flex flex-col items-center justify-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex-1">
          <Image
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
          <span className="ml-3 text-white/40 text-xs">{index + 1} / {images.length}</span>
        </p>
      </div>

      {/* Oikea nuoli */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 sm:right-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        aria-label="Seuraava"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
