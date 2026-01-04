import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Send, Eye, Clock, Users, Home, LogOut, LogIn, CalendarIcon, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getAllDefaultPropertyDetails } from "@/data/propertyDetails";

interface BookingInfo {
  propertyId: string;
  propertyName?: string;
  guestCount: number;
  cleaningEmail?: string;
}

interface DayBookings {
  date: string;
  arrivals: BookingInfo[];
  departures: BookingInfo[];
}

interface MaintenanceSettings {
  worklist_send_time: { hour: number; minute: number };
  worklist_enabled: { enabled: boolean };
  last_worklist_sent: { timestamp: string | null };
}

interface PropertySettings {
  property_id: string;
  marketing_name: string | null;
}

interface PropertyMaintenance {
  property_id: string;
  cleaning_email: string | null;
}

const MaintenanceAdmin = () => {
  const [bookings, setBookings] = useState<DayBookings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [settings, setSettings] = useState<MaintenanceSettings | null>(null);
  const [sendHour, setSendHour] = useState("19");
  const [sendMinute, setSendMinute] = useState("00");
  const [isEnabled, setIsEnabled] = useState(true);
  const [previewData, setPreviewData] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [propertyNames, setPropertyNames] = useState<Map<string, string>>(new Map());
  const [propertyCleaningEmails, setPropertyCleaningEmails] = useState<Map<string, string>>(new Map());
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const { toast } = useToast();

  // Build default name map from propertyDetails.ts
  const defaultNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const prop of getAllDefaultPropertyDetails()) {
      map.set(prop.id, prop.name);
    }
    return map;
  }, []);

  // Initial load - settings and property names
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Fetch property names from property_settings
      const { data: settingsData } = await supabase
        .from('property_settings')
        .select('property_id, marketing_name');
      
      const nameMap = new Map<string, string>();
      for (const s of (settingsData || [])) {
        if (s.marketing_name) {
          nameMap.set(s.property_id, s.marketing_name);
        }
      }
      setPropertyNames(nameMap);

      // Fetch cleaning emails from property_maintenance
      const { data: maintenanceResult } = await supabase.functions.invoke('maintenance-settings', {
        body: { action: 'get_properties' }
      });
      
      const emailMap = new Map<string, string>();
      for (const p of (maintenanceResult?.properties || [])) {
        if (p.cleaning_email) {
          emailMap.set(p.property_id, p.cleaning_email);
        }
      }
      setPropertyCleaningEmails(emailMap);

      // Fetch maintenance settings
      const { data: settingsResult, error: settingsError } = await supabase.functions.invoke('maintenance-settings', {
        body: { action: 'get_settings' }
      });

      if (settingsError) throw settingsError;

      const settingsMap: Record<string, any> = {};
      for (const s of (settingsResult?.settings || [])) {
        settingsMap[s.id] = s.value;
      }

      setSettings({
        worklist_send_time: settingsMap.worklist_send_time || { hour: 19, minute: 0 },
        worklist_enabled: settingsMap.worklist_enabled || { enabled: true },
        last_worklist_sent: settingsMap.last_worklist_sent || { timestamp: null }
      });

      setSendHour(String(settingsMap.worklist_send_time?.hour || 19));
      setSendMinute(String(settingsMap.worklist_send_time?.minute || 0).padStart(2, '0'));
      setIsEnabled(settingsMap.worklist_enabled?.enabled !== false);
      setSettingsLoaded(true);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setSettingsLoaded(true); // Still mark as loaded so UI is usable
    }
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      console.log('Fetching bookings for date:', dateStr);
      
      const { data: bookingsData, error: bookingsError } = await supabase.functions.invoke('maintenance-bookings', {
        body: { date: dateStr }
      });

      console.log('Bookings response:', bookingsData);

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData);

      toast({
        title: "Varaukset haettu",
        description: `${bookingsData?.arrivals?.length || 0} saapuvaa, ${bookingsData?.departures?.length || 0} lähtevää`
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Virhe",
        description: "Varausten haku epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await supabase.functions.invoke('maintenance-settings', {
        body: {
          action: 'update_setting',
          data: {
            id: 'worklist_send_time',
            value: { hour: parseInt(sendHour), minute: parseInt(sendMinute) }
          }
        }
      });

      await supabase.functions.invoke('maintenance-settings', {
        body: {
          action: 'update_setting',
          data: {
            id: 'worklist_enabled',
            value: { enabled: isEnabled }
          }
        }
      });

      toast({
        title: "Tallennettu",
        description: "Asetukset päivitetty"
      });
    } catch (error) {
      toast({
        title: "Virhe",
        description: "Asetusten tallennus epäonnistui",
        variant: "destructive"
      });
    }
  };

  const handleSendWorklist = async () => {
    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-worklist', {
        body: { preview: false }
      });

      if (error) throw error;

      toast({
        title: "Työlistat lähetetty",
        description: `Lähetetty ${data.emailsSent?.length || 0} sähköpostia`
      });

      fetchSettings(); // Refresh to update last sent time
    } catch (error) {
      toast({
        title: "Virhe",
        description: "Työlistojen lähetys epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handlePreview = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('send-worklist', {
        body: { preview: true }
      });

      if (error) throw error;

      setPreviewData(data);
      setIsPreviewOpen(true);
    } catch (error) {
      toast({
        title: "Virhe",
        description: "Esikatselun haku epäonnistui",
        variant: "destructive"
      });
    }
  };

  const getPropertyName = (propertyId: string) => {
    // Priority: 1) DB marketing_name, 2) default from propertyDetails, 3) show ID
    return propertyNames.get(propertyId) || defaultNameMap.get(propertyId) || `ID: ${propertyId}`;
  };

  const getCleaningEmail = (propertyId: string) => {
    return propertyCleaningEmails.get(propertyId) || 'info@leville.net';
  };

  const formatSelectedDate = () => {
    return format(selectedDate, "EEEE d. MMMM yyyy", { locale: fi });
  };

  const formatLastSent = (timestamp: string | null) => {
    if (!timestamp) return 'Ei koskaan';
    return new Date(timestamp).toLocaleString('fi-FI');
  };

  return (
    <div className="space-y-6">
      {/* Date selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Valitse päivämäärä
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "d.M.yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setCalendarOpen(false);
                    }
                  }}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <Button onClick={fetchBookings} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Hae varaukset
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2 capitalize">
            {formatSelectedDate()}
          </p>
        </CardContent>
      </Card>

      {/* Departures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <LogOut className="w-5 h-5" />
            Lähtevät (siivottavat)
          </CardTitle>
          <CardDescription>
            {bookings?.departures.length || 0} huoneistoa siivottavana
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookings?.departures.length === 0 ? (
            <p className="text-muted-foreground text-sm">Ei lähteviä varauksia</p>
          ) : (
            <div className="space-y-2">
              {bookings?.departures.map((dep, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-destructive" />
                    <span className="font-medium">{getPropertyName(dep.propertyId)}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {dep.guestCount} hlö
                    </span>
                    <span className="text-xs">{getCleaningEmail(dep.propertyId)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Arrivals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <LogIn className="w-5 h-5" />
            Saapuvat (valmisteltavat)
          </CardTitle>
          <CardDescription>
            {bookings?.arrivals.length || 0} huoneistoa valmisteltavana
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookings?.arrivals.length === 0 ? (
            <p className="text-muted-foreground text-sm">Ei saapuvia varauksia</p>
          ) : (
            <div className="space-y-2">
              {bookings?.arrivals.map((arr, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-green-500/5 rounded-lg border border-green-500/10">
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{getPropertyName(arr.propertyId)}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {arr.guestCount} hlö
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                      {arr.guestCount} liinavaatesettiä
                    </span>
                    <span className="text-xs">{getCleaningEmail(arr.propertyId)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Worklist sending */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Työlistojen lähetys
          </CardTitle>
          <CardDescription>
            Automaattinen lähetys siivousyrityksille
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
              />
              <Label>Automaattinen lähetys päällä</Label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <Label>Lähetysaika:</Label>
            </div>
            <Input
              type="number"
              min="0"
              max="23"
              value={sendHour}
              onChange={(e) => setSendHour(e.target.value)}
              className="w-16 text-center"
            />
            <span>:</span>
            <Input
              type="number"
              min="0"
              max="59"
              value={sendMinute}
              onChange={(e) => setSendMinute(e.target.value.padStart(2, '0'))}
              className="w-16 text-center"
            />
            <Button variant="outline" size="sm" onClick={handleSaveSettings}>
              Tallenna
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Viimeksi lähetetty: {formatLastSent(settings?.last_worklist_sent?.timestamp || null)}
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSendWorklist} disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Lähetetään...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Lähetä työlistat nyt
                </>
              )}
            </Button>

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Esikatsele
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Työlistojen esikatselu</DialogTitle>
                </DialogHeader>
                {previewData?.emails?.map((email: any, idx: number) => (
                  <div key={idx} className="border rounded-lg p-4 mb-4">
                    <div className="mb-2">
                      <strong>Vastaanottaja:</strong> {email.email}
                    </div>
                    <div className="mb-2">
                      <strong>Aihe:</strong> {email.subject}
                    </div>
                    <div 
                      className="border-t pt-2 mt-2"
                      dangerouslySetInnerHTML={{ __html: email.html }}
                    />
                  </div>
                ))}
                {previewData?.emails?.length === 0 && (
                  <p className="text-muted-foreground">Ei lähetettäviä työlistoja huomiselle</p>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceAdmin;
