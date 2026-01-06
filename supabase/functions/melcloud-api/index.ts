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
    // Energy data (may not be available on all devices)
    CurrentEnergyConsumed?: number;
    DailyEnergyConsumed?: number;
    TotalEnergyConsumed?: number;
    HasEnergyConsumedMeter?: boolean;
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
  degree_minutes: number;
  efficiency_status: string;
  // Max temperature reset fields
  max_temp_reset_enabled: boolean;
  max_temp_limit: number;
  max_temp_reset_delay_minutes: number;
  pending_temp_reset_at: string | null;
  original_set_temperature: number | null;
  // Checkout drop field
  next_checkout_drop_at: string | null;
}

interface PerformanceBaseline {
  device_id: number;
  outdoor_temp_range: string;
  avg_recovery_speed: number;
  avg_temp_debt: number;
  sample_count: number;
}

interface FleetBaseline {
  outdoor_temp_range: string;
  fleet_avg_recovery_speed: number;
  fleet_avg_temp_debt: number;
  device_count: number;
  sample_count: number;
}

interface DefrostLog {
  device_id: number;
  started_at: string;
  ended_at: string | null;
}

type OperatingState = 'HEATING' | 'COOLING' | 'DEFROST' | 'IDLE' | 'OFF' | 'ERROR' | 'UNKNOWN';
type EfficiencyStatus = 'SUFFICIENT' | 'MARGINAL' | 'INSUFFICIENT' | 'LEARNING' | 'UNKNOWN';

// Operation modes
const OPERATION_MODES: Record<number, string> = {
  1: 'heating',
  2: 'drying',
  3: 'cooling',
  7: 'fan',
  8: 'auto',
};

// Minimum samples for reliable baseline
const MIN_BASELINE_SAMPLES = 10;

// Get outdoor temperature range key (5°C buckets)
function getOutdoorTempRange(temp: number | null): string {
  if (temp === null) return 'unknown';
  const lower = Math.floor(temp / 5) * 5;
  const upper = lower + 5;
  return `${lower}_${upper}`;
}

// Initialize Supabase client
function getSupabaseClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
}

// Fetch actual outdoor temperature from Open-Meteo for Levi
async function fetchOutdoorTemperature(): Promise<number | null> {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=67.8039&longitude=24.8081&current=temperature_2m'
    );
    if (!response.ok) {
      console.error('Open-Meteo API error:', response.status);
      return null;
    }
    const data = await response.json();
    const temp = data.current?.temperature_2m ?? null;
    console.log(`Open-Meteo outdoor temperature: ${temp}°C`);
    return temp;
  } catch (error) {
    console.error('Failed to fetch outdoor temperature:', error);
    return null;
  }
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
  if (
    device.operationModeId === 1 && // HEAT mode
    (device.fanSpeed === 0 || device.fanSpeed === 1) && // AUTO or lowest
    previousRoomTemp !== null &&
    device.roomTemperature <= previousRoomTemp &&
    (lastKnownState === 'HEATING' || lastKnownState === 'DEFROST')
  ) {
    if (previousRoomTemp - device.roomTemperature >= 0.3) {
      return 'DEFROST';
    }
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
      return device.power ? 'HEATING' : 'IDLE';
    default:
      return 'UNKNOWN';
  }
}

