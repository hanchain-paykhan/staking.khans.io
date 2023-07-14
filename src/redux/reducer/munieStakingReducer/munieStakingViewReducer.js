let initialState = {
  munieAmountStaked: "",
  munieStakedTokenIds: [],
  getMyMunieTokenIds: [],
  stakedMunieTokenId: [],
  successMunieApprove: false,
  getMunieSingleApproved: "",
  getMunieStakingTokenIdImgVideoUrl: [],
};

function munieStakingViewReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "MUNIE_STAKING_VIEW":
      return {
        ...state,
        munieAmountStaked: payload.munieAmountStaked,
        munieStakedTokenIds: payload.munieStakedTokenIds,
      };

    case "MUNIE_DEPOSIT_LIST":
      return {
        ...state,
        getMyMunieTokenIds: payload.getMyMunieTokenIds,
      };

    case "MUNIE_WITHDRAW_LIST":
      return {
        ...state,
        stakedMunieTokenId: payload.stakedMunieTokenId,
      };
    case "SUCCESS_MUNIE_APPROVE":
      return {
        ...state,
        successMunieApprove: payload.successMunieApprove,
      };

    case "GET_MUNIE_SINGLE_APPROVE_STATE_VIEW":
      return {
        ...state,
        getMunieSingleApproved: payload.getMunieSingleApproved,
      };

    case "GET_MUNIE_ALL_TOKEN_VIEW":
      return {
        ...state,
        getMunieStakingTokenIdImgVideoUrl: payload.getMunieStakingTokenIdImgVideoUrl,
      };
    default:
      return { ...state };
  }
}

export default munieStakingViewReducer;
