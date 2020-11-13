import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

/**
 * @param {*} props props
 * @return {Component} component
 */
function MoviePlayer(props) {
  const [movie, setMovie] = useState(props.movie);
  const ref = useRef('');

  useEffect(() => {
    setMovie(null);
    setTimeout(() => {
      setMovie(props.movie);
    }, 300);
  }, [props.movie]);

  return (
    <div id="video-container">
      {!movie ? null :
        (<video id={movie.code} controls ref={ref}>
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
  'props.movie': PropTypes.object.isRequired,

};
export default MoviePlayer;
