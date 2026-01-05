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

interface PerformanceBaseline {
  device_id: number;
  outdoor_temp_range: string;
  avg_recovery_speed: number;
  avg_temp_debt: number;
  total_recovery_time_seconds: number;
  sample_count: number;
}

interface FleetBaseline {
  outdoor_temp_range: string;
  fleet_avg_recovery_speed: number;
  fleet_avg_temp_debt: number;
  device_count: number;
  sample_count: number;
}

type OperatingState = 'HEATING' | 'COOLING' | 'DEFROST' | 'IDLE' | 'OFF' | 'ERROR' | 'UNKNOWN';
type EfficiencyStatus = 'SUFFICIENT' | 'MARGINAL' | 'INSUFFICIENT' | 'LEARNING' | 'UNKNOWN';

// Initialize Supabase client
function getSupabaseClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
}

// Get outdoor temperature range key (5°C buckets)
function getOutdoorTempRange(temp: number | null): string {
  if (temp === null) return 'unknown';
  const lower = Math.floor(temp / 5) * 5;
  const upper = lower + 5;
  return `${lower}_${upper}`;
}

// Minimum samples needed for reliable baseline
const MIN_BASELINE_SAMPLES = 10;

async function login(): Promise<string> {
  const email = Deno.env.get('MELCLOUD_EMAIL');
  const password = Deno.env.get('MELCLOUD_PASSWORD');

  if (!email || !password) {
    throw new Error('MELCloud credentials not configured');
  }

  console.log('[CRON] Logging in to MELCloud...');

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

  return data.LoginData.ContextKey;
}

async function getDevices(contextKey: string): Promise<Device[]> {
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
  return buildings.flatMap(building => building.Structure.Devices);
}

/**
 * Determine operating state using outdoor temperature changes for defrost detection.
 * 
 * Key insight: During defrost, the outdoor unit's heat exchanger is warmed,
 * which causes the outdoor temperature sensor to suddenly read 4-7°C higher.
 * When defrost ends, the temperature drops back down.
 */
function determineOperatingState(
  device: Device['Device'],
  lastKnownState: string,
  previousRoomTemp: number | null,
  previousOutdoorTemp: number | null
): OperatingState {
  const lastComm = new Date(device.LastCommunication);
  const now = new Date();
  const diffMinutes = (now.getTime() - lastComm.getTime()) / 60000;
  
  if (diffMinutes > 30) {
    return 'ERROR';
  }

  if (!device.Power) {
    return 'OFF';
  }

  const outdoorTemp = device.OutdoorTemperature ?? null;

  // PRIMARY SIGNAL: Sudden outdoor temperature rise = defrost starting
  if (previousOutdoorTemp !== null && outdoorTemp !== null) {
    const outdoorTempChange = outdoorTemp - previousOutdoorTemp;
    
    // Outdoor temp rose >= 4°C in ~5 minutes = DEFROST started
    if (outdoorTempChange >= 4) {
      console.log(`[DEFROST] Device ${device.DeviceID}: outdoor temp rose ${outdoorTempChange.toFixed(1)}°C (${previousOutdoorTemp}→${outdoorTemp}) - DEFROST DETECTED`);
      return 'DEFROST';
    }
    
    // Outdoor temp dropped >= 4°C from DEFROST state = defrost ended
    if (outdoorTempChange <= -4 && lastKnownState === 'DEFROST') {
      console.log(`[DEFROST] Device ${device.DeviceID}: outdoor temp dropped ${outdoorTempChange.toFixed(1)}°C - DEFROST ENDED`);
      return 'HEATING';
    }
  }

  // CONTINUATION: If last state was DEFROST and room temp still dropping, continue DEFROST
  if (lastKnownState === 'DEFROST') {
    // Continue defrost if room temp is still below or equal to previous
    if (previousRoomTemp !== null && device.RoomTemperature <= previousRoomTemp) {
      console.log(`[DEFROST] Device ${device.DeviceID}: continuing defrost (room temp ${previousRoomTemp}→${device.RoomTemperature})`);
      return 'DEFROST';
    }
    // Also continue if outdoor temp is still elevated (hasn't dropped back yet)
    if (previousOutdoorTemp !== null && outdoorTemp !== null && outdoorTemp > previousOutdoorTemp - 2) {
      console.log(`[DEFROST] Device ${device.DeviceID}: continuing defrost (outdoor temp still elevated)`);
      return 'DEFROST';
    }
  }

  // IDLE check: if target temperature is reached
  const tempDebt = (device.SetTemperature ?? 0) - device.RoomTemperature;
  if (tempDebt <= 0.5) {
    return 'IDLE';
  }

  switch (device.OperationMode) {
    case 1:
      return 'HEATING';
    case 3:
      return 'COOLING';
    default:
      return device.Power ? 'HEATING' : 'IDLE';
  }
}

