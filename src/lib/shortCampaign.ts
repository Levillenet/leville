// Short social campaign tags (?fb=xxx / ?ig=xxx) are rewritten to standard UTM
// parameters before any analytics or link decoration reads the URL.
const SHORT_TAGS: Record<string, { source: string; medium: string }> = {
  fb: { source: "facebook", medium: "group" },
  ig: { source: "instagram", medium: "social" },
};
const VALID = /^[a-z0-9-]{1,40}$/;

/** Returns the rewritten search string, or null when nothing should change. */
export function expandShortCampaign(search: string): string | null {
  const params = new URLSearchParams(search);
  const key = Object.keys(SHORT_TAGS).find((k) => params.has(k));
  if (!key) return null;
  const value = params.get(key) ?? "";
  if (!VALID.test(value)) return null;
  params.delete(key);
  if (!params.has("utm_source")) {
    params.set("utm_source", SHORT_TAGS[key].source);
    params.set("utm_medium", SHORT_TAGS[key].medium);
    params.set("utm_campaign", value);
  }
  const out = params.toString();
  return out ? `?${out}` : "";
}

if (typeof window !== "undefined") {
  const next = expandShortCampaign(window.location.search);
  if (next !== null) {
    const { pathname, hash } = window.location;
    window.history.replaceState(window.history.state, "", `${pathname}${next}${hash}`);
  }
}
