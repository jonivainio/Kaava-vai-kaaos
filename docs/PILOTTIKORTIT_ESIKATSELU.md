# 64 fiktiivistä pilottikorttia — esikatselu v2

Kortit on kirjoitettu surkuhupaiseksi hankekehityssatiiriksi. Niiden vaatimukset, henkilöt ja tilanteet ovat fiktiivisiä. Tämä on JSON-datasta tuotettu tekstiesikatselu, ei pelattava kampanja.

Vasemman ja oikean valinnan vaikutuskäskyt esitetään sellaisinaan, jotta kirjoitettu seuraus voidaan tarkastaa dataa vasten. Pisteet ja kuukaudet ovat pelilukuja. Ehdot ja jonotuksen säännöt sitovat myös hauskoja kortteja.

## P001 — Kynä käy. Epäily herää.

Maanomistaja lukee sopimuksen ja sanoo kyllä. Ilman ehtoja. Tiimi tarkistaa varmuuden vuoksi, että oikea henkilö tuli paikalle. Hän kysyy, kutsutaanko naapuritkin.

**Puhuja:** Maanomistaja · **Kuvitusavain:** `landowner`

**Vaiheet:** 01 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** land

### Vasemmalle: Sovitaan yhteinen tapaaminen

Naapurit kutsutaan. Hanke saa ensimmäisen kokouksen, jota kukaan ei vaatinut.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "trust",
      "value": 7
    },
    {
      "op": "flag",
      "key": "landTalksStarted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Allekirjoitetaan ensin

Ensimmäinen nimi on paperissa. Muiden allekirjoitukset eivät ilmesty myötätunnosta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "anchorLeaseSigned",
      "value": true
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": 3
    }
  ],
  "delayed": []
}
```

## P002 — Kuusi osakasta ja yksi vastaus

Kaksi voimalapaikkaa on yhteisomistetulla tilalla. Yksi osakas vastasi kaikille. Muut vastaavat nyt toisilleen, mutta eivät kysymykseen.

**Puhuja:** Maanomistaja · **Kuvitusavain:** `landowner`

**Vaiheet:** 01, 02 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** mixed · **Huumoritaso:** 2/3 · **Perhe:** land

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "wind.count",
    "operator": "gte",
    "value": 4
  }
]
```

### Vasemmalle: Kootaan kaikki osakkaat

Osakkaat saadaan saman asian äärelle. Kalenterit eivät selvinneet ilman vaurioita.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "flag",
      "key": "coOwnerTalks",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Rajataan kaksi paikkaa pois

Kaksi paikkaa poistuu. Sähköpostiketju jatkuu ilman hanketta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "windRemove",
      "count": 2,
      "reason": "co_owned_parcel"
    },
    {
      "op": "flag",
      "key": "coOwnerIssueResolved",
      "value": true
    }
  ],
  "delayed": []
}
```

## P003 — Oja hakee omaa sopimusta

Aurinkoalueen kuivatus päätyy naapurin ojaan. Vedelle reitti oli selvä. Sopimuskansiolle ei. Käyttö- ja kunnossapito-oikeudet puuttuvat.

**Puhuja:** Vesiasiantuntija · **Kuvitusavain:** `wetland`

**Vaiheet:** 01, 04 · **Hanketyypit:** solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 1/3 · **Perhe:** water

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "solar.hectares",
    "operator": "gte",
    "value": 30
  }
]
```

### Vasemmalle: Selvitetään oikeudet

Oikeuksien tarkastelu tilataan. Vedelle ei vielä lähetetä kokouskutsua.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    }
  ],
  "delayed": [
    {
      "jobId": "drainage_rights",
      "afterMonths": 2,
      "completionText": "Ojien käyttöoikeuksien tarkastelu valmistui.",
      "effects": [
        {
          "op": "flag",
          "key": "drainageRightsReviewed",
          "value": true
        }
      ]
    }
  ]
}
```

### Oikealle: Jätetään reuna-alue pois

Reunasta poistuu 10 ha. Oja jää, riippuvuus pienenee.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "solarRemove",
      "hectares": 10,
      "reason": "drainage_edge"
    },
    {
      "op": "flag",
      "key": "drainageEdgeRemoved",
      "value": true
    }
  ],
  "delayed": []
}
```

## P004 — Sopimus osasi lukea kalenteria

Maanvuokraoptio vanhenee ennen kaavapäätöstä. Projektiaikataulu on siirretty kolmesti. Sopimuksen päivämäärä ei ole osallistunut talkoisiin.

**Puhuja:** Lakiasiantuntija · **Kuvitusavain:** `documents`

**Vaiheet:** 03, 04, 05 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** followup

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** deadline

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.leaseDeadlineNear",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Neuvotellaan jatkoa

Jatkoaika maksaa. Tällä kertaa myös sopimus pääsee uuteen aikatauluun.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -6
    },
    {
      "op": "flag",
      "key": "leaseExtended",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Tiivistetään hankerajausta

Rajauksen uudelleensuunnittelu alkaa. Vanhaa määräaikaa ei kuitata toiveikkuudella.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "leaseRedesignNeeded",
      "value": true
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -5
    }
  ],
  "delayed": []
}
```

## P005 — Myönteinen päätös. Hengitä.

Kunta hyväksyi kaavoitusaloitteen. Omistaja kysyy jo rakentamisen aloituspäivää. Kaavoittaja kysyy aloitustilaisuuden päivää. Aloitetaan jälkimmäisestä.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `planner`

**Vaiheet:** 02 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** milestone

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** municipality

### Vasemmalle: Tavataan kuntalaiset pian

Kuntalaiset kutsutaan. Lapion tilaaminen odottaa vielä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "municipality",
      "value": "initiated"
    },
    {
      "op": "adjust",
      "field": "trust",
      "value": 6
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    }
  ],
  "delayed": []
}
```

### Oikealle: Kootaan lähtötiedot ensin

Lähtötiedot kootaan. Rakentamisaikataulun soluun kirjoitetaan jälleen ”alustava”.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "municipality",
      "value": "initiated"
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 6
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    }
  ],
  "delayed": []
}
```

## P006 — Kunta tarjoaa pöydän

Kunnan edustaja suhtautuu myönteisesti ja ehdottaa yhteistä tapaamista. Kahvi kuuluu tilaan. Myönteinen kaavapäätös ei kuulu tarjoiluun.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `planner`

**Vaiheet:** 02 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** municipality

### Vasemmalle: Otetaan kutsu vastaan

Yhteinen keskustelu alkaa ilman, että kenenkään tarvitsee ensin suuttua.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "trust",
      "value": 7
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    }
  ],
  "delayed": []
}
```

### Oikealle: Pidetään ensin työpalaveri

Työpalaverissa löydetään avoimet asiat. Tämä on tänään hyvä uutinen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 5
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": 3
    }
  ],
  "delayed": []
}
```

## P007 — Kartalla. Toistaiseksi.

Maakuntakaavaluonnoksessa on hankkeen tarvitsema aluevaraus. Kalvolla lukee ”mahdollistaa”. Alaviitteessä lukee ”edellyttäen”. Alaviite tarvitsee lisäaineistoa.

**Puhuja:** Maakuntaliiton suunnittelija · **Kuvitusavain:** `map`

**Vaiheet:** 02, 03 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** regional

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.regionalRequired",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Teetetään yhteisvaikutukset

Yhteisvaikutusten tarkastelu tilataan. Karttaväri ei vielä muutu lupaukseksi.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -6
    },
    {
      "op": "track",
      "key": "regional",
      "value": "draft"
    }
  ],
  "delayed": [
    {
      "jobId": "regional_evidence",
      "afterMonths": 3,
      "completionText": "Maakunnallinen perustelupaketti valmistui.",
      "effects": [
        {
          "op": "flag",
          "key": "regionalEvidenceReady",
          "value": true
        }
      ]
    }
  ]
}
```

### Oikealle: Varataan suppeampi vaihtoehto

Suppeampi vaihtoehto valmistellaan. On nyt suunnitelma myös suunnitelman puuttumiselle.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "regional",
      "value": "draft"
    },
    {
      "op": "flag",
      "key": "regionalFallbackDesigned",
      "value": true
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    }
  ],
  "delayed": []
}
```

## P008 — Aluevaraus kävi täällä

Maakuntakaavaehdotuksesta puuttuu hankkeen tarvitsema varaus. Luonnos oli kuulemma luonnos. Esityskalvon vihreä liikennevalo ei saanut tiedotetta.

**Puhuja:** Maakuntaliiton suunnittelija · **Kuvitusavain:** `map`

**Vaiheet:** 05, 06, 07 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** followup

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** regional

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.regionalRequired",
    "operator": "eq",
    "value": true
  },
  {
    "field": "tracks.regional",
    "operator": "eq",
    "value": "draft"
  }
]
```

