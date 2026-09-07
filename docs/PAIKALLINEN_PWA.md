# Paikallinen PWA ja julkaisun raja

`pnpm run build` tuottaa staattisen pelin, manifestin, kuvakkeet ja service workerin. Riippuvuudet, kuvat ja fontit eivät tarvitse ulkoista palvelua pelin aikana. Ensimmäinen onnistunut lataus HTTP-palvelimelta tarvitaan välimuistin asentamiseen; `index.html`:n avaaminen tiedostona ei asenna service workeria.

Paikallinen tuotantotarkastelu:

```sh
pnpm exec vite preview --host 127.0.0.1
```

PWA:n asennettavuus riippuu selaimesta. Offline-jatkaminen sekä päivitys on testattu Chromiumissa localhostilla ja `/Kaava-vai-kaaos/`-alihakemistossa. Oikean puhelimen asennusta ei ole testattu. Manifestin scope, start_url ja resurssit ovat suhteellisia, joten build ei oleta sivuston juuripolkua.

Välimuistin nimi perustuu tiedostojen sisältötiivisteeseen. Uusi service worker odottaa aloitusvalikon päivityspainiketta, eikä keskeytä kortin valintaa. Aktivointi poistaa aiemmat tämän pelin välimuistit ja lataa sivun uudelleen. localStorage säilyy; yhteensopimaton tallennus tarjotaan vientiin. Selaimen sivustotietojen tyhjentäminen poistaa sekä tallennuksen että välimuistin, joten pelikerran voi varmistaa JSON-viennillä.

Internetjulkaisua, GitHub Pages -asetuksia tai julkaisutyönkulkua ei ole tehty. Mahdollinen myöhempi julkaisu tarvitsee käyttäjän toimeksiannon. Lähdekoodin GitHub-tallennus on erillinen asia.
