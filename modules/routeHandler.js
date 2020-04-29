const api = require('./api.js');
const cities = require('./cities.js');

module.exports = {
  home,
  game,
};

// async function home(req, res) {
//   // await api.getWeather('Amsterdam');
//   const cityOne = cities.getRandomCity();
//   const cityTwo = cities.getRandomCity();
//   res.render('home', {
//     title: 'home',
//     cityOne: cityOne.city,
//     cityTwo: cityTwo.city,
//     imgOne: cityOne.img,
//     imgTwo: cityTwo.img,
//   });
// }
function home(req, res) {
  res.render('chooseUsername', {
    title: 'home',
    style: 'chooseUsername',
    script: 'chooseUsername',
  });
}
function game(req, res) {
  res.render('game', {
    title: 'game',
    style: 'game',
    script: 'game',
    cityOne: 'Stad 1',
    cityTwo: 'Stad 2',
    imgOne: 'Amsterdam.svg',
    imgTwo: 'Amsterdam.svg',
  });
}
