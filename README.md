# Real-Time Web @cmda-minor-web · 2019-2020

**Week 1 code zie [branch week-1](#)**

## Introductie

Stukje introductie tekst over de course etc.

## To do

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
    - [ ] Nicknames weergeven in leaderboard
    - [ ] Toevoeging geven als er dezelfde nicknames zijn
  - [ ] Render nieuwe vraag en clear alle controle arrays/objecten
  - [ ] Code opschonen
    - [ ] Code splitsen in functies
    - [ ] Code splitsen in modules
  - [ ] Styling
    - [ ] Leaderboard styling toevoegen
    - [ ] Countdown animatie toevoegen
    - [ ] Feedback correcte antwoord geven
    - [ ] Responsive maken
  - [ ] README
    - [ ] Concept aanpassen
    - [ ] Data Life Cycle diagram aanpassen
    - [ ] Api sectie aanpassen
    - [ ] Custom events toevoegen

## Concept

Mijn concept is een spel die gebruik maakt van real time voetbal wedstrijd standen. Gebruikers kunnen tegen elkaar spelen. Ze kunnen aanklikken welk team het eerstvolgende doelpunt gaat maken. Als de gebruiker het goed heeft verdiend hij of zij een punt. Hiermee kan men live interactief gokken op wedstrijden.
\
Omdat de meeste competities momenteel stil liggen vanwege Covid-19, focus ik mij op de competities van landen als Belarus, die nog wel spelen.

- [ ] Concept tekst beter omschrijven
- [ ] Wireframes maken

<!-- Zie de [wiki](https://github.com/martendebruijn/real-time-web-1920/wiki) voor een uitgebreidere uitleg. -->

## Live Demo

[Bekijk hier een live demo 😃](#)

## Usage

```
git clone https://github.com/martendebruijn/real-time-web-1920.git
cd /real-time-web-1920/
npm install
npm start
```

## Table of Contents

- [API](#Api)
- [Data Life Cycle Diagram](#data-life-cycle-diagram)
- [Whishlist](#Whishlist)
- [Credits](#Credits)
  - [Dataset Used](#Dataset-Used)
- [Sources](#Sources)

## API

- [ ] API omschrijving toevoegen
      [wheater api](https://openweathermap.org/current)

## Tools used

- nodejs
- nodemon
- ejs
- expressjs
- dotenv
- heroku
- node file system
- socket io 2.0

## Data Life Cycle Diagram

![Data Life Cycle Diagram](./img/data-life-cycle.jpg)

## NPM Scripts

- dev

## Socket IO Events

- Connection
- Aantal spelers
- Change username
- Game start
- Chat message
- Give answer
- Send temp
- Update leaderboard
- Disconnect

## Whishlist

## Credits

- [Meyerweb: CSS Reset](http://meyerweb.com/eric/tools/css/reset/)
- [Tobiashlin: Document ready from jquery to vanilla JS](https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#document-ready)

### Dataset Used

[Country-capital dataset made by Samayo](https://data.world/samayo/country-capital-city) \

**Changes made:**

- Removed the countries that don't have capitals.
- Added continents.
- Changed the capital city name of Austria from the native name to the English name -> `Wien` -> `Vienna`.
- Changed the capital city of Bolivia from `La Plata` to `Sucre` since [it isn't known as La Plata anymore](https://en.wikipedia.org/wiki/Sucre).
- Changed the capital city of Brazil to `Brasília`.
- Changed the capital city of Burundi from `Bujumbra` to `Gitega` since [it is Gitega as of March 2007](https://simple.wikipedia.org/wiki/Gitega).
- Changed the capital city of China from `Peking` to `Beijing` since the city changed it name to Beijing.
- Changed the capital city of Colombia from `Santaf` to `Bogotá`.
- Added `é` to capitals that have it in their name, because they weren't there.
- Changed the capital city of Kazakhstan from `Astana` to `Nur-Sultan` since [it's renamed in 2019](https://simple.wikipedia.org/wiki/Nur-Sultan).
- Changed the capital city of Myanmar from `Rangoon` to `Naypyidaw` since it's [the new capital of Myanmar](https://simple.wikipedia.org/wiki/Naypyidaw).
- Removed `Yugoslavia` since it is [a former country](https://en.wikipedia.org/wiki/Yugoslavia).
- Added img links. **Haven't done this one yet** -> add a placeholder img for when the img url is broken

## Sources

📖 Artikel / Documentation | ⚙️ Code | 📹 Video | 🛠 Tools

- 📖[Socket IO - Getting Started](https://socket.io/get-started/chat/)
- 📖[Build a Simple Chat App With NodeJS and SocketIO - Medium - Noufel Gouirhate](https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088)
- 📖[List of Countries by Continents](https://simple.wikipedia.org/wiki/List_of_countries_by_continents)
- 📖[EJS Documentation](https://ejs.co/#docs)
- 📖[Loading images that not exist - Medium - Rahul Nanwani](https://blog.imagekit.io/how-to-handle-loading-images-that-may-not-exist-on-your-website-92e6c3c6ea63)
