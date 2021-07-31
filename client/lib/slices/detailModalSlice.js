/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';

const detailModalSlice = createSlice({
  name: 'detailModal',
  initialState: {
    modalIsClosed: true,
    modalContent: {},
  },
  reducers: {
    showModalDetail: (state, action) => {
      state.modalIsClosed = false;
      state.modalContent = action.payload || {};
    },
    hideModalDetail: (state, action) => {
      state.modalIsClosed = true,
      state.modalContent = {};
    },
  },
});

export const selectModalState = (state) => state.detailModal.modalIsClosed;
export const selectModalContent = (state) => state.detailModal.modalContent;

export const {showModalDetail, hideModalDetail} = detailModalSlice.actions;

export default detailModalSlice.reducer;
