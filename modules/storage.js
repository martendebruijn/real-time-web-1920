const fs = require('fs');

module.exports = {
  write,
  read,
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
  return JSON.parse(readFile);
}
// https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088
// https://github.com/guidobouman/rtw-chat/blob/master/main.js
// https://openweathermap.org/current
