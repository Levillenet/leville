import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

interface Beds24Room {
  roomId: string;
  name: string;
  maxPeople?: number;
}

interface Beds24Availability {
  roomId: string;
  date: string;
  numAvail: number;
  price?: number;
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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get('BEDS24_API_TOKEN');
    
    if (!apiToken) {
      console.error('BEDS24_API_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'API token not configured', deals: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const today = new Date();
    const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    const arrivalFrom = formatDate(today);
    const arrivalTo = formatDate(twoWeeksLater);

    console.log(`Fetching Beds24 availability from ${arrivalFrom} to ${arrivalTo}`);

    // First, get the list of properties with rooms
    const propertiesResponse = await fetch('https://beds24.com/api/v2/properties?includeAllRooms=true', {
      headers: {
        'token': apiToken,
        'accept': 'application/json'
      }
    });

    if (!propertiesResponse.ok) {
      const errorText = await propertiesResponse.text();
      console.error('Beds24 properties API error:', propertiesResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch properties', deals: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const propertiesData = await propertiesResponse.json();
    console.log('Properties data:', JSON.stringify(propertiesData).slice(0, 1000));

    // Build a map of rooms from properties
    const roomsMap = new Map<string, { name: string; maxPeople: number; propertyName: string }>();
    if (Array.isArray(propertiesData)) {
      for (const property of propertiesData) {
        const propertyName = property.name || 'Majoitus';
        if (property.rooms && Array.isArray(property.rooms)) {
          for (const room of property.rooms) {
            roomsMap.set(String(room.id), {
              name: room.name || propertyName,
              maxPeople: room.maxPeople || 4,
              propertyName
            });
          }
        }
        // Also add property itself if it has an id
        if (property.id) {
          roomsMap.set(String(property.id), {
            name: propertyName,
            maxPeople: property.maxPeople || 4,
            propertyName
          });
        }
      }
    }

    console.log('Found rooms:', roomsMap.size);

    // Get calendar/availability data
    const calendarResponse = await fetch(
      `https://beds24.com/api/v2/inventory/calendar?startDate=${arrivalFrom}&endDate=${arrivalTo}`,
      {
        headers: {
          'token': apiToken,
          'accept': 'application/json'
        }
      }
    );

    if (!calendarResponse.ok) {
      const errorText = await calendarResponse.text();
      console.error('Beds24 calendar API error:', calendarResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch calendar', deals: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const calendarData = await calendarResponse.json();
    console.log('Calendar data:', JSON.stringify(calendarData).slice(0, 1000));

    // Process calendar data to find free periods
    const deals: Deal[] = [];
    
    // The calendar response structure may vary, so we handle different formats
    if (Array.isArray(calendarData)) {
      // Process each room's availability
      for (const roomAvail of calendarData) {
        const roomId = roomAvail.roomId || roomAvail.id;
        const roomData = roomsMap.get(String(roomId));
        
        const roomName = roomData?.name || roomAvail.name || `Majoitus ${roomId}`;
        const maxPersons = roomData?.maxPeople || roomAvail.maxPeople || 4;

        // Look for available dates
        const availability = roomAvail.availability || roomAvail.dates || [];
        
        if (Array.isArray(availability)) {
          let periodStart: string | null = null;
          let periodPrice = 0;
          
          for (let i = 0; i < availability.length; i++) {
            const day = availability[i];
            const isAvailable = day.numAvail > 0 || day.available === true;
            const date = day.date;
            const price = day.price || 0;
            
            if (isAvailable) {
              if (!periodStart) {
                periodStart = date;
                periodPrice = price;
              } else {
                periodPrice += price;
              }
            } else if (periodStart) {
              // End of available period
              const checkIn = periodStart;
              const checkOut = date;
              const nights = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (24 * 60 * 60 * 1000));
              
              if (nights >= 2) {
                deals.push({
                  id: `${roomId}-${checkIn}`,
                  roomId: String(roomId),
                  roomName,
                  checkIn,
                  checkOut,
                  nights,
                  price: periodPrice > 0 ? periodPrice : null,
                  currency: 'EUR',
                  maxPersons,
                  available: true
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
            const nights = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (24 * 60 * 60 * 1000));
            
            if (nights >= 2) {
              deals.push({
                id: `${roomId}-${checkIn}`,
                roomId: String(roomId),
                roomName,
                checkIn,
                checkOut,
                nights,
                price: periodPrice > 0 ? periodPrice : null,
                currency: 'EUR',
                maxPersons,
                available: true
              });
            }
          }
        }
      }
    }

    console.log(`Found ${deals.length} available deals`);

    return new Response(
      JSON.stringify({ deals, fetchedAt: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in beds24-availability:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', deals: [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
