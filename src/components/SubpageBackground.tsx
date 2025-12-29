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
    for (let i = 0; i < 25; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Faint Aurora Borealis */}
      <div className="absolute inset-0">
        {/* Aurora layer 1 - green/cyan - main glow */}
        <div 
          className="absolute top-0 left-1/4 w-[80%] h-[50%] opacity-[0.2] blur-[80px] animate-subpage-aurora-1"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 20%, hsl(160 70% 50% / 0.7), hsl(195 80% 50% / 0.4), transparent 70%)',
          }}
        />
        
        {/* Aurora layer 2 - blue */}
        <div 
          className="absolute top-[5%] right-1/4 w-[60%] h-[45%] opacity-[0.15] blur-[60px] animate-subpage-aurora-2"
          style={{
            background: 'radial-gradient(ellipse 100% 70% at 60% 30%, hsl(195 80% 55% / 0.6), hsl(180 60% 45% / 0.3), transparent 70%)',
          }}
        />
        
        {/* Aurora layer 3 - violet/pink hint */}
        <div 
          className="absolute top-[10%] left-1/3 w-[50%] h-[35%] opacity-[0.12] blur-[100px] animate-subpage-aurora-3"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(280 50% 55% / 0.5), hsl(220 60% 50% / 0.3), transparent 70%)',
          }}
        />

        {/* Additional subtle shimmer layer */}
        <div 
          className="absolute top-0 left-0 w-full h-[40%] opacity-[0.08] blur-[120px]"
          style={{
            background: 'linear-gradient(180deg, hsl(160 60% 45% / 0.3) 0%, transparent 100%)',
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
          {/* Snow crystal shape - brighter */}
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

      {/* Subtle gradient overlay at bottom for depth */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(218 25% 10% / 0.5), transparent)',
        }}
      />
    </div>
  );
};

export default SubpageBackground;
