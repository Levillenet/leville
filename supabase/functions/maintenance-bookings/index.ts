import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingInfo {
  propertyId: string;
  guestCount: number;
}

interface DayBookings {
  date: string;
  arrivals: BookingInfo[];
  departures: BookingInfo[];
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get('BEDS24_API_TOKEN');
    if (!apiToken) {
      throw new Error('BEDS24_API_TOKEN not configured');
    }

    const { date } = await req.json();
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    console.log(`Fetching bookings for date: ${targetDate}`);

    const headers = {
      'Content-Type': 'application/json',
      'token': apiToken
    };

    // Fetch arrivals for the target date using v2 API
    const arrivalsUrl = `https://beds24.com/api/v2/bookings?arrivalFrom=${targetDate}&arrivalTo=${targetDate}`;
    console.log('Fetching arrivals from:', arrivalsUrl);
    
    const arrivalsResponse = await fetch(arrivalsUrl, {
      method: 'GET',
      headers
    });

    if (!arrivalsResponse.ok) {
      const errorText = await arrivalsResponse.text();
      console.error('Arrivals API error:', arrivalsResponse.status, errorText);
      throw new Error(`Beds24 arrivals API error: ${arrivalsResponse.status} - ${errorText}`);
    }

    const arrivalsData = await arrivalsResponse.json();
    console.log(`Arrivals count: ${arrivalsData?.data?.length || (Array.isArray(arrivalsData) ? arrivalsData.length : 0)}`);

    // Fetch departures for the target date using v2 API
    const departuresUrl = `https://beds24.com/api/v2/bookings?departureFrom=${targetDate}&departureTo=${targetDate}`;
    console.log('Fetching departures from:', departuresUrl);
    
    const departuresResponse = await fetch(departuresUrl, {
      method: 'GET',
      headers
    });

    if (!departuresResponse.ok) {
      const errorText = await departuresResponse.text();
      console.error('Departures API error:', departuresResponse.status, errorText);
      throw new Error(`Beds24 departures API error: ${departuresResponse.status} - ${errorText}`);
    }

    const departuresData = await departuresResponse.json();
    console.log(`Departures count: ${departuresData?.data?.length || (Array.isArray(departuresData) ? departuresData.length : 0)}`);

    // Process arrivals - v2 API returns data in 'data' array
    // IMPORTANT: Use roomId (our apartment ID) not propertyId (Beds24 internal ID)
    const arrivals: BookingInfo[] = [];
    const arrivalsArray = arrivalsData.data || arrivalsData || [];
    if (Array.isArray(arrivalsArray)) {
      for (const booking of arrivalsArray) {
        // roomId is our apartment ID, propertyId is Beds24's internal property ID
        const roomId = booking.roomId ?? booking.roomid;
        const propertyId = roomId || booking.propertyId;
        if (propertyId) {
          const numAdult = parseInt(booking.numAdult || booking.adults || '0', 10);
          const numChild = parseInt(booking.numChild || booking.children || '0', 10);
          arrivals.push({
            propertyId: String(propertyId),
            guestCount: numAdult + numChild
          });
        }
      }
    }

    // Process departures
    const departures: BookingInfo[] = [];
    const departuresArray = departuresData.data || departuresData || [];
    if (Array.isArray(departuresArray)) {
      for (const booking of departuresArray) {
        const roomId = booking.roomId ?? booking.roomid;
        const propertyId = roomId || booking.propertyId;
        if (propertyId) {
          const numAdult = parseInt(booking.numAdult || booking.adults || '0', 10);
          const numChild = parseInt(booking.numChild || booking.children || '0', 10);
          departures.push({
            propertyId: String(propertyId),
            guestCount: numAdult + numChild
          });
        }
      }
    }

    const result: DayBookings = {
      date: targetDate,
      arrivals,
      departures
    };

    console.log(`Result: ${arrivals.length} arrivals, ${departures.length} departures`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in maintenance-bookings:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
