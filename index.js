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
let questionIndex = 0;
// let users = [];

fs.writeFile(`./data/games/game-${n}.json`, '[]', function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
});

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
  // const usersobj = {};
  // usersobj.userID = userID;
  // usersobj.username = socket.username;
  // users.push(usersobj);
  // console.log(users);

  // broadcast amount of players
  broadcastPlayerAmount();
  updateClientList();

  // listen on change username
  socket.on('change username', (data) => {
    socket.username = data.username;
    // checkUsername(data.username, socket, userID);
  });

  socket.on('game start', function () {
    questionIndex = 0;
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
    console.log('QUESTIONINDEX');
    console.log(questionIndex);
    const obj = {};
    obj.userID = userID;
    obj.answer = data.answer;
    usersAnswers.push(obj);
    console.log(usersAnswers);
    const currentQuestion = currentQuestions[questionIndex].question;
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

    // usersAnswers = [];
    // addAmount = [];
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
  if (usersAnswers.length == amountOfPlayers) {
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
}
function writeNewScores(id) {
  console.log(id);
  // to do: sort from high to low
  const _game = questions.getGame();
  console.log(addAmount);
  if (addAmount.length == amountOfPlayers && questionIndex < 10) {
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
    // console.log('GAAT HET HIER FOUT?');
    console.log(dataString);
    // write json
    fs.writeFile(`./data/games/game-${n}.json`, dataString, function (err) {
      if (err) throw err;
      console.log('File is updated successfully.');
      console.log('ID???');
      console.log(id);
      updateLeaderboard(id);
    });

    const nextQuestion = currentQuestions[questionIndex + 1].question;
    io.sockets.emit('next question', { nextQuestion });
    questionIndex++;
    addAmount = [];
    usersAnswers = [];
  }
}
function updateLeaderboard(userID) {
  const standings = questions.getGame();
  io.sockets.emit('update leaderboard', { standings, userID });
}

// function checkUsername(data, socket, userID, double, extendedName) {
//   let no = 0;
//   if (!double && !extendedName && no === 0) {
//     no++;
//     checkDuplicates(data, socket, no, userID);
//   } else if (!double && !extendedName && no !== 0) {
//     users.forEach(function (user) {
//       if (user.userID === userID) {
//         user.username = data;
//         console.log(users);
//       }
//     });
//   } else {
//     users.forEach(function (user) {
//       if (user.userID === userID) {
//         user.username = double.extendedName;
//         console.log(users);
//       }
//     });
//     console.log(double);
//     console.log(users);
//   }
// }
// function checkDuplicates(data, socket, no, userID) {
//   var double;
//   var extendedName;
//   users.forEach(function (user) {
//     if (data == user.username) {
//       extendedName = `${socket.username}-${no}`;
//       socket.username = extendedName;
//       double = true;
//     } else {
//       double = false;
//     }
//   });
//   checkUsername(data, socket, userID, double, extendedName);
// }
