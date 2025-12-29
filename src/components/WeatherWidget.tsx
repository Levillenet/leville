import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Snowflake, CloudFog, Wind, ThermometerSnowflake } from "lucide-react";
import { useLocation } from "react-router-dom";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  snowDepth: number | null;
  minTemp24h: number | null;
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
        // Kittilä coordinates: 67.6603° N, 24.9076° E (more accurate valley temperatures)
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=67.6603&longitude=24.9076&current=temperature_2m,weather_code,snow_depth&hourly=temperature_2m&forecast_hours=24&timezone=Europe%2FHelsinki"
        );
        const data = await response.json();
        
        let minTemp24h: number | null = null;
        
        // Find minimum temperature in the next 24 hours
        if (data.hourly && data.hourly.temperature_2m) {
          const temps = data.hourly.temperature_2m as number[];
          minTemp24h = Math.round(Math.min(...temps));
        }
        
        if (data.current) {
          setWeather({
            temperature: Math.round(data.current.temperature_2m),
            weatherCode: data.current.weather_code,
            snowDepth: data.current.snow_depth !== undefined ? Math.round(data.current.snow_depth * 100) : null, // Convert m to cm
            minTemp24h,
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

  const snowLabel = isEnglish ? "snow" : "lunta";
  const coldestLabel = isEnglish ? "coldest in 24h" : "kylmin 24h:ssa";

  return (
    <div className="flex items-center gap-2 text-foreground">
      {getWeatherIcon(weather.weatherCode)}
      <span className="font-semibold text-base">{weather.temperature}°C</span>
      {weather.minTemp24h !== null && (
        <>
          <span className="text-muted-foreground">|</span>
          <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-base text-cyan-400">{weather.minTemp24h}°C</span>
          <span className="text-xs opacity-70">{coldestLabel}</span>
        </>
      )}
      {weather.snowDepth !== null && weather.snowDepth > 0 && (
        <>
          <span className="text-muted-foreground">|</span>
          <Snowflake className="w-3.5 h-3.5 text-blue-300" />
          <span className="font-semibold text-base">{weather.snowDepth} cm</span>
          <span className="text-xs opacity-70">{snowLabel}</span>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
