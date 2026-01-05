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
