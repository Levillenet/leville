import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Language } from "@/translations";

interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
  lang?: Language;
}

const labels = {
  fi: { close: "Sulje kuva", prev: "Edellinen kuva", next: "Seuraava kuva" },
  en: { close: "Close image", prev: "Previous image", next: "Next image" },
};

/**
 * Fullscreen image lightbox for guide galleries.
 * Mounts when open; navigates within the given image set.
 */
const ImageLightbox = ({ images, startIndex, onClose, lang = "fi" }: ImageLightboxProps) => {
  const [index, setIndex] = useState(startIndex);
  const total = images.length;
  const t = labels[lang] ?? labels.fi;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (total > 1 && e.key === "ArrowLeft") prev();
      if (total > 1 && e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next, total]);

  // Touch swipe
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 40) prev();
    else if (dx < -40) next();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={images[index]?.alt}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label={t.close}
        className="absolute top-4 right-4 text-white/90 hover:text-white p-2"
      >
        <X className="w-7 h-7" />
      </button>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label={t.prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      <figure
        className="max-w-[92vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <OptimizedImage
          src={images[index].src}
          alt={images[index].alt}
          className="max-w-[92vw] max-h-[85vh] w-auto h-auto object-contain"
          priority
        />
        <figcaption className="mt-3 text-sm text-white/80 text-center px-4 max-w-xl">
          {images[index].alt}
          {total > 1 && (
            <span className="block mt-1 text-white/60">{index + 1} / {total}</span>
          )}
        </figcaption>
      </figure>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label={t.next}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default ImageLightbox;
