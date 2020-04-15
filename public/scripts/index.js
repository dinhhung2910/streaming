document.addEventListener('DOMContentLoaded', init, false);
let videoPlayer;
let socket = io('/room');
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
    if (Math.abs(videoPlayer.currentTime - e) > 0.1)
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
    if (Math.abs(videoPlayer.currentTime - e) > 0.1)
      videoPlayer.currentTime = e;
  }
})

/** 
* You can manipulate the video here
* For example: Uncomment the code below and in the index to get a Start/Stop button
*/
function init() {

  loadAllMovie()
  try {
    let code = window.location.pathname.split('/')[2];
    loadMovieByCode(code).then(res => {
      let {video, id} = res;
      // join this specific chanel
      socket.emit('create', id);
      videoPlayer = video;

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
    });
  } catch(err) {
    document.querySelector('.home__title').innerHTML = 'Sorry, this video is not available right now';
  }
  

  // videoPlayer = document.getElementById("videoPlayer");
}

function loadAllMovie() {
  let template = `
    <div class="card">
      <div class="card__cover">
        <img src="" alt="">
        <a href="#" class="card__play">
          <i class="icon ion-ios-play"></i>
        </a>
      </div>
      <div class="card__content">
        <h3 class="card__title"><a href="#"></a></h3>
        <span class="card__category">
          <a href="#">Action</a>
          <a href="#">Triler</a>
        </span>
        <span class="card__rate"><i class="icon ion-ios-star"></i><span class="point">8.4</span></span>
      </div>
    </div>`;

  let divAllMovies = document.getElementById('all-movie');
   
  fetch('/api/movies/').then(res => res.json()).then(movies => {
    movies.forEach(movie => {
      
      let div = document.createElement('div');
      div.className = `col-6 col-sm-4 col-lg-3 col-xl-2`;
      div.innerHTML = template;
      let img = div.querySelector('.card__cover img');
      let divTitle = div.querySelector('.card__title a');
      let categories = div.querySelector('.card__category');
      let point = div.querySelector('.card__rate .point');
      let playButton = div.querySelector('.card__play');

      img.src = movie.images.poster;
      divTitle.innerHTML = movie.name;
      divTitle.setAttribute('href', '/streaming/' + movie.code);
      playButton.setAttribute('href', '/streaming/' + movie.code);
      categories.innerHTML = movie.tags.map(tag => `<a href="#">${tag.code}</a>`).join('');
      point.innerHTML = movie.point;

      // console.log(div);
      divAllMovies.insertBefore(div, divAllMovies.lastElementChild);
    });
  }).catch(err => {
    console.error(err);
  })
}

function loadMovieByCode(code) {
  return new Promise((resolve, reject) => {
    fetch('/api/movies/code/' + code).then(res => {
      if (res.status !== 200) {
        throw new Error("Not 200 response")
      } else {
        res.json().then(movie => {
          document.title += ' | ' + movie.name;
          if (!movie.isAvailable) {
            throw new Error("Video not available");
          }
          document.querySelector('.home__title').innerHTML = `WATCHING <b>${movie.name.toUpperCase()}</b>`;

          let videoPlayer = document.createElement('video');
          videoPlayer.setAttribute('controls', '');
          videoPlayer.id = 'videoPlayer';

          let source = document.createElement('source');
          source.setAttribute('src', movie.onlineLink);
          source.setAttribute('type', 'video/mp4');

          movie.subtitles.forEach(subtitle => {
            let track = document.createElement('track');
            track.setAttribute('kind', 'subtitles');
            track.setAttribute('srclang', subtitle.srclang);
            track.setAttribute('src', subtitle.link);
            track.setAttribute('label', subtitle.language);
            videoPlayer.append(track);
          });

          videoPlayer.append(source);

          document.getElementById('video-container').append(videoPlayer);
          resolve({video: videoPlayer, id: movie._id});

        }).catch(err => {
          console.log(err);
          document.querySelector('.home__title').innerHTML = 'Sorry, this video is not available right now';
        });
      }
    }).catch(err => {
      console.log(err);
      document.querySelector('.home__title').innerHTML = 'Sorry, this video is not available right now';
    });
  })
}
