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
  Mountain, CheckCircle2, Volume2, Cigarette,
  BedDouble, Snowflake, Flame, Dog, Package, Baby, Tv,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import buildingExterior from "@/assets/frontslope/building-exterior.png";
import livingFireplace from "@/assets/frontslope/living-fireplace.jpg";
import sauna5a2 from "@/assets/frontslope/sauna-5a2.jpg";

const sections = [
  { id: "about", label: "About" },
  { id: "apartments", label: "Apartments" },
  { id: "check-in", label: "Check-in" },
  { id: "kitchen", label: "Kitchen" },
  { id: "amenities", label: "Amenities" },
  { id: "sauna", label: "Sauna" },
  { id: "rules", label: "Rules" },
  { id: "checkout", label: "Checkout" },
  { id: "contact", label: "Contact" },
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
      "Private Sauna", "Heat-Storing Fireplace", "Free WiFi", "Free Parking with Power Outlet",
      "Full Kitchen", "Dishwasher", "Air Source Heat Pump", "Drying Room", "Ski Storage",
      "Balcony", "Washing Machine", "Drying Cabinet", "Smart TV", "High Chair",
      "Baby Safety Gates", "Fire Extinguisher", "Smoke Alarm",
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

  const kitchenItems = [
    "Refrigerator", "Oven & Stove", "Dishwasher", "Coffee Maker", "Blender",
    "Microwave", "Hand Mixer", "Electric Kettle", "Ice Maker (select apartments)",
    "Pots / Pans / Bakeware", "Dinnerware for 6–12 guests", "Variety of Glassware",
  ];

  const amenities = [
    { icon: Flame, title: "Fireplace", desc: "All apartments have a fireplace — 5A2 features a heat-storing fireplace that radiates warmth for hours after the fire dies down. Firewood is provided. In 5B5, you'll find firewood on the balcony. In 5A2 and 5B2, firewood is in the basement storage. Open the chimney valve before lighting and close it only when the fire is completely out. Add wood a maximum of 2 times per session. Open the balcony door briefly during ignition to ensure good airflow." },
    { icon: Thermometer, title: "Heating", desc: "The apartments are primarily heated by an air source heat pump, controlled via remote. You can also adjust the radiators in the bedrooms if needed — but please set them back to approximately 19°C before you leave. The fireplace provides additional cosy warmth on cold evenings." },
    { icon: Snowflake, title: "Private Sauna", desc: "Every apartment has a private electric sauna. In 5B5, the sauna has a window overlooking the front slope — perfect for enjoying the evening slope lighting. For tips on Finnish sauna culture, check out our guide.", link: { text: "Read our Sauna Guide →", to: "/sauna" } },
    { icon: WashingMachine, title: "Washer & Dryer", desc: "Each apartment has a washing machine and a drying cabinet for outdoor clothes (40°C, about one hour works best). Some apartments also have a tumble dryer. A drying rack is available for regular laundry." },
    { icon: Package, title: "Drying Room & Ski Storage", desc: "The ground-floor apartments (5A2, 5B2) have a separate drying room — you can enter from outside, leave your skis and wet gear to dry, and head straight to the sauna without tracking snow through the apartment. The building's basement has additional storage space for skis, luggage, and equipment." },
    { icon: Droplets, title: "Tap Water", desc: "Lapland tap water comes straight from the fells. It's exceptionally clean, cold and fresh — drink it straight from the tap." },
    { icon: Car, title: "Free Parking", desc: "Each apartment has a designated parking spot marked with the apartment number. The parking spaces include a power outlet for engine block heaters — essential in Lapland winter temperatures." },
    { icon: Wifi, title: "Free WiFi", desc: "High-speed WiFi is available in all apartments. Network name: Hiihtajankuja. You'll find the password inside your apartment." },
    { icon: Dog, title: "Pets Welcome", desc: "Pets are allowed in all our Front Slope apartments. Please keep the apartment clean and let us know in advance if you're bringing a pet." },
    { icon: Baby, title: "Family Friendly", desc: "High chairs and baby safety gates are available in all apartments. 5B5 also has a crib and children's books and toys. Let us know in advance what you need." },
    { icon: Tv, title: "Entertainment", desc: "All apartments have a large smart flat-screen TV. 5B2 includes a PlayStation. 5B5 features a sound system for the full après-ski experience." },
  ];

  const houseRules = [
    { icon: Cigarette, title: "No Smoking", desc: "No smoking or vaping inside the apartments. Please smoke outside and use the ashtray provided." },
    { icon: Volume2, title: "Quiet Time from 11 PM", desc: "Quiet hours begin at 11:00 PM. Please — no excessive noise, loud music or rowdy behaviour. Disturbances to neighbours will not be tolerated." },
    { icon: ShieldCheck, title: "Damage", desc: "Please report any damage or malfunction to us right away so we can repair or replace items quickly." },
    { icon: Phone, title: "Emergencies", desc: "In case of emergency, call 112 (Finnish emergency number). Fire extinguishers are located in the hallway. For non-urgent issues, contact us at +358 44 131 313 or info@leville.net." },
  ];

  const checkoutItems = [
    "Linens: Leave beds unmade. Place used towels and linens in the hallway.",
    "Dishes: Rinse dishes and load the dishwasher. Please start the dishwasher before you leave.",
    "Food: Empty the fridge of all open and perishable food. Dry ingredients and unopened items can stay.",
    "Heating: If you adjusted the bedroom radiators, please set them back to approximately 19°C.",
    "Lights & Electronics: Make sure all lights, appliances and electronics are switched off.",
    "Windows & Doors: Check that all windows and doors are properly closed and locked.",
  ];

  const readNextLinks = [
    { to: "/sauna", label: "Finnish Sauna Guide" },
    { to: "/guide/restaurants-and-services-in-levi", label: "Restaurants & Dining in Levi" },
    { to: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", label: "How to Get to Levi" },
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

          <div className="max-w-4xl mx-auto rounded-xl p-5 border flex items-start gap-4" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
            <Car className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
            <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
              <strong style={{ color: "#2D2D2D" }}>Parking:</strong> Each apartment has a designated parking spot marked with the apartment number. Parking spaces include a power outlet for engine block heaters.
            </p>
          </div>
        </div>
      </section>

      {/* KITCHEN */}
      <section id="kitchen" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: "#2D2D2D" }}>The Kitchen</h2>
          <p className="text-center max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: "#555" }}>
            Every apartment has a fully equipped kitchen for preparing meals for up to 6–10 guests. You'll find basic spices, and often coffee, tea, cocoa, sugar and other dry ingredients left by previous guests — feel free to use everything. Dish soap and dishcloths are provided. If you have leftover dry ingredients when you leave, you're welcome to leave them for the next guests.
          </p>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="rounded-xl p-6 border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5" style={{ color: "#B8860B" }} />
                <h3 className="text-lg font-bold" style={{ color: "#2D2D2D" }}>Appliances &amp; Cookware</h3>
              </div>
              <ul className="space-y-2.5">
                {kitchenItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "#555" }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#B8860B" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              {/* Replace with Hiihtäjänkuja kitchen photo */}
              <img src={sauna5a2} alt="Front Slope apartment kitchen" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>Amenities &amp; Equipment</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((a) => (
              <div key={a.title} className="rounded-xl p-6 border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
                <a.icon className="w-6 h-6 mb-3" style={{ color: "#B8860B" }} />
                <h3 className="font-bold mb-2" style={{ color: "#2D2D2D" }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{a.desc}</p>
                {a.link && (
                  <Link to={a.link.to} className="inline-block mt-2 text-sm font-medium hover:underline" style={{ color: "#B8860B" }}>
                    {a.link.text}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAUNA CALLOUT */}
      <section id="sauna" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Snowflake className="w-10 h-10 mx-auto mb-4" style={{ color: "#B8860B" }} />
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: "#2D2D2D" }}>The Finnish Sauna Experience</h2>
          <p className="leading-relaxed mb-8" style={{ color: "#555" }}>
            A private sauna is one of the highlights of staying in our apartments. In 5B5, you can even enjoy the view of the illuminated front slope from the sauna window. Whether you're a first-timer or experienced, our guide covers everything from etiquette to the perfect temperature.
          </p>
          <Button asChild size="lg" className="text-white font-semibold px-8" style={{ backgroundColor: "#B8860B" }}>
            <Link to="/sauna">Read Our Sauna Guide <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      {/* HOUSE RULES */}
      <section id="rules" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>House Rules</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {houseRules.map((r) => (
              <div key={r.title} className="rounded-xl p-6 border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
                <r.icon className="w-6 h-6 mb-3" style={{ color: "#B8860B" }} />
                <h3 className="font-bold mb-2" style={{ color: "#2D2D2D" }}>{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT CHECKLIST */}
      <section id="checkout" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center" style={{ color: "#2D2D2D" }}>Before You Go – Checkout Checklist</h2>
          <p className="text-center mb-10 leading-relaxed" style={{ color: "#555" }}>
            Please complete these simple steps before leaving by 11:00 AM. Checkout instructions are also posted on the hallway wall.
          </p>
          <div className="space-y-4">
            {checkoutItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-4" style={{ backgroundColor: "#FFFDF9" }}>
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                <p className="text-sm leading-relaxed" style={{ color: "#2D2D2D" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & CTA */}
      <section id="contact" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "#2D2D2D" }}>Need Anything During Your Stay?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
            <a href="tel:+35844131313" className="flex items-center gap-2 text-lg font-medium hover:underline" style={{ color: "#B8860B" }}>
              <Phone className="w-5 h-5" /> +358 44 131 313
            </a>
            <a href="mailto:info@leville.net" className="flex items-center gap-2 text-lg font-medium hover:underline" style={{ color: "#B8860B" }}>
              <Mail className="w-5 h-5" /> info@leville.net
            </a>
          </div>
          <p className="leading-relaxed mb-10" style={{ color: "#555" }}>
            Whether it's a maintenance issue, a question about Levi, or you need extra supplies — just send us a message and we'll take care of it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-white font-semibold px-8" style={{ backgroundColor: "#B8860B" }}>
              <Link to="/en/accommodations">Browse All Our Accommodations <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8" style={{ borderColor: "#B8860B", color: "#B8860B" }}>
              <Link to="/en/levi">Explore Levi Travel Guide <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          {/* Read Next */}
          <h3 className="text-lg font-bold mb-6" style={{ color: "#2D2D2D" }}>Read Next</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {readNextLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl p-5 border text-center font-medium text-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4", color: "#B8860B" }}
              >
                {link.label}
                <ArrowRight className="w-4 h-4 mx-auto mt-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FrontslopeGuide;
