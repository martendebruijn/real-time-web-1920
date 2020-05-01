const fs = require('fs');

module.exports = {
  readFromJson,
};

function readFromJson() {
  const readFile = fs.readFileSync('data/capitals.json');
  // console.dir(JSON.parse(readFile), { maxArrayLength: null });
  return JSON.parse(readFile);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

const allCities = readFromJson();
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
  const key = `question${n}`;
  const obj = {};
  const city1 = randomCity();
  const city2 = randomCity();
  obj[key] = { city1: city1, city2: city2 };
  questions.push(obj);
}

function makeGame(max) {
  for (i = 1; i < max; i++) {
    addQuestion(i);
  }
}
makeGame(11);
