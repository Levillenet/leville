import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Loader2, PartyPopper, TreePine, Sparkles, Sun, Leaf, Mountain, Snowflake, Languages } from "lucide-react";
import { routeConfig } from "@/translations";

interface PromoBannerData {
  id?: string;
  title: string;
  heading_fi: string;
  heading_en: string;
  heading_de: string;
  heading_sv: string;
  heading_fr: string;
  heading_es: string;
  heading_nl: string;
  subtext_fi: string;
  subtext_en: string;
  subtext_de: string;
  subtext_sv: string;
  subtext_fr: string;
  subtext_es: string;
  subtext_nl: string;
  button_text_fi: string;
  button_text_en: string;
  button_text_de: string;
  button_text_sv: string;
  button_text_fr: string;
  button_text_es: string;
  button_text_nl: string;
  target_url: string;
  theme: string;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  route_key: string;
  redirect_localized: boolean;
  placement: "hero" | "below_hero";
}

const PLACEMENT_OPTIONS = [
  {
    value: "below_hero",
    label: "📢 Iso banneri (Heron alla)",
    hint: "Värikäs koko leveydeltä Heron alla — paras tarjouksille ja kampanjoille.",
  },
  {
    value: "hero",
    label: "🎿 Pieni badge (Heron sisällä)",
    hint: "Korvaa Heron \"Kevään tarjous\" -badgen. Lyhyt teksti, ei alatekstiä eikä nappia.",
  },
];

const THEME_OPTIONS = [
  { value: "vappu", label: "🎉 Vappu", icon: PartyPopper },
  { value: "joulu", label: "🎄 Joulu", icon: TreePine },
  { value: "uusivuosi", label: "🥂 Uusivuosi", icon: Sparkles },
  { value: "kevathanget", label: "⛷️ Keväthanget", icon: Mountain },
  { value: "ruska", label: "🍂 Ruska", icon: Leaf },
  { value: "kesa", label: "☀️ Kesä", icon: Sun },
  { value: "talvi", label: "❄️ Talvi", icon: Snowflake },
];

const LANGUAGES = [
  { code: "fi", label: "Suomi" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "sv", label: "Svenska" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "nl", label: "Nederlands" },
];

// Build page options from routeConfig
const PAGE_OPTIONS = Object.entries(routeConfig).map(([key, routes]) => {
  const langs = Object.keys(routes).filter((l) => l !== "fi") as string[];
  return {
    key,
    label: (routes as Record<string, string>).fi,
    langCount: langs.length,
  };
}).sort((a, b) => a.label.localeCompare(b.label, "fi"));

const emptyBanner: PromoBannerData = {
  title: "",
  heading_fi: "", heading_en: "", heading_de: "", heading_sv: "", heading_fr: "", heading_es: "", heading_nl: "",
  subtext_fi: "", subtext_en: "", subtext_de: "", subtext_sv: "", subtext_fr: "", subtext_es: "", subtext_nl: "",
  button_text_fi: "Lue lisää", button_text_en: "Read more", button_text_de: "Mehr lesen", button_text_sv: "Läs mer",
  button_text_fr: "En savoir plus", button_text_es: "Leer más", button_text_nl: "Lees meer",
  target_url: "/",
  theme: "vappu",
  starts_at: new Date().toISOString().slice(0, 16),
  expires_at: "",
  is_active: true,
  route_key: "",
  redirect_localized: true,
  placement: "below_hero",
};

interface PromoBannerAdminProps {
  isViewer?: boolean;
}

