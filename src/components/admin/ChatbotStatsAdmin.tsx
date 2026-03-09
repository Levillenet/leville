import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MessageCircle, RefreshCw, Globe, Calendar } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', '#8884d8', '#82ca9d'];

const LANG_LABELS: Record<string, string> = {
  fi: 'Suomi', en: 'Englanti', de: 'Saksa', sv: 'Ruotsi',
  fr: 'Ranska', es: 'Espanja', nl: 'Hollanti', unknown: 'Tuntematon'
};

interface ChatbotStats {
  total: number;
  byDate: Record<string, number>;
  byLanguage: Record<string, number>;
  recentLogs: Array<{
    id: string;
    user_message: string;
    bot_response: string | null;
    detected_language: string;
    created_at: string;
  }>;
}

interface ChatbotStatsAdminProps {
  isViewer: boolean;
}

export default function ChatbotStatsAdmin({ isViewer }: ChatbotStatsAdminProps) {
  const [stats, setStats] = useState<ChatbotStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const password = localStorage.getItem('admin_password');
      if (!password) return;

      const { data, error } = await supabase.functions.invoke('get-chatbot-stats', {
        body: { password }
      });

      if (error) {
        console.error('Error fetching chatbot stats:', error);
        return;
      }
      setStats(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const dateData = stats
    ? Object.entries(stats.byDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-14)
        .map(([date, count]) => ({
          date: new Date(date).toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric' }),
          viestejä: count
        }))
    : [];

  const langData = stats
    ? Object.entries(stats.byLanguage).map(([lang, count]) => ({
        name: LANG_LABELS[lang] || lang,
        value: count
      }))
    : [];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = stats?.byDate[todayStr] || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chatbot-tilastot (30 pv)</h2>
        <Button variant="outline" size="sm" onClick={fetchStats}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Päivitä
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Viestejä yhteensä</p>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-chart-2/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tänään</p>
                <p className="text-2xl font-bold">{todayCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kieliä</p>
                <p className="text-2xl font-bold">{Object.keys(stats?.byLanguage || {}).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Viestit päivittäin (14 pv)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dateData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="viestejä" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Kielijakauma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={langData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {langData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Viimeisimmät kysymykset</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Kysymys</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Vastaus (alku)</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Kieli</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Aika</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border/50">
                    <td className="py-2 px-4 max-w-[250px] truncate">{log.user_message}</td>
                    <td className="py-2 px-4 max-w-[250px] truncate text-muted-foreground">{log.bot_response || '—'}</td>
                    <td className="py-2 px-4">{LANG_LABELS[log.detected_language] || log.detected_language}</td>
                    <td className="py-2 px-4 text-muted-foreground whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString('fi-FI', { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
                {(!stats?.recentLogs || stats.recentLogs.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      Ei vielä lokitettuja keskusteluja
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
