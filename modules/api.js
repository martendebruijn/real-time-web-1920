// imports
const fetch = require('node-fetch'),
  dotenv = require('dotenv').config(),
  key = process.env.KEY;

module.exports = { getWeather };

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`,
    response = await fetch(url),
    jsonData = await response.json(),
    temp = jsonData.main.temp;
  if (!temp) {
    console.log(
      'Error: in getWeather() in api.js, could not get data from api.'
    );
    console.log(`I don't know this ${city}, so I made temp 20deg.`);
    temp = 20;
  }
  return temp;
}
