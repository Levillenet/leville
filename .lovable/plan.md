# Linkit /majoitukset-sivulle kahdeksalta sivulta

## Vaihe 1 — tarkistuksen tulos (korjaukset alkuperäiseen pyyntöön)

| Sivu | Löytyy jo | Toimenpide |
|---|---|---|
| Revontulet | vain "Selaa majoituksia" -painike (7 kieltä) | FI + EN tekstilinkki |
| SkiingInLevi | **EN:llä on jo tekstilinkki** "accommodation in Levi" (hissit-osio) | vain FI + NL, EN ohitetaan |
| SantaClausLevi | CTA-painike + Lue seuraavaksi -kortti | FI + EN tekstilinkki, Moder-linkki ennallaan |
| KaamosLevi | Lue seuraavaksi + CTA | FI + EN tekstilinkki |
| LeviIn3Days | "Majoitus"-osion linkki "Selaa kaikkia majoituksia" (tekstilinkki sivun loppupuolella) | FI + EN tekstilinkki alkupuoliskolle |
| ApresSkiLevi | ei mitään | FI + EN tekstilinkki |
| WorldCupLevi | Lue seuraavaksi + CTA | FI + EN tekstilinkki |
| PricesInLeviPage | painike "View Leville.net Accommodations" + kortti | EN tekstilinkki |

Muut korjaukset:
- **NL-reitti on olemassa**: `/nl/accommodaties` (ei `/en/accommodations`). NL-linkki osoittaa sinne.
- Revontulet on monikielinen (fi, en, sv, de, es, fr, nl). Lisään linkin vain FI ja EN -versioon, kuten pyysit; muihin kieliin ei kosketa.
- LeviIn3Days: nykyinen linkki on sisältötekstissä mutta ankkurina "Selaa kaikkia majoituksia", ei tavoiteankkuri. Tulkitsen, että uusi linkki lisätään silti — vahvista, jos haluat ohittaa.

## Vaihe 2 — toteutus

Jokaiselle sivulle yksi lause sivun alkupuoliskolle, olemassa olevan kappaleen perään `Link`-linkkinä (sama tyyli kuin CrossCountrySkiingInLevi: `text-primary underline`). Ankkurit:
- Revontulet, SkiingInLevi, SantaClausLevi, KaamosLevi, ApresSkiLevi: "majoitus Levillä" / "accommodation in Levi"
- LeviIn3Days, WorldCupLevi: "majoitus Levin keskustassa" / "accommodation in Levi center"
- SkiingInLevi NL: "accommodatie in Levi" → `/nl/accommodaties`
- PricesInLeviPage: "accommodation in Levi"

Ei muutoksia olemassa olevaan tekstiin, painikkeisiin tai Moder-linkkeihin. Toteutuksen jälkeen raportoin sivukohtaisesti tarkan lisätyn lauseen ja sen sijainnin (osio).
