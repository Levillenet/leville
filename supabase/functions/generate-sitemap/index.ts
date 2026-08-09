import { createClient } from "npm:@supabase/supabase-js@2";
import { SITEMAP_ROUTES, type SitemapRoute } from "../_shared/sitemapRoutes.ts";
import { PROPERTY_SLUGS } from "../_shared/propertySlugs.ts";

const BASE_URL = "https://leville.net"; // canonical domain

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const lastmod = new Date().toISOString().slice(0, 10);
  const routes: SitemapRoute[] = [...SITEMAP_ROUTES];
  const seen = new Set(routes.map((r) => r.path));

  const add = (r: SitemapRoute) => {
    if (seen.has(r.path)) return;
    seen.add(r.path);
    routes.push(r);
  };

  // Property detail pages (FI + EN)
  for (const slug of PROPERTY_SLUGS) {
    add({ path: `/majoitukset/${slug}`, lang: "fi", priority: 0.9, changefreq: "weekly", altGroup: `property-${slug}` });
    add({ path: `/en/accommodations/${slug}`, lang: "en", priority: 0.9, changefreq: "weekly", altGroup: `property-${slug}` });
  }

  // Published SEO pages from the database
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data } = await supabase
      .from("seo_pages")
      .select("path, lang")
      .eq("is_published", true);
    for (const row of data ?? []) {
      const path = row.path?.startsWith("/") ? row.path : `/${row.path ?? ""}`;
      if (!row.path) continue;
      add({ path, lang: (row.lang ?? "fi") as SitemapRoute["lang"], priority: 0.7, changefreq: "monthly" });
    }
  } catch (_e) {
    // DB unavailable — still serve the static route set
  }

  // Build alternate-language groups
  const groups = new Map<string, SitemapRoute[]>();
  for (const r of routes) {
    if (!r.altGroup) continue;
    const list = groups.get(r.altGroup) ?? [];
    list.push(r);
    groups.set(r.altGroup, list);
  }

  const urls = routes.map((r) => {
    const alts = r.altGroup ? groups.get(r.altGroup) ?? [] : [];
    const altLines = alts.length > 1
      ? alts
          .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${esc(BASE_URL + a.path)}"/>`)
          .concat([
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(
              BASE_URL + (alts.find((a) => a.lang === "fi") ?? alts[0]).path,
            )}"/>`,
          ])
          .join("\n")
      : "";
    return [
      "  <url>",
      `    <loc>${esc(BASE_URL + r.path)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority.toFixed(1)}</priority>`,
      altLines,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
