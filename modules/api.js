// imports
const fetch = require('node-fetch');
const util = require('util');

// exports
module.exports = { getLiveDataByCountry, getCountries };

// covid-19 api
const covidBaseURL = 'https://api.covid19api.com/';

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

async function getCountries() {
  const extendedURL = `countries`;
  const url = covidBaseURL + extendedURL;
  const response = await fetch(url, requestOptions);
  const jsonData = await response.json();
  console.log(util.inspect(jsonData, { maxArrayLength: null }));
  return jsonData;
}

async function getLiveDataByCountry(country) {
  const extendedURL = `/country/${country}/status/confirmed/live`;
  const url = covidBaseURL + extendedURL;
  const response = await fetch(url, requestOptions);
  const jsonData = await response.json();
  console.log(util.inspect(jsonData, { maxArrayLength: null }));
  return jsonData;
}
