import { hasConsent } from "./cookieConsent";
import { trackGoogleEvent, type SearchEventParams } from "./googleAnalytics";
import { logSearch, toTilanne, type SearchFields } from "./searchLog";
import {
  UNPRICED, createPrecheck, fetchAlternatives, fetchAvailability, mailtoUrl, moderSearchUrl, periodLabel, selectionKey,
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
    return v === 0 || v === UNPRICED ? "empty" : "go";
  } catch { return "go"; }
}
/** Pre-check count for the current selection: number of free properties, -1 unpriced, null unknown/not checked. */
export function precheckCount(m: ModerLike): number | null {
  try {
    const s = readSelection(m);
    if (!s) return null;
    const v = precheck.get(selectionKey(s));
    return typeof v === "number" ? v : null;
  } catch { return null; }
}
export function quickDecision(m: ModerLike): "go" | "empty" | "pending" {
  try {
    const s = readSelection(m);
    if (!s) return "go";
    const v = precheck.get(selectionKey(s));
    return v === undefined ? "pending" : v === 0 || v === UNPRICED ? "empty" : "go";
  } catch { return "go"; }
}

type EmptyEvent = "haku_ei_tuloksia" | "tarjous_whatsapp_click" | "tarjous_email_click" | "vaihtoehto_click" | "kalenteri_click";
const track = (name: EmptyEvent, p: Record<string, string | number>) => {
  if (!hasConsent("analytics")) return;
  trackGoogleEvent(name, Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)])));
};

const pageLang = (): Lang => (window.location.pathname === "/en" || window.location.pathname.startsWith("/en/") ? "en" : "fi");
const MAX_WAIT_MS = 6000;

function texts(lang: Lang, sit: Situation, guests: number, min: number, nights = 0) {
  if (lang === "fi") return {
    loading: "Etsitään vapaita päiviä…",
    title: sit === "A" ? `Valitsemillesi päiville ei ole vapaata kohdetta ${guests} hengelle. Näillä päivillä pääset tulemaan:`
      : sit === "B" ? `Valitsemallasi ajankohdalla minimiyöpyminen on ${min} vuorokautta.`
      : `Valitettavasti näille päiville ei löytynyt vapaata kohdetta ${guests} hengelle.`,
    lead: "", also: "Voit myös varata suoraan:",
    text: sit === "A" ? "Etkö löydä sopivaa? Lähetä meille viesti, niin teemme tarjouksen, jos löydämme sopivan kohteen. Vastaamme saman päivän aikana."
      : sit === "B" ? `Hait ${nights} vuorokauden jaksoa. Ole meihin yhteydessä, niin tarkastelemme, voimmeko toteuttaa toiveesi, ja teemme sinulle tarjouksen.`
      : "Älä luovuta vielä. Voimme usein löytää ratkaisun yhdistämällä huoneistoja tai järjestelemällä varauksia. Lähetä meille viesti, niin selvitämme vaihtoehdot ja teemme sinulle tarjouksen, jos löydämme sopivan kohteen. Vastaamme saman päivän aikana.",
    see: "Katso", wa: "WhatsApp-viesti", email: "Sähköposti", calendar: "Katso kaikki vaihtoehdot varauskalenterissa", close: "Sulje",
  };
  return {
    loading: "Looking for available dates…",
    title: sit === "A" ? `There's nothing available for ${guests} guests on your dates. You can stay with us on these dates:`
      : sit === "B" ? `The minimum stay for your selected dates is ${min} nights.`
      : `Sorry, we couldn't find an available property for ${guests} guests on these dates.`,
    lead: "", also: "You can also book directly:",
    text: sit === "A" ? "Can't find what you need? Send us a message and we'll send you an offer if we find a suitable place. We'll reply the same day."
      : sit === "B" ? `You searched for ${nights} nights. Contact us and we'll see if we can make your wish come true and send you an offer.`
      : "Don't give up yet. We can often find a solution by combining apartments or rearranging bookings. Send us a message and we'll look into the options and send you an offer if we find a suitable place. We'll reply the same day.",
    see: "See", wa: "WhatsApp", email: "Email", calendar: "See all options in the booking calendar", close: "Close",
  };
}

