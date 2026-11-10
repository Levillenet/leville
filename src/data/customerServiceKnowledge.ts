// Leville.net asiakaspalvelu AI-botin tietopohja
// Päivitetty: 7.11.2026
import { guestPolicies } from "./guestPolicies";

export const customerServiceKnowledge = {
  // Majoituskohteet ja niiden erityispiirteet
  accommodations: {
    skistar: {
      name: "Skistar-huoneistot (Modernit huoneistot)",
      description: "Modernit huoneistot Skistar-alueella, 2-6 henkilöä",
      specialEquipment: {
        dishwasher: "Candy Trio",
        oven: "Candy Trio (yhdistelmälaite)",
        sauna: "Sähkökiuas ajastimella"
      },
      instructions: {
        dishwasher: `ASTIANPESUKONE CANDY TRIO:
- Avaa astianpesukoneen hana (keittiön hanan takana) ennen käyttöä
- HUOM! Astianpesukonetta ja uunia EI voi käyttää samanaikaisesti!
- Sammuta astianpesukone virtanapista käytön jälkeen jotta uuni toimii

Ohjelmat:
- P1 (65°): Normaalilikaisille astioille (suositusohjelma)
- P2 (75°): Kattiloille ja hyvin likaisille astioille
- P3 (45°): Energiansäästöohjelma normaalilikaisille astioille
- P4 (50°): Pikapesu astioille jotka pestään heti käytön jälkeen
- P5: Lyhyt kylmä esipesu astioille jotka jäävät odottamaan

Käyttö:
1. Avaa hana
2. Avaa koneen luukku
3. Laita koneeseen virta päälle virtakytkimestä
4. Lisää astianpesuaine
5. Valitse sopiva pesuohjelma
6. Sulje pesukoneen luukku - ohjelma käynnistyy automaattisesti
7. Kun ohjelma on päättynyt, avaa luukku ja kytke kone pois päältä. Sulje hana.`,
        oven: `UUNI CANDY TRIO:
- HUOM! Uunia ja astianpesukonetta EI voi käyttää samanaikaisesti!
- Sammuta astianpesukone jotta uuni menee päälle

Toiminnot:
- Tavallinen kypsennys (ylä- ja alalämpö): 65-230°C
- Grilli: 230°C
- Kiertoilmagrillaus: 190-210°C
- Kiertoilmakypsennys: 65-210°C

Käyttö:
1. Käännä ohjelmavalitsin halutun kypsennysmenetelmän kohdalle
2. Aseta lämpötila toisesta valitsimesta
3. Käännä ajastinta (1-120 min) - uuni lähtee päälle
4. Ajastin sammuttaa uunin automaattisesti ajan loputtua
5. Voit myös käyttää "Käsiasento"-asetusta ilman ajastinta

Esilämmitysajat:
- 210-230°C: 20 minuuttia
- 140-190°C: 15 minuuttia
- 65-115°C: 10 minuuttia`,
        stove: `LIESI CANDY TRIO:
- Highlight-levyt toimivat 3 sekunnissa, sopivat tasaiseen kypsennykseen
- Halolight-levyt sopivat nopeaan paistamiseen ja korkeisiin lämpötiloihin

Käyttö:
1. Valitse keittoalue
2. Virran merkkivalo syttyy
3. Jäännöslämpöindikaattori palaa kun lämpötila on yli 60°C
4. Sammuta kääntämällä säädin 0-asentoon

Huomioitavaa:
- Älä käytä pintaa leikkuualustana
- Älä vedä kattiloita pitkin pintaa
- Alumiinifoliota tai muoviastioita EI saa laittaa keittolevyille`,
        sauna: `SAUNAN KÄYTTÖ SKISTAR-ASUNNOISSA:
Lämmitysaika: 30-45 minuuttia

Ajastin (kuva-alue A ja B):
- Alue A (0-4 tuntia): Välitön lämmitys - kiuas alkaa lämmittää heti
- Alue B (0-8 tuntia): Viivelämmitys - aseta aika jonka kuluttua lämmitys alkaa

Esimerkki viivelämmityksestä:
Jos menet ulkoilemaan 3 tunniksi ja haluat saunan valmiiksi palatessasi:
1. Käännä ajastin B-alueelle kohtaan 2 (tuntia)
2. Sauna alkaa lämmetä 2 tunnin kuluttua
3. Noin 3 tunnin päästä sauna on valmis

Lämpötilan säätö:
- Termostaatista voit säätää saunan lämpötilaa
- Aloita maksimilämpötilasta ja säädä tarvittaessa alemmas
- Pienikin säätö vaikuttaa huomattavasti lämpötilaan

Löyly:
- Heitä vettä kiukaalle sopivan kosteuden saamiseksi
- Kauhan maksimikoko 0,2 litraa
- ÄLÄ heitä liikaa vettä kerralla - voi roiskua kuumana
- Älä heitä löylyä kun joku on kiukaan lähellä`
      }
    },
    perheasunnot: {
      name: "Tilavat perheasunnot",
      description: "Tilavat perheasunnot 4-10 henkilölle",
      specialEquipment: null,
      instructions: null
    },
    karhupirtti: {
      name: "Karhupirtti / Bear Lodge",
      description: "Tilava mökki jopa 14 henkilölle",
      specialEquipment: null,
      instructions: null
    },
    glacier: {
      name: "Levi Glacier Apartments",
      description: "Modernit huoneistot jopa 10 henkilölle, mahdollisuus varata 4-10 yksikköä ryhmälle",
      specialEquipment: null,
      instructions: null
    }
  },

  // Yleiset usein kysytyt kysymykset
  faq: {
    cancellation: { question: "Mitkä ovat peruutusehdot?", answer: "Perusehtomme on 60 päivän peruutusaika ennen saapumista. Poikkeuksina 19.12.–3.1. majoitukset, Karhupirtti / Bear Lodge ja yli 3 000 € varaukset ovat sitovia eikä niitä palauteta perusehtojen mukaan. Tarkista täydelliset varausehdot. Jos tarvitsette poikkeavia ehtoja, ottakaa yhteyttä varausvaiheessa: olemme joustavia ja voimme sopia erityisistä ehdoista erikseen." },
    deposit: { question: "Peritäänkö panttia tai vakuusmaksua?", answer: "Emme peri panttia tai vakuusmaksua." },
    smoking: { question: "Saako kohteissa tupakoida?", answer: "Tupakointi, myös sähkötupakointi, on kielletty kaikissa kohteissamme." },
    quietHours: { question: "Milloin on hiljaisuus?", answer: "Hiljaisuus on klo 22:00–08:00." },
    vat: { question: "Mikä on majoituksen ALV?", answer: "Majoituksen ALV on 14 %." },
    analytics: { question: "Onko Google Analytics käytössä?", answer: "Kyllä. Google Analytics on käytössä tilastointisuostumuksen perusteella. Lisäksi keräämme erillisiä evästeettömiä sivustotilastoja." },

    checkIn: {
      question: "Mihin aikaan huoneistoon pääsee sisään?",
      answer: "Huoneisto on valmis viimeistään klo 17:00. Toimitamme ovikoodin aiemmin, mikäli huoneisto saadaan valmiiksi. Jos tarvitsette aikaisemman saapumisen, ottakaa yhteyttä, niin selvitämme mahdollisuuksia."
    },
    earlyCheckIn: {
      question: "Voiko saada aikaisen check-inin?",
      answer: "Huoneisto on valmis viimeistään klo 17:00. Toimitamme ovikoodin aiemmin, mikäli huoneisto saadaan valmiiksi. Jos tarvitsette aikaisemman saapumisen, ottakaa yhteyttä, niin selvitämme mahdollisuuksia."
    },
    checkOut: {
      question: "Mihin aikaan check-out on?",
      answer: "Uloskirjautuminen on klo 11:00 mennessä. Joustamme mahdollisuuksien mukaan, kun otatte meihin yhteyttä."
    },
    lateCheckOut: {
      question: "Voiko check-outia myöhäistää?",
      answer: "Uloskirjautuminen on klo 11:00 mennessä. Joustamme mahdollisuuksien mukaan, kun otatte meihin yhteyttä."
    },
    luggageStorage: {
      question: "Onko matkatavarasäilytystä?",
      answer: "SkiStar-talossa (Postintie 3B) ja Hiihtäjänkuja 5:n talossa on matkatavarasäilytys talon kellarissa, Glacier-huoneistoissa B-talon kellarissa. Laukut voi jättää ja hakea milloin tahansa, myös ennen sisäänkirjautumista ja uloskirjautumisen jälkeen. Karhupirtin osalta säilytysmahdollisuutta voi tiedustella meiltä. Karhunvartija 3:ssa, Platinum A2:ssa ja Moonlight 415:ssä ei ole erillistä matkatavarasäilytystä."
    },
    linens: {
      question: "Sisältyvätkö liinavaatteet ja pyyhkeet hintaan?",
      answer: `Liinavaatteet ja pyyhkeet ovat lisämaksullinen valinta. Kohdekohtainen hinta on ${guestPolicies.linenPriceMin}–${guestPolicies.linenPriceMax} €. Voitte varata ne varauksen yhteydessä tai tuoda omat.`
    },
    privateKitchen: {
      question: "Onko keittiö ja kylpyhuone yksityiset?",
      answer: "Kyllä. Keittiö ja kylpyhuone ovat täysin yksityiset ja vain kyseisen huoneiston asiakkaiden käytössä."
    },
    heating: {
      question: "Miten huoneisto lämpenee?",
      answer: "Rakennuksessa on keskuslämmitys ja huoneistot lämpiävät vesikiertoisen lattialämmityksen kautta. Joissain huoneistoissa on lisäksi ilmalämpöpumppu."
    },
    thermostat: {
      question: "Voiko lämpötilaa säätää?",
      answer: "Huoneistossa on seinällä termostaatti, josta lämpötilaa voi säätää hieman (noin 1–2 astetta). Muutokset tapahtuvat hitaasti."
    },
    fireplace: {
      question: "Onko takka käytössä ja sisältyykö puita?",
      answer: "Takka on vain huoneistoissa 5A2, 5B2 ja 5B5 sekä Karhupirtissä / Bear Lodgessa ja Karhunvartijassa. Muissa kohteissa ei ole takkaa. Katso polttopuiden sijainti kohdeoppaasta."
    },
    saunaTimer: {
      question: "Miten saunan ajastin toimii?",
      answer: "Saunassa on lämpötilansäädin ja ajastin. Valkoinen alue tarkoittaa välitöntä lämmitystä. Ajastuksen puolella sauna alkaa lämmetä vasta asetetun ajan kuluttua. Sauna lämpenee noin tunnissa."
    },
    wifi: {
      question: "Onko huoneistossa WiFi?",
      answer: "Kyllä. WiFi on koko talon yhteinen verkko."
    },
    wifiProblems: {
      question: "Mitä jos WiFi ei toimi?",
      answer: "Usein ongelma ratkeaa irrottamalla laitteen virtajohto ja kytkemällä se uudelleen. Tarvittaessa huolto voidaan pyytää paikalle."
    },
    tv: {
      question: "Onko televisio äly-TV?",
      answer: "Kaikki televisiot eivät ole älytelevisioita. Striimaus onnistuu esimerkiksi omalla laitteella tai HDMI-kaapelilla."
    },
    keys: {
      question: "Miten avaimet toimivat?",
      answer: "Kohteisiin pääsee PIN-koodilla tai avainboksin koodilla. Ovikoodi toimitetaan aiemmin, jos huoneisto on valmis. Saapumisohjeet ovat kohdekohtaiset."
    },
    laundry: {
      question: "Missä pesukone ja kuivausrumpu ovat?",
      answer: "Skistarissa on pesula, jossa pyykkiä voi pestä omatoimisesti. Kaikissa muissa kohteissamme on pesukone."
    },
    sledges: {
      question: "Sisältyykö pulkkia majoitukseen?",
      answer: "Pulkat eivät virallisesti sisälly hintaan, mutta usein edelliset asiakkaat jättävät niitä ja niitä saa käyttää vapaasti. Kaupoista pulkkia saa noin 10–15 eurolla."
    },
    groceries: {
      question: "Voiko ostokset tilata etukäteen?",
      answer: "K-ruoka-sovelluksella voi tilata ostokset noudettavaksi Levi Marketiin, mutta sesonkina ajat täyttyvät nopeasti. Levi Delivery tarjoaa myös toimituksia majoitukseen."
    },
    restaurants: {
      question: "Onko ravintoloita auki myöhään?",
      answer: "Juhlapyhinä moni ravintola sulkee aikaisin. Levimarket on usein auki klo 22 saakka."
    },
    bookingCancelled: {
      question: "Miksi Booking.com-varaukseni peruuntui?",
      answer: "Yleisin syy on vanhentunut luottokortti tai epäonnistunut veloitus. Booking.com peruuttaa varauksen tällöin automaattisesti."
    },
    fakeBooking: {
      question: "Voiko varausvahvistus olla väärennetty?",
      answer: "Valitettavasti kyllä. Myös virallisen näköisiä varausvahvistuksia voidaan väärentää. Jos ostat majoituksen yksityishenkilöltä, varmista aina varaus suoraan majoittajalta."
    },
    bestPrice: {
      question: "Miten saan parhaan hinnan?",
      answer: "Ota suoraan yhteyttä sähköpostitse info@leville.net. Autamme mielellämme ja vastaamme myös loman aikana."
    }
  },

  // Yhteystiedot
  contact: {
    email: "info@leville.net",
    phone: "+358 44 13 13 13",
    whatsapp: "+35844131313",
    address: "Levi, Suomi",
    responseTime: "Vastaamme yleensä saman päivän aikana, myös lomien aikana."
  },

  // Botin käyttäytymisohjeet
  botBehavior: {
    greetings: [
      "Hei! Olen Levillen asiakaspalvelubotti. Miten voin auttaa?",
      "Tervetuloa Levillen asiakaspalveluun! Kerro missä asunnossa majoitut, niin voin antaa tarkempia ohjeita."
    ],
    askForAccommodation: "Kerrothan ensin, missä majoituskohteessa olet tai olet varaamassa majoitusta? Vaihtoehdot ovat: Skistar-huoneistot (Modernit huoneistot), Tilavat perheasunnot, Karhupirtti (Bear Lodge) tai Levi Glacier Apartments.",
    escalateToHuman: "Jos asia on kiireellinen tai tarvitset henkilökohtaista palvelua, ota meihin yhteyttä WhatsAppilla numeroon +358 44 13 13 13 tai sähköpostitse info@leville.net."
  }
};

export type AccommodationType = keyof typeof customerServiceKnowledge.accommodations;
