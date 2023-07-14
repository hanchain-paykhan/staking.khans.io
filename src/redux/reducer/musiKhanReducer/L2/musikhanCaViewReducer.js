const initialState = {
    getMyMintingTokenList: "",
    l2DepositTokenList: [],
    l2AllTokenList: [],
};

const musikhanCaViewReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_MY_MINTING_TOKENCA":
            return {
                ...state,
                getMyMintingTokenList: payload.getMyMintingTokenList,
                l2DepositTokenList: payload.l2DepositTokenList,
                l2AllTokenList: payload.l2AllTokenList,
            };
        default:
            return { ...state };
    }
};

export default musikhanCaViewReducer;
