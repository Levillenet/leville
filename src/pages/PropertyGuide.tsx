import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MapPin, Clock, Wifi, Phone, Mail, Users, Home, Key, LogOut, Info, Utensils, Mountain, Thermometer, ShowerHead, Car, Trash2, AlertCircle, BookOpen, ChevronLeft } from "lucide-react";
import NotFound from "./NotFound";

// Icon mapping for sections
const ICON_MAP: Record<string, any> = {
  hand: () => <span className="text-2xl">👋</span>,
  key: Key,
  home: Home,
  info: Info,
  logout: LogOut,
  map: MapPin,
  utensils: Utensils,
  mountain: Mountain,
  thermometer: Thermometer,
  shower: ShowerHead,
  car: Car,
  trash: Trash2,
  wifi: Wifi,
  alert: AlertCircle,
  book: BookOpen,
  clock: Clock,
  users: Users,
  phone: Phone,
};

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
}

interface GuideSection {
  id: string;
  section_key: string;
  title: string;
  content: string | null;
  icon: string | null;
  sort_order: number;
  is_visible: boolean;
}

interface GuideImage {
  id: string;
  section_key: string | null;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

const PropertyGuide = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<GuideProperty | null>(null);
  const [sections, setSections] = useState<GuideSection[]>([]);
  const [images, setImages] = useState<GuideImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const { data: prop, error: propErr } = await supabase
          .from("guide_properties")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (propErr || !prop) {
          setNotFound(true);
          return;
        }

        setProperty(prop as GuideProperty);

        const [sectionsRes, imagesRes] = await Promise.all([
          supabase
            .from("guide_sections")
            .select("*")
            .eq("property_id", prop.id)
            .eq("is_visible", true)
            .order("sort_order"),
          supabase
            .from("guide_images")
            .select("*")
            .eq("property_id", prop.id)
            .order("sort_order"),
        ]);

        setSections((sectionsRes.data || []) as GuideSection[]);
        setImages((imagesRes.data || []) as GuideImage[]);
      } catch (err) {
        console.error("Error loading guide:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchGuide();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !property) return <NotFound />;

  const sectionImages = (key: string) => images.filter((i) => i.section_key === key);

  const renderIcon = (iconName: string | null) => {
    if (!iconName) return <Info className="w-5 h-5" />;
    const IconComp = ICON_MAP[iconName];
    if (!IconComp) return <Info className="w-5 h-5" />;
    if (typeof IconComp === "function" && !IconComp.displayName && !IconComp.$$typeof) {
      return <IconComp />;
    }
    return <IconComp className="w-5 h-5" />;
  };

  return (
    <>
      <Helmet>
        <title>{property.name} – Guest Guide</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="relative">
          {property.hero_image_url ? (
            <div className="h-64 sm:h-80 md:h-96 relative overflow-hidden">
              <img
                src={property.hero_image_url}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
          ) : (
            <div className="h-64 sm:h-80 md:h-96 relative overflow-hidden bg-gradient-to-br from-leville-dark via-leville-dark to-leville-turquoise/20">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-leville-turquoise/30 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/20 blur-3xl" />
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-2 tracking-tight">
                {property.name}
              </h1>
              {property.address && (
                <p className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  {property.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick info bar */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto px-4 py-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {property.check_in_time && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>Check-in {property.check_in_time}</span>
              </div>
            )}
            {property.check_out_time && (
              <div className="flex items-center gap-1.5">
                <LogOut className="w-4 h-4 text-primary" />
                <span>Check-out {property.check_out_time}</span>
              </div>
            )}
            {property.wifi_name && (
              <div className="flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-primary" />
                <span>{property.wifi_name}</span>
              </div>
            )}
            {property.max_guests && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span>Max {property.max_guests} guests</span>
              </div>
            )}
          </div>
        </div>

        {/* Section Grid */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          {!activeSection ? (
            <div className="grid grid-cols-2 gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="bg-card border border-border rounded-xl p-5 flex flex-col items-center gap-3 text-center hover:border-primary/50 hover:bg-card/80 transition-all duration-300 active:scale-[0.98] group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    {renderIcon(section.icon)}
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight font-sans">
                    {section.title}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            (() => {
              const section = sections.find((s) => s.id === activeSection);
              if (!section) return null;
              const secImages = sectionImages(section.section_key);

              return (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <button
                    onClick={() => setActiveSection(null)}
                    className="flex items-center gap-1 text-primary text-sm font-medium mb-5 hover:text-primary/80 transition-colors font-sans"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to menu
                  </button>

                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    {/* Section header */}
                    <div className="p-5 border-b border-border flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {renderIcon(section.icon)}
                      </div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                    </div>

                    {/* Section images */}
                    {secImages.length > 0 && (
                      <div className="flex overflow-x-auto gap-2 p-4 bg-secondary/30">
                        {secImages.map((img) => (
                          <div key={img.id} className="flex-shrink-0">
                            <img
                              src={img.image_url}
                              alt={img.caption || ""}
                              className="h-40 w-auto rounded-lg object-cover"
                            />
                            {img.caption && (
                              <p className="text-xs text-muted-foreground mt-1 text-center max-w-[200px]">
                                {img.caption}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Section content */}
                    <div className="p-5">
                      {section.content && (
                        <div className="prose prose-invert prose-sm max-w-none whitespace-pre-line text-muted-foreground leading-relaxed font-sans [&_strong]:text-foreground [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif">
                          {section.content}
                        </div>
                      )}

                      {/* Special: Map for arrival section */}
                      {section.section_key === "arrival" && property.latitude && property.longitude && (
                        <div className="mt-5">
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors font-sans"
                          >
                            <MapPin className="w-4 h-4" />
                            Open in Google Maps
                          </a>
                          <div className="mt-3 rounded-lg overflow-hidden border border-border">
                            <iframe
                              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.latitude},${property.longitude}&zoom=15`}
                              width="100%"
                              height="250"
                              style={{ border: 0 }}
                              loading="lazy"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      )}

                      {/* Special: WiFi details */}
                      {section.section_key === "wifi" && property.wifi_name && (
                        <div className="mt-5 bg-secondary/50 rounded-lg p-4 border border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <Wifi className="w-5 h-5 text-primary" />
                            <span className="font-medium text-foreground font-sans">WiFi Details</span>
                          </div>
                          <p className="text-sm text-muted-foreground"><strong className="text-foreground">Network:</strong> {property.wifi_name}</p>
                          {property.wifi_password && (
                            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Password:</strong> {property.wifi_password}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>

        {/* Contact footer */}
        <div className="max-w-2xl mx-auto px-4 pb-8">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Need help?</h3>
            <div className="flex flex-wrap gap-3">
              {property.contact_phone && (
                <a
                  href={`tel:${property.contact_phone}`}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors font-sans"
                >
                  <Phone className="w-4 h-4" />
                  Call us
                </a>
              )}
              {property.contact_whatsapp && (
                <a
                  href={`https://wa.me/${property.contact_whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-900/30 text-green-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-900/50 transition-colors font-sans"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
              {property.contact_email && (
                <a
                  href={`mailto:${property.contact_email}`}
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors font-sans"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Branding footer */}
        <div className="text-center py-6 text-xs text-muted-foreground font-sans">
          Powered by{" "}
          <a href="https://leville.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
            Leville.net
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertyGuide;
