# Moottoriperustan tilasopimus 01

Versiot: tallennus `1`, säännöt `foundation-1`, sisältö `pilot-fi-002` + sisällön tarkistussumma. Tämä täydentää TOTEUTUSSOPIMUS.md:tä muuttamatta korttipakkaa. Julkinen rajapinta on `src/engine/index.ts`, tyypit `types.ts` ja tallennusrakenne `state-schema.ts`.

## Rajapinta ja tilan omistus

- `createRun({seed, mode, previousNameId?, namePool?, demoFixture?})` luo uuden tilan. Siemen on kutsujan syöte. `demoFixture: true` käyttää manifestin hybridiarvoja ja merkitsee alkuperän näkyvästi.
- `getDerivedStats(state)` erottaa kpl, suunnitelma-MWac:n, yhteensopivan MWac:n, korkeuden, tuottoindeksin, ha:n, MWp:n, aurinko-MWac:n, AC-summan ja johtopituudet. Vientiraja on alussa `null` (tuntematon). Vuosituotannon absoluuttista MWh-arviota ei vielä ole.
- `getEligibleCards(state)` palauttaa kelvolliset ambient-kortit. `offerCard(state, cardId)` tarjoaa yhden niistä; kampanjan korttiarvontaa tai vaiheporttimallia ei ole.
- `previewChoice(state, offeredCard.token, side)` palauttaa ennusteen. Se ei tarjoa vahvistettavaa uutta pelitilaa eikä paljasta työn piilevää tulossnapshotia. `applyChoice` tekee samalla logiikalla uuden tilan tai heittää `ValidationError`-virheen. Syötettä ei muuteta.
- `advanceTime(state, additionalMonths = 0)` jatkaa tallennetun odotuksen ja mahdolliset lisäkuukaudet. Tarjottu kortti on ratkaistava ensin.
- `serializeRun(state)` validoi ja sarjallistaa koko tilan. `restoreRun(raw)` palauttaa `{ok:true,state}` tai `{ok:false,error,recoverableRaw}`. Virheellinen alkuperäisteksti säilyy täsmälleen ennallaan. Ei hiljaista uuden kierroksen luontia, migraatiota tai nimiarvontaa.

Kaikki palautetut tilat jäädytetään syvästi. Kutsuja omistaa yhden nykyisen tilan. UI:n tulee käsitellä napautukset ja pyyhkäisyt saman synkronisen reducerin kautta, kutsua `applyChoice` aina uusimmalla tilalla ja tallentaa koko tulos yhdellä kirjoituksella. Vanhan tokenin uusinta nykyiseen tilaan hylätään. Sama vanha snapshot samoilla syötteillä tuottaa puhtaassa funktiossa saman tuloksen; moottori ei ole palvelinlukko. Tallennusadapteri ja usean välilehden koordinointi kuuluvat myöhempään UI-työhön.

## Mekaniikka ja kello

Mekaniikka käyttää omaa siemenellistä RNG:tä. Nimen valinta käyttää erillistä `names:`-nimiavaruutta, pooliversiota ja edellistä nimi-ID:tä. Nimi, ID, pooliversio ja molemmat RNG-tilat tallennetaan. Nimen muutokset eivät vaikuta mekaaniseen RNG:hen, runId:hen tai korttituloksiin. Pilotin päätöksissä ei ole uutta satunnaisarvontaa.

Poistot kohdistuvat luontihetkellä sidottuihin `exclusionGroups`-kohteisiin. Ryhmän tavoitemäärä lasketaan myös jo poistetuista kohteista; puuttuvaa määrää ei oteta muualta. Solar-lohko voidaan jakaa deterministisesti murtohehtaarin rajalla, jolloin kaikki ryhmäviitteet päivitetään. Päällekkäisyys kirjataan aikajanaan. Nämä ovat fiktiivisiä pilottiryhmiä, eivät tuotannon paikkageometriaa. Yhteinen ulkoinen johto on yksi segmentti; reittimuutos säilyttää historian ja asettaa selvitystarpeen.

Työt ja jonokortit rekisteröidään ennen valinnan ajan kulumista. Työn tulossnapshot kopioidaan alkuperäisestä `site`-tiedosta tilatessa (`JOB_REVEALS`-sääntötaulukko), ja se julkaistaan `revealedSite`-kenttään valmistuessa. Työ ei arvo löydöstä. Vain todellinen `wind_measurement`-valmistuminen jonottaa P025:n tai P026:n esiarvotun tuuliluokan perusteella. Muita puuttuvia viranomais- tai tulostapahtumia ei päätellä ehdoista tai tekstistä.

Kello käy eräpäivät kronologisesti. Samassa kuussa kaikki työt valmistuvat ensin rekisteröintijärjestyksessä, sitten kelvollinen jonokortti tarjotaan järjestyksessä `(dueAt, sequence)`. Tasatilanteen sääntö on tämän perustan täsmennys. Saman kortin rinnakkaisista jonotuksista ensimmäinen säilyy. Epäkelpo tapahtuma odottaa jonossa ja ehdot tarkastetaan uudelleen; se ei ohita vaihetta. Kelvollinen päätös keskeyttää aikahypyn, ja käyttämättömät kuukaudet säilyvät `remainingWaitMonths`-kentässä. Keskeytyksen ratkaisun oma aika lisätään kelloon; vanha odotus jatkuu erillisellä `advanceTime`-kutsulla.

Mittarit rajataan ja lopetusehdot tarkistetaan transaktion lopussa, myös aikahypyn keskeytyessä. 97. kuukausi pysäyttää yhtiön aikarajan ylittävän odotuksen. Korkeusristiriita näkyy suunnitelma- ja yhteensopivan tehon erona eikä vaihda mallia tai aiheuta yksin kokorajakuolemaa. Mallinvaihtokäskyä ei lisätä skeeman ulkopuolelta. Hybridin alittaessa kokorajan mahdollinen yksi suunnanvaihto jonottaa P048:n, jonka vaihe-ehdot säilyvät voimassa. Talousindeksi muuttuu vain kortin käskystä.

## Tehtävän 02 fixture-rajapinta

`setDemoPhase(state, phase)` sallii vain merkityn demon vaiheet 01–04. `offerDemoMilestone(state)` lisää vain manifestin P005-aloituspäätöksen nimetyn tapahtuman `demo:municipality-initiation`; se ei kirjoita hyväksymisportteja. Näytä tämä käyttöliittymässä käsikirjoitettuna testitilana. Varsinaisessa skenaariossa molemmat fixture-kutsut hylätään.

Kaikki suojatut porttiliput ovat tässä sääntöversiossa false, myös ladattaessa. `finish: planAdopted` antaa näkyvän virheen, koska menettelymallia ei vielä ole. Prologin loppu on UI:n ilmoitus ”Ensimmäinen selvityskierros valmis”, ei `ending`-kentän kaavavoitto. `finish: developerWithdraws` ja konfiguroidut yhtiön lopetusehdot toimivat. Kampanja, porttien kirjoittaminen, mallinvaihto, luonteva kaikkien 64 kortin saavutettavuus ja maailmankellon vaali-/vuokramääräajat ovat myöhempää työtä.
