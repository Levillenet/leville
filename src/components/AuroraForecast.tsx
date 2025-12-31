import { useState, useEffect } from "react";
import { Sparkles, Activity, Moon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Language } from "@/translations";

interface ForecastPeriod {
  time: Date;
  kpIndex: number;
  isNight: boolean;
}

interface AuroraData {
  current: { kpIndex: number; probability: string; description: string };
  tonightPeak: { kpIndex: number; probability: string; time: string } | null;
  forecast24h: ForecastPeriod[];
}

interface AuroraForecastProps {
  lang?: Language;
}

const content: Record<Language, {
  title: string;
  kpLabel: string;
  probabilityLabel: string;
  tonightPeak: string;
  next24h: string;
  nightTime: string;
  now: string;
  atTime: string;
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
    title: "Revontuliennuste",
    kpLabel: "Kp-indeksi",
    probabilityLabel: "Todennäköisyys",
    tonightPeak: "Illan huippu",
    next24h: "Seuraava 24h",
    nightTime: "Yö (paras aika)",
    now: "Nyt",
    atTime: "klo",
    kpExplanation: "Kp-indeksi (0-9) mittaa geomagneettista aktiivisuutta. Korkeampi arvo tarkoittaa voimakkaampia revontulia. Kp 3+ on hyvä Leville.",
    levels: {
      veryHigh: { probability: "Erittäin korkea", description: "Poikkeuksellinen revontuliaktiivisuus!" },
      high: { probability: "Korkea", description: "Voimakas revontuliaktiivisuus." },
      moderate: { probability: "Kohtalainen", description: "Hyvä aktiivisuus." },
      lowModerate: { probability: "Matala-kohtalainen", description: "Revontulia mahdollisesti horisontissa." },
      low: { probability: "Matala", description: "Heikko aktiivisuus." },
      veryLow: { probability: "Erittäin matala", description: "Vähäistä aktiivisuutta." },
    },
  },
  en: {
    title: "Aurora Forecast",
    kpLabel: "Kp Index",
    probabilityLabel: "Probability",
    tonightPeak: "Tonight's Peak",
    next24h: "Next 24h",
    nightTime: "Night (best time)",
    now: "Now",
    atTime: "at",
    kpExplanation: "The Kp index (0-9) measures geomagnetic activity. Higher values mean stronger aurora. Kp 3+ is good for Levi.",
    levels: {
      veryHigh: { probability: "Very high", description: "Exceptional aurora activity!" },
      high: { probability: "High", description: "Strong aurora activity." },
      moderate: { probability: "Moderate", description: "Good aurora activity." },
      lowModerate: { probability: "Low-moderate", description: "Some aurora activity possible." },
      low: { probability: "Low", description: "Weak activity." },
      veryLow: { probability: "Very low", description: "Minimal aurora activity." },
    },
  },
  sv: {
    title: "Norrskensprognos",
    kpLabel: "Kp-index",
    probabilityLabel: "Sannolikhet",
    tonightPeak: "Kvällens topp",
    next24h: "Nästa 24h",
    nightTime: "Natt (bästa tid)",
    now: "Nu",
    atTime: "kl",
    kpExplanation: "Kp-index (0-9) mäter geomagnetisk aktivitet. Högre värden betyder starkare norrsken. Kp 3+ är bra för Levi.",
    levels: {
      veryHigh: { probability: "Mycket hög", description: "Exceptionell norrskenaktivitet!" },
      high: { probability: "Hög", description: "Stark norrskenaktivitet." },
      moderate: { probability: "Måttlig", description: "Bra aktivitet." },
      lowModerate: { probability: "Låg-måttlig", description: "Norrsken möjligt vid horisonten." },
      low: { probability: "Låg", description: "Svag aktivitet." },
      veryLow: { probability: "Mycket låg", description: "Minimal norrskenaktivitet." },
    },
  },
  de: {
    title: "Nordlicht-Vorhersage",
    kpLabel: "Kp-Index",
    probabilityLabel: "Wahrscheinlichkeit",
    tonightPeak: "Abendhöhepunkt",
    next24h: "Nächste 24h",
    nightTime: "Nacht (beste Zeit)",
    now: "Jetzt",
    atTime: "um",
    kpExplanation: "Der Kp-Index (0-9) misst geomagnetische Aktivität. Höhere Werte bedeuten stärkere Nordlichter. Kp 3+ ist gut für Levi.",
    levels: {
      veryHigh: { probability: "Sehr hoch", description: "Außergewöhnliche Nordlichtaktivität!" },
      high: { probability: "Hoch", description: "Starke Nordlichtaktivität." },
      moderate: { probability: "Mäßig", description: "Gute Aktivität." },
      lowModerate: { probability: "Niedrig-mäßig", description: "Nordlichter möglicherweise am Horizont." },
      low: { probability: "Niedrig", description: "Schwache Aktivität." },
      veryLow: { probability: "Sehr niedrig", description: "Minimale Nordlichtaktivität." },
    },
  },
  es: {
    title: "Pronóstico de Auroras",
    kpLabel: "Índice Kp",
    probabilityLabel: "Probabilidad",
    tonightPeak: "Pico de esta noche",
    next24h: "Próximas 24h",
    nightTime: "Noche (mejor hora)",
    now: "Ahora",
    atTime: "a las",
    kpExplanation: "El índice Kp (0-9) mide la actividad geomagnética. Valores más altos significan auroras más fuertes. Kp 3+ es bueno para Levi.",
    levels: {
      veryHigh: { probability: "Muy alta", description: "¡Actividad de aurora excepcional!" },
      high: { probability: "Alta", description: "Fuerte actividad de aurora." },
      moderate: { probability: "Moderada", description: "Buena actividad." },
      lowModerate: { probability: "Baja-moderada", description: "Posibles auroras en el horizonte." },
      low: { probability: "Baja", description: "Actividad débil." },
      veryLow: { probability: "Muy baja", description: "Actividad mínima de aurora." },
    },
  },
  fr: {
    title: "Prévisions d'Aurores",
    kpLabel: "Indice Kp",
    probabilityLabel: "Probabilité",
    tonightPeak: "Pic de ce soir",
    next24h: "Prochaines 24h",
    nightTime: "Nuit (meilleur moment)",
    now: "Maintenant",
    atTime: "à",
    kpExplanation: "L'indice Kp (0-9) mesure l'activité géomagnétique. Des valeurs plus élevées signifient des aurores plus fortes. Kp 3+ est bon pour Levi.",
    levels: {
      veryHigh: { probability: "Très élevée", description: "Activité aurorale exceptionnelle !" },
      high: { probability: "Élevée", description: "Forte activité aurorale." },
      moderate: { probability: "Modérée", description: "Bonne activité." },
      lowModerate: { probability: "Faible-modérée", description: "Aurores possibles à l'horizon." },
      low: { probability: "Faible", description: "Activité faible." },
      veryLow: { probability: "Très faible", description: "Activité aurorale minimale." },
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

const getKpBgColor = (kp: number): string => {
  if (kp >= 7) return "bg-purple-500/20";
  if (kp >= 5) return "bg-green-500/20";
  if (kp >= 4) return "bg-emerald-500/20";
  if (kp >= 3) return "bg-yellow-500/20";
  return "bg-muted/20";
};

const getKpBarColor = (kp: number): string => {
  if (kp >= 7) return "bg-purple-500";
  if (kp >= 5) return "bg-green-500";
  if (kp >= 4) return "bg-emerald-500";
  if (kp >= 3) return "bg-yellow-500";
  return "bg-muted-foreground/50";
};

const isNightTime = (date: Date): boolean => {
  const hour = date.getHours();
  return hour >= 18 || hour < 6;
};

const formatTime = (date: Date, lang: Language): string => {
  const hour = date.getHours();
  if (lang === 'en') {
    const period = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    return `${h}${period}`;
  }
  return `${hour.toString().padStart(2, '0')}`;
};

const AuroraForecast = ({ lang = "fi" }: AuroraForecastProps) => {
  const [auroraData, setAuroraData] = useState<AuroraData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = content[lang];

  useEffect(() => {
    const fetchAuroraData = async () => {
      try {
        const response = await fetch(
          "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json"
        );
        const data = await response.json();
        
        if (data && data.length > 1) {
          // Parse all forecast data (skip header row)
          const forecasts = data.slice(1).map((item: string[]) => ({
            time: new Date(item[0].replace(' ', 'T') + 'Z'),
            kpIndex: parseFloat(item[1]) || 0
          }));

          const now = new Date();
          
          // Find current period (closest to now)
          const currentPeriod = forecasts.reduce((closest: any, forecast: any) => {
            const diff = Math.abs(forecast.time.getTime() - now.getTime());
            const closestDiff = Math.abs(closest.time.getTime() - now.getTime());
            return diff < closestDiff ? forecast : closest;
          }, forecasts[0]);

          // Get next 24h forecast (8 periods of 3h each)
          const next24h: ForecastPeriod[] = forecasts
            .filter((f: any) => f.time >= now)
            .slice(0, 8)
            .map((f: any) => ({
              time: f.time,
              kpIndex: f.kpIndex,
              isNight: isNightTime(f.time)
            }));

          // Find tonight's peak (18:00 - 06:00)
          const tonight = new Date(now);
          tonight.setHours(18, 0, 0, 0);
          if (now.getHours() < 6) {
            // If before 6am, we're in "tonight" already, look back to 18:00 yesterday
            tonight.setDate(tonight.getDate() - 1);
          }
          const tomorrowMorning = new Date(tonight);
          tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
          tomorrowMorning.setHours(6, 0, 0, 0);

          const nightForecasts = forecasts.filter((f: any) => 
            f.time >= tonight && f.time <= tomorrowMorning
          );

          let tonightPeak = null;
          if (nightForecasts.length > 0) {
            const peak = nightForecasts.reduce((max: any, f: any) => 
              f.kpIndex > max.kpIndex ? f : max
            , nightForecasts[0]);
            
            const peakDesc = getAuroraDescription(peak.kpIndex, lang);
            tonightPeak = {
              kpIndex: peak.kpIndex,
              probability: peakDesc.probability,
              time: formatTime(peak.time, lang)
            };
          }

          const currentDesc = getAuroraDescription(currentPeriod.kpIndex, lang);
          
          setAuroraData({
            current: {
              kpIndex: Math.round(currentPeriod.kpIndex * 10) / 10,
              probability: currentDesc.probability,
              description: currentDesc.description
            },
            tonightPeak,
            forecast24h: next24h
          });
        }
      } catch (error) {
        console.error("Failed to fetch aurora data:", error);
        // Fallback
        const { probability, description } = getAuroraDescription(2, lang);
        setAuroraData({
          current: { kpIndex: 2, probability, description },
          tonightPeak: null,
          forecast24h: []
        });
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
          <div className="h-32 bg-muted/20 rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!auroraData) return null;

  return (
    <Card className="glass-card border-border/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-green-500/10 pointer-events-none" />
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <CardTitle className="text-lg">{t.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current + Tonight's Peak Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Current */}
          <div className={`rounded-lg p-3 ${getKpBgColor(auroraData.current.kpIndex)}`}>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Activity className="w-3 h-3" />
              {t.now}
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${getKpColor(auroraData.current.kpIndex)}`}>
                {auroraData.current.kpIndex.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">Kp</span>
            </div>
            <div className={`text-xs font-medium ${getKpColor(auroraData.current.kpIndex)}`}>
              {auroraData.current.probability}
            </div>
          </div>

          {/* Tonight's Peak */}
          {auroraData.tonightPeak && (
            <div className={`rounded-lg p-3 ${getKpBgColor(auroraData.tonightPeak.kpIndex)}`}>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <Moon className="w-3 h-3" />
                {t.tonightPeak}
              </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${getKpColor(auroraData.tonightPeak.kpIndex)}`}>
                {auroraData.tonightPeak.kpIndex.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">Kp</span>
              </div>
              <div className={`text-xs font-medium ${getKpColor(auroraData.tonightPeak.kpIndex)}`}>
                {t.atTime} {auroraData.tonightPeak.time}
              </div>
            </div>
          )}
        </div>

        {/* 24h Forecast Timeline */}
        {auroraData.forecast24h.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Clock className="w-3 h-3" />
              {t.next24h}
              <span className="flex items-center gap-1 text-muted-foreground/60">
                <Moon className="w-2.5 h-2.5" /> = {t.nightTime}
              </span>
            </div>
            
            <div className="flex gap-1 overflow-x-auto pb-1">
              {auroraData.forecast24h.map((period, index) => (
                <div 
                  key={index} 
                  className={`flex-1 min-w-[40px] text-center rounded-md p-1.5 ${
                    period.isNight ? 'bg-slate-800/60' : 'bg-slate-800/30'
                  }`}
                >
                  <div className="text-[10px] text-muted-foreground mb-0.5 flex items-center justify-center gap-0.5">
                    {period.isNight && <Moon className="w-2 h-2 text-purple-300" />}
                    {formatTime(period.time, lang)}
                  </div>
                  <div className={`text-xs font-bold ${getKpColor(period.kpIndex)}`}>
                    {period.kpIndex.toFixed(1)}
                  </div>
                  <div className="mt-1 h-6 flex items-end justify-center">
                    <div 
                      className={`w-3 rounded-t ${getKpBarColor(period.kpIndex)}`}
                      style={{ height: `${Math.max(15, (period.kpIndex / 9) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kp scale visualization */}
        <div className="pt-1">
          <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
              <div
                key={level}
                className={`flex-1 transition-all duration-300 ${
                  level <= auroraData.current.kpIndex
                    ? getKpBarColor(level)
                    : "bg-muted/30"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground/60 mt-0.5">
            <span>0</span>
            <span>9</span>
          </div>
        </div>

        {/* Kp explanation */}
        <p className="text-xs text-muted-foreground/70 italic border-t border-border/30 pt-3">
          {t.kpExplanation}
        </p>
      </CardContent>
    </Card>
  );
};

export default AuroraForecast;