# Poista redundantti "Santa Claus Experiences in Levi" -kortti

## Tavoite
Santa Claus -sivun yläosassa oleva yksinkertainen "Santa Claus Experiences in Levi" -info-kortti on tarpeeton, koska sivun alempana esitellään jo neljä palveluntarjoajaa yksityiskohtaisesti. Poistetaan tupla-info ja pidetään sivu tiiviimpänä.

## Toimenpiteet

1. **Poista redundantti osio** `src/pages/guide/SantaClausLevi.tsx` riveiltä ~485–515:
   - Otsikko "Santa Claus Experiences in Levi" (Gift-ikoni)
   - Johdantokappale "Several experience companies in Levi organise..."
   - Info-kortti "There are many other Santa experience providers..."

2. **Säilytä tervetulokirje-kortti**: siirretään PDF-latauskortti omaan erilliseen osioonsa heti "Santa's Cabin" -osion jälkeen tai ennen palveluntarjoajaosioita, koska se ei ole tarpeeton — se on konversioelementti lapsiperheille.

3. **Käännösten siivous**: poista käyttämättömäksi jäävät `sections.experiences.title`, `sections.experiences.content` ja `sections.experiences.note` -avaimet sekä FI- että EN-käännösobjekteista. Säilytä `sections.experiences.letterTitle`, `letterDesc` ja `letterButton`, mutta siirrä ne sopivampaan paikkaan (esim. `welcomeLetter`-nimiavaruuteen).

4. **Tarkista riippuvuudet**: varmista, ettei `Gift`-ikonin importi tai muut osion elementit jää käyttämättömiksi importeiksi.

5. **Validointi**: aja `bun run build` / `npm run build` ja tarkista, että sivu renderöityy oikein paikallisessa esikatselussa.

## Rajaus
- Ei muuteta palveluntarjoajaosioita, FAQ:ta, vertailua eikä MajoitusCalloutia.
- Ei vaikutusta URL-reitteihin, kanoniseen osoitteeseen tai hreflang-tageihin.