### Vasemmalle: Selvitetään uusi ratkaisu

Uutta ratkaisua selvitetään. Paikallinen kaava ei tässä skenaariossa yksin ratkaise riippuvuutta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **3 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "regional",
      "value": "omitted"
    },
    {
      "op": "flag",
      "key": "regionalRedesignNeeded",
      "value": true
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -6
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -8
    }
  ],
  "delayed": []
}
```

### Oikealle: Odotetaan seuraavaa ratkaisua

Hanke odottaa rinnakkaista ratkaisua. Omistaja pyytää odottamisesta aikataulun.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **6 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "regional",
      "value": "omitted"
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -15
    }
  ],
  "delayed": []
}
```

## P009 — Kartalla on sähköä

Alustava verkkokartta näyttää lupaavalta. Verkkosuunnittelija täsmentää: väri kertoo mahdollisuudesta, ei siitä, että sähköpaikka odottaa nimelläsi.

**Puhuja:** Verkkosuunnittelija · **Kuvitusavain:** `substation`

**Vaiheet:** 01, 02, 03 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** grid

### Vasemmalle: Lähetetään liityntäkysely

Liityntäkysely lähtee. Nyt kartan lisäksi myös verkkoyhtiö tietää hankkeesta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "grid",
      "value": "inquiry"
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    }
  ],
  "delayed": [
    {
      "jobId": "grid_initial",
      "afterMonths": 2,
      "completionText": "Liityntäkyselyyn saatiin vastaus.",
      "effects": [
        {
          "op": "flag",
          "key": "gridResponseReady",
          "value": true
        }
      ]
    }
  ]
}
```

### Oikealle: Verrataan ensin kahta pistettä

Kaksi pistettä vertaillaan. Molemmat ovat vielä vaihtoehtoja, eivät varauksia.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "gridAlternativesMapped",
      "value": true
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    }
  ],
  "delayed": []
}
```

## P010 — Lähin on täynnä

Lähimmän liittymispisteen kapasiteetti ei riitä. Kauempi piste näyttää mahdolliselta. Se on yhdeksän kilometriä kauempana kuin sana ”lähellä” antoi ymmärtää.

**Puhuja:** Verkkosuunnittelija · **Kuvitusavain:** `substation`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** followup

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** grid

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.gridResponseReady",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.gridConstraint",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Tutkitaan kauempi piste

Reitti pitenee 9 km. Uuden pisteen käyttökelpoisuus pitää vielä varmistaa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "gridDistance",
      "deltaKm": 9
    },
    {
      "op": "track",
      "key": "grid",
      "value": "alternative"
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "adjust",
      "field": "economicsIndex",
      "value": -6
    }
  ],
  "delayed": []
}
```

### Oikealle: Neuvotellaan rajatusta viennistä

Rajattua vientiä tutkitaan. Voimaloiden nimellisteho ei muutu neuvottelemalla.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "exportLimitStudyNeeded",
      "value": true
    },
    {
      "op": "track",
      "key": "grid",
      "value": "study"
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    }
  ],
  "delayed": []
}
```

## P011 — Tutka ei ihastunut

Puolustusasioiden asiantuntija välittää arvion: nykyinen sijoittelu ei sovi. Hankkeen hyvä asenne ei näy tutkassa, mutta suunnitelman ongelma näkyy.

**Puhuja:** Puolustusasioiden asiantuntija · **Kuvitusavain:** `radar`

**Vaiheet:** 02, 03, 04 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** defence

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.defenceConflict",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Tutkitaan uusi sijoittelu

Uusi sijoittelu tutkitaan. Sen hyväksyttävyyttä ei vielä tiedetä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "defenceRedesignNeeded",
      "value": true
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -6
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -5
    }
  ],
  "delayed": []
}
```

### Oikealle: Pyydetään tarkentava selvitys

Tarkennus tilataan. Tarkempi vastaus ei välttämättä ole mukavampi vastaus.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "defenceStudyNeeded",
      "value": true
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -9
    }
  ],
  "delayed": []
}
```

## P012 — Taivaassakin on katto

Ilmailutarkastelu rajaa suunnitelmaa. Tässä vaihtoehdot ovat 280 metrin enimmäiskorkeus tai kahden voimalapaikan poistaminen. Taivaan vapaata tilaa oli liioiteltu.

**Puhuja:** Ilmailuasiantuntija · **Kuvitusavain:** `windscape`

**Vaiheet:** 03, 04 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** height

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.aviationConflict",
    "operator": "eq",
    "value": true
  },
  {
    "field": "wind.count",
    "operator": "gte",
    "value": 4
  }
]
```

### Vasemmalle: Enimmäiskorkeus 280 metriin

Korkeusraja laskee 280 metriin. Voimalamalli ei pienene mukana itsestään.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "heightCap",
      "metres": 280
    },
    {
      "op": "flag",
      "key": "aviationLayoutAdjusted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Poistetaan kaksi paikkaa

Kaksi paikkaa poistuu. Muiden korkeustavoite säilyy.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "windRemove",
      "count": 2,
      "reason": "aviation_conflict"
    },
    {
      "op": "flag",
      "key": "aviationLayoutAdjusted",
      "value": true
    }
  ],
  "delayed": []
}
```

## P013 — Kolmesataa sivua. Yksi nuoli.

YVA-ohjelmassa tuotantoalueella on kunnollinen kuvaus. Ulkoinen sähkönsiirto on kartalla nuoli. Nuoli näyttäisi tarvitsevan oman työryhmän.

**Puhuja:** YVA-/kaavakonsultti · **Kuvitusavain:** `documents`

**Vaiheet:** 03 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** documents

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.yvaRequired",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Täydennetään reittivaihtoehdot

Reittivaihtoehdot täydennetään. Nuoli saa vihdoin sisältöä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 7
    },
    {
      "op": "flag",
      "key": "yvaProgrammeReviewed",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Pidetään rajauspalaveri ensin

Rajauspalaveri sovitaan. Ohjelman puute ei katoa kutsun lähettämisellä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "flag",
      "key": "programmeScopeMeeting",
      "value": true
    }
  ],
  "delayed": []
}
```

## P014 — Naapurikunta ilmestyy kuvaan

Osallistumissuunnitelma valmistui. Vaikutusalue jatkuu naapurikunnan mökkirantaan, vaikka kunnanraja oli piirretty karttaan erittäin selvästi.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `map`

**Vaiheet:** 03 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** participation

### Vasemmalle: Täsmennetään osallistujat

Osallistujat täsmennetään vaikutusten mukaan. Kartan viiva säilyy koristeena.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 5
    },
    {
      "op": "adjust",
      "field": "trust",
      "value": 4
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "flag",
      "key": "oasReviewed",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Kootaan paikallistieto ensin

Paikallistieto kootaan. OAS odottaa vielä päivitystä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "trust",
      "value": 7
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "flag",
      "key": "oasNeedsUpdate",
      "value": true
    }
  ],
  "delayed": []
}
```

## P015 — Asiantuntija, nimetään myöhemmin

Halvimman YVA-tarjouksen vesiasiantuntija on ”nimetään myöhemmin”. Hänellä on ilmeisen laaja toimenkuva: sama henkilö hoitaa myös hankalat kysymykset.

**Puhuja:** YVA-/kaavakonsultti · **Kuvitusavain:** `consultant`

**Vaiheet:** 03 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** mixed · **Huumoritaso:** 2/3 · **Perhe:** consultant

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.waterRisk",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Vahvistetaan tarjoustiimiä

