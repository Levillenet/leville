import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Monitor, Smartphone, Tablet, RefreshCw } from "lucide-react";
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

interface Stats {
  total: number;
  byDate: Record<string, number>;
  topPages: Array<{ path: string; count: number }>;
  byReferrer: Record<string, number>;
  byDevice: Record<string, number>;
  byLanguage: Record<string, number>;
}

interface PageViewsAdminProps {
  isViewer: boolean;
}

const PageViewsAdmin = ({ isViewer }: PageViewsAdminProps) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const password = localStorage.getItem("admin_password");
      if (!password) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke(
        "get-page-view-stats",
        { body: { password } }
      );

      if (!error && data) {
        setStats(data);
      }
    } catch (e) {
      console.error("Failed to fetch page view stats:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

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

  // Date chart data
  const dateData = Object.entries(stats.byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, views]) => ({
      date: new Date(date).toLocaleDateString("fi-FI", {
        day: "numeric",
        month: "numeric",
      }),
      views,
    }));

  // Device data
  const deviceData = Object.entries(stats.byDevice).map(([name, value]) => ({
    name:
      name === "mobile"
        ? "Mobiili"
        : name === "tablet"
          ? "Tabletti"
          : name === "desktop"
            ? "Tietokone"
            : name,
    value,
  }));

  // Language data
  const languageData = Object.entries(stats.byLanguage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({
      name: name === "fi" ? "Suomi" : name === "en" ? "Englanti" : name === "sv" ? "Ruotsi" : name === "de" ? "Saksa" : name === "es" ? "Espanja" : name === "fr" ? "Ranska" : name === "nl" ? "Hollanti" : name,
      value,
    }));

  // Referrer data
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sivukatselut (30 pv)</h2>
        <Button variant="outline" size="sm" onClick={fetchStats}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Päivitä
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Yhteensä</p>
                <p className="text-2xl font-bold">{stats.total.toLocaleString("fi-FI")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobiili</p>
                <p className="text-2xl font-bold">{mobileCount.toLocaleString("fi-FI")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tietokone</p>
                <p className="text-2xl font-bold">{desktopCount.toLocaleString("fi-FI")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-chart-4/10 flex items-center justify-center">
                <Tablet className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tabletti</p>
                <p className="text-2xl font-bold">{tabletCount.toLocaleString("fi-FI")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
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
                  <Pie
                    data={referrerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    dataKey="value"
                  >
                    {referrerData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
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
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
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

export default PageViewsAdmin;
