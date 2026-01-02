import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function unwrapBeds24Array<T = any>(payload: any): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === "object" && Array.isArray(payload.data)) {
    return payload.data as T[];
  }
  return [];
}

function daysBetween(checkIn: string, checkOut: string): number {
  return Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (24 * 60 * 60 * 1000)
  );
}

interface Deal {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  price: number | null;
  currency: string;
  maxPersons: number;
  available: boolean;
}

interface CacheEntry {
  id: string;
  data: any;
  fetched_at: string;
}

// Check if availability cache is valid (less than 2 hours old)
function isAvailabilityCacheValid(fetchedAt: string): boolean {
  const cacheTime = new Date(fetchedAt).getTime();
  const now = Date.now();
  const twoHoursMs = 2 * 60 * 60 * 1000;
  return (now - cacheTime) < twoHoursMs;
}

// Check if prices cache is valid (updated today after 9 AM Finnish time)
function isPricesCacheValid(fetchedAt: string): boolean {
  const cacheTime = new Date(fetchedAt);
  const now = new Date();
  
  // Finnish time is UTC+2 (winter) or UTC+3 (summer)
  // For simplicity, use UTC+2 (EET)
  const finnishOffset = 2 * 60; // minutes
  
  // Get today's 9 AM in Finnish time, converted to UTC
  const todayFinnish = new Date(now.getTime() + finnishOffset * 60 * 1000);
  const today9amFinnish = new Date(todayFinnish);
  today9amFinnish.setUTCHours(9 - 2, 0, 0, 0); // 9 AM Finnish = 7 AM UTC
  
  // Cache is valid if fetched after today's 9 AM Finnish time
  return cacheTime.getTime() >= today9amFinnish.getTime();
}

