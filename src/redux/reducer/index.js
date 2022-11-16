import { combineReducers } from "redux";
import stakingViewReducer from "./stakingViewReducer";
import accountReducer from "./accountReducer";

export default combineReducers ({
    stakingView : stakingViewReducer,
    account : accountReducer,
})