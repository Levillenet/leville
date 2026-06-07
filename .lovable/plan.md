## Vaiheet A + B: suorituskykyoptimointi

Tehdään valitsemasi laajuus: nopeat voitot (A) + kiinteistödatan eristys omaan chunkkiin (B). Ei UI-muutoksia, ei toiminnallisuuden poistoja.

### Vaihe A — initial-bundlen kevennys

1. **`index.html`** — yhdistä kaksi Google Fonts -pyyntöä yhdeksi linkiksi (säästää 1 RTT mobiilissa). `display=swap` molemmille fonteille.
2. **`src/App.tsx`** — poista turha `PageTransition`-wrapper (`<>{children}</>`). Suora `<Suspense>` riittää.
3. **`src/App.tsx`** — muuta `PageViewTracker` ja `StructuredData` `React.lazy()`-ladatuiksi, kääri kevyeen `<Suspense fallback={null}>`. Nämä eivät vaikuta ensirenderiin → pois critical pathilta (~10 kB JS + 1 verkko­pyyntö viivästyy).
4. **`src/components/PageTransition.tsx`** — poista tiedosto (käyttämätön muutoksen jälkeen).

### Vaihe B — kiinteistödata omaksi chunkiksi

5. **`vite.config.ts`** — laajenna `manualChunks` funktiomuotoon:
   - `'translations'` → kaikki `src/translations/*`
   - `'properties-data'` → `src/data/properties.ts`, `propertyTranslationsFi.ts`, `propertyTranslationsEn.ts`, `propertyDetails.ts`
   - `'icons'` → `lucide-react`
   - säilytetään olemassa olevat react/ui/supabase-vendor-chunkit

Tämä takaa, että:
- Etusivu ei lataa kiinteistödataa (jo nyt lazy, mutta nyt jaettu yhdeksi shared chunkiksi useamman lazy-sivun kesken → ei duplikoinnista).
- Käännöspaketti pysyy yhtenä chunkkina, jonka selain voi cachetä erikseen sisällön muutoksista.
- Lucide-ikonit eivät päädy joka sivun komponenttichunkkiin.

### Mitä EI tehdä tässä vaiheessa

- Käännösten kielikohtaista lazy-latausta (Vaihe C) — vaatisi hookin muutoksia 107 tiedostossa.
- Guide-sivujen tekstidatan eristystä (Vaihe D).
- Ei kosketa Supabaseen, SEO:hon, RLS:ään, sisältöön eikä UI:hin.

### Odotettu vaikutus

- Initial JS −20–40 kB (PageTransition pois, tracker/structured-data deferred, font-RTT pois).
- Property-sivujen toinen lataus nopeampi (jaettu chunk cachettyy).
- Etusivun TTI ~100–300 ms nopeampi mobiilissa.
