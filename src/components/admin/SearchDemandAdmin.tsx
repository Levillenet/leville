import { Fragment, useEffect, useMemo, useState } from "react";
import { DailyChart, Sparkline } from "./TrendCharts";
import { getAdminToken } from "@/lib/adminSession";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { buildDemand, countImplausible, MAX_PLAUSIBLE_NIGHTS, recentContacts, summarize, topWeeks, weekTrend, dailySeries, trendScore, type WeekTrend, type GuestFilter, type RangeFilter, type SearchRow, type WeekDemand } from "@/lib/searchDemand";

type Period = "today" | "week" | "month" | "30days" | "90days" | "180days";
const DAY = 86400000;
function sinceOf(p: Period): number {
  const now = new Date();
  if (p === "today") return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  if (p === "month") return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const days = p === "week" ? 7 : p === "90days" ? 90 : p === "180days" ? 180 : 30;
  return now.getTime() - days * DAY;
}

const TILANNE_LABELS: Record<string, string> = {
  vapaita: "Vapaita", A: "A (muut päivät)", B: "B (minimiyöt)", C: "C (ei mitään)", D: "D (ei hintoja)", ei_tietoa: "Ei tietoa",
};

const DemandTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: WeekDemand }> }) => {
  if (!active || !payload?.length) return null;
  const w = payload[0].payload;
  return (
    <div className="rounded-md border border-border bg-background p-2 text-xs shadow">
      <div className="font-semibold">{w.label}</div>
      <div>Hakuja yhteensä: {w.total}</div>
      <div>Joista ei vapaata: {w.lost}</div>
      <div>Keskim. henkilömäärä: {w.avgGuests ?? "–"}</div>
      <div>Yleisin pituus: {w.commonNights != null ? `${w.commonNights} yötä` : "–"}</div>
    </div>
  );
};

