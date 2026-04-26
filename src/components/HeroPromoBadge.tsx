import { Link } from "react-router-dom";
import { usePromoBanner } from "@/hooks/usePromoBanner";
import { Language } from "@/translations";
import {
  PartyPopper, Snowflake, Sparkles, Sun, TreePine, Leaf, Mountain,
} from "lucide-react";

interface HeroPromoBadgeProps {
  lang?: Language;
  /** Fallback text shown when no admin-managed banner exists. */
  fallbackText: string;
}

/* Compact theme map used inside the hero badge */
const themeMap: Record<string, { emoji: string; icon: React.ElementType }> = {
  vappu: { emoji: "🎉", icon: PartyPopper },
  joulu: { emoji: "🎄", icon: TreePine },
  uusivuosi: { emoji: "🥂", icon: Sparkles },
  kevathanget: { emoji: "⛷️", icon: Mountain },
  ruska: { emoji: "🍂", icon: Leaf },
  kesa: { emoji: "☀️", icon: Sun },
  talvi: { emoji: "❄️", icon: Snowflake },
};

/**
 * Small Leville-turquoise pill that lives inside the Hero,
 * in the exact spot where the static "Kevään tarjous 2026" badge used to be.
 *
 * Content can be managed in Admin → Promobannerit by setting placement = "hero".
 * If no active hero banner exists, falls back to the existing translation string,
 * keeping the previous look exactly the same.
 */
const HeroPromoBadge = ({ lang = "fi", fallbackText }: HeroPromoBadgeProps) => {
  const { banner, loading, getHeading, getTargetUrl } = usePromoBanner(lang, "hero");

  // No active hero banner → render nothing (badge fully removed).
  if (loading || !banner) {
    return null;
  }

  const theme = themeMap[banner.theme] || themeMap.vappu;
  const heading = getHeading(banner);
  const targetUrl = getTargetUrl(banner);
  const isExternal = targetUrl.startsWith("http");

  const pill = (
    <div className="inline-flex items-center gap-2.5 bg-leville-turquoise/15 border border-leville-turquoise/30 hover:bg-leville-turquoise/25 transition-colors rounded-full px-5 py-2.5 backdrop-blur-sm cursor-pointer">
      <span className="text-xl">{theme.emoji}</span>
      <span className="text-sm sm:text-base font-medium text-foreground">
        {heading}
      </span>
    </div>
  );

  if (!targetUrl || targetUrl === "/") {
    return pill;
  }

  if (isExternal) {
    return (
      <a href={targetUrl} target="_blank" rel="noopener noreferrer">
        {pill}
      </a>
    );
  }

  return <Link to={targetUrl}>{pill}</Link>;
};

export default HeroPromoBadge;
