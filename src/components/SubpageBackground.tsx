import { useEffect, useState, useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  brightness: number;
}

const SubpageBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  // Generate stars only once on mount
  useEffect(() => {
    const generatedStars: Star[] = [];
    for (let i = 0; i < 35; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 70, // Keep stars in upper portion
        size: Math.random() * 2 + 1, // Small, delicate stars
        delay: Math.random() * 8,
        duration: Math.random() * 4 + 4, // Slow, gentle twinkling
        brightness: Math.random() * 0.4 + 0.3, // Subtle brightness variation
      });
    }
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep dark night sky base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 150% 100% at 50% 0%, hsl(218 30% 12%) 0%, hsl(218 25% 8%) 50%, hsl(218 28% 6%) 100%)',
        }}
      />

      {/* Aurora Borealis - Flowing horizontal bands */}
      <div className="absolute inset-0">
        {/* Primary aurora band - soft green, widest */}
        <div 
          className="absolute aurora-band-1"
          style={{
            top: '5%',
            left: '-10%',
            width: '120%',
            height: '35%',
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                hsl(160 55% 40% / 0.08) 10%,
                hsl(155 60% 42% / 0.15) 25%,
                hsl(160 65% 45% / 0.22) 40%,
                hsl(165 60% 43% / 0.18) 55%,
                hsl(158 55% 40% / 0.12) 70%,
                hsl(162 50% 38% / 0.08) 85%,
                transparent 100%
              )
            `,
            filter: 'blur(40px)',
            transform: 'scaleY(0.4) rotate(-2deg)',
            transformOrigin: 'center center',
          }}
        />

        {/* Secondary aurora band - green with blue hint */}
        <div 
          className="absolute aurora-band-2"
          style={{
            top: '12%',
            left: '-5%',
            width: '110%',
            height: '28%',
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                hsl(165 50% 38% / 0.06) 15%,
                hsl(170 55% 42% / 0.14) 30%,
                hsl(175 60% 45% / 0.2) 45%,
                hsl(180 55% 43% / 0.16) 60%,
                hsl(172 50% 40% / 0.1) 75%,
                transparent 100%
              )
            `,
            filter: 'blur(35px)',
            transform: 'scaleY(0.35) rotate(1deg)',
            transformOrigin: 'center center',
          }}
        />

        {/* Tertiary aurora band - subtle purple hint */}
        <div 
          className="absolute aurora-band-3"
          style={{
            top: '8%',
            left: '5%',
            width: '90%',
            height: '25%',
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                hsl(200 45% 40% / 0.05) 20%,
                hsl(240 35% 45% / 0.1) 40%,
                hsl(270 30% 42% / 0.08) 55%,
                hsl(255 35% 40% / 0.06) 70%,
                transparent 100%
              )
            `,
            filter: 'blur(45px)',
            transform: 'scaleY(0.3) rotate(-1deg)',
            transformOrigin: 'center center',
          }}
        />

        {/* Accent aurora wisps - delicate green highlights */}
        <div 
          className="absolute aurora-wisp-1"
          style={{
            top: '3%',
            left: '20%',
            width: '40%',
            height: '20%',
            background: `
              linear-gradient(95deg, 
                transparent 0%, 
                hsl(158 60% 45% / 0.12) 30%,
                hsl(162 65% 48% / 0.18) 50%,
                hsl(156 55% 42% / 0.1) 70%,
                transparent 100%
              )
            `,
            filter: 'blur(25px)',
            transform: 'scaleY(0.25) rotate(-3deg)',
          }}
        />

        {/* Secondary wisp with blue tint */}
        <div 
          className="absolute aurora-wisp-2"
          style={{
            top: '15%',
            left: '50%',
            width: '35%',
            height: '18%',
            background: `
              linear-gradient(88deg, 
                transparent 0%, 
                hsl(175 50% 42% / 0.08) 25%,
                hsl(190 45% 45% / 0.14) 50%,
                hsl(185 40% 40% / 0.08) 75%,
                transparent 100%
              )
            `,
            filter: 'blur(30px)',
            transform: 'scaleY(0.22) rotate(2deg)',
          }}
        />

        {/* Subtle purple accent at edges */}
        <div 
          className="absolute aurora-purple-accent"
          style={{
            top: '6%',
            left: '65%',
            width: '25%',
            height: '22%',
            background: `
              radial-gradient(ellipse 100% 50% at 50% 50%, 
                hsl(280 30% 40% / 0.06) 0%,
                hsl(260 25% 38% / 0.04) 50%,
                transparent 100%
              )
            `,
            filter: 'blur(35px)',
            transform: 'scaleY(0.3)',
          }}
        />
      </div>

      {/* Twinkling Stars - Ice crystals */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.brightness,
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,220,255,0.4) 50%, transparent 100%)',
              boxShadow: '0 0 2px rgba(255,255,255,0.3)',
            }}
          />
        </div>
      ))}

      {/* Soft dark overlay for text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              transparent 0%, 
              hsl(218 25% 8% / 0.2) 30%,
              hsl(218 25% 8% / 0.4) 60%,
              hsl(218 25% 8% / 0.6) 100%
            )
          `,
        }}
      />

      {/* Very subtle vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, transparent 0%, hsl(218 28% 6% / 0.3) 100%)',
        }}
      />
    </div>
  );
};

export default SubpageBackground;
