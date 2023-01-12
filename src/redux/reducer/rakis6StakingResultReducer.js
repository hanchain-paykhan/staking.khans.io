let initialState = {
  resultValue: "",
  getBalance: "",
  getRewardReleased: "",
};

function rakis6StakingResultReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_STAKING_RESULT_VIEW_SUCCESS":
      return {
        ...state,
        resultValue: payload.resultValue,
        getBalance: payload.getBalance,
        getRewardReleased: payload.getRewardReleased,
      };
    default:
      return { ...state };
  }
}

export default rakis6StakingResultReducer;
