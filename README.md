# Survey App

Survey App- sivulla voi luoda erilaisia kyselyitä ja tietovisoja. Käyttäjät voivat vastata toisten käyttäjien kyselyihin ja kerätä dataa omilla kyselyillä. Sovelluksen frontendinä toimii [React](https://reactjs.org/), backendinä [Node.js](https://nodejs.org/en/) ja tietokantana [MongoDB](https://www.mongodb.com/cloud/atlas). Tämä sovellus on julkaistu [Herokuun](https://www.heroku.com/). Toteutettu Full Stack -websovelluskehitys harjoitustyönä.

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


### `npm run start:test`

Käynnistää backendin testimoodissa käyttäen testitietokantaa. Testitietokanta tulee olla määriteltynä ympäristömuuttujissa.

### `npm test -- survey-backend/tests/survey_api.test.js`

Suorittaa backendin yksikkötestit.

Sovelluksen End-to-End testit voi suorittaa Cypressillä. Frontend tulee olla käynnissä ja backend testimoodissa, jonka jälkeen survey-frontend/ kansiossa voi suorittaa komennon `npm run cypress:open`.

# Käyttöohjeet

## Käyttäjän luominen ja kirjautuminen

### Käyttäjän luominen

Suvey App vaatii kirjautumisen kyselyiden luomiseen ja vastaamiseen. Käyttäjän luominen tapahtuu kirjautumisivulla klikkaamalla *Login* -napin alapuolella olevaa linkkiä.

![login](https://user-images.githubusercontent.com/59598363/88786923-cac0f200-d19b-11ea-8dcf-f5ee305dc659.png)

Käyttäjän luomiseen tarvitaan oma nimi, käyttäjänimi ja salasana. Käyttäjän luominen tapahtuu painamalla *Sign Up*, jonka jälkeen *Login to Application* -sivulta pystyy kirjautumaan Survey Appiin.

![signup](https://user-images.githubusercontent.com/59598363/88882911-93098700-d23b-11ea-9999-894f255acdb2.png)

### Kirjautuminen

Käyttäjän luomisen jälkeen sivulle pystyy kirjautumaan syöttämällä käyttäjätunnukset ja painamalla *Login*.

![login1](https://user-images.githubusercontent.com/59598363/88882891-87b65b80-d23b-11ea-9d25-7163950fbc7a.png)

## Surveys

Kirjautumisen jälkeen avautuu *Surveys* -näkymä, jossa pystyy luomaan uusia kyselyitä ja vastaamaan muiden käyttäjien kyselyihin.

![surveys](https://user-images.githubusercontent.com/59598363/88882044-bc291800-d239-11ea-841f-d91b7ef34b68.png)

### Kyselyn luominen

Painamalla *Surveys* -sivulla nappia *Create a new survey* pääsee luomaan uuden kyselyn. Kyselyn luomiseen tarvitaan nimi ja kysymyksiä. Kyselylle voi myös kirjoittaa halutessaan kuvauksen *Description* -kenttään. Uusien kysymyksien lisäys kyselyyn tapahtuu painamalla *Add Question*. Kyselyyn voi myös lisätä lineaarisen skaalan painamalla *Add Linear Scale*. Jos kyselyn luomisen haluaa aloittaa alusta, tulee painaa *Clear Values*.

![newsurvey](https://user-images.githubusercontent.com/59598363/88882396-8d5f7180-d23a-11ea-9876-b110dfb3b8f3.png)

Kysymyksen luomiseen tarvitaan otsikko, kysymystyyppi ja vastausvaihtoehtoja. *Multiple Choice* -kysymyksiin vastaaja voi valita vain yhden vaihtoehdoista, kun taas *Checkboxes* -kysymyksiin voi valita useamman vaihtoehdon. Kysymykseen lisätään vaihtoehtokenttiä painamalla *Add Option*. Vaihtoehtoja voi poistaa kenttien vieressä olevista harmaista rasteista. Kysymyksen voi myös tehdä avoimeksi lisäämällä rastin ruutuun *Add 'other'*. Tällöin vastaaja voi kirjoittaa oman vastauksen vastatessaan kyselyyn, jos jokin vaihtoehdoista ei sovi hänelle. Koko kysymyksen voi poistaa painamalla kysymyksen oikeassa yläkulmassa olevaa punaista roskakori -ikonia.

![surveyquestion](https://user-images.githubusercontent.com/59598363/88883039-f3002d80-d23b-11ea-86a4-e4d777dd1391.png)

Lineaarisen skaalan luomiseen tarvitaan otsikko, sekä aloitus -ja lopetusarvo. Skaala voi alkaa arvoilla 0-1 ja loppua arvoilla 2-10. Esimerkiksi jos valitsee väliksi 1-5, niin kyselyn vastaaja voi valita kysymyksen vataukseksi minkä tahansa arvon välillä 1-5. Normaalin kysymyksen tapaan lineaarisen skaalan voi poistaa painamalla skaalan oikeassa yläkulmassa olevaa punaista roskakori -ikonia.

![surveylinear](https://user-images.githubusercontent.com/59598363/88883674-9aca2b00-d23d-11ea-9058-7592ce1942cd.png)

Kun kysely on valmis, sen voi julkaista painamalla *Submit*.

### Kyselyyn vastaaminen

Painamalla *Surveys* -sivulla kyselyn *Take Survey* -nappia, pääsee vastaamaan kyselyyn. Kyselyn jokaiseen kysymykseen tulee vastata ennen kuin kyselyn voi palauttaa painamalla *Submit*. *Multiple Choice* -kysymyksiin voi valita yhden vaihtoehdoista (ks. kuva alla, ensimmäinen kysymys). *Checkboxes* -kysymyksiin voi valita yhden tai useamman vastauksen (ks. kuva alla, toinen kysymys). *Linear Scale* -kysymyksiin voi valita yhden vaihtoehdoista annetulla välillä (ks. kuva alla, viimeinen kysymys).

![takesurvey](https://user-images.githubusercontent.com/59598363/88884668-c1896100-d23f-11ea-9d94-533f1a74ed1e.png)

Avoimeen kysymykseen voi valita oman vaihtoehdon kirjoittamalla *Other* -kenttään vastauksen ja painamalla *Add*, jonka jälkeen kysykseen tulee valittavaksi uusi vaihtoehto.

![takesurvey1](https://user-images.githubusercontent.com/59598363/88884790-001f1b80-d240-11ea-8cc5-9d3c8b355fa6.png)

### Kyselyiden järjestely ja etsiminen

*Surveys* -sivulla kyselyitä voi etsiä kirjoittamalla *Search* -kenttään joko kyselyn tai käyttäjän nimen, jolloin sivulla näytetään vain hakutulokseen vastaavat kyselyt.

![searchsurvey](https://user-images.githubusercontent.com/59598363/88885314-f813ab80-d240-11ea-9a89-c3b46d494fa2.png)

Kyselyt voi myös järjestää vastausten tai käyttäjien mukaan, esimerkiksi painamalla *Sort By* ja *Least Responses* ensimmäisenä näytetään vähiten vastauksia keränneet kyselyt.

![sortsurvey](https://user-images.githubusercontent.com/59598363/88885489-4628af00-d241-11ea-820c-4b3ce9bf0b4b.png)

## Quizzes

### Tietovisan luominen

### Tietovisaan vastaaminen

### Tietovisojen järjestely ja etsiminen

### Search Bar

## Menu

### Navigointi

### Dark mode

### Info

### Uloskirjautuminen

## My Surveys

### Kyselyn tai tietovisan editointi

### Kyselyn tai tietovisan poistaminen

### Kyselyn tai tietovisan linkin kopiointi

### Kyselyn tulokset

### Tietovisan tulokset

### Salasanan vaihto

### Käyttäjätilin poistaminen

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
| Yht.       | 169       | | 
