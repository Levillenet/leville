import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { cn } from "@/lib/utils";
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
  getAllPropertyDetails, 
  updatePropertyDetail, 
  resetPropertyToDefault,
  resetAllPropertiesToDefault,
  PropertyDetail,
  PropertyCategory
} from "@/data/propertyDetails";
import { Pencil, RotateCcw, Save, X, Building, Home, Mountain, Star, TreePine, CalendarIcon, Ticket, Sparkles, Percent } from "lucide-react";

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
  const [properties, setProperties] = useState<PropertyDetail[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PropertyDetail>>({});
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();

  // Load properties on mount
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = () => {
    setProperties(getAllPropertyDetails());
  };

  const handleEdit = (property: PropertyDetail) => {
    setEditingId(property.id);
    setEditForm({
      name: property.name,
      cleaningFee: property.cleaningFee,
      oneNightDiscount: property.oneNightDiscount,
      twoNightDiscount: property.twoNightDiscount,
      longStayDiscount: property.longStayDiscount,
      showDiscount: property.showDiscount,
      specialOffer: property.specialOffer,
      skiPassOffer: property.skiPassOffer,
      skiPassStartDate: property.skiPassStartDate,
      skiPassEndDate: property.skiPassEndDate
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = (propertyId: string) => {
    updatePropertyDetail(propertyId, editForm);
    loadProperties();
    setEditingId(null);
    setEditForm({});
    toast({
      title: "Tallennettu",
      description: "Huoneiston tiedot päivitetty"
    });
  };

  const handleResetSingle = (propertyId: string, propertyName: string) => {
    resetPropertyToDefault(propertyId);
    loadProperties();
    toast({
      title: "Palautettu",
      description: `${propertyName} palautettu oletusarvoihin`
    });
  };

  const handleResetAll = () => {
    resetAllPropertiesToDefault();
    loadProperties();
    setShowResetDialog(false);
    toast({
      title: "Kaikki palautettu",
      description: "Kaikkien huoneistojen tiedot palautettu oletusarvoihin"
    });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Huoneistojen hallinta</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Muokkaa alennuksia, siivousmaksuja ja erikoistarjouksia. Muutokset tulevat voimaan heti.
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
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>Markkinointinimi</TableHead>
                      <TableHead className="text-right w-[60px]">Hlö</TableHead>
                      <TableHead className="text-right w-[80px]">Siivous</TableHead>
                      <TableHead className="text-right w-[70px]">1 yö</TableHead>
                      <TableHead className="text-right w-[70px]">2 yötä</TableHead>
                      <TableHead className="text-right w-[70px]">3+ yötä</TableHead>
                      <TableHead className="text-center w-[60px]">Näytä %</TableHead>
                      <TableHead className="text-center w-[70px]">Erikois</TableHead>
                      <TableHead className="text-center w-[130px]">Hissilippu</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
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
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{property.name}</span>
                              {property.specialOffer && (
                                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                                  <Sparkles className="w-3 h-3 mr-0.5" />
                                </Badge>
                              )}
                              {property.skiPassOffer && (
                                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                                  <Ticket className="w-3 h-3 mr-0.5" />
                                </Badge>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {property.maxGuests}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === property.id ? (
                            <Input
                              type="number"
                              value={editForm.cleaningFee || 0}
                              onChange={(e) => setEditForm({ ...editForm, cleaningFee: Number(e.target.value) })}
                              className="h-8 w-16 text-right ml-auto"
                            />
                          ) : (
                            <span>{property.cleaningFee}€</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === property.id ? (
                            <Input
                              type="number"
                              value={editForm.oneNightDiscount ?? ""}
                              onChange={(e) => setEditForm({ 
                                ...editForm, 
                                oneNightDiscount: e.target.value ? Number(e.target.value) : null 
                              })}
                              placeholder="-"
                              className="h-8 w-14 text-right ml-auto"
                            />
                          ) : (
                            <span className={property.oneNightDiscount ? "text-green-500 font-medium" : "text-muted-foreground"}>
                              {property.oneNightDiscount ? `-${property.oneNightDiscount}%` : "-"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === property.id ? (
                            <Input
                              type="number"
                              value={editForm.twoNightDiscount ?? ""}
                              onChange={(e) => setEditForm({ 
                                ...editForm, 
                                twoNightDiscount: e.target.value ? Number(e.target.value) : null 
                              })}
                              placeholder="-"
                              className="h-8 w-14 text-right ml-auto"
                            />
                          ) : (
                            <span className={property.twoNightDiscount ? "text-green-500 font-medium" : "text-muted-foreground"}>
                              {property.twoNightDiscount ? `-${property.twoNightDiscount}%` : "-"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === property.id ? (
                            <Input
                              type="number"
                              value={editForm.longStayDiscount ?? ""}
                              onChange={(e) => setEditForm({ 
                                ...editForm, 
                                longStayDiscount: e.target.value ? Number(e.target.value) : null 
                              })}
                              placeholder="-"
                              className="h-8 w-14 text-right ml-auto"
                            />
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
                        <TableCell className="text-center">
                          {editingId === property.id ? (
                            <Switch
                              checked={editForm.specialOffer || false}
                              onCheckedChange={(checked) => setEditForm({ ...editForm, specialOffer: checked })}
                            />
                          ) : (
                            <span className={property.specialOffer ? "text-amber-400" : "text-muted-foreground"}>
                              {property.specialOffer ? "✓" : "-"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingId === property.id ? (
                            <div className="flex flex-col items-center gap-1">
                              <Switch
                                checked={editForm.skiPassOffer || false}
                                onCheckedChange={(checked) => setEditForm({ ...editForm, skiPassOffer: checked })}
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className={property.skiPassOffer ? "text-cyan-400" : "text-muted-foreground"}>
                                {property.skiPassOffer ? "✓" : "-"}
                              </span>
                              {property.skiPassOffer && property.skiPassStartDate && property.skiPassEndDate && (
                                <span className="text-[10px] text-muted-foreground">
                                  {format(new Date(property.skiPassStartDate), "d.M")} - {format(new Date(property.skiPassEndDate), "d.M")}
                                </span>
                              )}
                            </div>
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
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleSave(property.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Save className="w-4 h-4" />
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
              
              {/* Ski pass date pickers when editing */}
              {editingId && categoryProperties.some(p => p.id === editingId) && editForm.skiPassOffer && (
                <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <h4 className="text-sm font-medium text-cyan-400 mb-3 flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    Hissilippuedun päivämäärät
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Alkupäivä (check-in)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[180px] justify-start text-left font-normal",
                              !editForm.skiPassStartDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {editForm.skiPassStartDate ? format(new Date(editForm.skiPassStartDate), "d.M.yyyy", { locale: fi }) : "Valitse päivä"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={editForm.skiPassStartDate ? new Date(editForm.skiPassStartDate) : undefined}
                            onSelect={(date) => setEditForm({ ...editForm, skiPassStartDate: date ? date.toISOString().split('T')[0] : null })}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Loppupäivä (check-in)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[180px] justify-start text-left font-normal",
                              !editForm.skiPassEndDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {editForm.skiPassEndDate ? format(new Date(editForm.skiPassEndDate), "d.M.yyyy", { locale: fi }) : "Valitse päivä"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={editForm.skiPassEndDate ? new Date(editForm.skiPassEndDate) : undefined}
                            onSelect={(date) => setEditForm({ ...editForm, skiPassEndDate: date ? date.toISOString().split('T')[0] : null })}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              )}
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