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

      {/* Walking Santa Claus - visible until January 6th */}
      {(() => {
        const now = new Date();
        const showSanta = now <= new Date('2025-01-06T23:59:59');
        if (!showSanta) return null;
        
        const greeting = lang === "en" ? "Merry Christmas!" : "Hyvää joulua!";
        
        return (
          <div 
            className="fixed bottom-4 z-50 pointer-events-none"
            style={{
              animation: 'santaWalk 20s linear infinite',
            }}
          >
            <style>
              {`
                @keyframes santaWalk {
                  0% { left: -150px; }
                  45% { left: calc(50% - 75px); }
                  55% { left: calc(50% - 75px); }
                  100% { left: calc(100% + 150px); }
                }
                @keyframes santaBounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                @keyframes legWalk {
                  0%, 100% { transform: rotate(-15deg); }
                  50% { transform: rotate(15deg); }
                }
                @keyframes legWalkAlt {
                  0%, 100% { transform: rotate(15deg); }
                  50% { transform: rotate(-15deg); }
                }
                @keyframes waveHand {
                  0%, 100% { transform: rotate(0deg); }
                  25% { transform: rotate(25deg); }
                  75% { transform: rotate(-15deg); }
                }
                .santa-body {
                  animation: santaBounce 0.4s ease-in-out infinite;
                }
                .santa-leg-left {
                  transform-origin: 35px 95px;
                  animation: legWalk 0.4s ease-in-out infinite;
                }
                .santa-leg-right {
                  transform-origin: 55px 95px;
                  animation: legWalkAlt 0.4s ease-in-out infinite;
                }
                .santa-wave {
                  transform-origin: 75px 55px;
                  animation: waveHand 0.6s ease-in-out infinite;
                }
              `}
            </style>
            
            {/* Speech bubble */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="bg-white text-gray-800 px-4 py-2 rounded-2xl text-sm md:text-base font-bold shadow-xl border-2 border-red-500">
                {greeting} 🎄🎅
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
            </div>
            
            {/* Full body walking Santa */}
            <svg viewBox="0 0 100 140" className="w-24 md:w-32 h-auto drop-shadow-2xl santa-body">
              {/* Shadow */}
              <ellipse cx="50" cy="138" rx="30" ry="5" fill="#000" opacity="0.2" />
              
              {/* Legs */}
              <g className="santa-leg-left">
                <rect x="30" y="95" width="12" height="35" rx="5" fill="#1a1a1a" />
                <ellipse cx="36" cy="132" rx="10" ry="6" fill="#1a1a1a" />
              </g>
              <g className="santa-leg-right">
                <rect x="50" y="95" width="12" height="35" rx="5" fill="#1a1a1a" />
                <ellipse cx="56" cy="132" rx="10" ry="6" fill="#1a1a1a" />
              </g>
              
              {/* Body (red coat) */}
              <path d="M25 55 Q20 95 30 100 L62 100 Q72 95 67 55 Q60 45 46 45 Q32 45 25 55" fill="#c41e3a" />
              {/* Belt */}
              <rect x="28" y="80" width="36" height="8" fill="#1a1a1a" />
              <rect x="40" y="78" width="12" height="12" rx="2" fill="#ffd700" />
              
              {/* White trim */}
              <path d="M25 55 Q30 50 46 48 Q62 50 67 55" stroke="#fff" strokeWidth="6" fill="none" />
              <rect x="28" y="95" width="36" height="8" fill="#fff" />
              
              {/* Arms */}
              <g className="santa-wave">
                {/* Right arm waving */}
                <path d="M67 58 Q80 50 85 35" stroke="#c41e3a" strokeWidth="12" strokeLinecap="round" fill="none" />
                <circle cx="85" cy="32" r="8" fill="#fdd9b5" />
                {/* Cuff */}
                <ellipse cx="78" cy="42" rx="7" ry="5" fill="#fff" />
              </g>
              {/* Left arm */}
              <path d="M25 58 Q15 70 20 85" stroke="#c41e3a" strokeWidth="12" strokeLinecap="round" fill="none" />
              <ellipse cx="18" cy="62" rx="7" ry="5" fill="#fff" />
              <circle cx="20" cy="88" r="7" fill="#fdd9b5" />
              
              {/* Head */}
              <circle cx="46" cy="28" r="22" fill="#fdd9b5" />
              
              {/* Hat */}
              <path d="M24 28 Q24 8 46 5 Q68 8 68 28" fill="#c41e3a" />
              <rect x="20" y="25" width="52" height="8" rx="4" fill="#fff" />
              <circle cx="68" cy="8" r="8" fill="#fff" />
              
              {/* Face */}
              {/* Eyes */}
              <circle cx="38" cy="24" r="3" fill="#2c1810" />
              <circle cx="54" cy="24" r="3" fill="#2c1810" />
              <circle cx="39" cy="23" r="1" fill="#fff" />
              <circle cx="55" cy="23" r="1" fill="#fff" />
              
              {/* Rosy cheeks */}
              <circle cx="32" cy="32" r="4" fill="#ffb6c1" opacity="0.6" />
              <circle cx="60" cy="32" r="4" fill="#ffb6c1" opacity="0.6" />
              
              {/* Nose */}
              <circle cx="46" cy="30" r="4" fill="#e8a090" />
              
              {/* Mustache */}
              <path d="M34 36 Q40 40 46 38 Q52 40 58 36" stroke="#fff" strokeWidth="4" fill="none" />
              
              {/* Beard */}
              <path d="M28 35 Q26 55 46 60 Q66 55 64 35" fill="#fff" />
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
