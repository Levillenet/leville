import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://leville.net',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HomeyToken {
  homeyId: string;
  homeyName: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
  token_type?: string;
}

interface StoredTokens {
  tokens: HomeyToken[];
}

// Legacy format for migration
interface LegacyTokens {
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
  settings?: Record<string, unknown>;
}

// Retry helper with exponential backoff for rate limiting (429)
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options);
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, attempt + 1) * 1000;
      console.log(`Rate limited (429), waiting ${waitMs}ms before retry ${attempt + 1}/${maxRetries}`);
      await new Promise(resolve => setTimeout(resolve, waitMs));
      continue;
    }
    return response;
  }
  throw lastError || new Error('Max retries exceeded due to rate limiting');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

const body = await req.json();
    const { action, deviceId, capability, value, targetHomeyId, homeyIdToRemove, settings, deviceIds } = body;

    // Handle actions that don't need tokens first
    if (action === 'addHomey') {
      return new Response(
        JSON.stringify({ authUrl: buildAuthUrl() }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get stored tokens
    const { data: tokenData, error: tokenError } = await supabase
      .from('site_settings')
      .select('value')
      .eq('id', 'homey_tokens')
      .single();

    // Parse tokens - handle both old and new format
    let tokens: HomeyToken[] = [];
    
    if (tokenData?.value) {
      const value = tokenData.value as Record<string, unknown>;
      if (value.tokens && Array.isArray(value.tokens)) {
        tokens = value.tokens as HomeyToken[];
      } else if (value.access_token) {
        // Legacy format - can't use without homeyId
        console.log('Found legacy token format, requires re-authentication');
      }
    }

    // Handle getConnectedHomeys - return list even if empty
    if (action === 'getConnectedHomeys') {
      return new Response(
        JSON.stringify({ 
          homeys: tokens.map(t => ({ id: t.homeyId, name: t.homeyName, expires_at: t.expires_at })),
          count: tokens.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle removeHomey
    if (action === 'removeHomey' && homeyIdToRemove) {
      const updatedTokens = tokens.filter(t => t.homeyId !== homeyIdToRemove);
      
      await supabase
        .from('site_settings')
        .upsert({
          id: 'homey_tokens',
          value: { tokens: updatedTokens } as StoredTokens,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Homey removed',
          remainingCount: updatedTokens.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle logout - clear all tokens
    if (action === 'logout') {
      await supabase
        .from('site_settings')
        .delete()
        .eq('id', 'homey_tokens');
      
      console.log('All Homey tokens deleted');
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Logged out from all Homeys',
          authUrl: buildAuthUrl()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For other actions, we need at least one token
    if (tokens.length === 0) {
      console.error('No Homey tokens found');
      return new Response(
        JSON.stringify({ 
          error: 'Homey ei ole yhdistetty', 
          needsAuth: true,
          authUrl: buildAuthUrl()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Refresh expired tokens
    for (let i = 0; i < tokens.length; i++) {
      if (new Date(tokens[i].expires_at) <= new Date()) {
        console.log(`Token expired for ${tokens[i].homeyName}, attempting refresh...`);
        const refreshed = await refreshToken(tokens[i], supabaseUrl, supabaseServiceKey);
        if (refreshed) {
          tokens[i] = refreshed;
        } else {
          console.error(`Failed to refresh token for ${tokens[i].homeyName}`);
        }
      }
    }

    switch (action) {
      case 'getDevices':
        return await getDevices(tokens);
      
      case 'getFloorHeatingDevices':
        return await getFloorHeatingDevices(tokens);
      
      case 'setCapability':
        console.log('setCapability called with:', { deviceId, capability, value, targetHomeyId });
        return await setDeviceCapability(tokens, deviceId, capability, value, targetHomeyId);
      
      case 'getHomeys':
        return await getHomeys(tokens);
      
      case 'setDeviceSettings':
        console.log('setDeviceSettings called with:', { deviceId, settings, targetHomeyId });
        return await setDeviceSettings(tokens, deviceId, settings || {}, targetHomeyId);
      
      case 'bulkSetSettings':
        console.log('bulkSetSettings called with:', { deviceIds, settings });
        return await bulkSetDeviceSettings(tokens, deviceIds || [], settings || {});
      
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
  // Added homey.device.control.settings for Z-Wave device settings modification
  const scopes = 'homey.zone.readonly,homey.device.readonly,homey.device.control,homey.device.control.settings';
  
  return `https://api.athom.com/oauth2/authorise?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scopes=${scopes}`;
}

async function refreshToken(token: HomeyToken, supabaseUrl: string, supabaseServiceKey: string): Promise<HomeyToken | null> {
  try {
    const clientId = Deno.env.get('HOMEY_CLIENT_ID');
    const clientSecret = Deno.env.get('HOMEY_CLIENT_SECRET');

    const response = await fetch('https://api.athom.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
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

    const refreshedToken: HomeyToken = {
      ...token,
      access_token: data.access_token,
      refresh_token: data.refresh_token || token.refresh_token,
      expires_at: expiresAt,
      token_type: data.token_type,
    };

    // Update stored tokens
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: existingData } = await supabaseClient
      .from('site_settings')
      .select('value')
      .eq('id', 'homey_tokens')
      .single();

    if (existingData?.value) {
      const stored = existingData.value as StoredTokens;
      if (stored.tokens) {
        const updatedTokens = stored.tokens.map(t => 
          t.homeyId === token.homeyId ? refreshedToken : t
        );
        
        await supabaseClient
          .from('site_settings')
          .upsert({
            id: 'homey_tokens',
            value: { tokens: updatedTokens },
            updated_at: new Date().toISOString(),
          } as Record<string, unknown>, { onConflict: 'id' });
      }
    }

    return refreshedToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

async function getHomeys(tokens: HomeyToken[]): Promise<Response> {
  const allHomeys: { id: string; name: string; fromApi: boolean }[] = [];

  for (const token of tokens) {
    try {
      // Get list of Homeys from Athom API
      const homeysResponse = await fetchWithRetry('https://api.athom.com/homey', {
        headers: { 'Authorization': `Bearer ${token.access_token}` },
      });

      if (homeysResponse.ok) {
        const homeys = await homeysResponse.json();
        for (const h of homeys) {
          allHomeys.push({
            id: h._id || h.id,
            name: h.name || token.homeyName,
            fromApi: true
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching homeys for ${token.homeyName}:`, error);
      // Still include from stored token
      allHomeys.push({
        id: token.homeyId,
        name: token.homeyName,
        fromApi: false
      });
    }
  }

  // Deduplicate by ID
  const uniqueHomeys = Array.from(
    new Map(allHomeys.map(h => [h.id, h])).values()
  );

  console.log('Combined Homeys:', JSON.stringify(uniqueHomeys, null, 2));

  return new Response(
    JSON.stringify({ homeys: uniqueHomeys }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Helpers

type HomeyInfo = {
  id: string;
  _id?: string; // API sometimes returns _id
  name?: string;
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

  const response = await fetchWithRetry('https://api.athom.com/delegation/token?audience=homey', {
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

async function getDevices(tokens: HomeyToken[]): Promise<Response> {
  const allDevices: Record<string, unknown> = {};
  const homeyInfos: { id: string; name: string }[] = [];

  for (const token of tokens) {
    try {
      console.log(`Fetching devices from ${token.homeyName}...`);
      
      // Get Homey info from API
      const homeysResponse = await fetchWithRetry('https://api.athom.com/homey', {
        headers: { 'Authorization': `Bearer ${token.access_token}` },
      });

      if (!homeysResponse.ok) {
        console.error(`Failed to get Homey info for ${token.homeyName}:`, await homeysResponse.text());
        continue;
      }

      const homeys = await homeysResponse.json();
      if (!homeys || homeys.length === 0) {
        console.log(`No Homeys returned for token ${token.homeyName}`);
        continue;
      }

      const homey = homeys[0] as HomeyInfo & { name?: string };
      const homeyName = homey.name || token.homeyName;
      const homeyBaseUrl = getHomeyBaseUrl(homey);
      
      console.log('Using Homey base URL:', homeyBaseUrl);

      // Get delegation token for this Homey
      const delegationToken = await getDelegationToken(token.access_token);

      // Login to Homey and get session token
      const sessionToken = await getHomeySessionToken(homeyBaseUrl, delegationToken);

      // Get devices using session token
      const devicesResponse = await fetch(`${homeyBaseUrl}/api/manager/devices/device`, {
        headers: { 'Authorization': `Bearer ${sessionToken}` },
      });

      if (!devicesResponse.ok) {
        const errorText = await devicesResponse.text();
        console.error(`Failed to get devices from ${homeyName}:`, devicesResponse.status, errorText);
        continue;
      }

      const devices = await devicesResponse.json();
      const deviceCount = Object.keys(devices).length;
      console.log(`Found ${deviceCount} devices from ${homeyName}`);

      // Add homey info to each device and merge into allDevices
      for (const [id, device] of Object.entries(devices)) {
        allDevices[id] = {
          ...(device as object),
          homeyId: token.homeyId,
          homeyName: homeyName,
        };
      }

      homeyInfos.push({ id: token.homeyId, name: homeyName });
    } catch (error) {
      console.error(`Error fetching devices from Homey ${token.homeyName}:`, error);
    }
  }

  console.log(`Total devices from all Homeys: ${Object.keys(allDevices).length}`);

  return new Response(
    JSON.stringify({ devices: allDevices, homeys: homeyInfos }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function getFloorHeatingDevices(tokens: HomeyToken[]): Promise<Response> {
  // Store session tokens for each Homey to reuse when fetching device details
  const homeySessionTokens: Map<string, { sessionToken: string; baseUrl: string }> = new Map();
  const allDevices: Record<string, unknown> = {};
  const homeyInfos: { id: string; name: string }[] = [];

  // First, get all devices and store session tokens
  for (const token of tokens) {
    try {
      console.log(`Fetching devices from ${token.homeyName}...`);
      
      const homeysResponse = await fetchWithRetry('https://api.athom.com/homey', {
        headers: { 'Authorization': `Bearer ${token.access_token}` },
      });

      if (!homeysResponse.ok) {
        console.error(`Failed to get Homey info for ${token.homeyName}:`, await homeysResponse.text());
        continue;
      }

      const homeys = await homeysResponse.json();
      if (!homeys || homeys.length === 0) {
        console.log(`No Homeys returned for token ${token.homeyName}`);
        continue;
      }

      const homey = homeys[0] as HomeyInfo & { name?: string };
      const homeyName = homey.name || token.homeyName;
      const homeyBaseUrl = getHomeyBaseUrl(homey);
      
      const delegationToken = await getDelegationToken(token.access_token);
      const sessionToken = await getHomeySessionToken(homeyBaseUrl, delegationToken);
      
      // Store session token for later use
      homeySessionTokens.set(token.homeyId, { sessionToken, baseUrl: homeyBaseUrl });

      const devicesResponse = await fetch(`${homeyBaseUrl}/api/manager/devices/device`, {
        headers: { 'Authorization': `Bearer ${sessionToken}` },
      });

      if (!devicesResponse.ok) {
        console.error(`Failed to get devices from ${homeyName}:`, devicesResponse.status);
        continue;
      }

      const devices = await devicesResponse.json();
      console.log(`Found ${Object.keys(devices).length} devices from ${homeyName}`);

      for (const [id, device] of Object.entries(devices)) {
        allDevices[id] = {
          ...(device as object),
          homeyId: token.homeyId,
          homeyName: homeyName,
        };
      }

      homeyInfos.push({ id: token.homeyId, name: homeyName });
    } catch (error) {
      console.error(`Error fetching devices from Homey ${token.homeyName}:`, error);
    }
  }

  // Filter for thermostat/floor heating devices
  interface DeviceWithHomey extends HomeyDevice {
    homeyId?: string;
    homeyName?: string;
  }
  
  const floorHeatingDevices: DeviceWithHomey[] = [];
  
  for (const [id, device] of Object.entries(allDevices as Record<string, DeviceWithHomey>)) {
    const capabilities = device.capabilities || [];
    
    const hasTargetTemp = capabilities.includes('target_temperature');
    const hasMeasureTemp = capabilities.includes('measure_temperature');
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
        settings: {}, // Will be fetched separately
        homeyId: device.homeyId,
        homeyName: device.homeyName,
      });
    }
  }

  console.log(`Found ${floorHeatingDevices.length} floor heating/thermostat devices, fetching settings...`);

  // Fetch settings for each device in parallel (max 10 at a time)
  const chunkSize = 10;
  let settingsFetched = 0;
  
  for (let i = 0; i < floorHeatingDevices.length; i += chunkSize) {
    const chunk = floorHeatingDevices.slice(i, i + chunkSize);
    
    await Promise.all(chunk.map(async (device) => {
      try {
        const homeyInfo = homeySessionTokens.get(device.homeyId || '');
        if (!homeyInfo) {
          console.log(`No session token for Homey ${device.homeyId}`);
          return;
        }
        
        const detailsResponse = await fetch(
          `${homeyInfo.baseUrl}/api/manager/devices/device/${device.id}`,
          { headers: { 'Authorization': `Bearer ${homeyInfo.sessionToken}` } }
        );
        
        if (detailsResponse.ok) {
          const details = await detailsResponse.json();
          device.settings = details.settings || {};
          settingsFetched++;
          
          // Log first device's settings for debugging
          if (settingsFetched === 1) {
            console.log('First device settings keys:', Object.keys(details.settings || {}));
            console.log('First device settings sample:', JSON.stringify(details.settings).substring(0, 500));
          }
        }
      } catch (error) {
        console.error(`Failed to fetch settings for ${device.name}:`, error);
      }
    }));
  }

  console.log(`Settings fetched for ${settingsFetched}/${floorHeatingDevices.length} devices`);

  return new Response(
    JSON.stringify({ 
      devices: floorHeatingDevices,
      homeys: homeyInfos
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function setDeviceCapability(
  tokens: HomeyToken[], 
  deviceId: string, 
  capability: string, 
  value: unknown,
  targetHomeyId?: string
): Promise<Response> {
  // Find the token for the target Homey
  let token: HomeyToken | undefined;
  
  if (targetHomeyId) {
    token = tokens.find(t => t.homeyId === targetHomeyId);
  }
  
  if (!token) {
    // Try to find which Homey has this device
    for (const t of tokens) {
      try {
        const homeysResponse = await fetchWithRetry('https://api.athom.com/homey', {
          headers: { 'Authorization': `Bearer ${t.access_token}` },
        });
        
        if (!homeysResponse.ok) continue;
        
        const homeys = await homeysResponse.json();
        if (!homeys || homeys.length === 0) continue;
        
        const homey = homeys[0] as HomeyInfo;
        const baseUrl = getHomeyBaseUrl(homey);
        const delToken = await getDelegationToken(t.access_token);
        const sessToken = await getHomeySessionToken(baseUrl, delToken);
        
        // Check if device exists on this Homey
        const checkResponse = await fetch(`${baseUrl}/api/manager/devices/device/${deviceId}`, {
          headers: { 'Authorization': `Bearer ${sessToken}` },
        });
        
        if (checkResponse.ok) {
          token = t;
          break;
        }
      } catch {
        continue;
      }
    }
  }
  
  if (!token) {
    throw new Error('Could not find Homey for this device');
  }

  // Get Homey info
  const homeysResponse = await fetchWithRetry('https://api.athom.com/homey', {
    headers: { 'Authorization': `Bearer ${token.access_token}` },
  });

  if (!homeysResponse.ok) {
    throw new Error('Failed to get Homey info');
  }

  const homeys = await homeysResponse.json();
  if (!homeys || homeys.length === 0) {
    throw new Error('No Homey found');
  }

  // Select the correct Homey based on token.homeyId instead of always using homeys[0]
  const homey = (homeys as HomeyInfo[]).find(h => (h._id || h.id) === token.homeyId) || homeys[0] as HomeyInfo;
  const homeyBaseUrl = getHomeyBaseUrl(homey);
  console.log(`Setting ${capability} to ${value} on device ${deviceId} via ${homeyBaseUrl} (Homey: ${homey.name || token.homeyId})`);

  // Get delegation token
  const delegationToken = await getDelegationToken(token.access_token);

  // Login to Homey and get session token
  const sessionToken = await getHomeySessionToken(homeyBaseUrl, delegationToken);

  // Set capability using session token
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

async function setDeviceSettings(
  tokens: HomeyToken[], 
  deviceId: string, 
  settings: Record<string, unknown>,
  targetHomeyId?: string
): Promise<Response> {
  // Find the token for the target Homey
  let token: HomeyToken | undefined;

  if (targetHomeyId) {
    token = tokens.find(t => t.homeyId === targetHomeyId);
  }

  if (!token) {
    // Try to find which Homey has this device
    for (const t of tokens) {
      try {
        const homeysResponse = await fetchWithRetry('https://api.athom.com/homey', {
          headers: { 'Authorization': `Bearer ${t.access_token}` },
        });

        if (!homeysResponse.ok) continue;

        const homeys = await homeysResponse.json();
        if (!homeys || homeys.length === 0) continue;

        // Select correct Homey for this token (important for multi-Homey accounts)
        const homey = (homeys as HomeyInfo[]).find(h => (h._id || h.id) === t.homeyId) || homeys[0] as HomeyInfo;
        const baseUrl = getHomeyBaseUrl(homey);
        const delToken = await getDelegationToken(t.access_token);
        const sessToken = await getHomeySessionToken(baseUrl, delToken);

        // Check if device exists on this Homey
        const checkResponse = await fetch(`${baseUrl}/api/manager/devices/device/${deviceId}`, {
          headers: { 'Authorization': `Bearer ${sessToken}` },
        });

        if (checkResponse.ok) {
          token = t;
          break;
        }
      } catch {
        continue;
      }
    }
  }

  if (!token) {
    throw new Error('Could not find Homey for this device');
  }

  // Get Homey info
  const homeysResponse = await fetchWithRetry('https://api.athom.com/homey', {
    headers: { 'Authorization': `Bearer ${token.access_token}` },
  });

  if (!homeysResponse.ok) {
    throw new Error('Failed to get Homey info');
  }

  const homeys = await homeysResponse.json();
  if (!homeys || homeys.length === 0) {
    throw new Error('No Homey found');
  }

  // Select the correct Homey based on token.homeyId (multi-Homey safe)
  const homey = (homeys as HomeyInfo[]).find(h => (h._id || h.id) === token.homeyId) || homeys[0] as HomeyInfo;
  const homeyBaseUrl = getHomeyBaseUrl(homey);
  console.log(`Setting settings on device ${deviceId} via ${homeyBaseUrl}:`, settings);

  // Get delegation token
  const delegationToken = await getDelegationToken(token.access_token);

  // Login to Homey and get session token
  const sessionToken = await getHomeySessionToken(homeyBaseUrl, delegationToken);

  // Set settings using PUT to device endpoint
  const setResponse = await fetch(
    `${homeyBaseUrl}/api/manager/devices/device/${deviceId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settings }),
    }
  );

  if (!setResponse.ok) {
    const errorText = await setResponse.text();
    console.error('Failed to set device settings:', setResponse.status, errorText);

    // If token is missing the required scope (homey.device.control.settings), ask for re-auth
    if (setResponse.status === 403 && /Missing Scopes/i.test(errorText)) {
      return new Response(
        JSON.stringify({
          success: false,
          needsAuth: true,
          authUrl: buildAuthUrl(),
          error: 'Missing Scopes',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error(`Failed to set device settings: ${errorText}`);
  }

  return new Response(
    JSON.stringify({ success: true, deviceId, settings }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function bulkSetDeviceSettings(
  tokens: HomeyToken[], 
  deviceIds: string[], 
  settings: Record<string, unknown>
): Promise<Response> {
  console.log(`Bulk setting settings for ${deviceIds.length} devices:`, settings);
  
  const results: { deviceId: string; success: boolean; error?: string }[] = [];
  
  for (const deviceId of deviceIds) {
    try {
      const response = await setDeviceSettings(tokens, deviceId, settings);
      const data = await response.json();
      results.push({ deviceId, success: data.success });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Failed to set settings for device ${deviceId}:`, errorMessage);
      results.push({ deviceId, success: false, error: errorMessage });
    }
  }
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  return new Response(
    JSON.stringify({ 
      success: failCount === 0, 
      successCount, 
      failCount, 
      results 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