// New: Comparative efficiency analysis
function determineEfficiencyStatusComparative(
  tempDebt: number,
  deviceBaseline: PerformanceBaseline | null,
  fleetBaseline: FleetBaseline | null,
  currentRecoverySpeed: number | null
): { status: EfficiencyStatus; performanceRatio: number | null; reason: string } {
  // If not enough baseline data, show learning status
  if (!deviceBaseline || deviceBaseline.sample_count < MIN_BASELINE_SAMPLES) {
    const samples = deviceBaseline?.sample_count || 0;
    return {
      status: 'LEARNING',
      performanceRatio: null,
      reason: `Kerää dataa (${samples}/${MIN_BASELINE_SAMPLES})`,
    };
  }

  // If no fleet baseline, compare to device's own average
  if (!fleetBaseline || fleetBaseline.sample_count < MIN_BASELINE_SAMPLES) {
    // Compare to own baseline
    const debtRatio = deviceBaseline.avg_temp_debt > 0 
      ? tempDebt / deviceBaseline.avg_temp_debt 
      : tempDebt < 0.5 ? 1 : 0.5;
    
    if (debtRatio <= 1.1) {
      return { status: 'SUFFICIENT', performanceRatio: 100, reason: 'Normaali suorituskyky' };
    } else if (debtRatio <= 1.5) {
      return { status: 'MARGINAL', performanceRatio: Math.round(100 / debtRatio), reason: 'Hieman tavallista hitaampi' };
    } else {
      return { status: 'INSUFFICIENT', performanceRatio: Math.round(100 / debtRatio), reason: 'Selvästi tavallista hitaampi' };
    }
  }

  // Full comparative analysis
  // Performance ratio: how well this device performs vs fleet average
  // Higher is better (100% = average, 120% = 20% better, 80% = 20% worse)
  let performanceRatio = 100;
  let reason = '';

  // Compare recovery speed if available
  if (currentRecoverySpeed !== null && fleetBaseline.fleet_avg_recovery_speed > 0) {
    const speedRatio = currentRecoverySpeed / fleetBaseline.fleet_avg_recovery_speed;
    performanceRatio = Math.round(speedRatio * 100);
  } else if (deviceBaseline.avg_recovery_speed > 0 && fleetBaseline.fleet_avg_recovery_speed > 0) {
    // Use historical average
    const speedRatio = deviceBaseline.avg_recovery_speed / fleetBaseline.fleet_avg_recovery_speed;
    performanceRatio = Math.round(speedRatio * 100);
  } else {
    // Use temp debt comparison
    if (fleetBaseline.fleet_avg_temp_debt > 0) {
      const debtRatio = fleetBaseline.fleet_avg_temp_debt / Math.max(tempDebt, 0.1);
      performanceRatio = Math.round(Math.min(debtRatio * 100, 150)); // Cap at 150%
    }
  }

  // Determine status based on performance ratio
  if (performanceRatio >= 90) {
    reason = performanceRatio >= 100 
      ? `Pärjää ${performanceRatio - 100}% keskiarvoa paremmin`
      : `Pärjää ${100 - performanceRatio}% keskiarvon alle`;
    return { status: 'SUFFICIENT', performanceRatio, reason };
  } else if (performanceRatio >= 70) {
    reason = `${100 - performanceRatio}% heikompi kuin keskiarvo`;
    return { status: 'MARGINAL', performanceRatio, reason };
  } else {
    reason = `${100 - performanceRatio}% heikompi kuin keskiarvo`;
    return { status: 'INSUFFICIENT', performanceRatio, reason };
  }
}