Nimetty osaaja ostetaan tiimiin. Tarjous menettää edullisimman ominaisuutensa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -8
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 9
    },
    {
      "op": "flag",
      "key": "waterExpertAssigned",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Valitaan myöhemmin aloittava

Valitaan myöhemmin aloittava osaava tiimi. Kalenteri maksaa osan säästöstä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 9
    },
    {
      "op": "flag",
      "key": "waterExpertAssigned",
      "value": true
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -3
    }
  ],
  "delayed": []
}
```

## P016 — Luonto ei lukenut hankintaohjetta

Selvityskausi lähestyy. Konsultti ehtii vielä maastoon, jos tilaat nyt. Sisäinen hyväksyntä on seuraavassa kokouksessa. Eläimet eivät osallistuneet aikataulutukseen.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `ecologist`

**Vaiheet:** 03, 04 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** season

### Vasemmalle: Tilataan kokonaisuus nyt

Selvitykset alkavat. Tuloksia ei saa vielä käyttää johtopäätöksinä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -8
    }
  ],
  "delayed": [
    {
      "jobId": "ecology_surveys",
      "afterMonths": 3,
      "completionText": "Luontoselvitysten tulokset saapuivat.",
      "effects": [
        {
          "op": "flag",
          "key": "ecologyReady",
          "value": true
        },
        {
          "op": "adjust",
          "field": "quality",
          "value": 8
        }
      ]
    }
  ]
}
```

### Oikealle: Kootaan ensin aineistot

Aineistot kootaan ensin. Seuraava sopiva tutkimusjakso siirtää tuloksia.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    }
  ],
  "delayed": [
    {
      "jobId": "ecology_surveys",
      "afterMonths": 10,
      "completionText": "Myöhemmän tutkimusjakson tulokset saapuivat.",
      "effects": [
        {
          "op": "flag",
          "key": "ecologyReady",
          "value": true
        },
        {
          "op": "adjust",
          "field": "quality",
          "value": 8
        }
      ]
    }
  ]
}
```

## P017 — Metsäpeuralla oli reitti ensin

Luontoselvityksessä metsäpeurojen kulkuyhteys osuu tuuli- ja aurinkoalueiden väliin. Juuri siihen oli kirjoitettu ”tehokas yhteiskäyttö”.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `reindeer`

**Vaiheet:** 04, 05, 06 · **Hanketyypit:** hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** reindeer

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.ecologyReady",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.reindeerConflict",
    "operator": "eq",
    "value": true
  },
  {
    "field": "wind.count",
    "operator": "gte",
    "value": 4
  },
  {
    "field": "solar.hectares",
    "operator": "gte",
    "value": 30
  }
]
```

### Vasemmalle: Avataan yhtenäinen käytävä

Käytävä avataan: kaksi voimalaa ja 14 ha poistuvat. Uusi ratkaisu arvioidaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "windRemove",
      "count": 2,
      "reason": "reindeer_corridor"
    },
    {
      "op": "solarRemove",
      "hectares": 14,
      "reason": "reindeer_corridor"
    },
    {
      "op": "flag",
      "key": "reindeerLayoutAdjusted",
      "value": true
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    }
  ],
  "delayed": []
}
```

### Oikealle: Selvitetään komponenttijako

Komponenttijakoa selvitetään. Hybridin nimi on toistaiseksi pidempi kuin varma suunnitelma.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "hybridPivotAvailable",
      "value": true
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "queueCard",
      "cardId": "P048",
      "delayMonths": 0
    }
  ],
  "delayed": []
}
```

## P018 — Harjanne oli jo käytössä

Maakotka käyttää suunniteltua voimalariviä säännöllisesti. Se ei ollut varannut harjannetta kalenterista, mutta lentoaineisto on melko yksiselitteinen.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `eagle`

**Vaiheet:** 04, 05 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** eagle

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.ecologyReady",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.goldenEagleConflict",
    "operator": "eq",
    "value": true
  },
  {
    "field": "wind.count",
    "operator": "gte",
    "value": 5
  }
]
```

### Vasemmalle: Poistetaan riskirivin paikat

Kolme riskirivin paikkaa poistetaan. Kokonaisvaikutuksen arviointi jää tehtäväksi.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "windRemove",
      "count": 3,
      "reason": "golden_eagle_ridge"
    },
    {
      "op": "flag",
      "key": "goldenEagleLayoutAdjusted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Etsitään vaihtoehtoiset paikat

Vaihtoehtoisia paikkoja etsitään. Niitä ei lisätä karttaan pelkällä optimismilla.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -8
    },
    {
      "op": "flag",
      "key": "goldenEagleRedesignNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P019 — Merikotkan oikopolku

Merikotkan ruokailureitti osuu sekä voimaloihin että johtoon. Yhteinen infrastruktuuri toi hankkeelle yhteisen ongelman.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `eagle`

**Vaiheet:** 04, 05 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** eagle

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.ecologyReady",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.seaEagleConflict",
    "operator": "eq",
    "value": true
  },
  {
    "field": "wind.count",
    "operator": "gte",
    "value": 3
  }
]
```

### Vasemmalle: Muutetaan molempia reittejä

Yksi paikka poistuu ja johto pitenee 3 km. Ratkaisu tarvitsee päivitetyn arvioinnin.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "windRemove",
      "count": 1,
      "reason": "white_tailed_eagle_route"
    },
    {
      "op": "gridDistance",
      "deltaKm": 3
    },
    {
      "op": "flag",
      "key": "seaEagleLayoutAdjusted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Täydennetään lentoaineistoa

Lentoaineistoa täydennetään. Alkuperäistä reittiä ei sillä vielä hyväksytä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -6
    },
    {
      "op": "flag",
      "key": "seaEagleStudyNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P020 — Sääksi valitsi suoran linjan

Sääksen reitti kalastusjärvelle osuu reunimmaiseen voimalapaikkaan. Se valitsi lyhimmän yhteyden. Verkkosuunnittelija ymmärtää ratkaisua henkilökohtaisesti.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `osprey`

**Vaiheet:** 04, 05 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** osprey

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.ecologyReady",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.ospreyConflict",
    "operator": "eq",
    "value": true
  },
  {
    "field": "wind.count",
    "operator": "gte",
    "value": 3
  }
]
```

### Vasemmalle: Poistetaan reunapaikka

Reunapaikka poistuu. Uuden rajauksen vaikutukset tarkistetaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "windRemove",
      "count": 1,
      "reason": "osprey_flight_route"
    },
    {
      "op": "flag",
      "key": "ospreyLayoutAdjusted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Tutkitaan siirto sivummalle

Siirtoa tutkitaan. Korvaava paikka on vielä ajatus, ei lisävoimala.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "flag",
      "key": "ospreyRedesignNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P021 — Viitasammakon tonttitoive

Aurinkolohkon kosteikossa lisääntyy viitasammakko. Se tarvitsee toimivan vesitalouden, ei karttapistettä. Karttapiste olisi ollut meille halvempi.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `frog`

**Vaiheet:** 04, 05 · **Hanketyypit:** solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** frog

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.ecologyReady",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.frogConflict",
    "operator": "eq",
    "value": true
  },
  {
    "field": "solar.hectares",
    "operator": "gte",
    "value": 30
  }
]
```

### Vasemmalle: Jätetään vesitalousalue pois

Vesitalousalueesta rajataan pois 12 ha tässä skenaariossa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "solarRemove",
      "hectares": 12,
      "reason": "frog_hydrology"
    },
    {
      "op": "flag",
      "key": "frogAreaAvoided",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Suunnitellaan vesienhallinta

Vesienhallinnan vaihtoehto tutkitaan. Sammakkoa ei kuitata käsitellyksi laskun maksulla.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -7
    },
    {
      "op": "flag",
      "key": "frogHydrologyStudyNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P022 — Paineita myös maan alla

Maaperäselvitys viittaa paineelliseen pohjaveteen. Kaivanto voisi avata purkautumisreitin. Tähän asti hankkeen paineet olivat pysyneet palavereissa.

**Puhuja:** Vesiasiantuntija · **Kuvitusavain:** `wetland`

**Vaiheet:** 04, 05 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** water

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.waterRisk",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Teetetään hydrogeologia

Hydrogeologinen selvitys tilataan. Ratkaisu odottaa tuloksia.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -7
    }
  ],
  "delayed": [
    {
      "jobId": "groundwater_study",
      "afterMonths": 3,
      "completionText": "Hydrogeologinen selvitys valmistui; ratkaisu pitää sovittaa siihen.",
      "effects": [
        {
          "op": "flag",
          "key": "groundwaterStudyReady",
          "value": true
        }
      ]
    }
  ]
}
```

### Oikealle: Siirretään rakenteita

Rakenteiden siirto suunnitellaan. Muut vaikutukset pitää tarkistaa uudesta paikasta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "flag",
      "key": "groundwaterRedesignNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P023 — Maa paljastaa luonteensa

Aurinkoalueen kuivatusreitin maaperässä tunnistetaan sulfaattimaariski. Maanomistajan mukaan maa on aina ollut hankalaa. Nyt väitteellä on laboratoriotulos.

**Puhuja:** Vesiasiantuntija · **Kuvitusavain:** `wetland`

**Vaiheet:** 04, 05 · **Hanketyypit:** solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** soil

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.sulphateRisk",
    "operator": "eq",
    "value": true
  },
  {
    "field": "solar.hectares",
    "operator": "gte",
    "value": 25
  }
]
```

