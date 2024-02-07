import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentActiveTab: {
    currentTab: "",
    editMode: "",
  },
};

export const activeTabSlice = createSlice({
  name: "activeTab",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentActiveTab: (state, action) => {
      state.currentActiveTab = {
        ...state.currentActiveTab,
        currentTab: action.payload.currentTab,
        editMode: action.payload.editMode,
      };
    },
  },
});

export const { setCurrentActiveTab } = activeTabSlice.actions;
export const activeTabReducer = activeTabSlice.reducer;
export const selectCurrentActiveTab = (state) =>
  state.activeTab.currentActiveTab;
