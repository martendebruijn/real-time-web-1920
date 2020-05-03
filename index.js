const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const fs = require('fs');
let n = 1;
let amountOfPlayers = 0; // kan ook met: io.engine.clientsCount
var listClients;
let usersAnswers = []; // todo: clear array when next question loads
let addAmount = [];

// static assets folder
app.use(express.static('public'));

// declare template engine and path
app.set('view engine', 'ejs');
app.set('views', 'views');

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// import modules
const render = require('./modules/routeHandler.js');
const questions = require('./modules/questions.js');
const api = require('./modules/api.js');

const currentQuestions = render.gameQuestions;

// routes
app.get('/', render.home);
// app.get('/game', render.game);

const server = app.listen(port, () =>
  console.log(`App listening on port ${port}`)
);

// socket.io instantiation
const io = require('socket.io').listen(server);

// listen on every connection
io.on('connection', function (socket) {
  console.log('a user connected');
  amountOfPlayers++;
  console.log('spelers:' + amountOfPlayers);

  const userID = socket.id;

  // default username
  socket.username = 'Anonymous';

  // broadcast amount of players
  broadcastPlayerAmount();
  updateClientList();

  // listen on change username
  socket.on('change username', (data) => {
    socket.username = data.username;
  });

  socket.on('game start', function () {
    io.sockets.emit('game start', { listClients });
    console.log('PLAYERS:');
    console.log(listClients);
    render.makeLeaderboard(listClients);
  });

  // https://pupli.net/2019/06/get-a-list-of-connected-clients-in-socket-io/
  // listen on chat message
  socket.on('chat message', (data) => {
    // broadcast new message
    console.log(userID);
    io.sockets.emit('chat message', {
      message: data.message,
      username: socket.username,
    });
  });

  // listen on give answer
  socket.on('give answer', async function (data) {
    usersAnswers = [];
    const obj = {};
    obj.userID = userID;
    obj.answer = data.answer;
    usersAnswers.push(obj);
    console.log(usersAnswers);
    const currentQuestion = currentQuestions[0].question1;
    const cityA = currentQuestion.city1.city;
    const cityB = currentQuestion.city2.city;
    // const tempA = await api.getWeather(cityA);
    // const tempB = await api.getWeather(cityB);
    const tempA = 15;
    const tempB = 15;
    // console.log(tempA);
    // console.log(tempB);
    // broadcast temperatures
    io.sockets.emit('send temp', {
      tempA: tempA,
      tempB: tempB,
    });
    const rightAnswer = checkHighestTemp(tempA, tempB);
    checkAnswers(rightAnswer);
    writeNewScores(userID);
    // Todo: send new scores to dashboard
    // updateLeaderboard();
  });

  socket.on('disconnect', function () {
    console.log('a user disconnected');
    amountOfPlayers--;
    console.log('spelers:' + amountOfPlayers);
    // broadcast amount of players
    broadcastPlayerAmount();
    updateClientList();
  });
});

function broadcastPlayerAmount() {
  io.sockets.emit('aantal spelers', {
    spelers: amountOfPlayers,
  });
}
function updateClientList() {
  io.clients(function (error, clients) {
    if (error) throw error;
    listClients = clients;
    console.log('hallo');
    console.log(listClients);
  });
}
function checkHighestTemp(_tempA, _tempB) {
  if (_tempA > _tempB) {
    console.log('1');
    return 1;
  } else if (_tempA < _tempB) {
    console.log('2');
    return 2;
  } else if (_tempA == _tempB) {
    console.log('draw');
    return 3;
  }
}
function checkAnswers(rightAnswer) {
  // { userID: 'MIPLs5TkJSYvFPbOAAAY', addToScore: 1 }

  usersAnswers.forEach(function (user) {
    if (
      user.answer == rightAnswer ||
      (rightAnswer === 3 && user.answer == 1) ||
      (rightAnswer === 3 && user.answer == 2)
    ) {
      console.log('goed');
      const obj = {};
      obj.userID = user.userID;
      obj.addToScore = 1;
      // usersAnswers[0].userID score: + 1
      addAmount.push(obj);
    } else {
      console.log('fout');
      const obj = {};
      obj.userID = user.userID;
      obj.addToScore = 0;
      addAmount.push(obj);
    }
  });
}
function writeNewScores(id) {
  console.log(id);
  // to do: sort from high to low
  const _game = questions.getGame();
  console.log('HIER ERGENS GAAT HET FOUT');
  console.log(addAmount);
  if (addAmount.length == amountOfPlayers) {
    console.log(_game);
    addAmount.forEach(function (item) {
      _game.forEach(function (_item) {
        if (item.userID === _item.userID) {
          _item.score = _item.score + item.addToScore;
        }
      });
    });
    console.log(_game);
    _game.sort(function (a, b) {
      const _a = a.score;
      const _b = b.score;
      return (_a - _b) * -1;
    });
    const dataString = JSON.stringify(_game);
    // write json
    fs.writeFile(`./data/games/game-${n}.json`, dataString, function (err) {
      if (err) throw err;
      console.log('File is updated successfully.');
      updateLeaderboard(id);
    });
  }
}
function updateLeaderboard(userID) {
  const standings = questions.getGame();
  io.sockets.emit('update leaderboard', { standings, userID });
}