### Vasemmalle: Vähennetään kuivatusaluetta

Riskilohkosta poistuu 8 ha. Vesiratkaisun täsmentäminen maksaa vielä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "solarRemove",
      "hectares": 8,
      "reason": "sulphate_soil"
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "flag",
      "key": "sulphateLayoutAdjusted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Teetetään käsittelysuunnitelma

Käsittelyratkaisua tutkitaan. Toteuttamiskelpoisuutta ei voi kirjoittaa tarjoukseen valmiiksi.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -7
    },
    {
      "op": "flag",
      "key": "sulphatePlanNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P024 — Excelissä tuulee hyvin

Karttapohjainen tuotantoarvio näyttää lupaavalta. Omistaja kysyy, onko alueella mitattu. Vastaus ”kalvo 12” ei ollut aivan se, mitä hän tarkoitti.

**Puhuja:** Tuulianalyytikko · **Kuvitusavain:** `windscape`

**Vaiheet:** 02, 03, 04 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** wind

### Vasemmalle: Aloitetaan mittaus nyt

Mittaus alkaa rinnakkain muun työn kanssa. Tuloksia tulee myöhemmin.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -8
    }
  ],
  "delayed": [
    {
      "jobId": "wind_measurement",
      "afterMonths": 12,
      "completionText": "Tuulimittauksen tulos on käytettävissä.",
      "effects": [
        {
          "op": "flag",
          "key": "windMeasured",
          "value": true
        }
      ]
    }
  ]
}
```

### Oikealle: Tarkennetaan esiselvitystä

Esiselvitystä tarkennetaan. Parempi kartta ei vielä ole mittaus.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    },
    {
      "op": "flag",
      "key": "windDesktopUpdated",
      "value": true
    }
  ],
  "delayed": []
}
```

## P025 — Tuuli ei saavuttanut tavoitettaan

Mittaus valmistui. Tuotanto-odotus jää aiemmasta arviosta. Tiimi on pettynyt tuulen suoritukseen. Tuuli ei hyväksy sille asetettua kehityskeskustelua.

**Puhuja:** Tuulianalyytikko · **Kuvitusavain:** `windscape`

**Vaiheet:** 04, 05, 06 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** followup

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** wind

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.windMeasured",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.windClass",
    "operator": "eq",
    "value": "weak"
  }
]
```

### Vasemmalle: Suunnitellaan sijoittelu uusiksi

Heikompi tuotanto huomioidaan ja sijoittelua tutkitaan. Nimellisteho säilyy.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "windYieldIndex",
      "value": -18
    },
    {
      "op": "adjust",
      "field": "economicsIndex",
      "value": -10
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "flag",
      "key": "windResultProcessed",
      "value": true
    },
    {
      "op": "flag",
      "key": "yieldRedesignNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Päivitetään talousmalli

Talousmalli päivitetään. Generaattorien MW-luku ei ollutkaan ongelman sijainti.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "windYieldIndex",
      "value": -18
    },
    {
      "op": "adjust",
      "field": "economicsIndex",
      "value": -10
    },
    {
      "op": "flag",
      "key": "windResultProcessed",
      "value": true
    },
    {
      "op": "flag",
      "key": "economicsReviewNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P026 — Tuuli ylitti odotukset

Tuulimittaus vahvistaa hyvän tuotanto-odotuksen. Tulos tarkistettiin kahdesti, koska se paransi hanketta ilman lisäselvityspyyntöä.

**Puhuja:** Tuulianalyytikko · **Kuvitusavain:** `windscape`

**Vaiheet:** 04, 05, 06 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** followup

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** wind

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.windMeasured",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.windClass",
    "operator": "eq",
    "value": "good"
  }
]
```

### Vasemmalle: Vahvistetaan suunnittelua

Hyvä tulos antaa liikkumavaraa parempaan suunnitelmaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "windYieldIndex",
      "value": 8
    },
    {
      "op": "adjust",
      "field": "economicsIndex",
      "value": 5
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    },
    {
      "op": "flag",
      "key": "windResultProcessed",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Avataan rahoituskeskustelu

Rahoituskeskustelu avataan. Hyvä kuvaaja ei vielä ole rahoitussopimus.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "windYieldIndex",
      "value": 8
    },
    {
      "op": "adjust",
      "field": "economicsIndex",
      "value": 5
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": 5
    },
    {
      "op": "flag",
      "key": "windResultProcessed",
      "value": true
    }
  ],
  "delayed": []
}
```

## P027 — Mallinnus, ennen viimeistä siirtoa

Voimalasijoittelu vaihtui. Valmis melumallinnus kuvaa edellistä versiota, joka oli viimeinen versio ennen nykyistä viimeistä versiota.

**Puhuja:** YVA-/kaavakonsultti · **Kuvitusavain:** `documents`

**Vaiheet:** 04, 05, 06 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** documents

### Vasemmalle: Tilataan päivitetty mallinnus

Ajantasainen melumallinnus tilataan. Valmistumista odotetaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    }
  ],
  "delayed": [
    {
      "jobId": "noise_update",
      "afterMonths": 1,
      "completionText": "Melumallinnus päivitettiin nykyiseen hankeversioon.",
      "effects": [
        {
          "op": "flag",
          "key": "noiseCurrent",
          "value": true
        },
        {
          "op": "adjust",
          "field": "quality",
          "value": 5
        }
      ]
    }
  ]
}
```

### Oikealle: Lukitaan ensin uusi sijoittelu

Uusi sijoittelu lukitaan ensin. Melumallinnus jää vielä avoimeksi.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "layoutFreezeNeeded",
      "value": true
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    }
  ],
  "delayed": []
}
```

## P028 — Aurinko löysi mökin

Välkemallinnus näyttää ongelmallisen vaikutuksen mökkirantaan. Vaihtoehtoina ovat lähimmän paikan poisto tai pysäytysohjauksen tarkempi arviointi.

**Puhuja:** YVA-/kaavakonsultti · **Kuvitusavain:** `cottage`

**Vaiheet:** 04, 05, 06 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** mixed · **Huumoritaso:** 1/3 · **Perhe:** shadow

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.shadowConflict",
    "operator": "eq",
    "value": true
  },
  {
    "field": "wind.count",
    "operator": "gte",
    "value": 3
  }
]
```

### Vasemmalle: Poistetaan lähin paikka

Yksi voimala poistuu. Aurinko saa jatkaa nykyisellä radallaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "windRemove",
      "count": 1,
      "reason": "shadow_conflict"
    },
    {
      "op": "flag",
      "key": "shadowLayoutAdjusted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Tutkitaan pysäytysohjaus

Pysäytysohjausta tutkitaan. Tuotantohäviötä ei jätetä laskelman marginaaliin.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "flag",
      "key": "shadowCurtailmentStudyNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P029 — Kolmesataa metriä näkyy

Maisema-arviossa näkyvin ryhmä hallitsee arvokasta näkymää. Kokouksessa ehdotetaan, että voimalat olisivat suuria mutta vähemmän korkeita.

**Puhuja:** Maisema-asiantuntija · **Kuvitusavain:** `windscape`

**Vaiheet:** 04, 05, 06 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** mixed · **Huumoritaso:** 2/3 · **Perhe:** landscape

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.landscapeConflict",
    "operator": "eq",
    "value": true
  },
  {
    "field": "wind.count",
    "operator": "gte",
    "value": 5
  }
]
```

### Vasemmalle: Tavoitekorkeus 280 metriin

Korkeustavoite laskee 280 metriin. Voimalamalli ja havainnekuvat tarkistetaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "heightCap",
      "metres": 280
    },
    {
      "op": "flag",
      "key": "landscapeLayoutAdjusted",
      "value": true
    },
    {
      "op": "flag",
      "key": "visualsNeedUpdate",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Poistetaan kolme paikkaa

Kolme paikkaa poistuu. Vaikutusarvio päivitetään pienempään ryhmään.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "windRemove",
      "count": 3,
      "reason": "landscape_ridge"
    },
    {
      "op": "flag",
      "key": "landscapeLayoutAdjusted",
      "value": true
    },
    {
      "op": "flag",
      "key": "visualsNeedUpdate",
      "value": true
    }
  ],
  "delayed": []
}
```

