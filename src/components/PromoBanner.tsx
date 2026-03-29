import { Link } from "react-router-dom";
import { usePromoBanner } from "@/hooks/usePromoBanner";
import { Language } from "@/translations";
import {
  PartyPopper, Snowflake, Sparkles, Sun, TreePine, Leaf, Mountain, ArrowRight,
} from "lucide-react";

interface PromoBannerProps {
  lang?: Language;
}

/* ─── Theme configs ─── */
const themes: Record<string, {
  gradient: string;
  icon: React.ElementType;
  accentColor: string;
  emoji: string;
  decorations: () => React.ReactNode;
}> = {
  vappu: {
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    icon: PartyPopper,
    accentColor: "text-yellow-900",
    emoji: "🎉",
    decorations: () => (
      <>
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 100" preserveAspectRatio="none">
          <path d="M0 30 Q50 5 100 30 T200 30 T300 30 T400 30" stroke="#fff" strokeWidth="2" fill="none" />
          <path d="M0 50 Q50 25 100 50 T200 50 T300 50 T400 50" stroke="#fff" strokeWidth="1.5" fill="none" />
          <path d="M0 70 Q50 45 100 70 T200 70 T300 70 T400 70" stroke="#fff" strokeWidth="1" fill="none" />
        </svg>
        {/* Balloon dots */}
        <div className="absolute top-2 left-[8%] w-3 h-4 rounded-full bg-blue-300/40" />
        <div className="absolute top-4 left-[12%] w-2.5 h-3.5 rounded-full bg-red-300/40" />
        <div className="absolute top-1 right-[10%] w-3 h-4 rounded-full bg-green-300/40" />
        <div className="absolute top-3 right-[15%] w-2.5 h-3.5 rounded-full bg-purple-300/40" />
      </>
    ),
  },
  joulu: {
    gradient: "from-red-700 via-red-600 to-green-700",
    icon: TreePine,
    accentColor: "text-red-100",
    emoji: "🎄",
    decorations: () => (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 400 100" preserveAspectRatio="none">
        {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((x, i) => (
          <circle key={i} cx={x} cy={15 + (i % 3) * 25} r="3" fill="white" />
        ))}
      </svg>
    ),
  },
  uusivuosi: {
    gradient: "from-indigo-900 via-purple-800 to-amber-500",
    icon: Sparkles,
    accentColor: "text-amber-200",
    emoji: "🥂",
    decorations: () => (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 100" preserveAspectRatio="none">
        {[30, 80, 150, 210, 280, 350].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={10 + (i % 2) * 30} x2={x} y2={25 + (i % 2) * 30} stroke="#FACC15" strokeWidth="1.5" />
            <line x1={x - 7} y1={17 + (i % 2) * 30} x2={x + 7} y2={17 + (i % 2) * 30} stroke="#FACC15" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
    ),
  },
  kevathanget: {
    gradient: "from-sky-400 via-blue-400 to-cyan-300",
    icon: Mountain,
    accentColor: "text-sky-900",
    emoji: "⛷️",
    decorations: () => (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 400 100" preserveAspectRatio="none">
        <path d="M0 80 L50 40 L100 60 L150 20 L200 50 L250 30 L300 55 L350 15 L400 45" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  ruska: {
    gradient: "from-orange-600 via-amber-500 to-yellow-500",
    icon: Leaf,
    accentColor: "text-orange-900",
    emoji: "🍂",
    decorations: () => (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 400 100" preserveAspectRatio="none">
        {[40, 120, 200, 280, 360].map((x, i) => (
          <ellipse key={i} cx={x} cy={20 + (i % 3) * 20} rx="8" ry="5" fill="white" transform={`rotate(${i * 30} ${x} ${20 + (i % 3) * 20})`} />
        ))}
      </svg>
    ),
  },
  kesa: {
    gradient: "from-emerald-400 via-teal-400 to-sky-400",
    icon: Sun,
    accentColor: "text-emerald-900",
    emoji: "☀️",
    decorations: () => (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 400 100" preserveAspectRatio="none">
        <circle cx="350" cy="30" r="20" fill="white" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={i} x1={350 + Math.cos(rad) * 24} y1={30 + Math.sin(rad) * 24} x2={350 + Math.cos(rad) * 32} y2={30 + Math.sin(rad) * 32} stroke="white" strokeWidth="2" />;
        })}
      </svg>
    ),
  },
  talvi: {
    gradient: "from-slate-700 via-blue-800 to-indigo-900",
    icon: Snowflake,
    accentColor: "text-blue-200",
    emoji: "❄️",
    decorations: () => (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 400 100" preserveAspectRatio="none">
        {[30, 90, 150, 210, 270, 330, 370].map((x, i) => (
          <text key={i} x={x} y={20 + (i % 3) * 25} fontSize="14" fill="white" opacity="0.5">❄</text>
        ))}
      </svg>
    ),
  },
};

const PromoBanner = ({ lang = "fi" }: PromoBannerProps) => {
  const { banner, loading, getHeading, getSubtext, getButtonText } = usePromoBanner(lang);

  if (loading || !banner) return null;

  const theme = themes[banner.theme] || themes.vappu;
  const Icon = theme.icon;
  const heading = getHeading(banner);
  const subtext = getSubtext(banner);
  const buttonText = getButtonText(banner);
  const isExternal = banner.target_url.startsWith("http");

  const content = (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${theme.gradient} shadow-xl hover:shadow-2xl transition-shadow`}
    >
      {theme.decorations()}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 px-6 py-5 md:px-8 md:py-6">
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-3xl md:text-4xl">{theme.emoji}</span>
          <Icon className="w-8 h-8 text-white/80" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg md:text-xl font-extrabold text-white leading-tight">{heading}</h3>
          {subtext && (
            <p className="text-sm md:text-base text-white/85 mt-1">{subtext}</p>
          )}
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center gap-2 bg-white/95 hover:bg-white text-sm md:text-base font-bold rounded-xl px-5 py-2.5 shadow-md transition-all hover:scale-105 cursor-pointer"
            style={{ color: "inherit" }}
          >
            <span className={theme.accentColor}>{buttonText}</span>
            <ArrowRight className={`w-4 h-4 ${theme.accentColor}`} />
          </span>
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <section className="container mx-auto px-4 py-6">
        <a href={banner.target_url} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <Link to={banner.target_url} className="block">
        {content}
      </Link>
    </section>
  );
};

export default PromoBanner;
