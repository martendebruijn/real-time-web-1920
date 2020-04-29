const fs = require('fs');

module.exports = {
  readFromJson,
};

function readFromJson() {
  const readFile = fs.readFileSync('data/capitals.json');
  console.log(JSON.parse(readFile));
  return JSON.parse(readFile);
}
