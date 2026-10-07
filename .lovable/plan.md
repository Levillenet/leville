# Englanninkieliset majoitushaut: /en/apartments ja sisäinen linkitys

Tavoite: UK/DE/NL-hakijat (levi accommodation, levi apartments, levi finland accommodation) löytävät oikean sivun, ja sivustomme kaksi englanninkielistä majoitussivua eivät kilpaile keskenään.

## Roolijako (ei päällekkäisyyttä)
- `/en/accommodations` = päävastaus hakuihin "levi accommodation", "accommodation in levi", "levi finland accommodation" (kaikki kohteet).
- `/en/apartments` = vastaus hakuihin "levi apartments", "apartments in levi", "levi apartment rental" (huoneistot kokoluokittain).
- `/en/log-cabins-levi` = mökkihaut (ennallaan).

## Muutokset /en/apartments-sivulle
1. Title ja kuvaus: "Apartments in Levi, Finland – Ski Apartments in Levi Centre | Leville.net" ja kuvaus, jossa sauna, kävelymatka rinteisiin ja suora varaus omistajalta (ei hintalupauksia).
2. H1: "Apartments in Levi, Finland" ja nykyinen "Find the right size for your group" alaotsikoksi.
3. Uusi lyhyt osio "Where to stay in Levi" (2–3 kappaletta): keskusta vs. eturinne, etäisyydet hisseille ja kauppaan metreinä.
4. Selkeä linkki ylöspäin: "See all accommodation in Levi" → `/en/accommodations`, sekä linkki mökkisivulle.
5. FAQ:hen 2 uutta kysymystä brittihakujen mukaan (esim. "How far are the apartments from the ski lifts?", "Do Levi apartments have a sauna?").
6. ItemList-schema kokoluokkakorteille, jos puuttuu.

## Sisäinen linkitys
- `/en/accommodations`-sivulta kontekstinen linkki ankkurilla "apartments in Levi" → `/en/apartments`.
- Kokoluokkasivuilta (Studio, For 4/6/8, Penthouse, Large Group, Levi Center) yhtenäinen takaisinlinkki "all apartments in Levi" → `/en/apartments`.
- Liikenteeltään suurimmilta EN-opassivuilta (skiing, Santa Claus, northern lights, prices, how to get to Levi) tarkistetaan, että jokaisella on yksi linkki "accommodation in Levi" → `/en/accommodations`; lisätään vain puuttuviin, olemassa olevaa tekstiä ei muuteta.

## Mitä ei tehdä
- Ei uusia reittejä, ei varausbannerin tai Moder-linkkien muutoksia, ei euromääriä.
- Ei saksan- tai hollanninkielisiä uusia sivuja (vain käännetyt sivut hreflangiin).

## Tekninen
- Tiedostot: `src/pages/en/apartments/ApartmentsHub.tsx`, kokoluokkasivut `src/pages/en/apartments/*`, `src/pages/Majoitukset.tsx` (EN-haara), tarvittavat EN-opassivut.
- Varmistus: build, Playwright-tarkistus titleille/H1:lle ja linkeille.
