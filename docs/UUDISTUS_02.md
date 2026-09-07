# Uudistuksen rajat, 8.9.2026

Käyttäjän uusin toimeksianto ohittaa aiemman käyttöliittymän ja pitkän kampanjan. Uusi pelikerta sisältää 2 + 5 + 7 + 4 päätöstä neljässä vaiheessa. RtB on voittoruutu. Ei näkyviä resurssimittareita, kuukausilaskuria, hankekansiota tai vasen/oikea-painikkeita. Pelaaminen toimii vetämällä myös hiirellä. Näppäimistö säilyy vaihtoehtoisena syötteenä. Lyhyt aloitusopastus ei vaikuta hankkeeseen.

Tapahtuma ja seuraava kysymys ovat kuvituskortin yläpuolella. Välitarina etenee yhdellä jatkamisella ilman valintaa. Fyysinen hanke näkyy ylhäällä täyttökuvakkeina ja selitteellisinä lukuina. Hybridin liittymää ei toisteta. Selain täyttää käytettävissä olevan ruudun, pyytää koko näytön tilaa aloituseleessä ja tukee kotinäytöltä käynnistystä.

Noin kolmannes runien maailmoista sisältää väistämättömän esteen. Muissa maailmoissa pelaajan ratkaisujen on vaikutettava lopputulokseen. Tasapainon vertailustrategia on tasajakoinen, siemenellinen vasen/oikea-valinta. Kolmasosajako ei koske kaikkia mahdollisia strategioita: hyvät valinnat saavat parantaa tulosta.

Julkiset tyypit päätettiin ensin `src/game/types.ts`:ssä. Uusi rajattu tarinamenettely käyttää olemassa olevaa fyysistä moottoria ja vain sallittuja fyysisiä effect-käskyjä. Vanha pilotti ja vanhan kampanjan testit säilyvät vertailua varten; niitä ei tarjota uudessa pelissä. Uusi tallennus on `swipe-2`. Vanhaa tallennusta ei muunneta hiljaisesti.

Käyttäjä pyysi puhelimella pelattavan osoitteen GitHub-repoon. Tämä on valtuutus julkaista selainpeli ja tallentaa lähdekoodi sekä osoite kyseiseen repoon.

Uusin tarkennus: vain Hybridi on valittavissa. 18 päätöstä sisältää 12 päätilannetta ja kuusi lyhyempää tai täydentävää päätöstä. Tilannepankki sisältää 65 hybridissä käytettävää kohtaamista sekä 11 erillisen aurinkotilan varianttia. Välitarinat eivät kuluta päätöspaikkoja. Aiempi kahden–viiden kortin enimmäisraja väistyy käyttäjän myöhemmän pidennyspyynnön tieltä.
