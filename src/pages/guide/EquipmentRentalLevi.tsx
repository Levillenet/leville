import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getFAQSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Snowflake, MapPin, Clock, Star, Info, Heart, ShoppingBag, Users } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface EquipmentRentalLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Välinevuokraus Levillä — Sukset, laudat ja hinnat | Leville.net",
      description: "Opas välinevuokraukseen Levillä: missä vuokrata, mitä maksaa, ennakkovaraus ja vinkit. Laskettelu-, hiihto- ja lumilautavarusteet.",
      canonical: "https://leville.net/opas/valinevuokraus-levilla"
    },
    h1: "Välinevuokraus Levillä — kaikki mitä tarvitset tietää",
    intro: "Välineiden vuokraaminen Levillä on helppoa, edullista ja järkevää. Tässä oppaassa kerromme missä vuokraamot sijaitsevat, mitä ne tarjoavat ja miten saat parhaan kokemuksen.",
    sections: {
      why: {
        title: "Miksi vuokrata paikan päältä?",
        content: "Vuokraaminen on Levillä helpompaa kuin omien välineiden raahaaminen. Ei lennon ylipainomaksuja, saat tuoreet ja huolletut välineet, ja asiantunteva henkilökunta auttaa valinnassa. Erityisesti lasten välineet kannattaa aina vuokrata — lapset kasvavat nopeasti."
      },
      what: {
        title: "Mitä vuokraamoista saa?",
        items: [
          "Laskettelusetti (sukset/lauta, monot, sauvat, kypärä)",
          "Lumilautasetti (lauta, siteet, monot, kypärä)",
          "Murtomaahiihtosetti (sukset, monot, sauvat — klassinen tai vapaa tyyli)",
          "Lumikengät",
          "Fatbike",
          "Talvivaatteita (haalari, hanskat, kengät) osasta vuokraamoista",
          "Lasten välineet kaikissa kategorioissa"
        ]
      },
      where: {
        title: "Missä vuokraamot sijaitsevat?",
        content: "Vuokraamoja on useita Levin keskustassa. Suurimmat sijaitsevat Zero Pointilla (eturinteiden juurella) ja South Pointilla (etelärinteet). Keskustan liikkeet ovat kävelymatkan päässä useimmista majoituksista. Moni vuokraamo tarjoaa myös huoltopalvelua (teroitus, voitelu)."
      },
      booking: {
        title: "Ennakkovaraus",
        content: "Varaa välineet verkosta etukäteen erityisesti hiihtolomaviikoilla (vk 8–10) ja jouluna — suosituimmat koot ja mallit voivat loppua. Verkkovarauksesta saa usein pienen alennuksen. Nouto onnistuu yleensä edellisenä iltana, joten ensimmäinen lomapäivä ei kulu jonotukseen."
      },
      tips: {
        title: "Vinkkejä",
        items: [
          "Monot ovat tärkein osa — kerro vuokraamossa jalkojen koko ja taso, niin he löytävät sopivat",
          "Kokeile monoja sisällä ennen rinteeseen menoa — vaihto on helpompaa vuokraamossa kuin rinteen juurella",
          "Kypärä on pakollinen lapsille ja vahvasti suositeltava aikuisille",
          "Jos hiihdät sekä klassista että vapaata, tarvitset eri sukset — kysy yhdistelmähintaa"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Paljonko vuokraus maksaa?", a: "Hinta riippuu välineistä ja kaudesta. Katso suuntaa-antavat hinnat hintaoppaasta." },
        { q: "Pitääkö varata ennakkoon?", a: "Sesonkiviikkoina kyllä. Muulloin usein saa paikan päältä." },
        { q: "Saako lasten välineitä?", a: "Kyllä, kaikista vuokraamoista. Lapsille vuokraaminen on aina järkevämpää kuin ostaminen." },
        { q: "Missä välineet haetaan ja palautetaan?", a: "Samasta vuokraamosta. Yleensä Zero Point tai keskustan liike." }
      ]
    },
    cta: {
      text: "Majoitu lähellä vuokraamoja — kaikki kohteemme ovat kävelymatkan päässä Zero Pointista.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja vinkit", href: "/opas/laskettelu-levi" },
        { title: "Hiihto Levillä", desc: "Yli 230 km latuja", href: "/opas/hiihtoladut-levi" },
        { title: "Hinnat Levillä", desc: "Mitä loma maksaa?", href: "/opas/hinnat-levilla" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Välinevuokraus"
  },
  en: {
    meta: {
      title: "Equipment Rental in Levi — Skis, Boards & Prices | Leville.net",
      description: "Guide to equipment rental in Levi: where to rent, prices, advance booking and tips. Alpine, cross-country and snowboard gear.",
      canonical: "https://leville.net/guide/equipment-rental-in-levi"
    },
    h1: "Equipment Rental in Levi — Everything You Need to Know",
    intro: "Renting equipment in Levi is easy, affordable and smart. This guide covers where the rental shops are, what they offer and how to get the best experience.",
    sections: {
      why: {
        title: "Why Rent Locally?",
        content: "Renting in Levi is easier than dragging your own gear. No excess baggage fees on flights, you get fresh and serviced equipment, and expert staff help you choose. Children's equipment should always be rented — kids grow fast."
      },
      what: {
        title: "What Can You Rent?",
        items: [
          "Alpine ski set (skis/board, boots, poles, helmet)",
          "Snowboard set (board, bindings, boots, helmet)",
          "Cross-country ski set (skis, boots, poles — classic or skating)",
          "Snowshoes",
          "Fatbike",
          "Winter clothing (overall, gloves, boots) from some shops",
          "Children's equipment in all categories"
        ]
      },
      where: {
        title: "Where Are the Rental Shops?",
        content: "There are several rental shops in Levi centre. The largest are located at Zero Point (base of the front slopes) and South Point (south slopes). The centre shops are within walking distance of most accommodation. Many also offer maintenance services (edge sharpening, waxing)."
      },
      booking: {
        title: "Advance Booking",
        content: "Book equipment online in advance, especially during ski holiday weeks (weeks 8–10) and Christmas — popular sizes and models can sell out. Online booking often gives a small discount. Pick-up is usually possible the evening before, so your first holiday day isn't spent queuing."
      },
      tips: {
        title: "Tips",
        items: [
          "Boots are the most important part — tell the shop your foot size and level and they'll find the right ones",
          "Try boots indoors before heading to the slopes — swapping is easier at the shop than at the base",
          "Helmets are mandatory for children and strongly recommended for adults",
          "If you ski both classic and skating, you need different skis — ask about combo pricing"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "How much does rental cost?", a: "Prices depend on equipment and season. See indicative prices in our price guide." },
        { q: "Should I book in advance?", a: "During peak weeks, yes. At other times you can often get gear on the spot." },
        { q: "Can I rent children's equipment?", a: "Yes, from all rental shops. Renting for children always makes more sense than buying." },
        { q: "Where do I pick up and return?", a: "At the same rental shop. Usually Zero Point or a centre shop." }
      ]
    },
    cta: {
      text: "Stay close to the rental shops — all our properties are within walking distance of Zero Point.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "43 slopes and tips", href: "/guide/skiing-in-levi" },
        { title: "Cross-Country Skiing", desc: "Over 230 km of trails", href: "/guide/cross-country-skiing-in-levi" },
        { title: "Prices in Levi", desc: "What does it cost?", href: "/guide/prices-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Equipment Rental"
  }
};

const EquipmentRentalLevi = ({ lang = "fi" }: EquipmentRentalLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/valinevuokraus-levilla",
    en: "/guide/equipment-rental-in-levi"
  };

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Guide" : "Opas", href: lang === "en" ? "/en/levi" : "/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.h1, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getFAQSchema(t.faq.items.map(item => ({ question: item.q, answer: item.a })))} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={customUrls} />
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
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.h1}</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Why rent */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.why.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.why.content}</p>
            </section>

            {/* What to rent */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.what.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.what.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Where */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.where.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.where.content}</p>
            </section>

            {/* Advance booking */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.booking.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.booking.content}</p>
            </section>

            {/* Tips */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.tips.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.tips.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <GuideDisclaimer lang={lang} />

            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* CTA */}
            <section className="text-center mb-8">
              <Card className="glass-card border-border/30 p-8">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
                <Button asChild>
                  <Link to={t.cta.link}>
                    {t.cta.button}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </Card>
            </section>
          </div>
        </main>

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default EquipmentRentalLevi;
