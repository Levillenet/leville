import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, MapPin, Home as HomeIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import ScrollReveal from "@/components/ScrollReveal";
import PropertyCard from "@/components/PropertyCard";
import JsonLd from "@/components/JsonLd";
import { ApartmentComplexSchema } from "@/components/PropertySchema";
import { getBuildingGeo } from "@/data/buildingGeo";
import { properties } from "@/data/properties";
import { getStreetHub, streetHubs } from "@/data/street-hubs";

const BASE_URL = "https://leville.net";

const StreetHub = () => {
  const { streetSlug } = useParams<{ streetSlug: string }>();
  const hub = streetSlug ? getStreetHub(streetSlug) : undefined;

  const items = useMemo(
    () =>
      hub
        ? hub.propertySlugs
            .map((slug) => properties.find((p) => p.slug === slug))
            .filter((p): p is NonNullable<typeof p> => Boolean(p))
        : [],
    [hub],
  );

  if (!hub) {
    return <Navigate to="/majoitukset" replace />;
  }

  const canonical = `${BASE_URL}/vuokramokit/${hub.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Etusivu", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Majoitus Levillä", item: `${BASE_URL}/majoitukset` },
      { "@type": "ListItem", position: 3, name: hub.street, item: canonical },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: hub.h1,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/majoitukset/${p.slug}`,
      name: p.name,
    })),
  };

  const lodgingSchema = hub.brandNames && hub.brandNames.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: hub.brandNames[0],
        alternateName: hub.brandNames.slice(1),
        url: canonical,
        address: {
          "@type": "PostalAddress",
          streetAddress: hub.address ?? hub.street,
          addressLocality: hub.locationLabel ?? "Levi",
          addressRegion: "Lappi",
          addressCountry: "FI",
        },
      }
    : null;


  // Sisar-hubit (muut katuhubit) ristiinlinkitykseen
  const sisterHubs = streetHubs.filter((h) => h.slug !== hub.slug);

  return (
    <>
      <Helmet>
        <html lang="fi" />
        <title>{hub.metaTitle}</title>
        <meta name="description" content={hub.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={hub.metaTitle} />
        <meta property="og:description" content={hub.metaDescription} />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
      </Helmet>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      {lodgingSchema && <JsonLd data={lodgingSchema} />}
      <ApartmentComplexSchema
        name={hub.brandNames?.[0] ?? hub.street}
        alternateName={hub.brandNames?.slice(1)}
        description={hub.metaDescription}
        canonical={canonical}
        streetAddress={hub.address ?? hub.street}
        identifier={hub.slug}
        geo={getBuildingGeo(hub.address ?? hub.street)}
        images={items.map((p) => p.heroImage).filter((s): s is string => Boolean(s))}
        units={items.map((p) => ({
          name: p.name,
          url: `${BASE_URL}/majoitukset/${p.slug}`,
          maxGuests: p.maxGuests,
          sqm: p.sqm,
          bedrooms: p.bedrooms,
        }))}
      />


      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang="fi" />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <ScrollReveal>
              <header className="mb-8">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{hub.address ?? hub.street}, Levi</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
                  {hub.h1}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  {hub.subtitle}
                </p>
              </header>
            </ScrollReveal>

            <ScrollReveal>
              <section className="glass-card border border-border/30 rounded-xl p-5 sm:p-6 mb-10 max-w-3xl">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {hub.facts.map((f) => (
                    <div key={f.label}>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">
                        {f.label}
                      </div>
                      <div className="text-base sm:text-lg font-semibold text-foreground">
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="prose prose-invert max-w-3xl mb-12 space-y-4">
                {hub.intro.map((p, i) => (
                  <p key={i} className="text-foreground/90 leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="mb-16">
                <div className="mb-5">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Vapaat huoneistot {hub.street.endsWith("kuja") ? `${hub.street}lla` : hub.street}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {items.length === 1
                      ? "1 kohde – varaa suoraan ilman välityspalkkioita."
                      : `${items.length} kohdetta – varaa suoraan ilman välityspalkkioita.`}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p) => (
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
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
                  Selaa muita Levin keskustan katuja
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sisterHubs.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/vuokramokit/${s.slug}`}
                      className="group glass-card border border-border/30 rounded-xl p-5 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary mb-1">
                            <HomeIcon className="w-3.5 h-3.5" />
                            {s.address ?? s.street}
                          </div>
                          <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {s.street} – Levi
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{s.subtitle}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <div className="text-center">
                <Link
                  to="/majoitukset"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                >
                  ← Kaikki majoituskohteet Levillä
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </main>

        <Footer lang="fi" />
      </div>
    </>
  );
};

export default StreetHub;
