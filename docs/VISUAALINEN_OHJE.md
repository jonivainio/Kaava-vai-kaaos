# Korttikuvitus Codexissa

## Päätös

Codex tuottaa kuvitukset **SVG-koodina**. Tämä on tämän projektin valittu toteutustapa, ei lupaus siitä, että ensimmäinen generointi olisi automaattisesti hyvännäköinen. Rasterikuvageneraattoria, kuvakohtaisia API-kutsuja tai 420 erillistä kuvatiedostoa ei tarvita.

Yksi kortti koostuu uudelleenkäytettävästä kehyksestä, kuvituksesta, HTML-tekstistä ja kahdesta valinnasta. Sama kaavoittaja esiintyy monessa tilanteessa. Uusi tekstikortti ei lähtökohtaisesti luo uutta kuvaa.

## Oma visuaalinen identiteetti

Tavoite on Reigns-henkisen pelkistetty mutta oma: suuret geometriset väripinnat, kulmikas siluetti, harkitut kasvonpiirteet, rajattu väripaletti ja käsin sommitellun kortin tuntuma. Ei Reignsin hahmojen, korttikehysten, kuvien, logon tai tarkkojen sommittelujen kopiointia. Ei geneeristä ikoniruudukkoa, emojikuvitusta, neongradientteja tai monimutkaista fotorealistista maailmaa.

Kasvoihin riittävät tunnistettava hiusmuoto, kulmakarvat, silmät, nenä ja yksi ammattiesine. Hahmo voi näyttää vilpittömän virkakeskeiseltä, varovaisen toiveikkaalta tai kaiken jo nähneeltä ilman suurta piirrettyä irvistystä. Vitsin pääasiallinen sisältö tulee tekstistä ja tilanteesta.

Sama kuvasuhde ja `viewBox="0 0 320 320"` kaikille. Yhtenäinen 6–8 värin paletti; metsänvihreä, paperinvaalea, tumma teksti ja lämmin korostus ovat lähtösuunta. Konkreettiset design tokenit lukitaan ensimmäisessä tyylierässä. Ei tekstiä SVG:hen, ulkoisia fontteja, verkosta ladattuja kuvia, `<script>`-elementtejä, `foreignObject`-HTML:ää tai raskaita SVG-suodattimia. Ei fonttitiedostojen levitystä.

## Tuotantovaiheet

**Ensimmäinen tyylierä — Sol / Medium:** kuusi harkittua kuvitusta: authority, planner, consultant, landowner, reindeer, substation. Testaa ne oikeassa korttinäkymässä ja yhdessä kontaktikartassa. Yksi rajattu korjauskierros havaittujen ongelmien perusteella; jos suunta ei toimi, ratkaise se ennen sarjatuotantoa.

**Sarjatuotanto — Spark / oletus, tai Medium jos valitsin sallii:** 6–8 uutta SVG:tä kerrallaan, jo hyväksytyn rakenteen pohjalta. Ensimmäiseksi täydennä manifestin 19 `artKey`-avainta. Täydessä pelissä noin 20 hahmoa ja 16 ympäristö-/esinekuvaa on riittävä suunnittelutavoite. Uusia avaimia lisätään vain tunnistettavan tarpeen perusteella, ei jokaiselle kortille.

**Visuaalinen tarkastus — Sol / Medium:** renderöi, avaa ja arvioi kontaktikartta sekä muutama oikea korttinäkymä. Spark on dokumentoitu tekstipohjaiseksi malliksi, joten sen hyvä SVG-koodi ei ole todiste lopputuloksen onnistuneesta visuaalisesta tarkistuksesta. Jos ympäristö ei voi avata renderöityjä kuvia, merkitse katselmointi tekemättömäksi; älä väitä kuvia nähdyiksi.

## Hyväksymisehdot

Hahmot ovat erotettavia pienessä puhelinkoossa, eivät pelkästään eri paitavärejä. Samassa maailmassa pysyvät mittasuhteet, valon suunta, viivankäyttö ja paletti. Reunat eivät leikkaannu, HTML-teksti ei mene kuvan päälle, ja pitkän kortin molemmat valinnat ovat luettavia. Yhteinen neutraali varakuva saa olla kehitystilassa, mutta julkaisu ei piilota puuttuvia kuva-avaimia hiljaisesti.

Kuvituksen jatkaminen ei muuta pelimoottoria. Liike toteutetaan CSS:llä kortin kallistuksena, sivuun pyyhkäisynä ja hillittynä numeropalautteena. Huomioi reduced motion. Äänet, musiikki, kuvan sisäinen animaatio ja 3D eivät kuulu tähän työvaiheeseen.
