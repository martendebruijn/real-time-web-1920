const api = require('./api.js');
const cities = require('./cities.js');

async function home(req, res) {
  // await api.getWeather('Amsterdam');
  const cityOne = cities.getRandomCity();
  const cityTwo = cities.getRandomCity();
  res.render('home', {
    title: 'home',
    cityOne: cityOne.city,
    cityTwo: cityTwo.city,
    imgOne: cityOne.img,
    imgTwo: cityTwo.img,
  });
}

module.exports = {
  home,
};
