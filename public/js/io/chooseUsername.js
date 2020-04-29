import { socket } from './global.js';
const usernameForm = document.getElementById('changeUsername');
const usernameInput = document.getElementById('u');
const playerCount = document.getElementById('playerCount');
const playEl = document.getElementById('play');

socket.on('aantal spelers', (data) => {
  playerCount.innerText = `${data.spelers} spelers`;
});

// emit username
usernameForm.addEventListener('submit', function (e) {
  e.preventDefault();
  socket.emit('change username', { username: usernameInput.value });
  localStorage.setItem('username', usernameInput.value);
  localStorage.setItem('userID', socket.id);
  usernameInput.value = '';
  return false;
});

// emit game start
playEl.addEventListener('click', function (e) {
  console.log('pressed');
  socket.emit('game start');
});

// listen to game start event
socket.on('game start', function (destination) {
  window.location.href = destination;
});
