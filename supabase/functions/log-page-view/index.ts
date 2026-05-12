import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const BOT_RE = /bot|crawl|spider|slurp|bingpreview|prerender|headless|lighthouse|pagespeed|gtmetrix|monitor|fetch|http\.?client|curl|wget|python-requests|node-fetch|axios|httpx|java\/|okhttp|facebookexternalhit|whatsapp|telegrambot|discordbot|embedly|quora link preview|outbrain|pinterest|skypeuripreview|nuzzel|bitlybot|w3c_validator|chrome-lighthouse|google-inspectiontool|googlestackdrivermonitoring/i;

function deriveCountry(req: Request): string | null {
  const h = req.headers;
  const candidates = [
    h.get("cf-ipcountry"),
    h.get("x-vercel-ip-country"),
    h.get("x-country"),
    h.get("x-country-code"),
  ];
  for (const c of candidates) {
    if (c && c.length === 2 && c !== "XX" && c !== "T1") return c.toUpperCase();
  }
  // Netlify: x-nf-geo is base64 JSON { country: { code: "FI" } }
  const nfGeo = h.get("x-nf-geo");
  if (nfGeo) {
    try {
      const decoded = JSON.parse(atob(nfGeo));
      const code = decoded?.country?.code;
      if (code && code.length === 2) return String(code).toUpperCase();
    } catch { /* ignore */ }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const ua = req.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) {
    // Silently drop bot traffic
    return new Response(JSON.stringify({ ok: true, skipped: "bot" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const path = typeof body.path === "string" ? body.path.slice(0, 500) : null;
  if (!path) {
    return new Response(JSON.stringify({ error: "path required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const country = deriveCountry(req);

  const row: Record<string, unknown> = {
    path,
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 1000) : null,
    device_type: typeof body.device_type === "string" ? body.device_type : null,
    language: typeof body.language === "string" ? body.language.slice(0, 8) : null,
    session_id: typeof body.session_id === "string" ? body.session_id.slice(0, 64) : null,
    utm_source: typeof body.utm_source === "string" ? body.utm_source.slice(0, 100) : null,
    utm_medium: typeof body.utm_medium === "string" ? body.utm_medium.slice(0, 100) : null,
    utm_campaign: typeof body.utm_campaign === "string" ? body.utm_campaign.slice(0, 100) : null,
    country,
  };
  if (typeof body.id === "string") row.id = body.id;

  const { data, error } = await supabase
    .from("page_views")
    .insert(row)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Insert failed:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ id: data?.id ?? null, country }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
