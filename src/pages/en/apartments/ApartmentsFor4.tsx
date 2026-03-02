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

const for4 = getPropertiesByTag("for-4");

const faqs = [
  {
    q: "Can 4 adults stay comfortably?",
    a: (<>For 4 adults, {linkProp("Karhunvartija 3", "karhunvartija3")} is the best option – 2 proper bedrooms, fireplace, sauna, and private entrance. {linkProp("Superior 209", "209")}/{linkProp("210", "210")} work well for short stays using the bedroom plus sofa bed. {linkProp("Platinum A2", "platinum-a2")} and {linkProp("Moonlight 415", "moonlight-415")} are open-plan – comfortable for 4 if you don't mind shared space.</>),
  },
  {
    q: "Which apartments for 4 allow pets?",
    a: (<>Only {linkProp("Karhunvartija 3", "karhunvartija3")} allows pets in this size category. The Superior suites, {linkProp("Platinum A2", "platinum-a2")}, and {linkProp("Moonlight 415", "moonlight-415")} do not accept pets.</>),
  },
  {
    q: "Is there parking?",
    a: (<>Yes, all apartments include a free parking space. Most have engine block heater plugs – essential in winter. {linkProp("Karhunvartija 3", "karhunvartija3")} has parking right at the private entrance.</>),
  },
  {
    q: "Which is best for a family with small children?",
    a: (<>{linkProp("Karhunvartija 3", "karhunvartija3")} – the private entrance leads to an enclosed yard for snow play. It's on one level with a fireplace. Firewood and cleaning are included. {linkProp("Superior 209", "209")}/{linkProp("210", "210")} are also accessible without stairs, practical with a stroller.</>),
  },
];

const relatedLinks = [
  { label: "Apartments for 6 guests", href: "/en/apartments/for-6" },
  { label: "Studio apartments", href: "/en/apartments/studio" },
  { label: "All apartments", href: "/en/apartments" },
  { label: "Levi Travel Guide", href: "/en/levi" },
];

const ApartmentsFor4 = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "Apartments for 4", href: "/en/apartments/for-4" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Apartments for 4 in Levi – Couples & Small Families",
    description: "5 apartments for up to 4 guests in Levi center. 1–2 bedrooms, 37–44 m². Sauna, fireplace, private yard options.",
    url: `${BASE}/en/apartments/for-4`,
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
        title="Apartments for 4 in Levi – Couples & Small Families | Leville.net"
        description="5 apartments for up to 4 guests in Levi center. 1–2 bedrooms, 37–44 m². Sauna, fireplace, private yard options. Book directly."
        canonicalUrl={`${BASE}/en/apartments/for-4`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/for-4" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/for-4` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Apartments for 4 Guests in Levi</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              An apartment for 4 is the sweet spot for couples traveling together or a small family with one or two children. You get more space than a studio – typically a separate bedroom, a proper kitchen, and room to settle in for the week.
            </p>
            <p>
              Our 4-person apartments range from 37 to 44 m², all in Levi center. The standout is {linkProp("Karhunvartija 3", "karhunvartija3")} – the only 4-person apartment with 2 proper bedrooms, a natural stone fireplace, private sauna, enclosed yard with its own entrance from Ratsastajankuja street, and firewood included. It's especially good for families with small children because the private entrance leads directly to a yard where kids can play in the snow.
            </p>
            <p>
              The Superior apartments ({linkProp("209", "209")}, {linkProp("210", "210")}) offer 1-bedroom layouts with a sofa bed in the living room. Both are accessible without stairs, which is practical with a stroller or for guests with mobility needs.
            </p>
            <p>
              The larger studios – {linkProp("Platinum A2", "platinum-a2")} (37 m², opened 2023) and {linkProp("Moonlight 415", "moonlight-415")} (28 m² with a sleeping loft) – also fit 4 guests and are good options if you're budget-conscious.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Apartments for 4 Guests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {for4.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">How to Choose</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Need separate bedrooms?</strong> {linkProp("Karhunvartija 3", "karhunvartija3")} – the only 4-person apartment with 2 bedrooms and its own enclosed yard.</p>
            <p><strong className="text-foreground">Want the newest apartment?</strong> {linkProp("Platinum A2", "platinum-a2")} – opened 2023, at the foot of the front slope.</p>
            <p><strong className="text-foreground">Traveling with small children?</strong> {linkProp("Karhunvartija 3", "karhunvartija3")} – private yard, fireplace, all on one level, pets allowed. Or {linkProp("Superior 209", "209")}/{linkProp("210", "210")} – accessible without stairs.</p>
            <p><strong className="text-foreground">Best for a loft experience?</strong> {linkProp("Moonlight 415", "moonlight-415")} – sleeping loft for 3 upstairs. Note: steep stairs, not suitable for toddlers.</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Need More Space?</h2>
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

export default ApartmentsFor4;
