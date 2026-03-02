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
const center = properties.filter(p => ["211", "212", "karhunvartija3"].includes(p.id));
const glacier = properties.filter(p => ["glacier-a4", "glacier-a6"].includes(p.id));

const faqs = [
  {
    q: "What are the bed arrangements?",
    a: (<>It varies. {linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")}: each bedroom has 2 separate beds, plus sofa bed downstairs. {linkProp("Superior 211", "211")}/{linkProp("212", "212")}: 2 bedrooms with beds + sofa bed in living room. {linkProp("Karhunvartija 3", "karhunvartija3")}: one bedroom with bed, second bedroom with sofa bed for two. {linkProp("Glacier A4", "glacier-a4")}/{linkProp("A6", "glacier-a6")}: 2 bedrooms plus 2 beds in open alcoves upstairs.</>),
  },
  {
    q: "Which has been most recently renovated?",
    a: (<>{linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")} were both fully renovated in 2024 – new bathrooms, surfaces, and heat-storing fireplaces. {linkProp("Platinum A2", "platinum-a2")} (a studio, not 2-bedroom) opened 2023 as new build.</>),
  },
  {
    q: "Which have a fireplace?",
    a: (<>{linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")} both have a heat-storing fireplace (varaava takka) with firewood included. {linkProp("Karhunvartija 3", "karhunvartija3")} has a natural stone fireplace with firewood included. Superior Suites and Glacier don't have fireplaces.</>),
  },
];

const relatedLinks = [
  { label: "3-bedroom apartments", href: "/en/apartments/3-bedroom" },
  { label: "Apartments for 4 guests", href: "/en/apartments/for-4" },
  { label: "Apartments for 6 guests", href: "/en/apartments/for-6" },
  { label: "All apartments", href: "/en/apartments" },
];

const TwoBedroomApartments = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "2-Bedroom Apartments", href: "/en/apartments/2-bedroom" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "2-Bedroom Apartments in Levi – Family Ski Holidays",
    description: "7 two-bedroom apartments in Levi. 42–72 m² across center, front slope, and Glacier.",
    url: `${BASE}/en/apartments/2-bedroom`,
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
        title="2-Bedroom Apartments in Levi – Family Ski Holidays | Leville.net"
        description="7 two-bedroom apartments in Levi. 42–72 m² across center, front slope, and Glacier. Saunas, fireplaces, pet-friendly options. Book directly."
        canonicalUrl={`${BASE}/en/apartments/2-bedroom`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/2-bedroom" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/2-bedroom` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">2-Bedroom Apartments in Levi</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              Two bedrooms is our most popular apartment size – and for good reason. A proper bedroom for the adults, a second room for the kids or the other couple, and a shared living area. It works for the largest number of travel groups.
            </p>
            <p>
              Our 2-bedroom apartments range from the compact 42 m² {linkProp("Karhunvartija 3", "karhunvartija3")} to spacious 72 m² Glacier units. What they share: two separate sleeping spaces with doors, a living area, full kitchen, and bathroom with sauna.
            </p>
            <p>
              The location choice matters. <strong className="text-foreground">Hiihtäjänkuja apartments</strong> ({linkProp("5A2", "5a2")}, {linkProp("5B2", "5b2")}) are 65 m² alpine apartments near the front slopes with heat-storing fireplaces and drying rooms – both fully renovated in 2024. <strong className="text-foreground">Center Superior Suites</strong> ({linkProp("211", "211")}, {linkProp("212", "212")}) are in the Skistar building in Levi center, within walking distance of restaurants and shops. {linkProp("Karhunvartija 3", "karhunvartija3")} has a natural stone fireplace, enclosed yard, and its own entrance. {linkProp("Glacier A4", "glacier-a4")} and {linkProp("A6", "glacier-a6")} (72 m²) are right at the foot of the front slope, with 2 bedrooms plus 2 alcove beds on the upper level.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our 2-Bedroom Apartments</h2>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Hiihtäjänkuja (Near Front Slope)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {hiihtajankuja.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Levi Center</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {center.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Glacier (At the Foot of the Front Slope)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {glacier.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Quick Comparison</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Most recently renovated:</strong> {linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")} – both fully renovated in 2024.</p>
            <p><strong className="text-foreground">Best for 4 guests:</strong> {linkProp("Karhunvartija 3", "karhunvartija3")} – compact, fireplace, private yard, firewood included.</p>
            <p><strong className="text-foreground">Most space for 6 guests:</strong> {linkProp("Glacier A4", "glacier-a4")} or {linkProp("A6", "glacier-a6")} at 72 m².</p>
            <p><strong className="text-foreground">Best for restaurants and nightlife:</strong> {linkProp("Superior Suites 211", "211")}/{linkProp("212", "212")} in the Skistar building.</p>
            <p><strong className="text-foreground">Heat-storing fireplace:</strong> {linkProp("5A2", "5a2")} and {linkProp("5B2", "5b2")} (varaava takka, firewood included), {linkProp("Karhunvartija 3", "karhunvartija3")} (natural stone fireplace, firewood included).</p>
            <p><strong className="text-foreground">Pet-friendly:</strong> {linkProp("5A2", "5a2")}, {linkProp("5B2", "5b2")}, {linkProp("Karhunvartija 3", "karhunvartija3")}, {linkProp("Glacier A4", "glacier-a4")}, {linkProp("A6", "glacier-a6")} all allow pets. Superior Suites do not.</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Related Pages</h2>
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

export default TwoBedroomApartments;
