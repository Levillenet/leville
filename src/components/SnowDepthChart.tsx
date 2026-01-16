import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Snowflake, CalendarDays, TrendingUp, AlertCircle } from "lucide-react";
import { Language } from "@/translations";

interface SnowDepthChartProps {
  lang?: Language;
}

interface ChartDataPoint {
  date: string;
  [year: string]: string | number | null;
}

interface FmiSnowResponse {
  chartData: ChartDataPoint[];
  years: number[];
  metadata: {
    station: string;
    coordinates: { lat: number; lon: number };
    dateRange: string;
  };
}

const translations = {
  fi: {
    title: "Lumensyvyys eri vuosina",
    description: "Vertaile lumensyvyyttä Kittilässä eri vuosina valitsemaltasi aikaväliltä. Data: Ilmatieteen laitos.",
    startLabel: "Alkupäivä",
    endLabel: "Loppupäivä",
    yearsLabel: "Vuosien määrä",
    yearsOptions: ["5 vuotta", "10 vuotta", "15 vuotta"],
    loading: "Ladataan lumidataa...",
    error: "Lumidatan lataus epäonnistui",
    retry: "Yritä uudelleen",
    noData: "Ei dataa valitulle aikavälille",
    yAxisLabel: "Lumensyvyys (cm)",
    tooltipSnow: "Lunta",
    source: "Lähde: Ilmatieteen laitos (FMI), mittausasema Kittilä Pakatti",
    months: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
    presets: {
      label: "Pikavalinta",
      christmas: "Jouluaika (20-31.12)",
      newYear: "Uusi vuosi (28.12-6.1)",
      skiWeek: "Hiihtolomaviikko (1-7.3)",
      easter: "Pääsiäinen (1-15.4)"
    }
  },
  en: {
    title: "Snow Depth by Year",
    description: "Compare snow depth in Kittilä across different years for your selected date range. Data: Finnish Meteorological Institute.",
    startLabel: "Start date",
    endLabel: "End date",
    yearsLabel: "Number of years",
    yearsOptions: ["5 years", "10 years", "15 years"],
    loading: "Loading snow data...",
    error: "Failed to load snow data",
    retry: "Try again",
    noData: "No data for selected date range",
    yAxisLabel: "Snow depth (cm)",
    tooltipSnow: "Snow",
    source: "Source: Finnish Meteorological Institute (FMI), station Kittilä Pakatti",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    presets: {
      label: "Quick selection",
      christmas: "Christmas (Dec 20-31)",
      newYear: "New Year (Dec 28-Jan 6)",
      skiWeek: "Ski week (Mar 1-7)",
      easter: "Easter (Apr 1-15)"
    }
  }
};

// Color palette for years - distinct colors
const yearColors = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#a855f7", // purple
  "#22c55e", // green
  "#eab308", // yellow
  "#0ea5e9", // sky
];

const SnowDepthChart = ({ lang = "fi" }: SnowDepthChartProps) => {
  const t = translations[lang] || translations.fi;
  
  // Default to December 1-6 (Christmas planning period)
  const [startDay, setStartDay] = useState(1);
  const [startMonth, setStartMonth] = useState(12);
  const [endDay, setEndDay] = useState(6);
  const [endMonth, setEndMonth] = useState(12);
  const [years, setYears] = useState(10);

  const { data, isLoading, error, refetch } = useQuery<FmiSnowResponse>({
    queryKey: ["fmi-snow-data", startDay, startMonth, endDay, endMonth, years],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fmi-snow-data", {
        body: null,
        headers: {},
      });
      
      // Using query params approach
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fmi-snow-data?startDay=${startDay}&startMonth=${startMonth}&endDay=${endDay}&endMonth=${endMonth}&years=${years}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch snow data");
      }
      
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const applyPreset = (preset: string) => {
    switch (preset) {
      case "christmas":
        setStartDay(20);
        setStartMonth(12);
        setEndDay(31);
        setEndMonth(12);
        break;
      case "newYear":
        setStartDay(28);
        setStartMonth(12);
        setEndDay(6);
        setEndMonth(1);
        break;
      case "skiWeek":
        setStartDay(1);
        setStartMonth(3);
        setEndDay(7);
        setEndMonth(3);
        break;
      case "easter":
        setStartDay(1);
        setStartMonth(4);
        setEndDay(15);
        setEndMonth(4);
        break;
    }
  };

  // Generate day options (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Snowflake className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg sm:text-xl">{t.title}</CardTitle>
        </div>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* Start date */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{t.startLabel}</label>
            <div className="flex gap-1">
              <Select value={String(startDay)} onValueChange={(v) => setStartDay(Number(v))}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dayOptions.map((d) => (
                    <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={String(startMonth)} onValueChange={(v) => setStartMonth(Number(v))}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {t.months.map((m, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* End date */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{t.endLabel}</label>
            <div className="flex gap-1">
              <Select value={String(endDay)} onValueChange={(v) => setEndDay(Number(v))}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dayOptions.map((d) => (
                    <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={String(endMonth)} onValueChange={(v) => setEndMonth(Number(v))}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {t.months.map((m, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Years */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{t.yearsLabel}</label>
            <Select value={String(years)} onValueChange={(v) => setYears(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">{t.yearsOptions[0]}</SelectItem>
                <SelectItem value="10">{t.yearsOptions[1]}</SelectItem>
                <SelectItem value="15">{t.yearsOptions[2]}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Presets */}
          <div className="space-y-1 col-span-2 sm:col-span-1 lg:col-span-3">
            <label className="text-sm font-medium text-muted-foreground">{t.presets.label}</label>
            <div className="flex flex-wrap gap-1">
              <Button variant="outline" size="sm" onClick={() => applyPreset("christmas")} className="text-xs">
                {t.presets.christmas}
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("newYear")} className="text-xs">
                {t.presets.newYear}
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("skiWeek")} className="text-xs">
                {t.presets.skiWeek}
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("easter")} className="text-xs">
                {t.presets.easter}
              </Button>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-[350px] sm:h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Skeleton className="w-full h-full" />
              <p className="text-sm text-muted-foreground animate-pulse">{t.loading}</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <AlertCircle className="h-10 w-10 text-destructive" />
              <p className="text-sm text-destructive">{t.error}</p>
              <Button variant="outline" onClick={() => refetch()}>
                {t.retry}
              </Button>
            </div>
          ) : data && data.chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: t.yAxisLabel, 
                    angle: -90, 
                    position: "insideLeft",
                    style: { fontSize: 12, textAnchor: "middle" }
                  }}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold" }}
                  formatter={(value: number | null, name: string) => {
                    if (value === null) return ["—", name];
                    return [`${value} cm`, name];
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: 12 }}
                  onClick={(e) => {
                    // Could implement toggle visibility here
                  }}
                />
                {data.years.map((year, index) => (
                  <Line
                    key={year}
                    type="monotone"
                    dataKey={String(year)}
                    stroke={yearColors[index % yearColors.length]}
                    strokeWidth={index === 0 ? 3 : 2}
                    dot={{ r: index === 0 ? 4 : 3 }}
                    activeDot={{ r: 6 }}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <TrendingUp className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{t.noData}</p>
            </div>
          )}
        </div>

        {/* Source attribution */}
        <p className="text-xs text-muted-foreground text-center">
          {t.source}
        </p>
      </CardContent>
    </Card>
  );
};

export default SnowDepthChart;
