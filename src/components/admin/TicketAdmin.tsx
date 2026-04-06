import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, AlertTriangle, Clock, CheckCircle2, RefreshCw, ArrowLeft, Mail, Trash2, Building2, Phone, AtSign, CalendarDays, Send, AlertCircle, FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getAllDefaultPropertyDetails } from "@/data/propertyDetails";

interface Ticket {
  id: string;
  apartment_id: string;
  title: string;
  description: string | null;
  type: "seasonal" | "urgent";
  priority: "1" | "2";
  status: "open" | "in_progress" | "resolved";
  send_email: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface MaintenanceCompany {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  created_at: string;
}

interface ApartmentAssignment {
  id: string;
  apartment_id: string;
  maintenance_company_id: string;
  contact_email_override: string | null;
  created_at: string;
}

interface EmailLog {
  id: string;
  ticket_id: string;
  sent_to: string;
  sent_at: string;
  status: string;
  error_message: string | null;
}

interface AvailabilityData {
  dates: Record<string, { booked: boolean; checkIn?: boolean; checkOut?: boolean }>;
  backToBackWindows: string[];
  emptyNights: string[];
  cachedAt: string | null;
}

interface TicketAdminProps {
  isViewer: boolean;
}

const apartments = getAllDefaultPropertyDetails();
const apartmentList = Object.entries(apartments).map(([id, details]) => ({
  id,
  name: (details as any).name || id,
}));

const getApartmentName = (id: string) => {
  const apt = apartmentList.find((a) => a.id === id);
  return apt?.name || id;
};

// ── Mini Calendar Component ──
const MiniCalendar = ({ availability, days, label }: { availability: AvailabilityData; days: number; label?: string }) => {
  const dateKeys = Object.keys(availability.dates).sort().slice(0, days);
  const backToBackSet = new Set(availability.backToBackWindows);
  const emptySet = new Set(availability.emptyNights);

  return (
    <div className="space-y-2">
      {label && <Label className="text-xs text-muted-foreground">{label}</Label>}
      <div className="flex flex-wrap gap-1">
        {dateKeys.map((date) => {
          const isBackToBack = backToBackSet.has(date);
          const isEmpty = emptySet.has(date);
          const d = new Date(date);
          const dayNum = d.getDate();
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;

          let bg = "bg-muted/60 text-muted-foreground"; // booked = gray
          let title = "Varattu";
          if (isBackToBack) {
            bg = "bg-amber-400 text-amber-900 ring-1 ring-amber-500";
            title = "Back-to-back ikkuna";
          } else if (isEmpty) {
            bg = "bg-emerald-400/80 text-emerald-900";
            title = "Vapaa yö";
          }

          return (
            <div
              key={date}
              title={`${date} – ${title}`}
              className={`w-7 h-7 rounded text-xs flex items-center justify-center font-medium ${bg} ${isWeekend ? "ring-1 ring-foreground/10" : ""}`}
            >
              {dayNum}
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted/60 inline-block" /> Varattu</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-400/80 inline-block" /> Vapaa</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Back-to-back</span>
      </div>
    </div>
  );
};

// ── Availability Indicator Dot ──
const AvailabilityDot = ({ indicator }: { indicator: "back_to_back" | "empty" | "full" | undefined }) => {
  if (!indicator) return null;
  switch (indicator) {
    case "back_to_back":
      return <span title="Back-to-back ikkuna 7pv sisällä" className="text-sm">🟡</span>;
    case "empty":
      return <span title="Vapaa yö 7pv sisällä" className="text-sm">🟢</span>;
    case "full":
      return <span title="Täysin varattu 7pv" className="text-sm">⚪</span>;
  }
};

const TicketAdmin = ({ isViewer }: TicketAdminProps) => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [companies, setCompanies] = useState<MaintenanceCompany[]>([]);
  const [assignments, setAssignments] = useState<ApartmentAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [emailLog, setEmailLog] = useState<EmailLog[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCompanyDialog, setShowCompanyDialog] = useState(false);
  const [editingCompany, setEditingCompany] = useState<MaintenanceCompany | null>(null);

  // Empty night data for selected ticket
  const [emptyNightData, setEmptyNightData] = useState<{ emptyNights: string[]; nextEmpty: string | null } | null>(null);
  const [loadingEmptyNights, setLoadingEmptyNights] = useState(false);
  const [sendingReminder, setSendingReminder] = useState(false);

  // Availability data
  const [ticketAvailability, setTicketAvailability] = useState<AvailabilityData | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [createFormAvailability, setCreateFormAvailability] = useState<AvailabilityData | null>(null);
  const [loadingCreateAvail, setLoadingCreateAvail] = useState(false);
  const [availabilityIndicators, setAvailabilityIndicators] = useState<Record<string, { indicator: "back_to_back" | "empty" | "full" }>>({});
  const [_loadingIndicators, setLoadingIndicators] = useState(false);

  // Email preview for new ticket
  const [emailPreview, setEmailPreview] = useState<{ email: string | null; source: string } | null>(null);
  const [loadingEmailPreview, setLoadingEmailPreview] = useState(false);

  // Filters
  const [filterApartment, setFilterApartment] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // New ticket form
  const [newTicket, setNewTicket] = useState({
    apartment_id: "",
    title: "",
    description: "",
    type: "seasonal" as "seasonal" | "urgent",
    priority: "1" as "1" | "2",
    send_email: false,
  });

  // Company form
  const [companyForm, setCompanyForm] = useState({ name: "", email: "", phone: "" });

  // PDF Export
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFilters, setExportFilters] = useState({
    companyId: "all",
    apartmentIds: [] as string[],
    status: "both" as "open" | "in_progress" | "both",
    dateFrom: "",
    dateTo: "",
  });

  const { toast } = useToast();

  const callApi = async (action: string, extra: Record<string, unknown> = {}) => {
    const password = localStorage.getItem("admin_password");
    const { data, error } = await supabase.functions.invoke("manage-tickets", {
      body: { action, password, ...extra },
    });
    if (error) throw error;
    return data;
  };

  const fetchTickets = async () => {
    try {
      const data = await callApi("list_tickets");
      setTickets(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await callApi("list_companies");
      setCompanies(data?.companies || []);
      setAssignments(data?.assignments || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAvailabilityIndicators = useCallback(async (ticketList: Ticket[]) => {
    const unresolvedApts = [...new Set(ticketList.filter(t => t.status !== "resolved").map(t => t.apartment_id))];
    if (unresolvedApts.length === 0) return;
    setLoadingIndicators(true);
    try {
      const data = await callApi("get_availability_indicators", { apartment_ids: unresolvedApts });
      setAvailabilityIndicators(data || {});
    } catch (e) {
      console.error(e);
    }
    setLoadingIndicators(false);
  }, []);

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchTickets(), fetchCompanies()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Fetch indicators after tickets load
  useEffect(() => {
    if (tickets.length > 0) {
      fetchAvailabilityIndicators(tickets);
    }
  }, [tickets]);

  // Check email when apartment changes in new ticket form
  useEffect(() => {
    if (newTicket.apartment_id && newTicket.send_email) {
      checkEmail(newTicket.apartment_id);
    } else {
      setEmailPreview(null);
    }
  }, [newTicket.apartment_id, newTicket.send_email]);

  // Fetch availability when apartment selected in create form for urgent tickets
  useEffect(() => {
    if (newTicket.apartment_id && newTicket.type === "urgent" && showCreateDialog) {
      fetchCreateFormAvailability(newTicket.apartment_id);
    } else {
      setCreateFormAvailability(null);
    }
  }, [newTicket.apartment_id, newTicket.type, showCreateDialog]);

  const fetchCreateFormAvailability = async (apartmentId: string) => {
    setLoadingCreateAvail(true);
    try {
      const data = await callApi("get_apartment_availability", { apartment_id: apartmentId, days: 30 });
      setCreateFormAvailability(data);
    } catch (e) {
      console.error(e);
      setCreateFormAvailability(null);
    }
    setLoadingCreateAvail(false);
  };

  const checkEmail = async (apartmentId: string) => {
    setLoadingEmailPreview(true);
    try {
      const data = await callApi("resolve_email", { apartment_id: apartmentId });
      setEmailPreview(data);
    } catch (e) {
      console.error(e);
      setEmailPreview(null);
    }
    setLoadingEmailPreview(false);
  };

  const handleCreateTicket = async () => {
    if (!newTicket.apartment_id || !newTicket.title.trim()) {
      toast({ title: "Virhe", description: "Täytä pakolliset kentät", variant: "destructive" });
      return;
    }
    try {
      const result = await callApi("create_ticket", { ticket: newTicket });
      
      if (result?.emailResult) {
        if (result.emailResult.sent) {
          toast({ title: "Tiketti luotu", description: `Sähköposti lähetetty: ${result.emailResult.email}` });
        } else if (result.emailResult.error === "no_email_found") {
          toast({ title: "Tiketti luotu", description: "⚠️ Sähköpostia ei lähetetty: huoltoyhtiön sähköpostia ei löytynyt", variant: "destructive" });
        } else {
          toast({ title: "Tiketti luotu", description: `⚠️ Sähköpostin lähetys epäonnistui: ${result.emailResult.error}`, variant: "destructive" });
        }
      } else {
        toast({ title: "Tiketti luotu" });
      }
      
      setShowCreateDialog(false);
      setNewTicket({ apartment_id: "", title: "", description: "", type: "seasonal", priority: "1", send_email: false });
      setEmailPreview(null);
      setCreateFormAvailability(null);
      fetchTickets();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleUpdateTicketStatus = async (id: string, status: string) => {
    try {
      await callApi("update_ticket", { id, updates: { status } });
      toast({ title: "Tila päivitetty" });
      fetchTickets();
      if (selectedTicket?.id === id) {
        setSelectedTicket((prev) => prev ? { ...prev, status: status as Ticket["status"] } : null);
      }
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleUpdateTicketNotes = async (id: string, notes: string) => {
    try {
      await callApi("update_ticket", { id, updates: { notes } });
      toast({ title: "Muistiinpanot tallennettu" });
      if (selectedTicket) setSelectedTicket({ ...selectedTicket, notes });
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (!confirm("Haluatko varmasti poistaa tämän tiketin?")) return;
    try {
      await callApi("delete_ticket", { id });
      toast({ title: "Tiketti poistettu" });
      setSelectedTicket(null);
      fetchTickets();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const fetchEmailLog = async (ticketId: string) => {
    try {
      const data = await callApi("get_email_log", { ticket_id: ticketId });
      setEmailLog(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchEmptyNights = async (apartmentId: string) => {
    setLoadingEmptyNights(true);
    try {
      const data = await callApi("get_next_empty_night", { apartment_id: apartmentId });
      setEmptyNightData(data);
    } catch (e) {
      console.error(e);
      setEmptyNightData(null);
    }
    setLoadingEmptyNights(false);
  };

  const fetchTicketAvailability = async (apartmentId: string, forceRefresh = false) => {
    setLoadingAvailability(true);
    try {
      const days = selectedTicket?.type === "urgent" ? 30 : 14;
      const data = await callApi("get_apartment_availability", { apartment_id: apartmentId, days, force_refresh: forceRefresh });
      setTicketAvailability(data);
    } catch (e) {
      console.error(e);
      setTicketAvailability(null);
    }
    setLoadingAvailability(false);
  };

  const handleSendReminder = async (ticketId: string) => {
    if (!confirm("Lähetetäänkö muistutus nyt?")) return;
    setSendingReminder(true);
    try {
      const result = await callApi("send_reminder", { ticket_id: ticketId });
      if (result?.sent) {
        toast({ title: "Muistutus lähetetty", description: `Vastaanottaja: ${result.email}` });
      } else if (result?.error === "no_email_found") {
        toast({ title: "Virhe", description: "Sähköpostiosoitetta ei löydy tälle huoneistolle", variant: "destructive" });
      } else {
        toast({ title: "Virhe", description: `Lähetys epäonnistui: ${result?.error}`, variant: "destructive" });
      }
      if (selectedTicket) fetchEmailLog(selectedTicket.id);
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
    setSendingReminder(false);
  };

  const openTicketDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEmptyNightData(null);
    setTicketAvailability(null);
    fetchEmailLog(ticket.id);
    fetchTicketAvailability(ticket.apartment_id);
    if (ticket.priority === "2" && ticket.status !== "resolved") {
      fetchEmptyNights(ticket.apartment_id);
    }
  };

  // Company CRUD
  const handleSaveCompany = async () => {
    if (!companyForm.name.trim()) {
      toast({ title: "Virhe", description: "Nimi on pakollinen", variant: "destructive" });
      return;
    }
    try {
      if (editingCompany) {
        await callApi("update_company", { id: editingCompany.id, updates: companyForm });
        toast({ title: "Yritys päivitetty" });
      } else {
        await callApi("create_company", { company: companyForm });
        toast({ title: "Yritys lisätty" });
      }
      setShowCompanyDialog(false);
      setEditingCompany(null);
      setCompanyForm({ name: "", email: "", phone: "" });
      fetchCompanies();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleDeleteCompany = async (id: string) => {
    if (!confirm("Haluatko varmasti poistaa tämän yrityksen?")) return;
    try {
      await callApi("delete_company", { id });
      toast({ title: "Yritys poistettu" });
      fetchCompanies();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleAssignApartment = async (companyId: string, apartmentId: string) => {
    try {
      await callApi("assign_apartment", {
        assignment: { apartment_id: apartmentId, maintenance_company_id: companyId },
      });
      toast({ title: "Huoneisto liitetty" });
      fetchCompanies();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleUnassignApartment = async (assignmentId: string) => {
    try {
      await callApi("unassign_apartment", { id: assignmentId });
      toast({ title: "Liitos poistettu" });
      fetchCompanies();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    if (filterApartment !== "all" && t.apartment_id !== filterApartment) return false;
    if (filterType !== "all" && t.type !== filterType) return false;
    if (filterPriority !== "all" && t.priority !== filterPriority) return false;
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    return true;
  });

  const openCount = tickets.filter((t) => t.status === "open").length;
  const urgentCount = tickets.filter((t) => t.type === "urgent" && t.status !== "resolved").length;
  const reminderCount = tickets.filter((t) => t.priority === "2" && t.status !== "resolved").length;

  const statusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Avoin</Badge>;
      case "in_progress":
        return <Badge className="bg-amber-500 text-white">Käsittelyssä</Badge>;
      case "resolved":
        return <Badge variant="secondary">Ratkaistu</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const typeBadge = (type: string) => {
    return type === "urgent" ? (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="w-3 h-3" />
        Kiireellinen
      </Badge>
    ) : (
      <Badge variant="outline">Kausihuolto</Badge>
    );
  };

  // Compute scheduled reminder time for priority 2 tickets
  const getScheduledReminderText = () => {
    if (!emptyNightData?.nextEmpty) return null;
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    
    if (emptyNightData.nextEmpty === today) {
      return "Muistutus ajastettu: tänään klo 07:00";
    }
    if (emptyNightData.nextEmpty === tomorrow) {
      return "Muistutus ajastettu: tänään klo 18:00";
    }
    return `Muistutus lähetetään kun tyhjä yö on lähempänä`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ── TICKET DETAIL VIEW ──
  if (selectedTicket) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => { setSelectedTicket(null); setEmptyNightData(null); setTicketAvailability(null); }}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Takaisin
          </Button>
          <h2 className="text-lg font-semibold">{selectedTicket.title}</h2>
          {statusBadge(selectedTicket.status)}
          {typeBadge(selectedTicket.type)}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tiketin tiedot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Huoneisto</Label>
                  <p className="font-medium">{getApartmentName(selectedTicket.apartment_id)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Kuvaus</Label>
                  <p>{selectedTicket.description || "–"}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Prioriteetti</Label>
                    <p>{selectedTicket.priority === "1" ? "Normaali" : "Muistutus tarvitaan"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Sähköposti</Label>
                    <p>{selectedTicket.send_email ? "Kyllä" : "Ei"}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Luotu</Label>
                  <p>{new Date(selectedTicket.created_at).toLocaleDateString("fi-FI")} {new Date(selectedTicket.created_at).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>

                {!isViewer && (
                  <div className="pt-2 space-y-2">
                    <Label>Muuta tila</Label>
                    <Select value={selectedTicket.status} onValueChange={(val) => handleUpdateTicketStatus(selectedTicket.id, val)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Avoin</SelectItem>
                        <SelectItem value="in_progress">Käsittelyssä</SelectItem>
                        <SelectItem value="resolved">Ratkaistu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {!isViewer && (
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteTicket(selectedTicket.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Poista tiketti
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Availability calendar for ticket detail */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Huoneiston saatavuus
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fetchTicketAvailability(selectedTicket.apartment_id, true)}
                    disabled={loadingAvailability}
                  >
                    <RefreshCw className={`w-4 h-4 mr-1 ${loadingAvailability ? "animate-spin" : ""}`} />
                    Päivitä
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loadingAvailability ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Haetaan saatavuustietoja...
                  </div>
                ) : ticketAvailability ? (
                  <div className="space-y-3">
                    <MiniCalendar
                      availability={ticketAvailability}
                      days={selectedTicket.type === "urgent" ? 30 : 14}
                      label={selectedTicket.type === "urgent" ? "Seuraavat 30 päivää" : "Seuraavat 14 päivää"}
                    />
                    {ticketAvailability.backToBackWindows.length > 0 && (
                      <div className="p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                        <span className="font-medium text-amber-800">Seuraava back-to-back ikkuna: </span>
                        <span className="text-amber-700">
                          {new Date(ticketAvailability.backToBackWindows[0]).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" })}
                        </span>
                      </div>
                    )}
                    {ticketAvailability.cachedAt && (
                      <p className="text-[10px] text-muted-foreground">
                        Päivitetty: {new Date(ticketAvailability.cachedAt).toLocaleString("fi-FI")}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Saatavuustietoja ei voitu hakea</p>
                )}
              </CardContent>
            </Card>

            {/* Priority 2: Empty night info & manual reminder */}
            {selectedTicket.priority === "2" && selectedTicket.status !== "resolved" && (
              <Card className="border-amber-200 bg-amber-50/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-amber-600" />
                    Muistutusjärjestelmä
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {loadingEmptyNights ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Haetaan saatavuustietoja...
                    </div>
                  ) : emptyNightData ? (
                    <>
                      <div>
                        <Label className="text-xs text-muted-foreground">Seuraava tyhjä yö</Label>
                        <p className="font-medium text-amber-700">
                          {emptyNightData.nextEmpty
                            ? new Date(emptyNightData.nextEmpty).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })
                            : "Ei tyhjiä öitä seuraavan 14 päivän sisällä"}
                        </p>
                      </div>
                      {emptyNightData.emptyNights.length > 1 && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Kaikki tyhjät yöt (14pv)</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {emptyNightData.emptyNights.slice(0, 10).map((date) => (
                              <Badge key={date} variant="outline" className="text-xs">
                                {new Date(date).toLocaleDateString("fi-FI", { day: "numeric", month: "numeric" })}
                              </Badge>
                            ))}
                            {emptyNightData.emptyNights.length > 10 && (
                              <Badge variant="outline" className="text-xs">+{emptyNightData.emptyNights.length - 10}</Badge>
                            )}
                          </div>
                        </div>
                      )}
                      {getScheduledReminderText() && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Automaattinen muistutus</Label>
                          <p className="text-sm text-amber-700 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getScheduledReminderText()}
                          </p>
                        </div>
                      )}
                      {!isViewer && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-300 text-amber-700 hover:bg-amber-100"
                          onClick={() => handleSendReminder(selectedTicket.id)}
                          disabled={sendingReminder}
                        >
                          {sendingReminder ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4 mr-1" />
                          )}
                          Lähetä muistutus nyt
                        </Button>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Saatavuustietoja ei voitu hakea</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Muistiinpanot</CardTitle>
              </CardHeader>
              <CardContent>
                <TicketNotes
                  notes={selectedTicket.notes || ""}
                  onSave={(notes) => handleUpdateTicketNotes(selectedTicket.id, notes)}
                  isViewer={isViewer}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Sähköpostiloki
                </CardTitle>
              </CardHeader>
              <CardContent>
                {emailLog.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Ei lähetettyjä viestejä</p>
                ) : (
                  <div className="space-y-2">
                    {emailLog.map((log) => (
                      <div key={log.id} className="text-sm border rounded p-2">
                        <div className="flex justify-between">
                          <span>{log.sent_to}</span>
                          <Badge variant={log.status === "sent" ? "secondary" : "destructive"} className="text-xs">
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.sent_at).toLocaleString("fi-FI")}
                        </p>
                        {log.error_message && <p className="text-xs text-destructive">{log.error_message}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN VIEW ──
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tickets">Tiketit</TabsTrigger>
          <TabsTrigger value="companies">Huoltoyhtiöt</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avoimet tiketit</p>
                    <p className="text-2xl font-bold">{openCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kiireelliset</p>
                    <p className="text-2xl font-bold">{urgentCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Muistutus tarvitaan</p>
                    <p className="text-2xl font-bold">{reminderCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={filterApartment} onValueChange={setFilterApartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Huoneisto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki huoneistot</SelectItem>
                {apartmentList.map((apt) => (
                  <SelectItem key={apt.id} value={apt.id}>{apt.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tyyppi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki tyypit</SelectItem>
                <SelectItem value="seasonal">Kausihuolto</SelectItem>
                <SelectItem value="urgent">Kiireellinen</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Prioriteetti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki</SelectItem>
                <SelectItem value="1">Normaali</SelectItem>
                <SelectItem value="2">Muistutus</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tila" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki tilat</SelectItem>
                <SelectItem value="open">Avoin</SelectItem>
                <SelectItem value="in_progress">Käsittelyssä</SelectItem>
                <SelectItem value="resolved">Ratkaistu</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <Button variant="outline" size="sm" onClick={loadAll}>
              <RefreshCw className="w-4 h-4 mr-1" />
              Päivitä
            </Button>

            {!isViewer && (
              <Dialog open={showCreateDialog} onOpenChange={(open) => {
                setShowCreateDialog(open);
                if (!open) {
                  setEmailPreview(null);
                  setCreateFormAvailability(null);
                  setNewTicket({ apartment_id: "", title: "", description: "", type: "seasonal", priority: "1", send_email: false });
                }
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-1" />
                    Uusi tiketti
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Uusi tiketti</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Huoneisto *</Label>
                      <Select value={newTicket.apartment_id} onValueChange={(val) => setNewTicket({ ...newTicket, apartment_id: val })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Valitse huoneisto" />
                        </SelectTrigger>
                        <SelectContent>
                          {apartmentList.map((apt) => (
                            <SelectItem key={apt.id} value={apt.id}>{apt.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Otsikko *</Label>
                      <Input value={newTicket.title} onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })} placeholder="esim. Astianpesukoneen huolto" />
                    </div>
                    <div>
                      <Label>Kuvaus</Label>
                      <Textarea value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} rows={3} />
                    </div>
                    <div>
                      <Label>Tyyppi</Label>
                      <RadioGroup value={newTicket.type} onValueChange={(val) => setNewTicket({ ...newTicket, type: val as "seasonal" | "urgent" })} className="flex gap-4 mt-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="seasonal" id="type-seasonal" />
                          <Label htmlFor="type-seasonal">Kausihuolto</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="type-urgent" />
                          <Label htmlFor="type-urgent">Kiireellinen</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Back-to-back calendar for urgent tickets */}
                    {newTicket.type === "urgent" && newTicket.apartment_id && (
                      <div className="border rounded-lg p-3 bg-muted/30">
                        {loadingCreateAvail ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Haetaan saatavuustietoja...
                          </div>
                        ) : createFormAvailability ? (
                          <div className="space-y-2">
                            <MiniCalendar
                              availability={createFormAvailability}
                              days={30}
                              label="Saatavuus – seuraavat 30 päivää"
                            />
                            {createFormAvailability.backToBackWindows.length > 0 && (
                              <p className="text-sm font-medium text-amber-700">
                                Seuraava back-to-back ikkuna: {new Date(createFormAvailability.backToBackWindows[0]).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" })}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Saatavuustietoja ei saatavilla</p>
                        )}
                      </div>
                    )}

                    <div>
                      <Label>Prioriteetti</Label>
                      <RadioGroup value={newTicket.priority} onValueChange={(val) => setNewTicket({ ...newTicket, priority: val as "1" | "2" })} className="flex gap-4 mt-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="prio-1" />
                          <Label htmlFor="prio-1">1 – Normaali</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="prio-2" />
                          <Label htmlFor="prio-2">2 – Muistutus tarvitaan</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch checked={newTicket.send_email} onCheckedChange={(val) => setNewTicket({ ...newTicket, send_email: val })} />
                        <Label>Lähetä sähköposti-ilmoitus</Label>
                      </div>
                      
                      {/* Email preview / warning */}
                      {newTicket.send_email && newTicket.apartment_id && (
                        <div className="ml-8">
                          {loadingEmailPreview ? (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Tarkistetaan sähköpostiosoitetta...
                            </p>
                          ) : emailPreview?.email ? (
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              Lähetetään: {emailPreview.email}
                              <span className="text-muted-foreground">
                                ({emailPreview.source === "override" ? "ohitusasetus" : "huoltoyhtiö"})
                              </span>
                            </p>
                          ) : (
                            <p className="text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              ⚠️ Sähköpostia ei löydy! Liitä ensin huoltoyhtiö huoneistoon tai aseta sähköpostiosoite.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <Button onClick={handleCreateTicket} className="w-full">Luo tiketti</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Ticket table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Huoneisto</TableHead>
                    <TableHead>Otsikko</TableHead>
                    <TableHead>Tyyppi</TableHead>
                    <TableHead>Prioriteetti</TableHead>
                    <TableHead>Tila</TableHead>
                    <TableHead>Luotu</TableHead>
                    <TableHead>Toiminnot</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Ei tikettejä
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="cursor-pointer" onClick={() => openTicketDetail(ticket)}>
                        <TableCell className="font-medium">
                          <span className="flex items-center gap-1.5">
                            <AvailabilityDot indicator={availabilityIndicators[ticket.apartment_id]?.indicator} />
                            {getApartmentName(ticket.apartment_id)}
                          </span>
                        </TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>{typeBadge(ticket.type)}</TableCell>
                        <TableCell>
                          <Badge variant={ticket.priority === "2" ? "default" : "outline"}>
                            {ticket.priority === "1" ? "Normaali" : "Muistutus"}
                          </Badge>
                        </TableCell>
                        <TableCell>{statusBadge(ticket.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(ticket.created_at).toLocaleDateString("fi-FI")}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openTicketDetail(ticket); }}>
                            Avaa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── COMPANIES TAB ── */}
        <TabsContent value="companies" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Huoltoyhtiöt</h3>
            {!isViewer && (
              <Dialog open={showCompanyDialog} onOpenChange={(open) => { setShowCompanyDialog(open); if (!open) { setEditingCompany(null); setCompanyForm({ name: "", email: "", phone: "" }); } }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-1" />
                    Lisää yritys
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCompany ? "Muokkaa yritystä" : "Uusi yritys"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nimi *</Label>
                      <Input value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} />
                    </div>
                    <div>
                      <Label>Sähköposti</Label>
                      <Input type="email" value={companyForm.email} onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })} />
                    </div>
                    <div>
                      <Label>Puhelin</Label>
                      <Input value={companyForm.phone} onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })} />
                    </div>
                    <Button onClick={handleSaveCompany} className="w-full">
                      {editingCompany ? "Tallenna" : "Lisää"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {companies.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Ei huoltoyhtiöitä lisättynä</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {companies.map((company) => {
                const companyAssignments = assignments.filter((a) => a.maintenance_company_id === company.id);
                const assignedAptIds = companyAssignments.map((a) => a.apartment_id);
                const unassignedApts = apartmentList.filter((a) => !assignedAptIds.includes(a.id));

                return (
                  <Card key={company.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {company.name}
                        </CardTitle>
                        {!isViewer && (
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => {
                              setEditingCompany(company);
                              setCompanyForm({ name: company.name, email: company.email || "", phone: company.phone || "" });
                              setShowCompanyDialog(true);
                            }}>
                              Muokkaa
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteCompany(company.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        {company.email && (
                          <span className="flex items-center gap-1">
                            <AtSign className="w-3 h-3" />
                            {company.email}
                          </span>
                        )}
                        {company.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {company.phone}
                          </span>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Liitetyt huoneistot</Label>
                        {companyAssignments.length === 0 ? (
                          <p className="text-sm text-muted-foreground mt-1">Ei liitettyjä huoneistoja</p>
                        ) : (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {companyAssignments.map((assignment) => (
                              <Badge key={assignment.id} variant="secondary" className="gap-1">
                                {getApartmentName(assignment.apartment_id)}
                                {assignment.contact_email_override && (
                                  <span className="text-xs opacity-70">({assignment.contact_email_override})</span>
                                )}
                                {!isViewer && (
                                  <button
                                    onClick={() => handleUnassignApartment(assignment.id)}
                                    className="ml-1 hover:text-destructive"
                                  >
                                    ×
                                  </button>
                                )}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {!isViewer && unassignedApts.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Select onValueChange={(aptId) => handleAssignApartment(company.id, aptId)}>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Lisää huoneisto..." />
                            </SelectTrigger>
                            <SelectContent>
                              {unassignedApts.map((apt) => (
                                <SelectItem key={apt.id} value={apt.id}>{apt.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ── Notes sub-component ──
const TicketNotes = ({ notes, onSave, isViewer }: { notes: string; onSave: (n: string) => void; isViewer: boolean }) => {
  const [value, setValue] = useState(notes);
  const [dirty, setDirty] = useState(false);

  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        onChange={(e) => { setValue(e.target.value); setDirty(true); }}
        rows={4}
        disabled={isViewer}
        placeholder="Lisää muistiinpanoja..."
      />
      {dirty && !isViewer && (
        <Button size="sm" onClick={() => { onSave(value); setDirty(false); }}>
          Tallenna muistiinpanot
        </Button>
      )}
    </div>
  );
};

export default TicketAdmin;
