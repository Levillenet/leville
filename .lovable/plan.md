# Korvataan Winter10-pilleri Levi Golf -bannerilla

**Tiedosto:** `src/pages/Majoitukset.tsx` (rivit 204–217)

Poistetaan nykyinen pieni "Käytä koodia winter10 – 10% alennus keväälle 2026!" -pilleri ja korvataan se isommalla kortti-bannerilla.

## Bannerin sisältö

- **Otsikko:** "Etua asiakkaillemme!" (käännetty 7 kielelle)
- **Teksti:** "Tarjoamme majoitusasiakkaillemme Levi Golf -kierrokset hintaan 25 € / kierros. Varaukset ja tiedustelut: info@leville.net"
- **CTA-nappi:** "Ota yhteyttä" → `mailto:info@leville.net`
- Sähköpostiosoite myös klikattavana linkkinä leipätekstissä

## Tyyli

- `max-w-3xl mx-auto`, `rounded-2xl`, gradient-tausta `from-primary/15 to-aurora-green/15`, reuna `border-primary/30`, padding `p-6 md:p-8`
- Vasemmalla pyöreä ikoni-tausta + lucide `Flag`-ikoni primary-värillä
- Oikealla otsikko, kuvaus ja CTA-nappi
- Säilytetään `ScrollReveal`-wrapperi samalla paikalla kuin nykyinen pilleri
- Vain semanttiset design-tokenit (primary, aurora-green, foreground, muted-foreground)

## Käännökset

Kaikki tekstit upotetaan paikallisesti `lang === "xx" ? ... : ...` -kaavalla (fi, sv, en, de, es, fr, nl) — sama tyyli kuin viereisillä lohkoilla samalla sivulla. Käännöstiedostoihin ei kosketa.

## Mitä EI muuteta

- `Tag`-ikonin import voidaan jättää (käytössä muualla) — varmistetaan tarvittaessa, että `Flag` lisätään lucide-importteihin.
- Hero-promo (`HeroPromoBadge`) ja admin-hallittava `PromoBanner` säilyvät ennallaan.