export function showEmptySearch(params: SearchEventParams, flex: number, navigate: (url: string) => void, base?: SearchFields): void {
  // Own analytics: haku (with outcome) + haku_ikkuna once the window content is known.
  let logged = false;
  const logOpen = (sit: string, extra: Partial<SearchFields> = {}) => {
    if (!base || logged) return;
    logged = true;
    const f = { ...base, tilanne: toTilanne(sit), ...extra };
    logSearch("haku", f);
    logSearch("haku_ikkuna", f);
  };
  const logClick = (type: "haku_vaihtoehto_click" | "haku_whatsapp_click" | "haku_email_click" | "haku_kalenteri_click", sit: string, extra: Partial<SearchFields> = {}) => {
    if (base) logSearch(type, { ...base, tilanne: toTilanne(sit), ...extra });
  };
  document.getElementById("lv-empty-search")?.remove();
  const lang = pageLang();
  const o: Offer = { start: params.saapuminen, end: params.lahto, adults: params.aikuiset, children: params.lapset };
  const unpriced = precheck.get(selectionKey({ ...o, flex: 0 })) === UNPRICED;
  // Unpriced dates: no alternatives search, no period rows, no calendar link.
  const altPromise: Promise<Alternatives | null> = unpriced ? Promise.resolve(null) : startAlternatives(o);

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
  const renderUnpriced = () => {
    if (closed) return;
    const sit: Situation = "ei_hinnoiteltu";
    track("haku_ei_tuloksia", { ...params, tilanne: sit });
    logOpen(sit, { tulos_vapaita: 0 });
    const fi = lang === "fi";
    content.replaceChildren();
    const h = document.createElement("h2");
    h.id = "lv-empty-search-title";
    h.className = "text-lg font-semibold pr-8 mb-4";
    h.textContent = fi ? "Kiitos kiinnostuksestasi!" : "Thank you for your interest!";
    const p = document.createElement("p");
    p.className = "text-sm text-muted-foreground mb-4";
    p.textContent = fi
      ? "Olet liikkeellä ajoissa: emme ole vielä asettaneet majoituksille hintoja valitsemallesi ajankohdalle. Teemme sinulle kuitenkin mielellämme tarjouksen jo nyt. Ole meihin yhteydessä WhatsAppilla tai sähköpostilla, niin palaamme asiaan saman päivän aikana."
      : "You're planning ahead: we haven't set prices for your chosen dates yet. We'd still be happy to make you an offer right away. Contact us via WhatsApp or email and we'll get back to you the same day.";
    const btns = document.createElement("div");
    btns.className = "flex flex-col sm:flex-row gap-2";
    const mk = (label: string, href: string, cls: string, ev: EmptyEvent, blank: boolean) => {
      const a = document.createElement("a");
      a.href = href; a.textContent = label; a.className = `${btnCls} flex-1 ${cls}`;
      a.setAttribute("data-lv-nav", "1");
      if (blank) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      a.addEventListener("click", () => {
        track(ev, { ...params, tilanne: sit });
        logClick(ev === "tarjous_whatsapp_click" ? "haku_whatsapp_click" : "haku_email_click", sit, { tulos_vapaita: 0 });
      });
      return a;
    };
    btns.append(
      mk(fi ? "WhatsApp-viesti" : "WhatsApp", whatsappUrl(o, lang, sit), "bg-primary text-primary-foreground hover:bg-primary/90", "tarjous_whatsapp_click", true),
      mk(fi ? "Sähköposti" : "Email", mailtoUrl(o, lang, sit), "border border-input bg-background hover:bg-accent", "tarjous_email_click", false),
    );
    content.append(h, p, btns);
  };
  if (unpriced) { renderUnpriced(); return; }

  const render = (r: Alternatives | null) => {
    if (closed) return;
    const sit = situationOf(r);
    const alts: Alternative[] = r?.alternatives ?? [];
    const min = r?.minimi_oita ?? 0;
    track("haku_ei_tuloksia", { ...params, vaihtoehtoja: alts.length, minimi_oita: sit === "B" ? min : 0, tilanne: sit });
    logOpen(sit, { tulos_vapaita: 0, vaihtoehtoja: alts.length, minimi_oita: min || undefined });
    const t = texts(lang, sit, params.henkiloita, min, Number(params.oita) || 0);
    content.replaceChildren();
    const h = document.createElement("h2");
    h.id = "lv-empty-search-title";
    h.className = "text-lg font-semibold pr-8 mb-4";
    h.textContent = t.title;
    content.append(h);

    const appendList = () => {
    if (!alts.length) return;
    if (sit === "B") {
      const sub = document.createElement("h3");
      sub.className = "text-sm font-semibold mt-6 mb-2";
      sub.textContent = t.also;
      content.append(sub);
    }
    {
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
            kohteita: a.available, alkaen_hinta: a.minPrice ?? 0, tilanne: sit,
          });
          logClick("haku_vaihtoehto_click", sit, {
            tulos_vapaita: 0, vaihtoehtoja: alts.length, minimi_oita: min || undefined,
            valittu_saapuminen: a.start, valittu_lahto: a.end, siirto_pv: a.shift,
          });
          close();
          navigate(moderSearchUrl({ ...o, start: a.start, end: a.end }, lang, 0));
        });
        li.append(label, see);
        list.append(li);
      }
      content.append(list);
    }
    };
    if (sit !== "B") appendList();

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
      a.addEventListener("click", () => {
        track(ev, { ...params, tilanne: sit });
        logClick(ev === "tarjous_whatsapp_click" ? "haku_whatsapp_click" : "haku_email_click", sit, { tulos_vapaita: 0 });
      });
      return a;
    };
    btns.append(
      mk(t.wa, whatsappUrl(o, lang, sit), alts.length && sit !== "B" ? "border border-input bg-background hover:bg-accent" : "bg-primary text-primary-foreground hover:bg-primary/90", "tarjous_whatsapp_click", true),
      mk(t.email, mailtoUrl(o, lang, sit), "border border-input bg-background hover:bg-accent", "tarjous_email_click", false),
    );
    content.append(btns);
    if (sit === "B") appendList();

    const cal = document.createElement("button");
    cal.type = "button"; cal.textContent = t.calendar;
    cal.className = "mt-4 text-xs text-muted-foreground underline hover:text-foreground";
    cal.addEventListener("click", () => {
      track("kalenteri_click", { ...params, jousto: flex });
      logClick("haku_kalenteri_click", sit, { tulos_vapaita: 0, vaihtoehtoja: alts.length });
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
