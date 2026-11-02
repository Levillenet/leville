import { hasConsent } from "./cookieConsent";
import { trackGoogleEvent, type SearchEventParams } from "./googleAnalytics";
import {
  createPrecheck, fetchAlternatives, fetchAvailability, mailtoUrl, moderSearchUrl, periodLabel, selectionKey,
  situationOf, whatsappUrl, type Alternative, type Alternatives, type Lang, type Offer, type Selection, type Situation,
} from "./availabilityPrecheck";

type ModerLike = {
  baseUrl?: string; fromDate?: string; toDate?: string; personsAdults?: number; personsChildren?: number;
  flexibleDateSearch?: number; ModerSettings?: { internal?: boolean; property?: string; roomTypeId?: string | number };
};

const precheck = createPrecheck(fetchAvailability);

// Alternatives start as soon as the pre-check says 0, before the customer presses search.
const altCache = new Map<string, Promise<Alternatives | null>>();
const altKey = (o: Offer) => `${o.start}|${o.end}|${o.adults}|${o.children}`;
function startAlternatives(o: Offer): Promise<Alternatives | null> {
  const k = altKey(o);
  let p = altCache.get(k);
  if (!p) {
    p = fetchAlternatives(o);
    altCache.set(k, p);
    p.then((r) => { if (!r) altCache.delete(k); });
    setTimeout(() => altCache.delete(k), 5 * 60 * 1000);
  }
  return p;
}
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
      if (!m) return;
      const sel = readSelection(m);
      precheck.update(sel);
      if (sel && precheck.get(selectionKey(sel)) === 0) startAlternatives(sel);
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

type EmptyEvent = "haku_ei_tuloksia" | "tarjous_whatsapp_click" | "tarjous_email_click" | "vaihtoehto_click" | "kalenteri_click";
const track = (name: EmptyEvent, p: Record<string, string | number>) => {
  if (!hasConsent("analytics")) return;
  trackGoogleEvent(name, Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)])));
};

const pageLang = (): Lang => (window.location.pathname === "/en" || window.location.pathname.startsWith("/en/") ? "en" : "fi");
const MAX_WAIT_MS = 6000;

function texts(lang: Lang, sit: Situation, guests: number, min: number) {
  if (lang === "fi") return {
    loading: "Etsitään vapaita päiviä…",
    title: sit === "A" ? `Valitsemillesi päiville ei ole vapaata kohdetta ${guests} hengelle. Näillä päivillä pääset tulemaan:`
      : sit === "B" ? `Valitsemillesi päiville ei ole vapaata ${guests} hengelle. Näillä päivillä majoitus on saatavilla vähintään ${min} yön jaksoina:`
      : `Valitettavasti näille päiville ei löytynyt vapaata kohdetta ${guests} hengelle.`,
    lead: sit === "B" ? "Toivotko lyhyempää lomaa?" : "",
    text: sit === "A" ? "Etkö löydä sopivaa? Lähetä meille viesti, niin teemme tarjouksen, jos löydämme sopivan kohteen. Vastaamme saman päivän aikana."
      : sit === "B" ? "Kerro meille toivomasi päivät, niin tarkastelemme tilannetta tapauskohtaisesti ja teemme sinulle tarjouksen, jos voimme toteuttaa sen."
      : "Älä luovuta vielä. Voimme usein löytää ratkaisun yhdistämällä huoneistoja tai järjestelemällä varauksia. Lähetä meille viesti, niin selvitämme vaihtoehdot ja teemme sinulle tarjouksen, jos löydämme sopivan kohteen. Vastaamme saman päivän aikana.",
    see: "Katso", wa: "WhatsApp-viesti", email: "Sähköposti", calendar: "Katso kaikki vaihtoehdot varauskalenterissa", close: "Sulje",
  };
  return {
    loading: "Looking for available dates…",
    title: sit === "A" ? `There's nothing available for ${guests} guests on your dates. You can stay with us on these dates:`
      : sit === "B" ? `There's nothing available for ${guests} guests on your dates. On these dates, accommodation is available for stays of at least ${min} nights:`
      : `Sorry, we couldn't find an available property for ${guests} guests on these dates.`,
    lead: sit === "B" ? "Would you prefer a shorter stay?" : "",
    text: sit === "A" ? "Can't find what you need? Send us a message and we'll send you an offer if we find a suitable place. We'll reply the same day."
      : sit === "B" ? "Tell us your preferred dates and we'll look into it case by case and send you an offer if we can make it work."
      : "Don't give up yet. We can often find a solution by combining apartments or rearranging bookings. Send us a message and we'll look into the options and send you an offer if we find a suitable place. We'll reply the same day.",
    see: "See", wa: "WhatsApp", email: "Email", calendar: "See all options in the booking calendar", close: "Close",
  };
}

