import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import HreflangTags from "@/components/HreflangTags";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, MessageCircle, Mountain, Home, Users, Building, Crown, Castle, DoorOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { properties } from "@/data/properties";

const BASE = "https://leville.net";

// Helper to link apartment names in text
const linkProperty = (name: string, id: string) => {
  const prop = properties.find(p => p.id === id);
  if (!prop) return name;
  return (
    <a href={prop.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">
      {name}
    </a>
  );
};

const categories = [
  {
    title: "Studio Apartments",
    description: "Compact apartments with sauna for 1–4 guests.",
    count: "7 studios available",
    href: "/en/apartments/studio",
    icon: Home,
  },
  {
    title: "Apartments for 4 Guests",
    description: "1–2 bedrooms for couples and small families.",
    count: "5 apartments available",
    href: "/en/apartments/for-4",
    icon: DoorOpen,
  },
  {
    title: "Apartments for 6 Guests",
    description: "2–3 bedrooms for families and friend groups.",
    count: "8 apartments available",
    href: "/en/apartments/for-6",
    icon: Users,
  },
  {
    title: "Apartments for 8+ Guests",
    description: "3–5 bedrooms for large families and groups.",
    count: "8 apartments available",
    href: "/en/apartments/for-8",
    icon: Building,
  },
  {
    title: "Large Group (10–14 Guests)",
    description: "Log cabin and large apartments for teams and events.",
    count: "3 properties available",
    href: "/en/apartments/large-group",
    icon: Castle,
  },
  {
    title: "Penthouse Apartments",
    description: "Top-floor apartments with balconies and views.",
    count: "4 penthouses available",
    href: "/en/apartments/penthouse",
    icon: Crown,
  },
];

const faqs = [
  {
    q: "Which apartments are closest to the ski slopes?",
    a: (
      <>
        The Glacier apartments are right at the foot of the front slope – you reach the newest chairlift in a few steps, and the ski track is just tens of meters from the door. The Hiihtäjänkuja apartments ({linkProperty("5A2", "5a2")}, {linkProperty("5B2", "5b2")}, {linkProperty("5B5", "5b5")}) are also close to the slopes and the Zero Point area. All our center apartments are within a short walk of the lifts.
      </>
    ),
  },
  {
    q: "Do all apartments have a sauna?",
    a: (
      <>
        Almost all of them. The only exception is {linkProperty("Studio 102", "102")}, which has a shower but no sauna. All other studios, Superior suites, Glacier apartments, {linkProperty("Karhunvartija 3", "karhunvartija3")}, and {linkProperty("Bear Lodge", "karhupirtti")} have their own private sauna. The penthouse {linkProperty("5B5", "5b5")} even has a sauna with a window overlooking the front slope.
      </>
    ),
  },
  {
    q: "Can I bring my dog or cat?",
    a: (
      <>
        Some apartments allow pets and some don't. The Hiihtäjänkuja apartments ({linkProperty("5A2", "5a2")}, {linkProperty("5B2", "5b2")}, {linkProperty("5B5", "5b5")}), all Glacier apartments, {linkProperty("Karhunvartija 3", "karhunvartija3")}, and {linkProperty("Bear Lodge", "karhupirtti")} accept pets. The Skistar studios, Superior suites, {linkProperty("Platinum A2", "platinum-a2")}, and {linkProperty("Moonlight 415", "moonlight-415")} do not allow pets.
      </>
    ),
  },
  {
    q: "Is Levi center walkable or do I need a car?",
    a: "Levi center is very walkable. From any of our apartments, you're within a few minutes' walk of grocery stores, restaurants, ski rental, and the slopes. A car is helpful for day trips outside the center (reindeer farms, ice fishing, Ylläs), but for daily resort life it's not needed.",
  },
  {
    q: "Can I book multiple apartments for a large group?",
    a: (
      <>
        Yes. The Glacier building has apartments from 67 to 105 m². Book several next to each other for groups of 15–40+. The building has a shared children's game room. For the biggest groups, {linkProperty("Bear Lodge", "karhupirtti")} sleeps 14 under one roof. Contact us directly for group arrangements.
      </>
    ),
  },
  {
    q: "Is final cleaning included?",
    a: (
      <>
        Yes, final cleaning is always included in the price for all our apartments and cabins. You don't need to clean before departure. At {linkProperty("Karhunvartija 3", "karhunvartija3")}, {linkProperty("Bear Lodge", "karhupirtti")}, and the Hiihtäjänkuja apartments ({linkProperty("5A2", "5a2")}, {linkProperty("5B2", "5b2")}, {linkProperty("5B5", "5b5")}), firewood is also included.
      </>
    ),
  },
];

// FAQ schema data is embedded in faqSchema below

const guideLinks = [
  { label: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
  { label: "Things to Do in Levi", href: "/guide/activities-in-levi" },
  { label: "Restaurants in Levi", href: "/guide/restaurants-and-services-in-levi" },
  { label: "All Accommodations", href: "/en/accommodations" },
];

const ApartmentsHub = () => {
  const breadcrumbItems = [
    { label: "Accommodations", href: "/en/accommodations" },
    { label: "Apartments", href: "/en/apartments" },
  ];

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Apartments in Levi – Find Your Perfect Holiday Home",
    description: "Browse all apartment types in Levi ski resort: studios, family apartments, penthouses, and large group accommodation.",
    url: `${BASE}/en/apartments`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categories.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: cat.title,
        url: `${BASE}${cat.href}`,
      })),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Leville.net",
    url: BASE,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        // For JSX answers, provide a plain-text version for schema
        text: typeof f.a === "string" ? f.a : f.q,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title="Apartments in Levi – Find Your Perfect Holiday Home | Leville.net"
        description="Browse all apartment types in Levi ski resort: studios, family apartments, penthouses, and large group accommodation. Book directly for the best price."
        canonicalUrl={`${BASE}/en/apartments`}
        lang="en"
      />
      <HreflangTags
        currentLang="en"
        customUrls={{
          en: `${BASE}/en/apartments`,
          "x-default": `${BASE}/en/apartments`,
        }}
      />
      <JsonLd data={websiteSchema} />
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="en" items={breadcrumbItems} />

        {/* Hero / Intro */}
        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Apartments in Levi – Find the Right Size for Your Group
          </h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              Choosing the right apartment in Levi depends on your group size. A couple on a ski weekend needs something very different from a family of six or a corporate team of twelve. We've organized all our apartments by group size so you can go straight to what fits.
            </p>
            <p>
              All our apartments are in the heart of Levi – within walking distance of the slopes, restaurants, K-Market grocery store, and Alko. The Glacier apartments are right at the foot of the front slope, with the chairlift just steps away. All apartments come with a kitchen, free WiFi, ski storage, and parking.
            </p>
            <p>
              Book directly through us and you're dealing with the owner, not a booking platform.
            </p>
          </div>
        </section>

        {/* Browse by Group Size */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Browse by Group Size</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.href} to={cat.href} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 border-border/60">
                    <CardContent className="p-5 sm:p-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {cat.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{cat.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="text-xs font-medium text-primary">{cat.count}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why Book Directly */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Why Book Directly with Leville.net?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Best price guaranteed",
                desc: "No middleman fees. You pay the owner directly.",
              },
              {
                icon: MessageCircle,
                title: "Personal service",
                desc: "Deal directly with the owner. WhatsApp available.",
              },
              {
                icon: Mountain,
                title: "Local knowledge",
                desc: "We've been in Levi since 2011.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-border/60">
                  <CardContent className="p-5 sm:p-6 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="space-y-2">
                <h3 className="font-semibold text-lg">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Guide */}
        <section className="container mx-auto px-4 pb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Explore the Levi Travel Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guideLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex items-center gap-2 rounded-lg border border-border/60 p-4 hover:border-primary/40 hover:bg-secondary/40 transition-all"
              >
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

export default ApartmentsHub;
