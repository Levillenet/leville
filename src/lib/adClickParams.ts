// Captures Google Ads click IDs / UTM params from the landing URL into memory only
// (no cookies or web storage) and forwards them to app.moder.fi booking links.
const KEYS = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
] as const;

const stored: Record<string, string> = {};

export function captureAdParams(search: string): void {
  for (const k of Object.keys(stored)) delete stored[k];
  const sp = new URLSearchParams(search);
  for (const k of KEYS) {
    const v = sp.get(k);
    if (v) stored[k] = v;
  }
}

if (typeof window !== "undefined") captureAdParams(window.location.search);

export function getAdParams(): Record<string, string> {
  return { ...stored };
}

export function appendAdParams(url: string): string {
  const keys = Object.keys(stored);
  if (!keys.length) return url;
  let u: URL;
  try {
    u = new URL(url, typeof window !== "undefined" ? window.location.href : undefined);
  } catch {
    return url;
  }
  if (u.hostname !== "app.moder.fi") return url;
  let changed = false;
  for (const k of keys) {
    if (!u.searchParams.has(k)) {
      u.searchParams.append(k, stored[k]);
      changed = true;
    }
  }
  return changed ? u.toString() : url;
}

let patched = false;
export function installWindowOpenPatch(): void {
  if (patched || typeof window === "undefined") return;
  patched = true;
  const original = window.open.bind(window);
  window.open = ((url?: string | URL, ...rest: unknown[]) => {
    const next = typeof url === "string" ? appendAdParams(url) : url;
    return (original as (...a: unknown[]) => Window | null)(next, ...rest);
  }) as typeof window.open;
}
