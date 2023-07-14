let initialState = {
  totalSupply: "",
  hanChainBalanceOf: 0,
  totalHanStakedAmount: "",
  hanChainAllowance: 0,
  successHanChainApprove: false,
  getHanStakerDataArray: [],
  hanWithdrawAmountToModal: "",
  hanWithdrawIndex: "",
  hanRewardPerSecondView: "",
  hanTotalRewardReleased: "",
};

function hanStakingViewReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "HAN_STAKING_VIEW":
      return {
        ...state,
        totalSupply: payload.totalSupply,
        hanChainBalanceOf: payload.hanChainBalanceOf,
        totalHanStakedAmount: payload.totalHanStakedAmount,
      };

    case "HAN_CHAIN_APPROVE_STATE":
      return {
        ...state,
        hanChainAllowance: payload.hanChainAllowance,
      };
    case "HAN_CHAIN_APPROVE_SUCCESS":
      return {
        ...state,
        successHanChainApprove: payload.successHanChainApprove,
      };

    case "HAN_CHAIN_WITHDRAW_TOKEN_LIST":
      return {
        ...state,
        getHanStakerDataArray: payload.getHanStakerDataArray,
      };

    case "HAN_WITHDRAW_VIEW_SUCCESS":
      return {
        ...state,
        hanWithdrawAmountToModal: payload.hanWithdrawAmountToModal,
        hanWithdrawIndex: payload.hanWithdrawIndex,
      };
    case "HAN_CHAIN_REWARD_VIEW":
      return {
        ...state,
        hanRewardPerSecondView: payload.hanRewardPerSecondView,
        hanTotalRewardReleased: payload.hanTotalRewardReleased,
      };

    default:
      return {
        ...state,
      };
  }
}

export default hanStakingViewReducer;
