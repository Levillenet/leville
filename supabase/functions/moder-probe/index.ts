import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// TEMPORARY diagnostic function: discovers which Moder booking endpoints are
// available with our token. Returns HTTP statuses and the *field names* of the
// first record only (values are never returned) so we can see whether add-on
// services and internal notes are exposed.

const MODER_BASE_URLS = ["https://app.moder.fi", "https://dev-app.moder.fi"];

async function tryPath(token: string, base: string, path: string) {
  for (const auth of [`Bearer ${token}`, token]) {
    try {
      const res = await fetch(`${base}${path}`, {
        headers: { Authorization: auth, Accept: "application/json" },
      });
      if (res.ok) {
        const json = await res.json();
        let sample: unknown = null;
        let count: number | null = null;
        const arr = Array.isArray(json)
          ? json
          : Array.isArray((json as any)?.data)
          ? (json as any).data
          : Array.isArray((json as any)?.bookings)
          ? (json as any).bookings
          : Array.isArray((json as any)?.reservations)
          ? (json as any).reservations
          : null;
        if (arr) {
          count = arr.length;
          sample = arr[0] ? Object.keys(arr[0]) : [];
        } else if (json && typeof json === "object") {
          sample = Object.keys(json);
        }
        return { base, path, status: res.status, ok: true, count, keys: sample };
      }
      const text = await res.text();
      if (res.status !== 404) {
        return { base, path, status: res.status, ok: false, body: text.slice(0, 200) };
      }
    } catch (e) {
      return { base, path, status: 0, ok: false, body: String(e).slice(0, 120) };
    }
  }
  return { base, path, status: 404, ok: false };
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok");
  const token = Deno.env.get("MODER_API_TOKEN");
  if (!token) return new Response(JSON.stringify({ error: "no token" }), { status: 500 });

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const week = new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0];

  const paths = [
    `/api/v1/bookings?date_start=${today}&date_end=${week}`,
    `/api/v1/bookings?arrival_date=${tomorrow}`,
    `/api/v1/bookings`,
    `/api/v1/reservations?date_start=${today}&date_end=${week}`,
    `/api/v1/reservations`,
    `/api/v1/orders?date_start=${today}&date_end=${week}`,
    `/api/v1/orders`,
    `/api/v1/arrivals?date=${tomorrow}`,
    `/api/v1/checkins?date=${tomorrow}`,
    `/api/v1/products`,
    `/api/v1/services`,
    `/api/v1/room_types`,
    `/api/v1`,
  ];

  const results = [];
  for (const base of MODER_BASE_URLS) {
    for (const p of paths) {
      results.push(await tryPath(token, base, p));
    }
  }

  return new Response(JSON.stringify({ results }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
});
