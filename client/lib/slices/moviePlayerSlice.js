/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';

const moviePlayerSlice = createSlice({
  name: 'moviePlayer',
  initialState: {
    showPlayer: false,
    playing: false,
    playerId: '',
  },
  reducers: {
    togglePlayer: (state, action) => {
      state.showPlayer = action.payload;
    },
    playPlayer: (state) => {
      state.playing = true;
    },
    pausePlayer: (state) => {
      state.playing = false;
    },
    setPlayerId: (state, action) => {
      state.playerId = action.payload;
    },
  },
});

export const selectMoviePlayer = (state) => state.moviePlayer;
export const selectShowMoviePlayer = (state) => state.moviePlayer.showPlayer;

export const {togglePlayer, playPlayer, pausePlayer, setPlayerId} = moviePlayerSlice.actions;

export default moviePlayerSlice.reducer;
