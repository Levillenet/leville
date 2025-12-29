import { useState, useEffect, useMemo } from "react";
import BookingWidget from "./BookingWidget";
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
    [...Array(60)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 80,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: 1.5 + Math.random() * 2,
    })), []
  );

  const sparkles = useMemo(() =>
    [...Array(25)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    })), []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 pb-32"
      style={{ overflow: 'visible' }}
    >
      {/* Background images slideshow with crossfade and Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[3000ms] ease-in-out ${
              index === currentImageIndex ? 'animate-ken-burns' : ''
            }`}
            style={{
              backgroundImage: `url(${image})`,
              opacity: index === currentImageIndex ? 1 : 0,
              transform: index === currentImageIndex ? undefined : 'scale(1)',
            }}
          />
        ))}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/85" />
      </div>

      {/* Moving Aurora overlay effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 left-0 w-[1200px] h-[700px] bg-gradient-to-b from-aurora-green/40 via-aurora-blue/25 to-transparent rounded-full blur-3xl mix-blend-screen animate-aurora-1"
        />
        <div
          className="absolute -top-10 right-0 w-[1000px] h-[600px] bg-gradient-to-b from-aurora-blue/35 via-aurora-green/22 to-transparent rounded-full blur-3xl mix-blend-screen animate-aurora-2"
        />
        <div
          className="absolute top-10 left-1/3 w-[800px] h-[500px] bg-gradient-to-br from-aurora-green/30 via-transparent to-aurora-blue/20 rounded-full blur-3xl mix-blend-screen animate-aurora-3"
        />
      </div>

      {/* Twinkling stars */}
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

      {/* Frost sparkle/crystal effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              '--sparkle-duration': `${sparkle.duration}s`,
              '--sparkle-delay': `${sparkle.delay}s`,
            } as React.CSSProperties}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]">
              <path
                d="M8 0L9 6L15 7L9 8L8 14L7 8L1 7L7 6L8 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10" style={{ overflow: 'visible' }}>
        <div className="max-w-4xl mx-auto text-center" style={{ overflow: 'visible' }}>
          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-semibold text-foreground mb-6 animate-slide-up tracking-tight">
            {t.title} <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            {t.subtitle}
          </p>

          {/* Booking Widget */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s', overflow: 'visible' }}>
            <BookingWidget />
          </div>

          {/* Trust indicators */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-12 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            {t.trustIndicators.map((indicator) => (
              <div key={indicator} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-aurora-green rounded-full shadow-[0_0_8px_hsl(160_60%_45%/0.6)]" />
                <span className="font-display text-sm md:text-base lg:text-lg text-foreground/90 tracking-widest uppercase font-medium">
                  {indicator}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Santa Claus - visible until January 6th */}
      {(() => {
        const now = new Date();
        const showSanta = now <= new Date('2025-01-06T23:59:59');
        if (!showSanta) return null;
        
        const greeting = lang === "en" ? "Merry Christmas!" : "Hyvää joulua!";
        
        return (
          <div className="absolute bottom-0 left-8 md:left-16 z-20 animate-slide-up pointer-events-none">
            {/* Speech bubble */}
            <div className="relative mb-2">
              <div className="bg-white text-gray-800 px-4 py-2 rounded-2xl text-sm md:text-base font-medium shadow-lg">
                {greeting} 🎄
              </div>
              <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
            </div>
            {/* Santa peeking */}
            <svg viewBox="0 0 120 100" className="w-24 md:w-32 h-auto drop-shadow-2xl">
              {/* Santa's hat */}
              <ellipse cx="60" cy="95" rx="35" ry="8" fill="#1a1a1a" opacity="0.2" />
              <path d="M25 60 Q30 20 60 15 Q90 20 95 60 L85 60 Q80 30 60 25 Q40 30 35 60 Z" fill="#c41e3a" />
              <ellipse cx="60" cy="60" rx="40" ry="8" fill="#fff" />
              <circle cx="95" cy="18" r="10" fill="#fff" />
              
              {/* Santa's face */}
              <ellipse cx="60" cy="75" rx="28" ry="22" fill="#fdd9b5" />
              
              {/* Eyes */}
              <ellipse cx="50" cy="70" rx="4" ry="5" fill="#2c1810" />
              <ellipse cx="70" cy="70" rx="4" ry="5" fill="#2c1810" />
              <circle cx="51" cy="69" r="1.5" fill="#fff" />
              <circle cx="71" cy="69" r="1.5" fill="#fff" />
              
              {/* Rosy cheeks */}
              <circle cx="42" cy="78" r="5" fill="#ffb6c1" opacity="0.6" />
              <circle cx="78" cy="78" r="5" fill="#ffb6c1" opacity="0.6" />
              
              {/* Nose */}
              <ellipse cx="60" cy="78" rx="5" ry="4" fill="#e8a090" />
              
              {/* Mustache */}
              <path d="M45 83 Q50 88 60 85 Q70 88 75 83 Q70 90 60 88 Q50 90 45 83" fill="#fff" />
              
              {/* Beard */}
              <path d="M32 75 Q30 95 60 100 Q90 95 88 75 Q85 85 60 90 Q35 85 32 75" fill="#fff" />
              
              {/* Eyebrows */}
              <path d="M44 64 Q50 62 54 65" stroke="#fff" strokeWidth="2" fill="none" />
              <path d="M66 65 Q70 62 76 64" stroke="#fff" strokeWidth="2" fill="none" />
            </svg>
          </div>
        );
      })()}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-muted-foreground/40 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
