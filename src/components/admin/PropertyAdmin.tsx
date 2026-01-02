import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  getAllPropertyDetails, 
  updatePropertyDetail, 
  resetPropertyToDefault,
  resetAllPropertiesToDefault,
  PropertyDetail,
  PropertyCategory
} from "@/data/propertyDetails";
import { Pencil, RotateCcw, Save, X, Building, Home, Mountain, Star, TreePine } from "lucide-react";

// Category icons and labels
const categoryConfig: Record<PropertyCategory, { icon: React.ReactNode; label: string; color: string }> = {
  glacier: { icon: <Mountain className="w-4 h-4" />, label: "Glacier", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  skistar: { icon: <Star className="w-4 h-4" />, label: "Skistar", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  chalet: { icon: <Home className="w-4 h-4" />, label: "Chalet", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  platinum: { icon: <Building className="w-4 h-4" />, label: "Platinum", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
  cabin: { icon: <TreePine className="w-4 h-4" />, label: "Mökki", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  other: { icon: <Building className="w-4 h-4" />, label: "Muu", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" }
};

interface EditingProperty extends PropertyDetail {
  isEditing: boolean;
}

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
      instantDiscount: property.instantDiscount,
      longStayDiscount: property.longStayDiscount
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
            Muokkaa alennuksia, siivousmaksuja ja markkinointinimiä. Muutokset tulevat voimaan heti.
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
                      <TableHead className="text-right w-[100px]">Siivous €</TableHead>
                      <TableHead className="text-right w-[100px]">Alennus %</TableHead>
                      <TableHead className="text-right w-[100px]">3+ yötä %</TableHead>
                      <TableHead className="w-[120px]"></TableHead>
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
                        <TableCell className="text-right">
                          {editingId === property.id ? (
                            <Input
                              type="number"
                              value={editForm.cleaningFee || 0}
                              onChange={(e) => setEditForm({ ...editForm, cleaningFee: Number(e.target.value) })}
                              className="h-8 w-20 text-right ml-auto"
                            />
                          ) : (
                            <span>{property.cleaningFee}€</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === property.id ? (
                            <Input
                              type="number"
                              value={editForm.instantDiscount ?? ""}
                              onChange={(e) => setEditForm({ 
                                ...editForm, 
                                instantDiscount: e.target.value ? Number(e.target.value) : null 
                              })}
                              placeholder="-"
                              className="h-8 w-20 text-right ml-auto"
                            />
                          ) : (
                            <span className={property.instantDiscount ? "text-green-500 font-medium" : "text-muted-foreground"}>
                              {property.instantDiscount ? `-${property.instantDiscount}%` : "-"}
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
                              className="h-8 w-20 text-right ml-auto"
                            />
                          ) : (
                            <span className={property.longStayDiscount ? "text-blue-500 font-medium" : "text-muted-foreground"}>
                              {property.longStayDiscount ? `-${property.longStayDiscount}%` : "-"}
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
