let initialState = {
    getUsdcProofToBack: '',
    getUsdcAmountToBack: '',
    canUsdcClaim: false,
    claimUsdcDayDate: '',
    claimUsdcHoursDate: '',
    claimUsdcMinDate: '',
    usdcClaimed: '',
    successUsdcAirDropClaim: false,
};

function usdcAirDropViewReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'GET_USDC_AIRDROP_VIEW_SUCCESS':
            return {
                ...state,
                getUsdcProofToBack: payload.getUsdcProofToBack,
                getUsdcAmountToBack: payload.getUsdcAmountToBack,
                canUsdcClaim: payload.canUsdcClaim,
            };
        case 'GET_USDC_AIRDROP_SUCCESS_TIMESTAMP':
            return {
                ...state,
                claimUsdcDayDate: payload.claimUsdcDayDate,
                claimUsdcHoursDate: payload.claimUsdcHoursDate,
                claimUsdcMinDate: payload.claimUsdcMinDate,
            };

        case 'GET_USDC_AIRDROP_CLAIMED_SUCCESS':
            return {
                ...state,
                usdcClaimed: payload.usdcClaimed,
            };

        case 'SUCCESS_USDC_AIRDROP_CLAIM':
            return {
                ...state,
                successUsdcAirDropClaim: payload.successUsdcAirDropClaim,
            };

        default:
            return { ...state };
    }
}

export default usdcAirDropViewReducer;
