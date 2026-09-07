# Kaava vai kaaos — pysyvät ohjeet, v2

Toteuta vain aktiivinen toimeksianto. Lue `NEXT_STEPS.md` ja tehtävän tarvitsemat dokumentit; älä lue koko aineistoa joka työssä. Mallin valitsee käyttäjä: älä väitä vaihtaneesi sitä promptin perusteella.

- **Sävy:** surkuhupaisa hankekehityssatiiri, ei koulutusvisaa. Kuiva viranomaiskieli, yllättävät löydöt, suhteettomat pyynnöt, ristiriitaiset ohjeet ja palaavat seuraukset. Myös hyviä uutisia. `docs/SAVY_JA_HUUMORI.md` määrää sävyn.
- **Fiktio:** ei oikeita hankkeita, yrityksiä, henkilöitä, kuntia, esikuvia, tapauslinkkejä, sisäisiä asiakirjoja tai todellisia karttoja. Arvo nimi nimipankista. Oikeita lajinimiä ja yleisiä menettelytermejä saa käyttää.
- **Toteutus:** puhdas TypeScript-moottori, erillinen UI ja JSON-sisältö. Siemenellinen satunnaisuus. Ei backendia, pelinaikaista tekoälyä tai maksullista palvelua oletuksena.
- **Numerot:** tuuli alkaa aina 10 MW / 300 m per voimala. Erota kpl, kokonaiskorkeus, nimellisteho, tuotto, MWp/MWac, ha ja km. Yhteinen johto lasketaan kerran.
- **Reiluus:** vitsi ei ole salainen sääntö. Tunnettu kohtalokas seuraus näkyy ennen valintaa. Selvitys paljastaa riskin, ei luo sitä. Sama poistettu alue ei häviä uudestaan. Kortin teksti ei anna uutta vaikutuskäskyä.
- **Taide:** Codex tekee alkuperäiset SVG-kuvitukset; 6 kuvan tyyli ensin, vasta sitten erät. Ei kopioituja Reigns-kuvia tai tekstin rasterointia. Spark ei korvaa kuvan näkevää visuaalista arvioijaa.
- **Kiintiö:** rajaa konteksti ja tehtävä. Ei Fast-/Ultra-oletusta, turhia rinnakkaisagentteja, kokorepon uudelleenrakentamista tai sovitun sisällön toistuvaa uudelleenkirjoitusta.
- **Turvallisuus:** säilytä käyttäjän muutokset. Ei poistoja, pushia, julkaisua, ostoksia, globaaleja malliasetusmuutoksia tai muiden projektien muokkausta ilman lupaa.

Lopuksi aja muutoksen tarvitsemat testit, sisältövalidointi ja build kun sovellus muuttuu. Raportoi toteutettu, testattu ja testaamaton erikseen. Päivitä `NEXT_STEPS.md`. Älä tulosta koko pakkaa keskusteluun.
