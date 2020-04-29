const api = require('./api.js');
const cities = require('./cities.js');

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
  // await api.getWeather('Amsterdam');
  res.render('chooseUsername', {
    title: 'home',
    style: './css/chooseUsername.css',
  });
}

module.exports = {
  home,
};
