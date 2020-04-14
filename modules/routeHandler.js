const api = require('./api.js');

async function home(req, res) {
  // const countryData = await api.getLiveDataByCountry('netherlands');
  // const countryData = await api.getCountries();
  res.render('home', {
    title: 'home',
    // countryData,
  });
}

module.exports = {
  home,
};
