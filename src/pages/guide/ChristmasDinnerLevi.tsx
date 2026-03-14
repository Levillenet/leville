import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema } from "@/utils/structuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Gift,
  Sparkles,
  TreePine,
  Wine,
  UtensilsCrossed,
  Clock,
  MapPin,
  Info,
  ChefHat,
  Truck,
  ShoppingCart,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

const restaurants = [
  {
    name: "Restaurant Ämmilä (Hullu Poro)",
    style: "Traditional Lappish Christmas",
    description: "One of Levi's most beloved restaurants, Ämmilä has been serving authentic Lappish cuisine since 2007. Their Christmas buffet is a comprehensive feast featuring local specialties like roast reindeer with wild mushroom stew, cloudberry cake, and Lappish cheese. Known for generous portions and warm atmosphere.",
    seatings: "14:00, 17:00, and 20:00",
    location: "Rakkavaarantie 5, Levi centre",
    price: "€€€",
    tip: "Book early – this is one of the most popular Christmas dinner venues in Levi. The 17:00 seating tends to sell out first.",
    contact: "sales@hulluporo.fi / +358 16 6510 500",
  },
  {
    name: "Restaurant Kätkä (Hotel K5 Levi)",
    style: "Modern Finnish Christmas",
    description: "Located inside the elegant Hotel K5, Kätkä offers a refined Christmas buffet with a modern Nordic twist. The menu has featured classics like Christmas ham and casseroles alongside creative touches like ginger glögi sauce and blue cheese gratins. The setting includes views of the reindeer enclosure in the hotel's courtyard.",
    seatings: "16:00 and 18:30",
    location: "Hotel K5 Levi, centre",
    price: "€€€",
    tip: "K5's courtyard reindeer make this especially magical for children.",
  },
  {
    name: "Restaurant Panorama (Hotel Panorama)",
    style: "Classic Finnish Christmas Buffet with Fell Views",
    description: "Hotel Panorama sits at the top of the Front Slope, offering stunning fell views from the restaurant. Panorama serves a traditional Christmas buffet with a wide selection of cold and warm dishes. The unique hilltop location – directly above the ski slopes – makes this a memorable setting for Christmas dinner with panoramic views over the snow-covered fells and village below.",
    seatings: "16:00 and 18:30",
    location: "Hotel Panorama, top of the Front Slope (Eturinne)",
    price: "€€€",
    tip: "The fell-top location makes this unlike any other Christmas dinner venue. Check if the gondola operates on Christmas Eve for easy access, or arrange transport.",
  },
  {
    name: "Restaurant Kiisa (Levi Hotel Spa)",
    style: "Upscale Festive Dining",
    description: "Located in Levi Hotel Spa, Kiisa offers a more elevated Christmas experience with a sophisticated menu that goes beyond traditional fare. Previous years have featured dishes like grilled octopus with lemon and herbs alongside classic Christmas ham, crayfish terrine, and slow-cooked beef breast with cherry red wine sauce. Connected to Levi Hotel Spa, so you can combine dinner with a relaxing sauna and spa evening at Water World Levi.",
    seatings: "18:00–20:00 and 21:00–23:00",
    location: "Levi Hotel Spa, centre",
    price: "€€€€",
    tip: "Combine your Christmas dinner with a visit to Water World Levi spa – a perfect Christmas Eve programme. The later seating is ideal if you want to attend the Christmas Peace declaration at Zero Point at 15:00.",
  },
  {
    name: "Northern Lights Ranch",
    style: "Countryside Christmas with Santa",
    description: "A unique Christmas Eve experience outside the village. The buffet has featured traditional Finnish Christmas fare including elk, reindeer sausage, and organic roasted ham in a rustic, atmospheric setting. The highlight: Santa Claus visits during dinner (typically 18:30–19:30 on Christmas Eve).",
    seatings: "16:30/17:00 and 19:30/20:00",
    location: "Outside Levi centre (transfer may be needed)",
    price: "~€89/adult, ~€40/child (3–12 yrs)",
    tip: "This is the best option if you're travelling with children – the Santa visit during dinner is unforgettable.",
  },
  {
    name: "Luvattumaa",
    style: "Cosy Fell Restaurant Christmas",
    description: "A beloved local café and restaurant in the heart of Levi that transforms into a festive Christmas dining venue during the holiday season. Traditional Christmas buffet with warm, intimate atmosphere. A favourite among locals and returning visitors.",
    seatings: "17:00 and 20:00",
    location: "Levi centre",
    price: "€€€",
    tip: "A more intimate, local-feeling alternative to the larger hotel restaurants.",
  },
  {
    name: "Restaurant Utsu (Levi Igloos)",
    style: "Fine Dining Nordic Christmas",
    description: "Nestled in the scenic fells of Utsuvaara, Utsu offers a refined multi-course Christmas dinner featuring local Arctic ingredients. The glass-roofed restaurant provides a stunning setting with fell views. A truly special occasion dining experience.",
    seatings: "17:00 and 20:30",
    location: "Harjatie 2, Utsuvaara (short drive from centre)",
    price: "€€€€",
    tip: "Reserve months ahead – Utsu is small and exclusive. This is the choice for a once-in-a-lifetime Christmas dinner.",
  },
];

