import React, { useState, useEffect, useCallback } from "react";
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
import { Loader2, Plus, AlertTriangle, Clock, CheckCircle2, RefreshCw, ArrowLeft, Mail, Trash2, Building2, Phone, AtSign, CalendarDays, Send, AlertCircle, FileText, Tag, History, BarChart3, Settings, Bell } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getAllDefaultPropertyDetails } from "@/data/propertyDetails";

// ── Types ──
interface TicketApartment {
  id: string;
  ticket_id: string;
  apartment_id: string;
  apartment_name: string;
  status: string;
  resolve_token: string;
  resolved_at: string | null;
  created_at: string;
}

interface Ticket {
  id: string;
  apartment_id: string;
  title: string;
  description: string | null;
  type: "seasonal" | "urgent" | "changeover";
  priority: "1" | "2";
  guest_departure_date: string | null;
  next_guest_arrival_date: string | null;
  status: "open" | "in_progress" | "resolved";
  send_email: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  category_id: string | null;
  property_id: string | null;
  email_override: string | null;
  target_type: string;
  recurrence_months: number | null;
  recurrence_source_id: string | null;
  recurrence_note: string | null;
  assignment_type: string;
  resolved_at: string | null;
  resolved_by: string | null;
  resolve_token: string | null;
  maintenance_company_id: string | null;
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
  property_id: string;
}

