# Muutokset v1 → v2

**7.9.2026**

## Muutettu

- Sävyn painopiste neutraalista/lempeästä hankepelistä surkuhupaiseksi työelämäsatiiriksi. Suhteettomat vaatimukset, byrokratian paisuminen, yllättävät havainnot ja ristiriitaiset ohjeet ovat olennaista sisältöä.
- P001–P048:n otsikot, tilanteet ja välittömät jälkitekstit on kirjoitettu uudelleen. ID:t, ehdot, efektit, ajat ja viivästetyt työt säilyvät v1:stä.
- Lisätty H001–H016 eli 16 uutta korttia. Mukana yksi haarautuva ketju ja useita myönteisiä helpotuksia. Pakassa yhteensä 64 korttia ja 128 päätösvaihtoehtoa.
- Lisätty 80 keksittyä -suo/-neva-nimeä, nimiskeema ja kosmeettisen arvonnan sopimus. Varsinainen arvonta kuuluu Codex-toteutukseen.
- Ei tosielämän hanketapauksia v2-tutkimusdokumentissa tai runtime-lähteissä. sourceIds on aina tyhjä. Teknisten malliohjeiden viralliset linkit ovat erillisessä kehitysdokumentissa.
- Codex voi nyt tehdä sekä SVG-kuvat että uudet tekstierät. SVG-tyyli tarkistetaan kuudella kuvalla ennen sarjatuotantoa.
- Uudet aihekohtaiset promptit sisältävät käyttäjälle malli- ja reasoning-valinnan, Standard-nopeuden, työn rajauksen ja hyväksymistestit. Ne eivät vaihda mallia automaattisesti.
- Ensimmäinen toimeksianto ei enää yhdistä koko M0–M1:tä. Moottori, UI-demo ja taidesuunta ovat eri tehtäviä.
- Lisätty editorial-metatieto huumoriperheiden rytmittämistä varten. Effect-rajapinta pysyy ennallaan.

## Säilytetty

Tuulivoiman 10 MW ja 300 m lähtöarvot, kolmijako tuuli/aurinko/hybridi, hankeluvut, yleinen kaavahyväksyntään päättyvä rajaus, siemenellinen satunnaisuus, rinnakkaiset tehtävät, lajien ja vaikutusten erottelu, nimellistehon ja tuotannon ero sekä yhteisen johdon kertalaskenta.

## Käyttöönotto

Uudessa projektissa käytetään vain v2:ta. Jo aloitetussa projektissa kopioi v2 vertailua varten omaan alikansioon ja anna päivitysprompti 00. Älä ylikirjoita valmista sovellusta, käyttäjän muita muutoksia tai keskeneräistä tallennusta. Vanha tutkimusarkisto voidaan säilyttää käyttäjän omissa tiedostoissa, mutta peli ei tuo sitä bundleen tai sisältöön. Jo julkaistut vanhat lähteet tai git-historia eivät katoa tämän paketin toimituksella.

## Todentamisen rajat

Rakenteellinen validaattori ja paketin regressiotestit ovat mukana. Ne eivät suorita puuttuvaa TypeScript-pelimoottoria, oikeaa selainpeliä tai koko kampanjaa. Tämä toimitus ei takaa hauskuutta, nollavirheitä, tiettyä kiintiösäästöä tai sitä, ettei jokin keksitty nimi voisi sattumalta olla oikean paikannimen kanssa sama.
