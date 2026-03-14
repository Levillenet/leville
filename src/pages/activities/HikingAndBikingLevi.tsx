import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, MapPin, Bike, Battery, TreePine, Sun, Snowflake, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HikingAndBikingLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Vaellus ja maastopyöräily Levillä – Tunturiretket ja sähköpyörät | Leville.net",
      description:
        "Tutustu Levin parhaisiin vaellusreitteihin ja maastopyöräilyyn. Sähköpyörillä pääsee myös talvella kunnostetuille reiteille. Koe Lapin luonto!",
      canonical: "https://leville.net/aktiviteetit/vaellus-ja-maastopyoraily-levi",
    },
    title: "Vaellus ja maastopyöräily Levillä",
    subtitle: "Tunturiretket, polkupyöräily ja sähköpyörät Lapin luonnossa",
    intro:
      "Levin upeat tunturimaisemat tarjoavat unohtumattomia elämyksiä vaeltajille ja pyöräilijöille ympäri vuoden. Kesällä polut täyttyvät patikoijista ja maastopyöräilijöistä, ja talvella sähköpyörillä voi ajaa kunnostetuilla reiteillä. Tutustu Lapin luontoon omassa tahdissasi.",
    sections: {
      hiking: {
        title: "Tunturivaellus ja kävely",
        intro: "Levin alueella on kymmeniä kilometrejä merkittyjä vaellusreittejä kaikentasoisille kulkijoille.",
        trails: [
          {
            name: "Levin Luontopolku",
            distance: "3 km",
            difficulty: "Helppo",
            desc: "Sopii kaikille – esteetön reitti lähtee Levin keskustasta ja esittelee Lapin luontoa.",
          },
          {
            name: "Kätkätunturin kierros",
            distance: "8 km",
            difficulty: "Keskitaso",
            desc: "Suosittu päiväretki upeilla näköaloilla. Nousua noin 300 metriä.",
          },
          {
            name: "Levin huipulle",
            distance: "5 km",
            difficulty: "Keskitaso",
            desc: "Kävelyreitti Levin huipulle (531 m). Panoraamanäkymät tunturimaisemaan.",
          },
          {
            name: "Pallas–Yllästunturi kansallispuisto",
            distance: "10–55 km",
            difficulty: "Vaativa",
            desc: "Suomen suosituin vaellusreitti. Useiden päivien retket erämaamaisemissa.",
          },
        ],
        tips: [
          "Pakkaa riittävästi vettä ja eväitä",
          "Käytä kerrosvaatetusta – sää vaihtuu nopeasti tunturissa",
          "Ilmoita reittisuunnitelmasi jollekulle",
          "Kunnioita luontoa – jätä vain jalanjälkesi",
          "Hyttyskarkote on pakollinen kesällä",
        ],
      },
      biking: {
        title: "Maastopyöräily kesällä",
        intro: "Levin maastopyöräilyverkosto on Suomen parhaita. Kesäkaudella (kesä–syyskuu) voit nauttia kymmenistä kilometreistä huollettuja reittejä.",
        highlights: [
          {
            title: "Bike Park Levi",
            desc: "Levin rinteissä toimii kesällä Bike Park, jossa on eri vaikeusasteisia laskureittejä. Hissillä pääsee ylös ja pyörän voi vuokrata paikan päältä.",
          },
          {
            title: "Luontoreitit",
            desc: "Metsäpolut ja luontoreitit sopivat rauhalliseen pyöräilyyn. Näet poroja, lintuja ja upeita maisemia.",
          },
          {
            title: "Pyörävuokraus",
            desc: "Maastopyöriä ja sähköpyöriä voi vuokrata useista pisteistä Levin keskustassa ja hotelleista.",
          },
        ],
        routes: [
          { name: "Bike Park laskureitit", level: "Helppo–Vaativa", km: "10+ km" },
          { name: "Levi–Sirkka luontoreitti", level: "Helppo", km: "15 km" },
          { name: "Tunturipolut", level: "Keskitaso", km: "20+ km" },
        ],
      },
      ebike: {
        title: "Sähköpyöräily – kesällä ja talvella",
        intro: "Sähköpyörä (e-bike) on loistava tapa tutustua Levin luontoon helposti ja ekologisesti. Sähköavusteinen pyörä vie sinut pidemmälle väsymättä.",
        summer: {
          title: "Kesällä sähköpyörällä",
          items: [
            "Suosituin tapa liikkua luonnossa kesällä",
            "Sähköpyörällä pääset helposti tunturin huipulle",
            "Vuokraus useista pisteistä – hinta noin 50–80€/päivä",
            "Opastetut sähköpyöräretket saatavilla",
            "Sopii kaikille kuntoilijasta ikäihmiseen",
          ],
        },
        winter: {
          title: "Talvella fatbikella",
          items: [
            "Fatbike (leveärenkaiset talvipyörät) sopivat talviseen ajoon",
            "Kunnostetut talvireitit (Fat Bike -reitit) ovat ajettavissa koko talven",
            "Sähköavusteiset fatbiket helpottavat lumessa ajoa",
            "Ainutlaatuinen tapa kokea talvinen tunturimaisema",
            "Hyvä vaihtoehto laskettelun rinnalle",
          ],
        },
        tip: "Talvella ajaessa pukeudu lämpimästi ja muista, että akun kapasiteetti heikkenee pakkasella!",
      },
      bestTime: {
        title: "Paras aika vaellukseen ja pyöräilyyn",
        times: [
          {
            period: "Kesäkuu–elokuu",
            desc: "Paras aika vaellukseen ja maastopyöräilyyn. Keskiyön aurinko valaisee polut. Hyttyset aktiivisia heinäkuussa.",
            icon: "sun",
          },
          {
            period: "Syyskuu–lokakuu",
            desc: "Ruska-aika on upeimmillaan. Värit loistavat ja hyttyset ovat kadonneet. Yöt viilenevät.",
            icon: "treepine",
          },
          {
            period: "Talvi (joulu–huhtikuu)",
            desc: "Fatbike-pyöräily kunnostetuilla talvireiteillä. Revontulet ja luminen maisema.",
            icon: "snowflake",
          },
        ],
      },
      gear: {
        title: "Mitä varusteita tarvitset",
        hiking: {
          title: "Vaellukseen",
          items: [
            "Tukevat vaelluskengät (nilkan yli)",
            "Kerrosvaatetus (villa/tekniset materiaalit)",
            "Sadevarusteet",
            "Reppu (päiväreppu 20–30L)",
            "Kartta ja kompassi / GPS",
            "Ensiapupakkaus",
            "Aurinkosuoja ja hyttyskarkote (kesällä)",
          ],
        },
        biking: {
          title: "Pyöräilyyn",
          items: [
            "Kypärä (pakollinen!)",
            "Käsineet",
            "Urheiluvaatteet / pyöräilyhousut",
            "Vesipullo tai juomapakkaus",
            "Pyörän korjausvälineet",
            "Aurinkolasit",
          ],
        },
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Voiko Levillä pyöräillä talvella?",
            a: "Kyllä! Fatbike-pyörillä voi ajaa kunnostetuilla talvireiteillä. Sähköavusteiset fatbiket helpottavat lumessa ajoa. Vuokraamoja löytyy Levin keskustasta.",
          },
          {
            q: "Mistä voin vuokrata sähköpyörän Levillä?",
            a: "Sähköpyöriä vuokraavat mm. Levin Sport Shop, paikalliset hotellit ja Bike Park Levi. Hinnat ovat noin 50–80€/päivä.",
          },
          {
            q: "Onko vaellusreiteillä opasteita?",
            a: "Kyllä, kaikki viralliset vaellusreitit on merkitty selkeästi. Lyhyemmillä reiteillä on infotauluja, ja pidemmillä reiteillä merkkipaaluja.",
          },
          {
            q: "Sopiiko maastopyöräily aloittelijoille?",
            a: "Kyllä! Levillä on helppojakin reittejä, ja sähköpyörä tekee pyöräilystä helppoa kaikille. Bike Parkissa on aloittelijoille sopivia laskureittejä.",
          },
          {
            q: "Voiko lapset ottaa mukaan vaellukselle?",
            a: "Ehdottomasti! Lyhyemmät reitit kuten Levin Luontopolku sopivat perheille. Lapsille kannattaa valita helppo, lyhyt reitti ja pitää riittävästi taukoja.",
          },
        ],
      },
    },
    cta: {
      title: "Varaa majoitus ja koe Levin luonto",
      text: "Keskustan majoituksistamme pääset helposti vaellusreittien alkupisteisiin ja pyörävuokraamoihin.",
      button: "Katso majoitukset",
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Kesä Levillä", desc: "Kesäkauden opas ja vinkit", href: "/opas/kesa-levi" },
        { title: "Syksy ja ruska", desc: "Parhaat vaellusajat ruskan aikaan", href: "/opas/syksy-ruska-levi" },
        { title: "Ravintolat ja palvelut", desc: "Missä syödä vaelluksen jälkeen", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Liikkuminen Levillä", desc: "Miten pääset reittien alkuun", href: "/opas/liikkuminen-levilla" }
      ]
    },
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Kesä Levillä", href: "/opas/kesa-levi" },
      { text: "Syksy ja ruska Levillä", href: "/opas/syksy-ruska-levi" },
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Aktiviteetit Levillä", href: "/opas/aktiviteetit-levi" },
      { label: "Vaellus ja maastopyöräily", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
    ],
    activitiesHubLink: "/opas/aktiviteetit-levi",
    activitiesHubText: "← Takaisin aktiviteettioppaaseen",
    accommodationsHref: "/majoitukset",
  },
  en: {
    meta: {
      title: "Hiking and Biking in Levi – Fell Trails and E-bikes | Leville.net",
      description:
        "Discover Levi's best hiking trails and mountain biking routes. E-bikes and fatbikes are also available in winter on groomed trails. Experience Lapland nature!",
      canonical: "https://leville.net/activities/hiking-and-biking-levi",
    },
    title: "Hiking and Biking in Levi",
    subtitle: "Fell hikes, mountain biking and e-bikes in Lapland nature",
    intro:
      "Levi's stunning fell landscapes offer unforgettable experiences for hikers and cyclists year-round. In summer, trails fill with trekkers and mountain bikers, and in winter, you can ride e-bikes on groomed trails. Explore Lapland nature at your own pace.",
    sections: {
      hiking: {
        title: "Fell Hiking and Walking",
        intro: "The Levi area has dozens of kilometers of marked hiking trails for all skill levels.",
        trails: [
          {
            name: "Levi Nature Trail",
            distance: "3 km",
            difficulty: "Easy",
            desc: "Suitable for everyone – an accessible trail starting from Levi center showcasing Lapland nature.",
          },
          {
            name: "Kätkätunturi Circuit",
            distance: "8 km",
            difficulty: "Moderate",
            desc: "Popular day trip with stunning views. About 300 meters of elevation gain.",
          },
          {
            name: "Levi Summit Trail",
            distance: "5 km",
            difficulty: "Moderate",
            desc: "Walking route to Levi summit (531 m). Panoramic views of the fell landscape.",
          },
          {
            name: "Pallas–Yllästunturi National Park",
            distance: "10–55 km",
            difficulty: "Challenging",
            desc: "Finland's most popular hiking route. Multi-day treks in wilderness landscapes.",
          },
        ],
        tips: [
          "Pack enough water and snacks",
          "Use layered clothing – weather changes quickly in the fells",
          "Let someone know your route plan",
          "Respect nature – leave only footprints",
          "Mosquito repellent is essential in summer",
        ],
      },
      biking: {
        title: "Mountain Biking in Summer",
        intro: "Levi's mountain biking network is among Finland's best. During summer season (June–September), you can enjoy dozens of kilometers of maintained trails.",
        highlights: [
          {
            title: "Bike Park Levi",
            desc: "In summer, Bike Park operates on Levi slopes with downhill routes of varying difficulty. The lift takes you up, and bikes can be rented on site.",
          },
          {
            title: "Nature Trails",
            desc: "Forest paths and nature trails are perfect for peaceful cycling. See reindeer, birds, and stunning landscapes.",
          },
          {
            title: "Bike Rentals",
            desc: "Mountain bikes and e-bikes can be rented from several points in Levi center and hotels.",
          },
        ],
        routes: [
          { name: "Bike Park downhill routes", level: "Easy–Challenging", km: "10+ km" },
          { name: "Levi–Sirkka nature trail", level: "Easy", km: "15 km" },
          { name: "Fell trails", level: "Moderate", km: "20+ km" },
        ],
      },
      ebike: {
        title: "E-biking – Summer and Winter",
        intro: "An electric bike (e-bike) is a great way to explore Levi's nature easily and ecologically. The electric assist takes you further without getting tired.",
        summer: {
          title: "Summer E-biking",
          items: [
            "Most popular way to explore nature in summer",
            "E-bike easily takes you to fell summits",
            "Rentals from multiple locations – around €50–80/day",
            "Guided e-bike tours available",
            "Suitable for everyone from athletes to seniors",
          ],
        },
        winter: {
          title: "Winter Fatbiking",
          items: [
            "Fatbikes (wide-tire winter bikes) are perfect for winter riding",
            "Groomed winter trails (Fat Bike trails) are rideable all winter",
            "Electric fatbikes make snow riding easier",
            "Unique way to experience winter fell landscapes",
            "Great alternative alongside skiing",
          ],
        },
        tip: "When riding in winter, dress warmly and remember that battery capacity decreases in cold weather!",
      },
      bestTime: {
        title: "Best Time for Hiking and Biking",
        times: [
          {
            period: "June–August",
            desc: "Best time for hiking and mountain biking. Midnight sun lights up the trails. Mosquitoes active in July.",
            icon: "sun",
          },
          {
            period: "September–October",
            desc: "Ruska (autumn colors) at its finest. Colors are vibrant and mosquitoes are gone. Nights get cooler.",
            icon: "treepine",
          },
          {
            period: "Winter (Dec–April)",
            desc: "Fatbike cycling on groomed winter trails. Northern lights and snowy landscapes.",
            icon: "snowflake",
          },
        ],
      },
      gear: {
        title: "What Gear You Need",
        hiking: {
          title: "For Hiking",
          items: [
            "Sturdy hiking boots (over the ankle)",
            "Layered clothing (wool/technical materials)",
            "Rain gear",
            "Backpack (daypack 20–30L)",
            "Map and compass / GPS",
            "First aid kit",
            "Sunscreen and mosquito repellent (summer)",
          ],
        },
        biking: {
          title: "For Biking",
          items: [
            "Helmet (mandatory!)",
            "Gloves",
            "Sportswear / cycling shorts",
            "Water bottle or hydration pack",
            "Bike repair tools",
            "Sunglasses",
          ],
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "Can you bike in Levi in winter?",
            a: "Yes! You can ride fatbikes on groomed winter trails. Electric fatbikes make snow riding easier. Rental shops are found in Levi center.",
          },
          {
            q: "Where can I rent an e-bike in Levi?",
            a: "E-bikes are rented by Levi Sport Shop, local hotels, and Bike Park Levi, among others. Prices are around €50–80/day.",
          },
          {
            q: "Are hiking trails marked?",
            a: "Yes, all official hiking trails are clearly marked. Shorter trails have info boards, and longer trails have trail markers.",
          },
          {
            q: "Is mountain biking suitable for beginners?",
            a: "Yes! Levi has easy trails too, and e-bikes make cycling accessible for everyone. Bike Park has beginner-friendly downhill routes.",
          },
          {
            q: "Can children come hiking?",
            a: "Absolutely! Shorter trails like Levi Nature Trail are family-friendly. Choose an easy, short route for kids and take enough breaks.",
          },
        ],
      },
    },
    cta: {
      title: "Book Accommodation and Experience Levi Nature",
      text: "From our center accommodations, you can easily reach trail heads and bike rental shops.",
      button: "View Accommodations",
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Summer in Levi", desc: "Summer season guide and tips", href: "/guide/summer-in-levi" },
        { title: "Autumn Ruska", desc: "Best hiking during fall colours", href: "/guide/autumn-ruska-in-levi" },
        { title: "Restaurants & Services", desc: "Where to eat after your hike", href: "/guide/restaurants-and-services-in-levi" },
        { title: "Getting Around Levi", desc: "How to reach the trailheads", href: "/guide/getting-around-in-levi" }
      ]
    },
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "Summer in Levi", href: "/guide/summer-in-levi" },
      { text: "Autumn and Ruska in Levi", href: "/guide/autumn-ruska-in-levi" },
      { text: "Winter Clothing Guide", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Activities in Levi", href: "/guide/activities-in-levi" },
      { label: "Hiking and Biking", href: "/activities/hiking-and-biking-levi" },
    ],
    activitiesHubLink: "/guide/activities-in-levi",
    activitiesHubText: "← Back to Activities Guide",
    accommodationsHref: "/en/accommodations",
  },
};

