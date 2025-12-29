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
          {/* Main heading with animated Leville text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-8 tracking-tight">
            <span className="animate-slide-up inline-block">Tervetuloa</span>
          </h1>
          <div className="relative mb-8 -mt-2 overflow-visible">
            {/* Leville text with lightsaber/stardust effect */}
            <span 
              className="font-script text-7xl md:text-8xl lg:text-9xl inline-block relative"
              style={{ 
                transform: 'rotate(-8deg)',
                transformOrigin: 'center center',
              }}
            >
              {/* Base text - always visible */}
              <span 
                className="relative z-10 text-white animate-lightsaber-write"
                style={{
                  textShadow: `
                    0 0 10px rgba(255,255,255,1),
                    0 0 30px rgba(255,255,255,0.9),
                    0 0 60px rgba(160,230,200,0.7),
                    0 0 100px rgba(100,200,255,0.5)
                  `,
                }}
              >
                Leville
              </span>
              
              {/* Glowing writing "tip" that moves across */}
              <span 
                className="absolute top-0 left-0 text-white animate-glow-sweep pointer-events-none"
                style={{
                  textShadow: `
                    0 0 20px rgba(255,255,255,1),
                    0 0 60px rgba(255,255,255,1),
                    0 0 120px rgba(160,230,200,1),
                    0 0 200px rgba(100,200,255,0.8)
                  `,
                  filter: 'blur(1px)',
                }}
              >
                Leville
              </span>
              
              {/* Stardust trail particles */}
              <span className="absolute inset-0 pointer-events-none overflow-visible">
                {[...Array(20)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-stardust"
                    style={{
                      left: `${5 + (i * 5)}%`,
                      top: `${40 + (Math.sin(i) * 30)}%`,
                      animationDelay: `${0.5 + (i * 0.15)}s`,
                      boxShadow: '0 0 6px 2px rgba(255,255,255,0.9), 0 0 12px 4px rgba(160,230,200,0.6)',
                    }}
                  />
                ))}
              </span>
            </span>
            
            {/* Sparkle burst at the end */}
            <span className="absolute -top-4 right-0 md:right-4 lg:right-8 animate-sparkle-burst">
              <svg width="50" height="50" viewBox="0 0 24 24" className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,1)]">
                <path
                  d="M12 0L13.5 9L22 10.5L13.5 12L12 21L10.5 12L2 10.5L10.5 9L12 0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            
            {/* Additional shooting stars around text */}
            <span className="absolute -top-8 left-1/4 animate-shooting-star-1">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-white/80">
                <path d="M12 0L13 8L20 9L13 10L12 18L11 10L4 9L11 8L12 0Z" fill="currentColor" />
              </svg>
            </span>
            <span className="absolute -bottom-4 right-1/3 animate-shooting-star-2">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-white/70">
                <path d="M12 0L13 8L20 9L13 10L12 18L11 10L4 9L11 8L12 0Z" fill="currentColor" />
              </svg>
            </span>
          </div>

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
        .animate-ken-burns {
          animation: kenBurns 8s ease-out forwards;
        }
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        
        /* Lightsaber writing effect - text appears letter by letter */
        .animate-lightsaber-write {
          animation: lightsaberWrite 4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
        }
        @keyframes lightsaberWrite {
          0% {
            clip-path: inset(0 100% 0 0);
            filter: brightness(1);
          }
          100% {
            clip-path: inset(0 0% 0 0);
            filter: brightness(1);
          }
        }
        
        /* Glowing sweep effect - bright glow that moves across */
        .animate-glow-sweep {
          animation: glowSweep 4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
        }
        @keyframes glowSweep {
          0% {
            clip-path: inset(0 100% 0 0);
            opacity: 1;
          }
          90% {
            clip-path: inset(0 0% 0 0);
            opacity: 1;
          }
          100% {
            clip-path: inset(0 0% 0 0);
            opacity: 0;
          }
        }
        
        /* Stardust particles following the text */
        .animate-stardust {
          opacity: 0;
          animation: stardust 1s ease-out forwards;
        }
        @keyframes stardust {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translateY(-5px) translateX(5px) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) translateX(15px) scale(0);
          }
        }
        
        /* Sparkle burst animation */
        .animate-sparkle-burst {
          opacity: 0;
          animation: sparkleBurst 1s ease-out 4.3s forwards;
        }
        @keyframes sparkleBurst {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          40% {
            opacity: 1;
            transform: scale(1.8) rotate(180deg);
          }
          70% {
            opacity: 1;
            transform: scale(1.2) rotate(300deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(360deg);
          }
        }
        
        /* Shooting stars around text */
        .animate-shooting-star-1 {
          opacity: 0;
          animation: shootingStar1 0.8s ease-out 3.5s forwards;
        }
        @keyframes shootingStar1 {
          0% {
            opacity: 0;
            transform: translateX(-20px) translateY(20px) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateX(10px) translateY(-10px) scale(1.2);
          }
          100% {
            opacity: 0.7;
            transform: translateX(20px) translateY(-20px) scale(0.8);
          }
        }
        
        .animate-shooting-star-2 {
          opacity: 0;
          animation: shootingStar2 0.7s ease-out 3.8s forwards;
        }
        @keyframes shootingStar2 {
          0% {
            opacity: 0;
            transform: translateX(20px) translateY(-10px) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateX(-5px) translateY(5px) scale(1);
          }
          100% {
            opacity: 0.6;
            transform: translateX(-15px) translateY(15px) scale(0.7);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
