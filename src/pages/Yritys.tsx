import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Building, Home, Users, Briefcase, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Building,
    title: "Huoneistomajoitus Levillä",
    description: "Yksiöistä suuriin lomahuoneistoihin",
  },
  {
    icon: Home,
    title: "Mökki vuokralle Leviltä",
    description: "Kodikkaat mökit Lapin tunturimaisemissa",
  },
  {
    icon: Users,
    title: "Loma-asunto Levi",
    description: "Täydellinen vaihtoehto perheille ja ystäväporukoille",
  },
  {
    icon: Briefcase,
    title: "Yritysmajoitus Levillä",
    description: "Joustavat ratkaisut työmatkailuun ja tiimeille",
  },
  {
    icon: MapPin,
    title: "Majoitus Lapissa",
    description: "Suoraan omistajalta – ilman välikäsiä, ilman piilokuluja",
  },
];

const benefits = [
  "Luotettava toimija vuodesta 2011",
  "Suorat varaukset – paras hinta ja nopea palvelu",
  "Henkilökohtainen palvelu – ei välikäsiä",
  "Erinomainen sijainti – Kohteemme Levin keskustassa",
  "Laadukas, vastuullinen ja joustava majoitus Levillä",
];

const Yritys = () => {
  return (
    <>
      <Helmet>
        <title>Tietoa yrityksestämme | Leville.net – Majoitusta Levillä vuodesta 2011</title>
        <meta 
          name="description" 
          content="Leville.net on suomalainen yritys, joka tarjoaa laadukasta majoitusta Levillä vuodesta 2011. Vuokraamme omia huoneistoja ja mökkejä – edulliset hinnat ja henkilökohtainen palvelu." 
        />
        <meta name="keywords" content="Leville.net yritys, majoitus Levi, huoneisto Levi, mökki Levi, loma-asunto Lappi" />
        <link rel="canonical" href="https://leville.net/yritys" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Yrityksemme
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Etsitkö majoitusta Leviltä helposti, nopeasti ja ilman välikäsiä?
              </p>
            </section>

            {/* Main Introduction */}
            <section className="max-w-4xl mx-auto mb-20">
              <Card className="glass-card border-border/30 p-8 md:p-12">
                <CardContent className="p-0 space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-semibold">Leville.net</span> on suomalainen yritys, joka on tarjonnut laadukasta majoitusta Levillä jo vuodesta 2011. Olemme kehittyvä ja kasvava majoitusyritys Levillä, joka ei toimi perinteisen välittäjän tavoin – vuokraamme vain omia huoneistoja ja mökkejämme Levillä, mikä mahdollistaa edulliset hinnat ja henkilökohtaisen palvelun kaikissa tilanteissa.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Services Grid */}
            <section className="mb-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                Meiltä saat
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card key={service.title} className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Custom Solutions */}
            <section className="max-w-4xl mx-auto mb-20">
              <Card className="glass-card border-border/30 p-8 md:p-12">
                <CardContent className="p-0 space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">Räätälöityjä ratkaisuja</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Teemme räätälöityjä tarjouksia isoille ryhmille, matkatoimistoille ja yrityksille. Jos suunnittelet talvilomaa Levillä, kesälomaa Lapissa tai tarvitset huoneiston Leviltä pidemmäksi aikaa, ota rohkeasti yhteyttä. Pyrimme aina joustamaan tulo- ja lähtöajoissa, mikä tekee meistä suositun myös loma-asuntojen vuokraajille Levillä.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Kaikki huoneistomme ovat siistejä, hyvin varusteltuja ja kodikkaita. Monissa kohteissa on myös viilennys, joka on erinomainen lisä kesäkuukausina. Sijainnimme ovat erinomaisia – huoneistot sijaitsevat Levin keskustassa, lähellä rinteitä, hiihtolatuja, kauppoja, ravintoloita ja ohjelmapalveluita.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Why Choose Us */}
            <section className="mb-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                Miksi valita Leville.net?
              </h2>
              <div className="max-w-2xl mx-auto">
                <Card className="glass-card border-border/30 p-8">
                  <CardContent className="p-0">
                    <ul className="space-y-4">
                      {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-green-500" />
                          </div>
                          <span className="text-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center max-w-3xl mx-auto">
              <Card className="glass-card border-primary/30 p-8 md:p-12">
                <CardContent className="p-0 space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Olitpa tulossa laskettelemaan, golfaamaan, nauttimaan Lapin luonnosta tai työreissulle pohjoiseen, <span className="text-foreground font-semibold">Leville.net</span> tarjoaa parasta majoitusta Levillä – suoraan ja helposti.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                      <Link to="/majoitukset">
                        Tutustu kohteisiimme
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/yhteystiedot">
                        <Mail className="w-4 h-4 mr-2" />
                        Ota yhteyttä
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Yritys;
