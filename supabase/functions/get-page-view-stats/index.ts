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
    const { password, format, period, action } = await req.json();

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

    // Live active users: sessions active in the last 5 minutes.
    // We scan the last 30 minutes and use (created_at + time_on_page) as last activity.
    if (action === "live") {
      const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
      const activeThresholdMs = Date.now() - 5 * 60 * 1000;

      const { data: liveRows, error: liveErr } = await supabase
        .from("page_views")
        .select("session_id, path, created_at, time_on_page")
        .gte("created_at", thirtyMinAgo)
        .not("path", "like", "/event/%")
        .not("session_id", "is", null);

      if (liveErr) {
        return new Response(JSON.stringify({ error: liveErr.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const activeRows = (liveRows || []).filter((r: any) => {
        const createdMs = new Date(r.created_at).getTime();
        const timeOnPageSec = typeof r.time_on_page === "number" ? r.time_on_page : 0;
        const lastActivityMs = createdMs + timeOnPageSec * 1000;
        return lastActivityMs >= activeThresholdMs;
      });

      const uniqueSessions = new Set(activeRows.map((r: any) => r.session_id));

      const pageCounts: Record<string, number> = {};
      for (const r of activeRows) {
        pageCounts[r.path] = (pageCounts[r.path] || 0) + 1;
      }
      const topPages = Object.entries(pageCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([path, count]) => ({ path, count }));

      return new Response(
        JSON.stringify({ activeUsers: uniqueSessions.size, topPages }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const now = new Date();
    let sinceDate: Date;
    switch (period) {
      case "today":
        sinceDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        sinceDate = new Date(now);
        sinceDate.setDate(sinceDate.getDate() - 7);
        break;
      case "month":
        sinceDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "90days":
        sinceDate = new Date(now);
        sinceDate.setDate(sinceDate.getDate() - 90);
        break;
      case "180days":
        sinceDate = new Date(now);
        sinceDate.setDate(sinceDate.getDate() - 180);
        break;
      default:
        sinceDate = new Date(now);
        sinceDate.setDate(sinceDate.getDate() - 30);
    }
    const since = sinceDate.toISOString();

    const queryLimit = (period === "90days" || period === "180days") ? 50000 : 10000;

    const { data: views, error } = await supabase
      .from("page_views")
      .select("path, referrer, device_type, language, created_at, session_id, utm_source, utm_medium, utm_campaign, scroll_depth, time_on_page")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(queryLimit);

    if (error) {
      console.error("Query error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // CSV format: return raw rows
    if (format === "csv") {
      const csvHeader = "date,time,path,type,referrer,device_type,language,session_id,utm_source,utm_medium,utm_campaign,scroll_depth,time_on_page";
      const csvRows = (views || []).map((v: any) => {
        const dt = new Date(v.created_at);
        const date = dt.toISOString().split("T")[0];
        const time = dt.toISOString().split("T")[1].split(".")[0];
        const isEvent = v.path.startsWith("/event/");
        const type = isEvent ? v.path.replace("/event/", "") : "pageview";
        const path = isEvent ? "" : v.path;
        const ref = v.referrer || "";
        const device = v.device_type || "unknown";
        const lang = v.language || "unknown";
        const sid = v.session_id || "";
        const utmSrc = v.utm_source || "";
        const utmMed = v.utm_medium || "";
        const utmCamp = v.utm_campaign || "";
        const scrollD = v.scroll_depth != null ? String(v.scroll_depth) : "";
        const timeP = v.time_on_page != null ? String(v.time_on_page) : "";
        const esc = (s: string) => s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
        return [date, time, esc(path), type, esc(ref), device, lang, sid, esc(utmSrc), esc(utmMed), esc(utmCamp), scrollD, timeP].join(",");
      });

      return new Response([csvHeader, ...csvRows].join("\n"), {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="leville-analytics-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    // JSON aggregated format
    const byDate: Record<string, number> = {};
    const byPath: Record<string, number> = {};
    const byReferrer: Record<string, number> = {};
    const byDevice: Record<string, number> = {};
    const byLanguage: Record<string, number> = {};
    const conversionMap: Record<string, { count: number; sources: Record<string, number> }> = {};
    const byUtmSource: Record<string, number> = {};
    const byUtmMedium: Record<string, number> = {};
    const byUtmCampaign: Record<string, number> = {};
    let total = 0;
    let scrollDepthSum = 0;
    let scrollDepthCount = 0;
    let timeOnPageSum = 0;
    let timeOnPageCount = 0;

    // Session tracking
    const sessionPages: Record<string, { timestamps: number[]; pageCount: number }> = {};
    const dailySessions: Record<string, Set<string>> = {};

    for (const v of views || []) {
      // Filter out dev/preview traffic
      if (v.referrer && (v.referrer.includes("lovable.app") || v.referrer.includes("lovable.dev") || v.referrer.includes("lovableproject.com") || v.referrer.includes("localhost"))) {
        continue;
      }

      const isEvent = v.path.startsWith("/event/");
      const sid = v.session_id || null;
      const ts = new Date(v.created_at).getTime();

      // Only track sessions for rows that have a session_id
      if (sid) {
        if (!sessionPages[sid]) {
          sessionPages[sid] = { timestamps: [], pageCount: 0 };
        }
      }

      if (isEvent) {
        const eventType = v.path;
        if (!conversionMap[eventType]) {
          conversionMap[eventType] = { count: 0, sources: {} };
        }
        conversionMap[eventType].count++;
        const source = v.referrer || "unknown";
        conversionMap[eventType].sources[source] = (conversionMap[eventType].sources[source] || 0) + 1;
      } else {
        total++;
        if (sid && sessionPages[sid]) {
          sessionPages[sid].timestamps.push(ts);
          sessionPages[sid].pageCount++;
        }

        const date = v.created_at.split("T")[0];
        byDate[date] = (byDate[date] || 0) + 1;
        byPath[v.path] = (byPath[v.path] || 0) + 1;

        // Track daily unique sessions (only with session_id)
        if (sid) {
          if (!dailySessions[date]) dailySessions[date] = new Set();
          dailySessions[date].add(sid);
        }

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

        const dev = v.device_type || "unknown";
        byDevice[dev] = (byDevice[dev] || 0) + 1;
        const lang = v.language || "unknown";
        byLanguage[lang] = (byLanguage[lang] || 0) + 1;

        // UTM aggregation
        if (v.utm_source) byUtmSource[v.utm_source] = (byUtmSource[v.utm_source] || 0) + 1;
        if (v.utm_medium) byUtmMedium[v.utm_medium] = (byUtmMedium[v.utm_medium] || 0) + 1;
        if (v.utm_campaign) byUtmCampaign[v.utm_campaign] = (byUtmCampaign[v.utm_campaign] || 0) + 1;

        // Engagement aggregation
        if (v.scroll_depth != null) { scrollDepthSum += v.scroll_depth; scrollDepthCount++; }
        if (v.time_on_page != null) { timeOnPageSum += v.time_on_page; timeOnPageCount++; }
      }
    }

    // Calculate session metrics
    const MAX_GAP_MS = 30 * 60 * 1000; // 30 minutes
    const sessionEntries = Object.values(sessionPages);
    const totalSessions = sessionEntries.filter(s => s.pageCount > 0).length;
    const bounceSessions = sessionEntries.filter(s => s.pageCount === 1).length;
    const bounceRate = totalSessions > 0 ? Math.round((bounceSessions / totalSessions) * 100) : 0;

    // Average session duration using cumulative gaps (capped at 30 min per gap)
    let totalDuration = 0;
    let durationCount = 0;
    for (const s of sessionEntries) {
      if (s.timestamps.length >= 2) {
        const sorted = s.timestamps.sort((a, b) => a - b);
        let sessionDuration = 0;
        for (let i = 0; i < sorted.length - 1; i++) {
          const gap = sorted[i + 1] - sorted[i];
          if (gap < MAX_GAP_MS) {
            sessionDuration += gap;
          }
        }
        if (sessionDuration > 0) {
          totalDuration += sessionDuration;
          durationCount++;
        }
      }
    }
    const avgSessionDurationMs = durationCount > 0 ? totalDuration / durationCount : 0;
    const avgSessionDurationSec = Math.round(avgSessionDurationMs / 1000);

    // Daily unique sessions map
    const byDateSessions: Record<string, number> = {};
    for (const [date, sessions] of Object.entries(dailySessions)) {
      byDateSessions[date] = sessions.size;
    }

    const topPages = Object.entries(byPath)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([path, count]) => ({ path, count }));

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

    const avgScrollDepth = scrollDepthCount > 0 ? Math.round(scrollDepthSum / scrollDepthCount) : null;
    const avgTimeOnPage = timeOnPageCount > 0 ? Math.round(timeOnPageSum / timeOnPageCount) : null;

    return new Response(
      JSON.stringify({
        total, byDate, topPages, byReferrer, byDevice, byLanguage, conversionEvents,
        totalSessions, bounceRate, avgSessionDurationSec, byDateSessions,
        byUtmSource, byUtmMedium, byUtmCampaign, avgScrollDepth, avgTimeOnPage,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
