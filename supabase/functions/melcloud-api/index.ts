import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MELCLOUD_BASE_URL = 'https://app.melcloud.com/Mitsubishi.Wifi.Client';

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
  };
}

interface Building {
  ID: number;
  Name: string;
  Structure: {
    Devices: Device[];
  };
}

// Operation modes
const OPERATION_MODES: Record<number, string> = {
  1: 'heating',
  2: 'drying',
  3: 'cooling',
  7: 'fan',
  8: 'auto',
};

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

async function getDevices(contextKey: string) {
  console.log('Fetching devices...');

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
  
  const devices = buildings.flatMap(building => 
    building.Structure.Devices.map(device => ({
      deviceId: device.Device.DeviceID,
      deviceName: device.Device.DeviceName || device.DeviceName,
      buildingId: device.Device.BuildingID || building.ID,
      roomTemperature: device.Device.RoomTemperature,
      setTemperature: device.Device.SetTemperature,
      power: device.Device.Power,
      operationMode: OPERATION_MODES[device.Device.OperationMode] || 'unknown',
      operationModeId: device.Device.OperationMode,
      lastCommunication: device.Device.LastCommunication,
      fanSpeed: device.Device.SetFanSpeed,
      numberOfFanSpeeds: device.Device.NumberOfFanSpeeds,
      prohibitSetTemperature: device.Device.ProhibitSetTemperature,
      prohibitPower: device.Device.ProhibitPower,
      prohibitOperationMode: device.Device.ProhibitOperationMode,
    }))
  );

  console.log(`Found ${devices.length} devices`);
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

  // EffectiveFlags for prohibit settings:
  // 0x10 = ProhibitSetTemperature
  // 0x20 = ProhibitPower  
  // 0x40 = ProhibitOperationMode
  // Use 0x1F to cover all basic flags plus prohibit flags
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

async function controlDevice(
  contextKey: string, 
  deviceId: number, 
  buildingId: number,
  settings: {
    power?: boolean;
    setTemperature?: number;
    operationMode?: number;
    fanSpeed?: number;
  }
) {
  console.log(`Controlling device ${deviceId}...`, settings);

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

  return {
    success: true,
    deviceId,
    power: result.Power,
    setTemperature: result.SetTemperature,
    operationMode: OPERATION_MODES[result.OperationMode] || 'unknown',
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
      const { deviceId, buildingId, action } = body;

      if (!deviceId || !buildingId) {
        return new Response(
          JSON.stringify({ error: 'deviceId and buildingId are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Handle prohibit flags update
      if (action === 'setProhibitFlags') {
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
