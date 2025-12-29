import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Building, Home, Users, Briefcase, MapPin, Mail, Star, Quote } from "lucide-react";
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

const testimonials = [
  {
    name: "Laura M.",
    location: "Helsinki",
    rating: 5,
    text: "Todella loistava majoitus Levillä. Sijainti oli aivan täydellinen, kaikki palvelut ja rinteet kävelymatkan päässä, mutta silti rauhallinen ympäristö. Asunto oli erittäin siisti ja hyvin varusteltu, ja kaikki toimi juuri kuten oli luvattu. Asiakaspalvelu oli poikkeuksellisen ystävällistä ja nopeaa, kysymyksiin vastattiin heti. Tulemme ehdottomasti uudelleen.",
  },
  {
    name: "James W.",
    location: "United Kingdom",
    rating: 5,
    text: "Fantastic place to stay in Levi. The apartment was spacious, clean and very comfortable, exactly as described. Location could not be better, close to restaurants, ski lifts and shops. Communication was excellent from start to finish and everything was very well organised. One of the smoothest holiday stays we have ever had.",
  },
  {
    name: "Mikko S.",
    location: "Tampere",
    rating: 5,
    text: "Erittäin onnistunut reissu. Majoitus oli laadukas ja vastasi täysin odotuksia, jopa ylitti ne. Sijainti teki lomasta helpon, ei tarvinnut autoa lainkaan. Asiakaspalvelu oli joustavaa ja ammattimaista, tuli tunne että asiakkaasta oikeasti välitetään. Harvinaisen toimiva kokonaisuus.",
  },
  {
    name: "Anna-Lena K.",
    location: "Germany",
    rating: 5,
    text: "We had a wonderful stay. The apartment was cozy, modern and very well equipped, perfect for a winter holiday. The location was excellent, everything in Levi centre was close by. Customer service was outstanding, friendly, helpful and always available when needed. Highly recommended.",
  },
  {
    name: "Petri ja Sari L.",
    location: "Turku",
    rating: 5,
    text: "Kaikki sujui alusta loppuun todella vaivattomasti. Varaus, ohjeet ja sisäänkirjautuminen olivat selkeitä. Majoitus oli lämmin, viihtyisä ja hyväkuntoinen, juuri sellainen kuin lomalla toivoo. Sijainti Levillä oli erinomainen ja asiakaspalvelu ansaitsee erityismaininnan nopeudesta ja ystävällisyydestä.",
  },
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

            {/* Customer Testimonials */}
            <section className="mb-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
                Asiakkaiden kokemuksia
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Lue mitä asiakkaamme sanovat majoituksistamme
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={index} 
                    className="glass-card border-border/30 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
                  >
                    <CardContent className="p-6 relative">
                      {/* Quote icon */}
                      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                      
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      
                      {/* Review text */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-5">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-aurora-green/30 flex items-center justify-center">
                          <span className="text-foreground font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm">{testimonial.name}</p>
                          <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
