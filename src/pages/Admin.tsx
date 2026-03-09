import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Lock, FileText, Globe, Calendar, Download, LogOut, Building, BarChart3, Ticket, Database, Settings, Users, Loader2, Thermometer, Wrench, Home, Eye, Heater, ScrollText, MessageSquare, BookOpen, Bot } from "lucide-react";
import PropertyAdmin from "@/components/admin/PropertyAdmin";
import SkiPassAdmin from "@/components/admin/SkiPassAdmin";
import CacheAdmin from "@/components/admin/CacheAdmin";
import SiteSettingsAdmin from "@/components/admin/SiteSettingsAdmin";
import UserManagementAdmin from "@/components/admin/UserManagementAdmin";
import HeatPumpAdmin from "@/components/admin/HeatPumpAdmin";
import MaintenanceAdmin from "@/components/admin/MaintenanceAdmin";
import PropertyMaintenanceAdmin from "@/components/admin/PropertyMaintenanceAdmin";
import FloorHeatingAdmin from "@/components/admin/FloorHeatingAdmin";
import { BookingTermsAdmin } from "@/components/admin/BookingTermsAdmin";
import MessagingAdmin from "@/components/admin/MessagingAdmin";
import GuideAdmin from "@/components/admin/GuideAdmin";
import SeoPageAdmin from "@/components/admin/SeoPageAdmin";
import ChatbotStatsAdmin from "@/components/admin/ChatbotStatsAdmin";
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
  const [userRole, setUserRole] = useState<'admin' | 'viewer' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [stats, setStats] = useState<DownloadStats | null>(null);
  const { toast } = useToast();

  const isViewer = userRole === 'viewer';

  // Check for existing session on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('admin_role');
    const savedPassword = localStorage.getItem('admin_password');
    
    // For admin role, require password to be stored as well
    if (savedRole === 'admin' && savedPassword) {
      setUserRole(savedRole);
      setIsAuthenticated(true);
      fetchStats();
    } else if (savedRole === 'viewer') {
      setUserRole(savedRole);
      setIsAuthenticated(true);
    } else {
      // Clear incomplete session
      localStorage.removeItem('admin_role');
      localStorage.removeItem('admin_password');
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoggingIn(true);
    setAuthError(null);

    try {
      const { data, error } = await supabase.functions.invoke('verify-admin', {
        body: { password: password.trim() }
      });

      if (error || !data?.success) {
        setAuthError(data?.error || 'Kirjautuminen epäonnistui');
        toast({
          title: "Virhe",
          description: data?.error || "Väärä salasana",
          variant: "destructive"
        });
        return;
      }

      // Store role and password in localStorage
      localStorage.setItem('admin_role', data.role);
      if (data.role === 'admin') {
        localStorage.setItem('admin_password', password.trim());
      }
      setUserRole(data.role);
      setIsAuthenticated(true);
      setPassword("");
      
      toast({
        title: data.role === 'admin' ? "Kirjauduttu sisään" : "Katselutila",
        description: data.role === 'admin' 
          ? "Tervetuloa admin-paneeliin" 
          : "Kirjauduttu katselutilassa (vain luku)"
      });
      
      fetchStats();
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Kirjautuminen epäonnistui');
      toast({
        title: "Virhe",
        description: "Kirjautuminen epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchStats = async () => {
    try {
      const storedPassword = localStorage.getItem('admin_password');
      
      if (!storedPassword) {
        console.log('No admin password stored, skipping stats fetch');
        return;
      }
      
      const { data, error } = await supabase.functions.invoke('get-download-stats', {
        body: { password: storedPassword }
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
    localStorage.removeItem('admin_role');
    localStorage.removeItem('admin_password');
    setIsAuthenticated(false);
    setUserRole(null);
    setStats(null);
    setPassword("");
    setAuthError(null);
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Helmet>
          <title>Admin - Leville</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Ladataan...</p>
        </div>
      </div>
    );
  }

  // Login form
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
            <CardDescription>
              Anna salasana kirjautuaksesi sisään
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Salasana"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoggingIn}
                autoFocus
              />
              {authError && (
                <p className="text-sm text-destructive">{authError}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Kirjaudutaan...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Kirjaudu sisään
                  </>
                )}
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
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">Admin</h1>
            {isViewer && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                <Eye className="w-3 h-3" />
                Katselutila
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Kirjaudu ulos
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="maintenance" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="maintenance" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Ylläpito
            </TabsTrigger>
            <TabsTrigger value="property-maintenance" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Huoneistotiedot
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Yleiset asetukset
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Huoneistot
            </TabsTrigger>
            <TabsTrigger value="skipass" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Hissiliput ja erikoistarjoukset
            </TabsTrigger>
            {!isViewer && (
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Käyttäjähallinta
              </TabsTrigger>
            )}
            <TabsTrigger value="heatpumps" className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              Lämpöpumput
            </TabsTrigger>
            <TabsTrigger value="floorheating" className="flex items-center gap-2">
              <Heater className="w-4 h-4" />
              Lattialämmitys
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Lataustilastot
            </TabsTrigger>
            <TabsTrigger value="cache" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Välimuisti
            </TabsTrigger>
            {!isViewer && (
              <TabsTrigger value="booking-terms" className="flex items-center gap-2">
                <ScrollText className="w-4 h-4" />
                Varausehdot
              </TabsTrigger>
            )}
            <TabsTrigger value="messaging" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Viestintä
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Oppaat
            </TabsTrigger>
            <TabsTrigger value="seo-pages" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              SEO-sivut
            </TabsTrigger>
          </TabsList>

          <TabsContent value="maintenance">
            <MaintenanceAdmin isViewer={isViewer} />
          </TabsContent>

          <TabsContent value="property-maintenance">
            <PropertyMaintenanceAdmin isViewer={isViewer} />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettingsAdmin isViewer={isViewer} />
          </TabsContent>

          <TabsContent value="properties">
            <PropertyAdmin isViewer={isViewer} />
          </TabsContent>

          <TabsContent value="skipass">
            <SkiPassAdmin isViewer={isViewer} />
          </TabsContent>

          {!isViewer && (
            <TabsContent value="users">
              <UserManagementAdmin 
                currentUserId="" 
                currentUserRole="super_admin" 
              />
            </TabsContent>
          )}

          <TabsContent value="cache">
            <CacheAdmin isViewer={isViewer} />
          </TabsContent>

          <TabsContent value="heatpumps">
            <HeatPumpAdmin isViewer={isViewer} />
          </TabsContent>

          <TabsContent value="floorheating">
            <FloorHeatingAdmin isViewer={isViewer} />
          </TabsContent>

          {!isViewer && (
            <TabsContent value="booking-terms">
              <BookingTermsAdmin adminPassword={localStorage.getItem('admin_password') || ''} />
            </TabsContent>
          )}

          <TabsContent value="messaging">
            <MessagingAdmin isViewer={isViewer} />
          </TabsContent>

          <TabsContent value="guides">
            <GuideAdmin isViewer={isViewer} />
          </TabsContent>

          <TabsContent value="seo-pages">
            <SeoPageAdmin isViewer={isViewer} />
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
                  <p className="text-sm text-muted-foreground">Päiviä datassa</p>
                  <p className="text-2xl font-bold">{Object.keys(stats?.byDate || {}).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Downloads over time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lataukset päivittäin (14 pv)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dateData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
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

          {/* By document type */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lataukset dokumenttityypeittäin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={documentTypeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
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
        </div>

        {/* Language distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Kielijakauma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
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

        {/* Recent downloads table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Viimeisimmät lataukset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-4 font-medium text-muted-foreground">Dokumentti</th>
                    <th className="text-left py-2 px-4 font-medium text-muted-foreground">Kieli</th>
                    <th className="text-left py-2 px-4 font-medium text-muted-foreground">Aika</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="border-b border-border/50">
                      <td className="py-2 px-4">
                        {log.document_type === 'welcome_letter' ? 'Tervetulokirje' : 
                         log.document_type === 'sauna_instructions' ? 'Saunaohjeet' : log.document_type}
                      </td>
                      <td className="py-2 px-4">
                        {log.language === 'fi' ? 'Suomi' : 
                         log.language === 'en' ? 'Englanti' : 
                         log.language || 'Tuntematon'}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {new Date(log.downloaded_at).toLocaleString('fi-FI')}
                      </td>
                    </tr>
                  ))}
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
