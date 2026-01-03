import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  getAllDefaultPropertyDetails, 
  getPropertyDetailsWithOverride,
  PropertyDetail,
  PropertyCategory
} from "@/data/propertyDetails";
import { useAdminSettingsManager, DbPropertySettings } from "@/hooks/useAdminSettings";
import { Pencil, RotateCcw, Save, X, Building, Home, Mountain, Star, TreePine, Percent, Loader2, Info } from "lucide-react";

// Category icons and labels
const categoryConfig: Record<PropertyCategory, { icon: React.ReactNode; label: string; color: string }> = {
  glacier: { icon: <Mountain className="w-4 h-4" />, label: "Glacier", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  skistar: { icon: <Star className="w-4 h-4" />, label: "Skistar", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  chalet: { icon: <Home className="w-4 h-4" />, label: "Chalet", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  platinum: { icon: <Building className="w-4 h-4" />, label: "Platinum", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
  cabin: { icon: <TreePine className="w-4 h-4" />, label: "Mökki", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  other: { icon: <Building className="w-4 h-4" />, label: "Muu", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" }
};

const PropertyAdmin = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PropertyDetail>>({});
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();
  
  const { 
    settings, 
    isLoading, 
    upsertProperty, 
    resetProperty, 
    resetAll,
    isSaving 
  } = useAdminSettingsManager();

  // Get properties with database overrides applied
  const defaultProperties = getAllDefaultPropertyDetails();
  const properties = defaultProperties.map(prop => {
    const dbOverride = settings?.propertySettings?.find(s => s.property_id === prop.id);
    if (!dbOverride) return prop;
    return {
      ...prop,
      name: dbOverride.marketing_name || prop.name,
      cleaningFee: dbOverride.cleaning_fee ?? prop.cleaningFee,
      oneNightDiscount: dbOverride.discount_1_night || null,
      twoNightDiscount: dbOverride.discount_2_nights || null,
      longStayDiscount: dbOverride.discount_3_plus_nights || null,
      showDiscount: dbOverride.show_discount ?? prop.showDiscount
    };
  });

  const handleEdit = (property: PropertyDetail) => {
    setEditingId(property.id);
    setEditForm({
      name: property.name,
      cleaningFee: property.cleaningFee,
      oneNightDiscount: property.oneNightDiscount,
      twoNightDiscount: property.twoNightDiscount,
      longStayDiscount: property.longStayDiscount,
      showDiscount: property.showDiscount
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = (propertyId: string) => {
    upsertProperty({
      property_id: propertyId,
      marketing_name: editForm.name || null,
      cleaning_fee: editForm.cleaningFee ?? 0,
      discount_1_night: editForm.oneNightDiscount ?? 0,
      discount_2_nights: editForm.twoNightDiscount ?? 0,
      discount_3_plus_nights: editForm.longStayDiscount ?? 0,
      show_discount: editForm.showDiscount ?? false
    });
    setEditingId(null);
    setEditForm({});
  };

  const handleResetSingle = (propertyId: string, propertyName: string) => {
    resetProperty(propertyId);
  };

  const handleResetAll = () => {
    resetAll();
    setShowResetDialog(false);
  };

  // Group properties by category
  const groupedProperties = properties.reduce((acc, property) => {
    const category = property.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(property);
    return acc;
  }, {} as Record<PropertyCategory, PropertyDetail[]>);

  const categoryOrder: PropertyCategory[] = ['glacier', 'skistar', 'chalet', 'platinum', 'cabin', 'other'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Ladataan asetuksia...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info box explaining the pricing system */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="py-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-400" />
            Hinnoittelun periaatteet
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p className="font-medium text-foreground">📊 Hinnan laskentakaava:</p>
              <ol className="list-decimal ml-5 space-y-1">
                <li><strong>Beds24 API-hinta</strong> = perusyöhinta varausjärjestelmästä</li>
                <li><strong>+ Siivousmaksu</strong> = lisätään aina API-hinnan päälle</li>
                <li><strong>× Huoneistoalennus</strong> = vähennetään API-hinnasta (ei siivouksesta)</li>
                <li><strong>= Lopullinen hinta</strong> = näytetään asiakkaalle</li>
              </ol>
              <p className="text-xs mt-2 bg-background/50 p-2 rounded">
                <strong>Esimerkki:</strong> API 200€ + siivous 80€ = 280€. Jos 15% alennus: (200€ × 0.85) + 80€ = 250€
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">📋 Sarakkeiden selitykset:</p>
              <ul className="space-y-1">
                <li><strong>Siivous:</strong> Kiinteä maksu joka lisätään aina hintaan</li>
                <li><strong>1 yö / 2 yötä / 3+ yötä:</strong> Alennusprosentti API-hinnasta majoituksen pituuden mukaan</li>
                <li><strong>% (sarake):</strong> "Näytä alennusbadge" - näyttää äkkilähdöt-sivulla alennusprosentin erikseen</li>
              </ul>
              <p className="text-xs mt-2 bg-amber-500/10 p-2 rounded border border-amber-500/30">
                <strong>⚠️ Huom:</strong> Huoneistoalennukset koskevat KAIKKIA tämän huoneiston jaksoja. Jaksokohtaiset alennukset asetetaan "Hissiliput ja erikoistarjoukset" -välilehdellä.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Huoneistojen hallinta</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Muokkaa huoneistokohtaisia alennuksia ja siivousmaksuja. Asetukset synkronoituvat automaattisesti.
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowResetDialog(true)}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Palauta kaikki
        </Button>
      </div>

      {categoryOrder.map(category => {
        const categoryProperties = groupedProperties[category];
        if (!categoryProperties || categoryProperties.length === 0) return null;
        
        const config = categoryConfig[category];
        
        return (
          <Card key={category}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Badge className={config.color}>
                  {config.icon}
                  <span className="ml-1">{config.label}</span>
                </Badge>
                <span className="text-muted-foreground text-sm font-normal">
                  ({categoryProperties.length} huoneistoa)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">ID</TableHead>
                      <TableHead className="min-w-[120px]">Markkinointinimi</TableHead>
                      <TableHead className="text-center w-[40px]">Hlö</TableHead>
                      <TableHead className="text-center w-[70px]">Siivous</TableHead>
                      <TableHead className="text-center w-[130px]">1 yö</TableHead>
                      <TableHead className="text-center w-[130px]">2 yötä</TableHead>
                      <TableHead className="text-center w-[130px]">3+ yötä</TableHead>
                      <TableHead className="text-center w-[50px]">%</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryProperties.map(property => (
                      <TableRow key={property.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {property.id}
                        </TableCell>
                        <TableCell>
                          {editingId === property.id ? (
                            <Input
                              value={editForm.name || ""}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="h-8"
                            />
                          ) : (
                            <span className="font-medium">{property.name}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {property.maxGuests}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === property.id ? (
                            <Input
                              type="number"
                              min="0"
                              value={editForm.cleaningFee || 0}
                              onChange={(e) => setEditForm({ ...editForm, cleaningFee: Number(e.target.value) })}
                              className="h-10 w-24 text-center text-base font-medium"
                            />
                          ) : (
                            <span>{property.cleaningFee}€</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === property.id ? (
                            <div className="flex items-center gap-1">
                              {[10, 20, 30].map(val => (
                                <Button
                                  key={val}
                                  type="button"
                                  size="sm"
                                  variant={editForm.oneNightDiscount === val ? "default" : "outline"}
                                  className="h-8 w-10 p-0 text-xs"
                                  onClick={() => setEditForm({ 
                                    ...editForm, 
                                    oneNightDiscount: editForm.oneNightDiscount === val ? null : val 
                                  })}
                                >
                                  {val}%
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <span className={property.oneNightDiscount ? "text-green-500 font-medium" : "text-muted-foreground"}>
                              {property.oneNightDiscount ? `-${property.oneNightDiscount}%` : "-"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === property.id ? (
                            <div className="flex items-center gap-1">
                              {[10, 20, 30].map(val => (
                                <Button
                                  key={val}
                                  type="button"
                                  size="sm"
                                  variant={editForm.twoNightDiscount === val ? "default" : "outline"}
                                  className="h-8 w-10 p-0 text-xs"
                                  onClick={() => setEditForm({ 
                                    ...editForm, 
                                    twoNightDiscount: editForm.twoNightDiscount === val ? null : val 
                                  })}
                                >
                                  {val}%
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <span className={property.twoNightDiscount ? "text-green-500 font-medium" : "text-muted-foreground"}>
                              {property.twoNightDiscount ? `-${property.twoNightDiscount}%` : "-"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === property.id ? (
                            <div className="flex items-center gap-1">
                              {[10, 20, 30].map(val => (
                                <Button
                                  key={val}
                                  type="button"
                                  size="sm"
                                  variant={editForm.longStayDiscount === val ? "default" : "outline"}
                                  className="h-8 w-10 p-0 text-xs"
                                  onClick={() => setEditForm({ 
                                    ...editForm, 
                                    longStayDiscount: editForm.longStayDiscount === val ? null : val 
                                  })}
                                >
                                  {val}%
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <span className={property.longStayDiscount ? "text-blue-500 font-medium" : "text-muted-foreground"}>
                              {property.longStayDiscount ? `-${property.longStayDiscount}%` : "-"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingId === property.id ? (
                            <Switch
                              checked={editForm.showDiscount || false}
                              onCheckedChange={(checked) => setEditForm({ ...editForm, showDiscount: checked })}
                            />
                          ) : (
                            <span className={property.showDiscount ? "text-green-400" : "text-muted-foreground"}>
                              {property.showDiscount ? <Percent className="w-4 h-4" /> : "-"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            {editingId === property.id ? (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={handleCancel}
                                  className="h-8 w-8 p-0"
                                  disabled={isSaving}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleSave(property.id)}
                                  className="h-8 w-8 p-0"
                                  disabled={isSaving}
                                >
                                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleResetSingle(property.id, property.name)}
                                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                                  title="Palauta oletukset"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleEdit(property)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Reset all confirmation dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Palauta kaikki oletusarvoihin?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Tämä poistaa kaikki tekemäsi muutokset huoneistojen tietoihin ja palauttaa alkuperäiset arvot.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Peruuta</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleResetAll}>
              Palauta kaikki
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyAdmin;
