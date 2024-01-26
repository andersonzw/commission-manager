import { combineReducers } from "@reduxjs/toolkit";
import { comReducer } from "./commissionSlice";
import { userReducer } from "./userSlice";

export const rootReducer = combineReducers({
    coms: comReducer,
    user: userReducer,
})