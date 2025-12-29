import { MapPin } from "lucide-react";

interface LeviMapProps {
  lang?: "fi" | "en";
}

const LeviMap = ({ lang = "fi" }: LeviMapProps) => {
  const accommodations = [
    {
      id: 1,
      name: "Glacier Apartments",
      address: "Ratsastajankuja 2",
      x: 35,
      y: 45,
      color: "#3B82F6", // blue
    },
    {
      id: 2,
      name: "Levi Centre Chalets",
      address: "Hiihtäjänkuja 5",
      x: 55,
      y: 35,
      color: "#10B981", // green
    },
    {
      id: 3,
      name: "Skistar",
      address: "Postintie 3b",
      x: 70,
      y: 55,
      color: "#F59E0B", // amber
    },
    {
      id: 4,
      name: "Karhupirtti",
      address: "Skimbaajankuja 3",
      x: 45,
      y: 65,
      color: "#EF4444", // red
    },
  ];

  const title = lang === "en" ? "Our Accommodations in Levi" : "Majoituskohteemme Levillä";

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold text-foreground text-center mb-6">{title}</h3>
      
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden border border-border/30">
        {/* Mountain silhouettes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="text-blue-200 dark:text-blue-900" style={{ stopColor: "currentColor" }} />
              <stop offset="100%" className="text-blue-100 dark:text-slate-800" style={{ stopColor: "currentColor" }} />
            </linearGradient>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="text-slate-400 dark:text-slate-600" style={{ stopColor: "currentColor" }} />
              <stop offset="100%" className="text-slate-300 dark:text-slate-700" style={{ stopColor: "currentColor" }} />
            </linearGradient>
          </defs>
          
          {/* Background */}
          <rect x="0" y="0" width="100" height="100" fill="url(#skyGradient)" />
          
          {/* Back mountains */}
          <path 
            d="M0 40 L15 25 L30 35 L45 20 L60 30 L75 15 L90 28 L100 22 L100 100 L0 100 Z" 
            fill="url(#mountainGradient)"
            opacity="0.5"
          />
          
          {/* Front mountain (Levi tunturi) */}
          <path 
            d="M10 55 L35 28 L50 40 L65 25 L85 45 L100 38 L100 100 L0 100 L0 55 Z" 
            className="fill-slate-500 dark:fill-slate-600"
          />
          
          {/* Snow on peaks */}
          <path 
            d="M35 28 L38 32 L32 32 Z" 
            className="fill-white dark:fill-slate-300"
          />
          <path 
            d="M65 25 L69 30 L61 30 Z" 
            className="fill-white dark:fill-slate-300"
          />
          
          {/* Ground/village area */}
          <ellipse cx="50" cy="75" rx="45" ry="20" className="fill-emerald-200/50 dark:fill-emerald-900/30" />
          
          {/* Roads */}
          <path 
            d="M20 80 Q35 70 50 75 Q65 80 80 72" 
            className="stroke-amber-300 dark:stroke-amber-600" 
            strokeWidth="1" 
            fill="none"
            strokeDasharray="2,1"
          />
          <path 
            d="M30 90 Q45 80 60 85 Q75 90 90 82" 
            className="stroke-amber-300 dark:stroke-amber-600" 
            strokeWidth="0.8" 
            fill="none"
            strokeDasharray="2,1"
          />
          
          {/* Ski slopes */}
          <path 
            d="M35 28 L25 60" 
            className="stroke-white dark:stroke-slate-400" 
            strokeWidth="2" 
            fill="none"
            opacity="0.7"
          />
          <path 
            d="M65 25 L55 55" 
            className="stroke-white dark:stroke-slate-400" 
            strokeWidth="2" 
            fill="none"
            opacity="0.7"
          />
          <path 
            d="M65 25 L75 60" 
            className="stroke-white dark:stroke-slate-400" 
            strokeWidth="1.5" 
            fill="none"
            opacity="0.5"
          />
          
          {/* Trees scattered */}
          {[
            { x: 15, y: 65 },
            { x: 20, y: 70 },
            { x: 85, y: 60 },
            { x: 90, y: 68 },
            { x: 12, y: 75 },
            { x: 88, y: 75 },
          ].map((tree, i) => (
            <g key={i}>
              <polygon 
                points={`${tree.x},${tree.y - 4} ${tree.x - 2},${tree.y} ${tree.x + 2},${tree.y}`}
                className="fill-emerald-600 dark:fill-emerald-700"
              />
              <rect 
                x={tree.x - 0.3} 
                y={tree.y} 
                width="0.6" 
                height="1.5" 
                className="fill-amber-800 dark:fill-amber-900"
              />
            </g>
          ))}
          
          {/* Village center label */}
          <text 
            x="50" 
            y="82" 
            textAnchor="middle" 
            className="fill-slate-600 dark:fill-slate-400" 
            fontSize="3"
            fontWeight="500"
          >
            LEVI
          </text>
        </svg>
        
        {/* Accommodation markers */}
        {accommodations.map((acc) => (
          <div
            key={acc.id}
            className="absolute transform -translate-x-1/2 -translate-y-full group cursor-pointer"
            style={{ left: `${acc.x}%`, top: `${acc.y}%` }}
          >
            {/* Marker */}
            <div 
              className="relative flex flex-col items-center animate-bounce"
              style={{ animationDuration: `${2 + acc.id * 0.3}s` }}
            >
              <div 
                className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125"
                style={{ backgroundColor: acc.color }}
              >
                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <div 
                className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent -mt-1"
                style={{ borderTopColor: acc.color }}
              />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                <p className="text-sm font-semibold text-foreground">{acc.name}</p>
                <p className="text-xs text-muted-foreground">{acc.address}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Legend */}
        <div className="absolute bottom-3 left-3 right-3 md:left-auto md:right-3 md:w-auto">
          <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {accommodations.map((acc) => (
                <div key={acc.id} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: acc.color }}
                  />
                  <span className="text-xs text-foreground truncate">{acc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeviMap;
