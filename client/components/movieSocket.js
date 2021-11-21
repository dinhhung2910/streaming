import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import {togglePlayer} from '../lib/slices/moviePlayerSlice';
import {SYNC_SERVER} from '../utils/constants';
/**
 *
 * @param {*} props props
 * @return {Component} component
 */
function MovieSocket(props) {
  const {
    movieId,
    playTimestamp,
    pauseTimestamp,
  } = props;

  const dispatch = useDispatch();
  const [socket, setSocket] = useState({});
  const [roomId, setRoomId] = useState('');
  const [isSocketAction, setIsSocketAction] = useState(false);
  const [player, setPlayer] = useState({
    id: '',
  });

  const [timeStamp, setTimeStamp] = useState({
    play: new Set(),
    pause: new Set(),
    seek: new Set(),
  });

  // watch when playerId is changed
  useEffect(() => {
    setPlayer({
      ...player,
      id: props.playerId,
    });
    setTimeStamp({
      play: new Set(),
      pause: new Set(),
      seek: new Set(),
    });
  }, [props.playerId]);

  useEffect(() => {
    try {
      socket.off('play');
      socket.off('pause');

      socket.on('play', (e) => {
        try {
          if (!timeStamp.play.has(e)) {
            try {
              dispatch(togglePlayer(true));
              console.log('toggled');
            } catch (e) {
              console.error(e);
            }

            // not seek again
            timeStamp.seek.add(e);
            const moviePlayer = document.getElementById(props.playerId);
            if (Math.abs(moviePlayer.currentTime - e) > 0.1) {
              moviePlayer.currentTime = e;
            }


            moviePlayer.play();
            setIsSocketAction(true);
            setTimeout(() => {
              setIsSocketAction(false);
            }, 200);
          }
        } catch (e) {
          console.error('Can\'t get video player with Id', player.id);
        }
      });

      socket.on('pause', (e) => {
        if (!timeStamp.pause.has(e)) {
          try {
            const moviePlayer = document.getElementById(props.playerId);
            moviePlayer.pause();
            if (Math.abs(moviePlayer.currentTime - e) > 0.1) {
              moviePlayer.currentTime = e;
            }

            setIsSocketAction(true);
            setTimeout(() => {
              setIsSocketAction(false);
            }, 200);
          } catch (e) {
            console.error('Can\'t get video player with Id', player.id);
          }
        }
      });
    } catch (e) {
      console.error(e);
      console.warn('Socket hasn\'t been initialized yet');
    }
  }, [socket.id, props.playerId]);

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

  // watch when movie is play
  useEffect(() => {
    if (!isNaN(playTimestamp)) {
      if (timeStamp.play.has(playTimestamp) || isSocketAction) return;
      try {
        socket.emit('play', {
          timestamp: playTimestamp,
          room: roomId,
        });
      } catch (e) {
        console.warn(e);
      }

      timeStamp.play.add(playTimestamp);
    }
  }, [playTimestamp]);

  // watch when movie is pause
  useEffect(() => {
    if (!isNaN(pauseTimestamp)) {
      if (timeStamp.pause.has(pauseTimestamp) || isSocketAction) return;

      try {
        socket.emit('pause', {
          timestamp: pauseTimestamp,
          room: roomId,
        });
      } catch (e) {
        console.warn(e);
      }
    }
  }, [pauseTimestamp]);


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
    const roomSocket = io(SYNC_SERVER + '/room',
      {path: '/streaming/server/socket.io'},
    );
    setSocket(roomSocket);
    roomSocket.on('play', (e) => {
      try {
        if (!timeStamp.play.has(e)) {
          try {
            dispatch(togglePlayer(true));
            console.log('toggled');
          } catch (e) {
            console.error(e);
          }
          // not seek again
          timeStamp.seek.add(e);
          const moviePlayer = document.getElementById(player.id);
          if (Math.abs(moviePlayer.currentTime - e) > 0.1) {
            moviePlayer.currentTime = e;
          }

          moviePlayer.play();
          setIsSocketAction(true);
          setTimeout(() => {
            setIsSocketAction(false);
          }, 200);
        }
      } catch (e) {
        console.error('Can\'t get video player with Id', player.id);
      }
    });

    roomSocket.on('pause', (e) => {
      if (!timeStamp.pause.has(e)) {
        try {
          const moviePlayer = document.getElementById(player.id);
          moviePlayer.pause();
          if (Math.abs(moviePlayer.currentTime - e) > 0.1) {
            moviePlayer.currentTime = e;
          }

          setIsSocketAction(true);
          setTimeout(() => {
            setIsSocketAction(false);
          }, 200);
        } catch (e) {
          console.error('Can\'t get video player with Id', player.id);
        }
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