import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import SeoMeta from "@/components/SeoMeta";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReadNextSection from "@/components/guide/ReadNextSection";
import {
  Euro,
  Mountain,
  UtensilsCrossed,
  ShoppingCart,
  Snowflake,
  Dog,
  Bus,
  Info,
  ExternalLink,
  Home,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TipBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-4 border-accent bg-accent/10 rounded-r-lg p-4 my-4 flex gap-3">
    <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
    <div className="text-sm text-foreground/90">{children}</div>
  </div>
);

const PriceTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto my-4 rounded-lg border border-border">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-muted/50">
          {headers.map((h, i) => (
            <th key={i} className="text-left p-3 font-semibold text-foreground whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`p-3 whitespace-nowrap ${j > 0 ? "font-medium" : ""}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SectionCard = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <Card className="mb-8 bg-card/80 backdrop-blur border-border">
    <CardContent className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-accent" />
        {title}
      </h2>
      {children}
    </CardContent>
  </Card>
);

const PricesInLeviPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/en" },
    { label: "Levi Guide", href: "/en/levi" },
    { label: "Prices in Levi" },
  ];

  const faqItems = [
    {
      q: "Is card payment accepted everywhere in Levi?",
      a: "Yes. Finland has almost entirely switched to card payments. Visa and Mastercard are accepted everywhere — restaurants, shops, ski pass counters and taxis. You rarely need cash, though a small amount can be useful at flea markets.",
    },
    {
      q: "Do I need cash in Levi?",
      a: "Practically no. Even the Ski Bus accepts card-only payment. You might need cash at small markets or flea markets. An ATM is located at S-Market.",
    },
    {
      q: "Is Levi expensive compared to Alpine resorts?",
      a: "Ski passes and equipment rental are cheaper in Levi than most Alpine destinations. Food is comparable. The biggest difference is alcohol — drinks in Finnish restaurants are noticeably more expensive than in Austria or France due to Finnish alcohol taxation.",
    },
    {
      q: "When is Levi cheapest?",
      a: "January (polar night season) and April (spring skiing) are the cheapest periods. The most expensive time is Christmas–New Year and Finnish winter holiday weeks (late February – early March).",
    },
    {
      q: "Is tipping expected in Finland?",
      a: "No. Tipping is not customary in Finland. Service is included in all prices. You can leave a tip if you wish, but it's never expected.",
    },
    {
      q: "What currency is used in Levi?",
      a: "Finland uses the euro (€). No currency exchange is needed if you're coming from another eurozone country.",
    },
    {
      q: "Should I book activities in advance?",
      a: "Yes, especially during Christmas, New Year and Finnish winter holiday weeks (late Feb – early March). Popular activities like husky safaris sell out days in advance. Book directly with local operators for the best prices — you'll typically save 20–30% compared to booking through tour operators.",
    },
    {
      q: "Can I bring my own alcohol?",
      a: "If you're flying from outside the EU, you can bring limited duty-free alcohol. Within the EU, there are no limits but check airline baggage rules. Many self-catering guests stock up at Alko on arrival.",
    },
  ];

  const faqSchemaItems = faqItems.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <SeoMeta
        title="Prices in Levi 2025–2026 – Ski Passes, Dining & Activities | Leville.net"
        description="Complete price guide for a Levi holiday. Ski pass prices, restaurant costs, activity rates and grocery prices all in one place. Plan your budget before you go."
        canonicalUrl="https://leville.net/guide/prices-in-levi"
        lang="en"
      />
      <HreflangTags
        currentPath="/guide/prices-in-levi"
        currentLang="en"
        customUrls={{
          fi: "/opas/hinnat-levilla",
          en: "/guide/prices-in-levi",
        }}
      />
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({
        title: "Prices in Levi – What Does a Lapland Holiday Cost?",
        description: "Complete price guide for a Levi holiday. Ski pass prices, restaurant costs, activity rates and grocery prices.",
        url: "https://leville.net/guide/prices-in-levi",
        lang: "en",
        datePublished: "2025-11-01",
        dateModified: "2026-02-28",
      })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: "https://leville.net/en" },
        { name: "Levi Guide", url: "https://leville.net/en/levi" },
        { name: "Prices in Levi", url: "https://leville.net/guide/prices-in-levi" },
      ])} />
      <JsonLd data={getFAQSchema(faqSchemaItems)} />

      <SubpageBackground />

      <main id="main-content" className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-8">
          <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Euro className="w-3 h-3 inline mr-1" /> Price Guide
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Prices in Levi – What Does a Lapland Holiday Cost?
          </h1>
          <p className="text-muted-foreground text-lg">
            A complete price guide from ski passes to restaurants, activities to groceries. Plan your Levi holiday budget before you go. Finland uses the euro (€) and card payments are accepted virtually everywhere — you rarely need cash. Tipping is not customary in Finland.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 flex gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-foreground/80">
            Prices are indicative and based on the 2025–2026 season. Always check current prices with service providers before booking. Last updated: February 2026.
          </p>
        </div>

        {/* Section 1: Ski Pass Prices */}
        <SectionCard icon={Mountain} title="Ski Pass Prices">
          <p className="text-muted-foreground mb-4">
            A Levi ski pass covers all 43 slopes and 27 lifts. You can buy passes online, from ticket machines or at the counter. The cheapest option is to buy online in advance. Children under 6 wearing a helmet ski free with an adult pass.
          </p>
          <PriceTable
            headers={["Pass Type", "Child (6–11)", "Adult (12–64)", "Senior (65+)"]}
            rows={[
              ["3 hours", "€29", "€48.50", "€29"],
              ["1 day", "€35.50", "€58", "€35.50"],
              ["3 days", "€95", "€154.50", "€95"],
              ["6 days", "€153", "€258", "€153"],
              ["Season pass", "€384", "€577", "€384"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Ski passes are loaded onto a SkiData KeyCard (€8, non-refundable). The card is reusable and works at other SkiData resorts — keep it! The ski pass also doubles as a Ski Bus ticket: €3/day with ski pass, €4/day separately.
          </p>
          <TipBox>
            <strong>Money-saving tip:</strong> The Levi Black loyalty programme earns points on ski pass purchases. Download the Levi Resort app and register before your first purchase.
          </TipBox>
          <a
            href="https://levi.skiperformance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-sm"
          >
            Buy ski passes from Levi's online shop <ExternalLink className="w-4 h-4" />
          </a>
        </SectionCard>

        {/* Section 2: Equipment Rental */}
        <SectionCard icon={Snowflake} title="Equipment Rental">
          <p className="text-muted-foreground mb-4">
            Three main rental shops operate in Levi: Zero Point (at the slopes), South Point (southern slopes) and HILL Ski Rent (front slopes). Elan Ski Shop in the centre also rents gear.
          </p>
          <PriceTable
            headers={["Equipment", "1 day", "3 days", "6 days"]}
            rows={[
              ["Downhill Standard (skis + boots + poles)", "~€35–45", "~€85–110", "~€145–180"],
              ["Downhill Superior", "~€50–60", "~€120–150", "~€200–250"],
              ["Snowboard set", "~€40–55", "~€100–135", "~€170–220"],
              ["Cross-country Standard", "~€25–35", "~€60–80", "~€100–140"],
              ["Helmet", "~€8–12", "~€18–25", "~€30–40"],
              ["Snowshoes", "~€20–30", "~€45–60", "~€75–100"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Prices vary by shop and equipment quality. Book online in advance for ~10% discount. Bring photo ID (passport or ID card) when picking up rentals.
          </p>
          <TipBox>
            <strong>Money-saving tip:</strong> Multi-day rentals are significantly cheaper per day than single-day rentals. A 6-day rental is much better value than six separate daily rentals.
          </TipBox>
        </SectionCard>

        {/* Section 3: Restaurants & Dining */}
        <SectionCard icon={UtensilsCrossed} title="Restaurants & Dining">
          <p className="text-muted-foreground mb-4">
            Levi has over 60 restaurants. Prices are typical for a Finnish ski resort — noticeably cheaper than the Alps, but higher than Central European cities. Alcohol is taxed heavily in Finland, so drinks are more expensive.
          </p>
          <PriceTable
            headers={["Item", "Price Range"]}
            rows={[
              ["Main course (restaurant)", "€20–35"],
              ["Pizza", "€14–20"],
              ["Burger", "€15–22"],
              ["Reindeer (fine dining)", "€28–42"],
              ["Lunch buffet", "€15–22"],
              ["Beer 0.5 l (restaurant)", "€7–10"],
              ["Glass of wine (12–16 cl)", "€8–12"],
              ["Wine bottle (restaurant)", "€35–60"],
              ["Coffee & pastry", "€5–8"],
              ["Pancake house", "€8–15"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Dinner for two with drinks typically costs €80–130. The cheapest options are Burger King or pizzerias. Top restaurants like Kekäle, Pihvipietti or Ämmilä should be booked in advance, especially during peak season.
          </p>
          <TipBox>
            <strong>Money-saving tip:</strong> A self-catering kitchen in your apartment or cabin saves significantly. Supermarkets have everything you need — even reindeer stew works great as a home-cooked meal!
          </TipBox>
          <Link to="/guide/restaurants-and-services-in-levi" className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-sm">
            Read more about restaurants in Levi →
          </Link>
        </SectionCard>

        {/* Section 4: Groceries */}
        <SectionCard icon={ShoppingCart} title="Groceries & Everyday Items">
          <p className="text-muted-foreground mb-4">
            Levi has two well-stocked supermarkets: K-Market Levi and S-Market. Both are open daily and surprisingly well-stocked for a small village. Prices are slightly higher than in southern Finland but not dramatically so.
          </p>
          <PriceTable
            headers={["Item", "Typical Price"]}
            rows={[
              ["Milk 1 l", "€1.20–1.60"],
              ["Bread", "€2–4"],
              ["Minced meat 400 g", "€4–6"],
              ["Reindeer meat 300 g", "€8–12"],
              ["Pasta 500 g", "€1–2"],
              ["Cheese 300 g", "€3–5"],
              ["Bananas 1 kg", "€1.50–2.50"],
              ["Beer 6-pack (supermarket)", "€8–14"],
              ["Wine bottle (Alko)", "€8–15"],
              ["Ready meal", "€4–7"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            <strong>Alcohol above 5.5% ABV</strong> is only sold at <strong>Alko</strong> — a state-run liquor store. In Levi, Alko is next to S-Market. Opening hours are limited (typically Mon–Fri 10–18, Sat 10–16, closed Sunday). Beer up to 5.5% is available in supermarkets.
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            K-Market and S-Market are Finland's two major supermarket chains. Both in Levi are well-stocked and open daily.
          </p>
          <TipBox>
            <strong>Money-saving tip:</strong> <em>Pantti</em> (deposit) — Cans and bottles have a refundable deposit (€0.15–0.40). Return them to the machines at the supermarket entrance to get your money back. Every euro counts in Levi!
          </TipBox>
        </SectionCard>

        {/* Section 5: Activity Prices */}
        <SectionCard icon={Dog} title="Activity Prices">
          <p className="text-muted-foreground mb-4">
            Activities are the highlight of a Levi holiday — but also the biggest expense. Prices vary between operators. Here are indicative prices for the most popular activities.
          </p>
          <PriceTable
            headers={["Activity", "Duration", "Adult", "Child (4–14)"]}
            rows={[
              ["Husky safari (self-driving, 5 km)", "~1.5 h", "€110–150", "€70–100"],
              ["Husky safari (long, 10 km)", "~2.5 h", "€160–220", "€100–150"],
              ["Reindeer ride (short)", "~1 h", "€60–90", "€40–60"],
              ["Snowmobile safari (2 h)", "~2–3 h", "€100–160", "€50–80 (in sled)"],
              ["Snowmobile safari (half day)", "~4–5 h", "€180–280", "€90–140"],
              ["Northern Lights safari (snowmobile)", "~3 h", "€120–180", "€70–100"],
              ["Snowshoeing", "~2–3 h", "€60–90", "€40–60"],
              ["Ice fishing", "~3 h", "€70–100", "€50–70"],
              ["Ice karting", "~15 min", "€30–50", "€20–35"],
              ["Gondola lift (return)", "~1 h", "€15", "€15"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Prices typically include equipment, transport and a guide. Snowmobile drivers must hold a valid driving licence (category B, A1 or A valid in Finland). Snowmobiles are shared by two people who take turns driving — solo driving costs extra. Insurance excess is typically €150–980 — you can usually reduce it for an additional €20.
          </p>
          <TipBox>
            <strong>Money-saving tip:</strong> Book activities directly with local operators, not through tour operators — you'll easily save 20–30%. Small family businesses often offer more personal service and smaller group sizes.
          </TipBox>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link to="/activities/husky-safari-levi" className="text-accent hover:underline font-medium text-sm">
              Read more about husky safaris →
            </Link>
            <Link to="/activities/snowmobile-safari-tips-levi" className="text-accent hover:underline font-medium text-sm">
              Read more about snowmobile safaris →
            </Link>
          </div>
        </SectionCard>

        {/* Section 6: Getting Around */}
        <SectionCard icon={Bus} title="Getting Around & Transport">
          <p className="text-muted-foreground mb-4">
            Levi centre is compact and walkable. If you're staying by the slopes, you can walk straight to the lifts. Those staying further away will need the Ski Bus, a taxi or a rental car.
          </p>
          <PriceTable
            headers={["Transport", "Price"]}
            rows={[
              ["Ski Bus (day pass, with ski pass)", "€3"],
              ["Ski Bus (day pass, without ski pass)", "€4"],
              ["Ski Bus (one-way, on bus)", "€4"],
              ["Ski Bus (season pass)", "€43.50"],
              ["Airport bus (Kittilä–Levi)", "~€16 (return)"],
              ["Taxi (Kittilä–Levi)", "~€30–45"],
              ["Rental car (per day)", "~€50–100/day"],
              ["Fuel", "~€1.70–1.90/l"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Children under 6 ride the Ski Bus free with an adult. The bus runs two routes: R1 (north-east slopes, Hossa, Sirkka) and R2 (south slopes, South Point). Card payment only — no cash on the bus.
          </p>
          <Link to="/travel/how-to-get-to-levi-from-helsinki-and-abroad" className="text-accent hover:underline font-medium text-sm">
            Read more about getting to Levi →
          </Link>
        </SectionCard>

        {/* Section 7: Accommodation Prices */}
        <SectionCard icon={Home} title="Accommodation Prices">
          <p className="text-muted-foreground mb-4">
            Levi offers a wide range of accommodation: from hotels and spas to cabins and apartments. Prices vary significantly by season, location and amenities.
          </p>
          <PriceTable
            headers={["Accommodation Type", "Peak Season (Dec–Mar)", "Off-Peak"]}
            rows={[
              ["Hotel (standard room)", "€120–250/night", "€70–150/night"],
              ["Spa hotel", "€150–350/night", "€100–200/night"],
              ["Apartment (2–4 guests)", "€100–200/night", "€60–120/night"],
              ["Cabin (4–6 guests)", "€150–350/night", "€80–200/night"],
              ["Glass igloo", "€300–500/night", "usually unavailable"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Christmas–New Year is the most expensive week — prices can be 2–3× normal rates. Finnish school holiday weeks (weeks 8–10) are also popular. The cheapest times are January (polar night) and April (spring skiing).
          </p>
          <TipBox>
            <strong>Money-saving tip:</strong> An apartment or cabin with a self-catering kitchen saves hundreds of euros per week on restaurant bills. Book directly through Leville.net for the best rates.
          </TipBox>
          <Link to="/en/accommodations">
            <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
              View Leville.net Accommodations →
            </Button>
          </Link>
        </SectionCard>

        {/* Section 8: Sample Budgets */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <Euro className="w-6 h-6 text-accent" />
            Sample Budgets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Budget */}
            <Card className="bg-emerald-950/40 border-emerald-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Budget Holiday</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 people, 5 nights</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Apartment: €500</li>
                  <li>Ski pass 5 days × 2: €457</li>
                  <li>Equipment rental 5 days × 2: ~€400</li>
                  <li>Groceries: €200</li>
                  <li>2× restaurant dinners: €160</li>
                  <li>1× husky safari: €240</li>
                  <li>Ski Bus: €30</li>
                </ul>
                <div className="border-t border-emerald-700/30 pt-3">
                  <p className="text-lg font-bold text-emerald-400">~€1,990</p>
                  <p className="text-xs text-muted-foreground">€995/person</p>
                </div>
              </CardContent>
            </Card>

            {/* Family */}
            <Card className="bg-blue-950/40 border-blue-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Family Holiday</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 adults + 2 children, 6 nights</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Cabin: €1,200</li>
                  <li>Ski pass 6 days (family): ~€640</li>
                  <li>Equipment rental (family): ~€700</li>
                  <li>Groceries: €350</li>
                  <li>3× restaurant dinners: €400</li>
                  <li>Husky safari (family): €400</li>
                  <li>Snowmobile safari: €250</li>
                  <li>Transport: €100</li>
                </ul>
                <div className="border-t border-blue-700/30 pt-3">
                  <p className="text-lg font-bold text-blue-400">~€4,040</p>
                  <p className="text-xs text-muted-foreground">€1,010/person</p>
                </div>
              </CardContent>
            </Card>

            {/* Luxury */}
            <Card className="bg-amber-950/40 border-amber-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Luxury Experience</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 people, 5 nights</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Spa hotel / glass igloo: €1,500</li>
                  <li>Ski pass 5 days × 2: €457</li>
                  <li>Superior rental: €500</li>
                  <li>Dining out every evening: €600</li>
                  <li>Husky safari 10 km: €400</li>
                  <li>Snowmobile half day: €400</li>
                  <li>Northern Lights safari: €300</li>
                </ul>
                <div className="border-t border-amber-700/30 pt-3">
                  <p className="text-lg font-bold text-amber-400">~€4,160</p>
                  <p className="text-xs text-muted-foreground">€2,080/person</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section 9: FAQ */}
        <SectionCard icon={Info} title="Frequently Asked Questions">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-accent">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionCard>

        {/* Read Next */}
        <ReadNextSection
          links={[
            { title: "Accommodations in Levi", description: "Book an apartment or cabin in central Levi.", href: "/en/accommodations" },
            { title: "Restaurants & Services", description: "Local recommendations for dining.", href: "/guide/restaurants-and-services-in-levi" },
            { title: "How to Get to Levi", description: "Flights, trains and buses from Helsinki.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
          ]}
        />
      </main>

      <Footer lang="en" />
      <WhatsAppChat />
      <StickyBookingBar lang="en" />
    </div>
  );
};

export default PricesInLeviPage;
