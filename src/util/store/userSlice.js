import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    signInUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const {signInUser, signOutUser} = userSlice.actions
export const userReducer = userSlice.reducer
export const selectCurrentUser = (state) => state.user.currentUser