import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Clock, Phone, Mail, Wifi, Flame, Droplets, Car, ShieldCheck,
  ChefHat, WashingMachine, Thermometer, Download, ArrowRight,
  Home, Users, Bath, Mountain, CheckCircle2, AlertTriangle,
  Volume2, Cigarette, Dog, Ruler, BedDouble, Baby,
  UtensilsCrossed, Snowflake
} from "lucide-react";
import livingFireplace from "@/assets/bearlodge/living-fireplace.jpg";

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
        <meta name="description" content="Everything you need to know about your stay at Bearlodge (Karhupirtti), a 220m² luxury log cabin with 7 bedrooms, outdoor jacuzzi and sauna in Levi, Finnish Lapland. Check-in info, amenities, house rules and more." />
        <link rel="canonical" href="https://www.leville.net/accommodations/bearlodge/guide" />
        <meta property="og:title" content="Bearlodge Guest Guide – Karhupirtti Log Cabin in Levi | Leville.net" />
        <meta property="og:description" content="Everything you need to know about your stay at Bearlodge (Karhupirtti), a 220m² luxury log cabin with 7 bedrooms, outdoor jacuzzi and sauna in Levi, Finnish Lapland. Check-in info, amenities, house rules and more." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.leville.net/accommodations/bearlodge/guide" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bearlodge Guest Guide – Karhupirtti Log Cabin in Levi | Leville.net" />
        <meta name="twitter:description" content="Everything you need to know about your stay at Bearlodge (Karhupirtti), a 220m² luxury log cabin with 7 bedrooms, outdoor jacuzzi and sauna in Levi, Finnish Lapland. Check-in info, amenities, house rules and more." />
      </Helmet>

      <Header lang="en" />

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
              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={livingFireplace}
                  alt="Bearlodge living room with fireplace"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text */}
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

            {/* Layout info cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                {
                  title: "Downstairs",
                  text: "3 en-suite bedrooms, each with their own shower. Spacious living area with fireplace, fully equipped kitchen, and dining for up to 14."
                },
                {
                  title: "Upstairs",
                  text: "4 bedrooms with connecting doors and a shared toilet. Perfect for families or groups who want their own wing."
                },
                {
                  title: "Extras",
                  text: "Utility/laundry room, ski storage and maintenance room, outdoor BBQ area, and a private outdoor jacuzzi."
                }
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 border"
                  style={{ backgroundColor: "#F9F6F1", borderColor: "rgba(184,134,11,0.2)" }}
                >
                  <h4 className="font-semibold mb-2" style={{ color: "#B8860B" }}>{card.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{card.text}</p>
                </div>
              ))}
            </div>

            {/* Highlights grid */}
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#2D2D2D" }}>Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl p-4"
                  style={{ backgroundColor: "#F9F6F1" }}
                >
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
              {/* Check-in card */}
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

              {/* Check-out card */}
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

            {/* Smart lock note */}
            <div
              className="rounded-xl p-5 flex items-start gap-3 mb-6"
              style={{ backgroundColor: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)" }}
            >
              <ShieldCheck size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                No need to pick up keys — we use a smart lock system. Your personal code arrives by SMS on your arrival day.
              </p>
            </div>

            {/* Location note */}
            <div
              className="rounded-xl p-5 flex items-start gap-3"
              style={{ backgroundColor: "rgba(184,134,11,0.04)", border: "1px solid rgba(184,134,11,0.12)" }}
            >
              <Mountain size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                Bearlodge is located right in Levi centre. It's a 3-minute walk to the supermarket, souvenir shops, 
                restaurants, front slopes, and kids' land. You can easily walk everywhere in the centre and to the 
                pickup points for safari activities. The closest snowmobile track is approximately 150 metres away.
              </p>
            </div>
          </div>
        </section>

        {/* Spacer/divider before footer — more sections coming in follow-up prompts */}
        <div className="py-8" style={{ backgroundColor: "#F9F6F1" }}>
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
