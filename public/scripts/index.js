document.addEventListener('DOMContentLoaded', init, false);
let videoPlayer;
let socket = io.connect();

socket.on('play', e => {
  console.log('play', e);
  videoPlayer.currentTime = e;
  videoPlayer.play();
})
socket.on('pause', e => {
  console.log('pause', e);
  videoPlayer.pause();
})
socket.on('seeked', e => {
  console.log('seeked', e);
  videoPlayer.currentTime = e;
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
    if (e.isTrusted) {
      socket.emit("play", videoPlayer.currentTime);
    }
  });

  videoPlayer.addEventListener("pause", (e) => {
    console.log(e);
    if (e.isTrusted) {
      socket.emit("pause", videoPlayer.currentTime);
    }
  });

  videoPlayer.addEventListener("seeked", (e) => {
    console.log(e);
    if (e.isTrusted) {
      socket.emit("seeked", videoPlayer.currentTime);
    }
  });
}
