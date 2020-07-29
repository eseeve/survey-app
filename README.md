# Survey App

Survey App- sivulla voi luoda erilaisia kyselyitä ja tietovisoja. Käyttäjät voivat vastata toisten käyttäjien kyselyihin ja kerätä dataa omilla kyselyillä. Sovelluksen frontendinä toimii [React](https://reactjs.org/), backendinä [Node.js](https://nodejs.org/en/) ja tietokantana [MongoDB](https://www.mongodb.com/cloud/atlas). Tämä sovellus on julkaistu [Herokuun](https://www.heroku.com/). Toteutettu Full Stack -websovelluskehitys harjoitustyönä.

[Survey App (Heroku)](https://survey-app-seeve.herokuapp.com/)  
[Asennus ja komennot](https://github.com/eseeve/survey-app/blob/master/README.md#asennus-ja-komennot)  
[Käyttöohjeet](https://github.com/eseeve/survey-app/blob/master/README.md#k%C3%A4ytt%C3%B6ohjeet)  
[Työaikakirjanpito](https://github.com/eseeve/survey-app/blob/master/README.md#ty%C3%B6aikakirjanpito)  
[Lisenssi](https://github.com/eseeve/survey-app/blob/master/LICENSE.txt)

## Asennus ja komennot 

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

## Käyttöohjeet

## Työaikakirjanpito

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
| Yht.       | 163       | | 
