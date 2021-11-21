import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import MovieSocket from './movieSocket';
import Plyr from 'plyr-react';
import useInterval from '../lib/useInterval';
import {selectShowMoviePlayer} from '../lib/slices/moviePlayerSlice';
import {useSelector} from 'react-redux';

/**
 * @param {*} props props
 * @return {Component} component
 */
function MoviePlayer({movie: initMovie, ...props}) {
  const [movie, setMovie] = useState(initMovie);
  const [playerId, setPlayerId] = useState(initMovie.code);
  const [playTimestamp, setPlayTimestamp] = useState(NaN);
  const [pauseTimestamp, setPauseTimestamp] = useState(NaN);
  const showMoviePlayer = useSelector(selectShowMoviePlayer);
  const [firstPlay, setFirstPlay] = useState(true);

  useEffect(() => {
    setMovie(null);
    setTimeout(() => {
      setMovie(initMovie);
      setPlayerId(initMovie.code);
    }, 300);
  }, [initMovie]);

  // autoplay 500ms after show
  useEffect(() => {
    if (showMoviePlayer && firstPlay) {
      setFirstPlay(false);
      setTimeout(() => {
        const videoPlayer = document.querySelector('.video-container video');
        videoPlayer.play();
      }, 0);
    }
  }, [showMoviePlayer]);

  useInterval(() => {
    const videoPlayer = document.querySelector('.video-container video');
    if (videoPlayer && !videoPlayer.onplay && !videoPlayer.onpause) {
      videoPlayer.id = movie.code;
      videoPlayer.onplay = function(e) {
        setPlayTimestamp(e.target.currentTime);
      };
      videoPlayer.onpause = function(e) {
        setPauseTimestamp(e.target.currentTime);
      };
    }

    const videoContainer = document.getElementById('video-container');

    if (document.fullscreenElement && videoContainer) {
      videoContainer.classList.add('fullscreen');
    } else {
      videoContainer.classList.remove('fullscreen');
    }

    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf('android') > -1;
    if (isAndroid) {
      videoContainer.classList.add('android');
    } else {
      videoContainer.classList.remove('android');
    }
  }, 2000);

  return (
    <div id="video-container" className="video-container" {...props}
      style={{display: !showMoviePlayer ? 'none' : ''}}>
      <MovieSocket
        playTimestamp={playTimestamp}
        pauseTimestamp={pauseTimestamp}
        playerId={playerId}
        movieId={movie ? movie.code : ''}/>
      {!movie ? null :
        (
          <div className="outer-1">
            <div className="outer-2">
              <PlyrPlayerMemo movie={movie} />
            </div>
          </div>
        )
      }
    </div>
  );
}

const PlyrPlayer = ({movie, width}) => {
  useEffect(() => {
    const videoPlayer = document.getElementById('video-container');
    if (videoPlayer) {
      videoPlayer.setAttribute('width', width);
    }
  }, [width]);

  return (
    <Plyr
      crossorigin="anonymous"
      source={{
        type: 'video',
        sources: (movie && movie.sources) ?
          movie.sources.map((source) => ({
            src: source.link,
            type: 'video/mp4',
            size: source.size,
          })) : [],
        tracks: (movie && movie.subtitles) ?
          movie.subtitles.map((item) => ({
            kind: 'subtitles',
            srcLang: item.srclang,
            src: item.link,
            label: item.language,
          })) : [],
      }}
    />
  );
};

const PlyrPlayerMemo = React.memo(PlyrPlayer, (props, nextPtops) => {
  return (props.movie == nextPtops.movie);
});


MoviePlayer.propTypes = {
  'props': PropTypes.object,
  'props.movie': PropTypes.object,

};
export default MoviePlayer;
