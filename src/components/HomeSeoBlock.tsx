import { Link } from "react-router-dom";

/**
 * SEO-tekstilohko etusivulle. Kattaa pääavainsanaklusterit, jotka eivät
 * mahdu Hero/About-osioihin: lomahuoneisto, mökkivuokraus, saunamökki,
 * ryhmäkoot, hintahaarukat. Sisäiset linkit hub-sivuille ja vertailuihin.
 * Vain FI – muut kielet lisätään käännösten valmistuttua.
 */
const HomeSeoBlock = () => {
  const hubs: { href: string; label: string }[] = [
    { href: "/vuokramokit/postintie-levi", label: "Skistar-huoneistot Postintie 3:lla" },
    { href: "/vuokramokit/glacier-apartments-levi", label: "Glacier-alppihuoneistot keskustassa" },
    { href: "/vuokramokit/hiihtajankuja-levi", label: "Hiihtäjänkujan mökit" },
    { href: "/vuokramokit/ratsastajankuja-levi", label: "Ratsastajankujan mökit" },
    { href: "/vuokramokit/skimbaajankuja-levi", label: "Skimbaajankujan huoneistot" },
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
          Majoitus Levillä — kaikki vaihtoehdot Levin keskustassa
        </h2>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
          <p>
            Etsitkö <strong>majoitusta Levillä</strong> suoraan omistajalta ilman
            välityspalkkioita? Leville.net vuokraa omia{" "}
            <strong>vuokramökkejä Leviltä</strong> sekä moderneja{" "}
            <strong>huoneistoja Levin keskustassa</strong>, kävelymatkan päässä
            rinteistä, ravintoloista ja palveluista. Valikoimaamme kuuluu
            studiohuoneistoja kahdelle, perhehuoneistoja 4–6 hengelle, isoja
            alppihuoneistoja 8–10 hengelle sekä tunnelmallinen hirsimökki jopa 14
            hengelle.
          </p>
          <p>
            <strong>Mökkivuokraus Leviltä</strong> on helppoa: valitset
            päivämäärät, näet hinnan ja varaat suoraan – kaikki kohteet ovat
            omiamme, eikä välissä ole välittäjää. Useimmissa kohteissa on{" "}
            <strong>oma sauna</strong>, joten <em>saunamökki</em> tai{" "}
            <em>saunallinen huoneisto Leviltä</em> löytyy lähes mistä tahansa
            kohteestamme.
          </p>
          <p>
            <strong>Lomahuoneiston</strong> tai mökin hinta Levillä vaihtelee
            sesongin ja kohteen mukaan: studiohuoneisto kahdelle noin 70–150 €/yö,
            perheasunto 4–6 hengelle noin 120–250 €/yö ja tilava mökki 8–14
            hengelle noin 200–500 €/yö. Joulu ja hiihtolomaviikot ovat kysytyimpiä,
            joten varaa hyvissä ajoin.
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
