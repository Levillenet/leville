# Korjataan WhatsApp-jakolinkin kuva

## Mistä sydän tulee

Se ei tule sivun jakokuvasta vaan sivuston faviconista. `public/favicon.ico` on edelleen Lovablen sydänlogo (varmistettu: haettu osoitteesta leville.net/favicon.ico, kuva on oranssi-sininen sydän). `favicon.png` ja `apple-touch-icon.png` ovat jo oikein meidän mökkilogomme — vain `.ico` jäi vaihtamatta.

WhatsApp näyttää tuon pienen ikonin isomman esikatselukuvan sijaan, koska sivun oma jakokuva on liian raskas: `og-sauna.png` on 1,36 MB. WhatsApp hylkää yli ~600 kt:n kuvat ja putoaa faviconiin. Sama koskee muitakin sivuja: `og-image.png` 1,34 MB ja `og-akkilahdot.png` 1,46 MB — eli käytännössä lähes kaikki jaetut linkit näyttävät nyt sydämen.

Lisäksi kuvat ovat 1200x686 px, vaikka metatageissa ilmoitetaan 1200x630.

## Mitä tehdään

1. **Vaihda favicon.ico** mökkilogoon (sama kuvamaailma kuin `favicon.png`), jotta sydän katoaa selaimen välilehdeltä ja kaikista varafallbackeista.
2. **Kevennä jakokuvat** alle 300 kt:n: `og-image.png`, `og-sauna.png`, `og-akkilahdot.png` (ja tarkistetaan `og-latuinfo.png`, 332 kt). Kuvat pakataan uudelleen samannäköisinä — sisältöä ei muuteta.
3. **Korjaa mitat** 1200x630:een, jotta ilmoitetut `og:image:width/height` vastaavat todellisuutta ja kuva rajautuu oikein WhatsAppissa, Facebookissa ja LinkedInissä.
4. **Tarkistus**: haetaan julkaistut URL-osoitteet WhatsAppin/Facebookin user-agentilla ja varmistetaan, että og:image palautuu 200 OK ja tiedostokoko on rajan alla.

Muutokset koskevat vain kuvatiedostoja `public/`-kansiossa. Metatageja, tekstejä, reittejä tai hreflangia ei kosketa — kuvatiedostojen nimet pysyvät samoina, joten koodiin ei tarvitse muutoksia.

## Huomio

Muutos näkyy WhatsAppissa vasta julkaisun jälkeen, ja WhatsApp/Facebook välimuistittaa esikatselut. Vanha linkki voi näyttää sydäntä vielä jonkin aikaa — uusi jakolinkki tai Facebookin Sharing Debugger -päivitys nollaa välimuistin.
