import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface SnowComparisonChartProps {
  lang?: "fi" | "en";
}

interface ChartPoint {
  date: string;
  levi: number | null;
  rovaniemi: number | null;
}

const labels = {
  fi: {
    title: "Keskimääräinen lumensyvyys: Levi vs Rovaniemi",
    subtitle: "10 vuoden keskiarvo, lokakuu–toukokuu (FMI / Ilmatieteen laitos)",
    levi: "Levi (Kittilä)",
    rovaniemi: "Rovaniemi",
    yAxis: "Lumensyvyys (cm)",
    loading: "Ladataan lumitietoja...",
    error: "Lumitietoja ei voitu ladata.",
  },
  en: {
    title: "Average Snow Depth: Levi vs Rovaniemi",
    subtitle: "10-year average, October–May (FMI / Finnish Meteorological Institute)",
    levi: "Levi (Kittilä)",
    rovaniemi: "Rovaniemi",
    yAxis: "Snow depth (cm)",
    loading: "Loading snow data...",
    error: "Could not load snow data.",
  },
};

async function fetchSnowData(place: string) {
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const baseUrl = `https://${projectId}.supabase.co/functions/v1/fmi-snow-data`;

  // Oct 1 - Dec 31
  const url1 = `${baseUrl}?place=${encodeURIComponent(place)}&startDay=1&startMonth=10&endDay=31&endMonth=12&years=10`;
  // Jan 1 - May 31
  const url2 = `${baseUrl}?place=${encodeURIComponent(place)}&startDay=1&startMonth=1&endDay=31&endMonth=5&years=10`;

  const [res1, res2] = await Promise.all([
    fetch(url1, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } }),
    fetch(url2, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } }),
  ]);

  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

  return { octDec: data1, janApr: data2 };
}

function computeAverages(
  octDecData: any,
  janAprData: any
): Map<string, number> {
  const dayMap = new Map<string, number[]>();

  const processChartData = (chartData: any[]) => {
    if (!chartData) return;
    for (const point of chartData) {
      const date = point.date as string;
      // Collect all year values
      for (const [key, val] of Object.entries(point)) {
        if (key === "date") continue;
        const num = val as number | null;
        if (num !== null && num !== undefined && !isNaN(num)) {
          if (!dayMap.has(date)) dayMap.set(date, []);
          dayMap.get(date)!.push(num);
        }
      }
    }
  };

  processChartData(octDecData?.chartData);
  processChartData(janAprData?.chartData);

  const avgMap = new Map<string, number>();
  for (const [date, values] of dayMap) {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    avgMap.set(date, Math.round(avg));
  }

  return avgMap;
}

// Sort dates in Oct-May order (Oct first, then Nov, Dec, Jan, Feb, Mar, Apr, May)
function sortOctToMay(dates: string[]): string[] {
  return dates.sort((a, b) => {
    const [dayA, monthA] = a.split(".").map(Number);
    const [dayB, monthB] = b.split(".").map(Number);
    const orderA = monthA >= 10 ? monthA - 10 : monthA + 2;
    const orderB = monthB >= 10 ? monthB - 10 : monthB + 2;
    if (orderA !== orderB) return orderA - orderB;
    return dayA - dayB;
  });
}

const monthLabels: Record<string, string> = {
  "01.10": "Loka",
  "01.11": "Marras",
  "01.12": "Joulu",
  "01.01": "Tammi",
  "01.02": "Helmi",
  "01.03": "Maalis",
  "01.04": "Huhti",
  "01.05": "Touko",
};

const monthLabelsEn: Record<string, string> = {
  "01.10": "Oct",
  "01.11": "Nov",
  "01.12": "Dec",
  "01.01": "Jan",
  "01.02": "Feb",
  "01.03": "Mar",
  "01.04": "Apr",
  "01.05": "May",
};

const SnowComparisonChart = ({ lang = "fi" }: SnowComparisonChartProps) => {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const t = labels[lang] || labels.fi;
  const mLabels = lang === "fi" ? monthLabels : monthLabelsEn;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [kittila, rovaniemi] = await Promise.all([
          fetchSnowData("Kittilä"),
          fetchSnowData("Rovaniemi"),
        ]);

        if (cancelled) return;

        const kAvg = computeAverages(kittila.octDec, kittila.janApr);
        const rAvg = computeAverages(rovaniemi.octDec, rovaniemi.janApr);

        // Merge all dates
        const allDates = new Set([...kAvg.keys(), ...rAvg.keys()]);
        const sorted = sortOctToMay(Array.from(allDates));

        const points: ChartPoint[] = sorted.map((date) => ({
          date,
          levi: kAvg.get(date) ?? null,
          rovaniemi: rAvg.get(date) ?? null,
        }));

        setChartData(points);
      } catch (e) {
        console.error("Snow comparison fetch error:", e);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="my-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <p className="text-xs text-muted-foreground mt-2 text-center">{t.loading}</p>
      </div>
    );
  }

  if (error || chartData.length === 0) {
    return (
      <p className="text-sm text-muted-foreground my-4 text-center">{t.error}</p>
    );
  }

  // Show only every ~7th tick to avoid crowding
  const tickInterval = Math.max(1, Math.floor(chartData.length / 25));

  return (
    <div className="my-6 bg-card border border-border rounded-xl p-4 md:p-6">
      <h3 className="text-lg font-bold text-foreground mb-1">{t.title}</h3>
      <p className="text-xs text-muted-foreground mb-4">{t.subtitle}</p>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(val: string) => {
              // Show month name on 1st of month
              if (mLabels[val]) return mLabels[val];
              return "";
            }}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            label={{
              value: t.yAxis,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: 12,
            }}
            formatter={(value: number, name: string) => {
              const label = name === "kittila" ? t.kittila : t.rovaniemi;
              return [`${value} cm`, label];
            }}
            labelFormatter={(label: string) => label}
          />
          <Legend
            formatter={(value: string) =>
              value === "kittila" ? t.kittila : t.rovaniemi
            }
          />
          <Area
            type="monotone"
            dataKey="kittila"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary) / 0.2)"
            strokeWidth={2}
            dot={false}
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="rovaniemi"
            stroke="hsl(var(--accent-foreground))"
            fill="hsl(var(--accent) / 0.3)"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={false}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>

      <p className="text-[10px] text-muted-foreground mt-2 text-center">
        {lang === "fi"
          ? "Lähde: Ilmatieteen laitos (FMI), Kittilä Pakatti & Rovaniemi Apukka"
          : "Source: Finnish Meteorological Institute (FMI), Kittilä Pakatti & Rovaniemi Apukka"}
      </p>
    </div>
  );
};

export default SnowComparisonChart;
