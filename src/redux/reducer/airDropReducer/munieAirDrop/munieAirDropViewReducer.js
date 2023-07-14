let initialState = {
    getMunieAirDropTokenImg: {},
    selectMunieTokenName: "",
    selectMunieTokenId: "",
    tokenOwnerResult: "",
};

function munieAirDropViewReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "GET_MUNIE_AIRDROP_TOKENLIST":
            return {
                ...state,
                getMunieAirDropTokenImg: payload.getMunieAirDropTokenImg,
            };
        case "MUNIE_AIRDROP_VIEW":
            return {
                ...state,
                selectMunieTokenName: payload.selectMunieTokenName,
                selectMunieTokenId: payload.selectMunieTokenId,
            };
        case "MUNIE_AIRDROP_CHECKOWNER":
            return {
                ...state,
                tokenOwnerResult: payload.tokenOwnerResult,
            };

        default:
            return {
                ...state,
            };
    }
}

export default munieAirDropViewReducer;
