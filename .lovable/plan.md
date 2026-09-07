# Indicative rates -kappale llms.txt:ään

Hinnat haettu livevarausjärjestelmästä 7.9.2026, €/yö per kohde (kokonaishinta / yöt), ilman loppusiivousta.

## Mitä Moder ei palauttanut

- **13.7.2026 (kesä)**: ei yhtään hintaa millekään kohteelle, ei 3 eikä 7 yön jaksolle. Mennyt päivä — kalenteri ei anna hintoja. Ei arvattu, ei mukana haarukoissa.
- Kaikki muut 8 ajankohtaa palauttivat hinnat kaikille kohderyhmille.

## Haetut luvut (€/yö, min–max ryhmän sisällä)

| Ajankohta | Yöt | Studiot | 1 mh | 2 mh | 3–5 mh | Karhupirtti |
|---|---|---|---|---|---|---|
| 18.1.2027 tammi (normaali) | 3 | 113–211 | 134–155 | 207–227 | 210–341 | 910 |
| 18.1.2027 | 7 | 85–173 | 101–126 | 155–203 | 203–307 | 644 |
| 15.2.2027 helmi | 3 | 153–228 | 182–214 | 252–367 | 367–532 | 900 |
| 15.2.2027 | 7 | 141–191 | 150–189 | 222–321 | 302–435 | 1 029 |
| 15.3.2027 maalis | 3 | 178–264 | 211–288 | 292–437 | 358–622 | 900 |
| 15.3.2027 | 7 | 156–212 | 166–232 | 245–361 | 296–475 | 1 029 |
| 19.4.2027 huhti | 3 | 130–194 | 155–182 | 214–276 | 262–400 | 765 |
| 19.4.2027 | 7 | 114–155 | 122–146 | 180–229 | 217–306 | 874 |
| 21.12.2026 joulu | 3 | 269–299 | 248–299 | 291–371 | 346–636 | 1 484 |
| 21.12.2026 | 7 | 203–291 | 221–291 | 333–425 | 372–681 | 1 572 |
| 1.3.2027 viikko 9 | 3 | 178–264 | 211–288 | 292–437 | 358–622 | 900 |
| 1.3.2027 | 7 | 156–212 | 166–232 | 245–361 | 296–475 | 1 029 |
| 29.3.2027 pääsiäinen | 3 | 158–236 | 188–256 | 260–388 | 318–554 | 930 |
| 29.3.2027 | 7 | 137–185 | 145–202 | 214–316 | 259–415 | 1 041 |
| 13.7.2026 kesä | 3 / 7 | – | – | – | – | – |
| 14.9.2026 ruska | 3 | 53–61 | 53–61 | 75–77 | 81–104 | 195 |
| 14.9.2026 | 7 | 45–49 | 45–49 | 49–60 | 57–90 | 175 |

## Kokonaishaarukat (8 ajankohtaa)

Studiot 45–299 · 1 mh 45–299 · 2 mh 49–437 · 3–5 mh 57–681 · Karhupirtti 175–1 572 €/yö.

## Valmis teksti (korvaa nykyisen "### Indicative Rates" -osan sisällön)

```text
Indicative nightly rates (sampled from live booking system, September 2026;
excluding final cleaning 50–220 €; always verify at https://app.moder.fi/levillenet):
- Studios (Skistar 102/104/319/320/321, Levi Platinum A2): 45–299 €/night
- 1-bedroom (Skistar 209/210/310, Moonlight 415): 45–299 €/night
- 2-bedroom (Skistar 211/212, Front Slope 5A2/5B2, Karhunvartija 3, Glacier A4/A6): 49–437 €/night
- 3–5 bedroom (Front Slope 5B5, Glacier A1/A2/A3/A5/B1/B2/B3/B4): 57–681 €/night
- Bear Lodge / Karhupirtti (7BR, sleeps 14): 175–1,572 €/night

Lowest rates: autumn and other off-season weeks (September) and January outside holiday
weeks, 7-night stays. Highest rates: Christmas/New Year, Finnish ski holiday weeks 8–10
(late Feb–early March) and Easter, short 3-night stays. Longer stays are priced lower per
night.
```

Poikkeama pyytämästäsi tekstistä: "summer (June–August)" jätetty pois, koska heinäkuulle ei saatu yhtään hintaa — alin mitattu taso on syyskuu, joten lause puhuu sesongin ulkopuolisista viikoista.

## Toteutus

Muokataan vain `public/llms.txt`, vain "### Indicative Rates" -osio. Ei muita muutoksia.
