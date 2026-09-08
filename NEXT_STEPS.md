# Työn tila — alueet ja menettelyn rytmi, 8.9.2026

Aktiivinen peli on src/game, sisältöversio **swipe-fi-007**. Säilytä käyttäjän hyväksymä violetti/vaalea mobiili-ilme. Valikossa vain Hybridi; erilliset Tuuli ja Aurinko odottavat omaa sisältökokeilua. Vanha src/campaign, 64 kortin pilotti ja 80 nimen pankki ovat säilytettyä vertailuaineistoa.

18 päätöstä: 2 maanvuokrausta, 5 aloitetta/ohjelmaa, 6 selostusta/luonnosta ja 5 ehdotusta/hyväksyntää. Melumoodin tai kulkuyhteyden lausuntoon vastaava kortti kuuluu nyt ehdotusvaiheen alkuun. Pankissa on 69 hybridikohtaamista ja 11 erillistä aurinkovarianttia. Kuusi etenemishetkeä (yksi selostuksen yleisötilaisuus), kolme klikattavaa vaihesiirtymää ja tapauskohtaiset tulostarinat eivät vie päätöspaikkoja.

Uutta: tallennettu piilotettu alueprofiili west/central/lapland/east, aluepainotettu lajisto ja Puolustusvoimien haarat. Poronhoitokortit vain Lapissa, metsäpeura ja liito-orava sen ulkopuolella. Maakotka painottuu länteen ja pohjoiseen, mutta ei ole yksinomaan läntinen riski. Nimi, sen vaihtuminen tai lataus eivät muuta aluetta, lähtökokoa tai mekaanista satunnaisuutta. Lähteet, rajaukset ja painot: docs/ALUEET_JA_AJASTUS.md.

Työjono ja tuloksen julkaisu on erotettu: findings tallentaa lähteen, käsittelyvaiheen ja pending/queued/revealed-tilan. Luontosijoittelun arvio, vesitalous ja palautteen lisäkäsittely tulevat YVA-päätelmän yhteydessä. Aurinkoalueen luontoratkaisu ja Natura-/vaikutusarvioiden riittävyys käsitellään ehdotusvaiheessa ennen hyväksyntää. VTT ja lentoesteen esiselvitys voivat valmistua aiemmin. Progress- ja transition-tarina eivät muuta kelloa; vaihe vaihtuu vasta siirtymää klikattaessa. Ks. docs/TILASOPIMUS_SWIPE.md.

Alueet ovat karkeita fiktiivisiä ympäristöprofiileja, eivät maakuntakohtaisia lajikarttoja tai mitattuja riskiprosentteja. Poronhoidon todellinen alue ulottuu myös Lapin ulkopuolelle. Pelin kestot, hinnat ja todennäköisyydet ovat pelisääntöjä. YVA-päätelmä ei myönnä kaavahyväksyntää tai poikkeuslupaa. Säilytä tämä erottelu uusissa teksteissä.

Varmennus: 82 TypeScript-testiä, tyypitys/build, 17 Python-testiä sekä kaikki kolme sisältövalidointia; 9 Chromium-selaintestiä ja 2 offline/päivitystestiä. Vaihesiirtymä myös ladattiin uudelleen ja klikattiin selaintestissä. Tulokset ja simulaatioiden lähdeversiot: reports/QA_REGIONS_2026-09-08.md. Fyysistä puhelinta, iOS/Safaria, Firefoxia tai ruudunlukijaa ei ole testattu.

Käyttäjä on valtuuttanut GitHub-pushin ja julkaisun **kaikille ilman kirjautumista**. Sama Sites-projekti .openai/hosting.json:ssa, älä luo uutta. Osoite on https://kaava-vai-kaaos.joni-vainio.chatgpt.site. Julkaisun lopullinen tila ja kirjautumattoman selaimen tarkistus kirjataan QA-raporttiin. GitHub origin: jonivainio/Kaava-vai-kaaos.

Seuraava työ: käyttäjän puhelinkoe ja alueiden sekä viivästettyjen seurausten toimituksellinen palaute. Aloita uusi hanke; 006-tallennusta ei tulkita 007-säännöillä, vaan se jää palautettavaksi vientiin. Siemen uusi-1 toimii nykyisessä varovaisen etenemisen selainkokeessa. Korttien vasen/oikea vaihtuu, käytä valintojen sisältöä. Uusia alue- tai lajikortteja lisätessä tarkista aluekelpoisuus, käsittelyvaihe, kuvitus ja mahdollinen viivästetty tulos. Älä lisää sattumanvaraista viranomaisratkaisua tavalliseen etenemistarinaan.
