import { useState, useEffect, useMemo } from "react";
import BookingWidget from "./BookingWidget";
import { getTranslations, Language } from "@/translations";
import heroCabin from "@/assets/hero-cabin.jpg";
import heroChalet from "@/assets/hero-chalet.png";
import heroVillage from "@/assets/hero-village.png";
import heroApartment from "@/assets/hero-apartment.png";
import heroLodge from "@/assets/hero-lodge.png";
import santaWalking from "@/assets/santa-walking.png";

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

      {/* Walking Santa Claus - visible until January 6th */}
      {(() => {
        const now = new Date();
        // Show Santa until Jan 6th (next upcoming Jan 6 relative to today)
        const endYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
        const showSanta = now <= new Date(endYear, 0, 6, 23, 59, 59);
        if (!showSanta) return null;
        
        const greeting = lang === "en" ? "Merry Christmas!" : "Hyvää joulua!";
        
        return (
          <div 
            className="fixed bottom-0 z-50 pointer-events-none"
            style={{
              animation: 'santaWalk 25s linear infinite',
            }}
          >
            <style>
              {`
                @keyframes santaWalk {
                  0% { left: -200px; }
                  40% { left: calc(50% - 80px); }
                  60% { left: calc(50% - 80px); }
                  100% { left: calc(100% + 200px); }
                }
                @keyframes santaBob {
                  0%, 100% { transform: translateY(0) rotate(-2deg); }
                  50% { transform: translateY(-5px) rotate(2deg); }
                }
                .santa-realistic {
                  animation: santaBob 0.5s ease-in-out infinite;
                }
              `}
            </style>
            
            {/* Speech bubble */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="bg-white text-gray-800 px-5 py-3 rounded-2xl text-base md:text-lg font-bold shadow-2xl border-2 border-red-600">
                {greeting} 🎄
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
            </div>
            
            {/* Realistic Santa image */}
            <img 
              src={santaWalking} 
              alt="Santa Claus" 
              className="h-40 md:h-52 w-auto santa-realistic drop-shadow-2xl"
            />
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
