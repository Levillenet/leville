import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Home, Mail, Search, Thermometer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllDefaultPropertyDetails } from "@/data/propertyDetails";

interface PropertyMaintenance {
  property_id: string;
  owner_email: string | null;
  cleaning_email: string | null;
  cleaning_fee: number;
  max_guests: number | null;
  linen_price_per_person: number;
  notes: string | null;
  heat_pump_name: string | null;
}

interface PropertySettings {
  property_id: string;
  marketing_name: string | null;
}

interface PropertyMaintenanceAdminProps {
  isViewer?: boolean;
}

const PropertyMaintenanceAdmin = ({ isViewer = false }: PropertyMaintenanceAdminProps) => {
  const [properties, setProperties] = useState<PropertyMaintenance[]>([]);
  const [propertyNames, setPropertyNames] = useState<Map<string, string>>(new Map());
  const [beds24NameMap, setBeds24NameMap] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedProperties, setEditedProperties] = useState<Map<string, Partial<PropertyMaintenance>>>(new Map());
  const { toast } = useToast();

  // Build default name map from propertyDetails.ts
  const defaultNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const prop of getAllDefaultPropertyDetails()) {
      map.set(prop.id, prop.name);
    }
    return map;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch property names from property_settings (marketing names)
      const { data: settingsData } = await supabase
        .from('property_settings')
        .select('property_id, marketing_name');
      
      const nameMap = new Map<string, string>();
      for (const s of (settingsData || [])) {
        if (s.marketing_name) {
          nameMap.set(s.property_id, s.marketing_name);
        }
      }
      setPropertyNames(nameMap);

      // Fetch property maintenance data
      const { data: maintenanceResult, error } = await supabase.functions.invoke('maintenance-settings', {
        body: { action: 'get_properties' }
      });

      if (error) throw error;

      const loadedProperties = maintenanceResult?.properties || [];
      setProperties(loadedProperties);

      // Fetch Beds24 room names
      const { data: roomNamesResult } = await supabase.functions.invoke('maintenance-settings', {
        body: { action: 'get_room_names' }
      });

      if (roomNamesResult?.roomNames) {
        const beds24Map = new Map<string, string>();
        for (const [id, name] of Object.entries(roomNamesResult.roomNames)) {
          beds24Map.set(id, name as string);
        }
        setBeds24NameMap(beds24Map);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Virhe",
        description: "Tietojen haku epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (propertyId: string, field: keyof PropertyMaintenance, value: string) => {
    setEditedProperties(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(propertyId) || {};
      newMap.set(propertyId, { ...existing, [field]: value });
      return newMap;
    });
  };

  const getFieldValue = (property: PropertyMaintenance, field: keyof PropertyMaintenance): string => {
    const edited = editedProperties.get(property.property_id);
    if (edited && field in edited) {
      return String(edited[field] || '');
    }
    return String(property[field] || '');
  };

  const handleSaveAll = async () => {
    if (editedProperties.size === 0) {
      toast({
        title: "Ei muutoksia",
        description: "Ei tallennettavaa"
      });
      return;
    }

    setIsSaving(true);
    try {
      const updates = [];
      for (const [propertyId, changes] of editedProperties) {
        const original = properties.find(p => p.property_id === propertyId);
        if (original) {
          updates.push({
            property_id: propertyId,
            owner_email: changes.owner_email ?? original.owner_email,
            cleaning_email: changes.cleaning_email ?? original.cleaning_email,
            notes: changes.notes ?? original.notes,
            heat_pump_name: changes.heat_pump_name ?? original.heat_pump_name
          });
        }
      }

      const { error } = await supabase.functions.invoke('maintenance-settings', {
        body: {
          action: 'bulk_update_properties',
          data: { properties: updates }
        }
      });

      if (error) throw error;

      toast({
        title: "Tallennettu",
        description: `${updates.length} huoneistoa päivitetty`
      });

      setEditedProperties(new Map());
      fetchData();
    } catch (error) {
      toast({
        title: "Virhe",
        description: "Tallennus epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getPropertyName = (propertyId: string) => {
    // Priority: 1) DB marketing_name (from Huoneistot page), 2) Beds24 API name, 3) default from propertyDetails, 4) show ID
    const marketingName = propertyNames.get(propertyId);
    if (marketingName) return marketingName;
    
    const beds24Name = beds24NameMap.get(propertyId);
    if (beds24Name) return beds24Name;
    
    const defaultName = defaultNameMap.get(propertyId);
    if (defaultName) return defaultName;
    
    return `ID: ${propertyId}`;
  };

  // Check if property is missing a marketing name (shows with "ID:" prefix)
  const isMissingMarketingName = (propertyId: string) => {
    return !propertyNames.get(propertyId) && !defaultNameMap.get(propertyId);
  };

  const filteredProperties = properties.filter(p => {
    const name = getPropertyName(p.property_id).toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || 
           p.property_id.includes(searchTerm);
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
                <Home className="w-5 h-5" />
                Huoneistotiedot
              </CardTitle>
              <CardDescription>
                Hallitse omistajien ja siivousyritysten sähköpostiosoitteita
              </CardDescription>
            </div>
            <Button onClick={handleSaveAll} disabled={isSaving || editedProperties.size === 0}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Tallennetaan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Tallenna kaikki ({editedProperties.size})
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Etsi huoneistoa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Huoneisto</TableHead>
                  <TableHead>Omistajan email</TableHead>
                  <TableHead>Siivouksen email</TableHead>
                  <TableHead className="w-[120px]">Lämpöpumppu</TableHead>
                  <TableHead className="w-[60px]">Max hlö</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => (
                  <TableRow key={property.property_id} className={isMissingMarketingName(property.property_id) ? "bg-amber-500/5" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {isMissingMarketingName(property.property_id) && (
                          <span className="text-amber-500 text-xs" title="Puuttuva markkinointinimi - lisää se Huoneistot-sivulla">⚠️</span>
                        )}
                        <div>
                          <span className={`text-sm ${isMissingMarketingName(property.property_id) ? "text-amber-600" : ""}`}>
                            {getPropertyName(property.property_id)}
                          </span>
                          <span className="ml-1 text-xs text-muted-foreground font-mono">({property.property_id})</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                        <Input
                          type="email"
                          value={getFieldValue(property, 'owner_email')}
                          onChange={(e) => handleFieldChange(property.property_id, 'owner_email', e.target.value)}
                          className="h-8"
                          placeholder="email@example.com"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                        <Input
                          type="email"
                          value={getFieldValue(property, 'cleaning_email')}
                          onChange={(e) => handleFieldChange(property.property_id, 'cleaning_email', e.target.value)}
                          className="h-8"
                          placeholder="siivous@example.com"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-muted-foreground shrink-0" />
                        <Input
                          value={getFieldValue(property, 'heat_pump_name')}
                          onChange={(e) => handleFieldChange(property.property_id, 'heat_pump_name', e.target.value)}
                          className="h-8"
                          placeholder="esim. a1"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {property.max_guests || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Näytetään {filteredProperties.length} / {properties.length} huoneistoa
            </p>
            {properties.filter(p => isMissingMarketingName(p.property_id)).length > 0 && (
              <p className="text-sm text-amber-600">
                ⚠️ {properties.filter(p => isMissingMarketingName(p.property_id)).length} huoneistolta puuttuu markkinointinimi
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyMaintenanceAdmin;
