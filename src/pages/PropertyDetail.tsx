import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  Maximize, DoorOpen, Bed, Users, MapPin, ExternalLink, PawPrint, Flame,
  Accessibility, Droplets, Bath, Calendar, ArrowRight, Mountain, Phone, MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import OptimizedImage from "@/components/OptimizedImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "@/components/PropertyCard";
import { properties, type Property } from "@/data/properties";
import { propertyFi, locationFi, translateYearFi } from "@/data/propertyTranslationsFi";

const PHONE = "+35844131313";
const PHONE_DISPLAY = "+358 44 13 13 13";
const WHATSAPP_URL = `https://wa.me/${PHONE.replace(/[^0-9]/g, "")}`;

const groupOf = (p: Property): string => {
  if (p.id.startsWith("5")) return "front-slope";
  if (p.id === "karhupirtti") return "karhupirtti";
  if (["211", "212", "209", "210", "102", "104", "319", "320", "321"].includes(p.id)) return "skistar";
  if (["karhunvartija3", "platinum-a2", "moonlight-415"].includes(p.id)) return "center-other";
  return "glacier";
};

const groupContext: Record<string, { fi: string; distance: string }> = {
  "front-slope": {
    fi: "Sijaitsee suoraan Levin etelärinteellä — n. 50 m kävelymatka hisseille ja 600 m Levin keskustaan, K-Marketille ja ravintoloihin.",
    distance: "50 m hisseille · 600 m keskustaan",
  },
  "skistar": {
    fi: "Postintien moderni rakennus aivan Levin keskustassa. Askelia K-Marketille, ravintoloihin ja kahviloihin, n. 600 m gondolille. Huom. ei hissiä.",
    distance: "Levin keskusta · 600 m gondolille",
  },
  "karhupirtti": {
    fi: "Perinteinen 220 m² hirsihuvila Levin keskustassa, ulkoporeallas omalla pihalla. 14 hengen ryhmämajoitus, takka, sauna ja takkapuut sisältyvät.",
    distance: "Levin keskusta · oma piha",
  },
  "center-other": {
    fi: "Levin keskustan välittömässä läheisyydessä — kävelymatka rinteille, palveluille ja ravintoloille.",
    distance: "Levin keskusta",
  },
  "glacier": {
    fi: "Hullu Poro -alueen alppihuoneistot etelärinteen tuntumassa. Lasten leikkihuone, lämmin suksivarasto ja parkkipaikat samassa rakennuksessa.",
    distance: "Hullu Poro · etelärinne",
  },
};

