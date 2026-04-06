import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import { Loader2, Plus, AlertTriangle, Clock, CheckCircle2, RefreshCw, ArrowLeft, Mail, Trash2, Building2, Phone, AtSign } from "lucide-react";
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

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchTickets(), fetchCompanies()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCreateTicket = async () => {
    if (!newTicket.apartment_id || !newTicket.title.trim()) {
      toast({ title: "Virhe", description: "Täytä pakolliset kentät", variant: "destructive" });
      return;
    }
    try {
      await callApi("create_ticket", { ticket: newTicket });
      toast({ title: "Tiketti luotu" });
      setShowCreateDialog(false);
      setNewTicket({ apartment_id: "", title: "", description: "", type: "seasonal", priority: "1", send_email: false });
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

  const openTicketDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    fetchEmailLog(ticket.id);
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
          <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Takaisin
          </Button>
          <h2 className="text-lg font-semibold">{selectedTicket.title}</h2>
          {statusBadge(selectedTicket.status)}
          {typeBadge(selectedTicket.type)}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-1" />
                    Uusi tiketti
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
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
                    <div className="flex items-center gap-2">
                      <Switch checked={newTicket.send_email} onCheckedChange={(val) => setNewTicket({ ...newTicket, send_email: val })} />
                      <Label>Lähetä sähköposti-ilmoitus</Label>
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
                        <TableCell className="font-medium">{getApartmentName(ticket.apartment_id)}</TableCell>
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
