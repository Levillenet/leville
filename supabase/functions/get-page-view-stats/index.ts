import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://leville.net",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Helsinki UTC offset helper (handles DST)
const getHelsinkiOffset = (date: Date): string => {
  const helsinkiStr = date.toLocaleString("en-US", { timeZone: "Europe/Helsinki", hour: "numeric", hour12: false });
  const utcStr = date.toLocaleString("en-US", { timeZone: "UTC", hour: "numeric", hour12: false });
  const diff = (parseInt(helsinkiStr) - parseInt(utcStr) + 24) % 24;
  return diff === 3 ? "03:00" : "02:00";
};

// AI assistant referrer classification
const AI_REFERRER_MAP: Array<{ match: string[]; label: string }> = [
  { match: ["chatgpt.com", "chat.openai.com", "openai.com"], label: "ChatGPT" },
  { match: ["perplexity.ai"], label: "Perplexity" },
  { match: ["copilot.microsoft.com", "bing.com/chat"], label: "Copilot" },
  { match: ["gemini.google.com", "bard.google.com"], label: "Gemini" },
  { match: ["claude.ai"], label: "Claude" },
  { match: ["you.com", "poe.com", "phind.com", "deepseek.com", "grok.com", "x.ai", "mistral.ai", "chat.qwen.ai", "duckduckgo.com/aichat"], label: "Muu AI" },
];

function classifyAiReferrer(referrer: string | null): string | null {
  if (!referrer) return null;
  const r = referrer.toLowerCase();
  for (const entry of AI_REFERRER_MAP) {
    for (const m of entry.match) {
      if (r.includes("://" + m) || r.includes("://www." + m) || r.includes("." + m) || r.includes("/" + m)) {
        return entry.label;
      }
    }
  }
  return null;
}

