import { useState, useEffect, useMemo, useRef } from "react";
import { MapPin, CreditCard, Home } from "lucide-react";
import { getTranslations, Language } from "@/translations";
import heroCabin from "@/assets/hero-cabin.jpg";
import heroChalet from "@/assets/hero-chalet.png";
import heroVillage from "@/assets/hero-village.png";
import heroApartment from "@/assets/hero-apartment.png";
import heroLodge from "@/assets/hero-lodge.png";

const heroImages = [heroChalet, heroVillage, heroApartment, heroLodge, heroCabin];

const FADE_DURATION_MS = 5000;
const SLIDE_INTERVAL_MS = 10000;

interface HeroProps {
  lang?: Language;
}

const Hero = ({ lang = "fi" }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(null);
  const [previousVisible, setPreviousVisible] = useState(false);

  const fadeTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const t = getTranslations(lang).hero;

  const stars = useMemo(
    () =>
      [...Array(50)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 55,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: 1.5 + Math.random() * 2,
      })),
    []
  );

  const trustIcons = [MapPin, CreditCard, Home];

  useEffect(() => {
    // Preload hero images to prevent black flashes during transitions
    heroImages.slice(1).forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % heroImages.length;

        // Keep the outgoing image fully visible on top, then fade it out.
        setPreviousImageIndex(prev);
        setPreviousVisible(true);

        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = window.requestAnimationFrame(() => {
          setPreviousVisible(false);
        });

        if (fadeTimeoutRef.current) {
          window.clearTimeout(fadeTimeoutRef.current);
        }
        fadeTimeoutRef.current = window.setTimeout(() => {
          setPreviousImageIndex(null);
        }, FADE_DURATION_MS);

        return next;
      });
    }, SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative z-40 min-h-screen flex items-center justify-center pt-32 sm:pt-20 pb-24 sm:pb-32 overflow-visible"
    >
      {/* Background images slideshow with crossfade and Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden bg-leville-dark">
        {heroImages.map((image, index) => {
          const isCurrent = index === currentImageIndex;
          const isPrevious = previousImageIndex !== null && index === previousImageIndex;
          const isCabin = image === heroCabin;
          const kenBurnsClass = isCabin ? "animate-ken-burns-cabin" : "animate-ken-burns";

          // Only render current + previous for performance and predictable layering.
          if (!isCurrent && !isPrevious) return null;

          return (
            <div
              key={index}
              className={`absolute inset-0 ${kenBurnsClass}`}
              style={{
                zIndex: isPrevious ? 2 : 1,
                // Freeze outgoing image at its current zoom to prevent "snap back" while fading.
                animationPlayState: isPrevious ? "paused" : "running",
              }}
            >
              <img
                src={image}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[5000ms] ease-in-out ${
                  isCabin ? "hero-cabin-image" : ""
                } ${
                  isCurrent
                    ? "opacity-100"
                    : previousVisible
                      ? "opacity-100"
                      : "opacity-0"
                }`}
              />
            </div>
          );
        })}

        {/* Dark overlay for text readability - optimized with Leville brand colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-leville-dark/75 via-leville-dark/50 to-leville-dark/85 z-[3]" />
      </div>

      {/* Subtle Aurora overlay effects - with turquoise accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[4]">
        <div 
          className="absolute -top-20 left-0 w-[800px] h-[500px] bg-gradient-to-b from-aurora-green/25 via-leville-turquoise/15 to-transparent rounded-full blur-3xl mix-blend-screen animate-aurora-1"
        />
        <div
          className="absolute -top-10 right-0 w-[700px] h-[400px] bg-gradient-to-b from-leville-turquoise/20 via-aurora-green/12 to-transparent rounded-full blur-3xl mix-blend-screen animate-aurora-2"
        />
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[4]">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--twinkle-duration': `${star.duration}s`,
              '--twinkle-delay': `${star.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-[100]" style={{ overflow: 'visible' }}>
        <div className="max-w-4xl mx-auto text-center" style={{ overflow: 'visible' }}>

          {/* Main heading - clear value proposition */}
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-semibold text-foreground mb-4 md:mb-6 animate-slide-up tracking-tight leading-tight">
            {t.title} <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          {/* Subheading - benefits focused */}
          <p
            className="text-base sm:text-lg md:text-xl text-foreground/85 mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed px-2"
            style={{ animationDelay: '0.2s' }}
          >
            {t.subtitle}
          </p>

          {/* Trust indicators with icons - improved visibility */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8 mb-6 md:mb-8 animate-fade-in px-2"
            style={{ animationDelay: '0.25s' }}
          >
            {t.trustIndicators.map((indicator, index) => {
              const Icon = trustIcons[index] || MapPin;
              return (
                <div key={indicator} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-leville-turquoise/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-leville-turquoise" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground/80">
                    {indicator}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Campaign badge - Leville turquoise accent */}
          <div 
            className="inline-flex items-center gap-2.5 bg-leville-turquoise/15 border border-leville-turquoise/30 rounded-full px-5 py-2.5 mb-6 animate-fade-in backdrop-blur-sm"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="text-xl">🎿</span>
            <span className="text-sm sm:text-base font-medium text-foreground">
              {t.discount}
            </span>
          </div>

          {/* Moder Booking Widget - embedded in hero */}
          <div 
            className="animate-fade-in" 
            style={{ animationDelay: '0.4s' }}
          >
           <div 
             id="moder-embed"
             className="relative mx-auto max-w-3xl rounded-2xl shadow-2xl"
           />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
        <div className="w-5 h-9 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
