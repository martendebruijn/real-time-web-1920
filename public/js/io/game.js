import { socket } from './global.js';
const messages = document.getElementById('messages');
const messageForm = document.getElementById('sendMessage');
const messageInput = document.getElementById('m');

// // emit typing
// messageForm.addEventListener('keypress', function (e) {
//   console.log('HOLA');
// });

// emit message
messageForm.addEventListener('submit', function (e) {
  e.preventDefault();
  socket.emit('chat message', { message: messageInput.value });
  messageInput.value = '';
  return false;
});

// listen on new message
socket.on('chat message', (data) => {
  const msgEl = document.createElement('p');
  msgEl.innerText = `${data.username}: ${data.message}`;
  messages.append(msgEl);
});
