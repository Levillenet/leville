import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    
    // Verify admin password
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');
    const viewerPassword = Deno.env.get('VIEWER_PASSWORD');
    
    if (password !== adminPassword && password !== viewerPassword) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const beds24Token = Deno.env.get('BEDS24_API_TOKEN');
    if (!beds24Token) {
      throw new Error('BEDS24_API_TOKEN not configured');
    }

    // Get current date in Helsinki timezone
    const now = new Date();
    const helsinkiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Helsinki' }));
    const today = helsinkiTime.toISOString().split('T')[0];
    const currentHour = helsinkiTime.getHours();

    console.log(`Fetching guests for date: ${today}, current hour: ${currentHour}`);

    // Fetch bookings where arrival <= today AND departure >= today
    const bookingsUrl = `https://beds24.com/api/v2/bookings?arrivalTo=${today}&departureFrom=${today}`;
    
    const response = await fetch(bookingsUrl, {
      headers: {
        'token': beds24Token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Beds24 API error:', errorText);
      throw new Error(`Beds24 API error: ${response.status}`);
    }

    const data = await response.json();
    const bookings = data.data || [];
    
    console.log(`Found ${bookings.length} total bookings`);

    // Filter bookings based on criteria
    const filteredGuests = bookings.filter((booking: any) => {
      // Must have phone or mobile
      const phone = booking.mobile || booking.phone;
      if (!phone) {
        console.log(`Booking ${booking.id}: No phone, skipping`);
        return false;
      }

      // Don't show guests departing today
      if (booking.departure === today) {
        console.log(`Booking ${booking.id}: Departing today, skipping`);
        return false;
      }

      // Don't show guests arriving today before 17:00
      if (booking.arrival === today && currentHour < 17) {
        console.log(`Booking ${booking.id}: Arriving today but before 17:00, skipping`);
        return false;
      }

      // Only show confirmed bookings
      if (booking.status && booking.status !== 'confirmed' && booking.status !== '1') {
        console.log(`Booking ${booking.id}: Status ${booking.status}, skipping`);
        return false;
      }

      return true;
    }).map((booking: any) => ({
      bookingId: booking.id,
      firstName: booking.firstName || '',
      lastName: booking.lastName || '',
      phone: booking.mobile || booking.phone || '',
      apartmentId: String(booking.roomId || booking.propertyId || ''),
      arrival: booking.arrival,
      departure: booking.departure,
    }));

    console.log(`Returning ${filteredGuests.length} filtered guests`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        guests: filteredGuests,
        fetchedAt: new Date().toISOString(),
        currentHour,
        today,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching current guests:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
