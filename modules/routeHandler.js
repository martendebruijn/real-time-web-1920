const api = require('./api.js');
const questions = require('./questions.js');
const gameQuestions = questions.makeGame(11);
const fs = require('fs');
let n = 1;

module.exports = {
  home,
  game,
  gameQuestions,
  makeLeaderboard,
};
function home(req, res) {
  res.render('chooseUsername', {
    title: 'home',
    style: 'chooseUsername',
    script: 'chooseUsername',
  });
}
function game(req, res) {
  console.log(gameQuestions);
  const q = gameQuestions[0].question1;
  console.log(q);
  const cityA = q.city1;
  const cityB = q.city2;
  const players = questions.getGame();
  res.render('game', {
    title: 'game',
    style: 'game',
    script: 'game',
    cityOne: cityA.city,
    cityTwo: cityB.city,
    imgOne: cityA.imgURL,
    imgTwo: cityB.imgURL,
    players,
  });
}

function makeLeaderboard(listClients) {
  let gameScores = [];
  listClients.forEach(function (item) {
    const obj = {};
    obj.userID = item;
    obj.score = 0;
    gameScores.push(obj);
  });
  const dataString = JSON.stringify(gameScores);
  // sla players op in json bestand
  fs.writeFile(`./data/games/game-${n}.json`, dataString, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
}
