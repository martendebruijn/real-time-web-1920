const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const fs = require('fs');
let amountOfPlayers = 0; // kan ook met: io.engine.clientsCount
var listClients;
let n = 1;

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
app.get('/game', render.game);

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

  // broadcast amount of players
  broadcastPlayerAmount();
  updateClientList();

  // listen on change username
  socket.on('change username', (data) => {
    socket.username = data.username;
  });

  socket.on('game start', function () {
    const destination = '/game';
    io.sockets.emit('game start', destination);
    console.log('PLAYERS:');
    console.log(listClients);
    // [{userID: abcd, score: 0}]
    let gameScores = [];
    listClients.forEach(function (item) {
      const obj = {};
      obj.userID = item;
      obj.score = 0;
      gameScores.push(obj);
    });
    const dataString = JSON.stringify(gameScores);
    // sla players op in json bestand
    fs.writeFile(`./data/games/game-${n}.json`, dataString, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
  });
  // https://pupli.net/2019/06/get-a-list-of-connected-clients-in-socket-io/
  // listen on chat message
  socket.on('chat message', (data) => {
    // broadcast new message
    io.sockets.emit('chat message', {
      message: data.message,
      username: socket.username,
    });
  });

  // listen on give answer
  socket.on('give answer', async function (data) {
    console.log(data); // log het gegeven antwoord
    const currentQuestion = currentQuestions[0].question1;
    const cityA = currentQuestion.city1.city;
    const cityB = currentQuestion.city2.city;
    // const tempA = await api.getWeather(cityA);
    // const tempB = await api.getWeather(cityB);
    const tempA = 15;
    const tempB = 8;
    console.log(tempA);
    console.log(tempB);
    // broadcast temperatures
    io.sockets.emit('send temp', {
      tempA: tempA,
      tempB: tempB,
    });
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
    console.log(listClients);
  });
}
