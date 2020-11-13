import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import Plyr from 'plyr';
import PropTypes from 'prop-types';

/**
 * @param {*} props props
 * @return {Component} component
 */
function MoviePlayer(props) {
  const [movie, setMovie] = useState(props.movie);

  const id = 'a__movieplayer';

  useEffect(() => {
    setMovie(props.movie);
    new Plyr(`#${id}`);
  }, [props.movie]);

  return (
    <div id="video-container">
      <video id={id} controls>
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
      </video>
    </div>
  );
}

MoviePlayer.propTypes = {
  'props': PropTypes.object,
  'props.movie': PropTypes.object.isRequired,

};
export default MoviePlayer;
