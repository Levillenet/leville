import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Download, ClipboardCopy, ExternalLink, Info } from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Row {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface QueryRow extends Row { query: string }
interface PageRow extends Row { page: string }
interface CountryRow extends Row { country: string }
interface DeviceRow extends Row { device: string }
interface DateRow extends Row { date: string }

interface Stats {
  meta: { startDate: string; endDate: string; prevStartDate: string; prevEndDate: string; days: number; language: string };
  summary: Row;
  previousSummary: Row;
  byDate: DateRow[];
  topQueries: QueryRow[];
  topPages: PageRow[];
  topCountries: CountryRow[];
  byDevice: DeviceRow[];
}

interface Props { isViewer: boolean }

type Period = "7days" | "28days" | "90days";
const PERIOD_LABELS: Record<Period, string> = {
  "7days": "7 päivää",
  "28days": "28 päivää",
  "90days": "90 päivää",
};

const LANGS: { value: string; label: string }[] = [
  { value: "all", label: "Kaikki kielet" },
  { value: "fi", label: "Suomi" },
  { value: "en", label: "Englanti" },
  { value: "de", label: "Saksa" },
  { value: "sv", label: "Ruotsi" },
  { value: "fr", label: "Ranska" },
  { value: "es", label: "Espanja" },
  { value: "nl", label: "Hollanti" },
];

const COUNTRY_NAMES: Record<string, string> = {
  fin: "Suomi", swe: "Ruotsi", nor: "Norja", dnk: "Tanska", deu: "Saksa",
  gbr: "Iso-Britannia", usa: "Yhdysvallat", fra: "Ranska", esp: "Espanja",
  nld: "Alankomaat", bel: "Belgia", che: "Sveitsi", aut: "Itävalta",
  ita: "Italia", pol: "Puola", est: "Viro", lva: "Latvia", ltu: "Liettua",
  rus: "Venäjä", chn: "Kiina", jpn: "Japani", isr: "Israel", irl: "Irlanti",
  cze: "Tšekki", hun: "Unkari", prt: "Portugali", can: "Kanada", aus: "Australia",
};

const formatPct = (n: number) => `${(n * 100).toFixed(2)} %`;
const formatPos = (n: number) => n > 0 ? n.toFixed(1) : "—";
const formatNum = (n: number) => n.toLocaleString("fi-FI");

const delta = (cur: number, prev: number) => {
  if (prev === 0) return cur === 0 ? "0 %" : "+∞";
  const d = ((cur - prev) / prev) * 100;
  return `${d >= 0 ? "+" : ""}${d.toFixed(1)} %`;
};
const deltaClass = (cur: number, prev: number, inverse = false) => {
  if (cur === prev) return "text-muted-foreground";
  const better = inverse ? cur < prev : cur > prev;
  return better ? "text-green-600" : "text-red-600";
};

const SearchConsoleAdmin = ({ isViewer }: Props) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [csvLoading, setCsvLoading] = useState(false);
  const [period, setPeriod] = useState<Period>("28days");
  const [language, setLanguage] = useState<string>("all");

  const fetchStats = async (p: Period = period, lang: string = language) => {
    setLoading(true);
    setError(null);
    try {
      const password = localStorage.getItem("admin_password");
      if (!password) { setError("Admin-salasanaa ei löydy"); setLoading(false); return; }
      const { data, error } = await supabase.functions.invoke("get-search-console-stats", {
        body: { password, period: p, language: lang },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setStats(data);
    } catch (e: any) {
      console.error("GSC fetch failed:", e);
      setError(e?.message || "Tilastojen lataus epäonnistui");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); /* eslint-disable-next-line */ }, []);

  const downloadCsv = async () => {
    setCsvLoading(true);
    try {
      const password = localStorage.getItem("admin_password");
      if (!password) return;
      const { data, error } = await supabase.functions.invoke("get-search-console-stats", {
        body: { password, format: "csv", period, language },
      });
      if (error) throw error;
      const csv = typeof data === "string" ? data : JSON.stringify(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leville-gsc-${period}-${language}-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("CSV ladattu");
    } catch (e: any) {
      toast.error(e?.message || "CSV-lataus epäonnistui");
    } finally {
      setCsvLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground space-y-2">
          <p>Search Console -dataa ei voitu ladata.</p>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button size="sm" variant="outline" onClick={() => fetchStats()}>Yritä uudelleen</Button>
        </CardContent>
      </Card>
    );
  }

  const dateData = stats.byDate.map((d) => ({
    date: new Date(d.date).toLocaleDateString("fi-FI", { day: "numeric", month: "numeric" }),
    Klikit: d.clicks,
    Näytöt: d.impressions,
  }));

  const deviceLabel = (d: string) => d === "MOBILE" ? "Mobiili" : d === "DESKTOP" ? "Tietokone" : d === "TABLET" ? "Tabletti" : d;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold">Google Search Console</h2>
          <p className="text-xs text-muted-foreground">
            Aikaväli {stats.meta.startDate} — {stats.meta.endDate} (data n. 2 päivän viiveellä)
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(`Search Console -data leville.net, ${stats.meta.startDate}–${stats.meta.endDate}, kieli: ${language}.\n\nKlikit: ${stats.summary.clicks}, Näytöt: ${stats.summary.impressions}, CTR: ${formatPct(stats.summary.ctr)}, Sija: ${formatPos(stats.summary.position)}`); toast.success("Kopioitu"); }}>
            <ClipboardCopy className="w-4 h-4 mr-2" />Kopioi yhteenveto
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCsv} disabled={csvLoading}>
            {csvLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Lataa CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => fetchStats()}>
            <RefreshCw className="w-4 h-4 mr-2" />Päivitä
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
          <Button key={p} variant={period === p ? "default" : "outline"} size="sm" onClick={() => { setPeriod(p); fetchStats(p, language); }}>
            {PERIOD_LABELS[p]}
          </Button>
        ))}
        <div className="w-px bg-border mx-1" />
        {LANGS.map((l) => (
          <Button key={l.value} variant={language === l.value ? "default" : "outline"} size="sm" onClick={() => { setLanguage(l.value); fetchStats(period, l.value); }}>
            {l.label}
          </Button>
        ))}
      </div>

      {/* levi.fi note */}
      <Card className="border-amber-300 bg-amber-50/50 dark:bg-amber-900/10">
        <CardContent className="pt-4 pb-4 flex gap-3 items-start text-sm">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p><strong>Huom:</strong> Search Console API näyttää vain orgaaniset Google-haut. Levi.fi-linkin tuomat klikit (oikeat kävijät) löytyvät Analytiikka-välilehden <code>Top referrers</code> -kortista, tai Search Console UI:n Linkit-osiosta.</p>
            <a href="https://search.google.com/search-console?resource_id=sc-domain:leville.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
              Avaa Search Console <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Klikit</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatNum(stats.summary.clicks)}</p>
            <p className={`text-xs ${deltaClass(stats.summary.clicks, stats.previousSummary.clicks)}`}>
              {delta(stats.summary.clicks, stats.previousSummary.clicks)} vs ed. jakso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Näytöt</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatNum(stats.summary.impressions)}</p>
            <p className={`text-xs ${deltaClass(stats.summary.impressions, stats.previousSummary.impressions)}`}>
              {delta(stats.summary.impressions, stats.previousSummary.impressions)} vs ed. jakso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">CTR</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatPct(stats.summary.ctr)}</p>
            <p className={`text-xs ${deltaClass(stats.summary.ctr, stats.previousSummary.ctr)}`}>
              {delta(stats.summary.ctr, stats.previousSummary.ctr)} vs ed. jakso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Keskim. sijoitus</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatPos(stats.summary.position)}</p>
            <p className={`text-xs ${deltaClass(stats.summary.position, stats.previousSummary.position, true)}`}>
              {delta(stats.summary.position, stats.previousSummary.position)} vs ed. jakso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trend */}
      <Card>
        <CardHeader><CardTitle className="text-base">Päivätrendi</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" fontSize={11} />
              <YAxis yAxisId="left" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" fontSize={11} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="Klikit" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="Näytöt" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top queries */}
      <Card>
        <CardHeader><CardTitle className="text-base">Top haut</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground border-b">
              <tr><th className="text-left py-2">Hakulauseke</th><th className="text-right">Klikit</th><th className="text-right">Näytöt</th><th className="text-right">CTR</th><th className="text-right">Sija</th></tr>
            </thead>
            <tbody>
              {stats.topQueries.map((r) => (
                <tr key={r.query} className="border-b last:border-0">
                  <td className="py-1.5">{r.query}</td>
                  <td className="text-right tabular-nums">{formatNum(r.clicks)}</td>
                  <td className="text-right tabular-nums">{formatNum(r.impressions)}</td>
                  <td className="text-right tabular-nums">{formatPct(r.ctr)}</td>
                  <td className="text-right tabular-nums">{formatPos(r.position)}</td>
                </tr>
              ))}
              {stats.topQueries.length === 0 && <tr><td colSpan={5} className="py-4 text-center text-muted-foreground">Ei dataa</td></tr>}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Top pages */}
      <Card>
        <CardHeader><CardTitle className="text-base">Top sivut</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground border-b">
              <tr><th className="text-left py-2">Sivu</th><th className="text-right">Klikit</th><th className="text-right">Näytöt</th><th className="text-right">CTR</th><th className="text-right">Sija</th></tr>
            </thead>
            <tbody>
              {stats.topPages.map((r) => (
                <tr key={r.page} className="border-b last:border-0">
                  <td className="py-1.5 max-w-[400px] truncate font-mono text-xs"><a href={r.page} target="_blank" rel="noopener noreferrer" className="hover:underline">{r.page.replace(/^https?:\/\/[^/]+/, "")}</a></td>
                  <td className="text-right tabular-nums">{formatNum(r.clicks)}</td>
                  <td className="text-right tabular-nums">{formatNum(r.impressions)}</td>
                  <td className="text-right tabular-nums">{formatPct(r.ctr)}</td>
                  <td className="text-right tabular-nums">{formatPos(r.position)}</td>
                </tr>
              ))}
              {stats.topPages.length === 0 && <tr><td colSpan={5} className="py-4 text-center text-muted-foreground">Ei dataa</td></tr>}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top countries */}
        <Card>
          <CardHeader><CardTitle className="text-base">Top maat</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-b">
                <tr><th className="text-left py-2">Maa</th><th className="text-right">Klikit</th><th className="text-right">Näytöt</th><th className="text-right">CTR</th></tr>
              </thead>
              <tbody>
                {stats.topCountries.map((r) => (
                  <tr key={r.country} className="border-b last:border-0">
                    <td className="py-1.5">{COUNTRY_NAMES[r.country] || r.country.toUpperCase()}</td>
                    <td className="text-right tabular-nums">{formatNum(r.clicks)}</td>
                    <td className="text-right tabular-nums">{formatNum(r.impressions)}</td>
                    <td className="text-right tabular-nums">{formatPct(r.ctr)}</td>
                  </tr>
                ))}
                {stats.topCountries.length === 0 && <tr><td colSpan={4} className="py-4 text-center text-muted-foreground">Ei dataa</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card>
          <CardHeader><CardTitle className="text-base">Laitteet</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-b">
                <tr><th className="text-left py-2">Laite</th><th className="text-right">Klikit</th><th className="text-right">Näytöt</th><th className="text-right">CTR</th><th className="text-right">Sija</th></tr>
              </thead>
              <tbody>
                {stats.byDevice.map((r) => (
                  <tr key={r.device} className="border-b last:border-0">
                    <td className="py-1.5">{deviceLabel(r.device)}</td>
                    <td className="text-right tabular-nums">{formatNum(r.clicks)}</td>
                    <td className="text-right tabular-nums">{formatNum(r.impressions)}</td>
                    <td className="text-right tabular-nums">{formatPct(r.ctr)}</td>
                    <td className="text-right tabular-nums">{formatPos(r.position)}</td>
                  </tr>
                ))}
                {stats.byDevice.length === 0 && <tr><td colSpan={5} className="py-4 text-center text-muted-foreground">Ei dataa</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchConsoleAdmin;
