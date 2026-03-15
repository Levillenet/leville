import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SnowDataPoint {
  year: number;
  date: string;
  dayMonth: string;
  snow: number | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const startDay = parseInt(url.searchParams.get("startDay") || "1");
    const startMonth = parseInt(url.searchParams.get("startMonth") || "12");
    const endDay = parseInt(url.searchParams.get("endDay") || "6");
    const endMonth = parseInt(url.searchParams.get("endMonth") || "12");
    const years = parseInt(url.searchParams.get("years") || "10");
    const place = url.searchParams.get("place") || "Kittilä";

    console.log(`Fetching snow data for ${place}: ${startDay}.${startMonth} - ${endDay}.${endMonth}, ${years} years`);

    const currentYear = new Date().getFullYear();
    const allData: SnowDataPoint[] = [];
    const yearsWithData: number[] = [];

    // Fetch data for each year
    for (let yearOffset = 0; yearOffset < years; yearOffset++) {
      const year = currentYear - yearOffset;
      
      // Handle year-crossing date ranges (e.g., Dec to Jan)
      let startYear = year;
      let endYear = year;
      
      if (endMonth < startMonth) {
        // Date range crosses year boundary (e.g., Dec 20 to Jan 5)
        endYear = year + 1;
      }
      
      const startDate = `${startYear}-${String(startMonth).padStart(2, "0")}-${String(startDay).padStart(2, "0")}T00:00:00Z`;
      const endDate = `${endYear}-${String(endMonth).padStart(2, "0")}-${String(endDay).padStart(2, "0")}T23:59:59Z`;

      const now = new Date();
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      // Skip only if the start date is in the future (no data possible)
      if (startDateObj > now) {
        console.log(`Skipping future start date: ${startDate}`);
        continue;
      }

      // Clamp end date to today if it's in the future
      let effectiveEndDate = endDate;
      if (endDateObj > now) {
        effectiveEndDate = now.toISOString();
        console.log(`Clamping end date from ${endDate} to ${effectiveEndDate}`);
      }

      const primaryUrl = buildFmiUrl({ place, startDate, endDate });
      console.log(`Fetching FMI data for ${startYear}: ${primaryUrl}`);

      try {
        let snowData = await fetchSnowDataFromFmi(primaryUrl, startYear);
        let nonNullCount = snowData.filter((point) => point.snow !== null).length;

        // Rovaniemi city query often resolves to a station with missing snow depth values.
        // If that happens, fall back to nearby stations and combine them.
        if (place.toLowerCase() === "rovaniemi" && nonNullCount === 0) {
          const fallbackUrl = buildFmiUrl({
            bbox: "25.2,66.3,26.2,66.8",
            maxLocations: 10,
            startDate,
            endDate,
          });

          console.log(`Rovaniemi fallback to bbox for ${startYear}: ${fallbackUrl}`);
          snowData = await fetchSnowDataFromFmi(fallbackUrl, startYear);
          nonNullCount = snowData.filter((point) => point.snow !== null).length;
        }

        console.log(`${place} year ${startYear}: found ${snowData.length} snow data points (${nonNullCount} with values)`);

        if (snowData.length > 0) {
          allData.push(...snowData);
          yearsWithData.push(startYear);
        }
      } catch (fetchError) {
        console.error(`Error fetching data for year ${startYear}:`, fetchError);
      }
    }

    // Transform data for chart format: { date: "01.12", 2024: 38, 2023: 44, ... }
    const chartDataMap = new Map<string, Record<string, number | string | null>>();
    
    for (const point of allData) {
      if (!chartDataMap.has(point.dayMonth)) {
        chartDataMap.set(point.dayMonth, { date: point.dayMonth });
      }
      const entry = chartDataMap.get(point.dayMonth)!;
      entry[String(point.year)] = point.snow;
    }

    // Sort by date
    const chartData = Array.from(chartDataMap.values()).sort((a, b) => {
      const [dayA, monthA] = (a.date as string).split(".").map(Number);
      const [dayB, monthB] = (b.date as string).split(".").map(Number);
      if (monthA !== monthB) return monthA - monthB;
      return dayA - dayB;
    });

    console.log(`Returning ${chartData.length} data points for ${yearsWithData.length} years`);

    return new Response(
      JSON.stringify({
        chartData,
        years: yearsWithData.sort((a, b) => b - a),
        metadata: {
          station: "Kittilä Pakatti",
          coordinates: { lat: 67.669, lon: 24.929 },
          dateRange: `${startDay}.${startMonth} - ${endDay}.${endMonth}`,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in fmi-snow-data function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch snow data" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function buildFmiUrl(options: {
  startDate: string;
  endDate: string;
  place?: string;
  bbox?: string;
  maxLocations?: number;
}) {
  const params = new URLSearchParams({
    request: "GetFeature",
    storedquery_id: "fmi::observations::weather::daily::simple",
    starttime: options.startDate,
    endtime: options.endDate,
  });

  if (options.place) params.set("place", options.place);
  if (options.bbox) params.set("bbox", options.bbox);
  if (options.maxLocations) params.set("maxlocations", String(options.maxLocations));

  return `https://opendata.fmi.fi/wfs?${params.toString()}`;
}

async function fetchSnowDataFromFmi(fmiUrl: string, year: number): Promise<SnowDataPoint[]> {
  const response = await fetch(fmiUrl);

  if (!response.ok) {
    throw new Error(`FMI API error: ${response.status}`);
  }

  const xmlText = await response.text();
  return parseSnowDataFromXml(xmlText, year);
}

function parseSnowDataFromXml(xmlText: string, year: number): SnowDataPoint[] {
  const snowData: SnowDataPoint[] = [];
  
  // Parse BsWfs members - each contains one measurement
  const memberRegex = /<BsWfs:BsWfsElement[^>]*>([\s\S]*?)<\/BsWfs:BsWfsElement>/g;
  let memberMatch;
  
  // Temporary storage to group by time. For bbox queries there can be multiple stations
  // per timestamp, so we aggregate all numeric snow values.
  const timeDataMap = new Map<string, number[]>();
  
  while ((memberMatch = memberRegex.exec(xmlText)) !== null) {
    const memberContent = memberMatch[1];
    
    // Extract time
    const timeMatch = memberContent.match(/<BsWfs:Time>([^<]+)<\/BsWfs:Time>/);
    // Extract parameter name
    const paramMatch = memberContent.match(/<BsWfs:ParameterName>([^<]+)<\/BsWfs:ParameterName>/);
    // Extract value
    const valueMatch = memberContent.match(/<BsWfs:ParameterValue>([^<]+)<\/BsWfs:ParameterValue>/);
    
    if (timeMatch && paramMatch && valueMatch) {
      const time = timeMatch[1];
      const param = paramMatch[1];
      const value = valueMatch[1];
      
      // We're only interested in snow depth
      if (param === "snow" && value !== "NaN") {
        const snowValue = parseFloat(value);
        if (!isNaN(snowValue)) {
          if (!timeDataMap.has(time)) {
            timeDataMap.set(time, []);
          }
          timeDataMap.get(time)!.push(snowValue);
        }
      }
    }
  }
  
  // Convert to array format (average by date if multiple stations are present)
  for (const [time, values] of timeDataMap) {
    if (values.length === 0) continue;

    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dayMonth = `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}`;
    const avgSnow = values.reduce((sum, value) => sum + value, 0) / values.length;
    
    snowData.push({
      year,
      date: time,
      dayMonth,
      snow: Math.round(avgSnow * 10) / 10,
    });
  }
  
  return snowData;
}
