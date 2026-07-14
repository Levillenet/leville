import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getLodgingBusinessSchema, getFAQSchema } from "@/utils/structuredData";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, Users, Mountain, Wifi, Car, Snowflake, Download, LucideIcon, Tag, ArrowRight, Building, ShieldCheck, KeyRound, LogOut, Bed, MapPin, Flag } from "lucide-react";
import { getTranslations, Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import PageCTA from "@/components/PageCTA";
import OptimizedImage from "@/components/OptimizedImage";
import { supabase } from "@/integrations/supabase/client";
import PropertyCard from "@/components/PropertyCard";
import ModerBookingWidget from "@/components/ModerBookingWidget";
import { properties } from "@/data/properties";
import { streetHubs } from "@/data/street-hubs";

// Import accommodation background images
import karhupirttiImg from "@/assets/accommodations/karhupirtti.jpg";
import skistarImg from "@/assets/accommodations/skistar.png";
import perheasunnotImg from "@/assets/accommodations/perheasunnot.png";
import glacierImg from "@/assets/accommodations/glacier.png";

const accommodationIcons: LucideIcon[] = [Home, Users, Mountain, Building];

// Custom ski icon component
const SkiIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="20" x2="19" y2="4" />
    <line x1="8" y1="20" x2="22" y2="4" />
    <circle cx="4" cy="21" r="1" />
    <circle cx="7" cy="21" r="1" />
  </svg>
);

const amenityIcons = [Wifi, Car, Snowflake, SkiIcon];
const accommodationImages = [skistarImg, perheasunnotImg, karhupirttiImg, glacierImg];

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  KeyRound,
  LogOut,
  Bed,
  Car,
};

interface MajoituksetProps {
  lang?: Language;
}

