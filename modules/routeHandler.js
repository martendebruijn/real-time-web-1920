const api = require('./api.js');
const questions = require('./questions.js');
const gameQuestions = questions.makeGame(11);

module.exports = {
  home,
  game,
  gameQuestions,
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
