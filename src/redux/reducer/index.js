import { combineReducers } from "redux";
import stakingViewReducer from "./stakingViewReducer";
import rakis6StakingResultReducer from "./rakis6StakingResultReducer";
import accountReducer from "./accountReducer";
import SPRV2StakingResultReducer from "./SPRV2StakingReducer/SPRV2StakingResultReducer";
import SPRV2StakingViewReducer from "./SPRV2StakingReducer/SPRV2StakingViewReducer";
import gasPriceResultReducer from "./gasPriceResultReducer";
import airDropReducer from "./airDropReducer/wethAirDrop/airDropReducer";
import airDropLatestPriceReducer from "./airDropReducer/wethAirDrop/airDropLatestPriceReducer";
import coinPriceReducer from "./coinPriceReducer";
import networksReducer from "./networksReducer";
import musiKhanL1TokenApproveReducer from "./musiKhanReducer/L1/musiKhanL1TokenApproveReducer";
import musiKhanL1TokenBalanceReducer from "./musiKhanReducer/L1/musiKhanL1TokenBalanceReducer";
import musiKhanL1ViewReducer from "./musiKhanReducer/L1/musiKhanL1ViewReducer";
import L2BridgeViewReducer from "./musiKhanReducer/L2/L2BridgeViewReducer";
import L2BridgeMintReducer from "./musiKhanReducer/L2/L2BridgeMintReducer";
import musikhanCaViewReducer from "./musiKhanReducer/L2/musikhanCaViewReducer";
import musikhanL2ViewReducer from "./musiKhanReducer/L2/musikhanL2ViewReducer";
import musiKhanL2TokenApproveReducer from "./musiKhanReducer/L2/musiKhanL2TokenApproveReducer";
import musikhanL2RewardReducer from "./musiKhanReducer/L2/musikhanL2RewardReducer";
import musiAirDropReducer from "./airDropReducer/musiAirDropReducer/musiAirDropReducer";
import L2SwapViewReducer from "./musiKhanReducer/L2/L2SwapViewReducer";
import L2SwapTokenBalanceReducer from "./musiKhanReducer/L2/L2SwapTokenBalanceReducer";
import L2SwapTokenApproveReducer from "./musiKhanReducer/L2/L2SwapTokenApproveReducer";
import rakis6AirDropViewReducer from "./airDropReducer/rakis6AirDrop/rakis6AirDropViewReducer";
import rakis6AirDropTimeStampReducer from "./airDropReducer/rakis6AirDrop/rakis6AirDropTimeStampReducer";
import rakis6AirDropRewardReducer from "./airDropReducer/rakis6AirDrop/rakis6AirDropRewardReducer";
import rakis6AirDropTotalRewardReducer from "./airDropReducer/rakis6AirDrop/rakis6AirDropTotalRewardReducer";
import signUpReducer from "./airDropReducer/login/signUpReducer";
import hanAirDropViewReducer from "./airDropReducer/hanAirDrop/hanAirDropViewReducer";
import emailEffectReducer from "./airDropReducer/login/emailEffectReducer";
import munieStakingViewReducer from "./munieStakingReducer/munieStakingViewReducer";
import munieStakingResultReducer from "./munieStakingReducer/munieStakingResultReducer";
import munieAirDropViewReducer from "./airDropReducer/munieAirDrop/munieAirDropViewReducer";
import hanStakingViewReducer from "./hanStakingReducer/hanStakingViewReducer";
import hanStakingDurationReducer from "./hanStakingReducer/hanStakingDurationReducer";
import uniV2ViewReducer from "./uniV2ViewReducer/uniV2ViewReducer";
import UniV2PrivateViewReducer from "./airDropReducer/UniV2Private/UniV2PrivateViewReducer";
import UniV2PrRemainingDurationReducer from "./airDropReducer/UniV2Private/UniV2PrRemainingDurationReducer";
import usdcAirDropViewReducer from "./airDropReducer/UsdcAirDrop/usdcAirDropViewReducer";
import oldMunieStakingResultReducer from "./OldEplatReducer/OldMunieReducer/oldMunieStakingResultReducer";
import oldMunieStakingViewReducer from "./OldEplatReducer/OldMunieReducer/oldMunieStakingViewReducer";
// old Spr
import oldSprAllStakedViewReducer from "./OldEplatReducer/OldSprReducer/oldSprAllStakedViewReducer";
import oldSprStakingApproveReducer from "./OldEplatReducer/OldSprReducer/oldSprStakingApproveReducer";
import oldSprStakingResultReducer from "./OldEplatReducer/OldSprReducer/oldSprStakingResultReducer";
import oldSprStakingViewReducer from "./OldEplatReducer/OldSprReducer/oldSprStakingViewReducer";
//tokenomic
import ethHanTokenomicReducer from "./tokenomicReducer/ethHanTokenomicReducer";
import opHanTokenomicReducer from "./tokenomicReducer/opHanTokenomicReducer";
import ethHanEpTokenomicReducer from "./tokenomicReducer/ethHanEpTokenomicReducer";

