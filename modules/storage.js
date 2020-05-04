const fs = require('fs');

module.exports = {
  write,
  read,
  addToFile,
};

function write(url, data) {
  fs.writeFile(url, data, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
}
function read(url) {
  const readFile = fs.readFileSync(url);
  // console.dir(JSON.parse(readFile), { maxArrayLength: null });
  const read_file = JSON.parse(readFile);

  return read_file;
}
function addToFile(url, data) {
  fs.appendFile(url, data, function (err) {
    if (err) throw err;
    console.log(
      "Seems like the api couldn't find a city. I added the city in my bug's file."
    );
  });
}
// https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088
// https://github.com/guidobouman/rtw-chat/blob/master/main.js
// https://openweathermap.org/current
