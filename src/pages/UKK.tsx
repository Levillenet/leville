import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations, Language } from "@/translations";

interface UKKProps {
  lang?: Language;
}

const UKK = ({ lang = "fi" }: UKKProps) => {
  const t = getTranslations(lang).ukk;

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        {lang === "en" && <html lang="en" />}
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </section>

            {/* FAQ Accordion */}
            <section className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {t.faqs.map((faq, index) => (
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