export default combineReducers({
  stakingView: stakingViewReducer,
  rakis6StakingResultView: rakis6StakingResultReducer,
  account: accountReducer,
  SPRV2StakingResult: SPRV2StakingResultReducer,
  SPRV2StakingView: SPRV2StakingViewReducer,
  gasPrice: gasPriceResultReducer,
  airDropView: airDropReducer,
  airDropLatestPrice: airDropLatestPriceReducer,
  coinPrice: coinPriceReducer,
  networks: networksReducer,
  musiL1Approve: musiKhanL1TokenApproveReducer,
  musiL1TokenBalance: musiKhanL1TokenBalanceReducer,
  musikhanL1View: musiKhanL1ViewReducer,
  L2BridgeView: L2BridgeViewReducer,
  L2BridgeMint: L2BridgeMintReducer,
  musikhanCaView: musikhanCaViewReducer,
  musikhanL2View: musikhanL2ViewReducer,
  musiL2Approve: musiKhanL2TokenApproveReducer,
  L2RewardView: musikhanL2RewardReducer,
  musiAirDropView: musiAirDropReducer,
  L2SwapView: L2SwapViewReducer,
  L2SwapTokenBalanceView: L2SwapTokenBalanceReducer,
  L2SwapApprove: L2SwapTokenApproveReducer,
  rakis6AirDropView: rakis6AirDropViewReducer,
  rakis6AirDropTimeStamp: rakis6AirDropTimeStampReducer,
  rakis6AirDropReward: rakis6AirDropRewardReducer,
  rakis6AirDropTotalRewardView: rakis6AirDropTotalRewardReducer,
  signUp: signUpReducer,
  hanAirDropView: hanAirDropViewReducer,
  signUpEmail: emailEffectReducer,
  munieStakingView: munieStakingViewReducer,
  munieStakingResultView: munieStakingResultReducer,
  munieAirDropView: munieAirDropViewReducer,
  hanStakingView: hanStakingViewReducer,
  hanStakingDuration: hanStakingDurationReducer,
  uniV2View: uniV2ViewReducer,
  usdcAirDropView: usdcAirDropViewReducer,
  //old Munie
  oldMunieStakingResult: oldMunieStakingResultReducer,
  oldMunieStakingView: oldMunieStakingViewReducer,
  // old Spr
  oldSprAllStakedView: oldSprAllStakedViewReducer,
  oldSprStakingApprove: oldSprStakingApproveReducer,
  oldSprStakingResult: oldSprStakingResultReducer,
  oldSprStakingView: oldSprStakingViewReducer,

  //UniV2Private
  UniV2PrivateView: UniV2PrivateViewReducer,
  UniV2PrRemainingDuration: UniV2PrRemainingDurationReducer,
  ethHanTokenomic: ethHanTokenomicReducer,
  opHanTokenomic: opHanTokenomicReducer,
  ethHanEpTokenomic: ethHanEpTokenomicReducer,
});