const Majoitukset = ({ lang = "fi" }: MajoituksetProps) => {
  const t = getTranslations(lang).majoitukset;
  const location = useLocation();
  const isEnglish = lang === "en";
  
  // Welcome letter is shown only for English, Swedish, and Spanish (NOT French)
  const showWelcomeLetter = ["en", "sv", "es"].includes(lang);

  const trackDownload = async () => {
    try {
      await supabase.functions.invoke('log-download', {
        body: { document_type: 'welcome_letter', language: lang }
      });
    } catch (error) {
      console.error('Failed to log download:', error);
    }
  };

  const bookingLinks = [
    "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=412",
    "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=413",
    "https://app.moder.fi/levillenet/303?step=1",
    "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=214"
  ];

  const faqItems = useMemo(() => t.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  })), [t.faqs]);

  // SEO: Build per-building groups for LodgingBusiness JSON-LD and SEO text block.
  const propertyPath = (slug: string) =>
    lang === "fi" ? `/majoitukset/${slug}` : lang === "en" ? `/en/accommodations/${slug}` : `/majoitukset/${slug}`;
  const BASE = "https://leville.net";

  const buildingGroups = useMemo(() => {
    const groups: { id: string; name: string; slugPrefix: (slug: string) => boolean; description: string }[] = [
      { id: "zero-point", name: "Zero Point (Hiihtäjänkuja 5)", slugPrefix: (s) => s.startsWith("zero-point"), description: "Saunalliset 2 makuuhuoneen alppihuoneistot Levin ydinkeskustassa, kävelymatka rinteille ja keskustaan." },
      { id: "karhupirtti", name: "Karhupirtti (Skimbaajankuja 3)", slugPrefix: (s) => s === "karhupirtti", description: "Tilava hirsihuvila isoille ryhmille – oma sauna, takka ja paljulle varattu piha." },
      { id: "skistar", name: "Skistar Levi Centre (Postintie 3)", slugPrefix: (s) => s.startsWith("skistar"), description: "Modernit huoneistot ja studiot Levin keskustassa – palvelut askelmatkan päässä, hisseille n. 700 m." },
      { id: "karhunvartija", name: "Karhunvartija 3 (Skimbaajankuja 4)", slugPrefix: (s) => s === "karhunvartija-3", description: "Tilava perhehuoneisto Levin keskustassa, oma sauna ja takka." },
      { id: "levi-platinum", name: "Levi Platinum A2 (Hiihtäjänkuja 2)", slugPrefix: (s) => s === "levi-platinum-a2", description: "Edustava studio Levin keskustassa – kävelymatka rinteille, ravintoloihin ja palveluihin." },
      { id: "moonlight", name: "Moonlight 415 (Leviraitti)", slugPrefix: (s) => s === "moonlight-415", description: "Tunnelmallinen studio Levin sydämessä – nopea pääsy rinteille ja Levin palveluihin." },
      { id: "glacier-a", name: "Levi Glacier Apartments A-talo (Ratsastajankuja 2)", slugPrefix: (s) => /^glacier-a\d/.test(s), description: "Uudet alppitalon huoneistot ja penthouse rinteen yläpäässä – sauna, takka ja näköalat." },
      { id: "glacier-b", name: "Levi Glacier Apartments B-talo (Ratsastajankuja 2)", slugPrefix: (s) => /^glacier-b\d/.test(s), description: "Glacier B-talon huoneistot ja penthouset – sauna, takka ja rauhallinen sijainti." },
    ];
    return groups.map((g) => ({
      ...g,
      items: properties.filter((p) => g.slugPrefix(p.slug)),
    })).filter((g) => g.items.length > 0);
  }, []);

  const itemListSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "fi" ? "Majoitus Levillä – kaikki huoneistot" : "Accommodation in Levi – all apartments",
    numberOfItems: properties.length,
    itemListElement: properties.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}${propertyPath(p.slug)}`,
      name: p.name,
    })),
  }), [lang]);

  const buildingSchemas = useMemo(() => buildingGroups.map((g) => {
    const first = g.items[0];
    const addr = first.address;
    return {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: g.name,
      url: `${BASE}${lang === "fi" ? "/majoitukset" : lang === "en" ? "/en/accommodations" : "/majoitukset"}#${g.id}`,
      description: g.description,
      address: addr ? {
        "@type": "PostalAddress",
        streetAddress: addr.street,
        postalCode: addr.postalCode,
        addressLocality: addr.city,
        addressRegion: "Lappi",
        addressCountry: "FI",
      } : undefined,
      containsPlace: g.items.map((p) => ({
        "@type": "Accommodation",
        name: p.name,
        url: `${BASE}${propertyPath(p.slug)}`,
      })),
    };
  }), [buildingGroups, lang]);


  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getLodgingBusinessSchema(lang)} />
      <JsonLd data={getFAQSchema(faqItems)} />
      <JsonLd data={itemListSchema} />
      {buildingSchemas.map((s, i) => (
        <JsonLd key={`bldg-${i}`} data={s} />
      ))}

      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "en" ? "en_US" : lang === "sv" ? "sv_SE" : lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "nl" ? "nl_NL" : "fr_FR"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={lang === "fi" ? "Mökit ja loma-asunnot Levin hiihtokeskuksessa" : "Cabins and holiday homes in Levi ski resort"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Mökit ja loma-asunnot Levin hiihtokeskuksessa" : "Cabins and holiday homes in Levi ski resort"} />
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <ScrollReveal>
              <section className="text-center mb-6 md:mb-8 px-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  {t.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
              </section>
            </ScrollReveal>

            {lang === "fi" && (
              <ScrollReveal>
                <section className="max-w-3xl mx-auto mb-10 md:mb-12 px-2 text-center">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Etsitkö <strong className="text-foreground">majoitusta Levillä</strong>? Tarjoamme{" "}
                    <strong className="text-foreground">vuokramökkejä ja huoneistoja Levin keskustassa</strong>{" "}
                    suoraan omistajalta. Valikoimasta löydät saunallisia{" "}
                    <strong className="text-foreground">mökkejä Leviltä</strong> pariskunnille, perheille ja
                    isommille ryhmille – kaikki lyhyen kävelymatkan päässä rinteistä, ravintoloista ja Levin
                    keskustan palveluista. <strong className="text-foreground">Mökkivuokraus Levillä</strong>{" "}
                    on kanssamme mutkatonta: ei välityspalkkioita, joustavat peruutusehdot ja suora yhteys
                    omistajaan. Neljä kohdetta Levin ytimessä: Front Slope -alppihuoneistot{" "}
                    <Link to="/vuokramokit/hiihtajankuja-levi" className="text-primary hover:underline">
                      Hiihtäjänkujalla
                    </Link>
                    , Karhupirtti-hirsihuvila{" "}
                    <Link to="/vuokramokit/skimbaajankuja-levi" className="text-primary hover:underline">
                      Skimbaajankujalla
                    </Link>
                    , Levin ydinkeskustan{" "}
                    <Link to="/vuokramokit/glacier-apartments-levi" className="text-primary hover:underline">
                      Glacier Apartments – 4–5 mh perhehuoneistot Zero Pointissa
                    </Link>{" "}
                    sekä Skistar-talon kolmiot ja studiot{" "}
                    <Link to="/vuokramokit/postintie-levi" className="text-primary hover:underline">
                      Postintie 3:ssa
                    </Link>

                    . Lue myös oppaamme{" "}
                    <Link to="/opas/vuokramokit-levi" className="text-primary hover:underline">
                      vuokramökeistä Levillä
                    </Link>
                    .
                  </p>
                </section>
              </ScrollReveal>
            )}

            {/* Moder Booking Widget – check availability across all properties */}
            <ScrollReveal>
              <section className="mb-10 md:mb-12 relative z-[9990]">
                <div className="max-w-5xl mx-auto glass-card border border-border/30 rounded-xl p-4 sm:p-6 relative z-[9990]" style={{ overflow: "visible" }}>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 text-center">
                    {lang === "fi" ? "Tarkista varaustilanne"
                      : lang === "sv" ? "Kontrollera tillgänglighet"
                      : lang === "de" ? "Verfügbarkeit prüfen"
                      : lang === "es" ? "Comprobar disponibilidad"
                      : lang === "fr" ? "Vérifier la disponibilité"
                      : lang === "nl" ? "Beschikbaarheid controleren"
                      : "Check availability"}
                  </h2>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {lang === "fi" ? "Selaa kaikkien kohteiden vapaita aikoja ja tee varaus suoraan."
                      : lang === "sv" ? "Bläddra bland alla objekts lediga tider och boka direkt."
                      : lang === "de" ? "Durchsuchen Sie die Verfügbarkeit aller Objekte und buchen Sie direkt."
                      : lang === "es" ? "Consulta la disponibilidad de todos los alojamientos y reserva directamente."
                      : lang === "fr" ? "Parcourez les disponibilités de tous les hébergements et réservez directement."
                      : lang === "nl" ? "Bekijk de beschikbaarheid van alle accommodaties en boek direct."
                      : "Browse availability across all properties and book directly."}
                  </p>
                  <div id="moder-embed" className="relative z-[9990]" style={{ position: "relative", zIndex: 9990 }} />
                </div>
              </section>
            </ScrollReveal>
            <ModerBookingWidget lang={lang} />

            <ScrollReveal>
              <div className="max-w-3xl mx-auto mb-10 md:mb-16 px-2">
                <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-aurora-green/15 border border-primary/30 p-6 md:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                      <Flag className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        {lang === "fi" ? "Etua asiakkaillemme!"
                          : lang === "sv" ? "Förmån för våra gäster!"
                          : lang === "de" ? "Vorteil für unsere Gäste!"
                          : lang === "es" ? "¡Ventaja para nuestros huéspedes!"
                          : lang === "fr" ? "Avantage pour nos clients !"
                          : lang === "nl" ? "Voordeel voor onze gasten!"
                          : "A perk for our guests!"}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        {lang === "fi" ? "Tarjoamme majoitusasiakkaillemme Levi Golf -kierrokset hintaan 25 € / kierros. Varaukset ja tiedustelut: "
                          : lang === "sv" ? "Vi erbjuder våra boendegäster Levi Golf-rundor för 25 € / runda. Bokning och förfrågningar: "
                          : lang === "de" ? "Wir bieten unseren Unterkunftsgästen Levi Golf-Runden für 25 € / Runde. Buchungen und Anfragen: "
                          : lang === "es" ? "Ofrecemos a nuestros huéspedes rondas de Levi Golf por 25 € / ronda. Reservas y consultas: "
                          : lang === "fr" ? "Nous proposons à nos clients des parcours Levi Golf à 25 € / parcours. Réservations et demandes : "
                          : lang === "nl" ? "Wij bieden onze gasten Levi Golf-rondes voor 25 € / ronde. Reserveringen en aanvragen: "
                          : "We offer our accommodation guests Levi Golf rounds for €25 / round. Bookings and inquiries: "}
                        <a href="mailto:info@leville.net" className="text-primary font-semibold hover:underline">info@leville.net</a>
                      </p>
                      <a
                        href="mailto:info@leville.net"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
                      >
                        {lang === "fi" ? "Ota yhteyttä"
                          : lang === "sv" ? "Kontakta oss"
                          : lang === "de" ? "Kontaktieren Sie uns"
                          : lang === "es" ? "Contáctanos"
                          : lang === "fr" ? "Contactez-nous"
                          : lang === "nl" ? "Neem contact op"
                          : "Contact us"}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>


            {/* Section heading */}
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-10 px-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {lang === "fi" ? "Mökit ja huoneistot Levillä"
                    : lang === "en" ? "Cabins and apartments in Levi"
                    : lang === "sv" ? "Stugor och lägenheter i Levi"
                    : lang === "de" ? "Hütten und Apartments in Levi"
                    : lang === "es" ? "Cabañas y apartamentos en Levi"
                    : lang === "fr" ? "Chalets et appartements à Levi"
                    : "Hutten en appartementen in Levi"}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  {lang === "fi" ? "Valitse studiosta tilavaan hirsimökkiin — kaikki kohteet rinteiden ja palveluiden välittömässä läheisyydessä."
                    : lang === "en" ? "From cozy studios to spacious log cabins — all properties next to the slopes and services."
                    : lang === "sv" ? "Från studio till rymliga timmerstugor — alla nära pisterna och servicen."
                    : lang === "de" ? "Vom Studio bis zur geräumigen Blockhütte — alle Objekte direkt an Pisten und Services."
                    : lang === "es" ? "Desde estudios hasta amplias cabañas de madera — todos junto a las pistas y servicios."
                    : lang === "fr" ? "Du studio aux vastes chalets en rondins — tous proches des pistes et des services."
                    : "Van studio's tot ruime blokhutten — allemaal naast de pistes en voorzieningen."}
                </p>
              </div>
            </ScrollReveal>

            {/* Selaa kohteittain (FI only) – kaupallinen hubtaulukko */}
            {lang === "fi" && (
              <ScrollReveal>
                <section className="mb-12 md:mb-16">
                  <div className="text-center mb-5">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Kaikki majoituskohteemme Levillä</h2>
                    <p className="text-sm text-muted-foreground mt-1">Viisi majoituskokonaisuutta Levin keskustan alueella – valitse brändi ja katso saatavuus.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {streetHubs.map((s) => {
                      const brand = s.brandNames?.[0] ?? s.street;
                      return (
                        <Link
                          key={s.slug}
                          to={`/vuokramokit/${s.slug}`}
                          className="group glass-card border border-border/30 rounded-xl p-5 hover:border-primary/50 transition-colors flex flex-col"
                        >
                          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary mb-2">
                            <MapPin className="w-3.5 h-3.5" />
                            {s.locationLabel ?? s.address ?? s.street}
                          </div>
                          <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {brand}
                          </div>
                          {s.capacityLabel && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Kapasiteetti: <span className="text-foreground font-medium">{s.capacityLabel}</span>
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground mt-2 mb-3 flex-1">{s.subtitle}</p>
                          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                            Katso saatavuus <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              </ScrollReveal>
            )}


            {/* Accommodations */}
            {lang === "fi" || lang === "en" ? (
              <div className="space-y-12 mb-16 md:mb-20">
                {(lang === "fi"
                  ? [
                      {
                        title: "Hiihtäjänkujan alppihuoneistot",
                        subtitle: "Levin Eturinne, Zero Point -alueella, n. 200 m Eturinteeltä — 3 kohdetta",
                        items: properties.filter((p) => ["5a2", "5b2", "5b5"].includes(p.id)),
                      },
                      {
                        title: "Skistar — keskustahuoneistot Postintiellä",
                        subtitle: "Levin ydinkeskustassa, askelia palveluille — 9 kohdetta",
                        items: properties.filter((p) => ["211", "212", "209", "210", "310", "102", "104", "319", "320", "321"].includes(p.id)),
                      },
                      {
                        title: "Karhupirtti — hirsihuvila 14:lle",
                        subtitle: "Perinteinen hirsihuvila ulkoporealtaalla, Levin keskustassa",
                        items: properties.filter((p) => p.id === "karhupirtti"),
                      },
                      {
                        title: "Muut keskustakohteet",
                        subtitle: "Levi Platinum, Moonlight ja Karhunvartija — 3 kohdetta",
                        items: properties.filter((p) => ["karhunvartija3", "platinum-a2", "moonlight-415"].includes(p.id)),
                      },
                      {
                        title: "Levi Glacier — alppihuoneistot",
                        subtitle: "Hullu Poro -alueen huoneistot ja kattohuoneistot — 10 kohdetta",
                        items: properties.filter((p) => p.id.startsWith("glacier-")),
                      },
                    ]
                  : [
                      {
                        title: "Front Slope alpine apartments",
                        subtitle: "Front Slope (Eturinne), Zero Point area, ~200 m from the lifts — 3 properties",
                        items: properties.filter((p) => ["5a2", "5b2", "5b5"].includes(p.id)),
                      },
                      {
                        title: "Skistar — central apartments on Postintie",
                        subtitle: "In the heart of Levi, steps from the services — 9 properties",
                        items: properties.filter((p) => ["211", "212", "209", "210", "310", "102", "104", "319", "320", "321"].includes(p.id)),
                      },
                      {
                        title: "Karhupirtti — log villa for 14",
                        subtitle: "Traditional log villa with outdoor hot tub, in Levi centre",
                        items: properties.filter((p) => p.id === "karhupirtti"),
                      },
                      {
                        title: "Other central properties",
                        subtitle: "Levi Platinum, Moonlight and Karhunvartija — 3 properties",
                        items: properties.filter((p) => ["karhunvartija3", "platinum-a2", "moonlight-415"].includes(p.id)),
                      },
                      {
                        title: "Levi Glacier — alpine apartments",
                        subtitle: "Apartments and penthouses at the foot of the Front Slope (Eturinne), Zero Point area — 10 properties",
                        items: properties.filter((p) => p.id.startsWith("glacier-")),
                      },
                    ]
                ).map((group) => (
                  <ScrollReveal key={group.title}>
                    <section>
                      <div className="mb-5">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{group.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{group.subtitle}</p>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {group.items.map((p) => (
                          <PropertyCard
                            key={p.id}
                            property={p}
                            detailHref={lang === "fi" ? `/majoitukset/${p.slug}` : `/en/accommodations/${p.slug}`}
                            detailLabel={lang === "fi" ? "Lue lisää" : "Learn more"}
                            bookLabel={lang === "fi" ? "Varaa tästä" : "Book now"}
                            lang={lang}
                          />
                        ))}
                      </div>
                    </section>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 md:mb-20">
                {t.accommodations.map((acc, index) => {
                  const Icon = accommodationIcons[index];
                  return (
                    <ScrollReveal key={acc.title} delay={index * 0.15} direction="up">
                      <TiltCard className="h-full">
                        <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                          <div className={`absolute -right-4 sm:-right-6 w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 overflow-hidden pointer-events-none z-0 ${index === 2 ? 'bottom-12 sm:bottom-16' : '-bottom-4 sm:-bottom-8'}`}>
                            <OptimizedImage
                              src={accommodationImages[index]}
                              alt=""
                              className={`w-full h-full opacity-35 sm:opacity-45 group-hover:opacity-55 transition-opacity duration-500 rounded-xl sm:rounded-2xl ${index === 2 ? 'object-top' : ''}`}
                              style={{
                                maskImage: 'radial-gradient(ellipse at bottom right, black 25%, transparent 80%)',
                                WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 25%, transparent 80%)',
                              }}
                            />
                          </div>
                          <CardHeader className="relative z-10 p-4 sm:p-6">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-3 sm:mb-4">
                              <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                            </div>
                            <CardTitle className="text-lg sm:text-xl text-foreground">{acc.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col flex-grow relative z-10">
                            <p className="text-muted-foreground mb-4">{acc.description}</p>
                            <ul className="space-y-2 mb-6 flex-grow">
                              {acc.features.map((feature) => (
                                <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <a
                              href={bookingLinks[index]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block w-full text-center py-2.5 sm:py-3 px-3 sm:px-4 bg-primary text-primary-foreground rounded-lg font-medium text-sm sm:text-base hover:bg-primary/90 transition-colors mt-auto"
                            >
                              {t.bookCta}
                            </a>
                            {index === 2 && (
                              <Link
                                to={isEnglish ? "/accommodations/guides/bearlodge" : "/majoitukset/oppaat/karhupirtti"}
                                className="inline-flex items-center justify-center gap-1.5 w-full text-center py-2 px-3 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                              >
                                {isEnglish ? "Learn more" : "Tutustu tarkemmin"}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            )}
                          </CardContent>
                        </Card>
                      </TiltCard>
                    </ScrollReveal>
                  );
                })}
              </section>
            )}

            {/* Map Link */}
            <ScrollReveal>
              <Link
                to="/levi-map"
                className="flex items-center gap-3 glass-card border-border/30 hover:border-primary/50 rounded-xl p-5 mb-16 md:mb-20 transition-all duration-300 group max-w-md mx-auto"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {isEnglish ? "View locations on the map" : "Katso kohteet kartalla"}
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ml-auto flex-shrink-0" />
              </Link>
            </ScrollReveal>

            {/* Amenities */}
            <ScrollReveal delay={0.2}>
              <section className="text-center mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-8">{t.amenitiesTitle}</h2>
                <div className="flex flex-wrap justify-center gap-8">
                  {t.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[index];
                    return (
                      <div key={amenity.label} className="flex items-center gap-3 text-muted-foreground">
                        <Icon className="w-5 h-5 text-primary" />
                        <span>{amenity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* Booking & Payment Section */}
            <ScrollReveal delay={0.2}>
              <section className="mb-16 md:mb-20">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                  {t.bookingTitle}
                </h2>
                <div className="max-w-3xl mx-auto mb-8">
                  {t.bookingText.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-primary font-semibold mt-4">
                    {t.cancellationNote}
                  </p>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {t.infoCards.map((card) => {
                    const CardIcon = iconMap[card.icon] || ShieldCheck;
                    return (
                      <div
                        key={card.title}
                        className="glass-card border-border/30 rounded-xl p-4 sm:p-5 text-center"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                          <CardIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground mb-1.5">{card.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* Book Direct / Booking.com names section */}
            <ScrollReveal delay={0.2}>
              <section className="mb-16 md:mb-20 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                  {lang === "fi" ? "Varaa suoraan — paras hinta" :
                   lang === "sv" ? "Boka direkt" :
                   lang === "de" ? "Direkt buchen" :
                   lang === "es" ? "Reserva directa" :
                   lang === "fr" ? "Réservez directement" :
                   lang === "nl" ? "Direct boeken" :
                   "Book direct"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {lang === "fi" ? "Kaikki kohteemme myös Booking.comissa." :
                   lang === "sv" ? "Alla våra boenden finns också på Booking.com." :
                   lang === "de" ? "Alle unsere Unterkünfte auch auf Booking.com." :
                   lang === "es" ? "Todos nuestros alojamientos también en Booking.com." :
                   lang === "fr" ? "Tous nos hébergements également sur Booking.com." :
                   lang === "nl" ? "Al onze accommodaties ook op Booking.com." :
                   "All our properties are also listed on Booking.com."}
                </p>
                <div className="glass-card border-border/30 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    {isEnglish ? "Our Booking.com listings" : "Booking.com-nimemme"}
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Levillenet Glacier Alpine Chalets at Levi Centre",
                      "Levillenet Levi centre chalets",
                      "Levillenet Bearlodge at Levi city centre",
                      "Levillenet Bears Watch Apartments",
                      "Levillenet Skistar Superior Studios",
                      "Levillenet Skistar Superior 1-bedroom apartments",
                      "Levillenet Skistar Superior 2 bedroom apartments",
                      "Levi Platinum Superior Apartments",
                      "Levi Centre Moonlight Studio with Sauna 415",
                    ].map((name) => (
                      <li key={name} className="text-sm text-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </ScrollReveal>

            {/* FAQ Section */}
            <ScrollReveal delay={0.2}>
              <section className="mb-16 md:mb-20 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  {t.faqTitle}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {t.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="glass-card border-border/30 rounded-xl px-5 overflow-hidden"
                    >
                      <AccordionTrigger className="text-foreground text-left font-medium hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.answer}
                        {faq.link && (
                          <>
                            {" "}
                            <Link to={faq.link} className="text-primary hover:underline font-medium">
                              {faq.linkText}
                            </Link>
                          </>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </ScrollReveal>

            {/* Welcome Letter - Only for EN, SV, ES */}
            {showWelcomeLetter && (
              <ScrollReveal delay={0.3}>
                <section>
                  <div className="glass-card border-primary/30 bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">🎅</span>
                      </div>
                      <div className="text-center md:text-left flex-grow">
                        <h2 className="text-xl font-semibold text-foreground mb-2">
                          {lang === "es" ? "Carta de Bienvenida a Levi" : 
                           lang === "sv" ? "Välkomstbrev till Levi" : 
                           "Welcome Letter to Levi"}
                        </h2>
                        <p className="text-muted-foreground">
                          {lang === "es" 
                            ? "¡Con esta carta, puedes dar a tus hijos una maravillosa bienvenida a Levi de parte de Papá Noel!" 
                            : lang === "sv"
                            ? "Med detta brev kan du ge dina barn ett underbart välkomnande till Levi från Tomten själv!"
                            : "With this letter, you can give your children a wonderful welcome to Levi from Santa himself!"}
                        </p>
                      </div>
                      <a
                        href={lang === "es" ? "/docs/tervetulokirje-es.pdf" : "/docs/tervetulokirje.pdf"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={trackDownload}
                        className="inline-flex items-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        {lang === "es" ? "Descargar Carta" : 
                         lang === "sv" ? "Ladda ner Brev" : 
                         "Download Letter"}
                      </a>
                    </div>
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* SEO: per-building accommodation overview (FI only) */}
            {lang === "fi" && (
              <ScrollReveal delay={0.2}>
                <section className="mt-12 md:mt-16 mb-8 max-w-4xl mx-auto px-2" aria-labelledby="majoitus-yleiskatsaus">
                  <h2 id="majoitus-yleiskatsaus" className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Majoitus Levillä – kaikki {properties.length} huoneistoamme
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                    Leville.net vuokraa {properties.length} omaa loma-asuntoa Levin keskustasta ja rinteiden välittömästä
                    läheisyydestä – studioista penthouseihin. Kaikki kohteet sijaitsevat Sirkan kylässä Kittilässä,
                    kävelymatkan päässä hisseiltä, ravintoloista ja Levin palveluista. Varaat suoraan meiltä ilman
                    välityspalkkioita. Alla yhteenveto kohteistamme rakennuksittain – jokainen huoneisto on linkitetty
                    omalle sivulleen, jossa näet kuvat, varustelun ja varauskalenterin.
                  </p>

                  <div className="space-y-6">
                    {buildingGroups.map((g) => (
                      <article key={g.id} id={g.id} className="glass-card border border-border/30 rounded-xl p-5">
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">{g.name}</h3>
                        {g.items[0].address && (
                          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <address className="not-italic">
                              {g.items[0].address.street}, {g.items[0].address.postalCode} {g.items[0].address.city}
                            </address>
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mb-3">{g.description}</p>
                        <ul className="flex flex-wrap gap-2">
                          {g.items.map((p) => (
                            <li key={p.slug}>
                              <Link
                                to={propertyPath(p.slug)}
                                className="inline-block text-sm text-primary hover:underline border border-primary/30 rounded-full px-3 py-1"
                              >
                                {p.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mt-6">
                    Vertaile tarkemmin{" "}
                    <Link to="/opas/mokki-vai-huoneisto-levi" className="text-primary hover:underline">
                      mökin ja huoneiston eroja
                    </Link>
                    , tutustu{" "}
                    <Link to="/mokit-levilla" className="text-primary hover:underline">
                      mökkeihin Levillä
                    </Link>{" "}
                    tai katso{" "}
                    <Link to="/akkilahdot" className="text-primary hover:underline">
                      äkkilähtöjen tarjouksia
                    </Link>
                    . Et löydä sopivaa? Ota yhteyttä:{" "}
                    <a href="mailto:info@leville.net" className="text-primary hover:underline">
                      info@leville.net
                    </a>
                    .
                  </p>
                </section>
              </ScrollReveal>
            )}


            <ScrollReveal delay={0.2}>
              <section className="mt-16 md:mt-20 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  {isEnglish ? "Read Also" : "Lue myös"}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(isEnglish ? [
                    { title: "Cabin or Apartment? How to Choose", href: "/guide/cabin-vs-apartment-in-levi" },
                    { title: "Last-Minute Deals in Levi", href: "/en/last-minute" },
                    { title: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                  ] : [
                    { title: "Mökit Leviltä – vuokramökit keskustassa", href: "/mokit-levilla" },
                    { title: "Mökki vai huoneisto? Näin valitset oikean majoituksen", href: "/opas/mokki-vai-huoneisto-levi" },
                    { title: "Äkkilähdöt Levi – Viime hetken tarjoukset", href: "/akkilahdot" },
                    { title: "Miten pääsee Leville?", href: "/matka/miten-paasee-leville-helsingista" },
                  ]).map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="glass-card border-border/30 hover:border-primary/50 rounded-xl p-5 flex items-center justify-between gap-3 transition-all duration-300 group"
                    >
                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>
        <PageCTA lang={lang} />
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default Majoitukset;