## P030 — Selvitys ehti vanheta odottaessa

Kaavaehdotus lähestyy. Muuttolintuaineisto ja naapurihankkeet eivät enää vastaa toisiaan. Selvitys vanheni sillä aikaa, kun odotimme, että muut selvitykset valmistuvat.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `eagle`

**Vaiheet:** 05, 06, 07 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** season

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.birdEvidenceOutdated",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Päivitetään seuranta

Seuranta tilataan uudelleen. Kalenteri saa oman jatkoversion.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -7
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -5
    }
  ],
  "delayed": [
    {
      "jobId": "migration_update",
      "afterMonths": 8,
      "completionText": "Muuttolintuaineisto ja yhteisvaikutustarkastelu päivittyivät.",
      "effects": [
        {
          "op": "flag",
          "key": "birdEvidenceCurrent",
          "value": true
        }
      ]
    }
  ]
}
```

### Oikealle: Pyydetään riittävyyden arvio

Aineiston riittävyys arvioidaan. Vanha päivämäärä ei yksin ratkaise vastausta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "flag",
      "key": "birdAdequacyReviewNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P031 — Samaan suohon mahtuu suunnitelmia

Kartalle ilmestyi kaivosvaraus. Omistaja kysyy, menetimmekö alueen. Selvitetään ensin, mitä on varattu ja mitä on oikeasti päätetty.

**Puhuja:** Lakiasiantuntija · **Kuvitusavain:** `map`

**Vaiheet:** 02, 03, 04, 05 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** landuse

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.miningOverlap",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Selvitetään todellinen vaihe

Oikeuksien ja hankevaiheiden selvitys täsmentää uutista.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "flag",
      "key": "miningOverlapReviewed",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Valmistellaan vaihtoehtoinen rajaus

Vararajaus valmistellaan. Varaudutaan ilman että varauksesta päätellään valmis kaivos.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "flag",
      "key": "miningFallbackDesigned",
      "value": true
    }
  ],
  "delayed": []
}
```

## P032 — Oikopolku päätyi kaavoitukseen

Kunnan tarkastelussa tämän aurinkohankkeen laajuus ja maisemavaikutus edellyttävät kaavoitusta. Nopea menettely oli nopea lähinnä suunnittelukalvolla.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `solarfield`

**Vaiheet:** 02, 03 · **Hanketyypit:** solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 1/3 · **Perhe:** procedure

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.solarPlanningRequired",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Käynnistetään kaavapolku

Tämän hankkeen kaavapolku käynnistetään.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "solarPlanningRouteConfirmed",
      "value": true
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    }
  ],
  "delayed": []
}
```

### Oikealle: Tutkitaan suppeampi vaihtoehto

Suppeampaa vaihtoehtoa tutkitaan. Sen menettelytarve tarkistetaan erikseen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "solarScaleAlternativeNeeded",
      "value": true
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    }
  ],
  "delayed": []
}
```

## P033 — Puu teki työnsä liian hyvin

Reunametsä suojaa aurinkokentän näkymää ja varjostaa paneeleita. Näkösuojana onnistunut puu on tuotantomallissa ongelma.

**Puhuja:** Aurinkosuunnittelija · **Kuvitusavain:** `solarfield`

**Vaiheet:** 04, 05 · **Hanketyypit:** solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** mixed · **Huumoritaso:** 2/3 · **Perhe:** solar

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.solarShade",
    "operator": "eq",
    "value": true
  },
  {
    "field": "solar.hectares",
    "operator": "gte",
    "value": 20
  }
]
```

### Vasemmalle: Jätetään reunavyöhyke

Kenttä pienenee 6 ha. Näkösuoja säilyy.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "solarRemove",
      "hectares": 6,
      "reason": "shaded_edge"
    },
    {
      "op": "adjust",
      "field": "trust",
      "value": 3
    },
    {
      "op": "flag",
      "key": "solarShadeAdjusted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Muutetaan rivisijoittelua

Rivisijoittelua muutetaan. Puu ei vielä saa uutta toimenkuvaa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "flag",
      "key": "solarShadeRedesignNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P034 — Lopullinen_v7_OIKEA

YVA-selostuksessa, kaavaselostuksessa ja havainnekuvissa on kolme eri rajausta. Jokaisen tiedoston nimessä lukee lopullinen. Tämä on ollut niiden ainoa yhteinen linja.

**Puhuja:** YVA-/kaavakonsultti · **Kuvitusavain:** `documents`

**Vaiheet:** 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** documents

### Vasemmalle: Tehdään yhteinen versiokierros

Aineistot synkronoidaan. Lopullisuus ei enää perustu tiedoston nimeen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 8
    },
    {
      "op": "flag",
      "key": "documentsSynced",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Korjataan kriittiset erot ensin

Kriittiset erot korjataan ensin. Täysi tarkistus jää odottamaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "flag",
      "key": "documentFullReviewNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P035 — Perusteltu täydennyspyyntö

Yhteysviranomainen nimeää vaikutusarvion keskeiset puutteet. Konsultti kertoo työn olleen valmis tarjouksen tarkoittamassa merkityksessä.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `authority`

**Vaiheet:** 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** adequacy

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.yvaRequired",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.yvaNeedsSupplement",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Täydennetään nimetyt puutteet

Nimetyt puutteet täydennetään. Tulokset tarvitaan ennen seuraavaa porttia.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -8
    },
    {
      "op": "track",
      "key": "yva",
      "value": "supplement"
    }
  ],
  "delayed": [
    {
      "jobId": "yva_supplement",
      "afterMonths": 4,
      "completionText": "Pyydetty täydennys valmistui viranomaiskäsittelyä varten.",
      "effects": [
        {
          "op": "flag",
          "key": "yvaSupplementReady",
          "value": true
        }
      ]
    }
  ]
}
```

### Oikealle: Selvitetään muuttunut vaihtoehto

Muuttunutta vaihtoehtoa tutkitaan. Pienempikin hanke tarvitsee arvioinnin.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "track",
      "key": "yva",
      "value": "supplement"
    },
    {
      "op": "flag",
      "key": "yvaAlternativeNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P036 — Aineisto riitti. Lue uudelleen.

Perusteltu päätelmä saapui. Aineisto riitti. Tiimi lukee virkkeen kolmesti varmistaakseen, ettei välistä puutu sanaa ”ei”. Johtopäätökset viedään nyt suunnitteluun.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `authority`

**Vaiheet:** 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** milestone

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** adequacy

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.yvaRequired",
    "operator": "eq",
    "value": true
  },
  {
    "field": "flags.yvaAdequacyConfirmed",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Viedään johtopäätökset kaavaan

Johtopäätökset viedään kaavan tarkistuslistalle. Tämä ei vielä ole kaavavoitto.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "yva",
      "value": "conclusion"
    },
    {
      "op": "flag",
      "key": "conclusionActionsMapped",
      "value": true
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 6
    }
  ],
  "delayed": []
}
```

### Oikealle: Käydään ehdot tiimin kanssa

Tekninen tiimi käy johtopäätökset läpi. Helpotus käytetään hyödyksi.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "yva",
      "value": "conclusion"
    },
    {
      "op": "flag",
      "key": "conclusionActionsMapped",
      "value": true
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": 5
    }
  ],
  "delayed": []
}
```

## P037 — Ei huomautettavaa

Kaavaluonnoksen kuulemisessa ei tullut kielteisiä kannanottoja. Tiimi tarkistaa ensin roskapostin. Sitten sallitaan varovainen helpotus.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `planner`

**Vaiheet:** 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** relief

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.draftFeedbackQuiet",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Kiitetään osallistumisesta

Osallistujia kiitetään. Yhteydenpitoa ei lopeteta onnistumisen vuoksi.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "trust",
      "value": 7
    },
    {
      "op": "flag",
      "key": "draftFeedbackProcessed",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Käytetään rauha viimeistelyyn

Rauha käytetään aineiston viimeistelyyn. Tällä kertaa kukaan ei keskeytä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 6
    },
    {
      "op": "flag",
      "key": "draftFeedbackProcessed",
      "value": true
    }
  ],
  "delayed": []
}
```

## P038 — Esitteessä oli väärä ranta

Mökkiläinen kysyy, mitä juuri hänen rannaltaan näkyisi. Hän on saanut jo kolme yleisesitettä ja yhden kuvan rannasta, jota ei tunnista.

**Puhuja:** Mökkiläinen · **Kuvitusavain:** `cottage`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** mixed · **Huumoritaso:** 1/3 · **Perhe:** participation

### Vasemmalle: Tehdään paikallinen kuvasovite

Paikallinen kuvasovite tilataan. Vastataan nyt siihen kysymykseen, joka esitettiin.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "adjust",
      "field": "trust",
      "value": 7
    }
  ],
  "delayed": []
}
```

