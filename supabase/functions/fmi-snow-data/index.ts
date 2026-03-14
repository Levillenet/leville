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

      // Skip future dates
      const endDateObj = new Date(endDate);
      if (endDateObj > new Date()) {
        console.log(`Skipping future date range: ${startDate} - ${endDate}`);
        continue;
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

function parseSnowDataFromXml(xmlText: string, year: number): SnowDataPoint[] {
  const snowData: SnowDataPoint[] = [];
  
  // Parse BsWfs members - each contains one measurement
  const memberRegex = /<BsWfs:BsWfsElement[^>]*>([\s\S]*?)<\/BsWfs:BsWfsElement>/g;
  let memberMatch;
  
  // Temporary storage to group by time
  const timeDataMap = new Map<string, { time: string; snow: number | null }>();
  
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
      if (param === "snow") {
        const snowValue = value === "NaN" ? null : parseFloat(value);
        timeDataMap.set(time, { time, snow: snowValue });
      }
    }
  }
  
  // Convert to array format
  for (const [time, data] of timeDataMap) {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dayMonth = `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}`;
    
    snowData.push({
      year,
      date: time,
      dayMonth,
      snow: data.snow,
    });
  }
  
  return snowData;
}
