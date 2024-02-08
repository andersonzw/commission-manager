import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  comList: [],
};
export const comSlice = createSlice({
  name: "coms",
  initialState: INITIAL_STATE,
  reducers: {
    addCommissionToList: (state, action) => {
      state.comList = [...state.comList, action.payload];
    },
    fetchCommissionList: (state, action) => {
      state.comList = action.payload;
    },

    removeCommissionFromList: (state, action) => {
      // tasks in id of comission to remove as payload
      const newList = HELPER_removeComFromList(state.comList, action.payload);
      state.comList = newList;
    },

    changeStatusToComplete: (state, action) => {
      const newList = HELPER_changeToComplete(state.comList, action.payload);
      state.comList = newList;
    },
  },
});

//helper functions
const HELPER_removeComFromList = (currentList, idOfCommission) => {
  return currentList.filter((com) => com.id !== idOfCommission);
};

const HELPER_changeToComplete = (currentList, idOfCommission) => {
  return currentList.map((item) =>
    item.id === idOfCommission ? { ...item, status: "Completed" } : item
  );
};

export const {
  addCommissionToList,
  fetchCommissionList,
  removeCommissionFromList,
  changeStatusToComplete,
} = comSlice.actions;
export const comReducer = comSlice.reducer;
export const selectComList = (state) => state.coms.comList;

// Async thunk for fetching commission from firebase
// export const fetchCommissionList  = createAsyncThunk(
//   'coms/fetchComs',
//   async (_, { getState }) => {
//     const userId = getState().user.uid;
//     if (!userId) return []
//     const q = dbQuery(`users/${userId}/commissionList`)
//     const querySnapshot = await getDocs(q)
//     querySnapshot.docs.map(doc => console.log(doc))
//   }
// )