interface EmailLog {
  id: string;
  ticket_id: string;
  sent_to: string;
  sent_at: string;
  status: string;
  error_message: string | null;
  scheduled_for: string | null;
  email_type: string | null;
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

// Simplified name: strips size, guest count, and type descriptions
const getSimpleName = (fullName: string): string => {
  return fullName
    .replace(/\s*\(.*?\)/g, '')
    .replace(/\s*\d+m2\s*/g, ' ')
    .replace(/\s*(Superior|One-Bedroom|Two-Bedroom|Penthouse|Studio|Apartment|House)\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getSimpleApartmentName = (id: string) => getSimpleName(getApartmentName(id));

// ── Improved Calendar Component ──
const ImprovedCalendar = ({ 
  availability, 
  days, 
  label, 
  onDateClick 
}: { 
  availability: AvailabilityData; 
  days: number; 
  label?: string;
  onDateClick?: (date: string) => void;
}) => {
  const dateKeys = Object.keys(availability.dates).sort().slice(0, days);
  const backToBackSet = new Set(availability.backToBackWindows);
  const emptySet = new Set(availability.emptyNights);

  if (dateKeys.length === 0) return null;

  // Group dates by month
  const months: { label: string; weeks: (string | null)[][] }[] = [];
  let currentMonth = "";
  let currentWeek: (string | null)[] = [];
  
  for (const date of dateKeys) {
    const d = new Date(date);
    const monthLabel = d.toLocaleDateString("fi-FI", { month: "long", year: "numeric" });
    
    if (monthLabel !== currentMonth) {
      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) currentWeek.push(null);
        months[months.length - 1].weeks.push(currentWeek);
        currentWeek = [];
      }
      currentMonth = monthLabel;
      months.push({ label: monthLabel, weeks: [] });
      // Pad start of first week
      const dayOfWeek = (d.getDay() + 6) % 7; // Mon=0
      for (let i = 0; i < dayOfWeek; i++) currentWeek.push(null);
    }
    
    const dayOfWeek = (d.getDay() + 6) % 7;
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      months[months.length - 1].weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(date);
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    months[months.length - 1].weeks.push(currentWeek);
  }

  const weekDays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

  return (
    <div className="space-y-3">
      {label && <Label className="text-xs font-medium text-muted-foreground">{label}</Label>}
      
      {months.map((month) => (
        <div key={month.label} className="space-y-1">
          <p className="text-xs font-semibold text-foreground capitalize">{month.label}</p>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 bg-muted/40">
              {weekDays.map((wd) => (
                <div key={wd} className="text-[10px] font-medium text-muted-foreground text-center py-1">{wd}</div>
              ))}
            </div>
            {month.weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7">
                {week.map((date, di) => {
                  if (!date) return <div key={di} className="h-8" />;
                  
                  const d = new Date(date);
                  const dayNum = d.getDate();
                  const isBackToBack = backToBackSet.has(date);
                  const isEmpty = emptySet.has(date);
                  const isWeekend = di >= 5;
                  const isToday = date === new Date().toISOString().split("T")[0];

                  let bgClass = "bg-red-100 text-red-800";
                  let statusLabel = "Varattu";
                  if (isBackToBack) {
                    bgClass = "bg-amber-200 text-amber-900";
                    statusLabel = "Back-to-back (vaihto)";
                  } else if (isEmpty) {
                    bgClass = "bg-emerald-100 text-emerald-800";
                    statusLabel = "Vapaa yö";
                  }

                  const clickable = !!onDateClick;

                    return (
                    <div
                      key={date}
                      title={`${d.toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })} – ${statusLabel}${clickable ? "\n🔔 Klikkaa lähettääksesi muistutus" : ""}`}
                      onClick={() => clickable && onDateClick(date)}
                      className={`
                        h-7 sm:h-8 flex items-center justify-center text-[10px] sm:text-xs font-medium relative
                        ${bgClass}
                        ${isWeekend ? "font-bold" : ""}
                        ${isToday ? "ring-2 ring-primary ring-inset" : ""}
                        ${clickable ? "cursor-pointer hover:brightness-90 active:brightness-75 hover:ring-1 hover:ring-primary/50" : ""}
                        border-t border-r last:border-r-0 border-muted/30
                      `}
                    >
                      {dayNum}
                      {clickable && (
                        <span className="absolute -top-0.5 -right-0.5 text-[8px]">🔔</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-4 text-[11px] text-muted-foreground pt-1">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-100 border border-red-200 inline-block" /> Varattu</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-100 border border-emerald-200 inline-block" /> Vapaa</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-200 border border-amber-200 inline-block" /> Vaihto</span>
        {onDateClick && <span className="flex items-center gap-1.5">🔔 Klikkaa → muistutus</span>}
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
      case "booking_updated": return "📅";
      case "reminder_scheduled": return "⏰";
      default: return "✏️";
    }
  };

  const actionLabel = (entry: TicketHistoryEntry) => {
    switch (entry.action_type) {
      case "created": return "Tiketti luotu";
      case "email_sent": return entry.new_value || "Sähköposti lähetetty";
      case "resolved": return "Ratkaistu";
      case "booking_updated": return `📅 Varausmuutos: ${entry.old_value} → ${entry.new_value}`;
      case "reminder_scheduled": return entry.new_value || "Muistutus ajastettu";
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

const ApartmentBulkAssign = ({ availableApts, propertyId, callApi, fetchApartmentAssignments, getSimpleName, toast }: {
  availableApts: { id: string; name: string }[];
  propertyId: string;
  callApi: (action: string, data?: any) => Promise<any>;
  fetchApartmentAssignments: () => Promise<void>;
  getSimpleName: (name: string) => string;
  toast: (opts: any) => void;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
          <Plus className="w-3 h-3" />Lisää huoneistoja ({availableApts.length})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 max-h-72 overflow-y-auto" align="start">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground px-1 mb-1">Valitse huoneistot</p>
          {availableApts.sort((a, b) => getSimpleName(a.name).localeCompare(getSimpleName(b.name))).map(apt => (
            <label key={apt.id} className="flex items-center gap-2 px-1 py-1 rounded hover:bg-accent cursor-pointer text-xs">
              <Checkbox
                checked={selectedIds.includes(apt.id)}
                onCheckedChange={(checked) => {
                  setSelectedIds(prev => checked ? [...prev, apt.id] : prev.filter(id => id !== apt.id));
                }}
              />
              {getSimpleName(apt.name)}
            </label>
          ))}
          <Button
            size="sm"
            className="w-full mt-2 h-7 text-xs"
            disabled={selectedIds.length === 0 || saving}
            onClick={async () => {
              setSaving(true);
              try {
                await callApi("bulk_assign_apartments_to_property", {
                  apartment_ids: selectedIds,
                  property_id: propertyId
                });
                await fetchApartmentAssignments();
                setSelectedIds([]);
                toast({ title: `${selectedIds.length} huoneistoa allokoitu kiinteistölle` });
              } catch (e) { console.error(e); }
              setSaving(false);
            }}
          >
            {saving ? "Tallennetaan..." : `Tallenna (${selectedIds.length})`}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const TicketAdmin = ({ isViewer }: TicketAdminProps) => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [companies, setCompanies] = useState<MaintenanceCompany[]>([]);
  const [_assignments, setAssignments] = useState<any[]>([]);
  const [apartmentAssignments, setApartmentAssignments] = useState<ApartmentAssignment[]>([]);
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

  // Ticket apartments (per-apartment resolution)
  const [ticketApartments, setTicketApartments] = useState<TicketApartment[]>([]);
  const [allTicketApartments, setAllTicketApartments] = useState<{ id: string; ticket_id: string; apartment_id: string; apartment_name: string }[]>([]);
  const [addApartmentIds, setAddApartmentIds] = useState<string[]>([]);
  const [addingApartments, setAddingApartments] = useState(false);

  // Filters
  const [filterApartment, setFilterApartment] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Bulk delete
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);

  // New ticket form
  const [newTicket, setNewTicket] = useState({
    apartment_id: "",
    title: "",
    description: "",
    type: "seasonal" as "seasonal" | "urgent" | "changeover",
    priority: "1" as "1" | "2",
    send_email: false,
    category_id: "",
    target_type: "apartment" as "apartment" | "property",
    property_id: "",
    email_override: "",
    recurrence_months: 0,
    recurrence_note: "",
    assignment_type: "kiinteistohuolto" as string,
    maintenance_company_id: "",
  });
  const [selectedApartmentIds, setSelectedApartmentIds] = useState<string[]>([]);

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
  const [propertyReportPropertyId, setPropertyReportPropertyId] = useState("all");
  const [pendingReminderDate, setPendingReminderDate] = useState<string>("");
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

  const fetchApartmentAssignments = async () => {
    try {
      const data = await callApi("list_apartment_assignments");
      setApartmentAssignments(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAllTicketApartments = async () => {
    try {
      const data = await callApi("list_all_ticket_apartments");
      setAllTicketApartments(data || []);
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
    await Promise.all([fetchTickets(), fetchCompanies(), fetchCategories(), fetchProperties(), fetchApartmentAssignments(), fetchAllTicketApartments()]);
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
    if (newTicket.email_override && newTicket.email_override.trim()) {
      setEmailPreview({ email: newTicket.email_override.trim(), source: "ticket_override" });
      setLoadingEmailPreview(false);
    } else if (newTicket.maintenance_company_id) {
      // Resolve email from selected company
      const company = companies.find(c => c.id === newTicket.maintenance_company_id);
      if (company?.email) {
        setEmailPreview({ email: company.email, source: "company" });
      } else {
        setEmailPreview(null);
      }
      setLoadingEmailPreview(false);
    } else {
      setEmailPreview(null);
    }
  }, [selectedApartmentIds, newTicket.email_override, newTicket.assignment_type, newTicket.maintenance_company_id, companies]);

  useEffect(() => {
    if (selectedApartmentIds.length === 1 && showCreateDialog) {
      fetchCreateFormAvailability(selectedApartmentIds[0]);
    } else {
      setCreateFormAvailability(null);
    }
  }, [selectedApartmentIds, showCreateDialog]);

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

  // (checkEmail and resolveEmailForApartment removed — email is resolved from selected company)

  const handleCreateTicket = async () => {
    if (newTicket.target_type === "apartment" && selectedApartmentIds.length === 0) {
      toast({ title: "Virhe", description: "Valitse vähintään yksi huoneisto", variant: "destructive" });
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
      const apartmentIdsToCreate = newTicket.target_type === "apartment" 
        ? selectedApartmentIds 
        : [apartmentList[0]?.id || "property"];

      // Build description with apartment list if multiple
      let finalDescription = newTicket.description || "";
      const aptNames = apartmentIdsToCreate.map(id => getSimpleApartmentName(id));
      if (apartmentIdsToCreate.length > 1) {
        finalDescription = (finalDescription ? finalDescription + "\n\n" : "") + 
          `Huoneistot (${apartmentIdsToCreate.length}): ${aptNames.join(", ")}`;
      }

      // Resolve email from selected maintenance company
      let resolvedEmail = newTicket.email_override || null;
      if (!resolvedEmail && newTicket.maintenance_company_id) {
        const company = companies.find(c => c.id === newTicket.maintenance_company_id);
        if (company?.email) resolvedEmail = company.email;
      }

      const ticketData: any = {
        title: newTicket.title,
        description: finalDescription || null,
        type: newTicket.type,
        priority: newTicket.type === "changeover" ? "1" : newTicket.priority,
        send_email: newTicket.send_email,
        target_type: newTicket.target_type,
        apartment_id: apartmentIdsToCreate[0],
        category_id: newTicket.category_id || null,
        property_id: newTicket.target_type === "property" ? newTicket.property_id : null,
        email_override: resolvedEmail,
        recurrence_months: newTicket.recurrence_months > 0 ? newTicket.recurrence_months : null,
        recurrence_note: newTicket.recurrence_note || null,
        assignment_type: newTicket.assignment_type,
        maintenance_company_id: newTicket.maintenance_company_id || null,
      };
      const aptName = aptNames.join(", ");
      // Pass apartment_ids for per-apartment tracking
      const result = await callApi("create_ticket", { 
        ticket: ticketData, 
        apartment_name: aptName,
        apartment_ids: apartmentIdsToCreate.length > 1 ? apartmentIdsToCreate : undefined,
        apartment_names: apartmentIdsToCreate.length > 1 ? Object.fromEntries(apartmentIdsToCreate.map(id => [id, getSimpleApartmentName(id)])) : undefined,
      });
      const createdTicketId = result?.ticket?.id || result?.id;
      let emailErrors = 0;
      if (pendingReminderDate && createdTicketId) {
        try { await callApi("schedule_date_reminder", { ticket_id: createdTicketId, target_date: pendingReminderDate, apartment_name: aptName }); } catch { emailErrors++; }
      } else if (result?.emailResult && !result.emailResult.sent) { emailErrors++; }
      
      toast({ 
        title: apartmentIdsToCreate.length > 1 
          ? `Tiketti luotu (${apartmentIdsToCreate.length} huoneistoa)` 
          : "Tiketti luotu",
        description: emailErrors > 0 ? `⚠️ Sähköpostin lähetys epäonnistui` : undefined 
      });
      
      setShowCreateDialog(false);
      setNewTicket({ apartment_id: "", title: "", description: "", type: "seasonal", priority: "1", send_email: false, category_id: "", target_type: "apartment", property_id: "", email_override: "", recurrence_months: 0, recurrence_note: "", assignment_type: "kiinteistohuolto", maintenance_company_id: "" });
      setSelectedApartmentIds([]);
      setEmailPreview(null);
      setCreateFormAvailability(null);
      setPendingReminderDate("");
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
      const result = await callApi("send_reminder", { ticket_id: ticketId, apartment_name: selectedTicket ? getApartmentName(selectedTicket.apartment_id) : undefined });
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

  const fetchTicketApartments = async (ticketId: string) => {
    try {
      const data = await callApi("list_ticket_apartments", { ticket_id: ticketId });
      setTicketApartments(data || []);
    } catch (e) {
      console.error(e);
      setTicketApartments([]);
    }
  };

  const handleResolveApartment = async (ticketApartmentId: string) => {
    try {
      await callApi("resolve_apartment", { ticket_apartment_id: ticketApartmentId });
      toast({ title: "Kohde kuitattu tehdyksi" });
      if (selectedTicket) {
        fetchTicketApartments(selectedTicket.id);
        fetchTicketHistory(selectedTicket.id);
        fetchTickets();
      }
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const openTicketDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEmptyNightData(null);
    setTicketAvailability(null);
    setTicketHistory([]);
    setTicketApartments([]);
    setAddApartmentIds([]);
    fetchEmailLog(ticket.id);
    fetchTicketHistory(ticket.id);
    fetchTicketApartments(ticket.id);
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

  // (handleAssignApartment and handleUnassignApartment removed — assignments managed via ticket dropdown)

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

  // (handleAssignApartmentToProperty removed — assignments managed via ticket dropdown)

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
      exportTickets = exportTickets.filter((t) => t.maintenance_company_id === exportFilters.companyId);
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
      reportTickets = reportTickets.filter(t => t.property_id === reportFilters.propertyId);
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
  const generatePropertyReportPdf = (openInNewTab = false, filterPropertyId = "all") => {
    let unresolvedTickets = tickets.filter(t => t.status !== "resolved");

    if (unresolvedTickets.length === 0) {
      toast({ title: "Ei avoimia tikettejä", variant: "destructive" });
      return;
    }

    const doc = createPropertyReportPdf(unresolvedTickets, filterPropertyId);
    const dateStr = new Date().toISOString().split("T")[0];
    const suffix = filterPropertyId !== "all" ? `_${properties.find(p => p.id === filterPropertyId)?.name || ""}` : "";

    if (openInNewTab) {
      window.open(URL.createObjectURL(doc.output("blob")), "_blank");
    } else {
      doc.save(`kiinteistoraportti${suffix}_${dateStr}.pdf`);
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
    // No longer uses assignments — find from ticket's maintenance_company_id
    return "–";
  };
  const getPropertyForApt = (aptId: string): Property | null => {
    const assignment = apartmentAssignments.find(a => a.apartment_id === aptId);
    if (!assignment) return null;
    return properties.find(p => p.id === assignment.property_id) || null;
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
      const isMulti = aptTickets.some(t => t.description?.includes("Huoneistot ("));
      const aptName = isMulti ? "Useita kohteita" : getApartmentName(aptId);
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
      const aptLabel = t.description?.includes("Huoneistot (") ? "Useita kohteita" : getApartmentName(t.apartment_id);
      doc.text(`\u2022 ${aptLabel} | ${getCategoryName(t.category_id)} | ${t.title}`, margin, y);
      y += 4;
      doc.setFontSize(8);
      doc.setTextColor(100);
      const typeLabels: Record<string, string> = { urgent: "Hoidettava heti", seasonal: "Kausihuolto", changeover: "Vaihdon yhteydessä" };
      doc.text(`  ${typeLabels[t.type] || t.type} | P${t.priority} | ${statusLabel(t.status)} | ${new Date(t.created_at).toLocaleDateString("fi-FI")}${t.status === "resolved" ? ` \u2013 ${new Date(t.updated_at).toLocaleDateString("fi-FI")}` : ""}`, margin + 2, y);
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

  const createPropertyReportPdf = (allTickets: Ticket[], filterPropertyId = "all") => {
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

    // Group tickets by property → apartment → category
    // For multi-apartment tickets, split each apartment under its own property
    const propGroups: Record<string, {
      property: Property | null;
      aptGroups: Record<string, Ticket[]>;
      multiAptTickets: Record<string, { ticket: Ticket; aptIds: string[] }>;
    }> = {};

    const ensurePropGroup = (propKey: string, prop: Property | null) => {
      if (!propGroups[propKey]) {
        propGroups[propKey] = { property: prop || null, aptGroups: {}, multiAptTickets: {} };
      }
    };

    // Resolve all apartment IDs for each ticket
    const getTicketAptIds = (t: Ticket): string[] => {
      const ta = allTicketApartments.filter(a => a.ticket_id === t.id);
      if (ta.length > 1) return ta.map(a => a.apartment_id);
      if (ta.length === 0 && t.description?.includes("Huoneistot (")) {
        const match = t.description.match(/Huoneistot \(\d+\):\s*(.+)/);
        if (match) {
          const names = match[1].split(",").map(n => n.trim()).filter(Boolean);
          const matchedIds = names
            .map(name => apartmentList.find(a => getSimpleName(a.name) === name)?.id)
            .filter((id): id is string => !!id);
          if (matchedIds.length > 1) return matchedIds;
        }
      }
      return [t.apartment_id];
    };

    for (const t of allTickets) {
      const aptIds = getTicketAptIds(t);
      const isMultiApt = aptIds.length > 1;

      if (isMultiApt) {
        // Group by property — intersection of ticket's apts with each property's apts
        const propMap: Record<string, string[]> = {};
        for (const aptId of aptIds) {
          const prop = getPropertyForApt(aptId);
          if (filterPropertyId !== "all" && prop?.id !== filterPropertyId) continue;
          if (filterPropertyId !== "all" && !prop) continue;
          const propKey = prop?.id || "__unassigned__";
          if (!propMap[propKey]) propMap[propKey] = [];
          propMap[propKey].push(aptId);
          ensurePropGroup(propKey, prop || null);
        }
        for (const [propKey, propAptIds] of Object.entries(propMap)) {
          propGroups[propKey].multiAptTickets[t.id] = { ticket: t, aptIds: propAptIds };
        }
      } else {
        const aptId = aptIds[0];
        const prop = getPropertyForApt(aptId);
        if (filterPropertyId !== "all" && prop?.id !== filterPropertyId) continue;
        if (filterPropertyId !== "all" && !prop) continue;
        const propKey = prop?.id || "__unassigned__";
        ensurePropGroup(propKey, prop || null);
        if (!propGroups[propKey].aptGroups[aptId]) {
          propGroups[propKey].aptGroups[aptId] = [];
        }
        propGroups[propKey].aptGroups[aptId].push(t);
      }
    }

    // Count unique tickets per property
    const countUniqueTickets = (g: typeof propGroups[string]) => {
      const ids = new Set<string>();
      for (const tickets of Object.values(g.aptGroups)) {
        for (const t of tickets) ids.add(t.id);
      }
      for (const id of Object.keys(g.multiAptTickets)) ids.add(id);
      return ids.size;
    };

    const totalTickets = Object.values(propGroups).reduce((sum, g) => sum + countUniqueTickets(g), 0);
    doc.text(`Luotu: ${new Date().toLocaleDateString("fi-FI")}   |   Avoimet tiketit: ${totalTickets}`, margin, y);
    y += 10;

    // Sort: named properties first, then unassigned
    const sortedPropKeys = Object.keys(propGroups).sort((a, b) => {
      if (a === "__unassigned__") return 1;
      if (b === "__unassigned__") return -1;
      return (propGroups[a].property?.name || "").localeCompare(propGroups[b].property?.name || "");
    });

    for (let pi = 0; pi < sortedPropKeys.length; pi++) {
      const propKey = sortedPropKeys[pi];
      const { property, aptGroups, multiAptTickets } = propGroups[propKey];
      const propName = property?.name || "Määrittelemätön kiinteistö";
      const totalCount = countUniqueTickets(propGroups[propKey]);

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

      // 1) Single-apartment tickets grouped by apartment
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
          doc.text(`▸ ${cat}`, margin + 5, y);
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

      // 2) Multi-apartment tickets — one entry per ticket, showing only this property's apartments
      const multiEntries = Object.values(multiAptTickets);
      if (multiEntries.length > 0) {
        checkPage(15);
        doc.setFillColor(229, 231, 235);
        doc.rect(margin + 2, y, contentWidth - 4, 8, "F");
        doc.setFontSize(10);
        doc.setTextColor(30);
        doc.text("Useita kohteita", margin + 5, y + 5.5);
        y += 12;

        // Group multi-apt tickets by category
        const catGroups: Record<string, { ticket: Ticket; aptIds: string[] }[]> = {};
        for (const entry of multiEntries) {
          const cat = getCategoryName(entry.ticket.category_id);
          if (!catGroups[cat]) catGroups[cat] = [];
          catGroups[cat].push(entry);
        }

        for (const [cat, entries] of Object.entries(catGroups)) {
          checkPage(10);
          doc.setFontSize(8);
          doc.setTextColor(100);
          doc.text(`▸ ${cat}`, margin + 5, y);
          y += 4;

          for (const { ticket: t, aptIds } of entries) {
            checkPage(12);
            doc.setFontSize(8);
            doc.setTextColor(30);
            doc.rect(margin + 8, y - 2.5, 2.5, 2.5);
            doc.text(`${t.title} (${statusLabel(t.status)})`, margin + 13, y);
            y += 4;
            // Show only this property's apartment names
            const aptNames = aptIds.map(id => getApartmentName(id)).sort().join(", ");
            doc.setTextColor(100);
            const aptLine = doc.splitTextToSize(`Huoneistot: ${aptNames}`, contentWidth - 20);
            checkPage(aptLine.length * 3.5);
            doc.text(aptLine, margin + 13, y);
            y += aptLine.length * 3.5 + 1;
            // Show description without the full apartment list
            if (t.description) {
              const cleanDesc = t.description.replace(/Huoneistot \(\d+\):\s*.+/, "").trim();
              if (cleanDesc) {
                const desc = doc.splitTextToSize(cleanDesc, contentWidth - 20);
                checkPage(desc.length * 3.5);
                doc.text(desc, margin + 13, y);
                y += desc.length * 3.5 + 1;
              }
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

  // ── Ticket list sub-tab ──
  const [ticketListTab, setTicketListTab] = useState<"siivous" | "korjaus" | "kausihuolto" | "resolved">("siivous");

  // ── Filtered tickets ──
  const applyFilters = (t: Ticket) => {
    if (filterApartment !== "all" && t.apartment_id !== filterApartment) return false;
    if (filterType !== "all" && t.type !== filterType) return false;
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    if (filterCategory !== "all" && t.category_id !== filterCategory) return false;
    return true;
  };

  // Split tickets into 4 groups: siivous (cleaning), korjaus (repair), kausihuolto (seasonal), resolved
  const siivoTickets = tickets.filter(t => t.status !== "resolved" && t.type !== "seasonal" && t.assignment_type !== "kiinteistohuolto").filter(applyFilters);
  const korjausTickets = tickets.filter(t => t.status !== "resolved" && t.type !== "seasonal" && t.assignment_type === "kiinteistohuolto").filter(applyFilters);
  const kausihuoltoTickets = tickets.filter(t => t.status !== "resolved" && t.type === "seasonal").filter(applyFilters);
  const resolvedTickets = tickets.filter(t => t.status === "resolved").filter(applyFilters);

  const filteredTickets = ticketListTab === "siivous" ? siivoTickets 
    : ticketListTab === "korjaus" ? korjausTickets 
    : ticketListTab === "kausihuolto" ? kausihuoltoTickets
    : resolvedTickets;

  const openCount = tickets.filter((t) => t.status === "open").length;
  const urgentCount = tickets.filter((t) => t.type === "urgent" && t.status !== "resolved").length;
  const changeoverCount = tickets.filter((t) => t.type === "changeover" && t.status !== "resolved").length;

  const handleBulkDelete = async () => {
    if (selectedForDelete.length === 0) return;
    if (!confirm(`Haluatko varmasti poistaa ${selectedForDelete.length} tikettiä?`)) return;
    try {
      await callApi("delete_tickets_bulk", { ids: selectedForDelete });
      toast({ title: `${selectedForDelete.length} tikettiä poistettu` });
      setSelectedForDelete([]);
      fetchTickets();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "open": return <Badge variant="destructive">Avoin</Badge>;
      case "in_progress": return <Badge className="bg-amber-500 text-white">Käsittelyssä</Badge>;
      case "resolved": return <Badge variant="secondary">Ratkaistu</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const typeBadge = (type: string) => {
    if (type === "urgent") return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Hoidettava heti</Badge>;
    if (type === "changeover") return <Badge className="bg-blue-600 text-white gap-1"><CalendarDays className="w-3 h-3" />Vaihdon yhteydessä</Badge>;
    return <Badge variant="outline">Kausihuolto</Badge>;
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
                  <Label className="text-muted-foreground text-xs">Otsikko</Label>
                  {!isViewer ? (
                    <Input
                      defaultValue={selectedTicket.title}
                      key={`title-${selectedTicket.id}`}
                      onBlur={async (e) => {
                        const newTitle = e.target.value.trim();
                        if (newTitle && newTitle !== selectedTicket.title) {
                          try {
                            await callApi("update_ticket", { id: selectedTicket.id, updates: { title: newTitle } });
                            setSelectedTicket({ ...selectedTicket, title: newTitle });
                            fetchTickets();
                            toast({ title: "Otsikko päivitetty" });
                          } catch (err: any) {
                            toast({ title: "Virhe", description: err.message, variant: "destructive" });
                          }
                        }
                      }}
                      onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                    />
                  ) : (
                    <p className="font-medium">{selectedTicket.title}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Huoneisto</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{ticketApartments.length > 1 ? `Useita (${ticketApartments.length})` : getSimpleApartmentName(selectedTicket.apartment_id)}</p>
                    {!isViewer && selectedTicket.status !== "resolved" && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-3" align="start">
                          <p className="text-xs font-semibold mb-2">Lisää kohteita</p>
                          <div className="max-h-48 overflow-y-auto space-y-1">
                            {apartmentList
                              .sort((a, b) => getSimpleName(a.name).localeCompare(getSimpleName(b.name)))
                              .map((apt) => {
                                const alreadyAdded = ticketApartments.some(ta => ta.apartment_id === apt.id);
                                return (
                                  <label key={apt.id} className={`flex items-center gap-2 px-1 py-1 rounded text-xs ${alreadyAdded ? "opacity-50" : "hover:bg-accent cursor-pointer"}`}>
                                    <Checkbox
                                      disabled={alreadyAdded}
                                      checked={alreadyAdded || addApartmentIds.includes(apt.id)}
                                      onCheckedChange={(checked) => {
                                        if (alreadyAdded) return;
                                        setAddApartmentIds(prev =>
                                          checked ? [...prev, apt.id] : prev.filter(id => id !== apt.id)
                                        );
                                      }}
                                    />
                                    {getSimpleName(apt.name)}
                                  </label>
                                );
                              })}
                          </div>
                          {addApartmentIds.length > 0 && (
                            <Button
                              size="sm"
                              className="w-full mt-2 h-7 text-xs"
                              disabled={addingApartments}
                              onClick={async () => {
                                setAddingApartments(true);
                                try {
                                  const names: Record<string, string> = {};
                                  addApartmentIds.forEach(id => {
                                    names[id] = getSimpleApartmentName(id);
                                  });
                                  await callApi("add_ticket_apartments", {
                                    ticket_id: selectedTicket.id,
                                    apartment_ids: addApartmentIds,
                                    apartment_names: names,
                                  });
                                  setAddApartmentIds([]);
                                  fetchTicketApartments(selectedTicket.id);
                                  fetchAllTicketApartments();
                                  fetchTicketHistory(selectedTicket.id);
                                  toast({ title: `${addApartmentIds.length} kohdetta lisätty` });
                                } catch (err: any) {
                                  toast({ title: "Virhe", description: err.message, variant: "destructive" });
                                } finally {
                                  setAddingApartments(false);
                                }
                              }}
                            >
                              {addingApartments ? <Loader2 className="h-3 w-3 animate-spin" /> : `Lisää (${addApartmentIds.length})`}
                            </Button>
                          )}
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
                {selectedTicket.target_type === "property" && selectedTicket.property_id && (
                  <div>
                    <Label className="text-muted-foreground text-xs">Kiinteistö</Label>
                    <p className="font-medium">{getPropertyName(selectedTicket.property_id)}</p>
                  </div>
                )}
                <div>
                  <Label className="text-muted-foreground text-xs">Kuvaus</Label>
                  {!isViewer ? (
                    <Textarea
                      defaultValue={selectedTicket.description || ""}
                      key={`desc-${selectedTicket.id}`}
                      rows={3}
                      onBlur={async (e) => {
                        const newDesc = e.target.value.trim();
                        if (newDesc !== (selectedTicket.description || "")) {
                          try {
                            await callApi("update_ticket", { id: selectedTicket.id, updates: { description: newDesc || null } });
                            setSelectedTicket({ ...selectedTicket, description: newDesc || null });
                            fetchTickets();
                            toast({ title: "Kuvaus päivitetty" });
                          } catch (err: any) {
                            toast({ title: "Virhe", description: err.message, variant: "destructive" });
                          }
                        }
                      }}
                    />
                  ) : (
                    <p>{selectedTicket.description || "–"}</p>
                  )}
                </div>
                {/* Assigned company */}
                <div>
                  <Label className="text-muted-foreground text-xs">Suorittaja</Label>
                  {!isViewer ? (
                    <Select
                      value={selectedTicket.maintenance_company_id || "none"}
                      onValueChange={async (val) => {
                        const companyId = val === "none" ? null : val;
                        try {
                          await callApi("update_ticket", { id: selectedTicket.id, updates: { maintenance_company_id: companyId } });
                          setSelectedTicket({ ...selectedTicket, maintenance_company_id: companyId });
                          // If a company is selected, also set email_override to its email
                          if (companyId) {
                            const company = companies.find(c => c.id === companyId);
                            if (company?.email) {
                              await callApi("update_ticket", { id: selectedTicket.id, updates: { email_override: company.email } });
                              setSelectedTicket(prev => prev ? { ...prev, maintenance_company_id: companyId, email_override: company.email! } : prev);
                            }
                          }
                          toast({ title: "Suorittaja päivitetty" });
                          fetchTicketHistory(selectedTicket.id);
                        } catch (e: any) {
                          toast({ title: "Virhe", description: e.message, variant: "destructive" });
                        }
                      }}
                    >
                      <SelectTrigger className="text-sm"><SelectValue placeholder="Valitse suorittaja" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">– Ei valittu –</SelectItem>
                        {companies.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.company_types?.includes("siivous") ? "🧹" : "🔧"} {c.name}
                            {c.phone ? ` (${c.phone})` : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="font-medium">{selectedTicket.maintenance_company_id ? companies.find(c => c.id === selectedTicket.maintenance_company_id)?.name || "–" : "Ei valittu"}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Sähköposti</Label>
                    <p>{selectedTicket.send_email ? "Kyllä" : "Ei"}</p>
                  </div>
                </div>

                {/* Changeover departure/arrival info */}
                {selectedTicket.type === "changeover" && (selectedTicket.guest_departure_date || selectedTicket.next_guest_arrival_date) && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded space-y-1">
                    <Label className="text-xs font-semibold text-blue-800">📅 Vaihtojakso</Label>
                    {selectedTicket.guest_departure_date && (
                      <p className="text-sm text-blue-700">Asiakas lähtee: <strong>{new Date(selectedTicket.guest_departure_date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })}</strong></p>
                    )}
                    {selectedTicket.next_guest_arrival_date && (
                      <p className="text-sm text-blue-700">Seuraava asiakas saapuu: <strong>{new Date(selectedTicket.next_guest_arrival_date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })}</strong></p>
                    )}
                    <p className="text-xs text-blue-600">Muistutus lähetetään automaattisesti lähtöpäivän aamuna</p>
                  </div>
                )}

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

                {/* Recurrence info */}
                {(selectedTicket.recurrence_months || selectedTicket.recurrence_source_id) && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                      🔄 Toistuva tiketti
                    </div>
                    {selectedTicket.recurrence_months && (
                      <p className="text-sm text-blue-700">Toistuu {selectedTicket.recurrence_months} kk välein</p>
                    )}
                    {selectedTicket.recurrence_note && (
                      <p className="text-sm text-blue-600">{selectedTicket.recurrence_note}</p>
                    )}
                    {selectedTicket.recurrence_source_id && (
                      <p className="text-xs text-blue-500">Alkuperäinen tiketti: {selectedTicket.recurrence_source_id.slice(0, 8)}...</p>
                    )}
                    {selectedTicket.status !== "resolved" && selectedTicket.recurrence_months && (
                      <p className="text-xs text-blue-500 italic">Kun tiketti ratkaistaan, uusi luodaan automaattisesti</p>
                    )}
                  </div>
                )}

                {/* Recurrence edit - add to existing ticket */}
                {!isViewer && !selectedTicket.recurrence_months && (
                  <div className="space-y-2">
                    <Label className="text-xs flex items-center gap-1">🔄 Lisää toistuvuus</Label>
                    <Select 
                      value="0" 
                      onValueChange={async (val) => {
                        if (Number(val) > 0) {
                          try {
                            await callApi("update_ticket", { id: selectedTicket.id, updates: { recurrence_months: Number(val) } });
                            setSelectedTicket({ ...selectedTicket, recurrence_months: Number(val) });
                            fetchTicketHistory(selectedTicket.id);
                            toast({ title: "Toistuvuus lisätty" });
                          } catch (e: any) {
                            toast({ title: "Virhe", description: e.message, variant: "destructive" });
                          }
                        }
                      }}
                    >
                      <SelectTrigger className="text-sm"><SelectValue placeholder="Ei toistu" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Ei toistu</SelectItem>
                        <SelectItem value="1">1 kk</SelectItem>
                        <SelectItem value="3">3 kk</SelectItem>
                        <SelectItem value="6">6 kk</SelectItem>
                        <SelectItem value="12">12 kk</SelectItem>
                        <SelectItem value="24">24 kk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Per-apartment resolution */}
                {ticketApartments.length > 1 && (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Kohteiden kuittaus ({ticketApartments.filter(a => a.status === "resolved").length}/{ticketApartments.length})</Label>
                    <div className="space-y-1.5">
                      {ticketApartments.map((ta) => (
                        <div key={ta.id} className={`flex items-center justify-between p-2 rounded border text-sm ${ta.status === "resolved" ? "bg-emerald-50 border-emerald-200" : "bg-background border-border"}`}>
                          <span className="font-medium">{ta.apartment_name}</span>
                          {ta.status === "resolved" ? (
                            <Badge variant="secondary" className="text-xs">✅ Kuitattu {ta.resolved_at ? new Date(ta.resolved_at).toLocaleDateString("fi-FI") : ""}</Badge>
                          ) : !isViewer ? (
                            <Button size="sm" variant="outline" className="h-7 text-xs border-emerald-400 text-emerald-700 hover:bg-emerald-50" onClick={() => handleResolveApartment(ta.id)}>
                              ✅ Kuittaa
                            </Button>
                          ) : (
                            <Badge variant="outline" className="text-xs">Avoin</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resolved info */}
                {selectedTicket.status === "resolved" && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                      <CheckCircle2 className="w-4 h-4" />
                      Ratkaistu
                    </div>
                    {selectedTicket.resolved_at && (
                      <p className="text-sm text-emerald-700">
                        {new Date(selectedTicket.resolved_at).toLocaleDateString("fi-FI")} klo{" "}
                        {new Date(selectedTicket.resolved_at).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                    <p className="text-sm text-emerald-600">
                      Ratkaisija: {selectedTicket.resolved_by === "email_link" ? "Suorittaja (sähköpostilinkki)" : "Admin"}
                    </p>
                    {!isViewer && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-1 border-amber-400 text-amber-700 hover:bg-amber-50"
                        onClick={async () => {
                          try {
                            const result = await callApi("reactivate_ticket", { id: selectedTicket.id, changed_by: "admin" });
                            setSelectedTicket({ ...result, status: "open", resolved_at: null, resolved_by: null });
                            fetchTickets();
                            fetchTicketHistory(selectedTicket.id);
                            fetchEmailLog(selectedTicket.id);
                            fetchTicketApartments(selectedTicket.id);
                            toast({ title: "Tiketti aktivoitu uudelleen" });
                          } catch (e: any) {
                            toast({ title: "Virhe", description: e.message, variant: "destructive" });
                          }
                        }}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Aktivoi uudelleen
                      </Button>
                    )}
                  </div>
                )}

                {!isViewer && selectedTicket.status !== "resolved" && (
                  <div className="space-y-2">
                    {ticketApartments.length <= 1 && (
                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={async () => {
                        try {
                          await callApi("update_ticket", { 
                            id: selectedTicket.id, 
                            updates: { 
                              status: "resolved",
                              resolved_at: new Date().toISOString(),
                              resolved_by: "admin"
                            } 
                          });
                          toast({ title: "Tiketti merkitty tehdyksi" });
                          setSelectedTicket({ ...selectedTicket, status: "resolved", resolved_at: new Date().toISOString(), resolved_by: "admin" });
                          fetchTickets();
                          fetchTicketHistory(selectedTicket.id);
                        } catch (e: any) {
                          toast({ title: "Virhe", description: e.message, variant: "destructive" });
                        }
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      ✅ Merkitse tehdyksi
                    </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full border-orange-400 text-orange-700 hover:bg-orange-50"
                      onClick={async () => {
                        try {
                          const aptName = getSimpleApartmentName(selectedTicket.apartment_id);
                          const result = await callApi("send_urgent_reminder", {
                            ticket_id: selectedTicket.id,
                            apartment_name: aptName,
                            changed_by: "admin",
                          });
                          if (result.sent) {
                            toast({ title: "Muistutus lähetetty", description: `Lähetetty: ${result.email}` });
                            fetchTicketHistory(selectedTicket.id);
                          } else {
                            toast({ title: "Virhe", description: result.error || "Sähköpostia ei voitu lähettää", variant: "destructive" });
                          }
                        } catch (e: any) {
                          toast({ title: "Virhe", description: e.message, variant: "destructive" });
                        }
                      }}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      🔔 Muistuta nyt
                    </Button>
                    {/* WhatsApp link */}
                    {(() => {
                      const assignedCompany = selectedTicket.maintenance_company_id 
                        ? companies.find(c => c.id === selectedTicket.maintenance_company_id) 
                        : null;
                      const phone = assignedCompany?.phone;
                      if (!phone) return null;
                      
                      const aptName = getSimpleApartmentName(selectedTicket.apartment_id);
                      const siteBase = "leville.lovable.app";
                      
                      // Build changeover info
                      let changeoverText = "";
                      if (ticketApartments.length > 1 && ticketApartments.some(ta => (ta as any).guest_departure_date)) {
                        changeoverText = "\n\n📅 Vaihtojakso kohteittain:\n" + ticketApartments.map(ta => {
                          const dep = (ta as any).guest_departure_date 
                            ? new Date((ta as any).guest_departure_date).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" })
                            : null;
                          const arr = (ta as any).next_guest_arrival_date
                            ? new Date((ta as any).next_guest_arrival_date).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" })
                            : null;
                          return `• ${ta.apartment_name}: ${dep ? `lähtö ${dep}` : "ei tietoja"}${arr ? `, seuraava ${arr}` : ""}`;
                        }).join("\n");
                      } else if (selectedTicket.guest_departure_date) {
                        const dep = new Date(selectedTicket.guest_departure_date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" });
                        const arr = selectedTicket.next_guest_arrival_date 
                          ? new Date(selectedTicket.next_guest_arrival_date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })
                          : null;
                        changeoverText = `\n\n📅 Vaihtojakso:\nAsiakas lähtee: ${dep}${arr ? `\nSeuraava saapuu: ${arr}` : "\nEi seuraavaa varausta"}`;
                      }
                      
                      // Build resolve links
                      let resolveText = "";
                      if (ticketApartments.length > 1) {
                        resolveText = "\n\nKuittaa tehdyksi:\n" + ticketApartments.map(ta => 
                          `✅ ${ta.apartment_name}: ${siteBase}/tiketti-ratkaistu?token=${ta.resolve_token}&apt=1`
                        ).join("\n");
                      } else {
                        const token = selectedTicket.resolve_token || "";
                        resolveText = `\n\n✅ Kuittaa tehdyksi:\n${siteBase}/tiketti-ratkaistu?token=${token}`;
                      }
                      
                      const urgentPrefix = selectedTicket.type === "urgent" ? "🚨 KIIRE – Hoida heti!\n\n" : "";
                      const message = `${urgentPrefix}${aptName}\n*${selectedTicket.title}*${selectedTicket.description ? `\n${selectedTicket.description}` : ""}${changeoverText}${resolveText}`;
                      
                      // Clean phone number
                      const cleanPhone = phone.replace(/[^+\d]/g, "");
                      const waUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(message)}`;
                      
                      return (
                        <Button
                          variant="outline"
                          className="w-full border-green-400 text-green-700 hover:bg-green-50"
                          onClick={() => window.open(waUrl, "_blank")}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          📱 Lähetä WhatsAppilla ({assignedCompany.name})
                        </Button>
                      );
                    })()}
                  </div>
                )}

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
                    <ImprovedCalendar 
                      availability={ticketAvailability} 
                      days={selectedTicket.type === "urgent" ? 30 : 14} 
                      label={selectedTicket.type === "urgent" ? "Seuraavat 30 päivää" : "Seuraavat 14 päivää"}
                      onDateClick={!isViewer ? async (date) => {
                        const dayBeforeDate = new Date(new Date(date).getTime() - 86400000);
                        const dayBefore = dayBeforeDate.toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" });
                        if (!confirm(`Ajastetaanko muistutussähköposti?\n\nVapaa yö: ${new Date(date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })}\nMuistutus lähetetään: ${dayBefore} klo 18:00`)) return;
                        try {
                          const result = await callApi("schedule_date_reminder", { ticket_id: selectedTicket.id, target_date: date, apartment_name: getApartmentName(selectedTicket.apartment_id) });
                          if (result?.scheduled) {
                            const scheduledDate = new Date(result.scheduled_for).toLocaleString("fi-FI", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
                            toast({ title: "Muistutus ajastettu", description: `Lähetetään ${scheduledDate} → ${result.email}` });
                            fetchEmailLog(selectedTicket.id);
                            fetchTicketHistory(selectedTicket.id);
                          } else {
                            toast({ title: "Virhe", description: result?.error === "no_email_found" ? "Sähköpostia ei löytynyt" : "Ajastus epäonnistui", variant: "destructive" });
                          }
                        } catch (e: any) {
                          toast({ title: "Virhe", description: e.message, variant: "destructive" });
                        }
                      } : undefined}
                    />
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
                      <div key={log.id} className={`text-sm border rounded p-2 ${log.status === "scheduled" ? "border-amber-300 bg-amber-50/50" : ""}`}>
                        <div className="flex justify-between items-center">
                          <span className="truncate">{log.sent_to}</span>
                          <Badge 
                            variant={log.status === "sent" ? "secondary" : log.status === "scheduled" ? "outline" : log.status === "cancelled" ? "secondary" : "destructive"} 
                            className={`text-xs ${log.status === "scheduled" ? "border-amber-400 text-amber-700" : ""}`}
                          >
                            {log.status === "scheduled" ? "⏰ Ajastettu" : log.status === "cancelled" ? "Peruutettu" : log.status}
                          </Badge>
                        </div>
                        {log.status === "scheduled" && log.scheduled_for && (
                          <p className="text-xs text-amber-700 font-medium mt-1">
                            Lähetetään: {new Date(log.scheduled_for).toLocaleString("fi-FI", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        )}
                        {log.email_type && log.email_type !== "creation" && (
                          <p className="text-[10px] text-muted-foreground">
                            {log.email_type === "scheduled_reminder" ? "📅 Ajastettu muistutus" : log.email_type === "reminder" ? "🔔 Muistutus" : log.email_type === "auto_reminder" ? "🤖 Automaattinen muistutus" : log.email_type}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">{new Date(log.sent_at).toLocaleString("fi-FI")}</p>
                        {log.error_message && !log.error_message.startsWith("__apt_name__:") && <p className="text-xs text-destructive">{log.error_message}</p>}
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
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><CalendarDays className="w-6 h-6 text-primary" /></div>
                  <div><p className="text-sm text-muted-foreground">Vaihdon yhteydessä</p><p className="text-2xl font-bold">{changeoverCount}</p></div>
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
                <SelectItem value="urgent">Hoidettava heti</SelectItem>
                <SelectItem value="changeover">Vaihdon yhteydessä</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Kategoria" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Kaikki kategoriat</SelectItem>
                {categories.map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>))}
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
                    <div className="flex items-center justify-between">
                      <Label>Huoneistot</Label>
                      <div className="flex gap-2">
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => setExportFilters(prev => ({ ...prev, apartmentIds: apartmentList.map(a => a.id) }))}>Valitse kaikki</Button>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => setExportFilters(prev => ({ ...prev, apartmentIds: [] }))}>Tyhjennä</Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-1">
                      {exportFilters.apartmentIds.length === 0 ? "Kaikki huoneistot mukana (ei rajausta)" : `${exportFilters.apartmentIds.length} huoneistoa valittu`}
                    </p>
                    <div className="max-h-32 overflow-y-auto border rounded p-2 space-y-1">
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
                  setPendingReminderDate("");
                  setSelectedApartmentIds([]);
                  setNewTicket({ apartment_id: "", title: "", description: "", type: "seasonal", priority: "1", send_email: false, category_id: "", target_type: "apartment", property_id: "", email_override: "", recurrence_months: 0, recurrence_note: "", assignment_type: "kiinteistohuolto", maintenance_company_id: "" });
                }
              }}>
                <DialogTrigger asChild>
                  <Button><Plus className="w-4 h-4 mr-1" />Uusi tiketti</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto w-[95vw]">
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
                        <div className="flex items-center justify-between">
                          <Label>Huoneistot * ({selectedApartmentIds.length} valittu)</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto py-0.5 px-2 text-xs"
                            onClick={() => {
                              if (selectedApartmentIds.length === apartmentList.length) {
                                setSelectedApartmentIds([]);
                              } else {
                                setSelectedApartmentIds(apartmentList.map(a => a.id));
                              }
                            }}
                          >
                            {selectedApartmentIds.length === apartmentList.length ? "Poista kaikki" : "Valitse kaikki"}
                          </Button>
                        </div>
                        <div className="border rounded-md mt-1 max-h-48 overflow-y-auto p-2 space-y-1">
                          {apartmentList.map((apt) => (
                            <label key={apt.id} className="flex items-center gap-2 py-0.5 px-1 hover:bg-muted/50 rounded cursor-pointer text-sm">
                              <Checkbox
                                checked={selectedApartmentIds.includes(apt.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedApartmentIds(prev => [...prev, apt.id]);
                                  } else {
                                    setSelectedApartmentIds(prev => prev.filter(id => id !== apt.id));
                                  }
                                }}
                              />
                              {apt.name}
                            </label>
                          ))}
                        </div>
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
                      <RadioGroup value={newTicket.type} onValueChange={(val) => setNewTicket({ ...newTicket, type: val as any })} className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="seasonal" id="type-seasonal" /><Label htmlFor="type-seasonal">Kausihuolto</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="urgent" id="type-urgent" /><Label htmlFor="type-urgent">Hoidettava heti</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="changeover" id="type-changeover" /><Label htmlFor="type-changeover">Vaihdon yhteydessä</Label></div>
                      </RadioGroup>
                      {newTicket.type === "changeover" && (
                        <p className="text-xs text-muted-foreground mt-2">📅 Lähtö- ja saapumistiedot haetaan automaattisesti Beds24:stä. Muistutus lähetetään automaattisesti asiakkaan lähtöpäivän aamuna.</p>
                      )}
                      {newTicket.type === "urgent" && (
                        <p className="text-xs text-muted-foreground mt-2">⚡ Hoidetaan heti, vaikka asiakas olisi sisällä.</p>
                      )}
                    </div>

                    <div>
                      <Label>Ohjaa</Label>
                      <RadioGroup value={newTicket.assignment_type} onValueChange={(val) => setNewTicket({ ...newTicket, assignment_type: val })} className="flex gap-4 mt-1">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="kiinteistohuolto" id="assign-maint" /><Label htmlFor="assign-maint">Korjaus</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="siivous" id="assign-clean" /><Label htmlFor="assign-clean">Siivous</Label></div>
                      </RadioGroup>
                    </div>

                    {/* Company selector */}
                    <div>
                      <Label>Suorittaja *</Label>
                      <Select
                        value={newTicket.maintenance_company_id || "none"}
                        onValueChange={(val) => {
                          const companyId = val === "none" ? "" : val;
                          const company = companies.find(c => c.id === companyId);
                          setNewTicket({ 
                            ...newTicket, 
                            maintenance_company_id: companyId,
                            email_override: company?.email || newTicket.email_override,
                          });
                        }}
                      >
                        <SelectTrigger className="text-sm"><SelectValue placeholder="Valitse suorittaja" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">– Valitse –</SelectItem>
                          {companies
                            .filter(c => (c.company_types || []).includes(newTicket.assignment_type))
                            .map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.company_types?.includes("siivous") ? "🧹" : "🔧"} {c.name}
                                {c.phone ? ` (${c.phone})` : ""}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedApartmentIds.length === 1 && newTicket.target_type === "apartment" && (
                      <div className="border rounded-lg p-3 bg-muted/30">
                        {loadingCreateAvail ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" />Haetaan saatavuustietoja...</div>
                        ) : createFormAvailability ? (
                          <div className="space-y-2">
                            <ImprovedCalendar 
                              availability={createFormAvailability} 
                              days={30} 
                              label="Saatavuus – seuraavat 30 päivää (klikkaa päivää muistutusta varten)"
                              onDateClick={(date) => {
                                setPendingReminderDate(date);
                                toast({ title: "Muistutuspäivä valittu", description: `${new Date(date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })} – muistutus lähetetään tiketin luonnin yhteydessä` });
                              }}
                            />
                            <div className="flex items-center gap-2">
                              <Label className="text-xs whitespace-nowrap">Tai valitse vapaa päivä:</Label>
                              <Input
                                type="date"
                                className="h-8 text-sm w-auto"
                                value={pendingReminderDate}
                                onChange={(e) => {
                                  setPendingReminderDate(e.target.value);
                                  if (e.target.value) {
                                    toast({ title: "Muistutuspäivä valittu", description: `${new Date(e.target.value).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })}` });
                                  }
                                }}
                              />
                            </div>
                            {pendingReminderDate && (
                              <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                                <Bell className="w-4 h-4 text-blue-600 shrink-0" />
                                <span>Muistutus lähetetään: <strong>{new Date(pendingReminderDate).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })}</strong></span>
                                <Button variant="ghost" size="sm" className="h-auto p-0.5 ml-auto" onClick={() => setPendingReminderDate("")}>✕</Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Saatavuustietoja ei saatavilla</p>
                        )}
                      </div>
                    )}


                    {/* Recurrence */}
                    <div className="border rounded-lg p-3 bg-muted/30 space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">🔄 Toistuvuus</Label>
                      <div>
                        <Label className="text-xs text-muted-foreground">Toistuu X kuukauden välein (0 = ei toistu)</Label>
                        <Select value={String(newTicket.recurrence_months)} onValueChange={(val) => setNewTicket({ ...newTicket, recurrence_months: Number(val) })}>
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Ei toistu</SelectItem>
                            <SelectItem value="1">1 kk</SelectItem>
                            <SelectItem value="2">2 kk</SelectItem>
                            <SelectItem value="3">3 kk (neljännesvuosittain)</SelectItem>
                            <SelectItem value="6">6 kk (puolivuosittain)</SelectItem>
                            <SelectItem value="12">12 kk (vuosittain)</SelectItem>
                            <SelectItem value="24">24 kk (joka 2. vuosi)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {newTicket.recurrence_months > 0 && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Toistuvuuden kuvaus (valinnainen)</Label>
                          <Input
                            value={newTicket.recurrence_note}
                            onChange={(e) => setNewTicket({ ...newTicket, recurrence_note: e.target.value })}
                            placeholder="esim. Paristojen vaihto, palovaroittimen tarkastus"
                            className="text-sm mt-1"
                          />
                          <p className="text-xs text-muted-foreground mt-1">Uusi tiketti luodaan automaattisesti kun tämä ratkaistaan</p>
                        </div>
                      )}
                    </div>

                    {/* Email override */}
                    <div>
                      <Label className="text-xs">Ohjaa tiketti sähköpostiin (valinnainen)</Label>
                      <Input type="text" value={newTicket.email_override} onChange={(e) => setNewTicket({ ...newTicket, email_override: e.target.value })} placeholder={selectedApartmentIds.length === 1 && emailPreview?.email ? emailPreview.email : "sähköpostiosoite"} className="text-sm" />
                      {selectedApartmentIds.length > 1 && !newTicket.email_override && (
                        <p className="text-xs text-muted-foreground mt-1">Oletussähköposti määräytyy huoneiston mukaan</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch checked={newTicket.send_email} onCheckedChange={(val) => setNewTicket({ ...newTicket, send_email: val })} />
                        <Label>Lähetä sähköposti-ilmoitus</Label>
                      </div>
                      
                      {newTicket.send_email && selectedApartmentIds.length > 1 && (
                        <p className="text-xs text-muted-foreground ml-8">1 tiketti luodaan kaikille {selectedApartmentIds.length} huoneistolle, sähköpostissa listataan kohteet</p>
                      )}
                      {newTicket.send_email && (selectedApartmentIds.length === 1 || newTicket.email_override) && (
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
                    <Button onClick={handleCreateTicket} className="w-full">
                      {selectedApartmentIds.length > 1
                        ? `Luo tiketti (${selectedApartmentIds.length} huoneistoa)`
                        : "Luo tiketti"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Ticket list sub-tabs */}
          <div className="flex gap-1 border-b pb-0 mb-0">
            <Button
              variant={ticketListTab === "siivous" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTicketListTab("siivous"); setSelectedForDelete([]); }}
              className="rounded-b-none"
            >
              🧹 Siivous ({siivoTickets.length})
            </Button>
            <Button
              variant={ticketListTab === "korjaus" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTicketListTab("korjaus"); setSelectedForDelete([]); }}
              className="rounded-b-none"
            >
              🔧 Korjaus ({korjausTickets.length})
            </Button>
            <Button
              variant={ticketListTab === "kausihuolto" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTicketListTab("kausihuolto"); setSelectedForDelete([]); }}
              className="rounded-b-none"
            >
              📋 Kausihuolto ({kausihuoltoTickets.length})
            </Button>
            <Button
              variant={ticketListTab === "resolved" ? "default" : "ghost"}
              size="sm"
              onClick={() => { setTicketListTab("resolved"); setSelectedForDelete([]); }}
              className="rounded-b-none"
            >
              ✅ Ratkaistut ({resolvedTickets.length})
            </Button>
          </div>

          {/* Ticket table */}
          {/* Bulk delete bar for all tabs */}
          {!isViewer && (
            <div className="flex items-center gap-3 px-2">
              {selectedForDelete.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Poista {selectedForDelete.length} tikettiä
                </Button>
              )}
              {filteredTickets.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => {
                  if (selectedForDelete.length === filteredTickets.length) {
                    setSelectedForDelete([]);
                  } else {
                    setSelectedForDelete(filteredTickets.map(t => t.id));
                  }
                }}>
                  {selectedForDelete.length === filteredTickets.length ? "Poista valinnat" : "Valitse kaikki"}
                </Button>
              )}
            </div>
          )}

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    {!isViewer && <TableHead className="w-8"></TableHead>}
                    <TableHead>Huoneisto</TableHead>
                    <TableHead>Otsikko</TableHead>
                    <TableHead>Kategoria</TableHead>
                    <TableHead>Tyyppi</TableHead>
                    <TableHead>Tila</TableHead>
                    <TableHead>Luotu</TableHead>
                    <TableHead>Toiminnot</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={!isViewer ? 8 : 7} className="text-center text-muted-foreground py-8">Ei tikettejä</TableCell>
                    </TableRow>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="cursor-pointer" onClick={() => openTicketDetail(ticket)}>
                        {!isViewer && (
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedForDelete.includes(ticket.id)}
                              onCheckedChange={(checked) => {
                                setSelectedForDelete(prev => 
                                  checked ? [...prev, ticket.id] : prev.filter(id => id !== ticket.id)
                                );
                              }}
                            />
                          </TableCell>
                        )}
                        <TableCell className="font-medium">
                          <span className="flex items-center gap-1.5">
                            <AvailabilityDot indicator={availabilityIndicators[ticket.apartment_id]?.indicator} />
                            {ticket.target_type === "property" ? `🏢 ${getPropertyName(ticket.property_id)}` : ticket.description?.includes("Huoneistot (") ? "Useita" : getSimpleApartmentName(ticket.apartment_id)}
                          </span>
                        </TableCell>
                        <TableCell className="flex items-center gap-1">{ticket.recurrence_months ? <span title={`Toistuu ${ticket.recurrence_months} kk välein`}>🔄</span> : null}{ticket.title}</TableCell>
                        <TableCell><CategoryBadge category={categories.find(c => c.id === ticket.category_id)} /></TableCell>
                        <TableCell>{typeBadge(ticket.type)}</TableCell>
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
                      {typeCompanies.map((company) => (
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
                            <CardContent>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                {company.email && <span className="flex items-center gap-1"><AtSign className="w-3 h-3" />{company.email}</span>}
                                {company.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{company.phone}</span>}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
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
                const propTickets = tickets.filter(t => t.property_id === property.id);
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
                      {/* Allocated apartments */}
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Allokoidut huoneistot</Label>
                        {(() => {
                          const assigned = apartmentAssignments.filter(a => a.property_id === property.id);
                          const assignedAptIds = new Set(apartmentAssignments.map(a => a.apartment_id));
                          const availableApts = apartmentList.filter(a => !assignedAptIds.has(a.id));
                          return (
                            <div className="mt-1 space-y-2">
                              {assigned.length === 0 ? (
                                <p className="text-xs text-muted-foreground italic">Ei allokoituja huoneistoja</p>
                              ) : (
                                <div className="flex flex-wrap gap-1.5">
                                  {assigned.sort((a, b) => getSimpleApartmentName(a.apartment_id).localeCompare(getSimpleApartmentName(b.apartment_id))).map((a) => (
                                    <Badge key={a.apartment_id} variant="secondary" className="text-xs gap-1 pr-1">
                                      {getSimpleApartmentName(a.apartment_id)}
                                      {!isViewer && (
                                        <button
                                          className="ml-1 hover:text-destructive"
                                          onClick={async () => {
                                            try {
                                              await callApi("unassign_apartment_from_property", { apartment_id: a.apartment_id });
                                              await fetchApartmentAssignments();
                                              toast({ title: "Huoneisto poistettu kiinteistöltä" });
                                            } catch (e) { console.error(e); }
                                          }}
                                        >×</button>
                                      )}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {!isViewer && availableApts.length > 0 && (
                                <ApartmentBulkAssign
                                  availableApts={availableApts}
                                  propertyId={property.id}
                                  callApi={callApi}
                                  fetchApartmentAssignments={fetchApartmentAssignments}
                                  getSimpleName={getSimpleName}
                                  toast={toast}
                                />
                              )}
                            </div>
                          );
                        })()}
                      </div>
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
                            <SelectItem value="urgent">Hoidettava heti</SelectItem>
                            <SelectItem value="changeover">Vaihdon yhteydessä</SelectItem>
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
                <p className="text-sm text-muted-foreground">Avoimet tiketit ryhmiteltynä kiinteistöittäin.</p>
                <div>
                  <Label className="text-xs">Kiinteistö</Label>
                  <Select value={propertyReportPropertyId} onValueChange={setPropertyReportPropertyId}>
                    <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Kaikki kiinteistöt</SelectItem>
                      {properties.map(p => (<SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => generatePropertyReportPdf(false, propertyReportPropertyId)}><FileText className="w-4 h-4 mr-1" />Lataa PDF</Button>
                  <Button variant="outline" onClick={() => generatePropertyReportPdf(true, propertyReportPropertyId)}>Avaa selaimessa</Button>
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
