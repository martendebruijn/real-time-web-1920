const socket = io();
var charactersList;
/* jquery document ready function to vanilla JS 
 Source: https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#document-ready */
const ready = (callback) => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

function addSpanSize(span, count) {
  return span.classList.add(`size-${count}`);
}

function includeMessage() {
  socket.on('chat message', function (msg) {
    updateCharacters();
    const output = document.getElementById('messages');
    const li = document.createElement('li');
    output.append(li);
    const characters = msg.split('');
    characters.forEach(function (letter) {
      const span = document.createElement('span');
      span.innerText = letter;
      const count = charactersList[letter];
      if (!count) {
        addSpanSize(span, 0);
      } else if (count >= 15) {
        addSpanSize(span, 15);
      } else {
        addSpanSize(span, count);
      }
      li.append(span);
    });
  });
}

function updateCharactersList(characters) {
  charactersList = characters;
  console.log(charactersList); // this console.log fires * the amount of said messages, and I don't really know why
}

function getInitialCharacters() {
  console.log('get initial characters');
  socket.on('initial characters', updateCharactersList);
}

function updateCharacters() {
  console.log('update characters');
  socket.on('update characters', updateCharactersList);
}

function clearData() {
  const el = document.getElementById('clear');
  el.addEventListener('click', function () {
    socket.emit('clear', {});
    console.log('Character data is being cleared.');
  });
}

function submitMsg(e) {
  e.preventDefault();
  const el = document.getElementById('m');
  const msg = el.value;
  socket.emit('chat message', msg);
  el.value = '';
  return false;
}

function sendMessage() {
  document.querySelector('.message').addEventListener('submit', submitMsg);
}

function sendUsername() {
  const el = document.querySelector('.username');
  el.addEventListener('submit', function (e) {
    e.preventDefault();
    const el = document.getElementById('username');
    socket.username = el.value;
    socket.emit('set user', socket.username);
    el.value = '';
    return false;
  });
}

function disconnect() {
  io.sockets.emit('userLeft', 'test');
}

function connection() {
  socket.on('connect', function () {
    console.log('connection to server made');
    console.log(socket.io.engine.id);
  });
}

socket.on('newUser', function (id) {
  console.log('new user detected:' + id);
});

socket.on('newName', function (username) {
  console.log(`username: ${username}`);
});

ready(() => {
  connection();
  getInitialCharacters();
  sendMessage();
  includeMessage();
  sendUsername();
});
clearData();
