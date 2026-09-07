# Korttituotanto — ensin hauska pieni peli

Tavoite on myöhemmin noin **420 erillistä korttia**, ei 420 samantapaista raporttipyyntöä. Nykyisessä paketissa on 64 sisältöpilotin korttia. Tekstejä ja kuvituksia ei tuoteta yhtenä massatyönä.

## Työnjako ja portit

ChatGPT:ssä määriteltiin sävy, esimerkit ja alustava toimialamalli. Codex voi jatkaa sekä korttien kirjoittamista että kuvitusta: Sol / Medium tuottaa 16–24 kortin käsikirjoituserän ja arvioi huumoria; Spark tuo hyväksytyn datan ja tekee rajattua SVG-sarjatyötä. Astra käytetään harvoihin vaikeisiin moottoripäätöksiin. Näin teksti ei ole teknisesti sidottu ChatGPT:n puolelle.

Ennen täyttä pakkaa testataan 12 päätöksen demo sekä vähintään yksi 20–30 kortin edustava kokonaisuus. Jos tilanteet tuntuvat siltä, että aina kannattaa ostaa kaikki selvitykset, korjataan valintaparit ennen massatuotantoa. Jos huumori ei osu, muutetaan kuutta edustavaa korttia — ei vielä 420:tä.

## Tavoitejakaumat koko pakalle

Vaihepääpainot: maanvuokraus 45, esiselvitys/kunta 45, menettelyjen käynnistys 55, maasto/suunnittelu 100, selostus/luonnos 60, päätelmät/täydennykset 50, kaavaehdotus 45 ja hyväksyminen/loput 20. Yhteensä 420. Kortti voi sopia useaan vaiheeseen; pääpaino kirjataan tuotantotilaukseen, ettei sitä lasketa kahdesti.

Hankemuotojen pääpainot: yhteinen 180, tuuli 110, aurinko 80, hybridi 50. Yhteensä 420. Sävyn pääluokat ovat alustavasti 120 haastekorttia, 140 ristiriitaista valintaa, 80 myönteistä ja 80 työntekokorttia. Tämä ei ole nykyisen pilotin jakauma eikä jäykkä kiintiö jokaiselle erälle.

Huumori ja outcome-sävy ovat eri asioita. Positiivinen kortti voi olla erittäin hauska: asiantuntija poistaa tarpeettoman vaatimuksen, konsultti hyvittää laskua tai mikään ei yllättäen mene vikaan.

## Yhden erän toimitus

Erällä on yksi pääteema tai täsmällinen kampanja-aukko. Sisältö kirjoitetaan olemassa olevaan skeemaan, ei jokaiselle tarinalle uutta moottorikieltä. Mukana ovat näkyvät tilanteet, kaksi toimenpidettä, seuraukset, tarjoamisehdot, aika, todelliset jatkohaarojen ID:t ja editorial-metatieto. Kaikki sourceIds-listat ovat tyhjiä.

Uusi efekti tai tilakoneellinen sääntö käsitellään ensin erillisenä ominaisuutena ja migraationa. Sisällöntuonti ei saa keksiä hiljaista no-opia. Olemassa olevan roolin tai kuvan käyttäminen on oletus. Kuuden hahmon kuvitus voi palvella kymmeniä eri kortteja.

Koneellinen tarkistus: JSON-skeema, yksilölliset ID:t, roolit/kuvat, liput/polut, jonokohteet, komponenttiehdot, tekstipituudet, ei lähdelinkkejä, editorial-kattavuus. Koneellinen läpäisy ei todista pelillistä reiluutta tai hauskuutta.

Toimituksellinen tarkistus: 20 korttia ei saa olla 20 muotoa samasta vitsistä; kumpikin valinta ymmärretään; vitsi vastaa tapahtumaa; toimialamerkitys ei muutu huomaamatta; sama valinta ei aina dominoi; on myönteisiä yllätyksiä ja asiallista pyyntöjen rajaamista. Kirjoita epäonnistuva kortti uudelleen, älä kaikkia.

## Puuttuvat kampanjapalikat ovat tärkeämpiä kuin korttimäärä

64 kortin pilotti ei sulje kaikkia menettely- ja tutkimusketjuja. Seuraavien erien etusijalla ovat nykyisten lippujen päättäminen, selkeä tiedonpaljastuminen, kaavaporttien todelliset tapahtumat, mallinvaihtokortit ja rahoituksen/verkkoasian myönteiset sekä kielteiset tulokset. Muuten lisäkorteilla vain kasvatetaan umpikujaan johtavaa sisältöä.

V2:n H001→H002 tai H003 on pienehkö sulkeutuva byrokratiaketju, jolla demo voi testata haarautumista. P001–P048 säilyttävät vanhat efektit: ne tarvitsevat edelleen koko moottorin ja menettelymallin testiä, eikä hauska teksti poista tätä työtä.
