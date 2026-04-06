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
import { Loader2, Plus, AlertTriangle, Clock, CheckCircle2, RefreshCw, ArrowLeft, Mail, Trash2, Building2, Phone, AtSign, CalendarDays, Send, AlertCircle, FileText, Tag, History, BarChart3, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getAllDefaultPropertyDetails } from "@/data/propertyDetails";

// ── Types ──
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
  category_id: string | null;
  property_id: string | null;
  email_override: string | null;
  target_type: string;
}

interface MaintenanceCompany {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company_types: string[];
  created_at: string;
}

interface ApartmentAssignment {
  id: string;
  apartment_id: string;
  maintenance_company_id: string;
  contact_email_override: string | null;
  property_id: string | null;
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

interface TicketCategory {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

interface Property {
  id: string;
  name: string;
  business_id: string | null;
  contact_email: string | null;
  created_at: string;
}

interface TicketHistoryEntry {
  id: string;
  ticket_id: string;
  changed_at: string;
  changed_by: string | null;
  field_changed: string | null;
  old_value: string | null;
  new_value: string | null;
  action_type: string;
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
const apartmentList = apartments
  .filter((p) => p.id && p.id.length > 0)
  .map((p) => ({
    id: p.id,
    name: p.name || p.id,
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

          let bg = "bg-muted/60 text-muted-foreground";
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

// ── Category Badge ──
const CategoryBadge = ({ category }: { category: TicketCategory | undefined }) => {
  if (!category) return null;
  return (
    <Badge style={{ backgroundColor: category.color, color: "#fff" }} className="text-xs">
      {category.name}
    </Badge>
  );
};

// ── History Timeline ──
const HistoryTimeline = ({ history }: { history: TicketHistoryEntry[] }) => {
  const fieldLabel = (field: string | null) => {
    const map: Record<string, string> = {
      status: "Tila",
      priority: "Prioriteetti",
      type: "Tyyppi",
      category_id: "Kategoria",
      notes: "Muistiinpanot",
      email_override: "Sähköpostiohjaus",
      target_type: "Kohdetyyppi",
      property_id: "Kiinteistö",
    };
    return field ? map[field] || field : "";
  };

  const actionIcon = (action: string) => {
    switch (action) {
      case "created": return "🆕";
      case "email_sent": return "📧";
      case "resolved": return "✅";
      default: return "✏️";
    }
  };

  const actionLabel = (entry: TicketHistoryEntry) => {
    switch (entry.action_type) {
      case "created": return "Tiketti luotu";
      case "email_sent": return entry.new_value || "Sähköposti lähetetty";
      case "resolved": return "Ratkaistu";
      default:
        if (entry.field_changed === "notes") return "Muistiinpanot päivitetty";
        return `${fieldLabel(entry.field_changed)}: ${entry.old_value || "–"} → ${entry.new_value || "–"}`;
    }
  };

  if (history.length === 0) return <p className="text-sm text-muted-foreground">Ei historiaa</p>;

  return (
    <div className="space-y-0">
      {history.map((entry, i) => (
        <div key={entry.id} className="flex gap-3 pb-3">
          <div className="flex flex-col items-center">
            <span className="text-sm">{actionIcon(entry.action_type)}</span>
            {i < history.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm">{actionLabel(entry)}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(entry.changed_at).toLocaleDateString("fi-FI")} klo {new Date(entry.changed_at).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}
              {entry.changed_by && ` — ${entry.changed_by}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const TicketAdmin = ({ isViewer }: TicketAdminProps) => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [companies, setCompanies] = useState<MaintenanceCompany[]>([]);
  const [assignments, setAssignments] = useState<ApartmentAssignment[]>([]);
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [emailLog, setEmailLog] = useState<EmailLog[]>([]);
  const [ticketHistory, setTicketHistory] = useState<TicketHistoryEntry[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCompanyDialog, setShowCompanyDialog] = useState(false);
  const [editingCompany, setEditingCompany] = useState<MaintenanceCompany | null>(null);

  // Empty night data
  const [emptyNightData, setEmptyNightData] = useState<{ emptyNights: string[]; nextEmpty: string | null } | null>(null);
  const [loadingEmptyNights, setLoadingEmptyNights] = useState(false);
  const [sendingReminder, setSendingReminder] = useState(false);

  // Availability
  const [ticketAvailability, setTicketAvailability] = useState<AvailabilityData | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [createFormAvailability, setCreateFormAvailability] = useState<AvailabilityData | null>(null);
  const [loadingCreateAvail, setLoadingCreateAvail] = useState(false);
  const [availabilityIndicators, setAvailabilityIndicators] = useState<Record<string, { indicator: "back_to_back" | "empty" | "full" }>>({});
  const [_loadingIndicators, setLoadingIndicators] = useState(false);

  // Email preview
  const [emailPreview, setEmailPreview] = useState<{ email: string | null; source: string } | null>(null);
  const [loadingEmailPreview, setLoadingEmailPreview] = useState(false);

  // Filters
  const [filterApartment, setFilterApartment] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // New ticket form
  const [newTicket, setNewTicket] = useState({
    apartment_id: "",
    title: "",
    description: "",
    type: "seasonal" as "seasonal" | "urgent",
    priority: "1" as "1" | "2",
    send_email: false,
    category_id: "",
    target_type: "apartment" as "apartment" | "property",
    property_id: "",
    email_override: "",
  });

  // Company form
  const [companyForm, setCompanyForm] = useState({ name: "", email: "", phone: "", company_types: ["kiinteistohuolto"] as string[] });

  // Category form
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TicketCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: "", color: "#6B7280" });

  // Property form
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [propertyForm, setPropertyForm] = useState({ name: "", business_id: "", contact_email: "" });

  // PDF Export
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showPropertyReportDialog, setShowPropertyReportDialog] = useState(false);
  const [exportFilters, setExportFilters] = useState({
    companyId: "all",
    apartmentIds: [] as string[],
    status: "both" as "open" | "in_progress" | "both",
    dateFrom: "",
    dateTo: "",
  });
  const [reportFilters, setReportFilters] = useState({
    dateFrom: "",
    dateTo: "",
    propertyId: "all",
    apartmentId: "all",
    categoryId: "all",
    type: "all",
    status: "all",
    groupBy: "apartment" as "apartment" | "property" | "category" | "month",
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

  const fetchCategories = async () => {
    try {
      const data = await callApi("list_categories");
      setCategories(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProperties = async () => {
    try {
      const data = await callApi("list_properties");
      setProperties(data || []);
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
    await Promise.all([fetchTickets(), fetchCompanies(), fetchCategories(), fetchProperties()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      fetchAvailabilityIndicators(tickets);
    }
  }, [tickets]);

  useEffect(() => {
    if (newTicket.apartment_id && newTicket.send_email) {
      checkEmail(newTicket.apartment_id, newTicket.email_override);
    } else {
      setEmailPreview(null);
    }
  }, [newTicket.apartment_id, newTicket.send_email, newTicket.email_override]);

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

  const checkEmail = async (apartmentId: string, ticketOverride?: string) => {
    setLoadingEmailPreview(true);
    try {
      const data = await callApi("resolve_email", { apartment_id: apartmentId, ticket_email_override: ticketOverride || undefined });
      setEmailPreview(data);
    } catch (e) {
      console.error(e);
      setEmailPreview(null);
    }
    setLoadingEmailPreview(false);
  };

  const handleCreateTicket = async () => {
    if (newTicket.target_type === "apartment" && !newTicket.apartment_id) {
      toast({ title: "Virhe", description: "Valitse huoneisto", variant: "destructive" });
      return;
    }
    if (newTicket.target_type === "property" && !newTicket.property_id) {
      toast({ title: "Virhe", description: "Valitse kiinteistö", variant: "destructive" });
      return;
    }
    if (!newTicket.title.trim()) {
      toast({ title: "Virhe", description: "Otsikko on pakollinen", variant: "destructive" });
      return;
    }
    try {
      const ticketData: any = {
        title: newTicket.title,
        description: newTicket.description || null,
        type: newTicket.type,
        priority: newTicket.priority,
        send_email: newTicket.send_email,
        target_type: newTicket.target_type,
        apartment_id: newTicket.target_type === "apartment" ? newTicket.apartment_id : (newTicket.apartment_id || apartmentList[0]?.id || "property"),
        category_id: newTicket.category_id || null,
        property_id: newTicket.target_type === "property" ? newTicket.property_id : null,
        email_override: newTicket.email_override || null,
      };

      const result = await callApi("create_ticket", { ticket: ticketData });
      
      if (result?.emailResult) {
        if (result.emailResult.sent) {
          toast({ title: "Tiketti luotu", description: `Sähköposti lähetetty: ${result.emailResult.email}` });
        } else if (result.emailResult.error === "no_email_found") {
          toast({ title: "Tiketti luotu", description: "⚠️ Sähköpostia ei lähetetty: sähköpostia ei löytynyt", variant: "destructive" });
        } else {
          toast({ title: "Tiketti luotu", description: `⚠️ Sähköpostin lähetys epäonnistui`, variant: "destructive" });
        }
      } else {
        toast({ title: "Tiketti luotu" });
      }
      
      setShowCreateDialog(false);
      setNewTicket({ apartment_id: "", title: "", description: "", type: "seasonal", priority: "1", send_email: false, category_id: "", target_type: "apartment", property_id: "", email_override: "" });
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
        fetchTicketHistory(id);
      }
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleUpdateTicketNotes = async (id: string, notes: string) => {
    try {
      await callApi("update_ticket", { id, updates: { notes } });
      toast({ title: "Muistiinpanot tallennettu" });
      if (selectedTicket) {
        setSelectedTicket({ ...selectedTicket, notes });
        fetchTicketHistory(id);
      }
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleUpdateTicketEmailOverride = async (id: string, email_override: string) => {
    try {
      await callApi("update_ticket", { id, updates: { email_override: email_override || null } });
      toast({ title: "Sähköpostiohjaus päivitetty" });
      if (selectedTicket) {
        setSelectedTicket({ ...selectedTicket, email_override: email_override || null });
        fetchTicketHistory(id);
      }
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

  const fetchTicketHistory = async (ticketId: string) => {
    try {
      const data = await callApi("get_ticket_history", { ticket_id: ticketId });
      setTicketHistory(data || []);
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
        toast({ title: "Virhe", description: "Sähköpostiosoitetta ei löydy", variant: "destructive" });
      } else {
        toast({ title: "Virhe", description: `Lähetys epäonnistui`, variant: "destructive" });
      }
      if (selectedTicket) {
        fetchEmailLog(selectedTicket.id);
        fetchTicketHistory(selectedTicket.id);
      }
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
    setSendingReminder(false);
  };

  const openTicketDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEmptyNightData(null);
    setTicketAvailability(null);
    setTicketHistory([]);
    fetchEmailLog(ticket.id);
    fetchTicketHistory(ticket.id);
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
      setCompanyForm({ name: "", email: "", phone: "", company_types: ["kiinteistohuolto"] });
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

  // Category CRUD
  const handleSaveCategory = async () => {
    if (!categoryForm.name.trim()) {
      toast({ title: "Virhe", description: "Nimi on pakollinen", variant: "destructive" });
      return;
    }
    try {
      if (editingCategory) {
        await callApi("update_category", { id: editingCategory.id, updates: categoryForm });
        toast({ title: "Kategoria päivitetty" });
      } else {
        await callApi("create_category", { category: categoryForm });
        toast({ title: "Kategoria lisätty" });
      }
      setShowCategoryDialog(false);
      setEditingCategory(null);
      setCategoryForm({ name: "", color: "#6B7280" });
      fetchCategories();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Haluatko varmasti poistaa tämän kategorian?")) return;
    try {
      await callApi("delete_category", { id });
      toast({ title: "Kategoria poistettu" });
      fetchCategories();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  // Property CRUD
  const handleSaveProperty = async () => {
    if (!propertyForm.name.trim()) {
      toast({ title: "Virhe", description: "Nimi on pakollinen", variant: "destructive" });
      return;
    }
    try {
      if (editingProperty) {
        await callApi("update_property", { id: editingProperty.id, updates: propertyForm });
        toast({ title: "Kiinteistö päivitetty" });
      } else {
        await callApi("create_property", { property: propertyForm });
        toast({ title: "Kiinteistö lisätty" });
      }
      setShowPropertyDialog(false);
      setEditingProperty(null);
      setPropertyForm({ name: "", business_id: "", contact_email: "" });
      fetchProperties();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Haluatko varmasti poistaa tämän kiinteistön?")) return;
    try {
      await callApi("delete_property", { id });
      toast({ title: "Kiinteistö poistettu" });
      fetchProperties();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleAssignApartmentToProperty = async (assignmentId: string, propertyId: string | null) => {
    try {
      await callApi("assign_apartment_to_property", { assignment_id: assignmentId, property_id: propertyId });
      toast({ title: "Kiinteistö päivitetty" });
      fetchCompanies();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  // ── PDF EXPORT (Kausihuolto) ──
  const generatePdf = (openInNewTab = false) => {
    let exportTickets = tickets.filter((t) => t.type === "seasonal");

    if (exportFilters.status === "open") {
      exportTickets = exportTickets.filter((t) => t.status === "open");
    } else if (exportFilters.status === "in_progress") {
      exportTickets = exportTickets.filter((t) => t.status === "in_progress");
    } else {
      exportTickets = exportTickets.filter((t) => t.status !== "resolved");
    }

    if (exportFilters.companyId !== "all") {
      const companyApts = assignments
        .filter((a) => a.maintenance_company_id === exportFilters.companyId)
        .map((a) => a.apartment_id);
      exportTickets = exportTickets.filter((t) => companyApts.includes(t.apartment_id));
    }

    if (exportFilters.apartmentIds.length > 0) {
      exportTickets = exportTickets.filter((t) => exportFilters.apartmentIds.includes(t.apartment_id));
    }

    if (exportFilters.dateFrom) {
      exportTickets = exportTickets.filter((t) => t.created_at >= exportFilters.dateFrom);
    }
    if (exportFilters.dateTo) {
      const toEnd = exportFilters.dateTo + "T23:59:59";
      exportTickets = exportTickets.filter((t) => t.created_at <= toEnd);
    }

    if (exportTickets.length === 0) {
      toast({ title: "Ei tikettejä", description: "Valituilla suodattimilla ei löytynyt tikettejä.", variant: "destructive" });
      return;
    }

    const doc = createTicketsPdf(exportTickets, "Leville – Kausihuoltoraportti", exportFilters);
    const dateStr = new Date().toISOString().split("T")[0];

    if (openInNewTab) {
      const blob = doc.output("blob");
      window.open(URL.createObjectURL(blob), "_blank");
    } else {
      doc.save(`kausihuolto_${dateStr}.pdf`);
    }

    setShowExportDialog(false);
    toast({ title: "PDF luotu", description: `${exportTickets.length} tikettiä viety.` });
  };

  // ── PDF REPORT (Tikettiraportti) ──
  const generateReportPdf = (openInNewTab = false) => {
    if (!reportFilters.dateFrom || !reportFilters.dateTo) {
      toast({ title: "Virhe", description: "Valitse ajanjakso", variant: "destructive" });
      return;
    }

    let reportTickets = [...tickets];

    reportTickets = reportTickets.filter((t) => t.created_at >= reportFilters.dateFrom && t.created_at <= reportFilters.dateTo + "T23:59:59");

    if (reportFilters.propertyId !== "all") {
      const propApts = assignments.filter(a => a.property_id === reportFilters.propertyId).map(a => a.apartment_id);
      reportTickets = reportTickets.filter(t => propApts.includes(t.apartment_id) || t.property_id === reportFilters.propertyId);
    }
    if (reportFilters.apartmentId !== "all") {
      reportTickets = reportTickets.filter(t => t.apartment_id === reportFilters.apartmentId);
    }
    if (reportFilters.categoryId !== "all") {
      reportTickets = reportTickets.filter(t => t.category_id === reportFilters.categoryId);
    }
    if (reportFilters.type !== "all") {
      reportTickets = reportTickets.filter(t => t.type === reportFilters.type);
    }
    if (reportFilters.status !== "all") {
      reportTickets = reportTickets.filter(t => t.status === reportFilters.status);
    }

    if (reportTickets.length === 0) {
      toast({ title: "Ei tikettejä", description: "Valituilla suodattimilla ei löytynyt tikettejä.", variant: "destructive" });
      return;
    }

    const doc = createReportPdf(reportTickets, reportFilters);
    const fn = `tikettiraportti_${reportFilters.dateFrom}_${reportFilters.dateTo}.pdf`;

    if (openInNewTab) {
      window.open(URL.createObjectURL(doc.output("blob")), "_blank");
    } else {
      doc.save(fn);
    }

    setShowReportDialog(false);
    toast({ title: "Raportti luotu" });
  };

  // ── PDF: Kiinteistöraportti ──
  const generatePropertyReportPdf = (openInNewTab = false) => {
    const unresolvedTickets = tickets.filter(t => t.status !== "resolved");

    if (unresolvedTickets.length === 0) {
      toast({ title: "Ei avoimia tikettejä", variant: "destructive" });
      return;
    }

    const doc = createPropertyReportPdf(unresolvedTickets);
    const dateStr = new Date().toISOString().split("T")[0];

    if (openInNewTab) {
      window.open(URL.createObjectURL(doc.output("blob")), "_blank");
    } else {
      doc.save(`kiinteistoraportti_${dateStr}.pdf`);
    }

    setShowPropertyReportDialog(false);
    toast({ title: "Kiinteistöraportti luotu" });
  };

  // ── PDF Helper Functions ──
  const getCategoryName = (id: string | null) => categories.find(c => c.id === id)?.name || "–";
  const getPropertyName = (id: string | null) => properties.find(p => p.id === id)?.name || "–";
  const statusLabel = (s: string) => {
    switch (s) { case "open": return "Avoin"; case "in_progress": return "Käsittelyssä"; case "resolved": return "Ratkaistu"; default: return s; }
  };
  const getCompanyForApt = (aptId: string) => {
    const assignment = assignments.find((a) => a.apartment_id === aptId);
    if (!assignment) return "–";
    const company = companies.find((c) => c.id === assignment.maintenance_company_id);
    return company?.name || "–";
  };
  const getPropertyForApt = (aptId: string) => {
    const assignment = assignments.find(a => a.apartment_id === aptId);
    return assignment?.property_id ? properties.find(p => p.id === assignment.property_id) : null;
  };

  const createTicketsPdf = (exportTickets: Ticket[], title: string, _filters?: any) => {
    const grouped: Record<string, Ticket[]> = {};
    for (const t of exportTickets) {
      if (!grouped[t.apartment_id]) grouped[t.apartment_id] = [];
      grouped[t.apartment_id].push(t);
    }

    const sortedApts = Object.keys(grouped).sort((a, b) => getApartmentName(a).localeCompare(getApartmentName(b)));

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;
    const currentYear = new Date().getFullYear();
    let pageNum = 1;

    const addFooter = () => {
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Leville.net \u2013 Kausihuolto ${currentYear}`, margin, pageHeight - 8);
      doc.text(`Sivu ${pageNum}`, pageWidth - margin, pageHeight - 8, { align: "right" });
    };

    const checkPage = (needed: number) => {
      if (y + needed > pageHeight - 20) {
        addFooter();
        doc.addPage();
        pageNum++;
        y = margin;
      }
    };

    doc.setFontSize(18);
    doc.setTextColor(30);
    doc.text(title, margin, y + 6);
    y += 14;

    doc.setFontSize(9);
    doc.setTextColor(100);
    const now = new Date();
    doc.text(`Luotu: ${now.toLocaleDateString("fi-FI")} klo ${now.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}`, margin, y);
    y += 5;
    doc.text(`Tikettej\u00e4 yhteens\u00e4: ${exportTickets.length}`, margin, y);
    y += 10;

    for (const aptId of sortedApts) {
      const aptTickets = grouped[aptId];
      const aptName = getApartmentName(aptId);
      const companyName = getCompanyForApt(aptId);

      checkPage(25);

      doc.setFillColor(37, 99, 235);
      doc.rect(margin, y, contentWidth, 12, "F");
      doc.setFontSize(11);
      doc.setTextColor(255);
      doc.text(`HUONEISTO: ${aptName}`, margin + 3, y + 5);
      doc.setFontSize(9);
      doc.text(`Huoltoyhti\u00f6: ${companyName}`, margin + 3, y + 10);
      y += 16;

      doc.setTextColor(30);

      for (let i = 0; i < aptTickets.length; i++) {
        const t = aptTickets[i];
        checkPage(35);

        doc.setFontSize(10);
        doc.setDrawColor(100);
        doc.rect(margin + 1, y - 3, 3.5, 3.5);
        doc.setTextColor(30);

        const catName = getCategoryName(t.category_id);
        doc.text(`${t.title}${catName !== "–" ? ` [${catName}]` : ""}`, margin + 7, y);
        y += 6;

        doc.setFontSize(8);
        doc.setTextColor(80);

        if (t.description) {
          const descLines = doc.splitTextToSize(`Kuvaus: ${t.description}`, contentWidth - 10);
          checkPage(descLines.length * 4 + 4);
          doc.text(descLines, margin + 7, y);
          y += descLines.length * 4 + 2;
        }

        doc.text(`Prioriteetti: ${t.priority === "1" ? "Normaali" : "Muistutus"}   |   Tila: ${statusLabel(t.status)}   |   Luotu: ${new Date(t.created_at).toLocaleDateString("fi-FI")}`, margin + 7, y);
        y += 5;

        if (t.notes) {
          const noteLines = doc.splitTextToSize(`Muistiinpanot: ${t.notes}`, contentWidth - 10);
          checkPage(noteLines.length * 4 + 2);
          doc.text(noteLines, margin + 7, y);
          y += noteLines.length * 4 + 2;
        }

        if (i < aptTickets.length - 1) {
          checkPage(4);
          doc.setDrawColor(200);
          doc.line(margin + 5, y, pageWidth - margin - 5, y);
          y += 5;
        }
      }
      y += 8;
    }

    addFooter();

    const totalPages = pageNum;
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFillColor(255, 255, 255);
      doc.rect(pageWidth - margin - 30, pageHeight - 12, 30, 6, "F");
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Sivu ${p} / ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
    }

    return doc;
  };

  const createReportPdf = (reportTickets: Ticket[], filters: typeof reportFilters) => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin;
    let pageNum = 1;

    const addFooter = () => {
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Leville.net \u2013 Tikettiraportti ${filters.dateFrom} \u2013 ${filters.dateTo}`, margin, pageHeight - 8);
      doc.text(`Sivu ${pageNum}`, pageWidth - margin, pageHeight - 8, { align: "right" });
    };

    const checkPage = (needed: number) => {
      if (y + needed > pageHeight - 20) {
        addFooter();
        doc.addPage();
        pageNum++;
        y = margin;
      }
    };

    // Header
    doc.setFontSize(16);
    doc.setTextColor(30);
    doc.text("Leville \u2013 Tikettiraportti", margin, y + 6);
    y += 12;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Ajanjakso: ${filters.dateFrom} \u2013 ${filters.dateTo}`, margin, y);
    y += 5;
    doc.text(`Tikettej\u00e4: ${reportTickets.length}`, margin, y);
    y += 10;

    // Summary table
    const resolvedTickets = reportTickets.filter(t => t.status === "resolved");
    const avgDuration = resolvedTickets.length > 0
      ? Math.round(resolvedTickets.reduce((sum, t) => sum + (new Date(t.updated_at).getTime() - new Date(t.created_at).getTime()) / (1000 * 60 * 60 * 24), 0) / resolvedTickets.length)
      : 0;

    doc.setFontSize(9);
    doc.setTextColor(30);
    doc.text(`Ratkaistuja: ${resolvedTickets.length}   |   Keskim. k\u00e4sittelyaika: ${avgDuration} pv`, margin, y);
    y += 8;

    // Category summary
    const catCounts: Record<string, number> = {};
    for (const t of reportTickets) {
      const cat = getCategoryName(t.category_id);
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    }
    doc.text("Kategorioittain: " + Object.entries(catCounts).map(([k, v]) => `${k}: ${v}`).join(", "), margin, y);
    y += 10;

    // Ticket list
    for (const t of reportTickets) {
      checkPage(20);
      doc.setFontSize(9);
      doc.setTextColor(30);
      doc.text(`\u2022 ${getApartmentName(t.apartment_id)} | ${getCategoryName(t.category_id)} | ${t.title}`, margin, y);
      y += 4;
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(`  ${t.type === "urgent" ? "Kiireellinen" : "Kausihuolto"} | P${t.priority} | ${statusLabel(t.status)} | ${new Date(t.created_at).toLocaleDateString("fi-FI")}${t.status === "resolved" ? ` \u2013 ${new Date(t.updated_at).toLocaleDateString("fi-FI")}` : ""}`, margin + 2, y);
      y += 6;
    }

    addFooter();
    const totalPages = pageNum;
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFillColor(255, 255, 255);
      doc.rect(pageWidth - margin - 30, pageHeight - 12, 30, 6, "F");
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Sivu ${p} / ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
    }

    return doc;
  };

  const createPropertyReportPdf = (allTickets: Ticket[]) => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;
    let pageNum = 1;

    const addFooter = () => {
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Leville.net \u2013 Kiinteist\u00f6raportti`, margin, pageHeight - 8);
      doc.text(`Sivu ${pageNum}`, pageWidth - margin, pageHeight - 8, { align: "right" });
    };

    const checkPage = (needed: number) => {
      if (y + needed > pageHeight - 20) {
        addFooter();
        doc.addPage();
        pageNum++;
        y = margin;
      }
    };

    doc.setFontSize(16);
    doc.setTextColor(30);
    doc.text("Leville \u2013 Kiinteist\u00f6raportti", margin, y + 6);
    y += 12;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Luotu: ${new Date().toLocaleDateString("fi-FI")}   |   Avoimet tiketit: ${allTickets.length}`, margin, y);
    y += 10;

    // Group tickets by property → apartment → category
    const propGroups: Record<string, { property: Property | null; aptGroups: Record<string, Ticket[]> }> = {};

    for (const t of allTickets) {
      const prop = getPropertyForApt(t.apartment_id);
      const propKey = prop?.id || "__unassigned__";
      if (!propGroups[propKey]) {
        propGroups[propKey] = { property: prop || null, aptGroups: {} };
      }
      if (!propGroups[propKey].aptGroups[t.apartment_id]) {
        propGroups[propKey].aptGroups[t.apartment_id] = [];
      }
      propGroups[propKey].aptGroups[t.apartment_id].push(t);
    }

    // Sort: named properties first, then unassigned
    const sortedPropKeys = Object.keys(propGroups).sort((a, b) => {
      if (a === "__unassigned__") return 1;
      if (b === "__unassigned__") return -1;
      return (propGroups[a].property?.name || "").localeCompare(propGroups[b].property?.name || "");
    });

    for (let pi = 0; pi < sortedPropKeys.length; pi++) {
      const propKey = sortedPropKeys[pi];
      const { property, aptGroups } = propGroups[propKey];
      const propName = property?.name || "M\u00e4\u00e4rittelem\u00e4t\u00f6n kiinteist\u00f6";
      const totalCount = Object.values(aptGroups).flat().length;

      if (pi > 0) {
        addFooter();
        doc.addPage();
        pageNum++;
        y = margin;
      }

      // Property header
      checkPage(20);
      doc.setFillColor(30, 64, 175);
      doc.rect(margin, y, contentWidth, 14, "F");
      doc.setFontSize(12);
      doc.setTextColor(255);
      doc.text(propName, margin + 3, y + 6);
      doc.setFontSize(9);
      if (property?.business_id) doc.text(`Y-tunnus: ${property.business_id}`, margin + 3, y + 11);
      doc.text(`Avoimet tiketit: ${totalCount}`, pageWidth - margin - 3, y + 6, { align: "right" });
      y += 18;

      const sortedApts = Object.keys(aptGroups).sort((a, b) => getApartmentName(a).localeCompare(getApartmentName(b)));

      for (const aptId of sortedApts) {
        const aptTickets = aptGroups[aptId];
        checkPage(15);

        doc.setFillColor(229, 231, 235);
        doc.rect(margin + 2, y, contentWidth - 4, 8, "F");
        doc.setFontSize(10);
        doc.setTextColor(30);
        doc.text(getApartmentName(aptId), margin + 5, y + 5.5);
        y += 12;

        // Group by category
        const catGroups: Record<string, Ticket[]> = {};
        for (const t of aptTickets) {
          const cat = getCategoryName(t.category_id);
          if (!catGroups[cat]) catGroups[cat] = [];
          catGroups[cat].push(t);
        }

        for (const [cat, catTickets] of Object.entries(catGroups)) {
          checkPage(10);
          doc.setFontSize(8);
          doc.setTextColor(100);
          doc.text(`\u25B8 ${cat}`, margin + 5, y);
          y += 4;

          for (const t of catTickets) {
            checkPage(12);
            doc.setFontSize(8);
            doc.setTextColor(30);
            doc.rect(margin + 8, y - 2.5, 2.5, 2.5);
            doc.text(`${t.title} (${statusLabel(t.status)})`, margin + 13, y);
            y += 4;
            if (t.description) {
              doc.setTextColor(100);
              const desc = doc.splitTextToSize(t.description, contentWidth - 20);
              checkPage(desc.length * 3.5);
              doc.text(desc, margin + 13, y);
              y += desc.length * 3.5 + 1;
            }
          }
          y += 2;
        }
        y += 4;
      }
    }

    addFooter();
    const totalPages = pageNum;
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFillColor(255, 255, 255);
      doc.rect(pageWidth - margin - 30, pageHeight - 12, 30, 6, "F");
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Sivu ${p} / ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
    }

    return doc;
  };

  // ── Filtered tickets ──
  const filteredTickets = tickets.filter((t) => {
    if (filterApartment !== "all" && t.apartment_id !== filterApartment) return false;
    if (filterType !== "all" && t.type !== filterType) return false;
    if (filterPriority !== "all" && t.priority !== filterPriority) return false;
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    if (filterCategory !== "all" && t.category_id !== filterCategory) return false;
    return true;
  });

  const openCount = tickets.filter((t) => t.status === "open").length;
  const urgentCount = tickets.filter((t) => t.type === "urgent" && t.status !== "resolved").length;
  const reminderCount = tickets.filter((t) => t.priority === "2" && t.status !== "resolved").length;

  const statusBadge = (status: string) => {
    switch (status) {
      case "open": return <Badge variant="destructive">Avoin</Badge>;
      case "in_progress": return <Badge className="bg-amber-500 text-white">Käsittelyssä</Badge>;
      case "resolved": return <Badge variant="secondary">Ratkaistu</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const typeBadge = (type: string) => {
    return type === "urgent" ? (
      <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Kiireellinen</Badge>
    ) : (
      <Badge variant="outline">Kausihuolto</Badge>
    );
  };

  const getScheduledReminderText = () => {
    if (!emptyNightData?.nextEmpty) return null;
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    if (emptyNightData.nextEmpty === today) return "Muistutus ajastettu: tänään klo 07:00";
    if (emptyNightData.nextEmpty === tomorrow) return "Muistutus ajastettu: tänään klo 18:00";
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
    const ticketCategory = categories.find(c => c.id === selectedTicket.category_id);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => { setSelectedTicket(null); setEmptyNightData(null); setTicketAvailability(null); setTicketHistory([]); }}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Takaisin
          </Button>
          <h2 className="text-lg font-semibold">{selectedTicket.title}</h2>
          {statusBadge(selectedTicket.status)}
          {typeBadge(selectedTicket.type)}
          <CategoryBadge category={ticketCategory} />
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
                {selectedTicket.target_type === "property" && selectedTicket.property_id && (
                  <div>
                    <Label className="text-muted-foreground text-xs">Kiinteistö</Label>
                    <p className="font-medium">{getPropertyName(selectedTicket.property_id)}</p>
                  </div>
                )}
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

                {/* Email override display */}
                {selectedTicket.email_override && (
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                    <span className="font-medium text-blue-800">Ilmoitukset ohjattu: </span>
                    <span className="text-blue-700">{selectedTicket.email_override}</span>
                  </div>
                )}

                {/* Email override edit */}
                {!isViewer && (
                  <div>
                    <Label className="text-xs">Ohjaa tiketti sähköpostiin</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="email"
                        placeholder="esim. huolto@yritys.fi"
                        defaultValue={selectedTicket.email_override || ""}
                        onBlur={(e) => {
                          if (e.target.value !== (selectedTicket.email_override || "")) {
                            handleUpdateTicketEmailOverride(selectedTicket.id, e.target.value);
                          }
                        }}
                        className="text-sm"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Tyhjennä kenttä käyttääksesi oletusosoitetta</p>
                  </div>
                )}

                <div>
                  <Label className="text-muted-foreground text-xs">Luotu</Label>
                  <p>{new Date(selectedTicket.created_at).toLocaleDateString("fi-FI")} {new Date(selectedTicket.created_at).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>

                {!isViewer && (
                  <div className="pt-2 space-y-2">
                    <Label>Muuta tila</Label>
                    <Select value={selectedTicket.status} onValueChange={(val) => handleUpdateTicketStatus(selectedTicket.id, val)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
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

            {/* Availability calendar */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Huoneiston saatavuus
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => fetchTicketAvailability(selectedTicket.apartment_id, true)} disabled={loadingAvailability}>
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
                    <MiniCalendar availability={ticketAvailability} days={selectedTicket.type === "urgent" ? 30 : 14} label={selectedTicket.type === "urgent" ? "Seuraavat 30 päivää" : "Seuraavat 14 päivää"} />
                    {ticketAvailability.backToBackWindows.length > 0 && (
                      <div className="p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                        <span className="font-medium text-amber-800">Seuraava back-to-back ikkuna: </span>
                        <span className="text-amber-700">{new Date(ticketAvailability.backToBackWindows[0]).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" })}</span>
                      </div>
                    )}
                    {ticketAvailability.cachedAt && (
                      <p className="text-[10px] text-muted-foreground">Päivitetty: {new Date(ticketAvailability.cachedAt).toLocaleString("fi-FI")}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Saatavuustietoja ei voitu hakea</p>
                )}
              </CardContent>
            </Card>

            {/* Priority 2: reminder system */}
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" />Haetaan...</div>
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
                      {getScheduledReminderText() && (
                        <p className="text-sm text-amber-700 flex items-center gap-1"><Clock className="w-3 h-3" />{getScheduledReminderText()}</p>
                      )}
                      {!isViewer && (
                        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100" onClick={() => handleSendReminder(selectedTicket.id)} disabled={sendingReminder}>
                          {sendingReminder ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
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
              <CardHeader><CardTitle className="text-base">Muistiinpanot</CardTitle></CardHeader>
              <CardContent>
                <TicketNotes notes={selectedTicket.notes || ""} onSave={(notes) => handleUpdateTicketNotes(selectedTicket.id, notes)} isViewer={isViewer} />
              </CardContent>
            </Card>

            {/* History Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Historia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HistoryTimeline history={ticketHistory} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Mail className="w-4 h-4" />Sähköpostiloki</CardTitle>
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
                          <Badge variant={log.status === "sent" ? "secondary" : "destructive"} className="text-xs">{log.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{new Date(log.sent_at).toLocaleString("fi-FI")}</p>
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
        <TabsList className="flex-wrap">
          <TabsTrigger value="tickets">Tiketit</TabsTrigger>
          <TabsTrigger value="companies">Huoltoyhtiöt</TabsTrigger>
          <TabsTrigger value="properties">Kiinteistöt</TabsTrigger>
          <TabsTrigger value="reports">Raportit</TabsTrigger>
          <TabsTrigger value="settings">Asetukset</TabsTrigger>
        </TabsList>

        {/* ── TICKETS TAB ── */}
        <TabsContent value="tickets" className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center"><Clock className="w-6 h-6 text-destructive" /></div>
                  <div><p className="text-sm text-muted-foreground">Avoimet tiketit</p><p className="text-2xl font-bold">{openCount}</p></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-amber-500" /></div>
                  <div><p className="text-sm text-muted-foreground">Kiireelliset</p><p className="text-2xl font-bold">{urgentCount}</p></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-primary" /></div>
                  <div><p className="text-sm text-muted-foreground">Muistutus tarvitaan</p><p className="text-2xl font-bold">{reminderCount}</p></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={filterApartment} onValueChange={setFilterApartment}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Huoneisto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki huoneistot</SelectItem>
                {apartmentList.map((apt) => (<SelectItem key={apt.id} value={apt.id}>{apt.name}</SelectItem>))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Tyyppi" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki tyypit</SelectItem>
                <SelectItem value="seasonal">Kausihuolto</SelectItem>
                <SelectItem value="urgent">Kiireellinen</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Kategoria" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki kategoriat</SelectItem>
                {categories.map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>))}
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[130px]"><SelectValue placeholder="Prioriteetti" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki</SelectItem>
                <SelectItem value="1">Normaali</SelectItem>
                <SelectItem value="2">Muistutus</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Tila" /></SelectTrigger>
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

            {/* PDF Export */}
            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm"><FileText className="w-4 h-4 mr-1" />Kausihuoltoraportti</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader><DialogTitle>Kausihuoltoraportti – PDF</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Huoltoyhtiö</Label>
                    <Select value={exportFilters.companyId} onValueChange={(val) => setExportFilters({ ...exportFilters, companyId: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Kaikki huoltoyhtiöt</SelectItem>
                        {companies.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Huoneistot</Label>
                    <div className="max-h-32 overflow-y-auto border rounded p-2 space-y-1 mt-1">
                      {apartmentList.map((apt) => (
                        <label key={apt.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded px-1">
                          <Checkbox checked={exportFilters.apartmentIds.includes(apt.id)} onCheckedChange={(checked) => {
                            setExportFilters((prev) => ({ ...prev, apartmentIds: checked ? [...prev.apartmentIds, apt.id] : prev.apartmentIds.filter((id) => id !== apt.id) }));
                          }} />
                          {apt.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Tila</Label>
                    <RadioGroup value={exportFilters.status} onValueChange={(val) => setExportFilters({ ...exportFilters, status: val as any })} className="flex gap-4 mt-1">
                      <div className="flex items-center space-x-1"><RadioGroupItem value="both" id="exp-both" /><Label htmlFor="exp-both" className="text-sm">Molemmat</Label></div>
                      <div className="flex items-center space-x-1"><RadioGroupItem value="open" id="exp-open" /><Label htmlFor="exp-open" className="text-sm">Avoimet</Label></div>
                      <div className="flex items-center space-x-1"><RadioGroupItem value="in_progress" id="exp-ip" /><Label htmlFor="exp-ip" className="text-sm">Käsittelyssä</Label></div>
                    </RadioGroup>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs">Luotu alkaen</Label><Input type="date" value={exportFilters.dateFrom} onChange={(e) => setExportFilters({ ...exportFilters, dateFrom: e.target.value })} /></div>
                    <div><Label className="text-xs">Luotu saakka</Label><Input type="date" value={exportFilters.dateTo} onChange={(e) => setExportFilters({ ...exportFilters, dateTo: e.target.value })} /></div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => generatePdf(false)} className="flex-1">Lataa PDF</Button>
                    <Button variant="outline" onClick={() => generatePdf(true)} className="flex-1">Avaa selaimessa</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {!isViewer && (
              <Dialog open={showCreateDialog} onOpenChange={(open) => {
                setShowCreateDialog(open);
                if (!open) {
                  setEmailPreview(null);
                  setCreateFormAvailability(null);
                  setNewTicket({ apartment_id: "", title: "", description: "", type: "seasonal", priority: "1", send_email: false, category_id: "", target_type: "apartment", property_id: "", email_override: "" });
                }
              }}>
                <DialogTrigger asChild>
                  <Button><Plus className="w-4 h-4 mr-1" />Uusi tiketti</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader><DialogTitle>Uusi tiketti</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    {/* Target type */}
                    <div>
                      <Label>Kohdetyyppi</Label>
                      <RadioGroup value={newTicket.target_type} onValueChange={(val) => setNewTicket({ ...newTicket, target_type: val as any })} className="flex gap-4 mt-1">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="apartment" id="tt-apt" /><Label htmlFor="tt-apt">Huoneisto</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="property" id="tt-prop" /><Label htmlFor="tt-prop">Kiinteistö</Label></div>
                      </RadioGroup>
                    </div>

                    {newTicket.target_type === "apartment" ? (
                      <div>
                        <Label>Huoneisto *</Label>
                        <Select value={newTicket.apartment_id} onValueChange={(val) => setNewTicket({ ...newTicket, apartment_id: val })}>
                          <SelectTrigger><SelectValue placeholder="Valitse huoneisto" /></SelectTrigger>
                          <SelectContent>{apartmentList.map((apt) => (<SelectItem key={apt.id} value={apt.id}>{apt.name}</SelectItem>))}</SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div>
                        <Label>Kiinteistö *</Label>
                        <Select value={newTicket.property_id} onValueChange={(val) => setNewTicket({ ...newTicket, property_id: val })}>
                          <SelectTrigger><SelectValue placeholder="Valitse kiinteistö" /></SelectTrigger>
                          <SelectContent>{properties.map((p) => (<SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>))}</SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label>Kategoria</Label>
                      <Select value={newTicket.category_id || "none"} onValueChange={(val) => setNewTicket({ ...newTicket, category_id: val === "none" ? "" : val })}>
                        <SelectTrigger><SelectValue placeholder="Valitse kategoria" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Ei kategoriaa</SelectItem>
                          {categories.map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>))}
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
                      <RadioGroup value={newTicket.type} onValueChange={(val) => setNewTicket({ ...newTicket, type: val as any })} className="flex gap-4 mt-1">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="seasonal" id="type-seasonal" /><Label htmlFor="type-seasonal">Kausihuolto</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="urgent" id="type-urgent" /><Label htmlFor="type-urgent">Kiireellinen</Label></div>
                      </RadioGroup>
                    </div>

                    {/* Back-to-back calendar for urgent */}
                    {newTicket.type === "urgent" && newTicket.apartment_id && newTicket.target_type === "apartment" && (
                      <div className="border rounded-lg p-3 bg-muted/30">
                        {loadingCreateAvail ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" />Haetaan saatavuustietoja...</div>
                        ) : createFormAvailability ? (
                          <div className="space-y-2">
                            <MiniCalendar availability={createFormAvailability} days={30} label="Saatavuus – seuraavat 30 päivää" />
                            {createFormAvailability.backToBackWindows.length > 0 && (
                              <p className="text-sm font-medium text-amber-700">Seuraava back-to-back ikkuna: {new Date(createFormAvailability.backToBackWindows[0]).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" })}</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Saatavuustietoja ei saatavilla</p>
                        )}
                      </div>
                    )}

                    <div>
                      <Label>Prioriteetti</Label>
                      <RadioGroup value={newTicket.priority} onValueChange={(val) => setNewTicket({ ...newTicket, priority: val as any })} className="flex gap-4 mt-1">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="1" id="prio-1" /><Label htmlFor="prio-1">1 – Normaali</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="2" id="prio-2" /><Label htmlFor="prio-2">2 – Muistutus tarvitaan</Label></div>
                      </RadioGroup>
                    </div>

                    {/* Email override */}
                    <div>
                      <Label className="text-xs">Ohjaa tiketti sähköpostiin (valinnainen)</Label>
                      <Input type="email" value={newTicket.email_override} onChange={(e) => setNewTicket({ ...newTicket, email_override: e.target.value })} placeholder="ohita oletussähköposti" className="text-sm" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch checked={newTicket.send_email} onCheckedChange={(val) => setNewTicket({ ...newTicket, send_email: val })} />
                        <Label>Lähetä sähköposti-ilmoitus</Label>
                      </div>
                      
                      {newTicket.send_email && (newTicket.apartment_id || newTicket.email_override) && (
                        <div className="ml-8">
                          {loadingEmailPreview ? (
                            <p className="text-xs text-muted-foreground flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Tarkistetaan...</p>
                          ) : emailPreview?.email ? (
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              Lähetetään: {emailPreview.email}
                              <span className="text-muted-foreground">
                                ({emailPreview.source === "ticket_override" ? "tikettiohjaus" : emailPreview.source === "override" ? "ohitusasetus" : "huoltoyhtiö"})
                              </span>
                            </p>
                          ) : (
                            <p className="text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              ⚠️ Sähköpostia ei löydy!
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
                    <TableHead>Kategoria</TableHead>
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
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">Ei tikettejä</TableCell>
                    </TableRow>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="cursor-pointer" onClick={() => openTicketDetail(ticket)}>
                        <TableCell className="font-medium">
                          <span className="flex items-center gap-1.5">
                            <AvailabilityDot indicator={availabilityIndicators[ticket.apartment_id]?.indicator} />
                            {ticket.target_type === "property" ? `🏢 ${getPropertyName(ticket.property_id)}` : getApartmentName(ticket.apartment_id)}
                          </span>
                        </TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell><CategoryBadge category={categories.find(c => c.id === ticket.category_id)} /></TableCell>
                        <TableCell>{typeBadge(ticket.type)}</TableCell>
                        <TableCell>
                          <Badge variant={ticket.priority === "2" ? "default" : "outline"}>
                            {ticket.priority === "1" ? "Normaali" : "Muistutus"}
                          </Badge>
                        </TableCell>
                        <TableCell>{statusBadge(ticket.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{new Date(ticket.created_at).toLocaleDateString("fi-FI")}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openTicketDetail(ticket); }}>Avaa</Button>
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
              <Dialog open={showCompanyDialog} onOpenChange={(open) => { setShowCompanyDialog(open); if (!open) { setEditingCompany(null); setCompanyForm({ name: "", email: "", phone: "", company_types: ["kiinteistohuolto"] }); } }}>
                <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-1" />Lisää yritys</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>{editingCompany ? "Muokkaa yritystä" : "Uusi yritys"}</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Nimi *</Label><Input value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} /></div>
                    <div>
                      <Label>Tyyppi *</Label>
                      <div className="flex gap-4 mt-1">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" checked={companyForm.company_types.includes("kiinteistohuolto")} onChange={(e) => {
                            const types = e.target.checked ? [...companyForm.company_types, "kiinteistohuolto"] : companyForm.company_types.filter(t => t !== "kiinteistohuolto");
                            setCompanyForm({ ...companyForm, company_types: types });
                          }} className="rounded" />
                          🔧 Kiinteistöhuolto
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" checked={companyForm.company_types.includes("siivous")} onChange={(e) => {
                            const types = e.target.checked ? [...companyForm.company_types, "siivous"] : companyForm.company_types.filter(t => t !== "siivous");
                            setCompanyForm({ ...companyForm, company_types: types });
                          }} className="rounded" />
                          🧹 Siivous
                        </label>
                      </div>
                    </div>
                    <div><Label>Sähköposti</Label><Input type="email" value={companyForm.email} onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })} /></div>
                    <div><Label>Puhelin</Label><Input value={companyForm.phone} onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })} /></div>
                    <Button onClick={handleSaveCompany} className="w-full">{editingCompany ? "Tallenna" : "Lisää"}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {companies.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground"><Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Ei huoltoyhtiöitä</p></CardContent></Card>
          ) : (
            <div className="space-y-6">
              {/* Group by company type */}
              {(["kiinteistohuolto", "siivous"] as const).map((type) => {
                const typeCompanies = companies.filter(c => (c.company_types || ["kiinteistohuolto"]).includes(type));
                if (typeCompanies.length === 0) return null;
                return (
                  <div key={type}>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      {type === "kiinteistohuolto" ? "🔧 Kiinteistöhuolto" : "🧹 Siivous"}
                    </h4>
                    <div className="space-y-4">
                      {typeCompanies.map((company) => {
                        const companyAssignments = assignments.filter((a) => a.maintenance_company_id === company.id);
                        const assignedAptIds = companyAssignments.map((a) => a.apartment_id);

                        return (
                          <Card key={company.id}>
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base flex items-center gap-2">
                                  <Building2 className="w-4 h-4" />{company.name}
                                  {company.company_types?.includes("kiinteistohuolto") && <Badge variant="outline" className="text-xs">🔧 Kiinteistöhuolto</Badge>}
                                  {company.company_types?.includes("siivous") && <Badge variant="outline" className="text-xs">🧹 Siivous</Badge>}
                                </CardTitle>
                                {!isViewer && (
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => { setEditingCompany(company); setCompanyForm({ name: company.name, email: company.email || "", phone: company.phone || "", company_types: company.company_types || ["kiinteistohuolto"] }); setShowCompanyDialog(true); }}>Muokkaa</Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCompany(company.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                  </div>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                {company.email && <span className="flex items-center gap-1"><AtSign className="w-3 h-3" />{company.email}</span>}
                                {company.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{company.phone}</span>}
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Liitetyt huoneistot</Label>
                                {!isViewer ? (
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-48 overflow-y-auto border rounded-md p-2">
                                    {apartmentList.map((apt) => {
                                      const isAssigned = assignedAptIds.includes(apt.id);
                                      return (
                                        <label key={apt.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded p-1">
                                          <input
                                            type="checkbox"
                                            checked={isAssigned}
                                            onChange={async () => {
                                              if (isAssigned) {
                                                const rec = companyAssignments.find(a => a.apartment_id === apt.id);
                                                if (rec) await handleUnassignApartment(rec.id);
                                              } else {
                                                await handleAssignApartment(company.id, apt.id);
                                              }
                                            }}
                                            className="rounded"
                                          />
                                          <span className="truncate">{apt.name}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  companyAssignments.length === 0 ? (
                                    <p className="text-sm text-muted-foreground mt-1">Ei liitettyjä huoneistoja</p>
                                  ) : (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {companyAssignments.map((assignment) => (
                                        <Badge key={assignment.id} variant="secondary">{getApartmentName(assignment.apartment_id)}</Badge>
                                      ))}
                                    </div>
                                  )
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── PROPERTIES TAB ── */}
        <TabsContent value="properties" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Kiinteistöt</h3>
            {!isViewer && (
              <Dialog open={showPropertyDialog} onOpenChange={(open) => { setShowPropertyDialog(open); if (!open) { setEditingProperty(null); setPropertyForm({ name: "", business_id: "", contact_email: "" }); } }}>
                <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-1" />Lisää kiinteistö</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>{editingProperty ? "Muokkaa kiinteistöä" : "Uusi kiinteistö"}</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Nimi *</Label><Input value={propertyForm.name} onChange={(e) => setPropertyForm({ ...propertyForm, name: e.target.value })} placeholder="esim. Kiinteistö Oy Glacier" /></div>
                    <div><Label>Y-tunnus</Label><Input value={propertyForm.business_id} onChange={(e) => setPropertyForm({ ...propertyForm, business_id: e.target.value })} placeholder="1234567-8" /></div>
                    <div><Label>Sähköposti</Label><Input type="email" value={propertyForm.contact_email} onChange={(e) => setPropertyForm({ ...propertyForm, contact_email: e.target.value })} /></div>
                    <Button onClick={handleSaveProperty} className="w-full">{editingProperty ? "Tallenna" : "Lisää"}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {properties.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground"><Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Ei kiinteistöjä</p></CardContent></Card>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => {
                const propAssignments = assignments.filter(a => a.property_id === property.id);
                const propTickets = tickets.filter(t => t.property_id === property.id || propAssignments.some(a => a.apartment_id === t.apartment_id));
                const openTicketCount = propTickets.filter(t => t.status !== "resolved").length;

                return (
                  <Card key={property.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {property.name}
                          {property.business_id && <span className="text-xs text-muted-foreground font-normal">({property.business_id})</span>}
                          {openTicketCount > 0 && <Badge variant="destructive" className="text-xs">{openTicketCount} avointa</Badge>}
                        </CardTitle>
                        {!isViewer && (
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => { setEditingProperty(property); setPropertyForm({ name: property.name, business_id: property.business_id || "", contact_email: property.contact_email || "" }); setShowPropertyDialog(true); }}>Muokkaa</Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProperty(property.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {property.contact_email && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground"><AtSign className="w-3 h-3" />{property.contact_email}</span>
                      )}
                      <div>
                        <Label className="text-xs text-muted-foreground">Liitetyt huoneistot</Label>
                        {propAssignments.length === 0 ? (
                          <p className="text-sm text-muted-foreground mt-1">Ei liitettyjä huoneistoja</p>
                        ) : (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {propAssignments.map((a) => (
                              <Badge key={a.id} variant="secondary">{getApartmentName(a.apartment_id)}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Assign apartments to property via checkboxes */}
                      {!isViewer && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Liitä huoneistoja kiinteistöön</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-48 overflow-y-auto border rounded-md p-2">
                            {apartmentList.map((apt) => {
                              const isAssigned = propAssignments.some(a => a.apartment_id === apt.id);
                              return (
                                <label key={apt.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded p-1">
                                  <input
                                    type="checkbox"
                                    checked={isAssigned}
                                    onChange={async () => {
                                      try {
                                        if (isAssigned) {
                                          // Remove property assignment
                                          const rec = propAssignments.find(a => a.apartment_id === apt.id);
                                          if (rec) await handleAssignApartmentToProperty(rec.id, null);
                                        } else {
                                          // Check if apartment has an existing assignment record
                                          const existingRecord = assignments.find(a => a.apartment_id === apt.id);
                                          if (existingRecord) {
                                            await handleAssignApartmentToProperty(existingRecord.id, property.id);
                                          } else {
                                            // Create a placeholder assignment just for property linking
                                            await callApi("assign_apartment_to_property_direct", { apartment_id: apt.id, property_id: property.id });
                                            toast({ title: "Huoneisto liitetty kiinteistöön" });
                                            fetchCompanies();
                                          }
                                        }
                                      } catch (e: any) {
                                        toast({ title: "Virhe", description: e.message, variant: "destructive" });
                                      }
                                    }}
                                    className="rounded"
                                  />
                                  <span className="truncate">{apt.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── REPORTS TAB ── */}
        <TabsContent value="reports" className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2"><BarChart3 className="w-5 h-5" />Raportit</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tikettiraportti */}
            <Card>
              <CardHeader><CardTitle className="text-base">Tikettiraportti</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Luo raportti tiketeistä suodattimien mukaan.</p>
                <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline"><FileText className="w-4 h-4 mr-1" />Luo tikettiraportti</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>Tikettiraportti – PDF</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label className="text-xs">Alkaen *</Label><Input type="date" value={reportFilters.dateFrom} onChange={(e) => setReportFilters({ ...reportFilters, dateFrom: e.target.value })} /></div>
                        <div><Label className="text-xs">Saakka *</Label><Input type="date" value={reportFilters.dateTo} onChange={(e) => setReportFilters({ ...reportFilters, dateTo: e.target.value })} /></div>
                      </div>
                      <div>
                        <Label>Kiinteistö</Label>
                        <Select value={reportFilters.propertyId} onValueChange={(val) => setReportFilters({ ...reportFilters, propertyId: val })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Kaikki</SelectItem>
                            {properties.map(p => (<SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Huoneisto</Label>
                        <Select value={reportFilters.apartmentId} onValueChange={(val) => setReportFilters({ ...reportFilters, apartmentId: val })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Kaikki</SelectItem>
                            {apartmentList.map(a => (<SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Kategoria</Label>
                        <Select value={reportFilters.categoryId} onValueChange={(val) => setReportFilters({ ...reportFilters, categoryId: val })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Kaikki</SelectItem>
                            {categories.map(c => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Tyyppi</Label>
                        <Select value={reportFilters.type} onValueChange={(val) => setReportFilters({ ...reportFilters, type: val })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Kaikki</SelectItem>
                            <SelectItem value="seasonal">Kausihuolto</SelectItem>
                            <SelectItem value="urgent">Kiireellinen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Tila</Label>
                        <Select value={reportFilters.status} onValueChange={(val) => setReportFilters({ ...reportFilters, status: val })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Kaikki</SelectItem>
                            <SelectItem value="open">Avoin</SelectItem>
                            <SelectItem value="in_progress">Käsittelyssä</SelectItem>
                            <SelectItem value="resolved">Ratkaistu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => generateReportPdf(false)} className="flex-1">Lataa PDF</Button>
                        <Button variant="outline" onClick={() => generateReportPdf(true)} className="flex-1">Avaa selaimessa</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Kiinteistöraportti */}
            <Card>
              <CardHeader><CardTitle className="text-base">Kiinteistöraportti</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Kaikki avoimet tiketit ryhmiteltynä kiinteistöittäin.</p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => generatePropertyReportPdf(false)}><FileText className="w-4 h-4 mr-1" />Lataa PDF</Button>
                  <Button variant="outline" onClick={() => generatePropertyReportPdf(true)}>Avaa selaimessa</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── SETTINGS TAB ── */}
        <TabsContent value="settings" className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Settings className="w-5 h-5" />Asetukset</h3>

          {/* Categories */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2"><Tag className="w-4 h-4" />Kategoriat</CardTitle>
                {!isViewer && (
                  <Dialog open={showCategoryDialog} onOpenChange={(open) => { setShowCategoryDialog(open); if (!open) { setEditingCategory(null); setCategoryForm({ name: "", color: "#6B7280" }); } }}>
                    <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-1" />Lisää</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>{editingCategory ? "Muokkaa kategoriaa" : "Uusi kategoria"}</DialogTitle></DialogHeader>
                      <div className="space-y-4">
                        <div><Label>Nimi *</Label><Input value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} /></div>
                        <div>
                          <Label>Väri</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <input type="color" value={categoryForm.color} onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })} className="w-10 h-10 rounded border cursor-pointer" />
                            <Input value={categoryForm.color} onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })} className="w-28" />
                          </div>
                        </div>
                        <Button onClick={handleSaveCategory} className="w-full">{editingCategory ? "Tallenna" : "Lisää"}</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <p className="text-sm text-muted-foreground">Ei kategorioita</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-2 border rounded px-3 py-1.5 text-sm">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.name}
                      {!isViewer && (
                        <div className="flex gap-1 ml-2">
                          <button className="text-xs hover:underline text-muted-foreground" onClick={() => { setEditingCategory(cat); setCategoryForm({ name: cat.name, color: cat.color }); setShowCategoryDialog(true); }}>Muokkaa</button>
                          <button className="text-xs hover:underline text-destructive" onClick={() => handleDeleteCategory(cat.id)}>Poista</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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
          Tallenna
        </Button>
      )}
    </div>
  );
};

export default TicketAdmin;
