# Real-Time Web @cmda-minor-web · 2019-2020

**Week 1 code zie [branch week-1](#)**

## Introductie

Momenteel leven we in een anderhalve meter samenleving vanwege COVID-19. Iedereen lijkt hier ook een mening over te hebben. Met mijn real time web application wil ik tweets over COVID-19 recht tegenover de statistieken van het virus (aantal besmettingen, doden, etc.) zetten per land. Hebben inwoners van een land waar COVID-19 minder speelt een andere mening dan inwoners van een land waar COVID-19 momenteel hoofdzaak is?

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
  - [Twitter API](#Twitter-api)
  - [Covid-19 API](#covid-19-api)
- [Whishlist](#Whishlist)
- [Credits](#Credits)
- [Sources](#Sources)

## API

### Twitter API

De web app maakt gebruik van de Twitter API. Om gebruik te kunnen maken van de API van Twitter moet men een bij Twitter goedgekeurd [developer account](https://developer.twitter.com/en/docs/basics/apps/overview) hebben. Wanneer deze is goed gekeurd kan men authentication keys aanvragen. **Momenteel ben ik aan het wachten totdat mijn app goedgekeurd wordt of niet.**

Add:

- [ ] Authentication
- [ ] Rate limits

### Covid-19 API

Voor het weergeven van de Covid-19 statistieken maak ik gebruik van [deze API](https://covid19api.com/). Deze API maakt geen gebruik van API keys en heeft geen rate limits.

## Whishlist

## Credits

- [Meyerweb: CSS Reset](http://meyerweb.com/eric/tools/css/reset/)
- [Tobiashlin: Document ready from jquery to vanilla JS](https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#document-ready)

## Sources

📖 Artikel / Documentation | ⚙️ Code | 📹 Video | 🛠 Tools

- 📖[Socket IO - Getting Started](https://socket.io/get-started/chat/)
- 📖[Covid-19 API Documentation](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest)
