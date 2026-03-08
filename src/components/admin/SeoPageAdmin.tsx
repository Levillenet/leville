import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Globe, Loader2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeoPage {
  id: string;
  path: string;
  title: string;
  component_name: string;
  lang: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface SeoPageAdminProps {
  isViewer: boolean;
}

const LANGUAGES = [
  { value: 'fi', label: 'Suomi' },
  { value: 'en', label: 'English' },
  { value: 'sv', label: 'Svenska' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'nl', label: 'Nederlands' },
];

const SeoPageAdmin = ({ isViewer }: SeoPageAdminProps) => {
  const [pages, setPages] = useState<SeoPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPage, setNewPage] = useState({ path: '', title: '', component_name: '', lang: 'fi', sort_order: 0 });
  const { toast } = useToast();

  const getPassword = () => localStorage.getItem('admin_password') || '';

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-seo-pages', {
        body: { action: 'get_all', password: getPassword() }
      });
      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching SEO pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPages(); }, []);

  const togglePublish = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase.functions.invoke('manage-seo-pages', {
        body: { action: 'toggle_publish', password: getPassword(), id, is_published: !currentState }
      });
      if (error) throw error;
      setPages(prev => prev.map(p => p.id === id ? { ...p, is_published: !currentState } : p));
      toast({ title: !currentState ? "Julkaistu" : "Piilotettu", description: "Sivun tila päivitetty" });
    } catch (error) {
      toast({ title: "Virhe", description: "Tilan päivitys epäonnistui", variant: "destructive" });
    }
  };

  const createPage = async () => {
    if (!newPage.path || !newPage.title || !newPage.component_name) {
      toast({ title: "Virhe", description: "Täytä kaikki pakolliset kentät", variant: "destructive" });
      return;
    }
    try {
      const { data, error } = await supabase.functions.invoke('manage-seo-pages', {
        body: { action: 'create_page', password: getPassword(), ...newPage }
      });
      if (error) throw error;
      setPages(prev => [...prev, data]);
      setNewPage({ path: '', title: '', component_name: '', lang: 'fi', sort_order: 0 });
      setIsDialogOpen(false);
      toast({ title: "Luotu", description: "Uusi SEO-sivu lisätty rekisteriin" });
    } catch (error) {
      toast({ title: "Virhe", description: "Sivun luonti epäonnistui", variant: "destructive" });
    }
  };

  const deletePage = async (id: string, title: string) => {
    if (!confirm(`Poistetaanko "${title}" rekisteristä?`)) return;
    try {
      const { error } = await supabase.functions.invoke('manage-seo-pages', {
        body: { action: 'delete_page', password: getPassword(), id }
      });
      if (error) throw error;
      setPages(prev => prev.filter(p => p.id !== id));
      toast({ title: "Poistettu", description: "Sivu poistettu rekisteristä" });
    } catch (error) {
      toast({ title: "Virhe", description: "Poisto epäonnistui", variant: "destructive" });
    }
  };

  const publishedCount = pages.filter(p => p.is_published).length;
  const draftCount = pages.filter(p => !p.is_published).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                SEO-sivujen hallinta
              </CardTitle>
              <CardDescription className="mt-1">
                Hallitse sivujen julkaisutilaa. Julkaistut: {publishedCount} · Luonnokset: {draftCount}
              </CardDescription>
            </div>
            {!isViewer && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Lisää sivu
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Lisää uusi SEO-sivu rekisteriin</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Nimi (admin-näkymä)</label>
                      <Input
                        placeholder="esim. Sauna-opas Levi"
                        value={newPage.title}
                        onChange={(e) => setNewPage(p => ({ ...p, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">URL-polku</label>
                      <Input
                        placeholder="esim. /opas/sauna-levi"
                        value={newPage.path}
                        onChange={(e) => setNewPage(p => ({ ...p, path: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Komponentin nimi</label>
                      <Input
                        placeholder="esim. SaunaLevi"
                        value={newPage.component_name}
                        onChange={(e) => setNewPage(p => ({ ...p, component_name: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Komponentin nimi koodissa (App.tsx:n komponenttikartta)
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Kieli</label>
                      <Select value={newPage.lang} onValueChange={(v) => setNewPage(p => ({ ...p, lang: v }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map(l => (
                            <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Järjestys</label>
                      <Input
                        type="number"
                        value={newPage.sort_order}
                        onChange={(e) => setNewPage(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <Button onClick={createPage} className="w-full">
                      Lisää rekisteriin
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">
              Ei rekisteröityjä SEO-sivuja. Lisää ensimmäinen klikkaamalla "Lisää sivu".
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Nimi</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Polku</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Komponentti</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Kieli</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Tila</th>
                    {!isViewer && (
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">Toiminnot</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-2 px-3 font-medium">{page.title}</td>
                      <td className="py-2 px-3">
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{page.path}</code>
                      </td>
                      <td className="py-2 px-3">
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{page.component_name}</code>
                      </td>
                      <td className="py-2 px-3">
                        <Badge variant="outline" className="text-xs">
                          {LANGUAGES.find(l => l.value === page.lang)?.label || page.lang}
                        </Badge>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={page.is_published}
                            onCheckedChange={() => !isViewer && togglePublish(page.id, page.is_published)}
                            disabled={isViewer}
                          />
                          <span className={`text-xs ${page.is_published ? 'text-green-600' : 'text-muted-foreground'}`}>
                            {page.is_published ? 'Julkaistu' : 'Luonnos'}
                          </span>
                        </div>
                      </td>
                      {!isViewer && (
                        <td className="py-2 px-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {page.is_published && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(page.path, '_blank')}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deletePage(page.id, page.title)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoPageAdmin;
