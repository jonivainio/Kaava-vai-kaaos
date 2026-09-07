# Codexin malli- ja reasoning-työnjako
**Tarkistettu 7.9.2026.** Tehtäväkohtainen taulukko on tämän projektin suositus, ei OpenAI:n peliä koskeva vertailutesti eikä lupaus tietystä kulutuksesta.

## Varmennettu perusta

OpenAI:n malliohjeessa Astra on vaikeimpaan monivaiheiseen työhön, Sol syvyyttä ja viimeistelyä vaativaan työhön, Terra yleiskäyttöön ja Luna selvästi rajattuun toistotyöhön. Päättelyn syvyyttä kannattaa lisätä vain tarpeen mukaan. [M1]

Codexin/Workin kulutus riippuu työn määrästä ja käytetystä mallista; kontekstia ja tarpeetonta työtä kannattaa rajata. Nopeusasetukset kuluttavat enemmän kiintiötä. Tämän tarkistuksen hinnastossa Astran Fast-kerroin on 2,5 suhteessa Standardiin. **Pidä Standard tässä projektissa.** Hintasuhde ei kerro suoraan valmiin tehtävän kokonaiskulutusta. [M2]

Spark on tekstipohjainen tutkimusesiversio, jolle OpenAI kuvaa erilliset käyttörajat. Se soveltuu rajattuihin nopeisiin koodimuutoksiin. Testejä täytyy pyytää nimenomaisesti; tekstipohjaista mallia ei käytetä kuvarenderöinnin ainoana arvioijana. Saatavuus ja rajat voivat muuttua. [M3]

Malli ja päättely valitaan käyttöliittymästä; CLI:ssä niitä voidaan valita `/model`-komennolla tai asetuksista. Promptin ”malli”-otsikko **ei ole tekninen mallinvaihto**. Käyttäjän asetuksia ei muuteta globaalisti projektin aloituksen sivutyönä. [M1, M4]

## Täsmällinen tehtäväjako — oma suositus

| Tunnus | Työ | Valitse | Peruste ja rajaus |
|---|---|---|---|
| 00 | Jo aloitetun projektin v2-päivitys | Sol / Medium | Sisältö ja ohjeet sovitetaan, ei koko sovellusta uusiksi |
| 01 | Moottori, tilasopimus, tallennuksen perusta | Astra / High | Väärä perusta moninkertaistaisi korjaustyön; yksi rajattu ydintehtävä |
| 02 | Mobiili-UI, swaippaus ja 12 päätöksen demo | Sol / Medium | Selvä toteutussopimus ja oikea selainarviointi |
| 03 | Ensimmäiset 6 SVG-kuvaa ja tyyli | Sol / Medium | Kuvallinen harkinta ja yhteinen kuvituskieli |
| 04 | Hyväksytyn SVG-tyylin 6–8 kuvan erä | Spark / oletus; Medium vain jos valittavissa | Pieni koodiin rajattu erä, ei taidesuunnan keksimistä |
| 04B | SVG-erän visuaalinen tarkistus | Sol / Medium | Renderöity lopputulos tarkistetaan, ei vain koodi |
| 05 | 16–24 uutta korttia valmiiseen skeemaan | Sol / Medium | Suomen kieli, huumori ja järkevät valintaparit |
| 06 | Hyväksytyn JSON-erän tuonti ja viitetarkistus | Spark / oletus; Medium vain jos valittavissa | Ei uutta sisältöä tai moottorisääntöä |
| 07 | Ensimmäinen kokonainen hybridikampanja | Astra / High | Vaiheportit, riippuvuudet ja myöhäiset seuraukset |
| 08 | Korttiohjaajan rytmi ja vitsiperheet | Sol / High | Ehdot, prioriteetit ja reiluuden ristiriidat |
| 09 | Tasapainotyökalu ja simulaatiovirheet | Sol / High | Syyt ja toistettavat siemenet; ei koko sisällön uudelleenkirjoitusta |
| 10 | PWA, offline ja julkaisuvalmistelu | Terra / Medium | Rajattu infrastruktuurityö testein; ei julkaisulupaa |
| 11 | Pienet korjaukset, tekstit ja CSS | Spark / oletus; Medium vain jos valittavissa | Yksi todettu ongelma kerrallaan |

