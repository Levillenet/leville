import { corsFor, readJsonBody } from "../_shared/authGuard.ts";
import { countAvailable, parseQuery } from "./count.ts";

const CACHE_MS = 5 * 60 * 1000;
const cache = new Map<string, { at: number; available: number | null }>();
const hits = new Map<string, { at: number; n: number }>();

Deno.serve(async (req) => {
  const cors = { ...corsFor(req), "Content-Type": "application/json" };
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const reply = (available: number | null, status = 200) =>
    new Response(JSON.stringify({ available }), { status, headers: cors });

  const q = parseQuery(await readJsonBody(req));
  if (!q) return new Response(JSON.stringify({ error: "invalid input" }), { status: 400, headers: cors });

  // Light per-IP limit: 60 checks per minute.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "?";
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now - h.at < 60000) { if (++h.n > 60) return reply(null); } else hits.set(ip, { at: now, n: 1 });

  const key = `${q.start}|${q.end}|${q.adults}|${q.children}|${q.flex}`;
  const cached = cache.get(key);
  if (cached && now - cached.at < CACHE_MS) return reply(cached.available);

  const url = `https://app.moder.fi/levillenet?start=${q.start}&end=${q.end}&adults=${q.adults}&children=${q.children}&lang=fi&flexible_date_search=${q.flex}&api_query=1`;
  let available: number | null = null;
  try {
    const res = await fetch(url, { headers: { "X-Requested-With": "XMLHttpRequest" }, signal: AbortSignal.timeout(3000) });
    if (res.ok) available = countAvailable(await res.text());
  } catch { available = null; }
  if (available !== null) cache.set(key, { at: now, available });
  if (cache.size > 500) for (const [k, v] of cache) if (now - v.at > CACHE_MS) cache.delete(k);
  return reply(available);
});
