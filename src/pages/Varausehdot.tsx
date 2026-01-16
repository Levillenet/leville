import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";

const Varausehdot = () => {
  return (
    <>
      <Helmet>
        <html lang="fi" />
        <title>Varausehdot | Leville.net</title>
        <meta 
          name="description" 
          content="Leville.net varausehdot - peruutusehdot, majoitusohjeet ja vastuut. Lue vuokrausehdot ennen majoituksen varaamista." 
        />
        <meta name="keywords" content="Leville varausehdot, Levi majoitus ehdot, peruutusehdot Levi, vuokrausehdot" />
        <link rel="canonical" href="https://leville.net/varausehdot" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leville.net/varausehdot" />
        <meta property="og:title" content="Varausehdot | Leville.net" />
        <meta property="og:description" content="Leville.net varausehdot - peruutusehdot, majoitusohjeet ja vastuut." />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Varausehdot | Leville.net" />
        <meta name="twitter:description" content="Leville.net varausehdot - peruutusehdot, majoitusohjeet ja vastuut." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Varausehdot
              </h1>
              <p className="text-xl text-muted-foreground">
                LEVILLE.NET
              </p>
            </section>

            <div className="space-y-8">
              {/* Yleistä */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Yleistä</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nämä ehdot koskevat kaikkia Leville.netin välittämiä majoituskohteita. Ehdot sitovat molempia osapuolia, kun asiakas tekee varauksen. Varaajan tulee olla täysi-ikäinen ja oikeustoimikelpoinen.
                </p>
              </section>

              {/* Varaaminen */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Varaaminen</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Varausvahvistus toimitetaan asiakkaan sähköpostiin varauksen jälkeen. Lähempänä saapumista asiakas saa erillisen ohjeistuksen avaimista ja saapumisesta.
                </p>
              </section>

              {/* Peruutukset */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Peruutukset</h2>
                <ul className="text-muted-foreground space-y-3 list-disc list-inside">
                  <li>Peruutus on aina tehtävä kirjallisesti (esimerkiksi sähköpostitse).</li>
                  <li>Varaus ei peruunnu maksamatta jättämällä.</li>
                  <li>Peruutus on maksuton, kun se tehdään vähintään 60 vuorokautta ennen saapumista.</li>
                  <li>Mikäli peruutus tehdään alle 60 vuorokautta ennen saapumista eikä kohdetta saada vuokrattua uudelleen, veloitetaan koko vuokrahinta.</li>
                  <li>Mikäli kohde saadaan uudelleen vuokrattua, palautetaan alkuperäiselle asiakkaalle vastaava summa.</li>
                </ul>
              </section>

              {/* Vuokraajan oikeus perua varaus */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Vuokraajan oikeus perua varaus</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vuokraaja voi perua varauksen ylivoimaisen esteen (force majeure) tai muun merkittävän syyn vuoksi (esim. vesivahinko). Tällöin maksetut maksut palautetaan. Varaus voidaan myös perua, jos maksusuorituksia ei ole tehty ajallaan.
                </p>
              </section>

              {/* Avaimet */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Avaimet</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kaikissa kohteissa on avainboksi tai koodilukko. Koodi toimitetaan asiakkaalle saapumispäivänä. Kadonneista avaimista tai koodin väärinkäytöstä johtuvat kulut veloitetaan asiakkaalta.
                </p>
              </section>

              {/* Majoitus */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Majoitus</h2>
                <ul className="text-muted-foreground space-y-3 list-disc list-inside">
                  <li>Majoituskohde on käytettävissä tulopäivänä klo 17 alkaen, ja se tulee luovuttaa lähtöpäivänä klo 11 mennessä.</li>
                  <li>Hintaan sisältyy peitot, tyynyt, perusastiasto, sähkö, vesi, wc-paperi (2 rll/wc) ja siivousvälineet.</li>
                  <li>Jos liinavaatteita, pyyhkeitä tai loppusiivousta ei ole tilattu erikseen, asiakas tuo ne mukanaan ja huolehtii siivouksesta itse.</li>
                  <li>Mikäli siivous on laiminlyöty, peritään siivousmaksu jälkikäteen. Erityisen likaisessa tapauksessa maksua voidaan korottaa.</li>
                </ul>
              </section>

              {/* Tupakointi & allergiat */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Tupakointi & allergiat</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tupakointi on ehdottomasti kielletty. Rikkeestä veloitetaan vähintään 300 €. Lemmikkieläinkielto ei takaa allergiavapautta.
                </p>
              </section>

              {/* Vahingot */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Vahingot</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Asiakas on vastuussa aiheuttamistaan vahingoista ja niiden ilmoittamisesta välittömästi kohteenhoitajalle ja vuokraajalle.
                </p>
              </section>

              {/* Häiriötilanteet */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Häiriötilanteet</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Jos asiakas aiheuttaa häiriötä eikä lopeta huomautuksesta huolimatta, vuokrasuhde voidaan purkaa heti. Hiljaisuus kohteissa on klo 23-07. Kustannukset jäävät asiakkaan vastuulle eikä maksuja palauteta.
                </p>
              </section>

              {/* Henkilömäärä ja lemmikit */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Henkilömäärä ja lemmikit</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kohdetta ei saa käyttää useampi henkilö kuin mitä on ilmoitettu. Lemmikit ovat sallittuja vain, jos kohde sallii ne ja siitä on ilmoitettu etukäteen. Lemmikin omistaja vastaa vahingoista ja jätöksistä.
                </p>
              </section>

              {/* Huomautukset */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Huomautukset</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mahdolliset puutteet tai ongelmat tulee ilmoittaa heti niiden ilmetessä. Ilmoittamatta jättäminen poistaa oikeuden hyvitykseen. Jos ratkaisua ei saada paikan päällä, tulee valitus tehdä kirjallisesti ennen varauksen päättymistä.
                </p>
              </section>

              {/* Hintavirheet */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Hintavirheet</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Selvästi virheellinen hintatieto ei sido vuokraajaa. Esimerkiksi, jos hinta poikkeaa olennaisesti yleisestä hintatasosta.
                </p>
              </section>

              {/* Sovellettava laki */}
              <section className="glass-card border-border/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Sovellettava laki</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sopimukseen sovelletaan Suomen lakia. Riidat pyritään ratkaisemaan ensin neuvotteluin, ja tarvittaessa asia voidaan viedä Kuluttajariitalautakuntaan tai Lapin käräjäoikeuteen.
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer lang="fi" />
        <WhatsAppChat />
        <StickyBookingBar lang="fi" />
      </div>
    </>
  );
};

export default Varausehdot;
