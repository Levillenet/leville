import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const SEARCH_TYPES = new Set(["/event/haku", "/event/haku_ikkuna", "/event/haku_vaihtoehto_click", "/event/haku_whatsapp_click", "/event/haku_email_click", "/event/haku_kalenteri_click"]);
const TILANNE = new Set(["vapaita", "A", "B", "C", "D", "ei_tietoa", "kesken"]);
const bad = (error: string) => new Response(JSON.stringify({ error }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const BOT_RE =  /bot|crawl|spider|slurp|bingpreview|prerender|headless|lighthouse|pagespeed|gtmetrix|monitor|fetch|http\.?client|curl|wget|python-requests|node-fetch|axios|httpx|java\/|okhttp|facebookexternalhit|whatsapp|telegrambot|discordbot|embedly|quora link preview|outbrain|pinterest|skypeuripreview|nuzzel|bitlybot|w3c_validator|chrome-lighthouse|google-inspectiontool|googlestackdrivermonitoring/i;

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
    viewport_w: typeof body.viewport_w === "number" && body.viewport_w >= 200 && body.viewport_w <= 10000 ? Math.round(body.viewport_w) : null,
    country,
  };
  if (typeof body.id === "string") row.id = body.id;

  // Search-analytics rows (/event/haku*): whitelisted, validated fields only. No IP, no user agent.
  if (path.startsWith("/event/haku")) {
    if (!SEARCH_TYPES.has(path)) return bad("invalid search type");
    const s = body.search && typeof body.search === "object" ? body.search : {};
    const UUID = /^[0-9a-f-]{36}$/i, DATE = /^\d{4}-\d{2}-\d{2}$/;
    const int = (v: unknown, min: number, max: number) =>
      typeof v === "number" && Number.isInteger(v) && v >= min && v <= max ? v : null;
    const date = (v: unknown) => (typeof v === "string" && DATE.test(v) ? v : null);
    const str = (v: unknown, n: number) => (typeof v === "string" && v ? v.slice(0, n) : null);
    if (typeof s.haku_id !== "string" || !UUID.test(s.haku_id)) return bad("haku_id required");
    Object.assign(row, {
      country: null,
      haku_id: s.haku_id,
      saapuminen: date(s.saapuminen), lahto: date(s.lahto),
      oita: int(s.oita, 0, 365), aikuiset: int(s.aikuiset, 0, 100), lapset: int(s.lapset, 0, 100),
      henkiloita: int(s.henkiloita, 0, 200), jousto: int(s.jousto, 0, 30),
      kohde: str(s.kohde, 100),
      tulos_vapaita: int(s.tulos_vapaita, -1, 100000),
      tilanne: TILANNE.has(s.tilanne) ? s.tilanne : null,
      minimi_oita: int(s.minimi_oita, 0, 365), vaihtoehtoja: int(s.vaihtoehtoja, 0, 100),
      valittu_saapuminen: date(s.valittu_saapuminen), valittu_lahto: date(s.valittu_lahto),
      siirto_pv: int(s.siirto_pv, -60, 60),
      kieli: s.kieli === "en" ? "en" : "fi",
      yhdistelma_naytetty: typeof s.yhdistelma_naytetty === "boolean" ? s.yhdistelma_naytetty : null,
      yhdistelma_talo: s.yhdistelma_talo === "skistar" || s.yhdistelma_talo === "glacier" ? s.yhdistelma_talo : null,
      yhdistelma_kohteet: typeof s.yhdistelma_kohteet === "string" && /^[A-Z0-9]{1,4}(\+[A-Z0-9]{1,4}){1,2}$/.test(s.yhdistelma_kohteet) ? s.yhdistelma_kohteet : null,
      yhdistelma_hinta: typeof s.yhdistelma_hinta === "number" && s.yhdistelma_hinta > 0 && s.yhdistelma_hinta < 100000 ? s.yhdistelma_hinta : null,
    });
  }

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
