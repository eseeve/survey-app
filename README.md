# Survey App

Survey App -sivulla voi luoda erilaisia kyselyitä ja tietovisoja. Käyttäjät voivat vastata toisten käyttäjien kyselyihin ja kerätä dataa omilla kyselyillä. Sovelluksen frontendinä toimii [React](https://reactjs.org/), backendinä [Node.js](https://nodejs.org/en/) ja tietokantana [MongoDB](https://www.mongodb.com/cloud/atlas). Tämä sovellus on julkaistu [Herokuun](https://www.heroku.com/). Toteutettu Full Stack -websovelluskehitys harjoitustyönä.

[Survey App (Heroku)](https://survey-app-seeve.herokuapp.com/)  
[Asennus ja komennot](https://github.com/eseeve/survey-app/blob/master/README.md#asennus-ja-komennot)  
[Käyttöohjeet](https://github.com/eseeve/survey-app/blob/master/README.md#k%C3%A4ytt%C3%B6ohjeet)  
[Työaikakirjanpito](https://github.com/eseeve/survey-app/blob/master/README.md#ty%C3%B6aikakirjanpito)  
[Lisenssi](https://github.com/eseeve/survey-app/blob/master/LICENSE.txt)

# Asennus ja komennot 

Frontendin ja Backendin riippuvuuksien asennus:  

    npm install
    cd survey-frontend  
    npm install  

Tämän jälkeen frontendin ja backendin voi käynnistää komennolla `npm start`.  
Sovellus vaatii toimiakseen seuraavat ympäristömuuttujat .env tiedostossa:  

- MONGODB_URI: Tietokannan URI-osoite
- SECRET: webtokenien allekirjoitukseen käytetty merkkijono
- PORT: backendin portti

Seuraavia komentoja voi käyttää projektin juuressa:

### `npm run dev`

Käynnistää backendin sovelluskehitysmoodissa käyttäen nodemonia, eli backend uudelleenkäynnistyy automaattisesti muutosten jälkeen. Konsoliin tulostuu backendiin saapuvat HTTP-komennot ja niiden tiedot.

### `npm run start:test`

Käynnistää backendin testimoodissa käyttäen testitietokantaa. Testitietokanta tulee olla määriteltynä ympäristömuuttujissa.

### `npm test -- survey-backend/tests/survey_api.test.js`

Suorittaa backendin yksikkötestit.

Sovelluksen End-to-End testit voi suorittaa Cypressillä. Frontend tulee olla käynnissä ja backend testimoodissa, jonka jälkeen survey-frontend/ kansiossa voi suorittaa komennon `npm run cypress:open`.

# Käyttöohjeet

## Käyttäjän luominen ja kirjautuminen

### Käyttäjän luominen

Survey App vaatii kirjautumisen kyselyiden luomiseen ja vastaamiseen. Käyttäjän luominen tapahtuu kirjautumisivulla klikkaamalla *Login* -napin alapuolella olevaa linkkiä.

![login](https://user-images.githubusercontent.com/59598363/88786923-cac0f200-d19b-11ea-8dcf-f5ee305dc659.png)

Käyttäjän luomiseen tarvitaan oma nimi, käyttäjänimi, salasana ja salasanan vahvistus. Käyttäjän luominen tapahtuu painamalla *Sign Up*, jonka jälkeen *Login to Application* -sivulta pystyy kirjautumaan Survey Appiin.

![signup](https://user-images.githubusercontent.com/59598363/88882911-93098700-d23b-11ea-9999-894f255acdb2.png)

### Kirjautuminen

Käyttäjän luomisen jälkeen sivulle pystyy kirjautumaan syöttämällä käyttäjätunnukset ja painamalla *Login*.

![login1](https://user-images.githubusercontent.com/59598363/88882891-87b65b80-d23b-11ea-9d25-7163950fbc7a.png)

## Surveys

Kirjautumisen jälkeen avautuu *Surveys* -näkymä, jossa pystyy luomaan uusia kyselyitä ja vastaamaan käyttäjien kyselyihin.

![surveys](https://user-images.githubusercontent.com/59598363/88882044-bc291800-d239-11ea-841f-d91b7ef34b68.png)

### Kyselyn luominen

Painamalla *Surveys* -sivulla nappia *Create a new survey* pääsee luomaan uuden kyselyn. Kyselyn luomiseen tarvitaan nimi ja kysymyksiä. Kyselylle voi myös kirjoittaa halutessaan kuvauksen *Description* -kenttään. Uusien kysymyksien lisäys kyselyyn tapahtuu painamalla *Add Question*. Kyselyyn voi myös lisätä lineaarisen skaalan painamalla *Add Linear Scale*. Jos kyselyn luomisen haluaa aloittaa alusta, tulee painaa *Clear Values*.

![newsurvey](https://user-images.githubusercontent.com/59598363/88882396-8d5f7180-d23a-11ea-9876-b110dfb3b8f3.png)

Kysymyksen luomiseen tarvitaan otsikko, kysymystyyppi ja vastausvaihtoehtoja. *Multiple Choice* -kysymyksiin vastaaja voi valita vain yhden vaihtoehdoista, kun taas *Checkboxes* -kysymyksiin voi valita useamman vaihtoehdon. Kysymykseen lisätään vaihtoehtokenttiä painamalla *Add Option*. Vaihtoehtoja voi poistaa kenttien vieressä olevista harmaista rasteista. Kysymyksen voi myös tehdä avoimeksi lisäämällä rastin ruutuun *Add 'other'*. Tällöin vastaaja voi kirjoittaa oman vastauksen vastatessaan kyselyyn, jos jokin vaihtoehdoista ei sovi hänelle. Koko kysymyksen voi poistaa painamalla kysymyksen oikeassa yläkulmassa olevaa punaista roskakori -ikonia.

![surveyquestion](https://user-images.githubusercontent.com/59598363/88883039-f3002d80-d23b-11ea-86a4-e4d777dd1391.png)

Lineaarisen skaalan luomiseen tarvitaan otsikko, sekä aloitus -ja lopetusarvo. Skaala voi alkaa arvoilla 0-1 ja loppua arvoilla 2-10. Esimerkiksi jos valitsee väliksi 1-5, niin kyselyn vastaaja voi valita kysymyksen vastaukseksi minkä tahansa arvon välillä 1-5. Normaalin kysymyksen tapaan lineaarisen skaalan voi poistaa painamalla skaalan oikeassa yläkulmassa olevaa punaista roskakori -ikonia.

![surveylinear](https://user-images.githubusercontent.com/59598363/88883674-9aca2b00-d23d-11ea-9058-7592ce1942cd.png)

Kun kysely on valmis, sen voi julkaista painamalla *Submit*.

### Kyselyyn vastaaminen

Painamalla *Surveys* -sivulla kyselyn *Take Survey* -nappia, pääsee vastaamaan kyselyyn. Kyselyn jokaiseen kysymykseen tulee vastata ennen kuin kyselyn voi palauttaa painamalla *Submit*. *Multiple Choice* -kysymyksiin voi valita yhden vaihtoehdoista (ks. kuva alla, ensimmäinen kysymys). *Checkboxes* -kysymyksiin voi valita yhden tai useamman vastauksen (ks. kuva alla, toinen kysymys). *Linear Scale* -kysymyksiin voi valita yhden vaihtoehdoista annetulla välillä (ks. kuva alla, viimeinen kysymys).

![takesurvey](https://user-images.githubusercontent.com/59598363/88884668-c1896100-d23f-11ea-9d94-533f1a74ed1e.png)

Avoimeen kysymykseen voi valita oman vaihtoehdon kirjoittamalla *Other* -kenttään vastauksen ja painamalla *Add*, jonka jälkeen kysymykseen tulee valittavaksi uusi vaihtoehto.

![takesurvey1](https://user-images.githubusercontent.com/59598363/88884790-001f1b80-d240-11ea-8cc5-9d3c8b355fa6.png)

### Kyselyiden järjestely ja etsiminen

*Surveys* -sivulla kyselyitä voi etsiä kirjoittamalla *Search* -kenttään joko kyselyn tai käyttäjän nimen, jolloin sivulla näytetään vain hakutulokseen vastaavat kyselyt.

![searchsurvey](https://user-images.githubusercontent.com/59598363/88885314-f813ab80-d240-11ea-9a89-c3b46d494fa2.png)

Kyselyt voi myös järjestää vastausten tai käyttäjien mukaan, esimerkiksi painamalla *Sort By* ja *Least Responses*, jolloin ensimmäisenä näytetään vähiten vastauksia keränneet kyselyt.

![sortsurvey](https://user-images.githubusercontent.com/59598363/88885489-4628af00-d241-11ea-820c-4b3ce9bf0b4b.png)

## Quizzes

*Surveys* -sivulta pystyy vaihtamaan *Quizzes* -puolelle painamalla nappia *Quizzes*. Takaisin *Surveys* -puolelle pääsee vastaavasti painamalla *Quizzes* -sivun nappia *Surveys*. Tällä sivulla pystyy luomaan uusia tietovisoja ja vastaamaan käyttäjien tietovisoihin.

![quizzes](https://user-images.githubusercontent.com/59598363/88888353-d3bacd80-d246-11ea-808a-0d744377c708.png)

### Tietovisan luominen

Painamalla *Quizzes* -sivulla nappia *Create a new quiz* pääsee luomaan uuden tietovisan. Tietovisan luomiseen tarvitaan nimi ja kysymyksiä. Tietovisalle voi myös kirjoittaa halutessaan kuvauksen *Description* -kenttään. Uusien kysymyksien lisäys kyselyyn tapahtuu painamalla *Add Question*. Jos kyselyn luomisen haluaa aloittaa alusta, tulee painaa *Clear Values*.

![newquiz](https://user-images.githubusercontent.com/59598363/88888620-56438d00-d247-11ea-8490-a95dfb0152b1.png)

Kysymyksen luomiseen tarvitaan otsikko, oikea vastausvaihtoehto ja neljä vastausvaihtoehtoa. Kysymykseen tulee kirjoittaa neljä eri vaihtoehtoa A, B, C ja D, jonka jälkeen *Correct Option* -menusta valitaan kysymyksen oikea vastaus. Koko kysymyksen voi poistaa painamalla kysymyksen oikeassa yläkulmassa olevaa punaista roskakori -ikonia.

![quizquestion](https://user-images.githubusercontent.com/59598363/88889188-6a3bbe80-d248-11ea-9693-1f2bb43396c4.png)

Kun kysely on valmis, sen voi julkaista painamalla *Submit*.

### Tietovisaan vastaaminen

Painamalla *Quizzes* -sivulla tietovisan *Take Quiz* -nappia, pääsee vastaamaan tietovisaan. Tietovisan jokaiseen kysymykseen tulee vastata ennen kuin sen voi palauttaa painamalla *Submit*. Jokaiseen kysymykseen on yksi oikea vastaus. 

![takequiz](https://user-images.githubusercontent.com/59598363/88890218-fd292880-d249-11ea-80a4-f14e492c6bc3.png)

Kun tietovisan on palauttanut, pääsee *Score* -näkymään, jossa näkyy vastaajan pisteet ja kysymyskohtaiset vastaukset. Jokaisesta kysymyksestä voi saada yhden pisteen, jolloin täydet pisteet vastaavat kysymysten määrää. *Score* -sivulla näkyy tietovisan oikeat vastaukset ja mitkä kysymykset vastaaja sai oikein. Vastaaja voi halutessaan vastata tietovisaan uudelleen painamalla *Take 'quiz name' again*, tai palata takaisin *Quizzes* -sivulle painamalla *Back to quizzes*.

![score](https://user-images.githubusercontent.com/59598363/88890572-7b85ca80-d24a-11ea-925b-c932eb3f19d0.png)

### Tietovisojen järjestely ja etsiminen

Tietovisojen etsiminen ja järjestäminen toimii samalla tavalla kuin kyselyidenkin. Ks. [Kyselyiden järjestely ja etsiminen](https://github.com/eseeve/survey-app/blob/master/README.md#kyselyiden-j%C3%A4rjestely-ja-etsiminen).

## Menu

Sovelluksen oikeassa yläkulmassa on *Menu*, joka sisältää navigointivaihtoehtoja ja muita ominaisuuksia, kuten dark mode ja uloskirjautuminen. 

![menu](https://user-images.githubusercontent.com/59598363/88894538-ae32c180-d250-11ea-8a4f-e48a5bec476c.png)

### Navigointi

Sovelluksen kotisivuna on *Surveys*. Kotisivulla *Menu* -valikossa navigointivaihtoehtona on *My Surveys*, jota painamalla pääsee omien kyselyiden ja tietovisojen sivulle. Muilla sovelluksen sivuilla navigointivaihtoehtona on *Home*, joka vie takaisin *Surveys* -sivulle. Uloskirjautuneena uutta käyttäjää luodessa *Home* vie käyttäjän takaisin kirjautumissivulle. 

![menu1](https://user-images.githubusercontent.com/59598363/88895332-6ceee180-d251-11ea-8034-77ebe3c01f6f.png)

### Dark mode

*Menu* -valikon *Dark mode* -nappi vaihtaa sivun ulkoasun mustan ja valkoisen välillä. Dark mode -asetus tallentuu selaimeen ja pysyy samana kun selaimen käynnistää uudelleen.

![darkmode](https://user-images.githubusercontent.com/59598363/88896188-28b01100-d252-11ea-9a09-f68b530b7c91.png)

### Info

*Menu* -valikon *Info* -nappi vie käyttäjän käyttöohje-sivulle projektin GitHub repoon, eli tälle sivulle.

### Uloskirjautuminen

*Menu* -valikon *Logout* -nappia painamalla käyttäjä voi kirjautua ulos sovelluksesta. *Logout* vie käyttäjän takaisin kirjautumissivulle.

## My Surveys

Sovelluksen *My Surveys* -sivulle pääsee kotisivulla painamalla *Menu* -valikon *My Surveys* -nappia. Sivulla näkyy kaikki käyttäjän luomat kyselyt ja tietovisat, sekä vaihtoehdot vaihda salasana ja poista käyttäjätili.

![mysurveys](https://user-images.githubusercontent.com/59598363/88901663-bba07980-d259-11ea-9fb8-c6bc8fd72a6c.png)

### Kyselyn tai tietovisan editointi

Jokaista kyselyä tai tietovisaa voi muokata sen luomisen jälkeen painamalla *Edit Survey* -nappia *My Surveys* -sivulla. Muokkausnäkymä on samanlainen kuin uutta kyselyä tai tietovisaa luodessa, mutta sen kentät on täytetty jo valmiiksi luotujen kysymysten mukaan. Kyselyyn tai tietovisaan voi tällä sivulla lisätä tai poistaa kysymyksiä, tai muokata entisiä kysymyksiä. Jos muokkauksia ei halua tallentaa, *Menu* -valikosta voi palata takaisin kotisivulle. Kun muokkaus on valmis ja muutokset halutaan tallentaa, voi painaa sivun alakulmassa olevaa *Submit* -nappia.

![editsurvey](https://user-images.githubusercontent.com/59598363/88902160-7cbef380-d25a-11ea-91d6-45ae7e40a5d9.png)

### Kyselyn tai tietovisan poistaminen

Kyselyn tai tietovisan poistaminen tapahtuu painamalla *Delete Survey* tai *Delete Quiz*. Poistaminen tulee vahvistaa painamalla uudesta ikkunasta *OK* jos haluaa jatkaa kyselyn tai tietovisan poistamista. Tapahtuman voi myös peruuttaa painamalla *Peruuta/Cancel*.

![deletesurvey](https://user-images.githubusercontent.com/59598363/88902564-1090bf80-d25b-11ea-9ef3-842c6abdb766.png)

### Kyselyn tai tietovisan linkin kopiointi

Kyselyn tai tietovisan linkin voi kopioida *Copy link* -napista, jolloin linkki kopioituu leikepöydälle, josta sen voi jakaa muille tai avata uuteen ikkunaan.

### Kyselyn tulokset

Kyselyn tulokset löytyy painamalla *My Surveys* -sivulla kyselyn *View results* -linkkiä. Tuloksissa näkyy vastaajien määrä, mahdollisuus tilata vastausilmoituksen sähköpostiin, sekä kysymyskohtaiset tilastot vastauksista. Alla kuva *Multiple Choice* -kysymyksen graafista. 

![surveyresult](https://user-images.githubusercontent.com/59598363/88903467-6d40aa00-d25c-11ea-90b0-aab977ef6e6b.png)

Kyselyn vastaukset voi myös nollata painamalla viimeisen kysymyksen alla olevasta napista *Delete Responses*, jolloin kaikki kerätty data kysymyksistä poistetaan. Alla kuva *Linear Scale* -kysymyksen graafista ja *Delete Responses* -napista.

![surveyresult1](https://user-images.githubusercontent.com/59598363/88903862-feb01c00-d25c-11ea-97a2-82e3dbf49d88.png)

Kyselyn vastauksien ilmoitukset voi myös tilata, jolloin kyselylle annettuun sähköpostiin saapuu ilmoitus kyselyn uudesta vastauksesta ja kyselyn vastaajasta. Kysely tilataan painamalla *Subscribe*, jonka jälkeen uuden ikkunan *Email* -kenttään kirjoitetaan haluttu sähköpostiosoite, joka tallennetaan painamalla *Subscribe*. Tilauksen voi peruuttaa painamalla kyselyn tulossivulla *Unsubscribe* tilauksen jälkeen, jolloin sähköpostiosoite poistetaan kyselystä.

![subscribe](https://user-images.githubusercontent.com/59598363/88904355-a75e7b80-d25d-11ea-9d03-e580f695be25.png)

### Tietovisan tulokset

Tietovisan tulokset löytyy painamalla *My Surveys* -sivulla tietovisan *View results* -linkkiä. Tuloksissa näkyy vastaajien määrä, mahdollisuus tilata vastausilmoituksen sähköpostiin, tilastoja vastauksista ja pisteistä, sekä kysymyskohtaiset tilastot vastauksista. Tilastoissa näkyy pisteiden keskiarvo, mediaani ja vaihteluväli. Tilastoissa näkyy myös tietovisan vastaajien pistemäärien jakauma. 

![quizresults](https://user-images.githubusercontent.com/59598363/88905638-286a4280-d25f-11ea-939c-0ee9ebd39699.png)

Kysymysten vastausten jakaumat näkyvät *Questions* -osiossa. Kysymysten graafeissa näkyy oikeiden vastausten määrä verrattuna kaikkiin vastauksiin ja oikeiden vastausten jakauma. Oikea vastaus on graafissa väritetty vihreällä ja väärät vastaukset harmaalla.

![quizresults1](https://user-images.githubusercontent.com/59598363/88906210-d544bf80-d25f-11ea-9813-78f3b6929357.png)

Tietovisan vastausten nollaaminen ja tilaaminen tapahtuu samalla tavalla kuin kyselyiden. Ks. [Kyselyn tulokset](https://github.com/eseeve/survey-app/blob/master/README.md#kyselyn-tulokset)

### Salasanan vaihto

Käyttäjätilin salasanan voi vaihtaa painamalla *Change Your Password* -nappia *My Surveys* -sivulla. Uuden salasanan voi kirjoittaa *New Password* -kenttään. Salasanan voi vaihtaa varmistettua sen *Confirm New Password* -kenttään ja painamalla *Change Password*.

![changepassword](https://user-images.githubusercontent.com/59598363/88907211-0d98cd80-d261-11ea-96e8-260d239288f3.png)

### Käyttäjätilin poistaminen

Käyttäjätilin voi poistaa painamalla *Delete Your Account* -nappia *My Surveys* -sivulla. Käyttäjätilin poistaessa myös kaikki käyttäjän luomat kyselyt ja tietovisat poistuvat. Tapahtuma tulee vahvistaa painamalla uudesta ikkunasta *OK*. Tapahtuman voi myös peruuttaa painamalla *Peruuta/Cancel*.

![deleteaccount](https://user-images.githubusercontent.com/59598363/88907874-d676ec00-d261-11ea-9641-edf46cacba82.png)

# Työaikakirjanpito

| Päivämäärä | Työtunnit | Mitä tein  |
| :---------:|:----------| :----------|
| 30.5       | 1         | Repo init, lint config |
| 31.5       | 2         | surveySchema, mongoose validointi ja surveysService |
| 4.6        | 1         | Backendin testaus |
|            | 1         | Frontend Redux init, Survey- komponentit |
| 9.6        | 3         | NewSurvey- lomake ja sen validointi  |
| 10.6       | 2         | SurveyScheman muutos, Frontendin refaktorointi  |
| 11.6       | 3         | Surveyn täyttäminen, vastausten tallentaminen ja notifikaatiot  |
|            | 1         | Refaktorointi |
|            | 2         | Heroku setup  |
| 16.6       | 2         | Refaktorointi |
|            | 5         | Semantic UI käyttöönotto ja tutustuminen, UI parantelu |
| 17.6       | 2         | Graafi-kirjastoihin tutustuminen ja react-google-charts käyttöönotto |
|            | 4         | Backend käyttäjien hallinta ja testaus  |
| 30.6       | 4         | Frontend käyttäjien hallinta ja testaus  |
|            | 3         | Frontend kirjautuminen, UI päivityksiä  |
|            | 3         | Frontend uuden käyttäjän luonti ja validointi  |
| 1.7        | 3         | Käyttäjien hallinta (poistaminen)  |
|            | 3         | CheckBoxes kysymystyypin lisäys  |
|            | 2         | Uusien toiminnallisuuksien ideointi |
| 2.7        | 1         | CheckBoxes vastausten UI  |
|            | 2         | NewSurvey- lomakkeen parantelu  |
| 3.7        | 2         | NewSurvey- lomakkeen parantelu, UserSurvey-sivulle linkit kyselyihin  |
|            | 2         | React Routerin korjaus Herokussa  |
| 4.7        | 8         | End to End- testaus  |
|            | 2         | Uusien toiminnallisuuksien ideointi |
| 6.7        | 4         | Dark mode |
|            | 4         | Menu |
|            | 2         | Refaktorointi |
| 7.7        | 4         | Dark mode parantelu ja UI muutoksia |
|            | 2         | Tutustuminen teemoihin ja eri CSS- tyyleihin |
| 8.7        | 4         | Avoin vastauskenttä kysymyksiin ja Search Bar |
| 9.7        | 2         | Avointen vastauskenttien parantelu ja korjaus |
|            | 6         | Linear Scale- kysymystyypin lisäys, validointi ja testaus |
| 11.7       | 2         | Refaktorointi ja Survey sort |
|            | 2         | Uusien toiminnallisuuksien ideointi |
| 12.7       | 1         | Kyselyiden vastausten poistamisen toiminnallisuus |
|            | 2         | Quiz Schema ja router, backend muutoksia |
|            | 2         | Backend testaus |
|            | 1         | Frontendin Quiz- komponentti, -service ja -reducer |
| 16.7       | 2         | Refaktorointi |
|            | 3         | NewQuiz- componentti ja Quizin luominen |
|            | 2         | Quiz tulosten näyttäminen |
| 17.7       | 4         | QuizResults- Komponentti ja MySurveys- muutokset |
|            | 2         | QuizScore- komponentti, refaktorointi |
|            | 2         | Quiz- vastausten UI suunnittelu |
| 18.7       | 2         | Refaktorointi ja pieniä UI muutoksia |
|            | 3         | QuizFormin validointi ja testaus |
| 19.7       | 1         | Backendin testien korjaus |
|            | 2         | Frontendin UI testaus ja pieniä muutoksia |
| 21.7       | 8         | End to End- testaus ja UI- korjauksia  |
|            | 2         | Uusien toiminnallisuuksien ideointi |
| 22.7       | 4         | Tutustuminen tiedostojen tallentamiseen MongoDB ja React |
| 23.7       | 2         | Surveylle ja Quizeille kuvaukset, riippuvuuksien päivitys |
|            | 4         | Surveyn muokkaus- lomake |
| 24.7       | 2         | UserSurveys ja TakeSurvey/Quiz UI muutoksia |
|            | 3         | Quizin muokkaus- lomake |
|            | 1         | Tutustuminen markdowniin ja dokumentointiin |
| 27.7       | 1         | Backend käyttäjän muokkaaminen ja sen testaus |
|            | 1         | Salasanan vahto-lomake Frontend |
|            | 4         | End to End- testaus |
| 28.7       | 2         | Tutustuminen SMTP, Backend mailRouter ja sen testaus |
|            | 2         | EmailModal ja Quiz/Survey tilaukset Frontend |
|            | 2         | Refaktorointi ja Quiz/Survey- Results korjaus |
| 29.7       | 3         | Sähköposti-ilmoituksen lähetystoiminnallisuus ja sen testaaminen (E2E) |
|            | 1         | AppFooterin ja Info-napin lisäys, UI-korjauksia ja muutoksia |
|            | 2         | README:n rakenteen muutos, projektin tietojen päivitys ja dokumentointi ja lisenssin lisäys projektiin |
| 30.7       | 6         | Dokumentaatio ja käyttöohje, pieniä UI- korjauksia ja tietokannan täyttö kyselyillä, tietovisoilla ja vastauksilla |
| 12.1       | 4         | Github Actions Deployment Pipeline |
| Yht.       | 179       | | 