// Calculate comparative efficiency status with stability-first approach
// Key insight: A pump maintaining stable temperature at target is EFFICIENT,
// even if it shows low "recovery speed" (because it doesn't need to recover)
// Also considers: higher setTemperature = harder work = expected lower performance
function calculateEfficiencyInfo(
  tempDebt: number,
  deviceBaseline: PerformanceBaseline | null,
  fleetBaseline: FleetBaseline | null,
  setTemperature: number = 21,
  roomTemperature: number = 21,
  tempStability: number | null = null // stddev of room temp over 24h
): { status: EfficiencyStatus; performanceRatio: number | null; reason: string; sampleCount: number; workloadFactor: number } {
  const sampleCount = deviceBaseline?.sample_count || 0;
  
  // Calculate workload factor based on set temperature
  // Higher target = more work needed (baseline is 21°C)
  const baselineTemp = 21;
  const workloadFactor = 1 + (setTemperature - baselineTemp) * 0.05; // 5% harder per degree above 21
  
  // If not enough baseline data, show learning status
  if (!deviceBaseline || sampleCount < MIN_BASELINE_SAMPLES) {
    return {
      status: 'LEARNING',
      performanceRatio: null,
      reason: `Kerää dataa (${sampleCount}/${MIN_BASELINE_SAMPLES})`,
      sampleCount,
      workloadFactor,
    };
  }

  // STABILITY-FIRST APPROACH:
  // If room temp is at/near target AND stable, the pump is doing its job well
  const isAtTarget = tempDebt < 0.5;
  const isStable = tempStability !== null && tempStability < 1.5;
  
  if (isAtTarget) {
    // Pump is maintaining target - this is success!
    if (isStable || tempStability === null) {
      // Adjust performance ratio for workload (higher target = give credit)
      const baseRatio = 100;
      const workloadBonus = Math.round((workloadFactor - 1) * 100);
      const adjustedRatio = Math.min(150, baseRatio + workloadBonus);
      
      const reason = setTemperature > baselineTemp
        ? `Pitää ${setTemperature}°C vakaana (korkea tavoite +${workloadBonus}%)`
        : `Pitää lämpötilan vakaana`;
      
      return {
        status: 'SUFFICIENT',
        performanceRatio: adjustedRatio,
        reason,
        sampleCount,
        workloadFactor,
      };
    }
  }

  // RECOVERY-BASED ASSESSMENT when pump needs to work harder
  // If no fleet baseline, compare to device's own average
  if (!fleetBaseline || fleetBaseline.sample_count < MIN_BASELINE_SAMPLES) {
    const debtRatio = deviceBaseline.avg_temp_debt > 0.1 
      ? tempDebt / deviceBaseline.avg_temp_debt 
      : tempDebt < 0.5 ? 1 : 0.5;
    
    // Adjust for workload
    const adjustedDebtRatio = debtRatio / workloadFactor;
    
    if (adjustedDebtRatio <= 1.1) {
      return { status: 'SUFFICIENT', performanceRatio: 100, reason: 'Normaali suorituskyky', sampleCount, workloadFactor };
    } else if (adjustedDebtRatio <= 1.5) {
      return { status: 'MARGINAL', performanceRatio: Math.round(100 / adjustedDebtRatio), reason: 'Hieman tavallista hitaampi', sampleCount, workloadFactor };
    } else {
      return { status: 'INSUFFICIENT', performanceRatio: Math.round(100 / adjustedDebtRatio), reason: 'Selvästi tavallista hitaampi', sampleCount, workloadFactor };
    }
  }

  // Full comparative analysis with workload adjustment
  let performanceRatio = 100;

  // Compare recovery speed if available
  if (deviceBaseline.avg_recovery_speed > 0 && fleetBaseline.fleet_avg_recovery_speed > 0) {
    const speedRatio = deviceBaseline.avg_recovery_speed / fleetBaseline.fleet_avg_recovery_speed;
    // Adjust for workload - higher target gets bonus
    performanceRatio = Math.round(speedRatio * 100 * workloadFactor);
  } else {
    // Use temp debt comparison
    if (fleetBaseline.fleet_avg_temp_debt > 0.1) {
      const debtRatio = fleetBaseline.fleet_avg_temp_debt / Math.max(tempDebt, 0.1);
      performanceRatio = Math.round(Math.min(debtRatio * 100 * workloadFactor, 150));
    }
  }

  // Determine status based on performance ratio
  let reason: string;
  let status: EfficiencyStatus;

  if (performanceRatio >= 90) {
    status = 'SUFFICIENT';
    if (setTemperature > baselineTemp) {
      reason = performanceRatio >= 100 
        ? `Pärjää hyvin korkealla tavoitteella (${setTemperature}°C)`
        : `Pärjää yhtä hyvin kuin muut`;
    } else {
      reason = performanceRatio >= 100 
        ? `Pärjää ${performanceRatio - 100}% keskiarvoa paremmin`
        : `Pärjää yhtä hyvin kuin muut`;
    }
  } else if (performanceRatio >= 70) {
    status = 'MARGINAL';
    reason = setTemperature > baselineTemp
      ? `Korkea tavoite (${setTemperature}°C), suoriutuu kohtalaisesti`
      : `${100 - performanceRatio}% heikompi kuin keskiarvo`;
  } else {
    status = 'INSUFFICIENT';
    reason = setTemperature > baselineTemp
      ? `Korkea tavoite (${setTemperature}°C) voi olla liian vaativa`
      : `${100 - performanceRatio}% heikompi kuin keskiarvo`;
  }

  return { status, performanceRatio, reason, sampleCount, workloadFactor };
}

