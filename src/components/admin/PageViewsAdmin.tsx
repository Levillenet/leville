import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Monitor, Smartphone, Tablet, RefreshCw, MousePointerClick, Download, ClipboardCopy, Users, Clock, TrendingDown, Radio } from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface ConversionEvent {
  type: string;
  count: number;
  topSources: Array<{ source: string; count: number }>;
}

interface Stats {
  total: number;
  byDate: Record<string, number>;
  topPages: Array<{ path: string; count: number }>;
  byReferrer: Record<string, number>;
  byDevice: Record<string, number>;
  byLanguage: Record<string, number>;
  conversionEvents?: ConversionEvent[];
  totalSessions?: number;
  bounceRate?: number;
  avgSessionDurationSec?: number;
  byDateSessions?: Record<string, number>;
}

interface PageViewsAdminProps {
  isViewer: boolean;
}

const EVENT_LABELS: Record<string, string> = {
  "/event/booking-search-widget": "Hakuwidgetin haut",
  "/event/booking-sticky-bar": "Varaa tästä (alareunan palkki)",
  "/event/booking-page-cta": "Sivun CTA-painike",
  "/event/booking-link": "Muut varauslinkit",
};

const REPORT_DESCRIPTION = `LEVILLE.FI ANALYTIIKKARAPORTTI — TEKNINEN KUVAUS

Tämä CSV-raportti sisältää sivuston leville.fi kävijädataa valitulta ajanjaksolta.
Jokainen rivi on yksi tapahtuma (sivulataus tai klikkaus).
Ajanjakso valitaan dashboardista: tänään, tämä viikko, tämä kuukausi tai 30 päivää.

SARAKKEET:
- date: Päivämäärä (YYYY-MM-DD)
- time: Kellonaika UTC (HH:MM:SS)
- path: Sivun polku (tyhjä konversiotapahtumilla)
- type: "pageview" tai konversiotapahtuman tyyppi (ks. alla)
- referrer: Ulkoinen lähde (sivukatseluilla) TAI sisäinen lähtösivu (konversiotapahtumilla)
- device_type: "mobile", "tablet" tai "desktop"
- language: Selaimen kieli (fi, en, de, sv, es, fr, nl jne.)
- session_id: Istunnon tunniste (UUID). Sama käyttäjä samassa selainikkunassa/välilehdessä saa saman session_id:n. Uusi välilehti tai selaimen sulkeminen luo uuden istunnon. HUOM: Vanhoilla riveillä (ennen 13.3.2026) session_id on tyhjä.

ISTUNTOANALYYSI:
- session_id yhdistää saman käyttäjän sivukatselut yhdeksi istunnoksi (evästeetön, sessionStorage-pohjainen)
- Istunto päättyy kun käyttäjä sulkee välilehden/selaimen
- Bounce rate = yhden sivun istuntojen osuus kaikista istunnoista (%)
- Istunnon kesto = ensimmäisen ja viimeisen sivukatselun aikaero (vain istunnot joissa 2+ sivua)
- Päivittäiset kävijät = uniikit session_id:t per päivä (eri asia kuin sivukatselut)
- Istuntotilastot lasketaan vain riveistä joissa session_id on olemassa

TAPAHTUMATYYPIT (type-sarake):

1. "pageview" — Tavallinen sivulataus. path = sivun URL-polku (esim. "/" = etusivu, "/majoitukset" = majoitussivu, "/en/levi" = englanninkielinen Levi-sivu). referrer = ulkoinen lähde (google.com, facebook.com) tai tyhjä (suora liikenne).

2. "booking-search-widget" — Käyttäjä painoi etusivun hero-osion majoitushakuwidgetin "Hae"-painiketta. Tämä ohjaa käyttäjän varausjärjestelmään (app.moder.fi). referrer = sivu jolta haku tehtiin (yleensä "/" eli etusivu).

3. "booking-sticky-bar" — Käyttäjä painoi alareunan kiinnitettyä "Varaa heti tästä" -palkkia. Tämä palkki näkyy kaikilla sivuilla näytön alareunassa. referrer = sivu jolta painettiin.

4. "booking-page-cta" — Käyttäjä painoi sivun lopussa olevaa "Katso vapaat majoitukset" -toimintakehotuspainiketta (CTA = Call to Action). Tämä painike on pyöristetyssä laatikossa sivun alaosassa monilla sisältösivuilla. referrer = sivu jolta painettiin.

5. "booking-link" — Käyttäjä painoi muuta linkkiä joka johtaa varausjärjestelmään (app.moder.fi). Esim. yksittäisen majoituskohteen varauslinkki. referrer = sivu jolta painettiin.

KONVERSIOANALYYSI:
- Konversioprosentti = (booking-tapahtumien määrä / pageview-tapahtumien määrä) × 100
- Vertaa eri konversiotyyppien tehokkuutta: kumpi tuottaa enemmän klikkauksia, sticky bar vai page CTA?
- Analysoi referrer-sarake konversiotapahtumissa: mitkä sivut tuottavat eniten varausklikkauksia?
- Kieliversioiden tehokkuus: vertaa fi vs en vs de kävijöiden konversiota
- Istuntokohtainen konversio: kuinka moni istunto johti varausklikkiin?

SIVUSTON RAKENNE:
- / = suomenkielinen etusivu
- /majoitukset = majoitussivu
- /levi = Levi-opas
- /en/ = englanninkieliset sivut (esim. /en/levi, /en/accommodations)
- /opas/ = oppaat ja artikkelit
- /guide/ = englanninkieliset oppaat
- /sauna, /revontulet, /latuinfo jne. = erikoissivut`;

