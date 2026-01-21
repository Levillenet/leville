import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, Languages, Check, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BookingTerm {
  id: string;
  section_key: string;
  sort_order: number;
  title_fi: string;
  content_fi: string;
  title_en: string | null;
  content_en: string | null;
  title_sv: string | null;
  content_sv: string | null;
  title_de: string | null;
  content_de: string | null;
  title_es: string | null;
  content_es: string | null;
  title_fr: string | null;
  content_fr: string | null;
  translations_updated_at: string | null;
  updated_at: string;
}

interface BookingTermsAdminProps {
  adminPassword: string;
}

export const BookingTermsAdmin = ({ adminPassword }: BookingTermsAdminProps) => {
  const [terms, setTerms] = useState<BookingTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState<string | null>(null);
  const [editedTerms, setEditedTerms] = useState<Record<string, { title: string; content: string }>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const { data, error } = await supabase
        .from("booking_terms")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setTerms(data || []);
      
      // Initialize edited terms with current values
      const initial: Record<string, { title: string; content: string }> = {};
      data?.forEach(term => {
        initial[term.id] = { title: term.title_fi, content: term.content_fi };
      });
      setEditedTerms(initial);
    } catch (error) {
      console.error("Error fetching terms:", error);
      toast.error("Virhe ladattaessa varausehtoja");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndTranslate = async (term: BookingTerm) => {
    const edited = editedTerms[term.id];
    if (!edited) return;

    setTranslating(term.id);
    
    try {
      const response = await supabase.functions.invoke("translate-booking-terms", {
        body: {
          sectionId: term.id,
          titleFi: edited.title,
          contentFi: edited.content,
        },
        headers: {
          Authorization: `Bearer ${adminPassword}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success(`"${edited.title}" tallennettu ja käännetty!`);
      fetchTerms(); // Refresh to show new translations
    } catch (error: any) {
      console.error("Translation error:", error);
      toast.error(`Käännösvirhe: ${error.message}`);
    } finally {
      setTranslating(null);
    }
  };

  const handleTranslateAll = async () => {
    for (const term of terms) {
      await handleSaveAndTranslate(term);
    }
    toast.success("Kaikki osiot käännetty!");
  };

  const updateEditedTerm = (id: string, field: "title" | "content", value: string) => {
    setEditedTerms(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const hasChanges = (term: BookingTerm) => {
    const edited = editedTerms[term.id];
    if (!edited) return false;
    return edited.title !== term.title_fi || edited.content !== term.content_fi;
  };

  const hasTranslations = (term: BookingTerm) => {
    return !!(term.title_en && term.content_en);
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Varausehdot-hallinta</h2>
          <p className="text-muted-foreground">
            Muokkaa suomenkielistä sisältöä. AI kääntää automaattisesti muille kielille.
          </p>
        </div>
        <Button 
          onClick={handleTranslateAll}
          disabled={translating !== null}
          className="gap-2"
        >
          <Languages className="h-4 w-4" />
          Käännä kaikki osiot
        </Button>
      </div>

      <div className="space-y-4">
        {terms.map((term) => (
          <Card key={term.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono text-xs">
                    {term.section_key}
                  </Badge>
                  <CardTitle className="text-lg">{term.title_fi}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {hasTranslations(term) ? (
                    <Badge variant="default" className="gap-1 bg-primary">
                      <Check className="h-3 w-3" />
                      Käännetty
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Ei käännöksiä
                    </Badge>
                  )}
                  {hasChanges(term) && (
                    <Badge variant="destructive">Muokattu</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Otsikko (FI)</label>
                <Input
                  value={editedTerms[term.id]?.title || ""}
                  onChange={(e) => updateEditedTerm(term.id, "title", e.target.value)}
                  placeholder="Osion otsikko suomeksi"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sisältö (FI)</label>
                <Textarea
                  value={editedTerms[term.id]?.content || ""}
                  onChange={(e) => updateEditedTerm(term.id, "content", e.target.value)}
                  placeholder="Osion sisältö suomeksi"
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>

              {hasTranslations(term) && (
                <Collapsible open={expandedSections[term.id]} onOpenChange={() => toggleSection(term.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 w-full justify-start">
                      {expandedSections[term.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      Näytä käännökset
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg">
                      {[
                        { code: "en", label: "🇬🇧 English", title: term.title_en, content: term.content_en },
                        { code: "sv", label: "🇸🇪 Svenska", title: term.title_sv, content: term.content_sv },
                        { code: "de", label: "🇩🇪 Deutsch", title: term.title_de, content: term.content_de },
                        { code: "es", label: "🇪🇸 Español", title: term.title_es, content: term.content_es },
                        { code: "fr", label: "🇫🇷 Français", title: term.title_fr, content: term.content_fr },
                      ].map((lang) => (
                        <div key={lang.code} className="text-xs space-y-1">
                          <div className="font-medium">{lang.label}</div>
                          <div className="font-semibold text-primary">{lang.title || "-"}</div>
                          <div className="text-muted-foreground line-clamp-3">{lang.content || "-"}</div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-xs text-muted-foreground">
                  {term.translations_updated_at && (
                    <span>Käännetty: {new Date(term.translations_updated_at).toLocaleString("fi-FI")}</span>
                  )}
                </div>
                <Button
                  onClick={() => handleSaveAndTranslate(term)}
                  disabled={translating !== null}
                  className="gap-2"
                >
                  {translating === term.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Käännetään...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Tallenna ja käännä
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
