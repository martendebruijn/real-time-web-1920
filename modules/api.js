// imports
const fetch = require('node-fetch'),
  dotenv = require('dotenv').config(),
  key = process.env.KEY,
  storage = require('./storage.js');

module.exports = { getWeather };

async function getWeather(city) {
  var temp;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`,
      response = await fetch(url),
      jsonData = await response.json();

    temp = jsonData.main.temp;
  } catch (err) {
    temp = 0;
    console.log(
      `Error: in getWeather() in api.js kon de api ${city} niet vinden.`
    );
    storage.addToFile('../data/api-city-bugs.txt');
  }
  return temp;
}
