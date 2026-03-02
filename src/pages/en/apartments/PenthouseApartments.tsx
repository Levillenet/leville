import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import HreflangTags from "@/components/HreflangTags";
import PropertyCard from "@/components/PropertyCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { properties, getPropertiesByTag } from "@/data/properties";

const BASE = "https://leville.net";

const linkProp = (label: string, id: string) => {
  const p = properties.find(pr => pr.id === id);
  if (!p) return label;
  return <a href={p.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">{label}</a>;
};

const penthouses = getPropertiesByTag("penthouse");
const frontSlope = penthouses.filter(p => p.id === "5b5");
const glacierPenthouses = penthouses.filter(p => p.id.startsWith("glacier-"));

const faqs = [
  {
    q: "What makes a penthouse different from a regular apartment in Levi?",
    a: (<>A penthouse is a top-floor (second floor) apartment with extra features. The {linkProp("Front Slope penthouse", "5b5")} has 3 balconies, slope-view sauna, and a fireplace. Glacier penthouses have balconies on two levels with the upper one facing the front slope, plus varied room layouts with bedroom alcoves upstairs.</>),
  },
  {
    q: "Are penthouses suitable for celebrations?",
    a: (<>{linkProp("5B5", "5b5")} has a 10-person dining table, fireplace, and 100 m² of space – popular for birthdays and New Year's Eve. For very large celebrations, {linkProp("Bear Lodge", "karhupirtti")} offers 220 m² with an outdoor hot tub and private yard.</>),
  },
];

const relatedLinks = [
  { label: "Apartments for 8 guests", href: "/en/apartments/for-8" },
  { label: "Large group accommodation", href: "/en/apartments/large-group" },
  { label: "All apartments", href: "/en/apartments" },
  { label: "Northern Lights in Levi", href: "/en/northern-lights" },
  { label: "Restaurants in Levi", href: "/guide/restaurants-and-services-in-levi" },
];

const PenthouseApartments = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "Penthouse Apartments", href: "/en/apartments/penthouse" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Penthouse Apartments in Levi – Top-Floor Stays with Views",
    description: "4 penthouse apartments in Levi. 84–100 m², 3–4 bedrooms. Front slope and Glacier locations with balconies and slope views.",
    url: `${BASE}/en/apartments/penthouse`,
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
        title="Penthouse Apartments in Levi – Top-Floor Stays with Views | Leville.net"
        description="4 penthouse apartments in Levi. 84–100 m², 3–4 bedrooms. Front slope and Glacier locations with balconies and slope views. Book directly."
        canonicalUrl={`${BASE}/en/apartments/penthouse`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/penthouse" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/penthouse` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Penthouse Apartments in Levi</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              A penthouse in Levi is a top-floor apartment with extra features: balconies on multiple levels, better views over the fells, and in some cases unique layouts with bedroom alcoves on the upper level.
            </p>
            <p>
              We have four penthouses in two locations:
            </p>
            <p>
              The <strong className="text-foreground">{linkProp("Front Slope Penthouse 5B5", "5b5")}</strong> is the largest at 100 m² with 4 bedrooms, 3 balconies (including ones overlooking the front slope), a heat-storing fireplace, and a sauna with a window where you can watch the slope lighting in the evening. A 10-person dining table seats the whole group. Renovated 2021. Pets allowed.
            </p>
            <p>
              The <strong className="text-foreground">Glacier Penthouses</strong> ({linkProp("A5", "glacier-a5")}, {linkProp("B3", "glacier-b3")}, {linkProp("B4", "glacier-b4")}) are in the Glacier building, right at the foot of the front slope. {linkProp("A5", "glacier-a5")} has 4 bedrooms at 84 m². {linkProp("B3", "glacier-b3")} and {linkProp("B4", "glacier-b4")} have 3 bedrooms plus 2 beds in open alcoves upstairs, at 87 m² each. All have balconies on both the lower and upper floors, with the upper balcony facing the front slope. Built in 2000 in traditional alpine style. Pets allowed.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Penthouse Apartments</h2>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Front Slope</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {frontSlope.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Glacier</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {glacierPenthouses.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Penthouse Comparison</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Largest:</strong> {linkProp("Front Slope 5B5", "5b5")} at 100 m² with 9 bed places.</p>
            <p><strong className="text-foreground">Fireplace + slope-view sauna:</strong> Only {linkProp("5B5", "5b5")} has both.</p>
            <p><strong className="text-foreground">Dual-level balconies:</strong> All Glacier penthouses ({linkProp("A5", "glacier-a5")}, {linkProp("B3", "glacier-b3")}, {linkProp("B4", "glacier-b4")}) have balconies on two floors.</p>
            <p><strong className="text-foreground">Most bedrooms:</strong> {linkProp("5B5", "5b5")} and {linkProp("A5", "glacier-a5")} both have 4 bedrooms. {linkProp("B3", "glacier-b3")}/{linkProp("B4", "glacier-b4")} have 3 bedrooms + 2 alcove beds.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default PenthouseApartments;
