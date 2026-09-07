# Alkuperäinen SVG-sarja ja visuaalinen tarkistus

19 kuvaa on kirjoitettu tätä peliä varten geometrisina SVG-kuvina. Lähde on `tools/build_art.mjs`, tulos `public/art/*.svg`. Kuvissa ei ole ulkoisia kuvia, fontteja, komentosarjoja tai kopioituja pelihahmoja. UI käyttää paikallisia Georgia-/Arial-järjestelmäfontteja; tekstisisältö ei ole rasteroitu kuviin.

Sarjan muoto on 320 × 320. Paletti: tumma vihreä `#223d37`, keskitumma vihreä `#557564`, salvia `#9cab8c`, paperi `#eadfc4`, ruoste `#b86743`, lämmin beige `#ceac84`, tumma `#29372e` ja vaalea paperi. Korttien leveässä kuva-alueessa käytetään contain-sovitusta, jotta kasvot ja kohteet eivät leikkaudu.

Ensimmäisenä tarkastettiin viranomainen, kaavoittaja, konsultti, maanomistaja, poro ja sähköasema. Sen jälkeen sarja laajennettiin kaikkiin pilotin 19 artKey-arvoon. Tarkastuksessa avattiin kontaktikartta, korttinäkymiä, 360/390 px pelinäkymät ja RtB-raportti. Alun kasvorajausta korjattiin contain-sovituksella. Pieniä mobiilimittaritekstejä suurennettiin.

Tallennetut kuvakaappaukset ovat `reports/qa/`-kansiossa. Ne ovat Chromiumin oikeista renderöinneistä. Kokonaisen sivun kuvassa näkyvä alaspäin vieritettävä sisältö ei tarkoita sen mahtumista yhteen puhelimen ruutuun. Fyysisen puhelimen kosketus, näytön luettavuus ja PWA-asennus odottavat käyttäjäkoetta.
