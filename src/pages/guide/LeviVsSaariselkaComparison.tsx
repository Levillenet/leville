import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mountain, ArrowRight, Check, Heart, Lightbulb, MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import ReadNextSection from "@/components/guide/ReadNextSection";


import type { Language } from "@/translations";
import { routeConfig } from "@/translations";

interface LeviVsSaariselkaComparisonProps {
  lang?: Language;
}

const LeviVsSaariselkaComparison = ({ lang = "en" }: LeviVsSaariselkaComparisonProps) => {
  const location = useLocation();

  const localeMap: Record<string, string> = {
    en: "en_US", nl: "nl_NL", de: "de_DE", fr: "fr_FR", es: "es_ES", sv: "sv_SE"
  };

  const customUrls: Record<string, string> = {
    fi: "/opas/levi-vs-saariselka",
    en: "/guide/levi-vs-saariselka-comparison",
  };

  const breadcrumbItems = [
    { label: "Home", href: routeConfig.home[lang] || "/en" },
    { label: "Levi", href: routeConfig.levi[lang] || "/en/levi" },
    { label: "Levi vs. Saariselkä", href: "" },
  ];

  const faqItems = [
    {
      q: "How far apart are Levi and Saariselkä?",
      a: "About 260 km, roughly 3 hours by car. They can be combined on the same trip, but most travellers choose one or the other since they are served by different airports (Kittilä for Levi, Ivalo for Saariselkä).",
    },
    {
      q: "Which is better for families?",
      a: "Both are family-friendly, but Levi offers significantly more facilities: 10 free children's lifts, Leevilandia kids' area, LeviWaterWorld waterpark, Arcandia experience centre, and a wide range of activities. Saariselkä is quieter and suits families who value peace and nature.",
    },
    {
      q: "Which has better northern lights?",
      a: "Both are excellent for northern lights viewing. Saariselkä is slightly further north, but in practice the difference is small – both have minimal light pollution and great conditions from September to March.",
    },
    {
      q: "Is Saariselkä really the northernmost ski resort in Europe?",
      a: "Yes – Saariselkä Ski & Sport Resort markets itself as Europe's northernmost ski resort. The location is unique, but the resort is considerably smaller than Levi, Ylläs or Ruka.",
    },
    {
      q: "Can you reach Saariselkä by train?",
      a: "Not directly. The nearest train station is in Rovaniemi, from where Saariselkä is still about 260 km by bus. For Levi, the nearest station is Kolari (~1h transfer). Flying is the easiest option for both – Ivalo airport serves Saariselkä, Kittilä serves Levi.",
    },
  ];

  const leviHighlight = "bg-primary/5";

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={customUrls} />
      <Helmet>
        <html lang={lang} />
        <title>Levi vs. Saariselkä – Which Lapland Resort Is Right for You? | Leville.net</title>
        <meta name="description" content="Levi or Saariselkä? An honest comparison of two popular Finnish Lapland destinations. Slopes, trails, activities, atmosphere and accessibility." />
        <link rel="canonical" href="https://leville.net/guide/levi-vs-saariselka-comparison" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://leville.net/guide/levi-vs-saariselka-comparison" />
        <meta property="og:title" content="Levi vs. Saariselkä – Which Lapland Resort Is Right for You? | Leville.net" />
        <meta property="og:description" content="Levi or Saariselkä? An honest comparison of two popular Finnish Lapland destinations." />
        <meta property="og:locale" content={localeMap[lang] || "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Levi vs. Saariselkä – Which Lapland Resort Is Right for You? | Leville.net" />
        <meta name="twitter:description" content="Levi or Saariselkä? An honest comparison of two popular Finnish Lapland destinations." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Levi vs. Saariselkä – Lively resort village or peaceful wilderness?",
            description: "An honest comparison of two popular Finnish Lapland destinations.",
            author: { "@type": "Organization", name: "Leville.net" },
            publisher: { "@type": "Organization", name: "Leville.net" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Levi vs. Saariselkä – Lively Resort or Peaceful Wilderness?
              </h1>
              <p className="text-lg text-primary font-medium mb-4">
                An honest comparison of two different Lapland experiences
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Levi and Saariselkä are both popular Finnish Lapland destinations, but they offer very different experiences. Levi is Finland's largest and most versatile ski resort in a compact village. Saariselkä is Europe's northernmost ski resort at the gateway to Urho Kekkonen National Park – quieter, more traditional, and more wilderness-oriented. Both are excellent destinations, but for very different moods. This comparison helps you choose.
              </p>
            </section>

            {/* At a Glance */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">At a Glance – Two Different Vibes</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <Card className="border-2 border-primary shadow-lg glass-card">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mountain className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Levi – Versatile Resort Village</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Finland's largest ski resort: 43 slopes, 28 lifts",
                        "Compact village – everything within walking distance",
                        "Wide selection of restaurants, shops and services",
                        "Lively après-ski and nightlife",
                        "Waterpark, Arcandia, Ice Karting and more unique attractions",
                        "230 km of cross-country skiing trails",
                        "Multiple Santa Claus experiences and Christmas activities",
                        "15 min from Kittilä airport, 1h from Kolari train station",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-6 h-6 text-muted-foreground" />
                      <h3 className="text-xl font-bold text-foreground">Saariselkä – Traditional Wilderness Destination</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Europe's northernmost ski resort: 15 slopes, 6 lifts",
                        "Urho Kekkonen National Park right next door",
                        "Calm, traditional atmosphere",
                        "Excellent cross-country trails (~200 km)",
                        "Fewer services, but authentic wilderness experience",
                        "Gold panning history and Sámi culture",
                        "25 min from Ivalo airport, no train connection",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Skiing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Skiing and Winter Sports</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>
                        <div className="flex items-center gap-2">
                          Levi <Badge variant="default" className="text-[10px] px-1.5 py-0">Recommended</Badge>
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Saariselkä</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Slopes", "43", "15"],
                      ["Lifts", "28", "6"],
                      ["Vertical drop", "325 m", "180 m"],
                      ["Longest run", "2,500 m", "1,300 m"],
                      ["Gondola", "2", "No"],
                      ["Lit slopes", "20", "7"],
                      ["Snow park", "South Park, Junior South Park, Fun Park", "Snow park + Boardercross"],
                      ["FIS competitions", "World Cup annually", "No"],
                      ["Cross-country trails", "230 km", "~200 km"],
                      ["Season", "October–May", "November–May"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>
                          <span className={["Slopes", "Lifts", "Vertical drop", "Longest run"].includes(row[0]) ? "font-bold" : ""}>{row[1]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={["Slopes", "Lifts", "Vertical drop", "Longest run"].includes(row[0]) ? "font-bold" : ""}>{row[2]}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                For downhill skiing, Levi is significantly larger: nearly three times more slopes, two gondolas, and Finland's most modern lift system. Saariselkä's ski resort is smaller and well-suited for beginners and those who prefer a quieter experience – more advanced skiers may want more challenge after a few days. For cross-country skiing, both are excellent: Levi has slightly more trails, but Saariselkä's trail network runs through the stunning scenery of Urho Kekkonen National Park and is highly regarded among cross-country enthusiasts.
              </p>
            </section>

            {/* Nature and Atmosphere */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Nature and Atmosphere</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                This is perhaps the biggest difference between the two. Saariselkä is considerably calmer and more "Lappish" – from there you step directly into Urho Kekkonen National Park, whose stunning fell landscapes are renowned even internationally. If you're seeking silence, wilderness peace and traditional Lapland atmosphere, Saariselkä delivers more of that.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Levi, on the other hand, is a more developed resort where the atmosphere is livelier and the range of services wider. You can easily reach nature from Levi too – the fell landscape begins right at the village edge – but the village centre is more animated, especially in the evenings. Levi's strength is that everything is within walking distance: slopes, restaurants, shops and activities. Saariselkä's centre is smaller and more spread out.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">In short:</strong> Saariselkä is more of a traditional, peaceful Lapland nature destination. Levi is a more modern, versatile resort with more to do – but still surrounded by authentic fell wilderness.
              </p>
            </section>

            {/* Activities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Activities and Services</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Saariselkä</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Snowmobile safaris", "Wide selection, hundreds of km of trails", "Yes, trails into the wilderness"],
                      ["Husky safaris", "Multiple farms nearby", "Yes, multiple farms"],
                      ["Reindeer rides", "Yes, reindeer farms nearby", "Yes, traditional reindeer farms"],
                      ["National park", "Pallas-Yllästunturi NP (day trip)", "Urho Kekkonen NP right next door"],
                      ["Restaurants", "Dozens – fine dining, après-ski, fast food", "A few – cosy, smaller venues"],
                      ["Shops", "S-Market, K-Market, specialty shops", "Small selection of basic services"],
                      ["Nightlife / après-ski", "Lively (Hullu Poro Arena, Ihku, bars)", "Minimal"],
                      ["Waterpark", "LeviWaterWorld", "No"],
                      ["Unique attractions", "Arcandia, Ice Karting, Holiday Club Spa", "Aurora tobogganing, gold panning"],
                      ["Children's activities", "10 free lifts, Leevilandia, waterpark", "Family areas, peaceful activities"],
                      ["Santa experiences", "Multiple Christmas activities in season", "Limited selection"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Levi clearly offers more activities and a wider range of services. Traditional Lapland activities – husky safaris, reindeer rides, snowmobiling – are available at both, but Levi adds unique attractions like a waterpark, experience centre, and vibrant après-ski culture. Saariselkä's strength lies in nature experiences: Urho Kekkonen National Park is right next door, and the hiking opportunities are among Finland's best.
              </p>
            </section>

            {/* Accessibility */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Getting There</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Saariselkä</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Airport", "Kittilä (KTT), 15 min transfer", "Ivalo (IVL), 25 min transfer"],
                      ["Flights", "Multiple daily (Helsinki), seasonal intl.", "Multiple daily (Helsinki), seasonal intl."],
                      ["Train", "Kolari, ~1h bus/taxi transfer", "No train connection (nearest: Rovaniemi, ~260 km)"],
                      ["By car from Helsinki", "~1,100 km, ~13h", "~1,150 km, ~14h"],
                      ["Car-free?", "Yes, excellent without a car", "Village centre yes, national park needs own transport"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Both have an airport nearby, making access easy by air. The main difference is the train connection: Levi's nearest station is Kolari (~1h away), while Saariselkä has no practical train connection at all – the nearest station is Rovaniemi, about 260 km away. Saariselkä is located in north-eastern Lapland, far from any railway, which makes it slightly harder to reach for those who prefer not to fly.
              </p>
            </section>

            {/* Northern Lights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Northern Lights</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Both are excellent spots for northern lights viewing. Saariselkä is slightly further north (about 340 km above the Arctic Circle vs. Levi's 170 km), but in practice the difference is small – both have minimal light pollution and the aurora is often visible directly from your accommodation. The northern lights season runs from September to March at both destinations.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  🌌 <strong className="text-foreground">Read more:</strong> See our comprehensive guide to viewing and photographing the northern lights in Levi.{" "}
                  <Link to="/en/northern-lights" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                    Northern lights in Levi <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </section>

            {/* Which to choose */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Which Should You Choose?</h2>
              <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-start">
                <Card className="md:col-span-3 border-2 border-primary shadow-lg relative glass-card">
                  <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground">
                    <Heart className="w-3 h-3 mr-1" /> Our recommendation
                  </Badge>
                  <CardContent className="pt-8 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Choose Levi if:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Skiing is an important part of your holiday – Levi has Finland's largest ski resort",
                        "You want a versatile resort: restaurants, après-ski, activities, spa",
                        "You're travelling with family and want plenty to do for children",
                        "You want all services within walking distance, no car needed",
                        "Après-ski and nightlife appeal to you",
                        "You want more choice in accommodation, dining and activities",
                        "Christmas atmosphere and Santa experiences interest you",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Choose Saariselkä if:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "You're seeking peace, silence and authentic wilderness atmosphere",
                        "You want to hike or ski in Urho Kekkonen National Park",
                        "A smaller, calmer ski resort is enough (great for beginners)",
                        "You prefer traditional Lapland charm over a commercial resort",
                        "Cross-country skiing in stunning national park scenery is your main goal",
                        "You want to experience north-eastern Lapland and the Inari region's culture",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <p className="text-muted-foreground mt-6 text-sm leading-relaxed text-center max-w-3xl mx-auto">
                Both are excellent Lapland destinations, and the choice depends on what you're looking for. Saariselkä is calmer and more wilderness-oriented – a great choice for those who want to disconnect from everything. Levi offers more to do, better skiing and more comprehensive services – it's a complete resort where winter sports, activities and atmosphere come together. We recommend Levi – and we're happy to help you find accommodation.
              </p>
            </section>

            {/* Personal insight */}
            <section className="mb-12">
              <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">A Local's Perspective</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        I've been to both several times and like both for different reasons. It really depends on your preferences.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Saariselkä is much calmer and has a more remote feel, located in north-eastern Lapland far from train tracks for example. The scenery of Urho Kekkonen National Park is really beautiful. They have excellent cross-country skiing tracks (which I appreciate) but for downhill skiing the resort is quite small. Good for beginners but advanced skiers might get bored after a while.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Levi is a bigger and more lively resort and the preferred choice for people who want après-ski and nightlife, even though you can also stay there without hardly noticing it. It has more different kinds of attractions (Waterworld, Arcandia, Ice Karting...), shops and restaurants, and the ski resort is much bigger. Levi also has more options to visit Santa.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        For activities like huskies, reindeer and snowmobiling, you can do them in both. Hope this helps! 😊
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Read next */}
            <ReadNextSection
              title="Read Next"
              links={[
                { title: "Levi vs. Rovaniemi", desc: "Compare Levi with Lapland's capital city", href: "/guide/levi-vs-rovaniemi-comparison" },
                { title: "Levi vs. Ylläs vs. Ruka", desc: "Compare Finland's three biggest ski resorts", href: "/guide/levi-vs-yllas-vs-ruka-comparison" },
                { title: "How to Get to Levi", desc: "Flights, trains and driving routes", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                { title: "Skiing in Levi", desc: "Complete guide to slopes, lifts and ski passes", href: "/guide/skiing-in-levi" },
              ]}
            />

            {/* CTA */}
            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to={routeConfig.levi[lang] || "/en/levi"}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Levi Guide
                </Link>
              </Button>
              <Button asChild>
                <Link to={routeConfig.accommodations[lang] || "/en/accommodations"}>
                  Book Accommodation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </section>
          </div>
        </main>

        <PageCTA lang={lang} />

        <Footer />
        <WhatsAppChat />
        <StickyBookingBar />
      </div>
    </>
  );
};

export default LeviVsSaariselkaComparison;
