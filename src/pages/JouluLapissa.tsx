import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Snowflake, 
  Gift, 
  Star, 
  TreePine, 
  Sparkles, 
  Heart,
  ExternalLink,
  Camera,
  Moon,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import OptimizedImage from "@/components/OptimizedImage";
import santaSitting from "@/assets/santa-sitting.jpg";
import santaWaving from "@/assets/santa-waving.png";
import santaCabin from "@/assets/santa-cabin.webp";
import christmasCozy from "@/assets/christmas-cozy.png";

interface JouluLapissakProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Joulu Lapissa – Maaginen joulukokemus Levillä | Leville.net",
      description: "Koe ainutlaatuinen joulu Lapissa! Joulupukki, revontulet, porot ja luminen talvimaisema. Varaa joulumajoitus Levillä ajoissa.",
      keywords: "joulu Lapissa, joulu Levi, Levi joulupukki, Lappi joululoma, joulunvietto Lappi",
      canonical: "https://leville.net/levi/joulu-lapissa"
    },
    title: "Joulu Lapissa",
    subtitle: "Koe taianmainen joulu lumisessa Lapissa – joulupukin kotimaassa",
    intro: "Lappi on joulun synnyinpaikka, ja Levi tarjoaa täydellisen miljöön unohtumattomaan joulukokemukseen. Luminen maisema, revontulet, porot ja joulupukin läheisyys tekevät Levin joulusta ainutlaatuisen.",
    experiencesTitle: "Jouluiset elämykset Levillä",
    experiences: [
      {
        title: "Joulupukin tapaaminen",
        description: "Tapaa aito joulupukki Levin alueella. Lapset ja aikuiset pääsevät keskustelemaan joulupukin kanssa ja ottamaan kuvia tonttujen seurassa.",
        icon: "gift"
      },
      {
        title: "Poroajelut",
        description: "Perinteinen poroajelu lumisessa maisemassa on unohtumaton kokemus. Porot kuljettavat sinut hiljaisuuden keskelle Lapin luontoon.",
        icon: "star"
      },
      {
        title: "Revontulet",
        description: "Joulukuun pimeät yöt ovat erinomaista aikaa revontulten ihailuun. Aurora Borealis tuo taianomaisen lisän jouluun.",
        icon: "moon"
      },
      {
        title: "Huskyajelut",
        description: "Huskyvaljakkoajelut tarjoavat vauhdin ja seikkailun Lapin metsiin. Koirat vetävät sinut lumisen maiseman halki.",
        icon: "sparkles"
      },
      {
        title: "Joulusaunat",
        description: "Suomalainen sauna kuuluu jouluun. Majoituksissamme on omat saunat, joissa voit rentoutua joulupyhien aikana.",
        icon: "heart"
      },
      {
        title: "Talviaktiviteetit",
        description: "Laskettelu, hiihto, lumikenkailu ja moottorikelkkailu – Levillä on tekemistä koko perheelle joulunakin.",
        icon: "snowflake"
      }
    ],
    whyTitle: "Miksi viettää joulu Levillä?",
    whyPoints: [
      "Taattu lumi – Levillä on aina valkoinen joulu",
      "Joulupukin kotimaa – aitojen joulutraditioiden äärellä",
      "Revontulet – maaginen valoshow taivaalla",
      "Rauhallinen tunnelma – irti arjen kiireistä",
      "Aktiviteetteja kaikenikäisille – laskettelu, hiihto, porosafarit",
      "Laadukkaat majoitukset – kodikas jouluasunto Levin sydämessä"
    ],
    tipsTitle: "Vinkkejä joulun viettoon",
    tips: [
      {
        title: "Varaa ajoissa",
        text: "Joulusesonki on erittäin kysytty. Varaa majoitus vähintään 6–12 kuukautta etukäteen."
      },
      {
        title: "Pakkaa lämpimästi",
        text: "Joulukuussa lämpötila voi laskea -20°C. Kerrokselliset vaatteet, villa-alusasu ja hyvät talvikengät ovat välttämättömät."
      },
      {
        title: "Varaudu pimeyteen",
        text: "Joulun aikaan päivä on lyhyt, mutta pimeys tuo esiin revontulet ja jouluvalot."
      }
    ],
    ctaTitle: "Varaa joulumajoituksesi",
    ctaText: "Joulukuu 2026 on nyt avattu myyntiin. Varaa ajoissa ja varmista unelmiesi joulukohde Levillä!",
    ctaButton: "Tutustu majoituksiin",
    backToLevi: "Takaisin Levi-sivulle",
    linksTitle: "Hyödyllisiä linkkejä"
  },
  en: {
    meta: {
      title: "Christmas in Lapland – Magical Holiday Experience in Levi | Leville.net",
      description: "Experience a unique Christmas in Lapland! Santa Claus, northern lights, reindeer and snowy winter landscapes. Book your Levi Christmas accommodation early.",
      keywords: "Christmas in Lapland, Christmas Levi, Levi Santa Claus, Lapland Christmas holiday, Christmas Finland",
      canonical: "https://leville.net/en/levi/christmas-in-lapland"
    },
    title: "Christmas in Lapland",
    subtitle: "Experience a magical Christmas in snowy Lapland – the home of Santa Claus",
    intro: "Lapland is the birthplace of Christmas, and Levi offers the perfect setting for an unforgettable Christmas experience. Snowy landscapes, northern lights, reindeer and the proximity of Santa Claus make Christmas in Levi truly unique.",
    experiencesTitle: "Christmas Experiences in Levi",
    experiences: [
      {
        title: "Meeting Santa Claus",
        description: "Meet the real Santa Claus in the Levi area. Children and adults can chat with Santa and take photos with his elves.",
        icon: "gift"
      },
      {
        title: "Reindeer Safaris",
        description: "A traditional reindeer ride through snowy landscapes is an unforgettable experience. Reindeer will take you into the peaceful Lapland nature.",
        icon: "star"
      },
      {
        title: "Northern Lights",
        description: "The dark nights of December are excellent for viewing the northern lights. Aurora Borealis adds a magical touch to Christmas.",
        icon: "moon"
      },
      {
        title: "Husky Safaris",
        description: "Husky sled rides offer speed and adventure into Lapland forests. Dogs pull you through the snowy landscape.",
        icon: "sparkles"
      },
      {
        title: "Christmas Saunas",
        description: "Finnish sauna is part of Christmas tradition. Our accommodations have private saunas where you can relax during the holidays.",
        icon: "heart"
      },
      {
        title: "Winter Activities",
        description: "Skiing, cross-country skiing, snowshoeing and snowmobiling – Levi has activities for the whole family even at Christmas.",
        icon: "snowflake"
      }
    ],
    whyTitle: "Why Spend Christmas in Levi?",
    whyPoints: [
      "Guaranteed snow – Levi always has a white Christmas",
      "Santa's homeland – authentic Christmas traditions",
      "Northern lights – magical light show in the sky",
      "Peaceful atmosphere – escape from everyday stress",
      "Activities for all ages – skiing, reindeer safaris, snowmobiling",
      "Quality accommodations – cozy Christmas apartment in Levi center"
    ],
    tipsTitle: "Tips for Your Christmas Visit",
    tips: [
      {
        title: "Book Early",
        text: "Christmas season is extremely popular. Book accommodation at least 6–12 months in advance."
      },
      {
        title: "Pack Warmly",
        text: "In December temperatures can drop to -20°C. Layered clothing, wool base layers and good winter boots are essential."
      },
      {
        title: "Embrace the Darkness",
        text: "During Christmas, daylight is short, but darkness reveals the northern lights and beautiful Christmas decorations."
      }
    ],
    ctaTitle: "Book Your Christmas Accommodation",
    ctaText: "December 2026 is now open for bookings. Book early and secure your dream Christmas destination in Levi!",
    ctaButton: "Browse accommodations",
    backToLevi: "Back to Levi page",
    linksTitle: "Useful Links"
  }
};