export function showEmptySearch(params: SearchEventParams, flex: number, navigate: (url: string) => void): void {
  document.getElementById("lv-empty-search")?.remove();
  const lang = pageLang();
  const o: Offer = { start: params.saapuminen, end: params.lahto, adults: params.aikuiset, children: params.lapset };
  const altPromise = startAlternatives(o);

  const overlay = document.createElement("div");
  overlay.id = "lv-empty-search";
  overlay.className = "fixed inset-0 z-[10001] flex items-end sm:items-center justify-center bg-foreground/50 p-4";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "lv-empty-search-title");
  const box = document.createElement("div");
  box.className = "relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-background text-foreground shadow-xl p-6";
  const content = document.createElement("div");
  content.setAttribute("aria-live", "polite");
  const x = document.createElement("button");
  x.type = "button"; x.setAttribute("aria-label", texts(lang, "C", 0, 0).close); x.textContent = "×";
  x.className = "absolute right-3 top-3 h-9 w-9 rounded-full text-2xl leading-none text-muted-foreground hover:bg-accent";
  let closed = false;
  const close = () => { closed = true; overlay.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
  x.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", onKey);

  const loading = document.createElement("p");
  loading.id = "lv-empty-search-title";
  loading.className = "text-base pr-8 py-6 text-muted-foreground";
  loading.textContent = texts(lang, "C", 0, 0).loading;
  content.append(loading);
  box.append(x, content);
  overlay.append(box);
  document.body.append(overlay);
  x.focus();

  const btnCls = "inline-flex items-center justify-center rounded-md h-11 px-4 text-sm font-medium transition-colors";
  const render = (r: Alternatives | null) => {
    if (closed) return;
    const sit = situationOf(r);
    const alts: Alternative[] = r?.alternatives ?? [];
    const min = r?.minimi_oita ?? 0;
    track("haku_ei_tuloksia", { ...params, vaihtoehtoja: alts.length, minimi_oita: sit === "B" ? min : 0 });
    const t = texts(lang, sit, params.henkiloita, min);
    content.replaceChildren();
    const h = document.createElement("h2");
    h.id = "lv-empty-search-title";
    h.className = "text-lg font-semibold pr-8 mb-4";
    h.textContent = t.title;
    content.append(h);

    if (alts.length) {
      const list = document.createElement("ul");
      list.className = "flex flex-col gap-2 mb-5";
      for (const a of alts) {
        const li = document.createElement("li");
        li.className = "flex items-center justify-between gap-3 rounded-md border border-border p-3";
        const label = document.createElement("span");
        label.className = "text-sm";
        label.textContent = periodLabel(a, lang);
        const see = document.createElement("button");
        see.type = "button"; see.textContent = t.see;
        see.className = `${btnCls} h-9 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90`;
        see.addEventListener("click", () => {
          track("vaihtoehto_click", {
            alkup_saapuminen: params.saapuminen, alkup_oita: params.oita,
            saapuminen: a.start, lahto: a.end, oita: a.nights, siirto_pv: a.shift,
            kohteita: a.available, alkaen_hinta: a.minPrice ?? 0,
          });
          close();
          navigate(moderSearchUrl({ ...o, start: a.start, end: a.end }, lang, 0));
        });
        li.append(label, see);
        list.append(li);
      }
      content.append(list);
    }

    const p = document.createElement("p");
    p.className = "text-sm text-muted-foreground mb-4";
    if (t.lead) {
      const b = document.createElement("strong");
      b.className = "text-foreground";
      b.textContent = t.lead + " ";
      p.append(b);
    }
    p.append(document.createTextNode(t.text));
    content.append(p);

    const btns = document.createElement("div");
    btns.className = "flex flex-col sm:flex-row gap-2";
    const mk = (label: string, href: string, cls: string, ev: EmptyEvent, blank: boolean) => {
      const a = document.createElement("a");
      a.href = href; a.textContent = label; a.className = `${btnCls} flex-1 ${cls}`;
      a.setAttribute("data-lv-nav", "1");
      if (blank) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      a.addEventListener("click", () => track(ev, { ...params, tilanne: sit }));
      return a;
    };
    btns.append(
      mk(t.wa, whatsappUrl(o, lang, sit), alts.length ? "border border-input bg-background hover:bg-accent" : "bg-primary text-primary-foreground hover:bg-primary/90", "tarjous_whatsapp_click", true),
      mk(t.email, mailtoUrl(o, lang, sit), "border border-input bg-background hover:bg-accent", "tarjous_email_click", false),
    );
    content.append(btns);

    const cal = document.createElement("button");
    cal.type = "button"; cal.textContent = t.calendar;
    cal.className = "mt-4 text-xs text-muted-foreground underline hover:text-foreground";
    cal.addEventListener("click", () => {
      track("kalenteri_click", { ...params, jousto: flex });
      close();
      navigate(moderSearchUrl(o, lang, flex));
    });
    content.append(cal);
  };

  let done = false;
  const finish = (r: Alternatives | null) => { if (done) return; done = true; render(r); };
  setTimeout(() => finish(null), MAX_WAIT_MS);
  altPromise.then(finish, () => finish(null));
}