const HikingAndBikingLevi = ({ lang = "fi" }: HikingAndBikingLeviProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/vaellus-ja-maastopyoraily-levi",
    en: "https://leville.net/activities/hiking-and-biking-levi",
  };

  const getTimeIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case "treepine":
        return <TreePine className="w-5 h-5 text-orange-500" />;
      case "snowflake":
        return <Snowflake className="w-5 h-5 text-blue-400" />;
      default:
        return <Mountain className="w-5 h-5" />;
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.sections.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.meta.description,
    url: t.meta.canonical,
    publisher: {
      "@type": "Organization",
      name: "Leville.net",
      url: "https://leville.net",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://leville.net${item.href}`,
    })),
  };

  return (
    <>
      <HreflangTags
        currentPath={location.pathname}
        currentLang={lang}
        customUrls={hreflangUrls}
      />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />

        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={t.breadcrumbs} lang={lang} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Back to Hub */}
            <div className="mb-6">
              <Link
                to={t.activitiesHubLink}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t.activitiesHubText}
              </Link>
            </div>

            {/* Hero Section */}
            <section className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mountain className="w-10 h-10 text-primary" />
                <Bike className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.title}
              </h1>
              <p className="text-lg sm:text-xl text-primary font-medium mb-4">
                {t.subtitle}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.intro}
              </p>
            </section>

            {/* Hiking Section */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Mountain className="w-7 h-7 text-primary" />
                {t.sections.hiking.title}
              </h2>
              <p className="text-muted-foreground mb-6">{t.sections.hiking.intro}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {t.sections.hiking.trails.map((trail, idx) => (
                  <Card key={idx} className="bg-card/80 backdrop-blur-sm border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{trail.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          trail.difficulty === "Helppo" || trail.difficulty === "Easy" 
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : trail.difficulty === "Keskitaso" || trail.difficulty === "Moderate"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {trail.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-primary font-medium mb-2">{trail.distance}</p>
                      <p className="text-sm text-muted-foreground">{trail.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {lang === "fi" ? "Vaellusvinkit" : "Hiking Tips"}
                  </h3>
                  <ul className="space-y-2">
                    {t.sections.hiking.tips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Mountain Biking Section */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Bike className="w-7 h-7 text-primary" />
                {t.sections.biking.title}
              </h2>
              <p className="text-muted-foreground mb-6">{t.sections.biking.intro}</p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {t.sections.biking.highlights.map((item, idx) => (
                  <Card key={idx} className="bg-card/80 backdrop-blur-sm border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-3 font-semibold">{lang === "fi" ? "Reitti" : "Route"}</th>
                      <th className="text-left p-3 font-semibold">{lang === "fi" ? "Taso" : "Level"}</th>
                      <th className="text-left p-3 font-semibold">{lang === "fi" ? "Pituus" : "Distance"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.sections.biking.routes.map((route, idx) => (
                      <tr key={idx} className="border-b border-border/30">
                        <td className="p-3 text-foreground">{route.name}</td>
                        <td className="p-3 text-muted-foreground">{route.level}</td>
                        <td className="p-3 text-primary font-medium">{route.km}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* E-bike Section */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Battery className="w-7 h-7 text-primary" />
                {t.sections.ebike.title}
              </h2>
              <p className="text-muted-foreground mb-6">{t.sections.ebike.intro}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Summer E-biking */}
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200/50 dark:border-yellow-700/30">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      {t.sections.ebike.summer.title}
                    </h3>
                    <ul className="space-y-2">
                      {t.sections.ebike.summer.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Winter Fatbiking */}
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Snowflake className="w-5 h-5 text-blue-400" />
                      {t.sections.ebike.winter.title}
                    </h3>
                    <ul className="space-y-2">
                      {t.sections.ebike.winter.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/30">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">{t.sections.ebike.tip}</p>
                </CardContent>
              </Card>
            </section>

            {/* Best Time Section */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-7 h-7 text-primary" />
                {t.sections.bestTime.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {t.sections.bestTime.times.map((time, idx) => (
                  <Card key={idx} className="bg-card/80 backdrop-blur-sm border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        {getTimeIcon(time.icon)}
                        <h3 className="font-semibold text-foreground">{time.period}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{time.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Gear Section */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t.sections.gear.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Mountain className="w-5 h-5 text-primary" />
                      {t.sections.gear.hiking.title}
                    </h3>
                    <ul className="space-y-2">
                      {t.sections.gear.hiking.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Bike className="w-5 h-5 text-primary" />
                      {t.sections.gear.biking.title}
                    </h3>
                    <ul className="space-y-2">
                      {t.sections.gear.biking.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t.sections.faq.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {t.sections.faq.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <GuideDisclaimer lang={lang} />

            {/* Read Next */}
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* CTA Section */}
            <section className="mb-12">
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-3">{t.cta.title}</h2>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
                  <Button asChild size="lg" className="group">
                    <Link to={t.accommodationsHref}>
                      {t.cta.button}
                      <MapPin className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Related Links */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t.relatedTitle}</h2>
              <div className="flex flex-wrap gap-3">
                {t.relatedLinks.map((link, idx) => (
                  <Button key={idx} variant="outline" size="sm" asChild>
                    <Link to={link.href}>{link.text}</Link>
                  </Button>
                ))}
              </div>
            </section>
          </div>
        </main>

        <PageCTA lang={lang} />

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default HikingAndBikingLevi;
