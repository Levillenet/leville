import { useState, useEffect, useMemo } from "react";
import { ArrowRight, Tag } from "lucide-react";
import BookingWidget from "./BookingWidget";
import { getTranslations, Language } from "@/translations";
import heroCabin from "@/assets/hero-cabin.jpg";
import heroChalet from "@/assets/hero-chalet.png";
import heroVillage from "@/assets/hero-village.png";
import heroApartment from "@/assets/hero-apartment.png";
import heroLodge from "@/assets/hero-lodge.png";

const heroImages = [heroChalet, heroVillage, heroApartment, heroLodge, heroCabin];

interface HeroProps {
  lang?: Language;
}

const Hero = ({ lang = "fi" }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const t = getTranslations(lang).hero;

  const stars = useMemo(() => 
    [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: 1.5 + Math.random() * 2,
    })), []
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
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000); // 10 seconds between transitions

    return () => window.clearInterval(interval);
  }, []);


  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-20 pb-24 sm:pb-32"
      style={{ overflow: 'visible' }}
    >
      {/* Background images slideshow with crossfade and Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden bg-background">
        {heroImages.map((image, index) => {
          const isCurrent = index === currentImageIndex;
          const isCabin = image === heroCabin;
          const kenBurnsClass = isCabin ? "animate-ken-burns-cabin" : "animate-ken-burns";

          return (
            <div
              key={index}
              className={`absolute inset-0 ${isCurrent ? kenBurnsClass : ""}`}
              style={{ zIndex: isCurrent ? 2 : 1 }}
            >
              <img
                src={image}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[5000ms] ease-in-out ${
                  isCabin ? "hero-cabin-image" : ""
                } ${isCurrent ? "opacity-100" : "opacity-0"}`}
                style={{ transition: "opacity 5000ms ease-in-out" }}
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
            className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed px-2"
            style={{ animationDelay: '0.2s' }}
          >
            {t.subtitle}
          </p>

          {/* Discount code banner - above booking widget */}
          {(() => {
            const discountText: Record<Language, { prefix: string; suffix: string; href: string }> = {
              fi: { prefix: "Käytä koodia", suffix: "– 10% alennus keväälle 2026!", href: "/ajankohtaista" },
              en: { prefix: "Use code", suffix: "– 10% off spring 2026!", href: "/en/news" },
              sv: { prefix: "Använd kod", suffix: "– 10% rabatt våren 2026!", href: "/sv/aktuellt" },
              de: { prefix: "Code verwenden", suffix: "– 10% Rabatt für Frühjahr 2026!", href: "/de/aktuelles" },
              es: { prefix: "Usa el código", suffix: "– ¡10% de descuento primavera 2026!", href: "/es/noticias" },
            };
            const discount = discountText[lang];
            return (
              <a 
                href={discount.href}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-aurora-green/20 backdrop-blur-sm border border-primary/40 rounded-full px-4 py-2 mb-4 animate-fade-in hover:border-primary/60 transition-colors group"
                style={{ animationDelay: '0.35s' }}
              >
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {discount.prefix} <span className="text-primary">winter10</span> {discount.suffix}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })()}

          {/* Booking Widget */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s', overflow: 'visible' }}>
            <BookingWidget lang={lang} />
          </div>

          {/* Trust indicators - clear and prominent */}
          <div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 animate-fade-in px-2"
            style={{ animationDelay: '0.6s' }}
          >
            {t.trustIndicators.map((indicator) => (
              <div key={indicator} className="flex items-center gap-2 sm:gap-3">
                <span className="w-2.5 h-2.5 bg-aurora-green rounded-full shadow-[0_0_10px_hsl(160_60%_45%/0.7)]" />
                <span className="text-sm sm:text-base md:text-lg text-foreground font-medium">
                  {indicator}
                </span>
              </div>
            ))}
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