### Oikealle: Järjestetään pieni keskustelu

Pieni keskustelu järjestetään. Neljättä yleisesitettä ei paineta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "trust",
      "value": 5
    },
    {
      "op": "flag",
      "key": "residentViewsRecorded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P039 — Vaalit päivittivät sidosryhmät

Vaalien jälkeen valtuustossa on kriittisempi enemmistö. Vanhan myönteisen tapaamisen muistio löytyy. Sen äänioikeus uudessa valtuustossa on rajallinen.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `planner`

**Vaiheet:** 04, 05, 06, 07 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** followup

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** politics

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.electionDue",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Esitellään myös vaihtoehdot

Vaikutukset ja vaihtoehdot esitellään uusille päättäjille.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "trust",
      "value": 3
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "flag",
      "key": "newCouncilBriefed",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Kuullaan ensin uudet tavoitteet

Uusia tavoitteita kuullaan. Edellisen valtuuston hyvä tunnelma ei siirry liitteenä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "trust",
      "value": 4
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -3
    },
    {
      "op": "flag",
      "key": "newCouncilGoalsHeard",
      "value": true
    }
  ],
  "delayed": []
}
```

## P040 — Tukea työn tekemiseen tarvitaan

Aurinkohankkeelle sopiva RENEWFM-haku on avoinna tässä pelikerrassa. Hakemus vaatii valmiutta. Valmiuden tuottaminen vaatii rahaa. Raha on hakemuksen aihe.

**Puhuja:** Omistajan edustaja · **Kuvitusavain:** `documents`

**Vaiheet:** 04, 05, 06 · **Hanketyypit:** solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** funding

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.renewfmCallEligible",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Valmistellaan ehdot täyttäen

Hakemus valmistellaan. Päätös tulee myöhemmin, ei tallennuspainikkeesta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "track",
      "key": "funding",
      "value": "applied"
    }
  ],
  "delayed": [
    {
      "jobId": "renewfm_decision",
      "afterMonths": 4,
      "completionText": "Tukihakemuksen päätös on saapunut.",
      "effects": [
        {
          "op": "flag",
          "key": "fundingDecisionReady",
          "value": true
        }
      ]
    }
  ]
}
```

### Oikealle: Kehitetään ilman tukiolettamaa

Hanketta kehitetään ilman tukiolettamaa. Hakutyö säästyy, avustusta ei oleteta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "flag",
      "key": "noGrantBaseCase",
      "value": true
    },
    {
      "op": "track",
      "key": "funding",
      "value": "notApplied"
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    }
  ],
  "delayed": []
}
```

## P041 — Hakemus oli hyvä. Ei tällä kertaa.

Tukihakemus ei saanut rahoitusta. Palaute oli kannustavaa. Talousmalli ei hyväksy kannustusta rahoituseräksi.

**Puhuja:** Omistajan edustaja · **Kuvitusavain:** `documents`

**Vaiheet:** 05, 06, 07 · **Hanketyypit:** solar, hybrid · **Tarjoaminen:** followup

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** funding

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.fundingDecisionReady",
    "operator": "eq",
    "value": true
  },
  {
    "field": "tracks.funding",
    "operator": "eq",
    "value": "applied"
  },
  {
    "field": "site.grantRejected",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Neuvotellaan vaiheistamisesta

Vaiheistamista neuvotellaan heikentyneellä talousasetelmalla.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "funding",
      "value": "rejected"
    },
    {
      "op": "adjust",
      "field": "economicsIndex",
      "value": -8
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "flag",
      "key": "fundingPhasingNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Lasketaan tueton vaihtoehto

Tueton vaihtoehto lasketaan. Hylkäys ei itsessään ole rakentamiskielto.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "funding",
      "value": "rejected"
    },
    {
      "op": "adjust",
      "field": "economicsIndex",
      "value": -8
    },
    {
      "op": "flag",
      "key": "noGrantBaseCase",
      "value": true
    }
  ],
  "delayed": []
}
```

## P042 — Kaksi tekniikkaa, yksi asema

Yhteinen sähköasema voisi säästää kustannuksia. Omistaja kysyy, saammeko molemmat huipputehot ulos yhtä aikaa. Verkkosuunnittelija avaa uuden taulukon.

**Puhuja:** Verkkosuunnittelija · **Kuvitusavain:** `substation`

**Vaiheet:** 04, 05, 06 · **Hanketyypit:** hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** hybrid

### Vasemmalle: Viedään yhteisratkaisu eteenpäin

Yhteisratkaisua viedään eteenpäin. Vientiraja selvitetään erikseen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "economicsIndex",
      "value": 5
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "flag",
      "key": "sharedGridDesignAdvanced",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Simuloidaan tuotantoprofiilit

Tuotantoprofiilit simuloidaan. Säästö ja samanaikainen vienti erotetaan toisistaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 5
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "flag",
      "key": "hybridProfileStudyNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P043 — Lyhin reitti kulkee ongelman kautta

Lyhyin johtoreitti kohtaa hankalan ylityksen. Kierto lisäisi kuusi kilometriä. Viivoitin ei tuntenut tätä paikan ominaisuutta.

**Puhuja:** Verkkosuunnittelija · **Kuvitusavain:** `map`

**Vaiheet:** 04, 05, 06, 07 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** mixed · **Huumoritaso:** 1/3 · **Perhe:** grid

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "site.gridCrossingConflict",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Kierretään kuusi kilometriä

Johto pitenee 6 km. Uuden reitin selvitykset ovat vielä edessä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "gridDistance",
      "deltaKm": 6
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "flag",
      "key": "gridRouteStudyNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Tutkitaan alkuperäinen ylitys

Alkuperäisen ylityksen erikoisratkaisua tutkitaan.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -7
    },
    {
      "op": "flag",
      "key": "gridCrossingStudyNeeded",
      "value": true
    }
  ],
  "delayed": []
}
```

## P044 — Ostaja kysyi hintaa, ei liitettä

Sähkön ostaja kiinnostui hankkeesta. Ensimmäinen kysymys koski toimitusta eikä selvityksen liitenumeroa. Tiimi tarvitsee hetken sopeutuakseen.

**Puhuja:** Omistajan edustaja · **Kuvitusavain:** `finance`

**Vaiheet:** 06, 07 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** commercial

### Vasemmalle: Neuvotellaan vakaa sopimus

Sopimusneuvottelu alkaa. Kiinnostus ei vielä ole rahoitussitoumus.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": 6
    },
    {
      "op": "flag",
      "key": "ppaNegotiationsStarted",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Pyydetään useampi tarjous

Useampi tarjous pyydetään. Hyvää uutista saa myös kilpailuttaa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    },
    {
      "op": "flag",
      "key": "ppaCompetitionStarted",
      "value": true
    }
  ],
  "delayed": []
}
```

## P045 — Viimeinen tarkistus. Tällä kertaa.

Kaavaehdotus on menossa päätöksentekoon. Tarkistuslistalla ovat kartta, vastineet, kuulemiset ja kokousmenettely. Listan viimeinen kohta on tarkistaa lista.

**Puhuja:** Lakiasiantuntija · **Kuvitusavain:** `documents`

**Vaiheet:** 07 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 1/3 · **Perhe:** documents

### Vasemmalle: Tehdään yhteinen loppu-QA

Yhteinen lopputarkistus tehdään ennen esityslistaa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 7
    },
    {
      "op": "flag",
      "key": "finalQaDone",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Tehdään riippumaton tarkistus

Riippumaton tarkastaja käy aineiston läpi. Oma tuttuus ei toimi tarkistusmenetelmänä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -6
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 8
    },
    {
      "op": "flag",
      "key": "finalQaDone",
      "value": true
    }
  ],
  "delayed": []
}
```

## P046 — Kaava hyväksytty. Oikeasti.

Valtuusto hyväksyi kaavan. Kampanjan tavoite saavutettiin. Tiimi odottaa täydennyspyyntöä vielä hetken tottumuksesta. Lainvoima ja investointi ovat seuraavia asioita.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `celebration`

**Vaiheet:** 08 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** milestone

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** victory

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.adoptionDecisionPositive",
    "operator": "eq",
    "value": true
  },
  {
    "field": "flags.adoptionGatesSatisfied",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Kootaan kehitystulos

Kehitystulos kootaan: alku, loppu ja avoimet jatkoasiat. Nyt saa iloita.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "finish",
      "ending": "planAdopted"
    }
  ],
  "delayed": []
}
```

