import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Mihin aikaan voin saapua majoitukseen?",
    answer: "Sisäänkirjautuminen on klo 16:00 alkaen ja uloskirjautuminen viimeistään klo 11:00. Mikäli tarvitset joustoa aikoihin, ota meihin yhteyttä etukäteen.",
  },
  {
    question: "Onko majoituksissa WiFi?",
    answer: "Kyllä, kaikissa majoituksissamme on ilmainen langaton nettiyhteys.",
  },
  {
    question: "Voiko lemmikkieläimen tuoda mukaan?",
    answer: "Osaan majoituksistamme lemmikit ovat tervetulleita lisämaksusta. Tarkista lemmikkiystävällisyys varatessasi ja ilmoita meille lemmikistä etukäteen.",
  },
  {
    question: "Miten peruutus toimii?",
    answer: "Ilmainen peruutus on mahdollista 14 vuorokautta ennen saapumista. Myöhemmistä peruutuksista veloitamme ensimmäisen yön hinnan. Katso tarkemmat ehdot varausvahvistuksesta.",
  },
  {
    question: "Kuinka kaukana rinteet ovat majoituksista?",
    answer: "Useimmat majoituksemme sijaitsevat aivan Levin keskustassa, kävelymatkan päässä rinteistä ja hisseistä. Tarkka etäisyys ilmoitetaan kunkin majoituksen tiedoissa.",
  },
  {
    question: "Onko pysäköinti maksullista?",
    answer: "Ei, pysäköinti on ilmaista kaikissa majoituksissamme. Autopaikkoja on rajoitetusti, mutta yleensä tilaa löytyy.",
  },
  {
    question: "Onko majoituksissa sauna?",
    answer: "Kyllä, useimmissa huoneistoissamme ja mökeissämme on oma sauna. Tarkista saatavuus varatessasi.",
  },
  {
    question: "Miten saan avaimen majoitukseen?",
    answer: "Lähetämme saapumisohjeet ja avainkoodin sähköpostitse ennen saapumistasi. Käytössä on sähköiset lukot, joten avainten nouto ei ole tarpeen.",
  },
];

const UKK = () => {
  return (
    <>
      <Helmet>
        <title>Usein kysytyt kysymykset | Leville.net</title>
        <meta 
          name="description" 
          content="Vastauksia yleisimpiin kysymyksiin Leville.net majoituksista: sisäänkirjautuminen, peruutusehdot, lemmikit, WiFi ja paljon muuta." 
        />
        <meta name="keywords" content="Leville UKK, Levi majoitus kysymykset, Levi varaus tiedot" />
        <link rel="canonical" href="https://leville.net/ukk" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Usein kysytyt kysymykset
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Löydätkö vastauksesi alta? Jos ei, ota rohkeasti yhteyttä – autamme mielellämme!
              </p>
            </section>

            {/* FAQ Accordion */}
            <section className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="glass-card border-border/30 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default UKK;
