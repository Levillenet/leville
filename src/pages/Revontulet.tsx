import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin, Clock, Eye, Home, ExternalLink, Smartphone, Video } from "lucide-react";
import AuroraForecast from "@/components/AuroraForecast";
import { AuroraAlertSubscribe } from "@/components/AuroraAlertSubscribe";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Language } from "@/translations";

interface RevontuletProps {
  lang?: Language;
}

const Revontulet = ({ lang = "fi" }: RevontuletProps) => {
  const location = useLocation();

  const content: Record<Language, {
    meta: { title: string; description: string; canonical: string };
    hero: { title: string; subtitle: string };
    intro: string;
    whenTitle: string;
    whenText: string;
    whenList: string[];
    whenNote: string;
    whereTitle: string;
    whereText: string;
    whereList: string[];
    whereNote: string;
    accommodationTitle: string;
    accommodationText: string;
    accommodationNote: string;
    videoTitle: string;
    appsTitle: string;
    appsText: string;
    browseAccommodations: string;
  }> = {
    fi: {
      meta: {
        title: "Revontulet Levillä: Parhaat Katselupaikat & Ennuste 2026",
        description: "Näe revontulet Levillä! Paras aika syys–maaliskuu, parhaat katselupaikat ja live-ennuste. Varaa revontulimajoitus nyt.",
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
      browseAccommodations: "Selaa majoituksia",
    },
    en: {
      meta: {
        title: "Northern Lights in Levi: Best Viewing Spots & Forecast 2026",
        description: "See the aurora borealis in Levi, Finland. Best viewing times Sept–March, prime locations and live forecasts. Book aurora-friendly accommodation.",
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
      browseAccommodations: "Browse accommodations",
    },
    sv: {
      meta: {
        title: "Norrsken i Levi – Aurora Borealis | Leville.net",
        description: "Upplev norrskensmagin i Levi. Bästa platser, tider och tips för att se norrsken i Lappland.",
        canonical: "https://leville.net/sv/norrsken",
      },
      hero: {
        title: "Norrsken i Levi",
        subtitle: "Lapplands mest spektakulära upplevelse",
      },
      intro: "Norrskenet är ett av Lapplands mest kända och imponerande naturfenomen. Levi är en av Finlands bästa platser för att observera norrsken, tack vare det nordliga läget, den rena luften och minimalt ljusföroreningar.",
      whenTitle: "När kan man se norrsken i Levi",
      whenText: "Norrskensäsongen i Levi varar från slutet av september till slutet av mars. De bästa månaderna är vanligtvis september–oktober och februari–mars, då nätterna är mörka och vädret ofta är klart.",
      whenList: [
        "Mellan kl. 21 och 01",
        "Klara och frostiga nätter",
        "När solaktiviteten är förhöjd",
      ],
      whenNote: "Naturen bestämmer alltid den slutliga showen, men i Levi ses norrsken dussintals nätter varje år.",
      whereTitle: "Bästa platser att se norrsken i Levi",
      whereText: "De bästa norrskensplatserna är öppna och mörka områden med fri sikt mot himlen. Bra platser inkluderar:",
      whereList: [
        "Fjällområden och övre sluttningar",
        "Stränder vid sjöar och myrar",
        "Boenden utanför centrum eller borta från ljusföroreningar",
      ],
      whereNote: "Många av våra gäster tittar på norrskenet direkt från boendets gård, terrass eller till och med bubbelpoolen, vilket gör upplevelsen särskilt avkopplande och privat.",
      accommodationTitle: "Norrsken och boende i Levi",
      accommodationText: "Ett centralt läge betyder inte att du behöver kompromissa med norrskensobservation. Från många av våra boenden kan du snabbt nå lugna områden, och på vissa platser kan norrskenet ses direkt på gården eller i närheten.",
      accommodationNote: "Norrskenjakt kombinerat med kvalitetsboende, privat bastu och Lapplands lugn är en upplevelse som många av våra gäster minns hela livet.",
      videoTitle: "Norrsken i rörelse",
      appsTitle: "Norrskenappar",
      appsText: "Ladda ner en norrskensvarningsapp till din telefon så missar du ingen show:",
      browseAccommodations: "Bläddra bland boenden",
    },
    de: {
      meta: {
        title: "Nordlichter in Levi – Aurora Borealis | Leville.net",
        description: "Erleben Sie die Magie der Nordlichter in Levi. Beste Orte, Zeiten und Tipps zur Beobachtung der Aurora in Lappland.",
        canonical: "https://leville.net/de/nordlichter",
      },
      hero: {
        title: "Nordlichter in Levi",
        subtitle: "Das spektakulärste Erlebnis Lapplands",
      },
      intro: "Die Nordlichter gehören zu den bekanntesten und beeindruckendsten Naturphänomenen Lapplands. Levi ist einer der besten Orte Finnlands zur Beobachtung der Aurora Borealis, dank der nördlichen Lage, der sauberen Luft und der minimalen Lichtverschmutzung.",
      whenTitle: "Wann kann man Nordlichter in Levi sehen",
      whenText: "Die Nordlichtsaison in Levi dauert von Ende September bis Ende März. Die besten Monate sind normalerweise September–Oktober und Februar–März, wenn die Nächte dunkel sind und das Wetter oft klar ist.",
      whenList: [
        "Zwischen 21 und 1 Uhr",
        "An klaren und frostigen Nächten",
        "Bei erhöhter Sonnenaktivität",
      ],
      whenNote: "Die Natur bestimmt immer die endgültige Show, aber in Levi werden Nordlichter dutzende Nächte pro Jahr gesehen.",
      whereTitle: "Beste Orte für Nordlichter in Levi",
      whereText: "Die besten Aurora-Spots sind offene und dunkle Gebiete mit freier Sicht auf den Himmel. Gute Orte sind:",
      whereList: [
        "Fjellgebiete und obere Hänge",
        "Ufer von Seen und Sümpfen",
        "Unterkünfte außerhalb des Zentrums oder abseits von Lichtverschmutzung",
      ],
      whereNote: "Viele unserer Gäste beobachten die Nordlichter direkt vom Unterkunftshof, der Terrasse oder sogar dem Whirlpool aus, was das Erlebnis besonders entspannend und privat macht.",
      accommodationTitle: "Nordlichter und Unterkunft in Levi",
      accommodationText: "Eine zentrale Lage bedeutet nicht, dass Sie bei der Aurora-Beobachtung Kompromisse eingehen müssen. Von vielen unserer Unterkünfte erreichen Sie schnell ruhige Gebiete, und an einigen Standorten können die Nordlichter direkt im Hof oder in der Nähe gesehen werden.",
      accommodationNote: "Nordlichtjagd kombiniert mit Qualitätsunterkunft, privater Sauna und der Ruhe Lapplands ist ein Erlebnis, das viele unserer Gäste ein Leben lang in Erinnerung behalten.",
      videoTitle: "Nordlichter in Bewegung",
      appsTitle: "Aurora-Apps",
      appsText: "Laden Sie eine Nordlicht-Alarm-App auf Ihr Telefon, damit Sie keine Show verpassen:",
      browseAccommodations: "Unterkünfte durchsuchen",
    },
    es: {
      meta: {
        title: "Auroras Boreales en Levi – Aurora Boreal | Leville.net",
        description: "Experimenta la magia de las auroras boreales en Levi. Mejores lugares, horarios y consejos para ver auroras en Laponia.",
        canonical: "https://leville.net/es/auroras-boreales",
      },
      hero: {
        title: "Auroras Boreales en Levi",
        subtitle: "La experiencia más espectacular de Laponia",
      },
      intro: "Las auroras boreales son uno de los fenómenos naturales más famosos e impresionantes de Laponia. Levi es uno de los mejores lugares de Finlandia para observar la aurora boreal, gracias a su ubicación norteña, aire limpio y mínima contaminación lumínica.",
      whenTitle: "Cuándo ver auroras boreales en Levi",
      whenText: "La temporada de auroras en Levi dura desde finales de septiembre hasta finales de marzo. Los mejores meses suelen ser septiembre–octubre y febrero–marzo, cuando las noches son oscuras y el clima suele estar despejado.",
      whenList: [
        "Entre las 21:00 y la 1:00",
        "En noches claras y heladas",
        "Cuando la actividad solar está elevada",
      ],
      whenNote: "La naturaleza siempre determina el espectáculo final, pero en Levi las auroras boreales se ven docenas de noches cada año.",
      whereTitle: "Mejores lugares para ver auroras en Levi",
      whereText: "Los mejores lugares para ver auroras son áreas abiertas y oscuras con vista despejada al cielo. Buenos lugares incluyen:",
      whereList: [
        "Zonas de montaña y laderas superiores",
        "Orillas de lagos y pantanos",
        "Alojamientos fuera del centro o lejos de la contaminación lumínica",
      ],
      whereNote: "Muchos de nuestros huéspedes observan las auroras boreales directamente desde el patio del alojamiento, la terraza o incluso el jacuzzi, haciendo la experiencia particularmente relajante y privada.",
      accommodationTitle: "Auroras boreales y alojamiento en Levi",
      accommodationText: "Una ubicación central no significa que debas comprometer la observación de auroras. Desde muchos de nuestros alojamientos puedes llegar rápidamente a zonas tranquilas, y en algunas ubicaciones las auroras boreales pueden verse directamente en el patio o cerca.",
      accommodationNote: "La caza de auroras combinada con alojamiento de calidad, sauna privada y la paz de Laponia es una experiencia que muchos de nuestros huéspedes recuerdan toda la vida.",
      videoTitle: "Auroras boreales en movimiento",
      appsTitle: "Apps de Aurora",
      appsText: "Descarga una app de alerta de auroras en tu teléfono para no perderte ningún espectáculo:",
      browseAccommodations: "Ver alojamientos",
    },
    fr: {
      meta: {
        title: "Aurores Boréales à Levi: Meilleurs Spots & Prévisions 2026",
        description: "Observez les aurores boréales à Levi en Laponie finlandaise. Meilleure période sept–mars, lieux d'observation et prévisions. Hébergement idéal.",
        canonical: "https://leville.net/fr/aurores-boreales",
      },
      hero: {
        title: "Aurores Boréales à Levi",
        subtitle: "L'expérience la plus spectaculaire de Laponie",
      },
      intro: "Les aurores boréales sont l'un des phénomènes naturels les plus célèbres et impressionnants de Laponie. Levi est l'un des meilleurs endroits de Finlande pour observer les aurores, grâce à sa situation nordique, son air pur et sa pollution lumineuse minimale.",
      whenTitle: "Quand voir les aurores boréales à Levi",
      whenText: "La saison des aurores à Levi dure de fin septembre à fin mars. Les meilleurs mois sont généralement septembre–octobre et février–mars, quand les nuits sont sombres et le temps souvent dégagé.",
      whenList: [
        "Entre 21h et 1h",
        "Par nuits claires et glaciales",
        "Quand l'activité solaire est élevée",
      ],
      whenNote: "La nature détermine toujours le spectacle final, mais à Levi les aurores boréales sont visibles des dizaines de nuits par an.",
      whereTitle: "Meilleurs endroits pour observer les aurores à Levi",
      whereText: "Les meilleurs spots d'aurores sont des zones ouvertes et sombres avec une vue dégagée sur le ciel. Les bons endroits incluent :",
      whereList: [
        "Zones de tunturi et pentes supérieures",
        "Rives des lacs et marais",
        "Hébergements en dehors du centre ou à l'abri de la pollution lumineuse",
      ],
      whereNote: "Beaucoup de nos clients observent les aurores boréales directement depuis la cour de l'hébergement, la terrasse ou même le jacuzzi, rendant l'expérience particulièrement relaxante et privée.",
      accommodationTitle: "Aurores boréales et hébergement à Levi",
      accommodationText: "Un emplacement central ne signifie pas que vous devez faire des compromis sur l'observation des aurores. Depuis bon nombre de nos hébergements, vous pouvez rapidement rejoindre des zones tranquilles, et à certains endroits les aurores boréales peuvent être vues directement dans la cour ou à proximité.",
      accommodationNote: "La chasse aux aurores combinée à un hébergement de qualité, un sauna privé et la tranquillité de la Laponie est une expérience dont beaucoup de nos clients se souviennent toute leur vie.",
      videoTitle: "Aurores boréales en mouvement",
      appsTitle: "Applications Aurora",
      appsText: "Téléchargez une application d'alerte aurore sur votre téléphone pour ne manquer aucun spectacle :",
      browseAccommodations: "Parcourir les hébergements",
    },
  };

  const t = content[lang];
  const accommodationLinks: Record<Language, string> = {
    fi: "/majoitukset",
    en: "/en/accommodations",
    sv: "/sv/boenden",
    de: "/de/unterkuenfte",
    es: "/es/alojamientos",
    fr: "/fr/hebergements",
  };

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={lang === "fi" ? "revontulet Levi, aurora borealis Lappi, revontulimatka Levi" : "Northern Lights Levi, Aurora Borealis Lapland, Levi Finland aurora"} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "sv" ? "sv_SE" : lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "fr" ? "fr_FR" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
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

            {/* Intro */}
            <ScrollReveal>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-4xl mx-auto text-center">
                {t.intro}
              </p>
            </ScrollReveal>

            {/* Forecast + Alert side by side */}
            <section className="grid md:grid-cols-2 gap-6 mb-16">
              <ScrollReveal>
                <AuroraForecast lang={lang} />
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <AuroraAlertSubscribe lang={lang} />
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
                      <a href={accommodationLinks[lang]}>
                        {t.browseAccommodations}
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
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default Revontulet;