const truncate = (s: string, max = 155) => (s.length <= max ? s : s.slice(0, max - 1).trimEnd() + "…");

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = useMemo(() => properties.find((p) => p.slug === slug), [slug]);

  if (!property) {
    return <Navigate to="/majoitukset" replace />;
  }

  const group = groupOf(property);
  const ctx = groupContext[group];
  const totalBeds = property.beds + property.extraBeds;
  const canonical = `https://leville.net/majoitukset/${property.slug}`;
  const fi = propertyFi[property.slug];
  const displayName = fi?.name ?? property.name;
  const displayDescription = fi?.shortDescription ?? property.shortDescription;
  const displayLocation = locationFi[property.location] ?? property.location;
  const displayYear = translateYearFi(property.yearBuiltOrRenovated);
  const title = `${displayName} — Levi | Leville.net`;
  const description = truncate(displayDescription);

  const related = properties
    .filter((p) => groupOf(p) === group && p.id !== property.id)
    .slice(0, 3);

  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: displayName,
    url: canonical,
    description: displayDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Levi",
      addressRegion: "Lappi",
      addressCountry: "FI",
    },
    telephone: PHONE,
    image: property.heroImage ? `https://leville.net${property.heroImage}` : "https://leville.net/og-image.png",
    numberOfRooms: property.bedrooms || undefined,
    occupancy: { "@type": "QuantitativeValue", maxValue: property.maxGuests },
    amenityFeature: [
      property.sauna && { "@type": "LocationFeatureSpecification", name: "Sauna", value: true },
      property.fireplace && { "@type": "LocationFeatureSpecification", name: "Fireplace", value: true },
      property.petsAllowed && { "@type": "LocationFeatureSpecification", name: "Pets allowed", value: true },
      property.accessible && { "@type": "LocationFeatureSpecification", name: "Wheelchair accessible", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    ].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Etusivu", item: "https://leville.net/" },
      { "@type": "ListItem", position: 2, name: "Majoitukset", item: "https://leville.net/majoitukset" },
      { "@type": "ListItem", position: 3, name: displayName, item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <html lang="fi" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content={property.heroImage ? `https://leville.net${property.heroImage}` : "https://leville.net/og-image.png"} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <HreflangTags currentPath={`/majoitukset/${property.slug}`} currentLang="fi" />
      <JsonLd data={lodgingSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang="fi" />
        <main className="pt-6 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Hero */}
            <section className="mb-8 md:mb-12">
              <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{displayLocation}</span>
                <span>·</span>
                <span>{ctx.distance}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {displayName}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                {displayDescription}
              </p>

              {/* Hero image / placeholder */}
              <div className="mt-6 rounded-xl overflow-hidden border border-border/40 aspect-[16/9] bg-gradient-to-br from-primary/15 via-muted to-secondary/15">
                {property.heroImage ? (
                  <OptimizedImage
                    src={property.heroImage}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/40">
                    <Mountain className="w-20 h-20" aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Primary CTAs */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="gap-2 flex-1 sm:flex-initial">
                  <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Tarkista saatavuus <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href={`tel:${PHONE}`}>
                    <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </section>

            {/* Specs */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Kohteen tiedot</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <SpecBox icon={Maximize} label="Pinta-ala" value={`${property.sqm} m²`} />
                <SpecBox icon={DoorOpen} label="Makuuhuoneet" value={property.bedrooms === 0 ? "Studio" : `${property.bedrooms}`} />
                <SpecBox icon={Bed} label="Vuodepaikat" value={`${totalBeds} (sis. ${property.extraBeds} lisävuodetta)`} />
                <SpecBox icon={Users} label="Vieraita" value={property.guestRange} />
                <SpecBox icon={Bath} label="Kylpyhuoneet" value={property.bathrooms} />
                {property.wc !== "-" && <SpecBox icon={Bath} label="Erillinen WC" value={property.wc} />}
                {displayYear && <SpecBox icon={Calendar} label="Rakennusvuosi / remontti" value={displayYear} />}
                <SpecBox icon={MapPin} label="Sijainti" value={displayLocation} />
              </div>
            </section>

            {/* Amenities */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Mukavuudet</h2>
              <div className="flex flex-wrap gap-2">
                {property.sauna && <Badge variant="secondary" className="gap-1.5 bg-primary/15 text-primary border-primary/30 text-sm py-1.5 px-3"><Droplets className="w-4 h-4" /> Oma sauna</Badge>}
                {property.fireplace && <Badge variant="secondary" className="gap-1.5 text-sm py-1.5 px-3"><Flame className="w-4 h-4" /> Takka</Badge>}
                {property.petsAllowed && <Badge variant="secondary" className="gap-1.5 text-sm py-1.5 px-3"><PawPrint className="w-4 h-4" /> Lemmikit sallittu</Badge>}
                {property.accessible && <Badge variant="secondary" className="gap-1.5 text-sm py-1.5 px-3"><Accessibility className="w-4 h-4" /> Esteetön</Badge>}
                <Badge variant="outline" className="text-sm py-1.5 px-3">WiFi</Badge>
                <Badge variant="outline" className="text-sm py-1.5 px-3">Liinavaatteet sisältyvät</Badge>
                <Badge variant="outline" className="text-sm py-1.5 px-3">Loppusiivous sisältyy</Badge>
                <Badge variant="outline" className="text-sm py-1.5 px-3">Kuivaushuone</Badge>
              </div>
            </section>

            {/* Location context */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Sijainti</h2>
              <Card className="border-border/40">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed">{ctx.fi}</p>
                  <div className="mt-4">
                    <Link
                      to="/levi-map"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                    >
                      <MapPin className="w-4 h-4" /> Katso kohteet kartalla <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Booking block */}
            <section className="mb-12">
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-3">Varaa suoraan ilman välittäjää</h2>
                  <p className="text-muted-foreground mb-5">
                    Tarkista vapaat päivät ja varaa suoraan järjestelmästämme. Vastaamme samana päivänä — myös pyhäpäivinä.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="gap-2">
                      <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer">
                        Tarkista saatavuus <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="gap-2">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Related */}
            {related.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Muut samalla alueella</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      detailHref={`/majoitukset/${p.slug}`}
                      detailLabel="Lue lisää"
                      bookLabel="Tarkista saatavuus"
                    />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/majoitukset" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                    Katso kaikki kohteet <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const SpecBox = ({ icon: Icon, label, value }: { icon: typeof Maximize; label: string; value: string }) => (
  <div className="rounded-lg border border-border/40 bg-card/50 p-4">
    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide mb-1">
      <Icon className="w-3.5 h-3.5 text-primary" /> {label}
    </div>
    <div className="text-sm font-semibold text-foreground">{value}</div>
  </div>
);

export default PropertyDetail;
