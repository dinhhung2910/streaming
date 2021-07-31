import {configureStore} from '@reduxjs/toolkit';

import clockReducer from './lib/slices/clockSlice';
import counterReducer from './lib/slices/counterSlice';
import notesReducer from './lib/slices/notesSlice';
import detailModalReducer from './lib/slices/detailModalSlice';
import moviePlayerReducer from './lib/slices/moviePlayerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    clock: clockReducer,
    notes: notesReducer,
    detailModal: detailModalReducer,
    moviePlayer: moviePlayerReducer,
  },
  devTools: true,
});
