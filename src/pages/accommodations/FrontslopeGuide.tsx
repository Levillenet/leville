import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import {
  Clock, Car, Download, ArrowRight, Home, Users,
  Mountain, BedDouble, Snowflake, Flame, Dog,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import buildingExterior from "@/assets/frontslope/building-exterior.png";
import livingFireplace from "@/assets/frontslope/living-fireplace.jpg";

const sections = [
  { id: "about", label: "About" },
  { id: "apartments", label: "Apartments" },
  { id: "check-in", label: "Check-in" },
];

const FrontslopeGuide = () => {
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);

  const canonicalUrl = "https://www.leville.net/accommodations/guides/frontslope-apartments";

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 400);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Front Slope Apartments Guest Guide – Alpine Chalets in Levi Centre",
    description: "Guest guide for Leville.net Front Slope apartments on Hiihtäjänkuja in Levi. Alpine-style chalets with 2–4 bedrooms, private sauna, heat-storing fireplace, and ski-in/ski-out location.",
    author: { "@type": "Organization", name: "Leville.net" },
    publisher: { "@type": "Organization", name: "Leville.net" },
    datePublished: "2026-03-03",
    dateModified: "2026-03-03",
    mainEntityOfPage: canonicalUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://leville.net/en" },
      { "@type": "ListItem", position: 2, name: "Accommodations", item: "https://leville.net/en/accommodations" },
      { "@type": "ListItem", position: 3, name: "Guides", item: "https://leville.net/accommodations/guides" },
      { "@type": "ListItem", position: 4, name: "Front Slope Apartments", item: canonicalUrl },
    ],
  };

  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Leville.net Front Slope Apartments",
    description: "Alpine-style chalet apartments on Hiihtäjänkuja in Levi with 2–4 bedrooms, private sauna, fireplace, and ski-in/ski-out location.",
    url: canonicalUrl,
    telephone: "+35844131313",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hiihtäjänkuja",
      addressLocality: "Kittilä",
      addressRegion: "Lapland",
      postalCode: "99130",
      addressCountry: "FI",
    },
    geo: { "@type": "GeoCoordinates", latitude: 67.8039, longitude: 24.8141 },
    petsAllowed: true,
    amenityFeature: [
      "Private Sauna", "Fireplace", "Free WiFi", "Free Parking",
      "Full Kitchen", "Balcony", "Ski Storage", "Pets Allowed",
    ].map((f) => ({ "@type": "LocationFeatureSpecification", name: f, value: true })),
  };

  const quickInfo = [
    { icon: Mountain, label: "Front Slope Area" },
    { icon: Home, label: "65–100 m²" },
    { icon: BedDouble, label: "2–4 Bedrooms" },
    { icon: Users, label: "Up to 8 Guests" },
    { icon: Snowflake, label: "Private Sauna" },
    { icon: Flame, label: "Fireplace" },
    { icon: Dog, label: "Pets Allowed" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9F6F1" }}>
      <SeoMeta
        title="Front Slope Apartments Guest Guide – Alpine Chalets in Levi Centre | Leville.net"
        description="Guest guide for Leville.net Front Slope apartments on Hiihtäjänkuja in Levi. Alpine-style chalets with 2–4 bedrooms, private sauna, heat-storing fireplace, and ski-in/ski-out location. Check-in, amenities, house rules."
        canonicalUrl={canonicalUrl}
        lang="en"
        ogType="article"
      />
      <Helmet>
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
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
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    activeSection === s.id ? "text-white" : "hover:bg-[#E8E0D4]"
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
          <img src={buildingExterior} alt="Front Slope Apartments – Hiihtäjänkuja building exterior in winter with northern lights" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(45,45,45,0.75) 0%, rgba(45,45,45,0.4) 100%)" }} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-xs tracking-[0.3em] font-medium mb-4 block" style={{ color: "#B8860B" }}>GUEST GUIDE</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Welcome to Front Slope Apartments – Hiihtäjänkuja
          </h1>
          <p className="text-base sm:text-lg text-white/85 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your complete guide to our alpine-style chalet apartments on Hiihtäjänkuja, right at the front slope of Levi. Built in 2003 and continuously renovated, these apartments combine traditional alpine charm with modern comfort — steps from the slopes, trails, and Levi centre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-white font-semibold px-8" style={{ backgroundColor: "#B8860B" }}>
              <Link to="/en/accommodations">Book an Apartment <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 px-8">
              <a href="#" /* Replace with actual PDF URL */><Download className="mr-2 w-4 h-4" /> Download PDF Guide</a>
            </Button>
          </div>
        </div>
      </section>

      {/* QUICK INFO BAR */}
      <section className="border-b" style={{ backgroundColor: "#2D2D2D", borderColor: "#444" }}>
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center">
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>About the Apartments</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={livingFireplace} alt="Front Slope apartment living room with fireplace" className="w-full h-80 object-cover" />
            </div>
            <div className="space-y-4" style={{ color: "#2D2D2D" }}>
              <p className="leading-relaxed">
                Our Front Slope apartments are located on Hiihtäjänkuja in the heart of Levi, directly adjacent to the front slopes and the Zero Point area. The building was completed in 2003 and has been continuously renovated — apartment 5A2 underwent a full renovation in June 2024, and the penthouse 5B5 was fully updated in 2021.
              </p>
              <p className="leading-relaxed">
                We offer two apartment types: spacious 65m² two-bedroom apartments ideal for families or groups of up to 6, and an impressive 100m² penthouse with 4 bedrooms that comfortably fits up to 8 guests. All apartments feature a private sauna, a fireplace, a balcony, and a fully equipped kitchen.
              </p>
              <p className="leading-relaxed">
                The location is exceptional — the ski slopes, cross-country trails, restaurants, supermarket, and all Levi centre services are within a few minutes' walk. You can practically ski from your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APARTMENTS */}
      <section id="apartments" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>Our Apartments</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
            {/* 2-Bedroom */}
            <div className="rounded-xl overflow-hidden shadow-md border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BedDouble className="w-5 h-5" style={{ color: "#B8860B" }} />
                  <h3 className="text-lg font-bold" style={{ color: "#2D2D2D" }}>2-Bedroom Apartment (65 m²) — 5A2 &amp; 5B2</h3>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>
                  Comfortable alpine-style apartments with 2 bedrooms (each with 2 single beds), a living room with sofa bed, fully equipped kitchen, private sauna, and a balcony. The lower level includes a separate drying room — walk in from outside, leave your skis and wet gear to dry, and head straight to the sauna. Accommodates up to 6 guests.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>
                  5A2 features a heat-storing fireplace and was fully renovated in 2024 with both bathrooms completely updated. 5B2 has a PlayStation and a large downstairs living area.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full" style={{ borderColor: "#B8860B", color: "#B8860B" }}>
                  <Link to="/en/accommodations">
                    Book 2BR Apartment <ArrowRight className="ml-2 w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Penthouse */}
            <div className="rounded-xl overflow-hidden shadow-md border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5" style={{ color: "#B8860B" }} />
                  <h3 className="text-lg font-bold" style={{ color: "#2D2D2D" }}>Penthouse (100 m²) — 5B5</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>
                  A stunning top-floor penthouse with 4 bedrooms (9 beds total), a spacious living room with fireplace, a fully equipped kitchen with seating for 10, private sauna with a view of the front slope, and 3 balconies — including one overlooking the slopes. Sound system, large TV, and a modern interior renovated in 2021. Accommodates up to 8 guests.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full" style={{ borderColor: "#B8860B", color: "#B8860B" }}>
                  <Link to="/en/accommodations">
                    Book Penthouse <ArrowRight className="ml-2 w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="text-sm text-center max-w-3xl mx-auto leading-relaxed" style={{ color: "#555" }}>
            All apartments feature a private sauna, heat-storing or wood-burning fireplace, free WiFi, free parking (with power outlet), and pets are allowed. Basement storage is available for skis, luggage, and bicycles.
          </p>
        </div>
      </section>

      {/* CHECK-IN & CHECK-OUT */}
      <section id="check-in" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>Arrival &amp; Check-in</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Check-in card */}
            <div className="rounded-xl p-6 shadow-md border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#B8860B" }}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider" style={{ color: "#B8860B" }}>CHECK-IN</p>
                  <p className="text-lg font-bold" style={{ color: "#2D2D2D" }}>From 5:00 PM</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                We prepare the apartment so that everything is ready from 5:00 PM onwards. You can arrive anytime during the evening. You will receive the door lock code by text message on the day of arrival.
              </p>
            </div>

            {/* Check-out card */}
            <div className="rounded-xl p-6 shadow-md border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#B8860B" }}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider" style={{ color: "#B8860B" }}>CHECK-OUT</p>
                  <p className="text-lg font-bold" style={{ color: "#2D2D2D" }}>By 11:00 AM</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                Please follow the checkout instructions posted on the hallway wall.
              </p>
            </div>
          </div>

          {/* Parking info box */}
          <div className="max-w-4xl mx-auto rounded-xl p-5 border flex items-start gap-4" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
            <Car className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
            <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
              <strong style={{ color: "#2D2D2D" }}>Parking:</strong> Each apartment has a designated parking spot marked with the apartment number. Parking spaces include a power outlet for engine block heaters.
            </p>
          </div>
        </div>
      </section>

      {/* Spacer before footer */}
      <div className="py-12" />

      <Footer />
    </div>
  );
};

export default FrontslopeGuide;
