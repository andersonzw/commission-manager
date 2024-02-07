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
    // contains full commission details including imageurl and and reference
    fetchCommissionList: (state, action) => {
      state.comList = action.payload;
    },
    // storage for sidebar
    fetchCommissionListSmall: (state,action)=>{
      state.comList = action.payload;
    }
  },
});

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
