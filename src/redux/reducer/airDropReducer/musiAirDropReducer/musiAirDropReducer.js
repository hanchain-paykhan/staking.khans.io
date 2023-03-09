let initialState = {
    musiAirDropTokenList: [],
    musiRoot: "",
    musiName: "",
    musiSymbol: "",
    musiClaimDayDate: 0,
    musiClaimHoursDate: 0,
    musiClaimMinDate: 0,
    musiKhanNewRoot: "",
    musiL2Ca: "",
    getmusiProofToBack: "",
    getmusiTokenCaToBack: "",
    getmusiAmountToBack: "",
    musiCanClaim: false,
    successMusiAirDropClaim: false,
    musiClaimed: false,
    timeStampErrorState: false,
};

function musiAirDropReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case "MUSI_AIRDROP_TOKENLIST":
            return {
                ...state,
                musiAirDropTokenList: payload.musiAirDropTokenList,
            };

        case "AIRDROP_MUSI_VIEW_SUCCESS":
            return {
                ...state,
                musiRoot: payload.musiRoot,
                musiName: payload.musiName,
                musiSymbol: payload.musiSymbol,
                musiL2Ca: payload.musiL2Ca,
            };

        case "GET_MUSI_AIRDROP_TIMESAMP":
            return {
                ...state,
                musiClaimDayDate: payload.musiClaimDayDate,
                musiClaimHoursDate: payload.musiClaimHoursDate,
                musiClaimMinDate: payload.musiClaimMinDate,
                musiKhanNewRoot: payload.musiKhanNewRoot,
            };

        case "AIRDROP_MUSI_BACK_DATA_SUCCESS":
            return {
                ...state,
                getmusiProofToBack: payload.getmusiProofToBack,
                getmusiTokenCaToBack: payload.getmusiTokenCaToBack,
                getmusiAmountToBack: payload.getmusiAmountToBack,
                musiCanClaim: payload.musiCanClaim,
            };

        case "SUCCESS_MUSIAIRDROP_CLAIM":
            return {
                ...state,
                successMusiAirDropClaim: payload.successMusiAirDropClaim,
            };

        case "MUSI_AIRDROP_CLAIMED_STATE":
            return {
                ...state,
                musiClaimed: payload.musiClaimed,
            };

        case "GET_ERROR_MUSI_AIRDROP_TIMESTAMP":
            return {
                ...state,
                timeStampErrorState: payload.timeStampErrorState,
            };
        default:
            return { ...state };
    }
}
export default musiAirDropReducer;
