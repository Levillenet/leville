import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODER_BASE_URLS = ["https://app.moder.fi", "https://dev-app.moder.fi"];
const CACHE_ID = "moder_availability";

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
  dayRate: number | null; // EUR per night, from Moder day_rate (cents)
}

interface Window_ {
  roomTypeId: number;
  checkIn: string;
  checkOut: string; // exclusive
  nights: number;
  minNights: number;
  isGap: boolean;
  rates: Record<string, number>; // date -> EUR per night
  noCheckIn: string[];
  noCheckOut: string[];
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
    const rawRate = d?.day_rate ?? d?.rate;
    const rateNum = typeof rawRate === "number" ? rawRate : Number(rawRate);
    return {
      date: String(date).slice(0, 10),
      isFree: d?.is_free === true || d?.available === true || (d?.free_rooms ?? 0) > 0,
      minNights: Number(d?.min_nights ?? d?.min_stay ?? 1) || 1,
      checkinDenied: d?.checkin_denied === true || d?.check_in_denied === true,
      checkoutDenied: d?.checkout_denied === true || d?.check_out_denied === true,
      blackout: d?.blackout === true,
      dayRate: !isNaN(rateNum) && rateNum > 0 ? Math.round(rateNum) / 100 : null,
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
          list.push({ date, isFree: v === true, minNights: 1, checkinDenied: false, checkoutDenied: false, blackout: false, dayRate: null });
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

// Build contiguous free windows from a sorted day list.
// A window is a maximal run of free, non-blackout nights.
// isGap = both the day before and the day after the window are occupied.
// checkout_denied days do not split a run: they only forbid a stay ending that
// date, which is enforced per-stay via noCheckOut in the frontend.
function buildWindows(roomTypeId: number, days: DayInfo[], maxCheckIn: string): Window_[] {
  const windows: Window_[] = [];
  const dateSet = new Map(days.map(d => [d.date, d]));

  let runDays: DayInfo[] = [];

  const closeRun = (nextDay: DayInfo | null) => {
    if (runDays.length === 0) return;
    const start = runDays[0];
    const last = runDays[runDays.length - 1];
    const checkOut = addDays(last.date, 1);
    const nights = daysBetween(start.date, checkOut);

    if (nights >= 1 && start.date <= maxCheckIn) {
      // Gap detection: window bounded by occupied days on both sides
      const prevDay = dateSet.get(addDays(start.date, -1));
      const afterDay = nextDay ?? dateSet.get(checkOut);
      const occupied = (d: DayInfo | undefined) => !!d && (!d.isFree || d.blackout);
      const isGap = occupied(prevDay) && occupied(afterDay);

      const rates: Record<string, number> = {};
      for (const d of runDays) {
        if (d.dayRate != null) rates[d.date] = d.dayRate;
      }

      windows.push({
        roomTypeId,
        checkIn: start.date,
        checkOut,
        nights,
        minNights: Math.max(...runDays.map(d => d.minNights || 1)),
        isGap,
        rates,
        noCheckIn: runDays.filter(d => d.checkinDenied).map(d => d.date),
        noCheckOut: runDays.filter(d => d.checkoutDenied).map(d => d.date),
      });
    }
    runDays = [];
  };

  for (const day of days) {
    const usable = day.isFree && !day.blackout;
    if (usable) {
      runDays.push(day);
    } else {
      closeRun(day);
    }
  }
  closeRun(null);

  return windows.filter(w => w.checkIn <= maxCheckIn);
}

// Real sellable stay price from Moder (/api/v1/prices). Moder prices depend on
// the length of stay, so this must be queried per exact arrival/departure pair.
async function fetchStayPrices(
  token: string,
  roomTypeIds: number[],
  from: string,
  to: string,
  debug = false,
): Promise<Map<number, number>> {
  const map = new Map<number, number>();
  if (roomTypeIds.length === 0) return map;
  const param = roomTypeIds.map((id) => `room_types[]=${id}`).join("&");
  const r = await moderFetch(token, `/api/v1/prices?date_start=${from}&date_end=${to}&${param}`);
  if (!r.ok) return map;
  const raw = r.json?.data ?? r.json;
  const list = Array.isArray(raw) ? raw : [raw];
  if (debug && list.length > 0) {
    console.log(`Moder /prices raw sample (${from}..${to}):`, JSON.stringify(list.slice(0, 3)));
  }
  for (const e of list) {
    const id = Number(e?.room_type_id);
    const total = Number(e?.total_price);
    if (id && !isNaN(total) && total > 0) map.set(id, Math.round(total) / 100);
  }
  return map;
}


async function runLimited<T>(tasks: (() => Promise<T>)[], limit = 5): Promise<T[]> {
  const results: T[] = [];
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]();
    }
  });
  await Promise.all(workers);
  return results;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = (Deno.env.get("MODER_API_TOKEN") || "").trim();
    console.log(`MODER_API_TOKEN length=${token.length} prefix_ok=${/^\d+\|/.test(token)}`);
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

    // On-demand stay price for a specific date range (used by the date search).
    // NOTE: this must run BEFORE the availability cache check — otherwise a warm
    // cache short-circuits the request and returns stale listing data instead of
    // fresh length-of-stay prices for the requested range.
    if (url.searchParams.get("mode") === "prices") {
      const from = url.searchParams.get("from") || "";
      const to = url.searchParams.get("to") || "";
      if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || daysBetween(from, to) < 1) {
        return new Response(JSON.stringify({ error: "invalid_dates", prices: {} }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const debug = url.searchParams.get("debug") === "true";
      const priceMap = await fetchStayPrices(token, roomTypeIds, from, to, debug);
      const prices: Record<string, number> = {};
      for (const m of mappings) {
        const v = priceMap.get(m.moder_room_type_id);
        if (v != null) prices[String(m.beds24_room_id)] = v;
      }
      return new Response(JSON.stringify({ from, to, prices }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check cache (listing mode only)
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


    const today = new Date();
    const dateStart = formatDate(today);
    // Cover the full listing horizon plus room for date-range searches.
    const horizonDays = dealsDaysAhead + 30;
    const dateEnd = formatDate(new Date(today.getTime() + horizonDays * 86400000));
    // Listing/search horizon for CHECK-IN dates is exactly the admin setting.
    const maxCheckIn = formatDate(new Date(today.getTime() + dealsDaysAhead * 86400000));

    // Fetch availabilities for all room types in one call; if the token lacks
    // access to some room types (403/401), fall back to per-room-type queries
    // and skip the denied ones.
    const roomTypesParam = roomTypeIds.map(id => `room_types[]=${id}`).join("&");
    let daysByRoomType = new Map<number, DayInfo[]>();

    const availRes = await moderFetch(token, `/api/v1/availabilities?date_start=${dateStart}&date_end=${dateEnd}&${roomTypesParam}`);
    if (availRes.ok) {
      console.log("Moder base URL:", availRes.base);
      daysByRoomType = parseAvailabilities(availRes.json, roomTypeIds);
    } else {
      console.log(`Bulk availabilities failed (status ${availRes.status}), falling back to per-room-type`);
      for (const rtId of roomTypeIds) {
        const single = await moderFetch(token, `/api/v1/availabilities?date_start=${dateStart}&date_end=${dateEnd}&room_types[]=${rtId}`);
        if (!single.ok) {
          console.log(`Room type ${rtId}: access denied, skipped`);
          continue;
        }
        const parsed = parseAvailabilities(single.json, [rtId]);
        for (const [k, v] of parsed) daysByRoomType.set(k, v);
      }
    }
    console.log(`Parsed day lists for ${daysByRoomType.size} room types`);

    // Build windows
    const allWindows: Window_[] = [];
    for (const [rtId, days] of daysByRoomType) {
      const wins = buildWindows(rtId, days, maxCheckIn);
      allWindows.push(...wins);
    }
    console.log(`Found ${allWindows.length} free windows (${allWindows.filter(w => w.isGap).length} gaps)`);

    // Real Moder stay prices: one bulk call per (arrival, length-of-stay) pair
    const MAX_NIGHTS = 7;
    const startDates = Array.from(new Set(allWindows.map(w => w.checkIn))).sort();
    const priceTasks: (() => Promise<void>)[] = [];
    // key: `${checkIn}|${nights}` -> Map<roomTypeId, totalEUR>
    const stayPrices = new Map<string, Map<number, number>>();
    for (const start of startDates) {
      const roomsAtStart = allWindows.filter(w => w.checkIn === start);
      for (let n = 1; n <= MAX_NIGHTS; n++) {
        const ids = roomsAtStart.filter(w => w.nights >= n).map(w => w.roomTypeId);
        if (ids.length === 0) continue;
        const key = `${start}|${n}`;
        priceTasks.push(async () => {
          const map = await fetchStayPrices(token, ids, start, addDays(start, n));
          stayPrices.set(key, map);
        });
      }
    }
    await runLimited(priceTasks, 6);
    console.log(`Fetched stay prices for ${priceTasks.length} (date,length) combinations`);

    const deals = allWindows.map(w => {
      const mapping = mappings.find(m => m.moder_room_type_id === w.roomTypeId);
      if (!mapping) return null;
      const maxN = Math.min(w.nights, MAX_NIGHTS);
      const pricesByNights: Record<string, number> = {};
      for (let n = 1; n <= maxN; n++) {
        const v = stayPrices.get(`${w.checkIn}|${n}`)?.get(w.roomTypeId);
        if (v != null && v > 0) pricesByNights[String(n)] = v;
      }
      const windowTotal = pricesByNights[String(maxN)] ?? null;

      return {
        id: `${mapping.beds24_room_id}-${w.checkIn}`,
        roomId: String(mapping.beds24_room_id),
        roomName: mapping.property_name,
        checkIn: w.checkIn,
        checkOut: w.checkOut,
        nights: w.nights,
        windowNights: w.nights,
        minNights: w.minNights,
        isGap: w.isGap,
        pricesByNights,
        noCheckIn: w.noCheckIn,
        noCheckOut: w.noCheckOut,
        price: windowTotal,
        cleaningFee: mapping.cleaning_fee ?? 0,
        currency: "EUR",
        maxPersons: mapping.max_guests ?? 2,
        available: true,
      };
    }).filter(Boolean);

    deals.sort((a: any, b: any) => a.checkIn.localeCompare(b.checkIn));

    const payload = {
      deals,
      daysAhead: dealsDaysAhead,
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
