import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loadState: false,
};

export const globalLoadSlice = createSlice({
  name: "globalLoad",
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, action) => {
      state.loadState = action.payload;
    },
  },
});

export const { setLoading } = globalLoadSlice.actions;
export const globalLoadReducer = globalLoadSlice.reducer;
export const selectGlobalLoad = (state) => state.globalLoad.loadState;

