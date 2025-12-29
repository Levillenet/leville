import { useState, useEffect, useMemo } from "react";
import BookingWidget from "./BookingWidget";
import heroCabin from "@/assets/hero-cabin.jpg";
import heroChalet from "@/assets/hero-chalet.png";
import heroVillage from "@/assets/hero-village.png";
import heroApartment from "@/assets/hero-apartment.png";
import heroLodge from "@/assets/hero-lodge.png";

const heroImages = [heroCabin, heroChalet, heroVillage, heroApartment, heroLodge];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Generate stable star positions
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

  // Generate sparkle/frost particles
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
      setIsTransitioning(true);
      setNextImageIndex((prev) => (prev + 1) % heroImages.length);
      
      // After transition completes, update current index
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 2500);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 pb-32"
      style={{ overflow: 'visible' }}
    >
      {/* Background images slideshow with crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Current image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2500ms] ease-in-out"
          style={{
            backgroundImage: `url(${heroImages[currentImageIndex]})`,
            opacity: isTransitioning ? 0 : 1,
          }}
        />
        {/* Next image fading in */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2500ms] ease-in-out"
          style={{
            backgroundImage: `url(${heroImages[nextImageIndex]})`,
            opacity: isTransitioning ? 1 : 0,
          }}
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/85" />
      </div>

      {/* Moving Aurora overlay effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 left-0 w-[1200px] h-[700px] bg-gradient-to-b from-aurora-green/40 via-aurora-blue/25 to-transparent rounded-full blur-3xl mix-blend-screen"
          style={{
            animation: 'auroraMove1 6s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -top-10 right-0 w-[1000px] h-[600px] bg-gradient-to-b from-aurora-blue/35 via-aurora-green/22 to-transparent rounded-full blur-3xl mix-blend-screen"
          style={{
            animation: 'auroraMove2 7s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-10 left-1/3 w-[800px] h-[500px] bg-gradient-to-br from-aurora-green/30 via-transparent to-aurora-blue/20 rounded-full blur-3xl mix-blend-screen"
          style={{
            animation: 'auroraMove3 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Frost sparkle/crystal effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animation: `sparkle ${sparkle.duration}s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
            }}
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6 animate-slide-up tracking-tight">
            Tervetuloa <span className="text-gradient">Leville</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Majoitu leppoisasti Levin keskustassa – modernit huoneistot ja tunnelmalliset mökit parhailla paikoilla
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
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-aurora-green rounded-full shadow-[0_0_8px_hsl(160_60%_45%/0.6)]" />
              <span className="font-display text-sm md:text-base lg:text-lg text-foreground/90 tracking-widest uppercase font-medium">Keskustan parhaat sijainnit</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-aurora-green rounded-full shadow-[0_0_8px_hsl(160_60%_45%/0.6)]" />
              <span className="font-display text-sm md:text-base lg:text-lg text-foreground/90 tracking-widest uppercase font-medium">Suora varaus ilman välikäsiä</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-aurora-green rounded-full shadow-[0_0_8px_hsl(160_60%_45%/0.6)]" />
              <span className="font-display text-sm md:text-base lg:text-lg text-foreground/90 tracking-widest uppercase font-medium">Henkilökohtainen palvelu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-muted-foreground/40 rounded-full" />
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          25% { opacity: 1; transform: scale(1.2) rotate(90deg); }
          50% { opacity: 0.3; transform: scale(0.8) rotate(180deg); }
          75% { opacity: 1; transform: scale(1.1) rotate(270deg); }
        }
        @keyframes auroraMove1 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(80px) translateY(-30px) scale(1.05); }
          50% { transform: translateX(200px) translateY(-60px) scale(1.15); }
          75% { transform: translateX(100px) translateY(-20px) scale(1.08); }
        }
        @keyframes auroraMove2 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(-60px) translateY(20px) scale(1.08); }
          50% { transform: translateX(-180px) translateY(50px) scale(1.2); }
          75% { transform: translateX(-90px) translateY(25px) scale(1.1); }
        }
        @keyframes auroraMove3 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.6; }
          33% { transform: translateX(120px) translateY(-70px) scale(1.25); opacity: 1; }
          66% { transform: translateX(-60px) translateY(-40px) scale(1.1); opacity: 0.85; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
