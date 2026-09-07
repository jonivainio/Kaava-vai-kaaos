# Kaava vai kaaos — surkuhupaisa hankekehityspeli
**Versio 2.0 • 7.9.2026 • työnimi**

Tämä paketti korvaa v1:n sisältö- ja toteutusohjeet. Se ei ole valmis peli. Mukana on **64 fiktiivistä korttia, 80 keksittyä hankenimeä, aiheittain rajatut Codex-promptit ja tarkistustyökalut**. Korttien vaikutusskeema säilyy versiossa 1.0; sisältöpaketti vaihtuu tunnisteeseen `pilot-fi-002`.

## Aloita näin

**Uusi projekti:** pura paketin sisältö uuden projektikansion juureen. Valitse Codexissa **GPT-6 Astra / High / Standard**, ja anna `CODEX_ALOITUSPROMPTI.txt`. Ensimmäinen työ tekee rajatun moottoriperustan testeineen, ei koko peliä. Seuraava prompti lisää mobiilin pelinäkymän.

**Peliä on jo alettu tehdä:** älä ylikirjoita toimivaa sovellusta tai poista vanhaa aineistoa. Laita v2 vertailua varten erilliseen alikansioon ja käytä `prompts/00_PAIVITA_OLEMASSA_OLEVA.txt`:ää. Codex sovittaa sisältöpäivityksen nykyiseen rakenteeseen. Migraatio ei ole lupa rakentaa kaikkea uudelleen.

**Yksi prompti kerrallaan.** Malli- ja reasoning-rivi kertoo käyttäjän valinnan ennen tehtävää; se ei vaihda mallia itsestään. Ellei malli näy valitsimessa, käytä `docs/MALLIT_JA_KAYTTORAJA.md`:n varavaihtoehtoa. Täsmällistä kiintiökulutusta ei luvata.

## Työnjako

ChatGPT: konsepti, sävy, aloituskäsikirjoitus, kierroksen ongelmien arviointi. Codex: moottori, UI, SVG-kuvitukset, uusi sisältö 16–24 kortin erissä, tuonti ja testit. Käyttäjä: ensimmäisen visuaalisen suunnan ja huumorin arviointi sekä puhelinpelitesti. Sekä kuvat että tekstit voidaan siis jatkossa tehdä Codexissa; niitä ei teetetä yhtenä 420 kortin massatyönä.

## Tärkeimmät tiedostot

| Tiedosto | Käyttö |
|---|---|
| `CODEX_ALOITUSPROMPTI.txt` | Ensimmäinen rajattu moottorityö |
| `CODEX_AIHEET_JA_MALLIT.txt` | Kaikki erilliset tehtäväpromptit koottuna; käytä vain yhtä osiota |
| `prompts/` | Samat tehtävät yksittäin |
| `docs/MALLIT_JA_KAYTTORAJA.md` | Malli, reasoning, vaihtokriteerit ja varmennetut lähteet |
| `docs/SAVY_JA_HUUMORI.md` | Satiirin tavoite ja laatukriteerit |
| `docs/PELISUUNNITELMA.md` | Säilytetyt lähtöluvut, vaiheet ja pelisäännöt |
| `docs/TOTEUTUSSOPIMUS.md` | Korttien vaikutusten ja ajastusten tulkinta |
| `docs/NIMET_JA_FIKTIO.md` | 80 nimeä, arvonta ja tunnistettavuuden estäminen |
| `docs/VISUAALINEN_OHJE.md` | Codexin SVG-kuvatuotanto ja visuaalinen hyväksyntä |
| `docs/TUTKIMUS_JA_RISKIPANKKI.md` | Yleinen fiktiivinen tilannepankki; ei oikeita hanketapauksia |
| `docs/KORTTITUOTANNON_SUUNNITELMA.md` | Kohti 420 korttia, toimituksellinen rytmi ja tarkistusportit |
| `docs/PILOTTIKORTIT_ESIKATSELU.md` | 64 korttia valintoineen ja vaikutuksineen |
| `content/cards.pilot.fi.json` | 48 uudelleenkirjoitettua + 16 uutta korttia |
| `content/editorial.fi.json` | Vitsiperheet, sävyn voimakkuus ja tarinarytmi |
| `content/project_names.fi.json` | 80 nimeä, ei todellisia sijainteja |
| `tools/validate_content.py` | Rakenteen, viitteiden ja nimien tarkistus |
| `tools/test_pack.py` | Validointia ja haaroja koskevat regressiotestit |
| `VALIDOINNIN_TULOKSET.txt` | Suoritetut tarkistukset ja rajaukset |
| `MUUTOSLOKI.md` | Erot v1:een ja käyttöönoton varoitukset |

## Rajaukset

Kampanjan tavoite on kaavan hyväksyntä, ei rakennettu voimala. Ensimmäinen 12 päätöksen demo päättyy vain ensimmäisen selvityskierroksen valmistumiseen. Pakka ei vielä muodosta täydellistä, todistettavasti läpi pelattavaa kampanjaa. Pelimoottoria, puhelinkäyttöä, hauskuutta tai tasapainoa ei ole testattu tässä toimituksessa.

Fiktiivinen peli ei linkity työnantajan hankkeisiin. V1:n oikeisiin hanketapauksiin perustuva tutkimusrekisteri **ei kuulu tähän v2-pakettiin tai pelin julkaisuun**. Korttien `sourceIds` on yhteensopivuuden vuoksi mukana tyhjänä; tekniset mallilähteet ovat dokumentaatiossa, eivät pelikorteissa.

## Sisältötarkistimien ajaminen

Projektikansion juuressa:

```sh
python -m pip install -r requirements-content.txt
python tools/validate_content.py
python tools/test_pack.py
python tools/render_preview.py
```

Viimeinen komento päivittää luettavan korttiesikatselun JSON-datasta. Tarkistimet eivät käynnistä sovellusta tai testaa pelimoottoria. Uusi korttierä voidaan tarkistaa väliaikaisesti yhdistettynä ilman tiedostojen muuttamista:

```sh
python tools/validate_content.py --extra content/batches/cards.draft.json --editorial-extra content/batches/editorial.draft.json
```

Luonnostiedostot syntyvät myöhemmässä korttitehtävässä. Molemmissa pitää olla `cards`-taulukko; toimituksellisen taulukon tunnisteiden pitää vastata uusia kortteja.
