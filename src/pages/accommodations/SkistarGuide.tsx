import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import {
  Clock, Phone, Mail, Wifi, Droplets, Car, ShieldCheck,
  WashingMachine, Thermometer, Download, ArrowRight, Home, Users,
  Bath, Mountain, CheckCircle2, AlertTriangle, Volume2, Cigarette,
  Ruler, BedDouble, Lock, UtensilsCrossed, Snowflake, Bike, Package,
  Baby, DoorOpen, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import buildingExterior from "@/assets/skistar/building-exterior.jpg";
import livingKitchen from "@/assets/skistar/living-kitchen.jpg";
import studioKitchen from "@/assets/skistar/studio-kitchen.jpg";
import studioBedroom from "@/assets/skistar/studio-bedroom.jpg";
import saunaBathroom from "@/assets/skistar/sauna-bathroom.jpg";
import bedroomBathroom from "@/assets/skistar/bedroom-bathroom.jpg";
import bedroomDetail from "@/assets/skistar/bedroom-detail.jpg";
import bedroomPillows from "@/assets/skistar/bedroom-pillows.jpg";
import bedroomPillows2br from "@/assets/skistar/bedroom-pillows-2br.jpg";

interface SkistarGuideProps {
  lang?: "fi" | "en";
}

const i18n = {
  en: {
    guestGuide: "GUEST GUIDE",
    h1: "Welcome to Skistar Apartments – Levi Centre",
    subtitle: "Your complete guide to our modern apartments on Postintie, right in the heart of Levi. Built in 2021, these state-of-the-art apartments feature underfloor geothermal heating, private saunas, and everything you need for an effortless Lapland holiday.",
    bookApartment: "Book an Apartment",
    downloadPdf: "Download PDF Guide",
    // Quick info
    qiLocation: "Levi City Centre",
    qiType: "Studios to 2BR",
    qiSize: "24–54 m²",
    qiGuests: "1–6 Guests",
    qiSauna: "Private Sauna",
    qiWifi: "Free WiFi",
    // Nav
    navAbout: "About",
    navApartments: "Apartments",
    navCheckin: "Check-in",
    navKitchen: "Kitchen",
    navAmenities: "Amenities",
    navSauna: "Sauna",
    navRules: "Rules",
    navCheckout: "Checkout",
    navContact: "Contact",
    // About
    aboutTitle: "About Skistar Apartments",
    aboutP1: "Our Skistar apartments are located on Postintie in the centre of Levi, in a modern building completed in 2021. The building features state-of-the-art construction with geothermal underfloor heating throughout every room.",
    aboutP2: "We offer a range of apartment sizes — from compact 24m² studios perfect for couples, to spacious 54m² two-bedroom apartments that comfortably fit families or groups of up to 6. Most apartments include a private electric sauna, a balcony, and thoughtfully designed interiors that make your Lapland holiday feel like home.",
    aboutP3: "All services in Levi are within walking distance — the supermarket, restaurants, souvenir shops, front slopes and kids' land are just a few minutes on foot. The closest snowmobile track is approximately 200 metres away.",
    // Apartments
    apartmentsTitle: "Our Apartments",
    studioTitle: "Studio (24–28 m²)",
    studioDesc: "Cosy studios for 1–3 guests. Open-plan layout with kitchen, sleeping area, bathroom, and most with a private sauna. Sofa bed for an extra guest. Perfect for couples or solo travellers.",
    studioApts: "Apartments: 102, 104, 319, 320, 321",
    studioBtn: "Book Now",
    oneBrTitle: "1-Bedroom Suite (43–44 m²)",
    oneBrDesc: "Comfortable apartments with a separate bedroom, living room with kitchen, sauna and bathroom. Sleeps 2 in the bedroom plus 1–2 on the sofa bed. Ideal for small families or couples who want more space.",
    oneBrApts: "Apartments: 209, 210",
    oneBrBtn: "Book Now",
    twoBrTitle: "2-Bedroom Suite (54 m²)",
    twoBrDesc: "Spacious apartments with 2 bedrooms, living room-kitchen, sauna, bathroom and balcony. Sleeps up to 6 guests. End apartments offer forest views and extra privacy. Great for families or groups of friends.",
    twoBrApts: "Apartments: 211, 212",
    twoBrBtn: "Book Now",
    apartmentsNote: "All apartments feature underfloor heating, fully equipped kitchen, private sauna (most apartments), free WiFi, and free parking. The interiors have been carefully designed with attention to comfort and Lappish atmosphere.",
    // Check-in
    checkinTitle: "Arrival & Check-in",
    checkinLabel: "CHECK-IN",
    checkinTime: "From 5:00 PM",
    checkinDesc: "We prepare the apartment so that everything is ready from 5:00 PM onwards. You can arrive anytime during the evening. You will receive the door lock code by text message on the day of arrival.",
    checkoutLabel: "CHECK-OUT",
    checkoutTime: "By 11:00 AM",
    checkoutDesc: "Please follow the checkout instructions posted on the apartment door. A simple checklist helps you leave the apartment ready for the next guests.",
    doorLockTitle: "Door Lock",
    doorLockDesc: "The apartments use a code lock with small buttons built into the door handle — there is no physical key. Enter the code you receive by SMS directly on the small buttons on the handle to unlock. Important: the key box mounted next to the apartment door is for emergency use only and should not be used for regular entry.",
    infoSignTitle: "Info Sign on Your Door",
    infoSignDesc: "On your apartment door you will find an info sign with important details including the WiFi network name and password, your personal ski storage locker code, and other practical information.",
    parkingNote: "Parking lots 1–25 in the front yard are reserved for Skistar apartment guests. Choose any available spot.",
    wasteNote: "Waste Disposal: The waste bin is located in the front yard — exit through the main door, turn left, and walk about 30 metres. You'll see a large round container.",
    metaTitle: "Skistar Apartments Guest Guide – Modern Apartments in Levi Centre | Leville.net",
    metaDesc: "Guest guide for Leville.net Skistar apartments in Levi centre. Studios and 1–2 bedroom apartments built in 2021 with private sauna, underfloor heating and ski storage. Check-in info, amenities, house rules.",
  },
  fi: {
    guestGuide: "VIERASOPAS",
    h1: "Tervetuloa Skistar-huoneistoihin – Levin keskustassa",
    subtitle: "Täydellinen opas moderneihin huoneistoihimme Postintiellä, aivan Levin sydämessä. Vuonna 2021 rakennetut huoneistot tarjoavat maalämpöisen lattialämmityksen, omat saunat ja kaiken tarvittavan vaivattomaan Lapin lomaan.",
    bookApartment: "Varaa huoneisto",
    downloadPdf: "Lataa PDF-opas",
    qiLocation: "Levin keskusta",
    qiType: "Studiot – 2h+k",
    qiSize: "24–54 m²",
    qiGuests: "1–6 vierasta",
    qiSauna: "Oma sauna",
    qiWifi: "Ilmainen WiFi",
    navAbout: "Tietoa",
    navApartments: "Huoneistot",
    navCheckin: "Saapuminen",
    navKitchen: "Keittiö",
    navAmenities: "Varusteet",
    navSauna: "Sauna",
    navRules: "Säännöt",
    navCheckout: "Lähtö",
    navContact: "Yhteystiedot",
    aboutTitle: "Tietoa Skistar-huoneistoista",
    aboutP1: "Skistar-huoneistomme sijaitsevat Postintiellä Levin keskustassa, vuonna 2021 valmistuneessa modernissa rakennuksessa. Rakennus on varustettu maalämpöisellä lattialämmityksellä kaikissa tiloissa.",
    aboutP2: "Tarjoamme erikokoisia huoneistoja — kompakteista 24 m² studioista tilaville 54 m² kahden makuuhuoneen huoneistoihin, joihin mahtuu mukavasti perhe tai jopa 6 hengen ryhmä. Useimmissa huoneistoissa on oma sähkösauna, parveke ja huolella suunniteltu sisustus.",
    aboutP3: "Kaikki Levin palvelut ovat kävelymatkan päässä — kauppa, ravintolat, matkamuistomyymälät, eturinteet ja lastenalue ovat vain muutaman minuutin kävelyn päässä. Lähin moottorikelkkareitti on noin 200 metrin päässä.",
    apartmentsTitle: "Huoneistomme",
    studioTitle: "Studio (24–28 m²)",
    studioDesc: "Viihtyisät studiot 1–3 hengelle. Avoin pohjaratkaisu keittiöllä, nukkuma-alueella, kylpyhuoneella ja useimmissa oma sauna. Vuodesohva lisävieraalle. Täydellinen pareille tai yksinmatkaaville.",
    studioApts: "Huoneistot: 102, 104, 319, 320, 321",
    studioBtn: "Varaa nyt",
    oneBrTitle: "1 makuuhuone (43–44 m²)",
    oneBrDesc: "Mukavat huoneistot erillisellä makuuhuoneella, olohuone-keittiöllä, saunalla ja kylpyhuoneella. Makuuhuoneessa nukkuu 2 + vuodesohvalla 1–2. Ihanteellinen pienille perheille tai pareille, jotka haluavat enemmän tilaa.",
    oneBrApts: "Huoneistot: 209, 210",
    oneBrBtn: "Varaa nyt",
    twoBrTitle: "2 makuuhuonetta (54 m²)",
    twoBrDesc: "Tilavat huoneistot kahdella makuuhuoneella, olohuone-keittiöllä, saunalla, kylpyhuoneella ja parvekkeella. Nukkuu jopa 6 vierasta. Päätyhuoneistoissa metsänäkymät ja enemmän yksityisyyttä. Loistava perheille tai ystäväporukoille.",
    twoBrApts: "Huoneistot: 211, 212",
    twoBrBtn: "Varaa nyt",
    apartmentsNote: "Kaikissa huoneistoissa on lattialämmitys, täysin varustettu keittiö, oma sauna (useimmissa), ilmainen WiFi ja ilmainen pysäköinti. Sisustus on suunniteltu huolella mukavuutta ja lappilaista tunnelmaa ajatellen.",
    checkinTitle: "Saapuminen & Check-in",
    checkinLabel: "SAAPUMINEN",
    checkinTime: "Klo 17:00 alkaen",
    checkinDesc: "Valmistelemme huoneiston siten, että kaikki on valmiina klo 17:00 alkaen. Voit saapua milloin tahansa illan aikana. Saat ovikoodin tekstiviestillä saapumispäivänä.",
    checkoutLabel: "LÄHTÖ",
    checkoutTime: "Klo 11:00 mennessä",
    checkoutDesc: "Seuraa huoneiston oveen kiinnitettyä lähtöohjetta. Yksinkertainen muistilista auttaa jättämään huoneiston valmiiksi seuraavalle vieraalle.",
    doorLockTitle: "Ovien lukitus",
    doorLockDesc: "Huoneistoissa on koodilukko, jossa pienet painikkeet oven kahvassa — fyysistä avainta ei ole. Syötä saamasi koodin suoraan kahvan painikkeisiin. Tärkeää: oven vieressä oleva avainlipas on vain hätäkäyttöön eikä sitä saa käyttää normaaliin kulkuun.",
    infoSignTitle: "Infotaulu ovellasi",
    infoSignDesc: "Huoneistosi ovessa on infotaulu, josta löydät tärkeät tiedot: WiFi-verkon nimen ja salasanan, henkilökohtaisen suksivaraston koodin sekä muita käytännön tietoja.",
    parkingNote: "Pysäköintipaikat 1–25 etupihalla on varattu Skistar-huoneistojen vieraille. Valitse vapaa paikka.",
    wasteNote: "Jätehuolto: Jäteastia sijaitsee etupihalla — poistu pääovesta, käänny vasemmalle ja kävele noin 30 metriä. Näet pyöreän jätesäiliön.",
    metaTitle: "Skistar-huoneistojen vierasopas – Modernit huoneistot Levin keskustassa | Leville.net",
    metaDesc: "Vierasopas Leville.net Skistar-huoneistoihin Levin keskustassa. Studiot ja 1–2 makuuhuoneen huoneistot, rakennettu 2021, oma sauna, lattialämmitys ja suksivarasto.",
  },
};

const sections = (t: typeof i18n.en) => [
  { id: "about", label: t.navAbout },
  { id: "apartments", label: t.navApartments },
  { id: "check-in", label: t.navCheckin },
];

const SkistarGuide = ({ lang = "en" }: SkistarGuideProps) => {
  const t = i18n[lang];
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);

  const canonicalUrl = lang === "en"
    ? "https://www.leville.net/accommodations/guides/skistar-apartments"
    : "https://www.leville.net/majoitukset/oppaat/skistar-huoneistot";

  const accomLink = lang === "fi" ? "/majoitukset" : "/en/accommodations";

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 400);

      const secs = sections(t);
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(secs[i].id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.metaTitle,
    description: t.metaDesc,
    author: { "@type": "Organization", name: "Leville.net" },
    publisher: { "@type": "Organization", name: "Leville.net" },
    datePublished: "2025-06-01",
    dateModified: "2026-03-03",
    mainEntityOfPage: canonicalUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "fi" ? "Etusivu" : "Home", item: `https://leville.net${lang === "fi" ? "" : "/en"}` },
      { "@type": "ListItem", position: 2, name: lang === "fi" ? "Majoitukset" : "Accommodations", item: `https://leville.net${accomLink}` },
      { "@type": "ListItem", position: 3, name: "Skistar Apartments", item: canonicalUrl },
    ],
  };

  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Skistar Apartments – Levi Centre",
    description: t.metaDesc,
    url: canonicalUrl,
    telephone: "+358441313131",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Postintie",
      addressLocality: "Kittilä",
      addressRegion: "Lapland",
      postalCode: "99130",
      addressCountry: "FI",
    },
    geo: { "@type": "GeoCoordinates", latitude: 67.8039, longitude: 24.8141 },
    petsAllowed: false,
    amenityFeature: [
      "Private Sauna", "Free WiFi", "Free Parking", "Full Kitchen",
      "Underfloor Heating", "Ski Storage", "Balcony", "Dishwasher",
    ].map((f) => ({ "@type": "LocationFeatureSpecification", name: f, value: true })),
  };

  const quickInfo = [
    { icon: Mountain, label: t.qiLocation },
    { icon: Home, label: t.qiType },
    { icon: Ruler, label: t.qiSize },
    { icon: Users, label: t.qiGuests },
    { icon: Snowflake, label: t.qiSauna },
    { icon: Wifi, label: t.qiWifi },
  ];

  const apartmentTypes = [
    {
      title: t.studioTitle,
      desc: t.studioDesc,
      apts: t.studioApts,
      btn: t.studioBtn,
      icon: BedDouble,
      img: studioBedroom,
    },
    {
      title: t.oneBrTitle,
      desc: t.oneBrDesc,
      apts: t.oneBrApts,
      btn: t.oneBrBtn,
      icon: Home,
      img: bedroomDetail,
    },
    {
      title: t.twoBrTitle,
      desc: t.twoBrDesc,
      apts: t.twoBrApts,
      btn: t.twoBrBtn,
      icon: Users,
      img: bedroomBathroom,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9F6F1" }}>
      <SeoMeta
        title={t.metaTitle}
        description={t.metaDesc}
        canonicalUrl={canonicalUrl}
        lang={lang}
        ogType="article"
      />
      <Helmet>
        <link rel="alternate" hrefLang="en" href="https://www.leville.net/accommodations/guides/skistar-apartments" />
        <link rel="alternate" hrefLang="fi" href="https://www.leville.net/majoitukset/oppaat/skistar-huoneistot" />
        <link rel="alternate" hrefLang="x-default" href="https://www.leville.net/accommodations/guides/skistar-apartments" />
      </Helmet>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={lodgingSchema} />

      <Header />

      {/* Sticky Jump Nav */}
      {showNav && (
        <nav className="fixed top-16 sm:top-20 left-0 right-0 z-40 border-b shadow-sm" style={{ backgroundColor: "#F9F6F1", borderColor: "#E8E0D4" }}>
          <div className="container mx-auto px-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1 py-2 min-w-max">
              {sections(t).map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    activeSection === s.id
                      ? "text-white"
                      : "hover:bg-[#E8E0D4]"
                  }`}
                  style={activeSection === s.id ? { backgroundColor: "#B8860B", color: "#fff" } : { color: "#2D2D2D" }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img
            src={buildingExterior}
            alt="Skistar Apartments building exterior in winter"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(45,45,45,0.75) 0%, rgba(45,45,45,0.4) 100%)" }} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-xs tracking-[0.3em] font-medium mb-4 block" style={{ color: "#B8860B" }}>
            {t.guestGuide}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t.h1}
          </h1>
          <p className="text-base sm:text-lg text-white/85 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-white font-semibold px-8" style={{ backgroundColor: "#B8860B" }}>
              <Link to={accomLink}>
                {t.bookApartment} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 px-8">
              <a href="#" /* Replace with actual PDF URL */>
                <Download className="mr-2 w-4 h-4" /> {t.downloadPdf}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* QUICK INFO BAR */}
      <section className="border-b" style={{ backgroundColor: "#2D2D2D", borderColor: "#444" }}>
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {quickInfo.map((qi) => (
              <div key={qi.label} className="flex flex-col items-center gap-1.5">
                <qi.icon className="w-5 h-5" style={{ color: "#B8860B" }} />
                <span className="text-xs sm:text-sm font-medium text-white/90">{qi.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>
            {t.aboutTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={livingKitchen} alt="Skistar apartment living room and kitchen" className="w-full h-80 object-cover" />
            </div>
            <div className="space-y-4" style={{ color: "#2D2D2D" }}>
              <p className="leading-relaxed">{t.aboutP1}</p>
              <p className="leading-relaxed">{t.aboutP2}</p>
              <p className="leading-relaxed">{t.aboutP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* APARTMENTS */}
      <section id="apartments" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>
            {t.apartmentsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {apartmentTypes.map((apt) => (
              <div
                key={apt.title}
                className="rounded-xl overflow-hidden shadow-md border"
                style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}
              >
                <img src={apt.img} alt={apt.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <apt.icon className="w-5 h-5" style={{ color: "#B8860B" }} />
                    <h3 className="text-lg font-bold" style={{ color: "#2D2D2D" }}>{apt.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>{apt.desc}</p>
                  <p className="text-xs font-medium mb-4" style={{ color: "#B8860B" }}>{apt.apts}</p>
                  <Button asChild variant="outline" size="sm" className="w-full" style={{ borderColor: "#B8860B", color: "#B8860B" }}>
                    <Link to={accomLink}>
                      {apt.btn} <ArrowRight className="ml-2 w-3 h-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-center max-w-3xl mx-auto leading-relaxed" style={{ color: "#777" }}>
            {t.apartmentsNote}
          </p>
        </div>
      </section>

      {/* CHECK-IN & CHECK-OUT */}
      <section id="check-in" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>
            {t.checkinTitle}
          </h2>

          {/* Check-in / Check-out cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {[
              { label: t.checkinLabel, time: t.checkinTime, desc: t.checkinDesc },
              { label: t.checkoutLabel, time: t.checkoutTime, desc: t.checkoutDesc },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-xl p-6 border text-center"
                style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}
              >
                <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: "#B8860B" }} />
                <span className="text-xs tracking-[0.2em] font-semibold block mb-2" style={{ color: "#B8860B" }}>
                  {c.label}
                </span>
                <span className="text-2xl font-bold block mb-3" style={{ color: "#2D2D2D" }}>
                  {c.time}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Door Lock info */}
          <div className="rounded-xl p-5 border-l-4 mb-4" style={{ backgroundColor: "#FFFDF9", borderColor: "#B8860B" }}>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
              <div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: "#2D2D2D" }}>{t.doorLockTitle}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.doorLockDesc}</p>
              </div>
            </div>
          </div>

          {/* Info Sign */}
          <div className="rounded-xl p-5 border-l-4 mb-6" style={{ backgroundColor: "#FFFDF9", borderColor: "#B8860B" }}>
            <div className="flex items-start gap-3">
              <DoorOpen className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
              <div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: "#2D2D2D" }}>{t.infoSignTitle}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.infoSignDesc}</p>
              </div>
            </div>
          </div>

          {/* Parking & Waste */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg p-4" style={{ backgroundColor: "#FFFDF9" }}>
              <Car className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.parkingNote}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg p-4" style={{ backgroundColor: "#FFFDF9" }}>
              <Trash2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.wasteNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer before footer */}
      <div className="py-12" />

      <Footer />
    </div>
  );
};

export default SkistarGuide;
