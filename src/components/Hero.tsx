import { useState, useEffect, useMemo } from "react";
import { ArrowRight, Star } from "lucide-react";
import BookingWidget from "./BookingWidget";
import { Button } from "@/components/ui/button";
import { getTranslations, Language } from "@/translations";
import heroCabin from "@/assets/hero-cabin.jpg";
import heroChalet from "@/assets/hero-chalet.png";
import heroVillage from "@/assets/hero-village.png";
import heroApartment from "@/assets/hero-apartment.png";
import heroLodge from "@/assets/hero-lodge.png";

const heroImages = [heroCabin, heroChalet, heroVillage, heroApartment, heroLodge];

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
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const ctaText = lang === "en" ? "View Accommodations" : "Katso majoitukset";
  const ratingText = lang === "en" ? "Excellent reviews" : "Erinomaiset arviot";

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-24 sm:pb-32"
      style={{ overflow: 'visible' }}
    >
      {/* Background images slideshow with crossfade and Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              index === currentImageIndex ? 'animate-ken-burns' : ''
            }`}
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              transform: index === currentImageIndex ? undefined : 'scale(1)',
            }}
          >
            <img
              src={image}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        ))}
        
        {/* Dark overlay for text readability - optimized for commercial clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
      </div>

      {/* Subtle Aurora overlay effects - toned down for commercial focus */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 left-0 w-[800px] h-[500px] bg-gradient-to-b from-aurora-green/25 via-aurora-blue/15 to-transparent rounded-full blur-3xl mix-blend-screen animate-aurora-1"
        />
        <div
          className="absolute -top-10 right-0 w-[700px] h-[400px] bg-gradient-to-b from-aurora-blue/20 via-aurora-green/12 to-transparent rounded-full blur-3xl mix-blend-screen animate-aurora-2"
        />
      </div>

      {/* Twinkling stars - reduced for cleaner look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          
          {/* Social proof badge */}
          <div 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-foreground/90 font-medium">{ratingText}</span>
          </div>

          {/* Main heading - clear value proposition */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold text-foreground mb-4 md:mb-6 animate-slide-up tracking-tight leading-tight">
            {t.title} <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          {/* Subheading - benefits focused */}
          <p
            className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed px-2"
            style={{ animationDelay: '0.2s' }}
          >
            {t.subtitle}
          </p>

          {/* Primary CTA buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 md:mb-10 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              <a href="https://app.moder.fi/levillenet" target="_blank" rel="noopener noreferrer">
                {lang === "en" ? "Book Now" : "Varaa nyt"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-foreground/30 text-foreground hover:bg-foreground/10 font-medium px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
            >
              <a href={lang === "en" ? "/en/accommodations" : "/majoitukset"}>
                {ctaText}
              </a>
            </Button>
          </div>

          {/* Booking Widget */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s', overflow: 'visible' }}>
            <BookingWidget />
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
