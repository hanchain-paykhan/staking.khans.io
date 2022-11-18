let initialState = {
  getAmount: "",
  getRewardReleased: "",
  stakingTokenBalance: "",
  resultValue: "",
  stakingTokenAmount: "",
  getWithdrawAmount: "",
  getBalance: "",
  tokenVolume: "",
  totalSupply: "",
  canAmountStake: "",
  hanTokenPerLpToken: "",
  // WETHBalanceOf: "" ,
  // HanBalanceOf : "",
  // getMintAmounts : "",
  allowanceAmount : "",
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
        tokenVolume: payload.tokenVolume,
        totalSupply: payload.totalSupply,
        canAmountStake: payload.canAmountStake,
        stakingTokenAmount: payload.stakingTokenAmount,
        getWithdrawAmount: payload.getWithdrawAmount,
        hanTokenPerLpToken: payload.hanTokenPerLpToken,
        allowanceAmount : payload.allowanceAmount,
        // WETHBalanceOf : payload.WETHBalanceOf,
        // HanBalanceOf : payload.HanBalanceOf,
        // getMintAmounts : payload.getMintAmounts,
        HanQuantityLpQuantityPerYear1HanValue:
          payload.HanQuantityLpQuantityPerYear1HanValue,
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
