import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Snowflake, CloudFog, Wind } from "lucide-react";
import { useLocation } from "react-router-dom";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  snowDepth: number | null;
}

const getWeatherIcon = (code: number) => {
  // WMO Weather interpretation codes
  if (code === 0) return <Sun className="w-4 h-4 text-yellow-400" />;
  if (code >= 1 && code <= 3) return <Cloud className="w-4 h-4 text-muted-foreground" />;
  if (code >= 45 && code <= 48) return <CloudFog className="w-4 h-4 text-muted-foreground" />;
  if (code >= 51 && code <= 67) return <CloudRain className="w-4 h-4 text-blue-400" />;
  if (code >= 71 && code <= 77) return <Snowflake className="w-4 h-4 text-blue-200" />;
  if (code >= 80 && code <= 82) return <CloudRain className="w-4 h-4 text-blue-400" />;
  if (code >= 85 && code <= 86) return <Snowflake className="w-4 h-4 text-blue-200" />;
  if (code >= 95) return <Wind className="w-4 h-4 text-muted-foreground" />;
  return <Cloud className="w-4 h-4 text-muted-foreground" />;
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Levi coordinates: 67.8039° N, 24.8084° E
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=67.8039&longitude=24.8084&current=temperature_2m,weather_code,snow_depth&timezone=Europe%2FHelsinki"
        );
        const data = await response.json();
        
        if (data.current) {
          setWeather({
            temperature: Math.round(data.current.temperature_2m),
            weatherCode: data.current.weather_code,
            snowDepth: data.current.snow_depth !== undefined ? Math.round(data.current.snow_depth * 100) : null, // Convert m to cm
          });
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !weather) {
    return null;
  }

  const label = isEnglish ? "WEATHER IN LEVI NOW" : "SÄÄ LEVILLÄ NYT";
  const snowLabel = isEnglish ? "snow" : "lunta";

  return (
    <div className="flex items-center gap-2 text-foreground">
      {getWeatherIcon(weather.weatherCode)}
      <span className="font-semibold text-base">{weather.temperature}°C</span>
      {weather.snowDepth !== null && weather.snowDepth > 0 && (
        <>
          <span className="text-muted-foreground">|</span>
          <Snowflake className="w-3.5 h-3.5 text-blue-300" />
          <span className="font-semibold text-base">{weather.snowDepth} cm</span>
          <span className="text-xs opacity-70">{snowLabel}</span>
        </>
      )}
      <span className="text-sm font-medium tracking-wide opacity-80 ml-1">{label}</span>
    </div>
  );
};

export default WeatherWidget;
