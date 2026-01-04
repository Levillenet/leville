import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MELCLOUD_BASE_URL = 'https://app.melcloud.com/Mitsubishi.Wifi.Client';

// Types
interface LoginResponse {
  LoginData: {
    ContextKey: string;
  } | null;
  ErrorId: number | null;
  ErrorMessage: string | null;
}

interface Device {
  DeviceID: number;
  DeviceName: string;
  BuildingID: number;
  Device: {
    DeviceID: number;
    DeviceName: string;
    BuildingID: number;
    RoomTemperature: number;
    SetTemperature: number;
    Power: boolean;
    OperationMode: number;
    LastCommunication: string;
    SetFanSpeed: number;
    VaneHorizontal: number;
    VaneVertical: number;
    NumberOfFanSpeeds: number;
    EffectiveFlags: number;
    ProhibitSetTemperature: boolean;
    ProhibitPower: boolean;
    ProhibitOperationMode: boolean;
    OutdoorTemperature?: number;
  };
}

interface Building {
  ID: number;
  Name: string;
  Structure: {
    Devices: Device[];
  };
}

interface DeviceSettings {
  device_id: number;
  device_name: string | null;
  fan_auto_recovery: boolean;
  fan_recovery_delay_minutes: number;
  pending_fan_recovery_at: string | null;
  pending_fan_speed: number;
  last_known_state: string;
}

interface DefrostLog {
  device_id: number;
  started_at: string;
  ended_at: string | null;
}

type OperatingState = 'HEATING' | 'COOLING' | 'DEFROST' | 'IDLE' | 'OFF' | 'ERROR' | 'UNKNOWN';

// Operation modes
const OPERATION_MODES: Record<number, string> = {
  1: 'heating',
  2: 'drying',
  3: 'cooling',
  7: 'fan',
  8: 'auto',
};

// Initialize Supabase client
function getSupabaseClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
}

