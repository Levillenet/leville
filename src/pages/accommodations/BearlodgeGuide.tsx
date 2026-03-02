import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  Clock, Phone, Mail, Wifi, Flame, Droplets, Car, ShieldCheck,
  ChefHat, WashingMachine, Thermometer, Download, ArrowRight,
  Users, Bath, Mountain, CheckCircle2, AlertTriangle,
  Volume2, Cigarette, Dog, Ruler, BedDouble, Baby,
  UtensilsCrossed, Snowflake
} from "lucide-react";
import livingFireplace from "@/assets/bearlodge/living-fireplace.jpg";
import kitchenPhoto from "@/assets/bearlodge/kitchen.jpg";

const BASE = "https://www.leville.net";
const META_DESC = "Everything you need to know about your stay at Bearlodge (Karhupirtti), a 220m² luxury log cabin with 7 bedrooms, outdoor jacuzzi and sauna in Levi, Finnish Lapland. Check-in info, amenities, house rules and more.";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "check-in", label: "Check-in" },
  { id: "kitchen", label: "Kitchen" },
  { id: "amenities", label: "Amenities" },
  { id: "jacuzzi", label: "Jacuzzi" },
  { id: "rules", label: "Rules" },
  { id: "checkout", label: "Checkout" },
  { id: "contact", label: "Contact" },
];

const quickFacts = [
  { icon: Mountain, label: "Front Slope Area" },
  { icon: Ruler, label: "220 m²" },
  { icon: BedDouble, label: "7 Bedrooms" },
  { icon: Users, label: "Up to 14 Guests" },
  { icon: Bath, label: "5 Bathrooms + Sauna" },
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Flame, label: "Fireplace & Jacuzzi" },
  { icon: Dog, label: "Pets Allowed" },
];

const highlights = [
  { icon: Flame, label: "Wood-burning fireplace" },
  { icon: Thermometer, label: "Geothermal heating + heat pump" },
  { icon: Snowflake, label: "Electric sauna" },
  { icon: WashingMachine, label: "Washing machine & drying cabinet" },
  { icon: ChefHat, label: "Full kitchen with dishwasher" },
  { icon: Baby, label: "Crib & baby safety gates available" },
];

const kitchenItems = [
  "Refrigerator & Freezer", "Oven & Stove", "Dishwasher", "Coffee Maker",
  "Toaster", "Microwave", "Electric Kettle", "Blender & Hand Mixer",
  "Ice Maker", "Pots / Pans / Bakeware", "Dishes & Cutlery for 14 guests",
  "Variety of Glassware", "Oils & Spices provided",
];

const amenities = [
  { icon: Flame, title: "Fireplace", desc: "Firewood is provided. Open the chimney valve before lighting. Add wood a maximum of two times per session — the fireplace gets very hot with more. Close the valve only when the fire is completely extinguished. Open the front door briefly during ignition to get fresh air flowing." },
  { icon: Droplets, title: "Outdoor Jacuzzi", desc: "Heated to 37.5°C year-round. Lights and bubbles controlled from switches on the jacuzzi. Maximum 5 people at a time. Swimwear required. Always close the cover after use to prevent freezing." },
  { icon: Snowflake, title: "Electric Sauna", desc: "The cabin has an electric sauna for your use. A perfect way to warm up after a day on the slopes." },
  { icon: WashingMachine, title: "Washer & Dryer", desc: "Washing machine and a drying cabinet for outdoor clothes. The drying cabinet works best at 40°C for about one hour. A drying rack is also available for regular laundry." },
  { icon: Thermometer, title: "Heating", desc: "The cabin uses geothermal heating as its base, complemented by an air heat pump controlled via remote. You can also adjust bedroom radiators individually." },
  { icon: Droplets, title: "Tap Water", desc: "Lapland tap water comes straight from the fells. It's exceptionally clean, cold and fresh — drink it straight from the tap." },
  { icon: Car, title: "Parking", desc: "Free parking in the cabin's yard with plenty of space for multiple vehicles." },
  { icon: Dog, title: "Pets Welcome", desc: "Pets are allowed at Bearlodge. Please keep the cabin clean and report any pet-related issues." },
  { icon: Baby, title: "Family Friendly", desc: "A crib and baby safety gates are available. Just let us know in advance if you need them set up." },
  { icon: ShieldCheck, title: "Safety", desc: "Equipped with fire extinguisher, fire blanket, smoke alarms and carbon monoxide detector. Fire extinguishers are in the hallway." },
];

