# Korjaus: minimiyömäärä lasketaan väärin (kohde 102 puuttuu 14.–16.9.)

## Mikä on vialla

Tarkistin Moderin tuoreen datan 14.–16.9.:

- Skistar 102: molemmat yöt vapaana, Moderin **min_nights = 2** kummallekin yölle, 2 yön hinta 132 €.
- Silti äkkilähtölistauksessa kohteen 102 jaksolle 2.9.–23.10. on merkitty **minNights = 3**.

Syy: taustapalvelu laskee koko vapaan jakson minimiyömäärän **suurimman arvon mukaan** kaikista jakson päivistä. Kohteella 102 vapaa jakso on 51 yötä pitkä, ja jossain lokakuun päivässä minimi on 3 — se nostaa koko syyskuun vaatimuksen kolmeen ja pudottaa kohteen 2 yön hausta. Sama koskee muitakin pitkiä jaksoja: Skistar 104, Skistar 321, Skistar 320, Moonlight 415, Glacier B1/B2.

## Korjaus

Minimiyömäärä arvioidaan vain niille öille, jotka asiakas oikeasti varaa, ei koko vapaalle jaksolle.

1. Taustapalvelu palauttaa jokaiselle jaksolle päiväkohtaisen minimiyötaulukon (päivämäärä → min_nights) nykyisen yhden `minNights`-luvun rinnalle.
2. Äkkilähtösivu tarkistaa haussa vain valitun jakson yöt: jos 14.9. ja 15.9. sallivat 2 yötä, kohde näkyy — vaikka lokakuussa olisi tiukempi rajoite.
3. `minNights`-kenttä säilyy taaksepäin yhteensopivana, mutta se lasketaan jatkossa jakson **alkupäivän** mukaan, ei maksimina.
4. Välimuisti tyhjennetään korjauksen jälkeen, jotta uusi rakenne tulee heti käyttöön.

Tämän jälkeen 14.–16.9. haussa näkyy kohteen 102 lisäksi mm. Skistar 104, 320, 321 ja Moonlight 415.

## Erikseen huomattava (ei muuteta tässä)

Glacier A1 ja Hiihtäjänkuja 5A2 jäävät edelleen pois 14.–16.9. haulla, koska niiden vapaa aukko on 3 yötä ja Gap Fill -sääntö avaa lyhyemmän myynnin vasta kun saapumiseen on ≤ 7 päivää. Tämä on tarkoituksellinen asetus; kerro jos haluat sen rajan nostettavaksi.

## Tekniset yksityiskohdat

- `supabase/functions/moder-availability/index.ts`: `Window_`-tyyppiin ja `buildWindows`-funktioon kenttä `minNightsByDate: Record<string, number>`; `minNights` = jakson ensimmäisen yön arvo `Math.max(...)`:n sijaan; kenttä mukaan `deals`-vastaukseen.
- `src/pages/Akkilahdot.tsx`: haun suodatin käyttää valitun jakson öiden maksimia `deal.minNightsByDate`-taulukosta (fallback `deal.minNights`), sekä hakutuloksissa että esimerkkikorteissa.
- Deploy + `moder-availability?force_refresh=true` välimuistin uudelleenrakennukseen.
