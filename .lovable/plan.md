

# Ilmoitustyökalun kuvaus ja selkeytys

## Mikä se on

"Ajankohtaiset ilmoitukset" -työkalu julkaisee **info-bannereita valituille alasivuille** (esim. laskettelu-, sää-, lumisivut). Bannerit näkyvät sivuston kävijöille valitulla aikavälillä. "Alkaa" ja "Päättyy" määrittävät milloin ilmoitus on näkyvissä sivustolla.

## Muutos

Lisätään admin-näkymään selkeä kuvausteksti otsikon alle, joka kertoo mitä työkalu tekee ja mitä "alkaa/päättyy" tarkoittaa:

| Kohde | Muutos |
|---|---|
| `TimedNoticesAdmin.tsx` | Lisätään otsikon alle lyhyt kuvausteksti: *"Lisää ajastettuja ilmoitusbannereita sivuston alasivuille. Ilmoitus näkyy kävijöille valitulla aikavälillä (alkaa–päättyy)."* |
| `TimedNoticesAdmin.tsx` | Vaihdetaan "Alkaa" → "Näkyy alkaen" ja "Päättyy" → "Näkyy asti" lomakekentissä selkeyttämään merkitystä |

