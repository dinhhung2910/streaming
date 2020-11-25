import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import MovieSocket from './movieSocket';

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

  return (
    <div id="video-container" className="video-container">
      <MovieSocket
        playTimestamp={playTimestamp}
        pauseTimestamp={pauseTimestamp}
        playerId={playerId}
        movieId={movie ? movie.code : ''}/>
      {!movie ? null :
        (<video
          id={movie.code}
          onPlay={(e) => {
            setPlayTimestamp(e.target.currentTime);
          }}
          onPause={(e) => {
            setPauseTimestamp(e.target.currentTime);
          }}
          controls>
          {movie.sources.map((source, index) =>
            (<source
              key={index}
              src={source.link}
              type="video/mp4"
              size={source.size} />))}
          {movie.subtitles.map((item, index) => (
            <track
              key ={index}
              kind='subtitles'
              srcLang={item.srclang}
              src={item.link}
              label={item.language}
            />
          ))}
        </video>) }
    </div>
  );
}

MoviePlayer.propTypes = {
  'props': PropTypes.object,
  'props.movie': PropTypes.object,

};
export default MoviePlayer;
