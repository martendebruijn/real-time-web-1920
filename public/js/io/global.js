export const socket = io();

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

const usernameForm = document.getElementById('changeUsername'),
  usernameInput = document.getElementById('u'),
  playerCount = document.getElementById('playerCount'),
  playEl = document.getElementById('play'),
  home = document.getElementById('change_username'),
  rGame = document.getElementById('game'),
  messages = document.getElementById('messages'),
  messageForm = document.getElementById('sendMessage'),
  messageInput = document.getElementById('m'),
  cityLeft = document.querySelector('.city-left'),
  cityRight = document.querySelector('.city-right'),
  countdown = document.getElementById('countdown'),
  leftTemp = document.getElementById('tempA'),
  rightTemp = document.getElementById('tempB'),
  leaderboard = document.getElementById('js-leaderboard'),
  imgcitya = document.getElementById('cityaimg'),
  imgcityb = document.getElementById('citybimg'),
  cityaname = document.getElementById('cityaname'),
  citybname = document.getElementById('citybname');
let questionIndex = 0;

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

// emit game start
playEl.addEventListener('click', function (e) {
  console.log('pressed');
  socket.emit('game start');
});

// listen to game start event
socket.on('game start', function (data) {
  home.classList.toggle('d-none');
  rGame.classList.toggle('d-none');
  data.listClients.forEach(function (item) {
    const ulel = document.createElement('ul');
    ulel.setAttribute('id', item);
    ulel.innerHTML = `<span>${item}</span><span>Score: </span><span class="s">0</span>`;
    leaderboard.append(ulel);
  });
  timerFunction();
});

// --------------- GAME --------------

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
  console.log(data);
  const msgEl = document.createElement('p');
  msgEl.innerText = `${data.username}: ${data.message}`;
  messages.append(msgEl);
});

socket.on('send temp', function (data) {
  const tempA = data.tempA,
    tempB = data.tempB;
  leftTemp.innerText = `${tempA} graden`;
  rightTemp.innerText = `${tempB} graden`;
});

// update leaderboard
socket.on('update leaderboard', function (data) {
  console.log(data);
  data.standings.forEach(function (item) {
    const el = document.getElementById(item.userID),
      scoreEl = el.getElementsByClassName('s')[0];
    scoreEl.innerText = item.score;
  });
});

// render volgende vraag
socket.on('next question', function (data) {
  console.log(data);
  // render
  const _q = data.nextQuestion,
    c1 = _q.city1,
    c2 = _q.city2;
  setTimeout(function () {
    imgcitya.src = c1.imgURL;
    imgcityb.src = c2.imgURL;
    cityaname.innerText = c1.city;
    citybname.innerText = c2.city;
    leftTemp.innerText = '';
    rightTemp.innerText = '';
    // remove active class
    const activeEl = whichAnswer();
    if (activeEl === 1) {
      toggleActive(cityLeft);
    } else if (activeEl === 2) {
      toggleActive(cityRight);
    }
    timerFunction();
  }, 3000);
});

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
function timerFunction() {
  console.log(questionIndex);
  let t = 15;
  const timer = setInterval(function () {
    if (t < 0) {
      console.log('submit and show answers');
      // emit answer
      socket.emit('give answer', {
        // userID: getUserID(),
        answer: whichAnswer(),
      });

      questionIndex++;
      console.log('QUESTIONINDEX');
      console.log(questionIndex);
      clearInterval(timer);
    } else if (t < 10) {
      countdown.innerText = `0${t--}`;
    } else {
      countdown.innerText = t--;
    }
  }, 1000);
}

// check which answer is given
function whichAnswer() {
  const answerOne = checkActive(cityLeft),
    answerTwo = checkActive(cityRight);
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
