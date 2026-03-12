import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();

    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!password || password !== adminPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const since = thirtyDaysAgo.toISOString();

    // Fetch all page views from the last 30 days (up to 10000)
    const { data: views, error } = await supabase
      .from("page_views")
      .select("path, referrer, device_type, language, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(10000);

    if (error) {
      console.error("Query error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const total = views?.length || 0;

    // Aggregate by date
    const byDate: Record<string, number> = {};
    // Aggregate by path
    const byPath: Record<string, number> = {};
    // Aggregate by referrer
    const byReferrer: Record<string, number> = {};
    // Aggregate by device
    const byDevice: Record<string, number> = {};
    // Aggregate by language
    const byLanguage: Record<string, number> = {};

    for (const v of views || []) {
      // Date
      const date = v.created_at.split("T")[0];
      byDate[date] = (byDate[date] || 0) + 1;

      // Path
      byPath[v.path] = (byPath[v.path] || 0) + 1;

      // Referrer
      if (v.referrer) {
        try {
          const host = new URL(v.referrer).hostname.replace("www.", "");
          byReferrer[host] = (byReferrer[host] || 0) + 1;
        } catch {
          byReferrer["other"] = (byReferrer["other"] || 0) + 1;
        }
      } else {
        byReferrer["direct"] = (byReferrer["direct"] || 0) + 1;
      }

      // Device
      const dev = v.device_type || "unknown";
      byDevice[dev] = (byDevice[dev] || 0) + 1;

      // Language
      const lang = v.language || "unknown";
      byLanguage[lang] = (byLanguage[lang] || 0) + 1;
    }

    // Sort paths by count, return top 20
    const topPages = Object.entries(byPath)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([path, count]) => ({ path, count }));

    return new Response(
      JSON.stringify({
        total,
        byDate,
        topPages,
        byReferrer,
        byDevice,
        byLanguage,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
