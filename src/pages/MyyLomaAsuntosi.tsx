import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubpageBackground from "@/components/SubpageBackground";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Phone, Home, Building2, TreePine, Send, Loader2, CheckCircle2, Scale, Handshake } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import ScrollReveal from "@/components/ScrollReveal";

const formSchema = z.object({
  name: z.string().trim().min(2, "Nimi on pakollinen").max(100, "Nimi voi olla enintään 100 merkkiä"),
  email: z.string().trim().email("Virheellinen sähköpostiosoite").max(255, "Sähköposti voi olla enintään 255 merkkiä"),
  phone: z.string().trim().max(30, "Puhelinnumero voi olla enintään 30 merkkiä").optional(),
  address: z.string().trim().min(3, "Kohteen osoite on pakollinen").max(200, "Osoite voi olla enintään 200 merkkiä"),
  propertyType: z.enum(["loma-asunto", "talo", "muu"]),
  message: z.string().trim().max(2000, "Viesti voi olla enintään 2000 merkkiä").optional(),
});

type FormData = z.infer<typeof formSchema>;

const MyyLomaAsuntosi = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "loma-asunto",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const breadcrumbItems = [
    { label: "Etusivu", href: "/" },
    { label: "Myy loma-asuntosi", href: "/myy-loma-asuntosi", current: true },
  ];

  const processSteps = [
    {
      number: 1,
      title: "Ota yhteyttä",
      description: "Täytä lomake tai soita meille. Vastaamme yhteydenottoon 1-2 arkipäivän kuluessa.",
    },
    {
      number: 2,
      title: "Arviointi",
      description:
        "Tutustumme kohteen tietoihin ja sovimme tarvittaessa katselun. Arviointi on maksuton ja sitoumukseton.",
    },
    {
      number: 3,
      title: "Tarjous",
      description: "Teemme reilun tarjouksen käypään markkinahintaan. Ei välityspalkkioita tai piilokustannuksia.",
    },
    {
      number: 4,
      title: "Kauppa",
      description: "Hoidamme kaupan sujuvasti ja maksamme kauppahinnan nopealla aikataululla.",
    },
  ];

  const benefits = [
    "Ostamme loma-asuntoja ja taloja Levin keskustasta",
    "Käypä markkinahinta ilman välittäjäkuluja",
    "Nopea ja vaivaton prosessi",
    "Yli 14 vuotta kokemusta Levin markkinasta",
    "Maksamme käteisellä, ei rahoitusehtoja",
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-property-inquiry", {
        body: result.data,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Kiitos yhteydenotostasi!",
        description: "Otamme sinuun yhteyttä pian.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Virhe lomakkeen lähetyksessä",
        description: "Yritä uudelleen tai ota yhteyttä puhelimitse.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Leville.net",
    description: "Ostamme loma-asuntoja ja taloja Levin keskustasta käypään markkinahintaan.",
    url: "https://leville.net/myy-loma-asuntosi",
    telephone: "+358441313313",
    email: "info@leville.net",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Levi",
      addressRegion: "Lappi",
      addressCountry: "FI",
    },
  };

  return (
    <>
      <Helmet>
        <title>Myy loma-asuntosi Levillä | Leville.net</title>
        <meta
          name="description"
          content="Myy loma-asunto tai mökki Levillä suoraan meille – vaihtoehto välittäjälle. Käypä hinta, ei välityspalkkioita. Nopea arvio."
        />
        <link rel="canonical" href="https://leville.net/myy-loma-asuntosi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Myy loma-asuntosi Levillä | Leville.net" />
        <meta
          property="og:description"
          content="Myy loma-asunto tai mökki Levillä suoraan meille. Ostamme käypään hintaan ilman välityspalkkioita."
        />
        <meta property="og:url" content="https://leville.net/myy-loma-asuntosi" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Myy loma-asuntosi Levillä | Leville.net" />
        <meta
          name="twitter:description"
          content="Myy loma-asunto tai mökki Levillä suoraan meille. Nopea prosessi, ei välityspalkkioita."
        />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <SubpageBackground />
        <Header />

        <main className="pt-32 pb-20 relative z-10">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Hero Section */}
            <ScrollReveal>
              <section className="text-center mb-16 max-w-4xl mx-auto">
                <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-6 tracking-wider uppercase">
                  Myy loma-asuntosi
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                  Myy loma-asuntosi suoraan meille
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  Ostamme loma-asuntoja ja kokonaisia taloja Levin keskustasta käypään markkinahintaan. Prosessimme on
                  nopea, vaivaton ja läpinäkyvä – ilman välityspalkkioita.
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  {["Nopea prosessi", "Ei välityspalkkioita", "Reilu hinta"].map((badge) => (
                    <div key={badge} className="flex items-center gap-2 text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Process Steps */}
            <ScrollReveal delay={0.1}>
              <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  Näin se toimii
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {processSteps.map((step, index) => (
                    <div key={step.number} className="glass-card p-6 rounded-2xl text-center relative">
                      <div className="w-14 h-14 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/4 -right-3 w-6 h-0.5 bg-amber-500/50" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Benefits & Form Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Benefits */}
              <ScrollReveal delay={0.2}>
                <section className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-foreground">
                    Miksi myydä meille?
                  </h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* WhatsApp CTA */}
                  <div className="mt-10 p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                    <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Soita tai lähetä viesti
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Tavoitat meidät myös suoraan puhelimitse tai WhatsAppilla.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:+35844131313"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        +358 44 131 313
                      </a>
                      <a
                        href="https://wa.me/35844131313?text=Hei!%20Haluaisin%20myydä%20loma-asuntoni%20Levillä."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                      >
                        <WhatsAppIcon className="w-5 h-5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* Contact Form */}
              <ScrollReveal delay={0.3}>
                <section className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">Ota yhteyttä</h2>
                  <p className="text-muted-foreground mb-8">
                    Kerro meille kohteestasi, niin otamme sinuun yhteyttä mahdollisimman pian.
                  </p>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3 text-foreground">Kiitos yhteydenotostasi!</h3>
                      <p className="text-muted-foreground">
                        Olemme vastaanottaneet tietosi ja otamme sinuun yhteyttä pian.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-foreground">
                            Nimi *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Etunimi Sukunimi"
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground">
                            Sähköposti *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="nimi@esimerkki.fi"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-foreground">
                            Puhelinnumero
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+358 40 123 4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-foreground">
                            Kohteen osoite/sijainti *
                          </Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="Esim. Tunturitie 5, Levi"
                            className={errors.address ? "border-destructive" : ""}
                          />
                          {errors.address && <p className="text-destructive text-sm">{errors.address}</p>}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-foreground">Kohteen tyyppi *</Label>
                        <RadioGroup
                          value={formData.propertyType}
                          onValueChange={(value) => handleInputChange("propertyType", value)}
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="loma-asunto" id="loma-asunto" />
                            <Label htmlFor="loma-asunto" className="flex items-center gap-2 cursor-pointer">
                              <Building2 className="w-4 h-4" />
                              Loma-asunto
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="talo" id="talo" />
                            <Label htmlFor="talo" className="flex items-center gap-2 cursor-pointer">
                              <Home className="w-4 h-4" />
                              Talo
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="muu" id="muu" />
                            <Label htmlFor="muu" className="flex items-center gap-2 cursor-pointer">
                              <TreePine className="w-4 h-4" />
                              Muu
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          Lisätiedot kohteesta
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Kerro lisätietoja kohteestasi, esim. koko, kunto, rakennusvuosi..."
                          rows={4}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Lähetetään...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Lähetä yhteydenotto
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </section>
              </ScrollReveal>
            </div>

            {/* Comparison Section */}
            <ScrollReveal delay={0.4}>
              <section className="mt-20 mb-16 max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  Myynti välittäjän kautta vai suoraan ostajalle?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Broker Option */}
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <Scale className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Välittäjän kautta</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Perinteinen tapa myydä loma-asunto. Välittäjä hoitaa markkinoinnin, näytöt ja neuvottelut.
                      Prosessi voi kestää useita kuukausia riippuen markkinatilanteesta ja kohteen kysynnästä.
                    </p>
                  </div>

                  {/* Direct Sale Option */}
                  <div className="glass-card p-6 rounded-2xl border-2 border-amber-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <Handshake className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Suora myynti ostajalle</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Myyt suoraan kiinnostuneelle ostajalle ilman välikäsiä. Prosessi on usein nopeampi ja säästyt
                      välityspalkkiolta. Sopii erityisesti, kun haluat varmuuden kaupasta.
                    </p>
                  </div>
                </div>
                <p className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto">
                  Molemmat vaihtoehdot toimivat – valinta riippuu tilanteestasi ja aikataulustasi. Suora myynti sopii
                  erityisesti silloin, kun haluat varmistaa nopean ja selkeän kaupan ilman kuluja. Saat kauppahinnan
                  tilillesi parhaimmillaan päivissä.
                </p>
              </section>
            </ScrollReveal>

            {/* FAQ Section */}
            <ScrollReveal delay={0.5}>
              <section className="mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  Usein kysytyt kysymykset loma-asunnon myynnistä Levillä
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="faq-1" className="glass-card border-white/10 px-6 rounded-xl">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      Tarvitaanko välittäjää loma-asunnon myyntiin Levillä?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Ei välttämättä. Voit myydä loma-asuntosi myös suoraan ostajalle. Välittäjä auttaa markkinoinnissa
                      ja näytöissä, mutta suora myynti on usein nopeampi ja edullisempi vaihtoehto. Valinta riippuu
                      omista toiveistasi, tavoitteistasi ja aikataulustasi.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2" className="glass-card border-white/10 px-6 rounded-xl">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      Kannattaako loma-asunto myydä välittäjän kautta vai suoraan ostajalle?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Molemmissa vaihtoehdoissa on puolensa. Välittäjä voi tavoittaa laajan ostajajoukon, mutta
                      veloittaa palkkion. Suorassa myynnissä säästät välityspalkkion ja prosessi on usein nopea, kun
                      ostaja on jo valmiina.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3" className="glass-card border-white/10 px-6 rounded-xl">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      Onko yhteydenotto teihin sitova?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Ei. Yhteydenotto ja arvio ovat täysin maksuttomia ja sitoumuksettomia. Saat rauhassa harkita
                      tarjousta ennen päätöstä.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-4" className="glass-card border-white/10 px-6 rounded-xl">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      Miten loma-asunnon hinta määritellään?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Arvioimme kohteen käyvän markkinahinnan perustuen sijaintiin, kuntoon, kokoon ja Levin alueen
                      hintatasoon. Käytämme vertailuaineistona myös toteutuneita kauppahintoja.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-5" className="glass-card border-white/10 px-6 rounded-xl">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      Kuinka nopeasti kaupat voidaan tehdä?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Parhaimmillaan kauppa voidaan tehdä päivissä. Pyrimme aina joustavuuteen sinun aikataulusi mukaan.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-6" className="glass-card border-white/10 px-6 rounded-xl">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      Voinko myydä kohteen, vaikka se olisi vuokrakäytössä?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Kyllä. Vuokrakäytössä oleva loma-asunto voidaan myydä. Käymme tilanteen läpi ja sovimme yhdessä
                      siirtymäaikataulun, joka sopii kaikille osapuolille. Tulevaisuuden vuokraukset voidaan jättää
                      huoneistoon, samoin pitkäaikainen vuokralainen
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </ScrollReveal>
          </div>
        </main>

        <Footer lang="fi" />
      </div>
    </>
  );
};

export default MyyLomaAsuntosi;
