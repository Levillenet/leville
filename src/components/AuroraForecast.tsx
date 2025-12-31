import { useState, useEffect } from "react";
import { Sparkles, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Language } from "@/translations";

interface AuroraData {
  kpIndex: number;
  probability: string;
  description: string;
}

interface AuroraForecastProps {
  lang?: Language;
}

const content: Record<Language, {
  title: string;
  kpLabel: string;
  probabilityLabel: string;
  kpExplanation: string;
  levels: {
    veryHigh: { probability: string; description: string };
    high: { probability: string; description: string };
    moderate: { probability: string; description: string };
    lowModerate: { probability: string; description: string };
    low: { probability: string; description: string };
    veryLow: { probability: string; description: string };
  };
}> = {
  fi: {
    title: "Revontuliennuste tänään",
    kpLabel: "Kp-indeksi",
    probabilityLabel: "Todennäköisyys",
    kpExplanation: "Kp-indeksi (0-9) mittaa geomagneettista aktiivisuutta. Korkeampi arvo tarkoittaa voimakkaampia revontulia. Kp 3+ on hyvä Leville, Kp 5+ tuo upeat näytökset.",
    levels: {
      veryHigh: { probability: "Erittäin korkea", description: "Poikkeuksellinen revontuliaktiivisuus! Parhaat olosuhteet." },
      high: { probability: "Korkea", description: "Voimakas revontuliaktiivisuus. Erinomaiset näkymät!" },
      moderate: { probability: "Kohtalainen", description: "Hyvä aktiivisuus. Selkeä sää suositeltava." },
      lowModerate: { probability: "Matala-kohtalainen", description: "Revontulia mahdollisesti horisontissa." },
      low: { probability: "Matala", description: "Heikko aktiivisuus. Seuraa selkeällä säällä." },
      veryLow: { probability: "Erittäin matala", description: "Vähäistä revontuliaktiivisuutta odotettavissa." },
    },
  },
  en: {
    title: "Aurora Forecast Today",
    kpLabel: "Kp Index",
    probabilityLabel: "Probability",
    kpExplanation: "The Kp index (0-9) measures geomagnetic activity. Higher values mean stronger aurora. Kp 3+ is good for Levi, Kp 5+ brings spectacular displays.",
    levels: {
      veryHigh: { probability: "Very high", description: "Exceptional aurora activity! Best conditions for viewing." },
      high: { probability: "High", description: "Strong aurora activity. Great chances to see northern lights!" },
      moderate: { probability: "Moderate", description: "Good aurora activity. Clear skies recommended." },
      lowModerate: { probability: "Low-moderate", description: "Some aurora activity possible on the horizon." },
      low: { probability: "Low", description: "Weak activity. Keep watching if skies are clear." },
      veryLow: { probability: "Very low", description: "Minimal aurora activity expected tonight." },
    },
  },
  sv: {
    title: "Norrskensprognos idag",
    kpLabel: "Kp-index",
    probabilityLabel: "Sannolikhet",
    kpExplanation: "Kp-index (0-9) mäter geomagnetisk aktivitet. Högre värden betyder starkare norrsken. Kp 3+ är bra för Levi, Kp 5+ ger spektakulära uppvisningar.",
    levels: {
      veryHigh: { probability: "Mycket hög", description: "Exceptionell norrskenaktivitet! Bästa förhållanden." },
      high: { probability: "Hög", description: "Stark norrskenaktivitet. Utmärkta chanser att se norrsken!" },
      moderate: { probability: "Måttlig", description: "Bra aktivitet. Klart väder rekommenderas." },
      lowModerate: { probability: "Låg-måttlig", description: "Norrsken möjligt vid horisonten." },
      low: { probability: "Låg", description: "Svag aktivitet. Följ med om himlen är klar." },
      veryLow: { probability: "Mycket låg", description: "Minimal norrskenaktivitet förväntas." },
    },
  },
  de: {
    title: "Nordlicht-Vorhersage heute",
    kpLabel: "Kp-Index",
    probabilityLabel: "Wahrscheinlichkeit",
    kpExplanation: "Der Kp-Index (0-9) misst die geomagnetische Aktivität. Höhere Werte bedeuten stärkere Nordlichter. Kp 3+ ist gut für Levi, Kp 5+ bringt spektakuläre Displays.",
    levels: {
      veryHigh: { probability: "Sehr hoch", description: "Außergewöhnliche Nordlichtaktivität! Beste Bedingungen." },
      high: { probability: "Hoch", description: "Starke Nordlichtaktivität. Ausgezeichnete Chancen!" },
      moderate: { probability: "Mäßig", description: "Gute Aktivität. Klarer Himmel empfohlen." },
      lowModerate: { probability: "Niedrig-mäßig", description: "Nordlichter möglicherweise am Horizont sichtbar." },
      low: { probability: "Niedrig", description: "Schwache Aktivität. Bei klarem Himmel beobachten." },
      veryLow: { probability: "Sehr niedrig", description: "Minimale Nordlichtaktivität erwartet." },
    },
  },
  es: {
    title: "Pronóstico de auroras hoy",
    kpLabel: "Índice Kp",
    probabilityLabel: "Probabilidad",
    kpExplanation: "El índice Kp (0-9) mide la actividad geomagnética. Valores más altos significan auroras más fuertes. Kp 3+ es bueno para Levi, Kp 5+ ofrece espectáculos impresionantes.",
    levels: {
      veryHigh: { probability: "Muy alta", description: "¡Actividad de aurora excepcional! Mejores condiciones." },
      high: { probability: "Alta", description: "Fuerte actividad de aurora. ¡Excelentes oportunidades!" },
      moderate: { probability: "Moderada", description: "Buena actividad. Se recomienda cielo despejado." },
      lowModerate: { probability: "Baja-moderada", description: "Posibles auroras en el horizonte." },
      low: { probability: "Baja", description: "Actividad débil. Observe con cielos despejados." },
      veryLow: { probability: "Muy baja", description: "Se espera actividad mínima de aurora." },
    },
  },
  fr: {
    title: "Prévisions aurores aujourd'hui",
    kpLabel: "Indice Kp",
    probabilityLabel: "Probabilité",
    kpExplanation: "L'indice Kp (0-9) mesure l'activité géomagnétique. Des valeurs plus élevées signifient des aurores plus fortes. Kp 3+ est bon pour Levi, Kp 5+ offre des spectacles spectaculaires.",
    levels: {
      veryHigh: { probability: "Très élevée", description: "Activité aurorale exceptionnelle ! Meilleures conditions." },
      high: { probability: "Élevée", description: "Forte activité aurorale. Excellentes chances de voir des aurores !" },
      moderate: { probability: "Modérée", description: "Bonne activité. Ciel dégagé recommandé." },
      lowModerate: { probability: "Faible-modérée", description: "Aurores possibles à l'horizon." },
      low: { probability: "Faible", description: "Activité faible. Surveillez par ciel dégagé." },
      veryLow: { probability: "Très faible", description: "Activité aurorale minimale attendue." },
    },
  },
};

const getAuroraDescription = (kp: number, lang: Language): { probability: string; description: string } => {
  const levels = content[lang].levels;
  if (kp >= 7) return levels.veryHigh;
  if (kp >= 5) return levels.high;
  if (kp >= 4) return levels.moderate;
  if (kp >= 3) return levels.lowModerate;
  if (kp >= 2) return levels.low;
  return levels.veryLow;
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
  const t = content[lang];

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

  return (
    <Card className="glass-card border-border/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-green-500/10 pointer-events-none" />
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <CardTitle className="text-lg">{t.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{t.kpLabel}</span>
          </div>
          <span className={`text-2xl font-bold ${getKpColor(aurora.kpIndex)}`}>
            {aurora.kpIndex}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t.probabilityLabel}</span>
          <span className={`font-semibold ${getKpColor(aurora.kpIndex)}`}>
            {aurora.probability}
          </span>
        </div>

        <p className="text-sm text-muted-foreground border-t border-border/30 pt-4">
          {aurora.description}
        </p>

        {/* Kp explanation */}
        <p className="text-xs text-muted-foreground/70 italic">
          {t.kpExplanation}
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
