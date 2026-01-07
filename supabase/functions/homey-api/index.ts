import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HomeyTokens {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  token_type?: string;
}

interface DeviceCapability {
  id: string;
  title: string;
  type: string;
  getable: boolean;
  setable: boolean;
  value: unknown;
}

interface HomeyDevice {
  id: string;
  name: string;
  zone: { id: string; name: string };
  class: string;
  capabilities: string[];
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

    // Get stored tokens
    const { data: tokenData, error: tokenError } = await supabase
      .from('site_settings')
      .select('value')
      .eq('id', 'homey_tokens')
      .single();

    if (tokenError || !tokenData) {
      console.error('No Homey tokens found:', tokenError);
      return new Response(
        JSON.stringify({ 
          error: 'Homey ei ole yhdistetty', 
          needsAuth: true,
          authUrl: buildAuthUrl()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const tokens = tokenData.value as HomeyTokens;
    
    // Check if token is expired
    if (new Date(tokens.expires_at) <= new Date()) {
      console.log('Token expired, attempting refresh...');
      const refreshedTokens = await refreshToken(tokens.refresh_token, supabaseUrl, supabaseServiceKey);
      if (!refreshedTokens) {
        return new Response(
          JSON.stringify({ 
            error: 'Token refresh failed', 
            needsAuth: true,
            authUrl: buildAuthUrl()
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        );
      }
      tokens.access_token = refreshedTokens.access_token;
    }

    const { action, deviceId, capability, value } = await req.json();

    switch (action) {
      case 'getDevices':
        return await getDevices(tokens.access_token);
      
      case 'getFloorHeatingDevices':
        return await getFloorHeatingDevices(tokens.access_token);
      
      case 'setCapability':
        return await setDeviceCapability(tokens.access_token, deviceId, capability, value);
      
      case 'getHomeys':
        return await getHomeys(tokens.access_token);
      
      case 'logout':
        // Delete stored tokens to force re-authentication
        await supabase
          .from('site_settings')
          .delete()
          .eq('id', 'homey_tokens');
        
        console.log('Homey tokens deleted, user needs to re-authenticate');
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Logged out from Homey',
            authUrl: buildAuthUrl()
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }

  } catch (error: unknown) {
    console.error('Error in homey-api:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

function buildAuthUrl(): string {
  const clientId = Deno.env.get('HOMEY_CLIENT_ID');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const redirectUri = `${supabaseUrl}/functions/v1/homey-callback`;
  const scopes = 'homey.zone.readonly,homey.device.readonly,homey.device.control';
  
  return `https://api.athom.com/oauth2/authorise?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scopes=${scopes}`;
}

async function refreshToken(refreshTokenValue: string, supabaseUrl: string, supabaseServiceKey: string): Promise<HomeyTokens | null> {
  try {
    const clientId = Deno.env.get('HOMEY_CLIENT_ID');
    const clientSecret = Deno.env.get('HOMEY_CLIENT_SECRET');

    const response = await fetch('https://api.athom.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshTokenValue,
        client_id: clientId!,
        client_secret: clientSecret!,
      }),
    });

    if (!response.ok) {
      console.error('Token refresh failed:', await response.text());
      return null;
    }

    const data = await response.json();
    const expiresAt = new Date(Date.now() + (data.expires_in * 1000)).toISOString();

    const newTokens: HomeyTokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token || refreshTokenValue,
      expires_at: expiresAt,
      token_type: data.token_type,
    };

    // Update stored tokens
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    await supabaseClient
      .from('site_settings')
      .upsert({
        id: 'homey_tokens',
        value: newTokens,
        updated_at: new Date().toISOString(),
      } as Record<string, unknown>, { onConflict: 'id' });

    return newTokens;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

async function getHomeys(accessToken: string): Promise<Response> {
  // First get user info to find Homey ID
  const meResponse = await fetch('https://api.athom.com/user/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (!meResponse.ok) {
    throw new Error('Failed to get user info');
  }

  const userData = await meResponse.json();
  console.log('User data:', JSON.stringify(userData, null, 2));

  // Get list of Homeys
  const homeysResponse = await fetch('https://api.athom.com/homey', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (!homeysResponse.ok) {
    throw new Error('Failed to get Homeys');
  }

  const homeys = await homeysResponse.json();
  console.log('Homeys:', JSON.stringify(homeys, null, 2));

  return new Response(
    JSON.stringify({ user: userData, homeys }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Helpers

type HomeyInfo = {
  id: string;
  remoteUrl?: string | null;
};

function getHomeyBaseUrl(homey: HomeyInfo): string {
  const remote = typeof homey.remoteUrl === 'string' && homey.remoteUrl.length > 0
    ? homey.remoteUrl
    : null;

  // In cloud environments, prefer remoteUrl (homeypro.net)
  if (remote) return remote.replace(/\/$/, '');

  // Fallback: Cloud Relay (may work for some setups)
  return `https://${homey.id}.connect.athom.com`;
}

// Step 2 — Obtain a Delegation Token (JWT, audience=homey)
async function getDelegationToken(accessToken: string): Promise<string> {
  console.log('Getting delegation token...');

  const response = await fetch('https://api.athom.com/delegation/token?audience=homey', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to get delegation token:', response.status, error);
    throw new Error(`Failed to get delegation token: ${response.status}`);
  }

  // Returns a JSON string, e.g. "abc..."
  const delegationToken = (await response.json()) as string;
  const cleaned = delegationToken.trim();

  console.log('Got delegation token successfully');
  return cleaned;
}

// Step 3 — Creating a Session on Homey (returns session token string)
async function getHomeySessionToken(homeyBaseUrl: string, delegationToken: string): Promise<string> {
  console.log('Logging in to Homey...');

  const loginUrl = `${homeyBaseUrl}/api/manager/users/login`;

  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ token: delegationToken.trim() }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to login to Homey:', response.status, error);
    throw new Error(`Failed to login to Homey: ${response.status}`);
  }

  // Returns a JSON string, e.g. "abc..."
  const sessionToken = (await response.json()) as string;
  const cleaned = sessionToken.trim();

  console.log('Logged in to Homey successfully');
  return cleaned;
}

async function getDevices(accessToken: string): Promise<Response> {
  // Step 1: Get ALL Homeys from Athom Cloud
  const homeysResponse = await fetch('https://api.athom.com/homey', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (!homeysResponse.ok) {
    throw new Error('Failed to get Homeys');
  }

  const homeys = await homeysResponse.json();

  if (!homeys || homeys.length === 0) {
    return new Response(
      JSON.stringify({ devices: [], homeys: [], message: 'No Homeys found' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  console.log(`Found ${homeys.length} Homey(s):`, homeys.map((h: HomeyInfo & { name?: string }) => h.name || h.id));

  // Collect devices from ALL Homeys
  const allDevices: Record<string, unknown> = {};
  const homeyInfos: { id: string; name: string }[] = [];

  for (const homey of homeys) {
    try {
      const homeyName = (homey as { name?: string }).name || homey.id;
      console.log(`Fetching devices from ${homeyName}...`);
      
      const homeyBaseUrl = getHomeyBaseUrl(homey);
      console.log('Using Homey base URL:', homeyBaseUrl);

      // Get delegation token for this Homey
      const delegationToken = await getDelegationToken(accessToken);

      // Login to Homey and get session token
      const sessionToken = await getHomeySessionToken(homeyBaseUrl, delegationToken);

      // Get devices using session token
      const devicesResponse = await fetch(`${homeyBaseUrl}/api/manager/devices/device`, {
        headers: { 'Authorization': `Bearer ${sessionToken}` },
      });

      if (!devicesResponse.ok) {
        const errorText = await devicesResponse.text();
        console.error(`Failed to get devices from ${homeyName}:`, devicesResponse.status, errorText);
        continue; // Skip this Homey but continue with others
      }

      const devices = await devicesResponse.json();
      const deviceCount = Object.keys(devices).length;
      console.log(`Found ${deviceCount} devices from ${homeyName}`);

      // Add homey info to each device and merge into allDevices
      for (const [id, device] of Object.entries(devices)) {
        allDevices[id] = {
          ...(device as object),
          homeyId: homey.id,
          homeyName: homeyName,
        };
      }

      homeyInfos.push({ id: homey.id, name: homeyName });
    } catch (error) {
      console.error(`Error fetching devices from Homey ${homey.id}:`, error);
      // Continue with other Homeys
    }
  }

  console.log(`Total devices from all Homeys: ${Object.keys(allDevices).length}`);

  return new Response(
    JSON.stringify({ devices: allDevices, homeys: homeyInfos }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function getFloorHeatingDevices(accessToken: string): Promise<Response> {
  // First get all devices from all Homeys
  const devicesResult = await getDevices(accessToken);
  const devicesData = await devicesResult.json();
  
  if (!devicesData.devices) {
    return new Response(
      JSON.stringify({ devices: [], homeys: [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Filter for thermostat/floor heating devices
  interface DeviceWithHomey extends HomeyDevice {
    homeyId?: string;
    homeyName?: string;
  }
  
  const floorHeatingDevices: DeviceWithHomey[] = [];
  
  for (const [id, device] of Object.entries(devicesData.devices as Record<string, DeviceWithHomey>)) {
    const capabilities = device.capabilities || [];
    
    // Check if device has thermostat-like capabilities
    const hasTargetTemp = capabilities.includes('target_temperature');
    const hasMeasureTemp = capabilities.includes('measure_temperature');
    
    // Also check for specific thermostat classes
    const isThermostat = device.class === 'thermostat' || 
                         device.class === 'heater' ||
                         capabilities.includes('thermostat_mode');
    
    if ((hasTargetTemp || hasMeasureTemp) && (isThermostat || hasTargetTemp)) {
      floorHeatingDevices.push({
        id,
        name: device.name,
        zone: device.zone,
        class: device.class,
        capabilities: capabilities,
        capabilitiesObj: device.capabilitiesObj || {},
        homeyId: device.homeyId,
        homeyName: device.homeyName,
      });
    }
  }

  console.log(`Found ${floorHeatingDevices.length} floor heating/thermostat devices from ${devicesData.homeys?.length || 1} Homey(s)`);

  return new Response(
    JSON.stringify({ 
      devices: floorHeatingDevices,
      homeys: devicesData.homeys || []
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function setDeviceCapability(
  accessToken: string, 
  deviceId: string, 
  capability: string, 
  value: unknown,
  targetHomeyId?: string
): Promise<Response> {
  // Step 1: Get all Homeys
  const homeysResponse = await fetch('https://api.athom.com/homey', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (!homeysResponse.ok) {
    throw new Error('Failed to get Homeys');
  }

  const homeys = await homeysResponse.json();
  
  if (!homeys || homeys.length === 0) {
    throw new Error('No Homeys found');
  }

  // Find the correct Homey (by ID if provided, otherwise try first)
  let homey: HomeyInfo | undefined;
  
  if (targetHomeyId) {
    homey = homeys.find((h: HomeyInfo) => h.id === targetHomeyId);
  }
  
  if (!homey) {
    // Fallback: try all Homeys to find the device
    for (const h of homeys) {
      try {
        const hInfo = h as HomeyInfo;
        const baseUrl = getHomeyBaseUrl(hInfo);
        const delToken = await getDelegationToken(accessToken);
        const sessToken = await getHomeySessionToken(baseUrl, delToken);
        
        // Check if device exists on this Homey
        const checkResponse = await fetch(`${baseUrl}/api/manager/devices/device/${deviceId}`, {
          headers: { 'Authorization': `Bearer ${sessToken}` },
        });
        
        if (checkResponse.ok) {
          homey = hInfo;
          break;
        }
      } catch {
        continue;
      }
    }
  }
  
  if (!homey) {
    homey = homeys[0] as HomeyInfo;
  }

  const homeyBaseUrl = getHomeyBaseUrl(homey);
  console.log(`Setting ${capability} to ${value} on device ${deviceId} via ${homeyBaseUrl}`);

  // Step 2: Get delegation token
  const delegationToken = await getDelegationToken(accessToken);

  // Step 3: Login to Homey and get session token
  const sessionToken = await getHomeySessionToken(homeyBaseUrl, delegationToken);

  // Step 4: Set capability using session token
  const setResponse = await fetch(
    `${homeyBaseUrl}/api/manager/devices/device/${deviceId}/capability/${capability}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    }
  );

  if (!setResponse.ok) {
    const errorText = await setResponse.text();
    console.error('Failed to set capability:', setResponse.status, errorText);
    throw new Error(`Failed to set capability: ${errorText}`);
  }

  return new Response(
    JSON.stringify({ success: true, deviceId, capability, value }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
