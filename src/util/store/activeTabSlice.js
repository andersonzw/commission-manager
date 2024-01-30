import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    currentActiveTab: ''
}

export const activeTabSlice = createSlice({
    name: 'activeTab',
    initialState : INITIAL_STATE,
    reducers: {
        setCurrentActiveTab: (state,action) =>{
            state.currentActiveTab = action.payload
        }
    }
})

export const {setCurrentActiveTab} = activeTabSlice.actions
export const activeTabReducer = activeTabSlice.reducer
export const selectCurrentActiveTab = (state) => state.activeTab.currentActiveTab