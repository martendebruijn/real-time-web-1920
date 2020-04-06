'use strict';

const fs = require('fs');

module.exports = {
  prepareMsg,
};

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

/* Source: https://stackoverflow.com/questions/37365512/count-the-number-of-times-a-same-value-appears-in-a-javascript-array */
function countAppearance(arr, val) {
  return arr.filter(v => v === val).length;
}

function readSavedCharacters() {
  const rawData = fs.readFileSync('./data/characters.json');
  const parsedData = JSON.parse(rawData);
  return parsedData;
}

function writeSavedCharacters(data) {
  const stringedData = JSON.stringify(data);
  fs.writeFileSync('./data/characters.json', stringedData);
}

function prepareMsg(msg) {
  let messageCharacterCount = {};
  const removeSpaces = msg.replace(/ /g, '');
  const characters = removeSpaces.split('');
  const uniqueCharacters = characters.filter(unique);
  uniqueCharacters.forEach(function(letter) {
    const ammount = countAppearance(characters, letter);
    messageCharacterCount[letter] = ammount;
  });

  let savedCharactersCount = readSavedCharacters();
  const savedCharacters = Object.keys(savedCharactersCount);
  uniqueCharacters.map(function(letter) {
    const currentCount = savedCharactersCount[letter];
    const addAmount = messageCharacterCount[letter];
    const newAmount = currentCount + addAmount;
    if (savedCharacters.indexOf(letter) !== -1) {
      // optellen bij savedCharactersCount
      savedCharactersCount[letter] = newAmount;
    } else {
      // add to savedCharactersCount
      savedCharactersCount[letter] = addAmount;
    }
  });
  writeSavedCharacters(savedCharactersCount);
}
