import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubpageBackground from "@/components/SubpageBackground";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import HreflangTags from "@/components/HreflangTags";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Users,
  Ticket,
  Share2,
  BedDouble,
  Wallet,
  CheckCircle2,
  Mail,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const CANONICAL = "https://leville.net/en/club-support";
const BOOKING_URL = "https://app.moder.fi/levillenet";
const MAILTO = "mailto:info@leville.net?subject=Club%20support%20-%20we%20want%20to%20join";

const steps = [
  {
    number: 1,
    icon: Mail,
    title: "The club gets in touch",
    description:
      "A sports club, association or other community emails us. We go through the main points together and agree on the start.",
  },
  {
    number: 2,
    icon: Ticket,
    title: "The club receives its own code and link",
    description:
      "We provide a club-specific booking code and booking link, a logo and clear booking instructions.",
  },
  {
    number: 3,
    icon: Share2,
    title: "The club shares the link in its own channels",
    description:
      "The club tells members, parents and supporters about the opportunity on its website and social media.",
  },
  {
    number: 4,
    icon: BedDouble,
    title: "A member books accommodation at the normal price",
    description:
      "The booking is made with the club's code or link. The guest pays exactly the same price as anyone else.",
  },
  {
    number: 5,
    icon: Wallet,
    title: "The club receives 10% of the VAT-exclusive price",
    description:
      "For every completed booking we pay the club 10% of the VAT-exclusive accommodation price.",
  },
];

const clubGets = [
  "A club-specific booking code",
  "A dedicated booking link to share",
  "A logo provided by Leville.net",
  "Clear booking instructions for members",
  "Other marketing material when needed",
];

const clubGives = [
  "Tells its members about the collaboration in its own channels, for example Facebook and Instagram",
  "Adds the logo provided by Leville.net to its own website",
  "Publishes the booking instructions and its own booking link on its website",
  "Reminds members to use the club's code when travelling to Levi",
];

const faqs = [
  {
    q: "Does the guest get a discount with the club code?",
    a: "No. The guest pays the completely normal price, and the code adds no extra cost either. The code simply tells us which club the support goes to.",
  },
  {
    q: "How much does the club receive from one booking?",
    a: "The club receives 10% of the VAT-exclusive accommodation price. For example, a VAT-exclusive accommodation price of 1,000 euros means 100 euros of support for the club.",
  },
  {
    q: "Where does the club get its code and booking link?",
    a: "We provide the code and link once the collaboration has been agreed. It is enough for the club to contact us by email at info@leville.net.",
  },
  {
    q: "Which bookings are counted?",
    a: "Completed accommodation bookings made with the club's own booking code or booking link are counted.",
  },
  {
    q: "Does the club have to handle bookings or sell anything?",
    a: "No. Instead of selling products, collecting orders, organising volunteer work days or chasing sponsorship deals, the club only communicates with its own members. We handle the bookings and the accommodation.",
  },
  {
    q: "Who can join?",
    a: "The model is intended for sports clubs, associations and other communities that raise funds for their activities. If you are unsure whether your community fits, just ask by email.",
  },
];

