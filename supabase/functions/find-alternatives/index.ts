import { corsFor, readJsonBody } from "../_shared/authGuard.ts";
import { queryFreeUnits, queryModer } from "../_shared/moderResult.ts";
import { findCombos } from "../_shared/combos.ts";
import { findAlternatives } from "./plan.ts";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const CACHE_MS = 5 * 60 * 1000;
const cache = new Map<string, { at: number; body: string }>();
const hits = new Map<string, { at: number; n: number }>();

Deno.serve(async (req) => {
  const cors = { ...corsFor(req), "Content-Type": "application/json" };
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const bad = () => new Response(JSON.stringify({ error: "invalid input" }), { status: 400, headers: cors });

  const b = await readJsonBody(req);
  const start = String(b.start ?? ""), end = String(b.end ?? "");
  const adults = Number(b.adults), children = Number(b.children ?? 0);
  if (!DATE.test(start) || !DATE.test(end) || end <= start) return bad();
  const nights = Math.round((Date.parse(end) - Date.parse(start)) / 86400000);
  if (!(nights >= 1 && nights <= 30)) return bad();
  if (!Number.isInteger(adults) || adults < 1 || adults > 30 || !Number.isInteger(children) || children < 0 || children > 30) return bad();

  // Per-IP limit: 20 searches per minute (each may run dozens of Moder queries).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "?";
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now - h.at < 60000) {
    if (++h.n > 20) return new Response(JSON.stringify({ alternatives: [], minimi_oita: 0, limited: true }), { headers: cors });
  } else hits.set(ip, { at: now, n: 1 });

  const key = `${start}|${end}|${adults}|${children}`;
  const c = cache.get(key);
  if (c && now - c.at < CACHE_MS) return new Response(c.body, { headers: cors });

  const today = new Date(now + 2 * 3600000).toISOString().slice(0, 10); // Finnish date (approx.)
  const guests = adults + children;
  // Groups of 5+: same-building combinations on the exact dates (not for minimum-stay cases).
  const [result, free] = await Promise.all([
    findAlternatives({ start, end, adults, children }, today, (p) => queryModer(p.start, p.end, adults, children)),
    guests >= 5 ? queryFreeUnits(start, end) : Promise.resolve([]),
  ]);
  const yhdistelmat = result.minimi_oita > 0 ? [] : findCombos(free, guests);
  const body = JSON.stringify({ ...result, yhdistelmat });
  cache.set(key, { at: now, body });
  if (cache.size > 300) for (const [k, v] of cache) if (now - v.at > CACHE_MS) cache.delete(k);
  return new Response(body, { headers: cors });
});
