import JsonLd from "@/components/JsonLd";

const faqs = [
  {
    q: "Paljonko majoitus Levillä maksaa?",
    a: "Majoituksen hinta Levillä riippuu sesongista ja kohteen koosta. Studiohuoneisto kahdelle hengelle maksaa noin 70–150 €/yö, perheasunto 4–6 hengelle noin 120–250 €/yö ja tilava mökki 8–14 hengelle noin 200–500 €/yö. Joulu ja hiihtolomaviikot ovat kalleimpia.",
  },
  {
    q: "Mikä on paras sijainti majoitukselle Levillä?",
    a: "Levin keskusta on käytännöllisin sijainti: rinteet, ladut, ravintolat ja kaupat ovat kävelyetäisyydellä, etkä tarvitse autoa. Leville.netin kaikki kohteet sijaitsevat keskustassa tai sen välittömässä läheisyydessä – Skistar-talossa Postintie 3:lla, Glacier-alppihuoneistoissa eturinteen vieressä sekä Karhupirtissä keskustan tuntumassa.",
  },
  {
    q: "Kannattaako Levillä valita mökki vai huoneisto?",
    a: "Huoneisto sopii pareille, pienille perheille ja kaupunkimaisesta tunnelmasta nauttiville – palvelut ovat oven takana. Mökki sopii isommille seurueille, jotka haluavat omaa rauhaa, takkatulta ja poreallaskokemuksia. Leville.netin valikoimasta löytyy molempia keskustasta käsin.",
  },
  {
    q: "Mitä hyötyä on varata suoraan Leville.netiltä?",
    a: "Varaat suoraan kohteen omistajalta ilman välittäjää – saat henkilökohtaista palvelua, joustavammat tulo- ja lähtöajat sekä yhteyden suoraan ihmiseen, joka tuntee kohteen. Maksaminen tapahtuu turvallisesti Paytrailin kautta ja peruutusaika on 60 päivää ennen saapumista.",
  },
];

const HomeFaq = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="bg-muted/30 py-16 md:py-20"
    >
      <JsonLd data={schema} />
      <div className="container mx-auto max-w-4xl px-4">
        <h2
          id="home-faq-heading"
          className="font-serif text-3xl md:text-4xl text-foreground mb-8"
        >
          Usein kysytyt kysymykset majoituksesta Levillä
        </h2>
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-foreground text-lg mb-2">
                {f.q}
              </dt>
              <dd className="text-muted-foreground leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HomeFaq;
