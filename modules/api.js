// imports
const fetch = require('node-fetch');
// const util = require('util');
const dotenv = require('dotenv').config();

const key = process.env.KEY;

// exports
module.exports = { getWeather };

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  const temp = jsonData.main.temp;
  if (!temp) {
    console.log(`I don't know this ${city}, so I made temp 20deg.`);
    temp = 20;
  }
  return temp;
}
