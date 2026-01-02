import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

// Fetch price for a specific deal using the offers endpoint
async function fetchOfferPrice(
  apiToken: string, 
  roomId: string, 
  checkIn: string, 
  checkOut: string
): Promise<number | null> {
  try {
    // Use the offers endpoint with occupancy parameter for Fixed Prices
    // API expects 'arrival', 'departure', 'roomId', and 'adults' parameters
    const offersUrl = `https://beds24.com/api/v2/inventory/rooms/offers?arrival=${checkIn}&departure=${checkOut}&roomId=${roomId}&adults=2`;
    
    const response = await fetch(offersUrl, {
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
    const offers = unwrapBeds24Array<any>(json);
    
    // Find the matching room's offer
    for (const roomOffer of offers) {
      const rid = String(roomOffer?.roomId ?? roomOffer?.id ?? "");
      if (rid === roomId) {
        // Get the first offer's price
        const offersList = roomOffer?.offers ?? [roomOffer];
        if (Array.isArray(offersList) && offersList.length > 0) {
          const price = offersList[0]?.price ?? offersList[0]?.totalPrice ?? offersList[0]?.total;
          if (typeof price === "number" && price > 0) {
            console.log(`Room ${roomId} (${checkIn}-${checkOut}): Price ${price}€`);
            return price;
          }
        }
        // Also check direct price field
        const directPrice = roomOffer?.price ?? roomOffer?.totalPrice;
        if (typeof directPrice === "number" && directPrice > 0) {
          console.log(`Room ${roomId} (${checkIn}-${checkOut}): Direct price ${directPrice}€`);
          return directPrice;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.log(`Error fetching offer price for room ${roomId}:`, error);
    return null;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get("BEDS24_API_TOKEN");

    if (!apiToken) {
      console.error("BEDS24_API_TOKEN not configured");
      return new Response(JSON.stringify({ error: "API token not configured", deals: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const today = new Date();
    // Search for 4 weeks to find consecutive available nights
    const fourWeeksLater = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000);
    // But only show deals with check-in within 14 days
    const maxCheckInDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const maxCheckInStr = formatDate(maxCheckInDate);

    const arrivalFrom = formatDate(today);
    const arrivalTo = formatDate(fourWeeksLater);

    console.log(`Fetching Beds24 availability from ${arrivalFrom} to ${arrivalTo}`);
    console.log(`Max check-in date for display: ${maxCheckInStr}`);

    // 1) Properties (used for room names + max persons)
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
      const errorText = await propertiesResponse.text();
      console.error("Beds24 properties API error:", propertiesResponse.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to fetch properties", deals: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const propertiesJson = await propertiesResponse.json();
    const properties = unwrapBeds24Array<any>(propertiesJson);

    const roomsMap = new Map<string, { name: string; maxPeople: number }>();

    for (const property of properties) {
      const propertyName = property?.name ?? "Majoitus";
      const rooms = property?.rooms ?? [];

      if (Array.isArray(rooms)) {
        for (const room of rooms) {
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

    // 2) Availability (just true/false)
    const availabilityUrl = `https://beds24.com/api/v2/inventory/rooms/availability?arrivalFrom=${arrivalFrom}&arrivalTo=${arrivalTo}`;
    
    const availabilityResponse = await fetch(
      availabilityUrl,
      {
        headers: {
          token: apiToken,
          accept: "application/json",
        },
      }
    );

    if (!availabilityResponse.ok) {
      const errorText = await availabilityResponse.text();
      console.error("Beds24 availability API error:", availabilityResponse.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to fetch availability", deals: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const availabilityJson = await availabilityResponse.json();
    const availabilityRooms = unwrapBeds24Array<any>(availabilityJson);

    // Find available periods and create deals (without prices yet)
    const dealsWithoutPrices: Deal[] = [];

    for (const roomAvail of availabilityRooms) {
      const roomIdRaw = roomAvail?.roomId ?? roomAvail?.id;
      if (!roomIdRaw) continue;

      const roomId = String(roomIdRaw);
      const roomMeta = roomsMap.get(roomId);

      const roomName = roomMeta?.name ?? roomAvail?.name ?? `Majoitus ${roomId}`;
      const maxPersons = roomMeta?.maxPeople ?? roomAvail?.maxPeople ?? roomAvail?.maxPersons ?? 4;

      // Beds24 returns availability as object: {"2026-01-02": true, "2026-01-03": false, ...}
      const availabilityData = roomAvail?.availability ?? {};
      
      // Convert object to sorted array of dates
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
          // End of available period
          const checkIn = periodStart;
          const checkOut = date;
          const nights = daysBetween(checkIn, checkOut);

          // Only include if check-in is within 14 days AND at least 2 nights
          if (nights >= 2 && checkIn <= maxCheckInStr) {
            dealsWithoutPrices.push({
              id: `${roomId}-${checkIn}`,
              roomId,
              roomName,
              checkIn,
              checkOut,
              nights,
              price: null, // Will be fetched via offers endpoint
              currency: "EUR",
              maxPersons,
              available: true,
            });
          }

          periodStart = null;
        }
      }

      // Handle period that extends to end of search range
      if (periodStart && periodStart <= maxCheckInStr) {
        const lastDate = dateEntries[dateEntries.length - 1][0];
        const lastDateObj = new Date(lastDate);
        lastDateObj.setDate(lastDateObj.getDate() + 1);
        const checkOut = formatDate(lastDateObj);
        
        const checkIn = periodStart;
        const nights = daysBetween(checkIn, checkOut);

        if (nights >= 2) {
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

    // Filter to only include deals with check-in within 14 days
    const filteredDeals = dealsWithoutPrices.filter(deal => deal.checkIn <= maxCheckInStr);
    filteredDeals.sort((a, b) => a.checkIn.localeCompare(b.checkIn));

    console.log(`Found ${filteredDeals.length} deals within 14 days (max: ${maxCheckInStr})`);

    // 3) Fetch prices for each deal using the offers endpoint
    // Process in parallel batches to avoid overwhelming the API
    const BATCH_SIZE = 5;
    const dealsWithPrices: Deal[] = [];

    for (let i = 0; i < filteredDeals.length; i += BATCH_SIZE) {
      const batch = filteredDeals.slice(i, i + BATCH_SIZE);
      
      const pricePromises = batch.map(async (deal) => {
        const price = await fetchOfferPrice(apiToken, deal.roomId, deal.checkIn, deal.checkOut);
        return { ...deal, price };
      });

      const batchResults = await Promise.all(pricePromises);
      dealsWithPrices.push(...batchResults);
    }

    console.log(`Processed ${dealsWithPrices.length} deals with prices`);
    
    // Log which deals got prices
    const withPrice = dealsWithPrices.filter(d => d.price !== null);
    const withoutPrice = dealsWithPrices.filter(d => d.price === null);
    console.log(`Deals with prices: ${withPrice.length}, without: ${withoutPrice.length}`);

    return new Response(JSON.stringify({ deals: dealsWithPrices, fetchedAt: new Date().toISOString() }), {
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
