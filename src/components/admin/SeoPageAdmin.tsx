import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Globe, Loader2, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  { value: 'fi', label: 'FI' },
  { value: 'en', label: 'EN' },
  { value: 'sv', label: 'SV' },
  { value: 'de', label: 'DE' },
  { value: 'es', label: 'ES' },
  { value: 'fr', label: 'FR' },
  { value: 'nl', label: 'NL' },
];

const LANG_FULL_NAMES: Record<string, string> = {
  fi: 'Suomi', en: 'English', sv: 'Svenska', de: 'Deutsch', es: 'Español', fr: 'Français', nl: 'Nederlands',
};

interface PageGroup {
  component_name: string;
  pages: SeoPage[];
  langCounts: Record<string, number>;
  isPublished: boolean;
  totalPages: number;
}

const SeoPageAdmin = ({ isViewer }: SeoPageAdminProps) => {
  const [pages, setPages] = useState<SeoPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
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

  const groups = useMemo<PageGroup[]>(() => {
    const map = new Map<string, SeoPage[]>();
    for (const page of pages) {
      const key = page.component_name;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(page);
    }

    return Array.from(map.entries()).map(([component_name, groupPages]) => {
      const langCounts: Record<string, number> = {};
      for (const p of groupPages) {
        langCounts[p.lang] = (langCounts[p.lang] || 0) + 1;
      }
      return {
        component_name,
        pages: groupPages.sort((a, b) => a.lang.localeCompare(b.lang) || a.path.localeCompare(b.path)),
        langCounts,
        isPublished: groupPages.every(p => p.is_published),
        totalPages: groupPages.length,
      };
    }).sort((a, b) => a.component_name.localeCompare(b.component_name));
  }, [pages]);

  const toggleGroupPublish = async (component_name: string, currentState: boolean) => {
    try {
      const { error } = await supabase.functions.invoke('manage-seo-pages', {
        body: { action: 'toggle_publish_group', password: getPassword(), component_name, is_published: !currentState }
      });
      if (error) throw error;
      setPages(prev => prev.map(p => p.component_name === component_name ? { ...p, is_published: !currentState } : p));
      toast({ title: !currentState ? "Ryhmä julkaistu" : "Ryhmä piilotettu", description: `${component_name}: kaikki kieliversiot` });
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

  const toggleExpand = (component_name: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(component_name)) next.delete(component_name);
      else next.add(component_name);
      return next;
    });
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
                {groups.length} ryhmää · {publishedCount} julkaistu · {draftCount} luonnos
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
                        Sama nimi kuin muiden kieliversioiden → samaan ryhmään
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
                            <SelectItem key={l.value} value={l.value}>{LANG_FULL_NAMES[l.value] || l.value}</SelectItem>
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
          {groups.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">
              Ei rekisteröityjä SEO-sivuja.
            </p>
          ) : (
            <div className="space-y-1">
              {groups.map((group) => {
                const isExpanded = expandedGroups.has(group.component_name);
                return (
                  <Collapsible key={group.component_name} open={isExpanded} onOpenChange={() => toggleExpand(group.component_name)}>
                    <div className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted/50 transition-colors">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </CollapsibleTrigger>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-medium">{group.component_name}</code>
                          <span className="text-xs text-muted-foreground">({group.totalPages})</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                          {Object.entries(group.langCounts)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([lang, count]) => (
                              <Badge key={lang} variant="outline" className="text-[10px] px-1.5 py-0">
                                {lang.toUpperCase()}{count > 1 ? ` ×${count}` : ''}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Switch
                          checked={group.isPublished}
                          onCheckedChange={() => !isViewer && toggleGroupPublish(group.component_name, group.isPublished)}
                          disabled={isViewer}
                        />
                        <span className={`text-xs w-16 ${group.isPublished ? 'text-green-600' : 'text-muted-foreground'}`}>
                          {group.isPublished ? 'Julkaistu' : 'Luonnos'}
                        </span>
                      </div>
                    </div>

                    <CollapsibleContent>
                      <div className="ml-9 border-l border-border pl-3 mb-2">
                        {group.pages.map((page) => (
                          <div key={page.id} className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                              {page.lang.toUpperCase()}
                            </Badge>
                            <code className="text-xs truncate flex-1">{page.path}</code>
                            <span className="text-xs truncate max-w-[150px]">{page.title}</span>
                            {!isViewer && (
                              <div className="flex items-center gap-0.5 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => window.open(page.path, '_blank')}
                                  title="Esikatsele"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                  onClick={() => deletePage(page.id, page.title)}
                                  title="Poista"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoPageAdmin;
