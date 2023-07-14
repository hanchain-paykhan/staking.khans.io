let initialState = {
  oldMunieStakedTokenIds: [],
  getMyOldMunieTokenIds: [],
  stakedOldMunieTokenId: [],
  oldMunieStakedAmount: "",
  successOldMunieApprove: false,
  getOldMunieSingleApproved: "",
  getOldMunieStakingTokenIdImgVideoUrl: [],
};

function oldMunieStakingViewReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "OLD_MUNIE_DEPOSIT_LIST":
      return {
        ...state,
        getMyOldMunieTokenIds: payload.getMyOldMunieTokenIds,
      };
    case "OLD_MUNIE_VIEW":
      return {
        ...state,
        oldMunieStakedAmount: payload.oldMunieStakedAmount,
        oldMunieStakedTokenIds: payload.oldMunieStakedTokenIds,
      };

    case "OLD_MUNIE_WITHDRAW_LIST":
      return {
        ...state,
        stakedOldMunieTokenId: payload.stakedOldMunieTokenId,
      };
    case "SUCCESS_OLD_MUNIE_APPROVE":
      return {
        ...state,
        successOldMunieApprove: payload.successOldMunieApprove,
      };

    case "GET_OLD_MUNIE_SINGLE_APPROVE_STATE_VIEW":
      return {
        ...state,
        getOldMunieSingleApproved: payload.getOldMunieSingleApproved,
      };

    case "GET_OLD_MUNIE_ALL_TOKEN_VIEW":
      return {
        ...state,
        getOldMunieStakingTokenIdImgVideoUrl: payload.getOldMunieStakingTokenIdImgVideoUrl,
      };
    default:
      return { ...state };
  }
}

export default oldMunieStakingViewReducer;
