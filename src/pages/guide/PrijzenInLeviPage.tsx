import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import SeoMeta from "@/components/SeoMeta";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import {
  Euro,
  Mountain,
  UtensilsCrossed,
  ShoppingCart,
  Snowflake,
  Dog,
  Bus,
  Info,
  ExternalLink,
  Home,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TipBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-4 border-accent bg-accent/10 rounded-r-lg p-4 my-4 flex gap-3">
    <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
    <div className="text-sm text-foreground/90">{children}</div>
  </div>
);

const PriceTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto my-4 rounded-lg border border-border">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-muted/50">
          {headers.map((h, i) => (
            <th key={i} className="text-left p-3 font-semibold text-foreground whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`p-3 whitespace-nowrap ${j > 0 ? "font-medium" : ""}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SectionCard = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <Card className="mb-8 bg-card/80 backdrop-blur border-border">
    <CardContent className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-accent" />
        {title}
      </h2>
      {children}
    </CardContent>
  </Card>
);

const PrijzenInLeviPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/nl" },
    { label: "Levi-gids", href: "/nl/gids/reisgids-levi" },
    { label: "Prijzen in Levi", href: "/nl/gids/prijzen-in-levi" },
  ];

  const faqItems = [
    {
      q: "Wordt kaartbetaling overal geaccepteerd in Levi?",
      a: "Ja. Finland is bijna volledig overgestapt op kaartbetaling. Visa en Mastercard worden overal geaccepteerd — restaurants, winkels, skipaskassa's en taxi's. Je hebt zelden contant geld nodig, maar een klein bedrag kan handig zijn op vlooienmarkten.",
    },
    {
      q: "Heb ik contant geld nodig in Levi?",
      a: "Praktisch niet. Zelfs de Ski Bus accepteert alleen kaartbetaling. Je hebt misschien contant geld nodig op kleine markten of vlooienmarkten. Er is een geldautomaat bij S-Market.",
    },
    {
      q: "Is Levi duur vergeleken met Alpenresorts?",
      a: "Skipassen en materiaalverhuur zijn in Levi goedkoper dan in de meeste Alpenlanden. Eten is vergelijkbaar. Het grootste verschil is alcohol — drankjes in Finse restaurants zijn merkbaar duurder dan in Oostenrijk of Frankrijk door de Finse alcoholbelasting.",
    },
    {
      q: "Wanneer is Levi het goedkoopst?",
      a: "Januari (poolnachtseizoen) en april (voorjaarsskiën) zijn de goedkoopste periodes. De duurste tijd is kerst–nieuwjaar en de Finse wintervakantieweken (eind februari – begin maart).",
    },
    {
      q: "Wordt er fooi gegeven in Finland?",
      a: "Nee. Fooi geven is niet gebruikelijk in Finland. Service is inbegrepen in alle prijzen. Je kunt een fooi achterlaten als je wilt, maar het wordt nooit verwacht.",
    },
    {
      q: "Welke valuta wordt gebruikt in Levi?",
      a: "Finland gebruikt de euro (€). Geen wisselkoersen nodig als je uit een ander euroland komt.",
    },
    {
      q: "Moet ik activiteiten van tevoren boeken?",
      a: "Ja, vooral tijdens kerst, nieuwjaar en de Finse wintervakantieweken (eind feb – begin maart). Populaire activiteiten zoals husky-safari's zijn dagen van tevoren uitverkocht. Boek rechtstreeks bij lokale aanbieders voor de beste prijzen — je bespaart doorgaans 20–30% vergeleken met touroperators.",
    },
    {
      q: "Mag ik mijn eigen alcohol meenemen?",
      a: "Als je van buiten de EU vliegt, mag je beperkt duty-free alcohol meenemen. Binnen de EU zijn er geen limieten, maar check de bagageregels van je luchtvaartmaatschappij. Veel gasten met eigen keuken slaan in bij Alko bij aankomst.",
    },
  ];

  const faqSchemaItems = faqItems.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <SeoMeta
        title="Prijzen in Levi 2025–2026 – Skipassen, Restaurants & Activiteiten | Leville.net"
        description="Complete prijsgids voor een Levi-vakantie. Skipasprijzen, restaurantkosten, activiteitentarieven en boodschappenprijzen op één pagina. Plan je budget vooraf."
        canonicalUrl="https://leville.net/nl/gids/prijzen-in-levi"
        lang="nl"
      />
      <HreflangTags
        currentPath="/nl/gids/prijzen-in-levi"
        currentLang="nl"
        customUrls={{
          fi: "/opas/hinnat-levilla",
          en: "/guide/prices-in-levi",
          nl: "/nl/gids/prijzen-in-levi",
        }}
      />
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({
        title: "Prijzen in Levi – Wat kost een vakantie in Lapland?",
        description: "Complete prijsgids voor een Levi-vakantie. Skipassen, restaurants, activiteiten en boodschappen.",
        url: "https://leville.net/nl/gids/prijzen-in-levi",
        lang: "nl",
        datePublished: "2025-11-01",
        dateModified: "2026-02-28",
      })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: "https://leville.net/nl" },
        { name: "Levi-gids", url: "https://leville.net/nl/gids/reisgids-levi" },
        { name: "Prijzen in Levi", url: "https://leville.net/nl/gids/prijzen-in-levi" },
      ])} />
      <JsonLd data={getFAQSchema(faqSchemaItems)} />

      <SubpageBackground />

      <main id="main-content" className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-8">
          <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Euro className="w-3 h-3 inline mr-1" /> Prijsgids
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Prijzen in Levi – Wat kost een vakantie in Lapland?
          </h1>
          <p className="text-muted-foreground text-lg">
            Een complete prijsgids van skipassen tot restaurants, activiteiten tot boodschappen. Plan je Levi-vakantiebudget vooraf. Finland gebruikt de euro (€) en kaartbetaling wordt vrijwel overal geaccepteerd — je hebt zelden contant geld nodig. Fooi geven is niet gebruikelijk in Finland.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 flex gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-foreground/80">
            Prijzen zijn indicatief en gebaseerd op het seizoen 2025–2026. Controleer altijd actuele prijzen bij de dienstverlener voor boeking. Laatst bijgewerkt: februari 2026.
          </p>
        </div>

        {/* Section 1: Skipasprijzen */}
        <SectionCard icon={Mountain} title="Skipasprijzen">
          <p className="text-muted-foreground mb-4">
            Een Levi-skipas geeft toegang tot alle 43 pistes en 27 liften. Je kunt passen online kopen, bij automaten of aan de kassa. Online vooraf kopen is het voordeligst. Kinderen onder 6 met helm skiën gratis met een volwassen skipas.
          </p>
          <PriceTable
            headers={["Pastype", "Kind (6–11)", "Volwassene (12–64)", "Senior (65+)"]}
            rows={[
              ["3 uur", "€29", "€48,50", "€29"],
              ["1 dag", "€35,50", "€58", "€35,50"],
              ["3 dagen", "€95", "€154,50", "€95"],
              ["6 dagen", "€153", "€258", "€153"],
              ["Seizoenspas", "€384", "€577", "€384"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Skipassen worden geladen op een SkiData KeyCard (€8, niet restitueerbaar). De kaart is herbruikbaar en werkt ook bij andere SkiData-skigebieden — bewaar hem! De skipas geldt ook als Ski Bus-ticket: €3/dag met skipas, €4/dag apart.
          </p>
          <TipBox>
            <strong>Bespaartip:</strong> Het Levi Black loyaliteitsprogramma spaart punten op skipasaankopen. Download de Levi Resort-app en registreer je vóór je eerste aankoop.
          </TipBox>
          <a
            href="https://levi.skiperformance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-sm"
          >
            Koop skipassen in de Levi webshop <ExternalLink className="w-4 h-4" />
          </a>
        </SectionCard>

        {/* Section 2: Materiaalhuur */}
        <SectionCard icon={Snowflake} title="Materiaalhuur">
          <p className="text-muted-foreground mb-4">
            Drie grote verhuurders zijn actief in Levi: Zero Point (bij de pistes), South Point (zuidelijke pistes) en HILL Ski Rent (voorste pistes). Elan Ski Shop in het centrum verhuurt ook materiaal.
          </p>
          <PriceTable
            headers={["Materiaal", "1 dag", "3 dagen", "6 dagen"]}
            rows={[
              ["Ski Standard (ski's + schoenen + stokken)", "~€35–45", "~€85–110", "~€145–180"],
              ["Ski Superior", "~€50–60", "~€120–150", "~€200–250"],
              ["Snowboardset", "~€40–55", "~€100–135", "~€170–220"],
              ["Langlauf Standard", "~€25–35", "~€60–80", "~€100–140"],
              ["Helm", "~€8–12", "~€18–25", "~€30–40"],
              ["Sneeuwschoenen", "~€20–30", "~€45–60", "~€75–100"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Prijzen variëren per verhuurder en materiaalklasse. Boek online vooraf voor ~10% korting. Neem een geldig identiteitsbewijs mee (paspoort of ID-kaart).
          </p>
          <TipBox>
            <strong>Bespaartip:</strong> Meerdaagse huur is aanzienlijk voordeliger per dag. Een 6-dagenhuur is veel voordeliger dan zes losse dagverhuren.
          </TipBox>
        </SectionCard>

        {/* Section 3: Restaurants */}
        <SectionCard icon={UtensilsCrossed} title="Restaurants & Uit eten">
          <p className="text-muted-foreground mb-4">
            Levi heeft meer dan 60 restaurants. De prijzen zijn typisch voor een Fins skigebied — merkbaar goedkoper dan de Alpen, maar hoger dan Centraal-Europese steden. Alcohol wordt in Finland zwaar belast, dus drankjes zijn duurder.
          </p>
          <PriceTable
            headers={["Item", "Prijsrange"]}
            rows={[
              ["Hoofdgerecht (restaurant)", "€20–35"],
              ["Pizza", "€14–20"],
              ["Hamburger", "€15–22"],
              ["Rendier (fine dining)", "€28–42"],
              ["Lunchbuffet", "€15–22"],
              ["Bier 0,5 l (restaurant)", "€7–10"],
              ["Glas wijn (12–16 cl)", "€8–12"],
              ["Fles wijn (restaurant)", "€35–60"],
              ["Koffie & gebak", "€5–8"],
              ["Pannenkoekhuis", "€8–15"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Een diner voor twee met drankjes kost doorgaans €80–130. De goedkoopste opties zijn Burger King of pizzeria's. Toprestaurants zoals Kekäle, Pihvipietti of Ämmilä reserveer je het best vooraf, vooral in het hoogseizoen.
          </p>
          <TipBox>
            <strong>Bespaartip:</strong> Een eigen keuken in je appartement of huisje bespaart flink. In de supermarkt vind je alles wat je nodig hebt — zelfs rendierstoofpot lukt prima in de eigen keuken!
          </TipBox>
          <Link to="/nl/levi" className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-sm">
            Lees meer over restaurants in Levi →
          </Link>
        </SectionCard>

        {/* Section 4: Boodschappen */}
        <SectionCard icon={ShoppingCart} title="Boodschappen & Dagelijkse benodigdheden">
          <p className="text-muted-foreground mb-4">
            Levi heeft twee goed gesorteerde supermarkten: K-Market Levi en S-Market. Beide zijn dagelijks open en verrassend goed bevoorraad voor een klein dorp. De prijzen liggen iets hoger dan in Zuid-Finland, maar niet dramatisch.
          </p>
          <PriceTable
            headers={["Product", "Typische prijs"]}
            rows={[
              ["Melk 1 l", "€1,20–1,60"],
              ["Brood", "€2–4"],
              ["Gehakt 400 g", "€4–6"],
              ["Rendiervlees 300 g", "€8–12"],
              ["Pasta 500 g", "€1–2"],
              ["Kaas 300 g", "€3–5"],
              ["Bananen 1 kg", "€1,50–2,50"],
              ["Bier 6-pack (supermarkt)", "€8–14"],
              ["Fles wijn (Alko)", "€8–15"],
              ["Kant-en-klaarmaaltijd", "€4–7"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            <strong>Alcohol boven 5,5% ABV</strong> wordt alleen verkocht bij <strong>Alko</strong> — een staatsslijterij. In Levi zit Alko naast S-Market. Openingstijden zijn beperkt (meestal ma–vr 10–18, za 10–16, zondag gesloten). Bier tot 5,5% is verkrijgbaar in supermarkten.
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            K-Market en S-Market zijn de twee grootste supermarktketens van Finland. Beide in Levi zijn goed bevoorraad en dagelijks open.
          </p>
          <TipBox>
            <strong>Bespaartip:</strong> <em>Pantti</em> (statiegeld) — Blikjes en flessen hebben statiegeld (€0,15–0,40). Lever ze in bij de automaten bij de ingang van de supermarkt en je krijgt je geld terug. Elke euro telt in Levi!
          </TipBox>
        </SectionCard>

        {/* Section 5: Activiteitenprijzen */}
        <SectionCard icon={Dog} title="Activiteitenprijzen">
          <p className="text-muted-foreground mb-4">
            Activiteiten zijn het hoogtepunt van een Levi-vakantie — maar ook de grootste kostenpost. Prijzen variëren per aanbieder. Hier zijn indicatieve prijzen voor de populairste activiteiten.
          </p>
          <PriceTable
            headers={["Activiteit", "Duur", "Volwassene", "Kind (4–14)"]}
            rows={[
              ["Husky-safari (zelf rijden, 5 km)", "~1,5 u", "€110–150", "€70–100"],
              ["Husky-safari (lang, 10 km)", "~2,5 u", "€160–220", "€100–150"],
              ["Rendierrit (kort)", "~1 u", "€60–90", "€40–60"],
              ["Sneeuwscootersafari (2 u)", "~2–3 u", "€100–160", "€50–80 (in slee)"],
              ["Sneeuwscootersafari (halve dag)", "~4–5 u", "€180–280", "€90–140"],
              ["Noorderlicht-safari (sneeuwscooter)", "~3 u", "€120–180", "€70–100"],
              ["Sneeuwschoenwandeling", "~2–3 u", "€60–90", "€40–60"],
              ["IJsvissen", "~3 u", "€70–100", "€50–70"],
              ["IJskarting", "~15 min", "€30–50", "€20–35"],
              ["Gondellift (retour)", "~1 u", "€15", "€15"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Prijzen zijn meestal inclusief materiaal, vervoer en gids. Sneeuwscooterbestuurders moeten een geldig rijbewijs hebben (categorie B, A1 of A geldig in Finland). Sneeuwscooters worden gedeeld door twee personen die afwisselend rijden — alleen rijden kost extra. Het eigen risico van de verzekering is doorgaans €150–980 — je kunt dit meestal verlagen voor €20 extra.
          </p>
          <TipBox>
            <strong>Bespaartip:</strong> Boek activiteiten rechtstreeks bij lokale aanbieders, niet via touroperators — je bespaart gemakkelijk 20–30%. Kleine familiebedrijven bieden vaak persoonlijkere service en kleinere groepen.
          </TipBox>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link to="/nl/activiteiten/husky-safari-levi" className="text-accent hover:underline font-medium text-sm">
              Lees meer over husky-safari's →
            </Link>
            <Link to="/activities/snowmobile-safari-tips-levi" className="text-accent hover:underline font-medium text-sm">
              Lees meer over sneeuwscootersafari's →
            </Link>
          </div>
        </SectionCard>

        {/* Section 6: Vervoer */}
        <SectionCard icon={Bus} title="Vervoer & Rondkomen">
          <p className="text-muted-foreground mb-4">
            Het centrum van Levi is compact en goed te belopen. Als je bij de pistes verblijft, kun je zo de liften in. Verder weg verblijvende gasten hebben de Ski Bus, een taxi of een huurauto nodig.
          </p>
          <PriceTable
            headers={["Vervoer", "Prijs"]}
            rows={[
              ["Ski Bus (dagpas, met skipas)", "€3"],
              ["Ski Bus (dagpas, zonder skipas)", "€4"],
              ["Ski Bus (enkele reis, in bus)", "€4"],
              ["Ski Bus (seizoenspas)", "€43,50"],
              ["Luchthavenbus (Kittilä–Levi)", "~€16 (retour)"],
              ["Taxi (Kittilä–Levi)", "~€30–45"],
              ["Huurauto (per dag)", "~€50–100/dag"],
              ["Brandstof", "~€1,70–1,90/l"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Kinderen onder 6 rijden gratis mee in de Ski Bus met een volwassene. De bus rijdt twee routes: R1 (noordoostelijke pistes, Hossa, Sirkka) en R2 (zuidelijke pistes, South Point). Alleen kaartbetaling — geen contant geld in de bus.
          </p>
          <Link to="/nl/gids/hoe-kom-je-in-levi" className="text-accent hover:underline font-medium text-sm">
            Lees meer over reizen naar Levi →
          </Link>
        </SectionCard>

        {/* Section 7: Accommodatieprijzen */}
        <SectionCard icon={Home} title="Accommodatieprijzen">
          <p className="text-muted-foreground mb-4">
            Levi biedt een breed scala aan accommodatie: van hotels en spa's tot huisjes en appartementen. Prijzen variëren sterk per seizoen, locatie en voorzieningen.
          </p>
          <PriceTable
            headers={["Accommodatietype", "Hoogseizoen (dec–mrt)", "Laagseizoen"]}
            rows={[
              ["Hotel (standaardkamer)", "€120–250/nacht", "€70–150/nacht"],
              ["Spa-hotel", "€150–350/nacht", "€100–200/nacht"],
              ["Appartement (2–4 pers.)", "€100–200/nacht", "€60–120/nacht"],
              ["Huisje (4–6 pers.)", "€150–350/nacht", "€80–200/nacht"],
              ["Glazen iglo", "€300–500/nacht", "meestal niet beschikbaar"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Kerst–nieuwjaar is de duurste week — prijzen kunnen 2–3× het normale tarief zijn. Finse schoolvakantieweken (weken 8–10) zijn ook populair. De goedkoopste periodes zijn januari (poolnacht) en april (voorjaarsskiën).
          </p>
          <TipBox>
            <strong>Bespaartip:</strong> Een appartement of huisje met eigen keuken bespaart honderden euro's per week aan restaurantkosten. Boek rechtstreeks via Leville.net voor de beste tarieven.
          </TipBox>
          <Link to="/nl/accommodaties">
            <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
              Bekijk Leville.net accommodaties →
            </Button>
          </Link>
        </SectionCard>

        {/* Section 8: Voorbeeldbudgetten */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <Euro className="w-6 h-6 text-accent" />
            Voorbeeldbudgetten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Budget */}
            <Card className="bg-emerald-950/40 border-emerald-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Budgetvakantie</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 personen, 5 nachten</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Appartement: €500</li>
                  <li>Skipas 5 dagen × 2: €457</li>
                  <li>Materiaalhuur 5 dagen × 2: ~€400</li>
                  <li>Boodschappen: €200</li>
                  <li>2× restaurant diner: €160</li>
                  <li>1× husky-safari: €240</li>
                  <li>Ski Bus: €30</li>
                </ul>
                <div className="border-t border-emerald-700/30 pt-3">
                  <p className="text-lg font-bold text-emerald-400">~€1.990</p>
                  <p className="text-xs text-muted-foreground">€995/persoon</p>
                </div>
              </CardContent>
            </Card>

            {/* Gezin */}
            <Card className="bg-blue-950/40 border-blue-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Gezinsvakantie</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 volwassenen + 2 kinderen, 6 nachten</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Huisje: €1.200</li>
                  <li>Skipas 6 dagen (gezin): ~€640</li>
                  <li>Materiaalhuur (gezin): ~€700</li>
                  <li>Boodschappen: €350</li>
                  <li>3× restaurant diner: €400</li>
                  <li>Husky-safari (gezin): €400</li>
                  <li>Sneeuwscootersafari: €250</li>
                  <li>Vervoer: €100</li>
                </ul>
                <div className="border-t border-blue-700/30 pt-3">
                  <p className="text-lg font-bold text-blue-400">~€4.040</p>
                  <p className="text-xs text-muted-foreground">€1.010/persoon</p>
                </div>
              </CardContent>
            </Card>

            {/* Luxe */}
            <Card className="bg-amber-950/40 border-amber-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Luxe-ervaring</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 personen, 5 nachten</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Spa-hotel / glazen iglo: €1.500</li>
                  <li>Skipas 5 dagen × 2: €457</li>
                  <li>Superior-huur: €500</li>
                  <li>Elke avond uit eten: €600</li>
                  <li>Husky-safari 10 km: €400</li>
                  <li>Sneeuwscooter halve dag: €400</li>
                  <li>Noorderlicht-safari: €300</li>
                </ul>
                <div className="border-t border-amber-700/30 pt-3">
                  <p className="text-lg font-bold text-amber-400">~€4.160</p>
                  <p className="text-xs text-muted-foreground">€2.080/persoon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section 9: FAQ */}
        <SectionCard icon={Info} title="Veelgestelde vragen">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-accent">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionCard>

        {/* Read Next */}
        <ReadNextSection
          title="Lees ook"
          links={[
            { title: "Accommodaties in Levi", desc: "Boek een appartement of huisje in centraal Levi.", href: "/nl/accommodaties" },
            { title: "Levi-gids", desc: "Alles wat je moet weten over Levi.", href: "/nl/gids/reisgids-levi" },
            { title: "Hoe kom je in Levi?", desc: "Vluchten, treinen en bussen.", href: "/nl/gids/hoe-kom-je-in-levi" },
          ]}
        />
      </main>

      <Footer lang="nl" />
      <WhatsAppChat lang="nl" />
      <StickyBookingBar lang="nl" />
    </div>
  );
};

export default PrijzenInLeviPage;
