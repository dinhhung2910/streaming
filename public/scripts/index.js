document.addEventListener('DOMContentLoaded', init, false);
let videoPlayer;
let socket = io.connect();
let timestamp = {};

function initTimestamp() {
  timestamp.play = new Set();
  timestamp.pause = new Set();
  timestamp.seek = new Set();
};
initTimestamp();

setInterval(() => {
  // console.info('reseting time log...');
  initTimestamp();
}, 10000);


socket.on('play', e => {
  if (!timestamp.play.has(e)) {
    console.log('play', e);
    // not seek again
    timestamp.seek.add(e);
    videoPlayer.currentTime = e;
    videoPlayer.play();
  }
})
socket.on('pause', e => {
  if (!timestamp.pause.has(e)) {
    console.log('pause', e);
    videoPlayer.pause();
  }
})
socket.on('seeked', e => {
  if (!timestamp.seek.has(e)) {
    console.log('seeked', e);
    videoPlayer.currentTime = e;
  }
})

/** 
* You can manipulate the video here
* For example: Uncomment the code below and in the index to get a Start/Stop button
*/
function init() {
  // const VP = document.getElementById('videoPlayer')
  // const VPToggle = document.getElementById('toggleButton')

  // VPToggle.addEventListener('click', function() {
  //   if (VP.paused) VP.play()
  //   else VP.pause()
  // })
  videoPlayer = document.getElementById("videoPlayer");

  videoPlayer.addEventListener("play", (e) => {
    console.log(e);
    if (timestamp.play.has(e)) return;
    if (e.isTrusted) {
      socket.emit("play", videoPlayer.currentTime);
      timestamp.play.add(e);
    }
  });

  videoPlayer.addEventListener("pause", (e) => {
    console.log(e);
    if (timestamp.pause.has(e)) return;
    if (e.isTrusted) {
      socket.emit("pause", videoPlayer.currentTime);
      timestamp.pause.add(e);
    }
  });

  videoPlayer.addEventListener("seeked", (e) => {
    console.log(e);
    if (timestamp.seek.has(e)) return;
    if (e.isTrusted) {
      socket.emit("seeked", videoPlayer.currentTime);
      timestamp.seek.add(e);
    }
  });
}