### Oikealle: Käydään ratkaisut tiimin kanssa

Päätöshistoria käydään läpi. Pöytäkirjaan kirjataan myös onnistuminen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "finish",
      "ending": "planAdopted"
    }
  ],
  "delayed": []
}
```

## P047 — Väärä henkilö jäi oikeaan huoneeseen

Vain erillisessä jatkopelissä: päätöksentekomenettelyn virhe kumosi kaavapäätöksen. Sisältöä hiottiin vuosia. Kokousmenettely tarvitsi sekin tarkistajan.

**Puhuja:** Lakiasiantuntija · **Kuvitusavain:** `documents`

**Vaiheet:** 08 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** epilogue

**Sävy:** challenge · **Huumoritaso:** 1/3 · **Perhe:** procedure

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.epilogueEnabled",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.proceduralReversal",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Palataan lailliseen käsittelyyn

Korjaavaa käsittelyä valmistellaan. Jatkamisen edellytykset arvioidaan uudelleen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **6 kk**.

```json
{
  "effects": [
    {
      "op": "track",
      "key": "municipality",
      "value": "reprocessing"
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -10
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -10
    }
  ],
  "delayed": []
}
```

### Oikealle: Lopetetaan kehitystyö

Kehitystyö lopetetaan. Arkiston nimeksi ei laiteta ”lähes valmis”.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "finish",
      "ending": "developerWithdraws"
    }
  ],
  "delayed": []
}
```

## P048 — Hybridi etsii itseään

Hybridin muuttamista on selvitetty. Jatketaanko vain tuulella vai vain auringolla? Yhteistyö oli hyvä idea. Myös yhteiset ongelmat osoittautuivat yhteisiksi.

**Puhuja:** Omistajan edustaja · **Kuvitusavain:** `finance`

**Vaiheet:** 04, 05, 06, 07 · **Hanketyypit:** hybrid · **Tarjoaminen:** followup

**Sävy:** mixed · **Huumoritaso:** 1/3 · **Perhe:** hybrid

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.hybridPivotAvailable",
    "operator": "eq",
    "value": true
  },
  {
    "field": "flags.pivotUsed",
    "operator": "eq",
    "value": false
  }
]
```

### Vasemmalle: Jatketaan vain tuulella

Aurinko poistuu. Tuulen ja jäljelle jäävän verkon ehdot tarkistetaan uudelleen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "pivot",
      "mode": "wind"
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "flag",
      "key": "pivotUsed",
      "value": true
    }
  ],
  "delayed": []
}
```

### Oikealle: Jatketaan vain auringolla

Tuuli poistuu. Auringon ja yhteisten kustannusten ehdot tarkistetaan uudelleen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "pivot",
      "mode": "solar"
    },
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "flag",
      "key": "pivotUsed",
      "value": true
    }
  ],
  "delayed": []
}
```

## H001 — Selvitys selvitystarpeesta

Tyhjän varastokopin purusta pyydetään laaja maisemaselvitys. Sen tarpeellisuus voitaisiin kuulemma ratkaista alustavalla selvityksellä selvitystarpeesta.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `authority`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 3/3 · **Perhe:** scope

### Vasemmalle: Tilaa suppea alustava arvio

Pieni toimeksianto käynnistyy. Varsinainen pyyntö on yhä auki.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    },
    {
      "op": "queueCard",
      "cardId": "H002",
      "delayMonths": 1
    }
  ],
  "delayed": []
}
```

### Oikealle: Pyydä kirjallinen rajaus

Pyydät perustelut ja rajatun toimeksiannon ennen tilaamista.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -1
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -2
    },
    {
      "op": "queueCard",
      "cardId": "H003",
      "delayMonths": 1
    }
  ],
  "delayed": []
}
```

## H002 — Myös puuttuvat vaikutukset

Alustavan arvion mukaan kopin purulla ei ole olennaisia maisemavaikutuksia. Nyt pyydetään taulukko vaikutuksista, joita ei löytynyt. Tyhjää taulukkoa ei suositella.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `authority`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** followup

**Sävy:** challenge · **Huumoritaso:** 3/3 · **Perhe:** scope

### Vasemmalle: Taulukoi arvioidut asiat

Kierros suljetaan selkeällä yhteenvedolla. Koppi ei ehtinyt muuttua.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    }
  ],
  "delayed": []
}
```

### Oikealle: Sovi tarpeellinen rajaus

Yhteisessä käsittelyssä sovitaan, mitä yhteenvetoon tarvitaan. Asia saadaan pois pöydältä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -1
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -2
    }
  ],
  "delayed": []
}
```

## H003 — Suppeampi tosiaan riittää

Kirjallista rajausta pyydettyäsi asiantuntija tarkistaa kohteen: kopista riittää lyhyt kuvaus ja valokuva. Kukaan ei määrää lisäkokousta. Tarkistat viestin lähettäjän.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `authority`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** followup

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** scope

### Vasemmalle: Tee rajattu muistio

Pieni asia saa pienen muistion. Selvityskierre päättyy tähän.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -1
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    }
  ],
  "delayed": []
}
```

### Oikealle: Liitä kuva nykyiseen aineistoon

Kuvaus yhdistetään olemassa olevaan aineistoon. Erillinen raportti vältetään.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": 2
    }
  ],
  "delayed": []
}
```

## H004 — Raja on epäilyttävän paksu

Karttaviivan paksuus herättää kysymyksen siitä, kuuluuko hanke viivan sisä- vai ulkoreunaan. Koordinaatit ovat liitteenä. Niitä ei ole vielä avattu.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `map`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 3/3 · **Perhe:** map

### Vasemmalle: Lähetä koordinaatit ja uusi kartta

Aineisto selkeytetään. Hankeraja ei muutu, vain sen esitystapa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    }
  ],
  "delayed": []
}
```

### Oikealle: Käy rajaus yhdessä läpi

Kartta avataan yhteisessä istunnossa. Samat koordinaatit tulevat nyt nähdyiksi.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "patience",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 1
    }
  ],
  "delayed": []
}
```

## H005 — Kuiva sää ei ollut tarpeeksi märkä

Vesiarvioon pyydetään havainto märältä jaksolta. Käytettävissä oleva havainto on märältä paikalta kuivalla jaksolla. Sää ei ole vastannut täydennyspyyntöön.

**Puhuja:** Vesiasiantuntija · **Kuvitusavain:** `wetland`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** water

### Vasemmalle: Sovi lisähavainnon aikataulu

Lisähavainto sovitetaan ohjelmaan. Tarve pidetään näkyvissä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    }
  ],
  "delayed": []
}
```

### Oikealle: Arvioi nykyisen näytön riittävyys

Asiantuntija kokoaa rajatun perustelun nykyisen aineiston käyttökelpoisuudesta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 1
    }
  ],
  "delayed": []
}
```

## H006 — Kuva puun takaa

Havainnekuvaa pyydetään pisteestä, jossa tiheä kuusikko peittää koko näkymän. Pyytäjä haluaa kuvan myös ilman puita. Maanomistaja haluaa kuusikon.

**Puhuja:** Maisema-asiantuntija · **Kuvitusavain:** `windscape`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 3/3 · **Perhe:** landscape

### Vasemmalle: Esitä molemmat tilanteet

Nykytila ja havainnollistava näkymä erotellaan. Kumpaakaan ei esitetä toisena.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    }
  ],
  "delayed": []
}
```

### Oikealle: Sovi edustavampi kuvauspiste

Kuvauspisteen tarkoitus täsmennetään ennen uutta kuvausta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -1
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -2
    }
  ],
  "delayed": []
}
```

## H007 — Havainto oli kauppakassi

Epäselvä tumma hahmo maastokuvassa osoittautui oksaan juuttuneeksi kauppakassiksi. Luontokonsultti varmisti asian. Kassia ei lisätä lajilistaan.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `ecologist`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** falseAlarm

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.ecologyReady",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Kirjaa tarkistus aineistoon

Virhetulkinta dokumentoidaan. Kassi ei muuta alueen muita havaintoja.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    }
  ],
  "delayed": []
}
```

