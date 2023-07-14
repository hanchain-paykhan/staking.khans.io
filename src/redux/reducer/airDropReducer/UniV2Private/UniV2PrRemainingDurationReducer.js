let initialState = {
    prUniV2ClaimDayDate: "",
    prUniV2ClaimHoursDate: "",
    prUniV2ClaimMinDate: "",
    prUniV2ClaimSecDate: "",
};

function UniV2PrRemainingDurationReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "PRIVATE_UNIV2_DURATION_TIMESTAMP":
            return {
                ...state,
                prUniV2ClaimDayDate: payload.prUniV2ClaimDayDate,
                prUniV2ClaimHoursDate: payload.prUniV2ClaimHoursDate,
                prUniV2ClaimMinDate: payload.prUniV2ClaimMinDate,
                prUniV2ClaimSecDate: payload.prUniV2ClaimSecDate,
            };

        default:
            return {
                ...state,
            };
    }
}

export default UniV2PrRemainingDurationReducer;
