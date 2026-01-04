import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

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

    // Fetch arrivals for the target date
    const arrivalsUrl = `https://api.beds24.com/json/getBookings`;
    const arrivalsBody = {
      authentication: { apiKey: apiToken },
      arrivalFrom: targetDate,
      arrivalTo: targetDate,
      includeInvoice: false,
      includePriceDetails: false
    };

    console.log('Fetching arrivals...');
    const arrivalsResponse = await fetch(arrivalsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arrivalsBody)
    });

    if (!arrivalsResponse.ok) {
      throw new Error(`Beds24 arrivals API error: ${arrivalsResponse.status}`);
    }

    const arrivalsData = await arrivalsResponse.json();
    console.log(`Arrivals response:`, JSON.stringify(arrivalsData).substring(0, 500));

    // Fetch departures for the target date
    const departuresBody = {
      authentication: { apiKey: apiToken },
      departureFrom: targetDate,
      departureTo: targetDate,
      includeInvoice: false,
      includePriceDetails: false
    };

    console.log('Fetching departures...');
    const departuresResponse = await fetch(arrivalsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(departuresBody)
    });

    if (!departuresResponse.ok) {
      throw new Error(`Beds24 departures API error: ${departuresResponse.status}`);
    }

    const departuresData = await departuresResponse.json();
    console.log(`Departures response:`, JSON.stringify(departuresData).substring(0, 500));

    // Process arrivals - extract only propertyId and guestCount (no personal data)
    const arrivals: BookingInfo[] = [];
    if (Array.isArray(arrivalsData)) {
      for (const booking of arrivalsData) {
        if (booking.roomId) {
          const numAdult = parseInt(booking.numAdult || '0', 10);
          const numChild = parseInt(booking.numChild || '0', 10);
          arrivals.push({
            propertyId: String(booking.roomId),
            guestCount: numAdult + numChild
          });
        }
      }
    }

    // Process departures
    const departures: BookingInfo[] = [];
    if (Array.isArray(departuresData)) {
      for (const booking of departuresData) {
        if (booking.roomId) {
          const numAdult = parseInt(booking.numAdult || '0', 10);
          const numChild = parseInt(booking.numChild || '0', 10);
          departures.push({
            propertyId: String(booking.roomId),
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
