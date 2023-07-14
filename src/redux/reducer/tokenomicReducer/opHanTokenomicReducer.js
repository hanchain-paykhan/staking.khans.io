let initialState = {
  opHanBonus: "",
  opMusikhan: "",
  opPvtRakis6: "",
  opRakis6: "",
  hanBonusOneYear: "",
  musikhanOneYear: "",
  pvtRakis6OneYear: "",
  rakis6OneYear: "",
};

function opHanTokenomicReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_OP_HAN_TOKENOMIC":
      return {
        ...state,
        opHanBonus: payload.opHanBonus,
        opMusikhan: payload.opMusikhan,
        opPvtRakis6: payload.opPvtRakis6,
        opRakis6: payload.opRakis6,
        hanBonusOneYear: payload.hanBonusOneYear,
        musikhanOneYear: payload.musikhanOneYear,
        pvtRakis6OneYear: payload.pvtRakis6OneYear,
        rakis6OneYear: payload.rakis6OneYear,
      };
    default:
      return { ...state };
  }
}

export default opHanTokenomicReducer;