async function login(): Promise<string> {
  const email = Deno.env.get('MELCLOUD_EMAIL');
  const password = Deno.env.get('MELCLOUD_PASSWORD');

  if (!email || !password) {
    throw new Error('MELCloud credentials not configured');
  }

  console.log('Logging in to MELCloud...');

  const response = await fetch(`${MELCLOUD_BASE_URL}/Login/ClientLogin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Email: email,
      Password: password,
      Language: 0,
      AppVersion: '1.9.3.0',
      Persist: false,
      CaptchaResponse: null,
    }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const data: LoginResponse = await response.json();

  if (data.ErrorId !== null && data.ErrorId !== 0) {
    throw new Error(`Login error: ${data.ErrorMessage || 'Unknown error'}`);
  }

  if (!data.LoginData?.ContextKey) {
    throw new Error('No context key received');
  }

  console.log('Login successful');
  return data.LoginData.ContextKey;
}

// Determine operating state based on device data and history
function determineOperatingState(
  device: {
    power: boolean;
    operationModeId: number;
    fanSpeed: number;
    roomTemperature: number;
    lastCommunication: string;
  },
  lastKnownState: string,
  previousRoomTemp: number | null
): OperatingState {
  // Check if offline (no communication for 30+ minutes)
  const lastComm = new Date(device.lastCommunication);
  const now = new Date();
  const diffMinutes = (now.getTime() - lastComm.getTime()) / 60000;
  
  if (diffMinutes > 30) {
    return 'ERROR';
  }

  // Power off
  if (!device.power) {
    return 'OFF';
  }

  // Heuristic defrost detection for ATA devices:
  // - Mode = HEAT (1)
  // - FanSpeed = AUTO (0) or very low (1)
  // - Room temperature is stable or dropping
  // - Previous state was HEATING
  if (
    device.operationModeId === 1 && // HEAT mode
    (device.fanSpeed === 0 || device.fanSpeed === 1) && // AUTO or lowest
    previousRoomTemp !== null &&
    device.roomTemperature <= previousRoomTemp &&
    (lastKnownState === 'HEATING' || lastKnownState === 'DEFROST')
  ) {
    // Additional check: if temp dropped more than 0.5°C, likely defrost
    if (previousRoomTemp - device.roomTemperature >= 0.3) {
      return 'DEFROST';
    }
    // If already in defrost, stay in defrost until temp rises
    if (lastKnownState === 'DEFROST') {
      return 'DEFROST';
    }
  }

  // Normal operation based on mode
  switch (device.operationModeId) {
    case 1: // HEAT
      return 'HEATING';
    case 3: // COOL
      return 'COOLING';
    case 2: // DRY
    case 7: // FAN
    case 8: // AUTO
      return device.power ? 'HEATING' : 'IDLE'; // Simplified for AUTO
    default:
      return 'UNKNOWN';
  }
}

async function getDevices(contextKey: string) {
  console.log('Fetching devices...');
  const supabase = getSupabaseClient();

  const response = await fetch(`${MELCLOUD_BASE_URL}/User/ListDevices`, {
    method: 'GET',
    headers: {
      'X-MitsContextKey': contextKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch devices: ${response.status}`);
  }

  const buildings: Building[] = await response.json();
  
  // Get all device IDs
  const deviceIds = buildings.flatMap(building => 
    building.Structure.Devices.map(d => d.Device.DeviceID)
  );

  // Fetch settings from database
  const { data: settingsData } = await supabase
    .from('heat_pump_settings')
    .select('*')
    .in('device_id', deviceIds);
  
  const settingsMap = new Map<number, DeviceSettings>();
  (settingsData || []).forEach((s: DeviceSettings) => settingsMap.set(s.device_id, s));

  // Fetch recent history for temperature comparison
  const { data: historyData } = await supabase
    .from('heat_pump_history')
    .select('device_id, room_temperature, recorded_at')
    .in('device_id', deviceIds)
    .gte('recorded_at', new Date(Date.now() - 15 * 60 * 1000).toISOString()) // Last 15 min
    .order('recorded_at', { ascending: false });

  const lastTempMap = new Map<number, number>();
  (historyData || []).forEach((h: { device_id: number; room_temperature: number }) => {
    if (!lastTempMap.has(h.device_id)) {
      lastTempMap.set(h.device_id, h.room_temperature);
    }
  });

  // Fetch last defrost for each device
  const { data: defrostData } = await supabase
    .from('heat_pump_defrost_log')
    .select('device_id, ended_at')
    .in('device_id', deviceIds)
    .not('ended_at', 'is', null)
    .order('ended_at', { ascending: false });

  const lastDefrostMap = new Map<number, string>();
  (defrostData || []).forEach((d: { device_id: number; ended_at: string | null }) => {
    if (!lastDefrostMap.has(d.device_id) && d.ended_at) {
      lastDefrostMap.set(d.device_id, d.ended_at);
    }
  });

  // Fetch open defrost cycles
  const { data: openDefrostData } = await supabase
    .from('heat_pump_defrost_log')
    .select('device_id, started_at')
    .in('device_id', deviceIds)
    .is('ended_at', null);

  const openDefrostMap = new Map<number, string>();
  (openDefrostData || []).forEach((d: { device_id: number; started_at: string }) => {
    openDefrostMap.set(d.device_id, d.started_at);
  });

  const devices = buildings.flatMap(building => 
    building.Structure.Devices.map(device => {
      const settings = settingsMap.get(device.Device.DeviceID);
      const lastTemp = lastTempMap.get(device.Device.DeviceID) ?? null;
      const lastKnownState = settings?.last_known_state || 'UNKNOWN';
      
      const operatingState = determineOperatingState(
        {
          power: device.Device.Power,
          operationModeId: device.Device.OperationMode,
          fanSpeed: device.Device.SetFanSpeed,
          roomTemperature: device.Device.RoomTemperature,
          lastCommunication: device.Device.LastCommunication,
        },
        lastKnownState,
        lastTemp
      );

      // Calculate last defrost time
      const lastDefrostAt = lastDefrostMap.get(device.Device.DeviceID);
      let lastDefrostMinutesAgo: number | null = null;
      if (lastDefrostAt) {
        const diffMs = Date.now() - new Date(lastDefrostAt).getTime();
        lastDefrostMinutesAgo = Math.floor(diffMs / 60000);
      }

      // Check if currently in defrost (open cycle)
      const isDefrosting = openDefrostMap.has(device.Device.DeviceID) || operatingState === 'DEFROST';

      // Check pending recovery
      const hasPendingRecovery = settings?.pending_fan_recovery_at !== null && 
        new Date(settings?.pending_fan_recovery_at || 0) <= new Date();

      return {
        deviceId: device.Device.DeviceID,
        deviceName: device.Device.DeviceName || device.DeviceName,
        buildingId: device.Device.BuildingID || building.ID,
        roomTemperature: device.Device.RoomTemperature,
        setTemperature: device.Device.SetTemperature,
        outdoorTemperature: device.Device.OutdoorTemperature ?? null,
        power: device.Device.Power,
        operationMode: OPERATION_MODES[device.Device.OperationMode] || 'unknown',
        operationModeId: device.Device.OperationMode,
        lastCommunication: device.Device.LastCommunication,
        fanSpeed: device.Device.SetFanSpeed ?? 0,
        numberOfFanSpeeds: device.Device.NumberOfFanSpeeds,
        prohibitSetTemperature: device.Device.ProhibitSetTemperature,
        prohibitPower: device.Device.ProhibitPower,
        prohibitOperationMode: device.Device.ProhibitOperationMode,
        // Enhanced fields
        operatingState,
        isDefrosting,
        lastDefrostMinutesAgo,
        pendingFanRecovery: hasPendingRecovery,
        fanAutoRecovery: settings?.fan_auto_recovery ?? false,
        fanRecoveryDelayMinutes: settings?.fan_recovery_delay_minutes ?? 60,
      };
    })
  );

  console.log(`Found ${devices.length} devices`);
  devices.forEach(d => console.log(`Device ${d.deviceName}: SetFanSpeed=${d.fanSpeed}, NumberOfFanSpeeds=${d.numberOfFanSpeeds}`));
  return devices;
}

