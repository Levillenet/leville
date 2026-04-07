import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Save, X, Loader2 } from "lucide-react";

interface TimedNotice {
  id: string;
  title: string;
  content_fi: string | null;
  content_en: string | null;
  content_de: string | null;
  content_sv: string | null;
  content_fr: string | null;
  content_es: string | null;
  content_nl: string | null;
  target_pages: string[];
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  style: string;
  created_at: string;
}

const PAGE_OPTIONS = [
  { id: "skiingInLevi", label: "Laskettelu Levillä (skiingInLevi)" },
  { id: "skiHolidayLevi", label: "Hiihtoloma (skiHolidayLevi)" },
  { id: "crossCountrySkiing", label: "Hiihtoladut (crossCountrySkiing)" },
  { id: "springSkiing", label: "Kevätlaskettelu (springSkiing)" },
  { id: "winterInLevi", label: "Talvi Levillä (winterInLevi)" },
  { id: "topWinterActivities", label: "Talviaktiviteetit (topWinterActivities)" },
  { id: "snowReport", label: "Lumitieto (snowReport)" },
  { id: "weatherInLevi", label: "Sää Levillä (weatherInLevi)" },
  { id: "bestTimeToVisit", label: "Paras aika (bestTimeToVisit)" },
];

interface TimedNoticesAdminProps {
  isViewer: boolean;
}

const emptyNotice = {
  title: "",
  content_fi: "",
  content_en: "",
  content_de: "",
  content_sv: "",
  content_fr: "",
  content_es: "",
  content_nl: "",
  target_pages: [] as string[],
  starts_at: "",
  expires_at: "",
  is_active: true,
  style: "info",
};

const TimedNoticesAdmin = ({ isViewer }: TimedNoticesAdminProps) => {
  const [notices, setNotices] = useState<TimedNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyNotice);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const password = localStorage.getItem("admin_password");
      const { data, error } = await supabase.functions.invoke("manage-timed-notices", {
        body: { action: "list", password },
      });
      if (error) throw error;
      setNotices(data || []);
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleSave = async () => {
    if (!form.title || !form.expires_at) {
      toast({ title: "Täytä pakolliset kentät", description: "Otsikko ja päättymispäivä vaaditaan.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const password = localStorage.getItem("admin_password");
      const action = editingId ? "update" : "create";
      const notice = editingId ? { ...form, id: editingId } : form;

      const { error } = await supabase.functions.invoke("manage-timed-notices", {
        body: { action, password, notice },
      });
      if (error) throw error;

      toast({ title: editingId ? "Päivitetty" : "Luotu" });
      setShowForm(false);
      setEditingId(null);
      setForm(emptyNotice);
      fetchNotices();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Poistetaanko ilmoitus?")) return;
    try {
      const password = localStorage.getItem("admin_password");
      await supabase.functions.invoke("manage-timed-notices", {
        body: { action: "delete", password, notice: { id } },
      });
      toast({ title: "Poistettu" });
      fetchNotices();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
  };

  const handleEdit = (n: TimedNotice) => {
    setEditingId(n.id);
    setForm({
      title: n.title,
      content_fi: n.content_fi || "",
      content_en: n.content_en || "",
      content_de: n.content_de || "",
      content_sv: n.content_sv || "",
      content_fr: n.content_fr || "",
      content_es: n.content_es || "",
      content_nl: n.content_nl || "",
      target_pages: n.target_pages || [],
      starts_at: n.starts_at ? n.starts_at.slice(0, 16) : "",
      expires_at: n.expires_at ? n.expires_at.slice(0, 16) : "",
      is_active: n.is_active,
      style: n.style,
    });
    setShowForm(true);
  };

  const togglePage = (pageId: string) => {
    setForm(f => ({
      ...f,
      target_pages: f.target_pages.includes(pageId)
        ? f.target_pages.filter(p => p !== pageId)
        : [...f.target_pages, pageId],
    }));
  };

  const getStatus = (n: TimedNotice) => {
    const now = new Date();
    const start = new Date(n.starts_at);
    const end = new Date(n.expires_at);
    if (!n.is_active) return { label: "Pois päältä", color: "secondary" as const };
    if (now < start) return { label: "Tuleva", color: "outline" as const };
    if (now > end) return { label: "Vanhentunut", color: "destructive" as const };
    return { label: "Aktiivinen", color: "default" as const };
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Ajankohtaiset ilmoitukset</h2>
          <p className="text-sm text-muted-foreground mt-1">Lisää ajastettuja ilmoitusbannereita sivuston alasivuille. Ilmoitus näkyy kävijöille valitulla aikavälillä.</p>
        </div>
        {!isViewer && !showForm && (
          <Button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyNotice); }}>
            <Plus className="w-4 h-4 mr-2" /> Uusi ilmoitus
          </Button>
        )}
      </div>

      {showForm && !isViewer && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Muokkaa ilmoitusta" : "Uusi ilmoitus"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Otsikko (admin-tunniste) *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="esim. Rinteet auki toukokuulle" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Näkyy alkaen</Label>
                <Input type="datetime-local" value={form.starts_at} onChange={e => setForm(f => ({ ...f, starts_at: e.target.value }))} />
              </div>
              <div>
                <Label>Näkyy asti *</Label>
                <Input type="datetime-local" value={form.expires_at} onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tyyli</Label>
                <Select value={form.style} onValueChange={v => setForm(f => ({ ...f, style: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">ℹ️ Info</SelectItem>
                    <SelectItem value="highlight">✨ Korostus</SelectItem>
                    <SelectItem value="warning">⚠️ Varoitus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={form.is_active} onCheckedChange={v => setForm(f => ({ ...f, is_active: v }))} />
                <Label>Aktiivinen</Label>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Kohdesivut</Label>
              <div className="flex flex-wrap gap-2">
                {PAGE_OPTIONS.map(p => (
                  <Badge
                    key={p.id}
                    variant={form.target_pages.includes(p.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => togglePage(p.id)}
                  >
                    {p.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Sisältö kielittäin</Label>
              {[
                { key: "content_fi", label: "🇫🇮 Suomi" },
                { key: "content_en", label: "🇬🇧 English" },
                { key: "content_de", label: "🇩🇪 Deutsch" },
                { key: "content_sv", label: "🇸🇪 Svenska" },
                { key: "content_fr", label: "🇫🇷 Français" },
                { key: "content_es", label: "🇪🇸 Español" },
                { key: "content_nl", label: "🇳🇱 Nederlands" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <Label className="text-xs text-muted-foreground">{label}</Label>
                  <Textarea
                    value={(form as any)[key] || ""}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    rows={2}
                    placeholder={label}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {editingId ? "Päivitä" : "Luo"}
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); }}>
                <X className="w-4 h-4 mr-2" /> Peruuta
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {notices.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Ei ilmoituksia.</p>
      ) : (
        <div className="space-y-3">
          {notices.map(n => {
            const status = getStatus(n);
            return (
              <Card key={n.id}>
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{n.title}</span>
                      <Badge variant={status.color}>{status.label}</Badge>
                      <Badge variant="outline" className="text-xs">{n.style}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(n.starts_at).toLocaleDateString("fi-FI")} — {new Date(n.expires_at).toLocaleDateString("fi-FI")}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {(n.target_pages || []).map(p => (
                        <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                    {n.content_fi && <p className="text-sm text-muted-foreground truncate">{n.content_fi}</p>}
                  </div>
                  {!isViewer && (
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(n)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(n.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimedNoticesAdmin;
