const fs = require('fs');
const capitalsUrl = 'data/capitals.json';
const gameUrl = 'data/games/game-1.json';

module.exports = {
  makeGame,
  getGame,
};

function readFromJson(url) {
  const readFile = fs.readFileSync(url);
  // console.dir(JSON.parse(readFile), { maxArrayLength: null });
  return JSON.parse(readFile);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

const allCities = readFromJson(capitalsUrl);
let cloneCities = allCities.slice();
let questions = [];

function randomCity() {
  const n = randomInt(cloneCities.length);
  const city = cloneCities[n];
  removeFromClone(n);
  return city;
}

function removeFromClone(i) {
  cloneCities.splice(i, 1);
}

function addQuestion(n) {
  const key = `question`;
  const obj = {};
  const city1 = randomCity();
  const city2 = randomCity();
  obj[key] = { city1: city1, city2: city2 };
  questions.push(obj);
}

function makeGame(max) {
  // todo: laat de gebruiker zelf kiezen hoeveel vragen hij/zij wilt
  // + mogelijkheid om te filteren op continenten
  for (i = 1; i < max; i++) {
    addQuestion(i);
  }
  return questions;
}

function getGame() {
  const currGame = readFromJson(gameUrl);
  return currGame;
}
// console.log('KIJK');
// console.log(getPlayers());
