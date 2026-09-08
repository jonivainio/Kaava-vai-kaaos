# Kaava vai kaaos — aineisto Codexille

**Tarkoitus:** toteuta olemassa olevaan peliin v5-käsikirjoituksen sisältö, oikeat seurausketjut, kuvituksen aihepäivitykset ja tarvittavat testit. Älä tee pelkkää tekstien vaihtoa.

## Käyttö

Anna tämä paketti Codexille siinä projektissa, jossa Kaava vai kaaos -peliä kehitetään. Paketin voi purkaa esimerkiksi projektin `docs/handoff/kaava-v5/`-hakemistoon tai säilyttää sen vieressä työaineistona. Älä pura sitä suoraan `content/`-tiedostojen päälle: sisältö pitää ensin kohdistaa oikeaan toteutukseen.

Kopioi tehtäväksi `CODEX_ALOITUSPROMPTI.txt`. Se käskee lukea toteutusohjeen ja käsikirjoituksen, toteuttaa muutokset vaiheittain ja raportoida todellisen testauksen. Projekti pitää valita oikein; pelkkä zipin lähettäminen ei siirrä toisen projektin koodia tähän.

## Paketin sisältö

| Tiedosto | Käyttö |
|---|---|
| `CODEX_ALOITUSPROMPTI.txt` | Suoraan annettava tehtävänanto. |
| `01_CODEX_TOTEUTUSOHJE.md` | Mitä parannetaan, miten integroidaan ja mitä ei saa rikkoa. |
| `02_HYVAKSYNTATESTIT.md` | 60 tunnistettua hyväksymistestiä sekä haara- ja simulaatiokattavuuden vaatimukset. |
| `KAAVA_VAI_KAAOS_TARKISTUSDOKUMENTTI_v5.md` | Muuttamattomana mukana oleva ensisijainen käsikirjoitus. |
| `KAAVA_VAI_KAAOS_v5_MUUTOSSELOSTE.md` | Muuttamattomana mukana: 16 muutoskohdan käsittely ja aiemman toimituksen rajat. |
| `KAAVA_VAI_KAAOS_v5_LAHTEET.md` | Muuttamattomana mukana: lähdeavaimet, päivämäärät ja niiden rajaukset. |
| `03_SISALTOINDEKSI.json` | Koneellisesti luettava indeksi 248 sisällöstä; ei suoritettavaa pelilogiikkaa. |
| `04_SISALTOKATTAVUUS.md` | Samat sisältötunnisteet vaiheittaisena tarkistuslistana. |
| `tools/tarkista_toimitus.py` | Lukevan tarkistuksen työkalu: tarkistussummat, ID:t, vaiheistus, viitteet ja indeksi. |
| `TOIMITUKSEN_TARKISTUS.txt` | Tässä toimituksessa oikeasti ajettu paketin eheystarkistus, ei pelin testiraportti. |
| `SHA256SUMS.txt` | Paketin alkuperäisten tiedostojen tarkistussummat. |

## Tärkein erottelu

V5 määrittää pelikerralla näytettävän tekstin ja seurausten tarkoituksen. Pelimoottori täytyy muuttaa toteuttamaan ne. Käsikirjoituksen yleiskieliset ehdot eivät suorita koodia, eikä viitelista ole sellaisenaan tapahtumajono.

Tämän paketin lähtöaineisto on **159 päätöstä/varianttia ja 89 tapahtumaa**. Yksi pelikerta ei sisällä koko pankkia. Vanhan pilotin ja pitkän kampanjan koko arkisto ei kuulu tämän käsikirjoituksen kattavuuteen.

Käsikirjoitusta ei ole nimetty v6:ksi: pelitekstit ovat edelleen v5. Tämä on sen uusi toteutusohjeistus. Jos myöhemmin muokkaat käsikirjoitusta, toimita uusi tiedosto erikseen ja nimeä se Codexille uudeksi ensisijaiseksi lähteeksi. Vanha indeksi on silloin päivitettävä, ei uusi teksti palautettava vanhaksi.

## Paikallinen aineistotarkistus

Aja paketin juurihakemistosta:

```sh
python tools/tarkista_toimitus.py
```

Tarkistus ei asenna riippuvuuksia, tee verkkopyyntöjä eikä muuta lähdetiedostoja. Se ei testaa peliä tai vahvista tekstien oikeudellista paikkansapitävyyttä.
