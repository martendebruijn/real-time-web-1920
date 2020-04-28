// exports
module.exports = { getRandomCity };

// cities
const cities = [
  { city: 'Amsterdam', img: 'Amsterdam.svg' },
  { city: 'Tokyo', img: 'Tokiyo.webp' },
  { city: 'London', img: 'uk.webp' },
  { city: 'Reykjavik', img: 'iceland.svg' },
];
let citiesClone = cities.slice();
function getRandomCity() {
  if (citiesClone.length === 0) {
    citiesClone = cities.slice();
    console.log('Cities array has been reset!');
  }
  const max = citiesClone.length;
  const randomInt = Math.floor(Math.random() * max);
  const randomCity = citiesClone[randomInt];
  citiesClone.splice(randomInt, 1);
  //   console.log(randomCity);
  console.log(citiesClone);
  return randomCity;
}