const cateringOptions = [
  {
    name: "Levi Black Catering",
    icon: Truck,
    recommended: true,
    description: "Levi Black offers a curated Christmas catering menu delivered directly to your accommodation. This is an extremely popular option among Levi visitors. The menu has included traditional items like mustard-glazed Christmas ham, gravlax, fish roe mousse, casseroles (carrot, swede, potato), rosolli salad, forest mushroom salad, gingerbread mousse, and Christmas spice cake. A hassle-free way to enjoy a full traditional Finnish Christmas table in the comfort of your own cabin.",
    how: "Request the order form via sales@leviblack.fi",
    tip: "This is one of the most popular cabin catering options in Levi – order early to secure your spot.",
  },
  {
    name: "LeviDeli Catering",
    icon: ChefHat,
    description: "Professional catering service operating in Levi since 2006. They prepare complete Christmas meals and deliver them straight to your cabin door. All meals are lactose-free and gluten-free (except bread items). Minimum order typically for 4 people.",
    how: "Contact directly via their website or inquiry form",
    website: "levideli.fi",
    tip: "Order well in advance – LeviDeli is popular and Christmas slots fill up fast.",
  },
  {
    name: "Cook It Yourself",
    icon: ShoppingCart,
    description: "If you enjoy cooking, Levi's grocery stores (S-Market, K-Market) stock all the traditional Christmas ingredients during December. You can buy a pre-prepared Christmas ham, ready-made casseroles, salmon, herring, and all the trimmings. Many cabins have fully equipped kitchens, making self-catering a genuine option.",
    tip: "Buy your Christmas ham and casseroles by December 23rd at the latest. K-Market and S-Market may have reduced hours on Christmas Eve (typically closing around 12:00–14:00). The stores can be very busy on December 23rd – go early.",
  },
];

const glossary = [
  { term: "Joulupöytä", meaning: "The Christmas table/buffet – the whole festive spread" },
  { term: "Joulukinkku", meaning: "Christmas ham – mustard-glazed, slow-roasted pork. The centrepiece." },
  { term: "Laatikot", meaning: "Baked casseroles: carrot (porkkanalaatikko), swede (lanttulaatikko), potato (perunalaatikko)" },
  { term: "Rosolli", meaning: "Traditional Christmas beetroot salad with cream dressing" },
  { term: "Graavilohi", meaning: "Cured salmon (gravlax) with dill" },
  { term: "Joulutorttu", meaning: "Star-shaped Christmas pastries filled with plum jam" },
  { term: "Glögi", meaning: "Finnish mulled wine – served hot with raisins and almonds" },
  { term: "Riisipuuro", meaning: "Rice porridge with cinnamon and sugar (the almond finder gets good luck!)" },
  { term: "Piparkakut", meaning: "Gingerbread biscuits" },
  { term: "Lipeäkala", meaning: "Lye fish (lutefisk) – traditional but polarising. Not served in all restaurants." },
];

