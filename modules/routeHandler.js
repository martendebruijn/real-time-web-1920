const questions = require('./questions.js'),
  gameQuestions = questions.makeGame(11),
  storage = require('./storage.js');
let n = 1;
module.exports = {
  home,
  gameQuestions,
  makeLeaderboard,
};
function home(req, res) {
  const q = gameQuestions[0].question,
    cityA = q.city1,
    cityB = q.city2,
    players = questions.getGame();
  res.render('home', {
    title: 'home',
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
  storage.write(`./data/games/game-${n}.json`, dataString);
}
