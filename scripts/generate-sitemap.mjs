// Fetches the dynamic sitemap from the generate-sitemap edge function at build time
// and writes it to public/sitemap.xml so Vite copies it into dist/.
// Never writes a partial/empty file: validates first, writes second.
// Always exits 0 so a network hiccup can't break the build.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITEMAP_URL =
  "https://jcvxklzcxngctyqmknax.supabase.co/functions/v1/generate-sitemap";
const OUTPUT_PATH = resolve("public/sitemap.xml");
const MIN_LOC_ENTRIES = 500;

const fail = (message) => {
  console.error(`[sitemap] ERROR: ${message}`);
  console.error("[sitemap] Existing public/sitemap.xml left untouched. Build continues.");
  process.exit(0);
};

try {
  const response = await fetch(SITEMAP_URL, {
    headers: { Accept: "application/xml" },
  });

  if (response.status !== 200) {
    fail(`generate-sitemap returned HTTP ${response.status} (expected 200).`);
  }

  const body = await response.text();

  if (!body.trimStart().startsWith("<?xml")) {
    fail("Response body does not start with '<?xml'.");
  }

  const locCount = (body.match(/<loc>/g) || []).length;

  if (locCount < MIN_LOC_ENTRIES) {
    fail(`Only ${locCount} <loc> entries found (minimum ${MIN_LOC_ENTRIES}).`);
  }

  writeFileSync(OUTPUT_PATH, body, "utf8");
  console.log(`[sitemap] public/sitemap.xml written with ${locCount} <loc> entries.`);
} catch (error) {
  fail(`Failed to fetch sitemap: ${error?.message ?? error}`);
}
