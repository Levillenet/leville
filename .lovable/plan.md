

# WhatsApp-tikettiviestien linkki-esikatselu

## Ongelma
Kun tiketti lähetetään WhatsAppilla, "Kuittaa tehdyksi" -linkit (esim. `leville.lovable.app/tiketti-ratkaistu?token=...`) generoivat WhatsAppissa rikkaan linkki-esikatselun (preview card), joka vie tilaa ja häiritsee viestin luettavuutta.

## Ratkaisu
WhatsApp ei generoi linkki-esikatselua, jos URL-osoitteen edessä ei ole `https://`-protokollaa. Muutetaan viestin rakenne niin, että:
1. Viestiteksti tulee ensin selkeästi
2. Resolve-linkit ovat viestin lopussa ilman `https://`-etuliitettä → WhatsApp näyttää ne pelkkänä tekstinä ilman preview-korttia
3. Käyttäjä voi silti kopioida linkin ja liittää selaimeen

## Muutos — `TicketAdmin.tsx`, rivit ~2060–2069

Nykyinen:
```
✅ Kuittaa tehdyksi:
https://leville.lovable.app/tiketti-ratkaistu?token=abc123
```

Uusi:
```
✅ Kuittaa tehdyksi:
leville.lovable.app/tiketti-ratkaistu?token=abc123
```

Poistetaan `https://` resolve-linkeistä `siteBase`-muuttujasta tai viestin muodostuksessa. Tämä estää WhatsAppin automaattisen esikatselun mutta linkki on silti kopioitavissa.

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Poistetaan `https://` resolve-linkeistä WhatsApp-viesteissä |