const faqs = [
  {
    q: "How much does Christmas dinner cost in Levi restaurants?",
    a: "Restaurant Christmas buffets have typically cost between €65–120 per adult, depending on the restaurant. Children's prices (ages 3–12) are usually around €30–45. Northern Lights Ranch, for example, has charged approximately €89/adult and €40/child. Fine dining options like Utsu may be higher. Prices change yearly, so always confirm with the restaurant when booking.",
  },
  {
    q: "When should I book my Christmas dinner?",
    a: "As early as possible – ideally when you book your accommodation, which could be months in advance. Popular restaurants can be fully booked by October or November. If you're booking last-minute, cabin delivery catering may still have availability when restaurants don't.",
  },
  {
    q: "Is Christmas Day dinner available too?",
    a: "Christmas Day (25 December) is very quiet in Finland. Some hotel restaurants serve meals for their guests, but many standalone restaurants are closed on Christmas Day. If you're staying in a cabin, having leftovers from Christmas Eve or ordering groceries in advance is the safest option. Some restaurants reopen on December 26th (Boxing Day / Tapaninpäivä).",
  },
  {
    q: "Are there vegetarian or vegan Christmas dinner options?",
    a: "Yes, increasingly so. Most restaurant Christmas buffets include vegetarian options such as a mustard-glazed seitan roast alongside the traditional meat and fish dishes. The Finnish casseroles (carrot and swede) are naturally vegetarian. For fully vegan menus, contact restaurants in advance – many will accommodate special requests.",
  },
  {
    q: "Can I bring my own wine to a restaurant Christmas dinner?",
    a: "No – Finnish restaurants do not allow bringing your own alcohol (this is strictly regulated by Finnish law). Restaurants serve wine, beer, and spirits with dinner. Remember to buy any alcohol you want for your cabin from Alko before it closes (by December 23rd).",
  },
  {
    q: "What time is Christmas dinner served?",
    a: "Finnish Christmas Eve dinner is typically served from late afternoon, starting around 14:00–17:00 for early seatings and 18:00–21:00 for later seatings. Most restaurants offer 2–3 seatings. The timing is earlier than what many international visitors expect – this is because Finns celebrate on Christmas Eve, not Christmas Day.",
  },
];

const tips = [
  { bold: "Book months in advance.", text: "Popular restaurants like Ämmilä, Kiisa and Utsu can be fully booked by October. As soon as you've confirmed your accommodation, book your Christmas dinner." },
  { bold: "Understand Finnish Christmas timing.", text: "The main celebration is Christmas Eve (24 December), not Christmas Day. Christmas Eve dinner is served from late afternoon. Christmas Day (25 December) is quiet – many restaurants are closed." },
  { bold: "The Christmas Peace declaration.", text: "At 15:00 on Christmas Eve, the traditional Declaration of Christmas Peace takes place at Zero Point in Levi centre. It's a beautiful moment worth attending before heading to dinner." },
  { bold: "Dress smartly but practically.", text: "Restaurants are warm inside, but you'll walk through snow to get there. Wear your nice clothes but bring warm boots and a jacket for the walk." },
  { bold: "Dietary requirements.", text: "Finnish Christmas food is naturally rich in gluten-free and lactose-free options (casseroles, meats, fish). Most restaurants accommodate dietary needs – inform them when booking. Vegan options are increasingly available." },
  { bold: "Alcohol on Christmas Eve.", text: "Restaurants serve wine and drinks with dinner. The state alcohol shop Alko closes early before Christmas (usually by 14:00 on December 23rd and is closed on 24–25 December). Buy your wine and spirits well in advance if you want drinks at the cabin." },
  { bold: "Consider combining options.", text: "Many families have a light restaurant lunch, attend the Christmas Peace at 15:00, then enjoy a cabin dinner in the evening. Or do the opposite – cook lunch at the cabin and head to a restaurant for the evening feast." },
];

