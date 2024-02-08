import { combineReducers } from "@reduxjs/toolkit";
import { comReducer } from "./commissionSlice";
import { userReducer } from "./userSlice";
import { activeTabReducer } from "./activeTabSlice";
import { globalLoadReducer } from "./globalLoadSlice";

export const rootReducer = combineReducers({
    coms: comReducer,
    user: userReducer,
    activeTab: activeTabReducer,
    globalLoad: globalLoadReducer,
})