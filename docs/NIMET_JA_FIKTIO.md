# Fiktiiviset hankkeet ja nimiarvonta

`content/project_names.fi.json` sisältää 80 tätä peliä varten keksittyä nimeä: 40 -suo- ja 40 -neva-päätteistä. Nimissä on suomalaisen maaston tuntua ja kevyesti outoja yhdistelmiä. Niitä ei ole poimittu oikeiden hankkeiden rekisteristä. Tahatonta samannimisyyttä jonkin todellisen paikannimen kanssa ei voida luvata poissuljetuksi; nimillä ei kuitenkaan ole oikeaa sijaintia, omistajaa tai esikuvaksi nimettyä hanketta.

## Arvonnan sopimus

Uusi pelikerta arpoo yhden nimen poolista, eikä nimeä muuteta kierroksen aikana. Tallennukseen kirjataan `projectIdentity.nameId`, `displayName` ja `namePoolVersion`. Pelin jatkaminen, päätöksen vahvistaminen tai selaimen päivitys ei arvo nimeä uudelleen. Nimi näkyy alkuvalinnassa, pelin yläpalkissa ja loppuyhteenvedossa.

Nimen arvonta on **pelimekaniikan RNG:stä erillinen nimiavaruus**. Nimipankin laajentaminen, nimen pituus tai nimeen liittyvä valinta ei saa muuttaa tuulisuutta, lajiriskejä, kortteja tai hankelukuja. Uuden pelin juuri-siemen voidaan luoda ympäristön satunnaisuudella, mutta pelimoottorin sisäinen eteneminen on siemenellistä.

Vältä välitöntä saman nimen toistoa uuden kierroksen alussa, jos nimipankissa on vaihtoehtoja: edellinen nimi on kosmeettisen arvonnan erillinen syöte. Samat nimiarvonnan syötteet tuottavat saman nimen. Pelisiemen yksin toistaa mekaanisen skenaarion; täsmälleen sama näyttönimi toistetaan tallennetusta identiteetistä tai samasta nimihistoriasta. Tallenna nämä erikseen, älä sekoita toistettavuuden määritelmää.

Näytä teksti esimerkiksi `Hanke: Hattarahongansuo`. Käytä perusmuotoa, jotta kaikki 80 nimeä eivät tarvitse taivutuskoodia. Ei nimen syöttökenttää ensimmäiseen versioon: näin oikeita hankkeita ei eksy pelidataan käyttäjän kirjoittamana.

## Eristys todellisuudesta

Pelin kunta on ”kunta”, viranomainen ”yhteysviranomainen” tai ”asiantuntija”, verkko-operaattori ”verkkoyhtiö”. Ei oikeita kuntanimiä, logoja, yritysnimiä, henkilönimiä, tunnistettavia puhetapoja tai todellisen hankkeen karttageometriaa. YVA, OAS, maakuntakaava ja RENEWFM saavat olla yleisiä termejä. Oikeita lajien nimiä käytetään.

Älä hae työnantajan tietoja muistista, sähköpostista, Drivestä, GitHubista tai verkosta tämän pelin sisältölähteiksi. Yleinen ammattitieto ja kokonaan keksityt tilanteet riittävät. Toisen hankkeen nimen vaihtaminen ei yksin tee yksityiskohtaisesta tositapauksesta fiktiivistä: myös sijainti, tapahtumaketju ja tunnistettava yhdistelmä on jätettävä pois.

`content/sources.json` on tyhjä yhteensopivuustiedosto. Korttien `sourceIds`-listat pysyvät tyhjinä. Lähdelinkkejä todellisiin hankkeisiin ei saa palauttaa myöhemmissä sisältöerissä. Nimilista- ja URL-tarkistukset ehkäisevät virheitä, mutta eivät todista kaiken epäsuoran tunnistettavuuden puuttumista; ennen julkaisua tehdään myös sisällöllinen katselmointi.

## Testit Codexille

Nimen on pysyttävä tallennus–lataus-kierrossa; nimipankin järjestyksen tai pituuden muutos ei saa muuttaa mekaanista alueskenaariota; kahden peräkkäisen uuden pelin nimi ei saa olla sama useamman nimen poolissa. Tarkista 80 ID:n ja nimen yksilöllisyys, Unicode-merkit, pääte ja pitkän nimen UI-rivitys. Nimen vanha snapshot pysyy luettavana, vaikka pooliversio vaihtuu.

## Nimipankki

| -suo | -neva |
|---|---|
| Hattarahongansuo | Hattarahonganneva |
| Sammalviulunsuo | Sammalviulunneva |
| Utuviiksensuo | Utuviiksenneva |
| Huurrehatunsuo | Huurrehatunneva |
| Käpytaskunsuo | Käpytaskunneva |
| Kuusikuiskeensuo | Kuusikuiskeenneva |
| Varpuhupunsuo | Varpuhupunneva |
| Naavanuotinsuo | Naavanuotinneva |
| Usvatossunsuo | Usvatossunneva |
| Routarusetinsuo | Routarusetinneva |
| Hohkapillinsuo | Hohkapillinneva |
| Tihkukävynsuo | Tihkukävynneva |
| Unipihkansuo | Unipihkanneva |
| Hallahuilunsuo | Hallahuilunneva |
| Pihkapilvensuo | Pihkapilvenneva |
| Sumusukansuo | Sumusukanneva |
| Kaislatupsunsuo | Kaislatupsunneva |
| Havuhattaransuo | Havuhattaranneva |
| Kantohuilunsuo | Kantohuilunneva |
| Huurresolmunsuo | Huurresolmunneva |
| Utuhelmensuo | Utuhelmenneva |
| Käpyrusetinsuo | Käpyrusetinneva |
| Sammaltaskunsuo | Sammaltaskunneva |
| Routahupunsuo | Routahupunneva |
| Naavasolmionsuo | Naavasolmionneva |
| Varpuviitansuo | Varpuviitanneva |
| Havulipukkeensuo | Havulipukkeenneva |
| Sumukellonsuo | Sumukellonneva |
| Hallataskunsuo | Hallataskunneva |
| Usvakintaansuo | Usvakintaanneva |
| Tihkuhatunsuo | Tihkuhatunneva |
| Unikävynsuo | Unikävynneva |
| Kuusiviulunsuo | Kuusiviulunneva |
| Pihkapillinsuo | Pihkapillinneva |
| Kantorusetinsuo | Kantorusetinneva |
| Hohkatupsunsuo | Hohkatupsunneva |
| Routaviitansuo | Routaviitanneva |
| Kaislakuiskeensuo | Kaislakuiskeenneva |
| Naavakintaansuo | Naavakintaanneva |
| Sammalhatunsuo | Sammalhatunneva |
