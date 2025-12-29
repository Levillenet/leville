import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin, Clock, Eye, Home, ExternalLink, Smartphone, Video } from "lucide-react";
import AuroraForecast from "@/components/AuroraForecast";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppChat from "@/components/WhatsAppChat";

interface RevontuletProps {
  lang?: "fi" | "en";
}

const Revontulet = ({ lang = "fi" }: RevontuletProps) => {
  const isEnglish = lang === "en";

  const content = {
    fi: {
      meta: {
        title: "Revontulet Levillä – Aurora Borealis | Leville.net",
        description: "Koe revontulien taikuus Levillä. Parhaat paikat, ajankohdat ja vinkit revontulien seuraamiseen Lapissa.",
        canonical: "https://leville.net/revontulet",
      },
      hero: {
        title: "Revontulet Levillä",
        subtitle: "Lapin taivaan upein elämys",
      },
      intro: "Revontulet ovat yksi Lapin tunnetuimmista ja vaikuttavimmista luonnonilmiöistä. Levi kuuluu Suomen parhaisiin paikkoihin revontulien tarkkailuun, kiitos pohjoisen sijainnin, puhtaan ilman ja vähäisen valosaasteen.",
      whenTitle: "Milloin revontulia voi nähdä Levillä",
      whenText: "Revontulikausi Levillä kestää syyskuun lopusta aina maaliskuun loppuun. Parhaat kuukaudet ovat yleensä syys–lokakuu sekä helmi–maaliskuu, jolloin yöt ovat pimeitä ja sää usein selkeä.",
      whenList: [
        "Klo 21–01 välillä",
        "Selkeinä ja pakkasöinä",
        "Silloin kun aurinkoaktiivisuus on koholla",
      ],
      whenNote: "Luonto määrittää aina lopullisen näytöksen, mutta Levillä revontulia nähdään vuosittain kymmeniä öitä.",
      whereTitle: "Missä revontulia kannattaa seurata Levillä",
      whereText: "Parhaat revontulipaikat ovat avoimia ja pimeitä alueita, joissa näkymä taivaalle on esteetön. Hyviä paikkoja ovat esimerkiksi:",
      whereList: [
        "Tunturialueet ja rinteiden yläosat",
        "Järvien ja soiden rannat",
        "Majoitukset keskustan ulkopuolella tai valosaasteen ulottumattomissa",
      ],
      whereNote: "Monet vieraistamme seuraavat revontulia suoraan majoituksen pihalta, terassilta tai jopa porealtaasta, mikä tekee kokemuksesta erityisen rentouttavan ja yksityisen.",
      accommodationTitle: "Revontulet ja majoitus Levillä",
      accommodationText: "Keskeinen sijainti ei tarkoita, että revontulista pitäisi tinkiä. Useista majoituskohteistamme pääsee nopeasti rauhallisille alueille, ja osassa kohteita revontulet voivat näkyä suoraan pihapiirissä tai lähietäisyydellä.",
      accommodationNote: "Revontulien metsästys yhdistettynä laadukkaaseen majoitukseen, omaan saunaan ja Lapin rauhaan on elämys, jonka moni vieraamme muistaa loppuelämänsä.",
      videoTitle: "Revontulet liikkeessä",
      appsTitle: "Revontulisovellukset",
      appsText: "Lataa revontulihälytyssovellus puhelimeesi, niin et missaa yhtään näytöstä:",
    },
    en: {
      meta: {
        title: "Northern Lights in Levi – Aurora Borealis | Leville.net",
        description: "Experience the magic of the Northern Lights in Levi. Best locations, timing and tips for aurora watching in Lapland.",
        canonical: "https://leville.net/en/northern-lights",
      },
      hero: {
        title: "Northern Lights in Levi",
        subtitle: "The most spectacular experience in Lapland",
      },
      intro: "The Northern Lights are one of Lapland's most famous and impressive natural phenomena. Levi is one of Finland's best places to observe the aurora borealis, thanks to its northern location, clean air and minimal light pollution.",
      whenTitle: "When to see Northern Lights in Levi",
      whenText: "The aurora season in Levi lasts from late September to the end of March. The best months are usually September–October and February–March, when nights are dark and the weather is often clear.",
      whenList: [
        "Between 9 PM and 1 AM",
        "On clear and frosty nights",
        "When solar activity is elevated",
      ],
      whenNote: "Nature always determines the final show, but in Levi the Northern Lights are seen dozens of nights each year.",
      whereTitle: "Best aurora viewing spots in Levi",
      whereText: "The best aurora spots are open and dark areas with an unobstructed view of the sky. Good locations include:",
      whereList: [
        "Fell areas and upper slopes",
        "Shores of lakes and marshes",
        "Accommodations outside the center or away from light pollution",
      ],
      whereNote: "Many of our guests watch the Northern Lights directly from the accommodation yard, terrace or even the hot tub, making the experience particularly relaxing and private.",
      accommodationTitle: "Northern Lights and accommodation in Levi",
      accommodationText: "A central location doesn't mean you have to compromise on aurora viewing. From many of our accommodations you can quickly reach peaceful areas, and in some locations the Northern Lights can be seen directly in the yard or nearby.",
      accommodationNote: "Aurora hunting combined with quality accommodation, private sauna and the peace of Lapland is an experience many of our guests remember for a lifetime.",
      videoTitle: "Northern Lights in motion",
      appsTitle: "Aurora Apps",
      appsText: "Download an aurora alert app to your phone so you don't miss a single show:",
    },
  };

  const t = isEnglish ? content.en : content.fi;

  return (
    <>
      <Helmet>
        <html lang={isEnglish ? "en" : "fi"} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={isEnglish ? "Northern Lights Levi, Aurora Borealis Lapland, Levi Finland aurora" : "revontulet Levi, aurora borealis Lappi, revontulimatka Levi"} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <ScrollReveal>
              <section className="text-center mb-16">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <span className="text-purple-400 font-medium">Aurora Borealis</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                  {t.hero.title}
                </h1>
                <p className="text-xl text-primary font-medium">
                  {t.hero.subtitle}
                </p>
              </section>
            </ScrollReveal>

            {/* Intro + Forecast */}
            <section className="grid md:grid-cols-3 gap-8 mb-16">
              <ScrollReveal className="md:col-span-2">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.intro}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <AuroraForecast lang={lang} />
              </ScrollReveal>
            </section>

            {/* When Section */}
            <ScrollReveal>
              <section className="mb-16">
                <Card className="glass-card border-border/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{t.whenTitle}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{t.whenText}</p>
                    <ul className="space-y-2">
                      {t.whenList.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-foreground">
                          <span className="w-2 h-2 rounded-full bg-purple-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground italic border-t border-border/30 pt-4">
                      {t.whenNote}
                    </p>
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>

            {/* Where Section */}
            <ScrollReveal>
              <section className="mb-16">
                <Card className="glass-card border-border/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{t.whereTitle}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{t.whereText}</p>
                    <ul className="space-y-2">
                      {t.whereList.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-foreground">
                          <Eye className="w-4 h-4 text-green-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground italic border-t border-border/30 pt-4">
                      {t.whereNote}
                    </p>
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>

            {/* Video Section */}
            <ScrollReveal>
              <section className="mb-16">
                <Card className="glass-card border-border/30 overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Video className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{t.videoTitle}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="aspect-video w-full">
                      <iframe
                        src="https://www.youtube.com/embed/rKfecmmzzw0?rel=0"
                        title="Northern Lights in Levi"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>

            {/* Accommodation Section */}
            <ScrollReveal>
              <section className="mb-16">
                <Card className="glass-card border-border/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Home className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{t.accommodationTitle}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{t.accommodationText}</p>
                    <p className="text-foreground font-medium border-t border-border/30 pt-4">
                      {t.accommodationNote}
                    </p>
                    <Button asChild className="mt-4">
                      <a href={isEnglish ? "/en/accommodations" : "/majoitukset"}>
                        {isEnglish ? "Browse accommodations" : "Selaa majoituksia"}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>

            {/* Apps Section */}
            <ScrollReveal>
              <section className="text-center">
                <Card className="glass-card border-border/30">
                  <CardHeader>
                    <div className="flex items-center justify-center gap-3">
                      <Smartphone className="w-6 h-6 text-primary" />
                      <CardTitle>{t.appsTitle}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{t.appsText}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button asChild variant="outline">
                        <a 
                          href="https://play.google.com/store/apps/details?id=fi.kooditehdas.auroraalert.realtime" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                          </svg>
                          Android (Google Play)
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a 
                          href="https://apps.apple.com/fi/app/aurora-alert-realtime/id1090088498" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                          </svg>
                          iOS (App Store)
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default Revontulet;