const ChristmasDinnerLevi = () => {
  const location = useLocation();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbItems = [
    { label: "Home", href: "/en" },
    { label: "Christmas in Lapland", href: "/en/levi/christmas-in-lapland" },
    { label: "Christmas Dinner in Levi", href: "/en/guide/christmas-dinner-in-levi" },
  ];

  return (
    <>
      <Helmet>
        <title>Christmas Dinner in Levi – Restaurant Menus, Cabin Delivery & Booking Tips | Leville.net</title>
        <meta name="description" content="Complete guide to Christmas Eve dinner in Levi, Lapland. Restaurant options, traditional Finnish Christmas menus, cabin delivery services, and practical booking tips for your holiday." />
        <link rel="canonical" href="https://leville.net/en/guide/christmas-dinner-in-levi" />
        <meta property="og:title" content="Christmas Dinner in Levi – Restaurant Menus, Cabin Delivery & Booking Tips" />
        <meta property="og:description" content="Complete guide to Christmas Eve dinner in Levi, Lapland. Restaurant options, traditional Finnish Christmas menus, cabin delivery services, and practical booking tips." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://leville.net/en/guide/christmas-dinner-in-levi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Christmas Dinner in Levi – Restaurants, Menus & Cabin Delivery" />
        <meta name="twitter:description" content="Complete guide to Christmas Eve dining in Levi, Lapland." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: "Christmas Dinner in Levi", description: "Complete guide to Christmas Eve dinner in Levi, Lapland.", url: "https://leville.net/guide/christmas-dinner-in-levi", lang: "en" })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: "https://leville.net/en" },
        { name: "Events", url: "https://leville.net/en/levi" },
        { name: "Christmas Dinner", url: "https://leville.net/guide/christmas-dinner-in-levi" }
      ])} />
      <HreflangTags
        currentPath={location.pathname}
        currentLang="en"
        customUrls={{ en: "/en/guide/christmas-dinner-in-levi", fi: "/levi/joulu-lapissa" }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <SubpageBackground />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative bg-[#7F1D1D] py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,215,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(255,215,0,0.2) 0%, transparent 40%)",
            }} />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z' fill='%23FFD700' fill-opacity='0.3'/%3E%3C/svg%3E\")",
            }} />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <div className="flex justify-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-300" />
                <Sparkles className="w-5 h-5 text-amber-400" />
                <Star className="w-5 h-5 text-amber-300" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Christmas Dinner in Levi
              </h1>
              <p className="text-amber-200/90 text-lg sm:text-xl max-w-2xl mx-auto">
                Traditional Finnish Christmas food, restaurant options, and cabin delivery for your Lapland holiday
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Intro */}
            <section className="mb-10">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Christmas Eve dinner is the highlight of Finnish Christmas. In Finland, the main celebration happens on the evening of December 24th – not Christmas Day. Families gather around a lavish table filled with traditional dishes that have been prepared for days. In Levi, you have two wonderful options: book a table at one of the many restaurants serving a special Christmas buffet, or order a complete Christmas meal delivered to your cabin for a private celebration with your family. Either way, you're in for a feast. This guide covers everything you need to know – from what's on a Finnish Christmas table to where to book and when.
              </p>
            </section>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5 mb-10 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                The restaurant listings and menus below are based on previous years' offerings and are intended as inspiration for planning your Christmas holiday. Menus, prices, seatings, and availability change each year. We recommend contacting the restaurants directly to confirm current Christmas dinner options and to make reservations.
              </p>
            </div>

            {/* What is Finnish Christmas Dinner */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D] mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-600" />
                What Is a Finnish Christmas Dinner?
              </h2>
              <div className="prose prose-slate max-w-none space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p>
                  Finnish Christmas dinner (<em>joulupöytä</em>) is an elaborate buffet-style feast built on traditions that go back centuries. The meal is typically served in the late afternoon or early evening on Christmas Eve. Unlike British or American Christmas dinners centred around turkey, the Finnish Christmas table revolves around ham, fish, and a unique selection of casseroles.
                </p>
                <p>
                  The centrepiece is the Christmas ham (<em>joulukinkku</em>) – a large, slow-roasted pork ham glazed with mustard and breadcrumbs. It is the undisputed star of the Finnish Christmas table. Alongside it you will find several varieties of fish: gravlax (cured salmon), smoked whitefish, pickled herring in various marinades, and fish roe mousse with sour cream and red onion.
                </p>
                <p>
                  The casseroles (<em>laatikot</em>) are uniquely Finnish and may surprise visitors. There are typically three: carrot casserole (sweet, almost like a dessert), swede/rutabaga casserole (earthy and hearty), and potato casserole (creamy, made with sweetened potatoes). These are baked in the oven and served warm. For many Finns, the casseroles are the most nostalgic part of the Christmas meal.
                </p>
                <p>
                  The salad course includes <em>rosolli</em> – a colourful beetroot salad with apples, pickles and cream dressing – and forest mushroom salad. You will also find liver pâté, roast beef, and in Lapland specifically, smoked or cured reindeer.
                </p>
                <p>
                  Desserts feature Christmas tarts (<em>joulutorttu</em>) – star-shaped pastries filled with plum jam – gingerbread biscuits, and various mousse desserts. Rice porridge (<em>riisipuuro</em>) with cinnamon, sugar and a hidden almond is traditionally served either for lunch on Christmas Eve or as a separate treat.
                </p>
                <p>
                  The meal is accompanied by <em>glögi</em> – Finnish mulled wine served with raisins and almonds. Non-alcoholic versions are widely available.
                </p>
              </div>
            </section>

            {/* Restaurant Section */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D] mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-amber-600" />
                Christmas Dinner at a Restaurant
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-4 leading-relaxed">
                Levi has over 60 restaurants and many of them serve a special Christmas Eve buffet. Restaurants fill up extremely early – booking weeks or even months in advance is essential. Most restaurants offer two or three seatings on Christmas Eve, typically between 14:00 and 22:00.
              </p>
              <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 italic">
                Note: The details below are based on previous years. Always confirm current offerings directly with the restaurant.
              </p>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {restaurants.map((r, i) => (
                  <Card key={i} className="bg-white border-l-4 border-l-red-700 shadow-md rounded-xl hover:shadow-lg transition-shadow">
                    <CardHeader className="p-4 sm:p-5 pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base sm:text-lg text-[#7F1D1D]">{r.name}</CardTitle>
                        <TreePine className="w-4 h-4 text-red-300 flex-shrink-0 ml-2 mt-1" />
                      </div>
                      <p className="text-xs text-amber-700 font-medium">{r.style}</p>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-5 pt-0 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-red-600" /> {r.seatings}</div>
                        <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-red-600" /> {r.location}</div>
                        <div className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-amber-500" /> {r.price}</div>
                      </div>
                      {r.contact && (
                        <p className="text-xs text-muted-foreground">📞 {r.contact}</p>
                      )}
                      <div className="bg-amber-50/70 border border-amber-100 rounded-lg p-2.5">
                        <p className="text-xs text-amber-900"><Sparkles className="w-3 h-3 inline mr-1 text-amber-500" /><strong>Tip:</strong> {r.tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Cabin Delivery */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D] mb-4 flex items-center gap-2">
                <Gift className="w-6 h-6 text-amber-600" />
                Christmas Dinner Delivered to Your Cabin
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
                Many visitors prefer to celebrate Christmas privately in their cabin with family. This is a wonderful and very popular option in Levi – several services offer complete Christmas meals delivered to your door. You get the full festive feast without any cooking or restaurant reservations.
              </p>
              <div className="grid gap-4 sm:gap-6">
                {cateringOptions.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <Card key={i} className={`bg-white border-l-4 shadow-md rounded-xl ${("recommended" in c && c.recommended) ? "border-l-emerald-700 ring-2 ring-emerald-200 shadow-lg" : "border-l-emerald-600"}`}>
                      <CardHeader className="p-4 sm:p-5 pb-2">
                        <CardTitle className="text-base sm:text-lg text-emerald-800 flex items-center gap-2">
                          <Icon className="w-5 h-5 text-emerald-600" />
                          {c.name}
                          {"recommended" in c && c.recommended && (
                            <span className="ml-2 inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-300">
                              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" /> We recommend
                            </span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-5 pt-0 space-y-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                        {c.how && (
                          <p className="text-xs text-muted-foreground"><strong>How to order:</strong> {c.how}</p>
                        )}
                        {"website" in c && c.website && (
                          <p className="text-xs">
                            <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline inline-flex items-center gap-1">
                              {c.website} <ExternalLink className="w-3 h-3" />
                            </a>
                          </p>
                        )}
                        <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2.5">
                          <p className="text-xs text-emerald-900"><Sparkles className="w-3 h-3 inline mr-1 text-emerald-500" /><strong>Tip:</strong> {c.tip}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Practical Tips */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D] mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-600" />
                Practical Tips for Christmas Dinner in Levi
              </h2>
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 sm:p-7">
                <ol className="space-y-4">
                  {tips.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm text-amber-950">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <p><strong>{t.bold}</strong> {t.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Glossary */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D] mb-6 flex items-center gap-2">
                <Wine className="w-6 h-6 text-amber-600" />
                Christmas Dinner Traditions Explained
              </h2>
              <div className="bg-red-50/40 border border-red-100 rounded-xl p-5 sm:p-7">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {glossary.map((g, i) => (
                    <div key={i} className="flex gap-3 py-2 border-b border-red-100 last:border-0">
                      <span className="font-bold text-[#7F1D1D] text-sm whitespace-nowrap">{g.term}</span>
                      <span className="text-sm text-muted-foreground">{g.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D] mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-600" />
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-red-100 rounded-lg px-4 bg-white">
                    <AccordionTrigger className="text-sm sm:text-base text-[#7F1D1D] font-medium hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Read Also */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D] mb-6 flex items-center gap-2">
                <TreePine className="w-6 h-6 text-amber-600" />
                Read Also
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { title: "Christmas in Lapland", desc: "The complete guide to spending Christmas in Levi", to: "/en/levi/christmas-in-lapland", icon: Gift },
                  { title: "Restaurants & Services", desc: "All restaurants and services in Levi area", to: "/guide/restaurants-and-services-in-levi", icon: UtensilsCrossed },
                  { title: "Book Accommodation", desc: "Find your perfect cabin or apartment in Levi", to: "/en/accommodations", icon: Star },
                ].map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <Link key={i} to={link.to} className="block">
                      <Card className="bg-white border border-red-100 hover:border-red-300 shadow-sm hover:shadow-md transition-all rounded-xl h-full">
                        <CardContent className="p-4 sm:p-5 flex flex-col items-start gap-2">
                          <Icon className="w-5 h-5 text-red-600" />
                          <h3 className="font-semibold text-[#7F1D1D] text-sm">{link.title}</h3>
                          <p className="text-xs text-muted-foreground">{link.desc}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Bottom navigation */}
            <section className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button asChild variant="outline">
                <Link to="/en/levi/christmas-in-lapland">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Christmas in Lapland
                </Link>
              </Button>
              <Button asChild className="bg-red-700 hover:bg-red-800 text-white">
                <Link to="/en/accommodations">
                  <Gift className="w-4 h-4 mr-2" />
                  Book accommodation for Christmas
                </Link>
              </Button>
            </section>
          <GuideDisclaimer lang="en" />
          </div>
        </main>

        <PageCTA lang={lang} />

        <Footer lang="en" />
        <WhatsAppChat lang="en" />
        <StickyBookingBar lang="en" />
      </div>
    </>
  );
};

export default ChristmasDinnerLevi;
