let initialState = {
  hanChainPrice: "",
  hanChainPercentage: "",
};

function coinPriceReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_HANCHAIN_PRICE_SUCCESS":
      return {
        ...state,
        hanChainPrice: payload.hanChainPrice,
        hanChainPercentage: payload.hanChainPercentage,
      };

    default:
      return { ...state };
  }
}

export default coinPriceReducer;
