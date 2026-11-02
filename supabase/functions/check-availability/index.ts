import { corsFor, readJsonBody } from "../_shared/authGuard.ts";
import { parseQuery } from "./count.ts";
import { queryModer } from "../_shared/moderResult.ts";

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

  // Always exact dates: Moder's flexible result does not show the customer any dates.
  const r = await queryModer(q.start, q.end, q.adults, q.children);
  return reply(r ? r.available : null);
});
