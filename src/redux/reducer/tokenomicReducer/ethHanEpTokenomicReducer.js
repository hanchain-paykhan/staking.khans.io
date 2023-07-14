let initialState = {
  ethHanEpEplatform: "",
  ethHanEpPartner: "",
  ethHanEpFounder: "",
  ethHanEpTeamAdvisor: "",
  ethHanEpReward: "",
  ethHanEpPvtUniV2: "",
  ethHanEpUniV2: "",
  ethHanEpMunieV2: "",
  ethHanEpSPRV2: "",
  ethHanEpPvtUniV2OneYear: "",
  ethHanEpUniV2OneYear: "",
  ethHanEpMunieV2OneYear: "",
  ethHanEpSPRV2OneYear: "",
  hanEpCirculating: "",
};

function ethHanEpTokenomicReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_ETH_HANEP_TOKENOMIC":
      return {
        ...state,
        ethHanEpEplatform: payload.ethHanEpEplatform,
        ethHanEpPartner: payload.ethHanEpPartner,
        ethHanEpFounder: payload.ethHanEpFounder,
        ethHanEpTeamAdvisor: payload.ethHanEpTeamAdvisor,
        ethHanEpReward: payload.ethHanEpReward,
        ethHanEpPvtUniV2: payload.ethHanEpPvtUniV2,
        ethHanEpUniV2: payload.ethHanEpUniV2,
        ethHanEpMunieV2: payload.ethHanEpMunieV2,
        ethHanEpSPRV2: payload.ethHanEpSPRV2,
        ethHanEpPvtUniV2OneYear: payload.ethHanEpPvtUniV2OneYear,
        ethHanEpUniV2OneYear: payload.ethHanEpUniV2OneYear,
        ethHanEpMunieV2OneYear: payload.ethHanEpMunieV2OneYear,
        ethHanEpSPRV2OneYear: payload.ethHanEpSPRV2OneYear,
      };
    case "GET_HANEP_CIRCULATING":
      return {
        ...state,
        hanEpCirculating: payload.hanEpCirculating,
      };
    default:
      return { ...state };
  }
}

export default ethHanEpTokenomicReducer;
