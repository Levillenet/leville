

## Sivuston hakutoiminto

Lisätään hakutoiminto Headeriin, joka mahdollistaa kaikkien sivujen hakemisen. Käytetään projektissa jo olevaa `cmdk` Command-komponenttia (CommandDialog).

### Toteutus

**1. Luo hakuindeksi `src/data/searchIndex.ts`**
- Staattinen lista kaikista sivuista: `{ title, description, path, lang, category }` 
- Kategoriat: Majoitus, Opas, Aktiviteetit, Revontulet, Matka, Yleinen
- FI- ja EN-sivut (+ muut kielet) omina riveinään
- ~100–120 sivua yhteensä

**2. Luo hakukomponentti `src/components/SiteSearch.tsx`**
- Käyttää olemassa olevaa `CommandDialog`, `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`
- Suodattaa hakuindeksiä käyttäjän syötteen perusteella (otsikko + kuvaus)
- Näyttää tulokset kategoriryhmittäin
- Klikkaus navigoi sivulle ja sulkee dialogin
- Näyttää vain nykyisen kielen sivut
- Keyboard shortcut: `Ctrl+K` / `⌘K`

**3. Lisää hakupainike `src/components/Header.tsx`**
- Search-ikoni (🔍) navigaatiopalkkiin desktopilla ja mobiilissa
- Avaa CommandDialog-modaalin

### Muutettavat tiedostot
- `src/data/searchIndex.ts` (uusi)
- `src/components/SiteSearch.tsx` (uusi)
- `src/components/Header.tsx` (lisätään hakupainike)