async function setProhibitFlags(
  contextKey: string,
  deviceId: number,
  buildingId: number,
  flags: {
    prohibitPower?: boolean;
    prohibitSetTemperature?: boolean;
    prohibitOperationMode?: boolean;
  }
) {
  console.log(`Setting prohibit flags for device ${deviceId}...`, flags);

  // First, get current device state
  const deviceResponse = await fetch(
    `${MELCLOUD_BASE_URL}/Device/Get?id=${deviceId}&buildingID=${buildingId}`,
    {
      method: 'GET',
      headers: {
        'X-MitsContextKey': contextKey,
      },
    }
  );

  if (!deviceResponse.ok) {
    throw new Error(`Failed to get device: ${deviceResponse.status}`);
  }

  const currentState = await deviceResponse.json();

  const effectiveFlags = 0x1F0;

  const updatePayload = {
    ...currentState,
    ProhibitSetTemperature: flags.prohibitSetTemperature ?? currentState.ProhibitSetTemperature,
    ProhibitPower: flags.prohibitPower ?? currentState.ProhibitPower,
    ProhibitOperationMode: flags.prohibitOperationMode ?? currentState.ProhibitOperationMode,
    EffectiveFlags: effectiveFlags,
    HasPendingCommand: true,
  };

  console.log('Sending prohibit update payload:', {
    ProhibitSetTemperature: updatePayload.ProhibitSetTemperature,
    ProhibitPower: updatePayload.ProhibitPower,
    ProhibitOperationMode: updatePayload.ProhibitOperationMode,
    EffectiveFlags: effectiveFlags,
  });

  const response = await fetch(`${MELCLOUD_BASE_URL}/Device/SetAta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MitsContextKey': contextKey,
    },
    body: JSON.stringify(updatePayload),
  });

  if (!response.ok) {
    throw new Error(`Failed to set prohibit flags: ${response.status}`);
  }

  const result = await response.json();
  console.log('Prohibit flags update successful');

  return {
    success: true,
    deviceId,
    prohibitPower: result.ProhibitPower,
    prohibitSetTemperature: result.ProhibitSetTemperature,
    prohibitOperationMode: result.ProhibitOperationMode,
  };
}

async function updateDeviceSettings(
  deviceId: number,
  deviceName: string,
  settings: {
    fanAutoRecovery?: boolean;
    fanRecoveryDelayMinutes?: number;
  }
) {
  console.log(`Updating settings for device ${deviceId}...`, settings);
  const supabase = getSupabaseClient();

  const updateData: Record<string, unknown> = {};
  if (settings.fanAutoRecovery !== undefined) {
    updateData.fan_auto_recovery = settings.fanAutoRecovery;
  }
  if (settings.fanRecoveryDelayMinutes !== undefined) {
    updateData.fan_recovery_delay_minutes = settings.fanRecoveryDelayMinutes;
  }

  // Upsert settings
  const { error } = await supabase
    .from('heat_pump_settings')
    .upsert({
      device_id: deviceId,
      device_name: deviceName,
      ...updateData,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'device_id',
    });

  if (error) {
    throw new Error(`Failed to update settings: ${error.message}`);
  }

  console.log('Settings updated successfully');
  return { success: true, deviceId };
}

async function controlDevice(
  contextKey: string, 
  deviceId: number, 
  buildingId: number,
  settings: {
    power?: boolean;
    setTemperature?: number;
    operationMode?: number;
    fanSpeed?: number;
  },
  checkDefrost = true
) {
  console.log(`Controlling device ${deviceId}...`, settings);
  const supabase = getSupabaseClient();

  // Check if device is in defrost mode - prevent control during defrost
  if (checkDefrost) {
    const { data: openDefrost } = await supabase
      .from('heat_pump_defrost_log')
      .select('id')
      .eq('device_id', deviceId)
      .is('ended_at', null)
      .single();

    if (openDefrost) {
      throw new Error('Sulatus käynnissä - odota sulatuksen päättymistä');
    }
  }

  // First, get current device state
  const deviceResponse = await fetch(
    `${MELCLOUD_BASE_URL}/Device/Get?id=${deviceId}&buildingID=${buildingId}`,
    {
      method: 'GET',
      headers: {
        'X-MitsContextKey': contextKey,
      },
    }
  );

  if (!deviceResponse.ok) {
    throw new Error(`Failed to get device: ${deviceResponse.status}`);
  }

  const currentState = await deviceResponse.json();

  // Calculate EffectiveFlags based on what we're changing
  let effectiveFlags = 0;
  if (settings.power !== undefined) effectiveFlags |= 0x01;
  if (settings.operationMode !== undefined) effectiveFlags |= 0x02;
  if (settings.setTemperature !== undefined) effectiveFlags |= 0x04;
  if (settings.fanSpeed !== undefined) effectiveFlags |= 0x08;

  // Merge current state with new settings
  const updatePayload = {
    ...currentState,
    Power: settings.power ?? currentState.Power,
    SetTemperature: settings.setTemperature ?? currentState.SetTemperature,
    OperationMode: settings.operationMode ?? currentState.OperationMode,
    SetFanSpeed: settings.fanSpeed ?? currentState.SetFanSpeed,
    EffectiveFlags: effectiveFlags,
    HasPendingCommand: true,
  };

  const response = await fetch(`${MELCLOUD_BASE_URL}/Device/SetAta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MitsContextKey': contextKey,
    },
    body: JSON.stringify(updatePayload),
  });

  if (!response.ok) {
    throw new Error(`Failed to control device: ${response.status}`);
  }

  const result = await response.json();
  console.log('Device control successful');

  // If fan speed was changed, handle recovery timer
  if (settings.fanSpeed !== undefined && settings.fanSpeed < 5 && settings.fanSpeed !== 4) {
    // Get device settings
    const { data: deviceSettings } = await supabase
      .from('heat_pump_settings')
      .select('fan_auto_recovery, fan_recovery_delay_minutes')
      .eq('device_id', deviceId)
      .single();

    if (deviceSettings?.fan_auto_recovery) {
      // Set pending recovery
      const recoveryAt = new Date(Date.now() + (deviceSettings.fan_recovery_delay_minutes || 60) * 60000);
      await supabase
        .from('heat_pump_settings')
        .upsert({
          device_id: deviceId,
          pending_fan_recovery_at: recoveryAt.toISOString(),
          pending_fan_speed: 4,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'device_id',
        });
      console.log(`Fan recovery scheduled for ${recoveryAt.toISOString()}`);
    }
  } else if (settings.fanSpeed === 5 || settings.fanSpeed === 4) {
    // Clear pending recovery
    await supabase
      .from('heat_pump_settings')
      .update({
        pending_fan_recovery_at: null,
        pending_fan_speed: 4,
        updated_at: new Date().toISOString(),
      })
      .eq('device_id', deviceId);
    console.log('Fan recovery cleared (speed set to 4 or 5)');
  }

  return {
    success: true,
    deviceId,
    power: result.Power,
    setTemperature: result.SetTemperature,
    operationMode: OPERATION_MODES[result.OperationMode] || 'unknown',
    fanSpeed: result.SetFanSpeed,
  };
}

