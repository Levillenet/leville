import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Plus, Trash2, Send, Loader2, FlaskConical, ListChecks, Settings as SettingsIcon, ScrollText, X, Inbox, GraduationCap, Check, Edit3 } from "lucide-react";

interface Settings {
  enabled: boolean;
  mailbox_label: string;
  poll_interval_minutes: number;
  last_poll_at: string | null;
  signature_html: string;
  default_language: string;
  test_mode: boolean;
  test_recipients: string[];
  ai_system_prompt: string;
  auto_send_hours_start: string;
  auto_send_hours_end: string;
  auto_send_topics: string[];
  always_require_approval: boolean;
  away_subject: Record<string, string>;
  away_body: Record<string, string>;
  away_send_outside_topics: boolean;
  away_hours_start: string;
  away_hours_end: string;
  away_only_in_window: boolean;
}

interface Rule {
  id?: string;
  name: string;
  is_active: boolean;
  priority: number;
  match_domain: string;
  match_keywords: string[];
  active_days: number[];
  active_hours_start: string;
  active_hours_end: string;
  response_mode: "template" | "ai";
  template_subject: Record<string, string>;
  template_body: Record<string, string>;
  ai_extra_instructions: string | null;
  cooldown_hours: number;
}

interface LogRow {
  id: string;
  gmail_message_id: string;
  from_email: string;
  from_domain: string;
  subject: string | null;
  matched_rule_name: string | null;
  action: string;
  reply_subject: string | null;
  reply_body: string | null;
  reply_sent_at: string | null;
  is_test: boolean;
  error_message: string | null;
  created_at: string;
}

const DAY_LABELS = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];

const EMPTY_RULE: Rule = {
  name: "",
  is_active: true,
  priority: 100,
  match_domain: "*",
  match_keywords: [],
  active_days: [0, 1, 2, 3, 4, 5, 6],
  active_hours_start: "00:00",
  active_hours_end: "23:59",
  response_mode: "ai",
  template_subject: {},
  template_body: {},
  ai_extra_instructions: "",
  cooldown_hours: 24,
};

interface Props {
  isViewer: boolean;
}

