import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {BASE_API_URL} from '../utils/constants';
/**
 *
 * @param {*} props props
 * @return {Component} component
 */
function MovieSocket(props) {
  const {movieRef} = props;


  const [socket, setSocket] = useState(null);
  const [firstPlay, setFirstPlay] = useState(true);
  const [moviePlayer, setMoviePlayer] = useState(null);
  const [cycle, setCycle] = useState(0);
  const [timeStamp, setTimeStamp] = useState({
    play: new Set(),
    pause: new Set(),
    seek: new Set(),
  });

  const onPlayEvent = (e) => {
    console.log(e.target.currentTime);
  };

  const onPauseEvent = (e) => {
    console.log(this);
  };

  const onSeekEvent = (e) => {
    console.log(this);
  };

  /* Watch video player element to detect when video's source is changed
   * Then remove listeners on old elm and add listeners to new elm
   */
  useEffect(() => {
    if (movieRef.current) {
      setMoviePlayer(movieRef.current);
      movieRef.current.addEventListener('play', onPlayEvent);
      movieRef.current.addEventListener('pause', onPauseEvent);
      movieRef.current.addEventListener('seek', onSeekEvent);

      return (() => {
        if (movieRef.current) {
          movieRef.current.removeEventListener('play', onPlayEvent);
          movieRef.current.removeEventListener('pause', onPauseEvent);
          movieRef.current.removeEventListener('seek', onSeekEvent);
        }
      });
    }
  }, [movieRef.current]);

  /* refresh new cycle each 10 seconds */
  setInterval(() => {
    setCycle(cycle + 1);
  }, 1000);

  useEffect(() => {
    setTimeStamp({
      play: new Set(),
      pause: new Set(),
      seek: new Set(),
    });
  }, [cycle]);

  /* Init socket when mount element
   */
  useEffect(() => {
    setSocket(io('http://localhost:5000/room', {
      // path: '/streaming/server/socket.io',
    }));
  }, []);

  return null;
}

export default MovieSocket;
