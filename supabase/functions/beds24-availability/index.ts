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
    console.log("Properties payload:", JSON.stringify(propertiesJson).slice(0, 800));

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

    // 2) Availability
    const availabilityResponse = await fetch(
      `https://beds24.com/api/v2/inventory/rooms/availability?arrivalFrom=${arrivalFrom}&arrivalTo=${arrivalTo}`,
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
    console.log("Availability payload:", JSON.stringify(availabilityJson).slice(0, 800));

    // 3) Rates - fetch pricing information
    let ratesMap = new Map<string, Map<string, number>>(); // roomId -> date -> price
    
    try {
      const ratesResponse = await fetch(
        `https://beds24.com/api/v2/inventory/rooms/rates?arrivalFrom=${arrivalFrom}&arrivalTo=${arrivalTo}`,
        {
          headers: {
            token: apiToken,
            accept: "application/json",
          },
        }
      );

      if (ratesResponse.ok) {
        const ratesJson = await ratesResponse.json();
        const ratesRooms = unwrapBeds24Array<any>(ratesJson);
        console.log("Rates payload:", JSON.stringify(ratesJson).slice(0, 800));

        for (const roomRates of ratesRooms) {
          const roomIdRaw = roomRates?.roomId ?? roomRates?.id;
          if (!roomIdRaw) continue;

          const roomId = String(roomIdRaw);
          const ratesData = roomRates?.rates ?? roomRates?.prices ?? {};
          
          if (!ratesMap.has(roomId)) {
            ratesMap.set(roomId, new Map());
          }
          
          const roomPrices = ratesMap.get(roomId)!;
          
          if (typeof ratesData === "object" && !Array.isArray(ratesData)) {
            // Object format: {"2026-01-02": 150, ...}
            for (const [date, price] of Object.entries(ratesData)) {
              if (typeof price === "number" && price > 0) {
                roomPrices.set(date, price);
              }
            }
          } else if (Array.isArray(ratesData)) {
            // Array format
            for (const rate of ratesData) {
              const date = rate?.date ?? rate?.day;
              const price = rate?.price ?? rate?.price1 ?? rate?.rate;
              if (date && typeof price === "number" && price > 0) {
                roomPrices.set(String(date), price);
              }
            }
          }
        }
        console.log("Rates mapped for rooms:", ratesMap.size);
      } else {
        console.log("Rates API not available or error, continuing without prices");
      }
    } catch (ratesError) {
      console.log("Error fetching rates, continuing without prices:", ratesError);
    }

    const deals: Deal[] = [];

    for (const roomAvail of availabilityRooms) {
      const roomIdRaw = roomAvail?.roomId ?? roomAvail?.id;
      if (!roomIdRaw) continue;

      const roomId = String(roomIdRaw);
      const roomMeta = roomsMap.get(roomId);
      const roomPrices = ratesMap.get(roomId);

      const roomName = roomMeta?.name ?? roomAvail?.name ?? `Majoitus ${roomId}`;
      const maxPersons =
        roomMeta?.maxPeople ?? roomAvail?.maxPeople ?? roomAvail?.maxPersons ?? 4;

      // Beds24 returns availability as object: {"2026-01-02": true, "2026-01-03": false, ...}
      const availabilityData = roomAvail?.availability ?? {};
      
      // Convert object to sorted array of dates
      let dateEntries: [string, boolean][] = [];
      
      if (typeof availabilityData === "object" && !Array.isArray(availabilityData)) {
        // It's an object with date keys
        dateEntries = Object.entries(availabilityData)
          .map(([date, avail]) => [date, avail === true] as [string, boolean])
          .sort((a, b) => a[0].localeCompare(b[0]));
      } else if (Array.isArray(availabilityData)) {
        // It's an array (fallback)
        for (const day of availabilityData) {
          const date = day?.date ?? day?.day ?? day?.from;
          if (!date) continue;
          const isAvail = day?.available === true || (day?.numAvail ?? 0) > 0;
          dateEntries.push([String(date), isAvail]);
        }
        dateEntries.sort((a, b) => a[0].localeCompare(b[0]));
      }

      if (dateEntries.length === 0) continue;

      console.log(`Room ${roomId} (${roomName}): ${dateEntries.length} date entries, available days: ${dateEntries.filter(d => d[1]).length}`);

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
            // Calculate total price for the stay
            let totalPrice: number | null = null;
            if (roomPrices && roomPrices.size > 0) {
              let sum = 0;
              let hasPrices = true;
              const checkInDate = new Date(checkIn);
              for (let n = 0; n < nights; n++) {
                const stayDate = new Date(checkInDate);
                stayDate.setDate(stayDate.getDate() + n);
                const dateStr = formatDate(stayDate);
                const dayPrice = roomPrices.get(dateStr);
                if (dayPrice) {
                  sum += dayPrice;
                } else {
                  hasPrices = false;
                  break;
                }
              }
              if (hasPrices && sum > 0) {
                totalPrice = sum;
              }
            }

            deals.push({
              id: `${roomId}-${checkIn}`,
              roomId,
              roomName,
              checkIn,
              checkOut,
              nights,
              price: totalPrice,
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
        // Add one day to get checkout date
        const lastDateObj = new Date(lastDate);
        lastDateObj.setDate(lastDateObj.getDate() + 1);
        const checkOut = formatDate(lastDateObj);
        
        const checkIn = periodStart;
        const nights = daysBetween(checkIn, checkOut);

        if (nights >= 2) {
          // Calculate total price for the stay
          let totalPrice: number | null = null;
          if (roomPrices && roomPrices.size > 0) {
            let sum = 0;
            let hasPrices = true;
            const checkInDate = new Date(checkIn);
            for (let n = 0; n < nights; n++) {
              const stayDate = new Date(checkInDate);
              stayDate.setDate(stayDate.getDate() + n);
              const dateStr = formatDate(stayDate);
              const dayPrice = roomPrices.get(dateStr);
              if (dayPrice) {
                sum += dayPrice;
              } else {
                hasPrices = false;
                break;
              }
            }
            if (hasPrices && sum > 0) {
              totalPrice = sum;
            }
          }

          deals.push({
            id: `${roomId}-${checkIn}`,
            roomId,
            roomName,
            checkIn,
            checkOut,
            nights,
            price: totalPrice,
            currency: "EUR",
            maxPersons,
            available: true,
          });
        }
      }
    }

    // Filter to only include deals with check-in within 14 days
    const filteredDeals = deals.filter(deal => deal.checkIn <= maxCheckInStr);
    filteredDeals.sort((a, b) => a.checkIn.localeCompare(b.checkIn));

    console.log(`Found ${deals.length} total deals, ${filteredDeals.length} within 14 days (max: ${maxCheckInStr})`);

    return new Response(JSON.stringify({ deals: filteredDeals, fetchedAt: new Date().toISOString() }), {
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
