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

      // Parse the response - structure may vary, handle both array and object
      const properties = Array.isArray(apiData) ? apiData : (apiData.data || []);
      
      for (const property of properties) {
        // Each property may have rooms array
        const rooms = property.rooms || [];
        for (const room of rooms) {
          const roomId = room.roomId || room.id;
          const roomName = room.name || room.roomName || property.name;
          if (roomId && roomName) {
            roomNames[String(roomId)] = roomName;
          }
        }
        // Also add the property itself if it has an ID
        const propId = property.propertyId || property.id;
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

      // Create mapping from heat_pump_name to property_id
      const pumpToPropertyMap = new Map<string, string>();
      for (const p of properties) {
        if (p.heat_pump_name) {
          pumpToPropertyMap.set(p.heat_pump_name.toLowerCase().trim(), p.property_id);
        }
      }

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

      // Create mapping from device_name to device_id
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

      // Build mapping from property_id to earliest departure date
      const propertyDepartures = new Map<string, string>(); // property_id -> departure date
      
      for (const booking of bookings) {
        const roomId = String(booking.roomId);
        const departure = booking.departure;
        
        if (!roomId || !departure) continue;
        
        // Check if this property is linked to a heat pump
        if (!pumpToPropertyMap.has(roomId)) {
          // Try matching the property via property_id
          const existing = propertyDepartures.get(roomId);
          if (!existing || departure < existing) {
            propertyDepartures.set(roomId, departure);
          }
        }
      }

      // Also map using property mapping
      for (const booking of bookings) {
        const roomId = String(booking.roomId);
        const departure = booking.departure;
        
        if (!roomId || !departure) continue;
        
        // Store departure per property_id
        const existing = propertyDepartures.get(roomId);
        if (!existing || departure < existing) {
          propertyDepartures.set(roomId, departure);
        }
      }

      // Now update heat_pump_settings with next_checkout_drop_at
      let synced = 0;
      
      for (const [pumpName, propertyId] of pumpToPropertyMap) {
        // Find device_id for this pump
        const deviceId = deviceNameToIdMap.get(pumpName);
        if (!deviceId) {
          console.log(`No device found for pump name: ${pumpName}`);
          continue;
        }

        // Find departure for this property
        const departureDate = propertyDepartures.get(propertyId);
        if (!departureDate) {
          // No upcoming departure, clear any pending checkout drop
          await supabase
            .from('heat_pump_settings')
            .update({ next_checkout_drop_at: null, updated_at: new Date().toISOString() })
            .eq('device_id', deviceId);
          continue;
        }

        // Check if there's also an arrival on the same day (someone checking in = don't drop temp)
        const hasArrivalSameDay = bookings.some((b: { roomId: string; arrival: string }) => 
          String(b.roomId) === propertyId && b.arrival === departureDate
        );

        if (hasArrivalSameDay) {
          console.log(`Property ${propertyId} has same-day turnaround on ${departureDate}, skipping`);
          await supabase
            .from('heat_pump_settings')
            .update({ next_checkout_drop_at: null, updated_at: new Date().toISOString() })
            .eq('device_id', deviceId);
          continue;
        }

        // Calculate the checkout drop timestamp
        const dropDate = new Date(departureDate);
        dropDate.setHours(dropHour, dropMinute, 0, 0);

        // Only set if the drop time is in the future
        if (dropDate > new Date()) {
          console.log(`Setting checkout drop for device ${deviceId} (${pumpName}) at ${dropDate.toISOString()}`);
          
          const { error } = await supabase
            .from('heat_pump_settings')
            .update({
              next_checkout_drop_at: dropDate.toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('device_id', deviceId);

          if (!error) synced++;
        }
      }

      return new Response(JSON.stringify({ 
        success: true, 
        synced,
        bookingsChecked: bookings.length,
        propertiesWithPumps: pumpToPropertyMap.size
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
