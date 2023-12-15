import { combineReducers } from "@reduxjs/toolkit";
import { comReducer } from "./commissionSlice";

export const rootReducer = combineReducers({
    coms: comReducer,
})