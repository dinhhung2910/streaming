import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import MovieSocket from './movieSocket';
import Plyr from 'plyr-react';
import useInterval from '../lib/useInterval';
import {withResizeDetector} from 'react-resize-detector';

/**
 * @param {*} props props
 * @return {Component} component
 */
function MoviePlayer(props) {
  const [movie, setMovie] = useState(props.movie);
  const [playerId, setPlayerId] = useState(props.movie.code);
  const [playTimestamp, setPlayTimestamp] = useState(NaN);
  const [pauseTimestamp, setPauseTimestamp] = useState(NaN);

  useEffect(() => {
    setMovie(null);
    setTimeout(() => {
      setMovie(props.movie);
      setPlayerId(props.movie.code);
    }, 300);
  }, [props.movie]);

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
  }, 2000);

  return (
    <div id="video-container" className="video-container">
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