type Period = "today" | "week" | "month" | "30days" | "90days" | "180days";

const PERIOD_LABELS: Record<Period, string> = {
  today: "Tänään",
  week: "Tämä viikko",
  month: "Tämä kuukausi",
  "30days": "30 päivää",
  "90days": "90 päivää",
  "180days": "180 päivää",
};

const PageViewsAdmin = ({ isViewer }: PageViewsAdminProps) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [csvLoading, setCsvLoading] = useState(false);
  const [period, setPeriod] = useState<Period>("30days");
  const [liveUsers, setLiveUsers] = useState<{ activeUsers: number; topPages: Array<{ path: string; count: number }> } | null>(null);

  const fetchLive = useCallback(async () => {
    try {
      const password = localStorage.getItem("admin_password");
      if (!password) return;
      const { data, error } = await supabase.functions.invoke("get-page-view-stats", { body: { password, action: "live" } });
      if (!error && data) setLiveUsers(data);
    } catch { /* silent */ }
  }, []);

  // Poll live users every 30s
  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 30000);
    return () => clearInterval(interval);
  }, [fetchLive]);

  const fetchStats = async (p: Period = period) => {
    setLoading(true);
    try {
      const password = localStorage.getItem("admin_password");
      if (!password) { setLoading(false); return; }

      const { data, error } = await supabase.functions.invoke("get-page-view-stats", { body: { password, period: p } });
      if (!error && data) setStats(data);
    } catch (e) {
      console.error("Failed to fetch page view stats:", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    fetchStats(p);
  };

  const downloadCsv = async () => {
    setCsvLoading(true);
    try {
      const password = localStorage.getItem("admin_password");
      if (!password) return;

      const { data, error } = await supabase.functions.invoke("get-page-view-stats", {
        body: { password, format: "csv", period },
      });
      if (error) throw error;

      // data comes as string from text/csv response
      const csvText = typeof data === "string" ? data : JSON.stringify(data);
      const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leville-analytics-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("CSV ladattu");
    } catch (e) {
      console.error("CSV download failed:", e);
      toast.error("CSV-lataus epäonnistui");
    } finally {
      setCsvLoading(false);
    }
  };

  const copyDescription = () => {
    navigator.clipboard.writeText(REPORT_DESCRIPTION);
    toast.success("Raportin selite kopioitu leikepöydälle");
  };

  useEffect(() => { fetchStats(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Tilastoja ei voitu ladata. Varmista admin-salasana.
        </CardContent>
      </Card>
    );
  }

  const dateData = Object.entries(stats.byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, views]) => ({
      date: new Date(date).toLocaleDateString("fi-FI", { day: "numeric", month: "numeric" }),
      views,
      sessions: stats.byDateSessions?.[date] || 0,
    }));

  const deviceData = Object.entries(stats.byDevice).map(([name, value]) => ({
    name: name === "mobile" ? "Mobiili" : name === "tablet" ? "Tabletti" : name === "desktop" ? "Tietokone" : name,
    value,
  }));

  const languageData = Object.entries(stats.byLanguage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({
      name: name === "fi" ? "Suomi" : name === "en" ? "Englanti" : name === "sv" ? "Ruotsi" : name === "de" ? "Saksa" : name === "es" ? "Espanja" : name === "fr" ? "Ranska" : name === "nl" ? "Hollanti" : name,
      value,
    }));

  const referrerData = Object.entries(stats.byReferrer)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({
      name: name === "direct" ? "Suora liikenne" : name,
      value,
    }));

  const mobileCount = stats.byDevice["mobile"] || 0;
  const desktopCount = stats.byDevice["desktop"] || 0;
  const tabletCount = stats.byDevice["tablet"] || 0;

  const conversionCounts: Record<string, number> = {};
  for (const e of stats.conversionEvents || []) {
    conversionCounts[e.type] = e.count;
  }
  const getConvCount = (type: string) => conversionCounts[type] || 0;

  // Build full conversion list (always show all 4 types)
  const allConversionTypes = [
    "/event/booking-search-widget",
    "/event/booking-sticky-bar",
    "/event/booking-page-cta",
    "/event/booking-link",
  ];
  const conversionEventsComplete = allConversionTypes.map((type) => {
    const existing = (stats.conversionEvents || []).find((e) => e.type === type);
    return existing || { type, count: 0, topSources: [] };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg font-semibold">Sivukatselut ({PERIOD_LABELS[period]})</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyDescription}>
            <ClipboardCopy className="w-4 h-4 mr-2" />
            Kopioi selite
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCsv} disabled={csvLoading}>
            {csvLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Lataa CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => fetchStats()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Päivitä
          </Button>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex gap-2 flex-wrap">
        {(["today", "week", "month", "30days"] as Period[]).map((p) => (
          <Button
            key={p}
            variant={period === p ? "default" : "outline"}
            size="sm"
            onClick={() => handlePeriodChange(p)}
          >
            {PERIOD_LABELS[p]}
          </Button>
        ))}
      </div>

      {/* Live users */}
      {liveUsers !== null && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center relative">
                  <Radio className="w-5 h-5 text-primary" />
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sivustolla nyt</p>
                  <p className="text-3xl font-bold">{liveUsers.activeUsers}</p>
                </div>
              </div>
              {liveUsers.topPages.length > 0 && (
                <div className="ml-auto text-right">
                  <p className="text-xs text-muted-foreground mb-1">Aktiiviset sivut (5 min)</p>
                  {liveUsers.topPages.map((p) => (
                    <div key={p.path} className="text-xs font-mono flex justify-end gap-2">
                      <span className="truncate max-w-[200px]">{p.path}</span>
                      <span className="text-muted-foreground">{p.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session & page view summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard icon={<Eye className="w-5 h-5 text-primary" />} label="Sivukatselut" value={stats.total} colorClass="bg-primary/10" />
        <SummaryCard icon={<Users className="w-5 h-5 text-chart-2" />} label="Istunnot" value={stats.totalSessions || 0} colorClass="bg-chart-2/10" />
        <SummaryCard icon={<TrendingDown className="w-5 h-5 text-chart-3" />} label="Bounce rate" value={stats.bounceRate || 0} colorClass="bg-chart-3/10" suffix="%" />
        <SummaryCard icon={<Clock className="w-5 h-5 text-chart-4" />} label="Keskim. kesto" value={stats.avgSessionDurationSec || 0} colorClass="bg-chart-4/10" formatAs="duration" />
      </div>

      {/* Device summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <SummaryCard icon={<Smartphone className="w-5 h-5 text-chart-2" />} label="Mobiili" value={mobileCount} colorClass="bg-chart-2/10" />
        <SummaryCard icon={<Monitor className="w-5 h-5 text-chart-3" />} label="Tietokone" value={desktopCount} colorClass="bg-chart-3/10" />
        <SummaryCard icon={<Tablet className="w-5 h-5 text-chart-4" />} label="Tabletti" value={tabletCount} colorClass="bg-chart-4/10" />
      </div>

      {/* Conversion summary cards */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Varausklikkaukset</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard icon={<MousePointerClick className="w-5 h-5 text-chart-5" />} label="Hakuwidget" value={getConvCount("/event/booking-search-widget")} colorClass="bg-chart-5/10" />
          <SummaryCard icon={<MousePointerClick className="w-5 h-5 text-chart-2" />} label="Varaa tästä -palkki" value={getConvCount("/event/booking-sticky-bar")} colorClass="bg-chart-2/10" />
          <SummaryCard icon={<MousePointerClick className="w-5 h-5 text-chart-3" />} label="Sivun CTA" value={getConvCount("/event/booking-page-cta")} colorClass="bg-chart-3/10" />
          <SummaryCard icon={<MousePointerClick className="w-5 h-5 text-chart-4" />} label="Muut varauslinkit" value={getConvCount("/event/booking-link")} colorClass="bg-chart-4/10" />
        </div>
      </div>

      {/* Conversion events section — always visible */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Konversiot — lähtösivut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conversionEventsComplete.map((event) => (
              <div key={event.type} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm">
                    {EVENT_LABELS[event.type] || event.type}
                  </h4>
                  <span className="text-xl font-bold text-primary">{event.count}</span>
                </div>
                {event.topSources.length > 0 ? (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Suosituimmat lähtösivut:</p>
                    <ul className="space-y-1">
                      {event.topSources.map((s) => (
                        <li key={s.source} className="flex justify-between text-xs">
                          <span className="font-mono truncate mr-2">{s.source}</span>
                          <span className="font-medium text-muted-foreground">{s.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Ei vielä dataa</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily views chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Päivittäiset katselut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dateData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="views" name="Sivukatselut" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                <Line type="monotone" dataKey="sessions" name="Kävijät" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-2))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Suosituimmat sivut (Top 20)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">#</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Sivu</th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">Katselut</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPages.map((page, i) => (
                  <tr key={page.path} className="border-b border-border/50">
                    <td className="py-2 px-4 text-muted-foreground">{i + 1}</td>
                    <td className="py-2 px-4 font-mono text-xs">{page.path}</td>
                    <td className="py-2 px-4 text-right font-medium">{page.count.toLocaleString("fi-FI")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referrer distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Liikennelähteet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={referrerData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`} outerRadius={80} dataKey="value">
                    {referrerData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Language distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Kielijakauma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={languageData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function SummaryCard({ icon, label, value, colorClass, suffix, formatAs }: { icon: React.ReactNode; label: string; value: number; colorClass: string; suffix?: string; formatAs?: "duration" }) {
  let displayValue: string;
  if (formatAs === "duration") {
    const min = Math.floor(value / 60);
    const sec = value % 60;
    displayValue = min > 0 ? `${min}m ${sec}s` : `${sec}s`;
  } else {
    displayValue = value.toLocaleString("fi-FI") + (suffix || "");
  }
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center`}>{icon}</div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{displayValue}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PageViewsAdmin;
