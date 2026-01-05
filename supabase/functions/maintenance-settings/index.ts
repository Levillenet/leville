import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ROOM_NAMES_CACHE_KEY = 'beds24_room_names';
const CACHE_TTL_HOURS = 12;

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const beds24ApiToken = Deno.env.get('BEDS24_API_TOKEN');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, data } = await req.json();

    // Action to fetch room names from Beds24 API (with caching)
    if (action === 'get_room_names') {
      // Check cache first
      const { data: cacheData } = await supabase
        .from('beds24_cache')
        .select('data, fetched_at')
        .eq('id', ROOM_NAMES_CACHE_KEY)
        .maybeSingle();

      const now = new Date();
      const cacheAge = cacheData?.fetched_at 
        ? (now.getTime() - new Date(cacheData.fetched_at).getTime()) / (1000 * 60 * 60)
        : Infinity;

      if (cacheData && cacheAge < CACHE_TTL_HOURS) {
        console.log('Returning cached room names');
        return new Response(JSON.stringify({ roomNames: cacheData.data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Fetch from Beds24 API
      if (!beds24ApiToken) {
        console.error('BEDS24_API_TOKEN not configured');
        return new Response(JSON.stringify({ roomNames: {} }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      console.log('Fetching room names from Beds24 API...');
      const propertiesUrl = 'https://beds24.com/api/v2/properties?includeAllRooms=true';
      const response = await fetch(propertiesUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'token': beds24ApiToken }
      });

      if (!response.ok) {
        console.error('Beds24 properties API error:', response.status);
        return new Response(JSON.stringify({ roomNames: {} }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const apiData = await response.json();
      const roomNames: Record<string, string> = {};

      // Parse the response - Beds24 v2 returns { data: properties[] } or just properties[]
      const properties = Array.isArray(apiData) ? apiData : (apiData.data || []);
      
      for (const property of properties) {
        // Beds24 v2 can include both roomTypes and rooms depending on account/config
        const roomTypes = Array.isArray(property.roomTypes) ? property.roomTypes : [];
        const rooms = Array.isArray(property.rooms) ? property.rooms : [];

        // roomTypes (often used for marketing/public names)
        for (const rt of roomTypes) {
          const name = rt?.name || rt?.roomName;
          const ids = [rt?.id, rt?.roomId].filter(Boolean);
          if (!name) continue;
          for (const id of ids) {
            roomNames[String(id)] = name;
            console.log(`Room: ${id} -> ${name}`);
          }
        }

        // rooms (often contain the actual booking roomId)
        for (const room of rooms) {
          const roomId = room?.roomId || room?.id;
          const roomName = room?.name || room?.roomName || property?.name;
          if (roomId && roomName) {
            roomNames[String(roomId)] = roomName;
            console.log(`Room: ${roomId} -> ${roomName}`);
          }
        }

        // Also add the property itself if it has an ID (for backwards compatibility)
        const propId = property.id || property.propertyId;
        const propName = property.name;
        if (propId && propName) {
          roomNames[String(propId)] = propName;
        }
      }

      console.log(`Fetched ${Object.keys(roomNames).length} room names from Beds24`);

      // Cache the result
      await supabase
        .from('beds24_cache')
        .upsert({
          id: ROOM_NAMES_CACHE_KEY,
          data: roomNames,
          fetched_at: now.toISOString()
        });

      return new Response(JSON.stringify({ roomNames }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'get_settings') {
      const { data: settings, error } = await supabase
        .from('maintenance_settings')
        .select('*');

      if (error) throw error;

      return new Response(JSON.stringify({ settings }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'update_setting') {
      const { id, value } = data;
      
      const { error } = await supabase
        .from('maintenance_settings')
        .upsert({
          id,
          value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Ensure property_maintenance rows exist for master list properties
    if (action === 'ensure_property_maintenance_rows') {
      const { properties: masterProperties } = data;
      
      if (!masterProperties || !Array.isArray(masterProperties)) {
        return new Response(JSON.stringify({ error: 'properties array required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const propertyIds = masterProperties.map((p: { property_id: string }) => p.property_id);
      
      // Get existing property_maintenance rows
      const { data: existingRows } = await supabase
        .from('property_maintenance')
        .select('property_id')
        .in('property_id', propertyIds);

      const existingIds = new Set((existingRows || []).map(r => r.property_id));
      
      // Find missing properties
      const missingProperties = masterProperties.filter(
        (p: { property_id: string }) => !existingIds.has(p.property_id)
      );

      console.log(`Found ${existingIds.size} existing, ${missingProperties.length} missing properties`);

      // Insert missing properties with default values
      if (missingProperties.length > 0) {
        const rowsToInsert = missingProperties.map((p: { 
          property_id: string; 
          max_guests?: number; 
          cleaning_fee?: number; 
          linen_price_per_person?: number 
        }) => ({
          property_id: p.property_id,
          max_guests: p.max_guests || null,
          cleaning_fee: p.cleaning_fee || 0,
          linen_price_per_person: p.linen_price_per_person || 0,
          owner_email: null,
          cleaning_email: null,
          notes: null,
          heat_pump_name: null
        }));

        const { error: insertError } = await supabase
          .from('property_maintenance')
          .insert(rowsToInsert);

        if (insertError) {
          console.error('Error inserting missing properties:', insertError);
          throw insertError;
        }

        console.log(`Inserted ${missingProperties.length} new property_maintenance rows`);
      }

      return new Response(JSON.stringify({ 
        success: true,
        inserted: missingProperties.length,
        missingIds: missingProperties.map((p: { property_id: string }) => p.property_id)
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'get_properties') {
      const { data: properties, error } = await supabase
        .from('property_maintenance')
        .select('*')
        .order('property_id');

      if (error) throw error;

      return new Response(JSON.stringify({ properties }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'update_property') {
      const { property_id, owner_email, cleaning_email, notes } = data;

      const { error } = await supabase
        .from('property_maintenance')
        .upsert({
          property_id,
          owner_email,
          cleaning_email,
          notes,
          updated_at: new Date().toISOString()
        }, { onConflict: 'property_id' });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'bulk_update_properties') {
      const { properties } = data;

      for (const prop of properties) {
        const { error } = await supabase
          .from('property_maintenance')
          .upsert({
            property_id: prop.property_id,
            owner_email: prop.owner_email,
            cleaning_email: prop.cleaning_email,
            notes: prop.notes,
            heat_pump_name: prop.heat_pump_name,
            updated_at: new Date().toISOString()
          }, { onConflict: 'property_id' });

        if (error) {
          console.error(`Error updating property ${prop.property_id}:`, error);
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Heat pump global settings actions
    if (action === 'get_heat_pump_global_settings') {
      const { data: settings, error } = await supabase
        .from('heat_pump_global_settings')
        .select('*')
        .eq('id', 'global')
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ settings }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'update_heat_pump_global_settings') {
      const { checkout_drop_enabled, checkout_drop_temperature, checkout_drop_time } = data;

      const { error } = await supabase
        .from('heat_pump_global_settings')
        .update({
          checkout_drop_enabled,
          checkout_drop_temperature,
          checkout_drop_time,
          updated_at: new Date().toISOString()
        })
        .eq('id', 'global');

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Sync checkout dates from Beds24
    if (action === 'sync_checkout_dates') {
      if (!beds24ApiToken) {
        return new Response(JSON.stringify({ error: 'BEDS24_API_TOKEN not configured' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Get global settings
      const { data: globalSettings } = await supabase
        .from('heat_pump_global_settings')
        .select('*')
        .eq('id', 'global')
        .single();

      if (!globalSettings?.checkout_drop_enabled) {
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Checkout drop is disabled',
          synced: 0 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Get property mappings (heat_pump_name from property_maintenance)
      const { data: properties } = await supabase
        .from('property_maintenance')
        .select('property_id, heat_pump_name')
        .not('heat_pump_name', 'is', null);

      if (!properties || properties.length === 0) {
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'No properties with heat pump mapping',
          synced: 0 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Create mapping from property_id (as string) to heat_pump_name
      const propertyToPumpMap = new Map<string, string>();
      for (const p of properties) {
        if (p.heat_pump_name) {
          // Ensure property_id is always a string for consistent Map key matching
          propertyToPumpMap.set(String(p.property_id), p.heat_pump_name.toLowerCase().trim());
        }
      }
      
      console.log('Property to pump mappings:', Array.from(propertyToPumpMap.entries()));

      // Get heat pump settings (to get device_id from device_name)
      const { data: pumpSettings } = await supabase
        .from('heat_pump_settings')
        .select('device_id, device_name');

      if (!pumpSettings || pumpSettings.length === 0) {
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'No heat pump settings found',
          synced: 0 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Create mapping from device_name (lowercase) to device_id
      const deviceNameToIdMap = new Map<string, number>();
      for (const s of pumpSettings) {
        if (s.device_name) {
          deviceNameToIdMap.set(s.device_name.toLowerCase().trim(), s.device_id);
        }
      }

      // Fetch bookings from Beds24 for the next 14 days
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 14);
      
      const formatDate = (d: Date) => d.toISOString().split('T')[0];
      
      const bookingsUrl = `https://beds24.com/api/v2/bookings?departureFrom=${formatDate(today)}&departureTo=${formatDate(endDate)}`;
      
      console.log('Fetching bookings from Beds24:', bookingsUrl);
      
      const response = await fetch(bookingsUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'token': beds24ApiToken }
      });

      if (!response.ok) {
        console.error('Beds24 bookings API error:', response.status);
        return new Response(JSON.stringify({ error: 'Failed to fetch bookings from Beds24' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const bookingsData = await response.json();
      const bookings = Array.isArray(bookingsData) ? bookingsData : (bookingsData.data || []);
      
      console.log(`Fetched ${bookings.length} bookings from Beds24`);

      // Parse checkout drop time
      const dropTime = globalSettings.checkout_drop_time || '10:00';
      const [dropHour, dropMinute] = dropTime.split(':').map(Number);

      const now = new Date();

      // Build mapping from property_id to earliest FUTURE drop date
      // Key insight: we calculate dropDate immediately and only keep future ones
      const propertyNextDropDate = new Map<string, Date>(); // property_id -> next future drop Date
      const propertyDepartureForDrop = new Map<string, string>(); // property_id -> departure date string (for logging)
      
      for (const booking of bookings) {
        const roomId = String(booking.roomId);
        const departure = booking.departure;
        
        if (!roomId || !departure) continue;
        
        // Calculate drop date for this departure
        const dropDate = new Date(departure);
        dropDate.setHours(dropHour, dropMinute, 0, 0);
        
        // Only consider if drop time is in the future
        if (dropDate <= now) {
          console.log(`Skipping past drop time for roomId ${roomId}: departure ${departure}, dropDate ${dropDate.toISOString()}`);
          continue;
        }
        
        // Store earliest future drop date per property_id
        const existing = propertyNextDropDate.get(roomId);
        if (!existing || dropDate < existing) {
          propertyNextDropDate.set(roomId, dropDate);
          propertyDepartureForDrop.set(roomId, departure);
        }
      }

      console.log('Properties with future drop dates:', 
        Array.from(propertyNextDropDate.entries()).map(([id, d]) => `${id}: ${d.toISOString()}`));

      // Now update heat_pump_settings with next_checkout_drop_at
      let synced = 0;
      const syncResults: Array<{
        propertyId: string;
        pumpName: string;
        deviceId: number | null;
        departure: string | null;
        dropDate: string | null;
        status: string;
      }> = [];
      
      for (const [propertyId, pumpName] of propertyToPumpMap) {
        // Find device_id for this pump (case-insensitive match)
        const deviceId = deviceNameToIdMap.get(pumpName);
        if (!deviceId) {
          console.log(`No device found for pump name: ${pumpName} (property ${propertyId})`);
          syncResults.push({
            propertyId,
            pumpName,
            deviceId: null,
            departure: null,
            dropDate: null,
            status: 'no_device_found'
          });
          continue;
        }

        // Find next future drop date for this property
        const nextDropDate = propertyNextDropDate.get(propertyId);
        const departureDate = propertyDepartureForDrop.get(propertyId);
        
        if (!nextDropDate) {
          // No upcoming future drop, clear any pending checkout drop
          console.log(`No future drop for property ${propertyId}, clearing next_checkout_drop_at for device ${deviceId}`);
          await supabase
            .from('heat_pump_settings')
            .update({ next_checkout_drop_at: null, updated_at: new Date().toISOString() })
            .eq('device_id', deviceId);
          syncResults.push({
            propertyId,
            pumpName,
            deviceId,
            departure: null,
            dropDate: null,
            status: 'cleared_no_future_drop'
          });
          continue;
        }

        // Set the checkout drop
        console.log(`Setting checkout drop for device ${deviceId} (${pumpName}) at ${nextDropDate.toISOString()} (departure: ${departureDate}) for property ${propertyId}`);
        
        const { error } = await supabase
          .from('heat_pump_settings')
          .update({
            next_checkout_drop_at: nextDropDate.toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('device_id', deviceId);

        if (!error) {
          synced++;
          syncResults.push({
            propertyId,
            pumpName,
            deviceId,
            departure: departureDate || null,
            dropDate: nextDropDate.toISOString(),
            status: 'synced'
          });
        } else {
          console.error(`Error updating device ${deviceId}:`, error);
          syncResults.push({
            propertyId,
            pumpName,
            deviceId,
            departure: departureDate || null,
            dropDate: nextDropDate.toISOString(),
            status: `error: ${error.message}`
          });
        }
      }

      // Debug info
      console.log('Sync results:', syncResults);

      return new Response(JSON.stringify({ 
        success: true, 
        synced,
        bookingsChecked: bookings.length,
        propertiesWithPumps: propertyToPumpMap.size,
        results: syncResults
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in maintenance-settings:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
