let initialState = {
  amountStaked: "",
  getOldSprAmountStaked: "",
  myTokenId: "",
  myStakedTokenId: "",
  getTotalTokenIds: [],
  getOldSprStakedTokenIds: [],
  getOldSprMyTokenIds: [],
  oldSprStakingTokenIdImg: [],
  successOldSprApprove: false,
  successOldSprAllApprove: false,
  isApprovedForAll: false,
};

function oldSprStakingViewReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_OLD_SPR_STAKING_VIEW_SUCCESS":
      return {
        ...state,
        getOldSprAmountStaked: payload.getOldSprAmountStaked,
        amountStaked: payload.amountStaked,
        getTotalTokenIds: payload.getTotalTokenIds,
        getOldSprStakedTokenIds: payload.getOldSprStakedTokenIds,
        getOldSprMyTokenIds: payload.getOldSprMyTokenIds,
        isApprovedForAll: payload.isApprovedForAll,
        oldSprStakingTokenIdImg: payload.oldSprStakingTokenIdImg,
      };
    // case "GET_SPR_STAKING_BACKEND_VIEW_SUCCESS":
    //     return {
    //         ...state,
    //         getMyTokenIds : getMyTokenIds,

    //     }
    case "SUCCESS_OLD_SPR_APPROVE":
      return { ...state, successOldSprApprove: payload.successOldSprApprove };

    case "SUCCESS_OLD_SPR_ALL_APPROVE":
      return { ...state, successOldSprAllApprove: payload.successOldSprAllApprove };

    case "SELECT_OLD_STAKING_NFT":
      return { ...state, myTokenId: payload };

    case "SELECT_OLD_UNSTAKING_NFT":
      return { ...state, myStakedTokenId: payload };

    default:
      return { ...state };
  }
}

export default oldSprStakingViewReducer;
