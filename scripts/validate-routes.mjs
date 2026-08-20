// Build-time route & translation validator for leville.net
// Runs after generate-sitemap.mjs, before vite build.
// Set VALIDATE_STRICT=1 to fail the build on errors; otherwise it only reports.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const APP = readFileSync(resolve("src/App.tsx"), "utf8");
const SITEMAP_PATH = resolve("public/sitemap.xml");
const LANGS = ["fi", "en", "sv", "de", "fr", "es", "nl"];

const STRICT = process.env.VALIDATE_STRICT === "1";
const errors = [];
const warns = [];

// ---------- 1. lazy import map: Name -> file path ----------
const importMap = {};
for (const m of APP.matchAll(/const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']/g)) {
  let p = m[2].replace(/^@\//, "src/").replace(/^\.\//, "src/");
  for (const ext of [".tsx", ".ts", "/index.tsx"]) {
    if (existsSync(resolve(p + ext))) { importMap[m[1]] = p + ext; break; }
  }
  if (!importMap[m[1]] && existsSync(resolve(p))) importMap[m[1]] = p;
}

// ---------- 2. static routes from App.tsx ----------
const staticRoutes = [];
for (const m of APP.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)([^>]*)\/?>/g)) {
  const langAttr = /lang="(\w+)"/.exec(m[3]);
  staticRoutes.push({ path: m[1], comp: m[2], lang: langAttr ? langAttr[1] : null });
}

const seen = new Map();
for (const r of staticRoutes) {
  if (seen.has(r.path)) errors.push(`Duplicate route path in App.tsx: ${r.path}`);
  else seen.set(r.path, r);
}

// ---------- 3. seoComponentMap ----------
const mapBlock = /const seoComponentMap[^{]*\{([\s\S]*?)\n\};/.exec(APP);
const seoMap = {};
if (mapBlock) {
  for (const m of mapBlock[1].matchAll(/['"]?([\w-]+)['"]?\s*:\s*(\w+)\s*,/g)) seoMap[m[1]] = m[2];
}

// ---------- 4. translation coverage per component file ----------
const transCache = {};
const defaultLangCache = {};
function defaultLangOf(file) {
  if (file in defaultLangCache) return defaultLangCache[file];
  let d = "fi";
  if (file && existsSync(resolve(file))) {
    const m = /\(\s*\{[^}]*\blang\s*=\s*["'](\w+)["']/.exec(readFileSync(resolve(file), "utf8"));
    if (m) d = m[1];
  }
  defaultLangCache[file] = d;
  return d;
}
function langsOf(file) {
  if (!file) return null;
  if (transCache[file]) return transCache[file];
  if (!existsSync(resolve(file))) return null;
  const src = readFileSync(resolve(file), "utf8");
  const found = LANGS.filter((l) => new RegExp(`^\\s{2,}${l}\\s*:\\s*\\{`, "m").test(src));
  transCache[file] = found.length ? found : null;
  return transCache[file];
}

function checkLang(routePath, compName, lang, origin) {
  const file = importMap[compName];
  if (!file) return;
  const has = langsOf(file);
  if (!has) return;
  if (!has.includes(lang)) {
    errors.push(
      `${origin}: ${routePath} renders <${compName} lang="${lang}"> but ${file} only has [${has.join(", ")}] -> falls back to FI and emits a wrong canonical.`
    );
  }
}

for (const r of staticRoutes) {
  if (r.path.startsWith("/admin") || r.path === "*" || r.path.includes("*")) continue;
  checkLang(r.path, r.comp, r.lang || defaultLangOf(importMap[r.comp]), "STATIC");
}

// ---------- 5. dynamic seo_pages ----------
let seoPages = [];
try {
  const env = existsSync(resolve(".env")) ? readFileSync(resolve(".env"), "utf8") : "";
  const get = (k) => (new RegExp(`^${k}=(.*)$`, "m").exec(env) || [])[1]?.trim().replace(/^["']|["']$/g, "");
  const url = process.env.VITE_SUPABASE_URL || get("VITE_SUPABASE_URL");
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || get("VITE_SUPABASE_PUBLISHABLE_KEY");
  if (url && key) {
    const res = await fetch(`${url}/functions/v1/manage-seo-pages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, apikey: key },
      body: JSON.stringify({ action: "get_published" }),
    });
    if (res.ok) seoPages = await res.json();
  }
} catch (e) {
  warns.push(`Could not fetch seo_pages: ${e.message}`);
}

for (const p of seoPages) {
  const compName = seoMap[p.component_name];
  if (!compName) {
    errors.push(`SEO_PAGE: ${p.path} references component_name "${p.component_name}" which is missing from seoComponentMap.`);
    continue;
  }
  checkLang(p.path, compName, p.lang || "fi", "SEO_PAGE");
}

// ---------- 6. sitemap vs routes ----------
if (existsSync(SITEMAP_PATH)) {
  const xml = readFileSync(SITEMAP_PATH, "utf8");
  const urls = [...xml.matchAll(/<loc>https:\/\/leville\.net([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
  const known = new Set([...staticRoutes.map((r) => r.path), ...seoPages.map((p) => p.path)]);
  const dynPatterns = staticRoutes
    .filter((r) => r.path.includes(":"))
    .map((r) => new RegExp("^" + r.path.replace(/:[^/]+/g, "[^/]+") + "$"));
  for (const u of urls) {
    if (known.has(u)) continue;
    if (dynPatterns.some((re) => re.test(u))) continue;
    errors.push(`SITEMAP: ${u} is in sitemap.xml but has no matching route or published seo_page (soft 404).`);
  }
}

// ---------- 7. required components per page ----------
function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".tsx")) out.push(p);
  }
  return out;
}
const pageFiles = walk(resolve("src/pages"));
const REQUIRED = ["Header", "Footer", "HreflangTags", "PageCTA", "StickyBookingBar", "WhatsAppChat", "Breadcrumbs"];
const LANG_PROP = ["Footer", "PageCTA", "StickyBookingBar", "WhatsAppChat"];
for (const f of pageFiles) {
  if (f.includes("/admin/") || /Admin|NotFound/.test(f)) continue;
  const src = readFileSync(resolve(f), "utf8");
  const missing = REQUIRED.filter((c) => !src.includes(c));
  if (missing.length) warns.push(`${f}: missing ${missing.join(", ")}`);
  for (const c of LANG_PROP) {
    if (new RegExp(`<${c}\\s*/>`).test(src)) errors.push(`${f}: <${c} /> has no lang prop -> renders Finnish on foreign-language routes.`);
  }
}

// ---------- report ----------
console.log(`\n[validate-routes] ${staticRoutes.length} static routes, ${seoPages.length} published seo_pages, ${Object.keys(importMap).length} lazy components.`);
if (warns.length) {
  console.log(`\n[validate-routes] ${warns.length} WARNINGS:`);
  warns.slice(0, 30).forEach((w) => console.log("  WARN  " + w));
  if (warns.length > 30) console.log(`  ... and ${warns.length - 30} more`);
}
if (errors.length) {
  console.error(`\n[validate-routes] ${errors.length} ERRORS:`);
  errors.slice(0, 400).forEach((e) => console.error("  ERROR " + e));
  if (errors.length > 400) console.error(`  ... and ${errors.length - 400} more`);
  if (STRICT) {
    console.error("\n[validate-routes] Build aborted (VALIDATE_STRICT=1).\n");
    process.exit(1);
  }
  console.error("\n[validate-routes] Not aborting: set VALIDATE_STRICT=1 to fail the build.\n");
  process.exit(0);
}
console.log("[validate-routes] All checks passed.\n");