### Oikealle: Kerro tarkennus tiimille

Tiimi saa yhden aiheen vähemmän murehdittavaksi. Muut luontoasiat säilyvät.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "patience",
      "value": 3
    }
  ],
  "delayed": []
}
```

## H008 — Kaksi lausuntoa, kaksi suuntaa

Yksi lausunto kehottaa keskittämään rakenteet. Toinen pyytää hajauttamaan ne. Kumpikin pitää omaa ratkaisuaan kokonaisuuden kannalta selkeänä.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `documents`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 3/3 · **Perhe:** conflictingAdvice

### Vasemmalle: Kutsu yhteinen ratkaisupalaveri

Tavoitteet asetetaan rinnakkain. Molempien lausuntojen tulkinta täsmentyy.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 4
    }
  ],
  "delayed": []
}
```

### Oikealle: Teetä kaksi rajattua vaihtoehtoa

Vaihtoehdot tehdään vertailukelpoisiksi ennen yhteensovittamista.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -5
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 5
    }
  ],
  "delayed": []
}
```

## H009 — Muille sopii, kaikille ei

Viranomaisneuvotteluun löytyi aika, joka sopii kaikille paitsi kutsun lähettäjälle. Hän osallistuu toisesta samanaikaisesta neuvottelusta.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `planner`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** meeting

### Vasemmalle: Valtuuta valmistautunut sijainen

Sijainen saa aineiston ja kysymykset. Kokous voi edetä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 1
    }
  ],
  "delayed": []
}
```

### Oikealle: Etsi uusi yhteinen aika

Kokous siirtyy. Kaikkien osallistuminen saadaan järjestettyä.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "patience",
      "value": -2
    }
  ],
  "delayed": []
}
```

## H010 — Ei lisättävää. Kahdesti.

Lausunnossa lukee ”ei lisättävää”. Edellisessäkin luki niin. Konsultti ehdottaa lyhyttä tarkistusta, ettei kyseessä ole väärä liite.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `authority`

**Vaiheet:** 05, 06, 07 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** relief

### Vasemmalle: Arkistoi ja jatka valmistelua

Käsitelty asia ei saa ylimääräistä työryhmää.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "patience",
      "value": 4
    }
  ],
  "delayed": []
}
```

### Oikealle: Varmista viite ja päivitä lista

Viite oli oikein. Tarkistuslista voidaan sulkea tältä osin.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    }
  ],
  "delayed": []
}
```

## H011 — Tilaa löytyy, mutta myöhemmin

Verkkosuunnittelijan mukaan vaihtoehto voisi sopia tulevaan vahvistukseen. Sana ”tuleva” puuttuu yhtiön investointiaikataulusta.

**Puhuja:** Verkkosuunnittelija · **Kuvitusavain:** `substation`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 2/3 · **Perhe:** grid

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.gridResponseReady",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Sovita hankkeen aikataulu

Riippuvuus tehdään näkyväksi. Yhteys ei tällä päätöksellä varmistu.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **2 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -4
    }
  ],
  "delayed": []
}
```

### Oikealle: Selvitä toinen aikataulupolku

Vaihtoehtoja selvitetään nykyisen rinnalle ilman kapasiteettilupausta.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -4
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    }
  ],
  "delayed": []
}
```

## H012 — Hyvä uutinen tarvitsee kuvan

Omistaja pyytää onnistumisesta yhden selkeän kalvon. Sen pitää sisältää kaikki riskit mutta näyttää rauhalliselta.

**Puhuja:** Omistajan edustaja · **Kuvitusavain:** `finance`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** work · **Huumoritaso:** 2/3 · **Perhe:** management

### Vasemmalle: Esitä päätulos ja avoimet asiat

Yksi luettava kalvo valmistuu. Riskit eivät katoa värivalinnalla.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "patience",
      "value": 3
    }
  ],
  "delayed": []
}
```

### Oikealle: Liitä myös tekninen kooste

Yhteenveto saa taustan. Yhden kalvon kokous kestää hieman kauemmin.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    }
  ],
  "delayed": []
}
```

## H013 — Peuran aikataulu ei siirry

Metsäpeura-aineiston käsittelyyn pyydetään tarkennus. Lisätyön aikataulu osuu sopimusten uusimiseen. Kahdesta kalenterista vain toinen on neuvoteltavissa.

**Puhuja:** Luontoasiantuntija · **Kuvitusavain:** `reindeer`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** hybrid · **Tarjoaminen:** ambient

**Sävy:** mixed · **Huumoritaso:** 2/3 · **Perhe:** reindeer

**Kaikkien ehtojen täytyttävä:**

```json
[
  {
    "field": "flags.ecologyReady",
    "operator": "eq",
    "value": true
  },
  {
    "field": "site.reindeerConflict",
    "operator": "eq",
    "value": true
  }
]
```

### Vasemmalle: Yhteensovita selvitys ja sopimukset

Työjärjestys tarkennetaan. Nykyinen luontokysymys pysyy avoimena.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -3
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    }
  ],
  "delayed": []
}
```

### Oikealle: Rajaa tarkennus nykyiseen näyttöön

Asiantuntija täsmentää, mihin aineisto riittää ja mitä jää auki.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": -2
    }
  ],
  "delayed": []
}
```

## H014 — Neutraali harmaa ei ole neutraali

Aurinkokentän karttavärin sanotaan vähättelevän maisemamuutosta. Tummempi väri taas korostaa sitä. Paneelit eivät ole vielä edes maastossa.

**Puhuja:** Kunnan kaavoittaja · **Kuvitusavain:** `solarfield`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** challenge · **Huumoritaso:** 3/3 · **Perhe:** map

### Vasemmalle: Esitä värit ja vaikutukset erikseen

Karttamerkintä selitetään. Varsinainen vaikutusarvio ei perustu värin miellyttävyyteen.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    }
  ],
  "delayed": []
}
```

### Oikealle: Käy esitystapa yhdessä läpi

Karttamerkinnästä sovitaan. Paneeliala ei muutu keskustelussa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **1 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "patience",
      "value": -2
    },
    {
      "op": "adjust",
      "field": "trust",
      "value": 2
    }
  ],
  "delayed": []
}
```

## H015 — Konsultti korjasi laskun alaspäin

Konsultti löysi laskusta päällekkäisen rivin ja palauttaa osan maksusta. Taloushallinto varmistaa, että plusmerkki on tarkoituksellinen.

**Puhuja:** YVA-/kaavakonsultti · **Kuvitusavain:** `consultant`

**Vaiheet:** 03, 04, 05, 06 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** refund

### Vasemmalle: Palauta summa kehitysbudjettiin

Kaksi budjettipistettä palautuu. Tämä oli oikea säästö, ei uusi oletus.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "budget",
      "value": 2
    }
  ],
  "delayed": []
}
```

### Oikealle: Käytä hyvitys rajattuun tarkistukseen

Hyvitys käytetään sovittuun pieneen lisätyöhön. Budjetti ei samalla kasva.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    }
  ],
  "delayed": []
}
```

## H016 — Asiantuntija sanoi: riittää

Viranomaisen asiantuntija katkaisee lisäselvitysidean: kysymys on jo käsitelty riittävästi tässä aineistossa. Tiimi ei heti löydä tästä syntyvää tehtävää.

**Puhuja:** Yhteysviranomainen · **Kuvitusavain:** `authority`

**Vaiheet:** 05, 06, 07 · **Hanketyypit:** wind, solar, hybrid · **Tarjoaminen:** ambient

**Sävy:** positive · **Huumoritaso:** 2/3 · **Perhe:** relief

### Vasemmalle: Sulje kyseinen työlistan kohta

Aineisto selkeytyy. Yksittäisen asian riittävyys ei ratkaise koko kaavaa.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 2
    },
    {
      "op": "adjust",
      "field": "patience",
      "value": 2
    }
  ],
  "delayed": []
}
```

### Oikealle: Varmista rajaus seuraavaan vaiheeseen

Sovittu rajaus kirjataan jatkovalmisteluun.

Aika etenee valinnan käsittelyjärjestyksen mukaisesti: **0 kk**.

```json
{
  "effects": [
    {
      "op": "adjust",
      "field": "quality",
      "value": 3
    }
  ],
  "delayed": []
}
```