const jacuzziSteps = [
  "Open the cover by first turning the piece on the cabin side over the steel pipe (the cover is cut in half), then lifting the steel pipe with the other hand to prop the cover up behind the pool.",
  "Use the switches on the jacuzzi to turn on lights and bubbles. The temperature is fixed at a comfortable 37.5°C.",
  "Rinse yourself in the shower with water only before entering. Soap residue causes foam and unhygienic conditions, requiring a full water change.",
  "Always close the cover when you're finished. Forgetting to close it overnight can cause the pool to freeze.",
];

const jacuzziRules = [
  "Maximum 5 people at the same time — more lowers the water level and risks freezing.",
  "Water level must reach the LED light line when no one is in the pool.",
  "If water spills over, use the hose in the technical room (next to the main door) to refill. Collect the hose immediately — it will freeze and break if left out.",
  "Swimwear is required at all times.",
  "Keep noise to a minimum when using the jacuzzi at night out of respect for neighbors.",
  "Freezing and breakage due to failure to maintain water level or close the cover is the guest's responsibility.",
];

const checkoutItems = [
  { title: "Linens", desc: "Leave beds unmade. Place used towels and dishcloths in the hallway." },
  { title: "Dishes", desc: "Rinse dishes and load the dishwasher. Please start the dishwasher before you leave." },
  { title: "Food", desc: "Empty the fridge of all open and perishable items. Unopened items and dry ingredients can stay." },
  { title: "Lights & Electronics", desc: "Make sure all lights, appliances and electronics are switched off." },
  { title: "Windows & Doors", desc: "Check that all windows and doors are properly closed and locked." },
  { title: "Checkout", desc: "Complete checkout according to the instructions posted in the lobby." },
];

const houseRules = [
  { icon: Cigarette, title: "No Smoking", desc: "No smoking or vaping inside the cabin. Please smoke outside and use the ashtray provided." },
  { icon: Volume2, title: "Noise & Quiet Time", desc: "Inside the cabin, the sound level is entirely up to you — the cabin is yours. If you use the outdoor jacuzzi at night, please keep noise to a minimum for the neighbors." },
  { icon: ShieldCheck, title: "Damage", desc: "Please report any damage or malfunction to us right away so we can repair or replace items quickly." },
  { icon: Phone, title: "Emergencies", desc: "In case of emergency, call 112 (Finnish emergency number). Fire extinguishers and a fire blanket are in the hallway. For non-urgent issues, reach us at +358 44 131 3131 or info@leville.net." },
];

