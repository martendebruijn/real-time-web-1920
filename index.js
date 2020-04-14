const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// static assets folder
app.use(express.static('public'));

// declare template engine and path
app.set('view engine', 'ejs');
app.set('views', 'views');

// import modules
const render = require('./modules/routeHandler.js');

// routes
app.get('/', render.home);

const server = app.listen(port, () =>
  console.log(`App listening on port ${port}`)
);
const io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('a user disconnected');
  });
});