const ClubSupport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [{ label: "Club support", href: "/en/club-support" }];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://leville.net/en" },
      { "@type": "ListItem", position: 2, name: "Club support", item: CANONICAL },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Leville.net club support for sports clubs, associations and communities",
    serviceType: "Fundraising for clubs and associations through accommodation bookings",
    description:
      "A sports club, association or community gets its own booking code and link for accommodation in Levi. The guest pays the normal price and the club receives 10% of the VAT-exclusive accommodation price.",
    url: CANONICAL,
    areaServed: "Levi, Kittilä, Finland",
    provider: {
      "@type": "Organization",
      name: "Leville.net",
      url: "https://leville.net",
      email: "info@leville.net",
      telephone: "+358 44 13 13 13",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Sports clubs, associations and communities",
    },
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Club support – fundraising without selling products | Leville.net</title>
        <meta
          name="description"
          content="A new way to raise funds: a member books accommodation in Levi with the club's code at the normal price and the club receives 10% of the VAT-exclusive price. No product sales, no order lists."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content="Club support – fundraising without selling products | Leville.net" />
        <meta
          property="og:description"
          content="Support your club by booking accommodation in Levi. You pay the normal price, your club receives 10% of the VAT-exclusive accommodation price."
        />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Leville.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Club support – fundraising without selling products" />
        <meta
          name="twitter:description"
          content="A member books accommodation in Levi with the club's code at the normal price – the club receives 10% of the VAT-exclusive price."
        />
        <script type="application/ld+json">{JSON.stringify([breadcrumbSchema, serviceSchema, faqSchema])}</script>
      </Helmet>
      <HreflangTags
        currentPath="/en/club-support"
        currentLang="en"
        customUrls={{ fi: "/seuratuki", en: "/en/club-support" }}
      />

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <SubpageBackground />
        <Header />

        <main className="pt-32 pb-20 relative z-10">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} lang="en" />

            {/* Hero */}
            <ScrollReveal>
              <section className="text-center mb-16 max-w-4xl mx-auto">
                <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6 tracking-wider uppercase">
                  Club support
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                  Support your own club – book your stay in Levi
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  A new collaboration model for sports clubs, associations and other communities that traditionally
                  raise funds by selling products, organising volunteer work days or collecting sponsorships. You pay
                  the normal price for your accommodation with no extra cost, and your club receives 10% of the
                  VAT-exclusive accommodation price.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8">
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-source="club-support-hero">
                      Book accommodation in Levi
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-medium px-8">
                    <a href={MAILTO}>
                      <Mail className="w-4 h-4 mr-2" />
                      Bring your club on board
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-10">
                  {["No extra cost for the guest", "No product sales for the club", "Support from completed bookings"].map(
                    (badge) => (
                      <div key={badge} className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium text-sm">{badge}</span>
                      </div>
                    )
                  )}
                </div>
              </section>
            </ScrollReveal>

            {/* Example calculation */}
            <ScrollReveal delay={0.1}>
              <section className="mb-20 max-w-3xl mx-auto">
                <div className="glass-card rounded-2xl p-8 md:p-10 text-center border-2 border-primary/30">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">
                    This is what one booking brings the club
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-foreground">€1,000</div>
                      <div className="text-sm text-muted-foreground mt-1">VAT-exclusive accommodation price</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-primary rotate-90 sm:rotate-0" />
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-primary">€100</div>
                      <div className="text-sm text-muted-foreground mt-1">support for the club</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-6 leading-relaxed">
                    The support is always 10% of the VAT-exclusive accommodation price. The price paid by the guest
                    stays the same.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* Two audiences */}
            <ScrollReveal delay={0.2}>
              <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  Who is club support for?
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  <div className="glass-card p-8 rounded-2xl flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <BedDouble className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">You are heading to Levi</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Book your accommodation as usual and use your own club's booking code or booking link. You pay
                      the same price as everyone else, but your booking brings money to your club. If you don't know
                      your club's code, ask your club directly.
                    </p>
                    <div className="mt-auto">
                      <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-source="club-support-guest">
                          Book accommodation
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="glass-card p-8 rounded-2xl flex flex-col border-2 border-primary/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        You represent a club, association or community
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Your community gets a new form of fundraising without product sales, order lists, volunteer work
                      days or sponsorship hunting. You tell your own members about the opportunity and share your
                      booking link – we take care of the accommodation and the bookings.
                    </p>
                    <div className="mt-auto">
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                        <a href={MAILTO}>
                          <Mail className="w-4 h-4 mr-2" />
                          Ask more by email
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* How it works */}
            <ScrollReveal delay={0.3}>
              <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  How the fundraising works
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.number} className="glass-card p-6 rounded-2xl text-center">
                        <div className="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-semibold tracking-wider text-muted-foreground mb-2">
                          STEP {step.number}
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* What the club gets & gives */}
            <ScrollReveal delay={0.4}>
              <section className="mb-20 grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">
                    What the club gets from Leville.net
                  </h2>
                  <ul className="space-y-4">
                    {clubGets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">
                    What is expected from the club
                  </h2>
                  <ul className="space-y-4">
                    {clubGives.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Megaphone className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-6">
                    The better the club communicates the opportunity to its members, the more bookings and the more
                    support the club receives.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal delay={0.5}>
              <section className="mb-20 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  Frequently asked questions about club support
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={faq.q} value={`faq-${i + 1}`} className="glass-card border-white/10 px-6 rounded-xl">
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </ScrollReveal>

            {/* Final CTA */}
            <ScrollReveal delay={0.6}>
              <section className="max-w-3xl mx-auto">
                <div className="glass-card rounded-2xl p-8 md:p-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-foreground">
                    Bring your club on board
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Send us an email and we will tell you more and provide your club with its own booking code,
                    booking link and ready-made materials. Getting in touch commits you to nothing.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                      <a href={MAILTO}>
                        <Mail className="w-4 h-4 mr-2" />
                        info@leville.net
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="px-8">
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-source="club-support-footer">
                        Book accommodation
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm">
                    <Link to="/en/accommodations" className="text-muted-foreground hover:text-foreground transition-colors">
                      Accommodation in Levi
                    </Link>
                    <Link to="/en/log-cabins-levi" className="text-muted-foreground hover:text-foreground transition-colors">
                      Cabins in Levi
                    </Link>
                    <Link to="/en/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                      Contact
                    </Link>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>

        <Footer lang="en" />
      </div>
    </>
  );
};

export default ClubSupport;
