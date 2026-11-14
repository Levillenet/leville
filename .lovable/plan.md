# Majoitushakujen kannibalisointi – näkemys GSC-datan perusteella

Data: Search Console, leville.net, 14.8.–11.11.2026, yleiset majoitus-/mökkihaut.

## Onko Claude oikeassa?
Osittain. Kannibalisointia on, mutta se on kahdessa eri ryhmässä, ja ehdotettu ohjaus /mokit-levilla -> /majoitukset olisi virhe.

**Ryhmä A – "levi majoitus / huoneisto" (iso volyymi):**
- "levi majoitus": etusivu 2150 näyttöä, sija 11,4 | /majoitukset 825, sija 13,6 | /opas/majoitus-levilla 84, sija 28 | /mokit-levilla 70, sija 28.
- Todellinen kilpailu on etusivu vs /majoitukset. Muut sivut saavat näistä vain murusia, eivät ne estä nousua.
- /opas/majoitus-levilla ei voita mitään hakua (sijat 19–65) -> Clauden ehdotus sen ohjaamisesta /majoitukset-sivulle on perusteltu.

**Ryhmä B – "levi mökit / mökki / vuokramökit":**
- /mokit-levilla ja /opas/vuokramokit-levi vuorottelevat lähes joka haussa (sijat 15–25 kummallakin), etusivu kolmantena.
- /mokit-levilla on mökkihakujen paras sivu ("levi mökit" sija 15). Sen ohjaaminen /majoitukset-sivulle (joka on mökkihauissa sijalla 21–33) heikentäisi tilannetta.
- Oikea pari yhdistettäväksi on /mokit-levilla + /opas/vuokramokit-levi.

**Lisälöydös:** Googlessa näkyy myös http://www.leville.net/ ja http://leville.net/ -versioita sekä /majoitus/levin-keskustahuoneistot – osoiteversiot hajauttavat signaalia.

## Ehdotettu toteutus
1. /opas/majoitus-levilla -> 301 /majoitukset. Hyödyllinen opassisältö siirretään /majoitukset-sivun alaosaan.
2. Mökit: valitaan yksi pääsivu (ehdotus /mokit-levilla, paras sijoitus). /opas/vuokramokit-levi joko 301 sinne, tai muutetaan selkeästi eri aiheeksi (esim. "mökki vai huoneisto" -vertailu) eikä se kilpaile "vuokramökit"-hausta.
3. Etusivu vs /majoitukset: etusivun otsikko/kuvaus brändi- ja Levi-loma-painotteiseksi, /majoitukset omistaa "Levi majoitus / huoneistot" -sanat (title, H1, sisäiset linkit ankkuritekstillä "majoitus Levillä" -> /majoitukset). Etusivulle selvä linkki /majoitukset-sivulle.
4. Sisäiset linkit ja sitemap päivitetään osoittamaan vain pääsivuille; poistetut sivut pois sitemapista ja hreflang-pareista (myös EN-vastineet tarkistetaan).
5. Tarkistetaan, että www- ja http-versiot ohjautuvat 301:llä https://leville.net:iin, ja /majoitus/levin-keskustahuoneistot-sivun rooli.

## Tekninen
- Uudelleenohjaukset: nykyinen 200-alias/redirect-mekanismi (App.tsx + julkaisun redirect-säännöt), sitemap-generaattori, seo_pages-taulu.
- Ennen muutoksia luetaan sivujen sisältö ja EN-vastineet; muutoksen jälkeen GSC-seuranta 4–6 viikkoa.
