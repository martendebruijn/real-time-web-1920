const socket = io();
/* jquery document ready function to vanilla JS 
 Source: https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#document-ready */
const ready = (callback) => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
  socket.on('connection', function () {
    console.log('connection to server made');
  });
});
// https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088
