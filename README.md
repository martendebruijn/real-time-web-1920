# Real-Time Web @cmda-minor-web · 2019-2020

**Week 1 code zie [branch week-1](https://github.com/martendebruijn/real-time-web-1920/tree/week-1)**

## 👾 Introductie

During this course you will learn how to build a meaningful real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.

## ✏️ Concept

Mijn concept is een simpel spel op basis van het weer in real time. Gebruikers krijgen twee steden naast elkaar te zien en moeten gokken in welke stad zij denken dat het momenteel het warmst is. Iedere keer als een gebruiker het goed heeft geraden, krijgt hij of zij één punt. Na een aantal rondes (default = 10) is het spel afgelopen en is er een winnaar.

Gebruikers in een game kunnen ook met elkaar chatten. Aan de rechterkant van het scherm ziet men de scores. Deze scores worden na iedere ronde ge-update en gesorteerd\* (gebruiker met het hoogste aantal punten staat bovenaan). Voor de scores staan de door de gebruikers opgegeven usernames\*\* - met een toevoeging als er dezelfde usernames zijn en `(jij)` bij de huidige gebruiker.

\*het sorteren van het leaderboard heb ik nog niet geïmplementeerd.

\*\*Voor als nog worden de userID's weergegeven i.p.v. de usernames. Dit wil ik veranderen zodat de userID's niet naar de client gestuurd worden.

![Wireframe Sketch](/img/wireframe-schets.jpeg)

## 🕹 Live Demo

[Bekijk hier een live demo 😃](#)

## 👨‍🦯 Usage

### 1. Clone repository & install the dependencies

```bash
git clone https://github.com/martendebruijn/real-time-web-1920.git
cd /real-time-web-1920/
npm install
```

### 2. Request an API key

Men kan [hier een key aanvragen](<https://openweathermap.org/price](https://openweathermap.org/price)>) voor de API van Open Weather. Als u een key hebt, zorg dat deze wordt ingevuld voor de `key` variabele in `api.js`.

### 3. Start the app

```bash
npm start
```

### 4. When in development mode

In `give answer` in `index.js`: zet de api calls in comments en gebruik een vaste variabele, zodat men niet onnodig veel API calls maakt.

```js
// !!! uncomment tempA and tempB below when going in production !!!
tempA = await api.getWeather(cityA);
tempB = await api.getWeather(cityB);
// !!! comment tempA and tempB below out when going in production !!!
// tempA = 15,
// tempB = 15;
```

## 📍 Table of Contents

- [⚠️ Known Issues](#%EF%B8%8F-known-issues)
  - [API can’t find city](#api-can't-find-city)
- [🐒API](#-Api)
- [🛠 Tools Used](#-Tools-used)
- [📈 Data Life Cycle Diagram](#-data-life-cycle-diagram)
- [⚙️ NPM Scripts](#%EF%B8%8F-npm-scripts)
- [🧦 Socket IO Events](#%F0%9F%A7%A6-Socket-IO-Events)
- [❌ Errors](#%E2%9D%8C-Errors)
  - [API can’t find a city](#API-can't-find-a-city)
  - [Other](#Other)
- [✨ Whishlist](#-Whishlist)
- [🙌 Credits](#-Credits)
  - [Dataset Used](#Dataset-Used)
- [📚 Sources](#-Sources)
- [✅ Todo list](#-Todo-list)

## ⚠️ Known Issues

- Leaderboard wordt bij de 1e vraag niet geupdate
- Chat messages worden niet meer weergegeven

## 🐒 API

Deze applicatie maakt gebruik van [de Free API van Open Weather](https://openweathermap.org/price). Om gebruik van deze API te maken heeft men een key nodig - deze kan men aanvragen op de vorige link.

Van de Free API kan men het huidige weer opvragen, een 3-uur weersverwachting en basic weather maps.

De Free API heeft een restrictie van **1,000 calls per dag** en **60 calls per minuut**.

De documentatie kan men [hier](https://openweathermap.org/api) vinden.

## 🛠 Tools used

- [NodeJS](https://nodejs.org/en/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Ejs](https://www.npmjs.com/package/ejs)
- [Expressjs](https://expressjs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Heroku](https://dashboard.heroku.com/)
- [Node File System](https://nodejs.org/api/fs.html)
- [SocketIO 2.0](https://socket.io/)

## 📈 Data Life Cycle Diagram

![Data Life Cycle Diagram](/img/diagram-v1.jpg)

## ⚙️ NPM Scripts

- `npm start` = `node index.js` **|** start de applicatie
- `npm run dev` = `nodemon index.js` **|** start de applicatie in development mode

## 🧦 Socket IO Events

- `Connection` luistert op de server naar iedere connectie.
- `Connect` wordt afgevuurd op connectie met de server.
- `Aantal spelers` emits het huidige aantal spelers van de server naar alle clients.
- `Change username` wordt afgevuurd als een client zijn `username` veranderd. De server ontvangt de nieuwe `username` en veranderd deze.
- `Game start` wordt afgevuurd als een client op de play-button drukt. Alle clients worden doorgestuurd naar de game. En wordt het leaderboard gerenderd. Ook wordt `timerFunction()` afgevuurd. De `timerFunction()` zorgt voor dat na 15 seconden (als een ronde is afgelopen) het `give answer` event wordt afgevuurd.
- `Chat message` wordt afgevuurd als client een chat bericht stuurt. Deze wordt vervolgens naar alle clients gestuurd.
- `Give answer` wordt afgevuurd als een ronde afgelopen is. Deze controleert welk antwoord een client heeft gegeven: de stad links, de stad rechts of geen. De server ontvangt de gegeven antwoorden van alle clients. Haalt de huidige temperatuur van beide steden op bij de API, deze neemt hij vervolgens mee met het `send temp` event. Ook wordt er gecontroleerd welk antwoord het juiste antwoord was en vervolgens of de clients het antwoord goed hadden. Dit wordt weer meegenomen door het `update leaderboard` event. En uiteindelijk wordt het `next question` event aangeroepen.
- `Send temp` wordt afgevuurd als het `give answer` event wordt aangeroepen. Het event stuurt de temperaturen van de huidige twee steden naar alle clients.
- `Update leaderboard` wordt afgevuurd als het `give answer` event wordt aangeroepen. Het event update de leaderboards bij alle clients.
- `Next question` wordt afgevuurd als een ronde klaar is. Het event stuurt de nieuwe steden naar alle clients.
- `Disconnect` wordt afgevuurd als een client disconnect.

## ❌ Errors

### API can’t find a city

Als de API een bepaalde stad niet kan vinden wordt de volgende error gelogd bij de server:

- `Error: in getWeather() in api.js kon de api ${city} niet vinden.`
- This city will automaticly be added to `api-city-bugs.txt` and returns a tempature of 0 degrees.

### Other

- `Error: checkHighestTemp() in index.js gave no output.`
- `Error: in checkAnswers() in index.js, amount of answers received is not equal to the amount of players playing.`
- `Error: in writeNewScores() in index.js length of addAmount is not equal to the amount of players or question index is not under 9.`

## ✨ Whishlist

- Voeg toe dat de laatst opgehaalde temperatuur bij de dataset wordt toegevoegd voor als de app over het request limiet van de api heen is.
- Ervoor zorgen dat wanneer de api een stad niet kan vinden, de stad automatisch wordt toegevoegd aan een bugs file.
- Ervoor zorgen dat als een stad niet gevonden wordt, er een api call wordt gedaan met het land i.p.v. de stad.
- ~~Ervoor zorgen dat als een land niet gevonden kan worden (verkeerd gespeld/too many request) een andere stad ervoor in de plaats komt.~~
- Naast het weergeven van de stad en vlag, wil ik ook desbetreffend land weergeven én de huidige tijd in dat land. (Als het ergens nacht is, is het natuurlijk eerder kouder dan in een stad waar het midden op de dag is).

## 🙌 Credits

- [Meyerweb: CSS Reset](http://meyerweb.com/eric/tools/css/reset/)
- [Tobiashlin: Document ready from jquery to vanilla JS](https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#document-ready)

### Dataset Used

[Country-capital dataset made by Samayo](https://data.world/samayo/country-capital-city)

**Changes made:**

- Removed the countries that don’t have capitals.
- Added continents.
- Changed the capital city name of Austria from the native name to the English name -> `Wien` -> `Vienna`.
- Changed the capital city of Bolivia from `La Plata` to `Sucre` since [it isn’t known as La Plata anymore](https://en.wikipedia.org/wiki/Sucre).
- Changed the capital city of Brazil to `Brasília`.
- Changed the capital city of Burundi from `Bujumbra` to `Gitega` since [it is Gitega as of March 2007](https://simple.wikipedia.org/wiki/Gitega).
- Changed the capital city of China from `Peking` to `Beijing` since the city changed it name to Beijing.
- Changed the capital city of Colombia from `Santaf` to `Bogotá`.
- Added `é` to capitals that have it in their name, because they weren’t there.
- Changed the capital city of Kazakhstan from `Astana` to `Nur-Sultan` since [it’s renamed in 2019](https://simple.wikipedia.org/wiki/Nur-Sultan).
- Changed the capital city of Myanmar from `Rangoon` to `Naypyidaw` since it’s [the new capital of Myanmar](https://simple.wikipedia.org/wiki/Naypyidaw).
- Removed `Yugoslavia` since it is [a former country](https://en.wikipedia.org/wiki/Yugoslavia).
- Added images of the countries flag.
- Need to add a display name and a search name as the api don’t seems to find cities with `é` `á` etc…

## 📚 Sources

📖 Artikel / Documentation **|** ⚙️ Code **|** 📹 Video **|** 🛠 Tools

- 📖 [Socket IO - Getting Started](https://socket.io/get-started/chat/)
- 📖 [Build a Simple Chat App With NodeJS and SocketIO - Medium - Noufel Gouirhate](https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088)
- 📖 [List of Countries by Continents](https://simple.wikipedia.org/wiki/List_of_countries_by_continents)
- 📖 [EJS Documentation](https://ejs.co/#docs)
- 📖 [Loading images that not exist - Medium - Rahul Nanwani](https://blog.imagekit.io/how-to-handle-loading-images-that-may-not-exist-on-your-website-92e6c3c6ea63)

## ✅ To do list

- [ ] Real Time Web

  - [ ] Chat functie
    - [x] ~~Basis~~
    - [ ] Als er overflow is → automatisch naar het laatste bericht scrollen (/focus)
  - [ ] Server berichten
  - [ ] Rooms
    - [ ] Geneer uniek game-ID
  - [x] ~~Questions genereren~~
  - [x] ~~Antwoorden controleren~~
  - [x] ~~Score systeem~~
  - [ ] Leaderboard updaten
    - [x] ~~Scores updaten~~
    - [ ] UserID’s niet mee sturen naar de client -> veranderen naar usernames !!!
    - [ ] Nicknames weergeven in leaderboard
    - [ ] Toevoeging geven als er dezelfde nicknames zijn
  - [ ] Beginscherm
    - [ ] Laat zien (usernames) wie allemaal in de lobby zitten
    - [ ] Voeg welkomsmessage toe als men zijn username invoert
  - [ ] Game
    - [x] ~~Nieuwe vraag renderen~~
    - [ ] Add country
    - [ ] Add current time (of city)
    - [ ] Add possibility to filter on continent
    - [ ] Add final scores
    - [ ] Add ‘Next round in …’ timer
    - [ ] Zorg ervoor dat er niet meer geklikt kan worden als de antwoorden worden gegeven
  - [x] ~~Code opschonen~~
    - [x] ~~Code meer splitsen in functies~~
    - [x] ~~Code meer splitsen in modules~~
  - [ ] Styling
    - [ ] Leaderboard styling toevoegen
    - [ ] Countdown animatie toevoegen
    - [ ] Feedback correcte antwoord geven
    - [ ] Responsive maken
    - [ ] Make placeholder for when the image can’t be find
  - [ ] Performance
    - [ ] Add Gulp
      - [ ] Add minifying
        - [ ] CSS
        - [ ] ES
  - [x] ~~README~~
    - [x] ~~Concept aanpassen~~
    - [x] ~~Data Life Cycle diagram aanpassen~~
    - [x] ~~Api sectie aanpassen~~
    - [x] ~~Custom events toevoegen~~

❤️ Thanks for reading ❤️<br/>
❤️ Marten de Bruijn ❤️
