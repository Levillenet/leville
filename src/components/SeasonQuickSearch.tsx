import { useMemo, useState } from "react";
import { ChevronDown, Snowflake, Users, Loader2, X } from "lucide-react";
import { upcomingSeasons, formatRange, type Season } from "@/lib/seasons";
import { getSupabase } from "@/lib/getSupabase";
import { trackGoogleEvent } from "@/lib/googleAnalytics";

interface Stay { roomTypeId: number; name: string; maxGuests: number | null; checkIn: string; checkOut: string; nights: number; price: number | null }

const T = {
  fi: { title: "Sesonkipikahaut", nights: "yötä", upTo: "max", persons: "hlö", incl: "sis. loppusiivouksen", book: "Varaa tästä", loading: "Haetaan vapaita jaksoja…", full: "Tämä sesonki on täynnä.", ask: "Kysy WhatsAppilla", error: "Haku ei onnistunut juuri nyt.", free: "vapaata jaksoa" },
  en: { title: "Peak season quick search", nights: "nights", upTo: "up to", persons: "guests", incl: "incl. final cleaning", book: "Book now", loading: "Finding free periods…", full: "This season is fully booked.", ask: "Ask on WhatsApp", error: "Search failed right now.", free: "free periods" },
};

const eur = (n: number) => `${n.toLocaleString("fi-FI").replace(/\u00a0/g, " ")} €`;

export default function SeasonQuickSearch({ lang }: { lang: string }) {
  const l = lang === "fi" ? "fi" : "en";
  const t = T[l];
  const seasons = useMemo(() => upcomingSeasons(), []);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Season | null>(null);
  const [data, setData] = useState<Record<string, Stay[] | "error">>({});

  if (!seasons.length) return null;

  const pick = async (s: Season) => {
    const key = `${s.start}_${s.end}`;
    setActive(active?.id === s.id && active.year === s.year ? null : s);
    trackGoogleEvent("season_quick_open", { season: `${s.id}_${s.year}` });
    if (data[key]) return;
    try {
      const sb = await getSupabase();
      const { data: res, error } = await sb.functions.invoke("season-availability", { body: { start: s.start, end: s.end } });
      if (error) throw error;
      setData((d) => ({ ...d, [key]: (res?.stays ?? []) as Stay[] }));
    } catch {
      setData((d) => ({ ...d, [key]: "error" }));
    }
  };

  const stays = active ? data[`${active.start}_${active.end}`] : undefined;

  return (
    <div className="mx-auto mt-3 max-w-3xl text-left">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mx-auto flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-background"
      >
        <Snowflake className="h-4 w-4 text-primary" aria-hidden="true" />
        {t.title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="mt-3 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur">
          <div className="flex flex-wrap justify-center gap-2">
            {seasons.map((s) => {
              const on = active?.id === s.id && active.year === s.year;
              return (
                <button
                  key={`${s.id}-${s.year}`}
                  type="button"
                  onClick={() => pick(s)}
                  aria-pressed={on}
                  className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"}`}
                >
                  <span className="font-semibold">{s.label[l]}</span>{" "}
                  <span className="opacity-75">{formatRange(s.start, s.end)}</span>
                </button>
              );
            })}
          </div>

          {active && (
            <div className="mt-3 border-t border-border/60 pt-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">
                  {active.label[l]} {formatRange(active.start, active.end)}{active.year}
                  {Array.isArray(stays) && stays.length > 0 && <span className="ml-2 font-normal text-muted-foreground">· {stays.length} {t.free}</span>}
                </span>
                <button type="button" onClick={() => setActive(null)} aria-label="Close" className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
              </div>
              {!stays && <p className="flex items-center gap-2 py-3 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{t.loading}</p>}
              {stays === "error" && <p className="py-3 text-sm text-muted-foreground">{t.error}</p>}
              {Array.isArray(stays) && stays.length === 0 && (
                <p className="py-3 text-sm text-muted-foreground">
                  {t.full}{" "}
                  <a href="https://wa.me/358441313131" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">{t.ask}</a>
                </p>
              )}
              {Array.isArray(stays) && stays.length > 0 && (
                <ul className="max-h-80 divide-y divide-border/60 overflow-y-auto pr-1">
                  {stays.map((s) => {
                    const href = `https://app.moder.fi/levillenet/${s.roomTypeId}?start=${s.checkIn}&end=${s.checkOut}&adults=2&children=0&lang=${l}&flexible_date_search=0`;
                    return (
                      <li key={`${s.roomTypeId}-${s.checkIn}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">{s.name}</p>
                          <p className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{formatRange(s.checkIn, s.checkOut)} · {s.nights} {t.nights}</span>
                            {s.maxGuests && <span className="inline-flex items-center gap-0.5"><Users className="h-3 w-3" aria-hidden="true" />{t.upTo} {s.maxGuests} {t.persons}</span>}
                          </p>
                        </div>
                        {s.price != null && (
                          <div className="text-right">
                            <p className="text-sm font-bold text-foreground">{eur(s.price)}</p>
                            <p className="text-[10px] text-muted-foreground">{t.incl}</p>
                          </div>
                        )}
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackGoogleEvent("season_quick_book_click", { season: `${active.id}_${active.year}`, room: s.name })}
                          className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                          {t.book}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
