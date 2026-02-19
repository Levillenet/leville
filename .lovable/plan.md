
# Hollanninkielisten sivujen lisääminen (nl)

## Tausta

Hollantilaiset ovat merkittava kohderyhmä Leville -- he matkustavat paljon Lappiin laskettelemaan ja kokemaan revontulia. Hollanninkielinen sisalto auttaa Google-nakyvyydessa hollantilaisille kayttajille.

## Priorisoitavat sivut

Googlen nakokulmasta tarkeimmat sivut hollantilaisille:

**Tier 1 -- Varauspolku (kriittinen)**
1. **Etusivu** `/nl` -- ensivaikutelma, varauswidget
2. **Majoitukset** `/nl/accommodaties` -- varauspaatoksen sivu
3. **Akkilahdot** `/nl/last-minute` -- impulssiostosivu

**Tier 2 -- Tietosivut (nakyvyys Googlessa)**
4. **Levi-info** `/nl/levi` -- yleistieto kohteesta
5. **Laskettelu** `/nl/gids/skieen-in-levi` -- hollantilaisten paaaktiviteetti
6. **Revontulet** `/nl/noorderlicht` -- toinen vetonaula
7. **Joulu Lapissa** `/nl/levi/kerst-in-lapland` -- sesonkisivu

**Tier 3 -- Tukisivut**
8. **Yhteystiedot** `/nl/contact`
9. **UKK** `/nl/faq`
10. **Varausehdot** `/nl/boekingsvoorwaarden`
11. **Tietosuoja** `/nl/privacy`
12. **Yritys** `/nl/bedrijf`

## Tekninen toteutus

### 1. Kaannostiedosto
- Luodaan `src/translations/nl.ts` -- kaannetaan kaikki avaimet hollanniksi (n. 300 rivia)

### 2. Kielisysteemi paivitetaan
- `src/translations/index.ts`: lisataan `"nl"` Language-tyyppiin, translations-objektiin, languageConfig, routeConfig
- Kielivalitsimen lippu: Hollannin lippu

### 3. Reitit App.tsx:ssa
- Lisataan kaikki `/nl/...` reitit (12 reittia)

### 4. Sivukomponentit
- Paivitetaan jokainen sivu tukemaan `lang="nl"` (og:locale `nl_NL`, hreflang jne.)
- Laskettelu-opas vaatii erillisen hollanninkielisen version tai `lang`-propin lisayksen

### 5. SEO
- `HreflangTags`-komponentti paivitetaan tukemaan `nl`
- `sitemap.xml` paivitetaan hollanninkielisilla URLilla ja hreflang-viitteilla
- Kaikki olemassa olevat sivut saavat myos nl-hreflang-viittauksen

### 6. GuideTeaser
- Lisataan hollanninkieliset kaannokset GuideTeaser-komponenttiin

### 7. Muut komponentit
- Header, Footer, LanguageSelector -- nl-tuki
- WhatsApp-chat -- hollanninkielinen viestiohje
- ModerBookingWidget -- varauswidget (kaytetaan EN-fallbackia kuten DE/ES/FR)

## Laajuus ja suositus

Tama on laaja tyokokonaisuus (arviolta 15-20 viestia). Suosittelen toteuttamista vaiheittain:

**Vaihe 1**: Kielisysteemi + kaannostiedosto + etusivu + majoitukset + akkilahdot
**Vaihe 2**: Levi-info + laskettelu + revontulet + joulu
**Vaihe 3**: Tukisivut (UKK, yhteystiedot, varausehdot, tietosuoja, yritys)
**Vaihe 4**: Sitemap + hreflang-paivitykset kaikille sivuille

Haluatko aloittaa vaiheesta 1?
