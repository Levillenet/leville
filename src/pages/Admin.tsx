import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Lock, FileText, Globe, Calendar, Download, LogOut, Building, BarChart3, Ticket, RefreshCw, Database } from "lucide-react";
import PropertyAdmin from "@/components/admin/PropertyAdmin";
import SkiPassAdmin from "@/components/admin/SkiPassAdmin";
import CacheAdmin from "@/components/admin/CacheAdmin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

interface DownloadStats {
  total: number;
  byDocumentType: Record<string, number>;
  byLanguage: Record<string, number>;
  byDate: Record<string, number>;
  recentLogs: Array<{
    id: string;
    document_type: string;
    language: string | null;
    downloaded_at: string;
    user_agent: string | null;
  }>;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<DownloadStats | null>(null);
  const { toast } = useToast();

  // Check session storage for existing auth
  useEffect(() => {
    const adminAuth = sessionStorage.getItem("adminAuth");
    if (adminAuth) {
      setIsAuthenticated(true);
      fetchStats(adminAuth);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-admin', {
        body: { password }
      });

      if (error || !data?.success) {
        toast({
          title: "Virhe",
          description: data?.error || "Väärä salasana",
          variant: "destructive"
        });
        return;
      }

      sessionStorage.setItem("adminAuth", password);
      setIsAuthenticated(true);
      fetchStats(password);
      toast({
        title: "Kirjautuminen onnistui",
        description: "Tervetuloa admin-näkymään"
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Virhe",
        description: "Kirjautuminen epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async (pwd: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-download-stats', {
        body: { password: pwd }
      });

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setStats(null);
    setPassword("");
  };

  const documentTypeData = stats ? 
    Object.entries(stats.byDocumentType).map(([name, value]) => ({
      name: name === 'welcome_letter' ? 'Tervetulokirje' : 
            name === 'sauna_instructions' ? 'Saunaohjeet' : name,
      value
    })) : [];

  const languageData = stats ?
    Object.entries(stats.byLanguage).map(([name, value]) => ({
      name: name === 'fi' ? 'Suomi' : 
            name === 'en' ? 'Englanti' : 
            name === 'unknown' ? 'Tuntematon' : name,
      value
    })) : [];

  const dateData = stats ?
    Object.entries(stats.byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, value]) => ({
        date: new Date(date).toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric' }),
        downloads: value
      })) : [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Helmet>
          <title>Admin - Leville</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle>Admin-kirjautuminen</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Salasana"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Kirjaudutaan..." : "Kirjaudu"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin - Leville</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Admin</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Kirjaudu ulos
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Huoneistot
            </TabsTrigger>
            <TabsTrigger value="skipass" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Hissiliput ja erikoistarjoukset
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Lataustilastot
            </TabsTrigger>
            <TabsTrigger value="cache" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Välimuisti
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <PropertyAdmin />
          </TabsContent>

          <TabsContent value="skipass">
            <SkiPassAdmin />
          </TabsContent>

          <TabsContent value="cache">
            <CacheAdmin />
          </TabsContent>

          <TabsContent value="stats">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latauksia yhteensä</p>
                  <p className="text-2xl font-bold">{stats?.total || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-chart-2/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dokumenttityyppejä</p>
                  <p className="text-2xl font-bold">{Object.keys(stats?.byDocumentType || {}).length}</p>
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
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-chart-4/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tänään</p>
                  <p className="text-2xl font-bold">
                    {stats?.byDate[new Date().toISOString().split('T')[0]] || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Downloads by Document Type */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dokumenttityypeittäin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={documentTypeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Downloads by Language */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kielittäin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="hsl(var(--primary))"
                      dataKey="value"
                    >
                      {languageData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Downloads over time */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Lataukset viimeisen 14 päivän aikana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="downloads" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Downloads Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Viimeisimmät lataukset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Aika</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Dokumentti</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Kieli</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentLogs.map((log) => (
                    <tr key={log.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        {new Date(log.downloaded_at).toLocaleString('fi-FI')}
                      </td>
                      <td className="py-3 px-4">
                        {log.document_type === 'welcome_letter' ? 'Tervetulokirje' : 
                         log.document_type === 'sauna_instructions' ? 'Saunaohjeet' : 
                         log.document_type}
                      </td>
                      <td className="py-3 px-4">
                        {log.language === 'fi' ? 'Suomi' : 
                         log.language === 'en' ? 'Englanti' : 
                         log.language || '-'}
                      </td>
                    </tr>
                  ))}
                  {(!stats?.recentLogs || stats.recentLogs.length === 0) && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-muted-foreground">
                        Ei latauksia vielä
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