const readNext = [
  { to: "/guide/travel-to-levi", label: "Complete Levi Travel Guide" },
  { to: "/guide/restaurants-and-services-in-levi", label: "Restaurants & Dining in Levi" },
  { to: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", label: "How to Get to Levi" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Bearlodge Guest Guide – Karhupirtti Log Cabin in Levi",
  description: META_DESC,
  author: { "@type": "Organization", name: "Leville.net" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/en` },
    { "@type": "ListItem", position: 2, name: "Accommodations", item: `${BASE}/en/accommodations` },
    { "@type": "ListItem", position: 3, name: "Bearlodge", item: `${BASE}/accommodations/bearlodge/guide` },
    { "@type": "ListItem", position: 4, name: "Guest Guide", item: `${BASE}/accommodations/bearlodge/guide` },
  ],
};

const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Bearlodge – Karhupirtti",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Levi Centre",
    addressLocality: "Kittilä",
    addressRegion: "Lapland",
    postalCode: "99130",
    addressCountry: "FI",
  },
  telephone: "+35844131313",
  url: `${BASE}/accommodations/bearlodge/guide`,
  numberOfRooms: 7,
  floorSize: { "@type": "QuantitativeValue", value: 220, unitCode: "MTK" },
  petsAllowed: true,
  amenityFeature: [
    "Outdoor Jacuzzi", "Wood Fireplace", "Electric Sauna", "Free WiFi",
    "Free Parking", "Full Kitchen", "Washing Machine", "Drying Cabinet",
    "Ski Storage", "BBQ Grill", "Crib", "Baby Safety Gates",
    "Carbon Monoxide Detector", "Smoke Alarm", "Fire Extinguisher",
  ].map(f => ({ "@type": "LocationFeatureSpecification", name: f, value: true })),
};

const BearlodgeGuide = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Bearlodge Guest Guide – Karhupirtti Log Cabin in Levi | Leville.net</title>
        <meta name="description" content={META_DESC} />
        <link rel="canonical" href={`${BASE}/accommodations/bearlodge/guide`} />
        <meta property="og:title" content="Bearlodge Guest Guide – Karhupirtti Log Cabin in Levi | Leville.net" />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${BASE}/accommodations/bearlodge/guide`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bearlodge Guest Guide – Karhupirtti Log Cabin in Levi | Leville.net" />
        <meta name="twitter:description" content={META_DESC} />
        <link rel="alternate" hrefLang="en" href={`${BASE}/accommodations/bearlodge/guide`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE}/accommodations/bearlodge/guide`} />
      </Helmet>

      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={lodgingSchema} />

      <Header />

      {/* Sticky jump-nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#2D2D2D" }}
      >
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 py-2 min-w-max">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors"
                style={{ color: "#F9F6F1" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(184,134,11,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="min-h-screen" style={{ color: "#2D2D2D" }}>
        {/* SECTION 1: Hero */}
        <section className="relative min-h-[70vh] flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${livingFireplace})` }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(30,25,20,0.85) 0%, rgba(30,25,20,0.4) 50%, rgba(30,25,20,0.15) 100%)"
          }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 pb-16 pt-32 w-full">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: "#B8860B" }}>
              Guest Guide
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#F9F6F1" }}>
              Welcome to Bearlodge – Karhupirtti
            </h1>
            <p className="text-base md:text-lg max-w-2xl mb-8 leading-relaxed" style={{ color: "rgba(249,246,241,0.85)" }}>
              Your complete guide to enjoying our spacious 220m² log cabin in the heart of Levi, Finnish Lapland.
              Built in 1989 and fully renovated in 2023, Bearlodge combines authentic Lappish log cabin charm with
              modern comfort for up to 14 guests.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/accommodations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:brightness-110"
                style={{ backgroundColor: "#B8860B", color: "#F9F6F1" }}
              >
                Book Bearlodge
                <ArrowRight size={16} />
              </Link>
              <a
                href="#" /* Replace with actual PDF URL */
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all hover:bg-white/10"
                style={{ borderColor: "#F9F6F1", color: "#F9F6F1" }}
              >
                <Download size={16} />
                Download PDF Guide
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: Quick Info Bar */}
        <section style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {quickFacts.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5">
                  <f.icon size={22} style={{ color: "#B8860B" }} />
                  <span className="text-xs font-medium leading-tight" style={{ color: "#2D2D2D" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: About The Lodge */}
        <section id="about" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "#2D2D2D" }}>
              About the Lodge
            </h2>

            <div className="grid md:grid-cols-2 gap-10 mb-12">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={livingFireplace}
                  alt="Bearlodge living room with fireplace"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#444" }}>
                <p>
                  Bearlodge (Karhupirtti) is a spacious 220m² log cabin located in the front slope area of
                  Levi ski resort — one of the few, if not the only, log cabin of this size with such a central location.
                </p>
                <p>
                  The cabin was built in 1989 and was originally in private use. In the early days, you could ski
                  directly from the cabin's yard down to the front slope — there were no buildings in between. The area
                  has grown since then, but Bearlodge still enjoys an unbeatable location just steps from the slopes.
                </p>
                <p>
                  In summer 2023, we completed a full renovation — new kitchen, modern bathrooms, updated furnishings
                  and a stylish interior, all while preserving the authentic log cabin character.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { title: "Downstairs", text: "3 en-suite bedrooms, each with their own shower. Spacious living area with fireplace, fully equipped kitchen, and dining for up to 14." },
                { title: "Upstairs", text: "4 bedrooms with connecting doors and a shared toilet. Perfect for families or groups who want their own wing." },
                { title: "Extras", text: "Utility/laundry room, ski storage and maintenance room, outdoor BBQ area, and a private outdoor jacuzzi." },
              ].map((card, i) => (
                <div key={i} className="rounded-xl p-6 border" style={{ backgroundColor: "#F9F6F1", borderColor: "rgba(184,134,11,0.2)" }}>
                  <h4 className="font-semibold mb-2" style={{ color: "#B8860B" }}>{card.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{card.text}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4" style={{ color: "#2D2D2D" }}>Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ backgroundColor: "#F9F6F1" }}>
                  <h.icon size={20} style={{ color: "#B8860B" }} />
                  <span className="text-sm font-medium" style={{ color: "#2D2D2D" }}>{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Check-in & Check-out */}
        <section id="check-in" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "#2D2D2D" }}>
              Arrival & Check-in
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl p-8 bg-white shadow-sm border" style={{ borderColor: "rgba(184,134,11,0.15)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} style={{ color: "#B8860B" }} />
                  <span className="text-xs tracking-[0.2em] uppercase font-bold" style={{ color: "#B8860B" }}>Check-in</span>
                </div>
                <p className="text-3xl font-bold mb-3" style={{ color: "#2D2D2D" }}>From 5:00 PM</p>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                  We prepare the cabin so that everything is ready for your arrival from 5:00 PM onwards.
                  You can arrive anytime during the evening. You will receive the door lock code via text
                  message on the day of arrival.
                </p>
              </div>

              <div className="rounded-2xl p-8 bg-white shadow-sm border" style={{ borderColor: "rgba(184,134,11,0.15)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} style={{ color: "#B8860B" }} />
                  <span className="text-xs tracking-[0.2em] uppercase font-bold" style={{ color: "#B8860B" }}>Check-out</span>
                </div>
                <p className="text-3xl font-bold mb-3" style={{ color: "#2D2D2D" }}>By 11:00 AM</p>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                  Please follow the checkout checklist posted in the lobby. We keep it simple — just a few
                  things to help us prepare for the next guests.
                </p>
              </div>
            </div>

            <div className="rounded-xl p-5 flex items-start gap-3 mb-6" style={{ backgroundColor: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)" }}>
              <ShieldCheck size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                No need to pick up keys — we use a smart lock system. Your personal code arrives by SMS on your arrival day.
              </p>
            </div>

            <div className="rounded-xl p-5 flex items-start gap-3" style={{ backgroundColor: "rgba(184,134,11,0.04)", border: "1px solid rgba(184,134,11,0.12)" }}>
              <Mountain size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                Bearlodge is located right in Levi centre. It's a 3-minute walk to the supermarket, souvenir shops,
                restaurants, front slopes, and kids' land. You can easily walk everywhere in the centre and to the
                pickup points for safari activities. The closest snowmobile track is approximately 150 metres away.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: The Kitchen */}
        <section id="kitchen" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#2D2D2D" }}>The Kitchen</h2>
            <p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: "#444" }}>
              The kitchen has everything you need to cook full meals for your group — from a quick breakfast to a feast for 14.
              You'll find basic spices, and often coffee, tea, cocoa and other dry ingredients left by previous guests.
              Feel free to use everything in the kitchen. If you have leftover dry ingredients when you leave, you're welcome
              to leave them in the cupboard for the next guests.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <UtensilsCrossed size={20} style={{ color: "#B8860B" }} />
                  <h3 className="text-lg font-semibold" style={{ color: "#2D2D2D" }}>Appliances & Cookware</h3>
                </div>
                <ul className="space-y-2.5">
                  {kitchenItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: "#B8860B" }} />
                      <span className="text-sm" style={{ color: "#444" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={kitchenPhoto}
                  alt="Bearlodge fully equipped kitchen"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Amenities & Equipment */}
        <section id="amenities" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "#2D2D2D" }}>Amenities & Equipment</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {amenities.map((a, i) => (
                <div key={i} className="rounded-xl p-6 bg-white border shadow-sm" style={{ borderColor: "rgba(184,134,11,0.12)" }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <a.icon size={20} style={{ color: "#B8860B" }} />
                    <h3 className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{a.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Jacuzzi Instructions */}
        <section id="jacuzzi" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#2D2D2D" }}>Jacuzzi – How to Use</h2>
            <p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: "#444" }}>
              The outdoor jacuzzi is one of the highlights of Bearlodge. Here's everything you need to know to enjoy it safely.
            </p>

            <div className="space-y-4 mb-10">
              {jacuzziSteps.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: "#B8860B", color: "#F9F6F1" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed pt-1" style={{ color: "#444" }}>{step}</p>
                </div>
              ))}
            </div>

            {/* Warning card */}
            <div className="rounded-xl p-6 border-2" style={{ borderColor: "#B8860B", backgroundColor: "rgba(184,134,11,0.05)" }}>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} style={{ color: "#B8860B" }} />
                <h3 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#B8860B" }}>Important Rules</h3>
              </div>
              <ul className="space-y-2.5">
                {jacuzziRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#B8860B" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#444" }}>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: House Rules */}
        <section id="rules" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "#2D2D2D" }}>House Rules</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {houseRules.map((r, i) => (
                <div key={i} className="rounded-xl p-6 bg-white border shadow-sm" style={{ borderColor: "rgba(184,134,11,0.12)" }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <r.icon size={20} style={{ color: "#B8860B" }} />
                    <h3 className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{r.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Checkout Checklist */}
        <section id="checkout" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#2D2D2D" }}>Before You Go – Checkout Checklist</h2>
            <p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: "#444" }}>
              To help us prepare for the next guests, we appreciate your help with these simple things before you leave by 11:00 AM.
            </p>

            <div className="space-y-4 max-w-2xl">
              {checkoutItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                  <div>
                    <span className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{item.title}: </span>
                    <span className="text-sm" style={{ color: "#444" }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: Contact & CTA */}
        <section id="contact" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#2D2D2D" }}>Need Anything During Your Stay?</h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
              <a href="tel:+358441313131" className="flex items-center gap-2 text-base font-medium hover:underline" style={{ color: "#2D2D2D" }}>
                <Phone size={18} style={{ color: "#B8860B" }} />
                +358 44 131 3131
              </a>
              <a href="mailto:info@leville.net" className="flex items-center gap-2 text-base font-medium hover:underline" style={{ color: "#2D2D2D" }}>
                <Mail size={18} style={{ color: "#B8860B" }} />
                info@leville.net
              </a>
            </div>

            <p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#555" }}>
              Whether it's a maintenance issue, a question about the area, or you've run out of toilet paper or soap — just send us a message and we'll take care of it.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link
                to="/en/accommodations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:brightness-110"
                style={{ backgroundColor: "#B8860B", color: "#F9F6F1" }}
              >
                Browse All Our Accommodations
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/guide/travel-to-levi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-colors hover:bg-black/5"
                style={{ borderColor: "#2D2D2D", color: "#2D2D2D" }}
              >
                Explore Levi Travel Guide
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Read Next */}
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-5" style={{ color: "#2D2D2D" }}>Read Next</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {readNext.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    className="rounded-xl p-5 bg-white border shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-shadow group"
                    style={{ borderColor: "rgba(184,134,11,0.12)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "#2D2D2D" }}>{item.label}</span>
                    <ArrowRight size={16} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: "#B8860B" }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="py-4" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="border-t" style={{ borderColor: "rgba(184,134,11,0.15)" }} />
          </div>
        </div>
      </main>

      <Footer lang="en" />
    </>
  );
};

export default BearlodgeGuide;
