const express = require('express'),
  dotenv = require('dotenv').config(),
  port = process.env.PORT || 3000,
  app = express(),
  fs = require('fs'),
  currentQuestions = render.gameQuestions,
  render = require('./modules/routeHandler.js'),
  questions = require('./modules/questions.js'),
  api = require('./modules/api.js'),
  storage = require('./modules/storage.js');
let n = 1,
  amountOfPlayers = 0, // kan ook met: io.engine.clientsCount
  usersAnswers = [],
  addAmount = [],
  questionIndex = 0;
var listClients;
// let users = [];

app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static('public'))
  .use(express.urlencoded({ extended: true }))
  .get('/', render.home);

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
    console.log(`PLAYERS: ${listClients}`);
    render.makeLeaderboard(listClients);
  });

  // listen on chat message
  // CHAT MESSSAGE WERKT NIET MEER
  socket.on('chat message', (data) => {
    // broadcast new message
    io.sockets.emit('chat message', {
      message: data.message,
      username: socket.username,
    });
  });

  // listen on give answer
  socket.on('give answer', async function (data) {
    const obj = {},
      currentQuestion = currentQuestions[questionIndex].question,
      cityA = currentQuestion.city1.city,
      cityB = currentQuestion.city2.city,
      // tempA = await api.getWeather(cityA),
      // tempB = await api.getWeather(cityB);
      tempA = 15,
      tempB = 15;
    obj.userID = userID;
    obj.answer = data.answer;
    usersAnswers.push(obj);
    console.log(usersAnswers);
    // broadcast temperatures
    io.sockets.emit('send temp', {
      tempA: tempA,
      tempB: tempB,
    });
    const rightAnswer = checkHighestTemp(tempA, tempB);
    checkAnswers(rightAnswer);
    writeNewScores(userID);
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
  } else {
    console.log('Error: checkHighestTemp() in index.js gave no output.');
  }
}

function checkAnswers(rightAnswer) {
  if (usersAnswers.length == amountOfPlayers) {
    usersAnswers.forEach(function (user) {
      if (
        user.answer == rightAnswer ||
        (rightAnswer === 3 && user.answer == 1) ||
        (rightAnswer === 3 && user.answer == 2)
      ) {
        pushAddAmount(user, 1);
      } else {
        pushAddAmount(user, 0);
      }
    });
  } else {
    console.log(
      'Error: in checkAnswers() in index.js, amount of answers received is not equal to the amount of players playing.'
    );
  }
}
function pushAddAmount(user, n) {
  const obj = {};
  obj.userID = user.userID;
  obj.addToScore = n;
  addAmount.push(obj);
}
function writeNewScores(id) {
  // to do: sort from high to low
  const _game = questions.getGame();
  console.log(addAmount);
  if (addAmount.length == amountOfPlayers && questionIndex < 9) {
    console.log(_game);
    addAmount.forEach(function (item) {
      _game.forEach(function (_item) {
        if (item.userID === _item.userID) {
          _item.score = _item.score + item.addToScore;
        }
      });
    });
    _game.sort(function (a, b) {
      const _a = a.score;
      const _b = b.score;
      return (_a - _b) * -1;
    });
    const dataString = JSON.stringify(_game);
    // write json
    storage.write(`./data/games/game-${n}.json`, dataString);
    updateLeaderboard(id);
    const nextQuestion = currentQuestions[questionIndex + 1].question;
    io.sockets.emit('next question', { nextQuestion });
    questionIndex++;
    addAmount = [];
    usersAnswers = [];
  } else {
    console.log(
      'Error: in writeNewScores() in index.js length of addAmount is not equal to the amount of players or question index is not under 9.'
    );
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
