# Työn tila — tehtävä 01 valmis, 7.9.2026

**Valmis:** puhdas TypeScript-moottori (`src/engine/index.ts`), siemenellinen alkuskenaario, erillinen pysyvä nimiarvonta, skeeman efektit, tunnisteelliset poissulut, yhteinen johto, malliyhteensopivuus, rinnakkaiset työt, keskeytyvä tapahtumakello, preview/transaktio, palautettava tallennus ja 40 Vitest-testiä. React/Vite-aloitussivu ja erillinen moottorin ES-build. Alkuperäinen kortti- ja nimisisältö säilytetty.

**Sopimus:** `docs/TILASOPIMUS_01.md`; julkiset tyypit `src/engine/types.ts` ja `state-schema.ts`. Tallennus 1 / foundation-1 / pilot-fi-002 + sisältötarkistussumma. Saman kuun työt ensin, sitten jonokortit `(dueAt, sequence)`. `advanceTime(s)` jatkaa keskeytynyttä odotusta. Suojatut portit ovat false; kaavavoitto ei ole käytettävissä.

**Ajettu:** Python `tools/validate_content.py` hyväksytty (64 korttia / 128 valintaa / 80 nimeä), `tools/test_pack.py` 17/17, `pnpm test` 40/40, `pnpm run typecheck`, `pnpm run build` (aloitussivu ja moottorikirjasto). Molemmat manifestin 12 päätöksen H001-haarat testattu nimetyillä vaihefixtureilla. Buildin Zod-kommenttiannotaatioista tulee kaksi harmitonta Rollup-varoitusta. Python ajettiin paikallisen `.python-deps`-asennuksen kanssa käyttäjän oikeuksilla; sandbox ei lukenut sen Windows-oikeuksia. Ei havaittua toistettavaa moottoritestivirhettä.

**Ei tehty/testattu:** selain- tai puhelinpelaaminen, pyyhkäisy, visuaalinen QA, hauskuus, kampanjaohjaaja, kaikki 64 korttia kattava saavutettavuus, menettelymalli, mallinvaihtokortit, kuvitus, PWA tai julkaisu.

**Seuraava tehtävä 02:** rakenna mobiilidemo ja sisältökatselin nykyiseen React/Vite-projektiin. Käytä `demoFixture:true`-hybridiä ja manifestin `demoFlow`-rakennetta. Vaihe-fixturet: `setDemoPhase`; P005:n nimetty aloituspäätös: `offerDemoMilestone`. Näytä fixture-luonne. H001:n jälkeen pelaa vain oikeasti jonotettu H002 tai H003 ja odota eräpäivää tarvittaessa. Päätä prologi tekstiin ”Ensimmäinen selvityskierros valmis” ja näytä kesken olevat työt. Älä kytke P046-voittoa.

UI omistaa yhden nykytilan: molemmat syötetavat saman reducerin kautta, `applyChoice` uusimpaan tilaan tokenilla, koko uusi tila yhteen tallennuskirjoitukseen. Jatka käyttää vain `restoreRun`-tulosta; ei uutta arvontaa. Säilytä virheellinen `recoverableRaw` vietäväksi. Aloita lukemalla AGENTS.md, tämä tiedosto, tilasopimus ja tehtävän 02 olennaiset ohjeet. Käyttö- ja testikomennot README.md:ssä.
