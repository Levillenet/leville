import { hasConsent } from "./cookieConsent";
import { trackGoogleEvent, type SearchEventParams } from "./googleAnalytics";
import {
  createPrecheck, fetchAvailability, mailtoUrl, nearestDatesUrl, selectionKey, whatsappUrl,
  type Lang, type Selection,
} from "./availabilityPrecheck";

type ModerLike = {
  baseUrl?: string; fromDate?: string; toDate?: string; personsAdults?: number; personsChildren?: number;
  flexibleDateSearch?: number; ModerSettings?: { internal?: boolean; property?: string; roomTypeId?: string | number };
};

const precheck = createPrecheck(fetchAvailability);
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Only the site-wide search (all properties, no room type) is pre-checked. */
export function readSelection(m: ModerLike | undefined): Selection | null {
  if (!m || m.ModerSettings?.internal || m.ModerSettings?.roomTypeId) return null;
  if ((m.ModerSettings?.property || "") !== "levillenet") return null;
  const start = m.fromDate || "", end = m.toDate || "";
  if (!DATE.test(start) || !DATE.test(end) || end <= start) return null;
  const adults = Number(m.personsAdults), children = Number(m.personsChildren || 0);
  const flex = Number(m.flexibleDateSearch || 0);
  if (!Number.isInteger(adults) || adults < 1 || !Number.isInteger(children) || children < 0) return null;
  return { start, end, adults, children, flex: Number.isInteger(flex) && flex >= 0 && flex <= 7 ? flex : 0 };
}

let watching = false;
/** Watches the embed's own state (same source the search event reads) and pre-checks with debounce. */
export function watchModerSelection(): void {
  if (watching || typeof window === "undefined") return;
  watching = true;
  window.setInterval(() => {
    if (document.hidden) return;
    try {
      const m = (window as Window & { Moder?: ModerLike }).Moder;
      if (m) precheck.update(readSelection(m));
    } catch { /* never break the page */ }
  }, 250);
}

/** "go" = navigate as now; "empty" = show the panel instead. Resolves "go" on any doubt. */
export async function decideSearch(m: ModerLike): Promise<"go" | "empty"> {
  try {
    const s = readSelection(m);
    if (!s) return "go";
    const key = selectionKey(s);
    precheck.update(s);
    const v = await precheck.waitFor(key, 1000);
    return v === 0 ? "empty" : "go";
  } catch { return "go"; }
}
export function quickDecision(m: ModerLike): "go" | "empty" | "pending" {
  try {
    const s = readSelection(m);
    if (!s) return "go";
    const v = precheck.get(selectionKey(s));
    return v === undefined ? "pending" : v === 0 ? "empty" : "go";
  } catch { return "go"; }
}

type EmptyEvent = "haku_ei_tuloksia" | "tarjous_whatsapp_click" | "tarjous_email_click" | "lahimmat_paivat_click";
const track = (name: EmptyEvent, p: SearchEventParams) => {
  if (!hasConsent("analytics")) return;
  trackGoogleEvent(name, Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)])));
};

const pageLang = (): Lang => (window.location.pathname === "/en" || window.location.pathname.startsWith("/en/") ? "en" : "fi");

export function showEmptySearch(params: SearchEventParams, navigate: (url: string) => void): void {
  track("haku_ei_tuloksia", params);
  document.getElementById("lv-empty-search")?.remove();
  const lang = pageLang();
  const o = { start: params.saapuminen, end: params.lahto, adults: params.aikuiset, children: params.lapset };
  const t = lang === "fi"
    ? {
      title: `Valitettavasti näille päiville ei löytynyt vapaata kohdetta ${params.henkiloita} hengelle.`,
      text: "Älä luovuta vielä. Voimme usein löytää ratkaisun yhdistämällä huoneistoja tai järjestelemällä varauksia. Lähetä meille viesti, niin selvitämme vaihtoehdot ja teemme sinulle tarjouksen, jos löydämme sopivan kohteen. Vastaamme saman päivän aikana.",
      wa: "WhatsApp-viesti", email: "Sähköposti", near: "Näytä lähimmät vapaat päivät", close: "Sulje",
    }
    : {
      title: `Sorry, we couldn't find an available property for ${params.henkiloita} guests on these dates.`,
      text: "Don't give up yet. We can often find a solution by combining apartments or rearranging bookings. Send us a message and we'll look into the options and send you an offer if we find a suitable place. We'll reply the same day.",
      wa: "WhatsApp", email: "Email", near: "Show nearest available dates", close: "Close",
    };

  const overlay = document.createElement("div");
  overlay.id = "lv-empty-search";
  overlay.className = "fixed inset-0 z-[10001] flex items-end sm:items-center justify-center bg-foreground/50 p-4";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "lv-empty-search-title");
  const box = document.createElement("div");
  box.className = "relative w-full max-w-lg rounded-xl bg-background text-foreground shadow-xl p-6";
  const h = document.createElement("h2");
  h.id = "lv-empty-search-title";
  h.className = "text-lg font-semibold pr-8 mb-3";
  h.textContent = t.title;
  const p = document.createElement("p");
  p.className = "text-sm text-muted-foreground mb-5";
  p.textContent = t.text;
  const btns = document.createElement("div");
  btns.className = "flex flex-col gap-2";
  const btnCls = "inline-flex items-center justify-center rounded-md h-11 px-4 text-sm font-medium transition-colors";
  const mk = (label: string, href: string, cls: string, ev: EmptyEvent, blank: boolean) => {
    const a = document.createElement("a");
    a.href = href; a.textContent = label; a.className = `${btnCls} ${cls}`;
    a.setAttribute("data-lv-nav", "1");
    if (blank) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    a.addEventListener("click", () => track(ev, params));
    return a;
  };
  btns.append(
    mk(t.wa, whatsappUrl(o, lang), "bg-primary text-primary-foreground hover:bg-primary/90", "tarjous_whatsapp_click", true),
    mk(t.email, mailtoUrl(o, lang), "border border-input bg-background hover:bg-accent", "tarjous_email_click", false),
  );
  const near = document.createElement("button");
  near.type = "button"; near.textContent = t.near;
  near.className = `${btnCls} border border-input bg-background hover:bg-accent`;
  near.addEventListener("click", () => { track("lahimmat_paivat_click", params); close(); navigate(nearestDatesUrl(o, lang)); });
  btns.append(near);
  const x = document.createElement("button");
  x.type = "button"; x.setAttribute("aria-label", t.close); x.textContent = "×";
  x.className = "absolute right-3 top-3 h-9 w-9 rounded-full text-2xl leading-none text-muted-foreground hover:bg-accent";
  const close = () => { overlay.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
  x.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", onKey);
  box.append(x, h, p, btns);
  overlay.append(box);
  document.body.append(overlay);
  x.focus();
}
