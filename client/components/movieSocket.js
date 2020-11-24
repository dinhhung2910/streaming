import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {BASE_API_URL} from '../utils/constants';
/**
 *
 * @param {*} props props
 * @return {Component} component
 */
function MovieSocket(props) {
  const {
    movieId,
    playerId,
    playTimestamp,
    pauseTimestamp,
  } = props;

  const [socket, setSocket] = useState({});
  const [roomId, setRoomId] = useState('');
  const [isSocketAction, setIsSocketAction] = useState(false);

  const [timeStamp, setTimeStamp] = useState({
    play: new Set(),
    pause: new Set(),
    seek: new Set(),
  });

  // Watch when movie source is changed
  useEffect(() => {
    try {
      socket.emit('quit', roomId);
      setRoomId(movieId);
      socket.emit('create', movieId);
    } catch (e) {
      console.warn(e);
    }

    return (() => {
      // setFirstPlay(true);
    });
  }, [movieId]);

  // Watch when movie source is change
  useEffect(() => {
    setTimeStamp({
      play: new Set(),
      pause: new Set(),
      seek: new Set(),
    });
  }, [playerId]);

  // watch when movie is play
  useEffect(() => {
    if (!isNaN(playTimestamp)) {
      if (timeStamp.play.has(playTimestamp) || isSocketAction) return;

      socket.emit('play', {
        timestamp: playTimestamp,
        room: roomId,
      });
      timeStamp.play.add(playTimestamp);
    }
  }, [playTimestamp]);

  // watch when movie is pause
  useEffect(() => {
    if (!isNaN(pauseTimestamp)) {
      if (timeStamp.pause.has(pauseTimestamp) || isSocketAction) return;

      socket.emit('pause', {
        timestamp: pauseTimestamp,
        room: roomId,
      });
    }
  }, [pauseTimestamp]);

  // const onPlayEvent = (e) => {
  //   if (firstPlay) {
  //     socket.emit('whattimeisit');
  //     setFirstPlay(false);
  //     return;
  //   }
  //   if (timeStamp.play.has(e) || isSocketAction) return;
  //   if (e.isTrusted) {
  //     socket.emit('play', moviePlayer.currentTime);
  //     timeStamp.play.add(e);
  //   }
  // };

  // const onPauseEvent = (e) => {
  //   if (timeStamp.pause.has(e) || isSocketAction) return;
  //   if (e.isTrusted) {
  //     socket.emit('pause', moviePlayer.currentTime);
  //     timeStamp.pause.add(e);
  //   }
  // };

  // const onSeekEvent = (e) => {
  //   if (timeStamp.seek.has(e) || isSocketAction) return;
  //   if (e.isTrusted) {
  //     socket.emit('seeked', moviePlayer.currentTime);
  //     timeStamp.seek.add(e);
  //   }
  // };

  // /* Watch video player element to detect when video's source is changed
  //  * Then remove listeners on old elm and add listeners to new elm
  //  */


  /* Watch socket to check when it is disconnected
   */
  useEffect(() => {
    try {
      socket.emit('create', roomId || movieId);
    } catch (e) {
      console.warn(e);
    }
  }, [socket.id]);

  /* Init socket when mount element
   */
  useEffect(() => {
    const roomSocket = io('http://kaito-bk.com/room',
      {path: '/streaming/server/socket.io'},
    );
    setSocket(roomSocket);
    roomSocket.on('play', (e) => {
      if (!timeStamp.play.has(e)) {
        // not seek again
        timeStamp.seek.add(e);
        const moviePlayer = document.getElementById(playerId);
        if (Math.abs(moviePlayer.currentTime - e) > 0.1) {
          moviePlayer.currentTime = e;
        }

        moviePlayer.play();
        setIsSocketAction(true);
        setTimeout(() => {
          setIsSocketAction(false);
        }, 200);
      }
    });

    roomSocket.on('pause', (e) => {
      if (!timeStamp.pause.has(e)) {
        const moviePlayer = document.getElementById(playerId);
        moviePlayer.pause();
        if (Math.abs(moviePlayer.currentTime - e) > 0.1) {
          moviePlayer.currentTime = e;
        }

        setIsSocketAction(true);
        setTimeout(() => {
          setIsSocketAction(false);
        }, 200);
      }
    });

    roomSocket.on('seeked', (e) => {
      if (!timeStamp.seek.has(e)) {
        console.log('seeked', e);
        // disableActions();
        if (Math.abs(moviePlayer.currentTime - e) > 0.1) {
          moviePlayer.currentTime = e;
        }
      }
    });

    // ask time when join room
    roomSocket.on('whattimeisit', (requestId) => {
      roomSocket.emit('timeis', {
        to: requestId,
        time: moviePlayer.currentTime,
      });
    });

    roomSocket.on('timeis', (e) => {
      // alert(e);
      moviePlayer.currentTime = e;
      roomSocket.off('timeis');
      roomSocket.emit('play', e);
    });
    console.log(roomSocket);
    // }, []);
  }, []);

  return null;
}

export default MovieSocket;
