import { socket } from './global.js';
const usernameForm = document.getElementById('changeUsername');
const usernameInput = document.getElementById('u');
const playerCount = document.getElementById('playerCount');

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
