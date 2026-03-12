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

    const byDate: Record<string, number> = {};
    const byPath: Record<string, number> = {};
    const byReferrer: Record<string, number> = {};
    const byDevice: Record<string, number> = {};
    const byLanguage: Record<string, number> = {};

    // Conversion events: type -> { count, sources }
    const conversionMap: Record<string, { count: number; sources: Record<string, number> }> = {};

    let total = 0;

    for (const v of views || []) {
      const isEvent = v.path.startsWith("/event/");

      if (isEvent) {
        const eventType = v.path;
        if (!conversionMap[eventType]) {
          conversionMap[eventType] = { count: 0, sources: {} };
        }
        conversionMap[eventType].count++;
        // referrer field stores the source page path
        const source = v.referrer || "unknown";
        conversionMap[eventType].sources[source] = (conversionMap[eventType].sources[source] || 0) + 1;
      } else {
        total++;

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
    }

    const topPages = Object.entries(byPath)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([path, count]) => ({ path, count }));

    // Build conversion events array with top 5 sources
    const conversionEvents = Object.entries(conversionMap)
      .sort(([, a], [, b]) => b.count - a.count)
      .map(([type, data]) => ({
        type,
        count: data.count,
        topSources: Object.entries(data.sources)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([source, count]) => ({ source, count })),
      }));

    return new Response(
      JSON.stringify({
        total,
        byDate,
        topPages,
        byReferrer,
        byDevice,
        byLanguage,
        conversionEvents,
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
