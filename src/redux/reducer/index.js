import { combineReducers } from "redux";
import stakingViewReducer from "./stakingViewReducer";
import accountReducer from "./accountReducer";
import sprStakingViewReducer from "./sprStakingViewReducer";
import sprStakingResultReducer from "./sprStakingResultReducer";
import sprStakingApproveReducer from "./sprStakingApproveReducer"
import gasPriceResultReducer from "./gasPriceResultReducer"
import getSprTokenImgVideoReducer from "./getSprTokenImgVideoReducer"

export default combineReducers ({
    stakingView : stakingViewReducer,
    account : accountReducer,
    sprStakingView : sprStakingViewReducer,
    sprStakingResultView : sprStakingResultReducer,
    sprStakingApporveView : sprStakingApproveReducer,
    gasPrice : gasPriceResultReducer,
    allStakingToken : getSprTokenImgVideoReducer,
})
