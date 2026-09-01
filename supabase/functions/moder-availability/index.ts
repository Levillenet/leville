import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODER_BASE_URLS = ["https://app.moder.fi", "https://dev-app.moder.fi"];
const CACHE_ID = "moder_availability";
const MAX_DEAL_NIGHTS = 7;

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return formatDate(d);
}

function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

// Cache TTL: 1h between 06-23 Finnish time, 2h between 23-06
function isCacheValid(fetchedAt: string): boolean {
  const ageMs = Date.now() - new Date(fetchedAt).getTime();
  const finnishHour = new Date(Date.now() + 2 * 3600000).getUTCHours(); // EET approximation
  const dayTime = finnishHour >= 6 && finnishHour < 23;
  const maxAgeMs = (dayTime ? 1 : 2) * 3600000;
  return ageMs < maxAgeMs;
}

interface MappingRow {
  beds24_room_id: string;
  moder_room_type_id: number;
  property_name: string;
  cleaning_fee: number | null;
  max_guests: number | null;
}

interface DayInfo {
  date: string;
  isFree: boolean;
  minNights: number;
  checkinDenied: boolean;
  checkoutDenied: boolean;
  blackout: boolean;
}

interface Window_ {
  roomTypeId: number;
  checkIn: string;
  checkOut: string; // exclusive
  nights: number;
  minNights: number;
}

async function moderFetch(token: string, path: string): Promise<{ ok: boolean; status: number; json: any; base: string }> {
  let lastStatus = 0;
  for (const base of MODER_BASE_URLS) {
    for (const auth of [`Bearer ${token}`, token]) {
      try {
        const res = await fetch(`${base}${path}`, {
          headers: { Authorization: auth, Accept: "application/json" },
        });
        lastStatus = res.status;
        if (res.ok) {
          console.log(`Moder OK via ${base} (auth=${auth.startsWith("Bearer") ? "bearer" : "raw"})`);
          return { ok: true, status: res.status, json: await res.json(), base };
        }
        const text = await res.text();
        console.log(`Moder ${base}${path.slice(0, 60)}... auth=${auth.startsWith("Bearer") ? "bearer" : "raw"} -> ${res.status}: ${text.slice(0, 200)}`);
      } catch (e) {
        console.log(`Moder fetch error ${base}${path}:`, e);
      }
    }
  }
  return { ok: false, status: lastStatus, json: null, base: "" };
}

// Normalize availabilities payload into per-room-type day lists
function parseAvailabilities(payload: any, roomTypeIds: number[]): Map<number, DayInfo[]> {
  const result = new Map<number, DayInfo[]>();
  const raw = payload?.data ?? payload;

  const toDay = (d: any): DayInfo | null => {
    const date = d?.date ?? d?.day;
    if (!date) return null;
    return {
      date: String(date).slice(0, 10),
      isFree: d?.is_free === true || d?.available === true || (d?.free_rooms ?? 0) > 0,
      minNights: Number(d?.min_nights ?? d?.min_stay ?? 1) || 1,
      checkinDenied: d?.checkin_denied === true || d?.check_in_denied === true,
      checkoutDenied: d?.checkout_denied === true || d?.check_out_denied === true,
      blackout: d?.blackout === true,
    };
  };

  const toDayList = (container: any): DayInfo[] => {
    const daysRaw = container?.availabilities ?? container?.availability ?? container?.days ?? container?.dates ?? [];
    const list: DayInfo[] = [];
    if (Array.isArray(daysRaw)) {
      for (const d of daysRaw) {
        const day = toDay(d);
        if (day) list.push(day);
      }
    } else if (daysRaw && typeof daysRaw === "object") {
      for (const [date, v] of Object.entries(daysRaw)) {
        if (v && typeof v === "object") {
          const day = toDay({ date, ...(v as object) });
          if (day) list.push(day);
        } else {
          list.push({ date, isFree: v === true, minNights: 1, checkinDenied: false, checkoutDenied: false, blackout: false });
        }
      }
    }
    list.sort((a, b) => a.date.localeCompare(b.date));
    return list;
  };

  if (Array.isArray(raw)) {
    // Array of per-room-type entries
    for (const entry of raw) {
      const rtId = Number(entry?.room_type_id ?? entry?.room_type ?? entry?.id);
      if (!rtId) continue;
      result.set(rtId, toDayList(entry));
    }
  } else if (raw && typeof raw === "object") {
    // Possibly keyed by room type id, or a single flat day list (single room type queried)
    const keys = Object.keys(raw);
    const numericKeys = keys.filter(k => roomTypeIds.includes(Number(k)));
    if (numericKeys.length > 0) {
      for (const k of numericKeys) result.set(Number(k), toDayList(raw[k]));
    } else {
      const list = toDayList(raw);
      if (list.length > 0 && roomTypeIds.length === 1) result.set(roomTypeIds[0], list);
    }
  }

  return result;
}