export default function AutoResponderAdmin({ isViewer }: Props) {
  const { toast } = useToast();
  const password = localStorage.getItem("admin_password") || "";

  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [rules, setRules] = useState<Rule[]>([]);
  const [log, setLog] = useState<LogRow[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [learned, setLearned] = useState<any[]>([]);
  const [newRecipient, setNewRecipient] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);

  // Draft editor state
  const [draftEdits, setDraftEdits] = useState<Record<string, { subject: string; body: string }>>({});
  const [draftActioning, setDraftActioning] = useState<string | null>(null);

  // Test form
  const [testFrom, setTestFrom] = useState("");
  const [testSubject, setTestSubject] = useState("Sauna ohjeet?");
  const [testMessage, setTestMessage] = useState("Hei, miten saunan saa päälle huoneistossa? Kiitos!");
  const [testRuleId, setTestRuleId] = useState<string>("__none__");
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState<{ subject: string; body: string; sent: boolean; routing?: any; mode?: string } | null>(null);

  const invoke = async (action: string, extra: Record<string, unknown> = {}) => {
    const { data, error } = await supabase.functions.invoke("autoresponder-manage", {
      body: { action, password, ...extra },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const [s, r, l, d, le] = await Promise.all([
        invoke("get_settings"),
        invoke("list_rules"),
        invoke("list_log", { limit: 100 }),
        invoke("list_drafts", { status: "pending", limit: 100 }),
        invoke("list_learned", { limit: 100 }),
      ]);
      setSettings(s.settings);
      setRules(r.rules || []);
      setLog(l.log || []);
      setDrafts(d.drafts || []);
      setLearned(le.learned || []);
      if (s.settings?.test_recipients?.[0]) setTestFrom(s.settings.test_recipients[0]);
    } catch (e: any) {
      toast({ title: "Lataus epäonnistui", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const reloadDrafts = async () => {
    try {
      const d = await invoke("list_drafts", { status: "pending", limit: 100 });
      setDrafts(d.drafts || []);
    } catch (_) {}
  };

  const approveDraft = async (draftId: string) => {
    setDraftActioning(draftId);
    try {
      const edit = draftEdits[draftId];
      await invoke("approve_draft", {
        id: draftId,
        edited_subject: edit?.subject,
        edited_body: edit?.body,
      });
      toast({ title: "Vastaus lähetetty ja tallennettu opetukseen" });
      setDraftEdits((prev) => { const n = { ...prev }; delete n[draftId]; return n; });
      await reloadDrafts();
      const le = await invoke("list_learned", { limit: 100 });
      setLearned(le.learned || []);
    } catch (e: any) {
      toast({ title: "Lähetys epäonnistui", description: e.message, variant: "destructive" });
    } finally {
      setDraftActioning(null);
    }
  };

  const discardDraft = async (draftId: string) => {
    if (!confirm("Hylätäänkö tämä luonnos?")) return;
    setDraftActioning(draftId);
    try {
      await invoke("discard_draft", { id: draftId });
      await reloadDrafts();
    } catch (e: any) {
      toast({ title: "Hylkäys epäonnistui", description: e.message, variant: "destructive" });
    } finally {
      setDraftActioning(null);
    }
  };

  const deleteLearned = async (id: string) => {
    if (!confirm("Poistetaanko opittu vastaus?")) return;
    try {
      await invoke("delete_learned", { id });
      setLearned((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      toast({ title: "Poisto epäonnistui", description: e.message, variant: "destructive" });
    }
  };

  const toggleLearned = async (id: string, is_active: boolean) => {
    try {
      await invoke("toggle_learned", { id, is_active });
      setLearned((prev) => prev.map((x) => x.id === id ? { ...x, is_active } : x));
    } catch (e: any) {
      toast({ title: "Päivitys epäonnistui", description: e.message, variant: "destructive" });
    }
  };

  useEffect(() => { loadAll(); }, []);

  const saveSettings = async (patch: Partial<Settings>) => {
    if (!settings) return;
    const next = { ...settings, ...patch };
    setSettings(next);
    try {
      await invoke("update_settings", { settings: next });
      toast({ title: "Tallennettu" });
    } catch (e: any) {
      toast({ title: "Tallennus epäonnistui", description: e.message, variant: "destructive" });
      loadAll();
    }
  };

  const addRecipient = async () => {
    const v = newRecipient.trim().toLowerCase();
    if (!v || !v.includes("@") || !settings) return;
    if (settings.test_recipients.includes(v)) { setNewRecipient(""); return; }
    await saveSettings({ test_recipients: [...settings.test_recipients, v] });
    setNewRecipient("");
  };

  const removeRecipient = async (email: string) => {
    if (!settings) return;
    await saveSettings({ test_recipients: settings.test_recipients.filter((e) => e !== email) });
  };

  const openNewRule = () => { setEditingRule({ ...EMPTY_RULE }); setRuleDialogOpen(true); };
  const openEditRule = (r: Rule) => { setEditingRule({ ...r, ai_extra_instructions: r.ai_extra_instructions || "" }); setRuleDialogOpen(true); };

  const saveRule = async () => {
    if (!editingRule) return;
    if (!editingRule.name.trim()) { toast({ title: "Nimi puuttuu", variant: "destructive" }); return; }
    try {
      await invoke("upsert_rule", { rule: editingRule });
      toast({ title: "Sääntö tallennettu" });
      setRuleDialogOpen(false);
      setEditingRule(null);
      const r = await invoke("list_rules");
      setRules(r.rules || []);
    } catch (e: any) {
      toast({ title: "Tallennus epäonnistui", description: e.message, variant: "destructive" });
    }
  };

  const deleteRule = async (id?: string) => {
    if (!id) return;
    if (!confirm("Poistetaanko sääntö?")) return;
    try {
      await invoke("delete_rule", { id });
      setRules((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Poistettu" });
    } catch (e: any) {
      toast({ title: "Poisto epäonnistui", description: e.message, variant: "destructive" });
    }
  };

  const toggleRule = async (rule: Rule) => {
    try {
      await invoke("toggle_rule", { id: rule.id, is_active: !rule.is_active });
      setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, is_active: !r.is_active } : r)));
    } catch (e: any) {
      toast({ title: "Päivitys epäonnistui", description: e.message, variant: "destructive" });
    }
  };

  const runTest = async () => {
    if (!testFrom) { toast({ title: "Lähettäjä puuttuu", variant: "destructive" }); return; }
    setTestSending(true);
    setTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("autoresponder-test", {
        body: {
          password,
          from_email: testFrom,
          subject: testSubject,
          message: testMessage,
          rule_id: testRuleId === "__none__" ? null : testRuleId,
          send_real_email: true,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data.skipped) {
        toast({ title: "AI ohitti viestin", description: "AI tunnisti viestin spämmiksi/bounceksi" });
      } else {
        setTestResult({ subject: data.reply.subject, body: data.reply.body, sent: !!data.sent, routing: data.routing, mode: data.mode });
        toast({
          title: data.sent ? `Vastaus lähetetty osoitteeseen ${testFrom}` : "Vastaus generoitu mutta lähetys epäonnistui",
          description: data.send_error || undefined,
          variant: data.sent ? "default" : "destructive",
        });
      }
      const l = await invoke("list_log", { limit: 100 });
      setLog(l.log || []);
    } catch (e: any) {
      toast({ title: "Testi epäonnistui", description: e.message, variant: "destructive" });
    } finally {
      setTestSending(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  if (!settings) {
    return <Card><CardContent className="pt-6">Asetuksia ei voitu ladata.</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Mail className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-semibold">Auto-vastaaja</h2>
          <p className="text-sm text-muted-foreground">Automaattiset vastaukset osoitteeseen info@leville.net Gmail-yhteyden kautta.</p>
        </div>
      </div>

      <Tabs defaultValue={drafts.length > 0 ? "approve" : "settings"} className="space-y-4">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="settings"><SettingsIcon className="w-4 h-4 mr-2" />Asetukset</TabsTrigger>
          <TabsTrigger value="approve">
            <Inbox className="w-4 h-4 mr-2" />
            Hyväksyntä {drafts.length > 0 && <Badge className="ml-2" variant="destructive">{drafts.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="rules"><ListChecks className="w-4 h-4 mr-2" />Säännöt ({rules.length})</TabsTrigger>
          <TabsTrigger value="learned"><GraduationCap className="w-4 h-4 mr-2" />Opitut ({learned.length})</TabsTrigger>
          <TabsTrigger value="test"><FlaskConical className="w-4 h-4 mr-2" />Testaus</TabsTrigger>
          <TabsTrigger value="log"><ScrollText className="w-4 h-4 mr-2" />Loki</TabsTrigger>
        </TabsList>

        {/* SETTINGS */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yleisasetukset</CardTitle>
              <CardDescription>Pää-on/off ja testitila. Testitilassa botti vastaa vain alla listattuihin osoitteisiin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-vastaaja päällä</Label>
                  <p className="text-xs text-muted-foreground">Polling pyörii 5 min välein.</p>
                </div>
                <Switch checked={settings.enabled} onCheckedChange={(v) => saveSettings({ enabled: v })} disabled={isViewer} />
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <Label>Testitila</Label>
                  <p className="text-xs text-muted-foreground">Kun päällä, vastataan vain testilistalle. Suosittelemme jättämään päälle kunnes olet varma.</p>
                </div>
                <Switch checked={settings.test_mode} onCheckedChange={(v) => saveSettings({ test_mode: v })} disabled={isViewer} />
              </div>

              <div className="border-t pt-4 space-y-2">
                <Label>Testisähköpostit ({settings.test_recipients.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {settings.test_recipients.map((e) => (
                    <Badge key={e} variant="secondary" className="gap-1">
                      {e}
                      {!isViewer && (
                        <button type="button" onClick={() => removeRecipient(e)} className="hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  {settings.test_recipients.length === 0 && (
                    <p className="text-xs text-muted-foreground">Ei vielä lisättyjä osoitteita.</p>
                  )}
                </div>
                {!isViewer && (
                  <div className="flex gap-2 pt-2">
                    <Input
                      placeholder="oma@gmail.com"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addRecipient(); } }}
                    />
                    <Button onClick={addRecipient} disabled={!newRecipient.trim()}>
                      <Plus className="w-4 h-4 mr-1" />Lisää
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <Label>Oletuskieli (kun ei tunnistu)</Label>
                  <Select value={settings.default_language} onValueChange={(v) => saveSettings({ default_language: v })} disabled={isViewer}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fi">Suomi</SelectItem>
                      <SelectItem value="sv">Svenska</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="nl">Nederlands</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Viimeisin tarkistus</Label>
                  <p className="text-sm pt-2 text-muted-foreground">
                    {settings.last_poll_at ? new Date(settings.last_poll_at).toLocaleString("fi-FI") : "Ei vielä ajettu"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label>Allekirjoitus (HTML sallittu, tagit poistetaan tekstivastauksissa)</Label>
                <Textarea
                  rows={3}
                  value={settings.signature_html}
                  onChange={(e) => setSettings({ ...settings, signature_html: e.target.value })}
                  onBlur={(e) => saveSettings({ signature_html: e.target.value })}
                  disabled={isViewer}
                />
              </div>

              <div className="border-t pt-4">
                <Label>Globaali AI-systeemiprompt (valinnainen — tyhjänä käytetään oletusta)</Label>
                <Textarea
                  rows={5}
                  value={settings.ai_system_prompt}
                  onChange={(e) => setSettings({ ...settings, ai_system_prompt: e.target.value })}
                  onBlur={(e) => saveSettings({ ai_system_prompt: e.target.value })}
                  disabled={isViewer}
                  placeholder="Jätä tyhjäksi käyttääksesi oletusta. Ylikirjoittaa BASE_SYSTEM_PROMPT:in jos täytetty."
                />
              </div>
            </CardContent>
          </Card>

          {/* AUTO-SEND WINDOW + WHITELIST TOPICS */}
          <Card>
            <CardHeader>
              <CardTitle>Aikataulutus ja auto-lähetys</CardTitle>
              <CardDescription>
                Aikaikkunan sisällä tunnistetut "selkeät" aiheet (sauna, wifi, check-in jne.) lähtevät automaattisesti.
                Aikaikkunan ulkopuolella ne menevät <strong>Hyväksyntä</strong>-välilehdelle luonnoksena. Aika Helsinki-ajassa.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Auto-lähetys alkaen</Label>
                  <Input type="time" value={settings.auto_send_hours_start.slice(0,5)}
                    onChange={(e) => setSettings({ ...settings, auto_send_hours_start: e.target.value })}
                    onBlur={(e) => saveSettings({ auto_send_hours_start: e.target.value })}
                    disabled={isViewer} />
                </div>
                <div>
                  <Label>Auto-lähetys päättyen</Label>
                  <Input type="time" value={settings.auto_send_hours_end.slice(0,5)}
                    onChange={(e) => setSettings({ ...settings, auto_send_hours_end: e.target.value })}
                    onBlur={(e) => saveSettings({ auto_send_hours_end: e.target.value })}
                    disabled={isViewer} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Esimerkki: 22:00–07:00 = yöllä lähetään automaattisesti, päivällä luonnos ihmisen tarkistettavaksi.
              </p>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <Label>Vaadi aina hyväksyntä</Label>
                  <p className="text-xs text-muted-foreground">Kun päällä, mikään ei lähde itsestään – kaikki menee Hyväksyntä-jonoon.</p>
                </div>
                <Switch checked={settings.always_require_approval}
                  onCheckedChange={(v) => saveSettings({ always_require_approval: v })}
                  disabled={isViewer} />
              </div>

              <div className="border-t pt-4 space-y-2">
                <Label>Auto-lähetettävät aiheet ({settings.auto_send_topics.length})</Label>
                <p className="text-xs text-muted-foreground">
                  Vain nämä aiheet lähtevät ilman ihmisen hyväksyntää (kun aikaikkuna on päällä). Kaikki muut menevät luonnokseksi tai poissaoloviestiksi.
                  Tunnistetut aiheet: sauna, wifi, checkin, checkout, fireplace, heating, support, directions, activities, restaurants, weather, ski-passes, accommodations, booking-terms, company.
                </p>
                <div className="flex flex-wrap gap-2">
                  {settings.auto_send_topics.map((t) => (
                    <Badge key={t} variant="secondary" className="gap-1">
                      {t}
                      {!isViewer && (
                        <button type="button" onClick={() => saveSettings({ auto_send_topics: settings.auto_send_topics.filter((x) => x !== t) })} className="hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  {settings.auto_send_topics.length === 0 && (
                    <p className="text-xs text-muted-foreground">Ei aiheita – mikään ei lähde automaattisesti.</p>
                  )}
                </div>
                {!isViewer && (
                  <div className="flex gap-2 pt-2">
                    <Input placeholder="esim. sauna" value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const v = newTopic.trim().toLowerCase();
                          if (v && !settings.auto_send_topics.includes(v)) {
                            saveSettings({ auto_send_topics: [...settings.auto_send_topics, v] });
                          }
                          setNewTopic("");
                        }
                      }} />
                    <Button onClick={() => {
                      const v = newTopic.trim().toLowerCase();
                      if (v && !settings.auto_send_topics.includes(v)) {
                        saveSettings({ auto_send_topics: [...settings.auto_send_topics, v] });
                      }
                      setNewTopic("");
                    }} disabled={!newTopic.trim()}>
                      <Plus className="w-4 h-4 mr-1" />Lisää
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AWAY MESSAGE */}
          <Card>
            <CardHeader>
              <CardTitle>Poissaoloviesti</CardTitle>
              <CardDescription>
                Kun viesti EI osu auto-lähetettäviin aiheisiin, järjestelmä voi lähettää automaattisesti yleisen
                poissaoloviestin (joka ei yritä vastata varsinaiseen kysymykseen). Muuten viesti menee luonnoksena hyväksyntään.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Lähetä poissaoloviesti automaattisesti tuntemattomista aiheista</Label>
                  <p className="text-xs text-muted-foreground">Pois päältä = kaikki tuntemattomat aiheet menevät luonnoksena hyväksyntään.</p>
                </div>
                <Switch checked={settings.away_send_outside_topics}
                  onCheckedChange={(v) => saveSettings({ away_send_outside_topics: v })}
                  disabled={isViewer} />
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <div>
                  <Label>Lähetä poissaoloviesti vain tiettynä aikana (esim. öisin)</Label>
                  <p className="text-xs text-muted-foreground">Pois päältä = poissaoloviesti voidaan lähettää milloin tahansa. Päällä = vain alla olevassa aikaikkunassa, muulloin viesti menee luonnoksena hyväksyntään.</p>
                </div>
                <Switch checked={settings.away_only_in_window}
                  onCheckedChange={(v) => saveSettings({ away_only_in_window: v })}
                  disabled={isViewer} />
              </div>

              {settings.away_only_in_window && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Aikaikkuna alkaa</Label>
                    <Input type="time" value={(settings.away_hours_start || "22:00").slice(0,5)}
                      onChange={(e) => setSettings({ ...settings, away_hours_start: e.target.value })}
                      onBlur={(e) => saveSettings({ away_hours_start: e.target.value })}
                      disabled={isViewer} />
                  </div>
                  <div>
                    <Label className="text-xs">Aikaikkuna päättyy</Label>
                    <Input type="time" value={(settings.away_hours_end || "07:00").slice(0,5)}
                      onChange={(e) => setSettings({ ...settings, away_hours_end: e.target.value })}
                      onBlur={(e) => saveSettings({ away_hours_end: e.target.value })}
                      disabled={isViewer} />
                  </div>
                  <p className="col-span-2 text-xs text-muted-foreground">Helsingin aikaa. Voi olla yön yli, esim. 22:00 → 07:00.</p>
                </div>
              )}

              {(["fi","en","sv","de"] as const).map((lang) => (
                <div key={lang} className="border rounded p-3 space-y-2">
                  <Label className="uppercase text-xs">{lang}</Label>
                  <Input placeholder="Aihe"
                    value={settings.away_subject?.[lang] || ""}
                    onChange={(e) => setSettings({ ...settings, away_subject: { ...settings.away_subject, [lang]: e.target.value } })}
                    onBlur={() => saveSettings({ away_subject: settings.away_subject })}
                    disabled={isViewer} />
                  <Textarea rows={5} placeholder="Viesti"
                    value={settings.away_body?.[lang] || ""}
                    onChange={(e) => setSettings({ ...settings, away_body: { ...settings.away_body, [lang]: e.target.value } })}
                    onBlur={() => saveSettings({ away_body: settings.away_body })}
                    disabled={isViewer} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* APPROVE QUEUE */}
        <TabsContent value="approve" className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{drafts.length} odottavaa luonnosta. Muokkaa tarvittaessa ja paina Hyväksy &amp; lähetä.</p>
            <Button variant="outline" size="sm" onClick={reloadDrafts}><Loader2 className="w-3 h-3 mr-1" />Päivitä</Button>
          </div>
          {drafts.length === 0 && (
            <Card><CardContent className="pt-6 text-muted-foreground">Ei odottavia luonnoksia. 🎉</CardContent></Card>
          )}
          {drafts.map((d) => {
            const edit = draftEdits[d.id] || { subject: d.ai_subject || "", body: d.ai_body || "" };
            return (
              <Card key={d.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{d.detected_topic || "tuntematon aihe"}</Badge>
                    <Badge variant="outline">{d.detected_language || "?"}</Badge>
                    {d.matched_rule_name && <Badge variant="secondary">{d.matched_rule_name}</Badge>}
                    <span className="text-xs text-muted-foreground ml-auto">{new Date(d.created_at).toLocaleString("fi-FI")}</span>
                  </div>
                  <CardTitle className="text-base mt-2">{d.from_name || d.from_email}</CardTitle>
                  <CardDescription>{d.from_email} · {d.incoming_subject}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <details>
                    <summary className="text-xs cursor-pointer text-muted-foreground">Alkuperäinen viesti</summary>
                    <pre className="whitespace-pre-wrap text-xs font-sans mt-2 p-3 bg-muted rounded max-h-40 overflow-y-auto">{d.incoming_body}</pre>
                  </details>
                  <div>
                    <Label className="text-xs">Vastauksen aihe</Label>
                    <Input value={edit.subject}
                      onChange={(e) => setDraftEdits((p) => ({ ...p, [d.id]: { ...edit, subject: e.target.value } }))} />
                  </div>
                  <div>
                    <Label className="text-xs">Vastauksen sisältö</Label>
                    <Textarea rows={10} value={edit.body}
                      onChange={(e) => setDraftEdits((p) => ({ ...p, [d.id]: { ...edit, body: e.target.value } }))} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => approveDraft(d.id)} disabled={draftActioning === d.id || isViewer}>
                      {draftActioning === d.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                      {edit.subject !== d.ai_subject || edit.body !== d.ai_body ? "Hyväksy muokattuna & lähetä" : "Hyväksy & lähetä"}
                    </Button>
                    <Button variant="outline" onClick={() => discardDraft(d.id)} disabled={draftActioning === d.id || isViewer}>
                      <Trash2 className="w-4 h-4 mr-2" />Hylkää
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* LEARNED */}
        <TabsContent value="learned" className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Hyväksytyt ja muokatut vastaukset – AI käyttää näitä esimerkkeinä jatkossa. Voit poistaa huonot esimerkit tai poistaa käytöstä.
          </p>
          {learned.length === 0 && (
            <Card><CardContent className="pt-6 text-muted-foreground">Ei vielä opittuja vastauksia.</CardContent></Card>
          )}
          {learned.map((l) => (
            <Card key={l.id} className={!l.is_active ? "opacity-60" : ""}>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge variant="outline">{l.topic || "general"}</Badge>
                  <Badge variant="outline">{l.language}</Badge>
                  {l.was_edited && <Badge variant="secondary"><Edit3 className="w-3 h-3 mr-1" />muokattu</Badge>}
                  <span className="text-xs text-muted-foreground">käytetty {l.use_count}x · {new Date(l.created_at).toLocaleDateString("fi-FI")}</span>
                  {!isViewer && (
                    <div className="ml-auto flex items-center gap-2">
                      <Switch checked={l.is_active} onCheckedChange={(v) => toggleLearned(l.id, v)} />
                      <Button variant="ghost" size="sm" onClick={() => deleteLearned(l.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium">{l.approved_subject}</p>
                {l.source_subject && <p className="text-xs text-muted-foreground mt-1">Alkup. kysymys: {l.source_subject}</p>}
                <details className="mt-2">
                  <summary className="text-xs cursor-pointer text-muted-foreground">Näytä vastaus</summary>
                  <pre className="whitespace-pre-wrap text-xs font-sans mt-1 p-2 bg-muted rounded">{l.approved_body}</pre>
                </details>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* RULES */}
        <TabsContent value="rules" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Säännöt järjestyksessä — pienempi prioriteettinumero = käsitellään ensin.</p>
            {!isViewer && <Button onClick={openNewRule}><Plus className="w-4 h-4 mr-1" />Lisää sääntö</Button>}
          </div>

          <div className="grid gap-3">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold">{rule.name}</h4>
                        <Badge variant={rule.is_active ? "default" : "secondary"}>
                          {rule.is_active ? "Aktiivinen" : "Pois"}
                        </Badge>
                        <Badge variant="outline">P{rule.priority}</Badge>
                        <Badge variant="outline">{rule.response_mode === "ai" ? "AI" : "Pohja"}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Domain: <code>{rule.match_domain}</code> ·
                        Päivät: {rule.active_days.map((d) => DAY_LABELS[d]).join(", ")} ·
                        Klo {rule.active_hours_start.slice(0,5)}–{rule.active_hours_end.slice(0,5)} ·
                        Cooldown {rule.cooldown_hours}h
                      </p>
                      {rule.match_keywords.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">Avainsanat: {rule.match_keywords.join(", ")}</p>
                      )}
                      {rule.ai_extra_instructions && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{rule.ai_extra_instructions}</p>
                      )}
                    </div>
                    {!isViewer && (
                      <div className="flex items-center gap-2 shrink-0">
                        <Switch checked={rule.is_active} onCheckedChange={() => toggleRule(rule)} />
                        <Button variant="outline" size="sm" onClick={() => openEditRule(rule)}>Muokkaa</Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteRule(rule.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {rules.length === 0 && <Card><CardContent className="pt-6 text-muted-foreground">Ei sääntöjä. Lisää ensimmäinen yllä.</CardContent></Card>}
          </div>
        </TabsContent>

        {/* TEST */}
        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testaa vastausta</CardTitle>
              <CardDescription>
                Lähettää oikean vastauksen Gmailista valittuun testisähköpostiin. Lisää oma osoitteesi ensin Asetukset-välilehdellä.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Lähettäjä (testisähköposti)</Label>
                  <Select value={testFrom} onValueChange={setTestFrom}>
                    <SelectTrigger><SelectValue placeholder="Valitse osoite" /></SelectTrigger>
                    <SelectContent>
                      {settings.test_recipients.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Käytä sääntöä (valinnainen)</Label>
                  <Select value={testRuleId} onValueChange={setTestRuleId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">– Ad-hoc (pelkkä AI + tietopankki) –</SelectItem>
                      {rules.map((r) => <SelectItem key={r.id} value={r.id!}>{r.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Aihe</Label>
                <Input value={testSubject} onChange={(e) => setTestSubject(e.target.value)} />
              </div>

              <div>
                <Label>Viesti</Label>
                <Textarea rows={4} value={testMessage} onChange={(e) => setTestMessage(e.target.value)} />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => { setTestSubject("Sauna ohjeet"); setTestMessage("Hei, miten saunan saa päälle huoneistossa?"); }}>Sauna</Button>
                <Button variant="outline" size="sm" onClick={() => { setTestSubject("Check-in code"); setTestMessage("Hi, I am arriving at 23:30 tonight and don't have the door code yet. What should I do?"); }}>Yöllinen check-in</Button>
                <Button variant="outline" size="sm" onClick={() => { setTestSubject("Wi-Fi password"); setTestMessage("What is the wifi password?"); }}>Wi-Fi</Button>
                <Button variant="outline" size="sm" onClick={() => { setTestSubject("Fireplace"); setTestMessage("Wie zünde ich den Kamin an?"); }}>Takka (DE)</Button>
                <Button variant="outline" size="sm" onClick={() => { setTestSubject("Husky safari"); setTestMessage("Hola, dónde puedo reservar un safari de huskies?"); }}>Husky (ES)</Button>
              </div>

              <Button onClick={runTest} disabled={testSending || !testFrom || isViewer}>
                {testSending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Lähetä testivastaus
              </Button>

              {testResult && (
                <Card className="border-primary/40 bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                      Generoitu vastaus
                      {testResult.sent && <Badge>Lähetetty</Badge>}
                      {testResult.mode && <Badge variant="outline">mode: {testResult.mode}</Badge>}
                      {testResult.routing?.detectedTopic && <Badge variant="outline">aihe: {testResult.routing.detectedTopic}</Badge>}
                      {testResult.routing?.isWhitelistTopic && <Badge variant="default">whitelist ✓</Badge>}
                      {testResult.routing?.inAutoWindow && <Badge variant="default">auto-ikkuna ✓</Badge>}
                      {testResult.routing?.wouldAutoSend && <Badge variant="default">auto-lähetys ✓</Badge>}
                      {testResult.routing?.wouldSendAway && <Badge variant="secondary">poissaolo</Badge>}
                    </CardTitle>
                    <CardDescription className="font-medium text-foreground">{testResult.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap text-sm font-sans">{testResult.body}</pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOG */}
        <TabsContent value="log" className="space-y-3">
          <p className="text-sm text-muted-foreground">100 viimeisintä käsiteltyä viestiä (uusin ensin).</p>
          <div className="grid gap-2">
            {log.map((row) => (
              <Card key={row.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={row.action === "replied" || row.action === "test_replied" ? "default" : "secondary"}>
                          {row.action}
                        </Badge>
                        {row.is_test && <Badge variant="outline">TEST</Badge>}
                        <span className="text-sm font-medium truncate">{row.from_email}</span>
                        <span className="text-xs text-muted-foreground">{new Date(row.created_at).toLocaleString("fi-FI")}</span>
                      </div>
                      <p className="text-sm mt-1 truncate">{row.subject || "(no subject)"}</p>
                      {row.matched_rule_name && (
                        <p className="text-xs text-muted-foreground">Sääntö: {row.matched_rule_name}</p>
                      )}
                      {row.error_message && (
                        <p className="text-xs text-destructive mt-1">{row.error_message}</p>
                      )}
                      {row.reply_body && (
                        <details className="mt-2">
                          <summary className="text-xs cursor-pointer text-muted-foreground">Näytä vastaus</summary>
                          <pre className="whitespace-pre-wrap text-xs font-sans mt-1 p-2 bg-muted rounded">{row.reply_body}</pre>
                        </details>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {log.length === 0 && <Card><CardContent className="pt-6 text-muted-foreground">Loki tyhjä.</CardContent></Card>}
          </div>
        </TabsContent>
      </Tabs>

      {/* RULE EDITOR DIALOG */}
      <Dialog open={ruleDialogOpen} onOpenChange={setRuleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRule?.id ? "Muokkaa sääntöä" : "Uusi sääntö"}</DialogTitle>
            <DialogDescription>Säännöt suoritetaan prioriteettinumeron mukaisessa järjestyksessä.</DialogDescription>
          </DialogHeader>

          {editingRule && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nimi</Label>
                  <Input value={editingRule.name} onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })} />
                </div>
                <div>
                  <Label>Prioriteetti (pieni = ensin)</Label>
                  <Input type="number" value={editingRule.priority} onChange={(e) => setEditingRule({ ...editingRule, priority: parseInt(e.target.value) || 100 })} />
                </div>
              </div>

              <div>
                <Label>Lähettäjän domain (* = kaikki)</Label>
                <Input value={editingRule.match_domain} onChange={(e) => setEditingRule({ ...editingRule, match_domain: e.target.value })} placeholder="esim. guest.booking.com" />
              </div>

              <div>
                <Label>Avainsanat (pilkulla erotettuna, valinnainen)</Label>
                <Input
                  value={editingRule.match_keywords.join(", ")}
                  onChange={(e) => setEditingRule({ ...editingRule, match_keywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                  placeholder="sauna, check-in"
                />
              </div>

              <div>
                <Label>Aktiiviset päivät</Label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {DAY_LABELS.map((label, idx) => (
                    <Button
                      key={idx}
                      variant={editingRule.active_days.includes(idx) ? "default" : "outline"}
                      size="sm"
                      type="button"
                      onClick={() => {
                        const set = new Set(editingRule.active_days);
                        if (set.has(idx)) set.delete(idx); else set.add(idx);
                        setEditingRule({ ...editingRule, active_days: Array.from(set).sort() });
                      }}
                    >{label}</Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Aktiivinen alkaen</Label>
                  <Input type="time" value={editingRule.active_hours_start.slice(0,5)} onChange={(e) => setEditingRule({ ...editingRule, active_hours_start: e.target.value })} />
                </div>
                <div>
                  <Label>Aktiivinen päättyen</Label>
                  <Input type="time" value={editingRule.active_hours_end.slice(0,5)} onChange={(e) => setEditingRule({ ...editingRule, active_hours_end: e.target.value })} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Jos pääty &lt; alku, ikkuna kulkee yli yön (esim. 22:00–07:00). Aika Helsinki-ajassa.</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Vastaustyyppi</Label>
                  <Select value={editingRule.response_mode} onValueChange={(v: "ai" | "template") => setEditingRule({ ...editingRule, response_mode: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai">AI (suositus)</SelectItem>
                      <SelectItem value="template">Pohjamalli</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cooldown (tuntia per lähettäjä)</Label>
                  <Input type="number" value={editingRule.cooldown_hours} onChange={(e) => setEditingRule({ ...editingRule, cooldown_hours: parseInt(e.target.value) || 0 })} />
                </div>
              </div>

              {editingRule.response_mode === "ai" && (
                <div>
                  <Label>AI-lisäohjeet (lisätään systeemikehotteeseen)</Label>
                  <Textarea
                    rows={5}
                    value={editingRule.ai_extra_instructions || ""}
                    onChange={(e) => setEditingRule({ ...editingRule, ai_extra_instructions: e.target.value })}
                    placeholder="Esim. The sender is a Booking.com guest. Always confirm receipt and answer with the correct leville.net link."
                  />
                </div>
              )}

              {editingRule.response_mode === "template" && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Placeholderit: {`{{sender_name}}, {{sender_email}}, {{date}}, {{subject}}`}</p>
                  {["fi", "en"].map((lang) => (
                    <div key={lang} className="border rounded p-3 space-y-2">
                      <Label className="uppercase">{lang}</Label>
                      <Input
                        placeholder="Aihe"
                        value={editingRule.template_subject[lang] || ""}
                        onChange={(e) => setEditingRule({ ...editingRule, template_subject: { ...editingRule.template_subject, [lang]: e.target.value } })}
                      />
                      <Textarea
                        rows={5}
                        placeholder="Viesti"
                        value={editingRule.template_body[lang] || ""}
                        onChange={(e) => setEditingRule({ ...editingRule, template_body: { ...editingRule.template_body, [lang]: e.target.value } })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setRuleDialogOpen(false)}>Peruuta</Button>
            <Button onClick={saveRule}>Tallenna</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