const usefulLinks = {
  fi: [
    { name: "Joulupukin Pajakylä", url: "https://santaclausvillage.info/fi/" },
    { name: "Levi.fi – Joulun tapahtumat", url: "https://www.levi.fi/" },
    { name: "Visit Finland – Joulu", url: "https://www.visitfinland.com/fi/" }
  ],
  en: [
    { name: "Santa Claus Village", url: "https://santaclausvillage.info/" },
    { name: "Levi.fi – Christmas Events", url: "https://www.levi.fi/en" },
    { name: "Visit Finland – Christmas", url: "https://www.visitfinland.com/" }
  ]
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  gift: Gift,
  star: Star,
  moon: Moon,
  sparkles: Sparkles,
  heart: Heart,
  snowflake: Snowflake
};

const JouluLapissa = ({ lang = "fi" }: JouluLapissakProps) => {
  const t = translations[lang];
  const links = usefulLinks[lang];
  const isEnglish = lang === "en";

  return (
    <>
      <Helmet>
        <html lang={isEnglish ? "en" : "fi"} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": isEnglish ? "Christmas in Lapland - Levi" : "Joulu Lapissa - Levi",
            "description": t.meta.description,
            "url": t.meta.canonical,
            "touristType": ["Family", "Couples", "Adventure seekers"],
            "includesAttraction": [
              {
                "@type": "TouristAttraction",
                "name": isEnglish ? "Santa Claus Experiences" : "Joulupukkielämykset"
              },
              {
                "@type": "TouristAttraction", 
                "name": isEnglish ? "Northern Lights Viewing" : "Revontulien katselu"
              },
              {
                "@type": "TouristAttraction",
                "name": isEnglish ? "Reindeer Safaris" : "Porosafarit"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <SubpageBackground />
        
        {/* Floating Christmas Decorations */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Left side decorations */}
          <Snowflake className="absolute top-32 left-4 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 text-primary/40 animate-pulse" style={{ animationDelay: '0s' }} />
          <Bell className="absolute top-52 left-6 sm:left-16 w-5 h-5 sm:w-7 sm:h-7 text-amber-500/35 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute top-80 left-3 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 text-amber-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <Snowflake className="absolute top-[28rem] left-8 sm:left-20 w-5 h-5 sm:w-6 sm:h-6 text-primary/35 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <TreePine className="absolute top-[36rem] left-4 sm:left-12 w-6 h-6 sm:w-8 sm:h-8 text-green-500/25 animate-pulse" style={{ animationDelay: '2s' }} />
          <Bell className="absolute top-[48rem] left-6 sm:left-8 w-5 h-5 sm:w-6 sm:h-6 text-amber-500/30 animate-pulse" style={{ animationDelay: '2.5s' }} />
          
          {/* Right side decorations */}
          <Star className="absolute top-40 right-4 sm:right-12 w-6 h-6 sm:w-8 sm:h-8 text-amber-400/35 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Snowflake className="absolute top-64 right-6 sm:right-8 w-5 h-5 sm:w-7 sm:h-7 text-primary/40 animate-pulse" style={{ animationDelay: '0.8s' }} />
          <Bell className="absolute top-96 right-4 sm:right-16 w-6 h-6 sm:w-7 sm:h-7 text-amber-500/30 animate-pulse" style={{ animationDelay: '1.3s' }} />
          <TreePine className="absolute top-[30rem] right-6 sm:right-10 w-6 h-6 sm:w-8 sm:h-8 text-green-500/25 animate-pulse" style={{ animationDelay: '1.8s' }} />
          <Snowflake className="absolute top-[42rem] right-8 sm:right-20 w-5 h-5 sm:w-6 sm:h-6 text-primary/35 animate-pulse" style={{ animationDelay: '2.3s' }} />
          <Star className="absolute top-[54rem] right-4 sm:right-8 w-6 h-6 sm:w-7 sm:h-7 text-amber-400/25 animate-pulse" style={{ animationDelay: '2.8s' }} />
        </div>
        
        <Header />
        <Breadcrumbs lang={lang} />
        
        <main className="pt-8 pb-20 relative z-10">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-12 sm:mb-16 px-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Snowflake className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse" />
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary/60 absolute -top-2 -right-2" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                {t.subtitle}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.intro}
              </p>
            </section>

            {/* Santa Image Section */}
            <section className="mb-12 sm:mb-16">
              <div className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto">
                <OptimizedImage 
                  src={santaSitting}
                  alt={isEnglish ? "Santa Claus in Lapland" : "Joulupukki Lapissa"}
                  className="w-full h-64 sm:h-80 md:h-96"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground font-medium text-center">
                    {isEnglish ? "The home of Santa Claus" : "Joulupukin kotimaa"}
                  </p>
                </div>
              </div>
            </section>

            {/* Christmas Experiences */}
            <section className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                {t.experiencesTitle}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {t.experiences.map((exp, index) => {
                  const IconComponent = iconMap[exp.icon];
                  return (
                    <Card key={index} className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl text-foreground">{exp.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <p className="text-sm sm:text-base text-muted-foreground">{exp.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Why Levi Section */}
            <section className="mb-12 sm:mb-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                    {t.whyTitle}
                  </h2>
                  <ul className="space-y-3">
                    {t.whyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <TreePine className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <OptimizedImage 
                    src={santaWaving}
                    alt={isEnglish ? "Santa Claus waving" : "Joulupukki vilkuttaa"}
                    className="w-full h-64 sm:h-80"
                  />
                </div>
              </div>
            </section>

            {/* Santa's Cabin Section */}
            <section className="mb-12 sm:mb-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-2xl overflow-hidden">
                  <OptimizedImage 
                    src={santaCabin}
                    alt={isEnglish ? "Santa's Cabin in Levi" : "Joulupukin mökki Levillä"}
                    className="w-full h-64 sm:h-80"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {isEnglish ? "Did you know?" : "Tiesitkö?"}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {isEnglish 
                      ? "Santa's cabin is located on the slopes of Levi! You can reach it by the Levi Black gondola lift – it's an exciting adventure for the whole family."
                      : "Joulupukin mökki löytyy Levin rinteiltä! Pääset sinne Levi Black gondolihissillä ja se on jännittävä retki koko perheelle."
                    }
                  </p>
                </div>
              </div>
            </section>

            {/* Tips Section */}
            <section className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                {t.tipsTitle}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {t.tips.map((tip, index) => (
                  <Card key={index} className="glass-card border-border/30">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                        <Camera className="w-5 h-5 text-primary" />
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <p className="text-sm text-muted-foreground">{tip.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12 sm:mb-20">
              <Card className="glass-card border-primary/30 bg-primary/5 relative overflow-hidden min-h-[320px] sm:min-h-[360px]">
                {/* Background image with fade effect */}
                <div 
                  className="absolute inset-0 opacity-45 pointer-events-none"
                  style={{
                    backgroundImage: `url(${christmasCozy})`,
                    backgroundSize: '55%',
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat',
                    maskImage: 'linear-gradient(135deg, transparent 0%, transparent 35%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)',
                    WebkitMaskImage: 'linear-gradient(135deg, transparent 0%, transparent 35%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)',
                  }}
                />
                <CardContent className="p-6 sm:p-8 md:p-12 text-center relative z-10">
                  <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {t.ctaTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
                    {t.ctaText}
                  </p>
                  <Button asChild size="lg" className="text-sm sm:text-base">
                    <Link to={isEnglish ? "/en/accommodations" : "/majoitukset"}>
                      {t.ctaButton}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Back to Levi */}
            <section className="text-center">
              <Button asChild variant="outline">
                <Link to={isEnglish ? "/en/levi" : "/levi"}>
                  ← {t.backToLevi}
                </Link>
              </Button>
            </section>
          </div>
        </main>
        
        <Footer />
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default JouluLapissa;
