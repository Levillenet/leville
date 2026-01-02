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
    const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

    const arrivalFrom = formatDate(today);
    const arrivalTo = formatDate(twoWeeksLater);

    console.log(`Fetching Beds24 availability from ${arrivalFrom} to ${arrivalTo}`);

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

    const deals: Deal[] = [];

    for (const roomAvail of availabilityRooms) {
      const roomIdRaw = roomAvail?.roomId ?? roomAvail?.id;
      if (!roomIdRaw) continue;

      const roomId = String(roomIdRaw);
      const roomMeta = roomsMap.get(roomId);

      const roomName = roomMeta?.name ?? roomAvail?.name ?? `Majoitus ${roomId}`;
      const maxPersons =
        roomMeta?.maxPeople ?? roomAvail?.maxPeople ?? roomAvail?.maxPersons ?? 4;

      const days = roomAvail?.availability ?? roomAvail?.dates ?? roomAvail?.days ?? [];
      if (!Array.isArray(days) || days.length === 0) continue;

      let periodStart: string | null = null;
      let periodPrice = 0;

      for (const day of days) {
        const date = day?.date ?? day?.day ?? day?.from;
        if (!date) continue;

        const numAvail =
          typeof day?.numAvail === "number"
            ? day.numAvail
            : typeof day?.avail === "number"
              ? day.avail
              : 0;

        const isAvailable =
          (day?.available === true || numAvail > 0) && day?.closed !== true;

        const price =
          typeof day?.price === "number"
            ? day.price
            : typeof day?.price1 === "number"
              ? day.price1
              : 0;

        if (isAvailable) {
          if (!periodStart) {
            periodStart = String(date);
            periodPrice = price;
          } else {
            periodPrice += price;
          }
        } else if (periodStart) {
          // End of available period
          const checkIn = periodStart;
          const checkOut = String(date);
          const nights = daysBetween(checkIn, checkOut);

          if (nights >= 2) {
            deals.push({
              id: `${roomId}-${checkIn}`,
              roomId,
              roomName,
              checkIn,
              checkOut,
              nights,
              price: periodPrice > 0 ? periodPrice : null,
              currency: "EUR",
              maxPersons,
              available: true,
            });
          }

          periodStart = null;
          periodPrice = 0;
        }
      }

      // Handle period that extends to end of search range
      if (periodStart) {
        const checkIn = periodStart;
        const checkOut = arrivalTo;
        const nights = daysBetween(checkIn, checkOut);

        if (nights >= 2) {
          deals.push({
            id: `${roomId}-${checkIn}`,
            roomId,
            roomName,
            checkIn,
            checkOut,
            nights,
            price: periodPrice > 0 ? periodPrice : null,
            currency: "EUR",
            maxPersons,
            available: true,
          });
        }
      }
    }

    deals.sort((a, b) => a.checkIn.localeCompare(b.checkIn));

    console.log(`Found ${deals.length} available deals`);

    return new Response(JSON.stringify({ deals, fetchedAt: new Date().toISOString() }), {
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
