const socket = io();
const messages = document.getElementById('messages');
const usernameForm = document.getElementById('changeUsername');
const usernameInput = document.getElementById('u');
const playerCount = document.getElementById('playerCount');
// const messageForm = document.getElementById('sendMessage');
// const messageInput = document.getElementById('m');
/* jquery document ready function to vanilla JS 
 Source: https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#document-ready */
const ready = (callback) => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
  socket.on('connect', function () {
    console.log('connection to server made');
  });
});
// https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088
// https://github.com/guidobouman/rtw-chat/blob/master/main.js
// https://openweathermap.org/current

// // emit typing
// messageForm.addEventListener('keypress', function (e) {
//   console.log('HOLA');
// });

// emit message
// messageForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   socket.emit('chat message', { message: messageInput.value });
//   messageInput.value = '';
//   return false;
// });

// // listen on new message
// socket.on('chat message', (data) => {
//   const msgEl = document.createElement('p');
//   msgEl.innerText = `${data.username}: ${data.message}`;
//   messages.append(msgEl);
// });
socket.on('aantal spelers', (data) => {
  playerCount.innerText = `${data.spelers} spelers`;
});

// emit username
usernameForm.addEventListener('submit', function (e) {
  e.preventDefault();
  socket.emit('change username', { username: usernameInput.value });
  usernameInput.value = '';
  return false;
});
