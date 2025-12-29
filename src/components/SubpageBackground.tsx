import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const SubpageBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars/snow crystals
    const generatedStars: Star[] = [];
    for (let i = 0; i < 20; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 80,
        size: Math.random() * 5 + 3,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora Borealis - Curtain-like bands */}
      <div className="absolute inset-0">
        {/* Aurora curtain 1 - green, leftmost */}
        <div 
          className="absolute animate-aurora-curtain-1"
          style={{
            top: '-10%',
            left: '5%',
            width: '25%',
            height: '70%',
            background: 'linear-gradient(180deg, transparent 0%, hsl(160 70% 50% / 0.3) 20%, hsl(160 60% 45% / 0.5) 40%, hsl(170 70% 50% / 0.3) 60%, hsl(180 60% 45% / 0.2) 80%, transparent 100%)',
            filter: 'blur(30px)',
            transform: 'skewX(-15deg)',
          }}
        />

        {/* Aurora curtain 2 - cyan/blue */}
        <div 
          className="absolute animate-aurora-curtain-2"
          style={{
            top: '-5%',
            left: '25%',
            width: '20%',
            height: '65%',
            background: 'linear-gradient(180deg, transparent 0%, hsl(180 70% 50% / 0.25) 15%, hsl(195 80% 50% / 0.45) 35%, hsl(200 70% 45% / 0.35) 55%, hsl(190 60% 40% / 0.2) 75%, transparent 100%)',
            filter: 'blur(25px)',
            transform: 'skewX(-10deg)',
          }}
        />

        {/* Aurora curtain 3 - green/teal, center */}
        <div 
          className="absolute animate-aurora-curtain-3"
          style={{
            top: '-8%',
            left: '40%',
            width: '30%',
            height: '75%',
            background: 'linear-gradient(180deg, transparent 0%, hsl(165 65% 50% / 0.2) 10%, hsl(160 70% 50% / 0.4) 30%, hsl(170 75% 48% / 0.5) 50%, hsl(180 65% 45% / 0.3) 70%, hsl(190 55% 40% / 0.15) 85%, transparent 100%)',
            filter: 'blur(35px)',
            transform: 'skewX(-5deg)',
          }}
        />

        {/* Aurora curtain 4 - blue/purple */}
        <div 
          className="absolute animate-aurora-curtain-4"
          style={{
            top: '-3%',
            left: '60%',
            width: '22%',
            height: '60%',
            background: 'linear-gradient(180deg, transparent 0%, hsl(200 70% 50% / 0.2) 20%, hsl(220 60% 50% / 0.35) 40%, hsl(260 50% 50% / 0.25) 60%, hsl(240 45% 45% / 0.15) 80%, transparent 100%)',
            filter: 'blur(28px)',
            transform: 'skewX(-12deg)',
          }}
        />

        {/* Aurora curtain 5 - rightmost, green */}
        <div 
          className="absolute animate-aurora-curtain-5"
          style={{
            top: '-6%',
            left: '78%',
            width: '18%',
            height: '55%',
            background: 'linear-gradient(180deg, transparent 0%, hsl(160 60% 50% / 0.2) 25%, hsl(165 70% 48% / 0.35) 45%, hsl(175 65% 45% / 0.25) 65%, transparent 100%)',
            filter: 'blur(22px)',
            transform: 'skewX(-8deg)',
          }}
        />

        {/* Soft glow overlay at top */}
        <div 
          className="absolute top-0 left-0 w-full h-[30%] opacity-30"
          style={{
            background: 'linear-gradient(180deg, hsl(160 50% 45% / 0.15) 0%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Twinkling Stars / Snow Crystals */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-subpage-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          {/* Snow crystal shape */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-full h-full"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.64 5.64l2.83 2.83M15.54 15.54l2.83 2.83M5.64 18.36l2.83-2.83M15.54 8.46l2.83-2.83" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default SubpageBackground;
