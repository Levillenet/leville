import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
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
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";

import type { Language } from "@/translations";
import { routeConfig } from "@/translations";

interface LeviVsRovaniemiComparisonProps {
  lang?: Language;
}

const LeviVsRovaniemiComparison = ({ lang = "en" }: LeviVsRovaniemiComparisonProps) => {
  const location = useLocation();

  const localeMap: Record<string, string> = {
    en: "en_US", nl: "nl_NL", de: "de_DE", fr: "fr_FR", es: "es_ES", sv: "sv_SE"
  };

  const customUrls: Record<string, string> = {
    fi: "/opas/levi-vs-rovaniemi",
    en: "/guide/levi-vs-rovaniemi-comparison",
    nl: "/nl/gids/levi-vs-rovaniemi",
    de: "/de/guide/levi-vs-rovaniemi",
    fr: "/fr/guide/levi-vs-rovaniemi",
    es: "/es/guia/levi-vs-rovaniemi",
  };

  const breadcrumbItems = [
    { label: lang === "nl" ? "Home" : lang === "de" ? "Startseite" : lang === "fr" ? "Accueil" : lang === "es" ? "Inicio" : "Home", href: routeConfig.home[lang] || "/en" },
    { label: "Levi", href: routeConfig.levi[lang] || "/en/levi" },
    { label: "Levi vs. Rovaniemi", href: "" },
  ];

  const faqItems = [
    {
      q: "How far apart are Levi and Rovaniemi?",
      a: "About 170 km, approximately 2 hours by car. Daily bus connections run between them. Many travellers combine both: fly to Rovaniemi, visit Santa Claus Village, then continue to Levi for the rest of the holiday.",
    },
    {
      q: "Can you meet Santa Claus in Levi?",
      a: "Yes! The Levi area offers several Santa Claus experiences, especially during the Christmas season. The experience is often more intimate and peaceful than at Rovaniemi's busy Santa Claus Village.",
    },
    {
      q: "Which has better northern lights?",
      a: "Levi has a clear advantage: the village is located 170 km north of the Arctic Circle, and minimal light pollution means northern lights are often visible directly from your accommodation. In Rovaniemi, city lights reduce visibility.",
    },
    {
      q: "Can skiing in Rovaniemi compare to Levi?",
      a: "Not really. Ounasvaara is a pleasant small local hill (10 slopes, 140 m vertical), but Levi is in a different league: 43 slopes, 325 m vertical, two gondolas and Finland's most modern lift system. If skiing matters, Levi is the only real choice.",
    },
    {
      q: "How do I combine Rovaniemi and Levi on the same trip?",
      a: "The easiest way: fly to Rovaniemi, spend a day at Santa Claus Village, then drive or take a bus to Levi (2h). You can also fly directly to Levi via Kittilä. Another option: fly to Kittilä, holiday in Levi, and make a day trip to Rovaniemi.",
    },
  ];

  const leviHighlight = "bg-primary/5";

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={customUrls} />
      <Helmet>
        <html lang={lang} />
        <title>Levi vs. Rovaniemi – Which Lapland Destination Is Right for You? | Leville.net</title>
        <meta name="description" content="Levi or Rovaniemi? An honest comparison of a Lapland fell village and the capital of Lapland. Skiing, activities, Santa Claus, northern lights, services and prices." />
        <link rel="canonical" href="https://leville.net/guide/levi-vs-rovaniemi-comparison" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://leville.net${customUrls[lang] || customUrls.en}`} />
        <meta property="og:title" content="Levi vs. Rovaniemi – Which Lapland Destination Is Right for You? | Leville.net" />
        <meta property="og:description" content="Levi or Rovaniemi? An honest comparison of a Lapland fell village and the capital of Lapland." />
        <meta property="og:locale" content={localeMap[lang] || "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content="Levi ski resort in Finnish Lapland" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Levi vs. Rovaniemi – Which Lapland Destination Is Right for You? | Leville.net" />
        <meta name="twitter:description" content="Levi or Rovaniemi? An honest comparison of a Lapland fell village and the capital of Lapland." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content="Levi ski resort in Finnish Lapland" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Levi vs. Rovaniemi – Fell Village or the Capital of Lapland?",
            description: "Levi or Rovaniemi? An honest comparison of a Lapland fell village and the capital of Lapland.",
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
      <JsonLd data={getWebsiteSchema()} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Levi vs. Rovaniemi – Fell Village or the Capital of Lapland?
              </h1>
              <p className="text-lg text-primary font-medium mb-4">
                An honest comparison of two very different Lapland experiences
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Levi and Rovaniemi are both popular Lapland destinations, but they offer very different experiences. Levi is a fell village in Kittilä, built at the base of Levi Fell – a place of snow, nature and ski resort life. Rovaniemi is the capital of Lapland near the Arctic Circle, known especially for Santa Claus Village and its city services. Both are excellent destinations, but for entirely different things. In this comparison, we help you choose which one suits your holiday.
              </p>
            </section>

            {/* At a Glance */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">At a Glance – Two Different Worlds</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <Card className="border-2 border-primary shadow-lg glass-card">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mountain className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Levi – Fell Village</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "A real ski resort at the base of Levi Fell",
                        "43 slopes, 28 lifts, 230 km of cross-country trails",
                        "Excellent snow reliability – ski season from October to May, natural snow by December",
                        "Compact centre, everything within walking distance",
                        "Fell nature, silence, northern lights",
                        "Snowmobile safaris, huskies, reindeer, spa – all on site",
                        "Santa Claus experiences, elf village and Christmas activities for the whole family",
                        "15 min from Kittilä Airport",
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
                      <h3 className="text-xl font-bold text-foreground">Rovaniemi – Capital of Lapland</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "City (65,000 residents) near the Arctic Circle",
                        "Santa Claus Village – world famous",
                        "Ounasvaara local ski area: 10 slopes, 140 m vertical drop",
                        "Arktikum museum, city services, restaurants",
                        "Own airport and railway station in the centre",
                        "Good base for a Lapland road trip",
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
              <h2 className="text-2xl font-bold text-foreground mb-6">Skiing & Winter Sports</h2>
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
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi (Ounasvaara)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Slopes", "43", "10"],
                      ["Lifts", "28", "5"],
                      ["Vertical drop", "325 m", "140 m"],
                      ["Longest run", "2,500 m", "600 m"],
                      ["Gondola", "2", "No"],
                      ["Modern chairlifts", "Multiple Doppelmayer D-Line (heated seats, weather shields)", "1 chairlift"],
                      ["Snow park", "South Park, Junior South Park, Fun Park", "Snow Park (small)"],
                      ["World Cup venue", "FIS Alpine Ski World Cup annually", "No"],
                      ["Cross-country trails", "230 km", "~80 km"],
                      ["Season", "October–May (machine-made snow from Oct, natural snow from Dec)", "November–April"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>
                          <span className={["Slopes", "Lifts", "Vertical drop", "Longest run", "Cross-country trails"].includes(row[0]) ? "font-bold" : ""}>{row[1]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={["Slopes", "Lifts", "Vertical drop", "Longest run", "Cross-country trails"].includes(row[0]) ? "font-bold" : ""}>{row[2]}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                In skiing, this is not even a comparison. Levi is Finland's largest ski resort with 43 slopes, two gondolas and over €64 million in recent lift investments. Ounasvaara in Rovaniemi is a pleasant small local hill with 10 slopes and a 140-metre vertical drop – great for beginners and locals, but not a ski holiday destination. If skiing or cross-country skiing is part of your holiday, the choice is clear: Levi.
              </p>
            </section>

            {/* Snow Depth & Reliability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Snow Depth & Snow Reliability</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Levi's location 170 km north of the Arctic Circle means a longer and more snow-reliable winter than Rovaniemi. The ski season and cross-country trails open in Levi as early as October with machine-made snow, and natural snow typically arrives by early December. Snow stays until May. Snow depth peaks at 80–100 centimetres, ensuring excellent conditions throughout the long season.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Rovaniemi sits near the Arctic Circle, about 170 km further south. This translates to a noticeably shorter snow season and thinner snow cover – especially in early winter and spring, the difference can be significant. A thick blanket of snow is not always guaranteed in Rovaniemi for the Christmas season, while Levi virtually always has plenty of snow in December.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Levi consistently has more snow, it arrives earlier and melts later than in Rovaniemi. In the Kittilä region, the first permanent snow typically falls in October, while Rovaniemi often doesn't see lasting snow cover until November. In spring, Rovaniemi's snow melts in April, while Levi still offers skiing and cross-country well into May. In midwinter, the snow depth difference can reach 30–40 cm in Levi's favour. <strong className="text-foreground">If snow is an important part of your holiday – whether for skiing, snowmobiling, snowshoeing or the kids playing in powder – the choice is clear: Levi.</strong>
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  📊 <strong className="text-foreground">Compare for yourself:</strong> See historical snow depth data for the Levi area in our interactive chart and compare snow conditions across different years for any date range.{" "}
                  <Link to="/en/levi/weather-in-levi" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                    View snow depth chart <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </section>

            {/* Santa Claus */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Santa Claus & the Christmas Experience</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Rovaniemi is the official hometown of Santa Claus, and Santa Claus Village on the Arctic Circle is a unique experience – especially for children. You can meet Santa every day of the year, cross the Arctic Circle, send a postcard from Santa's Post Office and enjoy the Christmas atmosphere. This is one of Finland's most famous tourist attractions and a true bucket list experience for many international travellers.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                But here's the good news: you can meet Santa in Levi too! The Levi area offers a variety of Santa Claus experiences during the Christmas season, including Santa meet-and-greets, an elf experience village, and a wide range of Christmas activities for the whole family. The festive atmosphere in a snowy fell village is considered by many to be even more authentic and magical than in the busy tourist village at the Arctic Circle.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                In Levi, the Christmas experience naturally combines with skiing, fell nature and other winter activities – a Christmas holiday in Levi is a complete experience, not just a day visit. Many travellers go to Rovaniemi specifically to meet Santa, but you can do the same in Levi while also enjoying everything else the fell village has to offer. Rovaniemi's Santa Claus Village is above all a day-trip destination – Levi is a place to spend your entire Christmas holiday.
              </p>
            </section>

            {/* Northern Lights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Northern Lights</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Location", "170 km north of the Arctic Circle", "On the Arctic Circle"],
                      ["Light pollution", "Very low (small fell village)", "Noticeably more (city)"],
                      ["Visibility", "Excellent – northern lights often visible directly from your accommodation", "Weaker in the city, often requires transfer to darker area"],
                      ["Guided tours", "Yes, wide selection", "Yes, but often include transport away from the city"],
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
                For seeing the northern lights, Levi has a clear advantage. Levi is located 170 km north of the Arctic Circle, where auroral activity is higher, and in a small fell village light pollution is minimal. In practice, this means the northern lights are often visible directly from your cabin or hotel yard – no separate excursion needed. In Rovaniemi, city lights interfere with observation, and most aurora tours include transport to a darker area outside the city.
              </p>
            </section>

            {/* Activities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Activities & Experiences</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Snowmobile safaris", "Extensive, hundreds of km of routes", "Yes, several operators"],
                      ["Husky safaris", "Yes, several farms nearby", "Yes, several farms"],
                      ["Reindeer rides", "Yes, farms nearby", "Yes, especially at Santa's Village"],
                      ["Spa", "Levi Hotel Spa (at the slopes)", "Ounasvaara, Santa's Hotels"],
                      ["Museums & culture", "Small, nature-focused", "Arktikum, Pilke Science Centre, Korundi – excellent"],
                      ["Shopping", "Fell village shops, specialty stores", "Wide city selection, shopping centres"],
                      ["Nightlife", "Lively après-ski and bars", "City restaurants and bars"],
                      ["Nature experience", "Genuine fell nature all around – wilderness, silence, starry skies", "City environment, nature requires driving"],
                      ["Children's activities", "Children's slopes (10 free lifts), Leevilandia, snowmobile/husky/reindeer", "Santa Claus Village, SantaPark, Snowman World, Angry Birds Park"],
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
                Both offer plenty to do, but in different ways. In Levi, activities are nature-based and easily accessible: you can walk to a snowmobile safari, husky ride or reindeer farm from the centre, and fell nature starts at the edge of the village. In Rovaniemi, the strength is cultural offerings (Arktikum, Pilke, Korundi) and above all the Christmas theme (Santa Claus Village, SantaPark, Snowman World). For children, both are excellent – Levi emphasises skiing and outdoor activities, Rovaniemi the Christmas experience. If you want genuine Lapland nature and a fell experience, Levi wins clearly. If you want to combine a city break with the Christmas theme, Rovaniemi is the right choice.
              </p>
            </section>

            {/* Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Services & Atmosphere</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Restaurants", "Dozens, diverse (fine dining to après-ski)", "Very extensive city selection"],
                      ["Shops", "S-Market, K-Market, specialty shops", "Wide selection: Prisma, shopping centres, specialty shops"],
                      ["Accommodation types", "Cabins, apartments, hotels – ski-in/ski-out possible", "Hotels, Airbnb, glass igloos, ice hotels"],
                      ["Atmosphere", "Recognisable fell village – snow, silence, nature", "Modern small city with Christmas theme"],
                      ["Manageable without a car?", "Yes, easily", "Yes (public transport, taxis)"],
                      ["Best for", "Families, couples, friend groups, skiers", "Bucket list travellers, families (Christmas), city holidaymakers"],
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
                Both are well-equipped in terms of services, but the experiences are different. In Levi, all services are in a compact fell village: you walk to the slopes in the morning, to a snowmobile safari in the afternoon and to dinner in the evening – in the snow and fell landscape all the time. In Rovaniemi, you are in a city: the service selection is broader, but there is no fell experience – you drive to nature and activities. Rovaniemi's unique strength is special accommodation like glass igloos and ice hotels.
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
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Airport", "Kittilä (KTT), 15 min transfer", "Rovaniemi (RVN), in the city"],
                      ["Flights", "Several daily (Helsinki), international seasonal", "Several daily (Helsinki), extensive international network"],
                      ["Train", "Kolari (~1h transfer)", "Direct to city centre (overnight train from Helsinki)"],
                      ["By car from Helsinki", "~1,100 km, ~13h", "~830 km, ~10h"],
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
                In accessibility, Rovaniemi has an edge: the airport and railway station are right in the centre, the overnight train arrives directly from Helsinki, and the international flight network is broader. Levi compensates with Kittilä Airport's proximity (15 min), and once there you don't need a car at all. Many international travellers find a smart solution: spend a day in Rovaniemi at Santa Claus Village, then continue to Levi where the real Lapland holiday begins.
              </p>
            </section>

            {/* Price Level */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Price Level</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Price levels at both destinations are typical Lapland – not cheap, but good value. Notably, accommodation prices in Rovaniemi are noticeably higher than in Levi during December–February – especially near Santa Claus Village and in the most popular hotels, prices rise quickly. Levi's wide accommodation selection (studios, apartments, cabins) keeps competition and prices reasonable, and booking directly from the host often gets you the best price. Restaurant prices are similar. The practical difference also comes with activities: in Levi, skiing and many nature activities are easily accessible without separate transport, while in Rovaniemi safaris and excursions often include transport outside the city, which adds to the cost.
              </p>
            </section>

            {/* Which to choose */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">So Which Should You Choose?</h2>
              <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-start">
                {/* Levi card */}
                <Card className="md:col-span-3 border-2 border-primary shadow-lg relative glass-card">
                  <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground">
                    <Heart className="w-3 h-3 mr-1" /> Our recommendation for a Lapland holiday
                  </Badge>
                  <CardContent className="pt-8 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Choose Levi if:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "You want a genuine Lapland fell experience – snow, nature and silence",
                        "Skiing, cross-country or other winter sports are part of your holiday (Levi has Finland's largest ski resort)",
                        "You want the best conditions for seeing the northern lights, without city light pollution",
                        "You value everything being within walking distance: slopes, restaurants, activities",
                        "You want the widest activity selection (snowmobiles, huskies, reindeer, spa) without separate transport",
                        "You're travelling with family and want enough activities for the entire holiday",
                        "You're staying for several days, not just a day visit",
                        "You can meet Santa in Levi too – in an authentic snowy fell setting",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Rovaniemi card */}
                <Card className="md:col-span-2 glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Choose Rovaniemi if:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Santa Claus Village is the absolute main goal of your trip – it's a one-of-a-kind experience",
                        "You want city holiday elements: museums (Arktikum), extensive restaurant scene, shopping",
                        "You're arriving by train or want the easiest possible access",
                        "You're planning a Lapland road trip and using Rovaniemi as a base",
                        "Special accommodation interests you: glass igloos, ice hotels",
                        "You're spending only 1–2 days in Lapland and need a compact city destination",
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
                Rovaniemi is an excellent gateway to Lapland – Santa Claus Village in particular is an experience worth seeing once in a lifetime. But if you want a real Lapland holiday combining skiing, fell nature, northern lights and a wide range of activities, Levi offers a better overall experience. Many travellers find the smartest solution is a combination: visit Rovaniemi for a day at Santa Claus Village, then head to Levi where the real holiday begins. We recommend Levi – and we're happy to help you find the right accommodation.
              </p>
            </section>

            {/* Tip box */}
            <section className="mb-12">
              <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Local tip</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Many travellers don't know that you can meet Santa in Levi too – without the queues. During the Christmas season, the Levi area hosts numerous festive experiences in an authentic snowy fell setting. Combining a Santa visit with a fell holiday is Levi's strength.
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

            {/* Read Next */}
            {(() => {
              const readNextTranslations: Record<string, { title: string; links: { title: string; desc: string; href: string }[] }> = {
                en: {
                  title: "Read Next",
                  links: [
                    { title: "Levi vs Ylläs vs Ruka", desc: "Compare Finland's top 3 ski resorts", href: "/guide/levi-vs-yllas-vs-ruka-comparison" },
                    { title: "How to Get to Levi", desc: "Flights, trains and driving", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Top Winter Activities", desc: "What to do in Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
                    { title: "Accommodations", desc: "Book your stay in Levi", href: "/en/accommodations" },
                  ],
                },
                nl: {
                  title: "Lees ook",
                  links: [
                    { title: "Levi vs Ylläs vs Ruka", desc: "Vergelijk Finlands top 3 skigebieden", href: "/nl/gids/levi-vs-yllas-vs-ruka" },
                    { title: "Hoe kom je in Levi", desc: "Vluchten, treinen en autorijden", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Beste winteractiviteiten", desc: "Wat te doen in Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
                    { title: "Accommodaties", desc: "Boek je verblijf in Levi", href: "/nl/accommodaties" },
                  ],
                },
                de: {
                  title: "Weiterlesen",
                  links: [
                    { title: "Levi vs Ylläs vs Ruka", desc: "Vergleich der 3 größten Skigebiete Finnlands", href: "/de/guide/levi-vs-yllas-vs-ruka" },
                    { title: "Anreise nach Levi", desc: "Flüge, Züge und Autofahrt", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Beste Winteraktivitäten", desc: "Was man in Levi unternehmen kann", href: "/activities/top-winter-activities-in-levi-lapland" },
                    { title: "Unterkünfte", desc: "Buchen Sie Ihren Aufenthalt in Levi", href: "/de/unterkuenfte" },
                  ],
                },
                fr: {
                  title: "À lire aussi",
                  links: [
                    { title: "Levi vs Ylläs vs Ruka", desc: "Comparez les 3 meilleures stations de Finlande", href: "/fr/guide/levi-vs-yllas-vs-ruka" },
                    { title: "Comment aller à Levi", desc: "Vols, trains et conduite", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Meilleures activités d'hiver", desc: "Que faire à Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
                    { title: "Hébergements", desc: "Réservez votre séjour à Levi", href: "/fr/hebergements" },
                  ],
                },
                es: {
                  title: "Lee también",
                  links: [
                    { title: "Levi vs Ylläs vs Ruka", desc: "Compara las 3 mejores estaciones de Finlandia", href: "/es/guia/levi-vs-yllas-vs-ruka" },
                    { title: "Cómo llegar a Levi", desc: "Vuelos, trenes y conducción", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                    { title: "Mejores actividades de invierno", desc: "Qué hacer en Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
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
                  Back to Levi Guide
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

export default LeviVsRovaniemiComparison;
