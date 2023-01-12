import { combineReducers } from "redux";
import stakingViewReducer from "./stakingViewReducer";
import rakis6StakingResultReducer from "./rakis6StakingResultReducer";
import accountReducer from "./accountReducer";
import sprStakingViewReducer from "./sprStakingViewReducer";
import sprStakingResultReducer from "./sprStakingResultReducer";
import sprStakingApproveReducer from "./sprStakingApproveReducer";
import gasPriceResultReducer from "./gasPriceResultReducer";
import getSprTokenImgVideoReducer from "./getSprTokenImgVideoReducer";
import airDropReducer from "./airDropReducer";
import airDropLatestPriceReducer from "./airDropLatestPriceReducer";
import coinPriceReducer from "./coinPriceReducer";

export default combineReducers({
  stakingView: stakingViewReducer,
  rakis6StakingResultView: rakis6StakingResultReducer,
  account: accountReducer,
  sprStakingView: sprStakingViewReducer,
  sprStakingResultView: sprStakingResultReducer,
  sprStakingApporveView: sprStakingApproveReducer,
  gasPrice: gasPriceResultReducer,
  allStakingToken: getSprTokenImgVideoReducer,
  airDropView: airDropReducer,
  airDropLatestPrice: airDropLatestPriceReducer,
  coinPrice: coinPriceReducer,
});
