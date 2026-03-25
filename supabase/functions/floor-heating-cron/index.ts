import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://leville.net',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HomeyTokens {
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

interface DeviceCapability {
  value: unknown;
}

interface FloorHeatingDevice {
  id: string;
  name: string;
  homeyId?: string;
  homeyName?: string;
  capabilitiesObj: Record<string, DeviceCapability>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Floor heating cron: Starting temperature recording...');

    // Call homey-api to get floor heating devices
    const { data, error } = await supabase.functions.invoke('homey-api', {
      body: { action: 'getFloorHeatingDevices' }
    });

    if (error) {
      console.error('Error fetching floor heating devices:', error);
      throw error;
    }

    if (data.needsAuth) {
      console.log('Homey not authenticated, skipping recording');
      return new Response(
        JSON.stringify({ success: false, message: 'Homey not authenticated' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const devices = data.devices as FloorHeatingDevice[] || [];
    console.log(`Found ${devices.length} floor heating devices to record`);

    if (devices.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No devices to record', recorded: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record temperature data for each device
    const records = [];
    for (const device of devices) {
      const airTemp = device.capabilitiesObj['measure_temperature']?.value as number | null;
      const floorTemp = device.capabilitiesObj['measure_temperature.floor']?.value as number | null;
      const targetTemp = device.capabilitiesObj['target_temperature']?.value as number | null;
      const powerOn = device.capabilitiesObj['onoff']?.value as boolean ?? true;

      // Extract apartment code from device name (first 2 characters)
      const apartmentCode = device.name.substring(0, 2).toUpperCase();

      records.push({
        device_id: device.id,
        device_name: device.name,
        apartment_code: apartmentCode,
        homey_id: device.homeyId || 'unknown',
        homey_name: device.homeyName || 'Unknown',
        air_temperature: airTemp,
        floor_temperature: floorTemp,
        target_temperature: targetTemp,
        power_on: powerOn,
      });
    }

    // Insert all records
    const { error: insertError } = await supabase
      .from('floor_heating_history')
      .insert(records);

    if (insertError) {
      console.error('Error inserting floor heating history:', insertError);
      throw insertError;
    }

    console.log(`Successfully recorded ${records.length} floor heating data points`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Recorded ${records.length} data points`,
        recorded: records.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in floor-heating-cron:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