// Build free windows from a sorted day list
function buildWindows(roomTypeId: number, days: DayInfo[], maxCheckIn: string): Window_[] {
  const windows: Window_[] = [];
  let start: DayInfo | null = null;

  const closeWindow = (endDateExclusive: string) => {
    if (!start) return;
    const nights = daysBetween(start.date, endDateExclusive);
    if (nights >= 1 && start.date <= maxCheckIn) {
      windows.push({
        roomTypeId,
        checkIn: start.date,
        checkOut: endDateExclusive,
        nights,
        minNights: start.minNights,
      });
    }
    start = null;
  };

  for (const day of days) {
    const usable = day.isFree && !day.blackout;
    if (usable) {
      if (!start) {
        // Window can only start on a day where check-in is allowed
        if (!day.checkinDenied) start = day;
      }
      // If checkout is denied on this day, the window must end before/at this date
      // (a stay must be able to end). We keep it simple: window ends after the last
      // day where checkout is allowed.
      if (day.checkoutDenied) {
        closeWindow(day.date);
      }
    } else {
      closeWindow(day.date);
    }
  }
  if (start && days.length > 0) {
    closeWindow(addDays(days[days.length - 1].date, 1));
  }
  return windows.filter(w => w.checkIn <= maxCheckIn);
}