const PromoBannerAdmin = ({ isViewer = false }: PromoBannerAdminProps) => {
  const [banners, setBanners] = useState<(PromoBannerData & { id: string; created_at?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PromoBannerData | null>(null);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const { toast } = useToast();

  const password = localStorage.getItem("admin_password") || "";

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke("manage-promo-banners", {
        body: { action: "list", password },
      });
      if (Array.isArray(data)) {
        setBanners(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchBanners(); }, []);

  const handlePageSelect = (routeKey: string) => {
    if (!editing) return;
    const routes = (routeConfig as Record<string, Record<string, string>>)[routeKey];
    const fiPath = routes?.fi || "/";
    setEditing({ ...editing, route_key: routeKey, target_url: fiPath });
  };

  const handleTranslate = async () => {
    if (!editing || !editing.heading_fi) {
      toast({ title: "Virhe", description: "Kirjoita ensin suomenkielinen otsikko", variant: "destructive" });
      return;
    }
    setTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-promo-banners", {
        body: {
          action: "translate",
          password,
          heading_fi: editing.heading_fi,
          subtext_fi: editing.subtext_fi,
          button_text_fi: editing.button_text_fi,
        },
      });
      if (error) throw error;

      const updated = { ...editing };
      for (const lang of ["en", "de", "sv", "fr", "es", "nl"]) {
        const t = data[lang];
        if (t) {
          (updated as any)[`heading_${lang}`] = t.heading || "";
          (updated as any)[`subtext_${lang}`] = t.subtext || "";
          (updated as any)[`button_text_${lang}`] = t.button_text || "";
        }
      }
      setEditing(updated);
      toast({ title: "Käännökset valmis!" });
    } catch (e: any) {
      toast({ title: "Käännösvirhe", description: e.message, variant: "destructive" });
    }
    setTranslating(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title || !editing.expires_at) {
      toast({ title: "Virhe", description: "Täytä otsikko ja päättymisaika", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const isEdit = !!(editing as any).id;
      const action = isEdit ? "update" : "create";
      const saveData = { ...editing };
      // If route_key is empty string, save as null
      if (!saveData.route_key) (saveData as any).route_key = null;
      const payload: any = { action, password, data: saveData };
      if (isEdit) {
        payload.id = (editing as any).id;
        delete payload.data.id;
        delete payload.data.created_at;
      }
      const { error } = await supabase.functions.invoke("manage-promo-banners", { body: payload });
      if (error) throw error;
      toast({ title: "Tallennettu!" });
      setEditing(null);
      fetchBanners();
    } catch (e: any) {
      toast({ title: "Virhe", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Poista banneri?")) return;
    await supabase.functions.invoke("manage-promo-banners", {
      body: { action: "delete", password, id },
    });
    fetchBanners();
  };

  const getStatus = (b: PromoBannerData & { id: string }) => {
    const now = new Date();
    const start = new Date(b.starts_at);
    const end = new Date(b.expires_at);
    if (!b.is_active) return { label: "Ei käytössä", color: "bg-gray-200 text-gray-600" };
    if (now < start) return { label: "Tuleva", color: "bg-blue-100 text-blue-700" };
    if (now > end) return { label: "Vanhentunut", color: "bg-red-100 text-red-700" };
    return { label: "Aktiivinen", color: "bg-green-100 text-green-700" };
  };

  if (isViewer) {
    return (
      <Card>
        <CardHeader><CardTitle>Promobanneri</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Vain admin voi hallita bannereita.</p></CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Etusivun promobanneri</h2>
        {!editing && (
          <Button onClick={() => setEditing({ ...emptyBanner })} size="sm">
            <Plus className="w-4 h-4 mr-1" /> Uusi banneri
          </Button>
        )}
      </div>

      {/* Edit form */}
      {editing && (
        <Card>
          <CardHeader><CardTitle>{(editing as any).id ? "Muokkaa banneria" : "Uusi banneri"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Sijainti etusivulla *</Label>
              <Select
                value={editing.placement}
                onValueChange={(v) => setEditing({ ...editing, placement: v as "hero" | "below_hero" })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PLACEMENT_OPTIONS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {PLACEMENT_OPTIONS.find((p) => p.value === editing.placement)?.hint}
              </p>
              {editing.placement === "hero" && (
                <p className="text-xs text-amber-600 mt-1">
                  Hero-badgessa näytetään vain otsikko (ei alatekstiä eikä nappia). Pidä teksti lyhyenä, esim. "Kevään tarjous: -20% maaliskuussa".
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Admin-tunniste *</Label>
                <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="esim. Vappukampanja 2026" />
              </div>
              <div>
                <Label>Kohdesivu</Label>
                <Select value={editing.route_key || ""} onValueChange={handlePageSelect}>
                  <SelectTrigger><SelectValue placeholder="Valitse sivu..." /></SelectTrigger>
                  <SelectContent className="max-h-64">
                    {PAGE_OPTIONS.map((p) => (
                      <SelectItem key={p.key} value={p.key}>
                        {p.label} ({p.langCount} kieltä)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={editing.redirect_localized} onCheckedChange={(v) => setEditing({ ...editing, redirect_localized: v })} />
                <Label>Ohjaa kielen mukaiseen versioon</Label>
              </div>
              {editing.route_key && (
                <span className="text-xs text-muted-foreground">
                  FI: {(routeConfig as any)[editing.route_key]?.fi || "–"}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Ilme / Teema</Label>
                <Select value={editing.theme} onValueChange={(v) => setEditing({ ...editing, theme: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {THEME_OPTIONS.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Alkaa</Label>
                <Input type="datetime-local" value={editing.starts_at.slice(0, 16)} onChange={(e) => setEditing({ ...editing, starts_at: e.target.value })} />
              </div>
              <div>
                <Label>Päättyy *</Label>
                <Input type="datetime-local" value={editing.expires_at.slice(0, 16)} onChange={(e) => setEditing({ ...editing, expires_at: e.target.value })} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={editing.is_active} onCheckedChange={(v) => setEditing({ ...editing, is_active: v })} />
              <Label>Aktiivinen</Label>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Sisältö kielittäin</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTranslate}
                  disabled={translating || !editing.heading_fi}
                >
                  {translating ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Languages className="w-4 h-4 mr-1" />}
                  Käännä suomesta
                </Button>
              </div>
              <div className="space-y-3">
                {LANGUAGES.map((l) => (
                  <div key={l.code} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
                    <div>
                      <Label className="text-xs text-muted-foreground">{l.label} – Otsikko</Label>
                      <Input
                        value={(editing as any)[`heading_${l.code}`] || ""}
                        onChange={(e) => setEditing({ ...editing, [`heading_${l.code}`]: e.target.value })}
                        placeholder="Otsikko"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">{l.label} – Alateksti</Label>
                      <Textarea
                        value={(editing as any)[`subtext_${l.code}`] || ""}
                        onChange={(e) => setEditing({ ...editing, [`subtext_${l.code}`]: e.target.value })}
                        placeholder="Alateksti"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">{l.label} – Nappi</Label>
                      <Input
                        value={(editing as any)[`button_text_${l.code}`] || ""}
                        onChange={(e) => setEditing({ ...editing, [`button_text_${l.code}`]: e.target.value })}
                        placeholder="Nappi"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                Tallenna
              </Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Peruuta</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
      ) : banners.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Ei bannereita vielä</p>
      ) : (
        <div className="space-y-3">
          {banners.map((b) => {
            const status = getStatus(b);
            const themeOpt = THEME_OPTIONS.find((t) => t.value === b.theme);
            return (
              <Card key={b.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="text-2xl">{themeOpt?.label.split(" ")[0] || "📢"}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold truncate">{b.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {b.heading_fi || "–"} → {b.target_url}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(b.starts_at).toLocaleDateString("fi")} – {new Date(b.expires_at).toLocaleDateString("fi")}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setEditing({ ...b })}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(b.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PromoBannerAdmin;