async function getDevices(contextKey: string) {
  console.log('Fetching devices...');
  const supabase = getSupabaseClient();
  
  // Fetch actual outdoor temperature from Open-Meteo
  const actualOutdoorTemperature = await fetchOutdoorTemperature();

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
  
  // Collect all devices with their building info
  const allDevices = buildings.flatMap(building => 
    building.Structure.Devices.map(device => ({
      building,
      device,
      deviceId: device.Device.DeviceID,
      buildingId: building.ID
    }))
  );

  // Fetch full device details from /Device/Get for each device
  console.log(`Fetching full details for ${allDevices.length} devices...`);
  const deviceDetailsPromises = allDevices.map(async ({ deviceId, buildingId }) => {
    try {
      const detailResponse = await fetch(
        `${MELCLOUD_BASE_URL}/Device/Get?id=${deviceId}&buildingID=${buildingId}`,
        {
          method: 'GET',
          headers: { 'X-MitsContextKey': contextKey },
        }
      );
      
      if (detailResponse.ok) {
        const fullDevice = await detailResponse.json();
        console.log(`Device ${deviceId}: SetFanSpeed from /Device/Get = ${fullDevice.SetFanSpeed}`);
        return { deviceId, fullDevice };
      }
      console.warn(`Failed to fetch details for device ${deviceId}: ${detailResponse.status}`);
      return { deviceId, fullDevice: null };
    } catch (err) {
      console.warn(`Error fetching details for device ${deviceId}:`, err);
      return { deviceId, fullDevice: null };
    }
  });

  const deviceDetails = await Promise.all(deviceDetailsPromises);
  const deviceDetailsMap = new Map<number, any>();
  deviceDetails.forEach(({ deviceId, fullDevice }) => {
    if (fullDevice) deviceDetailsMap.set(deviceId, fullDevice);
  });

  // Get all device IDs
  const deviceIds = allDevices.map(d => d.deviceId);

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
    .gte('recorded_at', new Date(Date.now() - 15 * 60 * 1000).toISOString())
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

  // Fetch device performance baselines
  const { data: deviceBaselines } = await supabase
    .from('heat_pump_performance_baseline')
    .select('*')
    .in('device_id', deviceIds);

  const baselineMap = new Map<string, PerformanceBaseline>();
  (deviceBaselines || []).forEach((b: PerformanceBaseline) => {
    baselineMap.set(`${b.device_id}_${b.outdoor_temp_range}`, b);
  });

  // Fetch fleet baselines
  const { data: fleetBaselines } = await supabase
    .from('heat_pump_fleet_baseline')
    .select('*');

  const fleetBaselineMap = new Map<string, FleetBaseline>(
    (fleetBaselines || []).map((b: FleetBaseline) => [b.outdoor_temp_range, b])
  );

  // Fetch 24h temperature reset counts
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: tempResetData } = await supabase
    .from('heat_pump_temp_reset_log')
    .select('device_id')
    .in('device_id', deviceIds)
    .gte('reset_at', twentyFourHoursAgo);

  const tempResetCountMap = new Map<number, number>();
  (tempResetData || []).forEach((r: { device_id: number }) => {
    tempResetCountMap.set(r.device_id, (tempResetCountMap.get(r.device_id) || 0) + 1);
  });

  // Fetch 24h fan reset counts
  const { data: fanResetData } = await supabase
    .from('heat_pump_fan_reset_log')
    .select('device_id')
    .in('device_id', deviceIds)
    .gte('reset_at', twentyFourHoursAgo);

  const fanResetCountMap = new Map<number, number>();
  (fanResetData || []).forEach((r: { device_id: number }) => {
    fanResetCountMap.set(r.device_id, (fanResetCountMap.get(r.device_id) || 0) + 1);
  });

  const devices = allDevices.map(({ device, building }) => {
    const deviceId = device.Device.DeviceID;
    const fullDevice = deviceDetailsMap.get(deviceId);
    const settings = settingsMap.get(deviceId);
    const lastTemp = lastTempMap.get(deviceId) ?? null;
    const lastKnownState = settings?.last_known_state || 'UNKNOWN';
    
    // Use full device details if available, fallback to list data
    const fanSpeed = fullDevice?.SetFanSpeed ?? device.Device.SetFanSpeed ?? 0;
    const numberOfFanSpeeds = fullDevice?.NumberOfFanSpeeds ?? device.Device.NumberOfFanSpeeds;
    const roomTemperature = fullDevice?.RoomTemperature ?? device.Device.RoomTemperature;
    const setTemperature = fullDevice?.SetTemperature ?? device.Device.SetTemperature;
    const outdoorTemperature = fullDevice?.OutdoorTemperature ?? device.Device.OutdoorTemperature ?? null;
    
    const operatingState = determineOperatingState(
      {
        power: fullDevice?.Power ?? device.Device.Power,
        operationModeId: fullDevice?.OperationMode ?? device.Device.OperationMode,
        fanSpeed,
        roomTemperature,
        lastCommunication: fullDevice?.LastCommunication ?? device.Device.LastCommunication,
      },
      lastKnownState,
      lastTemp
    );

    // Calculate last defrost time
    const lastDefrostAt = lastDefrostMap.get(deviceId);
    let lastDefrostMinutesAgo: number | null = null;
    if (lastDefrostAt) {
      const diffMs = Date.now() - new Date(lastDefrostAt).getTime();
      lastDefrostMinutesAgo = Math.floor(diffMs / 60000);
    }

    // Check if currently in defrost (open cycle)
    const isDefrosting = openDefrostMap.has(deviceId) || operatingState === 'DEFROST';

    // Check pending recovery
    const hasPendingRecovery = Boolean(
      settings?.pending_fan_recovery_at && 
      settings?.fan_auto_recovery === true &&
      fanSpeed < 4
    );

    // Calculate temperature debt
    const tempDebt = Math.max(0, setTemperature - roomTemperature);

    // Get baselines for this device's current outdoor temp range (use actual Open-Meteo temp)
    const outdoorTempRange = getOutdoorTempRange(actualOutdoorTemperature ?? outdoorTemperature);
    const deviceBaseline = baselineMap.get(`${deviceId}_${outdoorTempRange}`) || null;
    const fleetBaseline = fleetBaselineMap.get(outdoorTempRange) || null;

    // Calculate comparative efficiency with stability and workload awareness
    const efficiencyInfo = calculateEfficiencyInfo(
      tempDebt, 
      deviceBaseline, 
      fleetBaseline,
      setTemperature,
      roomTemperature,
      null // tempStability - would need 24h history calculation here
    );

    // Energy consumption data
    const hasEnergyMeter = fullDevice?.HasEnergyConsumedMeter ?? false;
    const currentEnergy = fullDevice?.CurrentEnergyConsumed ?? null;
    const dailyEnergy = fullDevice?.DailyEnergyConsumed ?? null;
    const totalEnergy = fullDevice?.TotalEnergyConsumed ?? null;

    return {
      deviceId,
      deviceName: fullDevice?.DeviceName ?? device.Device.DeviceName ?? device.DeviceName,
      buildingId: fullDevice?.BuildingID ?? device.Device.BuildingID ?? building.ID,
      roomTemperature,
      setTemperature,
      outdoorTemperature,
      actualOutdoorTemperature, // Open-Meteo temperature for Levi
      power: fullDevice?.Power ?? device.Device.Power,
      operationMode: OPERATION_MODES[fullDevice?.OperationMode ?? device.Device.OperationMode] || 'unknown',
      operationModeId: fullDevice?.OperationMode ?? device.Device.OperationMode,
      lastCommunication: fullDevice?.LastCommunication ?? device.Device.LastCommunication,
      fanSpeed,
      numberOfFanSpeeds,
      prohibitSetTemperature: fullDevice?.ProhibitSetTemperature ?? device.Device.ProhibitSetTemperature,
      prohibitPower: fullDevice?.ProhibitPower ?? device.Device.ProhibitPower,
      prohibitOperationMode: fullDevice?.ProhibitOperationMode ?? device.Device.ProhibitOperationMode,
      // Enhanced fields
      operatingState,
      isDefrosting,
      lastDefrostMinutesAgo,
      pendingFanRecovery: hasPendingRecovery,
      fanAutoRecovery: settings?.fan_auto_recovery ?? false,
      fanRecoveryDelayMinutes: settings?.fan_recovery_delay_minutes ?? 60,
      pendingFanRecoveryAt: settings?.pending_fan_recovery_at ?? null,
      // Max temp reset fields
      maxTempResetEnabled: settings?.max_temp_reset_enabled ?? false,
      maxTempLimit: settings?.max_temp_limit ?? 22,
      maxTempResetDelayMinutes: settings?.max_temp_reset_delay_minutes ?? 60,
      pendingTempResetAt: settings?.pending_temp_reset_at ?? null,
      originalSetTemperature: settings?.original_set_temperature ?? null,
      // Checkout drop fields
      nextCheckoutDropAt: settings?.next_checkout_drop_at ?? null,
      // Efficiency fields - now comparative with workload awareness
      degreeMinutes: settings?.degree_minutes ?? 0,
      efficiencyStatus: efficiencyInfo.status,
      performanceRatio: efficiencyInfo.performanceRatio,
      efficiencyReason: efficiencyInfo.reason,
      baselineSampleCount: efficiencyInfo.sampleCount,
      workloadFactor: efficiencyInfo.workloadFactor,
      // Energy fields
      hasEnergyMeter,
      currentEnergy,
      dailyEnergy,
      totalEnergy,
      // 24h reset counts
      tempResetCount24h: tempResetCountMap.get(deviceId) || 0,
      fanResetCount24h: fanResetCountMap.get(deviceId) || 0,
    };
  });

  console.log(`Found ${devices.length} devices`);
  devices.forEach(d => console.log(`Device ${d.deviceName}: efficiency=${d.efficiencyStatus}, ratio=${d.performanceRatio}%, samples=${d.baselineSampleCount}, hasEnergyMeter=${d.hasEnergyMeter}, dailyEnergy=${d.dailyEnergy}`));
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
    maxTempResetEnabled?: boolean;
    maxTempLimit?: number;
    maxTempResetDelayMinutes?: number;
  }
) {
  console.log(`Updating settings for device ${deviceId}...`, settings);
  const supabase = getSupabaseClient();

  const updateData: Record<string, unknown> = {};
  
  if (settings.fanAutoRecovery !== undefined) {
    updateData.fan_auto_recovery = settings.fanAutoRecovery;
    
    // When turning off auto-recovery, clear pending recovery immediately
    if (settings.fanAutoRecovery === false) {
      updateData.pending_fan_recovery_at = null;
      updateData.pending_fan_speed = 4;
      console.log(`Clearing pending recovery for device ${deviceId} (fan auto-recovery disabled)`);
    }
  }
  
  if (settings.fanRecoveryDelayMinutes !== undefined) {
    updateData.fan_recovery_delay_minutes = settings.fanRecoveryDelayMinutes;
  }

  // Max temperature reset settings
  if (settings.maxTempResetEnabled !== undefined) {
    updateData.max_temp_reset_enabled = settings.maxTempResetEnabled;
    
    // When turning off, clear pending reset
    if (settings.maxTempResetEnabled === false) {
      updateData.pending_temp_reset_at = null;
      updateData.original_set_temperature = null;
      console.log(`Clearing pending temp reset for device ${deviceId} (max temp reset disabled)`);
    }
  }

  if (settings.maxTempLimit !== undefined) {
    updateData.max_temp_limit = settings.maxTempLimit;
  }

  if (settings.maxTempResetDelayMinutes !== undefined) {
    updateData.max_temp_reset_delay_minutes = settings.maxTempResetDelayMinutes;
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

async function getDeviceHistory(deviceId: number, period: '24h' | '7d' | '30d', aggregation: 'raw' | 'hourly' = 'raw') {
  console.log(`Fetching history for device ${deviceId}, period: ${period}, aggregation: ${aggregation}`);
  const supabase = getSupabaseClient();

  let hoursAgo = 24;
  if (period === '7d') hoursAgo = 168;
  if (period === '30d') hoursAgo = 720;

  const startDate = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

  // Fetch temperature history (include actual_outdoor_temp from Open-Meteo)
  const { data: history, error: historyError } = await supabase
    .from('heat_pump_history')
    .select('room_temperature, set_temperature, outdoor_temperature, actual_outdoor_temp, operating_state, fan_speed, power, recorded_at')
    .eq('device_id', deviceId)
    .gte('recorded_at', startDate)
    .order('recorded_at', { ascending: true });

  if (historyError) {
    throw new Error(`Failed to fetch history: ${historyError.message}`);
  }

  // Aggregate to hourly if requested (for 7d and 30d views)
  let processedHistory = history || [];
  if (aggregation === 'hourly' && processedHistory.length > 0) {
    const hourlyMap = new Map<string, {
      room_temps: number[];
      set_temps: number[];
      outdoor_temps: number[];
      actual_outdoor_temps: number[];
      states: string[];
      recorded_at: string;
    }>();

    processedHistory.forEach((h: any) => {
      const date = new Date(h.recorded_at);
      date.setMinutes(0, 0, 0);
      const hourKey = date.toISOString();

      if (!hourlyMap.has(hourKey)) {
        hourlyMap.set(hourKey, {
          room_temps: [],
          set_temps: [],
          outdoor_temps: [],
          actual_outdoor_temps: [],
          states: [],
          recorded_at: hourKey,
        });
      }

      const bucket = hourlyMap.get(hourKey)!;
      bucket.room_temps.push(h.room_temperature);
      bucket.set_temps.push(h.set_temperature);
      if (h.outdoor_temperature !== null) bucket.outdoor_temps.push(h.outdoor_temperature);
      if (h.actual_outdoor_temp !== null) bucket.actual_outdoor_temps.push(h.actual_outdoor_temp);
      bucket.states.push(h.operating_state);
    });

    processedHistory = Array.from(hourlyMap.values()).map(bucket => ({
      room_temperature: bucket.room_temps.reduce((a, b) => a + b, 0) / bucket.room_temps.length,
      set_temperature: bucket.set_temps.reduce((a, b) => a + b, 0) / bucket.set_temps.length,
      outdoor_temperature: bucket.outdoor_temps.length > 0 
        ? bucket.outdoor_temps.reduce((a, b) => a + b, 0) / bucket.outdoor_temps.length 
        : null,
      actual_outdoor_temp: bucket.actual_outdoor_temps.length > 0 
        ? bucket.actual_outdoor_temps.reduce((a, b) => a + b, 0) / bucket.actual_outdoor_temps.length 
        : null,
      operating_state: bucket.states.includes('DEFROST') ? 'DEFROST' : bucket.states[0],
      recorded_at: bucket.recorded_at,
      fan_speed: 0,
      power: true,
    }));
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

  // Fetch recovery logs for efficiency analysis
  const { data: recoveryLogs, error: recoveryError } = await supabase
    .from('heat_pump_recovery_log')
    .select('*')
    .eq('device_id', deviceId)
    .gte('defrost_ended_at', startDate)
    .order('defrost_ended_at', { ascending: true });

  if (recoveryError) {
    console.warn('Failed to fetch recovery logs:', recoveryError.message);
  }

  // Fetch efficiency metrics
  const { data: efficiencyMetrics, error: efficiencyError } = await supabase
    .from('heat_pump_efficiency_metrics')
    .select('*')
    .eq('device_id', deviceId)
    .gte('recorded_at', startDate)
    .order('recorded_at', { ascending: true });

  if (efficiencyError) {
    console.warn('Failed to fetch efficiency metrics:', efficiencyError.message);
  }

  // Fetch performance baseline for this device
  const { data: performanceBaseline } = await supabase
    .from('heat_pump_performance_baseline')
    .select('*')
    .eq('device_id', deviceId);

  // Fetch fleet baseline
  const { data: fleetBaseline } = await supabase
    .from('heat_pump_fleet_baseline')
    .select('*');

  // Calculate defrost statistics
  const completedDefrosts = (defrostLogs || []).filter((d: { ended_at: string | null }) => d.ended_at !== null);
  const defrostCount = completedDefrosts.length;
  const avgDuration = defrostCount > 0 
    ? Math.round(completedDefrosts.reduce((sum: number, d: { duration_seconds: number | null }) => sum + (d.duration_seconds || 0), 0) / defrostCount)
    : 0;
  const maxDuration = defrostCount > 0
    ? Math.max(...completedDefrosts.map((d: { duration_seconds: number | null }) => d.duration_seconds || 0))
    : 0;

  // Calculate recovery statistics
  const validRecoveries = (recoveryLogs || []).filter((r: any) => r.recovery_speed !== null);
  const avgRecoverySpeed = validRecoveries.length > 0
    ? validRecoveries.reduce((sum: number, r: any) => sum + r.recovery_speed, 0) / validRecoveries.length
    : null;

  // Calculate total baseline samples
  const totalBaselineSamples = (performanceBaseline || []).reduce(
    (sum: number, b: PerformanceBaseline) => sum + b.sample_count, 0
  );

  return {
    history: processedHistory,
    defrostLogs: defrostLogs || [],
    recoveryLogs: recoveryLogs || [],
    efficiencyMetrics: efficiencyMetrics || [],
    performanceBaseline: performanceBaseline || [],
    fleetBaseline: fleetBaseline || [],
    statistics: {
      defrostCount,
      avgDurationSeconds: avgDuration,
      maxDurationSeconds: maxDuration,
      avgRoomTemperature: history && history.length > 0
        ? Math.round((history.reduce((sum: number, h: { room_temperature: number }) => sum + h.room_temperature, 0) / history.length) * 10) / 10
        : null,
      avgRecoverySpeed: avgRecoverySpeed !== null ? Math.round(avgRecoverySpeed * 100) / 100 : null,
      baselineSamples: totalBaselineSamples,
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
      const aggregation = (url.searchParams.get('aggregation') || 'raw') as 'raw' | 'hourly';
      
      if (!deviceId) {
        return new Response(
          JSON.stringify({ error: 'deviceId is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const historyData = await getDeviceHistory(deviceId, period, aggregation);
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
        const { fanAutoRecovery, fanRecoveryDelayMinutes, maxTempResetEnabled, maxTempLimit, maxTempResetDelayMinutes } = body;
        const result = await updateDeviceSettings(deviceId, deviceName || `Device ${deviceId}`, {
          fanAutoRecovery,
          fanRecoveryDelayMinutes,
          maxTempResetEnabled,
          maxTempLimit,
          maxTempResetDelayMinutes,
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
