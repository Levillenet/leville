import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import HreflangTags from "@/components/HreflangTags";
import PropertyCard from "@/components/PropertyCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { properties } from "@/data/properties";

const BASE = "https://leville.net";

const linkProp = (label: string, id: string) => {
  const p = properties.find(pr => pr.id === id);
  if (!p) return label;
  return <a href={p.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">{label}</a>;
};

const hiihtajankuja = properties.filter(p => ["5a2", "5b2"].includes(p.id));
const superior = properties.filter(p => ["211", "212"].includes(p.id));
const glacier = properties.filter(p => ["glacier-a2", "glacier-a4", "glacier-a6"].includes(p.id));

const faqs = [
  {
    q: "What's the difference between the Hiihtäjänkuja and Glacier apartments?",
    a: (<>Hiihtäjänkuja apartments ({linkProp("5A2", "5a2")}, {linkProp("5B2", "5b2")}) are alpine apartments near the front slopes with fireplaces and drying rooms. Glacier apartments are traditional alpine-style, built in 2000, right at the foot of the front slope with the chairlift steps away. Both areas are close to slopes. Hiihtäjänkuja apartments have fireplaces; Glacier apartments have a children's playroom.</>),
  },
  {
    q: "Which apartments for 6 have been recently renovated?",
    a: (<>{linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")} were both fully renovated in 2024 – renewed bathrooms, new surfaces, and heat-storing fireplaces installed. The Superior Suites have modern interiors. Glacier apartments have been maintained and updated over the years since 2000.</>),
  },
  {
    q: "Do the 6-person apartments have a dishwasher?",
    a: "Yes, all our 6-person apartments have a dishwasher – the Hiihtäjänkuja apartments, Superior Suites, and Glacier apartments alike.",
  },
  {
    q: "Which apartments have a fireplace?",
    a: (<>{linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")} both have a heat-storing fireplace (varaava takka) – firewood included. The Superior Suites and Glacier apartments do not have fireplaces.</>),
  },
];

const relatedLinks = [
  { label: "Apartments for 8+ guests", href: "/en/apartments/for-8" },
  { label: "Apartments for 4 guests", href: "/en/apartments/for-4" },
  { label: "Penthouse apartments", href: "/en/apartments/penthouse" },
  { label: "All apartments", href: "/en/apartments" },
];

const ApartmentsFor6 = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "Apartments for 6", href: "/en/apartments/for-6" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Apartments for 6 in Levi – Family & Group Holidays",
    description: "8 apartments for 6 guests in Levi. Center, front slope, and Glacier locations. 2–3 bedrooms, 54–72 m².",
    url: `${BASE}/en/apartments/for-6`,
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
        title="Apartments for 6 in Levi – Family & Group Holidays | Leville.net"
        description="8 apartments for 6 guests in Levi. Center, front slope, and Glacier locations. 2–3 bedrooms, 54–72 m². Fireplaces, saunas. Book directly."
        canonicalUrl={`${BASE}/en/apartments/for-6`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/for-6" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/for-6` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Apartments for 6 Guests in Levi</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              Six is the most common group size we see in Levi. Two families traveling together. Three couples on a ski trip. A family of four with grandparents. You have three areas to choose from:
            </p>
            <p>
              <strong className="text-foreground">Hiihtäjänkuja apartments</strong> ({linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")}) are 65 m² alpine apartments near the front slopes and Zero Point. Both were fully renovated in 2024 with heat-storing fireplaces, renewed bathrooms, and air source heat pumps. {linkProp("5B2", "5b2")} also has a downstairs living room with PlayStation and a 150 cm sofa bed. Both have private sauna and drying room. Pets allowed.
            </p>
            <p>
              <strong className="text-foreground">Center Superior Suites</strong> ({linkProp("211", "211")} and {linkProp("212", "212")}) are in the Skistar building in Levi center, within walking distance of restaurants, shops, and the slopes. At 54 m² they're the most compact option for 6, but well-located. Both have sauna and balcony. {linkProp("Suite 211", "211")} is an end apartment with forest views. Pets not allowed.
            </p>
            <p>
              <strong className="text-foreground">Glacier apartments</strong> ({linkProp("A2", "glacier-a2")}, {linkProp("A4", "glacier-a4")}, {linkProp("A6", "glacier-a6")}) are traditional alpine apartments built in 2000, right at the foot of the front slope. The newest chairlift is steps away. They range from 67–72 m² with 2–3 bedrooms. {linkProp("Glacier A4", "glacier-a4")} and {linkProp("A6", "glacier-a6")} (72 m²) have an interesting layout with 2 bedrooms plus 2 beds in open alcoves upstairs and a balcony facing the Hullu Poro arena. The Glacier building has a children's playroom with air hockey. Pets allowed.
            </p>
          </div>
        </section>

        {/* Grouped Cards */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Apartments for 6 Guests</h2>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Hiihtäjänkuja (Near Front Slope)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {hiihtajankuja.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Levi Center (Skistar)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {superior.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Glacier (At the Foot of the Front Slope)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {glacier.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Quick Comparison</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Most recently renovated:</strong> {linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")} – both fully renovated in 2024 with new bathrooms and heat-storing fireplaces.</p>
            <p><strong className="text-foreground">Most space:</strong> {linkProp("Glacier A4", "glacier-a4")} or {linkProp("A6", "glacier-a6")} at 72 m².</p>
            <p><strong className="text-foreground">Best location for restaurants and nightlife:</strong> {linkProp("Superior Suites 211", "211")}/{linkProp("212", "212")} in the Skistar building.</p>
            <p><strong className="text-foreground">Best for families with kids:</strong> {linkProp("Glacier A2", "glacier-a2")} – 3 bedrooms so everyone gets their own space, plus children's playroom in the building.</p>
            <p><strong className="text-foreground">Heat-storing fireplace:</strong> {linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")} – both have varaava takka (heat-storing fireplace) that keeps the apartment warm for hours.</p>
            <p><strong className="text-foreground">Pet-friendly:</strong> {linkProp("5A2", "5a2")}, {linkProp("5B2", "5b2")}, and all Glacier apartments allow pets. Superior suites do not.</p>
          </div>
        </section>

        {/* FAQ */}
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

        {/* Related Links */}
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

export default ApartmentsFor6;
