import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import HreflangTags from "@/components/HreflangTags";
import PropertyCard from "@/components/PropertyCard";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { properties, getPropertiesByLocation } from "@/data/properties";

const BASE = "https://leville.net";

const linkProp = (label: string, id: string) => {
  const p = properties.find(pr => pr.id === id);
  if (!p) return label;
  return <a href={p.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">{label}</a>;
};

const centerProperties = getPropertiesByLocation("Levi Center");
const studios = centerProperties.filter(p => p.type === "studio");
const oneBedr = centerProperties.filter(p => p.type === "1-bedroom");
const twoBedr = centerProperties.filter(p => ["211", "212", "karhunvartija3"].includes(p.id));
const lodge = centerProperties.filter(p => p.id === "karhupirtti");

const distances = [
  { label: "Ski slopes and gondola", value: "3–5 min walk" },
  { label: "K-Market grocery store", value: "2–3 min walk" },
  { label: "Alko (state liquor store)", value: "2–3 min walk" },
  { label: "Ski rental shops", value: "3 min walk" },
  { label: "Restaurants (Hullu Poro Arena, Colorado, etc.)", value: "2–5 min walk" },
  { label: "Levin Spa water park", value: "1–3 min walk" },
  { label: "Snowmobile track", value: "~150m from Bear Lodge" },
];

const faqs = [
  {
    q: "Is Levi center noisy at night?",
    a: "Levi is a small resort town. There's some activity around bars on weekends, but our apartments are in residential areas with excellent sound insulation (Finnish building standards require it).",
  },
  {
    q: "Can I park near the center apartments?",
    a: (<>Yes. All apartments include a free parking space. Most have engine block heater plugs. {linkProp("Bear Lodge", "karhupirtti")} has multiple spots in its own yard. {linkProp("Karhunvartija 3", "karhunvartija3")} has parking right at the private entrance.</>),
  },
  {
    q: "Is Levi center flat for elderly visitors or strollers?",
    a: (<>The center is at the base of the fell – walking areas are mostly level. Several apartments are accessible without stairs: {linkProp("Studio 102", "102")}, {linkProp("104", "104")}, {linkProp("Superior 209", "209")}/{linkProp("210", "210")}, and {linkProp("Karhunvartija 3", "karhunvartija3")}. Paths are maintained in winter but can be icy – bring proper winter shoes.</>),
  },
  {
    q: "What's within walking distance?",
    a: (<>From any center apartment: grocery store, restaurants, ski rental, the gondola, Levin Spa, souvenir shops, and Alko. {linkProp("Moonlight 415", "moonlight-415")} is next to Hullu Poro hotel and 150m from the store. {linkProp("Bear Lodge", "karhupirtti")} is 3 minutes' walk to most services.</>),
  },
];

const relatedLinks = [
  { label: "Glacier apartments (at the foot of the slope)", href: "/en/apartments/for-8" },
  { label: "Restaurants in Levi", href: "/guide/restaurants-and-services-in-levi" },
  { label: "All apartments", href: "/en/apartments" },
  { label: "Book accommodation", href: "/en/accommodations" },
];

const LeviCenterApartments = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "Levi Center", href: "/en/apartments/levi-center" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Apartments in Levi Center – Walk to Everything",
    description: "All our Levi center apartments: studios, 1–2 bedroom suites, and a 220 m² log cabin.",
    url: `${BASE}/en/apartments/levi-center`,
    publisher: { "@type": "Organization", name: "Leville.net", url: BASE },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: typeof f.a === "string" ? f.a : f.q },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Apartments in Levi Center – Walk to Everything | Leville.net"
        description="All our Levi center apartments: studios, 1–2 bedroom suites, and a 220 m² log cabin. Walk to slopes, restaurants, and shops. Book directly."
        canonicalUrl={`${BASE}/en/apartments/levi-center`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/levi-center" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/levi-center` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Apartments in Levi Center</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              When we say "Levi center," we mean the compact area where everything is within walking distance. K-Market grocery store, Alko, ski rental, restaurants, and the Levin Spa water park – all a few minutes on foot. Our apartments are spread across several streets in this area: Postintie (Skistar studios and Superiors), Hiihtäjänkuja ({linkProp("Platinum A2", "platinum-a2")}, alpine apartments), and Ratsastajankuja ({linkProp("Karhunvartija", "karhunvartija3")}).
            </p>
            <p>
              Our center apartments cover every group size. Solo travelers and couples can choose from studios (24–37 m²). Small families fit comfortably in 1-bedroom apartments (43–44 m²). Groups of up to 6 have 2-bedroom suites (42–54 m²). And {linkProp("Bear Lodge", "karhupirtti")} sleeps 14 in a 220 m² log cabin with a fireplace and outdoor hot tub.
            </p>
            <p>
              What you should know: Levi center is small. Even the farthest center apartment is under 10 minutes from the gondola. The Skistar building is next to the Levin Spa water park – handy for rest days with children.
            </p>
            <p>
              Several center apartments are accessible without stairs: {linkProp("Studios 102", "102")} and {linkProp("104", "104")}, {linkProp("Superior 209", "209")} and {linkProp("210", "210")}, and {linkProp("Karhunvartija 3", "karhunvartija3")} are all step-free or single-step access. This is practical for guests with mobility needs or families with strollers.
            </p>
            <p>
              Center apartments are our most popular category and book out first during peak weeks (Christmas, February weeks 8–9, Easter). Book early for those dates.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Levi Center Apartments</h2>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Studios (1–4 guests)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {studios.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">1-Bedroom Apartments (1–4 guests)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {oneBedr.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">2-Bedroom Apartments (1–6 guests)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {twoBedr.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Bear Lodge (1–14 guests)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {lodge.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>

        {/* Walking Distances */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Walking Distances from Levi Center</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {distances.map(d => (
              <div key={d.label} className="flex items-start gap-3 rounded-lg border border-border/60 p-4">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{d.label}</p>
                  <p className="text-sm text-muted-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl space-y-6">
            {faqs.map(faq => (
              <div key={faq.q} className="space-y-2">
                <h3 className="font-semibold text-lg">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedLinks.map(link => (
              <Link key={link.href} to={link.href} className="group flex items-center gap-2 rounded-lg border border-border/60 p-4 hover:border-primary/40 hover:bg-secondary/40 transition-all">
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{link.label}</span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
};

export default LeviCenterApartments;
