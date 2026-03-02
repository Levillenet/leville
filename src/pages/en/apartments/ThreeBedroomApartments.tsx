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

const threeBedroomProperties = properties.filter(p => ["glacier-a2", "glacier-b3", "glacier-b4"].includes(p.id));

const faqs = [
  {
    q: "Are the Glacier apartments close to the slopes?",
    a: "Yes – the Glacier building is right at the foot of the front slope. You reach the newest chairlift in a few steps. The ski track is tens of meters from the door. It's one of the closest accommodation options to the slopes in Levi.",
  },
  {
    q: "What's the layout of the 3-bedroom apartments?",
    a: (<>{linkProp("Glacier A2", "glacier-a2")} (67 m²) has 3 separate bedrooms with 5 beds plus a sofa bed, spread across street level and basement level. Full-width balcony. {linkProp("B3", "glacier-b3")} and {linkProp("B4", "glacier-b4")} (87 m², penthouses) have 3 bedrooms plus 2 beds in open alcoves on the upper level, with balconies on both floors.</>),
  },
  {
    q: "Is there a children's playroom?",
    a: "Yes. The Glacier building has a shared playroom with air hockey and other activities.",
  },
];

const relatedLinks = [
  { label: "2-bedroom apartments", href: "/en/apartments/2-bedroom" },
  { label: "Penthouse apartments", href: "/en/apartments/penthouse" },
  { label: "Apartments for 6 guests", href: "/en/apartments/for-6" },
  { label: "Apartments for 8 guests", href: "/en/apartments/for-8" },
  { label: "All apartments", href: "/en/apartments" },
];

const ThreeBedroomApartments = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "3-Bedroom Apartments", href: "/en/apartments/3-bedroom" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "3-Bedroom Apartments in Levi – Space for the Whole Family",
    description: "3 three-bedroom apartments in Levi's Glacier building at the foot of the front slope. 67–87 m², up to 8 guests.",
    url: `${BASE}/en/apartments/3-bedroom`,
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
        title="3-Bedroom Apartments in Levi – Space for the Whole Family | Leville.net"
        description="3 three-bedroom apartments in Levi's Glacier building at the foot of the front slope. 67–87 m², up to 8 guests. Book directly."
        canonicalUrl={`${BASE}/en/apartments/3-bedroom`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/3-bedroom" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/3-bedroom` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">3-Bedroom Apartments in Levi</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              Three bedrooms solve the most common problem in family travel: who sleeps where. Parents get their room, kids get theirs, and the third bedroom is for grandparents, the teenager who wants privacy, or the extra couple who joined the trip.
            </p>
            <p>
              Our 3-bedroom apartments are all in the Glacier building – traditional alpine apartments right at the foot of Levi's front slope, built in 2000. The newest chairlift is steps away, and the ski track is just tens of meters from the door.
            </p>
            <p>
              {linkProp("Glacier A2", "glacier-a2")} is the standard 3-bedroom at 67 m², sleeping 6 guests across two levels with a full-width balcony. The Glacier penthouses {linkProp("B3", "glacier-b3")} and {linkProp("B4", "glacier-b4")} (87 m²) have 3 bedrooms plus 2 beds in open alcoves on the upper level, with balconies on both floors – the upper one faces the front slope. All have access to the building's children's playroom with air hockey. Pets allowed in all.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our 3-Bedroom Apartments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {threeBedroomProperties.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Quick Comparison</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Best value:</strong> {linkProp("Glacier A2", "glacier-a2")} at 67 m² – 3 separate bedrooms at the most affordable size.</p>
            <p><strong className="text-foreground">Top-floor experience:</strong> Glacier Penthouses {linkProp("B3", "glacier-b3")} or {linkProp("B4", "glacier-b4")} at 87 m² with dual balconies.</p>
            <p><strong className="text-foreground">Most beds:</strong> {linkProp("B3", "glacier-b3")} and {linkProp("B4", "glacier-b4")} with 8 bed places each (3 bedrooms + alcoves) vs {linkProp("A2", "glacier-a2")}'s 5+1.</p>
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

export default ThreeBedroomApartments;
