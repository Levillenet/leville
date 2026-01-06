import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingInfo {
  propertyId: string;
  guestCount: number;
  channel: string;
}

interface PropertyMaintenance {
  property_id: string;
  cleaning_email: string | null;
  linen_price_per_person: number;
}

interface PropertySettings {
  property_id: string;
  marketing_name: string | null;
}

// Helper to get current time in Helsinki timezone
function getHelsinkiTime(): { hours: number; minutes: number } {
  const now = new Date();
  const helsinkiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Helsinki' }));
  return {
    hours: helsinkiTime.getHours(),
    minutes: helsinkiTime.getMinutes()
  };
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const beds24ApiToken = Deno.env.get('BEDS24_API_TOKEN');

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }
    if (!beds24ApiToken) {
      throw new Error('BEDS24_API_TOKEN not configured');
    }

    const resend = new Resend(resendApiKey);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { preview, targetDate: customDate, cronCheck } = await req.json().catch(() => ({}));

    // If this is a cron check, verify if it's the right time to send
    if (cronCheck) {
      // Fetch worklist settings
      const { data: enabledSetting } = await supabase
        .from('maintenance_settings')
        .select('value')
        .eq('id', 'worklist_enabled')
        .maybeSingle();
      
      const { data: timeSetting } = await supabase
        .from('maintenance_settings')
        .select('value')
        .eq('id', 'worklist_send_time')
        .maybeSingle();

      const isEnabled = enabledSetting?.value === true || enabledSetting?.value === 'true';
      const sendTime = timeSetting?.value || '19:00';

      if (!isEnabled) {
        console.log('Worklist sending is disabled, skipping');
        return new Response(JSON.stringify({ skipped: true, reason: 'disabled' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Parse configured time
      const [configHours, configMinutes] = sendTime.split(':').map(Number);
      const helsinkiTime = getHelsinkiTime();

      console.log(`Cron check: Helsinki time ${helsinkiTime.hours}:${helsinkiTime.minutes}, configured time ${configHours}:${configMinutes}`);

      // Check if current time matches configured time (exact minute match)
      if (helsinkiTime.hours !== configHours || helsinkiTime.minutes !== configMinutes) {
        console.log('Not the right time, skipping');
        return new Response(JSON.stringify({ skipped: true, reason: 'not_scheduled_time' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      console.log('Time matches! Proceeding with worklist send');
    }

    // Calculate target date (tomorrow for evening sends, or custom date for preview)
    const now = new Date();
    const targetDate = customDate || new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    console.log(`Processing worklist for date: ${targetDate}, preview: ${preview}`);

    // Fetch bookings for target date from Beds24 v2 API
    const apiHeaders = {
      'Content-Type': 'application/json',
      'token': beds24ApiToken
    };

    const arrivalsUrl = `https://beds24.com/api/v2/bookings?arrivalFrom=${targetDate}&arrivalTo=${targetDate}`;
    const departuresUrl = `https://beds24.com/api/v2/bookings?departureFrom=${targetDate}&departureTo=${targetDate}`;

    console.log('Fetching arrivals from:', arrivalsUrl);
    console.log('Fetching departures from:', departuresUrl);

    const [arrivalsResponse, departuresResponse] = await Promise.all([
      fetch(arrivalsUrl, { method: 'GET', headers: apiHeaders }),
      fetch(departuresUrl, { method: 'GET', headers: apiHeaders })
    ]);

    if (!arrivalsResponse.ok) {
      console.error('Arrivals API error:', arrivalsResponse.status, await arrivalsResponse.text());
      throw new Error(`Beds24 arrivals API error: ${arrivalsResponse.status}`);
    }
    if (!departuresResponse.ok) {
      console.error('Departures API error:', departuresResponse.status, await departuresResponse.text());
      throw new Error(`Beds24 departures API error: ${departuresResponse.status}`);
    }

    const arrivalsData = await arrivalsResponse.json();
    const departuresData = await departuresResponse.json();

    // Don't log full response (contains PII), just counts
    const arrivalsArray = arrivalsData.data || arrivalsData || [];
    const departuresArray = departuresData.data || departuresData || [];
    console.log(`Arrivals count: ${Array.isArray(arrivalsArray) ? arrivalsArray.length : 0}`);
    console.log(`Departures count: ${Array.isArray(departuresArray) ? departuresArray.length : 0}`);

    // Fetch Beds24 room names from cache
    const { data: roomNamesCache } = await supabase
      .from('beds24_cache')
      .select('data')
      .eq('id', 'beds24_room_names')
      .maybeSingle();

    const beds24RoomNames: Record<string, string> = roomNamesCache?.data || {};

    // Helper to get channel name from apiSource
    const getChannelName = (apiSource: string | undefined): string => {
      if (!apiSource) return '';
      const source = apiSource.toLowerCase();
      if (source === 'booking' || source.includes('booking')) return 'Booking.com';
      if (source === 'airbnb' || source.includes('airbnb')) return 'Airbnb';
      if (source === 'direct' || source === 'bookingpage') return 'Suora varaus';
      if (source === 'expedia' || source.includes('expedia')) return 'Expedia';
      if (source === 'vrbo' || source.includes('vrbo')) return 'VRBO';
      return apiSource; // Return as-is if unknown
    };

    // Process bookings - IMPORTANT: Use roomId (our apartment ID) not propertyId (Beds24 internal ID)
    const arrivals: BookingInfo[] = [];
    if (Array.isArray(arrivalsArray)) {
      for (const booking of arrivalsArray) {
        // roomId is our apartment ID, propertyId is Beds24's internal property ID
        const roomId = booking.roomId ?? booking.roomid;
        const propertyId = roomId || booking.propertyId;
        if (propertyId) {
          arrivals.push({
            propertyId: String(propertyId),
            guestCount: (parseInt(booking.numAdult || '0', 10) || 0) + (parseInt(booking.numChild || '0', 10) || 0),
            channel: getChannelName(booking.apiSource)
          });
        }
      }
    }

    const departures: BookingInfo[] = [];
    if (Array.isArray(departuresArray)) {
      for (const booking of departuresArray) {
        const roomId = booking.roomId ?? booking.roomid;
        const propertyId = roomId || booking.propertyId;
        if (propertyId) {
          departures.push({
            propertyId: String(propertyId),
            guestCount: (parseInt(booking.numAdult || '0', 10) || 0) + (parseInt(booking.numChild || '0', 10) || 0),
            channel: getChannelName(booking.apiSource)
          });
        }
      }
    }

    console.log(`Found ${arrivals.length} arrivals and ${departures.length} departures`);

    // Fetch property maintenance data
    const { data: maintenanceData, error: maintenanceError } = await supabase
      .from('property_maintenance')
      .select('property_id, cleaning_email, linen_price_per_person');

    if (maintenanceError) {
      throw new Error(`Failed to fetch maintenance data: ${maintenanceError.message}`);
    }

    // Fetch property names from property_settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('property_settings')
      .select('property_id, marketing_name');

    if (settingsError) {
      throw new Error(`Failed to fetch settings data: ${settingsError.message}`);
    }

    // Create lookup maps
    const maintenanceMap = new Map<string, PropertyMaintenance>();
    for (const m of (maintenanceData || [])) {
      maintenanceMap.set(m.property_id, m);
    }

    const nameMap = new Map<string, string>();
    for (const s of (settingsData || [])) {
      if (s.marketing_name) {
        nameMap.set(s.property_id, s.marketing_name);
      }
    }

    // Helper to get property name with fallback to Beds24 API names
    const getPropertyName = (propertyId: string): string => {
      return nameMap.get(propertyId) || beds24RoomNames[propertyId] || `ID: ${propertyId}`;
    };

    // Group by cleaning email
    const emailGroups = new Map<string, { arrivals: Array<{name: string, id: string, guests: number, channel: string}>, departures: Array<{name: string, id: string, guests: number, channel: string}> }>();

    for (const arrival of arrivals) {
      const maintenance = maintenanceMap.get(arrival.propertyId);
      const cleaningEmail = maintenance?.cleaning_email || 'info@leville.net';
      const propertyName = getPropertyName(arrival.propertyId);

      if (!emailGroups.has(cleaningEmail)) {
        emailGroups.set(cleaningEmail, { arrivals: [], departures: [] });
      }
      emailGroups.get(cleaningEmail)!.arrivals.push({
        name: propertyName,
        id: arrival.propertyId,
        guests: arrival.guestCount,
        channel: arrival.channel
      });
    }

    for (const departure of departures) {
      const maintenance = maintenanceMap.get(departure.propertyId);
      const cleaningEmail = maintenance?.cleaning_email || 'info@leville.net';
      const propertyName = getPropertyName(departure.propertyId);

      if (!emailGroups.has(cleaningEmail)) {
        emailGroups.set(cleaningEmail, { arrivals: [], departures: [] });
      }
      emailGroups.get(cleaningEmail)!.departures.push({
        name: propertyName,
        id: departure.propertyId,
        guests: departure.guestCount,
        channel: departure.channel
      });
    }

    // Format date for display
    const displayDate = new Date(targetDate).toLocaleDateString('fi-FI', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });

    // Generate and send emails
    const emailsSent: string[] = [];
    const previewData: Array<{ email: string, subject: string, html: string }> = [];

    for (const [email, data] of emailGroups) {
      if (data.arrivals.length === 0 && data.departures.length === 0) continue;

      const totalLinens = data.arrivals.reduce((sum, a) => sum + a.guests, 0);

      let html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a2e; border-bottom: 2px solid #4361ee;">Työlistat ${displayDate}</h1>
          <p style="color: #666;">Leville Oy</p>
      `;

      if (data.departures.length > 0) {
        html += `
          <h2 style="color: #dc2626; margin-top: 24px;">🧹 LÄHTEVÄT (siivottavat)</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #fee2e2;">
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Huoneisto</th>
              </tr>
            </thead>
            <tbody>
        `;
        for (const dep of data.departures) {
          html += `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">${dep.name} <span style="color: #999; font-size: 11px;">(${dep.id})</span></td>
            </tr>
          `;
        }
        html += `</tbody></table>`;
      }

      if (data.arrivals.length > 0) {
        html += `
          <h2 style="color: #16a34a; margin-top: 24px;">🏠 SAAPUVAT (valmisteltavat)</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #dcfce7;">
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Huoneisto</th>
                <th style="padding: 8px; text-align: center; border: 1px solid #ddd;">Kanava</th>
                <th style="padding: 8px; text-align: center; border: 1px solid #ddd;">Henkilömäärä</th>
                <th style="padding: 8px; text-align: center; border: 1px solid #ddd;">Liinavaatteet</th>
              </tr>
            </thead>
            <tbody>
        `;
        for (const arr of data.arrivals) {
          const channelNote = arr.channel === 'Suora varaus' ? `${arr.channel} <span style="color: #ea580c; font-size: 11px;">(tarkista henkilömäärä Moderista)</span>` : arr.channel;
          html += `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">${arr.name} <span style="color: #999; font-size: 11px;">(${arr.id})</span></td>
              <td style="padding: 8px; text-align: center; border: 1px solid #ddd;">${channelNote}</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #ddd;">${arr.guests} hlö</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #ddd;">${arr.guests} settiä</td>
            </tr>
          `;
        }
        html += `</tbody></table>`;

        html += `
          <div style="margin-top: 16px; padding: 12px; background: #f0fdf4; border-radius: 8px;">
            <strong>Yhteensä liinavaatteita: ${totalLinens} settiä</strong>
          </div>
        `;
      }

      html += `
          <p style="margin-top: 32px; color: #999; font-size: 12px;">
            Tämä viesti on lähetetty automaattisesti Leville-järjestelmästä.
          </p>
        </div>
      `;

      const subject = `Työlistat ${displayDate} - Leville`;

      if (preview) {
        previewData.push({ email, subject, html });
      } else {
        // Send email
        try {
          await resend.emails.send({
            from: 'Leville <admin@m.leville.net>',
            to: [email],
            subject,
            html
          });
          emailsSent.push(email);
          console.log(`Email sent to ${email}`);
        } catch (emailError) {
          console.error(`Failed to send to ${email}:`, emailError);
        }
      }
    }

    // Update last sent timestamp if not preview
    if (!preview && emailsSent.length > 0) {
      await supabase
        .from('maintenance_settings')
        .upsert({
          id: 'last_worklist_sent',
          value: { timestamp: new Date().toISOString() },
          updated_at: new Date().toISOString()
        });
    }

    const response = preview 
      ? { preview: true, emails: previewData, arrivals: arrivals.length, departures: departures.length }
      : { success: true, emailsSent, arrivals: arrivals.length, departures: departures.length };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in send-worklist:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
