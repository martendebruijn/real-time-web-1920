const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
let amountOfPlayers = 0;

// static assets folder
app.use(express.static('public'));

// declare template engine and path
app.set('view engine', 'ejs');
app.set('views', 'views');

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// import modules
const render = require('./modules/routeHandler.js');

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
  // default username
  socket.username = 'Anonymous';

  // listen on change username
  socket.on('change username', (data) => {
    socket.username = data.username;
  });

  // listen on chat message
  socket.on('chat message', (data) => {
    // broadcast new message
    io.sockets.emit('chat message', {
      message: data.message,
      username: socket.username,
    });
  });

  socket.on('disconnect', function () {
    console.log('a user disconnected');
    amountOfPlayers--;
    console.log('spelers:' + amountOfPlayers);
    // broadcast amount of players
    broadcastPlayerAmount();
  });
});

function broadcastPlayerAmount() {
  io.sockets.emit('aantal spelers', {
    spelers: amountOfPlayers,
  });
}
