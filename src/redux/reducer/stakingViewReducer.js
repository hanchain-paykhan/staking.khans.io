let initialState = {
  getAmount: "",
  getRewardReleased: "",
  stakingTokenBalance: 0,
  resultValue: "",
  getBalance: "",
  canAmountStake: "",
  hanTokenPerLpToken: "",
  allowanceAmount: 0,
  HanQuantityLpQuantityPerYear1HanValue: "",
  successStaking: false,
  succuessClaim: false,
  successUnStaking: false,
  successApprove: false,
};

function stakingViewReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_STAKING_VIEW_SUCCESS":
      return {
        ...state,
        getAmount: payload.getAmount,
        getRewardReleased: payload.getRewardReleased,
        stakingTokenBalance: payload.stakingTokenBalance,
        resultValue: payload.resultValue,
        getBalance: payload.getBalance,
        canAmountStake: payload.canAmountStake,
        hanTokenPerLpToken: payload.hanTokenPerLpToken,
        allowanceAmount: payload.allowanceAmount,
        HanQuantityLpQuantityPerYear1HanValue: payload.HanQuantityLpQuantityPerYear1HanValue,
      };

    case "SUCCESS_STAKING":
      return { ...state, successStaking: payload.successStaking };

    case "SUCCESS_CLAIM":
      return { ...state, succuessClaim: payload.succuessClaim };

    case "SUCCESS_UNSTAKING":
      return { ...state, successUnStaking: payload.successUnStaking };

    case "SUCCESS_APPORVE":
      return { ...state, successApprove: payload.successApprove };

    default:
      return { ...state };
  }
}

export default stakingViewReducer;