async function setTemperature(
  contextKey: string,
  deviceId: number,
  buildingId: number,
  temperature: number
): Promise<boolean> {
  console.log(`[CRON] Setting temperature ${temperature} for device ${deviceId}`);

  try {
    const deviceResponse = await fetch(
      `${MELCLOUD_BASE_URL}/Device/Get?id=${deviceId}&buildingID=${buildingId}`,
      {
        method: 'GET',
        headers: { 'X-MitsContextKey': contextKey },
      }
    );

    if (!deviceResponse.ok) {
      console.error(`[CRON] Failed to get device ${deviceId}: ${deviceResponse.status}`);
      return false;
    }

    const currentState = await deviceResponse.json();

    const updatePayload = {
      ...currentState,
      SetTemperature: temperature,
      EffectiveFlags: 0x04, // Temperature flag
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
      console.error(`[CRON] Failed to set temperature for device ${deviceId}: ${response.status}`);
      return false;
    }

    console.log(`[CRON] Temperature set successfully for device ${deviceId}`);
    return true;
  } catch (error) {
    console.error(`[CRON] Error setting temperature for device ${deviceId}:`, error);
    return false;
  }
}

async function setFanSpeed(
  contextKey: string,
  deviceId: number,
  buildingId: number,
  fanSpeed: number
): Promise<boolean> {
  console.log(`[CRON] Setting fan speed ${fanSpeed} for device ${deviceId}`);

  try {
    const deviceResponse = await fetch(
      `${MELCLOUD_BASE_URL}/Device/Get?id=${deviceId}&buildingID=${buildingId}`,
      {
        method: 'GET',
        headers: { 'X-MitsContextKey': contextKey },
      }
    );

    if (!deviceResponse.ok) {
      console.error(`[CRON] Failed to get device ${deviceId}: ${deviceResponse.status}`);
      return false;
    }

    const currentState = await deviceResponse.json();

    const updatePayload = {
      ...currentState,
      SetFanSpeed: fanSpeed,
      EffectiveFlags: 0x08, // Fan speed flag
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
      console.error(`[CRON] Failed to set fan speed for device ${deviceId}: ${response.status}`);
      return false;
    }

    console.log(`[CRON] Fan speed set successfully for device ${deviceId}`);
    return true;
  } catch (error) {
    console.error(`[CRON] Error setting fan speed for device ${deviceId}:`, error);
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  console.log('[CRON] MELCloud cron job started');

  try {
    const supabase = getSupabaseClient();
    const contextKey = await login();
    const devices = await getDevices(contextKey);

    console.log(`[CRON] Processing ${devices.length} devices`);

    // Get device IDs
    const deviceIds = devices.map(d => d.Device.DeviceID);

    // Fetch current settings
    const { data: settingsData } = await supabase
      .from('heat_pump_settings')
      .select('*')
      .in('device_id', deviceIds);

    const settingsMap = new Map(
      (settingsData || []).map(s => [s.device_id, s])
    );

// Fetch previous temperatures for defrost detection (including outdoor temp)
    const { data: lastHistory } = await supabase
      .from('heat_pump_history')
      .select('device_id, room_temperature, outdoor_temperature, operating_state')
      .in('device_id', deviceIds)
      .gte('recorded_at', new Date(Date.now() - 15 * 60 * 1000).toISOString())
      .order('recorded_at', { ascending: false });

    // Build a map with all previous data needed for defrost detection
    const lastDataMap = new Map<number, { 
      roomTemp: number; 
      outdoorTemp: number | null; 
      operatingState: string;
    }>();
    (lastHistory || []).forEach(h => {
      if (!lastDataMap.has(h.device_id)) {
        lastDataMap.set(h.device_id, {
          roomTemp: h.room_temperature,
          outdoorTemp: h.outdoor_temperature,
          operatingState: h.operating_state,
        });
      }
    });

    // Fetch open defrost cycles
    const { data: openDefrosts } = await supabase
      .from('heat_pump_defrost_log')
      .select('*')
      .in('device_id', deviceIds)
      .is('ended_at', null);

    const openDefrostMap = new Map(
      (openDefrosts || []).map(d => [d.device_id, d])
    );

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

    // Process each device
    const historyInserts: Array<{
      device_id: number;
      room_temperature: number;
      set_temperature: number;
      outdoor_temperature: number | null;
      operating_state: OperatingState;
      fan_speed: number;
      power: boolean;
      operation_mode: string;
    }> = [];

    const defrostUpdates: Array<{ id: string; ended_at: string; duration_seconds: number }> = [];
    const defrostInserts: Array<{ device_id: number; started_at: string }> = [];
    const stateUpdates: Array<{ 
      device_id: number; 
      last_known_state: OperatingState; 
      device_name: string;
      degree_minutes: number;
      efficiency_status: EfficiencyStatus;
      recovery_tracking_started_at?: string | null;
      recovery_tracking_start_temp?: number | null;
    }> = [];
    const fanRecoveries: Array<{ device_id: number; building_id: number; fan_speed: number }> = [];
    const tempResets: Array<{ device_id: number; building_id: number; temperature: number; original_temperature: number }> = [];
    const recoveryLogInserts: Array<{
      device_id: number;
      defrost_ended_at: string;
      target_reached_at: string;
      recovery_duration_seconds: number;
      recovery_speed: number;
      outdoor_temperature: number | null;
      temperature_delta: number;
    }> = [];

    // Baseline updates to batch
    const baselineUpdates: Array<{
      device_id: number;
      outdoor_temp_range: string;
      temp_debt: number;
      recovery_speed: number | null;
    }> = [];

    const INTERVAL_MINUTES = 5; // Cron interval

    for (const deviceWrapper of devices) {
      const device = deviceWrapper.Device;
      const deviceId = device.DeviceID;
      const buildingId = deviceWrapper.BuildingID || device.BuildingID;
      const settings = settingsMap.get(deviceId);
      const lastData = lastDataMap.get(deviceId);
      const lastRoomTemp = lastData?.roomTemp ?? null;
      const lastOutdoorTemp = lastData?.outdoorTemp ?? null;
      const lastKnownState = settings?.last_known_state || lastData?.operatingState || 'UNKNOWN';

      const operatingState = determineOperatingState(device, lastKnownState, lastRoomTemp, lastOutdoorTemp);
      
      // Debug logging for temperature changes
      const outdoorTemp = device.OutdoorTemperature ?? null;
      const outdoorChange = (lastOutdoorTemp !== null && outdoorTemp !== null) 
        ? outdoorTemp - lastOutdoorTemp 
        : 0;
      console.log(`[CRON] ${device.DeviceName}: outdoor ${lastOutdoorTemp?.toFixed(1) ?? '?'}→${outdoorTemp?.toFixed(1) ?? '?'}°C (${outdoorChange >= 0 ? '+' : ''}${outdoorChange.toFixed(1)}), room ${lastRoomTemp?.toFixed(1) ?? '?'}→${device.RoomTemperature.toFixed(1)}°C, state: ${lastKnownState}→${operatingState}`);
      const outdoorTempRange = getOutdoorTempRange(device.OutdoorTemperature ?? null);

      // Store history
      historyInserts.push({
        device_id: deviceId,
        room_temperature: device.RoomTemperature,
        set_temperature: device.SetTemperature,
        outdoor_temperature: device.OutdoorTemperature ?? null,
        operating_state: operatingState,
        fan_speed: device.SetFanSpeed,
        power: device.Power,
        operation_mode: ['unknown', 'heating', 'drying', 'cooling', '', '', '', 'fan', 'auto'][device.OperationMode] || 'unknown',
      });

      // Calculate temperature debt and degree minutes
      const tempDebt = Math.max(0, device.SetTemperature - device.RoomTemperature);
      const currentDegreeMinutes = settings?.degree_minutes ?? 0;
      const newDegreeMinutes = currentDegreeMinutes + (tempDebt * INTERVAL_MINUTES);

      // Get baselines for comparative analysis
      const deviceBaseline = baselineMap.get(`${deviceId}_${outdoorTempRange}`) || null;
      const fleetBaseline = fleetBaselineMap.get(outdoorTempRange) || null;

      // Determine efficiency status using comparative analysis
      const { status: efficiencyStatus } = determineEfficiencyStatusComparative(
        tempDebt,
        deviceBaseline,
        fleetBaseline,
        null // No current recovery speed during normal operation
      );

      // Track recovery after defrost
      let recoveryTrackingStartedAt = settings?.recovery_tracking_started_at;
      let recoveryTrackingStartTemp = settings?.recovery_tracking_start_temp;

      // Handle defrost cycle tracking
      const openDefrost = openDefrostMap.get(deviceId);

      if (operatingState === 'DEFROST' && !openDefrost) {
        // Start new defrost cycle
        console.log(`[CRON] Starting defrost cycle for device ${deviceId}`);
        defrostInserts.push({
          device_id: deviceId,
          started_at: new Date().toISOString(),
        });
      } else if (operatingState !== 'DEFROST' && openDefrost) {
        // End defrost cycle
        const endedAt = new Date();
        const startedAt = new Date(openDefrost.started_at);
        const durationSeconds = Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000);
        
        console.log(`[CRON] Ending defrost cycle for device ${deviceId}, duration: ${durationSeconds}s`);
        defrostUpdates.push({
          id: openDefrost.id,
          ended_at: endedAt.toISOString(),
          duration_seconds: durationSeconds,
        });

        // Start recovery tracking
        recoveryTrackingStartedAt = endedAt.toISOString();
        recoveryTrackingStartTemp = device.RoomTemperature;

        // Check for pending fan recovery - only if auto-recovery is ENABLED
        if (settings?.pending_fan_recovery_at && settings?.fan_auto_recovery === true) {
          const pendingAt = new Date(settings.pending_fan_recovery_at);
          if (pendingAt <= new Date()) {
            console.log(`[CRON] Executing pending fan recovery for device ${deviceId}`);
            fanRecoveries.push({
              device_id: deviceId,
              building_id: buildingId,
              fan_speed: settings.pending_fan_speed || 4,
            });
          }
        }
      }

      // Check if recovery is complete (reached target temp)
      if (recoveryTrackingStartedAt && recoveryTrackingStartTemp !== null && recoveryTrackingStartTemp !== undefined) {
        if (device.RoomTemperature >= device.SetTemperature) {
          // Recovery complete
          const startTime = new Date(recoveryTrackingStartedAt);
          const endTime = new Date();
          const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
          const tempDelta = device.RoomTemperature - recoveryTrackingStartTemp;
          const recoverySpeed = durationSeconds > 0 ? (tempDelta / (durationSeconds / 60)) : 0; // °C/min

          console.log(`[CRON] Recovery complete for device ${deviceId}: ${tempDelta.toFixed(1)}°C in ${durationSeconds}s (${recoverySpeed.toFixed(3)}°C/min)`);

          if (tempDelta > 0 && recoverySpeed > 0) {
            recoveryLogInserts.push({
              device_id: deviceId,
              defrost_ended_at: recoveryTrackingStartedAt,
              target_reached_at: endTime.toISOString(),
              recovery_duration_seconds: durationSeconds,
              recovery_speed: recoverySpeed,
              outdoor_temperature: device.OutdoorTemperature ?? null,
              temperature_delta: tempDelta,
            });

            // Queue baseline update with recovery data
            baselineUpdates.push({
              device_id: deviceId,
              outdoor_temp_range: outdoorTempRange,
              temp_debt: tempDelta, // Use temp delta as the debt that was recovered
              recovery_speed: recoverySpeed,
            });
          }

          // Clear tracking
          recoveryTrackingStartedAt = null;
          recoveryTrackingStartTemp = null;
        }
      }

      // Always queue baseline update for temp debt tracking (even without recovery)
      if (device.Power && operatingState !== 'OFF' && operatingState !== 'DEFROST') {
        // Only add if we haven't already added a recovery-based update
        const hasRecoveryUpdate = baselineUpdates.some(
          u => u.device_id === deviceId && u.outdoor_temp_range === outdoorTempRange && u.recovery_speed !== null
        );
        if (!hasRecoveryUpdate) {
          baselineUpdates.push({
            device_id: deviceId,
            outdoor_temp_range: outdoorTempRange,
            temp_debt: tempDebt,
            recovery_speed: null,
          });
        }
      }

      // Track state for settings
      stateUpdates.push({
        device_id: deviceId,
        last_known_state: operatingState,
        device_name: device.DeviceName,
        degree_minutes: newDegreeMinutes,
        efficiency_status: efficiencyStatus,
        recovery_tracking_started_at: recoveryTrackingStartedAt,
        recovery_tracking_start_temp: recoveryTrackingStartTemp,
      });

      // Check for pending fan recovery (not during defrost) - only if auto-recovery is ENABLED
      if (operatingState !== 'DEFROST' && settings?.pending_fan_recovery_at && settings?.fan_auto_recovery === true && !openDefrost) {
        const pendingAt = new Date(settings.pending_fan_recovery_at);
        if (pendingAt <= new Date()) {
          // Check if not already queued
          const alreadyQueued = fanRecoveries.some(r => r.device_id === deviceId);
          if (!alreadyQueued) {
            console.log(`[CRON] Executing scheduled fan recovery for device ${deviceId}`);
            fanRecoveries.push({
              device_id: deviceId,
              building_id: buildingId,
              fan_speed: settings.pending_fan_speed || 4,
            });
          }
        }
      }

      // MAX TEMPERATURE RESET LOGIC
      if (settings?.max_temp_reset_enabled && operatingState !== 'DEFROST') {
        const currentSetTemp = device.SetTemperature;
        const maxTempLimit = settings.max_temp_limit ?? 22;

        // Check if temperature exceeds limit and no pending reset
        if (currentSetTemp > maxTempLimit && !settings.pending_temp_reset_at) {
          const resetDelayMinutes = settings.max_temp_reset_delay_minutes || 60;
          const resetAt = new Date(Date.now() + resetDelayMinutes * 60000);
          console.log(`[CRON] Device ${deviceId}: temp ${currentSetTemp}°C exceeds limit ${maxTempLimit}°C, scheduling reset at ${resetAt.toISOString()}`);

          // Update settings with pending reset
          await supabase.from('heat_pump_settings')
            .update({
              pending_temp_reset_at: resetAt.toISOString(),
              original_set_temperature: currentSetTemp,
              updated_at: new Date().toISOString(),
            })
            .eq('device_id', deviceId);
        }
        // If temperature was manually lowered below limit, clear pending reset
        else if (currentSetTemp <= maxTempLimit && settings.pending_temp_reset_at) {
          console.log(`[CRON] Device ${deviceId}: temp ${currentSetTemp}°C now within limit, clearing pending reset`);
          await supabase.from('heat_pump_settings')
            .update({
              pending_temp_reset_at: null,
              original_set_temperature: null,
              updated_at: new Date().toISOString(),
            })
            .eq('device_id', deviceId);
        }
      }

      // Execute temperature reset if time has passed
      if (settings?.pending_temp_reset_at && settings?.max_temp_reset_enabled && operatingState !== 'DEFROST') {
        const resetAt = new Date(settings.pending_temp_reset_at);
        if (resetAt <= new Date()) {
          const maxTempLimit = settings.max_temp_limit ?? 22;
          const originalTemp = settings.original_set_temperature ?? device.SetTemperature;
          console.log(`[CRON] Executing temperature reset for device ${deviceId} from ${originalTemp}°C to ${maxTempLimit}°C`);

          tempResets.push({
            device_id: deviceId,
            building_id: buildingId,
            temperature: maxTempLimit,
            original_temperature: originalTemp,
          });
        }
      }
    }

    // Execute database operations
    if (historyInserts.length > 0) {
      const { error: historyError } = await supabase
        .from('heat_pump_history')
        .insert(historyInserts);
      
      if (historyError) {
        console.error('[CRON] Error inserting history:', historyError);
      } else {
        console.log(`[CRON] Inserted ${historyInserts.length} history records`);
      }
    }

    if (defrostInserts.length > 0) {
      const { error: defrostInsertError } = await supabase
        .from('heat_pump_defrost_log')
        .insert(defrostInserts);
      
      if (defrostInsertError) {
        console.error('[CRON] Error inserting defrost logs:', defrostInsertError);
      }
    }

    for (const update of defrostUpdates) {
      const { error: defrostUpdateError } = await supabase
        .from('heat_pump_defrost_log')
        .update({
          ended_at: update.ended_at,
          duration_seconds: update.duration_seconds,
        })
        .eq('id', update.id);
      
      if (defrostUpdateError) {
        console.error('[CRON] Error updating defrost log:', defrostUpdateError);
      }
    }

    // Insert recovery logs
    if (recoveryLogInserts.length > 0) {
      const { error: recoveryError } = await supabase
        .from('heat_pump_recovery_log')
        .insert(recoveryLogInserts);
      
      if (recoveryError) {
        console.error('[CRON] Error inserting recovery logs:', recoveryError);
      } else {
        console.log(`[CRON] Inserted ${recoveryLogInserts.length} recovery logs`);
      }
    }

    // Update performance baselines
    if (baselineUpdates.length > 0) {
      console.log(`[CRON] Updating ${baselineUpdates.length} baselines`);
      
      // Group by device_id + outdoor_temp_range
      const groupedUpdates = new Map<string, typeof baselineUpdates>();
      for (const update of baselineUpdates) {
        const key = `${update.device_id}_${update.outdoor_temp_range}`;
        if (!groupedUpdates.has(key)) {
          groupedUpdates.set(key, []);
        }
        groupedUpdates.get(key)!.push(update);
      }

      for (const [key, updates] of groupedUpdates) {
        // Fix: Parse key correctly - deviceId_outdoorTempRange where outdoorTempRange contains underscore (e.g., "12345678_-15_-10")
        const firstUnderscore = key.indexOf('_');
        const deviceIdStr = key.substring(0, firstUnderscore);
        const outdoorTempRange = key.substring(firstUnderscore + 1);
        const deviceId = parseInt(deviceIdStr);
        
        // Get existing baseline
        const existing = baselineMap.get(key);
        
        // Calculate new averages
        const avgTempDebt = updates.reduce((sum, u) => sum + u.temp_debt, 0) / updates.length;
        const recoveryUpdates = updates.filter(u => u.recovery_speed !== null);
        const avgRecoverySpeed = recoveryUpdates.length > 0
          ? recoveryUpdates.reduce((sum, u) => sum + (u.recovery_speed || 0), 0) / recoveryUpdates.length
          : null;

        if (existing) {
          // Update existing baseline with rolling average
          const newSampleCount = existing.sample_count + 1;
          const newAvgTempDebt = (existing.avg_temp_debt * existing.sample_count + avgTempDebt) / newSampleCount;
          const newAvgRecoverySpeed = avgRecoverySpeed !== null
            ? (existing.avg_recovery_speed * existing.sample_count + avgRecoverySpeed) / newSampleCount
            : existing.avg_recovery_speed;

          await supabase
            .from('heat_pump_performance_baseline')
            .update({
              avg_temp_debt: newAvgTempDebt,
              avg_recovery_speed: newAvgRecoverySpeed,
              sample_count: newSampleCount,
              updated_at: new Date().toISOString(),
            })
            .eq('device_id', deviceId)
            .eq('outdoor_temp_range', outdoorTempRange);
        } else {
          // Insert new baseline
          await supabase
            .from('heat_pump_performance_baseline')
            .insert({
              device_id: deviceId,
              outdoor_temp_range: outdoorTempRange,
              avg_temp_debt: avgTempDebt,
              avg_recovery_speed: avgRecoverySpeed || 0,
              sample_count: 1,
            });
        }
      }

      // Update fleet baselines
      const { data: allDeviceBaselines } = await supabase
        .from('heat_pump_performance_baseline')
        .select('*');

      if (allDeviceBaselines && allDeviceBaselines.length > 0) {
        // Group by outdoor_temp_range
        const fleetGroups = new Map<string, Array<{ avg_recovery_speed: number; avg_temp_debt: number; sample_count: number }>>();
        
        for (const baseline of allDeviceBaselines) {
          if (!fleetGroups.has(baseline.outdoor_temp_range)) {
            fleetGroups.set(baseline.outdoor_temp_range, []);
          }
          fleetGroups.get(baseline.outdoor_temp_range)!.push(baseline);
        }

        for (const [tempRange, baselines] of fleetGroups) {
          const deviceCount = baselines.length;
          const totalSamples = baselines.reduce((sum, b) => sum + b.sample_count, 0);
          
          // Weighted average by sample count
          const weightedAvgRecoverySpeed = baselines.reduce(
            (sum, b) => sum + b.avg_recovery_speed * b.sample_count, 0
          ) / totalSamples;
          const weightedAvgTempDebt = baselines.reduce(
            (sum, b) => sum + b.avg_temp_debt * b.sample_count, 0
          ) / totalSamples;

          await supabase
            .from('heat_pump_fleet_baseline')
            .upsert({
              outdoor_temp_range: tempRange,
              fleet_avg_recovery_speed: weightedAvgRecoverySpeed,
              fleet_avg_temp_debt: weightedAvgTempDebt,
              device_count: deviceCount,
              sample_count: totalSamples,
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'outdoor_temp_range',
            });
        }
        
        console.log(`[CRON] Updated fleet baselines for ${fleetGroups.size} temperature ranges`);
      }
    }

    // Update state settings
    for (const stateUpdate of stateUpdates) {
      await supabase
        .from('heat_pump_settings')
        .upsert({
          device_id: stateUpdate.device_id,
          device_name: stateUpdate.device_name,
          last_known_state: stateUpdate.last_known_state,
          degree_minutes: stateUpdate.degree_minutes,
          efficiency_status: stateUpdate.efficiency_status,
          recovery_tracking_started_at: stateUpdate.recovery_tracking_started_at,
          recovery_tracking_start_temp: stateUpdate.recovery_tracking_start_temp,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'device_id',
        });
    }

    // Execute fan recoveries
    for (const recovery of fanRecoveries) {
      const success = await setFanSpeed(contextKey, recovery.device_id, recovery.building_id, recovery.fan_speed);
      
      if (success) {
        // Clear pending recovery
        await supabase
          .from('heat_pump_settings')
          .update({
            pending_fan_recovery_at: null,
            updated_at: new Date().toISOString(),
          })
          .eq('device_id', recovery.device_id);
      }
    }

    // Execute temperature resets
    for (const reset of tempResets) {
      const success = await setTemperature(contextKey, reset.device_id, reset.building_id, reset.temperature);
      
      if (success) {
        // Log the reset
        await supabase
          .from('heat_pump_temp_reset_log')
          .insert({
            device_id: reset.device_id,
            original_temperature: reset.original_temperature,
            reset_to_temperature: reset.temperature,
          });

        // Clear pending reset
        await supabase
          .from('heat_pump_settings')
          .update({
            pending_temp_reset_at: null,
            original_set_temperature: null,
            updated_at: new Date().toISOString(),
          })
          .eq('device_id', reset.device_id);
        
        console.log(`[CRON] Temperature reset successful for device ${reset.device_id}`);
      }
    }

    const duration = Date.now() - startTime;
    console.log(`[CRON] Job completed in ${duration}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        devicesProcessed: devices.length,
        historyRecords: historyInserts.length,
        defrostStarted: defrostInserts.length,
        defrostEnded: defrostUpdates.length,
        fanRecoveries: fanRecoveries.length,
        tempResets: tempResets.length,
        recoveryLogs: recoveryLogInserts.length,
        baselineUpdates: baselineUpdates.length,
        duration: `${duration}ms`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[CRON] Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
