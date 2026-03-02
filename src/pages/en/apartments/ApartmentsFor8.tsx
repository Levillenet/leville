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

const for8 = getPropertiesByTag("for-8");
const frontSlope = for8.filter(p => p.id === "5b5");
const glacierProps = for8.filter(p => p.id.startsWith("glacier-"));

const faqs = [
  {
    q: "What's the difference between the Front Slope penthouse and Glacier apartments?",
    a: (<>The {linkProp("Front Slope Penthouse 5B5", "5b5")} is 100 m² with 3 balconies, a heat-storing fireplace, and a sauna with a window overlooking the slope. Renovated 2021. Glacier apartments are traditional alpine-style, built in 2000, located right at the foot of the front slope with the chairlift steps away. All have ski storage and access to a children's playroom.</>),
  },
  {
    q: "Can I book multiple apartments for a group larger than 8?",
    a: (<>Yes. The Glacier building has many apartments that can be booked separately. {linkProp("B1", "glacier-b1")} and {linkProp("B2", "glacier-b2")} (105 m² each, 10 guests) are on the same floor. Combine apartments for groups of 20, 30, or more. Contact us directly for group arrangements.</>),
  },
  {
    q: "Do the apartments have enough bathrooms for 8 people?",
    a: (<>{linkProp("5B5", "5b5")} has 1 bathroom and 2 separate WCs, plus the sauna washing area. Glacier apartments also have 1 bathroom + 2 WCs. The sauna provides an extra washing point. Stagger morning routines on ski days.</>),
  },
  {
    q: "Which 8-person apartments allow pets?",
    a: (<>The {linkProp("Front Slope Penthouse 5B5", "5b5")} and all Glacier apartments allow pets.</>),
  },
];

const relatedLinks = [
  { label: "Large group accommodation (10–14)", href: "/en/apartments/large-group" },
  { label: "Penthouse apartments", href: "/en/apartments/penthouse" },
  { label: "Apartments for 6", href: "/en/apartments/for-6" },
  { label: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
  { label: "All apartments", href: "/en/apartments" },
];

const ApartmentsFor8 = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
    { label: "Apartments for 8", href: "/en/apartments/for-8" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Apartments for 8 in Levi – Large Family & Group Stays",
    description: "8 apartments for up to 8 guests in Levi. 84–105 m², 3–5 bedrooms. Front slope penthouse and Glacier alpine apartments.",
    url: `${BASE}/en/apartments/for-8`,
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
        title="Apartments for 8 in Levi – Large Family & Group Stays | Leville.net"
        description="8 apartments for up to 8 guests in Levi. 84–105 m², 3–5 bedrooms. Front slope penthouse and Glacier alpine apartments. Book directly."
        canonicalUrl={`${BASE}/en/apartments/for-8`}
        lang="en"
      />
      <HreflangTags currentPath="/en/apartments/for-8" currentLang="en" customUrls={{ en: `${BASE}/en/apartments/for-8` }} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Apartments for 8 Guests in Levi</h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              Eight people in one apartment – that's typically two families sharing, a larger friend group, or a multi-generational holiday. The good news: our 8-person apartments have 3–5 bedrooms, so everyone gets a real room with a door.
            </p>
            <p>
              <strong className="text-foreground">{linkProp("Penthouse on the Front Slope (5B5)", "5b5")}</strong> is 100 m² with 4 bedrooms, 3 balconies, a heat-storing fireplace (firewood included), and a sauna with a window overlooking the front slope lighting. The 10-person dining table seats the whole group. Renovated in 2021. Pets allowed.
            </p>
            <p>
              <strong className="text-foreground">Glacier apartments</strong> are traditional alpine apartments built in 2000, right at the foot of the front slope – the newest chairlift is steps away. {linkProp("A1", "glacier-a1")} and {linkProp("A3", "glacier-a3")} are 92 m² with 4 bedrooms each, at street level with basement access. The Glacier penthouses ({linkProp("A5", "glacier-a5")} at 84 m², {linkProp("B3", "glacier-b3")} and {linkProp("B4", "glacier-b4")} at 87 m²) are on the upper floors with balconies on two levels. All Glacier apartments allow pets and have access to a children's playroom with air hockey.
            </p>
            <p>
              If your group might grow to 9–10 people, look at {linkProp("Glacier B1", "glacier-b1")} and {linkProp("B2", "glacier-b2")} under our <Link to="/en/apartments/large-group" className="text-primary hover:underline underline-offset-2">large group page</Link> – they sleep 10 in 5 bedrooms each.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Apartments for 8 Guests</h2>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Front Slope</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {frontSlope.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          <h3 className="text-xl font-semibold mb-4 text-primary/90">Glacier (At the Foot of the Front Slope)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4">
            {glacierProps.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
          <p className="text-sm text-muted-foreground italic">
            {linkProp("Glacier B1", "glacier-b1")} and {linkProp("B2", "glacier-b2")} (105 m², 10 guests) are also available for groups of 8 who want extra space. See our <Link to="/en/apartments/large-group" className="text-primary hover:underline underline-offset-2">large group accommodation page</Link>.
          </p>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">How to Choose</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Fireplace and slope views:</strong> {linkProp("Front Slope Penthouse 5B5", "5b5")} – heat-storing fireplace, slope-view sauna, 3 balconies.</p>
            <p><strong className="text-foreground">Right at the foot of the front slope:</strong> All Glacier apartments – the newest chairlift is steps away from the building.</p>
            <p><strong className="text-foreground">Top-floor with dual balconies:</strong> Glacier penthouses {linkProp("A5", "glacier-a5")}, {linkProp("B3", "glacier-b3")}, {linkProp("B4", "glacier-b4")} – upper and lower floor balconies.</p>
            <p><strong className="text-foreground">Maximum space:</strong> {linkProp("Glacier B1", "glacier-b1")} or {linkProp("B2", "glacier-b2")} at 105 m² and 5 bedrooms (sleep 10 but great for groups of 8 wanting extra room).</p>
            <p><strong className="text-foreground">Children's playroom:</strong> Only the Glacier building has a shared playroom with air hockey.</p>
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

export default ApartmentsFor8;
