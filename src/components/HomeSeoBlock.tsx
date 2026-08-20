import { Link } from "react-router-dom";

/**
 * SEO-tekstilohko etusivulle. Kattaa pääavainsanaklusterit, jotka eivät
 * mahdu Hero/About-osioihin: lomahuoneisto, mökkivuokraus, saunamökki,
 * ryhmäkoot, hintahaarukat. Sisäiset linkit hub-sivuille ja vertailuihin.
 * Vain FI – muut kielet lisätään käännösten valmistuttua.
 */
const HomeSeoBlock = () => {
  const hubs: { href: string; label: string }[] = [
    { href: "/vuokramokit/glacier-apartments-levi", label: "Glacier Apartments – 4–5 mh perhehuoneistot Zero Pointissa" },
    { href: "/vuokramokit/skimbaajankuja-levi", label: "Bear Lodge / Karhupirtti – 14 hengen hirsihuvila" },
    { href: "/vuokramokit/hiihtajankuja-levi", label: "Front Slope Apartments – Hiihtäjänkujan alppihuoneistot" },
    { href: "/vuokramokit/postintie-levi", label: "Skistar-talo – Postintie 3 keskustassa" },
    { href: "/vuokramokit/ratsastajankuja-levi", label: "Ratsastajankuja 2 – Glacier-alppitalo" },
    { href: "/majoitukset", label: "Kaikki vuokramökit ja huoneistot Leviltä" },
    { href: "/opas/majoitus-levilla", label: "Opas: majoitus Levillä – mistä valita" },
    { href: "/opas/vuokra-mokit-levi", label: "Vuokramökit Leviltä – kokoluokat 2–14 hengelle" },
    { href: "/opas/levi-vs-rovaniemi", label: "Levi vs Rovaniemi – missä yöpyä Lapissa" },
    { href: "/opas/levi-vs-saariselka", label: "Levi vs Saariselkä – vertailu" },
  ];


  return (
    <section
      aria-labelledby="home-seo-heading"
      className="bg-background py-16 md:py-20"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <h2
          id="home-seo-heading"
          className="font-serif text-3xl md:text-4xl text-foreground mb-6"
        >
          Leville.net — majoituksemme ja paikallinen Levi-opas
        </h2>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
          <p>
            Olemme paikallinen toimija Levillä: vuokraamme omia huoneistojamme ja
            mökkejämme suoraan omistajalta ja ylläpidämme samalla laajaa
            Levi-opasta lumitilanteesta latuihin, ravintoloihin ja revontuliin.
            Kaikki kohteemme ovat Levin keskustassa, kävelymatkan päässä
            rinteistä ja palveluista.
          </p>
          <p>
            Koko valikoima kohteineen, kokoluokkineen ja sijainteineen löytyy
            omalta sivultaan:{" "}
            <Link
              to="/majoitukset"
              className="text-primary hover:text-primary/80 underline underline-offset-4 font-semibold"
            >
              Majoitus Levillä
            </Link>{" "}
            — studiohuoneistoista kahdelle aina 14 hengen hirsihuvilaan asti.
            Useimmissa kohteissa on oma sauna.
          </p>
          <p>
            Varaaminen käy suoraan meiltä ilman välittäjää: valitset päivämäärät,
            näet vapaat kohteet ja teet varauksen. Joulu ja hiihtolomaviikot ovat
            kysytyimpiä, joten varaa hyvissä ajoin.
          </p>
        </div>

        <h3 className="font-serif text-xl md:text-2xl text-foreground mt-10 mb-4">
          Suosituimmat kohteet ja oppaat
        </h3>
        <nav aria-label="Sisäiset linkit majoitukseen Levillä">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hubs.map((h) => (
              <li key={h.href}>
                <Link
                  to={h.href}
                  className="text-primary hover:text-primary/80 underline underline-offset-4"
                >
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default HomeSeoBlock;
