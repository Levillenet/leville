import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema } from "@/utils/structuredData";
import ReadNextSection, { ReadNextLink } from "@/components/guide/ReadNextSection";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Snowflake,
  Trees,
  UtensilsCrossed,
  Scissors,
  Flame,
  Compass,
  Home,
  ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Language = "fi" | "en";

interface GlossaryTerm {
  term: string;
  pronunciation: string;
  description: string | React.ReactNode;
}

interface GlossaryCategory {
  icon: LucideIcon;
  titleFi: string;
  titleEn: string;
  iconColor: string;
  iconBg: string;
  termsFi: GlossaryTerm[];
  termsEn: GlossaryTerm[];
}

const LaplandGlossary = ({ lang = "fi" }: { lang?: Language }) => {
  const location = useLocation();
  const isFi = lang === "fi";

  const hreflangUrls = {
    fi: "/opas/lapin-sanasto",
    en: "/guide/lapland-glossary",
  };

  const meta = {
    fi: {
      title: "Lapin sanasto – 40+ suomalaista sanaa turistille | Leville.net",
      description: "Tunnetko sanat tykkylumi, kuksa tai poronkäristys? Kattava Lapin sanasto selityksineen kansainväliselle matkailijalle. Opi ymmärtämään Lappia kuin paikallinen.",
      canonical: "https://leville.net/opas/lapin-sanasto",
      locale: "fi_FI",
    },
    en: {
      title: "Lapland Glossary – 40+ Finnish Words Every Visitor Should Know | Leville.net",
      description: "What is tykkylumi? What does löyly mean? A complete glossary of Finnish Lapland words with pronunciations and explanations for international visitors.",
      canonical: "https://leville.net/guide/lapland-glossary",
      locale: "en_GB",
    },
  };

  const m = meta[lang];

  const breadcrumbItems = isFi
    ? [
        { label: "Etusivu", href: "/" },
        { label: "Matkaopas Leville", href: "/opas/matkaopas-levi" },
        { label: "Lapin sanasto", href: "/opas/lapin-sanasto" },
      ]
    : [
        { label: "Home", href: "/en" },
        { label: "Travel Guide to Levi", href: "/guide/travel-to-levi" },
        { label: "Lapland Glossary", href: "/guide/lapland-glossary" },
      ];

  const readNextLinks: ReadNextLink[] = isFi
    ? [
        { title: "Sauna Levillä", desc: "Suomalainen saunakulttuuri ja Levin saunaelämykset", href: "/opas/sauna-levilla" },
        { title: "Ravintolat ja palvelut", desc: "Missä maistaa poronkäristystä ja leipäjuustoa", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Parhaat talviaktiviteetit", desc: "Koiravaljakko, moottorikelkka ja poroajelu", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Majoitukset Levillä", desc: "Varaa mökki tai huoneisto", href: "/majoitukset" },
      ]
    : [
        { title: "Finnish Sauna in Levi", desc: "Sauna culture and experiences", href: "/guide/finnish-sauna-in-levi" },
        { title: "Restaurants & Services", desc: "Where to taste poronkäristys and leipäjuusto", href: "/guide/restaurants-and-services-in-levi" },
        { title: "Top Winter Activities", desc: "Dog sledding, snowmobile and reindeer rides", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Accommodations", desc: "Book a cabin or apartment", href: "/en/accommodations" },
      ];

  // Contextual links helper
  const saunaLink = isFi ? "/opas/sauna-levilla" : "/guide/finnish-sauna-in-levi";
  const huskyLink = isFi ? "/aktiviteetit/koiravaljakkoajelu-levi" : "/activities/husky-safari-levi";
  const snowmobileLink = isFi ? "/aktiviteetit/moottorikelkkasafari-vinkit-levi" : "/activities/snowmobile-safari-tips-levi";
  const auroraLink = isFi ? "/revontulet" : "/en/northern-lights";
  const ruskaLink = isFi ? "/opas/syksy-ruska-levi" : "/guide/autumn-ruska-in-levi";

  const categories: GlossaryCategory[] = [
    {
      icon: Snowflake,
      titleFi: "Luonto ja sää",
      titleEn: "Nature & Weather",
      iconColor: "text-sky-400",
      iconBg: "bg-sky-500/15",
      termsFi: [
        { term: "Tykkylumi", pronunciation: "TÜK-kü-lu-mi", description: "Puiden oksille ja latvuksiin kertynyt paksu lumi- ja huurrekerros, joka luo upeita jäätyneitä veistoksia. Tykkylumipuut ovat yksi Lapin ikonisimmista talvinäyistä." },
        { term: "Kaamos", pronunciation: "KAH-mos", description: <>Polaariyö – keskitalven ajanjakso jolloin aurinko ei nouse lainkaan horisontin yläpuolelle. Pohjois-Lapissa kaamos kestää marraskuun lopulta tammikuun puoliväliin. Taivas hehkuu sinisen ja violetin kauniissa sävyissä. Paras aika nähdä <Link to={auroraLink} className="text-sky-700 hover:underline">revontulia</Link>!</> },
        { term: "Yötön yö", pronunciation: "YÖ-tön yö", description: "Kesäkauden ilmiö jolloin aurinko ei laske ollenkaan. Pohjoisimmassa Lapissa keskiyön aurinko paistaa yhtäjaksoisesti yli kaksi kuukautta (toukokuun lopulta heinäkuun loppuun)." },
        { term: "Revontulet", pronunciation: "RE-von-tu-let", description: <>Aurora Borealis eli pohjoiset valot. Suomenkielinen sana tarkoittaa kirjaimellisesti "ketun tulia" – legendan mukaan maaginen kettu juoksi taivaankannen poikki ja sen hännästä singahti kipinöitä. <Link to={auroraLink} className="text-sky-700 hover:underline">Lue lisää revontulista</Link>.</> },
        { term: "Ruska", pronunciation: "RUS-ka", description: <>Lapin upea syksyn väriloisto, yleensä syyskuussa. Tunturit ja metsät muuttuvat kirkkaanpunaisten, oranssien ja kullan sävyisiksi. <Link to={ruskaLink} className="text-sky-700 hover:underline">Lue lisää ruskasta</Link>.</> },
        { term: "Hankikanto", pronunciation: "HAN-ki-kan-to", description: "Kevään ilmiö jossa lumen pintakerros on jäätynyt niin kovaksi että sen päällä voi kävellä ja hiihtää uppoamatta. Erinomaista aikaa murtomaahiihdolle." },
        { term: "Tunturi", pronunciation: "TUN-tu-ri", description: "Lapin tyypillinen pyöreähuippuinen, puuton fjällimainen vaara. Tunturit kohoavat puurajan yläpuolelle ja tarjoavat panoraamanäkymät arktiselle erämaalle." },
        { term: "Pakkanen", pronunciation: "PAK-ka-nen", description: "Kova pakkanen. Lapin talvilämpötilat voivat laskea −30 °C:een tai kylmemmäksi. Pukeudu kerroksittain: aluskerros + villa + tuulenpitävä kuori." },
        { term: "Avanto", pronunciation: "A-van-to", description: <>Järven jäähän hakattu uimareikä. Avantouinti kuuman <Link to={saunaLink} className="text-sky-700 hover:underline">saunan</Link> jälkeen on rakastettu suomalainen hyvinvointiperinne. Veden lämpötila on noin +1–4 °C.</> },
      ],
      termsEn: [
        { term: "Tykkylumi", pronunciation: "TÜK-kü-lu-mi", description: "Heavy snow and frost that accumulates on tree branches, creating stunning frozen sculptures. These snow-crowned trees are one of Lapland's most iconic winter sights." },
        { term: "Kaamos", pronunciation: "KAH-mos", description: <>The Polar Night – the period in midwinter when the sun does not rise above the horizon at all. In northern Lapland, kaamos lasts from late November to mid-January. The sky glows in beautiful shades of blue and purple. This is the best time to see the <Link to={auroraLink} className="text-sky-700 hover:underline">Northern Lights</Link>!</> },
        { term: "Yötön yö", pronunciation: "YÖ-tön yö", description: 'The "Nightless Night" – the summer period when the sun does not set. In northernmost Lapland, the Midnight Sun shines continuously for over two months (late May to late July).' },
        { term: "Revontulet", pronunciation: "RE-von-tu-let", description: <>The Northern Lights (Aurora Borealis). The Finnish word literally means "fox fires" – according to legend, a magical fox ran across the sky, and sparks from its tail lit up the heavens. <Link to={auroraLink} className="text-sky-700 hover:underline">Learn more about Northern Lights</Link>.</> },
        { term: "Ruska", pronunciation: "RUS-ka", description: <>The spectacular autumn foliage season, usually in September. The fells and forests turn vivid shades of red, orange, and gold. <Link to={ruskaLink} className="text-sky-700 hover:underline">Read about ruska season</Link>.</> },
        { term: "Hankikanto", pronunciation: "HAN-ki-kan-to", description: "A spring condition when the top layer of snow has frozen hard enough to walk or ski on without sinking through. A wonderful time for cross-country skiing." },
        { term: "Tunturi", pronunciation: "TUN-tu-ri", description: "A rounded, treeless fell (mountain) typical of the Lapland landscape. These fells rise above the tree line and offer panoramic views of the Arctic wilderness." },
        { term: "Pakkanen", pronunciation: "PAK-ka-nen", description: "Frost or freezing cold. Winter temperatures in Lapland can drop to −30 °C (−22 °F) or colder. Dress in layers: thermal base layer + wool + windproof outer shell." },
        { term: "Avanto", pronunciation: "A-van-to", description: <>A hole cut in lake ice for ice swimming. Swimming in an avanto followed by a hot <Link to={saunaLink} className="text-sky-700 hover:underline">sauna</Link> is a beloved Finnish wellness tradition.</> },
      ],
    },
    {
      icon: Trees,
      titleFi: "Porot ja eläimet",
      titleEn: "Reindeer & Animals",
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/15",
      termsFi: [
        { term: "Poro", pronunciation: "PO-ro", description: "Lapin ikonisin eläin. Puolikesyjä poroja on laidunnettu vuosisatoja. Suomen Lapissa on noin 200 000 poroa – lähes yhtä paljon kuin ihmisiä!" },
        { term: "Poronhoitaja", pronunciation: "PO-ron-HOI-ta-ya", description: "Poronhoitaja eli poroisäntä. Poronhoito on perinteinen elinkeino jota harjoitetaan edelleen aktiivisesti, yhdistäen modernia teknologiaa ja ikivanhaa tietämystä." },
        { term: "Tokka", pronunciation: "TOK-ka", description: "Porolauma. Saatat nähdä tokan ylittämässä tietä – hidasta aina ja anna niille tietä!" },
        { term: "Erotus", pronunciation: "E-ro-tus", description: "Vuotuinen porojen kokoaminen jossa porot lasketaan ja merkitään. Vuosisatainen perinne joka järjestetään syksyllä ja alkutalvesta." },
      ],
      termsEn: [
        { term: "Poro", pronunciation: "PO-ro", description: "Reindeer – the iconic animal of Lapland. Semi-domesticated reindeer have been herded for centuries. There are approximately 200,000 reindeer in Finnish Lapland – almost as many as the human population!" },
        { term: "Poronhoitaja", pronunciation: "PO-ron-HOI-ta-ya", description: "A reindeer herder. Reindeer herding is a traditional livelihood still actively practised today, combining modern technology with ancient knowledge." },
        { term: "Tokka", pronunciation: "TOK-ka", description: "A herd of reindeer. You may see a tokka crossing the road – always slow down and give them right of way!" },
        { term: "Erotus", pronunciation: "E-ro-tus", description: "The annual reindeer roundup where herders gather reindeer for counting and earmarking. A centuries-old tradition held in autumn and early winter." },
      ],
    },
    {
      icon: UtensilsCrossed,
      titleFi: "Ruoka ja juoma",
      titleEn: "Food & Drink",
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/15",
      termsFi: [
        { term: "Poronkäristys", pronunciation: "PO-ron-KÄ-ris-tüs", description: "Lapin kuuluisin ruoka. Ohueksi siivutettu poronliha paistetaan hitaasti voissa ja tarjoillaan perunamuusin ja puolukkasurvoksen kanssa. Todellista arktista comfort foodia." },
        { term: "Suovas", pronunciation: "SUO-vas", description: "Saamelainen savustettu poronliha, perinteisesti valmistettu avotulella. Herkku syvällä, savuisella maulla." },
        { term: "Leipäjuusto", pronunciation: "LAY-pä-YUUS-to", description: '"Leipäjuusto" – perinteinen Lapin juusto jolla on tunnusomainen "narskuva" rakenne. Tarjotaan tyypillisesti lämpimänä lakkahillon kanssa.' },
        { term: "Lakka", pronunciation: "LAK-ka", description: 'Suomuurain eli hilla – "Lapin kultaa". Harvinaisia, meripihkan värisiä arktisia marjoja jotka kasvavat soilla. Tarjotaan hillona, jälkiruoissa ja liköörinä.' },
        { term: "Puolukka", pronunciation: "PUO-luk-ka", description: "Pieni, hapan punainen marja. Puolukkahillo on perinteinen lisuke pororuokien kanssa." },
        { term: "Mustikka", pronunciation: "MUS-tik-ka", description: "Mustikka – pienempi ja maukkaampi kuin viljellyt mustikat. Lapin metsät ovat niitä täynnä loppukesällä." },
        { term: "Rieska", pronunciation: "RIES-ka", description: "Perinteinen ohut, happamaton ohrarieska. Tarjotaan lämpimänä voin kanssa – yksinkertainen mutta herkullinen." },
      ],
      termsEn: [
        { term: "Poronkäristys", pronunciation: "PO-ron-KÄ-ris-tüs", description: "Sautéed reindeer – Lapland's most famous dish. Thinly shaved reindeer meat is slowly fried in butter, served with mashed potatoes and lingonberry jam. True Arctic comfort food." },
        { term: "Suovas", pronunciation: "SUO-vas", description: "Sámi smoked reindeer meat, traditionally prepared over an open fire. A delicacy with deep, smoky flavour." },
        { term: "Leipäjuusto", pronunciation: "LAY-pä-YUUS-to", description: '"Bread cheese" – a traditional Lapland cheese with a distinctive squeaky texture. Typically served warm with cloudberry jam.' },
        { term: "Lakka", pronunciation: "LAK-ka", description: 'Cloudberry – the "gold of Lapland." Rare amber-coloured Arctic berries that grow in bogs. Served as jam, in desserts, and as a liqueur.' },
        { term: "Puolukka", pronunciation: "PUO-luk-ka", description: "Lingonberry – a small, tart red berry. Lingonberry jam is the traditional accompaniment to reindeer dishes." },
        { term: "Mustikka", pronunciation: "MUS-tik-ka", description: "Bilberry (wild blueberry) – smaller and more flavourful than cultivated blueberries. Found abundantly in Lapland's forests in late summer." },
        { term: "Rieska", pronunciation: "RIES-ka", description: "A traditional thin, unleavened barley flatbread. Served warm with butter – simple but delicious." },
      ],
    },
    {
      icon: Scissors,
      titleFi: "Työkalut, käsityöt ja esineet",
      titleEn: "Tools, Crafts & Objects",
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/15",
      termsFi: [
        { term: "Kuksa", pronunciation: "KUK-sa", description: "Perinteinen käsin veistetty juomakuppi, tehty koivun pahkasta. Käytetään kahvin juomiseen nuotion äärellä. Kuksa on henkilökohtainen aarre ja suosittu matkamuisto." },
        { term: "Lapinleuku", pronunciation: "LA-pin-LEU-ku", description: "Perinteinen suuri Lapin puukko leveällä terällä. Käytetään puutöihin, ruoan valmisteluun ja selviytymiseen erässä. Poronhoitajien ja retkeilijöiden välttämätön työkalu." },
        { term: "Puukko", pronunciation: "PUUK-ko", description: "Perinteinen suomalainen vyöpuukko, pienempi kuin leuku. Jokaisella suomalaisella on sellainen – monipuolinen arkityökalu leikkaamiseen, veistämiseen ja ruoanlaittoon." },
        { term: "Duodji", pronunciation: "DUO-dji", description: "Perinteinen saamelainen käsityö. Sisältää puukon tekoa, nahka- ja tekstiilitöitä, korujen valmistusta ja puuveistoa. Jokainen esine on käsin tehty suurella taidolla ja kulttuurisella merkityksellä." },
        { term: "Joiku", pronunciation: "YOI-ku", description: "Perinteinen saamelainen laulutapa – ainutlaatuinen äänitaide joka herättää henkiin ihmisiä, eläimiä tai maisemia. UNESCO tunnustaa joiun aineettomaksi kulttuuriperinnöksi." },
      ],
      termsEn: [
        { term: "Kuksa", pronunciation: "KUK-sa", description: "A traditional handmade drinking cup carved from a birch burl. Used for drinking coffee around a campfire. A kuksa is a cherished personal item and a popular souvenir." },
        { term: "Lapinleuku", pronunciation: "LA-pin-LEU-ku", description: "A traditional large Lappish knife with a wide blade, used for woodwork, preparing food, and outdoor survival. An essential tool of reindeer herders and outdoor enthusiasts." },
        { term: "Puukko", pronunciation: "PUUK-ko", description: "A traditional Finnish belt knife, smaller than a leuku. Every Finn has one – a versatile everyday tool for cutting, carving, and food preparation." },
        { term: "Duodji", pronunciation: "DUO-dji", description: "Traditional Sámi handicraft. Includes knife-making, leather and textile work, jewellery, and wood carving. Each item is handmade with great skill and cultural significance." },
        { term: "Joiku", pronunciation: "YOI-ku", description: "A traditional Sámi vocal art form – a unique style of singing that evokes people, animals, or landscapes. Recognised by UNESCO as intangible cultural heritage." },
      ],
    },
    {
      icon: Flame,
      titleFi: "Sauna ja hyvinvointi",
      titleEn: "Sauna & Wellness",
      iconColor: "text-red-400",
      iconBg: "bg-red-500/15",
      termsFi: [
        { term: "Sauna", pronunciation: "SOW-na", description: <>Suomalaisen kulttuurin kulmakivi. Kuumennettu huone (yleensä 70–90 °C) jossa heitetään vettä kuumille kiville höyryn tuottamiseksi. Suomessa on yli 3 miljoonaa <Link to={saunaLink} className="text-sky-700 hover:underline">saunaa</Link>.</> },
        { term: "Löyly", pronunciation: "LÖY-lü", description: <>Höyrypurkaus joka syntyy kun vettä heitetään kuumille <Link to={saunaLink} className="text-sky-700 hover:underline">saunakiville</Link>. Sana viittaa myös saunakokemuksen tunnelmaan ja henkeen.</> },
        { term: "Vihta / Vasta", pronunciation: "VIH-ta / VAS-ta", description: "Nippu tuoreita koivunoksia joilla vihdotaan eli läpsytellään kevyesti ihoa saunassa. Parantaa verenkiertoa ja vapauttaa ihanan koivun tuoksun." },
        { term: "Kiuas", pronunciation: "KI-u-as", description: "Saunakamina. Kiukaalle asetetaan kivet ja niiden päälle heitetään vettä löylyn tuottamiseksi." },
        { term: "Savusauna", pronunciation: "SA-vu-SAU-na", description: "Perinteinen sauna jota lämmitetään tuntikausia ilman piippua, minkä jälkeen tuuletetaan ennen kylpemistä. Pidetään aidoimpana ja ylellisimpänä saunakokemuksena." },
      ],
      termsEn: [
        { term: "Sauna", pronunciation: "SOW-na", description: <>The cornerstone of Finnish culture. A heated room (typically 70–90 °C / 158–194 °F) where water is thrown on hot stones to create steam. Finland has over 3 million <Link to={saunaLink} className="text-sky-700 hover:underline">saunas</Link>.</> },
        { term: "Löyly", pronunciation: "LÖY-lü", description: <>The burst of steam created when water is thrown onto hot <Link to={saunaLink} className="text-sky-700 hover:underline">sauna</Link> stones. The word also refers to the overall atmosphere and spirit of the sauna experience.</> },
        { term: "Vihta / Vasta", pronunciation: "VIH-ta / VAS-ta", description: "A bundle of fresh birch branches used to gently beat the skin in the sauna. Improves circulation and releases a wonderful birch scent." },
        { term: "Kiuas", pronunciation: "KI-u-as", description: "The sauna stove or heater. Stones are placed on the kiuas, and water is thrown on them to create löyly." },
        { term: "Savusauna", pronunciation: "SA-vu-SOW-na", description: "A traditional smoke sauna – heated for hours without a chimney, then ventilated before bathing. Considered the most authentic and luxurious sauna experience." },
      ],
    },
    {
      icon: Compass,
      titleFi: "Aktiviteetit ja kuljetus",
      titleEn: "Activities & Transport",
      iconColor: "text-violet-400",
      iconBg: "bg-violet-500/15",
      termsFi: [
        { term: "Koiravaljakko", pronunciation: "KOI-ra-VAL-yak-ko", description: <>Koiravaljakko eli huskyrekka. <Link to={huskyLink} className="text-sky-700 hover:underline">Huskyajelut</Link> ovat yksi suosituimmista arktisista aktiviteeteista matkailijoille.</> },
        { term: "Poroajelu", pronunciation: "PO-ro-A-ye-lu", description: "Perinteinen pororeellä tehtävä ajelu lumisessa maisemassa. Rauhallinen ja ainutlaatuinen kokemus." },
        { term: "Moottorikelkka", pronunciation: "MOOT-to-ri-KELK-ka", description: <>Skootteri / moottorikelkka. Yleinen kulkuväline Lapissa ja suosittu aktiviteetti turisteille. Ohjattuja <Link to={snowmobileLink} className="text-sky-700 hover:underline">safareja</Link> on tarjolla.</> },
        { term: "Pilkkiminen", pronunciation: "PILK-ki-mi-nen", description: "Kalastusta jäähän poratun reiän läpi jäätyneellä järvellä. Rentouttava ja mietiskelevä talviaktiviteetti." },
        { term: "Ahkio", pronunciation: "AH-ki-o", description: "Perinteinen lappalainen reki jota voidaan vetää ihmisvoimin tai poron avulla. Käytetään tavaroiden kuljettamiseen lumella." },
      ],
      termsEn: [
        { term: "Koiravaljakko", pronunciation: "KOI-ra-VAL-yak-ko", description: <>A dog sled team, usually huskies. <Link to={huskyLink} className="text-sky-700 hover:underline">Dog sledding</Link> is one of the most popular Arctic activities for visitors.</> },
        { term: "Poroajelu", pronunciation: "PO-ro-A-ye-lu", description: "A reindeer sled ride – a peaceful, traditional way to experience the snowy landscape." },
        { term: "Moottorikelkka", pronunciation: "MOOT-to-ri-KELK-ka", description: <>Snowmobile. A common mode of transport in Lapland and a popular activity for tourists. Guided <Link to={snowmobileLink} className="text-sky-700 hover:underline">safaris</Link> are available.</> },
        { term: "Pilkkiminen", pronunciation: "PILK-ki-mi-nen", description: "Ice fishing – fishing through a hole drilled in the ice of a frozen lake. A relaxing and meditative winter activity." },
        { term: "Ahkio", pronunciation: "AH-ki-o", description: "A traditional Lapp sled or pulk, pulled by a person or a reindeer. Used for transporting goods across the snow." },
      ],
    },
    {
      icon: Home,
      titleFi: "Majoitus, kulttuuri ja arki",
      titleEn: "Accommodation, Culture & Daily Life",
      iconColor: "text-teal-400",
      iconBg: "bg-teal-500/15",
      termsFi: [
        { term: "Mökki", pronunciation: "MÖK-ki", description: "Suomalainen mökki eli loma-asunto. Mökkiloma järven rannalla tai erämaassa on suomalaisen loman perusmuoto. Levillä mökillä tarkoitetaan vuokramökkiä tai cabinia." },
        { term: "Kota", pronunciation: "KO-ta", description: "Perinteinen Lapin telttamainen rakennelma, alkujaan saamelaisten asumus. Nykyään kotia käytetään tunnelmallisena ruokailu- ja kokoontumispaikkana, usein avotuli keskellä." },
        { term: "Laavu", pronunciation: "LAA-vu", description: "Yksinkertainen avoin suojarakennus metsässä, tarkoitettu levähdykseen ja ruoanlaittoon vaellusten aikana. Monia ylläpidetään retkeilyreittien varrella." },
        { term: "Jokamiehenoikeus", pronunciation: "YO-ka-MIE-hen-OI-ke-us", description: "Pohjoismainen perinteinen oikeus joka sallii kaikkien liikkua vapaasti luonnossa, poimia luonnonmarjoja ja sieniä, kalastaa yksinkertaisella vavalla ja leiriytyä tilapäisesti mihin tahansa. Suomalaisen ulkoilukulttuurin kulmakivi." },
        { term: "Sámi", pronunciation: "SAH-mi", description: "Pohjois-Skandinavian ja Suomen alkuperäiskansa. Saamelaisilla on rikas kulttuuri johon kuuluu poronhoito, joiku, ja erityiset käsityöt ja vaatetus." },
        { term: "K-Market / S-Market", pronunciation: "K-mar-ket / S-mar-ket", description: "Suomen yleisimmät ruokakauppaketjut. Levillä on K-Market ja S-Market keskustassa. Hyvä tietää: kaupat sulkeutuvat yleensä klo 21–22." },
        { term: "Alko", pronunciation: "AL-ko", description: "Suomen valtion monopoli alkoholijuomille. Viiniä ja väkeviä alkoholijuomia saa ostaa VAIN Alkosta – ruokakaupasta saa vain olutta, siideriä ja long drinkkejä (max 5,5 %). Levin Alkon aukioloajat ovat rajoitetut erityisesti sunnuntaisin." },
        { term: "Pantti", pronunciation: "PANT-ti", description: "Pullonpalautusjärjestelmän pantti. Suomessa lähes kaikissa pulloissa ja tölkeissä on pantti (0,10–0,40 €). Palauta ne kaupan automaattiin ja saat hyvityksen. Älä heitä pulloja roskiin!" },
      ],
      termsEn: [
        { term: "Mökki", pronunciation: "MÖK-ki", description: 'A Finnish cottage or cabin. Staying in a mökki is the quintessential Finnish holiday experience. In Levi, "mökki" means a rental cabin or cottage.' },
        { term: "Kota", pronunciation: "KO-ta", description: "A traditional Lapp teepee-like structure, originally a Sámi dwelling. Today, kotas are used as atmospheric dining and gathering spaces, often with an open fire in the centre." },
        { term: "Laavu", pronunciation: "LAA-vu", description: "A simple open-fronted lean-to shelter in the forest, used for resting and cooking during hikes. Many are maintained along hiking trails." },
        { term: "Jokamiehenoikeus", pronunciation: "YO-ka-MIE-hen-OI-ke-us", description: "Everyman's Right – the traditional Nordic right allowing everyone to roam freely in nature, pick wild berries and mushrooms, fish with a simple rod, and camp temporarily on any land. A cornerstone of Finnish outdoor culture." },
        { term: "Sámi", pronunciation: "SAH-mi", description: "The indigenous people of northern Scandinavia and Finland. The Sámi have a rich culture including reindeer herding, joiku singing, and distinctive handicrafts and clothing." },
        { term: "K-Market / S-Market", pronunciation: "K-mar-ket / S-mar-ket", description: "Finland's most common grocery store chains. Levi has a K-Market and S-Market in the centre. Good to know: shops usually close at 9–10 PM." },
        { term: "Alko", pronunciation: "AL-ko", description: "Finland's state alcohol monopoly. Wine and spirits can ONLY be bought at Alko stores – regular supermarkets only sell beer, cider, and long drinks (max 5.5% ABV). Levi's Alko has limited hours, especially on Sundays." },
        { term: "Pantti", pronunciation: "PANT-ti", description: "The bottle deposit system. In Finland, nearly all bottles and cans carry a deposit (€0.10–€0.40). Return them at the machine in any grocery store to get your money back. Don't throw bottles in the bin!" },
      ],
    },
  ];

  // Structured data - top terms
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: isFi ? "Lapin sanasto" : "Lapland Glossary",
    description: m.description,
    url: m.canonical,
    inDefinedTermSet: m.canonical,
    hasDefinedTerm: [
      { "@type": "DefinedTerm", name: "Tykkylumi", description: "Heavy snow and frost that accumulates on tree branches, creating stunning frozen sculptures." },
      { "@type": "DefinedTerm", name: "Kaamos", description: "The Polar Night – the period in midwinter when the sun does not rise above the horizon." },
      { "@type": "DefinedTerm", name: "Revontulet", description: "The Northern Lights (Aurora Borealis). The Finnish word literally means 'fox fires'." },
      { "@type": "DefinedTerm", name: "Poronkäristys", description: "Sautéed reindeer – Lapland's most famous dish." },
      { "@type": "DefinedTerm", name: "Löyly", description: "The burst of steam created when water is thrown onto hot sauna stones." },
      { "@type": "DefinedTerm", name: "Kuksa", description: "A traditional handmade drinking cup carved from a birch burl." },
      { "@type": "DefinedTerm", name: "Jokamiehenoikeus", description: "Everyman's Right – the Nordic right allowing everyone to roam freely in nature." },
      { "@type": "DefinedTerm", name: "Ruska", description: "The spectacular autumn foliage season in Lapland, usually in September." },
      { "@type": "DefinedTerm", name: "Sauna", description: "The cornerstone of Finnish culture. A heated room where water is thrown on hot stones to create steam." },
      { "@type": "DefinedTerm", name: "Mökki", description: "A Finnish cottage or cabin – the quintessential Finnish holiday experience." },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <link rel="canonical" href={m.canonical} />
        <meta property="og:title" content={m.title} />
        <meta property="og:description" content={m.description} />
        <meta property="og:url" content={m.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={m.locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={m.title} />
        <meta name="twitter:description" content={m.description} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {isFi
                ? "Lapin sanasto – suomalaiset sanat matkailijan oppaaksi"
                : "Lapland Glossary – Finnish Words Every Visitor Should Know"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isFi
                ? "Suomen Lapissa törmäät moniin sanoihin ja käsitteisiin, joita ei löydy tavallisesta sanakirjasta. Tämä sanasto auttaa sinua ymmärtämään paikallista kulttuuria, luontoa ja perinteitä – ja tekee lomastasi rikkaamman kokemuksen."
                : "During your visit to Finnish Lapland, you'll encounter many unique words that no ordinary dictionary can explain. This glossary will help you understand the local culture, nature, and traditions – and make your holiday a richer experience."}
            </p>
          </header>

          {/* Categories */}
          {categories.map((cat, catIdx) => {
            const terms = isFi ? cat.termsFi : cat.termsEn;
            const title = isFi ? cat.titleFi : cat.titleEn;
            const Icon = cat.icon;

            return (
              <section key={catIdx} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                </div>

                <div className="grid gap-3">
                  {terms.map((t, i) => (
                    <div
                      key={i}
                      className="bg-muted/30 border border-border/30 rounded-xl p-4 sm:p-5 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1.5">
                        <span className="font-bold text-foreground text-lg">{t.term}</span>
                        <span className="text-sm text-sky-600 font-mono">[{t.pronunciation}]</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{t.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Read Next */}
          <ReadNextSection
            title={isFi ? "Lue myös" : "Read Also"}
            links={readNextLinks}
          />

          {/* Bottom nav */}
          <div className="flex items-center justify-start mb-8">
            <Link
              to={isFi ? "/opas/matkaopas-levi" : "/guide/travel-to-levi"}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFi ? "Takaisin matkaoppaaseen" : "Back to Travel Guide"}
            </Link>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default LaplandGlossary;