const isDevReferrer = (referrer: string | null | undefined): boolean =>
  !!referrer && (referrer.includes("lovable.app") || referrer.includes("lovable.dev") || referrer.includes("lovableproject.com") || referrer.includes("localhost"));

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
        // If time_on_page exists, last activity = created + time_on_page
        // If null (no engagement yet), fall back to created_at within 5 min window
        const lastActivityMs = timeOnPageSec > 0
          ? createdMs + timeOnPageSec * 1000
          : createdMs;
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
    // Helsinki timezone for "today" calculation
    const helsinkiNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Helsinki" }));
    let sinceDate: Date;
    switch (period) {
      case "today": {
        // Start of day in Helsinki timezone
        const hYear = helsinkiNow.getFullYear();
        const hMonth = helsinkiNow.getMonth();
        const hDay = helsinkiNow.getDate();
        // Create Helsinki midnight, then convert to UTC
        const helsinkiMidnight = new Date(`${hYear}-${String(hMonth + 1).padStart(2, "0")}-${String(hDay).padStart(2, "0")}T00:00:00+${getHelsinkiOffset(now)}`);
        sinceDate = helsinkiMidnight;
        break;
      }
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

    // Fetch all rows using pagination (PostgREST caps at 1000 per request)
    const PAGE_SIZE = 1000;
    let views: any[] = [];
    let from = 0;
    while (true) {
      const { data: batch, error: batchErr } = await supabase
        .from("page_views")
        .select("path, referrer, device_type, language, country, viewport_w, created_at, session_id, utm_source, utm_medium, utm_campaign, scroll_depth, time_on_page")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);

      if (batchErr) {
        console.error("Query error:", batchErr);
        return new Response(JSON.stringify({ error: batchErr.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!batch || batch.length === 0) break;
      views = views.concat(batch);
      if (batch.length < PAGE_SIZE) break;
      from += PAGE_SIZE;
    }

    // CSV format: return raw rows + aggregated booking-clicks-by-source block
    if (format === "csv") {
      const csvHeader = "date,time,path,type,referrer,device_type,language,country,viewport_w,session_id,utm_source,utm_medium,utm_campaign,scroll_depth,time_on_page,ai_source";
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
        const country = v.country || "unknown";
        const vw = v.viewport_w != null ? String(v.viewport_w) : "";
        const sid = v.session_id || "";
        const utmSrc = v.utm_source || "";
        const utmMed = v.utm_medium || "";
        const utmCamp = v.utm_campaign || "";
        const scrollD = v.scroll_depth != null ? String(v.scroll_depth) : "";
        const timeP = v.time_on_page != null ? String(v.time_on_page) : "";
        const aiSrc = classifyAiReferrer(v.referrer) || "";
        const esc = (s: string) => s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
        return [date, time, esc(path), type, esc(ref), device, lang, country, vw, sid, esc(utmSrc), esc(utmMed), esc(utmCamp), scrollD, timeP, esc(aiSrc)].join(",");
      });

      // Aggregate booking clicks by source page (only /event/booking-* events).
      // This is the section that answers "from which page were app.moder.fi links clicked, and how many times".
      const bookingAgg: Record<string, { search: number; sticky: number; cta: number; link: number }> = {};
      for (const v of views || []) {
        if (!v.path?.startsWith("/event/booking-")) continue;
        // Skip dev/preview referrers to match JSON-aggregation filtering
        if (v.referrer && (v.referrer.includes("lovable.app") || v.referrer.includes("lovable.dev") || v.referrer.includes("lovableproject.com") || v.referrer.includes("localhost"))) continue;
        const source = v.referrer || "unknown";
        if (!bookingAgg[source]) bookingAgg[source] = { search: 0, sticky: 0, cta: 0, link: 0 };
        if (v.path === "/event/booking-search-widget") bookingAgg[source].search++;
        else if (v.path === "/event/booking-sticky-bar") bookingAgg[source].sticky++;
        else if (v.path === "/event/booking-page-cta") bookingAgg[source].cta++;
        else if (v.path === "/event/booking-link") bookingAgg[source].link++;
      }
      const escCsv = (s: string) => s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
      const bookingRows = Object.entries(bookingAgg)
        .map(([source, c]) => ({ source, total: c.search + c.sticky + c.cta + c.link, ...c }))
        .filter((r) => r.total > 0)
        .sort((a, b) => b.total - a.total)
        .map((r) => [escCsv(r.source), r.total, r.search, r.sticky, r.cta, r.link].join(","));

      const bookingBlock = [
        "",
        "BOOKING CLICKS BY SOURCE — app.moder.fi clicks aggregated by source page over the selected period",
        "source_page,total,search_widget,sticky_bar,page_cta,other_link",
        ...bookingRows,
      ];

      // Inline & promo banner clicks (from promo_banner_clicks table — logPromoClick)
      // Inline-linkit erottuvat placement-kentästä, joka sisältää "_inline_" (esim. summer_page_inline_intro).
      const { data: promoClicks } = await supabase
        .from("promo_banner_clicks")
        .select("placement, language, target_url, created_at")
        .gte("created_at", since);

      const promoAgg: Record<string, { link_type: string; total: number; by_lang: Record<string, number>; target_url: string; last_click_at: string }> = {};
      for (const c of promoClicks || []) {
        const placement = c.placement || "(unknown)";
        const linkType = placement.includes("_inline_") ? "inline" : "banner";
        if (!promoAgg[placement]) {
          promoAgg[placement] = { link_type: linkType, total: 0, by_lang: {}, target_url: c.target_url || "", last_click_at: c.created_at };
        }
        promoAgg[placement].total++;
        const lang = c.language || "unknown";
        promoAgg[placement].by_lang[lang] = (promoAgg[placement].by_lang[lang] || 0) + 1;
        if (c.created_at > promoAgg[placement].last_click_at) promoAgg[placement].last_click_at = c.created_at;
      }
      const langCols = ["fi", "en", "nl", "sv", "de", "fr", "es"];
      const promoRows = Object.entries(promoAgg)
        .map(([placement, d]) => ({ placement, ...d }))
        .sort((a, b) => {
          if (a.link_type !== b.link_type) return a.link_type === "inline" ? -1 : 1;
          return b.total - a.total;
        })
        .map((r) => [
          escCsv(r.placement),
          r.link_type,
          r.total,
          ...langCols.map((l) => r.by_lang[l] || 0),
          escCsv(r.target_url || ""),
          r.last_click_at,
        ].join(","));

      const promoBlock = [
        "",
        "INLINE & PROMO BANNER CLICKS (promo_banner_clicks) — link_type=inline merkitsee sisältöön upotetut inline-linkit (esim. summer_page_inline_intro), link_type=banner on kampanjabannereiden klikit. HUOM: sama klikki näkyy myös yllä BOOKING CLICKS BY SOURCE -lohkossa.",
        `placement,link_type,total,${langCols.join(",")},target_url,last_click_at`,
        ...promoRows,
      ];

      return new Response([csvHeader, ...csvRows, ...bookingBlock, ...promoBlock].join("\n"), {
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
    const byCountry: Record<string, number> = {};
    const byViewport: Record<string, number> = { "mobile-s (<640)": 0, "mobile-l (640-1023)": 0, "laptop (1024-1439)": 0, "desktop (≥1440)": 0, "unknown": 0 };
    const conversionMap: Record<string, { count: number; sources: Record<string, number> }> = {};
    const byUtmSource: Record<string, number> = {};
    const byUtmMedium: Record<string, number> = {};
    const byUtmCampaign: Record<string, number> = {};
    let total = 0;
    let scrollDepthSum = 0;
    let scrollDepthCount = 0;
    let timeOnPageSum = 0;
    let timeOnPageCount = 0;

    // Session tracking — also collect first/last pageview path per session
    const sessionPages: Record<string, { timestamps: number[]; pageCount: number; firstPath?: string; firstTs?: number; lastPath?: string; lastTs?: number }> = {};
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
          // Track first (earliest) pageview path for landing pages
          if (sessionPages[sid].firstTs === undefined || ts < sessionPages[sid].firstTs!) {
            sessionPages[sid].firstTs = ts;
            sessionPages[sid].firstPath = v.path;
          }
          // Track last (latest) pageview path for exit pages
          if (sessionPages[sid].lastTs === undefined || ts > sessionPages[sid].lastTs!) {
            sessionPages[sid].lastTs = ts;
            sessionPages[sid].lastPath = v.path;
          }
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
        const country = v.country || "unknown";
        byCountry[country] = (byCountry[country] || 0) + 1;

        // Viewport bucketing
        const vw = typeof v.viewport_w === "number" ? v.viewport_w : null;
        if (vw === null) byViewport["unknown"]++;
        else if (vw < 640) byViewport["mobile-s (<640)"]++;
        else if (vw < 1024) byViewport["mobile-l (640-1023)"]++;
        else if (vw < 1440) byViewport["laptop (1024-1439)"]++;
        else byViewport["desktop (≥1440)"]++;

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
          .slice(0, type.startsWith("/event/booking-") ? 50 : 5)
          .map(([source, count]) => ({ source, count })),
      }));

    // Aggregate booking clicks by source page across ALL booking-* event types
    const bookingBySource: Record<string, { search: number; sticky: number; cta: number; link: number }> = {};
    for (const [eventType, data] of Object.entries(conversionMap)) {
      if (!eventType.startsWith("/event/booking-")) continue;
      for (const [source, count] of Object.entries(data.sources)) {
        if (!bookingBySource[source]) bookingBySource[source] = { search: 0, sticky: 0, cta: 0, link: 0 };
        if (eventType === "/event/booking-search-widget") bookingBySource[source].search += count;
        else if (eventType === "/event/booking-sticky-bar") bookingBySource[source].sticky += count;
        else if (eventType === "/event/booking-page-cta") bookingBySource[source].cta += count;
        else if (eventType === "/event/booking-link") bookingBySource[source].link += count;
      }
    }
    const bookingClicksBySource = Object.entries(bookingBySource)
      .map(([source, c]) => ({
        source,
        total: c.search + c.sticky + c.cta + c.link,
        bySearchWidget: c.search,
        byStickyBar: c.sticky,
        byPageCta: c.cta,
        byLink: c.link,
      }))
      .filter((r) => r.total > 0)
      .sort((a, b) => b.total - a.total);

    const avgScrollDepth = scrollDepthCount > 0 ? Math.round(scrollDepthSum / scrollDepthCount) : null;
    const avgTimeOnPage = timeOnPageCount > 0 ? Math.round(timeOnPageSum / timeOnPageCount) : null;


    // Landing & exit pages — first/last pageview path per session
    const landingCounts: Record<string, number> = {};
    const exitCounts: Record<string, number> = {};
    for (const s of Object.values(sessionPages)) {
      if (s.firstPath) landingCounts[s.firstPath] = (landingCounts[s.firstPath] || 0) + 1;
      if (s.lastPath) exitCounts[s.lastPath] = (exitCounts[s.lastPath] || 0) + 1;
    }
    const topLandingPages = Object.entries(landingCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([path, count]) => ({ path, count }));
    const topExitPages = Object.entries(exitCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([path, count]) => ({ path, count }));

    // Inline & promo banner clicks aggregation (from promo_banner_clicks table)
    const { data: promoClicksJson } = await supabase
      .from("promo_banner_clicks")
      .select("placement, language, target_url, created_at")
      .gte("created_at", since);

    const promoAggJson: Record<string, { link_type: string; total: number; by_language: Record<string, number>; target_url: string; last_click_at: string }> = {};
    for (const c of promoClicksJson || []) {
      const placement = c.placement || "(unknown)";
      const linkType = placement.includes("_inline_") ? "inline" : "banner";
      if (!promoAggJson[placement]) {
        promoAggJson[placement] = { link_type: linkType, total: 0, by_language: {}, target_url: c.target_url || "", last_click_at: c.created_at };
      }
      promoAggJson[placement].total++;
      const lang = c.language || "unknown";
      promoAggJson[placement].by_language[lang] = (promoAggJson[placement].by_language[lang] || 0) + 1;
      if (c.created_at > promoAggJson[placement].last_click_at) promoAggJson[placement].last_click_at = c.created_at;
    }
    const inlinePromoClicks = Object.entries(promoAggJson)
      .map(([placement, d]) => ({ placement, ...d }))
      .sort((a, b) => {
        if (a.link_type !== b.link_type) return a.link_type === "inline" ? -1 : 1;
        return b.total - a.total;
      });

    return new Response(
      JSON.stringify({
        total, byDate, topPages, byReferrer, byDevice, byLanguage, byCountry, byViewport, conversionEvents,
        totalSessions, bounceRate, avgSessionDurationSec, byDateSessions,
        byUtmSource, byUtmMedium, byUtmCampaign, avgScrollDepth, avgTimeOnPage,
        topLandingPages, topExitPages, bookingClicksBySource, inlinePromoClicks,

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
