import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { sellableStays, fixedStay, type Day } from "./stays.ts";

const BASES = ["https://app.moder.fi", "https://dev-app.moder.fi"];
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const DATE = /^\d{4}-\d{2}-\d{2}$/;

async function moder(token: string, path: string): Promise<any | null> {
  for (const base of BASES) for (const auth of [`Bearer ${token}`, token]) {
    try {
      const r = await fetch(base + path, { headers: { Authorization: auth, Accept: "application/json" } });
      if (r.ok) return await r.json();
      await r.text();
    } catch { /* try next */ }
  }
  return null;
}

function daysOf(container: any): Day[] {
  const raw = container?.availabilities ?? container?.availability ?? container?.days ?? container?.dates ?? [];
  const list = Array.isArray(raw) ? raw : Object.entries(raw).map(([date, v]) => ({ date, ...(typeof v === "object" ? v as object : { is_free: v === true }) }));
  return list.map((d: any) => ({
    date: String(d?.date ?? d?.day).slice(0, 10),
    isFree: (d?.is_free === true || d?.available === true || (d?.free_rooms ?? 0) > 0) && d?.blackout !== true,
    minNights: Number(d?.min_nights ?? d?.min_stay ?? 1) || 1,
    checkinDenied: d?.checkin_denied === true || d?.check_in_denied === true,
    checkoutDenied: d?.checkout_denied === true || d?.check_out_denied === true,
  }));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    let start = url.searchParams.get("start") ?? "", end = url.searchParams.get("end") ?? "";
    let extra: { start: string; end: string } | null = null;
    if (req.method === "POST") ({ start = "", end = "", extra = null } = await req.json().catch(() => ({})));
    if (extra && !(DATE.test(extra.start) && DATE.test(extra.end) && extra.start >= start && extra.end <= end && extra.start < extra.end)) extra = null;
    const span = (Date.parse(end) - Date.parse(start)) / 86400000;
    if (!DATE.test(start) || !DATE.test(end) || !(span >= 1 && span <= 14)) return json({ error: "invalid_range" }, 400);

    const token = (Deno.env.get("MODER_API_TOKEN") || "").trim();
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const cacheId = `season_${start}_${end}${extra ? `_${extra.start}_${extra.end}` : ""}_v2`;
    const { data: cache } = await sb.from("beds24_cache").select("data,fetched_at").eq("id", cacheId).maybeSingle();
    if (cache && Date.now() - Date.parse(cache.fetched_at) < 3600_000) return json(cache.data);

    const { data: maps } = await sb.from("moder_property_mapping")
      .select("moder_room_type_id, property_name, cleaning_fee, max_guests").not("moder_room_type_id", "is", null);
    const rows = (maps ?? []) as { moder_room_type_id: number; property_name: string; cleaning_fee: number | null; max_guests: number | null }[];
    const ids = rows.map((m) => m.moder_room_type_id);
    const param = ids.map((id) => `room_types[]=${id}`).join("&");
    const avail = await moder(token, `/api/v1/availabilities?date_start=${start}&date_end=${end}&${param}`);
    if (!avail) return json({ error: "moder_unavailable", stays: [] }, 502);

    const raw = avail?.data ?? avail;
    const byRoom = new Map<number, Day[]>();
    if (Array.isArray(raw)) for (const e of raw) byRoom.set(Number(e?.room_type_id ?? e?.room_type ?? e?.id), daysOf(e));
    else for (const k of Object.keys(raw ?? {})) if (ids.includes(Number(k))) byRoom.set(Number(k), daysOf(raw[k]));

    const stays = rows.flatMap((m) => {
      const days = byRoom.get(m.moder_room_type_id) ?? [];
      const list = sellableStays(days, start, end);
      const x = extra && fixedStay(days, extra.start, extra.end);
      if (x && !list.some((s) => s.checkIn === x.checkIn && s.checkOut === x.checkOut)) list.push(x);
      return list.map((s) => ({ ...s, m }));
    });

    // Price each exact stay; group by date pair so one /prices call covers many rooms.
    const groups = new Map<string, number[]>();
    for (const s of stays) groups.set(`${s.checkIn}|${s.checkOut}`, [...(groups.get(`${s.checkIn}|${s.checkOut}`) ?? []), s.m.moder_room_type_id]);
    const prices = new Map<string, number>();
    await Promise.all([...groups].map(async ([key, rt]) => {
      const [a, b] = key.split("|");
      const r = await moder(token, `/api/v1/prices?date_start=${a}&date_end=${b}&${rt.map((id) => `room_types[]=${id}`).join("&")}`);
      const list = r?.data ?? r;
      for (const e of Array.isArray(list) ? list : [list]) {
        const total = Number(e?.total_price);
        if (e?.room_type_id && total > 0) prices.set(`${key}|${e.room_type_id}`, Math.round(total) / 100);
      }
    }));

    const result = {
      start, end,
      stays: stays.map((s) => {
        const stay = prices.get(`${s.checkIn}|${s.checkOut}|${s.m.moder_room_type_id}`);
        return {
          roomTypeId: s.m.moder_room_type_id, name: s.m.property_name, maxGuests: s.m.max_guests ?? null,
          checkIn: s.checkIn, checkOut: s.checkOut, nights: s.nights,
          price: stay != null ? Math.round(stay + (s.m.cleaning_fee ?? 0)) : null,
        };
      }).sort((a, b) => a.checkIn.localeCompare(b.checkIn) || b.nights - a.nights || (a.price ?? 1e9) - (b.price ?? 1e9)),
      generatedAt: new Date().toISOString(),
    };
    await sb.from("beds24_cache").upsert({ id: cacheId, data: result, fetched_at: result.generatedAt });
    return json(result);
  } catch (e) {
    console.error("season-availability", e);
    return json({ error: "internal", stays: [] }, 500);
  }
});
