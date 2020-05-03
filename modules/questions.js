const fs = require('fs'),
  capitalsUrl = 'data/capitals.json',
  gameUrl = 'data/games/game-1.json',
  storage = require('./storage.js');

module.exports = {
  makeGame,
  getGame,
};

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

const allCities = storage.read(capitalsUrl);
let cloneCities = allCities.slice(),
  questions = [];

function randomCity() {
  const n = randomInt(cloneCities.length),
    city = cloneCities[n];
  removeFromClone(n);
  return city;
}

function removeFromClone(i) {
  cloneCities.splice(i, 1);
}

function addQuestion(n) {
  const key = `question`,
    obj = {},
    city1 = randomCity(),
    city2 = randomCity();
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
  const currGame = storage.read(gameUrl);
  return currGame;
}
// console.log('KIJK');
// console.log(getPlayers());
