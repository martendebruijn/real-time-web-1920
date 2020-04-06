const socket = io();
var charactersList;
/* jquery document ready function to vanilla JS 
 Source: https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#document-ready */
const ready = callback => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

function includeMessage() {
  socket.on('chat message', function(msg) {
    const output = document.getElementById('messages');
    const li = document.createElement('li');
    output.append(li);
    const characters = msg.split('');
    characters.forEach(function(letter) {
      const span = document.createElement('span');
      span.innerText = letter;
      span.classList.add('default');
      li.append(span);
    });
  });
}

function getInitialCharacters() {
  socket.on('initial characters', function(characters) {
    charactersList = characters;
    console.log(charactersList);
  });
}

function submit(e) {
  e.preventDefault();
  const el = document.getElementById('m');
  const msg = el.value;
  socket.emit('chat message', msg);
  el.value = '';
  return false;
}

function sendMessage() {
  document.querySelector('form').addEventListener('submit', submit);
}

ready(() => {
  getInitialCharacters();
  sendMessage();
  includeMessage();
});