// Fetch price for a specific deal using the offers endpoint
async function fetchOfferPrice(
  apiToken: string, 
  roomId: string, 
  checkIn: string, 
  checkOut: string
): Promise<number | null> {
  try {
    const offersUrl = `https://api.beds24.com/v2/inventory/rooms/offers?roomId=${roomId}&arrival=${checkIn}&departure=${checkOut}&numAdults=2`;
    
    console.log(`Fetching offer for room ${roomId}: ${checkIn} to ${checkOut}`);
    
    const response = await fetch(offersUrl, {
      method: "GET",
      headers: {
        token: apiToken,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Offers API error for room ${roomId}: ${response.status} - ${errorText.slice(0, 200)}`);
      return null;
    }

    const json = await response.json();
    console.log(`Offers response for room ${roomId}: ${JSON.stringify(json).slice(0, 500)}`);
    
    const dataArray = json?.data ?? [];
    for (const room of dataArray) {
      const offers = room?.offers ?? [];
      if (Array.isArray(offers) && offers.length > 0) {
        const price = offers[0]?.price ?? offers[0]?.totalPrice;
        if (typeof price === "number" && price > 0) {
          console.log(`Room ${roomId} (${checkIn}-${checkOut}): Price ${price}€`);
          return price;
        }
      }
    }
    
    const offers = json?.offers ?? [];
    if (Array.isArray(offers) && offers.length > 0) {
      const price = offers[0]?.price;
      if (typeof price === "number" && price > 0) {
        console.log(`Room ${roomId} (${checkIn}-${checkOut}): Price ${price}€`);
        return price;
      }
    }
    
    console.log(`Room ${roomId} (${checkIn}-${checkOut}): No price in offers response`);
    return null;
  } catch (error) {
    console.log(`Error fetching offer price for room ${roomId}:`, error);
    return null;
  }
}

// Fetch availability data from Beds24 API
async function fetchAvailabilityFromAPI(apiToken: string): Promise<{ rooms: any[]; properties: any[] }> {
  const today = new Date();
  const fourWeeksLater = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000);
  const arrivalFrom = formatDate(today);
  const arrivalTo = formatDate(fourWeeksLater);

  console.log(`Fetching Beds24 availability from ${arrivalFrom} to ${arrivalTo}`);

  // Fetch properties
  const propertiesResponse = await fetch(
    "https://beds24.com/api/v2/properties?includeAllRooms=true",
    {
      headers: {
        token: apiToken,
        accept: "application/json",
      },
    }
  );

  if (!propertiesResponse.ok) {
    throw new Error(`Properties API error: ${propertiesResponse.status}`);
  }

  const propertiesJson = await propertiesResponse.json();
  const properties = unwrapBeds24Array<any>(propertiesJson);

  // Fetch availability
  const availabilityUrl = `https://beds24.com/api/v2/inventory/rooms/availability?arrivalFrom=${arrivalFrom}&arrivalTo=${arrivalTo}`;
  
  const availabilityResponse = await fetch(availabilityUrl, {
    headers: {
      token: apiToken,
      accept: "application/json",
    },
  });

  if (!availabilityResponse.ok) {
    throw new Error(`Availability API error: ${availabilityResponse.status}`);
  }

  const availabilityJson = await availabilityResponse.json();
  const rooms = unwrapBeds24Array<any>(availabilityJson);

  return { rooms, properties };
}

// Process availability data into deals (without prices)
function processAvailabilityData(
  rooms: any[], 
  properties: any[], 
  maxCheckInStr: string
): Deal[] {
  const roomsMap = new Map<string, { name: string; maxPeople: number }>();

  for (const property of properties) {
    const propertyName = property?.name ?? "Majoitus";
    const roomsList = property?.rooms ?? [];

    if (Array.isArray(roomsList)) {
      for (const room of roomsList) {
        const id = room?.roomId ?? room?.id;
        if (!id) continue;

        roomsMap.set(String(id), {
          name: room?.name ?? propertyName,
          maxPeople: room?.maxPeople ?? room?.maxPersons ?? property?.maxPeople ?? 4,
        });
      }
    }
  }

  console.log("Rooms mapped:", roomsMap.size);

  const dealsWithoutPrices: Deal[] = [];

  for (const roomAvail of rooms) {
    const roomIdRaw = roomAvail?.roomId ?? roomAvail?.id;
    if (!roomIdRaw) continue;

    const roomId = String(roomIdRaw);
    const roomMeta = roomsMap.get(roomId);

    const roomName = roomMeta?.name ?? roomAvail?.name ?? `Majoitus ${roomId}`;
    const maxPersons = roomMeta?.maxPeople ?? roomAvail?.maxPeople ?? roomAvail?.maxPersons ?? 4;

    const availabilityData = roomAvail?.availability ?? {};
    
    let dateEntries: [string, boolean][] = [];
    
    if (typeof availabilityData === "object" && !Array.isArray(availabilityData)) {
      dateEntries = Object.entries(availabilityData)
        .map(([date, avail]) => [date, avail === true] as [string, boolean])
        .sort((a, b) => a[0].localeCompare(b[0]));
    } else if (Array.isArray(availabilityData)) {
      for (const day of availabilityData) {
        const date = day?.date ?? day?.day ?? day?.from;
        if (!date) continue;
        const isAvail = day?.available === true || (day?.numAvail ?? 0) > 0;
        dateEntries.push([String(date), isAvail]);
      }
      dateEntries.sort((a, b) => a[0].localeCompare(b[0]));
    }

    if (dateEntries.length === 0) continue;

    const availableDays = dateEntries.filter(d => d[1]).length;
    console.log(`Room ${roomId} (${roomName}): ${dateEntries.length} date entries, available days: ${availableDays}`);

    let periodStart: string | null = null;

    for (let i = 0; i < dateEntries.length; i++) {
      const [date, isAvailable] = dateEntries[i];

      if (isAvailable) {
        if (!periodStart) {
          periodStart = date;
        }
      } else if (periodStart) {
        const checkIn = periodStart;
        const checkOut = date;
        const nights = daysBetween(checkIn, checkOut);

        // Minimum 1 night, check-in within 14 days
        if (nights >= 1 && checkIn <= maxCheckInStr) {
          dealsWithoutPrices.push({
            id: `${roomId}-${checkIn}`,
            roomId,
            roomName,
            checkIn,
            checkOut,
            nights,
            price: null,
            currency: "EUR",
            maxPersons,
            available: true,
          });
        }

        periodStart = null;
      }
    }

    // Handle period extending to end of search range
    if (periodStart && periodStart <= maxCheckInStr) {
      const lastDate = dateEntries[dateEntries.length - 1][0];
      const lastDateObj = new Date(lastDate);
      lastDateObj.setDate(lastDateObj.getDate() + 1);
      const checkOut = formatDate(lastDateObj);
      
      const checkIn = periodStart;
      const nights = daysBetween(checkIn, checkOut);

      if (nights >= 1) {
        dealsWithoutPrices.push({
          id: `${roomId}-${checkIn}`,
          roomId,
          roomName,
          checkIn,
          checkOut,
          nights,
          price: null,
          currency: "EUR",
          maxPersons,
          available: true,
        });
      }
    }
  }

  return dealsWithoutPrices.filter(deal => deal.checkIn <= maxCheckInStr)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get("BEDS24_API_TOKEN");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!apiToken) {
      console.error("BEDS24_API_TOKEN not configured");
      return new Response(JSON.stringify({ error: "API token not configured", deals: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not configured");
      return new Response(JSON.stringify({ error: "Database not configured", deals: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse query params for force refresh
    const url = new URL(req.url);
    const forceRefresh = url.searchParams.get("force_refresh"); // "all", "prices", "availability"

    const today = new Date();
    const maxCheckInDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const maxCheckInStr = formatDate(maxCheckInDate);

    console.log(`Max check-in date: ${maxCheckInStr}, force_refresh: ${forceRefresh}`);

    // Check caches
    const { data: cacheData } = await supabase
      .from("beds24_cache")
      .select("*")
      .in("id", ["availability", "prices"]);

    const availabilityCache = cacheData?.find(c => c.id === "availability") as CacheEntry | undefined;
    const pricesCache = cacheData?.find(c => c.id === "prices") as CacheEntry | undefined;

    let availabilityCacheValid = availabilityCache && isAvailabilityCacheValid(availabilityCache.fetched_at);
    let pricesCacheValid = pricesCache && isPricesCacheValid(pricesCache.fetched_at);

    // Handle force refresh
    if (forceRefresh === "all") {
      availabilityCacheValid = false;
      pricesCacheValid = false;
    } else if (forceRefresh === "availability") {
      availabilityCacheValid = false;
    } else if (forceRefresh === "prices") {
      pricesCacheValid = false;
    }

    console.log(`Cache status - Availability: ${availabilityCacheValid ? "valid" : "expired"}, Prices: ${pricesCacheValid ? "valid" : "expired"}`);

    let availabilityData: { rooms: any[]; properties: any[] };
    let availabilityCachedAt: string;

    // Get availability data (from cache or API)
    if (availabilityCacheValid && availabilityCache) {
      console.log("Using cached availability data");
      availabilityData = availabilityCache.data;
      availabilityCachedAt = availabilityCache.fetched_at;
    } else {
      console.log("Fetching fresh availability from API");
      availabilityData = await fetchAvailabilityFromAPI(apiToken);
      availabilityCachedAt = new Date().toISOString();

      // Save to cache using upsert
      await supabase
        .from("beds24_cache")
        .upsert({
          id: "availability",
          data: availabilityData,
          fetched_at: availabilityCachedAt,
        });
      
      console.log("Availability cached");
    }

    // Process availability into deals
    const deals = processAvailabilityData(availabilityData.rooms, availabilityData.properties, maxCheckInStr);
    console.log(`Found ${deals.length} deals within 14 days`);

    let pricesCachedAt: string;
    let dealsWithPrices: Deal[];

    // Get prices (from cache or API)
    if (pricesCacheValid && pricesCache) {
      console.log("Using cached prices data");
      pricesCachedAt = pricesCache.fetched_at;
      
      // Map cached prices to deals
      const cachedPrices = pricesCache.data as Record<string, number>;
      dealsWithPrices = deals.map(deal => ({
        ...deal,
        price: cachedPrices[deal.id] ?? null,
      }));
    } else {
      console.log("Fetching fresh prices from API");
      
      // Fetch prices for all deals
      const BATCH_SIZE = 5;
      const pricesMap: Record<string, number> = {};
      dealsWithPrices = [];

      for (let i = 0; i < deals.length; i += BATCH_SIZE) {
        const batch = deals.slice(i, i + BATCH_SIZE);
        
        const pricePromises = batch.map(async (deal) => {
          const price = await fetchOfferPrice(apiToken, deal.roomId, deal.checkIn, deal.checkOut);
          if (price !== null) {
            pricesMap[deal.id] = price;
          }
          return { ...deal, price };
        });

        const batchResults = await Promise.all(pricePromises);
        dealsWithPrices.push(...batchResults);
      }

      pricesCachedAt = new Date().toISOString();

      // Save prices to cache
      await supabase
        .from("beds24_cache")
        .upsert({
          id: "prices",
          data: pricesMap,
          fetched_at: pricesCachedAt,
        });
      
      console.log(`Prices cached: ${Object.keys(pricesMap).length} entries`);
    }

    const withPrice = dealsWithPrices.filter(d => d.price !== null);
    const withoutPrice = dealsWithPrices.filter(d => d.price === null);
    console.log(`Deals with prices: ${withPrice.length}, without: ${withoutPrice.length}`);

    return new Response(JSON.stringify({ 
      deals: dealsWithPrices, 
      fetchedAt: new Date().toISOString(),
      availabilityCachedAt,
      pricesCachedAt,
      fromCache: {
        availability: availabilityCacheValid,
        prices: pricesCacheValid,
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in beds24-availability:", error);
    return new Response(JSON.stringify({ error: "Internal server error", deals: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