// Fetch total price (EUR) for a stay of given length from window start
async function fetchPrice(
  token: string,
  base: string,
  roomTypeId: number,
  checkIn: string,
  nights: number
): Promise<number | null> {
  const dateEnd = addDays(checkIn, nights);
  const path = `/api/v1/prices?room_types[]=${roomTypeId}&date_start=${checkIn}&date_end=${dateEnd}&guests_adults=2`;
  const res = await moderFetch(token, path);
  if (!res.ok) return null;

  const raw = res.json?.data ?? res.json;
  const entries = Array.isArray(raw) ? raw : [raw];
  for (const e of entries) {
    const total = e?.total_price ?? e?.totalPrice ?? e?.price;
    if (typeof total === "number" && total > 0) {
      // Moder returns cents
      return Math.round(total) / 100;
    }
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("MODER_API_TOKEN");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!token || !supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: "Not configured", deals: [] }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const url = new URL(req.url);
    const forceRefresh = url.searchParams.get("force_refresh") === "true";

    // deals_days_ahead setting (default 28)
    let dealsDaysAhead = 28;
    const { data: daysSetting } = await supabase
      .from("site_settings").select("value").eq("id", "deals_days_ahead").maybeSingle();
    if (daysSetting?.value != null) {
      const parsed = typeof daysSetting.value === "number" ? daysSetting.value : parseInt(String(daysSetting.value), 10);
      if (!isNaN(parsed) && parsed > 0) dealsDaysAhead = parsed;
    }

    // Check cache
    if (!forceRefresh) {
      const { data: cache } = await supabase
        .from("beds24_cache").select("*").eq("id", CACHE_ID).maybeSingle();
      if (cache && isCacheValid(cache.fetched_at)) {
        console.log("Serving Moder availability from cache, fetched_at:", cache.fetched_at);
        return new Response(JSON.stringify({ ...cache.data, fromCache: true, fetchedAt: cache.fetched_at }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Room mapping
    const { data: mappingRows, error: mapErr } = await supabase
      .from("moder_property_mapping")
      .select("beds24_room_id, moder_room_type_id, property_name, cleaning_fee, max_guests")
      .not("moder_room_type_id", "is", null);
    if (mapErr) throw mapErr;

    const mappings = (mappingRows || []) as MappingRow[];
    const roomTypeIds = mappings.map(m => m.moder_room_type_id);
    console.log(`Mapped room types: ${roomTypeIds.length}`);

    if (roomTypeIds.length === 0) {
      return new Response(JSON.stringify({ deals: [], error: "no_mapped_rooms" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const today = new Date();
    const dateStart = formatDate(today);
    const dateEnd = formatDate(new Date(today.getTime() + (dealsDaysAhead + MAX_DEAL_NIGHTS) * 86400000));
    const maxCheckIn = formatDate(new Date(today.getTime() + dealsDaysAhead * 86400000));

    // Fetch availabilities for all room types in one call
    const roomTypesParam = roomTypeIds.map(id => `room_types[]=${id}`).join("&");
    const availRes = await moderFetch(token, `/api/v1/availabilities?date_start=${dateStart}&date_end=${dateEnd}&${roomTypesParam}`);
    if (!availRes.ok) {
      // Diagnostic: does the token work at all? Try the room-types endpoint
      const rtRes = await moderFetch(token, `/room-types`);
      console.log(`Room-types diagnostic: ok=${rtRes.ok} status=${rtRes.status}`);
      throw new Error(`Moder availabilities failed (status ${availRes.status})`);
    }
    console.log("Moder base URL:", availRes.base);
    console.log("Availabilities raw sample:", JSON.stringify(availRes.json).slice(0, 800));

    const daysByRoomType = parseAvailabilities(availRes.json, roomTypeIds);
    console.log(`Parsed day lists for ${daysByRoomType.size} room types`);

    // Build windows
    const allWindows: Window_[] = [];
    for (const [rtId, days] of daysByRoomType) {
      const wins = buildWindows(rtId, days, maxCheckIn);
      allWindows.push(...wins);
    }
    console.log(`Found ${allWindows.length} free windows`);

    // Fetch prices per window and supported length (2..min(7, windowNights))
    const deals: any[] = [];
    let probeLogged = false;

    for (const w of allWindows) {
      const mapping = mappings.find(m => m.moder_room_type_id === w.roomTypeId);
      if (!mapping) continue;

      const maxLen = Math.min(MAX_DEAL_NIGHTS, w.nights);
      const pricesByNights: Record<string, number> = {};
      const nightlyProbe: Record<string, number> = {};

      for (let len = 2; len <= maxLen; len++) {
        const price = await fetchPrice(token, availRes.base, w.roomTypeId, w.checkIn, len);
        if (price != null) {
          pricesByNights[String(len)] = price;
          nightlyProbe[String(len)] = Math.round((price / len) * 100) / 100;
        }
      }

      // Length-dependent pricing probe: log per-night price per length
      if (!probeLogged && nightlyProbe["3"] && nightlyProbe["4"]) {
        probeLogged = true;
        console.log(`PRICE PROBE room_type ${w.roomTypeId} ${w.checkIn}: per-night by length = ${JSON.stringify(nightlyProbe)}`);
      }

      const longestPrice = pricesByNights[String(maxLen)] ?? null;

      deals.push({
        id: `${mapping.beds24_room_id}-${w.checkIn}`,
        roomId: String(mapping.beds24_room_id),
        roomName: mapping.property_name,
        checkIn: w.checkIn,
        checkOut: w.checkOut,
        nights: w.nights,
        windowNights: w.nights,
        minNights: w.minNights,
        pricesByNights,
        price: longestPrice,
        cleaningFee: mapping.cleaning_fee ?? 0,
        currency: "EUR",
        maxPersons: mapping.max_guests ?? 2,
        available: true,
      });
    }

    deals.sort((a, b) => a.checkIn.localeCompare(b.checkIn));

    const payload = {
      deals,
      source: "moder",
      generatedAt: new Date().toISOString(),
    };

    await supabase.from("beds24_cache").upsert({
      id: CACHE_ID,
      data: payload,
      fetched_at: new Date().toISOString(),
    });

    console.log(`Moder deals built: ${deals.length}`);

    return new Response(JSON.stringify({ ...payload, fromCache: false, fetchedAt: payload.generatedAt }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in moder-availability:", error);
    return new Response(JSON.stringify({ error: "Internal server error", deals: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
