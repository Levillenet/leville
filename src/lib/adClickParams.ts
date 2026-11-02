import { hasConsent } from "./cookieConsent";
import { searchEventParams, trackSearchThenNavigate } from "./googleAnalytics";
import { decideSearch, quickDecision, showEmptySearch, watchModerSelection } from "./emptySearch";

// All Moder navigation paths share appendAdParams. Existing click IDs remain
// in memory; campaign UTMs come from the current URL, then existing session data.
const KEYS = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
] as const;

const stored: Record<string, string> = {};
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function captureAdParams(search: string): void {
  for (const k of Object.keys(stored)) delete stored[k];
  if (typeof window !== "undefined" && !hasConsent("marketing")) return;
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
  if (typeof window !== "undefined" && !hasConsent("marketing")) {
    try {
      const target = new URL(url, window.location.href);
      if (target.hostname !== "app.moder.fi") return url;
      let changed = false;
      for (const key of KEYS) {
        if (target.searchParams.has(key)) { target.searchParams.delete(key); changed = true; }
      }
      return changed ? target.toString() : url;
    } catch { return url; }
  }
  const params = { ...stored };
  const current = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  for (const key of UTM_KEYS) {
    // Unlike click IDs, these must not fall back to a stale landing-URL value.
    delete params[key];
    let value = current.get(key);
    if (!value && typeof window !== "undefined") {
      try {
        value = window.sessionStorage.getItem(`_lv_${key}`);
      } catch {
        // Storage can be unavailable; URL values still work.
      }
    }
    if (value) params[key] = value;
    // Preserve the existing pure-function API for non-browser callers/tests.
    else if (typeof window === "undefined" && stored[key]) params[key] = stored[key];
  }
  const keys = Object.keys(params);
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
    if (UTM_KEYS.some((key) => key === k) ? u.searchParams.get(k) !== params[k] : !u.searchParams.has(k)) {
      u.searchParams.set(k, params[k]);
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
    const next = typeof url === "string" || url instanceof URL ? appendAdParams(String(url)) : url;
    return (original as (...a: unknown[]) => Window | null)(next, ...rest);
  }) as typeof window.open;
}

interface ModerSearchState {
  searchReady: boolean;
  baseUrl: string;
  ModerSettings: { internal?: boolean; property?: string; roomTypeId?: string | number };
  fromDate: string;
  toDate: string;
  personsAdults: number;
  personsChildren: number;
  $locale: string;
  flexibleDateSearch: number;
  close: () => void;
}

let linksInstalled = false;
export function installModerLinkParams(): void {
  if (linksInstalled || typeof window === "undefined") return;
  linksInstalled = true;
  installWindowOpenPatch();
  watchModerSelection();

  const updateAnchor = (anchor: HTMLAnchorElement) => {
    const next = appendAdParams(anchor.href);
    if (next !== anchor.href) anchor.href = next;
  };
  const updateLinks = (root: ParentNode) => {
    root.querySelectorAll<HTMLAnchorElement>('a[href*="app.moder.fi"]').forEach(updateAnchor);
  };
  updateLinks(document);
  window.addEventListener("lv-consent-change", () => {
    captureAdParams(window.location.search);
    if (hasConsent("marketing")) {
      for (const key of UTM_KEYS) {
        const value = new URLSearchParams(window.location.search).get(key);
        try { if (value) sessionStorage.setItem(`_lv_${key}`, value); } catch { /* unavailable */ }
      }
    }
    updateLinks(document);
  });
  // Covers React-rendered links, lazy pages and third-party/dynamic anchors.
  new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes" && record.target instanceof HTMLAnchorElement) {
        updateAnchor(record.target);
      }
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node instanceof HTMLAnchorElement) updateAnchor(node);
        updateLinks(node);
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });

  const handleNavigation = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
    // This navigation already passed through tracking and its single delay.
    if (anchor?.hasAttribute("data-lv-nav")) return;
    if (anchor) updateAnchor(anchor);

    if (event.type !== "click" || !event.target.closest(".moder-bar__search-button")) return;
    const moder = (window as Window & { Moder?: ModerSearchState }).Moder;
    if (!moder?.searchReady || moder.ModerSettings.internal) return;
    // The embed uses location.assign, not an anchor or window.open. Preserve
    // its exact search fields and only intercept when tracking changes the URL.
    const room = moder.ModerSettings.roomTypeId ? `/${moder.ModerSettings.roomTypeId}` : "";
    const url = `${moder.baseUrl}/${moder.ModerSettings.property || "not-found"}${room}?start=${moder.fromDate}&end=${moder.toDate}&adults=${moder.personsAdults}&children=${moder.personsChildren}&lang=${moder.$locale}&flexible_date_search=${moder.flexibleDateSearch}`;
    const next = appendAdParams(url);
    const search = searchEventParams(next, window.location.pathname);
    const navigate = (target: string) => {
      // gtag's cross-domain linker decorates anchors on mousedown; click the
      // same element afterward so navigation uses its updated href (with _gl).
      // data-lv-nav tells the delegated trackers to skip this synthetic click.
      if (hasConsent("analytics")) {
        const anchor = document.createElement("a");
        anchor.href = target;
        anchor.setAttribute("data-lv-nav", "1");
        anchor.style.display = "none";
        document.body.appendChild(anchor);
        anchor.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, button: 0 }));
        anchor.click();
        anchor.remove();
        return;
      }
      window.location.assign(target);
    };
    const go = () => { moder.close(); navigate(next); };
    // Empty-search rescue: only available === 0 stops navigation; anything else behaves as before.
    const decision = search ? quickDecision(moder) : "go";
    if (search && decision !== "go") {
      event.preventDefault();
      event.stopImmediatePropagation();
      const finish = (verdict: "go" | "empty") => {
        if (verdict === "empty") {
          trackSearchThenNavigate(search);
          moder.close();
          try { showEmptySearch(search, Number(moder.flexibleDateSearch) || 0, (u) => navigate(appendAdParams(u))); } catch { go(); }
          return;
        }
        if (!trackSearchThenNavigate(search, go)) go();
      };
      if (decision === "empty") finish("empty");
      else decideSearch(moder).then(finish, () => finish("go"));
      return;
    }
    if (search && trackSearchThenNavigate(search, go)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (next === url) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    go();
  };
  document.addEventListener("click", handleNavigation, true);
  document.addEventListener("auxclick", handleNavigation, true);
  document.addEventListener("contextmenu", handleNavigation, true);
}
