import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import HreflangTags from "@/components/HreflangTags";
import PropertyCard from "@/components/PropertyCard";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { properties } from "@/data/properties";
import { Card, CardContent } from "@/components/ui/card";

const BASE = "https://leville.net";

const linkProp = (label: string, id: string) => {
  const p = properties.find(pr => pr.id === id);
  if (!p) return label;
  return <a href={p.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">{label}</a>;
};

const largeGroupProps = properties.filter(p => ["karhupirtti", "glacier-b1", "glacier-b2"].includes(p.id));

const faqs = [
  {
    q: "What makes Bear Lodge special for large groups?",
    a: (<>{linkProp("Bear Lodge", "karhupirtti")} is a 220 m² log cabin – one of the only ones this size in central Levi. Fully renovated in 2022. It has 7 bedrooms (3 ensuite downstairs, 4 upstairs), an outdoor hot tub, private yard, and fireplace. 3 minutes' walk to all services. About 150m to the nearest snowmobile track. Firewood and final cleaning are included.</>),
  },
  {
    q: "Can I book the entire Glacier building?",
    a: "Yes, for large events. The building has multiple apartments in two sections (A and B), all with ski storage. There's a shared children's playroom. Contact us at info@leville.net or WhatsApp +358 44 13 13 13.",
  },
  {
    q: "Are there facilities for corporate retreats?",
    a: (<>{linkProp("Bear Lodge", "karhupirtti")} works well as a group base – large living area for informal meetings, memorable atmosphere. It also has a dedicated workspace. For formal conference rooms, Levi has hotel venues nearby. All our apartments have WiFi.</>),
  },
];

const relatedLinks = [
  { label: "Apartments for 8 guests", href: "/en/apartments/for-8" },
  { label: "Penthouse apartments", href: "/en/apartments/penthouse" },
  { label: "Contact us", href: "/en/contact" },
  { label: "Restaurants in Levi", href: "/guide/restaurants-and-services-in-levi" },
  { label: "All apartments", href: "/en/apartments" },
];

const LargeGroupAccommodation = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "Large Group Accommodation", href: "/en/apartments/large-group" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Large Group Accommodation in Levi – 10 to 20+ Guests",
    description: "Accommodation for large groups in Levi. 105 m² apartments for 10 and a 220 m² log cabin for 14.",
    url: `${BASE}/en/apartments/large-group`,
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
        title="Large Group Accommodation in Levi – 10 to 20+ Guests | Leville.net"
        description="Accommodation for large groups in Levi. 105 m² apartments for 10 and a 220 m² log cabin for 14. Sports teams, corporate groups, family reunions. Book directly."
        canonicalUrl={`${BASE}/en/apartments/large-group`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/large-group" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/large-group` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Large Group Accommodation in Levi</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              Finding accommodation for 10+ people in a ski resort is hard. Hotels split you across rooms with no shared space. Most apartments max out at 6–8. Here's what works in Levi:
            </p>
            <p>
              <strong className="text-foreground">{linkProp("Bear Lodge (Karhupirtti)", "karhupirtti")}</strong> is a 220 m² traditional log cabin built in 1989, fully renovated in 2022 – one of the few, if not the only, log cabin of this size in central Levi. 7 bedrooms (3 ensuite with shower downstairs, 4 with connecting doors and toilet upstairs), outdoor hot tub, private yard, and fireplace. Water-circulated radiator heating keeps it warm. 3 minutes' walk to restaurants and shops, about 150 meters to the nearest snowmobile track. Firewood and final cleaning included in the price. Pets allowed.
            </p>
            <p>
              <strong className="text-foreground">{linkProp("Glacier B1", "glacier-b1")} and {linkProp("B2", "glacier-b2")}</strong> are each 105 m² with 5 bedrooms sleeping 10 guests. They're next to each other on the first floor of the Glacier building, with full-width balconies facing the front slope. Book both for up to 20 people. The building is right at the foot of the front slope – chairlift steps away. Children's playroom with air hockey. Pets allowed. Bed linen available as additional service.
            </p>
            <p>
              <strong className="text-foreground">Combine multiple Glacier apartments</strong> for even larger groups. The building has apartments from 67 to 105 m², all with ski storage. For corporate events, sports teams, or large family gatherings, book 4, 6, or more apartments in the same building. Contact us for group arrangements.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Large Group Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {largeGroupProps.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>

        {/* Combine apartments CTA */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Combine Apartments for 15–40+ Guests</h2>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The Glacier building accommodates 80+ guests across all its apartments. For sports clubs, corporate events, and family reunions, we arrange private use of multiple apartments – or even the entire building. All apartments share the same entrance. Children's game room available.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <a href="mailto:info@leville.net" className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-2">
                  <Mail className="w-4 h-4" /> info@leville.net
                </a>
                <a href="https://wa.me/35844131313" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp +358 44 13 13 13
                </a>
              </div>
            </CardContent>
          </Card>
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

export default LargeGroupAccommodation;
