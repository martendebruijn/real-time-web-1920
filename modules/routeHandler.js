const api = require('./api.js');
const questions = require('./questions.js');

module.exports = {
  home,
  game,
};
function home(req, res) {
  // questions.readFromJson();
  res.render('chooseUsername', {
    title: 'home',
    style: 'chooseUsername',
    script: 'chooseUsername',
  });
}
function game(req, res) {
  // const cityOne = cities.getRandomCity();
  // const cityTwo = cities.getRandomCity();
  res.render('game', {
    title: 'game',
    style: 'game',
    script: 'game',
    // cityOne: cityOne.city,
    // cityTwo: cityTwo.city,
    imgOne: cityOne.img,
    imgTwo: cityTwo.img,
  });
}
