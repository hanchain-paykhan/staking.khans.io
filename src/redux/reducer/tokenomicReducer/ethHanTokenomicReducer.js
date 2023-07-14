let initialState = {
  ethEplatform: "",
  ethPartner: "",
  ethFounder: "",
  ethTeamAdvisor: "",
  ethReward: "",
  ethMunie: "",
  ethSpr: "",
  ethMunieOneYear: "",
  ethSprOneYear: "",
  hanCirculating: "",
};

function ethHanTokenomicReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_ETH_HAN_TOKENOMIC":
      return {
        ...state,
        ethEplatform: payload.ethEplatform,
        ethPartner: payload.ethPartner,
        ethFounder: payload.ethFounder,
        ethTeamAdvisor: payload.ethTeamAdvisor,
        ethReward: payload.ethReward,
        ethMunie: payload.ethMunie,
        ethSpr: payload.ethSpr,
        ethMunieOneYear: payload.ethMunieOneYear,
        ethSprOneYear: payload.ethSprOneYear,
      };
    case "GET_HAN_CIRCULATING":
      return {
        ...state,
        hanCirculating: payload.hanCirculating,
      };
    default:
      return { ...state };
  }
}

export default ethHanTokenomicReducer;
