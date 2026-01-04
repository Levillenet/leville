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

type OperatingState = 'HEATING' | 'COOLING' | 'DEFROST' | 'IDLE' | 'OFF' | 'ERROR' | 'UNKNOWN';
type EfficiencyStatus = 'SUFFICIENT' | 'MARGINAL' | 'INSUFFICIENT' | 'UNKNOWN';

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

function determineOperatingState(
  device: Device['Device'],
  lastKnownState: string,
  previousRoomTemp: number | null
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

  // Heuristic defrost detection
  if (
    device.OperationMode === 1 && // HEAT mode
    (device.SetFanSpeed === 0 || device.SetFanSpeed === 1) &&
    previousRoomTemp !== null &&
    device.RoomTemperature <= previousRoomTemp
  ) {
    if (previousRoomTemp - device.RoomTemperature >= 0.3 || lastKnownState === 'DEFROST') {
      return 'DEFROST';
    }
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

// Determine efficiency status based on temperature debt and trends
function determineEfficiencyStatus(
  tempDebt: number,
  degreeMinutesTrend: 'increasing' | 'decreasing' | 'stable',
  recoverySpeedRatio: number | null // current vs normal
): EfficiencyStatus {
  // SUFFICIENT: tempDebt < 0.5, degree minutes decreasing, recovery normal
  if (tempDebt < 0.5 && degreeMinutesTrend !== 'increasing') {
    return 'SUFFICIENT';
  }
  
  // INSUFFICIENT: tempDebt > 1.5, degree minutes increasing, recovery failing
  if (tempDebt > 1.5 || (degreeMinutesTrend === 'increasing' && tempDebt > 1.0)) {
    return 'INSUFFICIENT';
  }
  
  // MARGINAL: in between
  if (tempDebt >= 0.5 && tempDebt <= 1.5) {
    return 'MARGINAL';
  }
  
  return 'UNKNOWN';
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

    // Fetch previous temperatures for defrost detection
    const { data: lastHistory } = await supabase
      .from('heat_pump_history')
      .select('device_id, room_temperature')
      .in('device_id', deviceIds)
      .gte('recorded_at', new Date(Date.now() - 15 * 60 * 1000).toISOString())
      .order('recorded_at', { ascending: false });

    const lastTempMap = new Map<number, number>();
    (lastHistory || []).forEach(h => {
      if (!lastTempMap.has(h.device_id)) {
        lastTempMap.set(h.device_id, h.room_temperature);
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
    const recoveryLogInserts: Array<{
      device_id: number;
      defrost_ended_at: string;
      target_reached_at: string;
      recovery_duration_seconds: number;
      recovery_speed: number;
      outdoor_temperature: number | null;
      temperature_delta: number;
    }> = [];

    const INTERVAL_MINUTES = 5; // Cron interval

    for (const deviceWrapper of devices) {
      const device = deviceWrapper.Device;
      const deviceId = device.DeviceID;
      const buildingId = deviceWrapper.BuildingID || device.BuildingID;
      const settings = settingsMap.get(deviceId);
      const lastTemp = lastTempMap.get(deviceId) ?? null;
      const lastKnownState = settings?.last_known_state || 'UNKNOWN';

      const operatingState = determineOperatingState(device, lastKnownState, lastTemp);

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

      // Determine degree minutes trend (compare to 30 min ago)
      const previousDegreeMinutes = currentDegreeMinutes;
      let degreeMinutesTrend: 'increasing' | 'decreasing' | 'stable' = 'stable';
      if (newDegreeMinutes > previousDegreeMinutes + 5) {
        degreeMinutesTrend = 'increasing';
      } else if (newDegreeMinutes < previousDegreeMinutes - 5) {
        degreeMinutesTrend = 'decreasing';
      }

      // Determine efficiency status
      const efficiencyStatus = determineEfficiencyStatus(tempDebt, degreeMinutesTrend, null);

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

        // FIXED: Check for pending fan recovery - only if auto-recovery is ENABLED
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

          if (tempDelta > 0) {
            recoveryLogInserts.push({
              device_id: deviceId,
              defrost_ended_at: recoveryTrackingStartedAt,
              target_reached_at: endTime.toISOString(),
              recovery_duration_seconds: durationSeconds,
              recovery_speed: recoverySpeed,
              outdoor_temperature: device.OutdoorTemperature ?? null,
              temperature_delta: tempDelta,
            });
          }

          // Clear tracking
          recoveryTrackingStartedAt = null;
          recoveryTrackingStartTemp = null;
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

      // FIXED: Check for pending fan recovery (not during defrost) - only if auto-recovery is ENABLED
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
        recoveryLogs: recoveryLogInserts.length,
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
