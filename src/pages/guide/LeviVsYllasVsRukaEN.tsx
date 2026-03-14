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
  ArrowRight, Check, Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";

import type { Language } from "@/translations";
import { routeConfig } from "@/translations";

interface LeviVsYllasVsRukaENProps {
  lang?: Language;
}

const LeviVsYllasVsRukaEN = ({ lang = "en" }: LeviVsYllasVsRukaENProps) => {
  const location = useLocation();

  const localeMap: Record<string, string> = {
    en: "en_US", nl: "nl_NL", de: "de_DE", fr: "fr_FR", es: "es_ES", sv: "sv_SE"
  };

  const customUrls: Record<string, string> = {
    fi: "/opas/levi-vs-yllas-vs-ruka",
    en: "/guide/levi-vs-yllas-vs-ruka-comparison",
    nl: "/nl/gids/levi-vs-yllas-vs-ruka",
    de: "/de/guide/levi-vs-yllas-vs-ruka",
    fr: "/fr/guide/levi-vs-yllas-vs-ruka",
    es: "/es/guia/levi-vs-yllas-vs-ruka",
  };

  const breadcrumbItems = [
    { label: lang === "nl" ? "Home" : lang === "de" ? "Startseite" : lang === "fr" ? "Accueil" : lang === "es" ? "Inicio" : "Home", href: routeConfig.home[lang] || "/en" },
    { label: "Levi", href: routeConfig.levi[lang] || "/en/levi" },
    { label: "Levi vs. Ylläs vs. Ruka", href: "" },
  ];

  const faqItems = [
    {
      q: "How far apart are Levi, Ylläs and Ruka?",
      a: "Levi and Ylläs are about 55 km apart (45–55 minutes by car). Ruka is in Kuusamo, about 350 km from Levi. Day trips between Levi and Ylläs are easy, but combining Ruka with the others requires a longer transfer.",
    },
    {
      q: "Is Ruka in Lapland?",
      a: "Officially no – Ruka is in Kuusamo, part of North Ostrobothnia. However, Ruka is very Lappish in atmosphere, nature and conditions: fells, northern lights, polar nights and plenty of snow. For most travellers, the difference is mainly administrative.",
    },
    {
      q: "Which is best for families with children?",
      a: "All three suit families, but Levi offers clearly the most supplementary services and activities for children, with everything within walking distance – making daily life easiest with kids. Levi also offers 10 free children's lifts.",
    },
    {
      q: "Which is most affordable?",
      a: "Price levels are very similar. Levi and Ruka's wider accommodation selection makes affordable options easier to find. For drivers, Ruka is cheapest in travel costs. At Levi, you save by not needing a rental car.",
    },
    {
      q: "Can I visit multiple resorts on the same holiday?",
      a: "Day trips between Levi and Ylläs are easy (45 min by car). We recommend Levi as your base – from there you can easily visit Ylläs and return to Levi's full services in the evening.",
    },
  ];

  const leviHighlight = "bg-primary/5";

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={customUrls} />
      <Helmet>
        <html lang={lang} />
        <title>Levi vs. Ylläs vs. Ruka – Honest Comparison 2026 | Slopes, Lifts & Services | Leville.net</title>
        <meta name="description" content="Levi, Ylläs or Ruka? An honest local comparison of Finland's three biggest ski resorts – slopes, lifts, cross-country trails, services, atmosphere and prices." />
        <link rel="canonical" href="https://leville.net/guide/levi-vs-yllas-vs-ruka-comparison" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://leville.net${customUrls[lang] || customUrls.en}`} />
        <meta property="og:title" content="Levi vs. Ylläs vs. Ruka – Honest Comparison 2026 | Leville.net" />
        <meta property="og:description" content="Levi, Ylläs or Ruka? An honest local comparison of Finland's three biggest ski resorts – slopes, lifts, cross-country trails, services, atmosphere and prices." />
        <meta property="og:locale" content={localeMap[lang] || "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Levi vs. Ylläs vs. Ruka – Honest Comparison 2026 | Leville.net" />
        <meta name="twitter:description" content="Levi, Ylläs or Ruka? An honest local comparison of Finland's three biggest ski resorts – slopes, lifts, cross-country trails, services, atmosphere and prices." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Levi vs. Ylläs vs. Ruka – Which Ski Resort Is Right for You?",
            description: "Levi, Ylläs or Ruka? An honest local comparison of Finland's three biggest ski resorts.",
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
        <Breadcrumbs lang={lang} items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Levi vs. Ylläs vs. Ruka – Which Ski Resort Is Right for You?
              </h1>
              <p className="text-lg text-primary font-medium mb-4">
                An honest local comparison of Finland's three biggest ski resorts
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Levi, Ylläs and Ruka are Finland's three largest and most popular ski resorts. Levi and Ylläs are located in Lapland, just 55 km apart, while Ruka is in Kuusamo – technically in the North Ostrobothnia region rather than Lapland, but very Lappish in atmosphere and nature. All three offer excellent conditions, but they differ significantly in atmosphere, services and terrain. In this comparison, we break down which one might suit your holiday best. We are locals and know all three resorts well.
              </p>
            </section>

            {/* Slopes & Downhill Skiing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Slopes & Downhill Skiing</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>
                        <div className="flex items-center gap-2">
                          Levi <Badge variant="default" className="text-[10px] px-1.5 py-0">Our pick</Badge>
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Slopes", "43", "63", "41"],
                      ["Lifts", "28", "29", "22"],
                      ["Vertical drop", "325 m", "463 m", "201 m"],
                      ["Longest run", "2,500 m", "3,000 m", "1,300 m"],
                      ["Gondola", "2 (Levi Black, Gondoli 2000)", "1 (Ylläs Express)", "1 (Village-2-Valley)"],
                      ["Modern lift technology", "Multiple 6-seat Doppelmayer D-Line chairlifts with heated seats and weather shields. New chairlift summer 2026.", "Chairlifts and older T-bar lifts", "8-seat Masto Express (Finland's fastest, 6 m/s)"],
                      ["Snow park", "South Park, Junior South Park, Fun Park", "Yes", "Ruka Park (FIS-rated), Ruka Park Junior"],
                      ["World Cup venue", "FIS Alpine Ski World Cup every November", "No", "FIS Freestyle World Cup"],
                      ["Investments", "Over €64M in recent years", "Significant", "€14M Masto Express (2023)"],
                      ["Difficulty profile", "Evenly distributed", "More challenging and longer runs", "41% blue, 43% red, 16% black"],
                      ["Season", "October–May", "November–May", "October–May"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>
                          <span className={["Slopes", "Lifts", "Vertical drop", "Longest run"].includes(row[0]) ? "font-bold" : ""}>{row[1]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={["Slopes", "Lifts", "Vertical drop", "Longest run"].includes(row[0]) ? "font-bold" : ""}>{row[2]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={["Slopes", "Lifts", "Vertical drop", "Longest run"].includes(row[0]) ? "font-bold" : ""}>{row[3]}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Ylläs has the most slopes and greatest vertical drop by the numbers. However, numbers don't tell the whole story of your skiing experience. Levi has Finland's most modern lift and snowmaking infrastructure: over €64 million invested in recent years has brought state-of-the-art Doppelmayer D-Line chairlifts with heated seats and weather shields, world-class automated snowmaking and LED slope lighting. In practice, this means Levi's slopes are in better condition, lifts are faster and more comfortable, and slopes stay open in windy conditions better than at Ylläs, where wind closures on the exposed fell top are more common. A new modern chairlift is being built on the South Slopes in summer 2026, extending the network of high-speed lifts to all sides of the fell. Levi is also the only ski resort in Finland hosting FIS Alpine Ski World Cup races annually – this guarantees competition-level slope maintenance every day.
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Ylläs is excellent for advanced skiers, but many of its lifts are still older T-bar technology, and services are split across two sides of the fell, adding transfer time. Ruka's vertical drop is only 201 metres – roughly half of Levi's – and the longest run is 1,300 metres. A ski day's variety is more limited than at Levi or Ylläs. Ruka compensates with superb slope maintenance and a long season, but if skiing is the main purpose of your holiday, Levi or Ylläs offer significantly more.
              </p>
            </section>

            {/* Cross-Country Skiing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Cross-Country Skiing & Trails</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[180px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Trail kilometres", "230 km", "330 km", "500+ km (Kuusamo area)"],
                      ["Lit trails", "Yes, several", "Yes, several", "16 km"],
                      ["Fell trails", "Yes", "Particularly renowned", "Varied terrain"],
                      ["Trail profile", "Diverse, including easy trails", "Long fell trails, more demanding", "Diverse, efficient snowmaking"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}><span className={row[0] === "Trail kilometres" ? "font-bold" : ""}>{row[1]}</span></TableCell>
                        <TableCell><span className={row[0] === "Trail kilometres" ? "font-bold" : ""}>{row[2]}</span></TableCell>
                        <TableCell><span className={row[0] === "Trail kilometres" ? "font-bold" : ""}>{row[3]}</span></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Ylläs is traditionally Finland's top destination for cross-country skiers, especially for fell trail scenery. Ruka's Kuusamo area trail network is the most extensive at over 500 km. Levi's trail network is diverse and easily accessible from the centre – including challenging fell trails and easy lit loops for beginners. If cross-country skiing is your main purpose, Ylläs or Ruka are more specialised choices, but at Levi you get great trails plus everything else within walking distance.
              </p>
            </section>

            {/* Services & Atmosphere */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Services & Atmosphere</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[180px] ${leviHighlight}`}>
                        <div className="flex items-center gap-2">
                          Levi <Badge variant="default" className="text-[10px] px-1.5 py-0">Our pick</Badge>
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Restaurants", "Many, very diverse", "Fewer but quality", "Diverse (15+ in village)"],
                      ["Après-ski", "Lively, several venues", "Quiet", "Lively but smaller than Levi"],
                      ["Shops", "S-Market, K-Market, specialty shops", "Smaller selection", "Shopping Centre Kumpare"],
                      ["Nightlife", "Active – bars and clubs", "Very quiet", "Active in peak season"],
                      ["Spa", "Levi Hotel Spa (at the slopes)", "No comparable", "Kuusamo Tropiikki (8 km away)"],
                      ["Village structure", "Compact centre at base of slopes – everything walkable", "Split between two villages – car needed", "Pedestrian village, compact but small"],
                      ["Without a car?", "Yes, easily", "Practically need a car", "Reasonably (SkiBus)"],
                      ["Overall atmosphere", "Lively, full-service alpine village", "Peaceful and nature-oriented", "Compact alpine village"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                        <TableCell>{row[3]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                In terms of services and atmosphere, Levi is clearly in a league of its own. In Levi's centre, everything is within walking distance: dozens of restaurants, shops, rental outlets, après-ski venues and a spa – all right at the base of the slopes. Ruka's pedestrian village is pleasant and compact, but its service offering is substantially smaller than Levi's. Ylläs services are split between two separate villages (Äkäslompolo and Ylläsjärvi) on opposite sides of the fell, which means you practically need a car to move between them. If you want a destination where you can park the car and handle everything on foot, Levi is the standout choice.
              </p>
            </section>

            {/* Activities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Activities Beyond the Slopes</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[180px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Snowmobile safaris", "Extensive, hundreds of km of routes", "Yes", "Yes, ~40 safari operators"],
                      ["Husky safaris", "Yes, several farms", "Yes", "Yes"],
                      ["Reindeer rides", "Yes", "Yes", "Yes"],
                      ["Spa", "Levi Hotel Spa (at the slopes)", "No", "Kuusamo Tropiikki (8 km)"],
                      ["Northern lights tours", "Yes, wide selection", "Yes", "Yes"],
                      ["Summer activities", "Bike park, summer sled track, golf, hiking, fishing", "Hiking, cycling", "Bike park, summer sled, Ruka Coaster, white water rafting"],
                      ["Nearby national parks", "Pallas-Yllästunturi NP (by car)", "Pallas-Yllästunturi NP (adjacent)", "Oulanka NP & Karhunkierros (adjacent)"],
                      ["Activity range", "Widest in Lapland", "Good but narrower", "Good, especially nature tourism"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                        <TableCell>{row[3]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                For activity variety, Levi is unmatched – it offers Lapland's widest selection, from snowmobile safaris and husky rides to reindeer experiences and spa days. Everything is easily accessible from the centre. Ruka's unique strength is nature tourism: Oulanka National Park and the legendary 80 km Karhunkierros hiking trail are right next door. Ylläs offers tranquillity and direct access to Pallas-Yllästunturi National Park. If you want a versatile holiday where skiing and activities combine effortlessly, Levi is the best choice.
              </p>
            </section>

            {/* Getting There */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Getting There</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[180px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Nearest airport", "Kittilä (KTT), 15 min", "Kittilä (KTT), 40 min", "Kuusamo (KAO), 25 min"],
                      ["Direct international flights", "Yes (seasonal)", "Via Kittilä", "Yes (Düsseldorf, Frankfurt, Zürich)"],
                      ["Train connection", "Kolari, ~1h transfer", "Kolari, ~45 min", "No direct (Oulu 3h + bus)"],
                      ["By car from Helsinki", "~1,100 km, ~13h", "~1,050 km, ~12.5h", "~800 km, ~9.5h"],
                      ["Without a car?", "Yes", "Practically no", "Reasonably"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                        <TableCell>{row[3]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Levi is closest to the airport – just a 15-minute drive from Kittilä. This is a major practical advantage, especially on shorter breaks: you can be at your accommodation within half an hour of landing. And since Levi's centre is compact, you don't need a car at all. Ruka is quicker to reach by car from southern Finland (800 km vs. 1,100 km), but by air the travel time is practically the same. Ylläs has the longest airport transfer (40 min), and the split village layout means a car is almost essential.
              </p>
            </section>

            {/* Price Level */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Price Level</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Price levels are quite similar across all three resorts – there is no significant difference in lift pass prices. In accommodation, Levi offers the widest selection at different price points: studios and apartments in the centre are often more affordable than hotels, and competition keeps prices reasonable. Ruka also has diverse accommodation, while Ylläs has a smaller selection. Restaurant prices are typical of northern Finland at all three. For those driving from southern Finland, Ruka is the most affordable in travel costs. At Levi, you can save on car rental costs entirely since you can manage without one.
              </p>
            </section>

            {/* Which to choose */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">So Which Should You Choose?</h2>
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-start">
                {/* Levi card */}
                <Card className="md:col-span-1 border-2 border-primary shadow-lg relative glass-card md:scale-105 md:-my-2">
                  <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground">
                    <Heart className="w-3 h-3 mr-1" /> Our recommendation
                  </Badge>
                  <CardContent className="pt-8 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Choose Levi if:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "You want a full-service holiday where everything is within walking distance",
                        "You appreciate Finland's most modern lift system – two gondolas and state-of-the-art chairlifts with heated seats",
                        "You are travelling with family and need activities for everyone beyond the slopes",
                        "Après-ski and restaurants are an important part of your holiday",
                        "You want the shortest airport transfer (15 min) and can manage without a car",
                        "You want Lapland's widest range of activities",
                        "You want World Cup-level slope maintenance and snow reliability from start to finish",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Ylläs card */}
                <Card className="glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Choose Ylläs if:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Skiing or cross-country skiing is the absolute main purpose and you want Finland's longest slopes and biggest vertical",
                        "You value peace, quiet and closeness to nature above all else",
                        "You don't need lively nightlife or wide service selection",
                        "You're an experienced skier and simpler lifts are fine",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Ruka card */}
                <Card className="glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Choose Ruka if:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "You're driving from southern or central Finland and want a shorter journey",
                        "You want to combine skiing with nature tourism – Oulanka NP and Karhunkierros are next door",
                        "You appreciate a compact village atmosphere but on a smaller scale than Levi",
                        "You don't necessarily need \"official\" Lapland but want the Lappish feel",
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
                All three are great destinations – but if you want the best overall holiday combining great slopes, modern lifts, the widest services and easy accessibility, Levi is hard to beat. Levi and Ylläs are just an hour's drive apart, so on a longer holiday you can always make a day trip to test Ylläs's long runs. We recommend Levi as your base – and we're happy to help you find the right accommodation.
              </p>
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

            {/* Read Next */}
            {(() => {
              const readNextTranslations: Record<string, { title: string; links: { title: string; desc: string; href: string }[] }> = {
                en: {
                  title: "Read Next",
                  links: [
                    { title: "Levi vs Rovaniemi", desc: "How Levi compares to Rovaniemi", href: "/guide/levi-vs-rovaniemi-comparison" },
                    { title: "Skiing in Levi", desc: "43 slopes and 28 lifts", href: "/guide/skiing-in-levi" },
                    { title: "How to Get to Levi", desc: "Flights, trains and driving", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Accommodations", desc: "Book your stay in Levi", href: "/en/accommodations" },
                  ],
                },
                nl: {
                  title: "Lees ook",
                  links: [
                    { title: "Levi vs Rovaniemi", desc: "Hoe Levi zich verhoudt tot Rovaniemi", href: "/nl/gids/levi-vs-rovaniemi" },
                    { title: "Skiën in Levi", desc: "43 pistes en 28 liften", href: "/guide/skiing-in-levi" },
                    { title: "Hoe kom je in Levi", desc: "Vluchten, treinen en autorijden", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Accommodaties", desc: "Boek je verblijf in Levi", href: "/nl/accommodaties" },
                  ],
                },
                de: {
                  title: "Weiterlesen",
                  links: [
                    { title: "Levi vs Rovaniemi", desc: "Wie sich Levi mit Rovaniemi vergleicht", href: "/de/guide/levi-vs-rovaniemi" },
                    { title: "Skifahren in Levi", desc: "43 Pisten und 28 Lifte", href: "/guide/skiing-in-levi" },
                    { title: "Anreise nach Levi", desc: "Flüge, Züge und Autofahrt", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Unterkünfte", desc: "Buchen Sie Ihren Aufenthalt in Levi", href: "/de/unterkuenfte" },
                  ],
                },
                fr: {
                  title: "À lire aussi",
                  links: [
                    { title: "Levi vs Rovaniemi", desc: "Comment Levi se compare à Rovaniemi", href: "/fr/guide/levi-vs-rovaniemi" },
                    { title: "Ski à Levi", desc: "43 pistes et 28 remontées", href: "/guide/skiing-in-levi" },
                    { title: "Comment aller à Levi", desc: "Vols, trains et conduite", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Hébergements", desc: "Réservez votre séjour à Levi", href: "/fr/hebergements" },
                  ],
                },
                es: {
                  title: "Lee también",
                  links: [
                    { title: "Levi vs Rovaniemi", desc: "Cómo se compara Levi con Rovaniemi", href: "/es/guia/levi-vs-rovaniemi" },
                    { title: "Esquí en Levi", desc: "43 pistas y 28 remontes", href: "/guide/skiing-in-levi" },
                    { title: "Cómo llegar a Levi", desc: "Vuelos, trenes y conducción", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Alojamientos", desc: "Reserva tu estancia en Levi", href: "/es/alojamientos" },
                  ],
                },
              };
              const rn = readNextTranslations[lang] || readNextTranslations.en;
              return <><GuideDisclaimer lang={lang} /><ReadNextSection title={rn.title} links={rn.links} /></>;
            })()}

            {/* CTA */}
            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to={routeConfig.levi[lang] || "/en/levi"}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Levi Travel Guide
                </Link>
              </Button>
              <Button asChild>
                <Link to={routeConfig.accommodations[lang] || "/en/accommodations"}>
                  Book accommodation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </section>
          </div>
        </main>

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default LeviVsYllasVsRukaEN;