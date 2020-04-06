const socket = io();

/* jQuery document ready function in vanilla JS 
 Source: https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#document-ready */
const ready = callback => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

function includeMessage() {
  socket.on('chat message', function(msg) {
    const output = document.getElementById('messages');
    const li = document.createElement('li');
    li.innerText = msg;
    output.append(li);
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
  sendMessage();
  includeMessage();
});
