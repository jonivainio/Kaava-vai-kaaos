# V5-integraation lähtötilanne, 8.9.2026

Lähtöcommit: `b032765605de236464042a574700b69fe49475a0`, haara `main`. Työkansio oli puhdas: käyttäjän tallentamattomia git-muutoksia ei ollut. Työhaara: `codex/v5-content-logic`. Nykyinen julkaistu `swipe-fi-007` säilyy käytössä, kunnes v5:n käyttäytyminen on varmennettu.

Ensisijainen lähde on muuttamattomana `docs/source-v5/KAAVA_VAI_KAAOS_CODEX_v5/`. Käsikirjoitus, muutoskooste, toteutusohje, lähdeavaimet ja K01–K60-suunnitelma on luettu kokonaan. Paketin oma eheystarkistus ajettu: 248 ID:tä, 159 päätöstä, 89 tapahtumaa, 143 nimettyä haaraa, 318 valintaa. SHA-256: `03ae272389667c41412e8fef7a86f091db147aa72fbe6907a54b79661d3003f2`.

Lähtöversion todellinen varmennus tässä toimeksiannossa: 82 TypeScript-testiä, tyypitys ja build läpäisty. Tämä ei todista v5:n toimivuutta. Selain- ja puhelinkokeita ei ole tällä kierroksella vielä ajettu.

Nykyinen `src/game` käyttää kiinteää 18 päätöksen kursoria sekä suppeita tulostyyppejä. Siinä ei ole v5:n tapaustunnisteita, sopimuskohtaisia määräaikoja, BESSiä tai uutta pisteytystä. Sen RtB-portit ja automaattiset tekstimuunnokset eivät vastaa v5:tä. `src/engine` säilytetään fyysisen perustan ja nimien lähteenä; vanha `src/campaign` ja pilotti ovat arkistoa.

`tools/import_v5.py` tuo pelaajakentät muuttamatta niitä `content/v5.fi.json`:iin. Tekniset ehdot jäävät erilliseen `SOURCE_AUDIT.json`:iin. Tuntematon kenttä, puuttuva haara tai tarkistussumman muutos keskeyttää tuonnin näkyvästi. Tekstistä ei arvata vaikutuksia. Toistoajo `--check` varmistaa tuotosten täsmällisen vastaavuuden.

Toteutus etenee uusissa `src/game/v5`-moduuleissa; UI kytketään niihin vasta toimivan kokonaisuuden valmistuttua. Kattavuusraporttiin erotetaan tekstien tuonti, suoritetut säännöt, haaratestit, kuvitus ja selaintarkistus. Lähdeindeksiä ei käytetä tapahtumajonona eikä tekstituontia merkitä toteutetuksi peliketjuksi.

Kuvituksen kuusi ensimmäistä aihetta: sopimussivut, voimalalupaus, yhteisjohto, kosteikko, vuokra-ajan jatko ja akun rajattu teho. Ne arvioidaan nykyisessä korttikoossa ennen laajentamista. Tavoite on erottaa aiheet sommittelulla, mittakaavalla, ympäristöllä ja henkilöillä, ei vaihtaa vain yhden pohjan väriä.
