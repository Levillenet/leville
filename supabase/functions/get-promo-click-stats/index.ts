import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { resolveAdminRole } from "../_shared/adminCredential.ts";

const STATIC_ALLOWED_ORIGINS = [
  "https://leville.net",
  "https://www.leville.net",
  "https://leville.lovable.app",
];

function originFor(req: Request): string {
  const origin = req.headers.get("origin") ?? "";
  if (STATIC_ALLOWED_ORIGINS.includes(origin)) return origin;
  if (/^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) return origin;
  if (/^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin)) return origin;
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return origin;
  return "https://leville.net";
}

function corsFor(req: Request): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": originFor(req),
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };
}

Deno.serve(async (req) => {
  const corsHeaders = corsFor(req);
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { password, days } = await req.json();
    if (!(await resolveAdminRole(password))) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const sinceDays = Number.isFinite(Number(days)) ? Number(days) : 30;
    const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("promo_banner_clicks")
      .select("banner_id, banner_title, placement, language, target_url, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000);

    if (error) throw error;

    // Aggregate by banner_id, or by placement+title for static (hardcoded) banners
    const byBanner: Record<string, any> = {};
    for (const c of data || []) {
      const isStatic = !c.banner_id;
      const key = c.banner_id || `static:${c.placement || "unknown"}|${c.banner_title || "untitled"}`;
      if (!byBanner[key]) {
        byBanner[key] = {
          banner_id: c.banner_id,
          static_key: isStatic ? key : null,
          is_static: isStatic,
          banner_title: c.banner_title,
          placement: c.placement,
          target_url: c.target_url,
          total: 0,
          by_language: {} as Record<string, number>,
          by_target_url: {} as Record<string, number>,
          last_click_at: c.created_at,
        };
      }
      byBanner[key].total += 1;
      const lang = c.language || "unknown";
      byBanner[key].by_language[lang] = (byBanner[key].by_language[lang] || 0) + 1;
      const turl = c.target_url || "unknown";
      byBanner[key].by_target_url[turl] = (byBanner[key].by_target_url[turl] || 0) + 1;
    }

    const summary = Object.values(byBanner).sort((a: any, b: any) => b.total - a.total);
    const total = (data || []).length;

    return new Response(JSON.stringify({ total, since, summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
