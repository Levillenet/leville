import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, ExternalLink, Loader2, GripVertical, Image, Upload, Copy } from "lucide-react";

interface GuideProperty {
  id: string;
  slug: string;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  check_in_time: string | null;
  check_out_time: string | null;
  hero_image_url: string | null;
  wifi_name: string | null;
  wifi_password: string | null;
  contact_phone: string | null;
  contact_whatsapp: string | null;
  contact_email: string | null;
  max_guests: number | null;
  bedrooms: string | null;
  bathrooms: string | null;
  is_published: boolean;
}

interface GuideSection {
  id: string;
  property_id: string;
  section_key: string;
  title: string;
  content: string | null;
  icon: string | null;
  sort_order: number;
  is_visible: boolean;
}

interface GuideImage {
  id: string;
  property_id: string;
  section_key: string | null;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

const ICON_OPTIONS = [
  { value: "hand", label: "👋 Welcome" },
  { value: "key", label: "🔑 Arrival/Keys" },
  { value: "home", label: "🏠 Property" },
  { value: "logout", label: "🚪 Checkout" },
  { value: "map", label: "📍 Local Guide" },
  { value: "mountain", label: "⛷️ Activities" },
  { value: "utensils", label: "🍽️ Restaurants" },
  { value: "thermometer", label: "🌡️ Heating" },
  { value: "shower", label: "🚿 Sauna" },
  { value: "wifi", label: "📶 WiFi" },
  { value: "car", label: "🚗 Parking" },
  { value: "trash", label: "♻️ House Rules" },
  { value: "alert", label: "⚠️ Important" },
  { value: "book", label: "📖 Info" },
  { value: "clock", label: "⏰ Times" },
  { value: "users", label: "👥 Guests" },
  { value: "info", label: "ℹ️ General" },
];

interface GuideAdminProps {
  isViewer: boolean;
}

const GuideAdmin = ({ isViewer }: GuideAdminProps) => {
  const [properties, setProperties] = useState<GuideProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<GuideProperty | null>(null);
  const [sections, setSections] = useState<GuideSection[]>([]);
  const [images, setImages] = useState<GuideImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [duplicating, setDuplicating] = useState<string | null>(null);
  const { toast } = useToast();

  const getPassword = () => localStorage.getItem("admin_password") || "";

  const apiCall = useCallback(async (action: string, params: Record<string, any> = {}) => {
    const { data, error } = await supabase.functions.invoke("manage-guide", {
      body: { password: getPassword(), action, ...params },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  }, []);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await apiCall("list_properties");
      setProperties(data || []);
    } catch (err) {
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectProperty = async (prop: GuideProperty) => {
    setSelectedProperty(prop);
    try {
      const [sectionsData, imagesData] = await Promise.all([
        apiCall("list_sections", { property_id: prop.id }),
        apiCall("list_images", { property_id: prop.id }),
      ]);
      setSections(sectionsData || []);
      setImages(imagesData || []);
    } catch (err) {
      console.error("Error loading property details:", err);
    }
  };

  const saveProperty = async () => {
    if (!selectedProperty) return;
    setSaving(true);
    try {
      await apiCall("upsert_property", { property: selectedProperty });
      toast({ title: "Saved", description: "Property updated successfully" });
      loadProperties();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const saveSection = async (section: GuideSection) => {
    try {
      await apiCall("upsert_section", { section });
      toast({ title: "Saved", description: "Section updated" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const addSection = () => {
    if (!selectedProperty) return;
    const newSection: GuideSection = {
      id: crypto.randomUUID(),
      property_id: selectedProperty.id,
      section_key: `section_${Date.now()}`,
      title: "New Section",
      content: "",
      icon: "info",
      sort_order: sections.length,
      is_visible: true,
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = async (sectionId: string) => {
    try {
      await apiCall("delete_section", { section_id: sectionId });
      setSections(sections.filter((s) => s.id !== sectionId));
      toast({ title: "Deleted", description: "Section removed" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleImageUpload = async (file: File, sectionKey?: string) => {
    if (!selectedProperty) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${selectedProperty.slug}/${sectionKey || "hero"}/${Date.now()}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from("guide-images")
        .upload(path, file);
      
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("guide-images")
        .getPublicUrl(path);

      const imageUrl = urlData.publicUrl;

      // If it's for hero, update property
      if (!sectionKey || sectionKey === "hero") {
        setSelectedProperty({ ...selectedProperty, hero_image_url: imageUrl });
        await apiCall("upsert_property", {
          property: { ...selectedProperty, hero_image_url: imageUrl },
        });
      } else {
        // Add as section image
        const newImage = await apiCall("upsert_image", {
          image: {
            id: crypto.randomUUID(),
            property_id: selectedProperty.id,
            section_key: sectionKey,
            image_url: imageUrl,
            caption: "",
            sort_order: images.filter((i) => i.section_key === sectionKey).length,
          },
        });
        setImages([...images, newImage]);
      }

      toast({ title: "Uploaded", description: "Image uploaded successfully" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      await apiCall("delete_image", { image_id: imageId });
      setImages(images.filter((i) => i.id !== imageId));
      toast({ title: "Deleted", description: "Image removed" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const createNewProperty = async () => {
    const slug = `property-${Date.now()}`;
    try {
      const newProp = await apiCall("upsert_property", {
        property: {
          id: crypto.randomUUID(),
          slug,
          name: "New Property",
          is_published: false,
        },
      });
      setProperties([...properties, newProp]);
      selectProperty(newProp);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const duplicateProperty = async (e: React.MouseEvent, propId: string) => {
    e.stopPropagation();
    setDuplicating(propId);
    try {
      const newProp = await apiCall("duplicate_property", { property_id: propId });
      toast({ title: "Copied!", description: `"${newProp.name}" created as draft` });
      await loadProperties();
      selectProperty(newProp);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setDuplicating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Property list view
  if (!selectedProperty) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Digital Guides</h2>
          {!isViewer && (
            <Button onClick={createNewProperty} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          )}
        </div>

        {properties.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No guides yet. Click "Add Property" to create your first guide.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {properties.map((prop) => (
              <Card
                key={prop.id}
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => selectProperty(prop)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{prop.name}</p>
                    <p className="text-sm text-muted-foreground">/guide/{prop.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isViewer && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => duplicateProperty(e, prop.id)}
                        disabled={duplicating === prop.id}
                        title="Kopioi kohde"
                      >
                        {duplicating === prop.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        prop.is_published
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {prop.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Property editor view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setSelectedProperty(null)} size="sm">
          ← Back to list
        </Button>
        <div className="flex items-center gap-2">
          {selectedProperty.is_published && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/guide/${selectedProperty.slug}`, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Guide
            </Button>
          )}
          {!isViewer && (
            <Button onClick={saveProperty} disabled={saving} size="sm">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Property Details</TabsTrigger>
          <TabsTrigger value="sections">Sections ({sections.length})</TabsTrigger>
          <TabsTrigger value="images">Images ({images.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={selectedProperty.name}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, name: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>Slug (URL)</Label>
                  <Input
                    value={selectedProperty.slug}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, slug: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <Input
                    value={selectedProperty.address || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, address: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>Latitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={selectedProperty.latitude || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, latitude: e.target.value ? Number(e.target.value) : null })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={selectedProperty.longitude || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, longitude: e.target.value ? Number(e.target.value) : null })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>Check-in time</Label>
                  <Input
                    value={selectedProperty.check_in_time || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, check_in_time: e.target.value })}
                    disabled={isViewer}
                    placeholder="17:00"
                  />
                </div>
                <div>
                  <Label>Check-out time</Label>
                  <Input
                    value={selectedProperty.check_out_time || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, check_out_time: e.target.value })}
                    disabled={isViewer}
                    placeholder="11:00"
                  />
                </div>
                <div>
                  <Label>Max guests</Label>
                  <Input
                    type="number"
                    value={selectedProperty.max_guests || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, max_guests: e.target.value ? Number(e.target.value) : null })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>Bedrooms</Label>
                  <Input
                    value={selectedProperty.bedrooms || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, bedrooms: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">WiFi & Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>WiFi Network</Label>
                  <Input
                    value={selectedProperty.wifi_name || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, wifi_name: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>WiFi Password</Label>
                  <Input
                    value={selectedProperty.wifi_password || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, wifi_password: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={selectedProperty.contact_phone || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, contact_phone: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input
                    value={selectedProperty.contact_whatsapp || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, contact_whatsapp: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={selectedProperty.contact_email || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, contact_email: e.target.value })}
                    disabled={isViewer}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hero Image</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProperty.hero_image_url && (
                <img
                  src={selectedProperty.hero_image_url}
                  alt="Hero"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              {!isViewer && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Hero Image
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, "hero");
                    }}
                  />
                </label>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  checked={selectedProperty.is_published}
                  onCheckedChange={(checked) =>
                    setSelectedProperty({ ...selectedProperty, is_published: checked })
                  }
                  disabled={isViewer}
                />
                <Label>Published</Label>
              </div>
              {selectedProperty.is_published && (
                <p className="text-sm text-muted-foreground">
                  Guide available at /guide/{selectedProperty.slug}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-4 mt-4">
          {!isViewer && (
            <Button onClick={addSection} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          )}

          {sections.map((section, idx) => (
            <Card key={section.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground w-6">{idx + 1}</span>
                    <Select
                      value={section.icon || "info"}
                      onValueChange={(v) => {
                        const updated = sections.map((s) => (s.id === section.id ? { ...s, icon: v } : s));
                        setSections(updated);
                      }}
                      disabled={isViewer}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={section.is_visible}
                      onCheckedChange={(v) => {
                        const updated = sections.map((s) => (s.id === section.id ? { ...s, is_visible: v } : s));
                        setSections(updated);
                      }}
                      disabled={isViewer}
                    />
                    {!isViewer && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => saveSection(section)}
                        >
                          <Save className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => deleteSection(section.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Section Key</Label>
                  <Input
                    value={section.section_key}
                    onChange={(e) => {
                      const updated = sections.map((s) =>
                        s.id === section.id ? { ...s, section_key: e.target.value } : s
                      );
                      setSections(updated);
                    }}
                    disabled={isViewer}
                    placeholder="e.g. welcome, arrival, property_info"
                    className="text-sm"
                  />
                </div>

                <div>
                  <Label>Title</Label>
                  <Input
                    value={section.title}
                    onChange={(e) => {
                      const updated = sections.map((s) =>
                        s.id === section.id ? { ...s, title: e.target.value } : s
                      );
                      setSections(updated);
                    }}
                    disabled={isViewer}
                  />
                </div>

                <div>
                  <Label>Content</Label>
                  <Textarea
                    value={section.content || ""}
                    onChange={(e) => {
                      const updated = sections.map((s) =>
                        s.id === section.id ? { ...s, content: e.target.value } : s
                      );
                      setSections(updated);
                    }}
                    disabled={isViewer}
                    rows={6}
                    className="text-sm"
                  />
                </div>

                {/* Section images */}
                <div>
                  <Label className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Section Images
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images
                      .filter((i) => i.section_key === section.section_key)
                      .map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.image_url}
                            alt={img.caption || ""}
                            className="h-20 w-20 object-cover rounded-lg"
                          />
                          {!isViewer && (
                            <button
                              onClick={() => deleteImage(img.id)}
                              className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    {!isViewer && (
                      <label className={`h-20 w-20 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${uploading ? 'border-primary bg-primary/5' : 'border-slate-300 hover:border-primary/50'}`}>
                        {uploading ? (
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        ) : (
                          <Plus className="w-5 h-5 text-muted-foreground" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, section.section_key);
                              e.target.value = '';
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Manage images from the Sections tab. Each image is associated with a section.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.image_url}
                      alt={img.caption || ""}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1.5 rounded-b-lg">
                      {img.section_key || "hero"}
                    </div>
                    {!isViewer && (
                      <button
                        onClick={() => deleteImage(img.id)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuideAdmin;
