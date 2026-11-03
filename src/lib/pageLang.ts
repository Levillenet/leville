// Page language from the URL path, shared by Moder links and analytics events.
const SUPPORTED = new Set(["fi", "en", "de", "sv", "fr", "es", "nl"]);

/** First path segment if it is a language prefix, otherwise Finnish. */
export function pageLanguage(path: string): string {
  const seg = path.split("/").filter(Boolean)[0]?.toLowerCase();
  return seg && SUPPORTED.has(seg) ? seg : "fi";
}

/** Moder offers fi/en: Finnish pages → fi, every other language → en. */
export const moderLang = (path: string): "fi" | "en" => (pageLanguage(path) === "fi" ? "fi" : "en");

/** Events (/event/...) take the language of their source page (referrer), not of the event path. */
export const eventLanguage = (path: string, referrer?: string | null): string =>
  pageLanguage(path.startsWith("/event/") && referrer ? referrer : path);

/** Forces lang=<page language> on app.moder.fi URLs; everything else is untouched. */
export function withModerLang(url: string, path: string): string {
  try {
    const u = new URL(url, typeof window !== "undefined" ? window.location.href : "https://leville.net");
    if (u.hostname !== "app.moder.fi") return url;
    const lang = moderLang(path);
    if (u.searchParams.get("lang") === lang) return url;
    u.searchParams.set("lang", lang);
    return u.toString();
  } catch { return url; }
}