export default function SearchDemandAdmin({ period, periodLabel }: { period: Period; periodLabel: string }) {
  const [rows, setRows] = useState<SearchRow[] | null>(null);
  const [error, setError] = useState(false);
  const [range, setRange] = useState<RangeFilter>(30);
  const [guests, setGuests] = useState<GuestFilter>("all");

  useEffect(() => {
    const password = getAdminToken();
    if (!password) return;
    supabase.functions.invoke("get-page-view-stats", { body: { password, action: "searches" } })
      .then(({ data, error }) => { if (error || !data?.rows) setError(true); else setRows(data.rows); })
      .catch(() => setError(true));
  }, []);

  const summary = useMemo(() => (rows ? summarize(rows, sinceOf(period)) : null), [rows, period]);
  const demand = useMemo(() => (rows ? buildDemand(rows, Date.now(), range, guests) : []), [rows, range, guests]);
  const skipped = useMemo(() => (rows ? countImplausible(rows, Date.now(), range, guests) : 0), [rows, range, guests]);
  const contacts = useMemo(() => (rows ? recentContacts(rows) : []), [rows]);
  const trends = useMemo(() => (rows ? weekTrend(rows, Date.now(), guests) : new Map<number, WeekTrend>()), [rows, guests]);
  const [sortBy, setSortBy] = useState<"total" | "hot">("hot");
  const [open, setOpen] = useState<number | null>(null);
  const top = useMemo(() => sortBy === "total" ? topWeeks(demand)
    : demand.filter((w) => trends.has(w.monday)).sort((a, b) => trendScore(trends.get(b.monday)) - trendScore(trends.get(a.monday)) || b.total - a.total).slice(0, 15),
    [demand, trends, sortBy]);
  const chartDays = range === 7 ? 14 : range === 90 || range === "all" ? 90 : 30;
  const overall = useMemo(() => (rows ? dailySeries(rows, null, chartDays, Date.now(), guests) : []), [rows, chartDays, guests]);
  const openSeries = useMemo(() => (rows && open != null ? dailySeries(rows, open, chartDays, Date.now(), guests) : []), [rows, open, chartDays, guests]);

  if (error) return <Card><CardContent className="py-6 text-sm text-muted-foreground">Hakutilastojen lataus epäonnistui.</CardContent></Card>;
  if (!rows || !summary) return <Card><CardContent className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin" /></CardContent></Card>;

  const pct = (n: number) => (summary.total ? Math.round((n / summary.total) * 100) : 0);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hakupalkin haut ({periodLabel})</CardTitle>
          <CardDescription>Oma analytiikka, tallentuu evästevalinnasta riippumatta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div><div className="text-muted-foreground">Hakuja</div><div className="text-xl font-semibold">{summary.total}</div></div>
            <div><div className="text-muted-foreground">Keskim. henkilöt</div><div className="text-xl font-semibold">{summary.avgGuests ?? "–"}</div></div>
            <div><div className="text-muted-foreground">Keskim. yöt</div><div className="text-xl font-semibold">{summary.avgNights ?? "–"}</div></div>
            <div><div className="text-muted-foreground">Pelastusikkunoita</div><div className="text-xl font-semibold">{summary.windows}</div></div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Tilanteet</div>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(summary.tilanne).map(([k, v]) => (
                <span key={k} className="rounded-md border border-border px-2 py-1">{TILANNE_LABELS[k] || k}: {v} ({pct(v)} %)</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Pelastusikkunan klikkausosuudet</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-md border border-border px-2 py-1">Vaihtoehto: {summary.clickShare.vaihtoehto} %</span>
              <span className="rounded-md border border-border px-2 py-1">WhatsApp: {summary.clickShare.whatsapp} %</span>
              <span className="rounded-md border border-border px-2 py-1">Sähköposti: {summary.clickShare.email} %</span>
              <span className="rounded-md border border-border px-2 py-1">Kalenteri: {summary.clickShare.kalenteri} %</span>
            </div>
          </div>
          {summary.byDay.length > 0 && (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary.byDay}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Haut" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kysyntä tuleville ajankohdille</CardTitle>
          <CardDescription>Haut viikoittain sen mukaan, mille öille ne osuvat. Punainen osuus = menetetty kysyntä.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs text-muted-foreground mr-1">Hakujen aikaväli:</span>
              {([7, 30, 90, "all"] as RangeFilter[]).map((r) => (
                <Button key={String(r)} size="sm" variant={range === r ? "default" : "outline"} onClick={() => setRange(r)}>
                  {r === "all" ? "Kaikki" : `${r} pv`}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs text-muted-foreground mr-1">Henkilömäärä:</span>
              {(["all", "1-2", "3-4", "5-7", "8+"] as GuestFilter[]).map((g) => (
                <Button key={g} size="sm" variant={guests === g ? "default" : "outline"} onClick={() => setGuests(g)}>
                  {g === "all" ? "Kaikki" : g.replace("-", "–")}
                </Button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="h-80 min-w-[1400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demand} margin={{ bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="label" interval={0} angle={-60} textAnchor="end" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip content={<DemandTooltip />} />
                  <Legend verticalAlign="top" />
                  <Bar dataKey="free" stackId="d" name="Vapaita löytyi" fill="hsl(var(--primary))" />
                  <Bar dataKey="lost" stackId="d" name="Ei vapaata" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            {overall.length > 0 && <div className="mb-4"><DailyChart data={overall} title={`Kaikki haut päivittäin (${chartDays} pv)`} /></div>}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="text-sm font-medium">Viikot</div>
              <Button size="sm" variant={sortBy === "hot" ? "default" : "outline"} onClick={() => setSortBy("hot")}>Kuumenevat nyt</Button>
              <Button size="sm" variant={sortBy === "total" ? "default" : "outline"} onClick={() => setSortBy("total")}>Eniten hakuja</Button>
            </div>
            {top.length === 0 ? (
              <p className="text-sm text-muted-foreground">Ei hakuja valituilla suodattimilla.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="py-1 pr-3">Viikko</th><th className="py-1 pr-3" title="Viimeiset 3 pv keskiarvo vs edeltävät 7 pv">Trendi nyt</th><th className="py-1 pr-3">14 pv</th><th className="py-1 pr-3">Tänään / eilen</th><th className="py-1 pr-3">Haut</th><th className="py-1 pr-3">Ei vapaata</th>
                      <th className="py-1 pr-3">Keskim. henkilöt</th><th className="py-1 pr-3">Yleisin pituus</th><th className="py-1" title="Painoi WhatsApp- tai sähköpostinappia. Ei tarkoita, että viesti lähetettiin.">Napin painallukset</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top.map((w) => { const t = trends.get(w.monday); return (
                      <Fragment key={w.monday}>
                      <tr className="border-b border-border/50 cursor-pointer hover:bg-muted/50" onClick={() => setOpen(open === w.monday ? null : w.monday)}>
                        <td className="py-1 pr-3 whitespace-nowrap">{open === w.monday ? "▾ " : "▸ "}{w.label}</td>
                        <td className="py-1 pr-3 whitespace-nowrap">{!t ? "–" : !t.enough ? <span className="text-muted-foreground">vähän dataa</span> : (
                          <span className={t.changePct == null || t.changePct > 0 ? "text-primary font-medium" : t.changePct < 0 ? "text-destructive font-medium" : ""}>
                            {t.changePct == null ? "↑ uusi" : `${t.changePct > 0 ? "↑ +" : t.changePct < 0 ? "↓ " : "→ "}${t.changePct} %`}
                            <span className="text-muted-foreground font-normal"> ({t.recentAvg}/pv vs {t.prevAvg}/pv)</span>
                          </span>)}</td>
                        <td className="py-1 pr-3">{t ? <Sparkline data={t.daily} /> : "–"}</td>
                        <td className="py-1 pr-3">{t ? `${t.today} / ${t.yesterday}` : "0 / 0"}</td>
                        <td className="py-1 pr-3">{w.total}</td>
                        <td className="py-1 pr-3">{w.lost} ({Math.round((w.lost / w.total) * 100)} %)</td>
                        <td className="py-1 pr-3">{w.avgGuests ?? "–"}</td>
                        <td className="py-1 pr-3">{w.commonNights != null ? `${w.commonNights} yötä` : "–"}</td>
                        <td className="py-1">{w.contacts}</td>
                      </tr>
                      {open === w.monday && openSeries.length > 0 && (
                        <tr><td colSpan={10} className="py-2"><DailyChart data={openSeries} title={`Haut ${w.label} päivittäin (${chartDays} pv)`} /></td></tr>
                      )}
                      </Fragment>
                    ); })}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">Napin painallukset: painoi WhatsApp- tai sähköpostinappia. Ei tarkoita, että viesti lähetettiin. Usean viikon haku näkyy jokaisella viikolla. Trendi nyt: viimeisen 3 päivän hakujen päiväkeskiarvo verrattuna sitä edeltävään 7 päivään (Suomen aikaa). Klikkaa viikkoa nähdäksesi sen päiväkäyrän.</p>
            {skipped > 0 && <p className="text-xs text-muted-foreground mt-1">Pois jätetty {skipped} epätodennäköisen pitkää hakua (yli {MAX_PLAUSIBLE_NIGHTS} yötä).</p>}
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Viimeisimmät napin painallukset ({contacts.length})</div>
            {contacts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Ei painalluksia.</p>
            ) : (
              <ul className="text-sm space-y-1">
                {contacts.map((c, i) => (
                  <li key={i}>
                    {new Date(c.at).toLocaleString("fi-FI", { timeZone: "Europe/Helsinki", dateStyle: "short", timeStyle: "short" })}
                    {" · "}{c.channel === "whatsapp" ? "WhatsApp" : "Sähköposti"}
                    {c.s && c.l ? ` · ${c.s.split("-").reverse().join(".")}–${c.l.split("-").reverse().join(".")}` : ""}
                    {c.h != null ? ` · ${c.h} hlö` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