async function getDeviceHistory(deviceId: number, period: '24h' | '7d' | '30d') {
  console.log(`Fetching history for device ${deviceId}, period: ${period}`);
  const supabase = getSupabaseClient();

  let hoursAgo = 24;
  if (period === '7d') hoursAgo = 168;
  if (period === '30d') hoursAgo = 720;

  const startDate = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

  // Fetch temperature history
  const { data: history, error: historyError } = await supabase
    .from('heat_pump_history')
    .select('room_temperature, set_temperature, outdoor_temperature, operating_state, fan_speed, power, recorded_at')
    .eq('device_id', deviceId)
    .gte('recorded_at', startDate)
    .order('recorded_at', { ascending: true });

  if (historyError) {
    throw new Error(`Failed to fetch history: ${historyError.message}`);
  }

  // Fetch defrost logs
  const { data: defrostLogs, error: defrostError } = await supabase
    .from('heat_pump_defrost_log')
    .select('started_at, ended_at, duration_seconds')
    .eq('device_id', deviceId)
    .gte('started_at', startDate)
    .order('started_at', { ascending: true });

  if (defrostError) {
    throw new Error(`Failed to fetch defrost logs: ${defrostError.message}`);
  }

  // Calculate defrost statistics
  const completedDefrosts = (defrostLogs || []).filter((d: { ended_at: string | null }) => d.ended_at !== null);
  const defrostCount = completedDefrosts.length;
  const avgDuration = defrostCount > 0 
    ? Math.round(completedDefrosts.reduce((sum: number, d: { duration_seconds: number | null }) => sum + (d.duration_seconds || 0), 0) / defrostCount)
    : 0;
  const maxDuration = defrostCount > 0
    ? Math.max(...completedDefrosts.map((d: { duration_seconds: number | null }) => d.duration_seconds || 0))
    : 0;

  return {
    history: history || [],
    defrostLogs: defrostLogs || [],
    statistics: {
      defrostCount,
      avgDurationSeconds: avgDuration,
      maxDurationSeconds: maxDuration,
      avgRoomTemperature: history && history.length > 0
        ? Math.round((history.reduce((sum: number, h: { room_temperature: number }) => sum + h.room_temperature, 0) / history.length) * 10) / 10
        : null,
    },
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    // Handle history request without MELCloud login
    if (action === 'getHistory') {
      const deviceId = parseInt(url.searchParams.get('deviceId') || '0');
      const period = (url.searchParams.get('period') || '24h') as '24h' | '7d' | '30d';
      
      if (!deviceId) {
        return new Response(
          JSON.stringify({ error: 'deviceId is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const historyData = await getDeviceHistory(deviceId, period);
      return new Response(JSON.stringify(historyData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const contextKey = await login();

    if (req.method === 'GET') {
      // Fetch devices
      const devices = await getDevices(contextKey);
      return new Response(JSON.stringify({ devices }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const { deviceId, buildingId, action: bodyAction, deviceName } = body;

      // Handle settings update (no MELCloud API call needed)
      if (bodyAction === 'updateSettings') {
        const { fanAutoRecovery, fanRecoveryDelayMinutes } = body;
        const result = await updateDeviceSettings(deviceId, deviceName || `Device ${deviceId}`, {
          fanAutoRecovery,
          fanRecoveryDelayMinutes,
        });
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (!deviceId || !buildingId) {
        return new Response(
          JSON.stringify({ error: 'deviceId and buildingId are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Handle prohibit flags update
      if (bodyAction === 'setProhibitFlags') {
        const { prohibitPower, prohibitSetTemperature, prohibitOperationMode } = body;
        const result = await setProhibitFlags(contextKey, deviceId, buildingId, {
          prohibitPower,
          prohibitSetTemperature,
          prohibitOperationMode,
        });
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Default: control device settings
      const { power, setTemperature, operationMode, fanSpeed } = body;
      const result = await controlDevice(contextKey, deviceId, buildingId, {
        power,
        setTemperature,
        operationMode,
        fanSpeed,
      });

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('MELCloud API error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
