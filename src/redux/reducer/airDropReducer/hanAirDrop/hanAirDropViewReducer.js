let initialState = {
    hanAirDropCanClaim: false,
    getHanProofToBack: "",
    getHanAmountToBack: "",
    hanClaimDayDate: "",
    hanClaimHoursDate: "",
    hanClaimMinDate: "",
    hanClaimed: false,
};

function hanAirDropViewReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case "HAN_AIRDROP_VIEW":
            return {
                ...state,
                hanAirDropCanClaim: payload.hanAirDropCanClaim,
                getHanProofToBack: payload.getHanProofToBack,
                getHanAmountToBack: payload.getHanAmountToBack,
            };

        case "GET_HANAIRDROP_CLAIMED":
            return {
                ...state,
                hanClaimed: payload.hanClaimed,
            };

        case "GET_HANAIRDROP_TIMESTAMP":
            return {
                ...state,
                hanClaimDayDate: payload.hanClaimDayDate,
                hanClaimHoursDate: payload.hanClaimHoursDate,
                hanClaimMinDate: payload.hanClaimMinDate,
            };
        default:
            return { ...state };
    }
}

export default hanAirDropViewReducer;
