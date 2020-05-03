import { socket } from './global.js';
const messages = document.getElementById('messages');
const messageForm = document.getElementById('sendMessage');
const messageInput = document.getElementById('m');
const cityLeft = document.querySelector('.city-left');
const cityRight = document.querySelector('.city-right');
const countdown = document.getElementById('countdown');
const leftTemp = document.getElementById('tempA');
const rightTemp = document.getElementById('tempB');
const leaderboard = document.getElementById('js-leaderboard');

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
  const username = getUsername();
  msgEl.innerText = `${username}: ${data.message}`;
  messages.append(msgEl);
});

function getUsername() {
  let username = localStorage.getItem('username');
  if (!username) {
    username = 'Anonymous';
  }
  return username;
}

cityLeft.addEventListener('click', function (e) {
  if (checkActive(cityRight)) {
    toggleActive(cityRight);
  }
  toggleActive(cityLeft);
});

cityRight.addEventListener('click', function (e) {
  if (checkActive(cityLeft)) {
    toggleActive(cityLeft);
  }
  toggleActive(cityRight);
});
// element.setTimeout(function, milliseconds)
let t = 5;
const timer = setInterval(function () {
  if (t < 0) {
    console.log('submit and show answers');
    // emit answer
    socket.emit('give answer', {
      // userID: getUserID(),
      answer: whichAnswer(),
    });
    socket.on('send temp', function (data) {
      const tempA = data.tempA;
      const tempB = data.tempB;
      leftTemp.innerText = `${tempA} graden`;
      rightTemp.innerText = `${tempB} graden`;
    });

    // update leaderboard
    socket.on('update leaderboard', function (data) {
      console.log(data.standings[0].userID);
      // const el = document.getElementById(data.standings[0].userID);
      // console.log(el);
      // _test = [{score: 1, userID: ""}]
    });

    clearInterval(timer);
  } else if (t < 10) {
    countdown.innerText = `0${t--}`;
  } else {
    countdown.innerText = t--;
  }
}, 1000);

// check which answer is given
function whichAnswer() {
  const answerOne = checkActive(cityLeft);
  const answerTwo = checkActive(cityRight);
  if (answerOne) {
    console.log('answer 1');
    return 1;
  } else if (answerTwo) {
    console.log('answer 2');
    return 2;
  } else {
    console.log('no answer given');
    return 0;
  }
}

// check if active class excist
function checkActive(element) {
  return element.classList.contains('active');
}

function toggleActive(element) {
  element.classList.toggle('active');
}

// leaderboard
socket.on('blub', (data) => {
  console.log(data);
});
// window.onbeforeunload = function () {
//   return "Please don't reload.";
// };
