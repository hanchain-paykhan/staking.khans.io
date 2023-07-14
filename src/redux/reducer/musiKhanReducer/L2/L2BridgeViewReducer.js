const initialState = {
  mintL2TokenName: "",
  mintL2TokenSymbol: "",
  getL1TokenAmount: "",
};

const L2BridgeViewReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "L2_BRIDGE_L1_TOKENINFO":
      return {
        ...state,
        mintL2TokenName: payload.mintL2TokenName,
        mintL2TokenSymbol: payload.mintL2TokenSymbol,
        getL1TokenAmount: payload.getL1TokenAmount,
      };
    default:
      return { ...state };
  }
};

export default L2BridgeViewReducer;
