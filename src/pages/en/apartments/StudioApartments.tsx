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

const studios = properties.filter(p => p.type === "studio");

const faqs = [
  {
    q: "Do the studio apartments have a sauna?",
    a: (<>All our studios have a private sauna except {linkProp("Studio 102", "102")}, which has a shower only. Studios {linkProp("104", "104")}, {linkProp("319", "319")}, {linkProp("320", "320")}, and {linkProp("321", "321")} in the Skistar building all have their own electric sauna. {linkProp("Platinum A2", "platinum-a2")} and {linkProp("Moonlight 415", "moonlight-415")} also have saunas.</>),
  },
  {
    q: "Are studios big enough for two adults?",
    a: "Yes, they're designed for 1–3 guests. Two adults will be comfortable. Studios typically have two beds (singles that can be placed together) plus a sofa bed. You get a kitchenette or full kitchen, bathroom, and in most cases a sauna.",
  },
  {
    q: "How far are the studios from the ski slopes?",
    a: (<>The Skistar studios on Postintie are right next to K-Market – great for convenience – and about 600 meters from the slopes. {linkProp("Platinum A2", "platinum-a2")} is on Hiihtäjänkuja at the foot of the front slope. {linkProp("Moonlight 415", "moonlight-415")} is next to the Hullu Poro hotel, about 400 meters from the slopes and ski track.</>),
  },
  {
    q: "What's the difference between the studios?",
    a: (<>{linkProp("Studio 102", "102")} (24 m²) is the most compact and the only one without a sauna. Studios {linkProp("104", "104")}, {linkProp("319", "319")}, {linkProp("320", "320")}, {linkProp("321", "321")} (28 m²) are all in the Skistar building on Postintie, built in 2020 – modern and well-equipped with private sauna and underfloor heating. {linkProp("Platinum A2", "platinum-a2")} (37 m²) is the newest (2023) and largest, located on Hiihtäjänkuja at the foot of the front slope. {linkProp("Moonlight 415", "moonlight-415")} (28 m²) has a unique sleeping loft for 3 – note the stairs are steep.</>),
  },
];

const relatedLinks = [
  { label: "Apartments for 4 guests", href: "/en/apartments/for-4" },
  { label: "Apartments for 6 guests", href: "/en/apartments/for-6" },
  { label: "All apartments", href: "/en/apartments" },
  { label: "Book accommodation", href: "/en/accommodations" },
];

const StudioApartments = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "Studio Apartments", href: "/en/apartments/studio" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Studio Apartments in Levi – Compact Stays with Sauna",
    description: "7 studio apartments in Levi center from 24–37 m². Almost all with private sauna. Perfect for couples and solo travelers.",
    url: `${BASE}/en/apartments/studio`,
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
        title="Studio Apartments in Levi – Compact Stays with Sauna | Leville.net"
        description="7 studio apartments in Levi center from 24–37 m². Almost all with private sauna. Perfect for couples and solo travelers. Book directly."
        canonicalUrl={`${BASE}/en/apartments/studio`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/studio" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/studio` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Studio Apartments in Levi</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              A studio apartment in Levi is the smart choice if you're a couple or solo traveler who plans to spend most of the day outside – skiing, snowmobiling, or chasing the northern lights – and needs a clean, warm base to return to.
            </p>
            <p>
              Our studios range from 24 to 37 m². Almost all have a private sauna – the only exception is {linkProp("Studio 102", "102")}, which has a shower only. All other studios include their own electric sauna, which is a real luxury after a cold day outdoors.
            </p>
            <p>
              All studios are in Levi center. The Skistar studios ({linkProp("102", "102")}, {linkProp("104", "104")}, {linkProp("319", "319")}–{linkProp("321", "321")}) are in the Skistar building on Postintie, just steps from K-Market grocery store and about 600 meters from the slopes. {linkProp("Platinum A2", "platinum-a2")} is on Hiihtäjänkuja at the foot of the front slope – the newest apartment in our portfolio, opened in 2023. {linkProp("Moonlight 415", "moonlight-415")} sits next to the Hullu Poro hotel, about 400 meters from the slopes and ski track.
            </p>
            <p>
              Here's the honest truth about studios: they're compact. If you like spreading out or you're traveling with kids, consider a 1-bedroom or 2-bedroom apartment. But if your holiday is about the outdoors and the apartment is just for sleeping, cooking breakfast, and warming up in the sauna after a day on the slopes – a studio is everything you need.
            </p>
          </div>
        </section>

        {/* Studio Cards */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Studio Apartments</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            All studios are in Levi center. The main differences are size, sauna availability, and special features like a loft or premium finishes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {studios.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>

        {/* Which Studio */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Which Studio Should You Choose?</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Best premium studio:</strong> {linkProp("Levi Platinum Superior Studio A2", "platinum-a2")} – 37 m², opened 2023, the newest and most spacious option. At the foot of the front slope.</p>
            <p><strong className="text-foreground">Best studios with sauna:</strong> All Skistar studios ({linkProp("104", "104")}, {linkProp("319", "319")}, {linkProp("320", "320")}, {linkProp("321", "321")}) have a private sauna, underfloor heating, and modern interiors. Built 2020.</p>
            <p><strong className="text-foreground">Most affordable:</strong> {linkProp("Levi Center Studio 102", "102")} – 24 m², the only studio without a sauna, but well-located and accessible without stairs.</p>
            <p><strong className="text-foreground">Best for a small family:</strong> {linkProp("Moonlight 415", "moonlight-415")} – the loft gives sleeping space for 3 upstairs plus a sofa bed below. Note: the stairs to the loft are steep, so this works for older children but not toddlers.</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Looking for Something Bigger?</h2>
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

export default StudioApartments;
