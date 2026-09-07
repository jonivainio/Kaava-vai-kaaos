# Kampanjan tilasopimus

Versio `rtb-1`, korttipakka `campaign-fi-001`. `Campaign` sisältää perustan `RunState`-tilan, vaiheen ja menettelykohdan, siemenellisen maailmantilan, päätöshistorian, tutkimuksen ajastuksen, viestit, alkulukujen snapshotin ja erilliset menettelytiedot. UI omistaa yhden nykytilan ja vie uuden tilan kokonaisena yhteen localStorage-kirjoitukseen. Moottori ei tee I/O:ta.

- `createCampaign(seed, mode, previousNameId?)`: luo ja tarjoaa ensimmäisen kortin. Mekaniikan, nimien, yleisen tutkimuksen ja maailmantapahtumien nimiavaruudet ovat erilliset.
- `currentCampaignCard(state)`: palauttaa nykyisen kortin; tunnettu Natura-, sopimus- tai korkeusristiriita täsmentää vain näytettävää tekstiä. Teksti ei anna käskyjä moottorille.
- `previewCampaignChoice(state, side)`: laskee seuraukset kopiossa. Ei RNG:n kulutusta tai tallennusta. Kohtalokas seuraus ja yksiköiden muutokset voidaan näyttää ennen vahvistusta.
- `applyCampaignChoice(state, token, side)`: hylkää vanhan tokenin, ratkaisee kortin, soveltaa erikseen määritetyn menettelytapahtuman ja tarjoaa seuraavan kortin. Palautetut tilat on jäädytetty.
- `waitingMonths` ja `waitCampaign`: odottavat seuraavaa vaaditun työn valmistumista tai tutkimuksen julkaisua yhteisellä hankekellolla. Rinnakkaisia töitä ei summata peräkkäisiksi.
- `serializeCampaign` ja `restoreCampaign`: tallentavat myös tarjotun kortin, työn tulossnapshotin, nimen ja tutkimustuloksen. Palautus validoi perustan, kampanjan rakenteen, siemenen maailmantapahtumat, menettelyhistorian ja hyväksymisten todistusaineiston. Virhe palauttaa alkuperäisen tekstin `recoverableRaw`:na. Palautus ei arvo eikä migroi.

## Menettely ja hyväksyminen

`content/campaign_flow.json` määrittää 57 menettelykohtaa sekä valintojen sallitut tapahtumat. Aurinkohanke ohittaa tuulikohtaiset kohdat. Vaihekohtainen välikortti valitaan siemenestä. Menettely etenee sovitussa seitsemän vaiheen järjestyksessä. Kampanjan fyysinen perustatila pysyy teknisesti vaiheessa 01; vain ulompi menettelyvaihe on tämän kampanjan vaihe. Pilotin vaihefixtureita ei käytetä kampanjassa.

Kunnan aloite ja vaikutusaineiston riittävyys tarvitsevat tilatun työn valmistumisen. Kaavahyväksyntä tarkistaa maanhallinnan, kunnan valmistelun, riittävyyden, Natura-tarkastelun, maakuntakaavan yhteensopivuuden, kuulemisen, päätösaineiston ja malliyhteensopivuuden. RtB tarvitsee lisäksi lainvoimaisen kaavan, lupatyön ja lupapäätöksen, verkko-, reitti-, laite-, kaupallisen ja valmiustarkastuksen. Tämä on rajattu fiktiivinen tapahtumamalli, ei kaikkien mahdollisten lupamenettelyjen simulaatio.

Menettely kirjoittaa vain omia `facts`-tietojaan. Pilotin `adoptionGatesSatisfied` ja muut suojatut liput pysyvät false; kortin `finish: planAdopted` ei muutu oikopoluksi. Fyysiset menettelyratkaisut käyttävät sallittuja vaikutuksia. Mallin valinta ja selvitetyn vientirajan vahvistus ovat erillisiä tyypitettyjä menettelytoimintoja, eivät uusia korttiskeeman effect-käskyjä. F8/F10 ovat pelin fiktiivisiä malleja. Korkeuden muutos ja mallin MW-muutos lasketaan erikseen.

## Yleinen tutkimus ja päättyminen

Yleinen poron, metsäpeuran, suden tai kotkan seuranta tarjotaan ohjelmavaiheessa. Osallistuminen maksaa 20 000 € (tässä kortissa −4 budjettipistettä); budjetti muuten on peli-indeksi, ei eurotili. Tuloksen suunta on määritetty jo runin alussa `research:`-siemenestä. Se ei muutu rahoitusvalinnasta eikä korvaa hankkeen omia luonto-, vesi- tai muita selvityksiä. Tulos julkaistaan viiden hankekuukauden kuluttua päätöksestä, myös osallistumatta jättäneelle. Ajan kuluminen käsittelee julkaisun seuraavassa päätösrajassa.

Jokaisessa vaiheessa on siemenellisesti mahdollinen ulkoinen lopetuskortti. Molemmat sen valinnat voivat päättää hankkeen, mikä näkyy esikatselussa. Tarvittavan Natura-päivityksen tai lyhyen option jatkamisen laiminlyönti päättää hankkeen tunnettuun puutteeseen. Lisäksi perustan resurssi-, koko-, verkko- ja aikarajat pätevät. Loppuraportti erottaa kaavahyväksynnän, RtB:n ja päättymissyyn sekä näyttää muutoksen alkuperäisiin lukuihin.

Tallennusvalidointi ei ole huijauksenestopalvelu. Paikallinen pelaaja hallitsee tiedostojaan. Samanaikaisten välilehtien kirjoituslukkoa ja vanhojen kampanjaversioiden migraatiota ei ole toteutettu.