**Varavaihtoehdot:** jos Spark puuttuu, selkeä datan muunnos tai tarkistus voidaan tehdä Lunalla / Low–Light ja käyttöliittymäkorjaus Terralla / Medium. Jos Terra/Luna eivät näy, käytä Sol / Medium pienessä tehtävässä. Astran puuttuessa moottorityö voidaan tehdä Sol / High -tasolla. Älä käytä tuntematonta mallitunnistetta tai keksi valitsimeen puuttuvaa reasoning-tasoa.

Light ja Low voivat olla saman kevyen tason eri käyttöliittymänimiä. Käytä vain mallin ja asiakkaan oikeasti tarjoamaa asetusta. Sparkille ei tässä dokumentissa väitetä varmennetusti samoja reasoning-valintoja kuin Solille tai Astralle.

## Milloin nostetaan tasoa?

Astra / High otetaan avuksi rajattuun moottorin tai kampanjan ongelmaan, kun syy ulottuu useaan tilakoneeseen, tallennukseen tai jonotukseen. Ensin pitää olla toistettava virhe, nykyinen testitulos ja täsmällinen kysymys. Yksi epäonnistunut yritys ei tarkoita koko repon siirtämistä Astralle.

Extra High ei ole oletus edes perustyössä. Käytä sitä vasta erityisen vaikeaan, rajattuun ongelmaan, jossa High ei ratkaissut toistettavaa ristiriitaa. Max/Ultra ja automaattiset rinnakkaisagentit eivät kuulu tämän projektin oletustyönkulkuun. Kortin vitsi, värivariaatio tai JSON-tuonti eivät vaadi korkeinta päättelyä.

## Kiintiötä säästävä työskentely

Anna yksi valmis tavoite, tärkeät tiedostopolut, hyväksymistestit ja selkeä ulkoraja. Lyhyempi prompti ei auta, jos tavoite on edelleen ”tee koko peli”. Älä käske lukea kaikkia 420 korttia CSS-muutoksen vuoksi. Pidä AGENTS.md lyhyenä ja viittaa syvempiin ohjeisiin tehtäväkohtaisesti. [M2, M5]

Uuden rajatun työn alussa lue pieni `NEXT_STEPS.md`, sopimus ja oikea koodimoduuli. Älä katkaise muuten hyödyllistä keskustelua joka pikkumuutoksen jälkeen: tarpeellinen konteksti saa säilyä, mutta kokonaan uuden aihealueen pitkä ketju voidaan aloittaa tilayhteenvedosta. Älä teetä jatkuvaa uutishakua tai samojen ohjeiden uudelleenanalyysiä.

Kirjoita aineisto tiedostoihin, älä tulosta 64 tai 420 korttia keskusteluun. Validoi skriptillä, ei käsin lukemalla jokaiseen pieneen muutokseen koko pakka. Säilytä hyväksytyt ID:t, effect-käskyt ja kuvat. Testit tehdään jokaisessa järkevässä välituloksessa, eivät vasta lopussa. Raportoi täsmällisesti, mitä ajettiin.

Jos käyttöliittymä näyttää kulutuksen, vertaile saman kokoisten oikeiden tehtävien eroa. Älä väitä tuntevasi käyttäjän jäljellä olevaa kiintiötä ilman havaintoa. Ei lupauksia ”tämä kuluttaa 5 %” tai ”säästää 80 %”.

## Viralliset lähteet

[M1] OpenAI, Models — https://learn.chatgpt.com/docs/models

[M2] OpenAI, Pricing — https://learn.chatgpt.com/docs/pricing

[M3] OpenAI, Introducing GPT-5.3-Codex-Spark — https://openai.com/index/introducing-gpt-5-3-codex-spark/

[M4] OpenAI, Config basics — https://learn.chatgpt.com/docs/config-file/config-basic

[M5] OpenAI, Custom instructions with AGENTS.md — https://learn.chatgpt.com/docs/agent-configuration/agents-md

[M6] OpenAI, Prompting — https://learn.chatgpt.com/docs/prompting

Kaikki luettu/tarkistettu 7.9.2026. Linkit ovat kehitysohjeiden lähteitä, eivät pelin sisältöä tai todellisten hankkeiden linkityksiä.
