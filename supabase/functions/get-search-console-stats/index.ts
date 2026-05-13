// Google Search Console stats proxy for admin dashboard.
// Calls the Lovable connector gateway (no API key in browser).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE = "sc-domain:leville.net";
const SITE_PATH = encodeURIComponent(SITE);

// In-memory cache keyed by `${start}:${end}:${langFilter}`
type CacheEntry = { ts: number; payload: any };
const CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000;

interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

async function gscQuery(body: Record<string, unknown>, lovableKey: string, gscKey: string): Promise<{ rows: GscRow[] }> {
  const res = await fetch(`${GATEWAY}/webmasters/v3/sites/${SITE_PATH}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GSC API ${res.status}: ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  return { rows: data.rows || [] };
}

function langFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const seg = u.pathname.split("/").filter(Boolean)[0] || "";
    if (["en", "de", "sv", "fr", "es", "nl"].includes(seg)) return seg;
    return "fi";
  } catch {
    return "fi";
  }
}

function shiftDate(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function diffDays(start: string, end: string): number {
  const a = new Date(start + "T00:00:00Z").getTime();
  const b = new Date(end + "T00:00:00Z").getTime();
  return Math.round((b - a) / 86400000) + 1;
}

function summarize(rows: GscRow[]) {
  let clicks = 0, impressions = 0, posSum = 0, posCount = 0;
  for (const r of rows) {
    clicks += r.clicks;
    impressions += r.impressions;
    if (r.position && r.impressions) {
      posSum += r.position * r.impressions;
      posCount += r.impressions;
    }
  }
  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: posCount > 0 ? posSum / posCount : 0,
  };
}

function applyLangFilter(rows: GscRow[], lang: string): GscRow[] {
  if (!lang || lang === "all") return rows;
  return rows.filter((r) => langFromUrl(r.keys[0] || "") === lang);
}

const REPORT_DESCRIPTION = `LEVILLE.NET — GOOGLE SEARCH CONSOLE -RAPORTTI

Tämä CSV sisältää orgaanisten Google-hakujen dataa leville.net-domainille (sc-domain-property).
Lähde: Google Search Console Search Analytics API.

SARAKKEET:
- dimension: rivin tyyppi ("query" = hakulauseke, "page" = sivun URL, "country" = ISO-3166 alpha-3, "device" = MOBILE/DESKTOP/TABLET, "date" = YYYY-MM-DD)
- key: dimension-arvo
- clicks: Googlen hakutuloksesta klikit
- impressions: Kuinka monta kertaa sivu näytettiin Googlen hakutuloksissa
- ctr: clicks / impressions
- position: Keskimääräinen sijoitus hakutuloksissa (1 = paras)

HUOM:
- GSC palauttaa vain orgaaniset Google-haut, ei muuta liikennettä.
- Linkit muilta sivustoilta (esim. levi.fi → leville.net) eivät näy tässä raportissa — ne löytyvät vain GSC:n web-UI:n Linkit-osiosta TAI sivuston omasta page_views.referrer-datasta.
- Data tulee n. 2 päivän viiveellä.
- "language"-filtteri johdettu URL-prefiksistä: /en/* = en, /de/* = de jne. ei niistä = fi.
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password, period = "28days", language = "all", format } = await req.json();

    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!password || password !== adminPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!lovableKey || !gscKey) {
      return new Response(JSON.stringify({ error: "GSC connector not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Compute date range. GSC has ~2 day delay; use end = today - 2.
    const days = period === "7days" ? 7 : period === "90days" ? 90 : 28;
    const today = new Date();
    today.setUTCDate(today.getUTCDate() - 2);
    const endDate = today.toISOString().slice(0, 10);
    const startDate = shiftDate(endDate, -(days - 1));

    const cacheKey = `${startDate}:${endDate}:${language}:${format || "json"}`;
    const cached = CACHE.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      if (format === "csv") {
        return new Response(cached.payload, {
          headers: { ...corsHeaders, "Content-Type": "text/csv; charset=utf-8" },
        });
      }
      return new Response(JSON.stringify(cached.payload), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Previous period for delta comparison
    const prevEnd = shiftDate(startDate, -1);
    const prevStart = shiftDate(prevEnd, -(days - 1));

    // Fetch in parallel
    const [byDate, byQuery, byPage, byCountry, byDevice, prevByDate] = await Promise.all([
      gscQuery({ startDate, endDate, dimensions: ["date"], rowLimit: 1000 }, lovableKey, gscKey),
      gscQuery({ startDate, endDate, dimensions: ["query"], rowLimit: 1000 }, lovableKey, gscKey),
      gscQuery({ startDate, endDate, dimensions: ["page"], rowLimit: 1000 }, lovableKey, gscKey),
      gscQuery({ startDate, endDate, dimensions: ["country"], rowLimit: 50 }, lovableKey, gscKey),
      gscQuery({ startDate, endDate, dimensions: ["device"], rowLimit: 10 }, lovableKey, gscKey),
      gscQuery({ startDate: prevStart, endDate: prevEnd, dimensions: ["date"], rowLimit: 1000 }, lovableKey, gscKey),
    ]);

    // Apply language filter (on page-keyed results we filter by URL; for query/country/device GSC has no native lang dim,
    // so we additionally fetch a [page,query] / [page,country] / [page,device] join when lang != all)
    let queryRows = byQuery.rows;
    let countryRows = byCountry.rows;
    let deviceRows = byDevice.rows;
    let pageRows = applyLangFilter(byPage.rows, language);
    let dateRows = byDate.rows;
    let prevDateRows = prevByDate.rows;

    if (language !== "all") {
      // Re-derive query/country/device from page+X joins so language filter is accurate
      const [pq, pc, pd, pdate, prevPdate] = await Promise.all([
        gscQuery({ startDate, endDate, dimensions: ["page", "query"], rowLimit: 5000 }, lovableKey, gscKey),
        gscQuery({ startDate, endDate, dimensions: ["page", "country"], rowLimit: 5000 }, lovableKey, gscKey),
        gscQuery({ startDate, endDate, dimensions: ["page", "device"], rowLimit: 5000 }, lovableKey, gscKey),
        gscQuery({ startDate, endDate, dimensions: ["page", "date"], rowLimit: 25000 }, lovableKey, gscKey),
        gscQuery({ startDate: prevStart, endDate: prevEnd, dimensions: ["page", "date"], rowLimit: 25000 }, lovableKey, gscKey),
      ]);

      const langFilter = (rows: GscRow[]) => rows.filter((r) => langFromUrl(r.keys[0] || "") === language);

      // Aggregate joined rows on the second dim
      const aggregate = (rows: GscRow[]): GscRow[] => {
        const m = new Map<string, GscRow>();
        for (const r of rows) {
          const k = r.keys[1] || "";
          const existing = m.get(k);
          if (existing) {
            const newImpr = existing.impressions + r.impressions;
            existing.position = newImpr > 0
              ? (existing.position * existing.impressions + r.position * r.impressions) / newImpr
              : 0;
            existing.clicks += r.clicks;
            existing.impressions = newImpr;
            existing.ctr = existing.impressions > 0 ? existing.clicks / existing.impressions : 0;
          } else {
            m.set(k, { keys: [k], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position });
          }
        }
        return Array.from(m.values());
      };

      queryRows = aggregate(langFilter(pq.rows));
      countryRows = aggregate(langFilter(pc.rows));
      deviceRows = aggregate(langFilter(pd.rows));
      dateRows = aggregate(langFilter(pdate.rows));
      prevDateRows = aggregate(langFilter(prevPdate.rows));
    }

    // CSV format
    if (format === "csv") {
      const lines: string[] = [];
      lines.push(REPORT_DESCRIPTION);
      lines.push("");
      lines.push(`Aikaväli,${startDate},${endDate},Kieli,${language}`);
      lines.push("");
      lines.push("dimension,key,clicks,impressions,ctr,position");
      const push = (dim: string, rows: GscRow[]) => {
        for (const r of rows) {
          const key = (r.keys[0] || "").replace(/"/g, '""');
          lines.push(`${dim},"${key}",${r.clicks},${r.impressions},${r.ctr.toFixed(4)},${r.position.toFixed(2)}`);
        }
      };
      push("date", dateRows);
      push("query", queryRows);
      push("page", pageRows);
      push("country", countryRows);
      push("device", deviceRows);
      const csv = lines.join("\n");
      CACHE.set(cacheKey, { ts: Date.now(), payload: csv });
      return new Response(csv, {
        headers: { ...corsHeaders, "Content-Type": "text/csv; charset=utf-8" },
      });
    }

    const summary = summarize(dateRows);
    const prevSummary = summarize(prevDateRows);

    const sortByClicks = (rows: GscRow[]) =>
      rows.slice().sort((a, b) => b.clicks - a.clicks);

    const payload = {
      meta: {
        startDate,
        endDate,
        prevStartDate: prevStart,
        prevEndDate: prevEnd,
        days,
        language,
      },
      summary,
      previousSummary: prevSummary,
      byDate: dateRows
        .slice()
        .sort((a, b) => (a.keys[0] || "").localeCompare(b.keys[0] || ""))
        .map((r) => ({
          date: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
      topQueries: sortByClicks(queryRows).slice(0, 25).map((r) => ({
        query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      })),
      topPages: sortByClicks(pageRows).slice(0, 25).map((r) => ({
        page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      })),
      topCountries: sortByClicks(countryRows).slice(0, 15).map((r) => ({
        country: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      })),
      byDevice: deviceRows.map((r) => ({
        device: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      })),
    };

    CACHE.set(cacheKey, { ts: Date.now(), payload });

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("get-search-console-stats error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
