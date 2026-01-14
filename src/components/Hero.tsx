import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      [...Array(40)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 60,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: 1.5 + Math.random() * 2,
      })),
    []
  );

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
      className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-20 pb-24 sm:pb-32"
      style={{ overflow: "visible" }}
    >
      {/* Background images slideshow with crossfade and Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden bg-background">
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

        {/* Dark overlay for text readability - optimized for commercial clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90 z-[3]" />
      </div>

      {/* Subtle Aurora overlay effects - toned down for commercial focus */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[4]">
        <div 
          className="absolute -top-20 left-0 w-[800px] h-[500px] bg-gradient-to-b from-aurora-green/25 via-aurora-blue/15 to-transparent rounded-full blur-3xl mix-blend-screen animate-aurora-1"
        />
        <div
          className="absolute -top-10 right-0 w-[700px] h-[400px] bg-gradient-to-b from-aurora-blue/20 via-aurora-green/12 to-transparent rounded-full blur-3xl mix-blend-screen animate-aurora-2"
        />
      </div>

      {/* Twinkling stars - reduced for cleaner look */}
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

      <div className="container mx-auto px-4 relative z-10" style={{ overflow: 'visible' }}>
        <div className="max-w-4xl mx-auto text-center" style={{ overflow: 'visible' }}>

          {/* Main heading - clear value proposition */}
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-semibold text-foreground mb-4 md:mb-6 animate-slide-up tracking-tight leading-tight">
            {t.title} <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          {/* Subheading - benefits focused */}
          <p
            className="text-base sm:text-lg md:text-xl text-foreground/80 mb-5 md:mb-6 max-w-2xl mx-auto animate-slide-up leading-relaxed px-2"
            style={{ animationDelay: '0.2s' }}
          >
            {t.subtitle}
          </p>

          {/* Trust indicators - moved under subtitle as small highlights */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 mb-5 md:mb-6 animate-fade-in px-2"
            style={{ animationDelay: '0.25s' }}
          >
            {t.trustIndicators.map((indicator) => (
              <div key={indicator} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-aurora-green rounded-full" />
                <span className="text-xs sm:text-sm text-foreground/70">
                  {indicator}
                </span>
              </div>
            ))}
          </div>

          {/* Campaign badge - clear, visible element */}
          <div 
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-5 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {t.discount}
            </span>
          </div>

          {/* Booking CTA section */}
          <div 
            id="booking-widget"
            className="animate-slide-up flex flex-col items-center gap-4" 
            style={{ animationDelay: '0.4s' }}
          >
            <p className="text-lg sm:text-xl font-semibold text-foreground">
              {t.bookingInstruction}
            </p>
            <Button
              asChild
              size="lg"
              className="group text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all animate-cta-glow"
            >
              <a
                href={`https://app.moder.fi/levillenet${lang === "fi" ? "" : lang === "sv" ? "?lang=sv" : "?lang=en"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.bookingCta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-9 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
