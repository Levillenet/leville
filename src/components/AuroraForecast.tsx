import { useState, useEffect } from "react";
import { Sparkles, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuroraData {
  kpIndex: number;
  probability: string;
  description: string;
}

interface AuroraForecastProps {
  lang?: "fi" | "en";
}

const getAuroraDescription = (kp: number, lang: "fi" | "en"): { probability: string; description: string } => {
  if (lang === "en") {
    if (kp >= 7) return { probability: "Very high", description: "Exceptional aurora activity! Best conditions for viewing." };
    if (kp >= 5) return { probability: "High", description: "Strong aurora activity. Great chances to see northern lights!" };
    if (kp >= 4) return { probability: "Moderate", description: "Good aurora activity. Clear skies recommended." };
    if (kp >= 3) return { probability: "Low-moderate", description: "Some aurora activity possible on the horizon." };
    if (kp >= 2) return { probability: "Low", description: "Weak activity. Keep watching if skies are clear." };
    return { probability: "Very low", description: "Minimal aurora activity expected tonight." };
  } else {
    if (kp >= 7) return { probability: "Erittäin korkea", description: "Poikkeuksellinen revontuliaktiivisuus! Parhaat olosuhteet." };
    if (kp >= 5) return { probability: "Korkea", description: "Voimakas revontuliaktiivisuus. Erinomaiset näkymät!" };
    if (kp >= 4) return { probability: "Kohtalainen", description: "Hyvä aktiivisuus. Selkeä sää suositeltava." };
    if (kp >= 3) return { probability: "Matala-kohtalainen", description: "Revontulia mahdollisesti horisontissa." };
    if (kp >= 2) return { probability: "Matala", description: "Heikko aktiivisuus. Seuraa selkeällä säällä." };
    return { probability: "Erittäin matala", description: "Vähäistä revontuliaktiivisuutta odotettavissa." };
  }
};

const getKpColor = (kp: number): string => {
  if (kp >= 7) return "text-purple-400";
  if (kp >= 5) return "text-green-400";
  if (kp >= 4) return "text-emerald-400";
  if (kp >= 3) return "text-yellow-400";
  return "text-muted-foreground";
};

const AuroraForecast = ({ lang = "fi" }: AuroraForecastProps) => {
  const [aurora, setAurora] = useState<AuroraData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuroraData = async () => {
      try {
        // NOAA planetary K-index forecast
        const response = await fetch(
          "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json"
        );
        const data = await response.json();
        
        // Get today's forecast (skip header row)
        if (data && data.length > 1) {
          // Find the most recent forecast entry
          const now = new Date();
          let currentKp = 2; // Default
          
          for (let i = data.length - 1; i >= 1; i--) {
            const entry = data[i];
            const forecastTime = new Date(entry[0]);
            if (forecastTime <= now || i === 1) {
              currentKp = parseFloat(entry[1]) || 2;
              break;
            }
          }
          
          const { probability, description } = getAuroraDescription(currentKp, lang);
          setAurora({
            kpIndex: Math.round(currentKp * 10) / 10,
            probability,
            description,
          });
        }
      } catch (error) {
        console.error("Failed to fetch aurora data:", error);
        // Fallback
        const { probability, description } = getAuroraDescription(2, lang);
        setAurora({ kpIndex: 2, probability, description });
      } finally {
        setLoading(false);
      }
    };

    fetchAuroraData();
  }, [lang]);

  if (loading) {
    return (
      <Card className="glass-card border-border/30 animate-pulse">
        <CardContent className="p-6">
          <div className="h-24 bg-muted/20 rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!aurora) return null;

  const title = lang === "en" ? "Aurora Forecast Today" : "Revontuliennuste tänään";
  const kpLabel = "Kp-indeksi";
  const probabilityLabel = lang === "en" ? "Probability" : "Todennäköisyys";

  return (
    <Card className="glass-card border-border/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-green-500/10 pointer-events-none" />
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{kpLabel}</span>
          </div>
          <span className={`text-2xl font-bold ${getKpColor(aurora.kpIndex)}`}>
            {aurora.kpIndex}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{probabilityLabel}</span>
          <span className={`font-semibold ${getKpColor(aurora.kpIndex)}`}>
            {aurora.probability}
          </span>
        </div>

        <p className="text-sm text-muted-foreground border-t border-border/30 pt-4">
          {aurora.description}
        </p>

        {/* Kp scale visualization */}
        <div className="pt-2">
          <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
              <div
                key={level}
                className={`flex-1 transition-all duration-300 ${
                  level <= aurora.kpIndex
                    ? level >= 7
                      ? "bg-purple-500"
                      : level >= 5
                      ? "bg-green-500"
                      : level >= 4
                      ? "bg-emerald-500"
                      : level >= 3
                      ? "bg-yellow-500"
                      : "bg-muted-foreground/50"
                    : "bg-muted/30"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuroraForecast;
