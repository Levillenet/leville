import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  Maximize, DoorOpen, Bed, Users, MapPin, ExternalLink, PawPrint, Flame,
  Accessibility, Droplets, Bath, Calendar, ArrowRight, Mountain, Phone, MessageCircle, Waves,
  ChevronLeft, ChevronRight, X,
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
import PropertyBookingWidget from "@/components/PropertyBookingWidget";
import { properties, type Property } from "@/data/properties";
import { propertyFi, locationFi, locationFiBySlug, translateYearFi } from "@/data/propertyTranslationsFi";

const PHONE = "+35844131313";
const PHONE_DISPLAY = "+358 44 13 13 13";
const WHATSAPP_URL = `https://wa.me/${PHONE.replace(/[^0-9]/g, "")}`;

// Lightweight Markdown-ish renderer for property long descriptions.
// Supports paragraphs (blank-line separated), **bold**, and "- " bullet lists.
const renderInline = (text: string, keyPrefix: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-${i}`} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
};

const RichText = ({ text }: { text: string }) => {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const isList = lines.every((l) => l.trim().startsWith("- "));
        if (isList) {
          return (
            <ul key={bi} className="list-disc pl-6 space-y-1.5">
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^-\s+/, ""), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        // Heading-like block: a single line that is fully wrapped in ** **
        const trimmed = block.trim();
        if (/^\*\*[^*]+\*\*$/.test(trimmed) && !trimmed.includes("\n")) {
          return (
            <h3 key={bi} className="text-lg font-semibold text-foreground mt-2">
              {trimmed.slice(2, -2)}
            </h3>
          );
        }
        return <p key={bi}>{renderInline(block, String(bi))}</p>;
      })}
    </div>
  );
};

const HeroGallery = ({ images, alt }: { images: string[]; alt: string }) => {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, total]);

  // Touch swipe
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 40) prev();
    else if (dx < -40) next();
  };

  if (total === 0) {
    return (
      <div className="rounded-xl overflow-hidden border border-border/40 aspect-[16/9] bg-gradient-to-br from-primary/15 via-muted to-secondary/15 flex items-center justify-center text-primary/40">
        <Mountain className="w-20 h-20" aria-hidden="true" />
      </div>
    );
  }

  return (
    <>
      <div className="relative rounded-xl overflow-hidden border border-border/40 aspect-[16/9] bg-muted group">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="block w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Avaa kuva isona"
        >
          <OptimizedImage
            src={images[index]}
            alt={`${alt} – kuva ${index + 1}/${total}`}
            className="w-full h-full object-cover"
          />
        </button>
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Edellinen kuva"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-80 hover:opacity-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Seuraava kuva"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-80 hover:opacity-100 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
              {index + 1} / {total}
            </div>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Näytä kuva ${i + 1}`}
              className={`shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition ${i === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <OptimizedImage src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            aria-label="Sulje"
            className="absolute top-4 right-4 text-white/90 hover:text-white p-2"
          >
            <X className="w-7 h-7" />
          </button>
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Edellinen kuva"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Seuraava kuva"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}
          <img
            src={images[index]}
            alt={`${alt} – kuva ${index + 1}/${total}`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="max-w-[95vw] max-h-[90vh] object-contain"
          />
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {index + 1} / {total}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const groupOf = (p: Property): string => {
  if (p.id.startsWith("5")) return "front-slope";
  if (p.id === "karhupirtti") return "karhupirtti";
  if (["211", "212", "209", "210", "102", "104", "319", "320", "321"].includes(p.id)) return "skistar";
  if (["karhunvartija3", "platinum-a2", "moonlight-415"].includes(p.id)) return "center-other";
  return "glacier";
};

const groupAddress: Record<string, { label: string; query: string }> = {
  "front-slope": { label: "Hiihtäjänkuja 5, Levi", query: "Hiihtäjänkuja 5, 99130 Levi" },
  "skistar": { label: "Postintie 3 B, Levi", query: "Postintie 3 B, 99130 Levi" },
  "glacier": { label: "Ratsastajankuja 2, Levi", query: "Ratsastajankuja 2, 99130 Levi" },
  "karhupirtti": { label: "Skimbaajankuja 3, Levi", query: "Skimbaajankuja 3, 99130 Levi" },
};

const groupContext: Record<string, { fi: string; distance: string }> = {
  "front-slope": {
    fi: "Alppityyliset talot Levin keskustassa Zero Point -alueella — n. 200 m kävelymatka Eturinteelle ja hisseille, askelten päässä K-Marketille ja ravintoloihin.",
    distance: "Levin keskusta · Zero Point · 200 m Eturinteelle",
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
  const roomTypeIdMatch = property.bookingUrl.match(/levillenet\/(\d+)/);
  const roomTypeId = roomTypeIdMatch ? Number(roomTypeIdMatch[1]) : null;
  const fi = propertyFi[property.slug];
  const displayName = fi?.name ?? property.name;
  const displayDescription = fi?.shortDescription ?? property.shortDescription;
  const longDescription = fi?.longDescription;
  const displayLocation = locationFiBySlug[property.slug] ?? locationFi[property.location] ?? property.location;
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
        <Breadcrumbs
          lang="fi"
          items={[
            { label: "Majoitukset", href: "/majoitukset" },
            { label: displayName, href: `/majoitukset/${property.slug}` },
          ]}
        />
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
                    Varaa tästä <ExternalLink className="w-4 h-4" />
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
                {groupAddress[group] && (
                  <Button asChild size="lg" variant="outline" className="gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(groupAddress[group].query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="w-4 h-4" /> {groupAddress[group].label}
                    </a>
                  </Button>
                )}
              </div>
            </section>

            {/* Long description */}
            {longDescription && (
              <section className="mb-10 max-w-3xl">
                <RichText text={longDescription} />
              </section>
            )}

            {/* Gallery */}
            {property.images && property.images.length > 1 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Kuvagalleria</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.images.slice(1).map((src, i) => (
                    <a
                      key={src}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg overflow-hidden border border-border/40 aspect-[4/3] bg-muted hover:opacity-90 transition-opacity"
                    >
                      <OptimizedImage
                        src={src}
                        alt={`${displayName} – kuva ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              </section>
            )}
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
                {property.hotTub && <Badge variant="secondary" className="gap-1.5 bg-primary/15 text-primary border-primary/30 text-sm py-1.5 px-3"><Waves className="w-4 h-4" /> Ulkoporeallas</Badge>}
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
                  {roomTypeId && (
                    <div className="mb-5 rounded-xl overflow-visible bg-white text-neutral-900 shadow-2xl">
                      <PropertyBookingWidget roomTypeId={roomTypeId} />
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="gap-2">
                      <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer">
                        Avaa varaus uudessa välilehdessä <ExternalLink className="w-4 h-4" />
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
                      bookLabel="Varaa tästä"
                      lang="fi"
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
