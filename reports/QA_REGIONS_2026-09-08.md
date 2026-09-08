# Alue- ja ajastusversion QA — 8.9.2026

Versio swipe-fi-007. Moottorin alueprofiili, kuulemisen jälkeiset tulokset ja klikattavat vaihesiirtymät on toteutettu. Vanha pilotti ja kampanjamoottori säilyvät.

Ajettu onnistuneesti:

- Vitest: **82/82** (40 perusta, 13 vanha kampanja, 16 vetopeli, 8 hybridi, 5 alue/ajastus).
- Tyypitys ja tuotantobuild: onnistuneet. Viten riippuvuuskommentteja koskevat varoitukset eivät estäneet buildia.
- Python: **17/17** sisältösopimustestiä; validate_content, validate_campaign ja validate_swipe läpäisty. Ensimmäinen unittest-discovery osoitti väärään tests-hakemistoon ja löysi 0 testiä; se ei ole testitulos. Varsinainen tools/test_pack.py ajettiin tämän jälkeen onnistuneesti.
- Chromium: **9/9**. Täysi 18 päätöksen peli, kolme vaihesiirtymää, YVA-vaihesiirtymän reload ja jatkaminen, hiiri- ja kosketustapahtumat, peruutus, tallennus, HUD, 320 px leveys sekä työpöytänäkymä.
- Tuotantopaketin offline/päivitys: **2/2**. Repoalihakemisto, offline-jatkaminen ja päivityksen odotus valikkoon. Testi palautti tilapäisesti muuttamansa dist/sw.js:n finally-haarassa.
- Avattu ja tarkasteltu test-results/swipe-story.png ja swipe-yva-transition.png: 390 × 844 -näkymässä otsikko, kuva ja Siirry vaiheeseen -painike mahtuvat. Kyse on Chromium-kuvista, ei fyysisestä puhelimesta.
- git diff --check läpäisty.

Aluetesti käy läpi 1 200 siementä: kaikki neljä aluetta, alueelle kelvolliset valinnat, poronhoidon rajaus, metsäpeuran/liito-oravan puuttuminen Lapin profiilista sekä itäisen puolustusvoimariskin painotus. Ajastustesti tallentaa ja palauttaa jokaisen välitilan: valmis työ voi odottaa julkaisuhetkeä, tulos ei näy preview'ssa ja saman tarinan vahvistaminen kahdesti hylätään. Erillinen aurinkohaarojen testi huomioi aiempien rajausten päällekkäiset hehtaarit.

## Tasapaino

Ensimmäinen erillinen hybridikoe: 3 000 siementä × kolme strategiaa = 9 000 peliä. Satunnaisvalinnoilla ulkoinen este 1 045 (34,83 %), valintatappio 942 (31,40 %), RtB 1 013 (33,77 %). Varovainen strategia: 1 955 RtB, 1 045 ulkoista estettä, ei valintatappiota. Riskiä ottava: 328 RtB. Ei jumeja. Raportti swipe-balance-swipe-fi-007-3000-hybrid.json. Tämä koe tehtiin ennen viimeistä aurinkovariantin aluepainon korjausta; vaikutuskäskyt säilyivät samoina.

Viimeisen buildin regressiokoe kaikilla moottorin hankemuodoilla: 3 000 siementä × kolme strategiaa = 9 000 peliä. Satunnaisvalinnoilla ulkoinen este 1 045 (34,83 %), valintatappio 945 (31,50 %), RtB 1 010 (33,67 %). Tavoitetoleranssi läpäisty, ei jumeja. Raportti swipe-balance-swipe-fi-007-3000.json. Varovaisen strategian viisi koon menetykseen päättyvää peliä ovat suljettujen hankemuotojen jatkokehityksen asia; UI:ssa vain Hybridi on valittavissa.

Testaamatta: fyysinen puhelin, iOS/Safari, Firefox, ruudunlukija ja monen välilehden samanaikainen tallennus. Aluepainot eivät ole todellisten hankkeiden tilastoja. Todellisen hankkeen menettelyä ei mallinneta jokaiselta lupavaiheelta.

## Julkaisu

Käyttäjä pyysi nimenomaisesti julkaisua kaikille. Sivusto on sama .openai/hosting.json:n Sites-projekti. Julkaisun vastaus ja kirjautumattoman selaimen tarkistus lisätään alle niiden valmistuttua.
